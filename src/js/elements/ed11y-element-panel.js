import { State, UI } from '../utils/state.js';
import { togglePanel, toggleShowDismissals } from '../logic/run.js';
import { visualize } from '../logic/visualize';
import {
  spriteAlts,
  spriteDismiss,
  spriteHeadings,
  spriteNext,
  spriteToggleErrors,
  spriteTogglePass,
  spriteToggleWarnings,
  spriteUnDismiss,
  spriteVisualize,
} from './sprite.js';

export class Ed11yElementPanel extends HTMLElement {
  template() {
    return `
    <div class='ed11y-buttonbar'>
      <button id='ed11y-show-hidden' data-ed11y-pressed='false' hidden>
        ${spriteDismiss}
        ${spriteUnDismiss}
        <span class="ed11y-sr-only"></span>
      </button>
      <button id='ed11y-visualize' data-ed11y-pressed="false" class='ed11y-panel-fa'>
        ${spriteVisualize}
        <span class="ed11y-sr-only"></span>
      </button>
      <div id='ed11y-visualizers' class="content" hidden>
          <details id="ed11y-headings-tab">
              <summary>
                  ${spriteHeadings}
              </summary>
              <div class="details">
                  <span class="details-title"></span>
                  <ul id='ed11y-outline'></ul>
              </div>
          </details>
          <details id="ed11y-alts-tab">
            <summary>
                ${spriteAlts}
            </summary>
            <div class="details">
                <span class="details-title"></span>
                <ul id='ed11y-alt-list'></ul>
            </div>
        </details>
        </div>
      <button type='button' id='ed11y-toggle'><span class="ed11y-sr-only"></span><span class="ed11y-toggle-circle"><span class='icon'>${spriteToggleErrors}${spriteTogglePass}${spriteToggleWarnings}</span></span></button>
      <button class='ed11y-jump next' data-ed11y-goto='0' aria-haspopup="dialog">${spriteNext}<span class='toggle-count'></span><span class='jump-next ed11y-sr-only'></span></button>
     </div>
    </div>
    <div id="ed11y-message" aria-live="polite"></div>
    `;
  }

  connectedCallback() {
    if (!this.initialized) {
      this.style.setProperty('outline', '0');
      this.classList.add('ed11y-element');
      const shadow = this.attachShadow({ mode: 'open' });
      const wrapper = document.createElement('aside');
      wrapper.style.setProperty('opacity', '0');
      wrapper.setAttribute('id', 'ed11y-panel');
      wrapper.classList.add('ed11y-wrapper', 'ed11y-panel-wrapper', 'ed11y-pass', 'ed11y-preload');
      wrapper.innerHTML = this.template();
      shadow.appendChild(wrapper);
      const panelTabs = wrapper.querySelectorAll('.ed11y-buttonbar button');
      panelTabs.forEach((tab) => {
        // todo: may not be needed for details elements.
        tab.addEventListener('click', this.handleBarClick);
      });
      const altDetails = wrapper.querySelector('#ed11y-alts-tab');
      // @todo 3.x restore explanations for why headings are flagged.
      // @todo link even in editable mode.
      const headingDetails = wrapper.querySelector('#ed11y-headings-tab');
      const _readabilityDetails = wrapper.querySelector('#ed11y-readability-tab'); // todo swappy?
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

  handleBarClick(event) {
    event.preventDefault();
    UI.message.textContent = '';
    const id = event.currentTarget.getAttribute('id');
    switch (id) {
      case 'ed11y-toggle':
        togglePanel();
        break;
      case 'ed11y-show-hidden':
        toggleShowDismissals();
        break;
      case 'ed11y-visualize':
        if (!State.showPanel) {
          togglePanel();
        }
        visualize();
        break;
      default:
        break;
    }
  }
}

export class Ed11yElementHeadingLabel extends HTMLElement {
  connectedCallback() {
    if (!this.initialized) {
      const shadow = this.attachShadow({ mode: 'open' });
      const wrapper = document.createElement('div');
      wrapper.classList.add('ed11y-wrapper', 'ed11y-heading-wrapper');
      const i = this.dataset.ed11yHeadingOutline;
      const result = State.headingOutline[i];
      wrapper.innerHTML = `H${result.headingLevel}`;
      const fontSize = Math.max(52 - 8 * result.headingLevel, 12);
      wrapper.style.setProperty('font-size', `${fontSize}px`);
      shadow.appendChild(wrapper);
      this.initialized = true;
    }
  }
}
