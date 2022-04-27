
// Create a class for the element
class Ed11yElementAlt extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized) {
      const shadow = this.attachShadow({mode: 'open'});
      let altTextWrapper = document.createElement('div');
      altTextWrapper.setAttribute('class','wrapper');
      let css = this.getAttribute('style');
      let alt = this.dataset.alt;
      if (alt === "null") {
        alt = "(missing!)"
      } else if (alt === "") {
        alt = "(none; image is marked decorative)";
      }
      altTextWrapper.setAttribute('style', css);
      let altText = document.createElement('span');
      altText.textContent = "Alt text: " + alt;
      altTextWrapper.appendChild(altText);
      const style = document.createElement('style');
      // todo have wrapper calculate z-index and offset of image
      style.textContent = Ed11y.baseCSS + `
        :host {
          position: absolute;
        }
        div {
          position: relative;
        }
        span {
          background: #3679b0f3;
          color: #fff;
          z-index: 100;
          font-weight: 500;
          padding: 6px;
          position: absolute;
          bottom: 12px;
          left: 0;
          right: 0;
        }
      `;
      shadow.appendChild(style);
      shadow.appendChild(altTextWrapper);
      this.initialized = true;
    }
  }

  static get observedAttributes() { return ['style']; }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'style' && this.initialized === true ) {
      let div = this.shadowRoot?.querySelector('div');
      div.setAttribute('style', newValue);
    }
  }
}
customElements.define('ed11y-element-alt', Ed11yElementAlt);