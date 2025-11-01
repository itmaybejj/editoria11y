import {M, State, Theme, UI} from "../utils/state.js";
import {
  findElements, firstVisibleParent, raceCrash,
  resetClass,
  visible
} from "../utils/utils.js";
import ed11yLang from "../lang/localization.js";
import {
  alignButtons,
  alignHighlights,
  alignPanel,
  checkEditableIntersects, closestScrollable, updateTipLocations
} from "./align.js";
import {visualize} from "./visualizers.js";
import {
  intersectionObservers,
  pauseObservers,
  resumeObservers, startObserver
} from "../utils/observers.js";

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

export function linkText (linkText) {
  // todo postpone: This is only used in Images??? Review all text value diving.
  linkText = linkText.replace(State.options.linkIgnoreStrings, '');
  linkText = linkText.replace(/'|"|-|\.|\s+/g, '');
  return linkText;
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

export function jumpTo(dir = 1) {
  if (!State.open) {
    return false;
  }
  State.viaJump = true;
  // Determine target result.
  let goMax = State.jumpList.length - 1;
  let goNum = State.lastOpenTip + dir;
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

  if (typeof UI.panelJumpNext === 'function') {
    UI.panelJumpNext.querySelector('.ed11y-sr-only').textContent = M.buttonFirstContent;
  }
  // Reset insertions into body content.
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
	if (typeof (UI.panel) === 'function') {
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

export function reset () {
  pauseObservers();
  resetResults();
  resetPanel();
  State.incremental = false;
  State.running = false;
  State.showPanel = false;
  State.open = false;
}
