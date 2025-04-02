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
    this.heading.setAttribute('id','tip-title-' + this.resultID);
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
        transferIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 256 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M.1 29.3C-1.4 47 11.7 62.4 29.3 63.9l8 .7C70.5 67.3 96 95 96 128.3L96 224l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 95.7c0 33.3-25.5 61-58.7 63.8l-8 .7C11.7 449.6-1.4 465 .1 482.7s16.9 30.7 34.5 29.2l8-.7c34.1-2.8 64.2-18.9 85.4-42.9c21.2 24 51.2 40 85.4 42.9l8 .7c17.6 1.5 33.1-11.6 34.5-29.2s-11.6-33.1-29.2-34.5l-8-.7C185.5 444.7 160 417 160 383.7l0-95.7 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-95.7c0-33.3 25.5-61 58.7-63.8l8-.7c17.6-1.5 30.7-16.9 29.2-34.5S239-1.4 221.3 .1l-8 .7C179.2 3.6 149.2 19.7 128 43.7c-21.2-24-51.2-40-85.4-42.9l-8-.7C17-1.4 1.6 11.7 .1 29.3z"/></svg>';
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
      dismissIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>';

      // Dismissal Key is set in [5] if alert has been dismissed.
      if (Ed11y.options.showDismissed && this.dismissed) {

        // Check if user has permission to reset this alert.
        let okd = Ed11y.dismissedAlerts[Ed11y.options.currentPage][this.result.test][this.result.dismissalKey] === 'ok';
        if ((okd && Ed11y.options.allowOK) || (!okd)) {
          // User can restore this alert.
          const undismissButton = document.createElement('button');
          const unDismissIcon = document.createElement('span');
          unDismissIcon.classList.add('ed11y-dismiss-icon');
          unDismissIcon.innerHTML = '<svg aria-hidden="true" class="shown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="Currentcolor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>';
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
      this.prev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>';
      this.prev.addEventListener('click', (event) => {
        event.preventDefault();
        Ed11y.jumpTo(-1);
      });
      this.navBar.append(this.prev);

      this.next = document.createElement('button');
      this.next.classList.add('ed11y-tip-next');
      this.next.setAttribute('aria-label', Ed11y.M.buttonNextContent);
      this.next.setAttribute('title', Ed11y.M.buttonNextContent);
      this.next.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg>';
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
    closeButton.setAttribute('arial-label',Ed11y.M.closeTip);
    closeButton.setAttribute('title',Ed11y.M.closeTip);
    closeButton.classList.add('close');
    closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
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
