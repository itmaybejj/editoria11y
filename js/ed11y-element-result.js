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

      this.wrapper = document.createElement('div');

      this.dismissable = this.result.dismissalKey !== false;
      this.dismissed = !!this.result.dismissalStatus;
      this.wrapper.classList.add('ed11y-wrapper', 'ed11y-result-wrapper');
      this.wrapper.classList.add('ed11y-result');

      // Create tooltip toggle
      this.toggle = document.createElement('button');
      this.toggle.setAttribute('class', 'toggle');
      let label = this.dismissable ? Ed11y.M.toggleManualCheck : Ed11y.M.toggleAlert;
      this.toggle.setAttribute('aria-label', Ed11y.M.toggleAriaLabel(label));
      this.toggle.setAttribute('aria-expanded', 'false');
      this.toggle.setAttribute('aria-haspopup', 'dialog');
      this.toggle.setAttribute('data-ed11y-result', this.dataset.ed11yResult);
      this.toggle.setAttribute('data-ed11y-ready', 'false');
      this.toggle.setAttribute('data-ed11y-race', 'false');
      if (!Ed11y.options.inlineAlerts) {
        this.toggle.style.setProperty('font-size', '16px');
      }
      if (this.dismissed) {
        this.toggle.innerHTML = '<svg aria-hidden="true" width="10" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="Currentcolor" d="M39 5C28-3 13-1 5 9S-1 35 9 43l592 464c10 8 26 6 34-4s6-26-4-34L526 387c39-41 66-86 78-118c3-8 3-17 0-25c-15-36-46-88-93-131C466 69 401 32 320 32c-68 0-125 26-169 61L39 5zM223 150C249 126 283 112 320 112c80 0 144 65 144 144c0 25-6 48-17 69L408 295c8-19 11-41 5-63c-11-42-48-69-89-71c-6-0-9 6-7 12c2 6 3 13 3 20c0 10-2 20-7 28l-90-71zM373 390c-16 7-34 10-53 10c-80 0-144-65-144-144c0-7 1-14 1-20L83 162C60 191 44 221 35 244c-3 8-3 17 0 25c15 36 46 86 93 131C175 443 239 480 320 480c47 0 89-13 126-33L373 390z"/></svg>';
        this.toggle.classList.add('dismissed');
        if (this.result.dismissalStatus !== 'ok') {
          this.toggle.classList.add('notok');
        } else {
          this.toggle.classList.add('ok');
        }
      } else if (this.dismissable) {
        this.toggle.classList.add('dismissable');
      }
      this.wrapper.appendChild(this.toggle);
      this.toggle.addEventListener('click', this.toggleClick);
      this.toggle.addEventListener('focus', this.handleFocus);
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
    if (!this.classList.contains('intersecting') && host.open !== true && host.racing === false) {
      this.open = true;
      host.racing = true;
      host.toggleTip(true);
      Ed11y.toggledFrom = this;
      window.setTimeout(function () {
        host.racing = false;
      }, 250, host);
    }
  }

  handleFocus() {
    let host = this.getRootNode().host;
    if (this.getRootNode().host.classList.contains('ed11y-offscreen')) {
      host.result.element.scrollIntoView();
      Ed11y.alignButtons();
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
          activeTip?.shadowRoot.querySelector('.title').focus();
        }, 500);
      }
      window.setTimeout(function () {
        host.racing = false;
      }, 250, host);
    }

  }

  closeOtherTips() {
    if (Ed11y.openTip.button) {
      Ed11y.openTip.button.setAttribute('data-ed11y-action', 'close');
    }
  }

  buildTip() {
    this.tipNeedsBuild = false;

    let tip = document.createElement('ed11y-element-tip');
    tip.result = this.result;
    tip.setAttribute('data-ed11y-result', this.resultID);
    tip.classList.add('ed11y-element');
    tip.style.setProperty('opacity', '0');
    Ed11y.options.panelAttachTo.insertAdjacentElement('beforeend', tip);
    this.tip = tip;
  }

  toggleTip(changeTo) {
    if (this.tipNeedsBuild) {
      this.buildTip();
    }
    this.toggle.setAttribute('aria-expanded', changeTo);
    let highlightOutline = this.dismissable ? 'ed11y-ring-yellow' : 'ed11y-ring-red';
    if (Ed11y.options.inlineAlerts) {
      Ed11y.resetClass([
        'ed11y-hidden-highlight',
        'ed11y-ring-red',
        'ed11y-ring-yellow',
        'ed11y-warning-block',
        'ed11y-error-block',
        'ed11y-warning-inline',
        'ed11y-error-inline',
      ]);
    } else {
      Ed11y.editableHighlighter(this.resultID, changeTo);
    }
    if (changeTo === true) {
      this.tip.style.setProperty('opacity', '0');
      // Allow for themes to reveal hidden tips
      document.dispatchEvent(new CustomEvent('ed11yPop', {
        detail: {
          id: 'ed11y-result-' + this.toggle.getAttribute('data-ed11y-result'),
          result: this.result,
          tip: this.tip
        }
      }));
      this.closeOtherTips();
      this.tip.setAttribute('data-ed11y-action', 'open');
      if (Ed11y.options.inlineAlerts) {
        this.result.element.classList.add(highlightOutline);
        // Removed in 2.3.6; Todo: confirm not needed and delete.
        /*if (this.result.element.style.outline.indexOf('alert') === -1 ) {
          // Set property unless alert is already set.
          const display = window.getComputedStyle(this.result.element).getPropertyValue('display');
          let outlineClass;
          if (display.indexOf('inline') === -1 || this.result.element.tagName === 'IMG') {
            outlineClass = this.result.dismissalKey ?
              'ed11y-warning-block'
              : 'ed11y-error-block';
          } else {
            outlineClass = this.result.dismissalKey ?
              'ed11y-warning-inline'
              : 'ed11y-error-inline';
          }
          this.result.element.classList.add(outlineClass);
        }*/
      }
      requestAnimationFrame(()=>Ed11y.alignTip(this.toggle, this.tip, 4, true));
      if (!Ed11y.jumpList) {
        Ed11y.buildJumpList();
      }
      Ed11y.lastOpenTip = Number(this.getAttribute('data-ed11y-jump-position'));
      Ed11y.openTip = {
        button: this,
        tip: this.tip,
      };
      this.result.highlight?.style.setProperty('opacity', '1');
    } else {
      // Allow for themes to restore original DOM/CSS
      document.dispatchEvent(new CustomEvent('ed11yShut', {
        detail: { id: 'ed11y-result-' + this.toggle.getAttribute('data-ed11y-result') }
      }));
      this.tip.setAttribute('data-ed11y-action', 'shut');
      this.result.highlight?.style.setProperty('opacity', '0');
      Ed11y.openTip = {
        button: false,
        tip: false,
      };
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
          let changeTo = newValue === 'open';
          this.setAttribute('data-ed11y-action', 'false');
          this.toggleTip(changeTo);
        }
        break;
      }
    }
  }
}
customElements.define('ed11y-element-result', Ed11yElementResult);
