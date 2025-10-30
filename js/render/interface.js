import {M, State, Theme, UI} from "../utils/state.js";
import {alignButtons, alignPanel, closestScrollable} from "./align.js";
import * as Util from "../utils/utils.js";
import {
  checkEditableIntersects, incrementalCheck,
  intersectionObservers,
  pauseObservers, resumeObservers, startObserver
} from "../utils/observers.js";
import {computeText, findElements, jumpTo, resetClass} from "../utils/utils.js";
import {checkAll, countAlerts} from "../utils/check.js";
import {visualize} from "./visualizers.js";

export function updatePanel () {

  pauseObservers();
  // Stash old values for incremental updates.
  countAlerts();
  if (State.incremental) {
    // Check for a change in the result counts.
    if (State.forceFullCheck || newIncrementalResults()) {
      State.forceFullCheck = false;
      /*if (State.options.alertMode === 'assertive' && State.totalCount > 0 && (State.warningCount > oldWarnings || State.errorCount > oldErrors)) {
        console.warn('forced open');
        State.showPanel = true;
      }*/
      resetResults(true);
    } else {
      // Todo: commented out in 2.3.11:
      // Reconnect map
      State.results = State.oldResults;
      window.setTimeout(function() {
        if ( !State.alignPending ) {
          alignButtons();
          alignPanel();
          State.alignPending = false;
        }
        State.running = false;
      },0);
      resumeObservers();
      return;
    }
  } else {
    if (State.totalCount > 0) {
      // Record what has been seen at this route.
      // We do not do this on incremental updates.
      // Todo question: should we not do this at all for contentEditable?
      State.seen[encodeURI(State.options.currentPage)] = State.totalCount;
      localStorage.setItem('editoria11yResultCount', JSON.stringify(State.seen));
    } else {
      delete State.seen[encodeURI(State.options.currentPage)];
    }
  }

  if (State.options.alertMode !== 'headless') {
    // Not headless; draw the interface.

    if (!State.bodyStyle) {
      paintReady();
    }

    if (State.onLoad === true) {
      State.onLoad = false;

      if (!State.options.inlineAlerts) {
        // todo move to incremental check or timeout; no need to do on load.
        State.oldResultString = `${State.errorCount} ${State.warningCount}`;
        State.results.forEach(result => {
          State.oldResultString += result.test + result.element.outerHTML;
        });
      }

      // Create the panel DOM on load.

      UI.panelElement = document.createElement('ed11y-element-panel');
      UI.panelElement.classList.add('ed11y-preload');
      document.body.appendChild(UI.panelElement);
      UI.panel = UI.panelElement.shadowRoot.getElementById('ed11y-panel');
      UI.attachCSS(UI.panel);
      UI.panelToggle = UI.panel.querySelector('#ed11y-toggle');
      UI.panelToggleTitle = UI.panel.querySelector('#ed11y-toggle .ed11y-sr-only');
      UI.panelCount = UI.panel.querySelector('.toggle-count');
      UI.panelJumpNext = UI.panel.querySelector('.ed11y-jump.next');
      UI.panelJumpNext.addEventListener('click', jumpTo);
      UI.showDismissed = UI.panel.querySelector('#ed11y-show-hidden');
      UI.message = UI.panel.querySelector('#ed11y-message');
      window.setTimeout(()=> {
        UI.panelElement.classList.remove('ed11y-preload');
      },0, UI.panel);
      UI.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = M.buttonToolsContent;
      UI.panel.querySelector('#ed11y-headings-tab .summary-title').textContent = M.buttonOutlineContent;
      UI.panel.querySelector('#ed11y-headings-tab .details-title').innerHTML = M.panelCheckOutline;
      UI.panel.querySelector('#ed11y-alts-tab .summary-title').textContent = M.buttonAltsContent;
      UI.panel.querySelector('#ed11y-alts-tab .details-title').innerHTML = M.panelCheckAltText;
      UI.panel.querySelector('.jump-next.ed11y-sr-only').textContent = M.buttonFirstContent;

      UI.panel.setAttribute('aria-label', M.panelControls);
      if (State.options.reportsURL) {
        let reportLink = document.createElement('a');
        reportLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96C0 61 29 32 64 32l384 0c35 0 64 29 64 64l0 320c0 35-29 64-64 64L64 480c-35 0-64-29-64-64L0 96zm64 0l0 64 64 0 0-64L64 96zm384 0L192 96l0 64 256 0 0-64zM64 224l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64zM64 352l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64z"/></svg><span class="ed11y-sr-only"></span>';
        reportLink.setAttribute('id' , 'ed11y-reports-link');
        reportLink.setAttribute('href', State.options.reportsURL);
        reportLink.setAttribute('target', '_blank');
        reportLink.setAttribute('aria-label', M.reportsLink);
        reportLink.querySelector('.ed11y-sr-only').textContent = M.reportsLink;
        UI.showDismissed.insertAdjacentElement('beforebegin', reportLink);
      }


      // Decide whether to open the panel on load.
      if (State.ignoreAll ||
        (!State.options.inlineAlerts && State.totalCount > 75)
      ) {
        State.showPanel = false;
      } else if (State.options.alertMode === 'active' ||
        !State.options.userPrefersShut ||
        State.options.showDismissed
      ) {
        // Show always on load for active mode or by user preference.
        State.showPanel = true;
      } else if (
        State.totalCount > 0 &&
        !State.ignoreAll &&
        ( State.options.alertMode === 'assertive' ||
          State.options.alertMode === 'polite' &&
          State.seen[encodeURI(State.options.currentPage)] !== State.totalCount
        )
      ) {
        // Show sometimes for assertive/polite if there are new items.
        State.showPanel = true;
      }
    }

    // Now we can open or close the panel.
    if (!State.showPanel) {
      // Close panel.
      reset();
    } else {
      // Ignore issue count if this resulted from a user action.

      State.open = true;
      UI.panel.classList.remove('ed11y-shut');
      UI.panel.classList.add('ed11y-active');
      UI.panelToggle.setAttribute('aria-expanded', 'true');
      UI.panelToggleTitle.textContent = State.totalCount > 0 ? M.buttonHideAlerts : M.buttonHideChecker;
      // Prepare show hidden alerts button.
      if (State.dismissedCount === 0) {
        // Reset show hidden default option when irrelevant.
        UI.showDismissed.setAttribute('hidden', '');
        UI.showDismissed.setAttribute('data-ed11y-pressed', 'false');
        State.options.showDismissed = false;
      } else if (State.dismissedCount === 1) {
        UI.showDismissed.querySelector('.ed11y-sr-only').textContent = State.options.showDismissed ? M.buttonHideHiddenAlert : M.buttonShowHiddenAlert;
        UI.showDismissed.dataset.ed11yPressed = `${State.options.showDismissed}`;
        UI.showDismissed.removeAttribute('hidden');
      } else {
        UI.showDismissed.querySelector('.ed11y-sr-only').textContent = State.options.showDismissed ? M.buttonHideHiddenAlerts(State.dismissedCount) : M.buttonShowHiddenAlerts(State.dismissedCount);
        UI.showDismissed.dataset.ed11yPressed = `${State.options.showDismissed}`;
        UI.showDismissed.removeAttribute('hidden');
      }

      window.setTimeout(function () {
        if (!State.ignoreAll) {
          requestAnimationFrame(() => showResults());
        }
      }, 0);
    }
    // Update buttons.
    if (State.totalCount > 0 || (State.options.showDismissed && State.dismissedCount > 0)) {
      UI.panelToggleTitle.textContent = State.open ? M.buttonHideAlerts : M.buttonShowAlerts;
      UI.panelJumpNext.removeAttribute('hidden');
      if (State.errorCount > 0) {
        // Errors
        UI.panel.classList.remove('ed11y-warnings', 'ed11y-pass');
        UI.panel.classList.add('ed11y-errors');
        document.documentElement.style.setProperty('--ed11y-activeBackground', Theme.alert);
        document.documentElement.style.setProperty('--ed11y-activeColor', '#fff');
        document.documentElement.style.setProperty('--ed11y-activeBorder', '#fff7');
        document.documentElement.style.setProperty('--ed11y-activePanelBorder', '#def');
      }
      else if (State.warningCount > 0) {
        // Warnings
        UI.panel.classList.remove('ed11y-errors', 'ed11y-pass');
        UI.panel.classList.add('ed11y-warnings');
        document.documentElement.style.setProperty('--ed11y-activeBackground', Theme.warning);
        document.documentElement.style.setProperty('--ed11y-activeColor', '#111');
        document.documentElement.style.setProperty('--ed11y-activeBorder', '#947605');
        document.documentElement.style.setProperty('--ed11y-activePanelBorder', '#947605');
      } else {
        // Issues present but dismissed.
        UI.panel.classList.remove('ed11y-errors', 'ed11y-warnings');
        UI.panel.classList.add('ed11y-pass');
        document.documentElement.style.setProperty('--ed11y-activeBackground', Theme.panelBar);
        document.documentElement.style.setProperty('--ed11y-activeColor', Theme.panelBarText);
        document.documentElement.style.setProperty('--ed11y-activeBorder', Theme.panelBarText + '44');
        document.documentElement.style.setProperty('--ed11y-activePanelBorder', Theme.panelBarText + '88');
      }
      // todo postpone: aria alert on load?
      /*window.setTimeout(function () {
        //announce.textContent = text;
      }, 1500);*/
      if (State.dismissedCount > 0 && State.totalCount === 0) {
        UI.panelCount.textContent = State.dismissedCount;
      } else {
        UI.panelCount.textContent = State.totalCount > 99 ? '99+' : State.totalCount;
      }
    } else {
      UI.panelJumpNext.setAttribute('hidden', '');
      document.documentElement.style.setProperty('--ed11y-activeBackground', Theme.panelBar);
      document.documentElement.style.setProperty('--ed11y-activeColor', Theme.panelBarText);
      document.documentElement.style.setProperty('--ed11y-activeBorder', Theme.panelBarText + '44');
      document.documentElement.style.setProperty('--ed11y-activePanelBorder', Theme.panelBarText + '88');

      UI.panelCount.style.display = 'display: none;';
      UI.panel.classList.remove('ed11y-warnings', 'ed11y-errors');
      UI.panel.classList.add('ed11y-pass');

      if (State.dismissedCount > 0) {
        UI.panelCount.textContent = 'i';
        if (State.open) {
          UI.panelToggleTitle.textContent = M.buttonHideChecker;
        } else {
          UI.panelToggleTitle.textContent = State.dismissedCount > 1 ?
            M.buttonShowHiddenAlerts(State.dismissedCount) :
            M.buttonShowHiddenAlert;
        }
      } else {
        // todo 3.x: move these inline and just change the class.
        UI.panelToggleTitle.textContent = State.open ? M.buttonHideChecker : M.buttonShowNoAlert;
      }
    }
    UI.panelToggle.classList.remove('disabled');
    UI.panelToggle.removeAttribute('aria-disabled');
    alignPanel();
    UI.panel.classList.remove('ed11y-preload');
  }

  window.setTimeout(() => {
    if (State.options.watchForChanges) {
      State.elements.editable?.forEach(editable => {
        if (!editable.matches('.drag-observe')) {
          editable.classList.add('drag-observe');
          editable.addEventListener('drop', () => {
            // This event does not bubble.
            State.forceFullCheck = true;
            incrementalCheck();
          });
        }
      });
      if (State.options.watchForChanges === 'checkRoots') {
        State.roots?.forEach((root) => {
          startObserver( root );
        });
      } else {
        startObserver( document.body );
      }
      resumeObservers(); // on recheck.
    }
  }, 0);

  resumeObservers();
  State.running = false;
};

export function showResults () {
  buildJumpList();
  // Announce that buttons have been placed.
  document.dispatchEvent(new CustomEvent('ed11yPanelOpened'));
  alignButtons();
  if (!State.options.inlineAlerts) {
    checkEditableIntersects();
    intersectionObservers();
  }
};

// Place markers on elements with issues
export function drawResult(result, index) {
  /* old array to new object map:
    // [0] element
    // [1] test
    // [2] content
    // [3] position
    // [4] dismissalKey
    // [5] dismissalStatus
    */
  let mark = document.createElement('ed11y-element-result');
  mark.classList.add('ed11y-element');
  let location;
  let position = 'beforebegin';
  mark.setAttribute('id', 'ed11y-result-' + index);
  mark.setAttribute('data-ed11y-result', index);
  mark.setAttribute('data-ed11y-open', 'false');
  if (!State.options.inlineAlerts) {
    location = State.panelAttachTo;
    position = 'beforeend';
    mark.classList.add('ed11y-editable-result');
  } else {
    location = result.element.closest('a, button, [role="button"], [role="link"]');
    if (!location && result.element.shadowRoot) {
      // Must insert outside shadow DOM root.
      location = result.element;
      position = 'beforebegin';
      while (location.parentElement && location.parentElement.shadowRoot) {
        location = location.parentElement;
      }
    }
    if (!location) {
      location = result.element;
      position = result.position;
    }
  }
  location.insertAdjacentElement(position, mark);

  const shadow = mark.attachShadow({ mode: 'open' });

  // Create mark.wrapper with type class
  mark.resultID = mark.dataset.ed11yResult;
  mark.result = State.results[mark.resultID];

  mark.wrapper = document.createElement('div');

  mark.dismissable = mark.result.dismissalKey !== false;
  mark.dismissed = !!mark.result.dismissalStatus;
  mark.wrapper.classList.add('ed11y-wrapper', 'ed11y-result-wrapper');
  mark.wrapper.classList.add('ed11y-result');

  // Create tooltip toggle
  // @todo abstract out.
  mark.toggle = document.createElement('button');
  mark.toggle.setAttribute('class', 'toggle');
  let label = mark.dismissable ? M.toggleManualCheck : M.toggleAlert;
  mark.toggle.setAttribute('aria-label', M.toggleAriaLabel(label));
  mark.toggle.setAttribute('aria-expanded', 'false');
  mark.toggle.setAttribute('aria-haspopup', 'dialog');
  mark.toggle.setAttribute('data-ed11y-result', mark.dataset.ed11yResult);
  mark.toggle.setAttribute('data-ed11y-ready', 'false');
  mark.toggle.setAttribute('data-ed11y-race', 'false');
  if (!State.options.inlineAlerts) {
    mark.toggle.style.setProperty('font-size', '16px');
  }
  if (mark.dismissed) {
    mark.toggle.innerHTML = '<svg aria-hidden="true" width="10" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="Currentcolor" d="M39 5C28-3 13-1 5 9S-1 35 9 43l592 464c10 8 26 6 34-4s6-26-4-34L526 387c39-41 66-86 78-118c3-8 3-17 0-25c-15-36-46-88-93-131C466 69 401 32 320 32c-68 0-125 26-169 61L39 5zM223 150C249 126 283 112 320 112c80 0 144 65 144 144c0 25-6 48-17 69L408 295c8-19 11-41 5-63c-11-42-48-69-89-71c-6-0-9 6-7 12c2 6 3 13 3 20c0 10-2 20-7 28l-90-71zM373 390c-16 7-34 10-53 10c-80 0-144-65-144-144c0-7 1-14 1-20L83 162C60 191 44 221 35 244c-3 8-3 17 0 25c15 36 46 86 93 131C175 443 239 480 320 480c47 0 89-13 126-33L373 390z"/></svg>';
    mark.toggle.classList.add('dismissed');
    if (mark.result.dismissalStatus !== 'ok') {
      mark.toggle.classList.add('notok');
    } else {
      mark.toggle.classList.add('ok');
    }
  } else if (mark.dismissable) {
    mark.toggle.classList.add('dismissable');
  }
  mark.wrapper.appendChild(mark.toggle);
  mark.toggle.addEventListener('click', mark.toggleClick);
  mark.toggle.addEventListener('focus', mark.handleFocus);
  mark.toggle.addEventListener('mouseover', mark.handleHover);
  mark.tipNeedsBuild = true;

  UI.attachCSS(mark.wrapper);

  shadow.appendChild(mark.wrapper);

  State.jumpList.unshift(mark);
  State.results[index].toggle = mark;
};


export function buildJumpList () {

  State.jumpList = [];
  pauseObservers();

  // Initial alignment to get approximate Y position order for jump list.
  State.results.forEach((result, i) => {

    let top = result.element.getBoundingClientRect().top;
    if (!top) {
      const visibleParent = Util.firstVisibleParent(result.element);
      if (visibleParent) {
        top = visibleParent.getBoundingClientRect().top;
      }
    }
    top = top + window.scrollY;
    if (State.options.fixedRoots) {
      const root = result.element.closest('[data-ed11y-root]');
      // Todo: it might be faster to associate this with the element finder.
      State.results[i].fixedRoot = root.dataset.ed11yRoot;
    }
    State.results[i].scrollableParent = closestScrollable(result.element);
    if (State.results[i].scrollableParent) {
      // Group these together.
      top = top * 0.000001;
    }
    State.results[i].sortPos = top;
  });
  // Sort from bottom to top so focus order after insert is top to bottom.
  State.results.sort((a, b) => b.sortPos - a.sortPos);

  State.results?.forEach(function (result, i) {
    if (!State.results[i].dismissalStatus || State.options.showDismissed) {
      drawResult(result, i);
    }
  });
  State.jumpList.forEach((el, i) => {
    el.dataset.ed11yJumpPosition = `${i}`;
    const newLabel = `${el.shadowRoot.querySelector('.toggle').getAttribute('aria-label')}, ${i + 1} / ${State.jumpList.length - 1}`;
    el.shadowRoot.querySelector('.toggle').setAttribute('aria-label', newLabel);
  });
  let tipsPainted = new CustomEvent('ed11yResultsPainted');
  document.dispatchEvent(tipsPainted);
  resumeObservers();
}

export function dismissalKey (text) {
  return String(text).replace(/([^0-9a-zA-Z])/g, '').substring(0, 512);
};

const dismissOne = function(dismissalType, test, dismissalKey) {

  // Update dismissal record.
  if (dismissalType === 'reset') {
    delete State.dismissedAlerts[State.options.currentPage][test][dismissalKey];
    if (Object.keys(State.dismissedAlerts[State.options.currentPage][test]).length === 0) {
      delete State.dismissedAlerts[State.options.currentPage][test];
    }
    if (Object.keys(State.dismissedAlerts[State.options.currentPage]).length === 0) {
      delete State.dismissedAlerts[State.options.currentPage];
    }
    //window.requestAnimationFrame(() => updatePanel());
  } else {
    let dismissal = {};
    dismissal[dismissalKey] = dismissalType;
    if (typeof State.dismissedAlerts[State.options.currentPage] == 'undefined') {
      let store = {};
      store[test] = dismissal;
      State.dismissedAlerts[State.options.currentPage] = store;
    } else if (typeof State.dismissedAlerts[State.options.currentPage][test] === 'undefined') {
      State.dismissedAlerts[State.options.currentPage][test] = dismissal;
    } else {
      State.dismissedAlerts[State.options.currentPage][test][dismissalKey] = dismissalType;
    }
    UI.showDismissed.removeAttribute('hidden');
  }

  // Send record to storage or dispatch an event to an API.
  if (State.options.syncedDismissals === false) {
    localStorage.setItem('ed11ydismissed', JSON.stringify(State.dismissedAlerts));
  }
  let dismissalDetail = {
    dismissPage: State.options.currentPage,
    dismissTest: test,
    dismissKey: dismissalKey,
    dismissAction: dismissalType,
  };
  let ed11yDismissalUpdate = new CustomEvent('ed11yDismissalUpdate', { detail: dismissalDetail });
  window.setTimeout(() => {
    document.dispatchEvent(ed11yDismissalUpdate);
  },100);
};

export function dismissThis (dismissalType, all = false) {
  // Find the active tip and draw its identifying information from the result list
  let removal = State.openTip;
  let id = removal.tip.dataset.ed11yResult;
  let test = State.results[id].test;

  if (all) {
    State.results.forEach((result) => {
      if (result.test === test && result.dismissalStatus !==dismissalType) {
        dismissOne(dismissalType, test, result.dismissalKey);
      }
    });
  } else {
    let dismissalKey = dismissalKey(State.results[id].dismissalKey);
    dismissOne(dismissalType, test, dismissalKey);
  }

  // Remove tip and reset borders around element
  resetClass(['ed11y-hidden-highlight', 'ed11y-ring-red', 'ed11y-ring-yellow']);
  removal.tip?.parentNode?.removeChild(removal.tip);
  // TODO EDITING: COMMENT OUT BELOW...SEEMS REDUNDANT?
  //removal.button?.parentNode?.removeChild(removal.button);

  reset();
  State.showPanel = true;
  checkAll();

  let rememberGoto = State.lastOpenTip;

  window.setTimeout(function () {
    if (State.jumpList.length > 0) {
      State.lastOpenTip = (rememberGoto - 1);
      UI.panelJumpNext?.focus();
    } else {
      window.setTimeout(function () {
        UI.panelToggle?.focus();
      }, 100);
    }
  }, 500, rememberGoto);

};

export function toggleShowDismissals () {
  // todo postpone: if user has allowHide but not allowOK or vice versa, this temporarily clears both.
  State.ignoreAll = false;
  State.options.showDismissed = !(State.options.showDismissed);
  reset();
  State.showPanel = true;
  checkAll();

  UI.showDismissed.setAttribute('data-ed11y-pressed', (!!State.options.showDismissed).toString());
  window.setTimeout(function() {
    UI.showDismissed.focus();
  }, 0);
};

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
    if (!Util.visible(el.target)) {
      // Invisible target.
      const firstVisibleParent = Util.firstVisibleParent(el.target);
      targetOffset = firstVisibleParent ? firstVisibleParent.getBoundingClientRect() : targetOffset;
    }

    // @todo why is setProperty failing?
    console.log('has set property?')
    console.log(el.highlight);

    el.highlight.style.setProperty('width', targetOffset.width + 6 + 'px');
    el.highlight.style.setProperty('top', targetOffset.top + framePositioner.top + window.scrollY - 3 + 'px');
    el.highlight.style.setProperty('left', targetOffset.left + framePositioner.left - 3 + 'px');
    el.highlight.style.setProperty('height', targetOffset.height + 6 + 'px');
  });
};

export function editableHighlighter (resultID, show, firstVisible) {

  if (!show) {
    UI.editableHighlight[resultID]?.highlight.style.setProperty('opacity', '0');
    return;
  }
  const result = State.results[resultID];
  let el = UI.editableHighlight[resultID]?.highlight;
  if (!el) {
    el = document.createElement('ed11y-element-highlight');
    el.classList.add('ed11y-element');
    UI.editableHighlight[resultID] = {highlight: el, resultID: resultID};
    el.style.setProperty('position', 'absolute');
    el.style.setProperty('pointer-events', 'none');
    State.panelAttachTo.appendChild(el);
  }
  UI.editableHighlight[resultID].target = firstVisible ? firstVisible : result.element;
  const zIndex = result.dismissalKey ? 'calc(var(--ed11y-buttonZIndex, 9999) - 2)' : 'calc(var(--ed11y-buttonZIndex, 9999) - 1)';
  el.style.setProperty('z-index', zIndex);
  const outline = result.dismissalKey ?
    '0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-warning, #fad859), 0 0 0 3px var(--ed11y-warning, #fad859), 0 0 0 4px var(--ed11y-primary)'
    : '0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-alert, #b80519), 0 0 0 3px var(--ed11y-alert, #b80519), 0 0 1px 3px';
  el.style.setProperty('box-shadow', outline);
  el.style.setProperty('border-radius', '3px');
  el.style.setProperty('top', '0');
  el.style.setProperty('left', '0');
  alignHighlights();
  el.style.setProperty('opacity', '1');
};

export function resetResults(incremental) {
  State.jumpList = [];
  State.openTip = {
    button: false,
    tip: false,
  };
  State.lastOpenTip = -1;
  resetClass([
    'ed11y-ring-red',
    'ed11y-ring-yellow',
    'ed11y-hidden-highlight',
    'ed11y-warning-inline',
    'ed11y-warning-block',
    'ed11y-error-block',
    'ed11y-error-inline',
  ]);
  // Reset insertions into body content.
  if (incremental) {
    findElements('reset', 'ed11y-element-highlight', false);
  } else {
    findElements('reset', 'ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight', false);
  }
  State.elements.reset?.forEach((el) => el.remove());

  // Flicker prevention -- leave old tip in place for 100ms.
  findElements('delayedReset', 'ed11y-element-result, ed11y-element-tip', false);
  const delayedReset = State.elements.delayedReset;

  window.setTimeout(()=> {
    delayedReset?.forEach((el) => el.remove());
  }, 100, delayedReset);

  if (UI.panelJumpNext) {
    UI.panelJumpNext.querySelector('.ed11y-sr-only').textContent = M.buttonFirstContent;
  }
  // Reset insertions into body content.
};

export function resetPanel() {
  // Reset main panel.
  State.visualizing = true; // so visualize function removes visualizers.
  visualize();
  if (State.totalCount === 0 && State.dismissedCount > 0) {
    UI.panelCount.textContent = 'i';
    UI.panelToggleTitle.textContent = State.dismissedCount === 1 ?
      M.buttonShowHiddenAlert :
      M.buttonShowHiddenAlerts(State.dismissedCount);
  }
  if (!State.options.showDismissed && UI.showDismissed) {
    UI.showDismissed.setAttribute('data-ed11y-pressed', 'false');
    UI.showDismissed.querySelector('.ed11y-sr-only').textContent = State.dismissedCount === 1 ?
      M.buttonShowHiddenAlert : M.buttonShowHiddenAlerts(State.dismissedCount);
  }
  UI.panel?.classList.add('ed11y-shut');
  UI.panel?.classList.remove('ed11y-active');
  UI.panelToggle?.setAttribute('aria-expanded', 'false');
};

export function reset () {
  pauseObservers();
  resetResults();
  resetPanel();
  State.incremental = false;
  State.running = false;
  State.showPanel = false;
  State.open = false;
};

export function linkText (linkText) {
  // todo postpone: This is only used in Images??? Review all text value diving.
  linkText = linkText.replace(State.options.linkIgnoreStrings, '');
  linkText = linkText.replace(/'|"|-|\.|\s+/g, '');
  return linkText;
};

export function transferFocus () {
  if (!State.openTip.tip) {
    return;
  }
  const id = State.openTip.tip.dataset.ed11yResult;
  const target = State.results[id].element;
  const editable = target.closest('[contenteditable]');
  if (!editable && !target.closest('textarea, input')) {
    if (target.closest('a')) {
      State.toggledFrom = target.closest('a');
    } else if (target.getAttribute('tabindex') !== null) {
      State.toggledFrom = target;
    } else {
      target.setAttribute('tabindex', '0');
      State.toggledFrom = target;
    }
    State.openTip.tip.shadowRoot.querySelector('.close').click();
  } else {
    State.toggledFrom = false;
    if (target.getAttribute('contenteditable') === 'true') {
      State.toggledFrom = target;
    } else if (target.closest('p[contenteditable="true"]')) {
      State.toggledFrom = target.closest('p[contenteditable="true"]');
    } else {
      // Just got complicated -- need to move a caret
      State.toggledFrom = false;
    }
    State.openTip.tip.shadowRoot.querySelector('.close').click();
    if (!State.toggledFrom && editable) {
      // Need to move focus manually
      // h/t https://stackoverflow.com/questions/6249095/how-to-set-the-caret-cursor-position-in-a-contenteditable-element-div
      editable.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(target, 0);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
};


export function paintReady () {

  if (!State.options.cssUrls) {
    const cssLink = document.querySelector('link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]');
    if (cssLink) {
      State.options.cssUrls = [cssLink.getAttribute('href')];
    } else {
      console.warn('Editoria11y CSS file parameter is missing; attempting to load from CDN.');
      State.options.cssUrls = [`https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${State.version}/dist/editoria11y.min.css`];
    }
  }

  for (const [key, value] of Object.entries(Theme)) {
    document.documentElement.style.setProperty('--ed11y-' + key, value);
  }

  // May be redundant, but preloads unbundled files.
  if (document.querySelector('body')) {
    // May be redundant, but preloads unbundled files.
    UI.attachCSS(document.querySelector('body'));
  }


  State.roots.forEach((root) => {
    // Shadow elements don't inherit styles, so they need their own copy.
    if (State.options.shadowComponents) {
      root.querySelectorAll(State.options.shadowComponents)?.forEach((shadowHost) => {
        if (shadowHost.shadowRoot) {
          UI.attachCSS(shadowHost.shadowRoot);
        }
      });
    }
  });
  State.bodyStyle = true;
};

export function togglePanel () {
  State.ignoreAll = false;

  if (!State.doubleClickPrevent) {
    // Prevent clicks piling up while scan is running.
    if (State.running !== true) {
      State.running = true;
      // Re-scan each time the panel reopens.
      if (UI.panel.classList.contains('ed11y-shut') === true) {
        State.onLoad = false;
        State.incremental = false;
        State.showPanel = true;
        if (State.dismissedCount > 0 && State.warningCount === 0 && State.errorCount === 0) {
          State.options.showDismissed = false;
          toggleShowDismissals();
        } else {
          checkAll();
        }
        State.options.userPrefersShut = false;
        localStorage.setItem('editoria11yShow', '1');
      }
      else {
        UI.panelToggleTitle.textContent = State.totalCount > 0 ? M.buttonShowAlerts : M.buttonShowNoAlert;
        State.options.showDismissed = false;
        reset();
        State.options.userPrefersShut = true;
        localStorage.setItem('editoria11yShow', '0');
      }
    }
  }
  State.doubleClickPrevent = true;
  window.setTimeout(function () {
    State.doubleClickPrevent = false;
  }, 200);
  return false;
};

export function showHeadingsPanel () {
  // Visualize the document outline

  let panelOutline = UI.panel.querySelector('#ed11y-outline');

  if (State.headingOutline.length) {
    panelOutline.innerHTML = '';
    State.headingOutline.forEach((el, i) => {
      // Todo: draw these in editable mode.
      if (State.options.inlineAlerts) {
        const mark = document.createElement('ed11y-element-heading-label');
        mark.classList.add('ed11y-element', 'ed11y-element-heading');
        mark.dataset.ed11yHeadingOutline = i.toString();
        mark.setAttribute('id', 'ed11y-heading-' + i);
        mark.setAttribute('tabindex', '-1');
        // Array: el, level, outlinePrefix
        el[0].insertAdjacentElement('afterbegin', mark);
        UI.attachCSS(mark.shadowRoot);
      }
      let level = el[1];
      let leftPad = 10 * level - 10;
      let li = document.createElement('li');
      li.classList.add('level' + level);
      li.style.setProperty('margin-left', leftPad + 'px');
      let levelPrefix = document.createElement('strong');
      levelPrefix.textContent = `H${level}: `;
      let userText = document.createElement('span');
      userText.textContent = computeText(el[0]);
      let link = document.createElement('a');
      if (State.options.inlineAlerts) {
        link.setAttribute('href', '#ed11y-heading-' + i);
        li.append(link);
        link.append(levelPrefix);
        link.append(userText);
      } else {
        li.append(levelPrefix);
        li.append(userText);
      }
      if (el[2]) { // Has an error message
        let type = !el[3] ? 'ed11y-error' : 'ed11y-warning';
        li.classList.add(type);
        let message = document.createElement('em');
        message.classList.add('ed11y-small');
        message.textContent = ' ' + el[2];
        if (State.options.inlineAlerts) {
          link.append(message);
        } else {
          li.append(message);
        }
      }
      panelOutline.append(li);
    });
  } else {
    panelOutline.innerHTML = '<p><em>No heading structure found.</em></p>';
  }
};
