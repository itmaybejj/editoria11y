import { Results, State, UI } from '../utils/state';
import Lang from '../../sa11y-js/utils/lang';
import Elements from '../../sa11y-js/utils/elements';
import { computeAriaLabel } from '../../sa11y-js/utils/computeAccessibleName';
import * as Utils from '../../sa11y-js/utils/utils';
import { alignAlts } from '../utils/align';
import { getElements } from '../utils/utils';
import { Options } from '../utils/options';
import checkReadability from '../../sa11y-js/rulesets/readability';
import { spriteDismiss } from '../elements/sprite.js';

export const showAltPanel = () => {
  // visualize image alts
  const altList = UI.panel.querySelector('#ed11y-alt-list');
  UI.imageAlts = [];
  Elements.Found.Images.forEach((img) => {
    const match = Results.find((i) => i.element === img);
    if (match) {
      UI.imageAlts.push({
        element: img,
        type: match.type,
        dismiss: match.dismiss,
        developer: match.developer,
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
    for (let i = 0; i < UI.imageAlts.length; i++) {
      const image = UI.imageAlts[i];
      const altText =
        computeAriaLabel(image.element) === 'noAria'
          ? Utils.escapeHTML(image.element.getAttribute('alt'))
          : computeAriaLabel(image.element);
      UI.imageAlts[i].altText = altText;
      //let alert = {};
      /*
			// Match dismissed images.
			// @todo CMS merge remove once new syntax is ready; this is the Sa11y logic for dev reference:
			// const isDismissed = dismissed.some((key) => key.dismiss === image.dismiss);
			// if (isDismissed) Object.assign(image, { dismissedImage: true });
			// Make developer checks don't show images as error if Developer checks are off!
			// const dev = Utils.store.getItem('sa11y-developer');
			// const devChecksOff = dev === 'Off' || dev === null;
			// const showDeveloperChecks = devChecksOff && (type === 'error' || type === 'warning') && developer === true;

			// Generate edit link if locally hosted image and prop is enabled.
			const edit = Constants.Global.editImageURLofCMS ? generateEditLink(image) : '';

			// Image is decorative (has null alt)
			const decorative = (element.hasAttribute('alt') && altText === '')
				? `<div class="badge">${Lang._('DECORATIVE')}</div>` : '';

			// If image is linked.
			const anchor = option.imageWithinLightbox ? `a[href]:not(${option.imageWithinLightbox})` : 'a[href]';
			const linked = (element.closest(anchor))
				? `<div class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._('LINKED')}</span></div>` : '';
			const visibleIcon = (hidden === true)
				? `<div class="badge"><span class="hidden-icon"></span><span class="visually-hidden">${Lang._('HIDDEN')}</span></div>` : '';
			let append;
      if (type === 'error' && !showDeveloperChecks) {
      // etc
			*/

      // Account for lazy loading libraries.

      if (State.inlineAlerts) {
        // Label images
        const mark = document.createElement('ed11y-element-alt');
        mark.classList.add('ed11y-element');
        mark.dataset.ed11yImg = i.toString();
        mark.setAttribute('id', `ed11y-alt-${i}`);
        mark.setAttribute('tabindex', '-1');
        UI.imageAlts[i].mark = mark;
        image.element.insertAdjacentElement('beforebegin', mark);
      }

      // Build alt list in panel
      const userText = document.createElement('span');
      if (altText !== '') {
        userText.textContent = altText;
      } else {
        const decorative = document.createElement('span');
        decorative.classList.add('ed11y-decorative');
        decorative.textContent = Lang._('DECORATIVE');
        userText.append(decorative);
      }
      const li = document.createElement('li');
      li.classList.add(`ed11y-${image.type}`);
      const img = document.createElement('img');
      img.setAttribute('src', Utils.getBestImageSource(image.element));
      img.setAttribute('alt', '');

      if (State.inlineAlerts) {
        const a = document.createElement('a');
        a.href = `#ed11y-alt-${i}`;
        a.classList.add('alt-parent');
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
    if (State.inlineAlerts) {
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
  if (State.inlineAlerts) {
    const reset = getElements(
      'ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight',
      'document',
      [],
    );
    reset?.forEach((el) => {
      el.remove();
    });
  }
  if (State.visualizing) {
    State.visualizing = false;
    UI.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = Lang._('PANEL_HEADING');
    UI.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'false');
    UI.panel.querySelector('#ed11y-visualizers').setAttribute('hidden', 'true');
    return;
  }
  State.visualizing = true;
  UI.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent =
    Lang._('buttonToolsActive');
  UI.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'true');
  UI.panel.querySelector('#ed11y-visualizers').removeAttribute('hidden');
  showAltPanel();
  showHeadingsPanel();
  if (Options.readabilityPlugin) {
    showReadability();
  }
}

const showReadability = () => {
  checkReadability(Results);
  for (let i = Results.length - 1; i >= 0; i--) {
    if (!Results[i].element) {
      // It's possible to get here while visualizing.
      Results.splice(i, 1);
    }
  }
};

export function showHeadingsPanel() {
  // Visualize the document outline

  const panelOutline = UI.panel.querySelector('#ed11y-outline');
  if (State.headingOutline.length) {
    panelOutline.innerHTML = '';
    State.headingOutline.forEach((result, i) => {
      // Todo 3.1: draw these and alts in editable mode.
      if (State.inlineAlerts) {
        const mark = document.createElement('ed11y-element-heading-label');
        mark.classList.add('ed11y-element', 'ed11y-element-heading');
        mark.dataset.ed11yHeadingOutline = i.toString();
        mark.setAttribute('id', `ed11y-heading-${i}`);
        mark.setAttribute('tabindex', '-1');
        // Array: el, level, outlinePrefix
        result.element.insertAdjacentElement('afterbegin', mark);
        UI.attachCSS(mark.shadowRoot);
      }
      const leftPad = 10 * result.headingLevel - 10;
      const li = document.createElement('li');
      li.classList.add(`level${result.headingLevel}`);
      li.style.setProperty('margin-left', `${leftPad}px`);
      const levelPrefix = document.createElement('strong');
      levelPrefix.textContent = `H${result.headingLevel}: `;
      const userText = document.createElement('span');
      userText.innerHTML = result.text;
      const link = document.createElement('a');
      if (State.inlineAlerts) {
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
        // @todo 3.1 add result key to Sa11y heading outline.
        /*let message = document.createElement('em');
				message.classList.add('ed11y-small');
				message.textContent = ' ' + el[2];
				if (State.inlineAlerts) {
					link.append(message);
				} else {
					li.append(message);
				}*/
      }
      panelOutline.append(li);
    });
  } else {
    panelOutline.innerHTML = `<p><em>${Lang._('PANEL_NO_HEADINGS')}</em></p>`;
  }
}

// Place markers on elements with issues
export function drawResult(result, index) {
  const mark = document.createElement('ed11y-element-result');
  if (State.bodyStyle !== true) {
    // "Drawing" for first second.
    mark.classList.add('ed11y-preload');
  }
  mark.classList.add('ed11y-element');
  mark.setAttribute('id', `ed11y-result-${index}`);
  mark.setAttribute('data-ed11y-result', index);
  mark.setAttribute('data-ed11y-open', 'false');
  if (!State.inlineAlerts) {
    mark.classList.add('ed11y-editable-result');
    State.panelAttachTo.insertAdjacentElement('beforeend', mark);
  } else {
    result.element.insertAdjacentElement(result.position, mark);
  }

  const shadow = mark.attachShadow({ mode: 'open' });

  // Create mark.wrapper with type class
  mark.resultID = mark.dataset.ed11yResult;
  mark.result = Results[mark.resultID];

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
  if (!State.inlineAlerts) {
    mark.toggle.style.setProperty('font-size', '16px');
  }
  if (mark.dismissed) {
    mark.toggle.innerHTML = spriteDismiss;
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

  State.jumpList.unshift(mark);
  Results[index].toggle = mark;
}
