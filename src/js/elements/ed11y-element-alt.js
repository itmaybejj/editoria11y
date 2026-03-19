import Lang from '../../sa11y-js/utils/lang.js';
import { UI } from '../core/ui.js';

export class Ed11yElementAlt extends HTMLElement {
  connectedCallback() {
    if (!this.initialized) {
      const shadow = this.attachShadow({ mode: 'open' });
      const altTextWrapper = document.createElement('div');
      altTextWrapper.classList.add('ed11y-wrapper', 'ed11y-alt-wrapper', 'ed11y-small');
      const img = UI.imageAlts[this.dataset.ed11yImg];
      const altSpan = document.createElement('span');
      if (img.altText === '') {
        const decorative = document.createElement('span');
        decorative.classList.add('ed11y-decorative');
        decorative.textContent = Lang._('DECORATIVE');
        altSpan.append(decorative);
        altSpan.classList.add(`ed11y-${img.type}`);
      } else if (img.altText === null) {
        const decorative = document.createElement('span');
        decorative.classList.add('ed11y-decorative');
        decorative.textContent = img.type === 'pass' ? Lang._('MISSING') : Lang.testNames[img.test];
        altSpan.append(decorative);
        altSpan.classList.add(`ed11y-error`);
      } else {
        altSpan.textContent = img.altText;
        altSpan.classList.add(`ed11y-pass`);
      }
      altTextWrapper.appendChild(altSpan);
      UI.attachCSS(altTextWrapper);
      shadow.appendChild(altTextWrapper);
      this.initialized = true;
    }
  }
}
