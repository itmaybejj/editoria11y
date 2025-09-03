class Ed11yElementPanel extends HTMLElement {
  /* global Ed11y */

  constructor() {
    super();
  }

  // todo mvp parameterize
  template() {
    // TODO: CHANGE FROM VISIBILITY TO WIDTH TOGGLES SO FOCUS WORKS
    // Todo: details summary language params
    <!-- todo: don't switch both label and aria-expanded on show hidden -->
    return `
    <div class='ed11y-buttonbar'>
      <button id='ed11y-show-hidden' data-ed11y-pressed='false' hidden>
        <svg aria-hidden="true" class="shown" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="9 0 640 512"><path fill="Currentcolor" d="M288 32c-81 0-146 37-193 81C49 156 17 208 3 244c-3 8-3 17 0 25C17 304 49 356 95 399C142.5 443 207 480 288 480s146-37 193-81c47-44 78-95 93-131c3-8 3-17 0-25c-15-36-46-88-93-131C434 69 369 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35-29 64-64 64c-7 0-14-1-20-3c-6-2-12 2-12 7c.3 7 1 14 3 21c14 51 66 82 118 68s82-66 68-118c-11-42-48-69-89-71c-6-.2-9 6-7 12c2 6 3 13 3 20z"/></svg>
        <svg aria-hidden="true" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="39 0 640 512"><path fill="Currentcolor" d="M39 5C28-3 13-1 5 9S-1 35 9 43l592 464c10 8 26 6 34-4s6-26-4-34L526 387c39-41 66-86 78-118c3-8 3-17 0-25c-15-36-46-88-93-131C466 69 401 32 320 32c-68 0-125 26-169 61L39 5zM223 150C249 126 283 112 320 112c80 0 144 65 144 144c0 25-6 48-17 69L408 295c8-19 11-41 5-63c-11-42-48-69-89-71c-6-0-9 6-7 12c2 6 3 13 3 20c0 10-2 20-7 28l-90-71zM373 390c-16 7-34 10-53 10c-80 0-144-65-144-144c0-7 1-14 1-20L83 162C60 191 44 221 35 244c-3 8-3 17 0 25c15 36 46 86 93 131C175 443 239 480 320 480c47 0 89-13 126-33L373 390z"/></svg>
        <span class="ed11y-sr-only"></span>
      </button>
      <button id='ed11y-visualize' data-ed11y-pressed="false" class='ed11y-panel-fa'>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 10 512 512"><path fill="Currentcolor" d="M152 38c10 9 11 24 2 34l-72 80c-4 5-11 8-17 8s-13-2-18-7L7 113C-2 104-2 88 7 79s25-9 34 0l22 22 55-61c9-10 24-11 34-2zm0 160c10 9 11 24 2 34l-72 80c-4 5-11 8-17 8s-13-2-18-7L7 273c-9-9-9-25 0-34s25-9 35 0l22 22 55-61c9-10 24-11 34-2zM224 96c0-18 14-32 32-32l224 0c18 0 32 14 32 32s-14 32-32 32l-224 0c-18 0-32-14-32-32zm0 160c0-18 14-32 32-32l224 0c18 0 32 14 32 32s-14 32-32 32l-224 0c-18 0-32-14-32-32zM160 416c0-18 14-32 32-32l288 0c18 0 32 14 32 32s-14 32-32 32l-288 0c-18 0-32-14-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
        <span class="ed11y-sr-only"></span>
      </button>
      <div id='ed11y-visualizers' class="content" hidden>
          <details id="ed11y-headings-tab">
              <summary>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M0 96C0 78 14 64 32 64l384 0c18 0 32 14 32 32s-14 32-32 32L32 128C14 128 0 114 0 96zM64 256c0-18 14-32 32-32l384 0c18 0 32 14 32 32s-14 32-32 32L96 288c-18 0-32-14-32-32zM448 416c0 18-14 32-32 32L32 448c-18 0-32-14-32-32s14-32 32-32l384 0c18 0 32 14 32 32z"></path></svg> <span class="summary-title"></span>
              </summary>
              <div class="details">
                  <span class="details-title"></span>
                  <ul id='ed11y-outline'></ul>
              </div>
          </details>
          <details id="ed11y-alts-tab">
            <summary>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 576 512"><path fill="currentColor" d="M160 80l352 0c9 0 16 7 16 16l0 224c0 8.8-7.2 16-16 16l-21 0L388 179c-4-7-12-11-20-11s-16 4-20 11l-52 80-12-17c-5-6-12-10-19-10s-15 4-19 10L176 336 160 336c-9 0-16-7-16-16l0-224c0-9 7-16 16-16zM96 96l0 224c0 35 29 64 64 64l352 0c35 0 64-29 64-64l0-224c0-35-29-64-64-64L160 32c-35 0-64 29-64 64zM48 120c0-13-11-24-24-24S0 107 0 120L0 344c0 75 61 136 136 136l320 0c13 0 24-11 24-24s-11-24-24-24l-320 0c-49 0-88-39-88-88l0-224zm208 24a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg> <span class="summary-title"></span>
            </summary>
            <div class="details">
                <span class="details-title"></span>
                <ul id='ed11y-alt-list'></ul>
            </div>
        </details>
        </div>
      <button type='button' id='ed11y-toggle'><span class="ed11y-sr-only">Show alerts</span><span class="ed11y-toggle-circle"><span class='icon'><svg class="errors-icon" xmlns="http://www.w3.org/2000/svg" width="10" aria-hidden="true" viewBox="0 0 448 512"><path fill="currentColor" d="M64 32C64 14 50 0 32 0S0 14 0 32L0 64 0 368 0 480c0 18 14 32 32 32s32-14 32-32l0-128 64-16c41-10 85-5 123 13c44.2 22 96 25 142 7l35-13c13-5 21-17 21-30l0-248c0-23-24-38-45-28l-10 5c-46 23-101 23-147 0c-35-18-75-22-114-13L64 48l0-16z"></path></svg><svg class="pass-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="-.75 -3.5 10.1699 19.1777"><path fill="currentColor" d="M3.7031,10.5527c-.3633-.6562-.6426-1.1387-.8379-1.4473l-.3105-.4863-.2344-.3574c-.5117-.7969-1.0449-1.4551-1.5996-1.9746.3164-.2617.6113-.3926.8848-.3926.3359,0,.6348.123.8965.3691s.5918.7148.9902,1.4062c.4531-1.4727,1.0293-2.8691,1.7285-4.1895.3867-.7188.7314-1.2021,1.0342-1.4502s.7041-.3721,1.2041-.3721c.2656,0,.5938.041.9844.123-1.0039.8086-1.8066,1.7695-2.4082,2.8828s-1.3789,3.0762-2.332,5.8887Z"/></svg><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="close-icon" viewBox="0 0 384 512"><path fill="currentColor" d="M343 151c13-13 13-33 0-46s-33-13-45 0L192 211 87 105c-13-13-33-13-45 0s-13 33 0 45L147 256 41 361c-13 13-13 33 0 45s33 13 45 0L192 301 297 407c13 13 33 13 45 0s13-33 0-45L237 256 343 151z"></path></svg></span></span></button>
      <button class='ed11y-jump next' data-ed11y-goto='0' aria-haspopup="dialog"><svg class="hover-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="11" viewBox="0 -15 90 120"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m30 00 50 50-50 50" stroke-width="18"></path></svg><span class='toggle-count'></span><span class='jump-next ed11y-sr-only'></span></button>
     </div>
    </div>
    <div id="ed11y-message" aria-live="polite"></div>
    `;
  }

  connectedCallback() {
    if (!this.initialized && typeof Ed11y !== 'undefined') {

      this.style.setProperty('outline', '0');
      this.classList.add('ed11y-element');
      const shadow = this.attachShadow({mode: 'open'});
      const wrapper = document.createElement('aside');
      wrapper.setAttribute('id', 'ed11y-panel');
      //!!wrapper.setAttribute('aria-label', Ed11y.M.panelControls);
      wrapper.classList.add('ed11y-wrapper', 'ed11y-panel-wrapper', 'ed11y-pass', 'ed11y-preload');
      wrapper.innerHTML = this.template();
      shadow.appendChild(wrapper);
      Ed11y.panel = wrapper;
      Ed11y.panelElement = this;
      Ed11y.panelToggle = wrapper.querySelector('#ed11y-toggle');
      Ed11y.panelToggleTitle = wrapper.querySelector('#ed11y-toggle .ed11y-sr-only');
      Ed11y.panelCount = wrapper.querySelector('.toggle-count');
      Ed11y.panelJumpNext = wrapper.querySelector('.ed11y-jump.next');
      Ed11y.panelJumpNext.addEventListener('click', this.jumpTo);
      Ed11y.showDismissed = wrapper.querySelector('#ed11y-show-hidden');
      Ed11y.message = wrapper.querySelector('#ed11y-message');
      const panelTabs = wrapper.querySelectorAll('.ed11y-buttonbar button');
      panelTabs.forEach(tab => {
        // todo: syntax could be shrunk now that these aren't tabs.
        tab.addEventListener('click', this.handleBarClick);
      });
      const altDetails = Ed11y.panel.querySelector('#ed11y-alts-tab');
      const headingDetails = Ed11y.panel.querySelector('#ed11y-headings-tab');
      altDetails.addEventListener('toggle', () => {
        if (altDetails.open && headingDetails.open) {
          headingDetails.removeAttribute('open');
        }
      });
      headingDetails.addEventListener('toggle', () => {
        if (altDetails.open && headingDetails.open) {
          altDetails.removeAttribute('open');
        }
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
      shadow.appendChild(wrapper);
      this.initialized = true;
    }
  }
}
customElements.define('ed11y-element-heading-label', Ed11yElementHeadingLabel);
