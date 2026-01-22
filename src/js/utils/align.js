import { firstVisibleParent, visible } from './utils.js';
import { State, UI } from './state.js';
import { Options } from './options.js';
import Elements from '../../sa11y-js/utils/elements.js';

export const intersect = (a, b, x = 10) => {
  // Compute intersect using browser offsets.
  return (
    a.left - x <= b.right && b.left - x <= a.right && a.top - x <= b.bottom && b.top - x <= a.bottom
  );
};

export const overlap = (rect1Left, rect1Top, rect2Left, rect2Top, size = 17) => {
  // Yes this looks like intersect const, but it's math not browser offsets.
  return !(
    rect1Left + size < rect2Left ||
    rect1Left > rect2Left + size ||
    rect1Top + size < rect2Top ||
    rect1Top > rect2Top + size
  );
};

export const nudgeMark = (el, x, y) => {
  // todo: these can get nudged out of an editable area.
  // todo postone: draggable marks.
  if (el.style.transform) {
    const computedStyle = window.getComputedStyle(el);
    let matrix = computedStyle.getPropertyValue('transform');
    matrix = matrix.split(',');
    el.style.transform = `translate(${parseFloat(matrix[4]) + x}px, ${parseFloat(matrix[5]) + y}px)`;
  } else {
    el.style.transform = `translate(${x}px, ${y}px)`;
  }
};

export const scrollableElem = (el) => {
  let overflowing = el.clientHeight && el.clientHeight < el.scrollHeight;
  if (overflowing) {
    const styles = window.getComputedStyle(el);
    overflowing = styles.overflowY !== 'visible';
  }
  return overflowing;
};

export function closestScrollable(el) {
  if (Options.constrainButtons && el.closest(Options.constrainButtons)) {
    return el.closest(Options.constrainButtons);
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

// Applies parameters and avoids other widgets.
export function alignPanel() {
  if (!UI.panelElement) {
    return false;
  }
  if (Options.panelPosition === 'left') {
    UI.panel.classList.add('ed11y-pin-left');
  }
  let xMost = 0;
  let yMost = 0;
  if (Elements.Found.panelNoCover) {
    Elements.Found.panelNoCover.forEach((el) => {
      const bounds = el.getBoundingClientRect();
      if (Options.panelPosition === 'right') {
        xMost =
          window.innerWidth - bounds.left > xMost && bounds.left > window.innerWidth / 3
            ? window.innerWidth - bounds.left
            : xMost;
      } else {
        xMost =
          bounds.right > xMost && xMost + bounds.right < window.innerWidth / 3
            ? xMost + bounds.right
            : xMost;
      }
      yMost =
        bounds.height > yMost && bounds.height + yMost < window.innerHeight / 2
          ? yMost + bounds.height
          : yMost;
    });
  }
  if (xMost > 0 && xMost < window.innerWidth - 240) {
    // push off horizontal
    UI.panelElement.style.setProperty(Options.panelPosition, `${xMost + 10}px`);
    UI.panelElement.style.setProperty('bottom', Options.panelOffsetY);
  } else if (xMost > 0 && xMost > window.innerWidth - 240 && yMost > 0) {
    // push off vertical
    UI.panelElement.style.setProperty(Options.panelPosition, Options.panelOffsetX);
    UI.panelElement.style.setProperty('bottom', `calc(${Options.panelOffsetY} + ${yMost}px)`);
  } else {
    // no push
    UI.panelElement.style.setProperty(Options.panelPosition, Options.panelOffsetX);
    UI.panelElement.style.setProperty('bottom', Options.panelOffsetY);
  }
}

export function alignAlts() {
  // Positions alt label to match absolute, inline or floated images.
  UI.imageAlts?.forEach((mark) => {
    if (!mark.mark) {
      return;
    }
    const el = mark.mark;
    el.style.setProperty('transform', null);
    el.style.setProperty('height', null);
    el.style.setProperty('width', null);

    let img = mark.element;
    if (img.tagName !== 'IMG') {
      // Mark is placed outside the link in linked images.
      img = img.querySelector('img');
    }
    const markOffset = el.getBoundingClientRect();
    const imgOffset = img.getBoundingClientRect();
    const newOffset = imgOffset.left - markOffset.left;
    let height = getComputedStyle(img).height;
    height =
      height === 'auto' ? img.offsetHeight : Math.max(img.offsetHeight, parseInt(height, 10));
    el.style.setProperty('transform', `translate(${newOffset}px, 0px)`);
    el.style.setProperty('height', `${height}px`);
    el.style.setProperty('width', `${img.offsetWidth}px`);
  });
}

/**
 * Hide tips that are in front of text currently being edited.
 * */
export function checkEditableIntersects(focusKnown = false) {
  if (
    !State.activeRange ||
    (!focusKnown && !document.querySelector('[contenteditable]:focus, [contenteditable] :focus'))
  ) {
    // Reset classes to measure.
    State.jumpList?.forEach((el) => {
      if (el.matches('.intersecting')) {
        el.classList.remove('intersecting');
      }
    });
    return;
  }
  const activeRects = State.activeRange.getBoundingClientRect();

  State.jumpList?.forEach((el) => {
    const toggle = el.shadowRoot.querySelector('.toggle');

    const framePositioner =
      el.result.fixedRoot && State.positionedFrames[el.result.fixedRoot]
        ? State.positionedFrames[el.result.fixedRoot]
        : { top: 0, left: 0 };

    const rects = {};
    rects.top = activeRects.top + framePositioner.top;
    rects.left = activeRects.left + framePositioner.left;
    rects.bottom = activeRects.bottom + framePositioner.top;
    rects.right = activeRects.right + framePositioner.left;

    if (
      intersect(rects, el.result.element.getBoundingClientRect(), 0) ||
      intersect(rects, toggle.getBoundingClientRect(), 0)
    ) {
      el.classList.add('intersecting');
      toggle.classList.add('intersecting');
    } else {
      el.classList.remove('intersecting', 'was-intersecting');
      toggle.classList.remove('intersecting', 'was-intersecting');
    }
  });
}

export function alignButtons() {
  if (State.jumpList.length === 0) {
    return;
  }
  State.alignPending = true;

  // Reading and writing in a loop creates paint thrashing.
  // We iterate the array for reads, then iterate for writes.

  if (Options.fixedRoots) {
    State.positionedFrames.length = 0;

    Options.fixedRoots.forEach((root) => {
      if (root.framePositioner) {
        State.positionedFrames.push(root.framePositioner.getBoundingClientRect());
      }
    });
  }

  // Used for crude intersection detection.
  let previousNudgeTop = 0;
  let previousNudgeLeft = 0;
  const scrollTop = window.scrollY;
  if (!State.inlineAlerts) {
    // Compute based on target position.

    for (let i = 0; i < State.jumpList.length; i++) {
      const mark = State.jumpList[i];
      if (!mark.result.element) {
        // @todo 3.x Test to see if edge case still exists.
        console.warn('Editoria11y debug: element disappeared');
        continue;
      }
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
        const theFirstVisibleParent = firstVisibleParent(mark.result.element);
        targetOffset = theFirstVisibleParent
          ? theFirstVisibleParent.getBoundingClientRect()
          : targetOffset;
        top = targetOffset.top + scrollTop;
      }
      let left = targetOffset.left;

      if (mark.result.element.tagName === 'IMG') {
        top = top + 10;
        left = left + 10;
        // Should we do this for TD too?
      } else {
        left = State.inlineAlerts ? left - 34 : left;
      }

      // Add iframe positon to calculated position
      if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
        top = top + State.positionedFrames[mark.result.fixedRoot].top;
        left = left + State.positionedFrames[mark.result.fixedRoot].left;
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
    }
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
      } else {
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
      nudgeTop = -1 * (mark.markTop + scrollTop) - 6;
    }
    if (
      (i > 0 &&
        overlap(
          mark.markLeft,
          mark.markTop,
          State.jumpList[i - 1].markLeft,
          State.jumpList[i - 1].markTop,
        )) ||
      (i > 1 &&
        overlap(
          mark.markLeft,
          mark.markTop,
          State.jumpList[i - 2].markLeft,
          State.jumpList[i - 2].markTop,
        )) ||
      (i > 2 &&
        overlap(
          mark.markLeft,
          mark.markTop,
          State.jumpList[i - 3].markLeft,
          State.jumpList[i - 3].markTop,
        ))
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
    } else if (mark.markLeft + nudgeLeft + 80 > constrainRight) {
      needNudge = true;
      // Offscreen to right. push to the left
      nudgeLeft = constrainRight - nudgeLeft - mark.markLeft - 100;
    } else if (nudgeTop !== 0) {
      needNudge = true;
    }
    if (!State.inlineAlerts) {
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
  if (!State.inlineAlerts) {
    // Alerts have to be positioned relative to viewport.
    State.jumpList.forEach((mark) => {
      if (mark.result.scrollableParent) {
        // Hide alerts outside a scroll zone.
        if (
          !!mark.bounds &&
          (mark.targetOffset.top - mark.bounds.top < 0 ||
            mark.targetOffset.top - mark.bounds.bottom > 0) &&
          !mark.matches(':focus, :focus-within, [data-ed11y-open="true"]')
        ) {
          // Tip has exited scrollable parent. Visually hide.
          mark.classList.add('ed11y-offscreen');
          mark.style.transform = 'translate(0px, -50px)';
          mark.style.pointerEvents = 'none';
          if (mark.getAttribute('data-ed11y-open') === 'true') {
            mark.setAttribute('data-ed11y-action', 'shut');
          }
        } else {
          mark.classList.remove('ed11y-offscreen');
          mark.style.pointerEvents = 'auto';
        }
      } else if (mark.result.fixedRoot && State.positionedFrames[mark.result.fixedRoot]) {
        if (
          !!mark.bounds &&
          (mark.targetOffset.top < -40 ||
            mark.targetOffset.top + mark.bounds.top - mark.bounds.bottom > -10) &&
          !mark.matches(':focus, :focus-within, [data-ed11y-open="true"]')
        ) {
          // Tip has exited scrollable parent. Visually hide.
          mark.classList.add('ed11y-offscreen');
          mark.style.transform = 'translate(0px, -50px)';
          mark.style.pointerEvents = 'none';
          if (mark.getAttribute('data-ed11y-open') === 'true') {
            mark.setAttribute('data-ed11y-action', 'shut');
          }
        } else {
          mark.classList.remove('ed11y-offscreen');
          mark.style.pointerEvents = 'auto';
        }
      } else {
        mark.classList.remove('ed11y-offscreen');
        mark.style.pointerEvents = 'auto';
      }
    });
  }
  window.setTimeout(() => {
    State.jumpList?.forEach((mark) => {
      // Now make visible.
      // todo: Edge still flickers on redraw.
      mark.classList.remove('ed11y-preload');
    });
  }, 0);
}
