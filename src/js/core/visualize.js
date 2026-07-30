import Lang from '../../sa11y-js/utils/lang';
import Elements from '../../sa11y-js/utils/elements';
import { computeAriaLabel } from '../../sa11y-js/utils/computeAccessibleName';
import * as Utils from '../../sa11y-js/utils/utils';
import { alignAlts } from '../utils/align';
import { getElements } from '../utils/utils';
import checkReadability from '../../sa11y-js/rulesets/readability';
import sprite from '../elements/sprite.js';
import { State } from '../../sa11y-js/core/state.js';
import { UI } from './ui.js';

export const showAltPanel = () => {
  // visualize image alts
  const altList = UI.panel !== false && UI.panel.querySelector('#ed11y-alt-list');
  if (!altList) {
    return;
  }
  UI.imageAlts = [];
  Elements.Found.Images.forEach((img) => {
    const match = State.results.find((i) => i.element === img);
    if (match) {
      UI.imageAlts.push({
        element: img,
        type: match.type,
        dismiss: match.dismiss,
        developer: match.developer,
        test: match.test,
      });
    } else {
      UI.imageAlts.push({
        element: img,
        type: 'pass',
      });
    }
  });

  if (UI.imageAlts.length > 0) {
    altList.innerHTML = '';
    const oldMarks = getElements('ed11y-element-alt', 'root', []);
    oldMarks?.forEach((mark) => {
      mark.remove();
    });
    for (let i = 0; i < UI.imageAlts.length; i++) {
      const image = UI.imageAlts[i];
      const altText =
        computeAriaLabel(image.element) === 'noAria'
          ? image.element.getAttribute('alt')
          : computeAriaLabel(image.element);
      UI.imageAlts[i].altText = altText;

      if (UI.inlineAlerts) {
        // Label images
        const mark = document.createElement('ed11y-element-alt');
        mark.classList.add('ed11y-element');
        mark.dataset.ed11yImg = i.toString();
        mark.setAttribute('id', `ed11y-alt-${i}`);
        mark.setAttribute('tabindex', '-1');
        mark.title = Lang.testNames[image.test];
        UI.imageAlts[i].mark = mark;
        image.element.insertAdjacentElement('beforebegin', mark);
      }

      // Build alt list in panel
      const userText = document.createElement('span');
      if (altText === '') {
        const decorative = document.createElement('span');
        decorative.classList.add('ed11y-decorative');
        decorative.textContent = Lang._('DECORATIVE');
        userText.append(decorative);
      } else if (altText === null) {
        const decorative = document.createElement('span');
        decorative.classList.add('ed11y-decorative');
        decorative.textContent = Lang.testNames[image.test];
        userText.append(decorative);
      } else {
        userText.textContent = altText;
      }
      const li = document.createElement('li');
      li.classList.add(`ed11y-${image.type}`);
      const img = document.createElement('img');
      img.setAttribute('src', Utils.getBestImageSource(image.element));
      img.setAttribute('alt', '');

      if (UI.inlineAlerts) {
        const a = document.createElement('a');
        a.href = `#ed11y-alt-${i}`;
        a.classList.add('alt-parent');
        a.title = Lang.testNames[image.test];
        li.append(a);
        a.append(img);
        a.append(userText);
      } else {
        li.classList.add('alt-parent');
        li.append(img);
        li.append(userText);
      }
      altList.append(li);
    }
    if (UI.inlineAlerts) {
      alignAlts();
    } else {
      UI.imageAlts.length = 0;
    }
    //findElements('altMark', 'ed11y-element-alt', false );
  } else {
    const noImages = document.createElement('p');
    const noItalic = document.createElement('em');
    noItalic.textContent = Lang._('NO_IMAGES');
    noImages.appendChild(noItalic);
    altList.innerHTML = '';
    altList.appendChild(noImages);
  }
};

export function visualize() {
  if (!UI.panel) {
    return;
  }
  if (UI.inlineAlerts) {
    const reset = getElements(
      'ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight',
      'document',
      [],
    );
    reset?.forEach((el) => {
      el.remove();
    });
    UI.altMarks.clear();
  }
  if (UI.visualizing) {
    UI.visualizing = false;
    UI.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = Lang._('PANEL_HEADING');
    UI.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'false');
    UI.panel.querySelector('#ed11y-visualizers').setAttribute('hidden', 'true');
    return;
  }
  UI.visualizing = true;
  UI.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent =
    Lang._('buttonToolsActive');
  UI.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'true');
  UI.panel.querySelector('#ed11y-visualizers').removeAttribute('hidden');
  showAltPanel();
  showHeadingsPanel();
  if (State.option.readabilityPlugin) {
    showReadability();
  }
}

const showReadability = () => {
  checkReadability();
  for (let i = State.results.length - 1; i >= 0; i--) {
    if (!State.results[i].element) {
      // It's possible to get here while visualizing.
      State.results.splice(i, 1);
    }
  }
};

export function showHeadingsPanel() {
  // Visualize the document outline

  const panelOutline = UI.panel !== false && UI.panel.querySelector('#ed11y-outline');
  if (!panelOutline) {
    return;
  }
  const oldHeadingMarks = getElements('ed11y-element-heading-label', 'root', []);
  oldHeadingMarks?.forEach((mark) => {
    mark.remove();
  });
  if (State.headingOutline.length) {
    panelOutline.innerHTML = '';
    State.headingOutline.forEach((result, i) => {
      // Todo 3.1: draw these and alts in editable mode.
      if (UI.inlineAlerts) {
        const mark = document.createElement('ed11y-element-heading-label');
        mark.classList.add('ed11y-element', 'ed11y-element-heading');
        mark.dataset.ed11yHeadingOutline = i.toString();
        mark.setAttribute('id', `ed11y-heading-${i}`);
        mark.setAttribute('tabindex', '-1');
        // Array: el, level, outlinePrefix
        result.element.insertAdjacentElement('afterbegin', mark);
        UI.attachCSS(mark.shadowRoot);
      }
      const leftPad = 7 * result.headingLevel - 7;
      const li = document.createElement('li');
      li.classList.add(`level${result.headingLevel}`);
      li.style.setProperty('margin-left', `${leftPad}px`);
      const levelPrefix = document.createElement('strong');
      levelPrefix.textContent = `H${result.headingLevel}: `;
      const userText = document.createElement('span');
      userText.textContent = result.text;
      const link = document.createElement('a');
      if (UI.inlineAlerts) {
        link.setAttribute('href', `#ed11y-heading-${i}`);
        li.append(link);
        link.append(levelPrefix);
        link.append(userText);
      } else {
        li.append(levelPrefix);
        li.append(userText);
      }
      if (result.type) {
        // Has an error message
        li.classList.add(`ed11y-${result.type}`);
      }
      panelOutline.append(li);
    });
  } else {
    panelOutline.innerHTML = `<p><em>${Lang._('PANEL_NO_HEADINGS')}</em></p>`;
  }
}

// Place markers on elements with issues
export function drawResult(result, index) {
  // Adoption path: pushResult has attached a back-reference to an existing
  // MarkEntry when the same (element, test) pair fired in a prior run.
  // Reuse the button DOM instead of rebuilding; tear down any previously
  // built tip so it re-renders from the fresh result content on next open.
  // See docs/race-condition-plan.md.
  const adopted = result.markEntry;
  // Any live MarkEntry whose button is still in the DOM is a valid adoption
  // target. We don't guard against "two results claiming the same entry in
  // one run" because buildJumpList is also called from fallback paths
  // (jumpTo, toggleTip) without a fresh runGen bump — in those paths every
  // entry already carries the current runGen and must still be adopted, not
  // recreated.
  if (adopted?.button?.isConnected) {
    const mark = adopted.button;
    mark.setAttribute('id', `ed11y-result-${index}`);
    mark.setAttribute('data-ed11y-result', index);
    mark.resultID = `${index}`;
    mark.result = result;
    mark.toggle.setAttribute('data-ed11y-result', `${index}`);

    const nextDismissable = result.type !== 'error';
    const nextDismissed = !!result.dismissalStatus;
    if (mark.dismissable !== nextDismissable || mark.dismissed !== nextDismissed) {
      mark.dismissable = nextDismissable;
      mark.dismissed = nextDismissed;
      mark.toggle.classList.toggle('dismissable', nextDismissable && !nextDismissed);
      mark.toggle.classList.toggle('dismissed', nextDismissed);
      mark.toggle.innerHTML = nextDismissed ? sprite.dismiss : '';
    }

    if (mark.tip) {
      mark.tip.remove();
      mark.tip = null;
    }
    mark.tipNeedsBuild = true;

    // Inline-alert buttons are placed as DOM siblings of their target via
    // insertAdjacentElement; if the target (or its surroundings) was
    // reparented between runs the sibling position can be wrong. Re-anchor
    // on every adopt in inline mode — cheap, and a no-op when unchanged.
    if (UI.inlineAlerts && result.element) {
      result.element.insertAdjacentElement(result.position, mark);
    }

    adopted.result = result;
    adopted.generation = UI.runGen;
    UI.jumpList.unshift(mark);
    result.toggle = mark;
    return;
  }

  const mark = document.createElement('ed11y-element-result');
  if (UI.bodyStyle !== true) {
    // "Drawing" for first second.
    mark.classList.add('ed11y-preload');
  }
  mark.classList.add('ed11y-element');
  mark.setAttribute('id', `ed11y-result-${index}`);
  mark.setAttribute('data-ed11y-result', index);
  mark.setAttribute('data-ed11y-open', 'false');
  if (!UI.inlineAlerts) {
    mark.classList.add('ed11y-editable-result');
    UI.panelAttachTo.insertAdjacentElement('beforeend', mark);
  } else {
    result.element.insertAdjacentElement(result.position, mark);
  }

  const shadow = mark.attachShadow({ mode: 'open' });

  // Create mark.wrapper with type class
  mark.resultID = mark.dataset.ed11yResult;
  mark.result = State.results[mark.resultID];

  mark.wrapper = document.createElement('div');

  mark.dismissable = mark.result.type !== 'error';
  mark.dismissed = !!mark.result.dismissalStatus;
  mark.wrapper.classList.add('ed11y-wrapper', 'ed11y-result-wrapper');
  mark.wrapper.style.setProperty('opacity', '0');
  mark.wrapper.classList.add('ed11y-result');

  // Create tooltip toggle
  mark.toggle = document.createElement('button');
  mark.toggle.setAttribute('class', 'toggle');
  const label = mark.dismissable ? Lang._('WARNING') : Lang._('ERROR');
  mark.toggle.setAttribute('aria-label', label);
  mark.toggle.setAttribute('aria-expanded', 'false');
  mark.toggle.setAttribute('aria-haspopup', 'dialog');
  mark.toggle.setAttribute('data-ed11y-result', mark.dataset.ed11yResult);
  mark.toggle.setAttribute('data-ed11y-ready', 'false');
  mark.toggle.setAttribute('data-ed11y-race', 'false');
  if (!UI.inlineAlerts) {
    mark.toggle.style.setProperty('font-size', '16px');
  }
  if (mark.dismissed) {
    mark.toggle.innerHTML = sprite.dismiss;
    mark.toggle.classList.add('dismissed');
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

  UI.jumpList.unshift(mark);
  State.results[index].toggle = mark;

  // Register a new MarkEntry so future runs can adopt this button.
  if (result.element) {
    const entry = {
      result,
      button: mark,
      tip: null,
      highlight: null,
      generation: UI.runGen,
      element: result.element,
      test: result.test,
    };
    let byTest = UI.marks.get(result.element);
    if (!byTest) {
      byTest = new Map();
      UI.marks.set(result.element, byTest);
    }
    byTest.set(result.test, entry);
    UI.markRegistry.add(entry);
    result.markEntry = entry;
  }
}
