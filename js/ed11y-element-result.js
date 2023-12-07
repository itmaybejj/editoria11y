class Ed11yElementResult extends HTMLElement {
  /* global Ed11y */
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized) {
      this.open = false;
      this.racing = false;
      this.setAttribute('style', 'outline: 0px solid transparent;');
      const shadow = this.attachShadow({ mode: 'open' });

      // Create this.wrapper with type class
      this.resultID = this.dataset.ed11yResult;
      this.result = Ed11y.results[this.resultID];

      this.wrapper = document.createElement('aside');

      this.dismissable = !!this.result.dismissalKey;
      this.dismissed = !!this.result.dismissalStatus;
      // todo MVP this would only work in darkmode -- need more theme variables
      // #ffd4d4 red. turn background to alert color in lightmode.
      this.wrapper.classList.add('wrapper');
      this.wrapper.classList.add('ed11y-result');

      // Create tooltip toggle
      this.toggle = document.createElement('button');
      this.toggle.setAttribute('class', 'toggle');
      // todo parameterize
      let label = this.dismissable ? Ed11y.M.toggleManualCheck : Ed11y.M.toggleAlert;
      this.toggle.setAttribute('aria-label', Ed11y.M.toggleAriaLabel(this.resultID, label));
      this.toggle.setAttribute('aria-expanded', 'false');
      this.toggle.setAttribute('aria-haspopup', 'dialog');
      this.toggle.setAttribute('data-ed11y-result', this.dataset.ed11yResult);
      this.toggle.setAttribute('data-ed11y-ready', 'false');
      this.toggle.setAttribute('data-ed11y-race', 'false');
      this.wrapper.appendChild(this.toggle);
      this.toggle.addEventListener('click', this.toggleClick);
      this.toggle.addEventListener('mouseover', this.handleHover);
      this.tipNeedsBuild = true;

      // Create CSS with embedded icon
      const style = document.createElement('style');
      let icon = this.toggleImage();
      style.textContent = Ed11y.baseCSS + icon + `
        :host {
          position: absolute;
          opacity: 0;
          transition: opacity .25s ease-in;
          z-index: ${Ed11y.options.buttonZIndex - 1};
        }
        :host([data-ed11y-open='true']) {
          z-index: ${Ed11y.options.buttonZIndex};
        }
        .wrapper {
          width: 44px;
          height: 44px;
          overflow: visible;
          color: ${Ed11y.theme.text};
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
          color: ${Ed11y.theme.primaryText};
          background: ${Ed11y.theme.primary};
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
        button:focus-visible {
          outline: 2px solid transparent;
          box-shadow: inset 0 0 0 2px ${Ed11y.theme.focusRing}, 0 0 0 3px ${Ed11y.theme.primary};
        }
      `;
      shadow.appendChild(style);
      shadow.appendChild(this.wrapper);
      this.initialized = true;
    }
  }

  toggleImage() {

    let css = '';
    if (this.dismissed) {
      css = `
        .toggle {
          box-shadow: inset 0 0 0 2px ${Ed11y.theme.ok}, inset 0 0 0 3px ${Ed11y.theme.primaryText}, inset 0 0 0 6px ${Ed11y.theme.ok}, 1px 1px 5px 0 rgba(0,0,0,.5);
          background: ${Ed11y.theme.ok};
          color: ${Ed11y.theme.primaryText};
        }
        .toggle:hover, .toggle[aria-expanded='true'] {
          border: 2px solid ${Ed11y.theme.ok};
        }`;
      if (this.result.dismissalStatus === 'ok') {
        css += `
          .toggle::before {
            content: "✓";
          }
          `;
      } else {
        css += `
            .toggle::before {
              content: "–";
              font-family: georgia, serif;
            }
          `;
      }
    } else if (this.dismissable) {
      css = `.toggle {
        box-shadow: inset 0 0 0 2px ${Ed11y.theme.warning}, inset 0 0 0 3px #444, inset 0 0 0 6px ${Ed11y.theme.warning}, 1px 1px 5px 0 rgba(0,0,0,.5);
        background: ${Ed11y.theme.warning};
        color: #333;
      }
      .toggle::before {
        content: "?";
      }
      .toggle:hover, .toggle[aria-expanded='true'] {
        border: 2px solid ${Ed11y.theme.primary};
      }`;
    } else {
      css = `.toggle {
        box-shadow: inset 0 0 0 1px ${Ed11y.theme.alert}, inset 0 0 0 2px #fefefe, inset 0 0 0 6px ${Ed11y.theme.alert}, 1px 1px 5px 0 rgba(0,0,0,.5);
        background: #fefefe;
        color: ${Ed11y.theme.alert};
      }
      .toggle:hover, .toggle[aria-expanded='true'] {
        box-shadow: inset 0 0 0 1px ${Ed11y.theme.alert}, inset 0 0 0 2px #fefefe, inset 0 0 0 6px ${Ed11y.theme.alert}, 0 0 0 2px ${Ed11y.theme.primary}, 0 0 0 3px transparent;
      }
      .toggle::before {
        content: "!";
      }`;
    }
    return css;
  }

  handleHover(event) {
    event.preventDefault();
    let host = this.getRootNode().host;
    if (host.getAttribute('data-ed11y-open') === 'false' && host.racing === false) {
      host.racing = true;
      host.toggleTip(true);
      Ed11y.toggledFrom = this;
      window.setTimeout(function () {
        host.racing = false;
      }, 250, host);
    }
  }

  toggleClick(event) {
    event.preventDefault();
    let host = this.getRootNode().host;
    // Todo: extremely fast clicks throw TypeError: e is null
    if (host.racing === false) {
      host.racing = true;
      Ed11y.toggledFrom = this;
      let stateChange = host.getAttribute('data-ed11y-open') === 'false' ? 'open' : 'close';
      host.setAttribute('data-ed11y-action', stateChange);
      if (stateChange === 'open') {
        window.setTimeout(function () {
          let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
          activeTip?.shadowRoot.querySelector('.close').focus();
        }, 500);
      }
      window.setTimeout(function () {
        host.racing = false;
      }, 250, host);
    }

  }

  closeOtherTips() {
    Ed11y.findElements('openTips', '[data-ed11y-open="true"]');
    if (Ed11y.elements.openTips) {
      Array.from(Ed11y.elements.openTips).forEach(openTip => {
        openTip.setAttribute('data-ed11y-action', 'close');
      });
    }
  }

  buildTip() {
    this.tipNeedsBuild = false;

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
    this.result.element.classList.toggle(highlightOutline);
    if (changeTo === true) {
      // Allow for themes to reveal hidden tips
      document.dispatchEvent(new CustomEvent('ed11yPop', {
        detail: { id: 'ed11y-result-' + this.toggle.getAttribute('data-ed11y-result') }
      }));
      this.closeOtherTips();
      this.tip.setAttribute('data-ed11y-action', 'open');
      window.setTimeout(Ed11y.alignTip(this.toggle, this.tip)), 250;
      if (!Ed11y.elements.jumpList) {
        Ed11y.buildJumpList();
      }
      Ed11y.goto = this.getAttribute('data-ed11y-jump-position');
      Ed11y.setCurrentJump();
    } else {
      // Allow for themes to restore original DOM/CSS
      document.dispatchEvent(new CustomEvent('ed11yShut', {
        detail: { id: 'ed11y-result-' + this.toggle.getAttribute('data-ed11y-result') }
      }));
      this.tip.setAttribute('data-ed11y-action', 'shut');
    }
    this.setAttribute('data-ed11y-open', changeTo);
    this.open = changeTo;
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
