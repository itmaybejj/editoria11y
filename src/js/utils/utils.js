import Lang from '../../sa11y-js/utils/lang.js';
import find from '../../sa11y-js/utils/find.js';
import Constants from '../../sa11y-js/utils/constants.js';
import findShadowComponents from '../../sa11y-js/core/find-shadow-components.js';
import Elements from '../../sa11y-js/utils/elements.js';
import ConsoleErrors from '../elements/ed11y-console-error.js';
import { dismissDigest, prepareDismissal } from '../../sa11y-js/utils/utils.js';
import { UI } from '../core/ui.js';
import { State } from '../../sa11y-js/core/state.js';

/*=============== Utilities ================*/

export function getElements(selector, desiredRoot, exclude = Constants.Exclusions.Sa11yElements) {
  return find(selector, desiredRoot, exclude);
}

export function findElements(key, selector, rootRestrict = true) {
  // Legacy support for deprecated code.
  const desiredRoot = rootRestrict ? 'root' : 'document';
  Elements.Found[key] = find(selector, desiredRoot, Constants.Exclusions.Sa11yElements);
}

// Object.assign without losing important bits from the shallow copy.
export const smush = (obj1, obj2, skip = []) => {
  Object.entries(obj2).forEach(([key, value]) => {
    if (!skip.includes(key)) {
      obj1[key] = value;
    }
  });
};

export function ed11yInitializeRoot(desiredRoot, desiredReadabilityRoot, fixedRoots) {
  Constants.Root.areaToCheck = [];
  Constants.Root.Readability = [];

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
        Constants.Root.areaToCheck.push(root);
      });
    } else {
      console.error(`Sa11y: The target readability root (${desiredRoot}) does not exist.`);
    }
  } catch {
    Constants.Root.areaToCheck.length = 0;
  }

  if (Constants.Root.areaToCheck.length === 0 && Constants.Global.headless === false) {
    // Todo: determine what state causes this.
    console.warn(Lang.sprintf('MISSING_ROOT', `"${State.option.checkRoot}"`).textContent);
    // createAlert(Lang.sprintf('MISSING_ROOT', desiredRoot), '', '');
    Constants.Root.areaToCheck.push(document.querySelector('body'));
  }

  /* Readability target area */
  try {
    const roots = document.querySelectorAll(desiredReadabilityRoot);
    if (roots.length > 0) {
      roots.forEach((root) => {
        Constants.Root.Readability.push(root);
      });
    } else {
      console.error(`Sa11y: The target readability root does not exist.`);
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
          const roots = Constants.Root.areaToCheck
            .map((el) => {
              if (el.id) return `#${el.id}`;
              if (el.className) return `.${el.className.split(/\s+/).filter(Boolean).join('.')}`;
              return el.tagName.toLowerCase();
            })
            .join(', ');

          // Append note to Readability panel.
          const note = document.createElement('div');
          note.id = 'readability-alert';
          note.innerHTML = `<hr><p></p>`;
          note
            .querySelector('p')
            .append(Lang.sprintf('MISSING_READABILITY_ROOT', roots, desiredReadabilityRoot));
          readabilityDetails.insertAdjacentElement('afterend', note);
        }
      }, 100);
    }
  }
}

export function addedNodeReadyToCheck(el) {
  if (!UI.recentlyAddedNodes.has(el)) {
    return true;
  }
  const hasText = el.textContent.trim().length;
  if (
    (!hasText && UI.recentlyAddedNodes.get(el) > Date.now() - 5000) ||
    (UI.activeRange && el.contains(UI.activeRange.startContainer))
  ) {
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
      UI.recentlyAddedNodes.delete(el);
      return true;
    }
  } else {
    // New node is ready for checking.
    UI.recentlyAddedNodes.delete(el);
    return true;
  }
}

const dropSomeElements = (arrayRef, sendTo = false, readyCheck = true, hiddenCheck = false) => {
  for (let i = arrayRef.length - 1; i >= 0; i--) {
    if (
      (hiddenCheck && !elementNotHidden(arrayRef[i])) ||
      (readyCheck && !addedNodeReadyToCheck(arrayRef[i]))
    ) {
      if (sendTo) {
        sendTo.push(arrayRef[i]);
      }
      arrayRef.splice(i, 1);
    }
  }
};

// First step in checkAll is getting a fresh set of elements to check.
export function buildElementList(onlyForFilter = false) {
  // Check for ignoreAll elements.
  UI.ignoreAll =
    State.option.ignoreAllIfAbsent &&
    document.querySelector(`:is(${State.option.ignoreAllIfAbsent})`) === null;
  if (!UI.ignoreAll && !!State.option.ignoreAllIfPresent) {
    UI.ignoreAll = document.querySelector(`:is(${State.option.ignoreAllIfPresent})`) !== null;
  }

  ed11yInitializeRoot(State.option.checkRoot, State.option.checkRoot, State.option.fixedRoots);

  for (let i = 0; i < UI.roots.length; i++) {
    if (State.option.fixedRoots) {
      // todo what if fixed root is a shadow host? What here is used, how?
      UI.roots[i].dataset.ed11yRoot = `${i}`;
    }
    if (UI.roots[i].shadowRoot) {
      UI.roots[i].setAttribute('data-ed11y-has-shadow-root', 'true');
      detectShadow(UI.roots[i]);
      UI.roots[i] = UI.roots[i].shadowRoot;
    } else {
      detectShadow(UI.roots[i]);
    }
  }

  // Find all web components on the page.
  findShadowComponents(State.option);

  // Find and cache elements.
  if (onlyForFilter) {
    // Split configuration; compute only the subset of collections needed.
    Elements.initializeFilterElements();
  } else {
    State.headingOutline = [];
    Elements.initializeElements(State.option);

    // Not needed for filter, since they weren't checked in the first loop.
    dropSomeElements(Elements.Found.Headings, Elements.Found.OutlineIgnore, true, true);
    dropSomeElements(Elements.Found.Blockquotes);
    dropSomeElements(Elements.Found.Tables);

    if (typeof State.option.editableContent === 'string') {
      Elements.Found.editable = getElements(State.option.editableContent, 'document');
    } else {
      Elements.Found.editable = State.option.editableContent;
    }
    if (UI.inlineAlerts && Elements.Found.editable.length > 0) {
      UI.inlineAlerts = false;
      console.warn('Editable content detected; Editoria11y inline alerts disabled');
    }

    if (State.option.panelNoCover) {
      // Moves panel off conflicting widgets.
      Elements.Found.panelNoCover = getElements(State.option.panelNoCover, 'document');
    }
  }
}

export function lagBounce(callback, wait) {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait + UI.browserLag);
  };
}

export function parents(el) {
  const nodes = [];
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
    reset?.forEach((el) => {
      el.classList.remove(cls);
    });
  });
}

export function checkVisibility(el, options = {}) {
  // Element.checkVisibility() is unavailable in Safari < 17.4, Chrome < 105, Firefox < 106.
  // Approximates the native behavior for those browsers.
  if (typeof el.checkVisibility === 'function') {
    return el.checkVisibility(options);
  }
  if (!el.isConnected) {
    return false;
  }
  const checkOpacity = !!(options.opacityProperty || options.checkOpacity);
  const checkVisibilityProperty = !!(options.visibilityProperty || options.checkVisibilityCSS);
  let node = el;
  while (node) {
    const style = window.getComputedStyle(node);
    if (style.display === 'none') {
      return false;
    }
    if (checkOpacity && style.opacity === '0') {
      return false;
    }
    if (node === el) {
      // Visibility is inherited, so only the element's computed value is needed.
      if (
        checkVisibilityProperty &&
        (style.visibility === 'hidden' || style.visibility === 'collapse')
      ) {
        return false;
      }
    } else if (style.contentVisibility === 'hidden') {
      return false;
    }
    // Walk the flat tree, crossing shadow boundaries.
    node = node.parentElement || node.getRootNode()?.host || null;
  }
  return true;
}

export function visibleElement(el) {
  // Checks if this element is visible. Used in parent iterators.
  // false is definitely invisible, true requires continued iteration to tell.
  // Todo postpone: Check for offscreen?
  if (el) {
    if (
      !checkVisibility(el, {
        opacityProperty: true,
        visibilityProperty: true,
      })
    ) {
      return false;
    }
    const style = window.getComputedStyle(el);
    return !(
      el.closest('.sr-only, .visually-hidden') ||
      style.getPropertyValue('z-index') < 0 ||
      (style.getPropertyValue('overflow') === 'hidden' &&
        (el.offsetWidth < 10 || el.offsetHeight < 10))
    );
  }
}

export function visible(el) {
  // Recurse element and ancestors to make sure it is visible
  if (!visibleElement(el)) {
    // Element is hidden
    return false;
  } else {
    // Element is not known to be hidden.
    const theParents = parents(el);
    const visibleParent = (parent) => visibleElement(parent);
    return theParents.every(visibleParent);
  }
}

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
}

export function elementNotHidden(el) {
  // Recurse element and ancestors to make sure it is visible
  return checkVisibility(el) && !el.closest('[aria-hidden="true"]');
}

export function detectShadow(container) {
  if (State.option.autoDetectShadowComponents) {
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
  } else if (State.option.shadowComponents) {
    const providedShadow = container.querySelectorAll(State.option.shadowComponents);
    providedShadow.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === 'open') {
        if (!container.matches('[data-ed11y-has-shadow-root]')) {
          component.setAttribute('data-ed11y-has-shadow-root', 'true');
          UI.attachCSS(component.shadowRoot);
          UI.attachCSS(component);
        }
        detectShadow(component);
      } else {
        console.warn(
          `Editoria11y: A specified shadow host has no shadowRoot: ${component.tagName}`,
        );
      }
    });
  }
}

const handleInitialPanelInteraction = () => {
  hideInitialCount();
};

let pluralRules;
let pluralRulesFor;

/**
 * CLDR plural category ("one", "two", "few", "many", "other") for a count in the
 * active UI language. Returns "other" if the language code is unusable, which
 * makes every language fall back to its single default form.
 */
const pluralCategory = (count) => {
  const code = Lang.langStrings.LANG_CODE;
  if (pluralRulesFor !== code) {
    pluralRulesFor = code;
    try {
      pluralRules = new Intl.PluralRules(code);
    } catch {
      pluralRules = null;
    }
  }
  return pluralRules ? pluralRules.select(count) : 'other';
};

/**
 * Picks the string key for a counted phrase. Languages supply `${base}_${category}`
 * only for the categories they actually inflect; anything absent falls back to
 * `fallback`, so languages with a single plural form need no extra strings.
 */
export const pluralKey = (base, count, fallback = base) => {
  const key = `${base}_${pluralCategory(count)}`;
  return Lang.langStrings[key] ? key : fallback;
};

const initialPanel = (ifNo) => {
  if (UI.panelInitial && UI.totalCount >= UI.panelInitial) {
    UI.panelToggle.classList.add('ed11y-preview');
    UI.panelInitial = UI.totalCount;
    UI.panelToggleTitle.innerHTML = '';
    // 1 and 2 spell the number out; above that the count is prefixed to an inflected
    // suffix. main_toggle_plural is the default; languages that inflect further add
    // main_toggle_few / _many / _one / _two, keyed to their CLDR plural categories.
    if (UI.totalCount > 2) {
      const suffix = pluralKey('main_toggle', UI.totalCount, 'main_toggle_plural');
      UI.panelToggleTitle.textContent = `${UI.totalCount}${Lang._(suffix)}`;
    } else if (UI.totalCount > 1) {
      UI.panelToggleTitle.textContent = Lang._('main_toggle_2');
    } else {
      UI.panelToggleTitle.textContent = Lang._('main_toggle_1');
    }
    UI.panel.addEventListener('mouseover', handleInitialPanelInteraction);
    UI.panel.addEventListener('focus', handleInitialPanelInteraction);
  } else {
    UI.panelInitial = false;
    UI.panelToggle.classList.remove('ed11y-preview');
    UI.panelToggleTitle.textContent = ifNo;
  }
};

export function panelLabel(show = UI.showPanel) {
  if (show) {
    // @todo: Strings are now available to add other languages to the english branch.
    if (UI.english) {
      initialPanel(
        UI.totalCount > 0 ? Lang._('main_toggle_hide_alerts') : Lang._('main_toggle_hide'),
      );
    } else {
      initialPanel(Lang._('MAIN_TOGGLE_LABEL'));
      UI.panelToggle.ariaExpanded = 'true';
    }
  } else {
    if (UI.english) {
      initialPanel(
        UI.totalCount > 0 ? Lang._('main_toggle_show_alerts') : Lang._('main_toggle_show'),
      );
    } else {
      initialPanel(Lang._('MAIN_TOGGLE_LABEL'));
      UI.panelToggle.ariaExpanded = 'false';
    }
  }
}

export function hideInitialCount() {
  if (UI.panelInitial) {
    UI.panelInitial = false;
    panelLabel();
  }
  UI.panel.removeEventListener('mouseover', handleInitialPanelInteraction);
  UI.panel.removeEventListener('focus', handleInitialPanelInteraction);
}

export function pauseObservers() {
  UI.watching?.forEach((observer) => {
    observer.observer.disconnect();
  });
}

export function resumeObservers() {
  UI.watching?.forEach((observer) => {
    observer.observer.observe(observer.root, observer.config);
  });
}

export function checkRunPrevent() {
  let preventCheck = State.option.preventCheckingIfPresent
    ? document.querySelector(State.option.preventCheckingIfPresent)
    : false;
  if (preventCheck) {
    console.warn(
      `Editoria11y is disabled because an element matched the "preventCheckingIfPresent" parameter:  "${State.option.preventCheckingIfPresent}"`,
    );
  } else if (!preventCheck && !!State.option.preventCheckingIfAbsent) {
    preventCheck = document.querySelector(`:is(${State.option.preventCheckingIfAbsent})`) === null;
    if (preventCheck) {
      console.warn(
        `Editoria11y is disabled because no elements matched the "preventCheckingIfAbsent" parameter: "${State.option.preventCheckingIfAbsent}"`,
      );
    }
  }
  return preventCheck;
}

export function createDismissalKey(string) {
  return dismissDigest(State.option.pepper, prepareDismissal(string));
}

// Walk State.results and, for each (element, test) pair, attach a back-
// reference to any existing MarkEntry. drawResult reads result.markEntry to
// decide whether to adopt existing DOM or create a new mark.
//
// Running this as a single post-push pass (rather than hooking into
// pushResult) covers every code path that lands results in State.results:
// the standard pushResult call, custom-ruleset.js direct pushes, and the
// event-based external custom tests that push to Ed11y.State.results from
// their ed11yRunCustomTests listeners. Keeps the sa11y-js layer unpatched.
export function matchAdoptions() {
  for (const result of State.results) {
    if (!result.element || result.markEntry) continue;
    const byTest = UI.marks.get(result.element);
    const existing = byTest?.get(result.test);
    if (existing) {
      result.markEntry = existing;
    }
  }
}

// Tear down one MarkEntry: remove its DOM nodes and unregister it from
// UI.marks / UI.markRegistry. Idempotent. See docs/race-condition-plan.md.
export function teardownMark(entry) {
  if (entry.button?.parentElement) {
    entry.button.remove();
  }
  if (entry.tip?.parentElement) {
    entry.tip.remove();
  }
  if (entry.highlight?.parentElement) {
    entry.highlight.remove();
  }
  const byTest = UI.marks.get(entry.element);
  if (byTest) {
    byTest.delete(entry.test);
    if (byTest.size === 0) {
      UI.marks.delete(entry.element);
    }
  }
  UI.markRegistry.delete(entry);
}

// After drawResult has stamped all live entries with the current runGen,
// any entry still carrying a stale generation represents an issue that
// did not fire in this run. Remove it.
export function sweepOrphans() {
  for (const entry of [...UI.markRegistry]) {
    if (entry.generation !== UI.runGen) {
      teardownMark(entry);
    }
  }
}

// Full teardown of every registered mark. Used by reset() when the panel
// is closing or the library is being disabled.
export function teardownAllMarks() {
  for (const entry of [...UI.markRegistry]) {
    teardownMark(entry);
  }
}

export function resetResults(incremental) {
  UI.jumpList = [];
  UI.tipOpen = false;
  UI.openTip = {
    button: false,
    tip: false,
  };
  UI.openJumpPosition = -1;
  resetClass([
    'ed11y-ring-red',
    'ed11y-ring-yellow',
    'ed11y-hidden-highlight',
    'ed11y-warning-inline',
    'ed11y-warning-block',
    'ed11y-error-block',
    'ed11y-error-inline',
  ]);

  if (incremental) {
    // Adoption path: leave result / tip / highlight DOM in place. pushResult
    // has attached markEntry back-references to unchanged issues; drawResult
    // will reuse their DOM and stamp them with the current runGen. After the
    // draw loop, sweepOrphans() (called from buildJumpList) tears down any
    // entry that was not re-stamped — i.e., issues that no longer fire.
    //
    // This replaces the previous pattern of removing highlights immediately
    // and tearing down buttons/tips on a 100ms timer, which both caused
    // flicker and left stale (element, test) state addressable by index
    // during the overlap window. See docs/race-condition-plan.md.
  } else {
    // Full teardown.
    teardownAllMarks();
    Elements.Found.reset = getElements(
      'ed11y-element-heading-label, ed11y-element-alt',
      'document',
      [],
    );
    Elements.Found.reset?.forEach((el) => {
      el.remove();
    });
  }
  UI.altMarks.clear();

  if (typeof UI.panelJumpNext === 'function') {
    UI.panelJumpNext.querySelector('.ed11y-sr-only').textContent = UI.english
      ? Lang._('buttonFirstContent')
      : `${Lang._('SKIP_TO_ISSUE')} 1`;
  }
}

export function newIncrementalResults() {
  // Obviously new if there are more results:
  if (UI.forceFullCheck || State.results.length !== UI.oldResults.length) {
    return true;
  }
  // Subtly new if a result has changed:
  let newResultString = `${UI.errorCount} ${UI.warningCount}`;
  State.results.forEach((result) => {
    newResultString += result.test + result.element?.outerHTML;
  });
  const changed = newResultString !== UI.oldResultString;
  UI.oldResultString = newResultString;
  return changed;
}

export function showError(error) {
  const consoleErrors = new ConsoleErrors(error);
  document.body.appendChild(consoleErrors);
  UI.attachCSS(consoleErrors.shadowRoot.querySelector('*'));
  throw Error(error);
}
