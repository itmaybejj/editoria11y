class Ed11yElementResult extends HTMLElement {
  /* global Ed11y */
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized) {
      this.open = false;
      this.setAttribute('style', 'outline: 0px solid transparent;');
      const shadow = this.attachShadow({mode: 'open'});

      // Create this.wrapper with type class
      this.resultID = this.dataset.ed11yResult;
      this.result = Ed11y.results[this.resultID];

      this.wrapper = document.createElement('aside');
      
      this.dismissable = this.result[4] !== false ? true : false;
      // todo MVP this would only work in darkmode -- need more theme variables
      // #ffd4d4 red. turn background to alert color in lightmode.
      this.wrapper.classList.add('wrapper');
      this.wrapper.classList.add('ed11y-result');

      // needed?
      // this.wrapper.classList.add(this.type);

      // Create tooltip toggle
      this.toggle = document.createElement('button');
      this.toggle.setAttribute('class','toggle');
      // todo parameterize
      let label = this.dismissable ? 'manual check needed' : 'alert';
      this.toggle.setAttribute('aria-label', `Accessibility issue ${this.resultID}, ${label}`);
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
          transition: opacity .25s ease-in;
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
        .arrow {
          display: none;
          content: "";
          position: absolute;
          transform: rotate(45deg);
          left: 46px;
          box-shadow: 0 0 0 2px ${Ed11y.color.bg}, 2px 2px 4px ${Ed11y.color.tipHeader}77;
          width: 20px;
          height: 20px;
          top: 6px;
        }
        .arrow[data-direction="left"] {
          left: -18px;
          background: linear-gradient(45deg, transparent 0%, transparent 48%, ${Ed11y.color.tipHeader} 49%);
        }
        .arrow[data-direction="under"] {
          margin: 33px 0 0 -30px;
          background: linear-gradient(-45deg, transparent 0%, transparent 48%, ${Ed11y.color.tipHeader} 49%);
        }
        .arrow[data-direction="above"] {
          margin: -33px 0 0 -30px;
          background: linear-gradient(135deg, transparent 0%, transparent 48%, ${Ed11y.color.tipHeader} 49%);
        }
        .arrow[data-direction="right"] {
          background: linear-gradient(-135deg, transparent 0%, transparent 48%, ${Ed11y.color.tipHeader} 49%);
        }
        .tip {
          font-size: 14px;
          z-index: 1;
          border: 2px solid ${Ed11y.color.tipHeader};
          background: ${Ed11y.color.bg};
          border-radius: 0 0 3px 3px;
          position:relative;
          margin-left: 58px;
          width: clamp(12rem, 30rem, 89vw);
          display: none;
          box-shadow: 0 0 0 2px ${Ed11y.color.bg}, 2px 2px 4px ${Ed11y.color.primary}77;
        }
        @keyframes fade-in {
          0% { opacity: 0;}
          100% { opacity: 1;}
        }
        [aria-expanded="true"] ~ .tip {
          display: block;
        }
        [aria-expanded="true"] ~ .tip .content {
          animation: fade-in 0.25s ease-out;
        }
        [aria-expanded="true"] ~ .arrow {
          display: block;
          opacity: 1;
        }
        .title {
          background: ${Ed11y.color.tipHeader};
          color: ${Ed11y.color.primaryText};
          padding: 0 35px 1px 14px;
          font-weight: bold;
          font-size: 14px;
          min-height: 28px;
          line-height: 1;
          display: grid;
          place-content: center left;
          outline: transparent;
        }
        .content {
          padding: 0 12px 16px 16px;
        }
        p {
          margin-block-start: 1em;
          margin-block-end: 1em;
        }
        p:last-child {
          margin-block-end: 0;
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
          color: ${Ed11y.color.primaryText};
          background: ${Ed11y.color.tipHeader};
        }
        ul {
          margin-block-start: .643em;
          margin-block-end: .643em;
          padding-inline-start: 20px;
        }
        li {
          line-height: 1.357;
        }
        li + li {
          margin-top: .643em;
        }
        table {
          border-spacing: 0;
          margin: 20px;
        }
        th, td {
          border: 0;
          box-shadow: 0 0 0 1px;
          padding: 5px 10px;
        }
        a {
          color: inherit;
        }
        a:hover, a:focus-visible {
          text-decoration-style: double;
          text-decoration-skip-ink: none;
        }

        .close {
          padding: 0 0 0 2px;
          font-size: 14px;
          line-height: 1;
          height: 32px;
          display: grid;
          place-content: center;
          font-weight: 400;
          position: absolute;
          top: -3px;
          right: -2px;
          box-shadow: -1px 0 ${Ed11y.color.bg};
          background: transparent;
          width: 32px;
        }
        .close:hover {
          background: ${Ed11y.color.bg};
          color: ${Ed11y.color.text};
        }
        .toggle {
          display: block;
          border: 0;
          border-radius: 50%;
          position: absolute;
          margin: 0 0 0 10px;
          z-index: 1;
          padding: 0;
          vertical-align: middle;
          cursor: pointer;
          width: 32px;
          height: 32px;
          line-height: 1;
          font-size: 16px;
        }
        .dismiss {
          margin: .5em 1em .25em 0;
          padding: 5px 9px;
          border-radius: 3px;
          font-weight: bold;
        }
        .dismiss:hover, .dismiss:focus-visible {
          color: ${Ed11y.color.text};
          background: ${Ed11y.color.bg};
          box-shadow: inset 0 0 0 2px ${Ed11y.color.tipHeader};
        }
        .wrapper :focus-visible {
          outline: 2px solid transparent;
          box-shadow: inset 0 0 0 2px ${Ed11y.color.focusRing}, 0 0 0 3px ${Ed11y.color.primary};
        }
      `;
      shadow.appendChild(style);
      shadow.appendChild(this.wrapper);
      this.initialized = true;
    }
  }

  toggleImage() {
    let manual = `
      .toggle {
        box-shadow: inset 0 0 0 2px ${Ed11y.color.warning}, inset 0 0 0 3px #444, inset 0 0 0 6px ${Ed11y.color.warning}, 1px 1px 5px 0 rgba(0,0,0,.5);
        background: ${Ed11y.color.warning};
        color: #333;
      }
      .toggle::before {
        content: "?";
      }
      .toggle:hover, .toggle[aria-expanded='true'] {
        border: 2px solid ${Ed11y.color.primary};
      }`;
    let alert = `
      .toggle {
        box-shadow: inset 0 0 0 1px ${Ed11y.color.alert}, inset 0 0 0 2px #fefefe, inset 0 0 0 6px #b80519, 1px 1px 5px 0 rgba(0,0,0,.5);
        background: #fefefe;
        color: ${Ed11y.color.alert};
      }
      .toggle:hover, .toggle[aria-expanded='true'] {
        box-shadow: inset 0 0 0 1px ${Ed11y.color.alert}, inset 0 0 0 2px #fefefe, inset 0 0 0 6px #b80519, 0 0 0 2px ${Ed11y.color.primary}, 0 0 0 3px transparent;
      }
      .toggle::before {
        content: "!";
      }`;
    return this.dismissable ? manual : alert;
  }

  toggleClick(event) {
    event.preventDefault();
    let host = this.getRootNode().host;
    let stateChange = host.getAttribute('data-ed11y-open') === 'false' ? 'open' : 'close';
    host.setAttribute('data-ed11y-action', stateChange);
    if (stateChange === 'open') {
      window.setTimeout(function() {
        let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
        activeTip.shadowRoot.querySelector('.title').focus();
      },500);
    }
  }

  closeOtherTips() {
    Ed11y.findElements('openTips','[data-ed11y-open="true"]');
    if (Ed11y.elements.openTips) {
      Array.from(Ed11y.elements.openTips).forEach(openTip => {
        openTip.setAttribute('data-ed11y-action', 'close');
      });
    }
  }

  tipDOM (id, title, body) {
    return `>
      <div class="title" id="tip-title-${id}">${title}</div>
      <div class="message">${body}</div>
    `;
  }

  buildTip() {
    this.tipNeedsBuild = false;
    // [0] el element
    // [1] test ID
    // [2] tip contents
    // [3] position
    // [4] dismiss key
    // [5] dismissal status
    // e.g.: Ed11y.results.push([el],'linkTextIsGeneric','click here', 'a_semi-unique_attribute_of_this_element'

    let tip = document.createElement('ed11y-element-tip');
    tip.setAttribute('data-ed11y-result', this.resultID);
    let body = document.querySelector('body');
    body.insertAdjacentElement('beforeend', tip);
    this.tip = tip;
  }

  toggleTip(changeTo) {
    if (this.tipNeedsBuild) {
      this.buildTip();
    }
    this.toggle.setAttribute('aria-expanded', changeTo);
    let highlightOutline = this.dismissable ? 'ed11y-ring-yellow' : 'ed11y-ring-red';
    this.result[0].classList.toggle(highlightOutline);
    if (changeTo === true) {
      this.closeOtherTips();
      this.allowOverflow(); // todo still needed?
      this.tip.setAttribute('data-ed11y-action', 'open');
      window.setTimeout(Ed11y.alignTip(this.toggle, this.tip)),100;
      if (!Ed11y.elements.jumpList) {
        Ed11y.buildJumpList();
      }
      Ed11y.goto = this.getAttribute('data-ed11y-jump-position');
      Ed11y.setCurrentJump();
      document.dispatchEvent(new CustomEvent('ed11yPop', {
        detail: {id: 'ed11y-result-' + this.toggle.getAttribute('data-ed11y-result')}
      }));
    } else {
      // Allow for themes to restore original DOM/CSS
      if (Ed11y.options.hiddenHandlers && !!this.closest(Ed11y.options.hiddenHandlers)) {
        document.dispatchEvent(new CustomEvent('ed11yShut', {
          detail: {id: 'ed11y-result-' + this.toggle.getAttribute('data-ed11y-result')}
        }));
      } 
      this.tip.setAttribute('data-ed11y-action', 'shut');
      // todo test: forced overflow system no longer needed?
      /*else {
        // Undo forced overflow
        this.closest('.ed11y-force-overflow')?.classList.remove('ed11y-force-overflow');
      }*/
    }
    this.setAttribute('data-ed11y-open', changeTo);      
  }
  
  handleHover() {
    if (this.getAttribute('data-ed11y-open') === 'false') {
      this.toggleTip(true);
    }
  }

  allowOverflow() {
    // todo beta: need "undo" event on close
    if (Ed11y.options.hiddenHandlers && !!this.closest(Ed11y.options.hiddenHandlers)) {
      if (Ed11y.hiddenHandled !== this.getAttribute('id')) {
        document.dispatchEvent(new CustomEvent('ed11yShowHidden', {
          detail: {id: this.getAttribute('id')}
        }));
      }
    }
    // todo test: forced overflow system no longer needed?
    /*    else if (Ed11y.options.allowOverflow.length > 0) {
      this.closest(Ed11y.options.allowOverflow).classList.add('ed11y-force-overflow');
    }
    else {
      let parents = Ed11y.parents(this);
      parents.forEach(parent => {
        let parentStyles = window.getComputedStyle(parent);
        if (parentStyles.getPropertyValue('overflow') === 'hidden') {
          parent.classList.add('ed11y-force-overflow');
        }
      });
    }*/
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
