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

export function flattenText(text) {
  return text.replace(/[\n\r]+|\s{2,}/g, ' ').trim();
}

// Gets trimmed and normalized inner text nodes.
// Use computeText() instead for the full accessible name calculation.
export function getText(el) {
  return flattenText(el.textContent);
}

export function parents(el) {
  let nodes = [];
  nodes.push(el);
  while (el && !!el.parentElement && el.parentElement.tagName !== 'HTML') {
    nodes.push(el.parentElement);
    el = el.parentElement;
  }
  return nodes;
}

// Handle aria-label or labelled-by. Latter "wins" and can self-label.
export function computeAriaLabel(element, recursing = 0) {
  if (State.options.ignoreAriaOnElements && element.matches(State.options.ignoreAriaOnElements)) {
    return 'noAria';
  }
  if (State.options.ignoreTextInElements && element.matches(State.options.ignoreTextInElements)) {
    return '';
  }

  const labelledBy = element.getAttribute('aria-labelledby');
  if (!recursing && labelledBy) {
    const target = labelledBy.split(/\s+/);
    if (target.length > 0) {
      let returnText = '';
      target.forEach((x) => {
        const targetSelector = document.querySelector(`#${CSS.escape(x)}`);
        returnText += (!targetSelector) ? '' : computeText(targetSelector, 1);
      });
      return returnText;
    }
  }
  if (element.hasAttribute('aria-label') && element.getAttribute('aria-label').trim().length > 0) {
    return element.getAttribute('aria-label');
  }
  return 'noAria';
}

export function wrapPseudoContent(el, string) {
  // Get quoted content, avoid inserting URL references.
  // Hat tip Adam Chaboryk

  const getAltText = (content) => {
    if (content === 'none') return '';
    const match = content.includes('url(') || content.includes('image-set(')
      ? content.match(/\/\s*"([^"]+)"/) // Content after slash, e.g. url('image.jpg') / "alt text";
      : content.match(/"([^"]+)"/); // Content between quotes, e.g. "alt text";
    return match ? match[1] : '';
  };
  const before = getAltText(window.getComputedStyle(el, ':before').getPropertyValue('content'));
  const after = getAltText(window.getComputedStyle(el, ':after').getPropertyValue('content'));
  return `${before}${string}${after}`;

}

// Sets treeWalker loop to last node before next branch.
export function nextTreeBranch(tree) {
  for (let i = 0; i < 1000; i++) {
    if (tree.nextSibling()) {
      // Prepare for continue to advance.
      return tree.previousNode();
    }
    // Next node will be in next branch.
    if (!tree.parentNode()) {
      return false;
    }
  }
  return false;
}

// Subset of the W3C accessible name algorithm.
export function computeText(el, recursing = 0, excludeLinkClasses = false) {

  // Return immediately if there is an aria label.
  let hasAria = computeAriaLabel(el, recursing);
  if (hasAria !== 'noAria') {
    return hasAria;
  }

  // Return immediately if there is only a text node.
  let computedText = '';
  if (el.shadowRoot) {
    const shadowChildren = el.shadowRoot.querySelectorAll('*');
    shadowChildren.forEach(child => {
      computedText += computeText(child);
    });
  }
  if (!el.children.length) {
    // Skip treeWalker, only contents are text.
    computedText += wrapPseudoContent(el, el.textContent);
    if (!computedText.trim() && el.hasAttribute('title')) {
      computedText = el.getAttribute('title');
    }
    return recursing ? computedText : computedText.replace(/[\n\r]+|\s{2,}/g, ' ').trim();
  }

  // Otherwise, recurse into children.
  let treeWalker = document.createTreeWalker(
    el,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
  );

  let addTitleIfNoName = false;
  let aText = false;
  let count = 0;

  walker: while (treeWalker.nextNode()) {
    count++;

    // todo: Sa11y excludes
    if (treeWalker.currentNode.nodeType === Node.TEXT_NODE) {
      if (treeWalker.currentNode.parentNode.tagName !== 'SLOT') {
        computedText += ` ${treeWalker.currentNode.nodeValue}`;
      }
      continue;
    }

    // Jump over ignored link text containers.
    // e.g., "(link opens in new window)"
    if (treeWalker.currentNode.matches('.ed11y-element') || (excludeLinkClasses && treeWalker.currentNode.matches(State.options.linkIgnoreSelector))) {
      if (!nextTreeBranch(treeWalker)) {
        break walker;
      }
      continue;
    }

    // Inner nodes with shadowRoots.
    if (treeWalker.currentNode.shadowRoot) {
      const shadowChildren = treeWalker.currentNode.shadowRoot.querySelectorAll('*');
      shadowChildren.forEach(child => {
        computedText += computeText(child);
      });
      continue;
    }

    // Use link title as text if there was no text in the link.
    // Todo: in theory this could attach the title to the wrong node.
    if (addTitleIfNoName && !treeWalker.currentNode.closest('a')) {
      if (aText === computedText) {
        computedText += addTitleIfNoName;
      }
      addTitleIfNoName = false;
      aText = false;
    }

    if (treeWalker.currentNode.hasAttribute('aria-hidden') && !(recursing && count < 3)) {
      // Ignore elements and children, except when directly aria-referenced.
      // W3C name calc 2 is more complicated than this, but this is good enough.
      if (!nextTreeBranch(treeWalker)) {
        break walker;
      }
      continue;
    }

    let aria = computeAriaLabel(treeWalker.currentNode, recursing);
    if (aria !== 'noAria') {
      computedText += ' ' + aria;
      if (!nextTreeBranch(treeWalker)) {
        break walker;
      }
      continue;
    }

    switch (treeWalker.currentNode.tagName) {
      case 'STYLE':
      case 'NOSCRIPT':
        // Skip style elements
        if (!nextTreeBranch(treeWalker)) {
          break walker;
        }
        continue;
      case 'IMG':
        if (treeWalker.currentNode.hasAttribute('alt') &&
          !treeWalker.currentNode.matches('[role="presentation"]')) {
          computedText += treeWalker.currentNode.getAttribute('alt');
        }
        continue;
      case 'SVG':
      case 'svg':
        if (treeWalker.currentNode.getAttribute('role') === 'img' && treeWalker.currentNode.hasAttribute('alt')) {
          computedText += wrapPseudoContent(treeWalker.currentNode, treeWalker.currentNode.getAttribute('alt'));
          if (!nextTreeBranch(treeWalker)) {
            break walker;
          }
        }
        continue;
      case 'A':
        if (treeWalker.currentNode.hasAttribute('title')) {
          addTitleIfNoName = treeWalker.currentNode.getAttribute('title');
          aText = computedText;
        } else {
          // Reset
          addTitleIfNoName = false;
          aText = false;
        }
        computedText += wrapPseudoContent(treeWalker.currentNode, '');
        break;
      case 'INPUT':
        computedText += wrapPseudoContent(treeWalker.currentNode, '');
        if (treeWalker.currentNode.hasAttribute('title')) {
          addTitleIfNoName = treeWalker.currentNode.getAttribute('title');
        }
        break;
      case 'SLOT':
        if (treeWalker.currentNode.assignedNodes()) {
          // Slots have specific shadow DOM methods.
          const children = treeWalker.currentNode.assignedNodes();
          children?.forEach(child => {
            if (child.nodeType === Node.ELEMENT_NODE) {
              computedText += computeText(child);
            } else if (child.nodeType === Node.TEXT_NODE) {
              computedText += flattenText(child.nodeValue);
            }
          });
        }
        computedText += wrapPseudoContent(treeWalker.currentNode, '');
        break;
      default:
        // Other tags continue as-is.
        computedText += wrapPseudoContent(treeWalker.currentNode, '');
        break;
    }
  }
  // At end of loop, add last title element if need be.
  if (addTitleIfNoName && !aText) {
    computedText += ' ' + addTitleIfNoName;
  }

  computedText = wrapPseudoContent(el, computedText);

  if (!computedText.trim() && el.hasAttribute('title')) {
    return el.getAttribute('title');
  }

  return recursing ? computedText : computedText.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

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

// Is this still needed when we use real buttons? getting doubleClick on FF
export function keyboardClick(event) {
  event.preventDefault();
  let key = event.keyCode;
  switch (key) {
    case 13: // enter
    case 32: // space
      event.target.click();
      break;
  }
}

export function siblings(el) {
  if (el.parentNode === null) return [];
  return Array.prototype.filter.call(el.parentNode.children, function (child) {
    return child !== el;
  });
}

export function nextUntil(el, selector) {
  // Recursively iterate until match or null is returned.
  let next = el.nextElementSibling;
  if (next) {
    let nextMatch = next.matches(selector);
    if (nextMatch) {
      return next;
    } else {
      next = nextUntil(next, selector);
    }
  }
  return next;
};

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
};

export function parentLink(el) {
  return el.closest('a[href]');
};

export function srcMatchesOptions(source, option) {
  if (option.length > 0 && source?.length > 0) {
    let selectorArray = option.split(/\s*[\s,]\s*/).map((el) => {
      return '[src*=\'' + el + '\']';
    });
    let selectors = selectorArray.join(', ');
    let finder = Array.from(source);
    return finder.filter((el) => el.matches(selectors));
  } else {
    return [];
  }
};

export function sanitizeForHTML(string) {
  let entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  return String(string).replace(/[&<>"'`=/]/g, function (s) {
    return entityMap[s];
  });
};



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
      this.jumpTo(1); // todo
      State.loopStop = false;
    }
  },100, State.loopStop);
}
