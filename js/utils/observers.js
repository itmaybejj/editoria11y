import {State, UI} from "./state.js";
import {
  alignAlts,
  alignButtons, alignPanel, alignTip,
  checkEditableIntersects, updateTipLocations
} from "../render/align.js";
import {lagBounce} from "./utils.js";

export function slowIncremental() {
  lagBounce(() => {
    //incrementalAlign(); // Immediately realign tips.
    //State.alignPending = false;
    State.interaction = true;
    incrementalCheck();
  }, 1000);
}

export function windowResize() {
  if (UI.panel?.classList.contains('ed11y-active') === true) {
    alignAlts();
    alignButtons();
  }
  if (State.openTip.button) {
    alignTip(State.openTip.button.shadowRoot.querySelector('button'), State.openTip.tip);
  }
  alignPanel();
}

export function pauseObservers() {
  State.watching?.forEach(observer => {
    observer.observer.disconnect();
  });
}

export function resumeObservers() {
  State.watching?.forEach(observer => {
    observer.observer.observe(observer.root, observer.config);
  });
}

export function intersectionObservers() {

  State.elements.editable?.forEach(editable => {
    editable.addEventListener('scroll', function() {
      // Align tips when scrolling editable container.
      if (State.openTip.button) {
        State.scrollPending = State.scrollPending < 2 ? State.scrollPending + 1 : State.scrollPending;
        requestAnimationFrame(() => updateTipLocations());
      }
    });
  });

  document.addEventListener('scroll', function() {
    // Trigger on scrolling other containers, unless it will flicker a tip.
    if (!State.options.inlineAlerts && !State.openTip.button) {
      State.scrollPending = State.scrollPending < 2 ? State.scrollPending + 1 : State.scrollPending;
      requestAnimationFrame(() => updateTipLocations());
    } else if (State.openTip.button) {
      alignTip(State.openTip.button.shadowRoot.querySelector('button'), State.openTip.tip);
    }
  }, true);

  document.addEventListener('selectionchange', function() {
    if (!State.running) {
      selectionChanged();
    }
  });
}

export function selectionChanged() {
  lagBounce(() => {
    if (rangeChange()) {
      updateTipLocations();
      checkEditableIntersects();
    }
  }, 100);
}

let recentlyAddedNodes = new WeakMap();
export function addedNodeReadyToCheck(el) {
  if (!recentlyAddedNodes.has(el)) {
    return true;
  }
  const hasText = el.textContent.trim().length;
  if ((!hasText && State.recentlyAddedNodes.get(el) > Date.now() - 5000) ||
    State.activeRange && el.contains(State.activeRange.startContainer)) {
    // Do not check recent nodes if they are empty or selected.
    return false;
  } else if (el.matches('table') && el.querySelectorAll('td:not(:empty)')) {
    // Only check tables once there is content in a non-heading cell.
    let cumulativeText = '';
    if (hasText) {
      const cells = el.querySelectorAll('td:not(:empty)');
      cells.forEach((cell) => {
        cumulativeText += cell.textContent;
      });
    }
    if (!cumulativeText) {
      return false;
    } else {
      // Text in body cells.
      recentlyAddedNodes.delete(el);
      return true;
    }
  } else {
    // New node is ready for checking.
    recentlyAddedNodes.delete(el);
    return true;
  }
}

export function rangeChange(anchorNode) {
  let anchor = anchorNode ? anchorNode : window.getSelection()?.anchorNode;
  const expandable = anchor &&
    anchor.parentNode &&
    typeof anchor.parentNode === 'object' &&
    typeof anchor.parentNode.matches === 'function';
  if (!anchor || expandable &&
    ( anchor.parentNode.matches(State.options.checkRoots) ||
      ( !anchor.parentNode.matches(State.options.checkRoots) && anchor.parentNode.matches('div[contenteditable="true"]')
      )
    )
  ) {
    State.activeRange = false;
    return false;
  }
  // todo: this if is probably redundant?
  if (expandable) {
    const closest = anchor.parentNode.closest('p, td, th, li, h2, h3, h4, h5, h6');
    if (closest) {
      anchor = closest;
    }
  }
  const range = document.createRange();
  if (typeof anchor === 'object') {
    range.setStartBefore(anchor);
    range.setEndAfter(anchor);
  }
  if (typeof range !== 'object' || typeof range.getBoundingClientRect !== 'function') {
    if (State.activeRange) {
      State.activeRange = false;
      return true;
    } else {
      return false;
    }
  } else {
    let sameRange = State.activeRange &&
      range.startContainer === State.activeRange.startContainer &&
      range.startOffset === State.activeRange.startOffset;
    State.activeRange = range;
    return !sameRange;
  }
}

/*
Set up mutation observer for added nodes.
*/
export function startObserver (root) {

  // We don't want to nest or duplicate observers.
  if (typeof root.closest === 'function') {
    // It's a normal tag.
    if (root.closest('[data-editoria11y-observer]')) {
      // We're already being watched.
      return;
    } else {
      root.dataset.editoria11yObserver = 'true';
    }
  } else {
    // Match has DOM traversal issues.
    if (typeof root.host !== 'function' ||
      root.host.dataset.editoria11yObserver !== undefined) {
      // Already watching or something is weird.
      return;
    } else {
      // Observe host instead.
      root.host.dataset.editoria11yObserver = 'true';
    }
  }

  // Options for the observer (which mutations to observe)
  const config = { childList: true, subtree: true, characterData: true };

  const logNode = function (node) {
    /*
    * Newly inserted tables and headings should not be flagged as empty
    * before the user has a chance to edit them. This is crude, but it
    * delays flagging.
    * */
    if (!node || node.nodeType !== 1 || !node.isConnected || node.closest('script, link, head, .ed11y-wrapper, .ed11y-style, .ed11y-element')) {
      return 0;
    }
    if (State.options.inlineAlerts) {
      return 1;
    }
    if (!node.matches('[contenteditable] *')) {
      return 0;
    }
    if (State.options.inlineAlerts) {
      return true;
    }
    const searchList = 'table, h1, h2, h3, h4, h5, h6, blockquote';
    if (!State.options.inlineAlerts &&
      !node.matches(node.matches(searchList)) &&
      node.matches('[contenteditable] *')) {
      if (node.matches('table *')) {
        node = node.closest('table');
      } else if (!node.matches(searchList)) {
        node = node.querySelector(searchList);
      }
    }
    if (node && node.matches(searchList)) {
      State.recentlyAddedNodes.set(node, Date.now());
      incrementalAlign(); // Immediately realign tips.
      return 0;
    }
    return 1;
  };

  // Create an observer instance linked to the callback function
  const callback = (mutationList) => {
    let align = 0;
    for (const mutation of mutationList) {
      if (mutation.type === 'characterData' &&
        mutation.target.parentElement &&
        mutation.target.parentElement.matches('[contenteditable] *')) {
        incrementalAlign();
        slowIncremental();
        return;
      } else if (mutation.type === 'childList') {
        // Recheck if there are relevant node changes.
        if (mutation.removedNodes.length > 0) {
          align += 1;
        } else if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            align += logNode(node);
          });
        }
      }
    }
    // These are debounced
    if (!align) {
      return;
    }
    window.setTimeout(function () {
      incrementalAlign(); // Immediately realign tips.
      State.alignPending = false;
      incrementalCheck(); // Recheck after delay.
    },0);
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);
  // Start observing the target node for configured mutations
  observer.observe(root, config);
  State.watching.push({
    observer: observer,
    root: root,
    config: config,
  });
  document.addEventListener('readystatechange', () => {
    window.setTimeout(function () {
      State.scrollPending++;
      updateTipLocations();
    }, 100);
  });
  window.setTimeout(function () {
    State.scrollPending++;
    updateTipLocations();
  }, 1000);
}
