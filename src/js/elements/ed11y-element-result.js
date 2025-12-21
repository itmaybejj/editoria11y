import { State } from '../utils/state.js';
import { alignTip, buildJumpList, editableHighlighter } from '../logic/run.js';
import { resetClass } from '../utils/utils.js';
import { alignButtons } from '../utils/align.js';

export class Ed11yElementResult extends HTMLElement {
  connectedCallback() {
    if (!this.initialized) {
      this.open = false;
      this.racing = false;
      this.style.setProperty('outline', '0px solid transparent');

      this.initialized = true;
    }
  }

  handleHover(event) {
    event.preventDefault();
    const host = this.getRootNode().host;
    if (!this.classList.contains('intersecting') && host.open !== true && host.racing === false) {
      this.open = true;
      host.racing = true;
      host.toggleTip(true);
      State.toggledFrom = this;
      window.setTimeout(
        () => {
          host.racing = false;
        },
        250,
        host,
      );
    }
  }

  handleFocus() {
    const host = this.getRootNode().host;
    if (this.getRootNode().host.classList.contains('ed11y-offscreen')) {
      host.result.element.scrollIntoView();
      alignButtons();
    }
  }

  toggleClick(event) {
    event.preventDefault();
    const host = this.getRootNode().host;
    // Todo: fast rechecks and double clicks not being correctly intercepted.
    if (host.racing === false) {
      host.racing = true;
      State.toggledFrom = this;
      const stateChange = host.getAttribute('data-ed11y-open') === 'false' ? 'open' : 'close';
      host.setAttribute('data-ed11y-action', stateChange);
      if (stateChange === 'open') {
        window.setTimeout(() => {
          const activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
          activeTip?.shadowRoot.querySelector('.title').focus();
        }, 500);
      }
      window.setTimeout(
        () => {
          host.racing = false;
        },
        250,
        host,
      );
    }
  }

  closeOtherTips() {
    if (State.tipOpen) {
      State.openTip.button.setAttribute('data-ed11y-action', 'close');
    }
  }

  buildTip() {
    this.tipNeedsBuild = false;

    const tip = document.createElement('ed11y-element-tip');
    tip.result = this.result;
    tip.setAttribute('data-ed11y-result', this.resultID);
    tip.classList.add('ed11y-element');
    tip.style.setProperty('opacity', '0');
    State.panelAttachTo.insertAdjacentElement('beforeend', tip);
    this.tip = tip;
  }

  toggleTip(changeTo) {
    if (this.tipNeedsBuild) {
      this.buildTip();
    }
    this.toggle.setAttribute('aria-expanded', changeTo);
    const highlightOutline = this.dismissable ? 'ed11y-ring-yellow' : 'ed11y-ring-red';
    if (State.inlineAlerts) {
      resetClass([
        'ed11y-hidden-highlight',
        'ed11y-ring-red',
        'ed11y-ring-yellow',
        'ed11y-warning-block',
        'ed11y-error-block',
        'ed11y-warning-inline',
        'ed11y-error-inline',
      ]);
    } else {
      editableHighlighter(this.resultID, changeTo);
    }
    if (changeTo === true) {
      this.tip.style.setProperty('opacity', '0');
      // Allow for themes to reveal hidden tips
      document.dispatchEvent(
        new CustomEvent('ed11yPop', {
          detail: {
            id: `ed11y-result-${this.toggle.getAttribute('data-ed11y-result')}`,
            result: this.result,
            tip: this.tip,
          },
        }),
      );
      this.closeOtherTips();
      this.tip.setAttribute('data-ed11y-action', 'open');
      if (State.inlineAlerts) {
        this.result.element.classList.add(highlightOutline);
      }
      requestAnimationFrame(() => alignTip(this.toggle, this.tip, 4, true));
      if (State.jumpList.length === 0) {
        // todo is it still possible to have a tip and no jumpList?
        buildJumpList();
      }
      State.lastOpenTip = Number(this.getAttribute('data-ed11y-jump-position'));
      State.tipOpen = true;
      State.openTip = {
        button: this,
        tip: this.tip,
      };
      this.result.highlight?.style.setProperty('opacity', '1');
    } else {
      // Allow for themes to restore original DOM/CSS
      document.dispatchEvent(
        new CustomEvent('ed11yShut', {
          detail: { id: `ed11y-result-${this.toggle.getAttribute('data-ed11y-result')}` },
        }),
      );
      this.tip.setAttribute('data-ed11y-action', 'shut');
      this.result.highlight?.style.setProperty('opacity', '0');
      State.tipOpen = false;
      State.openTip = {
        button: false,
        tip: false,
      };
    }
    this.setAttribute('data-ed11y-open', changeTo);
    this.open = changeTo;
  }

  static get observedAttributes() {
    return ['data-ed11y-action'];
  }

  attributeChangedCallback(attr, _oldValue, newValue) {
    if (this.initialized) {
      switch (attr) {
        case 'data-ed11y-action':
          if (newValue !== 'false') {
            const changeTo = newValue === 'open';
            this.setAttribute('data-ed11y-action', 'false');
            this.toggleTip(changeTo);
          }
          break;
      }
    }
  }
}
