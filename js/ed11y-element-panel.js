class Ed11yElementPanel extends HTMLElement {
  /* global Ed11y */

  constructor() {
    super();
  }

  // todo tabs JS
  // todo use Ed11yMessages for all the strings
  template() {
    return `
    <div class='buttonbar' role='tablist' aria-label='Editorial Ally panel controls'>
      <button role="tab" id='issues' aria-selected='true'>
          Issues
      </button>
      <button role="tab" id='headings' aria-selected='false'>
          Outline
      </button>
      <button role="tab" id='alts' aria-selected='false'>
          Alt Text
      </button>
      <button role="tab" id='help' aria-selected='false' aria-controls='help-tab' title='About this tool'>?</button>
      <button role="tab"  id='minimize' aria-selected='false' title='Minimize panel' aria-label="minimize" aria-pressed="false"><span>&ndash;</span></button>
      <button type='button' id='main-toggle' title='Toggle checker'><span class='close'>&times;</span><span class='open'><span class='icon'></span><span class='toggle-count'></span></span></button>
    </div>
    <div class="content">
      <div id='issues-tab' tabindex="0" role="tabpanel" class="show" aria-labelledby='issues'>
          <div>
              <div class='content-text'><span class='count'>No</span> <span class='content-type'>accessibility errors detected</span>.</div>
              <div aria-live='polite' class='announce hidden'></div>
          </div>
          <div class='jumplinks'>
            <button class='jump prev' data-ed11y-goto='0'><span aria-hidden='true'>« </span><span class='jump-prev'>Previous</span></button>
            <button class='jump next' data-ed11y-goto='0'><span class='jump-next'>First</span> <span aria-hidden='true'> »</span></button>
            <button id='restore' hidden>Restore hidden alerts</button>
          </div>
        </div>
      <div id='headings-tab' role="tabpanel" class="hidden" aria-labelledby='headings' tabindex='0'>
        <p>Check that this forms <a href='https://accessibility.princeton.edu/how/content/headings'>a complete outline</a>:</p>
        <ul id='outline'></ul>
      </div>
      <div id='alts-tab' role="tabpanel" class="hidden" aria-labelledby='alts' tabindex='0'>
        <p>Check <a href='https://accessibility.princeton.edu/how/content/alternative-text'>alt text</a>, <a href='https://accessibility.princeton.edu/how/content/images-text'>images of text</a>, &amp; <a href='https://webaim.org/techniques/captions/'>captions</a>.</p>
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
      // todo??
      // let restore = document.createElement('button');
      // restore.setAttribute('id', 'restore');
      // restore.textContent = `Some alerts hidden; show all`;
      // Ed11y.panelJumpPrev.insertAdjacentElement('beforebegin', restore);
      // todo MVP: style hover states 
      // todo MVP: shut panel warning toggle wrong color in light mode
      let style = document.createElement('style');
      style.textContent = Ed11y.baseCSS + `
        :host {
          position: fixed;
          right: 1%;
          bottom: 1%;
          opacity: 0;
          transition: opacity .15s ease-out;
          z-index: 9999;
        }
        :host:focus {
          outline: transparent;
        }
        .wrapper {
          width: clamp(160px, 92vw, 384px);
          background: ${Ed11y.color.bg};
          color: ${Ed11y.color.text};
          border-radius: 3px;
          box-shadow: 1px 1px 4px 2px ${Ed11y.color.text}77;
        }
        .warnings {
          background: ${Ed11y.color.bgWarning};
        }
        .errors {
          background: ${Ed11y.color.bgAlert};
        }
        a {
          color: inherit;
        }
        .content {
          padding: 8px 8px 8px 15px;
          border: 2px solid ${Ed11y.color.primary};
          border-top: 0;
          border-radius: 0 0 3px 3px;
          color: ${Ed11y.color.text};
          max-height: max(240px, 50vh);
          overflow: auto;
        }
        .warnings .content {
          border-color: ${Ed11y.color.primaryWarning};
        }
        .errors .content {
          border-color: ${Ed11y.color.primaryAlert};
        }
        @media (min-width: 400px) {
          #main-toggle-tab {
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
          background: ${Ed11y.color.primary};
          color: ${Ed11y.color.bg};
          padding: 8px 4px;
          font-family: inherit;
          font-size: 11px;
          font-weight: 600;
          border: 0;
          border-right: 1px solid ${Ed11y.color.bg}55;
          text-align: center;
          flex: auto;
          cursor: pointer;
        }
        .errors button {
          background: ${Ed11y.color.primaryAlert};
        }
        button:hover {
          background: ${Ed11y.color.text};
        }
        #shut-panel {
          border-right: 0;
        }
        .buttonbar button {
          color: ${Ed11y.color.bg};
        }
        .buttonbar button:hover {
          background: ${Ed11y.color.secondary};
        }
        .buttonbar button:first-child {
          border-radius: 3px 0 0 0; 
          border-left: 2px solid transparent;
        }          
        .buttonbar button:last-child {
          border-radius: 0 3px 0 0;
        }
        .buttonbar button[aria-selected="true"] {
          background: ${Ed11y.color.activeTab};
          color: ${Ed11y.color.text};
          margin-top: -2px;
          /*border-color: ${Ed11y.color.primary};*/
          border: 2px solid;
          border-bottom: 1px solid;
          border-radius: 3px 3px 0 0;
        }
        .warnings button[aria-selected="true"] {
          border-color: ${Ed11y.color.primaryWarning};
        }
        .errors button[aria-selected="true"] {
          border-color: ${Ed11y.color.primaryAlert};
        }
        .minimized, .shut {
          border-radius: 100%;
          background: transparent;
          width: auto;
          box-shadow: none;
        }
        .minimized .content, 
        .minimized .buttonbar button, 
        .minimized .close,
        .shut button, 
        .shut .content, 
        .active .toggle-count,
        .shut .close {
          display: none;
        }
        .shut #main-toggle, .minimized #main-toggle {
          display: block;
          min-width: 40px;
          height: 40px;
          border-radius: 100%;
          padding: 8px;
          border: 0;
        }
        .shut.warnings #main-toggle, .minimized.warnings #main-toggle {
          background-color: ${Ed11y.yellow};
          color: #000b;
          box-shadow: inset 0 0 0 2px ${Ed11y.yellow}, inset 0 0 0 3px #000b, 0 0 2px #000;
        }
        .shut.warnings #main-toggle:hover, .minimized.warnings #main-toggle:hover {
          box-shadow: inset 0 0 0 2px ${Ed11y.yellow}, inset 0 0 0 3px #000b, 0 0 0 3px #000b;
        }
        .shut.errors #main-toggle, .minimized.errors #main-toggle {
          color: ${Ed11y.red};
          box-shadow: inset 0 0 0 1px ${Ed11y.red}, inset 0 0 0 2px #fefefe, inset 0 0 0 6px ${Ed11y.red}, 1px 1px 5px 0 rgba(0,0,0,.5);
          background: #fefefe;
        }
        .shut.errors #main-toggle:hover, .minimized.errors #main-toggle:hover {
          box-shadow: inset 0 0 0 1px #b80519, inset 0 0 0 2px #fefefe, inset 0 0 0 6px #b80519, 0 0 0 4px ${Ed11y.red};
        }
        .minimized .toggle-count {
          display: block;
        }
        .jumplinks {
          text-align: right;
        }
        .jumplinks button {
          width: 
        }
        .content button {
          padding: 6px 11px;
          border-radius: 2px;
          background: inherit;
          color: inherit;
          box-shadow: 0 0 1px;
          margin: 4px 2px;
          margin: 2% 1%;
          width: 46%;
        }
        #restore {
          width: 96%;
        }
        .content button:hover {
          background: ${Ed11y.color.bg};
          color: ${Ed11y.color.text};
          box-shadow: inset 0 0 0 1px ${Ed11y.color.text};
        }

        .has-issues {
          background: ${Ed11y.color.bgHighlight};
          color: ${Ed11y.color.bg};
        }
        #issues-tab:not(.hidden) {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        #issues-tab > div {
          flex: 1 1 auto;
          align-self: center;
          max-width: 15em;
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
          box-shadow: 0 4px ${Ed11y.color.bg}, 0 5px ${Ed11y.color.primary}dd;
        }
        #alt-list li span {
          flex: 0 1 calc(100% - 100px);
        }
        #alt-list li img {
          flex: 0 1 80px;
          width: 80px;
          align-self: flex-start;
        }
      `;
      shadow.appendChild(style);
      shadow.appendChild(wrapper);
      Ed11y.panel = wrapper;
      Ed11y.panelToggle = wrapper.querySelector('#main-toggle');
      Ed11y.panelMessage = wrapper.querySelector('.content-text');
      Ed11y.panelCount = wrapper.querySelector('.count');
      Ed11y.panelJumpNext = wrapper.querySelector('.jump.next');
      Ed11y.panelJumpPrev = wrapper.querySelector('.jump.prev');
      Ed11y.panelJumpNext.addEventListener('click', this.jumpTo);
      Ed11y.panelJumpPrev.addEventListener('click', this.jumpTo);
      Ed11y.restoreDismissed = wrapper.querySelector('#restore');
      Ed11y.restoreDismissed.addEventListener('click', function(){
        Ed11y.clearDismissals();
      });
      Ed11y.announce = wrapper.querySelector('.announce');
      Ed11y.panelTabs = wrapper.querySelectorAll('.buttonbar button');
      Ed11y.panelTabs.forEach(tab => {
        // todo: needed?
        tab.addEventListener('click', this.handleBarClick);
      });
      this.initialized = true;
    }
  }

  jumpTo(event) {
    // Handle jump
    event.preventDefault();
    if (!Ed11y.jumpList) {
      Ed11y.buildJumpList();
    }
    // Find our button.
    // todo do we need to jump over dismissed alerts?
    let goNum = parseInt(this.dataset.ed11yGoto);
    // Send to ed11y to make timeouts easier
    let goto = Ed11y.jumpList[goNum];
    let gotoResult = Ed11y.results[goto.getAttribute('data-ed11y-result')];
    let bodyStyles = window.getComputedStyle(document.querySelector('body'));
    let gotoOffset = goto.getBoundingClientRect().top - parseInt(bodyStyles.getPropertyValue('padding-top')) - 50;
    // Throw an alert if the button or target is hidden.
    let firstVisible = false;
    let insert = gotoResult[3];
    let target;
    // todo this all belongs in the result open logic not here
    if (insert === 'beforebegin') {
      target = Ed11y.nextUntil(goto, ':not(ed11y-element-result)');
    }
    else if (insert === 'afterbegin') {
      // todo mvp these are not being inserted right; revisit. maybe always before, just sometimes before link?
      target = goto.parentElement;
    }
    let alertMessage;
    // todo mvp do these match tests work? parameterize, test
    if (Ed11y.options.hiddenHandlers.length > 0 && !!target.closest(Ed11y.options.hiddenHandlers)) {
      document.dispatchEvent(new CustomEvent('ed11yShowHidden', {
        detail: {id: goto.getAttribute('id')}
      }));
      window.setTimeout(function () {
        // Recalculate before jump.
        let gotoOffset = goto.getBoundingClientRect().top - parseInt(bodyStyles.getPropertyValue('padding-top')) - 50;
        document.querySelector('html, body').animate({
          scrollTop: (gotoOffset)
        }, 1);
        goto.setAttribute('data-ed11y-action','open');
      }, 500, goto);
    }
    else {
      // todo mvp test to see if this actually works
      if (!Ed11y.visible(target)) {
        firstVisible = Ed11y.firstVisibleParent(Ed11y.goto);
        alertMessage = Ed11y.M.jumpedToInvisibleTip;
      }
      // todo MVP this code is broken
      /*else if (!!goto.closest('[aria-hidden="true"]') || !!target?.closest('[aria-hidden="true"]')) {
        firstVisible = Ed11y.firstVisibleParent(Ed11y.goto.closest('[aria-hidden="true"]'));
        alertMessage = Ed11y.M.jumpedToAriaHiddenTip;
      }*/
      if (firstVisible) {
        alert(alertMessage);
        firstVisible.classList.add('ed11y-hidden-highlight');
        // todo MVP this is not implemented
        let highlightContainer = document.createElement('div');
        highlightContainer.setAttribute('tabindex', '-1');
        highlightContainer.classList.add('sr-only', 'hidden-highlight-' + Ed11y.goto);
        highlightContainer.textContent = 'Highlighted container';
        // let highlightContainer = Ed11y.builder('div',false,'sr-only, ed11y-hidden-highlight' + Ed11y.goto, "Highlighted container");
        Ed11y.gotoOffset = Ed11y.goto.getBoundingClientRect().top - parseInt(bodyStyles.getPropertyValue('padding-top')) - 50;
        goto.setAttribute('data-ed11y-action','open');
        let thisGoTo = '.ed11y-hidden-highlight-' + Ed11y.goto;
        document.querySelector(thisGoTo).focus();
      }
      else {
        // Go to the button.
        document.querySelector('html, body').animate({
          scrollTop: (gotoOffset)
        }, 1);
        goto.shadowRoot.querySelector('.toggle').focus();
        goto.setAttribute('data-ed11y-action','open');
      }
    }  
  }


  handleBarClick(event) {
    event.preventDefault();
    let id = event.currentTarget.getAttribute('id');
    switch (id) {
    case 'main-toggle':
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
      style.textContent = Ed11y.baseCSS + `
        :host {
          position: absolute;
          margin-top:-.5em;
        }
        .wrapper {          
          background: ${Ed11y.color.secondary};
          color: ${Ed11y.color.bg};
          box-shadow: 0 0 0 1px ${Ed11y.color.bg}, 0 0 0 3px ${Ed11y.color.secondary}, 1px 1px 5px 2px #000;
          padding: 0 7px;
          border-radius: 2px;
          margin-left: 35px;
          font-weight: 400;
          font-size: 12px;
        }
      `;
      shadow.appendChild(style);
      shadow.appendChild(wrapper);
      this.initialized = true;
    }
  }
}
customElements.define('ed11y-element-heading-label', Ed11yElementHeadingLabel);

class Ed11yElementAltLabel extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    if (!this.initialized) {
      const shadow = this.attachShadow({mode: 'open'});
      let wrapper = document.createElement('div');
      wrapper.setAttribute('class','wrapper');
      let i = this.dataset.ed11yAlt;
      let result = Ed11y.imageAlts[i];
      wrapper.innerHTML = 'Alt text: ' + result[1];
      let issues = !!result[2];
      wrapper.classList.add('issue' + issues);
      let style = document.createElement('style');
      style.textContent = Ed11y.baseCSS + `
        :host {
          position: absolute;
          margin-top:-.5em;
        }
        .wrapper {          
          background: ${Ed11y.color.bg};
          color: ${Ed11y.color.text};
          box-shadow: 0 0 0 1px ${Ed11y.color.primary}, 0 0 0 4px ${Ed11y.color.bg}, 0 0 0 5px ${Ed11y.color.primary}; 
          padding: .25em .5em;
          border-radius: 3px;
          margin-left: 35px;
          font-weight: 400;
        }
        .issuetrue {
          background: ${Ed11y.color.primaryAlert};
          color: ${Ed11y.color.bg};
        }
      `;
      shadow.appendChild(style);
      shadow.appendChild(wrapper);
      this.initialized = true;
    }
  }
}
customElements.define('ed11y-element-alt-label', Ed11yElementAltLabel);