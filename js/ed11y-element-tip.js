class Ed11yElementTip extends HTMLElement {
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

    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('role', 'dialog');

    this.dismissable = this.result.dismissalKey !== false;
    this.dismissed = !!this.result.dismissalStatus;
    this.wrapper.classList.add('ed11y-tip-wrapper', 'ed11y-wrapper');
    this.wrapper.setAttribute('aria-label',
      `${Ed11y.M.issue}
        ${Number.parseInt(this.result.toggle.dataset.ed11yJumpPosition) + 1}`);

    this.addEventListener('mouseover', this.handleHover);

    Ed11y.attachCSS(this.wrapper);

    this.tip = document.createElement('div');
    this.tip.classList.add('tip');

    let content = document.createElement('div');
    content.classList.add('content');
    this.heading = document.createElement('div');
    this.heading.classList.add('title');
    this.heading.setAttribute('tabindex', '-1');
    this.heading.innerHTML = Ed11y.M[this.result.test].title;
    content.append(this.heading);
    const alertBox = document.createElement('div');
    alertBox.classList.add('ed11y-tip-alert');
    this.heading.insertAdjacentElement('afterbegin', alertBox);

    let innerContent = document.createElement('div');
    innerContent.innerHTML = this.result.content;
    content.append(innerContent);

    if (!Ed11y.options.inlineAlerts || Ed11y.options.editLinks) {
      const editBar = document.createElement('div');

      if (!Ed11y.options.inlineAlerts) {
        editBar.classList.add('ed11y-tip-dismissals');
        const transferFocus = document.createElement('button');
        const transferIcon = document.createElement('span');
        transferIcon.classList.add('ed11y-transfer-icon');
        transferIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 256 512"><path fill="currentColor" d="M0 29C-1 47 12 62 29 64l8 1C71 67 96 95 96 128L96 224l-32 0c-18 0-32 14-32 32s14 32 32 32l32 0 0 96c0 33-26 61-59 64l-8 1C12 450-1 465 0 483s17 31 35 29l8-1c34-3 64-19 85-43c21 24 51 40 85 43l8 1c18 2 33-12 35-29s-12-33-29-35l-8-1C186 445 160 417 160 384l0-96 32 0c18 0 32-14 32-32s-14-32-32-32l-32 0 0-96c0-33 26-61 59-64l8-1c18-2 31-17 29-35S239-1 221 0l-8 1C179 4 149 20 128 44c-21-24-51-40-85-43l-8-1C17-1 2 12 0 29z"/></svg>';
        transferFocus.textContent = Ed11y.M.transferFocus;
        transferFocus.prepend(transferIcon);
        transferFocus.classList.add('dismiss', 'ed11y-transfer-focus');
        editBar.append(transferFocus);
        transferFocus.addEventListener('click', function(){Ed11y.transferFocus();});
      } else {
        editBar.classList.add('ed11y-custom-edit-links');
        editBar.append(Ed11y.options.editLinks.cloneNode(true));
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
      if (Ed11y.options.showDismissed && this.dismissed) {

        // Check if user has permission to reset this alert.
        let okd = Ed11y.dismissedAlerts[Ed11y.options.currentPage][this.result.test][this.result.dismissalKey] === 'ok';
        if ((okd && Ed11y.options.allowOK) || (!okd)) {
          // User can restore this alert.
          const undismissButton = document.createElement('button');
          const unDismissIcon = document.createElement('span');
          unDismissIcon.classList.add('ed11y-dismiss-icon');
          unDismissIcon.innerHTML = '<svg aria-hidden="true" class="shown" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="-30 0 640 512"><path fill="Currentcolor" d="M288 32c-81 0-146 37-193 81C49 156 17 208 3 244c-3 8-3 17 0 25C17 304 49 356 95 399C142.5 443 207 480 288 480s146-37 193-81c47-44 78-95 93-131c3-8 3-17 0-25c-15-36-46-88-93-131C434 69 369 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35-29 64-64 64c-7 0-14-1-20-3c-6-2-12 2-12 7c.3 7 1 14 3 21c14 51 66 82 118 68s82-66 68-118c-11-42-48-69-89-71c-6-.2-9 6-7 12c2 6 3 13 3 20z"/></svg>';
          undismissButton.classList.add('dismiss');
          undismissButton.textContent = okd ? Ed11y.M.undismissOKButton : Ed11y.M.undismissHideButton;
          undismissButton.prepend(unDismissIcon);
          buttonBar.append(undismissButton);
          undismissButton.addEventListener('click', function(){Ed11y.dismissThis('reset');});
        } else {
          const undismissNote = document.createElement('div');
          undismissNote.classList.add('dismissed-note');
          undismissNote.textContent = Ed11y.M.undismissNotePermissions;
          buttonBar.append(undismissNote);
        }
      } else {

        const pageActions = document.createElement('details');
        const pageActionsSummary = document.createElement('summary');
        const othersLikeThis = Ed11y.results.filter(el => el.test === this.result.test).length;
        const showPageActions = othersLikeThis > 3 && Ed11y.options.allowHide && Ed11y.options.allowOK;

        if (showPageActions) {
          pageActions.classList.add('ed11y-bulk-actions', 'dismiss');
          pageActionsSummary.textContent = Ed11y.M.dismissActions(othersLikeThis);
          pageActions.appendChild(pageActionsSummary);
          buttonBar.appendChild(pageActions);
        }

        if (Ed11y.options.allowOK) {
          const check = document.createElement('span');
          check.setAttribute('aria-hidden', 'true');
          check.textContent = '✓';

          const OkButton = document.createElement('button');
          OkButton.classList.add('dismiss');
          if (Ed11y.options.syncedDismissals) {
            OkButton.setAttribute('title', Ed11y.M.dismissOkTitle);
          }
          OkButton.textContent = Ed11y.M.dismissOkButtonContent;
          buttonBar.prepend(OkButton);

          if (showPageActions) {
            const OkAllButton = OkButton.cloneNode(true);
            OkAllButton.textContent = Ed11y.M.dismissOkAllButton;
            OkAllButton.prepend(check.cloneNode(true));
            pageActions.append(OkAllButton);
            OkAllButton.addEventListener('click', function(){Ed11y.dismissThis('ok', true);});
          }

          OkButton.prepend(check);

          OkButton.addEventListener('click', function(){Ed11y.dismissThis('ok');});
        }

        if (Ed11y.options.allowHide) {
          const ignoreButton = document.createElement('button');
          ignoreButton.classList.add('dismiss');
          // todo parameterize
          if (Ed11y.options.syncedDismissals) {
            ignoreButton.setAttribute('title', Ed11y.M.dismissHideTitle);
          }
          ignoreButton.textContent = Ed11y.M.dismissHideButtonContent;
          ignoreButton.prepend(dismissIcon.cloneNode(true));
          buttonBar.prepend(ignoreButton);
          ignoreButton.addEventListener('click', function(){Ed11y.dismissThis('hide');});

          if (showPageActions) {
            const ignoreAllButton = document.createElement('button');
            ignoreAllButton.classList.add('dismiss');
            ignoreAllButton.textContent = Ed11y.M.dismissHideAllButton;
            ignoreAllButton.prepend(dismissIcon.cloneNode(true));
            pageActionsSummary.insertAdjacentElement('afterend', ignoreAllButton);
            ignoreAllButton.addEventListener('click', function(){Ed11y.dismissThis('hide', true);});
          }
        }
      }


      content.append(buttonBar);
    }
    this.tip.append(content);

    this.navBar = document.createElement('div');
    this.navBar.classList.add('ed11y-tip-header');
    this.count = document.createElement('div');
    this.count.classList.add('ed11y-tip-count');
    this.count.textContent = `${Ed11y.M.issue} ${Number.parseInt(this.result.toggle.dataset.ed11yJumpPosition) + 1} / ${Ed11y.jumpList.length}`;
    this.navBar.append(this.count);
    if (Ed11y.jumpList.length > 1) {
      this.prev = document.createElement('button');
      this.prev.classList.add('ed11y-tip-prev');
      this.prev.setAttribute('aria-label', Ed11y.M.buttonPrevContent);
      this.prev.setAttribute('title', Ed11y.M.buttonPrevContent);
      this.prev.innerHTML = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="11" viewBox="0 -15 90 120"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m30 00 50 50-50 50" stroke-width="18"></path></svg>';
      this.prev.addEventListener('click', (event) => {
        event.preventDefault();
        Ed11y.jumpTo(-1);
      });
      this.navBar.append(this.prev);

      this.next = document.createElement('button');
      this.next.classList.add('ed11y-tip-next');
      this.next.setAttribute('aria-label', Ed11y.M.buttonNextContent);
      this.next.setAttribute('title', Ed11y.M.buttonNextContent);
      this.next.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 120 120" width="10"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" d="m30 00 50 50-50 50"></path></svg>';
      this.next.addEventListener('click', (event) => {
        event.preventDefault();
        Ed11y.jumpTo(1);
      });
      this.navBar.append(this.next);
    }
    this.help = document.createElement('details');
    this.help.classList.add('button');
    this.helpContent = document.createElement('div');
    this.helpContent.classList.add('ed11y-tip-help-content');
    this.helpContent.innerHTML = Ed11y.M.panelHelp;
    this.help.append(this.helpContent);
    this.helpToggle = document.createElement('summary');
    this.helpToggle.textContent = '?';
    this.helpToggle.setAttribute('aria-label', Ed11y.M.panelHelpTitle);
    this.helpToggle.setAttribute('title', Ed11y.M.panelHelpTitle);
    this.help.insertAdjacentElement('afterbegin', this.helpToggle);
    this.navBar.append(this.help);

    let closeButton = document.createElement('button');
    closeButton.setAttribute('aria-label',Ed11y.M.closeTip);
    closeButton.setAttribute('title',Ed11y.M.closeTip);
    closeButton.classList.add('close');
    closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 384 512"><path fill="currentColor" d="M343 151c13-13 13-33 0-46s-33-13-45 0L192 211 87 105c-13-13-33-13-45 0s-13 33 0 45L147 256 41 361c-13 13-13 33 0 45s33 13 45 0L192 301 297 407c13 13 33 13 45 0s13-33 0-45L237 256 343 151z"/></svg>';
    this.navBar.append(closeButton);
    this.tip.append(this.navBar);

    let arrow = document.createElement('div');
    arrow.classList.add('arrow');
    closeButton.addEventListener('click', (event) => {
      event.preventDefault();
      if(this.open) {
        // todo this needs to be part of the shadow DOM query I think
        let toggle = document.querySelector('ed11y-element-result[data-ed11y-open="true"]');
        if (Ed11y.toggledFrom) {
          Ed11y.toggledFrom.focus();
        }
        // todo postpone: track if this tip was opened by the next button. If so, transfer focus back to it instead
        toggle?.setAttribute('data-ed11y-action', 'shut');
        this.setAttribute('data-ed11y-action', 'shut');
      }
    });
    document.addEventListener('click', (event) => {
      // Close tip when mouse is clicked outside it.
      if(this.open && !event.target.closest('ed11y-element-tip, ed11y-element-result, ed11y-element-panel')) {
        let toggle = document.querySelector('ed11y-element-result[data-ed11y-open="true"]');
        toggle?.setAttribute('data-ed11y-action', 'shut');
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
      Ed11y.alertOnInvisibleTip(this.result.toggle, this.result.element);
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
customElements.define('ed11y-element-tip', Ed11yElementTip);
