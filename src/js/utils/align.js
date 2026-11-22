import { firstVisibleParent, visible } from './utils.js';
import Elements from '../../sa11y-js/utils/elements.js';
import { UI } from '../core/ui.js';
import { State } from '../../sa11y-js/core/state.js';
import { incrementalCheckDebounce } from '../core/run.js';

// How long a result button whose target cannot be measured keeps its last
// position before it is hidden. Covers the recheck that usually replaces the
// target (debounce, rulesets, custom tests) without letting a button linger
// over content it no longer belongs to.
const HOLD_MS = 1000;
let holdTimer = 0;

// Keep a mark where it is: not clickable, since its target is gone or
// unmeasurable, and hidden once it has been held for HOLD_MS. Returns true the
// first time a mark is held, when a recheck should be asked for.
function holdMark(mark, now) {
  mark.held = true;
  const first = mark.heldSince === undefined;
  if (first) {
    mark.heldSince = now;
  }
  mark.holdExpired = now - mark.heldSince >= HOLD_MS;
  return first;
}

// Re-run alignButtons when the longest-waiting hold expires, so held marks
// are hidden even if nothing else moves on the page.
function scheduleHoldExpiry() {
  if (holdTimer) {
    return;
  }
  holdTimer = window.setTimeout(() => {
    holdTimer = 0;
    if (!UI.showPanel || !UI.jumpList?.length) {
      return;
    }
    if (UI.running) {
      // The run ends by realigning; check again after it.
      scheduleHoldExpiry();
      return;
    }
    alignButtons();
  }, HOLD_MS);
}

// Visually hide a mark, as when its target has left its scroll zone.
function hideMark(mark) {
  mark.classList.add('ed11y-offscreen');
  mark.style.transform = 'translate(0px, -50px)';
  mark.style.pointerEvents = 'none';
  if (mark.getAttribute('data-ed11y-open') === 'true') {
    mark.setAttribute('data-ed11y-action', 'shut');
  }
}

function showMark(mark) {
  mark.classList.remove('ed11y-offscreen');
  mark.style.pointerEvents = 'auto';
}

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
  if (State.option.constrainButtons && el.closest(State.option.constrainButtons)) {
    return el.closest(State.option.constrainButtons);
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

export function focusLoop(wrapper) {
  const focusLoopLeft = document.createElement('div');
  focusLoopLeft.setAttribute('tabIndex', '0');
  focusLoopLeft.classList.add('focus-looper');
  const focusLoopRight = document.createElement('div');
  focusLoopRight.setAttribute('tabindex', '0');
  focusLoopRight.classList.add('focus-looper');
  wrapper.insertAdjacentElement('afterbegin', focusLoopLeft);
  wrapper.appendChild(focusLoopRight);
  const focusables = wrapper.querySelectorAll('a, button, [tabindex="0"]');
  const count = focusables.length;
  focusables[0].addEventListener('focus', () => {
    focusables[count - 2].focus();
  });
  focusables[count - 1].addEventListener('focus', () => {
    focusables[1].focus();
  });
}

// Applies parameters and avoids other widgets.
export function alignPanel() {
  if (!UI.panel || typeof UI.panel.classList?.add !== 'function') {
    return false;
  }
  if (State.option.panelPosition === 'left') {
    UI.panel.classList.add('ed11y-pin-left');
  }
  let xMost = 0;
  let yMost = 0;
  if (Elements.Found.panelNoCover) {
    Elements.Found.panelNoCover.forEach((el) => {
      const bounds = el.getBoundingClientRect();
      if (State.option.panelPosition === 'right') {
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
    UI.panelElement.style.setProperty(State.option.panelPosition, `${xMost + 10}px`);
    UI.panelElement.style.setProperty('bottom', State.option.panelOffsetY);
  } else if (xMost > 0 && xMost > window.innerWidth - 240 && yMost > 0) {
    // push off vertical
    UI.panelElement.style.setProperty(State.option.panelPosition, State.option.panelOffsetX);
    UI.panelElement.style.setProperty('bottom', `calc(${State.option.panelOffsetY} + ${yMost}px)`);
  } else {
    // no push
    UI.panelElement.style.setProperty(State.option.panelPosition, State.option.panelOffsetX);
    UI.panelElement.style.setProperty('bottom', State.option.panelOffsetY);
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

// Editing focus can live in the main document or inside a cross-document
// fixedRoot (iframe), where the top document's active element is the <iframe>
// itself — so check each relevant document for a focused editable.
function editableFocused() {
  const selector = '[contenteditable]:focus, [contenteditable] :focus';
  if (document.querySelector(selector)) {
    return true;
  }
  if (Array.isArray(State.option.fixedRoots)) {
    return State.option.fixedRoots.some((root) => {
      const doc = root?.ownerDocument;
      return doc && doc !== document && !!doc.querySelector(selector);
    });
  }
  return false;
}

// Convert an iframe-relative rect into main-document viewport coordinates:
// scale it by the frame's zoom, then offset it by the frame's position.
function toMainDocRect(rect, frame) {
  const scale = frame.scale || 1;
  return {
    top: rect.top * scale + frame.top,
    left: rect.left * scale + frame.left,
    bottom: rect.bottom * scale + frame.top,
    right: rect.right * scale + frame.left,
  };
}

const ZERO_FRAME = { top: 0, left: 0, scale: 1 };
export const frameFor = (fixedRoot) =>
  fixedRoot && UI.positionedFrames[fixedRoot] ? UI.positionedFrames[fixedRoot] : ZERO_FRAME;

// The rect of a result's scrollable parent in main-document viewport
// coordinates. A scrollable parent inside a frame reports its rect in the
// frame's own coordinates, which cannot be compared with alert positions.
// Callers must have run updateFixedRootPositions() first.
export function scrollBoundsFor(result) {
  const rect = result.scrollableParent.getBoundingClientRect();
  const frame = frameFor(result.fixedRoot);
  if (frame === ZERO_FRAME) {
    return rect;
  }
  const bounds = toMainDocRect(rect, frame);
  // Nothing inside a frame shows beyond the frame's own edges, so a scroll
  // zone taller than a scrolling frame must not keep alerts visible there.
  if (typeof frame.bottom === 'number') {
    bounds.top = Math.max(bounds.top, frame.top);
    bounds.left = Math.max(bounds.left, frame.left);
    bounds.bottom = Math.min(bounds.bottom, frame.bottom);
    bounds.right = Math.min(bounds.right, frame.right);
  }
  bounds.width = Math.max(0, bounds.right - bounds.left);
  bounds.height = Math.max(0, bounds.bottom - bounds.top);
  return bounds;
}

// Measure a frame positioner: where its content box starts in the viewport,
// and how much its content is scaled. A positioner under a CSS transform
// (e.g. a zoomed page-builder preview) paints at rect.width / offsetWidth of
// the size its inner document reports, so in-frame rects must be multiplied
// by that ratio before they are offset.
function measureFrame(positioner) {
  const rect = positioner.getBoundingClientRect();
  let scale =
    positioner.offsetWidth > 0 && rect.width > 0 ? rect.width / positioner.offsetWidth : 1;
  // offsetWidth is rounded to an integer; ignore sub-pixel noise.
  if (Math.abs(scale - 1) < 0.005) scale = 1;
  // An iframe's document starts inside its border. Other wrappers are only
  // used for their outer position, as before.
  const isFrame = positioner.tagName === 'IFRAME';
  return {
    top: rect.top + (isFrame ? positioner.clientTop * scale : 0),
    left: rect.left + (isFrame ? positioner.clientLeft * scale : 0),
    right: rect.right,
    bottom: rect.bottom,
    scale,
  };
}

// Resolves the alertAttachTo option, an element or a selector for one, to the
// element; false means alerts go to panelAttachTo. Anything unusable is
// reported and ignored rather than left to throw on every run.
export function resolveAlertAttachTo(value) {
  if (!value) {
    return false;
  }
  let container = value;
  if (typeof value === 'string') {
    try {
      container = document.querySelector(value);
    } catch {
      container = null;
    }
  }
  // nodeType rather than instanceof, which fails for elements of other frames.
  if (container?.nodeType !== 1) {
    console.warn(
      typeof value === 'string'
        ? `Editoria11y: alertAttachTo "${value}" matches no element; alerts attach to panelAttachTo instead.`
        : 'Editoria11y: alertAttachTo is not an element; alerts attach to panelAttachTo instead.',
    );
    return false;
  }
  if (container.isConnected && getComputedStyle(container).position === 'static') {
    // Alerts are absolutely positioned; from a static container they would be
    // placed from some other ancestor.
    console.warn(
      'Editoria11y: the alertAttachTo container is not positioned. Give it position: relative (or any value but static), or alerts will be misplaced.',
    );
  }
  return container;
}

// The alertAttachTo container while it is on the page, else null. A page
// builder may re-render and drop it; alerts then fall back to panelAttachTo
// until Ed11y.setAlertAttachTo() is given a new one.
let warnedDetached = false;
function alertAttachTarget() {
  const container = State.option.alertAttachTo;
  if (!container) {
    return null;
  }
  if (container.isConnected) {
    warnedDetached = false;
    return container;
  }
  if (!warnedDetached) {
    warnedDetached = true;
    console.warn(
      'Editoria11y: the alertAttachTo container was removed from the page; alerts attach to panelAttachTo until Ed11y.setAlertAttachTo() is given a new one.',
    );
  }
  return null;
}

// Element that alert buttons and highlights are appended to.
export const alertContainer = () => alertAttachTarget() || UI.panelAttachTo;

// Viewport position of the point that alerts are positioned from. By default
// alerts sit in the body, in document coordinates. With `alertAttachTo` they
// are positioned from that container's padding box, so they scroll and clip
// with it.
export function alertOrigin() {
  const container = alertAttachTarget();
  if (!container) {
    return { top: -window.scrollY, left: 0 };
  }
  const rect = container.getBoundingClientRect();
  return {
    top: rect.top + container.clientTop - container.scrollTop,
    left: rect.left + container.clientLeft - container.scrollLeft,
  };
}

/**
 * Hide tips that are in front of text currently being edited.
 * */
export function checkEditableIntersects(focusKnown = false) {
  if (!UI.activeRange || (!focusKnown && !editableFocused())) {
    // Reset classes to measure.
    UI.jumpList?.forEach((el) => {
      if (el.matches('.intersecting')) {
        el.classList.remove('intersecting');
      }
    });
    return;
  }

  // Refresh frame offsets so cross-document rects convert with current
  // scroll/resize positions (this path can run without alignButtons firing).
  updateFixedRootPositions();

  // Convert the active range to main-document coordinates using the frame the
  // cursor actually lives in, which may differ from any given tip's frame.
  const rangeRect = toMainDocRect(
    UI.activeRange.getBoundingClientRect(),
    frameFor(UI.activeRangeFrame),
  );

  UI.jumpList?.forEach((el) => {
    const toggle = el.shadowRoot.querySelector('.toggle');

    // The flagged element is iframe-relative for fixedRoot results, so offset it
    // by its own frame; the toggle is already positioned in the main document.
    const targetRect = toMainDocRect(
      el.result.element.getBoundingClientRect(),
      frameFor(el.result.fixedRoot),
    );

    if (
      intersect(rangeRect, targetRect, 0) ||
      intersect(rangeRect, toggle.getBoundingClientRect(), 0)
    ) {
      el.classList.add('intersecting');
      toggle.classList.add('intersecting');
    } else {
      el.classList.remove('intersecting', 'was-intersecting');
      toggle.classList.remove('intersecting', 'was-intersecting');
    }
  });
}

// Refresh cached iframe offsets used by positionHighlight (run.js) and
// alignButtons. Called on show, scroll, and resize so the positioning formula
// always reads fresh frame rects. positionedFrames is kept index-parallel to
// State.option.fixedRoots: positionedFrames[i] is the rect of
// framePositioners[i] (or a zero offset when that root has no frame), so a
// result's data-ed11y-root index maps straight to its frame offset.
export function updateFixedRootPositions() {
  UI.positionedFrames.length = 0;
  if (!Array.isArray(State.option.framePositioners)) return;
  State.option.framePositioners.forEach((positioner) => {
    // Push a zero offset for roots without a frame rather than skipping, so the
    // array stays aligned with fixedRoots / data-ed11y-root indices.
    UI.positionedFrames.push(positioner ? measureFrame(positioner) : { top: 0, left: 0, scale: 1 });
  });
}

export function alignButtons() {
  if (UI.jumpList.length === 0) {
    return;
  }

  // Reading and writing in a loop creates paint thrashing.
  // We iterate the array for reads, then iterate for writes.

  updateFixedRootPositions();

  // Used for crude intersection detection.
  let previousNudgeTop = 0;
  let previousNudgeLeft = 0;
  // Positions are computed in viewport coordinates, then written relative to
  // the alert container's origin (the document, unless alertAttachTo is set).
  const attachedTo = UI.inlineAlerts ? null : alertAttachTarget();
  const origin = UI.inlineAlerts ? { top: -window.scrollY, left: 0 } : alertOrigin();
  const scrollTop = -origin.top;
  const now = performance.now();
  // A held mark that has yet to expire; see scheduleHoldExpiry.
  let holding = false;
  let needsRecheck = false;
  UI.jumpList.forEach((mark) => {
    // Held marks sit out the nudge and clipping passes below as well.
    mark.held = false;
  });
  if (!UI.inlineAlerts) {
    // Compute based on target position.

    for (let i = 0; i < UI.jumpList.length; i++) {
      const mark = UI.jumpList[i];
      if (!mark.result.element) {
        // @todo 3.x Test to see if edge case still exists.
        console.warn('Editoria11y debug: element disappeared');
        continue;
      }
      if (!mark.isConnected) {
        // Removed along with its alertAttachTo container. A recheck cannot
        // adopt a detached button, so it draws a new one where alerts go now.
        needsRecheck = true;
      }
      // A target that cannot be measured (removed, or in a document that is
      // hidden as a whole, like a frame being swapped out) is usually about
      // to be replaced by a recheck. A mark that already has a position keeps
      // it until then, since moving or hiding it now would only flicker; see
      // holdMark for how long.
      const placed = typeof mark.markTop === 'number' && typeof mark.markLeft === 'number';
      if (!mark.result.element.isConnected) {
        // Something broke; rebuild jumpList on next loop.
        needsRecheck = true;
        if (placed) {
          holdMark(mark, now);
          holding ||= !mark.holdExpired;
          continue;
        }
        mark.style.display = 'none';
      }
      let targetOffset = mark.result.element.getBoundingClientRect();
      // In-frame rects are in the frame's own pixels; scale to ours.
      const frameScale = frameFor(mark.result.fixedRoot).scale || 1;

      let top = targetOffset.top * frameScale + scrollTop;
      //let rightBound = window.innerWidth;
      if (!visible(mark.result.element)) {
        // Invisible target.
        const theFirstVisibleParent = firstVisibleParent(mark.result.element);
        if (!theFirstVisibleParent && placed) {
          // Ask once per hold: a recheck that finds the same result adopts
          // this mark, and asking again each time would recheck forever.
          if (holdMark(mark, now)) {
            needsRecheck = true;
          }
          holding ||= !mark.holdExpired;
          continue;
        }
        targetOffset = theFirstVisibleParent
          ? theFirstVisibleParent.getBoundingClientRect()
          : targetOffset;
        top = targetOffset.top * frameScale + scrollTop;
      }
      let left = targetOffset.left * frameScale;

      if (mark.result.element.tagName === 'IMG') {
        top = top + 10;
        left = left + 10;
        // Should we do this for TD too?
      } else {
        left = UI.inlineAlerts ? left - 34 : left;
      }

      // Add iframe positon to calculated position
      if (mark.result.fixedRoot && UI.positionedFrames[mark.result.fixedRoot]) {
        top = top + UI.positionedFrames[mark.result.fixedRoot].top;
        left = left + UI.positionedFrames[mark.result.fixedRoot].left;
      }

      if (mark.result.scrollableParent) {
        // Bump alerts that would be X-position out of a scroll zone.
        UI.jumpList[i].bounds = scrollBoundsFor(mark.result);
        if (left < UI.jumpList[i].bounds.left) {
          left = UI.jumpList[i].bounds.left;
        } else if (left + 40 > UI.jumpList[i].bounds.right) {
          left = UI.jumpList[i].bounds.right - 40;
        }
      } else if (mark.result.fixedRoot && UI.positionedFrames[mark.result.fixedRoot]) {
        // Bump alerts that would x-position out of an iframe.
        UI.jumpList[i].bounds = UI.positionedFrames[mark.result.fixedRoot];
        if (left < UI.jumpList[i].bounds.left) {
          left = UI.jumpList[i].bounds.left;
        } else if (left + 40 > UI.jumpList[i].bounds.right) {
          left = UI.jumpList[i].bounds.right - 40;
        }
      }
      UI.jumpList[i].targetOffset = targetOffset;
      UI.jumpList[i].markTop = top;
      UI.jumpList[i].markLeft = left;
      mark.heldSince = undefined;
      mark.holdExpired = false;
    }
  } else {
    // Compute based on self position.

    // Batch read existing transforms before clearing...
    UI.jumpList.forEach((mark) => {
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
    // ...then batch clear old positions...
    UI.jumpList.forEach((mark) => {
      mark.style.setProperty('transform', null);
      mark.style.setProperty('top', 'initial');
      mark.style.setProperty('left', 'initial');
    });
    // ...then batch read new positions.
    UI.jumpList.forEach((mark) => {
      mark.markOffset = mark.getBoundingClientRect();
      mark.markLeft = mark.markOffset.left;
      mark.markTop = mark.markOffset.top;
    });
  }

  // Check for overlaps, then write out transforms.
  UI.jumpList.forEach((mark, i) => {
    if (mark.held) {
      // Leave the transform as it is; neighbours still nudge around it.
      previousNudgeTop = mark.nudgeTop || 0;
      previousNudgeLeft = mark.nudgeLeft || 0;
      return;
    }
    // Now check for any needed nudges
    let nudgeTop = 10;
    let nudgeLeft = mark.result.element.tagName === 'IMG' ? 10 : -34;
    // Detect tip that overlaps with previous result.
    // Not with alertAttachTo: content can legitimately sit above the
    // container's top edge, and the container's own clipping deals with it.
    if (!attachedTo && mark.markTop + scrollTop < 0) {
      // Offscreen to top.
      nudgeTop = -1 * (mark.markTop + scrollTop) - 6;
    }
    if (
      (i > 0 &&
        overlap(
          mark.markLeft,
          mark.markTop,
          UI.jumpList[i - 1].markLeft,
          UI.jumpList[i - 1].markTop,
        )) ||
      (i > 1 &&
        overlap(
          mark.markLeft,
          mark.markTop,
          UI.jumpList[i - 2].markLeft,
          UI.jumpList[i - 2].markTop,
        )) ||
      (i > 2 &&
        overlap(
          mark.markLeft,
          mark.markTop,
          UI.jumpList[i - 3].markLeft,
          UI.jumpList[i - 3].markTop,
        ))
    ) {
      // todo postpone: compute actual overlap? We're bouncing by the full amount no matter what which adds too much gapping.
      nudgeTop = nudgeTop + 14 + previousNudgeTop;
      nudgeLeft = 14 + previousNudgeLeft;
    }

    let constrainLeft = 0;
    let constrainRight = window.innerWidth;

    if (mark.result.scrollableParent) {
      const constrained = scrollBoundsFor(mark.result);
      constrainLeft = constrained.left;
      constrainRight = constrainLeft + constrained.width;
    } else if (mark.result.fixedRoot && UI.positionedFrames[mark.result.fixedRoot]) {
      constrainLeft = UI.positionedFrames[mark.result.fixedRoot].left;
      constrainRight = UI.positionedFrames[mark.result.fixedRoot].right;
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
    if (!UI.inlineAlerts) {
      // markLeft is a viewport position; write it relative to the container.
      const writeLeft = mark.markLeft - origin.left;
      if (needNudge) {
        mark.style.transform = `translate(${writeLeft + nudgeLeft}px, ${mark.markTop + nudgeTop}px)`;
      } else {
        mark.style.transform = `translate(${writeLeft}px, ${mark.markTop}px)`;
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
  if (!UI.inlineAlerts) {
    // Alerts have to be positioned relative to viewport.
    UI.jumpList.forEach((mark) => {
      if (mark.held) {
        if (mark.holdExpired) {
          hideMark(mark);
        } else {
          mark.style.pointerEvents = 'none';
        }
        return;
      }
      const keepShown = () => mark.matches(':focus, :focus-within, [data-ed11y-open="true"]');
      if (mark.result.scrollableParent) {
        // Hide alerts outside a scroll zone. Bounds are in main-document
        // coordinates, so the target has to be as well.
        const targetTop = toMainDocRect(mark.targetOffset, frameFor(mark.result.fixedRoot)).top;
        if (
          !!mark.bounds &&
          (targetTop - mark.bounds.top < 0 || targetTop - mark.bounds.bottom > 0) &&
          !keepShown()
        ) {
          // Tip has exited scrollable parent. Visually hide.
          hideMark(mark);
        } else {
          showMark(mark);
        }
      } else if (mark.result.fixedRoot && UI.positionedFrames[mark.result.fixedRoot]) {
        // Hide alerts whose target has left the frame: more than 40px above
        // its top, or within 10px of its bottom. Both in main-document pixels,
        // since that is what the buttons are sized in.
        const targetTop = mark.bounds
          ? toMainDocRect(mark.targetOffset, mark.bounds).top - mark.bounds.top
          : 0;
        if (
          !!mark.bounds &&
          (targetTop < -40 || targetTop > mark.bounds.bottom - mark.bounds.top - 10) &&
          !keepShown()
        ) {
          hideMark(mark);
        } else {
          showMark(mark);
        }
      } else {
        showMark(mark);
      }
    });
  }
  if (holding) {
    scheduleHoldExpiry();
  }
  if (needsRecheck) {
    UI.forceFullCheck = true;
    UI.interaction = true;
    incrementalCheckDebounce();
  }
  window.setTimeout(() => {
    UI.jumpList?.forEach((mark) => {
      // Now make visible.
      // todo: Edge still flickers on redraw.
      mark.classList.remove('ed11y-preload');
    });
  }, 0);
}
