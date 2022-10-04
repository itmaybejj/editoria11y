class Ed11yElementTip extends HTMLElement {
  /* global Ed11y */
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized) {
      
      this.open = true;
      this.setAttribute('style', 'outline: 0px solid transparent;');
      const shadow = this.attachShadow({mode: 'open'});

      // Create this.wrapper with type class
      this.resultID = this.dataset.ed11yResult;
      this.result = Ed11y.results[this.resultID];

      this.wrapper = document.createElement('div');
      this.wrapper.setAttribute('role', 'dialog');
      
      this.dismissable = this.result[4] !== false ? true : false;
      this.wrapper.classList.add('wrapper');
      this.wrapper.classList.add('ed11y-result');

      this.addEventListener('mouseover', this.handleHover);

      // Create CSS with embedded icon
      const style = document.createElement('style');
      //let icon = this.toggleImage();
      style.textContent = Ed11y.baseCSS + `
        :host {
          position: absolute;
          top: 10vh;
          left: 2vw;
          opacity: 0;
          transition: opacity .25s ease-in;
          z-index: ${Ed11y.options.buttonZIndex - 1};
        }
        :host([data-ed11y-open='true']) {
          z-index: ${Ed11y.options.buttonZIndex};
          opacity: 1;
        }
        .wrapper {
          width: 1px;
          height: 1px;
          overflow: visible;
          color: ${Ed11y.color.text};
        }
        .arrow {
          display: none;
          content: "";
          position: absolute;
          transform: rotate(45deg);
          left: -10px;
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
          margin-top: -18px;
          background: linear-gradient(-45deg, transparent 0%, transparent 48%, ${Ed11y.color.tipHeader} 49%);
        }
        .arrow[data-direction="above"] {
          margin-top: -27px;
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
          width: clamp(12rem, 30rem, 89vw);
          display: none;
          box-shadow: 0 0 0 2px ${Ed11y.color.bg}, 2px 2px 4px ${Ed11y.color.primary}77;
        }
        @keyframes fade-in {
          0% { opacity: 0;}
          100% { opacity: 1;}
        }
        .open .tip {
          display: block;
        }
        .open .tip .content {
          animation: fade-in 0.25s ease-out;
        }
        .open .arrow {
          display: block;
          opacity: 1;
        }
        .title {
          background: ${Ed11y.color.tipHeader};
          color: ${Ed11y.color.primaryText};
          padding: 2px 35px 3px 14px;
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
          height: 36px;
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
      
      // Results array
      // [0] el element
      // [1] test ID
      // [2] tip contents
      // [3] position
      // [4] dismiss key
      // [5] dismissal status
      // e.g.: Ed11y.results.push([el],'linkTextIsGeneric','click here', 'a_semi-unique_attribute_of_this_element'

      this.tip = document.createElement('div');
      this.tip.classList.add('tip');
      this.tip.setAttribute('aria-labelledby', 'tip-title-' + [this.resultID]);
      this.heading = document.createElement('div');
      this.heading.setAttribute('id','tip-' + this.resultID);
      this.heading.classList.add('title');
      this.heading.setAttribute('tabindex', '-1');
      this.heading.innerHTML = Ed11y.M[this.result[1]].title;
      let content = document.createElement('div');
      content.classList.add('content');
      content.innerHTML = this.result[2];
      if (this.dismissable && (Ed11y.options.allowOK || Ed11y.options.allowHide)) {
        let dismissers = document.createElement('div');
        if (Ed11y.options.allowOK) {
          let dismissOKButton = document.createElement('button');
          dismissOKButton.classList.add('dismiss');
          // todo mvp Parameterize
          dismissOKButton.textContent = Ed11y.M.dismissOkButtonContent;
          dismissOKButton.setAttribute('title', Ed11y.M.dismissOkButtonTitle);
          dismissers.append(dismissOKButton);
          dismissOKButton.addEventListener('click', function(){Ed11y.dismissThis('ok');});
        }
        if (Ed11y.options.allowHide) {
          let dismissHideButton = document.createElement('button');
          dismissHideButton.classList.add('dismiss');
          // todo parameterize
          dismissHideButton.textContent = Ed11y.M.dismissHideButtonContent;
          dismissHideButton.setAttribute('title', Ed11y.M.dismissHideButtonTitle);
          dismissers.append(dismissHideButton);
          dismissHideButton.addEventListener('click', function(){Ed11y.dismissThis('hide');});
        }
        let dismissHelp = document.createElement('button');
        dismissHelp.classList.add('dismiss');
        // todo parameterize
        dismissHelp.textContent = '?';
        dismissers.append(dismissHelp);
        dismissHelp.addEventListener('click', function(){Ed11y.dismissHelp(dismissHelp);});
        content.append(dismissers);
      }
      let closeButton = document.createElement('button');
      closeButton.setAttribute('aria-label','close');
      closeButton.classList.add('close');
      closeButton.innerHTML = '&times;';
      let arrow = document.createElement('div');
      arrow.classList.add('arrow');

      this.tip.append(this.heading);
      this.tip.append(closeButton);
      this.tip.append(content);
      closeButton.addEventListener('click', (event) => {
        event.preventDefault;
        if(this.open) {
          let toggle = document.querySelector('ed11y-element-result[data-ed11y-open="true"]');
          Ed11y.toggledFrom.focus();
          // todo postpone: track if this tip was opened by the next button. If so, transfer focus back to it instead
          toggle?.setAttribute('data-ed11y-action', 'shut');
          this.setAttribute('data-ed11y-action', 'shut');
        }
      });
      shadow.appendChild(style);
      shadow.appendChild(this.wrapper);
      let focusLoopLeft = document.createElement('div');
      focusLoopLeft.setAttribute('tabIndex', '0');
      let focusLoopRight = document.createElement('div');
      focusLoopRight.setAttribute('tabindex', '0');
      this.wrapper.appendChild(focusLoopLeft);
      this.wrapper.appendChild(arrow);
      this.wrapper.appendChild(this.tip);
      this.wrapper.appendChild(focusLoopRight);
      let focusables = this.wrapper.querySelectorAll('a, button, [tabindex="0"]');
      let count = focusables.length;
      focusables[0].addEventListener('focus', () => {
        focusables[count - 2].focus();
      });
      focusables[count - 1].addEventListener('focus', () => {
        focusables[1].focus();
      });
      this.initialized = true;
    }
  }

  toggleTip(changeTo) {
    if (changeTo) {
      this.wrapper.classList.add('open');
    } else {
      this.wrapper.classList.remove('open');
    }
    this.setAttribute('data-ed11y-open',changeTo);   
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

  tipDOM (id, title, body) {
    return `>
      <div class="title" id="tip-title-${id}">${title}</div>
      <div class="message">${body}</div>
    `;
  }


  static get observedAttributes() { return ['data-ed11y-action']; }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (this.initialized) {
      switch (attr) {
      case 'data-ed11y-action':
        if (newValue !== 'false') {
          let changeTo = newValue === 'open' ? true : false;
          this.open = changeTo;
          this.setAttribute('data-ed11y-action', 'false');
          this.toggleTip(changeTo);
        }
        break;
      }
    }
  }
}
customElements.define('ed11y-element-tip', Ed11yElementTip);
