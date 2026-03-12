import { alertOnInvisibleTip, dismissThis, jumpTo, transferFocus } from '../core/run.js';
import Lang from '../../sa11y-js/utils/lang.js';
import { getElements } from '../utils/utils.js';
import {
  generateColorSuggestion,
  generateContrastTools,
  initializeContrastTools,
} from '../../sa11y-js/contrast/ui-tools.js';
import { spriteClose, spriteCursor, spriteDismiss, spriteNext, spriteUnDismiss } from './sprite.js';
import { UI } from '../core/ui.js';
import { State } from '../../sa11y-js/core/state.js';

export class Ed11yElementTip extends HTMLElement {
  connectedCallback() {
    if (!this.initialized && this.result) {
      this.renderOnce();
    }
  }
  renderOnce() {
    this.initialized = true;
    this.open = true;
    this.style.setProperty('opacity', '0');
    this.style.setProperty('outline', '0px solid transparent');
    const shadow = this.attachShadow({ mode: 'open' });
    this.issueIndex = Number.parseInt(this.result.toggle.dataset.ed11yJumpPosition, 10);
    this.issueNext = this.issueIndex < UI.jumpList.length - 1 ? this.issueIndex + 2 : 1;
    this.issuePrev = this.issueIndex > 0 ? this.issueIndex : UI.jumpList.length;

    this.dismissable = this.result.type !== 'error';
    this.dismissed = !!this.result.dismissalStatus;

    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('role', 'dialog');
    this.wrapper.dataset.ed11yDismiss = this.result.dismiss;
    this.wrapper.classList.add('ed11y-tip-wrapper', 'ed11y-wrapper');
    this.wrapper.style.setProperty('opacity', '0');
    this.wrapper.setAttribute(
      'aria-label',
      `${Lang._('ALERT_TEXT')}
        ${this.issueIndex + 1}`,
    );
    this.wrapper.innerHTML = `
		<div class="tip">
			<button class="close ed11y-tip-close">${spriteClose}</button>
			<div class="content" data-test="${this.result.test}">
				<div class="message"></div>
				<div class="content-footer">
					<div class="edit-links"></div>
					<div class="count"><span class="count-text"></span> <span class="count-number"></span></div>
				</div>
			</div>
			<div class="footer">
				<div class="error-badge">${this.dismissable ? Lang._('WARNING') : Lang._('ERROR')}</div>
				<div class="ed11y-tip-dismissals">
					<details class="ed11y-bulk-actions dismiss ed11y-hidden"><summary></summary><div class="ed11y-bulk-actions-content"></div></details>
				</div>
				<button class="prev">${spriteNext}</button>
				<button class="next">${spriteNext}</button>
		</div>
		`;

    this.addEventListener('mouseover', this.handleHover, {
      passive: true,
    });

    UI.attachCSS(this.wrapper);

    this.tip = this.wrapper.querySelector('.tip');

    const content = this.wrapper.querySelector('.message');
    if (this.result.content.querySelector('.title')) {
      // Sent by Ed11y
      content.appendChild(this.result.content);
      // Strip Sa11y plaintext tips.
      const sallyTips = content.querySelectorAll('hr, hr ~ *');
      if (sallyTips) {
        const tipSet = Array.from(sallyTips);
        for (let i = tipSet.length; i >= 0; i--) {
          const el = tipSet[i];
          if (el) {
            el.nextSibling?.remove();
            el.remove();
          }
        }
      }
    } else {
      // Sent by Sa11y
      // This removes Sa11y's injected "Tip!" additions:
      const innerContent = document.createElement('div');
      const firstSentence = document.createElement('div');
      firstSentence.classList.add('title');
      firstSentence.setAttribute('tabindex', '-1');
      firstSentence.style.setProperty('position', 'absolute');
      innerContent.append(firstSentence);
      innerContent.appendChild(this.result.content);
      content.append(innerContent);
      console.warn(`Editoria11y tip title not found for ${this.result.test}.`);
    }
    const title = content.querySelector('.title');
    const invisibleAlert = document.createElement('div');
    invisibleAlert.classList.add('invisible-alert');
    title.prepend(invisibleAlert);
    if (this.result.contrastDetails) {
      const contrastDiv = document.createElement('div');
      contrastDiv.classList.add('ed11y-contrast-tools');
      content.append(contrastDiv);
      // Append color pickers and suggested color.
      const tools = generateContrastTools(this.result.contrastDetails);
      contrastDiv.appendChild(tools);
      initializeContrastTools(contrastDiv, this.result.contrastDetails);

      // Append suggested color.
      const suggestion = generateColorSuggestion(this.result.contrastDetails);
      if (suggestion) contrastDiv.appendChild(suggestion);
    }

    if (!UI.inlineAlerts || State.option.editLinks) {
      const editBar = document.createElement('div');

      if (!UI.inlineAlerts) {
        editBar.classList.add('ed11y-tip-buttons');
        const focusTransfer = document.createElement('button');
        const transferIcon = document.createElement('span');
        transferIcon.classList.add('ed11y-transfer-icon');
        transferIcon.innerHTML = spriteCursor;
        focusTransfer.textContent = Lang._('transferFocus');
        focusTransfer.prepend(transferIcon);
        focusTransfer.classList.add('ed11y-tip-button', 'ed11y-transfer-focus');
        editBar.append(focusTransfer);
        focusTransfer.addEventListener('click', () => {
          transferFocus();
        });
      } else {
        editBar.classList.add('ed11y-custom-edit-links');
        editBar.append(State.option.editLinks.cloneNode(true));
      }
      this.contentFooter = this.wrapper.querySelector('.content-footer');
      const why = this.wrapper.querySelector('.why');
      if (why) {
        why.insertAdjacentElement('beforebegin', this.contentFooter);
      }
      this.contentFooter.prepend(editBar);
    }

    const buttonBar = this.wrapper.querySelector('.ed11y-tip-dismissals');

    // Draw dismiss or restore buttons
    if (this.dismissable) {
      const dismissIcon = document.createElement('span');
      dismissIcon.classList.add('ed11y-dismiss-icon');
      dismissIcon.innerHTML = spriteDismiss;

      // Dismissal Key is set in [5] if alert has been dismissed.
      if (UI.showDismissed && this.dismissed) {
        // Check if user has permission to reset this alert.

        const okd =
          UI.dismissedAlerts[State.option.currentPage][this.result.test][this.result.dismiss] ===
          'ok';
        if ((okd && State.option.allowOK) || !okd) {
          // User can restore this alert.
          const unDismissButton = document.createElement('button');
          const unDismissIcon = document.createElement('span');
          unDismissIcon.classList.add('ed11y-dismiss-icon');
          unDismissIcon.innerHTML = spriteUnDismiss;
          unDismissButton.classList.add('dismiss');
          unDismissButton.textContent = okd
            ? Lang._('unDismissOKButton')
            : Lang._('unDismissHideButton');
          unDismissButton.dataset.ed11yAll = 'false';
          unDismissButton.prepend(unDismissIcon);
          buttonBar.prepend(unDismissButton);
          unDismissButton.addEventListener('click', (e) => {
            dismissThis('reset', e.target.closest('button'));
          });
        } else {
          const restoreNote = document.createElement('div');
          restoreNote.classList.add('dismissed-note');
          restoreNote.textContent = Lang._('unDismissNotePermissions');
          buttonBar.prepend(restoreNote);
        }
      } else {
        const pageActions = this.wrapper.querySelector('.ed11y-bulk-actions');
        const pageActionsSummary = pageActions.querySelector('summary');
        pageActionsSummary.textContent = Lang._('dismissActions');
        const othersLikeThis = State.results.filter((el) => el.test === this.result.test).length;
        const pageActionsContent = pageActions.querySelector('.ed11y-bulk-actions-content');
        // Other cases?
        const showPageActions =
          othersLikeThis > 3 && (State.option.allowHide || State.option.allowOK);
        if (showPageActions) {
          pageActions.classList.remove('ed11y-hidden');
        }

        if (State.option.allowOK) {
          const check = document.createElement('span');
          check.setAttribute('aria-hidden', 'true');
          check.textContent = '✓';

          const OkButton = document.createElement('button');
          OkButton.classList.add('dismiss', 'ok');
          if (State.option.syncedDismissals) {
            OkButton.setAttribute('title', Lang._('dismissOkTitle'));
          }
          const OkText = document.createElement('span');
          OkText.classList.add('text');
          OkText.textContent = Lang._('dismissOkButtonContent');
          OkButton.append(OkText);
          buttonBar.prepend(OkButton);

          if (showPageActions) {
            const OkAllButton = OkButton.cloneNode(true);
            const OkAllText = OkAllButton.querySelector('.text');
            OkAllText.textContent = Lang._('dismissOkAllButton');
            const icon = check.cloneNode(true);
            OkAllButton.prepend(icon);
            OkAllButton.dataset.ed11yAll = 'true';
            pageActionsContent.insertAdjacentElement('afterbegin', OkAllButton);
            OkAllButton.addEventListener('click', (e) => {
              dismissThis('ok', e.target.closest('button'));
            });
          }

          OkButton.prepend(check);
          OkButton.dataset.ed11yAll = 'false';

          OkButton.addEventListener('click', (e) => {
            dismissThis('ok', e.target.closest('button'));
          });
        }

        if (State.option.allowHide) {
          const ignoreButton = document.createElement('button');
          ignoreButton.classList.add('dismiss', 'ignore');
          if (State.option.syncedDismissals) {
            ignoreButton.setAttribute('title', `${Lang._('dismissHideTitle')}`);
          }
          const ignoreText = document.createElement('span');
          ignoreText.classList.add('text');
          ignoreText.textContent = Lang._('DISMISS');
          ignoreButton.append(ignoreText);
          ignoreButton.prepend(dismissIcon.cloneNode(true));
          ignoreButton.dataset.ed11yAll = 'false';
          buttonBar.prepend(ignoreButton);
          ignoreButton.addEventListener('click', (e) => {
            dismissThis('hide', e.target.closest('button'));
          });

          if (showPageActions) {
            const ignoreAllButton = document.createElement('button');
            ignoreAllButton.classList.add('dismiss');
            const ignoreAllText = document.createElement('span');
            ignoreAllText.classList.add('text');
            ignoreAllText.textContent = Lang._('DISMISS_ALL');
            ignoreAllButton.append(ignoreAllText);
            const icon = dismissIcon.cloneNode(true);
            ignoreAllButton.prepend(icon);
            ignoreAllButton.dataset.ed11yAll = 'true';
            pageActionsContent.appendChild(ignoreAllButton);
            ignoreAllButton.addEventListener('click', (e) => {
              dismissThis('hide', e.target.closest('button'));
            });
          }
        }
      }
    }

    const countNumber = this.wrapper.querySelector('.count-number');
    countNumber.textContent = `${this.issueIndex + 1} / ${UI.jumpList.length}`;
    const countText = this.wrapper.querySelector('.count-text');
    countText.textContent = Lang._('ALERT_TEXT');
    if (UI.english && UI.splitConfiguration) {
      const countPrefix = document.createElement('span');
      countText.insertAdjacentElement('beforebegin', countPrefix);
      if (this.result.outsideContentRoots) {
        countPrefix.textContent = Lang._('issueTemplate');
      } else if (UI.splitConfiguration.devChecks[this.result.test]) {
        countPrefix.textContent = Lang._('issueDeveloper');
      }
      const br = document.createElement('br');
      countPrefix.insertAdjacentElement('afterend', br);
    }
    if (UI.jumpList.length > 1) {
      this.prev = this.wrapper.querySelector('.prev');
      this.prev.setAttribute('title', `${Lang._('SKIP_TO_ISSUE')} ${this.issuePrev}`);
      this.prev.addEventListener('click', (event) => {
        event.preventDefault();
        jumpTo(false);
      });

      this.next = this.wrapper.querySelector('.next');
      this.next.setAttribute('title', `${Lang._('SKIP_TO_ISSUE')} ${this.issueNext}`);
      this.next.addEventListener('click', (event) => {
        event.preventDefault();
        jumpTo();
      });
    }

    const closeButton = this.wrapper.querySelector('.close');
    closeButton.setAttribute('title', Lang._('ALERT_CLOSE'));

    const arrow = document.createElement('div');
    arrow.classList.add('arrow');
    closeButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.open) {
        if (UI.toggledFrom) {
          UI.toggledFrom.focus();
        }
        // todo postpone: track if this tip was opened by the next button. If so, transfer focus back to it instead
        this.setAttribute('data-ed11y-action', 'shut');
        this.result?.toggle?.setAttribute('data-ed11y-action', 'shut');
      }
    });
    document.addEventListener('click', (event) => {
      // Close tip when mouse is clicked outside it.
      if (this.open && !event.target.closest('.ed11y-element')) {
        const toggle = getElements('ed11y-element-result[data-ed11y-open="true"]', 'document', []);
        toggle[0]?.setAttribute('data-ed11y-action', 'shut');
        this.setAttribute('data-ed11y-action', 'shut');
      }
    });
    shadow.appendChild(this.wrapper);
    const focusLoopLeft = document.createElement('div');
    focusLoopLeft.setAttribute('tabIndex', '0');
    const focusLoopRight = document.createElement('div');
    focusLoopRight.setAttribute('tabindex', '0');
    this.wrapper.appendChild(focusLoopLeft);
    this.wrapper.appendChild(arrow);
    this.wrapper.appendChild(this.tip);
    this.wrapper.appendChild(focusLoopRight);
    const focusables = this.wrapper.querySelectorAll('a, button, [tabindex="0"]');
    const count = focusables.length;
    focusables[0].addEventListener('focus', () => {
      focusables[count - 2].focus();
    });
    focusables[count - 1].addEventListener('focus', () => {
      focusables[1].focus();
    });
    this.initialized = true;
    this.rendering = false;
  }

  toggleTip(changeTo) {
    if (changeTo) {
      this.wrapper.classList.add('open');
      alertOnInvisibleTip(this.result.toggle, this.result.element);
    } else {
      this.wrapper.classList.remove('open');
    }
    this.setAttribute('data-ed11y-open', changeTo);
  }

  static get observedAttributes() {
    return ['data-ed11y-action'];
  }

  attributeChangedCallback(attr, _oldValue, newValue) {
    if (!this.initialized && this.result) {
      this.renderOnce();
    }
    if (this.initialized) {
      switch (attr) {
        case 'data-ed11y-action':
          if (newValue !== 'false') {
            const changeTo = newValue === 'open';
            this.open = changeTo;
            this.setAttribute('data-ed11y-action', 'false');
            this.toggleTip(changeTo);
          }
          break;
      }
    }
  }
}
