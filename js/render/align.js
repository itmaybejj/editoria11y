import {debounce} from "sa11y/src/js/utils/utils.js";
import {State, UI} from "../utils/state.js";
import {findElements, firstVisibleParent, visible} from "../utils/utils.js";

export function incrementalAlign() {
  debounce(() => {
    if (!State.running && !State.alignPending) {
      State.scrollPending++;
      updateTipLocations();
      State.alignPending = false;
    } else {
      incrementalAlign();
    }
  }, 10);
}

export const intersect = function(a, b, x = 10) {
  // Compute intersect using browser offsets.
  return (a.left - x <= b.right &&
    b.left - x <= a.right &&
    a.top - x <= b.bottom &&
    b.top - x <= a.bottom);
};

/**
 * Hide tips that are in front of text currently being edited.
 * */
export function checkEditableIntersects (focusKnown = false) {
  if (!focusKnown && !document.querySelector('[contenteditable]:focus, [contenteditable] :focus')) {
    //Reset classes to measure.
    State.jumpList?.forEach((el) => {
      el.classList.remove('intersecting');
    });
    return;
  }
  if (!State.activeRange) {
    // Range isn't on a node we can measure.
    State.jumpList?.forEach((el) => {
      el.classList.remove('intersecting');
    });
    return;
  }
  State.jumpList?.forEach((el) => {
    const framePositioner = el.result.fixedRoot && State.positionedFrames[el.result.fixedRoot] ?
      State.positionedFrames[el.result.fixedRoot] : { top: 0, left: 0 };
    const activeRects = State.activeRange.getBoundingClientRect();
    const rects = {};
    rects.top = activeRects.top + framePositioner.top;
    rects.left = activeRects.left + framePositioner.left;
    rects.bottom = activeRects.bottom + framePositioner.top;
    rects.right = activeRects.right + framePositioner.left;

    const toggle = el.shadowRoot.querySelector('.toggle');
    if ( intersect(rects, toggle.getBoundingClientRect(), 0) ) {
      if (!toggle.classList.contains('was-intersecting')) {
        el.classList.add('intersecting');
        toggle.classList.add('intersecting');
      }
    } else {
      el.classList.remove('intersecting', 'was-intersecting');
      toggle.classList.remove('intersecting', 'was-intersecting');
    }
  });
}

export function alignAlts () {
  // Positions alt label to match absolute, inline or floated images.
  findElements('altMark', 'ed11y-element-alt');
  State.elements.altMark?.forEach((el) => { // @todo merge
    let id = el.dataset.ed11yImg;
    el.style.setProperty('transform', null);
    el.style.setProperty('height', null);
    el.style.setProperty('width', null);

    let img = UI.imageAlts[id][0];
    if (img.tagName !== 'IMG') {
      // Mark is placed outside the link in linked images.
      img = img.querySelector('img');
    }
    let markOffset = el.getBoundingClientRect();
    let imgOffset = img.getBoundingClientRect();
    let newOffset = imgOffset.left - markOffset.left;
    let height = getComputedStyle(img).height;
    height = height === 'auto' ? img.offsetHeight : Math.max(img.offsetHeight, parseInt(height));
    el.style.setProperty('transform', `translate(${newOffset}px, 0px)`);
    el.style.setProperty('height', `${height}px`);
    el.style.setProperty('width', `${img.offsetWidth}px`);
  });
}


const nudgeMark = function (el, x, y) {
  // TODO: THESE CAN NUDGE OUT OF THE OVERFLOW AREA OF THE CONTENTEDITABLE CONTAINER
  if (el.style.transform) {
    const computedStyle = window.getComputedStyle(el);
    let matrix = computedStyle.getPropertyValue('transform');
    matrix = matrix.split(',');
    el.style.transform = `translate(${parseFloat(matrix[4]) + x}px, ${parseFloat(matrix[5]) + y}px)`;
  } else {
    el.style.transform = `translate(${x}px, ${y}px)`;
  }
};

export function alignButtons() {
  if (!State.jumpList || State.jumpList.length === 0 || (State.openTip.button && State.scrollPending === 0)) { // todo always false?
    return;
  }
  State.alignPending = true;

  // Reading and writing in a loop creates paint thrashing.
  // We iterate the array for reads, then iterate for writes.

  if (State.options.fixedRoots) {
    State.positionedFrames.length = 0;

    State.options.fixedRoots.forEach((root) => {
      if (root['framePositioner']) {
        State.positionedFrames.push(root['framePositioner'].getBoundingClientRect());
      }
    });
  }

  // Used for crude intersection detection.
  let previousNudgeTop = 0;
  let previousNudgeLeft = 0;
  const scrollTop = window.scrollY;
  if (!State.options.inlineAlerts) {
    // Compute based on target position.

    State.jumpList.forEach((mark, i) => {
      if (!mark.result.element.isConnected) {
        // Something broke; rebuild jumpList on next loop.
        State.forceFullCheck = true;
        State.interaction = true;
        mark.style.display = 'none';
      } else {
        //mark.visibility = 'visible';
      }
      let targetOffset = mark.result.element.getBoundingClientRect();

      let top = targetOffset.top + scrollTop;
      //let rightBound = window.innerWidth;
      if (!visible(mark.result.element)) {
        // Invisible target.
        const firstVisibleParent = firstVisibleParent(mark.result.element);
        targetOffset = firstVisibleParent ? firstVisibleParent.getBoundingClientRect() : targetOffset;
        top = targetOffset.top + scrollTop;
      }
      let left = targetOffset.left;

      // TD TD different?
      if (mark.result.element.tagName === 'IMG') {
        top = top + 10;
        left = left + 10;
      } else {
        left = State.options.inlineAlerts ? left - 34 : left;
      }

      // Add iframe positon to calculated position
      if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
        top = top + State.positionedFrames[mark.result.fixedRoot].top;
        left = left + State.positionedFrames[mark.result.fixedRoot].left;
      }

      // TD TD different?
      if (mark.result.element.tagName === 'IMG') {
        top = top + 10;
        left = left + 10;
      } else {
        left = State.options.inlineAlerts ? left - 34 : left;
      }
      if (mark.result.scrollableParent) {
        // Bump alerts that would be X-position out of a scroll zone.
        State.jumpList[i].bounds = mark.result.scrollableParent.getBoundingClientRect();
        if (left < State.jumpList[i].bounds.left) {
          left = State.jumpList[i].bounds.left;
        } else if (left + 40 > State.jumpList[i].bounds.right) {
          left = State.jumpList[i].bounds.right - 40;
        }
      } else if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
        // Bump alerts that would x-position out of an iframe.
        State.jumpList[i].bounds = State.positionedFrames[mark.result.fixedRoot];
        if (left < State.jumpList[i].bounds.left) {
          left = State.jumpList[i].bounds.left;
        } else if (left + 40 > State.jumpList[i].bounds.right) {
          left = State.jumpList[i].bounds.right - 40;
        }
      }
      State.jumpList[i].targetOffset = targetOffset;
      State.jumpList[i].markTop = top;
      State.jumpList[i].markLeft = left;
    });
  } else {
    // Compute based on self position.

    // Clear old transforms first. Batch write first...
    State.jumpList.forEach((mark) => {
      // Reset positions.
      mark.style.setProperty('transform', null);
      mark.style.setProperty('top', 'initial');
      mark.style.setProperty('left', 'initial');
      if (mark.style.transform) {
        const computedStyle = window.getComputedStyle(mark);
        let matrix = computedStyle.getPropertyValue('transform');
        matrix = matrix.split(',');
        mark.xOffset = parseFloat(matrix[4]);
        mark.yOffset = parseFloat(matrix[5]);
      }
      else {
        mark.xOffset = 0;
        mark.yOffset = 0;
      }
    });
    // ...then batch read new positions.
    State.jumpList.forEach((mark) => {
      mark.markOffset = mark.getBoundingClientRect();
      mark.markLeft = mark.markOffset.left;
      mark.markTop = mark.markOffset.top;
    });
  }


  // Check for overlaps, then write out transforms.
  State.jumpList.forEach((mark, i) => {

    // Now check for any needed nudges
    let nudgeTop = 10;
    let nudgeLeft = mark.result.element.tagName === 'IMG' ? 10 : -34;
    // Detect tip that overlaps with previous result.
    if (mark.markTop + scrollTop < 0) {
      // Offscreen to top.
      nudgeTop = (-1 * (mark.markTop + scrollTop)) - 6;
    }
    if (
      (i > 0 && overlap(mark.markLeft, mark.markTop, State.jumpList[i - 1].markLeft, State.jumpList[i - 1].markTop)) ||
      (i > 1 && overlap(mark.markLeft, mark.markTop, State.jumpList[i - 2].markLeft, State.jumpList[i - 2].markTop)) ||
      (i > 2 && overlap(mark.markLeft, mark.markTop, State.jumpList[i - 3].markLeft, State.jumpList[i - 3].markTop))
    ) {
      // todo postpone: compute actual overlap? We're bouncing by the full amount no matter what which adds too much gapping.
      nudgeTop = nudgeTop + 14 + previousNudgeTop;
      nudgeLeft = 14 + previousNudgeLeft;
    }

    let constrainLeft = 0;
    let constrainRight = window.innerWidth;

    if (mark.result.scrollableParent) {
      const constrained = mark.result.scrollableParent.getBoundingClientRect();
      constrainLeft = constrained.left;
      constrainRight = constrainLeft + constrained.width;
    } else if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
      constrainLeft = State.positionedFrames[mark.result.fixedRoot].left;
      constrainRight = State.positionedFrames[mark.result.fixedRoot].right;
    }

    let needNudge = false;
    if (mark.markLeft + nudgeLeft - constrainLeft < 44) {
      // Offscreen to left. push to the right.
      nudgeLeft = 44 - mark.markLeft + nudgeLeft + constrainLeft;
      needNudge = true;
    }
    else if (mark.markLeft + nudgeLeft + 80 > constrainRight ) {
      needNudge = true;
      // Offscreen to right. push to the left
      nudgeLeft = constrainRight - nudgeLeft - mark.markLeft - 100;
    }
    else if (nudgeTop !== 0) {
      needNudge = true;
    }
    if (!State.options.inlineAlerts) {
      if (needNudge) {
        mark.style.transform = `translate(${mark.markLeft + nudgeLeft}px, ${mark.markTop + nudgeTop}px)`;
      } else {
        mark.style.transform = `translate(${mark.markLeft}px, ${mark.markTop}px)`;
      }

    } else {
      nudgeMark(mark, nudgeLeft, nudgeTop);
    }
    mark.nudgeLeft = nudgeLeft;
    mark.nudgeTop = nudgeTop;
    previousNudgeTop = nudgeTop;
    previousNudgeLeft = nudgeLeft;
  });

  // Last pass: check for elements offscreen within scrollable areas.
  if (!State.options.inlineAlerts) {
    // Alerts have to be positioned relative to viewport.
    State.jumpList.forEach(mark => {

      if (mark.result.scrollableParent) {
        // Hide alerts outside a scroll zone.
        if (!!mark.bounds && (mark.targetOffset.top - mark.bounds.top < 0 || mark.targetOffset.top - mark.bounds.bottom > 0 ) && !mark.matches(':focus, :focus-within, [data-ed11y-open="true"]')) {
          // Tip has exited scrollable parent. Visually hide.
          mark.classList.add('ed11y-offscreen');
          mark.style.transform = 'translate(0px, -50px)';
          mark.style.pointerEvents = 'none';
          if (mark.getAttribute('data-ed11y-open') === 'true') {
            mark.setAttribute('data-ed11y-action', 'shut');
          }
        }
        else {
          mark.classList.remove('ed11y-offscreen');
          mark.style.pointerEvents = 'auto';
        }
      } else if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
        if (!!mark.bounds && (mark.targetOffset.top < -40 || mark.targetOffset.top + mark.bounds.top - mark.bounds.bottom > -10 ) && !mark.matches(':focus, :focus-within, [data-ed11y-open="true"]')) {
          // Tip has exited scrollable parent. Visually hide.
          mark.classList.add('ed11y-offscreen');
          mark.style.transform = 'translate(0px, -50px)';
          mark.style.pointerEvents = 'none';
          if (mark.getAttribute('data-ed11y-open') === 'true') {
            mark.setAttribute('data-ed11y-action', 'shut');
          }
        }
        else {
          mark.classList.remove('ed11y-offscreen');
          mark.style.pointerEvents = 'auto';
        }
      }
      else {
        mark.classList.remove('ed11y-offscreen');
        mark.style.pointerEvents = 'auto';
      }

    });
  }
  State.jumpList?.forEach(mark => {
    // Now make visible.
    // todo: Edge still flickers on redraw.
    mark.classList.remove('ed11y-preload');
  });

}

export function alignTip (button, toolTip, recheck = 0, reveal = false) {
  if (!toolTip) {
    return;
  }

  let arrow = toolTip.shadowRoot.querySelector('.arrow');
  let tip = arrow.nextElementSibling;
  let loopCount = recheck - 1;

  // Various hiddenHandlers may cause element to animate open.
  if (recheck > 0) {
    window.setTimeout(function () {
      requestAnimationFrame(()=>alignTip(button, toolTip, loopCount, reveal));
    }, 200 / loopCount, button, toolTip, loopCount, reveal);
  }
  if (reveal) {
    window.setTimeout(() => {
      toolTip.style.setProperty('opacity', '1');
      // 140 seems to be the minimum to not flash.
    }, 140, toolTip, tip);
  }

  const mark = button.getRootNode().host;
  const resultNum = button.dataset.ed11yResult;
  const result = State.results[resultNum];

  // Find button on page
  const scrollTop = window.scrollY;
  let leftAdd = State.options.inlineAlerts ? window.scrollX : 0;

  let buttonOffset = button.getBoundingClientRect();
  let buttonSize = buttonOffset.width;
  let buttonLeft = buttonOffset.left + leftAdd;
  let buttonTop = buttonOffset.top + scrollTop;

  let containTop = scrollTop;
  let containLeft = 0;
  let containWidth = window.innerWidth;
  let containBottom = window.innerHeight + scrollTop;
  let absoluteBottom = containBottom;

  if (!State.options.inlineAlerts && result.scrollableParent) {
    let bounds = result.scrollableParent.getBoundingClientRect();
    if (bounds.width > 0) {
      //buttonTop = buttonTop + result.scrollableParent.scrollTop;
      containLeft = Math.max(0, bounds.left);
      containWidth = Math.min(containWidth, bounds.width - 30);
      containBottom = bounds.bottom + scrollTop;
      containTop = bounds.top + scrollTop;
      absoluteBottom = bounds.top + result.scrollableParent.scrollHeight;
    }
  } else if (mark.dataset.ed11yHiddenResult === 'true' || !(visible(mark) || buttonOffset.top === 0 && buttonOffset.left === 0)) {
    // ruh roh invisible button
    // todo: use the not-inline drawing pattern for invisible targets?
    const firstVisibleParent = firstVisibleParent(mark.result.element);
    if (firstVisibleParent) {
      buttonOffset = firstVisibleParent.getBoundingClientRect();
      buttonLeft = buttonOffset.left;
      buttonTop = buttonOffset.top;
    } else {
      tip.style.setProperty('max-width', 'none');
    }
    // Estimate from font when it can't be measured.
    buttonSize = window.innerWidth > 800 ? 38 : 33;
  }
  // Set wrapper for CSS.
  //tip.closest('.ed11y-wrapper').style.setProperty('width', buttonSize + 'px');
  //tip.closest('.ed11y-wrapper').style.setProperty('height', buttonSize + 'px');
  document.documentElement.style.setProperty('--ed11y-buttonWidth', buttonSize + 'px');
  tip.style.setProperty('max-width', `min(${containWidth > 280 ? containWidth : 280}px, 90vw)`);
  const containRight = Math.min(window.innerWidth, containLeft + containWidth);
  toolTip.style.setProperty('top', buttonOffset.top + scrollTop + 'px');
  toolTip.style.setProperty('left', buttonOffset.left + leftAdd + 'px');
  const tipWidth = tip.offsetWidth;
  const tipHeight = tip.offsetHeight;

  let direction = 'under';

  // Default to displaying under
  if (buttonTop === 0 && buttonLeft === 0) {
    direction = 'whompWhomp';
  } else if (buttonTop + tipHeight + scrollTop + buttonSize + 22 > containBottom) {
    // It won't fit under. Look elsewhere.
    if ( containRight > buttonSize + tipWidth + buttonLeft + 30 &&
      containTop + tipHeight + 30 < containBottom ) {
      direction = 'right';
    } else if (buttonTop - tipHeight - 15 > containTop) {
      direction = 'above';
    } else if ( containLeft < buttonLeft - (buttonSize + tipWidth + 30) &&
      containTop + tipHeight + 30 < containBottom) {
      direction = 'left';
    } else if (buttonTop + tipHeight + buttonSize > absoluteBottom) {
      // It REALLY doesn't fit below.
      direction = 'above';
    }
    // Back to default.
  } // else: under.
  arrow.dataset.direction = direction;

  let nudgeX = 0;
  let nudgeY = 0;

  const align = function(container, alignTo, size, direction) {
    let over = container - (alignTo + size + buttonSize);
    if (over < 0) {
      if (direction === 'horizontal' && alignTo + over < 0) {
        // Prevent left edge overshoot.
        return Math.max(0 - alignTo, 4 - size);
      }
      return Math.max(over, buttonSize + 10 - size);
    }
    return 0;

  };

  switch (direction) {
    case 'under':
      nudgeX = align(containRight, buttonLeft, tipWidth, 'horizontal');
      arrow.style.setProperty('top', buttonSize + 'px');
      arrow.style.setProperty('right', 'auto');
      arrow.style.setProperty('bottom', 'auto');
      arrow.style.setProperty('left', buttonSize / 2 - 10 + 'px');
      tip.style.setProperty('top', buttonSize + 10 + 'px');
      tip.style.setProperty('right', 'auto');
      tip.style.setProperty('bottom', 'auto');
      tip.style.setProperty('left', '-4px');
      break;
    case 'above':
      nudgeX = align(containRight, buttonLeft, tipWidth, 'horizontal');
      arrow.style.setProperty('top', 'auto');
      arrow.style.setProperty('right', 'auto');
      arrow.style.setProperty('bottom', '2px');
      arrow.style.setProperty('left', buttonSize / 2 - 10 + 'px');
      tip.style.setProperty('top', 'auto');
      tip.style.setProperty('right', 'auto');
      tip.style.setProperty('bottom', '12px');
      tip.style.setProperty('left', '-4px');
      break;
    case 'right':
      nudgeY = align(containBottom, buttonTop, tipHeight, 'vertical');
      arrow.style.setProperty('top', buttonSize / 2 - 10 + 'px');
      arrow.style.setProperty('right', 'auto');
      arrow.style.setProperty('bottom', 'auto');
      arrow.style.setProperty('left', buttonSize + 'px');
      tip.style.setProperty('top', '-4px');
      tip.style.setProperty('right', 'auto');
      tip.style.setProperty('bottom', 'auto');
      tip.style.setProperty('left', buttonSize + 10 + 'px');
      break;
    case 'left':
      nudgeY = align(containBottom, buttonTop, tipHeight, 'vertical');
      arrow.style.setProperty('top', buttonSize / 2 - 10 + 'px');
      arrow.style.setProperty('right', '0');
      arrow.style.setProperty('bottom', 'auto');
      arrow.style.setProperty('left', 'auto');
      tip.style.setProperty('top', '-4px');
      tip.style.setProperty('right', '10px');
      tip.style.setProperty('bottom', 'auto');
      tip.style.setProperty('left', 'auto');
      break;
    case 'whompWhomp':
      nudgeY = align(containBottom, buttonTop, tipHeight, 'horizontal');
      arrow.style.setProperty('top', '0');
      arrow.style.setProperty('right', '0');
      arrow.style.setProperty('bottom', '0');
      arrow.style.setProperty('left', '0');
      tip.style.setProperty('top', `calc(50vh - ${tipWidth / 2}px)`);
      tip.style.setProperty('right', 'auto');
      tip.style.setProperty('bottom', 'auto');
      tip.style.setProperty('left', `calc(50vh - ${tipHeight / 2}px)`);
      break;
  }
  if (nudgeX || nudgeY) {
    tip.style.setProperty('transform', `translate(${nudgeX}px, ${nudgeY}px)`);
  } else {
    tip.style.setProperty('transform', 'none');
  }
  alignHighlights();
}

export function updateTipLocations () {
  if (!State.scrollTicking && State.scrollPending > 0 && !State.running && State.jumpList && State.open) {
    State.scrollTicking = true;
    alignButtons();
    if (State.openTip.tip) {
      alignTip(State.openTip.button.shadowRoot.querySelector('button'), State.openTip.tip);
    }
    State.scrollPending --;
  }
  State.scrollTicking = false;
  if (State.scrollPending > 0) {
    requestAnimationFrame(() => updateTipLocations());
  }
}

const scrollableElem = function(el) {
  let overflowing = el.clientHeight && el.clientHeight < el.scrollHeight;
  if (overflowing) {
    const styles = window.getComputedStyle(el);
    overflowing = styles.overflowY !== 'visible';
  }
  return overflowing;
};

export function closestScrollable(el) {
  if (State.options.constrainButtons && el.closest(State.options.constrainButtons)) {
    return el.closest(State.options.constrainButtons);
  }

  let parent = el.parentElement;
  if (parent && parent.tagName !== 'BODY') {
    // Parent exists
    if (scrollableElem(parent)) {
      // Return if scrollable found.
      return parent;
    } else {
      // Element is not scrollable, recurse
      parent = closestScrollable(parent);
      // Return if scrollable found.
      return parent;
    }
  } else {
    // No scrollable parents.
    return false;
  }
}

export function alignHighlights() {

  if (State.options.fixedRoots && UI.editableHighlight.length > 0) {
    State.positionedFrames = [];

    State.options.fixedRoots.forEach((root) => {
      if (root['framePositioner']) {
        State.positionedFrames.push(root['framePositioner'].getBoundingClientRect());
      }
    });
  }

  UI.editableHighlight.forEach((el) => {

    if (!State.results[el.resultID]) {
      State.interaction = true;
      State.forceFullCheck = true;
      UI.editableHighlight = [];
      incrementalCheck(true);
      return false;
    }

    const framePositioner = State.results[el.resultID].fixedRoot && State.positionedFrames[State.results[el.resultID].fixedRoot] ?
      State.positionedFrames[State.results[el.resultID].fixedRoot] : { top: 0, left: 0 };

    let targetOffset = el.target.getBoundingClientRect();
    if (!visible(el.target)) {
      // Invisible target.
      const theVisibleParent = firstVisibleParent(el.target);
      targetOffset = theVisibleParent ? theVisibleParent.getBoundingClientRect() : targetOffset;
    }

    // @todo why is setProperty failing?
    console.log('has set property?')
    console.log(el.highlight);

    el.highlight.style.setProperty('width', targetOffset.width + 6 + 'px');
    el.highlight.style.setProperty('top', targetOffset.top + framePositioner.top + window.scrollY - 3 + 'px');
    el.highlight.style.setProperty('left', targetOffset.left + framePositioner.left - 3 + 'px');
    el.highlight.style.setProperty('height', targetOffset.height + 6 + 'px');
  });
}

const overlap = function(rect1Left, rect1Top, rect2Left, rect2Top, size = 17) {
  // Yes this looks like intersect const, but it's math not browser offsets.
  return !(rect1Left + size < rect2Left ||
    rect1Left > rect2Left + size ||
    rect1Top + size < rect2Top ||
    rect1Top > rect2Top + size);
};

// Applies parameters and avoids other widgets.
export function alignPanel() {
  if (!UI.panelElement) {
    return false;
  }
  if (State.options.panelPinTo === 'left') {
    UI.panel.classList.add('ed11y-pin-left');
  }
  let xMost = 0;
  let yMost = 0;
  if (State.elements.panelPin) { // todo
    State.elements.panelPin.forEach(el => {
      let bounds = el.getBoundingClientRect();
      if (State.options.panelPinTo === 'right') {
        xMost = window.innerWidth - bounds.left > xMost && bounds.left > window.innerWidth / 3 ? window.innerWidth - bounds.left : xMost;
      } else {
        xMost = bounds.right > xMost && xMost + bounds.right < window.innerWidth / 3 ? xMost + bounds.right : xMost;
      }
      yMost = bounds.height > yMost && bounds.height + yMost < window.innerHeight / 2 ? yMost + bounds.height : yMost;
    });
  }
  if (xMost > 0 && xMost < window.innerWidth - 240) {
    // push off horizontal
    UI.panelElement.style.setProperty(State.options.panelPinTo, xMost + 10 + 'px');
    UI.panelElement.style.setProperty('bottom', State.options.panelOffsetY);
  } else if (xMost > 0 && xMost > window.innerWidth - 240 && yMost > 0) {
    // push off vertical
    UI.panelElement.style.setProperty(State.options.panelPinTo, State.options.panelOffsetX);
    UI.panelElement.style.setProperty('bottom', `calc(${State.options.panelOffsetY} + ${yMost}px)`);
  } else {
    // no push
    UI.panelElement.style.setProperty(State.options.panelPinTo, State.options.panelOffsetX);
    UI.panelElement.style.setProperty('bottom', State.options.panelOffsetY);
  }
}
