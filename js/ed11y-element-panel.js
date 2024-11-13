class Ed11yElementPanel extends HTMLElement {
  /* global Ed11y */

  constructor() {
    super();
  }

  // todo mvp parameterize
  template() {
    // TODO: CHANGE FROM VISIBILITY TO WIDTH TOGGLES SO FOCUS WORKS
    // Todo: details summary language params
    return `
    <div class='ed11y-buttonbar'>
      <!-- todo: can't switch both label and aria-expanded -->
      <button id='ed11y-show-hidden' data-ed11y-pressed='${!!Ed11y.options.showDismissed}' hidden><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg><span class="ed11y-sr-only">${Ed11y.M.buttonShowHiddenAlert}</span></button>
      <button id='ed11y-visualize' data-data-ed11y-pressed="false" class='ed11y-panel-fa'>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
        <span class="ed11y-sr-only">${Ed11y.M.buttonToolsContent}</span>
      </button>
      <div id='ed11y-visualizers' class="content" hidden>
          <details id="ed11y-headings-tab">
              <summary>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L96 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"></path></svg> ${Ed11y.M.buttonOutlineContent}
              </summary>
              <div class="details">
                  ${Ed11y.M.panelCheckOutline}
                  <ul id='ed11y-outline'></ul>
              </div>
          </details>
          <details id="ed11y-alts-tab">
            <summary>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M160 80l352 0c8.8 0 16 7.2 16 16l0 224c0 8.8-7.2 16-16 16l-21.2 0L388.1 178.9c-4.4-6.8-12-10.9-20.1-10.9s-15.7 4.1-20.1 10.9l-52.2 79.8-12.4-16.9c-4.5-6.2-11.7-9.8-19.4-9.8s-14.8 3.6-19.4 9.8L175.6 336 160 336c-8.8 0-16-7.2-16-16l0-224c0-8.8 7.2-16 16-16zM96 96l0 224c0 35.3 28.7 64 64 64l352 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L160 32c-35.3 0-64 28.7-64 64zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120L0 344c0 75.1 60.9 136 136 136l320 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-320 0c-48.6 0-88-39.4-88-88l0-224zm208 24a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg> ${Ed11y.M.buttonAltsContent}
            </summary>
            <div class="details">
                ${Ed11y.M.panelCheckAltText}
                <ul id='ed11y-alt-list'></ul>
            </div>
        </details>
        </div>
      <button type='button' id='ed11y-toggle'><span class="ed11y-sr-only">Show alerts</span><span class="ed11y-toggle-circle"><span class='icon'></span><span class='toggle-count'></span></span></button>
      <button class='ed11y-jump next' data-ed11y-goto='0' aria-haspopup="dialog"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32L0 64 0 368 0 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-247.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48l0-16z"></path></svg><span class='jump-next ed11y-sr-only'>${Ed11y.M.buttonFirstContent}</span></button>
     </div>
    </div>
    <div id="ed11y-message" aria-live="polite"></div>
    `;
  }

  connectedCallback() {
    if (!this.initialized) {

      this.style.setProperty('outline', '0');
      this.classList.add('ed11y-element');
      const shadow = this.attachShadow({mode: 'open'});
      const wrapper = document.createElement('aside');
      wrapper.setAttribute('id', 'ed11y-panel');
      wrapper.classList.add('ed11y-wrapper', 'ed11y-panel-wrapper', 'ed11y-pass');
      wrapper.innerHTML = this.template();
      Ed11y.attachCSS(shadow);
      shadow.appendChild(wrapper);
      wrapper.setAttribute('aria-label', Ed11y.M.panelControls);
      Ed11y.panel = wrapper;
      Ed11y.panelElement = this;
      Ed11y.panelToggle = wrapper.querySelector('#ed11y-toggle');
      Ed11y.panelToggleTitle = wrapper.querySelector('#ed11y-toggle .ed11y-sr-only');
      Ed11y.panelCount = wrapper.querySelector('.toggle-count');
      Ed11y.panelJumpNext = wrapper.querySelector('.ed11y-jump.next');
      Ed11y.panelJumpNext.addEventListener('click', this.jumpTo);
      Ed11y.showDismissed = wrapper.querySelector('#ed11y-show-hidden');
      Ed11y.message = wrapper.querySelector('#ed11y-message');
      if (Ed11y.options.reportsURL) {
        let reportLink = document.createElement('a');
        reportLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 0l0 64 64 0 0-64L64 96zm384 0L192 96l0 64 256 0 0-64zM64 224l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64zM64 352l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64z"/></svg><span class="ed11y-sr-only"></span>';
        reportLink.setAttribute('id' , 'ed11y-reports-link');
        reportLink.setAttribute('href', Ed11y.options.reportsURL);
        reportLink.setAttribute('target', '_blank');
        reportLink.setAttribute('aria-label', Ed11y.M.reportsLink);
        reportLink.querySelector('.ed11y-sr-only').textContent = Ed11y.M.reportsLink;
        Ed11y.showDismissed.insertAdjacentElement('beforebegin', reportLink);
      }
      const panelTabs = wrapper.querySelectorAll('.ed11y-buttonbar button');
      panelTabs.forEach(tab => {
        // todo: syntax could be shrunk now that these aren't tabs.
        tab.addEventListener('click', this.handleBarClick);
      });
      this.initialized = true;
    }
  }

  jumpTo(event) {
    // Handle jump
    event.preventDefault();
    Ed11y.toggledFrom = event.target.closest('button');
    if (!Ed11y.open) {
      Ed11y.togglePanel();
      window.setTimeout(function() {
        Ed11y.jumpTo(1);
      },500);
    } else {
      Ed11y.jumpTo(1);
    }
  }


  handleBarClick(event) {
    event.preventDefault();
    Ed11y.message.textContent = '';
    let id = event.currentTarget.getAttribute('id');
    switch (id) {
    case 'ed11y-toggle':
      Ed11y.togglePanel();
      break;
    case 'ed11y-show-hidden':
      Ed11y.toggleShowDismissals();
      break;
    case 'ed11y-visualize':
      if (!Ed11y.open) {
        Ed11y.togglePanel();
      }
      Ed11y.visualize();
      break;
    default:
      break;
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
