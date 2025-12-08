import {Results, State, UI} from './state.js';
import Lang from "../../sa11y/utils/lang.js"
import find from "../../sa11y/utils/find.js"
import Constants from "../../sa11y/utils/constants.js";
import {Options} from "./options.js";
import findShadowComponents from "../../sa11y/logic/find-shadow-components.js";
import Elements from "../../sa11y/utils/elements.js";
import ConsoleErrors from "../elements/ed11y-console-error.js";
import {createAlert} from '../../sa11y/interface/alert';

/*=============== Utilities ================*/

export function getElements(selector, desiredRoot, exclude = Constants.Exclusions.Sa11yElements) {
	return find(selector, desiredRoot, exclude);
}

export function findElements (key, selector, rootRestrict = true) {
	// Legacy support for deprecated code.
	const desiredRoot = rootRestrict ? 'root' : 'document';
	Elements.Found[key] = find( selector, desiredRoot, Constants.Exclusions.Sa11yElements );
}

// Object.assign without losing important bits from the shallow copy.
export const smush = function(obj1, obj2, skip = []) {
	Object.entries(obj2).forEach(([key, value]) => {
		if (!(skip.includes(key))) {
			obj1[key] = value;
		}
	})
}

export function initializeRoot(desiredRoot, desiredReadabilityRoot, fixedRoots) {
	Constants.Root.areaToCheck = [];
	Constants.Root.Readability = [];

	// If fixed roots provided.
	if (fixedRoots) {
		Constants.Root.areaToCheck = fixedRoots;
		Constants.Root.Readability = fixedRoots;
		return;
	}

	/* Main target area */
	try {
		// Iterate through each selector passed, and push valid ones to final root array.
		const roots = document.querySelectorAll(desiredRoot);
		if (roots.length > 0) {
			roots.forEach((root) => {
				Constants.Root.areaToCheck.push(root)
			})
		}
		else {
			console.error(`Sa11y: The target readability root (${desiredRoot}) does not exist.`);
		}
	} catch {
		Constants.Root.areaToCheck.length = 0;
	}

	// Push a visible UI alert if not headless and no roots at all are found.
	if (Constants.Root.areaToCheck.length === 0 && Constants.Global.headless === false) {
		createAlert(Lang.sprintf('MISSING_ROOT', desiredRoot));
		Constants.Root.areaToCheck.push(document.body);
	}

	/* Readability target area */
	try {
		const roots = document.querySelectorAll(desiredReadabilityRoot);
		if (roots.length > 0) {
			roots.forEach((root) => {
				Constants.Root.Readability.push(root)
			})
		}
		else {
			console.error(`Sa11y: The target readability root (${selector}) does not exist.`);
		}

	} catch {
		Constants.Root.Readability.length = 0;
	}

	if (Constants.Root.Readability.length === 0 && Constants.Global.headless === false) {
		if (Constants.Root.areaToCheck.length === 0) {
			Constants.Root.Readability.push(document.body);
		} else {
			// If desired root area is not found, use the root target area.
			Constants.Root.Readability = Constants.Root.areaToCheck;

			// Create a warning if the desired readability root is not found.
			setTimeout(() => {
				const { readabilityDetails, readabilityToggle } = Constants.Panel;
				const readabilityOn = readabilityToggle?.getAttribute('aria-pressed') === 'true';
				const alert = Constants.Panel.readability.querySelector('#readability-alert');
				if (readabilityDetails && readabilityOn && !alert) {
					// Roots that readability will be based on.
					const roots = Constants.Root.areaToCheck.map((el) => {
						if (el.id) return `#${el.id}`;
						if (el.className) return `.${el.className.split(/\s+/).filter(Boolean).join('.')}`;
						return el.tagName.toLowerCase();
					}).join(', ');

					// Append note to Readability panel.
					const note = document.createElement('div');
					note.id = 'readability-alert';
					note.innerHTML = `<hr><p>${Lang.sprintf('MISSING_READABILITY_ROOT', roots, desiredReadabilityRoot)}</p>`;
					readabilityDetails.insertAdjacentElement('afterend', note);
				}
			}, 100);
		}
	}
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
export function buildElementList (onlyForFilter = false) {

	// Check for ignoreAll elements.
	State.ignoreAll = Options.ignoreAllIfAbsent && document.querySelector(`:is(${Options.ignoreAllIfAbsent})`) === null;
	if (!State.ignoreAll && !!Options.ignoreAllIfPresent) {
		State.ignoreAll = document.querySelector(`:is(${Options.ignoreAllIfPresent})`) !== null;
	}

	initializeRoot(Options.checkRoot, Options.checkRoot);

	for (let i = 0; i < State.roots.length; i++) {
		if (Options.fixedRoots) {
			State.roots[i].dataset.ed11yRoot = `${i}`;
			// todo check why not detectShadow here?
		}
		if (State.roots[i].shadowRoot) {
			State.roots.setAttribute('data-ed11y-has-shadow-root', 'true');
			detectShadow(State.roots[i]);
			State.roots[i] = State.roots[i].shadowRoot;
		}
		else {
			detectShadow(State.roots[i]);
		}
	}

		// Find all web components on the page.
		findShadowComponents(Options);

		// Find and cache elements.
	if (onlyForFilter) {
		// Split configuration; do not fully re-initialize Elements.Found for filters.

		Elements.Found.Everything = find('*', 'root', Constants.Exclusions.Sa11yElements);

		Elements.Found.Contrast = Elements.Found.Everything.filter(($el) => {
			const matchesSelector = Constants.Exclusions.Contrast.some((exclusion) => $el.matches(exclusion));
			return !matchesSelector && !Constants.Exclusions.Contrast.includes($el);
		});

		Elements.Found.Images = Elements.Found.Everything.filter(($el) => $el.tagName === 'IMG'
			&& !Constants.Exclusions.Images.some((selector) => $el.matches(selector)));

		Elements.Found.Links = Elements.Found.Everything.filter(($el) => ($el.tagName === 'A' || $el.tagName === 'a')
			&& $el.hasAttribute('href')
			&& !$el.matches('[role="button"]') // Exclude links with [role="button"]
			&& !Constants.Exclusions.Links.some((selector) => $el.matches(selector)));

		// We want headings from the entire document for the Page Outline.
		Elements.Found.Headings = find(
			'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]',
			Options.ignoreContentOutsideRoots || Options.fixedRoots
				? 'root' : 'document',
			Constants.Exclusions.Headings,
		);

		// Excluded via headerIgnore.
		Elements.Found.ExcludedHeadings = Elements.Found.Headings.filter((heading) => Constants.Exclusions.Headings.some((exclusion) => heading.matches(exclusion)));

		// Excluded via outlineIgnore.
		Elements.Found.ExcludedOutlineHeadings = Elements.Found.Headings.filter((heading) => Constants.Exclusions.Outline.some((exclusion) => heading.matches(exclusion)));

		// Merge both headerIgnore and outlineIgnore.
		Elements.Found.OutlineIgnore = Elements.Found.ExcludedOutlineHeadings.concat(Elements.Found.ExcludedHeadings);

	} else {
		State.headingOutline = [];
		Elements.initializeElements(Options);

		// Not needed for filter, since they weren't checked in the first loop.
		dropSomeElements(Elements.Found.Headings, Elements.Found.OutlineIgnore, true, true);
		dropSomeElements(Elements.Found.Blockquotes);
		dropSomeElements(Elements.Found.Tables);

		if (typeof Options.editableContent === 'string') {
			Elements.Found.editable = getElements(Options.editableContent, 'document');
		}
		else {
			Elements.Found.editable = Options.editableContent;
		}
		if (State.inlineAlerts && Elements.Found.editable.length > 0) {
			State.inlineAlerts = false;
			console.warn('Editable content detected; Editoria11y inline alerts disabled');
		}

		if (Options.panelNoCover) {
			// Moves panel off conflicting widgets.
			Elements.Found.panelNoCover = getElements(Options.panelNoCover, 'document');
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
  classes?.forEach((cls) => {
		const reset = getElements(`.${cls}`, 'document', []);
    reset?.forEach(el => {
      el.classList.remove(cls);
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

export function panelLabel(show = State.showPanel) {
	if (show) {
		if (State.english) {
			UI.panelToggleTitle.textContent = State.totalCount > 0 ?
				Lang._('main_toggle_hide_alerts') :
				Lang._('main_toggle_hide');
		} else {
			UI.panelToggleTitle.textContent = Lang._('MAIN_TOGGLE_LABEL');
			UI.panelToggle.ariaExpanded = 'true';
		}
	} else {
		if (State.english) {
			UI.panelToggleTitle.textContent = State.totalCount > 0 ?
				Lang._('main_toggle_show_alerts') :
				Lang._('main_toggle_show');
		} else {
			UI.panelToggleTitle.textContent = Lang._('MAIN_TOGGLE_LABEL');
			UI.panelToggle.ariaExpanded = 'false';
		}
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

export function showError(error) {
	customElements.define('sa11y-console-error', ConsoleErrors);
	const consoleErrors = new ConsoleErrors(error);
	document.body.appendChild(consoleErrors);
	throw Error(error);
}
