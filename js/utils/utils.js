import {Results, State, UI} from "./state.js"
import Lang from "../../sa11y/utils/lang.js"
import find from "../../sa11y/utils/find.js"
import Constants from "../../sa11y/utils/constants.js";
import {Options} from "./options.js";
import findShadowComponents from "../../sa11y/logic/find-shadow-components.js";
import Elements from "../../sa11y/utils/elements.js";
import ConsoleErrors from "../elements/ed11y-console-error.js";

/*=============== Utilities ================*/

export function getElements(selector, desiredRoot, exclude) {
	exclude = exclude === false ? [] : exclude;
	return find(selector, desiredRoot, exclude);
}
export function findElements (key, selector, rootRestrict = true) {
	// Legacy support for deprecated code.
	const desiredRoot = rootRestrict ? 'root' : 'document';
	const exclude = rootRestrict ? [] : Constants.Exclusions.Sa11yElements;
	Elements.Found[key] = find( selector, desiredRoot, exclude );
}

export function addedNodeReadyToCheck(el) {
	if (!State.recentlyAddedNodes.has(el)) {
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
			State.recentlyAddedNodes.delete(el);
			return true;
		}
	} else {
		// New node is ready for checking.
		State.recentlyAddedNodes.delete(el);
		return true;
	}
}

const dropSomeElements = function(arrayRef, sendTo = false, readyCheck = true, hiddenCheck = false) {
	for (let i = arrayRef.length - 1; i >= 0; i--) {
		if (hiddenCheck && !elementNotHidden(arrayRef[i]) ||
			readyCheck && !addedNodeReadyToCheck(arrayRef[i])) {
			if (sendTo) {
				sendTo.push(arrayRef[i]);
			}
			arrayRef.splice(i, 1);
		}
	}
}

// First step in checkAll is getting a fresh set of elements to check.
export function buildElementList () {

	// Check for ignoreAll elements.
	State.ignoreAll = Options.ignoreAllIfAbsent && document.querySelector(`:is(${Options.ignoreAllIfAbsent})`) === null;
	if (!State.ignoreAll && !!Options.ignoreAllIfPresent) {
		State.ignoreAll = document.querySelector(`:is(${Options.ignoreAllIfPresent})`) !== null;
	}

	if ( State.incremental) {
		State.oldResults = Results;
	}
	// Reset counts
	Results.length = 0;
	State.elements = [];
	State.mediaCount = 0;
	State.headingOutline = [];

	for (let i = 0; i < State.roots.length; i++) {
		if (Options.fixedRoots) {
			State.roots[i].dataset.ed11yRoot = `${i}`;
		}
		if (State.roots[i].shadowRoot) {
			State.roots.setAttribute('data-ed11y-has-shadow-root', 'true');
			detectShadow(State.roots[i]);
			State.roots[i] = State.roots[i].shadowRoot;
		}
		else {
			detectShadow(State.roots[i]);
		}

		Constants.initializeRoot(Options.checkRoots, Options.checkRoots); // @todo release merge readability, add multiroot.

		// Find all web components on the page.
		findShadowComponents(Options);

		// Find and cache elements.
		Elements.initializeElements(Options);

		dropSomeElements(Elements.Found.Headings, Elements.Found.OutlineIgnore, true, true);
		dropSomeElements(Elements.Found.Blockquotes);
		dropSomeElements(Elements.Found.Tables);

		if (typeof Options.initialHeadingLevel === 'object') {
			Options.initialHeadingLevel.forEach((level) => {
				const headingRoots = getElements([level.selector], 'document');
				if (headingRoots.length > 0) {
					headingRoots.forEach((headingRoot) => {
						const firstInSection = headingRoot.querySelector(`h${level.previousHeading}, h${level.previousHeading + 1}`);
						if (firstInSection) {
							State.headingOutlineOverrides.push(firstInSection);
						}
					})
				}
			})
		}

		// Note: as of 3/28/25 this is as performant as Sa11y's filter() approach.
		if (typeof Options.editableContent === 'string') {
			findElements('editable', Options.editableContent, false);
		}
		else {
			Elements.Found.editable = Options.editableContent;
		}
		if (State.inlineAlerts && Elements.Found.editable.length > 0) {
			State.inlineAlerts = false;
			console.warn('Editable content detected; Editoria11y inline alerts disabled');
		}
		if (Options.embeddedContent) { // @todo merge convert to custom check
			// Ed11y.findElements('embed', Options.embeddedContent);
		}
		if (Options.panelNoCover) {
			// Moves panel off conflicting widgets.
			findElements('panelNoCover', Options.panelNoCover, false);
		}
	}
}

export function lagBounce (callback, wait) {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait + State.browserLag);
  };
};

export function parents(el) {
  let nodes = [];
  nodes.push(el);
  while (el && !!el.parentElement && el.parentElement.tagName !== 'HTML') {
    nodes.push(el.parentElement);
    el = el.parentElement;
  }
  return nodes;
}

export function resetClass(classes) {
  classes?.forEach((el) => {
    let thisClass = el;
    findElements('reset', `.${thisClass}`);
    Elements.Found.reset?.forEach(el => {
      el.classList.remove(thisClass);
    });
  });
}

export function visibleElement(el) {
  // Checks if this element is visible. Used in parent iterators.
  // false is definitely invisible, true requires continued iteration to tell.
  // Todo postpone: Check for offscreen?
  if (el) {
    if (!el.checkVisibility({
      opacityProperty: true,
      visibilityProperty: true,
    })) {
      return false;
    }
    let style = window.getComputedStyle(el);
    return !(el.closest('.sr-only, .visually-hidden') ||
      style.getPropertyValue('z-index') < 0 ||
      (style.getPropertyValue('overflow') === 'hidden' &&
        ( el.offsetWidth < 10 ||
          el.offsetHeight < 10 )
      )
    );
  }
};

export function visible(el) {
  // Recurse element and ancestors to make sure it is visible
  if (!visibleElement(el)) {
    // Element is hidden
    return false;
  } else {
    // Element is not known to be hidden.
    let theParents = parents(el);
    let visibleParent = (parent) => visibleElement(parent);
    return theParents.every(visibleParent);
  }
};

export function firstVisibleParent(el) {
  let parent = el.parentElement;
  if (parent) {
    // Parent exists
    if (!visibleElement(parent)) {
      // Recurse
      parent = firstVisibleParent(parent);
      return parent;
    } else {
      // Element is visible
      return parent;
    }
  } else {
    // No visible parents.
    return false;
  }
};

// @todo discuss differences
export function hiddenElementCheck(el) {
  // Checks if this element has been removed from the accessibility tree
  let style = window.getComputedStyle(el);
  return !(style.getPropertyValue('display') === 'none' ||
    style.getPropertyValue('visibility') === 'hidden' ||
    el.hasAttribute('aria-hidden') ||
    el.hasAttribute('hidden'));
};

export function elementNotHidden(el) {
  // Recurse element and ancestors to make sure it is visible
  if (!hiddenElementCheck(el)) {
    // Element is hidden
    return false;
  } else {
    // Element is not known to be hidden.
    let theParents = parents(el);
    let notHiddenParent = (parent) => hiddenElementCheck(parent);
    return theParents.every(notHiddenParent);
  }
}

export function detectShadow (container) {
  if (Options.autoDetectShadowComponents) {

		const select = `*:not(${Constants.Exclusions.Container.join(', ')}, .ed11y-element)`;

    let search;
    if (container.shadowRoot && container.shadowRoot.mode === 'open') {
      if (!container.matches('[data-ed11y-has-shadow-root]')) {
        container.setAttribute('data-ed11y-has-shadow-root', 'true');
        UI.attachCSS(container.shadowRoot);
        UI.attachCSS(container);
      }
      search = container.shadowRoot.querySelectorAll(select);
    } else {
      search = container.querySelectorAll(select);
    }
    search?.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === 'open') {
        detectShadow(component);
      }
    });
  } else if (Options.shadowComponents) {
    const providedShadow = container.querySelectorAll(Options.shadowComponents);
    providedShadow.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === 'open') {
        if (!container.matches('[data-ed11y-has-shadow-root]')){
          component.setAttribute('data-ed11y-has-shadow-root', 'true');
          UI.attachCSS(component.shadowRoot);
          UI.attachCSS(component);
        }
        detectShadow(component);
      } else {
        console.warn(`Editoria11y: A specified shadow host has no shadowRoot: ${component.tagName}`);
      }
    });
  }
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

export function checkRunPrevent() {
	let preventCheck = Options.preventCheckingIfPresent ?
		document.querySelector(Options.preventCheckingIfPresent) :
		false;
	if (preventCheck) {
		console.warn(`Editoria11y is disabled because an element matched the "preventCheckingIfPresent" parameter:  "${Options.preventCheckingIfPresent}"` );
	} else if (!preventCheck && !!Options.preventCheckingIfAbsent) {
		preventCheck = document.querySelector(`:is(${Options.preventCheckingIfAbsent})`) === null;
		if (preventCheck) {
			console.warn(`Editoria11y is disabled because no elements matched the "preventCheckingIfAbsent" parameter: "${Options.preventCheckingIfAbsent}"`);
		}
	}
	return preventCheck;
}

export function resetResults(incremental) {
	State.jumpList = [];
	State.tipOpen = false;
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
		Elements.Found.reset = getElements('ed11y-element-highlight', 'document', []);
	} else {
		Elements.Found.reset = getElements('ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight', 'document', []);
	}
	Elements.Found.reset?.forEach((el) => el.remove());

	// Flicker prevention -- leave old tip in place for 100ms.
	//findElements('delayedReset', 'ed11y-element-result, ed11y-element-tip', false);
	Elements.Found.delayedReset = getElements('ed11y-element-result, ed11y-element-tip', 'document', []);

	window.setTimeout(()=> {
		Elements.Found.delayedReset?.forEach((el) => el.remove());
	}, 100, Elements.Found.delayedReset);

	if (typeof UI.panelJumpNext === 'function') {
		UI.panelJumpNext.querySelector('.ed11y-sr-only').textContent = State.english ? Lang._('buttonFirstContent')
			: Lang._('SKIP_TO_ISSUE') + ' 1';
	}
	// Reset insertions into body content.
}

export function newIncrementalResults() {
	// Obviously new if there are more results:
	if (State.forceFullCheck || Results.length !== State.oldResults.length) {
		return true;
	}
	// Subtly new if a result has changed:
	let newResultString = `${State.errorCount} ${State.warningCount}`;
	Results.forEach(result => {
		newResultString += result.test + result.element.outerHTML;
	});
	let changed = newResultString !== State.oldResultString;
	State.oldResultString = newResultString;
	return changed;
}

export function countAlerts () {

	State.errorCount = 0;
	State.warningCount = 0;
	State.dismissedCount = 0;

	// Review results array to remove dismissed or ignored items

	State.dismissedCount = 0;
	for (let i = Results.length - 1; i >= 0; i--) {

		/*
		if (Options.ignoreTests &&
			Options.ignoreTests.includes(test)) {
			// Would be faster to skip test, but this is easy and reliable.
			Results.splice(i, 1);
			continue;
		}*/

		// todo postpone: we could remove active range from list if it is not in oldResults to prevent tagging while people are typing. But we'd have to walk the array. Expensive!
		/*if (State.incremental && Ed11y.oldResults.length > 0) {
			// Don't flag new issues in the active range while people are typing.
		}*/



			if (Results[i].type === 'good') {
				Results.splice(i, 1);
			} else {
				// We run the user provided dismissal key through the text sanitization to support legacy data with special characters.
				if (Options.currentPage in State.dismissedAlerts
					&& Results[i].test in State.dismissedAlerts[Options.currentPage]
					&& Results[i].dismiss in State.dismissedAlerts[Options.currentPage][Results[i].test]) {
					// Remove Results[i] if it has been marked OK or ignored, increment dismissed match counter.
					State.dismissedCount++;
					Results[i].dismissalStatus = true;
				} else if (Results[i].type === 'warning') {
					State.warningCount++;
				} else {
					State.errorCount++;
				}


				let location = Results[i].element;
				let position = 'afterbegin';
				if (Results[i].element.shadowRoot) {
					position = 'beforebegin';
					while (location.parentElement && location.parentElement.shadowRoot) {
						location = location.parentElement;
					}
				}
				let interactive = location.closest('a, button, [role="button"], [role="link"]');

				if (interactive) {
					Results[i].location = interactive;
					Results[i].position = 'beforebegin';
				} else {
					Results[i].location = location;
					Results[i].position = position;
				}
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

}

export function showError(error) {
	customElements.define('sa11y-console-error', ConsoleErrors);
	const consoleErrors = new ConsoleErrors(error);
	document.body.appendChild(consoleErrors);
	throw Error(error);
}
