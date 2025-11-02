import {State, UI} from "./state.js"

/*=============== Utilities ================*/

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

  // Todo beta: function and parameter to auto-detect shadow components.
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
    // Todo this can dupe
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

export function raceCrash() {
  // A marked element disappeared while we were jumping to it.
  if (State.loopStop) {
    return;
  }
  State.loopStop = true;
  this.reset();
  State.showPanel = true;
  this.checkAll();
  window.setTimeout(function() {
    if (State.results.length > 0 && State.loopStop) {
      this.jumpTo(); // todo
      State.loopStop = false;
    }
  },100, State.loopStop);
}
