class Ed11yElementAlt extends HTMLElement {
  /* global Ed11y */

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized) {
      const shadow = this.attachShadow({mode: 'open'});
      let altTextWrapper = document.createElement('div');
      altTextWrapper.classList.add('ed11y-wrapper','ed11y-alt-wrapper');
      let img = Ed11y.imageAlts[this.dataset.ed11yImg];
      // img[el, src, altLabel, altStyle]

      let altSpan = document.createElement('span');
      altSpan.textContent = img[2];
      altSpan.classList.add(img[3]);
      altTextWrapper.appendChild(altSpan);
      Ed11y.attachCSS(altTextWrapper);
      shadow.appendChild(altTextWrapper);
      this.initialized = true;
    }
  }

}
customElements.define('ed11y-element-alt', Ed11yElementAlt);
