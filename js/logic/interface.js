import {M, State, Theme, UI} from "../utils/state.js";
import {
	checkRunPrevent,
	countAlerts,
	detectShadow,
	findElements, firstVisibleParent, lagBounce, pauseObservers,
	resetClass, resetResults, resumeObservers,
	visible
} from "../utils/utils.js";
import ed11yLang from "../lang/localization.js";

import {
	documentLoadingCheck,
	prepareDismissal,
	store
} from "sa11y/src/js/utils/utils.js";
import * as Utils from "sa11y/src/js/utils/utils.js";
import findShadowComponents from "sa11y/src/js/logic/find-shadow-components.js";
import checkHeaders from "sa11y/src/js/rulesets/headers.js";
import checkLinkText from "sa11y/src/js/rulesets/link-text.js";
import checkImages from "sa11y/src/js/rulesets/images.js";
import checkLabels from "sa11y/src/js/rulesets/labels.js";
import checkQA from "sa11y/src/js/rulesets/quality-assurance.js";
import {Lang} from "sa11y/src/js/sa11y.js";
import Constants from "sa11y/src/js/utils/constants.js";
import Elements from "sa11y/src/js/utils/elements.js";
import {
	computeAccessibleName
} from "sa11y/src/js/utils/computeAccessibleName.js";
import {
	alignAlts,
	alignButtons, alignPanel,
	checkEditableIntersects,
	closestScrollable
} from "../utils/align.js";

export function showResults () {
  buildJumpList();
  // Announce that buttons have been placed.
  document.dispatchEvent(new CustomEvent('ed11yPanelOpened'));
  alignButtons();
  if (!State.options.inlineAlerts) {
    checkEditableIntersects();
    intersectionObservers();
  }
}

const panelJumpTo = function(event) {
	// Handle jump
	event.preventDefault();
	State.toggledFrom = event.target.closest('button');
	if (!State.open) {
		togglePanel();
		window.setTimeout(function() {
			jumpTo(1);
		},500);
	} else {
		jumpTo(1);
	}
}

export function updatePanel () {

  pauseObservers();
  // Stash old values for incremental updates.

  if (State.incremental) {
    // Check for a change in the result counts.
    if (State.forceFullCheck) {
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
      UI.panelJumpNext.addEventListener('click', panelJumpTo);
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

      // Escape key closes panels.
      const escapeWatch = function (event) {
        if (event.keyCode === 27) {
          if (event.target.closest('ed11y-element-panel') && UI.panelToggle.getAttribute('aria-expanded') === 'true') {
            UI.panelToggle.focus();
            UI.panelToggle.click();
          } else if (event.target.hasAttribute('data-ed11y-open')) {
            if (State.openTip.button) {
              State.toggledFrom.focus();
              State.openTip.button.shadowRoot.querySelector('button').click();
            }
          }
        }
      };
      document.addEventListener('keyup', function (event) {escapeWatch(event); });

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

  resumeObservers();
  State.running = false;
}

export function buildJumpList () {

  State.jumpList = [];
  pauseObservers();

  // Initial alignment to get approximate Y position order for jump list.
  State.results.forEach((result, i) => {

    let top = result.element.getBoundingClientRect().top;
    if (!top) {
      const visibleParent = firstVisibleParent(result.element);
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
}

export function dismissOne(dismissalType, test, dismissalKey) {

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
}

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
}

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
}

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
    document.documentElement.style.setProperty('--ed11y-' + key, `${value}`);
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
}

export function alertOnInvisibleTip (button, target) {
  let delay = 100;
  if (State.options.hiddenHandlers.length > 0 && !!target.closest(State.options.hiddenHandlers)) {
    // Increase hesitation before scrolling, in case theme animates open an element.
    delay = 333;
    document.dispatchEvent(new CustomEvent('ed11yShowHidden', {
      detail: {result: button.getAttribute('data-ed11y-result')}
    }));
  }
  const details = target.closest('details');
  if (details && !details.open) {
    details.open = true;
    delay = 333;
  }

  // Scroll into view and throw an alert if the button or target is hidden.
  window.setTimeout((button, target) => {
    UI.message.textContent = '';
    let firstVisible = false;
    let alertMessage;
    if (State.options.checkVisible && !visible(target)) {
      button.dataset.ed11yHiddenResult = 'true';
      firstVisible = firstVisibleParent(target);
      alertMessage = ed11yLang.en.jumpedToInvisibleTip;
    }
    else if (target.closest('[aria-hidden="true"]')) {
      firstVisible = target.closest('[aria-hidden="true"]');
      firstVisible = firstVisible.closest(':not([aria-hidden="true"])');
      alertMessage = M.jumpedToAriaHiddenTip;
    }
    if (firstVisible) {
      // Throw warning that the element cannot be highlighted.
      const tipAlert = State.openTip.tip?.shadowRoot.querySelector('.ed11y-tip-alert');
      tipAlert.textContent = alertMessage;
    }
    if (State.viaJump) {
      let scrollPin = window.innerHeight > 900 || (window.innerWidth > 800 && window.innerHeight > 600) ? 'center' : 'start';
      let scrollTarget = State.options.inlineAlerts ? button : target;
      if (button.dataset.ed11yHiddenResult || !(visible(scrollTarget))) {
        scrollTarget = firstVisibleParent(target);
      }
      if (scrollTarget && typeof scrollTarget.scrollIntoView === 'function') {
        scrollTarget.scrollIntoView({ block: scrollPin, behavior: 'instant' });
      } else {
        raceCrash();
        return false;
      }
    }
    // Todo: following statements work but could be simplified.
    if (!State.options.inlineAlerts) {
      // todo this selector must match the selector that decides where to place the mark
      editableHighlighter(button.dataset.ed11yResult, true, firstVisible); // todo
    } else {
      if (firstVisible) {
        firstVisible.classList.add('ed11y-hidden-highlight');
      }
    }
    let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
    if (!activeTip) {
      button.setAttribute('data-ed11y-action','open');
      if (State.viaJump) {
        window.setTimeout(() => {
          // Race conditions are fun.
          let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
          if (State.viaJump) {
            activeTip?.shadowRoot.querySelector('.title').focus();
          }
        }, 100);
      }
    } else {
      if (State.viaJump) {
        window.setTimeout(() => {
          // Race conditions are fun.
          activeTip?.shadowRoot.querySelector('.title').focus();
        }, 100, activeTip);
      }
    }
    State.viaJump = false;
  }, delay, button, target);
}

export function jumpTo(next = true) {
  if (!State.open) {
    return false;
  }
  State.viaJump = true;
  // Determine target result.
  let goMax = State.jumpList.length - 1;
  let goNum = next ? State.lastOpenTip + 1 : State.lastOpenTip - 1;
  if (goNum < 0) {
    // Reached end of loop or dismissal pushed us out of loop
    State.nextText = M.buttonFirstContent; // todo
    goNum = goMax;
  } else if (goNum > goMax) {
    goNum = 0;
    State.nextText = M.buttonNextContent;
  } else {
    State.nextText = M.buttonNextContent;
  }
  State.lastOpenTip = goNum;
  window.setTimeout(function () {
    UI.panelJumpNext.querySelector('.ed11y-sr-only').textContent = State.nextText;
  }, 250);

  resetClass(['ed11y-hidden-highlight']);
  if (State.jumpList.length === 0) {
    buildJumpList(); // todo
  }
  // Find next or first result in the dom ordered list of results.
  let goto = State.jumpList[goNum];
	if (!goto) {
		goto = State.jumpList[0];
		State.lastOpenTip = 0;
	}
  let result = goto.getAttribute('data-ed11y-result');
  let gotoResult = State.results[result];
  const target = gotoResult.element;

  // First of two scrollTo calls, to trigger any scroll based events.
  let scrollPin = window.innerHeight > 900 || (window.innerWidth > 800 && window.innerHeight > 600) ? 'center' : 'start';
  let scrollTarget = State.options.inlineAlerts ? goto : target;
  if (goto.dataset.ed11yHiddenResult || !(visible(scrollTarget))) {
    scrollTarget = firstVisibleParent(target);
  }
  if (scrollTarget && typeof scrollTarget.scrollIntoView === 'function') {
    scrollTarget.scrollIntoView({ block: scrollPin, behavior: 'instant' });
  } else {
    raceCrash();
    return false;
  }

  // Open the button
  goto.setAttribute('data-ed11y-action','open');
  State.scrollPending = 2;
  updateTipLocations();
}

export function incrementalAlign() {
	lagBounce(() => {
		if (!State.running && !State.alignPending) {
			State.scrollPending++;
			updateTipLocations();
			State.alignPending = false;
		} else {
			incrementalAlign();
		}
	}, 10);
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
		const theFirstVisibleParent = firstVisibleParent(mark.result.element);
		if (theFirstVisibleParent) {
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

		el.highlight.style.setProperty('width', targetOffset.width + 6 + 'px');
		el.highlight.style.setProperty('top', targetOffset.top + framePositioner.top + window.scrollY - 3 + 'px');
		el.highlight.style.setProperty('left', targetOffset.left + framePositioner.left - 3 + 'px');
		el.highlight.style.setProperty('height', targetOffset.height + 6 + 'px');
	});
}

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

export function ed11ySetup () {
	if (State.once) {
		console.error('double init');
		return;
	}
	State.once = true;

	// Once document has fully loaded.
	documentLoadingCheck(() => {
		if (checkRunPrevent()) {
			return false;
		}

		State.running = true;
		let localResultCount = store.getItem('editoria11yResultCount');
		State.seen = localResultCount && localResultCount !== 'undefined' ?
			JSON.parse(localResultCount) : {};

		// Build list of dismissed alerts
		if (State.options.syncedDismissals === false) {
			State.dismissedAlerts = localStorage.getItem('ed11ydismissed');
			State.dismissedAlerts = State.dismissedAlerts ? JSON.parse(State.dismissedAlerts) : {};
		} else {
			State.dismissedAlerts = {};
			State.dismissedAlerts[State.options.currentPage] = State.options.syncedDismissals;
		}

		// Create test class objects
		/*Ed11y.testEmbeds = new Ed11yTestEmbeds;
		Ed11y.testHeadings = new Ed11yTestHeadings;
		Ed11y.testImages = new Ed11yTestImages;
		Ed11y.testLinks = new Ed11yTestLinks;
		Ed11y.testText = new Ed11yTestText;
*/
		// Convert the container ignore user option to a CSS :not selector.
		State.ignore = State.options.ignoreElements ? `:not(${State.options.ignoreElements})` : '';

		if (!State.options.checkRoots) {
			State.options.checkRoots = document.querySelector('main') !== null ? 'main' : 'body';
		}

		// Run tests
		checkAll();


		// Move toggles when something expands or collapses.
		const mightExpand = document.querySelectorAll('[aria-expanded], [aria-controls]');
		mightExpand?.forEach(expandable => {
			expandable.addEventListener('click', () => {
				window.setTimeout(() => {
					windowResize();
				}, 333);
			});
		});

		window.addEventListener('resize', function () { windowResize(); });
	});
}

// Toggles the outline of all headers, link texts, and images.
export function checkAll() {
	if (State.openTip.button) {
		return false;
	}
	State.disabled = false;

	if ( !checkRunPrevent() ) {

		// Check for ignoreAll elements.
		State.ignoreAll = State.options.ignoreAllIfAbsent && document.querySelector(`:is(${State.options.ignoreAllIfAbsent})`) === null;
		if (!State.ignoreAll && !!State.options.ignoreAllIfPresent) {
			State.ignoreAll = document.querySelector(`:is(${State.options.ignoreAllIfPresent})`) !== null;
		}

		if ( State.incremental ) {
			State.oldResults = State.results;
		}
		// Reset counts
		State.results = [];
		State.elements = [];
		State.mediaCount = 0;

		State.customTestsRunning = false;

		State.roots = [];
		if (State.options.fixedRoots) {
			// @todo merge this needs to be implemented
			State.options.fixedRoots.forEach(root => {State.roots.push(root.fixedRoot);});
		} else {
			// @todo merge this needs to return to querySelectorAll.
			State.roots = document.querySelectorAll(`:is(${State.options.checkRoots})`);
		}
		// Initialize root areas to check.
		if (!State.roots && State.options.headless === false) {
			// @todo merge invalid number of arguments.
			Utils.createAlert(`${Lang.sprintf('MISSING_ROOT', State.options.checkRoots)}`);
		} // todo fixedRoots.

		if (State.roots.length === 0) {
			// Todo parameterize for translation.
			if (State.onLoad) {
				console.warn('Check Editoria11y configuration; specified root element not found');
			}
			disable();
			return;
		} else
			for (let i = 0; i < State.roots.length; i++) {
				if (State.options.fixedRoots) {
					State.roots[i].dataset.ed11yRoot = `${i}`;
				}
				if (State.roots[i].shadowRoot) {
					State.roots.setAttribute('data-ed11y-has-shadow-root', 'true');
					detectShadow(State.roots[i]);
					State.roots[i] = State.roots[i].shadowRoot;
				} else {
					detectShadow(State.roots[i]);
				}
			}


		buildElementList();

		Constants.initializeRoot(State.options.checkRoots, State.options.checkRoots); // @todo merge readability, add multiroot.

		// Find all web components on the page.
		findShadowComponents(State.options);

		// Find and cache elements.
		Elements.initializeElements(State.options);

		State.headingOutline = [];
		// Ruleset checks
		checkHeaders(State.results, State.options, State.headingOutline);
		checkLinkText(State.results, State.options);
		checkImages(State.results, State.options);
		checkLabels(State.results, State.options);
		checkQA(State.results, State.options);
		console.log(State.results);
		/*{
"element": {},
"type": "error",
"content": "Empty heading found! To fix, delete this line or change its format from <strong class=\"colour\">Heading 4</strong> to <strong>Normal</strong> or <strong>Paragraph</strong>.",
"dismiss": "H4",
"dismissAll": false,
"isWithinRoot": true,
"developer": false,
"margin": "0",
"dismissalStatus": false,
"scrollableParent": false,
"sortPos": 5495.38330078125
}
content
dismissalKey
dismissalStatus
element
position
scrollableParent
sortPos
test
toggle

		* */
		// @todo merge temporary values.
		State.results.forEach((result) => {
			result.position = 'beforebegin';
			result.dismissalKey = result.dismiss;
			result.test = 'altNull';
		})

		/*let queue = [
			'testLinks',
			'testImages',
			'testHeadings',
			'testText',
			'testEmbeds',
		];
		queue.forEach((test) => {
			window.setTimeout(function (test) {
				Ed11y[test].check();
			}, 0, test);
		});*/

		if (State.options.customTests > 0) {
			// Pause
			State.customTestsRunning = true;
			State.customTestsFinished = 0;
			document.addEventListener('ed11yResume', function () {
				State.customTestsFinished++;
				if (State.customTestsFinished === State.options.customTests) {
					State.customTestsRunning = false;
					countAlerts();
					window.requestAnimationFrame(() => updatePanel());
				}
			});
			window.setTimeout(function() {
				if (State.customTestsRunning === true) {
					State.customTestsRunning = false;
					if (typeof UI.panelToggle.querySelector === 'function') {
						UI.panelToggle.querySelector('.ed11y-sr-only').textContent = M.toggleAccessibilityTools;
					}
					countAlerts();
					window.requestAnimationFrame(() => updatePanel());
					console.error('Editoria11y was told to wait for custom tests, but no tests were returned.');
				}
			}, 1000);
			window.setTimeout(function() {
				let customTests = new CustomEvent('ed11yRunCustomTests');
				document.dispatchEvent(customTests);
			},0);
		}
	}

	if (!State.customTestsRunning) {
		window.setTimeout(function () {
			if (typeof UI.panelToggle.querySelector === 'function') {
				UI.panelToggle.querySelector('.ed11y-sr-only').textContent = M.toggleAccessibilityTools;
			}
			countAlerts();
			updatePanel();
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
		}, 0);
	}
	else {
		disable();
	}
}

export function incrementalCheck() {
	lagBounce(() => {
		if (!State.running) {
			if (State.openTip.button || (!State.interaction && !State.forceFullCheck)) {
				return;
			}
			State.interaction = false;
			State.running = true;
			let runTime = performance.now();
			State.incremental = true;
			if (State.disabled && State.closedByDisable) {
				State.showPanel = true;
				State.closedByDisable = false;
				State.disabled = false;
			}
			//State.forceFullCheck = true; // todo no
			checkAll();
			window.setTimeout(function() {
				if (State.visualizing) {
					document.dispatchEvent(new CustomEvent('ed11yEndVisualization'))
				}
			}, 500);
			// todo: if there are no issues and the heading panel is open...it closes!
			// Increase debounce if runs are slow.
			runTime = performance.now() - runTime;
			State.browserSpeed = runTime > 10 ? 10 : (State.browserSpeed + runTime) / 2;
			// Todo: optimize tip placement so we do not need as much debounce.
			State.browserLag = State.browserSpeed < 1 ? 0 : State.browserSpeed * 100 + State.totalCount;
		} else {
			// Ed11y was running, try again later.
			window.setTimeout(() => {incrementalCheck();}, 250);
		}
	}, 250)
}

export function buildElementList () {

	// Note: as of 3/28/25 this is as performant as Sa11y's filter() approach.
	if (typeof State.options.editableContent === 'string') {
		findElements('editable', State.options.editableContent, false);
	} else {
		State.elements.editable = State.options.editableContent;
	}
	if (State.options.inlineAlerts && State.elements.editable.length > 0) {
		State.options.inlineAlerts = false;
		console.warn('Editable content detected; Editoria11y inline alerts disabled');
	}
	//Ed11y.findElements('p', 'p');
	//Ed11y.findElements('h', 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]');
	findElements('allH', 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]', State.options.fixedRoots ? State.options.headingsOnlyFromCheckRoots : false);
	findElements('img', 'img');
	//findElements('a', 'a[href]');
	//findElements('li', 'li');
	//findElements('blockquote', 'blockquote');
	//findElements('iframe', 'iframe');
	//findElements('audio', 'audio');
	//findElements('video', 'video');
	//findElements('table', 'table');

	if (State.options.embeddedContent) {
		//Ed11y.findElements('embed', State.options.embeddedContent);
	}
	if (State.options.panelNoCover) {
		// Moves panel off conflicting widgets.
		findElements('panelPin', State.options.panelNoCover, false);
	}
}

export function visualize () {
	if (!UI.panel) {
		return;
	}
	if (State.options.inlineAlerts) {
		findElements('reset', 'ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight', false);
		State.elements.reset?.forEach((el) => el.remove());
	}
	if (State.visualizing) {
		State.visualizing = false;
		UI.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = M.buttonToolsContent;
		UI.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'false');
		UI.panel.querySelector('#ed11y-visualizers').setAttribute('hidden', 'true');
		return;
	}
	State.visualizing = true;
	UI.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = M.buttonToolsActive;
	UI.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'true');
	UI.panel.querySelector('#ed11y-visualizers').removeAttribute('hidden');
	showAltPanel();
	showHeadingsPanel();
}

export function showHeadingsPanel () {
	// Visualize the document outline

	let panelOutline = UI.panel.querySelector('#ed11y-outline');
	if (State.headingOutline.length) {
		panelOutline.innerHTML = '';
		State.headingOutline.forEach((result, i) => {
			// Todo: draw these in editable mode.
			if (State.options.inlineAlerts) {
				const mark = document.createElement('ed11y-element-heading-label');
				mark.classList.add('ed11y-element', 'ed11y-element-heading');
				mark.dataset.ed11yHeadingOutline = i.toString();
				mark.setAttribute('id', 'ed11y-heading-' + i);
				mark.setAttribute('tabindex', '-1');
				// Array: el, level, outlinePrefix
				result.element.insertAdjacentElement('afterbegin', mark);
				UI.attachCSS(mark.shadowRoot);
			}
			let leftPad = 10 * result.headingLevel - 10;
			let li = document.createElement('li');
			li.classList.add('level' + result.headingLevel);
			li.style.setProperty('margin-left', leftPad + 'px');
			let levelPrefix = document.createElement('strong');
			levelPrefix.textContent = `H${result.headingLevel}: `;
			let userText = document.createElement('span');
			userText.textContent = computeAccessibleName(result.element);
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
			if (result.type) { // Has an error message
				li.classList.add(`ed11y-${result.type}`);
				/*let message = document.createElement('em');
				message.classList.add('ed11y-small');
				message.textContent = ' ' + el[2];
				if (State.options.inlineAlerts) {
					link.append(message);
				} else {
					li.append(message);
				}*/
			}
			panelOutline.append(li);
		});
	} else {
		panelOutline.innerHTML = '<p><em>No heading structure found.</em></p>';
	}
}

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

	// @todo is this going to fail again? Should it a different if?
	if (typeof (UI.panel) === 'object') {
		UI.panel?.classList.add('ed11y-shut');
		UI.panel?.classList.remove('ed11y-active');
		UI.panelToggle?.setAttribute('aria-expanded', 'false');
		if (!State.options.showDismissed && typeof UI.showDismissed === 'function') {
			UI.showDismissed.setAttribute('data-ed11y-pressed', 'false');
			UI.showDismissed.querySelector('.ed11y-sr-only').textContent = State.dismissedCount === 1 ?
				M.buttonShowHiddenAlert : M.buttonShowHiddenAlerts(State.dismissedCount);
		}
	}
}

// @todo is this getting called?
window.addEventListener('ed11yEndVisualization', ()=>{
	State.visualizing = false;
	pauseObservers();
	visualize();
	resumeObservers();
})

const showAltPanel = function () {
	// visualize image alts
	let altList = UI.panel.querySelector('#ed11y-alt-list');

	if (UI.imageAlts.length) {
		altList.innerHTML = '';
		UI.imageAlts.forEach((el, i) => {
			// el[el, src, altLabel, altStyle]

			if (State.options.inlineAlerts) {
				// Label images
				const mark = document.createElement('ed11y-element-alt');
				mark.classList.add('ed11y-element');
				mark.dataset.ed11yImg = i.toString();
				mark.setAttribute('id', 'ed11y-alt-' + i);
				mark.setAttribute('tabindex', '-1');
				el[0].insertAdjacentElement('beforebegin', mark);
			}

			// Build alt list in panel
			let userText = document.createElement('span');
			userText.textContent = el[2];
			let li = document.createElement('li');
			li.classList.add(el[3]);
			let img = document.createElement('img');
			img.setAttribute('src', el[1]);
			img.setAttribute('alt', '');

			if (State.options.inlineAlerts) {
				let a = document.createElement('a');
				a.href = '#ed11y-alt-' + i;
				a.classList.add('alt-parent');
				li.append(a);
				a.append(img);
				a.append(userText);
			} else {
				li.classList.add('alt-parent');
				li.append(img);
				li.append(userText);
			}
			altList.append(li);
		});
		alignAlts();
	} else {
		const noImages = document.createElement('p');
		const noItalic = document.createElement('em');
		noItalic.textContent = M.noImagesFound;
		noImages.appendChild(noItalic);
		altList.innerHTML = '';
		altList.appendChild(noImages);
	}
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
		let dismissalKey = prepareDismissal(State.results[id].dismissalKey);
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
}

export function raceCrash() {
	// A marked element disappeared while we were jumping to it.
	if (State.loopStop) {
		return;
	}
	State.loopStop = true;
	reset();
	State.showPanel = true;
	checkAll();
	window.setTimeout(function() {
		if (State.results.length > 0 && State.loopStop) {
			this.jumpTo(); // todo
			State.loopStop = false;
		}
	},100, State.loopStop);
}

export function disable() {
	if (State.open && !State.closedByDisable) {
		State.closedByDisable = true;
	}
	State.disabled = true;
	reset();
	document.documentElement.style.setProperty('--ed11y-activeBackground', Theme.panelBar);
	document.documentElement.style.setProperty('--ed11y-activeColor', Theme.panelBarText);
	document.documentElement.style.setProperty('--ed11y-activeBorder', Theme.panelBarText + '44');
	document.documentElement.style.setProperty('--ed11y-activePanelBorder', 'transparent');
	if (typeof UI.panelToggle.querySelector === 'function') {
		UI.panel?.classList.remove('ed11y-errors', 'ed11y-warnings');
		UI.panelCount.textContent = 'i';
		UI.panelJumpNext.setAttribute('hidden', '');
		UI.panelToggle.classList.add('disabled');
		UI.panelToggle.querySelector('.ed11y-sr-only').textContent = M.toggleDisabled;
	}
};

export function reset () {
	pauseObservers();
	resetResults();
	resetPanel();
	State.incremental = false;
	State.running = false;
	State.showPanel = false;
	State.open = false;
}
