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
      this.wrapper = document.createElement('div');
      this.result = Ed11y.results[this.dataset.ed11yResult];
      this.dismissable = this.result[4] !== false ? true : false;
      // todo MVP this would only work in darkmode -- need more theme variables
      // #ffd4d4 red. turn background to alert color in lightmode.
      this.primaryColor = this.dismissable ? Ed11y.color.primaryWarning : Ed11y.color.primaryAlert;
      this.bgColor = this.dismissable ? Ed11y.color.bgWarning : Ed11y.color.bgAlert;
      this.wrapper.classList.add('wrapper');
      this.wrapper.classList.add('ed11y-result');

      // needed?
      //this.wrapper.classList.add(this.type);

      // Create tooltip toggle
      this.toggle = document.createElement('button');
      this.toggle.setAttribute('class','toggle');
      this.toggle.setAttribute('aria-label','Accessibility issue');
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
        aside {
          font-size: 14px;
          border: 2px solid ${this.primaryColor};
          background: ${this.bgColor};
          border-radius: 0 0 3px 3px;
          position:relative;
          margin-left: 58px;
          width: clamp(12rem, 96vw, 30rem);
          box-shadow: 0 0 0 2px ${this.bgColor}, 2px 2px 4px ${this.primaryColor}77;
        }
        .title {
          background: ${this.primaryColor};
          color: ${Ed11y.color.bg};
          padding: 0 35px 1px 14px;
          font-weight: bold;
          font-size: 14px;
          min-height: 28px;
          line-height: 1;
          display: grid;
          place-content: center left;
        }
        .content {
          padding: 4px 12px 18px;
        }
        p {
          margin-block-start: .5em;
          margin-block-end: .5em;
        }
        p:last-child {
          margin-block-end: 0;
        }
        .arrow {
          content: "";
          position: absolute;
          transform: rotate(45deg);
          width: 20px;
          height: 20px;
          left: 46px;
          background: ${this.primaryColor};
          top: 6px;
          box-shadow: 0 0 0 2px ${this.bgColor}, 2px 2px 4px ${this.primaryColor}77;
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
          background: ${this.primaryColor};
        }
        ul {
          margin-block-start: .64em;
          margin-block-end: .64em;
          padding-inline-start: 20px;
        }
        ul ul {
          margin-block-start: .25em;
          margin-block-end: .25em;
        }
        li {
          line-height: 1.3;
          margin-bottom: .25em;
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
          color: ${this.primaryColor};
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
          box-shadow: -1px 0 ${this.bgColor};
          background: transparent;
          width: 32px;
        }
        .close:hover {
          background: ${this.bgColor};
          color: ${this.primaryColor};
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
          width: 30px;
          height: 30px;
          line-height: 1;
          font-size: 16px;
        }
        .dismiss {
          background: ${Ed11y.color.button};
          margin: .5em 1em .25em 0;
          padding: 5px 9px;
          border-radius: 3px;
          font-weight: bold;
        }
        .dismiss:hover, .dismiss:focus-visible {
          color: ${Ed11y.color.text};
          background: ${this.bgColor};
          box-shadow: inset 0 0 0 2px ${Ed11y.color.primary};
        }
        .wrapper :focus-visible {
          outline: 2px solid transparent;
          box-shadow: inset 0 0 0 2px ${Ed11y.color.focusRing}, 0 0 0 3px ${Ed11y.color.primary};
        }
        [aria-expanded="false"] ~ aside, [aria-expanded="false"] ~ div {
          display: none;
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
        box-shadow: inset 0 0 0 2px ${Ed11y.yellow}, inset 0 0 0 3px #444, inset 0 0 0 6px ${Ed11y.yellow}, 1px 1px 5px 0 rgba(0,0,0,.5);
        background: ${Ed11y.yellow};
        color: #333;
      }
      .toggle::before {
        content: "?";
      }`;
    let alert = `
      .toggle {
        box-shadow: inset 0 0 0 1px ${Ed11y.red}, inset 0 0 0 2px #fefefe, inset 0 0 0 6px #b80519, 1px 1px 5px 0 rgba(0,0,0,.5);
        background: #fefefe;
        color: ${Ed11y.red};
      }
      .toggle::before {
        content: "!";
      }`;
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
    if (openTips) {
      Array.from(openTips).forEach(openTip => {
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
    // e.g.: Ed11y.results.push([el],'linkTextIsGeneric','click here', 'a_semi-unique_attribute_of_this_element'

    let resultID = this.toggle.getAttribute('data-ed11y-result');

    let tip = document.createElement('aside');
    tip.setAttribute('aria-labelledby', 'tip-title-' + [resultID]);
    let thisTitle = document.createElement('div');
    thisTitle.setAttribute('id','tip-' + resultID);
    thisTitle.classList.add('title');
    thisTitle.innerHTML = Ed11y.M[this.result[1]].title;
    let content = document.createElement('div');
    content.classList.add('content');
    content.innerHTML = this.result[2];
    if (this.dismissable && (Ed11y.options.allowOK || Ed11y.options.allowIgnore)) {
      let dismissers = document.createElement('div');
      if (Ed11y.options.allowOK) {
        let dismissOKButton = document.createElement('button');
        dismissOKButton.classList.add('dismiss');
        // todo Parameterize
        dismissOKButton.textContent = 'Mark as Checked and OK';
        dismissers.append(dismissOKButton);
        dismissOKButton.addEventListener('click', function(){Ed11y.dismissThis(resultID, 'ok');});
      }
      if (Ed11y.options.allowIgnore) {
        let dismissIgnoreButton = document.createElement('button');
        dismissIgnoreButton.classList.add('dismiss');
        dismissIgnoreButton.textContent = 'Ignore';
        dismissers.append(dismissIgnoreButton);
        dismissIgnoreButton.addEventListener('click', function(){Ed11y.dismissThis(resultID, 'ok');});
      }
      content.append(dismissers);
    }
    let closeButton = document.createElement('button');
    closeButton.setAttribute('aria-label','close');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;';
    let arrow = document.createElement('div');
    arrow.classList.add('arrow');

    tip.append(closeButton);
    tip.append(thisTitle);
    tip.append(content);
    this.toggle.insertAdjacentElement('afterend', tip);
    this.toggle.insertAdjacentElement('afterend', arrow);
    this.toggle.classList.add('ready');
    closeButton.addEventListener('click', (event) => {
      event.preventDefault;
      this.setAttribute('data-ed11y-action', 'shut');
    });
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
      this.allowOverflow();
      Ed11y.alignTip(this.toggle, this);
      if (!Ed11y.jumpList) {
        Ed11y.buildJumpList();
      }
      Ed11y.goto = this.getAttribute('data-ed11y-jump-position');
      Ed11y.setCurrentJump();
      // todo mvp does this still work?
      document.dispatchEvent(new CustomEvent('ed11yPop', {
        detail: {id: this.toggle.getAttribute('id')}
      }));
    } else {
      this.closest('.ed11y-force-overflow')?.classList.remove('ed11y-force-overflow');
      this.toggle.focus();
    }
    this.setAttribute('data-ed11y-open', changeTo);        
  }
  
  handleHover() {
    if (this.getAttribute('data-ed11y-open') === 'false') {
      this.toggleTip(true);
    }
  }

  allowOverflow() {
    // todo parameter
    if (Ed11y.options.allowOverflow.length > 0) {
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
