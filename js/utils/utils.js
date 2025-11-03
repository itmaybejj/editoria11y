import {M, State, Theme, UI} from "./state.js"
import {prepareDismissal} from "sa11y/src/js/utils/utils.js";
import {Lang} from "sa11y/src/js/sa11y.js";

/*=============== Utilities ================*/

export function linkText (linkText) {
	// @todo merge do we need this for linkpurpose?
	linkText = linkText.replace(State.options.linkIgnoreStrings, '');
	linkText = linkText.replace(/'|"|-|\.|\s+/g, '');
	return linkText;
}

export const lagBounce = (callback, wait) => {
  let timeoutId = null;
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
    State.elements.reset?.forEach(el => {
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

// @todo merge discuss differences
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
  if (State.options.autoDetectShadowComponents) {
    const select = !State.ignore ? '*:not(.ed11y-element)' : `*:not(${State.options.ignore}, .ed11y-element)`;
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
  } else if (State.options.shadowComponents) {
    const providedShadow = container.querySelectorAll(State.options.shadowComponents);
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
};

const diveShadow = function (container, select, selector) {
  if (container.matches(selector)) {
    return([container]);
  } else {
    let inners = container.shadowRoot.querySelectorAll(select);
    if (typeof(inners) === 'object' && inners.length > 0) {
      // Replace shadow host with inner elements.
      inners.forEach(inner => {
        for (let innerIndex = inners - 1; innerIndex >= 0; innerIndex--) {
          let innerInner = diveShadow(inner, select, selector);
          if (innerInner.length > 0) {
            inners.splice(innerIndex, 1, ...innerInner);
          } else {
            inners.splice(innerIndex, 1);
          }
        }
      });
      return (Array.from(inners).filter((el) => el.matches(selector)));
    }
  }
  return [];
};

// QuerySelectAll non-ignored elements within checkRoots, with recursion into shadow components
export function findElements (key, selector, rootRestrict = true) { // @todo merge replace.

  // Todo merge: function and parameter to auto-detect shadow components.
  let shadowSelector = State.options.autoDetectShadowComponents ?
    '[data-ed11y-has-shadow-root]' :
    State.options.shadowComponents ?
      State.options.shadowComponents : false;

  // Concatenate global and specific ignores
  let ignore;
  if (State.options.ignoreElements) {
    ignore = State.options.ignoreByKey[key] ? `:not(${State.options.ignoreElements}, ${State.options.ignoreByKey[key]})` : `:not(${State.options.ignoreElements})`;
  } else {
    ignore = State.options.ignoreByKey[key] ? `:not(${State.options.ignoreByKey[key]})` : '';
  }

  // Initialize or reset elements array.
  State.elements[key] = [];

  const select = `:is(${selector}${shadowSelector ? ', ' + shadowSelector : ''})${ignore}`;

  if (rootRestrict && State.roots) {
    // Add array of elements matching selector, excluding the provided ignore list.
    // Todo this can result in nested roots.
    State.roots.forEach(root => {
      State.elements[key] = State.elements[key].concat(Array.from(root.querySelectorAll(select)));
    });
  } else {
    State.elements[key] = State.elements[key].concat(Array.from(document.querySelectorAll(select)));
  }

  // The initial search may be a mix of elements ('p') and placeholders for shadow hosts ('custom-p-element').
  // Repeat the search inside each placeholder, and replace the placeholder with its search results.
  if (shadowSelector) {
    for (let index = State.elements[key].length - 1; index >= 0; index--) {
      if (State.elements[key][index].matches(shadowSelector)) {
        // Dive into the shadow root and collect an array of its results.
        let inners = diveShadow(State.elements[key][index], select, selector);
        if (inners.length > 0) {
          State.elements[key].splice(index, 1, ...inners);
        } else {
          State.elements[key].splice(index, 1);
        }
      }
    }
  }
};

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

	if (State.incremental && !State.forceFullCheck && !newIncrementalResults()) {
		State.forceFullCheck = true;
	}
}
