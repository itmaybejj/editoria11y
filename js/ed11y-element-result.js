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
        this.toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>';
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
