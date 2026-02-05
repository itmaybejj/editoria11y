import {
  buildElementList,
  checkRunPrevent,
  firstVisibleParent,
  lagBounce,
  newIncrementalResults,
  panelLabel,
  pauseObservers,
  resetClass,
  resetResults,
  resumeObservers,
  showError,
  visible,
} from '../utils/utils.js';
import checkHeaders from '../../sa11y-js/rulesets/headers.js';
import checkLinkText from '../../sa11y-js/rulesets/link-text.js';
import checkImages from '../../sa11y-js/rulesets/images.js';
import checkLabels from '../../sa11y-js/rulesets/labels.js';
import checkQA from '../../sa11y-js/rulesets/quality-assurance.js';
import checkContrast from '../../sa11y-js/contrast/checkContrast.js';
import checkDeveloper from '../../sa11y-js/rulesets/developer';
import Lang from '../../sa11y-js/utils/lang.js';
import Elements from '../../sa11y-js/utils/elements.js';
import {
  alignAlts,
  alignButtons,
  alignPanel,
  checkEditableIntersects,
  closestScrollable,
} from '../utils/align.js';
import checkEmbeddedContent from '../../sa11y-js/rulesets/embedded-content';
import Constants from '../../sa11y-js/utils/constants';
import {
  countAlerts,
  filterAlerts,
  handleSyncOnlyResults,
  syncResults,
} from '../utils/process-results.js';
import { drawResult, showAltPanel, showHeadingsPanel, visualize } from './visualize';
import checkReadability from '../../sa11y-js/rulesets/readability.js';
import { spriteClose, spriteReadability } from '../elements/sprite.js';
import customRuleset from '../rulesets/custom-ruleset.js';
import { UI } from './ui.js';
import { State } from '../../sa11y-js/core/state.js';

export function showResults() {
  buildJumpList();
  // Announce that buttons have been placed.
  document.dispatchEvent(new CustomEvent('ed11yPanelOpened'));
  alignButtons();
  if (!UI.inlineAlerts) {
    checkEditableIntersects();
    intersectionObservers();
  }
}

const panelJumpTo = (event) => {
  // Handle jump
  event.preventDefault();
  UI.toggledFrom = event.target.closest('button');
  if (!UI.showPanel) {
    togglePanel();
    window.setTimeout(() => {
      jumpTo();
    }, 500);
  } else {
    jumpTo();
  }
};

export function updatePanel() {
  pauseObservers();
  // Stash old values for incremental updates.

  if (UI.incremental) {
    // Check for a change in the result counts.
    if (UI.forceFullCheck || newIncrementalResults()) {
      UI.forceFullCheck = false;
      resetResults(true);
    } else {
      // Reconnect map
      State.results.push(UI.oldResults);
      if (!UI.alignPending) {
        alignButtons();
        alignPanel();
        UI.alignPending = false;
      }
      UI.running = false;
      resumeObservers();
      return;
    }
  } else {
    if (UI.totalCount > 0) {
      // Record what has been seen at this route.
      // We do not do this on incremental updates.
      // Todo question: should we not do this at all for contentEditable?
      UI.seen[encodeURI(State.option.currentPage)] = UI.totalCount;
      localStorage.setItem('editoria11yResultCount', JSON.stringify(UI.seen));
    } else {
      delete UI.seen[encodeURI(State.option.currentPage)];
    }
  }

  if (!State.option.headless) {
    // Not headless; draw the run.

    if (!UI.bodyStyle) {
      paintReady();
    }

    if (UI.onLoad === true) {
      UI.onLoad = false;

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
      UI.panelShowDismissed = UI.panel.querySelector('#ed11y-show-hidden');
      UI.message = UI.panel.querySelector('#ed11y-message');
      if (State.option.readabilityPlugin) {
        const detailsTab = document.createElement('details');
        detailsTab.id = 'ed11y-readability-tab';
        detailsTab.innerHTML = `
            <summary>${spriteReadability}<span class="summary-title"></span><span class="close-details">${spriteClose}</span>
            </summary>
            <div class="details">
							<div id="readability-content">
								<p id="readability-info"></p>
								<ul id="readability-details"></ul>
							</div>
						</div>`;
        UI.panel.querySelector('#ed11y-visualizers').appendChild(detailsTab);
        UI.panel.querySelector('#readability-info').appendChild(Constants.Panel.readabilityInfo);
        UI.panel
          .querySelector('#readability-details')
          .appendChild(Constants.Panel.readabilityDetails);
        UI.panel.querySelector('#ed11y-readability-tab .summary-title').textContent =
          Lang._('READABILITY');
      }

      window.setTimeout(
        () => {
          UI.panelElement.classList.remove('ed11y-preload');
        },
        0,
        UI.panel,
      );
      UI.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent =
        Lang._('PANEL_HEADING');
      UI.panel.querySelector('#ed11y-headings-tab .summary-title').textContent = Lang._('OUTLINE');
      UI.panel.querySelector('#ed11y-alts-tab .summary-title').textContent = Lang._('IMAGES');
      UI.panel.querySelector('#ed11y-headings-tab .details-title').innerHTML =
        Lang._('panelCheckOutline');
      UI.panel.querySelector('#ed11y-alts-tab .details-title').innerHTML =
        Lang._('panelCheckAltText');
      UI.panel.querySelector('.jump-next.ed11y-sr-only').textContent = UI.english
        ? Lang._('buttonFirstContent')
        : `${Lang._('SKIP_TO_ISSUE')} 1`;
      UI.panel.setAttribute('aria-label', Lang._('CONTAINER_LABEL'));

      if (State.option.reportsURL) {
        const reportLink = document.createElement('a');
        reportLink.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96C0 61 29 32 64 32l384 0c35 0 64 29 64 64l0 320c0 35-29 64-64 64L64 480c-35 0-64-29-64-64L0 96zm64 0l0 64 64 0 0-64L64 96zm384 0L192 96l0 64 256 0 0-64zM64 224l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64zM64 352l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64z"/></svg><span class="ed11y-sr-only"></span>';
        reportLink.setAttribute('id', 'ed11y-reports-link');
        reportLink.setAttribute('href', State.option.reportsURL);
        reportLink.setAttribute('aria-label', Lang._('reportsLink'));
        reportLink.querySelector('.ed11y-sr-only').textContent = Lang._('reportsLink');
        UI.panelShowDismissed.insertAdjacentElement('beforebegin', reportLink);
      }

      // Escape key closes panels.
      const escapeWatch = (event) => {
        if (event.keyCode === 27) {
          if (
            event.target.closest('ed11y-element-panel') &&
            UI.panelToggle.getAttribute('aria-expanded') === 'true'
          ) {
            UI.panelToggle.focus();
            UI.panelToggle.click();
          } else if (event.target.hasAttribute('data-ed11y-open')) {
            if (UI.tipOpen) {
              UI.toggledFrom?.focus(); // todo is this still needed or handled by the next?
              UI.openTip.button.shadowRoot.querySelector('button').click();
            }
          }
        }
      };
      document.addEventListener('keyup', (event) => {
        escapeWatch(event);
      });

      // Decide whether to open the panel on load.
      if (UI.ignoreAll || (!UI.inlineAlerts && UI.totalCount > 75)) {
        UI.showPanel = false;
      } else if (
        State.option.alertMode === 'active' ||
        !State.option.userPrefersShut ||
        UI.showDismissed
      ) {
        // Show always on load for active mode or by user preference.
        UI.showPanel = true;
      } else if (
        UI.totalCount > 0 &&
        !UI.ignoreAll &&
        (State.option.alertMode === 'assertive' ||
          (State.option.alertMode === 'polite' &&
            UI.seen[encodeURI(State.option.currentPage)] !== UI.totalCount))
      ) {
        // Show sometimes for assertive/polite if there are new items.
        UI.showPanel = true;
      }
    } else if (!UI.inlineAlerts) {
      UI.oldResultString = `${UI.errorCount} ${UI.warningCount}`;
      State.results.forEach((result) => {
        UI.oldResultString += result.test + result.element?.outerHTML;
      });
    }
    // Now we can open or close the panel.
    if (!UI.showPanel) {
      // Close panel.
      reset();
    } else {
      // Ignore issue count if this resulted from a user action.
      UI.showPanel = true;
      UI.panel.classList.remove('ed11y-shut');
      UI.panel.classList.add('ed11y-active');
      // Prepare show hidden alerts button.
      const preferredDismissHide =
        UI.dismissedCount > 1
          ? Lang.sprintf('buttonHideHiddenAlerts', UI.dismissedCount)
          : Lang._('buttonHideHiddenAlert');
      if (UI.dismissedCount === 0) {
        // Reset show hidden default option when irrelevant.
        UI.panelShowDismissed.setAttribute('hidden', '');
        UI.panelShowDismissed.setAttribute('data-ed11y-pressed', 'false');
        UI.showDismissed = false;
      } else if (UI.dismissedCount === 1) {
        const show = UI.english
          ? Lang._('buttonShowHiddenAlert')
          : Lang.sprintf('PANEL_DISMISS_BUTTON', '1');
        UI.panelShowDismissed.querySelector('.ed11y-sr-only').textContent = UI.showDismissed
          ? preferredDismissHide
          : show;
        UI.panelShowDismissed.dataset.ed11yPressed = `${UI.showDismissed}`;
        if (!UI.english) {
          UI.panelShowDismissed.ariaPressed = UI.showDismissed;
        }
        UI.panelShowDismissed.removeAttribute('hidden');
      } else {
        UI.panelShowDismissed.querySelector('.ed11y-sr-only').textContent = UI.showDismissed
          ? preferredDismissHide
          : Lang.sprintf('PANEL_DISMISS_BUTTON', UI.dismissedCount);
        UI.panelShowDismissed.dataset.ed11yPressed = `${UI.showDismissed}`;
        if (!UI.english) {
          UI.panelShowDismissed.ariaPressed = UI.showDismissed;
        }
        UI.panelShowDismissed.removeAttribute('hidden');
      }

      window.setTimeout(() => {
        if (!UI.ignoreAll) {
          requestAnimationFrame(() => showResults());
        }
      }, 0);
    }
    // Update buttons.
    panelLabel();
    if (UI.totalCount > 0 || (UI.showDismissed && UI.dismissedCount > 0)) {
      UI.panelJumpNext.removeAttribute('hidden');
      if (UI.errorCount > 0) {
        // Errors
        UI.panel.classList.remove('ed11y-warnings', 'ed11y-pass');
        UI.panel.classList.add('ed11y-errors');
        document.documentElement.style.setProperty('--ed11y-activeBackground', UI.theme.alert);
        document.documentElement.style.setProperty('--ed11y-activeColor', '#fff');
        document.documentElement.style.setProperty('--ed11y-activeBorder', '#fff7');
        document.documentElement.style.setProperty('--ed11y-activePanelBorder', '#def');
      } else if (UI.warningCount > 0) {
        // Warnings
        UI.panel.classList.remove('ed11y-errors', 'ed11y-pass');
        UI.panel.classList.add('ed11y-warnings');
        document.documentElement.style.setProperty('--ed11y-activeBackground', UI.theme.warning);
        document.documentElement.style.setProperty('--ed11y-activeColor', '#111');
        document.documentElement.style.setProperty('--ed11y-activeBorder', '#947605');
        document.documentElement.style.setProperty('--ed11y-activePanelBorder', '#947605');
      } else {
        // Issues present but dismissed.
        UI.panel.classList.remove('ed11y-errors', 'ed11y-warnings');
        UI.panel.classList.add('ed11y-pass');
        document.documentElement.style.setProperty('--ed11y-activeBackground', UI.theme.panelBar);
        document.documentElement.style.setProperty('--ed11y-activeColor', UI.theme.panelBarText);
        document.documentElement.style.setProperty(
          '--ed11y-activeBorder',
          `${UI.theme.panelBarText}44`,
        );
        document.documentElement.style.setProperty(
          '--ed11y-activePanelBorder',
          `${UI.theme.panelBarText}88`,
        );
      }
      if (UI.dismissedCount > 0 && UI.totalCount === 0) {
        UI.panelCount.textContent = UI.dismissedCount;
      } else {
        UI.panelCount.textContent = UI.totalCount > 99 ? '99+' : UI.totalCount;
      }
    } else {
      UI.panelJumpNext.setAttribute('hidden', '');
      document.documentElement.style.setProperty('--ed11y-activeBackground', UI.theme.panelBar);
      document.documentElement.style.setProperty('--ed11y-activeColor', UI.theme.panelBarText);
      document.documentElement.style.setProperty(
        '--ed11y-activeBorder',
        `${UI.theme.panelBarText}44`,
      );
      document.documentElement.style.setProperty(
        '--ed11y-activePanelBorder',
        `${UI.theme.panelBarText}88`,
      );

      UI.panelCount.style.display = 'display: none;';
      UI.panel.classList.remove('ed11y-warnings', 'ed11y-errors');
      UI.panel.classList.add('ed11y-pass');

      if (UI.dismissedCount > 0) {
        UI.panelCount.textContent = 'i';
        if (!UI.showPanel) {
          UI.panelToggleTitle.textContent =
            UI.dismissedCount > 1
              ? Lang.sprintf('PANEL_DISMISS_BUTTON', UI.dismissedCount)
              : Lang._('buttonShowHiddenAlert');
        }
      }
    }
    UI.panelToggle.classList.remove('disabled');
    UI.panelToggle.removeAttribute('aria-disabled');
    alignPanel();
    UI.panel.classList.remove('ed11y-preload');
  }

  resumeObservers();
  UI.running = false;
}

export function buildJumpList() {
  UI.jumpList = [];
  pauseObservers();
  const toSplice = [];

  // Initial alignment to get approximate Y position order for jump list.
  for (let i = 0; i < State.results.length; i++) {
    if (!State.results[i].element) {
      // E.g. readability. Should never happen but race conditions are possible.
      toSplice.push(i);
      continue;
    }
    let top = State.results[i].element.getBoundingClientRect().top;
    if (!top) {
      const visibleParent = firstVisibleParent(State.results[i].element);
      if (visibleParent) {
        top = visibleParent.getBoundingClientRect().top;
      }
    }
    top = top + window.scrollY;
    if (State.option.fixedRoots) {
      const root = State.results[i].element.closest('[data-ed11y-root]');
      State.results[i].fixedRoot = root ? root.dataset.ed11yRoot : false;
    }
    State.results[i].scrollableParent = closestScrollable(State.results[i].element);
    if (State.results[i].scrollableParent) {
      // Group these together.
      top = top * 0.000001;
    }
    State.results[i].sortPos = top;
  }
  toSplice.forEach((i) => {
    State.results.splice(i, 1);
  });

  // Sort from bottom to top so focus order after insert is top to bottom.
  State.results.sort((a, b) => b.sortPos - a.sortPos);
  State.results?.forEach((result, i) => {
    if (result.element && (!result.dismissalStatus || UI.showDismissed)) {
      drawResult(result, i);
    }
  });
  UI.jumpList.forEach((el, i) => {
    el.dataset.ed11yJumpPosition = `${i}`;
    const newLabel = `${Lang._('ALERT_TEXT')} ${i + 1} / ${UI.jumpList.length - 1}, ${el.shadowRoot.querySelector('.toggle').getAttribute('aria-label')}`;
    el.shadowRoot.querySelector('.toggle').setAttribute('aria-label', newLabel);
  });
  const tipsPainted = new CustomEvent('ed11yResultsPainted');
  document.dispatchEvent(tipsPainted);
  resumeObservers();
}

export function dismissOne(dismissalType, test, dismissalKey) {
  // Update dismissal record.
  if (UI.dismissKeys[dismissalKey]) {
    dismissalKey = UI.dismissKeys[dismissalKey];
  }
  if (dismissalType === 'reset') {
    delete UI.dismissedAlerts[State.option.currentPage][test][dismissalKey];
    if (Object.keys(UI.dismissedAlerts[State.option.currentPage][test]).length === 0) {
      delete UI.dismissedAlerts[State.option.currentPage][test];
    }
    if (Object.keys(UI.dismissedAlerts[State.option.currentPage]).length === 0) {
      delete UI.dismissedAlerts[State.option.currentPage];
    }
    //window.requestAnimationFrame(() => updatePanel());
  } else {
    const dismissal = {};
    dismissal[dismissalKey] = dismissalType;
    if (typeof UI.dismissedAlerts[State.option.currentPage] === 'undefined') {
      const store = {};
      store[test] = dismissal;
      UI.dismissedAlerts[State.option.currentPage] = store;
    } else if (typeof UI.dismissedAlerts[State.option.currentPage][test] === 'undefined') {
      UI.dismissedAlerts[State.option.currentPage][test] = dismissal;
    } else {
      UI.dismissedAlerts[State.option.currentPage][test][dismissalKey] = dismissalType;
    }
    UI.panelShowDismissed.removeAttribute('hidden');
  }

  // Send record to storage or dispatch an event to an API.
  if (State.option.syncedDismissals === false) {
    localStorage.setItem('ed11ydismissed', JSON.stringify(UI.dismissedAlerts));
  }
  const dismissalDetail = {
    dismissPage: State.option.currentPage,
    dismissTest: test,
    dismissKey: dismissalKey,
    dismissAction: dismissalType,
  };
  const ed11yDismissalUpdate = new CustomEvent('ed11yDismissalUpdate', { detail: dismissalDetail });
  window.setTimeout(() => {
    document.dispatchEvent(ed11yDismissalUpdate);
  }, 100);
}

export function editableHighlighter(resultID, show, firstVisible) {
  if (!show) {
    UI.editableHighlight[resultID]?.highlight.style.setProperty('opacity', '0');
    return;
  }
  const result = State.results[resultID];
  if (!result || (!firstVisible && !result.element)) {
    return;
  }
  let el = UI.editableHighlight[resultID]?.highlight;
  if (!el) {
    el = document.createElement('ed11y-element-highlight');
    el.classList.add('ed11y-element');
    UI.editableHighlight[resultID] = { highlight: el, resultID: resultID };
    el.style.setProperty('position', 'absolute');
    el.style.setProperty('pointer-events', 'none');
    UI.panelAttachTo.appendChild(el);
  } else if (!el.parentElement) {
    // detached due to reset.
    document.body.appendChild(el);
  }
  UI.editableHighlight[resultID].target = firstVisible ? firstVisible : result.element;
  const zIndex = result.dismissalStatus
    ? 'calc(var(--ed11y-buttonZIndex, 9999) - 2)'
    : 'calc(var(--ed11y-buttonZIndex, 9999) - 1)';
  el.style.setProperty('z-index', zIndex);
  const outline =
    result.type === 'warning'
      ? '0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-warning, #fad859), 0 0 0 3px var(--ed11y-warning, #fad859), 0 0 0 4px var(--ed11y-primary)'
      : '0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-alert, #b80519), 0 0 0 3px var(--ed11y-alert, #b80519), 0 0 1px 3px';
  el.style.setProperty('box-shadow', outline);
  el.style.setProperty('border-radius', '3px');
  el.style.setProperty('top', '0');
  el.style.setProperty('left', '0');
  alignHighlights();
  el.style.setProperty('opacity', '1');
}

export function transferFocus() {
  if (!UI.tipOpen) {
    return;
  }
  const id = UI.openTip.tip.dataset.ed11yResult;
  const target = State.results[id].element;
  const editable = target.closest('[contenteditable]');
  if (!editable && !target.closest('textarea, input')) {
    if (target.closest('a, button')) {
      UI.toggledFrom = target.closest('a, button');
    } else if (target.getAttribute('tabindex') !== null) {
      UI.toggledFrom = target;
    } else {
      target.setAttribute('tabindex', '0');
      UI.toggledFrom = target;
    }
    UI.openTip.tip.shadowRoot.querySelector('.close').click();
  } else {
    UI.toggledFrom = false;
    if (target.getAttribute('contenteditable') === 'true') {
      UI.toggledFrom = target;
    } else if (target.closest('p[contenteditable="true"]')) {
      UI.toggledFrom = target.closest('p[contenteditable="true"]');
    } else {
      // Just got complicated -- need to move a caret
      UI.toggledFrom = false;
    }
    UI.openTip.tip.shadowRoot.querySelector('.close').click();
    if (!UI.toggledFrom && editable) {
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

export function paintReady() {
  if (!State.option.cssUrls) {
    const cssLink = document.querySelector(
      'link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]',
    );
    if (cssLink) {
      State.option.cssUrls = [cssLink.getAttribute('href')];
    } else {
      console.warn('Editoria11y CSS file parameter is missing; attempting to load from CDN.');
      State.option.cssUrls = [
        `https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${UI.version}/dist/editoria11y.min.css`,
      ];
    }
  }

  for (const [key, value] of Object.entries(UI.theme)) {
    document.documentElement.style.setProperty(`--ed11y-${key}`, `${value}`);
  }

  // May be redundant, but preloads unbundled files.
  if (document.querySelector('body')) {
    // May be redundant, but preloads unbundled files.
    UI.attachCSS(document.querySelector('body'));
  }

  UI.roots.forEach((root) => {
    // Shadow elements don't inherit styles, so they need their own copy.
    if (State.option.shadowComponents) {
      root.querySelectorAll(State.option.shadowComponents)?.forEach((shadowHost) => {
        if (shadowHost.shadowRoot) {
          UI.attachCSS(shadowHost.shadowRoot);
        }
      });
    }
  });
  UI.bodyStyle = 'drawing';
  window.setTimeout(() => {
    // Let first tips fade in.
    UI.bodyStyle = true;
  }, 1000);
}

export function alertOnInvisibleTip(button, target) {
  let delay = 100;
  if (State.option.hiddenHandlers.length > 0 && !!target.closest(State.option.hiddenHandlers)) {
    // Increase hesitation before scrolling, in case theme animates open an element.
    delay = 333;
    document.dispatchEvent(
      new CustomEvent('ed11yShowHidden', {
        // heeeere: can we pass via-jump?
        detail: {
          result: button.getAttribute('data-ed11y-result'),
          viaJump: UI.viaJump,
        },
      }),
    );
  }
  const details = target.closest('details');
  if (details && !details.open) {
    details.open = true;
    delay = 333;
  }

  // Scroll into view and throw an alert if the button or target is hidden.
  window.setTimeout(
    (button, target) => {
      UI.message.textContent = '';
      let firstVisible = false;
      let alertMessage;
      if (State.option.checkVisible && !visible(target)) {
        button.dataset.ed11yHiddenResult = 'true';
        firstVisible = firstVisibleParent(target);
        alertMessage = Lang._('NOT_VISIBLE');
      } else if (target.closest('[aria-hidden="true"]')) {
        firstVisible = target.closest('[aria-hidden="true"]');
        firstVisible = firstVisible.closest(':not([aria-hidden="true"])');
        alertMessage = Lang._('NOT_VISIBLE');
      }
      if (firstVisible) {
        // Throw warning that the element cannot be highlighted.
        const tipAlert = UI.openTip.tip?.shadowRoot.querySelector('.invisible-alert');
        tipAlert.textContent = alertMessage;
      }
      if (UI.viaJump) {
        const scrollPin =
          window.innerHeight > 900 || (window.innerWidth > 800 && window.innerHeight > 600)
            ? 'center'
            : 'start';
        let scrollTarget = UI.inlineAlerts ? button : target;
        if (button.dataset.ed11yHiddenResult || !visible(scrollTarget)) {
          scrollTarget = firstVisibleParent(target);
        }
        if (scrollTarget && typeof scrollTarget.scrollIntoView === 'function') {
          scrollTarget.scrollIntoView({ block: scrollPin, behavior: 'instant' });
        } else {
          hardRefresh(true);
          return false;
        }
      }
      if (!UI.inlineAlerts) {
        editableHighlighter(button.dataset.ed11yResult, true, firstVisible);
      } else {
        if (firstVisible) {
          firstVisible.classList.add('ed11y-hidden-highlight');
        }
      }
      const activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
      if (!activeTip) {
        button.setAttribute('data-ed11y-action', 'open');
        if (UI.viaJump) {
          window.setTimeout(() => {
            // Race conditions are fun.
            const activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
            if (UI.viaJump) {
              activeTip?.shadowRoot.querySelector('.title').focus();
            }
          }, 100);
        }
      } else {
        if (UI.viaJump) {
          window.setTimeout(
            () => {
              // Race conditions are fun.
              activeTip?.shadowRoot.querySelector('.title').focus();
            },
            100,
            activeTip,
          );
        }
      }
      UI.viaJump = false;
    },
    delay,
    button,
    target,
  );
}

export function jumpTo(next = true) {
  if (!UI.showPanel) {
    return false;
  }
  UI.viaJump = true;
  // Determine target result.
  const goMax = UI.jumpList.length - 1;
  let goNum = next ? +UI.openJumpPosition + 1 : +UI.openJumpPosition - 1;
  if (goNum < 0) {
    // Reached end of loop or dismissal pushed us out of loop
    UI.nextText = Lang._('SKIP_TO_ISSUE');
    goNum = goMax;
  } else if (goNum > goMax) {
    goNum = 0;
    UI.nextText = Lang._('SKIP_TO_ISSUE');
  } else {
    const showNum = Number.isNaN(goNum) ? 2 : goNum + 2;
    UI.nextText = `${Lang._('SKIP_TO_ISSUE')} ${showNum}`;
  }
  UI.openJumpPosition = goNum;
  window.setTimeout(() => {
    UI.panelJumpNext.querySelector('.ed11y-sr-only').textContent = UI.nextText;
  }, 250);

  resetClass(['ed11y-hidden-highlight']);
  if (UI.jumpList.length === 0) {
    buildJumpList();
  }
  // Find next or first result in the dom ordered list of results.
  let goto = UI.jumpList[goNum];
  if (!goto) {
    goto = UI.jumpList[0];
    UI.openJumpPosition = 0;
  }
  const result = goto.getAttribute('data-ed11y-result');
  const gotoResult = State.results[result];
  const target = gotoResult.element;

  // First of two scrollTo calls, to trigger any scroll based events.
  const scrollPin =
    window.innerHeight > 900 || (window.innerWidth > 800 && window.innerHeight > 600)
      ? 'center'
      : 'start';
  let scrollTarget = UI.inlineAlerts ? goto : target;
  if (goto.dataset.ed11yHiddenResult || !visible(scrollTarget)) {
    scrollTarget = firstVisibleParent(target);
  }
  if (scrollTarget && typeof scrollTarget.scrollIntoView === 'function') {
    scrollTarget.scrollIntoView({ block: scrollPin, behavior: 'instant' });
  } else {
    hardRefresh(true);
    return false;
  }

  // Open the button
  goto.setAttribute('data-ed11y-action', 'open');
  UI.scrollPending = 2;
  updateTipLocations();
}

export const incrementalAlign = lagBounce(() => {
  if (!UI.running && !UI.alignPending) {
    UI.scrollPending++;
    updateTipLocations();
    UI.alignPending = false;
  } else {
    incrementalAlign();
  }
}, 10);

export function alignTip(button, toolTip, recheck = 0, reveal = false) {
  if (!toolTip) {
    return;
  }

  const arrow = toolTip.shadowRoot.querySelector('.arrow');
  const tip = arrow.nextElementSibling;
  const loopCount = recheck - 1;

  // Various hiddenHandlers may cause element to animate open.
  if (recheck > 0) {
    window.setTimeout(
      () => {
        requestAnimationFrame(() => alignTip(button, toolTip, loopCount, reveal));
      },
      200 / loopCount,
      button,
      toolTip,
      loopCount,
      reveal,
    );
  }
  if (reveal) {
    window.setTimeout(
      () => {
        toolTip.style.setProperty('opacity', '1');
        // 140 seems to be the minimum to not flash.
      },
      140,
      toolTip,
      tip,
    );
  }

  const mark = button.getRootNode().host;
  const resultNum = button.dataset.ed11yResult;
  const result = State.results[resultNum];

  // Find button on page
  const scrollTop = window.scrollY;
  const leftAdd = UI.inlineAlerts ? window.scrollX : 0;

  let buttonOffset = button.getBoundingClientRect();
  let buttonSize = buttonOffset.width;
  let buttonLeft = buttonOffset.left + leftAdd;
  let buttonTop = buttonOffset.top + scrollTop;

  let containTop = scrollTop;
  let containLeft = 0;
  let containWidth = window.innerWidth;
  let containBottom = window.innerHeight + scrollTop;
  let absoluteBottom = containBottom;

  if (!UI.inlineAlerts && result.scrollableParent) {
    const bounds = result.scrollableParent.getBoundingClientRect();
    if (bounds.width > 0) {
      //buttonTop = buttonTop + result.scrollableParent.scrollTop;
      containLeft = Math.max(0, bounds.left);
      containWidth = Math.min(containWidth, bounds.width - 30);
      containBottom = bounds.bottom + scrollTop;
      containTop = bounds.top + scrollTop;
      absoluteBottom = bounds.top + result.scrollableParent.scrollHeight;
    }
  } else if (
    mark.dataset.ed11yHiddenResult === 'true' ||
    !(visible(mark) || (buttonOffset.top === 0 && buttonOffset.left === 0))
  ) {
    // Invisible button
    // todo postpone: could we use the not-inline drawing pattern for invisible targets?
    const theFirstVisibleParent = firstVisibleParent(mark.result.element);
    if (theFirstVisibleParent) {
      buttonOffset = theFirstVisibleParent.getBoundingClientRect();
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
  document.documentElement.style.setProperty('--ed11y-buttonWidth', `${buttonSize}px`);
  tip.style.setProperty('max-width', `min(${containWidth > 280 ? containWidth : 280}px, 90vw)`);
  const containRight = Math.min(window.innerWidth, containLeft + containWidth);
  toolTip.style.setProperty('top', `${buttonOffset.top + scrollTop}px`);
  toolTip.style.setProperty('left', `${buttonOffset.left + leftAdd}px`);
  const tipWidth = tip.offsetWidth;
  const tipHeight = tip.offsetHeight;

  let direction = 'under';

  // Default to displaying under
  if (buttonTop === 0 && buttonLeft === 0) {
    direction = 'whompWhomp';
  } else if (buttonTop + tipHeight + scrollTop + buttonSize + 22 > containBottom) {
    // It won't fit under. Look elsewhere.
    if (
      containRight > buttonSize + tipWidth + buttonLeft + 30 &&
      containTop + tipHeight + 30 < containBottom
    ) {
      direction = 'right';
    } else if (buttonTop - tipHeight - 15 > containTop) {
      direction = 'above';
    } else if (
      containLeft < buttonLeft - (buttonSize + tipWidth + 30) &&
      containTop + tipHeight + 30 < containBottom
    ) {
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

  const align = (container, alignTo, size, direction) => {
    const over = container - (alignTo + size + buttonSize);
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
      arrow.style.setProperty('top', `${buttonSize}px`);
      arrow.style.setProperty('right', 'auto');
      arrow.style.setProperty('bottom', 'auto');
      arrow.style.setProperty('left', `${buttonSize / 2 - 10}px`);
      tip.style.setProperty('top', `${buttonSize + 10}px`);
      tip.style.setProperty('right', 'auto');
      tip.style.setProperty('bottom', 'auto');
      tip.style.setProperty('left', '-4px');
      break;
    case 'above':
      nudgeX = align(containRight, buttonLeft, tipWidth, 'horizontal');
      arrow.style.setProperty('top', 'auto');
      arrow.style.setProperty('right', 'auto');
      arrow.style.setProperty('bottom', '2px');
      arrow.style.setProperty('left', `${buttonSize / 2 - 10}px`);
      tip.style.setProperty('top', 'auto');
      tip.style.setProperty('right', 'auto');
      tip.style.setProperty('bottom', '12px');
      tip.style.setProperty('left', '-4px');
      break;
    case 'right':
      nudgeY = align(containBottom, buttonTop, tipHeight, 'vertical');
      arrow.style.setProperty('top', `${buttonSize / 2 - 10}px`);
      arrow.style.setProperty('right', 'auto');
      arrow.style.setProperty('bottom', 'auto');
      arrow.style.setProperty('left', `${buttonSize}px`);
      tip.style.setProperty('top', '-4px');
      tip.style.setProperty('right', 'auto');
      tip.style.setProperty('bottom', 'auto');
      tip.style.setProperty('left', `${buttonSize + 10}px`);
      break;
    case 'left':
      nudgeY = align(containBottom, buttonTop, tipHeight, 'vertical');
      arrow.style.setProperty('top', `${buttonSize / 2 - 10}px`);
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

export function updateTipLocations() {
  if (!UI.scrollTicking && UI.scrollPending > 0 && !UI.running && UI.jumpList && UI.showPanel) {
    UI.scrollTicking = true;
    alignButtons();
    if (UI.tipOpen) {
      alignTip(UI.openTip.button.shadowRoot.querySelector('button'), UI.openTip.tip);
    }
    UI.scrollPending--;
  }
  UI.scrollTicking = false;
  if (UI.scrollPending > 0) {
    window.setTimeout(() => {
      requestAnimationFrame(() => updateTipLocations());
    }, 0);
  }
}

export function alignHighlights() {
  // This duplicates code in alignButtons; can it be dropped?
  if (State.option.fixedRoots && Object.keys(UI.editableHighlight).length > 0) {
    UI.positionedFrames.length = 0;

    State.option.fixedRoots.forEach((root) => {
      if (root.framePositioner) {
        UI.positionedFrames.push(root.framePositioner.getBoundingClientRect());
      }
    });
  }

  Object.values(UI.editableHighlight).every((el) => {
    if (!State.results[el.resultID]) {
      UI.interaction = true;
      UI.forceFullCheck = true;
      UI.editableHighlight = [];
      incrementalCheckDebounce(true);
      return false;
    }

    if (!Object.keys(UI.openTip.button).length) {
      return false;
    }
    if (UI.openTip.button.dataset.ed11yResult !== el.resultID) {
      return true;
    }
    const framePositioner =
      State.results[el.resultID].fixedRoot &&
      UI.positionedFrames[State.results[el.resultID].fixedRoot]
        ? UI.positionedFrames[State.results[el.resultID].fixedRoot]
        : { top: 0, left: 0 };

    let targetOffset = el.target.getBoundingClientRect();
    if (!visible(el.target)) {
      // Invisible target.
      const theVisibleParent = firstVisibleParent(el.target);
      targetOffset = theVisibleParent ? theVisibleParent.getBoundingClientRect() : targetOffset;
    }

    el.highlight.style.setProperty('width', `${targetOffset.width + 6}px`);
    el.highlight.style.setProperty(
      'top',
      `${targetOffset.top + framePositioner.top + window.scrollY - 3}px`,
    );
    el.highlight.style.setProperty('left', `${targetOffset.left + framePositioner.left - 3}px`);
    el.highlight.style.setProperty('height', `${targetOffset.height + 6}px`);
    return true;
  });
}

export const slowIncremental = lagBounce(() => {
  //incrementalAlign(); // Immediately realign tips.
  //UI.alignPending = false;
  UI.interaction = true;
  incrementalCheckDebounce();
}, 500);

export function windowResize() {
  if (UI.panel?.classList.contains('ed11y-active') === true) {
    alignAlts();
    alignButtons();
  }
  if (UI.tipOpen) {
    alignTip(UI.openTip.button.shadowRoot.querySelector('button'), UI.openTip.tip);
  }
  alignPanel();
}

const scrollWatch = (container) => {
  container.addEventListener(
    'scroll',
    () => {
      // Trigger on scrolling other containers, unless it will flicker a tip.
      if (!UI.inlineAlerts) {
        UI.scrollPending = UI.scrollPending < 2 ? UI.scrollPending + 1 : UI.scrollPending;
        requestAnimationFrame(() => updateTipLocations());
      } else if (UI.tipOpen) {
        alignTip(UI.openTip.button.shadowRoot.querySelector('button'), UI.openTip.tip);
      }
    },
    {
      passive: true,
    },
  );
};

export function intersectionObservers() {
  Elements.Found.editable?.forEach((editable) => {
    scrollWatch(editable);
  });

  scrollWatch(document);

  document.addEventListener(
    'selectionchange',
    () => {
      if (!UI.running) {
        selectionChanged();
      }
    },
    {
      passive: true,
    },
  );
}

export const selectionChanged = lagBounce(() => {
  if (rangeChange()) {
    updateTipLocations();
    checkEditableIntersects();
  }
}, 100);

export function rangeChange(anchorNode) {
  let anchor = anchorNode ? anchorNode : window.getSelection()?.anchorNode;
  const expandable =
    anchor?.parentNode &&
    typeof anchor.parentNode === 'object' &&
    typeof anchor.parentNode.matches === 'function';
  if (
    !anchor ||
    (expandable &&
      (Array.prototype.includes.call(UI.roots, anchor.parentNode) ||
        anchor.parentNode.matches('div[contenteditable="true"]')))
  ) {
    UI.activeRange = false;
    return false;
  }
  if (expandable) {
    const textParent = anchor.parentNode.closest('p, td, th, li, h2, h3, h4, h5, h6');
    if (textParent) {
      anchor = textParent;
    }
  }
  const range = document.createRange();
  if (typeof anchor === 'object') {
    range.setStartBefore(anchor);
    range.setEndAfter(anchor);
  }
  if (typeof range !== 'object' || typeof range.getBoundingClientRect !== 'function') {
    if (UI.activeRange) {
      UI.activeRange = false;
      return true;
    } else {
      return false;
    }
  } else {
    const sameRange =
      UI.activeRange &&
      range.startContainer === UI.activeRange.startContainer &&
      range.startOffset === UI.activeRange.startOffset;
    UI.activeRange = range;
    return !sameRange;
  }
}

/*
Set up mutation observer for added nodes.
*/
export function startObserver(root) {
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
    if (typeof root.host !== 'function' || root.host.dataset.editoria11yObserver !== undefined) {
      // Already watching or something is weird.
      return;
    } else {
      // Observe host instead.
      root.host.dataset.editoria11yObserver = 'true';
    }
  }

  // Options for the observer (which mutations to observe)
  const config = { childList: true, subtree: true, characterData: true };

  const logNode = (node) => {
    /*
     * Newly inserted tables and headings should not be flagged as empty
     * before the user has a chance to edit them. This is crude, but it
     * delays flagging.
     * */
    if (
      !node ||
      node.nodeType !== 1 ||
      !node.isConnected ||
      node.closest('script, link, head, .ed11y-wrapper, .ed11y-style, .ed11y-element')
    ) {
      return 0;
    }
    if (UI.inlineAlerts) {
      return 1;
    }
    if (!node.matches('[contenteditable] *')) {
      return 0;
    }
    if (UI.inlineAlerts) {
      return true;
    }
    const searchList = 'table, h1, h2, h3, h4, h5, h6, blockquote';
    if (
      !UI.inlineAlerts &&
      !node.matches(node.matches(searchList)) &&
      node.matches('[contenteditable] *')
    ) {
      if (node.matches('table *')) {
        node = node.closest('table');
      } else if (!node.matches(searchList)) {
        node = node.querySelector(searchList);
      }
    }
    if (node?.matches(searchList)) {
      UI.recentlyAddedNodes.set(node, Date.now());
      incrementalAlign(); // Immediately realign tips.
      return 0;
    }
    return 1;
  };

  // Create an observer instance linked to the callback function
  const callback = (mutationList) => {
    let align = 0;
    for (const mutation of mutationList) {
      if (
        mutation.type === 'characterData' &&
        mutation.target.parentElement &&
        mutation.target.parentElement.matches('[contenteditable] *, [contenteditable]')
      ) {
        incrementalAlign();
        slowIncremental();
        return;
      } else if (mutation.type === 'childList') {
        // Recheck if there are relevant node changes.
        if (mutation.removedNodes.length > 0) {
          align += 1;
        } else if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            align += logNode(node);
          });
        }
      }
    }
    // These are debounced
    if (!align) {
      return;
    }
    window.setTimeout(() => {
      incrementalAlign(); // Immediately realign tips.
      UI.alignPending = false;
    }, 0);
    window.setTimeout(() => {
      incrementalCheckDebounce(); // Recheck after delay.
    }, 0);
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);
  // Start observing the target node for configured mutations
  observer.observe(root, config);
  UI.watching.push({
    observer: observer,
    root: root,
    config: config,
  });
  document.addEventListener(
    'readystatechange',
    () => {
      window.setTimeout(() => {
        UI.scrollPending++;
        updateTipLocations();
      }, 100);
    },
    {
      passive: true,
    },
  );
  document.addEventListener(
    'paste',
    () => {
      UI.scrollPending++;
      updateTipLocations();
      window.setTimeout(() => {
        UI.forceFullCheck = true;
        incrementalCheckDebounce();
      }, 100);
    },
    {
      passive: true,
    },
  );
  window.setTimeout(() => {
    UI.scrollPending++;
    updateTipLocations();
  }, 1000);
}

/*const getRuleset = {
	checkHeaders: checkHeaders(Results, Options, State.headingOutline),
	checkLinkText:
	checkImages: ,
	checkLabels: ,
	checkQA: ,
}*/

const enqueueTests = (queue) => {
  const test = queue.pop();
  UI.testsRemaining--;
  try {
    switch (test) {
      case 'group1':
        checkHeaders();
        checkImages();
        checkEmbeddedContent();
        customRuleset();
        checkQA();
        break;
      case 'group2':
        checkLinkText();
        break;
      case 'checkLabels':
        checkLabels();
        break;
      case 'checkContrast':
        checkContrast();
        break;
      case 'checkDeveloper':
        checkDeveloper();
        break;
    }
  } catch (error) {
    showError(error);
  }
  if (queue.length > 0) {
    if (UI.browserSpeed < 100 || State.option.headless) {
      enqueueTests(queue);
    } else {
      window.setTimeout(
        (queue) => {
          enqueueTests(queue);
        },
        0,
        queue,
      );
    }
  } else {
    continueCheck().then();
  }
};

function removeCustomTest() {
  console.error(
    'Editoria11y has disabled a custom test that is not returning results within 1000ms.',
  );
  State.option.customTests--;
  UI.customTestsRemaining = 0;
  continueCheck(true).then();
  if (State.option.customTests === 0) {
    document.removeEventListener('ed11yResume', () => {
      continueCheck(true).then();
    });
  }
}

UI.testsRemaining = 0;
// Toggles the outline of all headers, link texts, and images.
export function checkAll() {
  if (UI.tipOpen) {
    return false;
  }
  UI.disabled = false;

  if (checkRunPrevent()) {
    disable();
  }

  UI.customTestsRunning = false;

  if (UI.splitConfiguration.active) {
    Object.assign(State.option, UI.splitConfiguration.devOptions);
  }

  UI.roots = [];
  if (State.option.fixedRoots) {
    State.option.fixedRoots.forEach((root) => {
      UI.roots.push(root);
    });
  } else {
    UI.roots = document.querySelectorAll(`:is(${State.option.checkRoot})`);
  }
  // Initialize root areas to check.
  if (!UI.roots && State.option.headless === false) {
    console.warn(Lang.sprintf('MISSING_ROOT', State.option.checkRoot));
  }

  if (UI.roots.length === 0) {
    if (UI.onLoad) {
      console.warn(Lang._('MISSING_ROOT'));
    }
    disable();
    return;
  }

  if (UI.incremental) {
    // They get restored if unchanged.
    UI.oldResults = State.results;
  }
  // Reset counts
  State.results.length = 0;
  UI.splitConfiguration.devResults.length = 0;

  buildElementList();

  if (State.option.customTests > 0) {
    // Pause
    UI.customTestsRemaining += State.option.customTests;
    window.clearTimeout(UI.customTestTimeout);
    UI.customTestTimeout = window.setTimeout(() => {
      if (UI.customTestsRemaining > 0) {
        removeCustomTest();
      }
    }, 1000);
    const customTests = new CustomEvent('ed11yRunCustomTests');
    document.dispatchEvent(customTests); // todo postpone: there is a possible race condition here for slow custom tests that are removed but return results during the next run.
  }

  // Call rulesets.
  const queue = ['group1', 'group2'];

  if (State.option.formLabelsPlugin) {
    queue.push('checkLabels');
  }
  if (State.option.developerPlugin) {
    queue.push('checkDeveloper');
  }
  if (State.option.contrastPlugin) {
    queue.push('checkContrast');
  }
  UI.testsRemaining = queue.length;
  enqueueTests(queue);
}

export async function continueCheck(customCheck = false) {
  if (customCheck) {
    UI.customTestsRemaining--;
  }
  // change to only countering fro custom tests
  if (UI.customTestsRemaining + UI.testsRemaining > 0) {
    // Tests still in progress.
    return;
  }

  // Filter split configuration results.
  if (UI.splitConfiguration.active && UI.splitConfiguration.devResults.length > 0) {
    await handleSyncOnlyResults();
  } else {
    await filterAlerts(false);
    syncResults(State.results);
  }
  countAlerts();

  if (typeof UI.panelToggle.querySelector === 'function') {
    panelLabel();
  }
  if (UI.visualizing) {
    if (State.option.readabilityPlugin && (!UI.incremental || UI.visualizing)) {
      checkReadability(
        UI.splitConfiguration.active ? UI.splitConfiguration.devResults : State.results,
        State.option,
      );
    }
    showHeadingsPanel();
    showAltPanel();
  }

  updatePanel();
  window.setTimeout(() => {
    if (State.option.watchForChanges) {
      Elements.Found.editable?.forEach((editable) => {
        if (!editable.matches('.drag-observe')) {
          editable.classList.add('drag-observe');
          editable.addEventListener('drop', () => {
            // This event does not bubble.
            UI.forceFullCheck = true;
            incrementalCheckDebounce();
          });
        }
      });
      if (State.option.watchForChanges === 'checkRoots') {
        UI.roots?.forEach((root) => {
          startObserver(root);
        });
      } else {
        startObserver(document.body);
      }
      resumeObservers(); // on recheck.
    }
  }, 0);
}

export function incrementalCheck() {
  if (!UI.running) {
    if (UI.tipOpen || (!UI.interaction && !UI.forceFullCheck)) {
      return;
    }
    UI.interaction = false;
    UI.running = true;
    let runTime = performance.now();
    UI.incremental = true;
    if (UI.disabled && UI.closedByDisable) {
      UI.showPanel = true;
      UI.closedByDisable = false;
      UI.disabled = false;
    }
    checkAll();
    window.setTimeout(() => {
      if (UI.visualizing) {
        document.dispatchEvent(new CustomEvent('ed11yEndVisualization'));
      }
    }, 500);
    // Increase debounce if runs are slow.
    runTime = performance.now() - runTime;
    UI.browserSpeed = runTime > 100 ? 100 : (UI.browserSpeed + runTime) / 2;
    // Todo: optimize tip placement so we do not need as much debounce.
    UI.browserLag = UI.browserSpeed < 1 ? 0 : UI.browserSpeed * 100 + UI.totalCount;
  } else {
    // Ed11y was running, try again later.
    window.setTimeout(() => {
      incrementalCheckDebounce();
    }, 250);
  }
}

export const incrementalCheckDebounce = lagBounce(() => {
  incrementalCheck();
}, 250);

export function refresh() {
  incrementalCheckDebounce();
}

export function resetPanel() {
  // Reset main panel.
  UI.visualizing = true; // so visualize function removes visualizers.
  visualize();
  if (UI.totalCount === 0 && UI.dismissedCount > 0) {
    UI.panelCount.textContent = 'i';
    UI.panelToggleTitle.textContent =
      UI.dismissedCount === 1
        ? Lang._('buttonShowHiddenAlert')
        : Lang.sprintf('PANEL_DISMISS_BUTTON', UI.dismissedCount);
  }

  if (typeof UI.panel === 'object') {
    UI.panel?.classList.add('ed11y-shut');
    UI.panel?.classList.remove('ed11y-active');
    UI.panelToggle.ariaExpanded = false;
    if (!UI.showDismissed && typeof UI.panelShowDismissed === 'function') {
      UI.panelShowDismissed.setAttribute('data-ed11y-pressed', 'false');
      UI.panelShowDismissed.querySelector('.ed11y-sr-only').textContent =
        UI.dismissedCount === 1
          ? Lang._('buttonShowHiddenAlert')
          : Lang.sprintf('PANEL_DISMISS_BUTTON', UI.dismissedCount);
    }
  }
}

// @todo is this abstraction still needed?
window.addEventListener('ed11yEndVisualization', () => {
  UI.visualizing = false;
  pauseObservers();
  visualize();
  resumeObservers();
});

export function dismissThis(dismissalType, button) {
  // Find the active tip and draw its identifying information from the result list
  const tip = button.closest('.ed11y-wrapper');
  const test = tip.querySelector('[data-test]').dataset.test;
  const dismissKey = tip.dataset.ed11yDismiss;

  if (button.dataset.ed11yAll === 'true') {
    State.results.forEach((result) => {
      if (result.test === test && result.dismissalStatus !== dismissalType) {
        dismissOne(dismissalType, test, dismissKey);
      }
    });
  } else {
    dismissOne(dismissalType, test, dismissKey);
  }

  // Remove tip and reset borders around element
  reset();
  UI.showPanel = true;
  checkAll();

  const rememberGoto = UI.openJumpPosition;

  window.setTimeout(
    () => {
      if (UI.jumpList.length > 0) {
        UI.openJumpPosition = rememberGoto - 1;
        UI.panelJumpNext?.focus();
      } else {
        window.setTimeout(() => {
          UI.panelToggle?.focus();
        }, 100);
      }
    },
    500,
    rememberGoto,
  );
}

export function toggleShowDismissals() {
  // todo postpone: if user has allowHide but not allowOK or vice versa, this temporarily clears both.
  UI.ignoreAll = false;
  UI.showDismissed = !UI.showDismissed;
  //reset();
  UI.forceFullCheck = true;
  UI.showPanel = true;
  resetResults();
  incrementalCheck();

  UI.panelShowDismissed.setAttribute('data-ed11y-pressed', `${UI.showDismissed}`);
  window.setTimeout(() => {
    UI.panelShowDismissed.focus();
  }, 0);
}

export function togglePanel() {
  UI.ignoreAll = false; // todo: should reset to option on close.

  if (!UI.doubleClickPrevent) {
    // Prevent clicks piling up while scan is running.
    if (UI.running !== true) {
      UI.running = true;
      // Re-scan each time the panel reopens.
      if (!UI.showPanel) {
        UI.onLoad = false;
        UI.incremental = false;
        UI.showPanel = true;
        if (UI.dismissedCount > 0 && UI.warningCount === 0 && UI.errorCount === 0) {
          UI.showDismissed = false;
          toggleShowDismissals();
        } else {
          checkAll();
        }
        State.option.userPrefersShut = false;
        localStorage.setItem('editoria11yShow', '1');
      } else {
        UI.showDismissed = false;
        UI.showPanel = false;
        reset();
        State.option.userPrefersShut = true;
        localStorage.setItem('editoria11yShow', '0');
      }
      panelLabel();
    }
  }
  UI.doubleClickPrevent = true;
  window.setTimeout(() => {
    UI.doubleClickPrevent = false;
  }, 200);
  return false;
}

export function hardRefresh(reJump) {
  if (UI.loopStop) {
    return;
  }
  const cacheState = UI.showPanel;
  UI.loopStop = true;
  reset();
  UI.showPanel = cacheState;
  checkAll();
  window.setTimeout(
    () => {
      if (State.results.length > 0 && UI.loopStop) {
        if (reJump) {
          jumpTo();
        }
        UI.loopStop = false;
      }
    },
    100,
    UI.loopStop,
    reJump,
  );
}

export function disable() {
  if (UI.showPanel && !UI.closedByDisable) {
    UI.closedByDisable = true;
  }
  UI.disabled = true;
  reset();
  document.documentElement.style.setProperty('--ed11y-activeBackground', UI.theme.panelBar);
  document.documentElement.style.setProperty('--ed11y-activeColor', UI.theme.panelBarText);
  document.documentElement.style.setProperty('--ed11y-activeBorder', `${UI.theme.panelBarText}44`);
  document.documentElement.style.setProperty('--ed11y-activePanelBorder', 'transparent');
  if (typeof UI.panelToggle.querySelector === 'function') {
    UI.panel?.classList.remove('ed11y-errors', 'ed11y-warnings');
    UI.panelCount.textContent = 'i';
    UI.panelJumpNext.setAttribute('hidden', '');
    UI.panelToggle.classList.add('disabled');
    UI.panelToggle.querySelector('.ed11y-sr-only').textContent = UI.english
      ? Lang._('toggleDisabled')
      : Lang._('CONTAINER_LABEL');
  }
}

export function reset() {
  // @todo should we also flush things like Elements.Found.altMark?
  pauseObservers();
  resetResults();
  resetPanel();
  UI.incremental = false;
  UI.running = false;
  UI.showPanel = false;
}
