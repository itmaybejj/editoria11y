import {Results, State, UI} from '../utils/state.js';
import {
  alertOnInvisibleTip,
	dismissThis,
  jumpTo,
  transferFocus
} from "../logic/run.js";
import Lang from "../../sa11y/utils/lang.js";
import {Options} from "../utils/options.js";
import {getElements} from "../utils/utils.js";
import {
	generateColorSuggestion,
	generateContrastTools,
	initializeContrastTools
} from '../../sa11y/utils/contrast-utils';

export class Ed11yElementTip extends HTMLElement {
  /* global Ed11y */
  constructor() {
    super();
  }

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
    const shadow = this.attachShadow({mode: 'open'});
		this.issueIndex = Number.parseInt(this.result.toggle.dataset.ed11yJumpPosition);
		this.issueNext = this.issueIndex < State.jumpList.length ?
			this.issueIndex + 2 : 0;
		this.issuePrev = this.issueIndex > 0 ? this.issueIndex : State.jumpList.length;

    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('role', 'dialog');
		this.wrapper.dataset.ed11yTest = this.result.test;

    this.dismissable = this.result.type !== 'error';
    this.dismissed = !!this.result.dismissalStatus;
    this.wrapper.classList.add('ed11y-tip-wrapper', 'ed11y-wrapper');
		this.wrapper.style.setProperty('opacity', '0');
    this.wrapper.setAttribute('aria-label',
      `${Lang._('ALERT_TEXT')}
        ${this.issueIndex + 1}`);

    this.addEventListener('mouseover', this.handleHover, {
			passive: true,
		});

    UI.attachCSS(this.wrapper);

    this.tip = document.createElement('div');
    this.tip.classList.add('tip');

    let content = document.createElement('div');
    content.classList.add('content');
		const tipAlert = document.createElement('div');
		tipAlert.classList.add('ed11y-tip-alert');
		if (this.result.content.includes('class="title"')) {
			// Sent by Ed11y
			// This removes Sa11y's injected "Tip!" additions:
			content.innerHTML = this.result.content.split('<hr')[0];
			content.querySelector('.title').prepend(tipAlert);
		} else {
			// Sent by Sa11y
			let innerContent = document.createElement('div');
			const sentences = this.result.content.split(/[.!]/);
			const firstSentence = document.createElement('div');
			firstSentence.innerHTML = sentences.shift() + '.';
			firstSentence.classList.add('title');
			firstSentence.prepend(tipAlert);
			firstSentence.setAttribute('tabindex', '-1');
			innerContent.append(firstSentence);
			const theRest = document.createElement('div');
			theRest.classList.add('sa11y-tip');
			theRest.innerHTML = sentences.join('.');
			innerContent.appendChild(theRest);
			content.append(innerContent);
		}
		if (this.result.contrastDetails) {
			const contrastDiv = document.createElement('div');
			contrastDiv.classList.add('ed11y-contrast-tools');
			content.append( contrastDiv);
			// Append color pickers and suggested color.
			const tools = generateContrastTools(this.result.contrastDetails);
			contrastDiv.appendChild(tools);
			initializeContrastTools(contrastDiv, this.result.contrastDetails);

			// Append suggested color.
			const suggestion = generateColorSuggestion(this.result.contrastDetails);
			if (suggestion) contrastDiv.appendChild(suggestion);
		}

    if (!State.inlineAlerts || Options.editLinks) {
      const editBar = document.createElement('div');

      if (!State.inlineAlerts) {
        editBar.classList.add('ed11y-tip-dismissals');
        const focusTransfer = document.createElement('button');
        const transferIcon = document.createElement('span');
        transferIcon.classList.add('ed11y-transfer-icon');
        transferIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 256 512"><path fill="currentColor" d="M0 29C-1 47 12 62 29 64l8 1C71 67 96 95 96 128L96 224l-32 0c-18 0-32 14-32 32s14 32 32 32l32 0 0 96c0 33-26 61-59 64l-8 1C12 450-1 465 0 483s17 31 35 29l8-1c34-3 64-19 85-43c21 24 51 40 85 43l8 1c18 2 33-12 35-29s-12-33-29-35l-8-1C186 445 160 417 160 384l0-96 32 0c18 0 32-14 32-32s-14-32-32-32l-32 0 0-96c0-33 26-61 59-64l8-1c18-2 31-17 29-35S239-1 221 0l-8 1C179 4 149 20 128 44c-21-24-51-40-85-43l-8-1C17-1 2 12 0 29z"/></svg>';
        focusTransfer.textContent = Lang._('transferFocus');
        focusTransfer.prepend(transferIcon);
        focusTransfer.classList.add('dismiss', 'ed11y-transfer-focus');
        editBar.append(focusTransfer);
        focusTransfer.addEventListener('click', function(){transferFocus();});
      } else {
        editBar.classList.add('ed11y-custom-edit-links');
        editBar.append(Options.editLinks.cloneNode(true));
      }
      content.append(editBar);
    }

    // Draw dismiss or restore buttons
    if (this.dismissable) {

      const buttonBar = document.createElement('div');
      buttonBar.classList.add('ed11y-tip-dismissals');

      const dismissIcon = document.createElement('span');
      dismissIcon.classList.add('ed11y-dismiss-icon');
      dismissIcon.innerHTML = '<svg aria-hidden="true" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="Currentcolor" d="M39 5C28-3 13-1 5 9S-1 35 9 43l592 464c10 8 26 6 34-4s6-26-4-34L526 387c39-41 66-86 78-118c3-8 3-17 0-25c-15-36-46-88-93-131C466 69 401 32 320 32c-68 0-125 26-169 61L39 5zM223 150C249 126 283 112 320 112c80 0 144 65 144 144c0 25-6 48-17 69L408 295c8-19 11-41 5-63c-11-42-48-69-89-71c-6-0-9 6-7 12c2 6 3 13 3 20c0 10-2 20-7 28l-90-71zM373 390c-16 7-34 10-53 10c-80 0-144-65-144-144c0-7 1-14 1-20L83 162C60 191 44 221 35 244c-3 8-3 17 0 25c15 36 46 86 93 131C175 443 239 480 320 480c47 0 89-13 126-33L373 390z"/></svg>';

      // Dismissal Key is set in [5] if alert has been dismissed.
      if (State.showDismissed && this.dismissed) {

        // Check if user has permission to reset this alert.
        let okd = State.dismissedAlerts[Options.currentPage][this.result.test][this.result.dismiss] === 'ok';
        if ((okd && Options.allowOK) || (!okd)) {
          // User can restore this alert.
          const undismissButton = document.createElement('button');
          const unDismissIcon = document.createElement('span');
          unDismissIcon.classList.add('ed11y-dismiss-icon');
          unDismissIcon.innerHTML = '<svg aria-hidden="true" class="shown" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="-30 0 640 512"><path fill="Currentcolor" d="M288 32c-81 0-146 37-193 81C49 156 17 208 3 244c-3 8-3 17 0 25C17 304 49 356 95 399C142.5 443 207 480 288 480s146-37 193-81c47-44 78-95 93-131c3-8 3-17 0-25c-15-36-46-88-93-131C434 69 369 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35-29 64-64 64c-7 0-14-1-20-3c-6-2-12 2-12 7c.3 7 1 14 3 21c14 51 66 82 118 68s82-66 68-118c-11-42-48-69-89-71c-6-.2-9 6-7 12c2 6 3 13 3 20z"/></svg>';
          undismissButton.classList.add('dismiss');
          undismissButton.textContent = okd ? Lang._('undismissOKButton') : Lang._('undismissHideButton');
          undismissButton.prepend(unDismissIcon);
          buttonBar.append(undismissButton);
          undismissButton.addEventListener('click', function(){dismissThis('reset');});
        } else {
          const restoreNote = document.createElement('div');
          restoreNote.classList.add('dismissed-note');
          restoreNote.textContent = Lang._('undismissNotePermissions');
          buttonBar.append(restoreNote);
        }
      } else {

        const pageActions = document.createElement('details');
        const pageActionsSummary = document.createElement('summary');
        const othersLikeThis = Results.filter(el => el.test === this.result.test).length;
        const showPageActions = othersLikeThis > 3 && Options.allowHide && Options.allowOK;
				const pageActionsContent = document.createElement('div');

        if (showPageActions) {
          pageActions.classList.add('ed11y-bulk-actions', 'dismiss');
          pageActionsSummary.textContent = Lang.sprintf('dismissActions', othersLikeThis);
          pageActions.appendChild(pageActionsSummary);
					pageActionsContent.classList.add('ed11y-bulk-actions-content');
					pageActions.appendChild(pageActionsContent);
          buttonBar.appendChild(pageActions);
        }

				if (Options.allowOK) {
					const check = document.createElement('span');
					check.setAttribute('aria-hidden', 'true');
					check.textContent = '✓';

					const OkButton = document.createElement('button');
					OkButton.classList.add('dismiss', 'ok');
					if (Options.syncedDismissals) {
						OkButton.setAttribute('title', Lang._('dismissOkTitle'));
					}
					OkButton.textContent = Lang._('dismissOkButtonContent');
					buttonBar.prepend(OkButton);

					if (showPageActions) {
						const OkAllButton = OkButton.cloneNode(true);
						OkAllButton.textContent = Lang._('dismissOkAllButton');
						OkAllButton.prepend(check.cloneNode(true));
						pageActionsContent.insertAdjacentElement('afterbegin', OkAllButton);
						OkAllButton.addEventListener('click', function(){dismissThis('ok', true);});
					}

					OkButton.prepend(check);

					OkButton.addEventListener('click', function(){dismissThis('ok');});
				}

				if (Options.allowHide) {
					const ignoreButton = document.createElement('button');
					ignoreButton.classList.add('dismiss', 'ignore');
					if (Options.syncedDismissals) {
						ignoreButton.setAttribute('title', `${Lang._('dismissHideTitle')}`);
					}
					ignoreButton.textContent = Lang._('DISMISS');
					ignoreButton.prepend(dismissIcon.cloneNode(true));
					buttonBar.prepend(ignoreButton);
					ignoreButton.addEventListener('click', function(){dismissThis('hide');});

					if (showPageActions) {
						const ignoreAllButton = document.createElement('button');
						ignoreAllButton.classList.add('dismiss');
						ignoreAllButton.textContent = Lang._('DISMISS_ALL');
						ignoreAllButton.prepend(dismissIcon.cloneNode(true));
						pageActionsContent.appendChild(ignoreAllButton);
						ignoreAllButton.addEventListener('click', function(){dismissThis('hide', true);});
					}
				}

      }

			const dismissalsHeader = document.createElement('div');
			dismissalsHeader.classList.add('dismissals-header');
			dismissalsHeader.textContent = Lang._('dismissalsHeader');
			buttonBar.prepend(dismissalsHeader);

      content.append(buttonBar);
    }
    this.tip.append(content);

    this.navBar = document.createElement('div');
    this.navBar.classList.add('ed11y-tip-header');
    this.count = document.createElement('div');
    this.count.classList.add('ed11y-tip-count');
    this.count.textContent = `${Lang._('ALERT_TEXT')} ${this.issueIndex + 1} / ${State.jumpList.length}`;
    this.navBar.append(this.count);
    if (State.jumpList.length > 1) {
      this.prev = document.createElement('button');
      this.prev.classList.add('ed11y-tip-prev');
      this.prev.setAttribute('title', `${Lang._('SKIP_TO_ISSUE')} ${this.issuePrev}`);
      this.prev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M9 233c-12 12-12 33 0 45l160 160c12 12 33 12 45 0s12-33 0-45L77 256 215 119c12-12 12-33 0-45s-33-12-45 0l-160 160z"/></svg>';
      this.prev.addEventListener('click', (event) => {
        event.preventDefault();
        jumpTo(false);
      });
      this.navBar.append(this.prev);

      this.next = document.createElement('button');
      this.next.classList.add('ed11y-tip-next');
      this.next.setAttribute('title', `${Lang._('SKIP_TO_ISSUE')} ${this.issueNext}`);
      this.next.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M9 233c-12 12-12 33 0 45l160 160c12 12 33 12 45 0s12-33 0-45L77 256 215 119c12-12 12-33 0-45s-33-12-45 0l-160 160z"/></svg>';
      this.next.addEventListener('click', (event) => {
        event.preventDefault();
        jumpTo();
      });
      this.navBar.append(this.next);
    }
    this.help = document.createElement('details');
    this.help.classList.add('button');
    this.helpContent = document.createElement('div');
    this.helpContent.classList.add('ed11y-tip-help-content');
    this.helpContent.innerHTML = Lang._('panelHelp');
    this.help.append(this.helpContent);
    this.helpToggle = document.createElement('summary');
    this.helpToggle.textContent = '?';
    this.helpToggle.setAttribute('aria-label', Lang._('panelHelpTitle'));
    this.helpToggle.setAttribute('title', Lang._('panelHelpTitle'));
    this.help.insertAdjacentElement('afterbegin', this.helpToggle);
    this.navBar.append(this.help);

    let closeButton = document.createElement('button');
    closeButton.setAttribute('title', Lang._('ALERT_CLOSE'));
    closeButton.classList.add('close');
    closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 384 512"><path fill="currentColor" d="M343 151c13-13 13-33 0-46s-33-13-45 0L192 211 87 105c-13-13-33-13-45 0s-13 33 0 45L147 256 41 361c-13 13-13 33 0 45s33 13 45 0L192 301 297 407c13 13 33 13 45 0s13-33 0-45L237 256 343 151z"/></svg>';
    this.navBar.append(closeButton);
    this.tip.append(this.navBar);

    let arrow = document.createElement('div');
    arrow.classList.add('arrow');
    closeButton.addEventListener('click', (event) => {
      event.preventDefault();
      if(this.open) {
        let toggle = getElements('ed11y-element-result[data-ed11y-open="true"]', 'document');
        if (State.toggledFrom) {
          State.toggledFrom.focus();
        }
        // todo postpone: track if this tip was opened by the next button. If so, transfer focus back to it instead
        toggle[0]?.setAttribute('data-ed11y-action', 'shut');
        this.setAttribute('data-ed11y-action', 'shut');
      }
    });
    document.addEventListener('click', (event) => {
      // Close tip when mouse is clicked outside it.
      if(this.open && !event.target.closest('ed11y-element-tip, ed11y-element-result, ed11y-element-panel')) {
        let toggle = getElements('ed11y-element-result[data-ed11y-open="true"]', 'document', []);
        toggle[0]?.setAttribute('data-ed11y-action', 'shut');
        this.setAttribute('data-ed11y-action', 'shut');
      }
    });
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
    this.rendering = false;
  }

  toggleTip(changeTo) {
    if (changeTo) {
      this.wrapper.classList.add('open');
      alertOnInvisibleTip(this.result.toggle, this.result.element);
    } else {
      this.wrapper.classList.remove('open');
    }
    this.setAttribute('data-ed11y-open',changeTo);
  }

  static get observedAttributes() { return ['data-ed11y-action']; }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (!this.initialized && this.result) {
      this.renderOnce();
    }
    if (this.initialized) {
      switch (attr) {
      case 'data-ed11y-action':
        if (newValue !== 'false') {
          let changeTo = newValue === 'open';
          this.open = changeTo;
          this.setAttribute('data-ed11y-action', 'false');
          this.toggleTip(changeTo);
        }
        break;
      }
    }
  }
}
