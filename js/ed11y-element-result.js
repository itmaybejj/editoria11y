class Ed11yElementResult extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized) {
      this.open = false;
      this.setAttribute('style', 'outline: 0px solid transparent;');
      const shadow = this.attachShadow({mode: 'open'});

      // Create this.wrapper with type class
      this.wrapper = document.createElement('div');
      this.result = Ed11y.results[this.dataset.ed11yResult];
      this.dismissable = this.result[3] !== false ? true : false;
      this.wrapper.classList.add('wrapper');

      // needed?
      //this.wrapper.classList.add(this.type);

      // Create tooltip toggle
      this.toggle = document.createElement('button');
      this.toggle.setAttribute('class','toggle');
      this.toggle.setAttribute('aria-label','Alert tooltip');
      this.toggle.setAttribute('aria-expanded','false');
      this.toggle.setAttribute('data-ed11y-result', this.dataset.ed11yResult);
      this.toggle.setAttribute('data-ed11y-ready', 'false');
      this.wrapper.appendChild(this.toggle);
      this.toggle.addEventListener('click', this.toggleClick);
      this.addEventListener('mouseover', this.handleHover);
      this.tipNeedsBuild = true;

      // Create CSS with embedded icon
      const style = document.createElement('style');
      let icon = this.toggleImage();
      style.textContent = Ed11y.baseCSS + icon + `
        :host {
          position: absolute;
          opacity: 0;
          transition: opacity .15s ease-out;
          z-index: 9998;
        }
        :host([data-ed11y-open='true']) {
          z-index: 9999;
        }
        .wrapper {
          width: 44px;
          height: 44px;
          overflow: visible;
          color: ${Ed11y.color.text};
        }
        button {
          margin: 0;
          border: 0;
          background: inherit;
          font-family: inherit;
          font-size: 11px;
          font-weight: 600;
          text-align: center;
          cursor: pointer;
          color: ${Ed11y.color.bg};
          background: ${Ed11y.color.primary};
        }
        p, ul {
          margin-block-start: .5em;
          margin-block-end: .5em;
        }
        button + p {
          padding-bottom: .5em;
          font-weight: 600;
          border-bottom: 1px solid ${Ed11y.color.text}77;
          margin-right: 2.75em;
        }
        ul {
          padding-inline-start: 20px;
        }
        ul ul {
          margin-block-start: .5em;
          margin-block-end: .5em;
        }
        li {
          line-height: 1;
        }
        .close {
          padding: 10px 12px 10px 12px;
          margin: -5px -16px 12px 12px;
          float: right;
        }
        .close:hover {
          background: ${Ed11y.color.secondary};
        }
        .toggle {
          display: block;
          border: 0;
          border-radius: 50%;
          position: absolute;
          margin: 10px 0 0 10px;
          z-index: 1;
          padding: 15px;
          vertical-align: middle;
          cursor: pointer;
          box-shadow: 1px 1px 5px 0 rgba(0,0,0,.5);
          width: 0;
          height: 0;
          background-size: 22px;
          line-height: 100px;
        }
        .dismiss {
          background: ${Ed11y.color.secondary};
          margin: .5em 1em 1.25em 2px;
          padding: 4px 6px;
          border-radius: 3px;
        }
        button:focus-visible, .toggle:focus-visible {
          outline: 2px solid #11264e;
          box-shadow: 0 0 0 4px #e2f2ff;
        }
        .dismiss:hover {
          background: ${Ed11y.color.primary};
        }
        .content {
          font-size: 14px;
          padding: 3px 14px;
          border: 2px solid ${Ed11y.color.primary};
          background: ${Ed11y.color.bg};
          border-radius: 0 0 3px 3px;
          position:relative;
          margin-left: 58px;
          width: clamp(12rem, 96vw, 30rem);
          box-shadow: 0 0 0 2px ${Ed11y.color.bg}, 2px 2px 4px ${Ed11y.color.primary}77;
        }
        .arrow {
          content: "";
          position: absolute;
          transform: rotate(45deg);
          width: 22px;
          height: 22px;
          left: 46px;
          background: ${Ed11y.color.primary};
          top: 15px;
          box-shadow: 0 0 0 2px ${Ed11y.color.bg}, 2px 2px 4px ${Ed11y.color.primary}77;
        }
        [aria-expanded="false"] ~ div {
          display: none;
        }
      `;
      shadow.appendChild(style);
      shadow.appendChild(this.wrapper);
      this.initialized = true;
    }
  }

  toggleImage() {
    let alert = `.toggle {background: 50% 50% #b80519 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' role='img' focusable='false' aria-hidden='true' viewBox='0 0 576 576' width='22px' height='22px'%3E%3Cpath fill='%23ffffff' d='M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'%3E%3C/path%3E%3C/svg%3E") no-repeat;}`;
    let manual = `.toggle {background: 50% 50% #ffc800 url("data:image/svg+xml,%3Csvg height='22px' width='22px' fill='%23505050' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 100 100' enable-background='new 0 0 100 100' xml:space='preserve'%3E%3Cpath d='M50,5C25.147,5,5,25.147,5,50c0,24.854,20.147,45,45,45c24.854,0,45-20.146,45-45C95,25.147,74.854,5,50,5z M49.999,76.75 c-3.342,0-6.061-2.717-6.061-6.057c0-3.346,2.719-6.066,6.061-6.066c3.343,0,6.063,2.723,6.063,6.066 C56.063,74.033,53.342,76.75,49.999,76.75z M66.238,43.808c-1.174,1.827-2.795,4.01-6.028,6.531 c-3.213,2.461-4.185,3.724-4.478,4.259c-0.166,0.299-0.402,0.895-0.59,2.004c-0.065,0.39-0.119,0.812-0.162,1.265l-0.254,2.714 l-9.771,0.023l0.124-3.127c0.017-0.4,0.06-1.185,0.168-1.918c0.324-2.229,1.085-4.209,2.261-5.882 c1.104-1.573,3.247-3.563,6.549-6.079c2.442-1.863,3.396-2.928,3.764-3.492c0.47-0.717,0.697-1.472,0.697-2.305 c0-1.931-0.705-3.46-2.094-4.545c-1.474-1.151-3.518-1.735-6.073-1.735c-2.265,0-4.176,0.599-5.682,1.778 c-1.594,1.239-2.713,2.953-3.245,4.964l-0.66,2.492l-9.563-1.037l0.676-3.238c0.88-4.218,2.865-7.474,5.902-9.677 c3.934-2.855,8.156-4.303,12.552-4.303c4.856,0,8.831,1.249,12.508,3.931c3.399,2.482,5.349,6.492,5.349,11.002 C68.188,39.642,67.55,41.727,66.238,43.808z'%3E%3C/path%3E%3C/svg%3E") no-repeat;}`;
    return this.dismissable ? manual : alert;
  }

  toggleClick(event) {
    event.preventDefault();
    if (!Ed11y.doubleClickPrevent) {
      let host = this.getRootNode().host;
      let stateChange = host.getAttribute('data-ed11y-open') === 'false' ? 'open' : 'close';
      host.setAttribute('data-ed11y-action', stateChange);
      Ed11y.doubleClickPrevent = true;
      window.setTimeout(function () {
        Ed11y.doubleClickPrevent = false;
      }, 100);
    }
  }

  closeOtherTips() {
    let openTips = document.querySelectorAll('[data-ed11y-open="true"]');
    if (!!openTips) {
      Array.from(openTips).forEach(openTip => {
        openTip.setAttribute('data-ed11y-action', 'close');
      })
    }
  }

  buildTip() {
    this.tipNeedsBuild = false;
    // [0] el element
    // [1] test ID
    // [2] tip contents
    // e.g.: Ed11y.results.push([el],'warningImageNullAlt','click here'
    let resultID = this.toggle.getAttribute('data-ed11y-result');
    let result = Ed11y.results[resultID];
    let thisContent = document.createElement('div');
    thisContent.classList.add('content');
    thisContent.innerHTML = result[2];
    if (this.dismissable) {
      let dismissOKButton = document.createElement('button');
      dismissOKButton.classList.add('dismiss');
      // Parameterize
      dismissOKButton.textContent = "Mark as Checked and OK";
      thisContent.append(dismissOKButton);
      dismissOKButton.addEventListener('click', function(){Ed11y.dismissThis(resultID, 'ok')});
      let dismissIgnoreButton = document.createElement('button');
      dismissIgnoreButton.classList.add('dismiss');
      dismissIgnoreButton.textContent = "Ignore";
      thisContent.append(dismissIgnoreButton);
      dismissIgnoreButton.addEventListener('click', function(){Ed11y.dismissThis(resultID, 'ok')});
    }
    let closeButton = document.createElement('button');
    closeButton.setAttribute('aria-label','close');
    closeButton.classList.add('close');
    closeButton.innerHTML = "&times;";
    let arrow = document.createElement('div');
    arrow.classList.add('arrow');
    thisContent.insertAdjacentElement('afterbegin', closeButton);
    this.toggle.insertAdjacentElement('afterend', thisContent);
    this.toggle.insertAdjacentElement('afterend', arrow);
    this.toggle.classList.add('ready');
    closeButton.addEventListener('click', () => {
      this.tipCloseButton();
    });
  }
  
  tipCloseButton() {
    this.toggle.focus();
    this.toggle.click();
  }

  toggleTip(changeTo) {
    if (this.tipNeedsBuild) {
      this.buildTip();
    }
    this.toggle.setAttribute('aria-expanded', changeTo);
    if (changeTo === true) {
      this.closeOtherTips();
      this.allowOverflow();
      Ed11y.alignTip(this.toggle, this);
      Ed11y.goto = this.getAttribute('data-ed11y-result');
      Ed11y.setCurrentJump();
      document.dispatchEvent(new CustomEvent("ed11yPop", {
        detail: {id: this.toggle.getAttribute('id')}
      }));
    } else {
      this.closest('.ed11y-force-overflow')?.classList.remove('ed11y-force-overflow');
    }
    this.setAttribute('data-ed11y-open', changeTo);        
  };
  
  handleHover(event) {
    if (this.getAttribute("data-ed11y-open") === "false") {
      this.toggleTip(true);
    }
  }

  allowOverflow() {
    // todo parameter
    if (ed11yAllowOverflow.length > 0) {
      this.closest(ed11yAllowOverflow).classList.add('ed11y-force-overflow');
    }
    else {
      let parents = Ed11y.parents(this);
      parents.forEach(parent => {
        let parentStyles = window.getComputedStyle(parent);
        if (parentStyles.getPropertyValue('overflow') === 'hidden') {
          parent.classList.add('ed11y-force-overflow');
        }
      });
    }
  }

  static get observedAttributes() { return ['data-ed11y-action']; }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (this.initialized) {
      switch (attr) {
        case 'data-ed11y-action':
          if (newValue !== 'false') {
            let changeTo = newValue === 'open' ? true : false;
            this.setAttribute('data-ed11y-action', 'false');
            this.toggleTip(changeTo);
          }
          break;
      }
    }
  }
}
customElements.define('ed11y-element-result', Ed11yElementResult);
