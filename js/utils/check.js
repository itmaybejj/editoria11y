import {M, State, Theme, UI} from "./state.js";
import Elements from "sa11y/src/js/utils/elements.js"
import {prepareDismissal, store} from "sa11y/src/js/utils/utils.js";
import Constants from "sa11y/src/js/utils/constants.js";
import checkHeaders from "sa11y/src/js/rulesets/headers.js";
import checkLinkText from "sa11y/src/js/rulesets/link-text.js";
import checkImages from "sa11y/src/js/rulesets/images.js";
import checkLabels from "sa11y/src/js/rulesets/labels.js";
import checkQA from "sa11y/src/js/rulesets/quality-assurance.js";
import {detectShadow, findElements, lagBounce} from "./utils.js";
import findShadowComponents from "sa11y/src/js/logic/find-shadow-components.js";
import {
  reset,
  updatePanel,
} from "../render/interface.js";
import {resumeObservers, startObserver, windowResize} from "./observers.js";
import Lang from "sa11y/src/js/utils/lang.js";
import * as Utils from "sa11y/src/js/utils/utils.js";

export function makeItSo () {
  if (State.once) {
    console.error('double init');
    return;
  }
  State.once = true;

  //Need to evaluate if "load" event took place for bookmarklet version. Otherwise, only call Sa11y once page has loaded.
  const documentLoadingCheck = (callback) => {
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', callback);
    }
  };

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
};

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

export function countAlerts () {

  State.errorCount = 0;
  State.warningCount = 0;
  State.dismissedCount = 0;

  // Review results array to remove dismissed or ignored items

  State.dismissedCount = 0;
  for (let i = State.results.length - 1; i >= 0; i--) {

    let test = State.results[i].test;

    if (State.options.ignoreTests &&
      State.options.ignoreTests.includes(test)) {
      // Would be faster to skip test, but this is easy and reliable.
      State.results.splice(i, 1);
      continue;
    }

    // todo postpone: we could remove active range from list if it is not in oldResults to prevent tagging while people are typing. But we'd have to walk the array. Expensive!
    /*if (State.incremental && Ed11y.oldResults.length > 0) {
      // Don't flag new issues in the active range while people are typing.
    }*/

    let dismissKey = prepareDismissal(State.results[i].dismissalKey);
    // We run the user provided dismissal key through the text sanitization to support legacy data with special characters.
    if (dismissKey !== false && State.options.currentPage in State.dismissedAlerts && test in State.dismissedAlerts[State.options.currentPage] && dismissKey in State.dismissedAlerts[State.options.currentPage][test]) {
      // Remove result if it has been marked OK or ignored, increment dismissed match counter.
      State.dismissedCount++;
      State.results[i].dismissalStatus = State.dismissedAlerts[State.options.currentPage][test][dismissKey];
    } else if (State.results[i].dismissalKey) {
      State.warningCount++;
      State.results[i].dismissalStatus = false;
    } else {
      State.errorCount++;
      State.results[i].dismissalStatus = false;
    }
  }

  State.totalCount = State.errorCount + State.warningCount;

  // Dispatch event for synchronizers.
  if (!State.incremental) {
    window.setTimeout(function () {
      let syncResults = new CustomEvent('ed11yResults');
      document.dispatchEvent(syncResults);
    }, 0);
  }

  if (State.ignoreAll) {
    State.dismissedCount = State.totalCount + State.dismissedCount;
    State.errorCount = 0;
    State.warningCount = 0;
    State.totalCount = 0;
  }

  isFullNeeded();
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

const checkRunPrevent = function() {
  let preventCheck = State.options.preventCheckingIfPresent ?
    document.querySelector(State.options.preventCheckingIfPresent) :
    false;
  if (preventCheck) {
    console.warn(`Editoria11y is disabled because an element matched the "preventCheckingIfPresent" parameter:  "${State.options.preventCheckingIfPresent}"` );
  } else if (!preventCheck && !!State.options.preventCheckingIfAbsent) {
    preventCheck = document.querySelector(`:is(${State.options.preventCheckingIfAbsent})`) === null;
    if (preventCheck) {
      console.warn(`Editoria11y is disabled because no elements matched the "preventCheckingIfAbsent" parameter: "${State.options.preventCheckingIfAbsent}"`);
    }
  }
  return preventCheck;
}

const isFullNeeded = function() {
  if (State.incremental && !State.forceFullCheck && !newIncrementalResults()) {
    State.forceFullCheck = true;
  }
}

export function newIncrementalResults() {
  if (State.forceFullCheck || State.results.length !== State.oldResults.length) {
    return true;
  }
  let newResultString = `${State.errorCount} ${State.warningCount}`;
  State.results.forEach(result => {
    newResultString += result.test + result.element.outerHTML;
  });
  let changed = newResultString !== State.oldResultString;
  State.oldResultString = newResultString;
  return changed;
};

