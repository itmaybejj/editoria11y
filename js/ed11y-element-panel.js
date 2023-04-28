class Ed11yElementPanel extends HTMLElement {
  /* global Ed11y */

  constructor() {
    super();
  }

  // todo mvp parameterize
  template() {
    return `
    <div class='buttonbar' role='tablist' aria-label='${Ed11y.M.panelControls}'>
      <button role="tab" id='issues' aria-selected='true'>
          ${Ed11y.M.buttonIssuesContent}
      </button>
      <button role="tab" id='headings' aria-selected='false'>
          ${Ed11y.M.buttonOutlineContent}
      </button>
      <button role="tab" id='alts' aria-selected='false'>
          ${Ed11y.M.buttonAltsContent}
      </button>
      <button role="tab" id='help' aria-selected='false' aria-controls='help-tab' title='${Ed11y.M.buttonAboutTitle}'>?</button>
      <button role="tab"  id='minimize' aria-selected='false' title='Minimize panel' aria-label="minimize" aria-pressed="false"><span>&ndash;</span></button>
      <button type='button' id='toggle'><span class='close'>&times;</span><span class='open'><span class='icon'></span><span class='toggle-count'></span></span></button>
    </div>
    <div class="content">
      <div id='issues-tab' tabindex="0" role="tabpanel" class="show" aria-labelledby='issues'>
          <div>
              <div class='content-text'>${Ed11y.M.panelCountBase}</div>
              <div aria-live='polite' class='announce sr-only'></div>
          </div>
          <div class='jumplinks'>
            <button class='jump prev' data-ed11y-goto='0' hidden><span aria-hidden='true'>« </span><span class='jump-prev'>${Ed11y.M.buttonPrevContent}</span></button>
            <button class='jump next' data-ed11y-goto='0'><span class='jump-next'>${Ed11y.M.buttonFirstContent}</span> <span aria-hidden='true'> »</span></button>
            <button id='show-hidden' aria-pressed='${!!Ed11y.options.showDismissed}' hidden>${Ed11y.M.buttonShowHiddenAlertContent}</button>
          </div>
        </div>
      <div id='headings-tab' role="tabpanel" class="hidden" aria-labelledby='headings' tabindex='0'>
        ${Ed11y.M.panelCheckOutline}
        <ul id='outline'></ul>
      </div>
      <div id='alts-tab' role="tabpanel" class="hidden" aria-labelledby='alts' tabindex='0'>
        ${Ed11y.M.panelCheckAltText}
        <ul id='alt-list'></ul>
      </div>
      <div id='help-tab' role="tabpanel" class="hidden" aria-labelledby='help' tabindex='0'>
      // todo inject content
      </div>
    </div>
    `;
  }

  connectedCallback() {
    if (!this.initialized) {
      this.setAttribute('style', 'outline: 0;');
      const shadow = this.attachShadow({mode: 'open'});
      let wrapper = document.createElement('div');
      wrapper.setAttribute('class','wrapper');
      wrapper.innerHTML = this.template();
      let style = document.createElement('style');
      style.textContent = Ed11y.baseCSS + `
        :host {
          position: fixed;
          right: 1%;
          bottom: 1%;
          opacity: 0;
          transition: opacity .25s ease-in;
          z-index: 9999;
        }
        :host:focus, div:focus {
          outline: transparent;
        }
        .wrapper {
          width: clamp(160px, 23em, 92vw);
          background: ${Ed11y.theme.bg};
          color: ${Ed11y.theme.text};
          border-radius: ${Ed11y.theme.borderRadius};
          box-shadow: 1px 1px 4px 2px ${Ed11y.theme.text}77;
          padding: ${Ed11y.theme.panelBorder}px;
        }
        [tabindex]:focus-visible {
          box-shadow: 0 0 0 3px ${Ed11y.theme.bg}, 0 0 0 4px ${Ed11y.theme.text};
        }
        .ed11y-small {
          font-size: 13px;
          opacity: .9;
        }
        a {
          color: inherit;
        }
        .content {
          padding: 4px 4px 4px 12px;
          border: ${Ed11y.theme.panelBorder}px solid ${Ed11y.theme.primary};
          border-top: 0;
          border-radius: 0 0 ${Ed11y.theme.borderRadius} ${Ed11y.theme.borderRadius};
          color: ${Ed11y.theme.text};
          max-height: max(240px, 50vh);
          overflow: hidden;
        }
        .content-text {
          margin-top: -2px;
        }
        @media (min-width: 400px) {
          #toggle-tab {
            display: grid;
            grid-gap: 1em;
            grid-template-columns: 16em 1fr;
          }
        }
        .hidden {
          display:none;
        }
        .buttonbar {
          display: flex;
        }
        button {
          margin: 0;
          background: ${Ed11y.theme.button};
          color: ${Ed11y.theme.primaryText};
          padding: 7px 4px;
          font-family: inherit;
          font-size: 11px;
          font-weight: 500;
          border: 0;
          border-right: 1px solid ${Ed11y.theme.primaryText}55;
          text-align: center;
          flex: auto;
          cursor: pointer;
        }
        button:hover {
          background: ${Ed11y.theme.text};
        }
        #shut-panel {
          border-right: 0;
        }
        .buttonbar button {
          color: ${Ed11y.theme.panelBarText};
          background: ${Ed11y.theme.panelBar};
          box-shadow: ${Ed11y.theme.panelBarShadow};
        }
        .buttonbar button:hover {
          background: ${Ed11y.theme.activeTab};
          color: ${Ed11y.theme.activeTabText};
        }
        .buttonbar button:first-child {
          border-radius: ${Ed11y.theme.borderRadius} 0 0 0; 
          border-left: 2px solid transparent;
        }          
        .buttonbar button:last-child {
          border-radius: 0 ${Ed11y.theme.borderRadius} 0 0;
        }
        .buttonbar button[aria-selected="true"] {
          background: ${Ed11y.theme.activeTab};
          box-shadow: inset 0 0 0 1px ${Ed11y.theme.primary}, inset 0 -2px ${Ed11y.theme.primary}22;
          color: ${Ed11y.theme.activeTabText};
          border: 0;
        }
        .buttonbar button + button[aria-selected="true"] {
          margin-left: -1px;
        }
        .shut {
          border-radius: 100%;
          background: transparent;
          width: auto;
          box-shadow: none;
        }
        .shut button, 
        .shut .content, 
        .active .toggle-count,
        .shut .close {
          display: none;
        }
        .shut #toggle {
          display: block;
          min-width: 36px;
          height: 36px;
          border-radius: 100%;
          padding: 8px;
          border: 0;
        }
        .pass.shut #toggle {
          font-size: 16px;
          background: ${Ed11y.theme.primary};
          color: ${Ed11y.theme.primaryText};
          line-height: 1;
          box-shadow: inset 0 0 0 2px ${Ed11y.theme.primary}, inset 0 0 0 4px #fffe;
          font-family: georgia, serif;
        }
        .pass.shut #toggle:hover {
          box-shadow: inset 0 0 0 2px #fffe, 0 0 0 2px ${Ed11y.theme.primary}; 
        }
        .shut.warnings #toggle {
          background-color: ${Ed11y.theme.warning};
          color: #000b;
          box-shadow: inset 0 0 0 2px ${Ed11y.theme.warning}, inset 0 0 0 3px #000b, 0 0 2px #000;
        }
        .shut.warnings #toggle:hover {
          box-shadow: inset 0 0 0 2px ${Ed11y.theme.warning}, inset 0 0 0 3px #000b, 0 0 0 3px #000b;
        }
        .shut.errors #toggle {
          color: ${Ed11y.theme.alert};
          box-shadow: inset 0 0 0 1px ${Ed11y.theme.alert}, inset 0 0 0 2px #fefefe, inset 0 0 0 6px ${Ed11y.theme.alert}, 1px 1px 5px 0 rgba(0,0,0,.5);
          background: #fefefe;
        }
        .shut.errors #toggle:hover {
          box-shadow: inset 0 0 0 1px #b80519, inset 0 0 0 2px #fefefe, inset 0 0 0 6px #b80519, 0 0 0 3px ${Ed11y.theme.alert}, 0 0 0 4px transparent;
        }
        .shut .toggle-count {
          display: block;
        }
        .jumplinks {
          text-align: right;
          width: min(12em, 50%);
        }
        .jumplinks button {
          min-width: max(7.25em, calc(49% - 3px));
        }
        .content button {
          padding: 7px 5px;
          border-radius: ${Ed11y.theme.borderRadius};
          background: inherit;
          color: inherit;
          border: 1px ${Ed11y.theme.button} solid;
          margin: 5px 0 5px 1px;
        }
        .jump.prev {
          min-width: 81px;
        }
        .jump.next {
          min-width: 60px;
        }
        #show-hidden {
          min-width: min(146px, 100%);
          margin: 0 -5px -5px;
          background: ${Ed11y.theme.primary};
          color: ${Ed11y.theme.primaryText};
          border: 0;
        }
        .next[hidden] + #show-hidden {
          margin-top: 22px;
        }
        #show-hidden[aria-pressed="true"] {
          background: ${Ed11y.theme.bg};
          color: ${Ed11y.theme.text};
          box-shadow: inset 8px 1px ${Ed11y.theme.primary};
        }
        #show-hidden:hover, #show-hidden:focus-visible {
          color: ${Ed11y.theme.primary};
          background: ${Ed11y.theme.primaryText};
          box-shadow: inset 8px 1px ${Ed11y.theme.primary};
        }
        .content button:hover {
          background: ${Ed11y.theme.bg};
          color: ${Ed11y.theme.text};
          box-shadow: inset 0 0 0 1px ${Ed11y.theme.text};
        }
        .warning {
          background: ${Ed11y.theme.warning};
          color: #111;
        }
        .error {
          background: ${Ed11y.theme.bgHighlight};
          color: #fff;
        }
        #issues-tab:not(.hidden) {
          display: flex;
          min-height: 3.25em;
          gap: 8px;
        }
        #issues-tab > div {
          flex: 1 1 auto;
          align-self: center;
        }
        #headings-tab, #alts-tab {
          max-height: max(240px, 50vh);
          overflow: auto;
        }
        #outline, #alt-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        #outline li {
          padding: 5px;
        }
        #alt-list li {
          display: flex;
          flex-wrap: wrap;
          gap: 1em;
          padding: 8px;
          margin: 8px 0;
          box-shadow: 0 4px ${Ed11y.theme.bg}, 0 5px ${Ed11y.theme.primary}22;
        }
        #alt-list li span {
          flex: 0 1 calc(100% - 100px);
        }
        #alt-list li img {
          flex: 0 1 80px;
          width: 80px;
          align-self: flex-start;
        }
        .sr-only {
          display: block;
          width: 1px;
          hight: 1px;
          overflow: hidden;
          opacity: 0;
          position: absolute;
        }
      `;
      shadow.appendChild(style);
      shadow.appendChild(wrapper);
      Ed11y.panel = wrapper;
      Ed11y.panelToggle = wrapper.querySelector('#toggle');
      Ed11y.panelMessage = wrapper.querySelector('.content-text');
      Ed11y.panelCount = wrapper.querySelector('.count');
      Ed11y.panelJumpNext = wrapper.querySelector('.jump.next');
      Ed11y.panelJumpPrev = wrapper.querySelector('.jump.prev');
      Ed11y.panelJumpNext.addEventListener('click', this.jumpTo);
      Ed11y.panelJumpPrev.addEventListener('click', this.jumpTo);
      Ed11y.showDismissed = wrapper.querySelector('#show-hidden');
      Ed11y.showDismissed.addEventListener('click', function(){
        Ed11y.toggleShowDismissals();
      });
      Ed11y.announce = wrapper.querySelector('.announce');
      Ed11y.panelTabs = wrapper.querySelectorAll('.buttonbar button');
      Ed11y.panelTabs.forEach(tab => {
        // todo postpone: needed?
        tab.addEventListener('click', this.handleBarClick);
      });
      this.initialized = true;
    }
  }

  jumpTo(event) {
    // Handle jump
    event.preventDefault();
    Ed11y.toggledFrom = this;
    Ed11y.resetClass(['ed11y-hidden-highlight']);
    if (!Ed11y.elements.jumpList) {
      Ed11y.buildJumpList();
    }
    // Find our button.
    let goNum = parseInt(this.dataset.ed11yGoto);
    let goto = Ed11y.elements.jumpList[goNum];
    goto.scrollIntoView({ block: 'center' });

    // Open the button
    goto.setAttribute('data-ed11y-action','open');

    let gotoResult = Ed11y.results[goto.getAttribute('data-ed11y-result')];
    let insert = gotoResult[3];
    let target;
    // todo postpone this all belongs in the result open logic not here
    if (insert === 'beforebegin') {
      target = Ed11y.nextUntil(goto, ':not(ed11y-element-result)');
    }
    else if (insert === 'afterbegin') {
      // todo mvp these are not being inserted right; revisit. maybe always before, just sometimes before link?
      target = goto.parentElement;
    }

    let delay = 100;
    if (Ed11y.options.hiddenHandlers.length > 0 && !!target.closest(Ed11y.options.hiddenHandlers)) {
      // Increase hesitation before scrolling, in case theme animates open an element.
      delay = 333;
      document.dispatchEvent(new CustomEvent('ed11yShowHidden', {
        detail: {result: goto.getAttribute('data-ed11y-result')}
      }));
    }

    // Throw an alert if the button or target is hidden.
    window.setTimeout(function (goto, target) {
      let firstVisible = false;
      let alertMessage;
      if (Ed11y.options.checkVisible && !Ed11y.visible(target)) {
        firstVisible = Ed11y.firstVisibleParent(target);
        alertMessage = Ed11y.M.jumpedToInvisibleTip;
      }
      else if (target.closest('[aria-hidden="true"]')) {
        firstVisible = target.closest('[aria-hidden="true"]');
        firstVisible = firstVisible.closest(':not([aria-hidden="true"])');
        alertMessage = Ed11y.M.jumpedToAriaHiddenTip;
      }
      if (firstVisible) {
        alert(alertMessage);
        firstVisible.classList.add('ed11y-hidden-highlight');
      }
      goto.scrollIntoView({ block: 'center' });
      let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
      activeTip.shadowRoot.querySelector('.close').focus();
    }, delay, goto, target);

  }


  handleBarClick(event) {
    event.preventDefault();
    let id = event.currentTarget.getAttribute('id');
    switch (id) {
    case 'toggle':
      Ed11y.togglePanel();
      break;
    case 'minimize':
      Ed11y.minimize();
      break;
    default:
      Ed11y.switchPanel(id);
      break;
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
customElements.define('ed11y-element-panel', Ed11yElementPanel);

class Ed11yElementHeadingLabel extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    if (!this.initialized) {
      const shadow = this.attachShadow({mode: 'open'});
      let wrapper = document.createElement('div');
      wrapper.setAttribute('class','wrapper');
      let i = this.dataset.ed11yHeadingOutline;
      let result = Ed11y.headingOutline[i];
      wrapper.innerHTML = 'H' + result[1];
      let issues = !!result[2];
      wrapper.classList.add('issue' + issues);
      let style = document.createElement('style');
      let fontSize = Math.max(52 - 8 * result[1], 12);
      style.textContent = Ed11y.baseCSS + `
        :host {
          position: absolute;
          margin-top:-.5em;
        }
        .wrapper {          
          background: ${Ed11y.theme.primary}ee;
          color: ${Ed11y.theme.primaryText};
          box-shadow: 0 0 0 1px ${Ed11y.theme.bg}ee, 0 0 0 4px ${Ed11y.theme.primary}ee, 1px 1px 5px 2px #000;
          padding: 0 .5em;
          line-height: 1.2;
          border-radius: ${Ed11y.theme.borderRadius};
          margin-left: 35px;
          font-weight: 400;
          font-size: ${fontSize}px;
        }
      `;
      shadow.appendChild(style);
      shadow.appendChild(wrapper);
      this.initialized = true;
    }
  }
}
customElements.define('ed11y-element-heading-label', Ed11yElementHeadingLabel);
