class Ed11yElementResult extends HTMLElement {
  /* global Ed11y */
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized) {
      this.open = false;
      this.racing = false;
      this.style.setProperty('outline', '0px solid transparent');
      const shadow = this.attachShadow({ mode: 'open' });

      // Create this.wrapper with type class
      this.resultID = this.dataset.ed11yResult;
      this.result = Ed11y.results[this.resultID];

      this.wrapper = document.createElement('aside');

      this.dismissable = !!this.result.dismissalKey;
      this.dismissed = !!this.result.dismissalStatus;
      // todo MVP this would only work in darkmode -- need more theme variables
      // #ffd4d4 red. turn background to alert color in lightmode.
      this.wrapper.classList.add('ed11y-wrapper', 'ed11y-result-wrapper');
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
      if (this.dismissed) {
        this.toggle.classList.add('dismissed');
        if (this.result.dismissalStatus !== 'ok') {
          this.toggle.classList.add('ok');
        } else {
          this.toggle.classList.add('notok');
        }
      } else if (this.dismissable) {
        this.toggle.classList.add('dismissable');
      }
      this.wrapper.appendChild(this.toggle);
      this.toggle.addEventListener('click', this.toggleClick);
      this.toggle.addEventListener('mouseover', this.handleHover);
      this.tipNeedsBuild = true;

      Ed11y.attachCSS(this.wrapper);

      shadow.appendChild(this.wrapper);
      this.initialized = true;
    }
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
    tip.classList.add('ed11y-element');
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
      Ed11y.alignTip(this.toggle, this.tip);
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
