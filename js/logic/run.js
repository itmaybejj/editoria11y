import {State, Theme, UI, Results} from "../utils/state.js";
import {
	buildElementList,
	checkRunPrevent,
	firstVisibleParent, getElements, lagBounce,
	newIncrementalResults, pauseObservers,
	resetClass, resetResults, resumeObservers, showError,
	visible
} from '../utils/utils.js';
import {remove} from '../../sa11y/utils/utils.js';
import checkHeaders from "../../sa11y/rulesets/headers.js";
import checkLinkText from "../../sa11y/rulesets/link-text.js";
import checkImages from "../../sa11y/rulesets/images.js";
import checkLabels from "../../sa11y/rulesets/labels.js";
import checkQA from "../../sa11y/rulesets/quality-assurance.js";
import checkContrast from '../../sa11y/rulesets/contrast';
import checkDeveloper from '../../sa11y/rulesets/developer';
import Lang from "../../sa11y/utils/lang.js"
import Elements from "../../sa11y/utils/elements.js";
import {
	alignAlts,
	alignButtons, alignPanel,
	checkEditableIntersects,
	closestScrollable
} from "../utils/align.js";
import {Options} from "../utils/options.js";
import checkEmbeddedContent from '../../sa11y/rulesets/embedded-content';
import customRuleset from '../rulesets/custom-ruleset';
import Constants from '../../sa11y/utils/constants';
import {
	countAlerts, filterAlerts, handleSyncOnlyResults,
	syncResults
} from '../utils/process_results';
import {drawResult, showHeadingsPanel, visualize} from './visualize';

export function showResults () {
  buildJumpList();
  // Announce that buttons have been placed.
  document.dispatchEvent(new CustomEvent('ed11yPanelOpened'));
  alignButtons();
  if (!State.inlineAlerts) {
    checkEditableIntersects();
    intersectionObservers();
  }
}

const panelJumpTo = function(event) {
	// Handle jump
	event.preventDefault();
	State.toggledFrom = event.target.closest('button');
	if (!State.showPanel) {
		togglePanel();
		window.setTimeout(function() {
			jumpTo();
		},500);
	} else {
		jumpTo();
	}
}

export function updatePanel () {

  pauseObservers();
  // Stash old values for incremental updates.


  if (State.incremental) {
    // Check for a change in the result counts.
    if (State.forceFullCheck || newIncrementalResults()) {
      State.forceFullCheck = false;
      resetResults(true);
    } else {
      // Reconnect map
			Results.push(State.oldResults);
			if ( !State.alignPending ) {
				alignButtons();
				alignPanel();
				State.alignPending = false;
			}
			State.running = false;
      resumeObservers();
      return;
    }
  } else {
    if (State.totalCount > 0) {
      // Record what has been seen at this route.
      // We do not do this on incremental updates.
      // Todo question: should we not do this at all for contentEditable?
      State.seen[encodeURI(Options.currentPage)] = State.totalCount;
      localStorage.setItem('editoria11yResultCount', JSON.stringify(State.seen));
    } else {
      delete State.seen[encodeURI(Options.currentPage)];
    }
  }

  if (!Options.headless) {
    // Not headless; draw the run.

    if (!State.bodyStyle) {
      paintReady();
    }

    if (State.onLoad === true) {
      State.onLoad = false;

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
			if (Options.readabilityPlugin) {
				const detailsTab = document.createElement('details');
				detailsTab.id = 'ed11y-readability-tab';
				detailsTab.innerHTML = `
            <summary>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" aria-hidden="true"><path fill="currentColor" d="M528.3 46.5l-139.8 0c-48.1 0-89.9 33.3-100.4 80.3-10.6-47-52.3-80.3-100.4-80.3L48 46.5C21.5 46.5 0 68 0 94.5L0 340.3c0 26.5 21.5 48 48 48l89.7 0c102.2 0 132.7 24.4 147.3 75 .7 2.8 5.2 2.8 6 0 14.7-50.6 45.2-75 147.3-75l89.7 0c26.5 0 48-21.5 48-48l0-245.7c0-26.4-21.3-47.9-47.7-48.1zM242 311.9c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.9c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.9-.1 0zm0-60.9c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.9c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.9-.1 0zm0-60.9c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.9c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.9-.1 0zM501.3 311.8c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.9c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.9-.1 0zm0-60.9c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.9c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.9-.1 0zm0-60.9c0 1.9-1.5 3.5-3.5 3.5l-160.3 0c-1.9 0-3.5-1.5-3.5-3.5l0-22.8c0-1.9 1.5-3.5 3.5-3.5l160.4 0c1.9 0 3.5 1.5 3.5 3.5l0 22.8-.1 0z"/></svg> <span class="summary-title"></span>
            </summary>
            <div class="details">
							<div id="readability-content">
								<p id="readability-info"></p>
								<ul id="readability-details"></ul>
							</div>
						</div>`
				UI.panel.querySelector('#ed11y-visualizers').appendChild(detailsTab);
				UI.panel.querySelector('#readability-info').appendChild(Constants.Panel.readabilityInfo);
				UI.panel.querySelector('#readability-details').appendChild(Constants.Panel.readabilityDetails);
				UI.panel.querySelector('#ed11y-readability-tab .summary-title').textContent = Lang._('READABILITY');
			}

      window.setTimeout(()=> {
        UI.panelElement.classList.remove('ed11y-preload');
      },0, UI.panel);
      UI.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = Lang._('PANEL_HEADING');
      UI.panel.querySelector('#ed11y-headings-tab .summary-title').textContent = Lang._('OUTLINE');
      UI.panel.querySelector('#ed11y-alts-tab .summary-title').textContent = Lang._('IMAGES');
			if (State.english) {
				UI.panel.querySelector('#ed11y-headings-tab .details-title').innerHTML = Lang._('panelCheckOutline');
				UI.panel.querySelector('#ed11y-alts-tab .details-title').innerHTML = Lang._('panelCheckAltText');
			}
      UI.panel.querySelector('.jump-next.ed11y-sr-only').textContent = State.english ? Lang._('buttonFirstContent')
				: Lang._('SKIP_TO_ISSUE') + ' 1';
      UI.panel.setAttribute('aria-label', Lang._('CONTAINER_LABEL'));

      if (Options.reportsURL) {
        let reportLink = document.createElement('a');
        reportLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96C0 61 29 32 64 32l384 0c35 0 64 29 64 64l0 320c0 35-29 64-64 64L64 480c-35 0-64-29-64-64L0 96zm64 0l0 64 64 0 0-64L64 96zm384 0L192 96l0 64 256 0 0-64zM64 224l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64zM64 352l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64z"/></svg><span class="ed11y-sr-only"></span>';
        reportLink.setAttribute('id' , 'ed11y-reports-link');
        reportLink.setAttribute('href', Options.reportsURL);
        reportLink.setAttribute('target', '_blank');
        reportLink.setAttribute('aria-label', Lang._('reportsLink'));
        reportLink.querySelector('.ed11y-sr-only').textContent = Lang._('reportsLink');
        UI.panelShowDismissed.insertAdjacentElement('beforebegin', reportLink);
      }

      // Escape key closes panels.
      const escapeWatch = function (event) {
        if (event.keyCode === 27) {
          if (event.target.closest('ed11y-element-panel') && UI.panelToggle.getAttribute('aria-expanded') === 'true') {
            UI.panelToggle.focus();
            UI.panelToggle.click();
          } else if (event.target.hasAttribute('data-ed11y-open')) {
            if (State.tipOpen) {
              State.toggledFrom?.focus(); // todo is this still needed or handled by the next?
              State.openTip.button.shadowRoot.querySelector('button').click();
            }
          }
        }
      };
      document.addEventListener('keyup', function (event) {escapeWatch(event); });

      // Decide whether to open the panel on load.
      if (State.ignoreAll ||
        (!State.inlineAlerts && State.totalCount > 75)
      ) {
        State.showPanel = false;
      } else if (Options.alertMode === 'active' ||
        !Options.userPrefersShut ||
        State.showDismissed
      ) {
        // Show always on load for active mode or by user preference.
        State.showPanel = true;
      } else if (
        State.totalCount > 0 &&
        !State.ignoreAll &&
        ( Options.alertMode === 'assertive' ||
          Options.alertMode === 'polite' &&
          State.seen[encodeURI(Options.currentPage)] !== State.totalCount
        )
      ) {
        // Show sometimes for assertive/polite if there are new items.
        State.showPanel = true;
      }
    } else if (!State.inlineAlerts) {
				State.oldResultString = `${State.errorCount} ${State.warningCount}`;
				Results.forEach(result => {
					State.oldResultString += result.test + result.element.outerHTML;
				});
		}
    // Now we can open or close the panel.
    if (!State.showPanel) {
      // Close panel.
      reset();
    } else {
      // Ignore issue count if this resulted from a user action.
      State.showPanel = true;
      UI.panel.classList.remove('ed11y-shut');
      UI.panel.classList.add('ed11y-active');
      // Prepare show hidden alerts button.
			const preferredDismissHide = State.dismissedCount > 1 ?
				Lang.sprintf('buttonHideHiddenAlerts', State.dismissedCount)
				: Lang._('buttonHideHiddenAlert');
      if (State.dismissedCount === 0) {
        // Reset show hidden default option when irrelevant.
        UI.panelShowDismissed.setAttribute('hidden', '');
				UI.panelShowDismissed.setAttribute('data-ed11y-pressed', 'false');
        State.showDismissed = false;
      } else if (State.dismissedCount === 1) {
				const show = State.english ?
					Lang._('buttonShowHiddenAlert')
					: Lang.sprintf('PANEL_DISMISS_BUTTON', '1');
				UI.panelShowDismissed.querySelector('.ed11y-sr-only').textContent = State.showDismissed ?
					preferredDismissHide : show;
				UI.panelShowDismissed.dataset.ed11yPressed = `${State.showDismissed}`;
				if (!State.english) {
					UI.panelShowDismissed.ariaPressed = State.showDismissed;
				}
				UI.panelShowDismissed.removeAttribute('hidden');
      } else {
				UI.panelShowDismissed.querySelector('.ed11y-sr-only').textContent = State.showDismissed ?
					preferredDismissHide
					: Lang.sprintf('PANEL_DISMISS_BUTTON', State.dismissedCount);
				UI.panelShowDismissed.dataset.ed11yPressed = `${State.showDismissed}`;
				if (!State.english) {
					UI.panelShowDismissed.ariaPressed = State.showDismissed;
				}
				UI.panelShowDismissed.removeAttribute('hidden');
      }

      window.setTimeout(function () {
        if (!State.ignoreAll) {
          requestAnimationFrame(() => showResults());
        }
      }, 0);
    }
    // Update buttons.
    if (State.totalCount > 0 || (State.showDismissed && State.dismissedCount > 0)) {
			UI.panelToggleTitle.textContent = Lang._('MAIN_TOGGLE_LABEL');

			UI.panelToggle.ariaExpanded = `${State.showPanel}`;
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
        if (State.showPanel) {
          UI.panelToggleTitle.textContent = Lang._('MAIN_TOGGLE_LABEL');
        } else {
          UI.panelToggleTitle.textContent = State.dismissedCount > 1 ?
						Lang.sprintf('PANEL_DISMISS_BUTTON', State.dismissedCount) :
            Lang._('buttonShowHiddenAlert');
        }
      } else {
        UI.panelToggleTitle.textContent = Lang._('MAIN_TOGGLE_LABEL');
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
	Results.forEach(function (result) {
		let top = result.element.getBoundingClientRect().top;
		if (!top) {
			const visibleParent = firstVisibleParent(result.element);
			if (visibleParent) {
				top = visibleParent.getBoundingClientRect().top;
			}
		}
		top = top + window.scrollY;
		if (Options.fixedRoots) {
			const root = result.element.closest('[data-ed11y-root]');
			result.fixedRoot = root.dataset.ed11yRoot;
		}
		result.scrollableParent = closestScrollable(result.element);
		if (result.scrollableParent) {
			// Group these together.
			top = top * 0.000001;
		}
		result.sortPos = top;
	})
	/* There was once a race condition...
	for (let i = Results.length - 1; i >= 0; i--) {
		const result = Results[i];
		if (!result.element) {
			// todo we should never running while checks are running.
			Results.splice(i, 1);
		} else {
			let top = result.element.getBoundingClientRect().top;
			if (!top) {
				const visibleParent = firstVisibleParent(result.element);
				if (visibleParent) {
					top = visibleParent.getBoundingClientRect().top;
				}
			}
			top = top + window.scrollY;
			if (Options.fixedRoots) {
				const root = result.element.closest('[data-ed11y-root]');
				result.fixedRoot = root.dataset.ed11yRoot;
			}
			result.scrollableParent = closestScrollable(result.element);
			if (result.scrollableParent) {
				// Group these together.
				top = top * 0.000001;
			}
			result.sortPos = top;
		}
	}*/

  // Sort from bottom to top so focus order after insert is top to bottom.
  Results.sort((a, b) => b.sortPos - a.sortPos);

  Results?.forEach(function (result, i) {
    if (!Results[i].dismissalStatus || State.showDismissed) {
      drawResult(result, i);
    }
  });
  State.jumpList.forEach((el, i) => {
    el.dataset.ed11yJumpPosition = `${i}`;
    const newLabel = `${Lang._('ALERT_TEXT')} ${i + 1} / ${State.jumpList.length - 1}, ${el.shadowRoot.querySelector('.toggle').getAttribute('aria-label')}`;
    el.shadowRoot.querySelector('.toggle').setAttribute('aria-label', newLabel);
  });
  let tipsPainted = new CustomEvent('ed11yResultsPainted');
  document.dispatchEvent(tipsPainted);
  resumeObservers();
}

export function dismissOne(dismissalType, test, dismissalKey) {

  // Update dismissal record.
  if (dismissalType === 'reset') {
    delete State.dismissedAlerts[Options.currentPage][test][dismissalKey];
    if (Object.keys(State.dismissedAlerts[Options.currentPage][test]).length === 0) {
      delete State.dismissedAlerts[Options.currentPage][test];
    }
    if (Object.keys(State.dismissedAlerts[Options.currentPage]).length === 0) {
      delete State.dismissedAlerts[Options.currentPage];
    }
    //window.requestAnimationFrame(() => updatePanel());
  } else {
    let dismissal = {};
    dismissal[dismissalKey] = dismissalType;
    if (typeof State.dismissedAlerts[Options.currentPage] == 'undefined') {
      let store = {};
      store[test] = dismissal;
      State.dismissedAlerts[Options.currentPage] = store;
    } else if (typeof State.dismissedAlerts[Options.currentPage][test] === 'undefined') {
      State.dismissedAlerts[Options.currentPage][test] = dismissal;
    } else {
      State.dismissedAlerts[Options.currentPage][test][dismissalKey] = dismissalType;
    }
		UI.panelShowDismissed.removeAttribute('hidden');
  }

  // Send record to storage or dispatch an event to an API.
  if (Options.syncedDismissals === false) {
    localStorage.setItem('ed11ydismissed', JSON.stringify(State.dismissedAlerts));
  }
  let dismissalDetail = {
    dismissPage: Options.currentPage,
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
  const result = Results[resultID];
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
  const zIndex = result.dismissalStatus ? 'calc(var(--ed11y-buttonZIndex, 9999) - 2)' : 'calc(var(--ed11y-buttonZIndex, 9999) - 1)';
  el.style.setProperty('z-index', zIndex);
  const outline = result.type === 'warning' ?
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
  if (!State.tipOpen) {
    return;
  }
  const id = State.openTip.tip.dataset.ed11yResult;
  const target = Results[id].element;
  const editable = target.closest('[contenteditable]');
  if (!editable && !target.closest('textarea, input')) {
    if (target.closest('a')) { // @todo after merge add button?
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

  if (!Options.cssUrls) {
    const cssLink = document.querySelector('link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]');
    if (cssLink) {
      Options.cssUrls = [cssLink.getAttribute('href')];
    } else {
      console.warn('Editoria11y CSS file parameter is missing; attempting to load from CDN.');
      Options.cssUrls = [`https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${State.version}/dist/editoria11y.min.css`];
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
    if (Options.shadowComponents) {
      root.querySelectorAll(Options.shadowComponents)?.forEach((shadowHost) => {
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
  if (Options.hiddenHandlers.length > 0 && !!target.closest(Options.hiddenHandlers)) {
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
    if (Options.checkVisible && !visible(target)) {
      button.dataset.ed11yHiddenResult = 'true';
      firstVisible = firstVisibleParent(target);
      alertMessage = Lang._('NOT_VISIBLE');
    }
    else if (target.closest('[aria-hidden="true"]')) {
      firstVisible = target.closest('[aria-hidden="true"]');
      firstVisible = firstVisible.closest(':not([aria-hidden="true"])');
      alertMessage = Lang._('NOT_VISIBLE');
    }
    if (firstVisible) {
      // Throw warning that the element cannot be highlighted.
      const tipAlert = State.openTip.tip?.shadowRoot.querySelector('.ed11y-tip-alert');
      tipAlert.textContent = alertMessage;
    }
    if (State.viaJump) {
      let scrollPin = window.innerHeight > 900 || (window.innerWidth > 800 && window.innerHeight > 600) ? 'center' : 'start';
      let scrollTarget = State.inlineAlerts ? button : target;
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
    if (!State.inlineAlerts) {
      editableHighlighter(button.dataset.ed11yResult, true, firstVisible);
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
  if (!State.showPanel) {
    return false;
  }
  State.viaJump = true;
  // Determine target result.
  let goMax = State.jumpList.length - 1;
  let goNum = next ? +State.lastOpenTip + 1 : +State.lastOpenTip - 1;
  if (goNum < 0) {
    // Reached end of loop or dismissal pushed us out of loop
    State.nextText = Lang._('SKIP_TO_ISSUE');
    goNum = goMax;
  } else if (goNum > goMax) {
    goNum = 0;
    State.nextText = Lang._('SKIP_TO_ISSUE');
  } else {
		const showNum = isNaN(goNum) ? 2 : goNum + 2
    State.nextText = Lang._('SKIP_TO_ISSUE') + ' ' + showNum;
  }
  State.lastOpenTip = goNum;
  window.setTimeout(function () {
    UI.panelJumpNext.querySelector('.ed11y-sr-only').textContent = State.nextText;
  }, 250);

  resetClass(['ed11y-hidden-highlight']);
  if (State.jumpList.length === 0) {
    buildJumpList();
  }
  // Find next or first result in the dom ordered list of results.
  let goto = State.jumpList[goNum];
	if (!goto) {
		goto = State.jumpList[0];
		State.lastOpenTip = 0;
	}
  let result = goto.getAttribute('data-ed11y-result');
  let gotoResult = Results[result];
  const target = gotoResult.element;

  // First of two scrollTo calls, to trigger any scroll based events.
  let scrollPin = window.innerHeight > 900 || (window.innerWidth > 800 && window.innerHeight > 600) ? 'center' : 'start';
  let scrollTarget = State.inlineAlerts ? goto : target;
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

export const incrementalAlign = lagBounce( () => {
		if (!State.running && !State.alignPending) {
			State.scrollPending++;
			updateTipLocations();
			State.alignPending = false;
		} else {
			incrementalAlign();
		}
	}, 10);

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
	const result = Results[resultNum];

	// Find button on page
	const scrollTop = window.scrollY;
	let leftAdd = State.inlineAlerts ? window.scrollX : 0;

	let buttonOffset = button.getBoundingClientRect();
	let buttonSize = buttonOffset.width;
	let buttonLeft = buttonOffset.left + leftAdd;
	let buttonTop = buttonOffset.top + scrollTop;

	let containTop = scrollTop;
	let containLeft = 0;
	let containWidth = window.innerWidth;
	let containBottom = window.innerHeight + scrollTop;
	let absoluteBottom = containBottom;

	if (!State.inlineAlerts && result.scrollableParent) {
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
	if (!State.scrollTicking && State.scrollPending > 0 && !State.running && State.jumpList && State.showPanel) {
		State.scrollTicking = true;
		alignButtons();
		if (State.tipOpen) {
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

	if (Options.fixedRoots && UI.editableHighlight.length > 0) {
		State.positionedFrames = [];

		Options.fixedRoots.forEach((root) => {
			if (root['framePositioner']) {
				State.positionedFrames.push(root['framePositioner'].getBoundingClientRect());
			}
		});
	}

	UI.editableHighlight.forEach((el) => {
		if (!Results[el.resultID]) {
			State.interaction = true;
			State.forceFullCheck = true;
			UI.editableHighlight = [];
			incrementalCheckDebounce(true);
			return false;
		}

		const framePositioner = Results[el.resultID].fixedRoot && State.positionedFrames[Results[el.resultID].fixedRoot] ?
			State.positionedFrames[Results[el.resultID].fixedRoot] : { top: 0, left: 0 };

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

export const slowIncremental = lagBounce( () => {
		//incrementalAlign(); // Immediately realign tips.
		//State.alignPending = false;
		State.interaction = true;
		incrementalCheckDebounce();
}, 500);

export function windowResize() {
	if (UI.panel?.classList.contains('ed11y-active') === true) {
		alignAlts();
		alignButtons();
	}
	if (State.tipOpen) {
		alignTip(State.openTip.button.shadowRoot.querySelector('button'), State.openTip.tip);
	}
	alignPanel();
}

const scrollWatch = function(container) {
	container.addEventListener('scroll', function() {
		// Trigger on scrolling other containers, unless it will flicker a tip.
		if (!State.inlineAlerts) {
			// @todo removed check for !State.tipOpen in 3.x. Should close tip if mark is scrolled off the screen.
			State.scrollPending = State.scrollPending < 2 ? State.scrollPending + 1 : State.scrollPending;
			requestAnimationFrame(() => updateTipLocations());
		} else if (State.tipOpen) {
			alignTip(State.openTip.button.shadowRoot.querySelector('button'), State.openTip.tip);
		}
	}, {
		passive: true,
	});
}

export function intersectionObservers() {

	Elements.Found.editable?.forEach((editable) => {
		scrollWatch(editable);
	});

	scrollWatch(document);

	document.addEventListener('selectionchange', function() {
		if (!State.running) {
			selectionChanged();
		}
	}, {
		passive: true,
	});
}

export const selectionChanged = lagBounce( () => {
		if (rangeChange()) {
			updateTipLocations();
			checkEditableIntersects();
		}
	}, 100);

export function rangeChange(anchorNode) {
	let anchor = anchorNode ? anchorNode : window.getSelection()?.anchorNode;
	const expandable = anchor &&
		anchor.parentNode &&
		typeof anchor.parentNode === 'object' &&
		typeof anchor.parentNode.matches === 'function';
	if (!anchor || expandable &&
		( anchor.parentNode.matches(Options.checkRoot) ||
			( !anchor.parentNode.matches(Options.checkRoot) && anchor.parentNode.matches('div[contenteditable="true"]')
			)
		)
	) {
		State.activeRange = false;
		return false;
	}
	// todo: is this redundant?
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
		if (State.inlineAlerts) {
			return 1;
		}
		if (!node.matches('[contenteditable] *')) {
			return 0;
		}
		if (State.inlineAlerts) {
			return true;
		}
		const searchList = 'table, h1, h2, h3, h4, h5, h6, blockquote';
		if (!State.inlineAlerts &&
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
				mutation.target.parentElement.matches('[contenteditable] *, [contenteditable]')) {
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
		},0);
		window.setTimeout(function () {
			incrementalCheckDebounce(); // Recheck after delay.
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
	}, {
		passive: true,
	});
	document.addEventListener("paste", () => {
		State.scrollPending++;
		updateTipLocations();
		window.setTimeout(function () {
			State.forceFullCheck = true;
			incrementalCheckDebounce();
		}, 100);
	}, {
		passive: true,
	})
	window.setTimeout(function () {
		State.scrollPending++;
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

const enqueueTests = function(queue, results) {
	const test = queue.pop();
	State.testsRemaining--;
	try {
		switch (test) {
			case 'group1':
				checkHeaders(results, Options, State.headingOutline)
				checkImages(results, Options)
				checkEmbeddedContent(results, Options)
				customRuleset(results)
				checkQA(results, Options)
				break
			case 'group2':
				checkLinkText(results, Options)
				break
			case 'checkLabels':
				checkLabels(results, Options)
				break
			case 'checkContrast':
				checkContrast(results, Options)
				break
			case 'checkDeveloper':
				checkDeveloper(results, Options)
				break
		}
	} catch (error) {
		showError(error);
	}
	if (queue.length > 0) {
		if (State.browserSpeed < 100 || Options.headless) {
			enqueueTests(queue, results);
		} else {
			window.setTimeout(function (queue) {
				enqueueTests(queue, results);
			}, 0, queue, results);
		}
	} else {
		continueCheck();
	}
}

function removeCustomTest() {
	console.error('Editoria11y has disabled a custom test that is not returning results within 1000ms.');
	Options.customTests--;
	State.customTestsRemaining = 0;
	continueCheck(true);
	if (Options.customTests === 0) {
		document.removeEventListener('ed11yResume', function () {
			continueCheck(true);
		})
	}
}

State.testsRemaining = 0;
// Toggles the outline of all headers, link texts, and images.
export function checkAll() {
	if (State.tipOpen) {
		return false;
	}
	State.disabled = false;

	if (checkRunPrevent()) {
		disable();
	}

	State.customTestsRunning = false;

	State.roots = [];
	// @todo CMS merge rewrite when Sa11y releases fixed root support.
	if (Options.fixedRoots) {
		Options.fixedRoots.forEach(root => {State.roots.push(root.fixedRoot);});
	} else {
		State.roots = document.querySelectorAll(`:is(${Options.checkRoot})`);
	}
	// Initialize root areas to check.
	if (!State.roots && Options.headless === false) {
		console.warn(Lang.sprintf('MISSING_ROOT', Options.checkRoot));
	}

	if (State.roots.length === 0) {
		if (State.onLoad) {
			console.warn(Lang._('MISSING_ROOT'));
		}
		disable();
		return;
	}

	if ( State.incremental) {
		State.oldResults = Results;
	}
	// Reset counts
	Results.length = 0;
	State.splitConfiguration.results.length = 0;

	if ( State.splitConfiguration.active ) {
		Object.assign(Options, State.splitConfiguration.sync);
	}

	buildElementList();

	if (Options.customTests > 0) {
		// Pause
		State.customTestsRemaining += Options.customTests;
		window.clearTimeout(State.customTestTimeout);
		State.customTestTimeout = window.setTimeout(function() {
			if (State.customTestsRemaining > 0) {
				removeCustomTest();
			}
		}, 1000);
		let customTests = new CustomEvent('ed11yRunCustomTests');
		document.dispatchEvent(customTests); // todo there is a race condition here for slow custom tests. May need to pass State.customTestTimeout and only accept back results that match the ID.
	}

	// Call rulesets.
	let queue = [
		'group1',
		'group2',
	];

	if (Options.readabilityPlugin && (!State.incremental || State.visualizing)) {
		queue.push('checkReadability'); // todo merge param
	}
	if (Options.formLabelsPlugin) {
		queue.push('checkLabels') // todo cms merge param
	}
	if (Options.developerPlugin) {
		queue.push('checkDeveloper') // todo cms merge param
	}
	if (Options.contrastPlugin) {
		queue.push('checkContrast');
	}
	// Todo after merge: developer and readability tests added via options here.
	State.testsRemaining = queue.length;
	enqueueTests(queue, State.splitConfiguration.active ? State.splitConfiguration.results : Results);
	// @todo CMS merge when Sa11y support is ready.
	// @todo after merge handle readability and developer checks.
}

export function continueCheck(customCheck = false) {
	if (customCheck) {
		State.customTestsRemaining--;
	}
	// change to only countering fro custom tests
	if (State.customTestsRemaining + State.testsRemaining > 0) {
		// Tests still in progress.
		return;
	}

	// Filter split configuration results.
	if (State.splitConfiguration.active && State.splitConfiguration.results.length > 0) {
		handleSyncOnlyResults();
	} else {
		filterAlerts(false);
		syncResults(Results);
	}
	countAlerts();


	if (typeof UI.panelToggle.querySelector === 'function') {
		UI.panelToggle.querySelector('.ed11y-sr-only').textContent = Lang._('MAIN_TOGGLE_LABEL');
	}
	if (State.visualizing) {
		//checkReadability([]); // todo???
		showHeadingsPanel();
		showAltPanel();
	}

	updatePanel();
	window.setTimeout(() => {
		if (Options.watchForChanges) {
			Elements.Found.editable?.forEach(editable => {
				if (!editable.matches('.drag-observe')) {
					editable.classList.add('drag-observe');
					editable.addEventListener('drop', () => {
						// This event does not bubble.
						State.forceFullCheck = true;
						incrementalCheckDebounce();
					});
				}
			});
			if (Options.watchForChanges === 'checkRoots') {
				State.roots?.forEach((root) => {
					startObserver( root );
				});
			} else {
				startObserver( document.body );
			}
			resumeObservers(); // on recheck.
		}
	}, 0);
}

export function incrementalCheck() {
	if (!State.running) {
		if (State.tipOpen || (!State.interaction && !State.forceFullCheck)) {
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
		checkAll();
		window.setTimeout(function() {
			if (State.visualizing) {
				document.dispatchEvent(new CustomEvent('ed11yEndVisualization'))
			}
		}, 500);
		// @todo after merge test: if there are no issues and the heading panel is open...it closes!
		// Increase debounce if runs are slow.
		runTime = performance.now() - runTime;
		State.browserSpeed = runTime > 100 ? 100 : (State.browserSpeed + runTime) / 2;
		// Todo: optimize tip placement so we do not need as much debounce.
		State.browserLag = State.browserSpeed < 1 ? 0 : State.browserSpeed * 100 + State.totalCount;
	} else {
		// Ed11y was running, try again later.
		window.setTimeout(() => {incrementalCheckDebounce();}, 250);
	}
}

export const incrementalCheckDebounce = lagBounce( () => {
	incrementalCheck();
}, 250);


export function resetPanel() {
	// Reset main panel.
	State.visualizing = true; // so visualize function removes visualizers.
	visualize();
	if (State.totalCount === 0 && State.dismissedCount > 0) {
		UI.panelCount.textContent = 'i';
		UI.panelToggleTitle.textContent = State.dismissedCount === 1 ?
			Lang._('buttonShowHiddenAlert') :
			Lang.sprintf('PANEL_DISMISS_BUTTON', State.dismissedCount);
	}

	if (typeof (UI.panel) === 'object') {
		UI.panel?.classList.add('ed11y-shut');
		UI.panel?.classList.remove('ed11y-active');
		UI.panelToggle.ariaExpanded = false;
		if (!State.showDismissed && typeof UI.panelShowDismissed === 'function') {
			UI.panelShowDismissed.setAttribute('data-ed11y-pressed', 'false');
			UI.panelShowDismissed.querySelector('.ed11y-sr-only').textContent = State.dismissedCount === 1 ?
				Lang._('buttonShowHiddenAlert') : Lang.sprintf('PANEL_DISMISS_BUTTON', State.dismissedCount);
		}
	}
}

// @todo is this abstraction still needed?
window.addEventListener('ed11yEndVisualization', ()=>{
	State.visualizing = false;
	pauseObservers();
	visualize();
	resumeObservers();
})

export function dismissThis (dismissalType, all = false) {
	// Find the active tip and draw its identifying information from the result list
	let removal = State.openTip;
	let id = removal.tip.dataset.ed11yResult;
	let test = Results[id].test;

	if (all) {
		Results.forEach((result) => {
			if (result.test === test && result.dismissalStatus !==dismissalType) {
				dismissOne(dismissalType, test, result.dismiss);
			}
		});
	} else {
		let dismissalKey = Results[id].dismiss;
		dismissOne(dismissalType, test, dismissalKey);
	}

	// Remove tip and reset borders around element
	resetClass(['ed11y-hidden-highlight', 'ed11y-ring-red', 'ed11y-ring-yellow']);
	removal.tip?.parentNode?.removeChild(removal.tip);
	removal.button?.parentNode?.removeChild(removal.button);
	remove('ed11y-element-highlight', 'document');
	UI.editableHighlight = [];

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

}

export function toggleShowDismissals () {
	// todo postpone: if user has allowHide but not allowOK or vice versa, this temporarily clears both.
	State.ignoreAll = false;
	State.showDismissed = !(State.showDismissed);
	//reset();
	State.forceFullCheck = true;
	State.showPanel = true;
	resetResults();
	incrementalCheck();

	UI.panelShowDismissed.setAttribute('data-ed11y-pressed', `${State.showDismissed}`);
	window.setTimeout(function() {
		UI.panelShowDismissed.focus();
	}, 0);
}

export function togglePanel () {
	State.ignoreAll = false; // todo: should reset to option on close.

	if (!State.doubleClickPrevent) {
		// Prevent clicks piling up while scan is running.
		if (State.running !== true) {
			State.running = true;
			// Re-scan each time the panel reopens.
			if (!State.showPanel) {
				State.onLoad = false;
				State.incremental = false;
				State.showPanel = true;
				if (State.dismissedCount > 0 && State.warningCount === 0 && State.errorCount === 0) {
					State.showDismissed = false;
					toggleShowDismissals();
				} else {
					checkAll();
				}
				Options.userPrefersShut = false;
				localStorage.setItem('editoria11yShow', '1');
			}
			else {
				UI.panelToggleTitle.textContent = Lang._('MAIN_TOGGLE_LABEL');
				State.showDismissed = false;
				State.showPanel = false;
				reset();
				Options.userPrefersShut = true;
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
		if (Results.length > 0 && State.loopStop) {
			jumpTo();
			State.loopStop = false;
		}
	},100, State.loopStop);
}

export function disable() {
	if (State.showPanel && !State.closedByDisable) {
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
		UI.panelToggle.querySelector('.ed11y-sr-only').textContent = State.english ?
			Lang._('toggleDisabled') : Lang._('CONTAINER_LABEL');
	}
}

export function reset () {
	// @todo should we also flush things like Elements.Found.altMark?
	pauseObservers();
	resetResults();
	resetPanel();
	State.incremental = false;
	State.running = false;
	State.showPanel = false;
}
