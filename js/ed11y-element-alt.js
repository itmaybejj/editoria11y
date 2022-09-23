class Ed11yElementAlt extends HTMLElement {
  /* global Ed11y */

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized) {
      const shadow = this.attachShadow({mode: 'open'});
      let altTextWrapper = document.createElement('div');
      altTextWrapper.setAttribute('class','wrapper');
      let img = Ed11y.imageAlts[this.dataset.ed11yImg];
      // img[el, src, altLabel, altStyle]
     
      let altSpan = document.createElement('span');
      altSpan.textContent = img[2];
      altSpan.classList.add(img[3]);
      altTextWrapper.appendChild(altSpan);
      const style = document.createElement('style');
      style.textContent = Ed11y.baseCSS + `
        :host {
          position: absolute;
        }
        div {
          position: absolute;
          bottom: 0;
          left:0;
          right:0;
        }
        span {
          background: ${Ed11y.color.primary}f3;
          color: ${Ed11y.color.primaryText};
          z-index: ${Ed11y.options.zIndex - 1};
          font-weight: 500;
          padding: 6px;
          position: absolute;
          bottom: 12px;
          left: 0;
          right: 0;
          box-shadow: 0 1px, 0 -1px; 
        }
        .warning { background: ${Ed11y.color.warning}; color: #111;}
        .error { background: ${Ed11y.color.bgHighlight};}
      `;
      shadow.appendChild(style);
      shadow.appendChild(altTextWrapper);
      this.initialized = true;
    }
  }

}
customElements.define('ed11y-element-alt', Ed11yElementAlt);