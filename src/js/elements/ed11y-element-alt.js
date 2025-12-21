import { UI } from '../utils/state.js';
import Lang from '../../sa11y/utils/lang.js';

export class Ed11yElementAlt extends HTMLElement {
  connectedCallback() {
    if (!this.initialized) {
      const shadow = this.attachShadow({ mode: 'open' });
      const altTextWrapper = document.createElement('div');
      altTextWrapper.classList.add('ed11y-wrapper', 'ed11y-alt-wrapper');
      const img = UI.imageAlts[this.dataset.ed11yImg];
      const altSpan = document.createElement('span');
      if (img.altText !== '') {
        altSpan.textContent = img.altText;
      } else {
        altSpan.classList.add('ed11y-decorative');
        altSpan.textContent = Lang._('DECORATIVE');
      }
      altSpan.classList.add(`ed11y-${img.type}`);
      altTextWrapper.appendChild(altSpan);
      UI.attachCSS(altTextWrapper);
      shadow.appendChild(altTextWrapper);
      this.initialized = true;
    }
  }
}
