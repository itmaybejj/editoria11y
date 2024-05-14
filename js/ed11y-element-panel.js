class Ed11yElementPanel extends HTMLElement {
  /* global Ed11y */

  constructor() {
    super();
  }

  // todo mvp parameterize
  template() {
    return `
    <div class='ed11y-buttonbar' role='tablist' aria-label='${Ed11y.M.panelControls}'>
      <button role="tab" id='ed11y-issues' aria-controls='ed11y-issues-tab' aria-selected='true'>
          ${Ed11y.M.buttonIssuesContent}
      </button>
      <button role="tab" id='ed11y-headings' aria-controls='ed11y-headings-tab' aria-selected='false'>
          ${Ed11y.M.buttonOutlineContent}
      </button>
      <button role="tab" id='ed11y-alts' aria-controls='ed11y-alts-tab' aria-selected='false'>
          ${Ed11y.M.buttonAltsContent}
      </button>
      <button role="tab" id='ed11y-help' aria-selected='false' aria-controls='ed11y-help-tab' title='${Ed11y.M.buttonAboutTitle}'>?</button>
      <button role="tab"  id='ed11y-minimize' aria-selected='false' title='Minimize panel' aria-label="minimize"><span>&ndash;</span></button>
      <button type='button' id='ed11y-toggle'><span class='close'>&times;</span><span class='open'><span class='icon'></span><span class='toggle-count'></span></span></button>
    </div>
    <div class="content">
      <div id='ed11y-issues-tab' tabindex="0" role="tabpanel" class="show" aria-labelledby='ed11y-issues'>
          <div>
              <div class='content-text'>${Ed11y.M.panelCountBase}</div>
              <div aria-live='polite' class='announce ed11y-sr-only'></div>
          </div>
          <div class='ed11y-jumplinks'>
            <button class='ed11y-jump prev' data-ed11y-goto='0' hidden><span aria-hidden='true'>« </span><span class='jump-prev'>${Ed11y.M.buttonPrevContent}</span></button>
            <button class='ed11y-jump next' data-ed11y-goto='0'><span class='jump-next'>${Ed11y.M.buttonFirstContent}</span> <span aria-hidden='true'> »</span></button>
            <button id='ed11y-show-hidden' aria-pressed='${!!Ed11y.options.showDismissed}' hidden></button>
          </div>
        </div>
      <div id='ed11y-headings-tab' role="tabpanel" class="ed11y-hidden" aria-labelledby='ed11y-headings' tabindex='0'>
        ${Ed11y.M.panelCheckOutline}
        <ul id='ed11y-outline'></ul>
      </div>
      <div id='ed11y-alts-tab' role="tabpanel" class="ed11y-hidden" aria-labelledby='ed11y-alts' tabindex='0'>
        ${Ed11y.M.panelCheckAltText}
        <ul id='ed11y-alt-list'></ul>
      </div>
      <div id='ed11y-help-tab' role="tabpanel" class="ed11y-hidden" aria-labelledby='ed11y-help' tabindex='0'>
      </div>
    </div>
    `;
  }

  connectedCallback() {
    if (!this.initialized) {

      this.style.setProperty('outline', '0');
      this.classList.add('ed11y-element');
      const shadow = this.attachShadow({mode: 'open'});
      let wrapper = document.createElement('div');
      wrapper.classList.add('ed11y-wrapper', 'ed11y-panel-wrapper', 'ed11y-pass');
      wrapper.innerHTML = this.template();
      Ed11y.attachCSS(shadow);
      shadow.appendChild(wrapper);
      Ed11y.panel = wrapper;
      Ed11y.panelToggle = wrapper.querySelector('#ed11y-toggle');
      Ed11y.panelMessage = wrapper.querySelector('.content-text');
      Ed11y.panelCount = wrapper.querySelector('.count');
      Ed11y.panelJumpNext = wrapper.querySelector('.ed11y-jump.next');
      Ed11y.panelJumpPrev = wrapper.querySelector('.ed11y-jump.prev');
      Ed11y.panelJumpNext.addEventListener('click', this.jumpTo);
      Ed11y.panelJumpPrev.addEventListener('click', this.jumpTo);
      Ed11y.showDismissed = wrapper.querySelector('#ed11y-show-hidden');
      Ed11y.showDismissed.addEventListener('click', function(){
        Ed11y.toggleShowDismissals();
      });
      Ed11y.announce = wrapper.querySelector('.announce');
      Ed11y.panelTabs = wrapper.querySelectorAll('.ed11y-buttonbar button');
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
    // Find next or first result in the dom ordered list of results.
    let goNum = parseInt(this.dataset.ed11yGoto);
    goNum = Ed11y.elements.jumpList.length > goNum ? goNum : 0;
    let goto = Ed11y.elements.jumpList[goNum];
    goto.scrollIntoView({ block: 'center' });

    // Open the button
    goto.setAttribute('data-ed11y-action','open');

    let gotoResult = Ed11y.results[goto.getAttribute('data-ed11y-result')];
    let insert = gotoResult.position;
    let target;
    // todo this belongs in the result open logic not here
    if (insert === 'beforebegin') {
      target = Ed11y.nextUntil(goto, ':not(ed11y-element-result)');
    }
    else if (insert === 'afterbegin') {
      // todo:check that these are identified correctly.
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
    const details = target.closest('details');
    if (details && !details.open) {
      details.open = true;
      delay = 333;
    }

    // Throw an alert if the button or target is hidden.
    window.setTimeout((goto, target) => {
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
      if (!activeTip) {
        goto.setAttribute('data-ed11y-action','open');
        window.setTimeout(() => {
          // Race conditions are fun.
          let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
          activeTip?.shadowRoot.querySelector('.close').focus();
        }, 100);
      } else {
        activeTip?.shadowRoot.querySelector('.close').focus();
      }
    }, delay, goto, target);

  }


  handleBarClick(event) {
    event.preventDefault();
    let id = event.currentTarget.getAttribute('id');
    switch (id) {
    case 'ed11y-toggle':
      Ed11y.togglePanel();
      break;
    case 'ed11y-minimize':
      Ed11y.minimize();
      break;
    default:
      Ed11y.switchPanel(id);
      break;
    }
  }

  static get observedAttributes() { return ['style']; }

  // todo: WHAT WAS THIS? MOVE TO PROPS MAY BREAK...
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
      wrapper.classList.add('ed11y-wrapper', 'ed11y-heading-wrapper');
      let i = this.dataset.ed11yHeadingOutline;
      let result = Ed11y.headingOutline[i];
      wrapper.innerHTML = 'H' + result[1];
      let issues = !!result[2];
      wrapper.classList.add('issue' + issues);
      let fontSize = Math.max(52 - 8 * result[1], 12);
      wrapper.style.setProperty('font-size', fontSize + 'px');
      Ed11y.attachCSS(wrapper);
      shadow.appendChild(wrapper);
      this.initialized = true;
    }
  }
}
customElements.define('ed11y-element-heading-label', Ed11yElementHeadingLabel);
