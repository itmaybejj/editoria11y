class Ed11yElementTip extends HTMLElement {
  /* global Ed11y */
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized) {

      this.open = true;
      this.style.setProperty('opacity', '0');
      this.style.setProperty('outline', '0px solid transparent');
      const shadow = this.attachShadow({mode: 'open'});

      // Create this.wrapper with type class
      this.resultID = this.dataset.ed11yResult;
      this.result = Ed11y.results[this.resultID];

      this.wrapper = document.createElement('div');
      this.wrapper.setAttribute('role', 'dialog');

      this.dismissable = !!this.result.dismissalKey;
      this.dismissed = !!this.result.dismissalStatus;
      this.wrapper.classList.add('ed11y-tip-wrapper', 'ed11y-wrapper');

      this.addEventListener('mouseover', this.handleHover);

      Ed11y.attachCSS(this.wrapper);

      this.tip = document.createElement('div');
      this.tip.classList.add('tip');
      this.tip.setAttribute('aria-labelledby', 'tip-title-' + [this.resultID]);

      let content = document.createElement('div');
      content.classList.add('content');
      this.heading = document.createElement('div');
      this.heading.setAttribute('id','tip-' + this.resultID);
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

      // Draw dismiss or restore buttons
      if (this.dismissable) {

        const buttonBar = document.createElement('div');
        buttonBar.classList.add('ed11y-tip-dismissals');
        // Dismissal Key is set in [5] if alert has been dismissed.
        if (Ed11y.options.showDismissed && this.dismissed) {
          // Check if user has permission to reset this alert.
          let okd = Ed11y.dismissedAlerts[Ed11y.options.currentPage][this.result.test][this.result.dismissalKey] === 'ok';
          if ((okd && Ed11y.options.allowOK) || (!okd)) {
            // User can restore this alert.
            let undismissButton = document.createElement('button');
            undismissButton.classList.add('dismiss');
            undismissButton.textContent = okd ? Ed11y.M.undismissOKButton : Ed11y.M.undismissHideButton;
            buttonBar.append(undismissButton);
            undismissButton.addEventListener('click', function(){Ed11y.dismissThis('reset');});
          } else {
            let undismissNote = document.createElement('div');
            undismissNote.classList.add('dismissed-note');
            undismissNote.textContent = Ed11y.M.undismissNotePermissions;
            buttonBar.append(undismissNote);
          }
        } else {
          if (Ed11y.options.allowOK) {
            let dismissOKButton = document.createElement('button');
            dismissOKButton.classList.add('dismiss');
            if (Ed11y.options.syncedDismissals) {
              dismissOKButton.setAttribute('title', Ed11y.M.dismissOkTitle);
            }
            dismissOKButton.textContent = Ed11y.M.dismissOkButtonContent;
            buttonBar.append(dismissOKButton);
            dismissOKButton.addEventListener('click', function(){Ed11y.dismissThis('ok');});
          }
          if (Ed11y.options.allowHide) {
            let dismissHideButton = document.createElement('button');
            dismissHideButton.classList.add('dismiss');
            // todo parameterize
            if (Ed11y.options.syncedDismissals) {
              dismissHideButton.setAttribute('title', Ed11y.M.dismissHideTitle);
            }
            dismissHideButton.textContent = Ed11y.M.dismissHideButtonContent;
            buttonBar.append(dismissHideButton);
            dismissHideButton.addEventListener('click', function(){Ed11y.dismissThis('hide');});
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

      if (!Ed11y.options.inlineAlerts) {
        const transferFocus = document.createElement('button');
        transferFocus.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 256 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M.1 29.3C-1.4 47 11.7 62.4 29.3 63.9l8 .7C70.5 67.3 96 95 96 128.3L96 224l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 95.7c0 33.3-25.5 61-58.7 63.8l-8 .7C11.7 449.6-1.4 465 .1 482.7s16.9 30.7 34.5 29.2l8-.7c34.1-2.8 64.2-18.9 85.4-42.9c21.2 24 51.2 40 85.4 42.9l8 .7c17.6 1.5 33.1-11.6 34.5-29.2s-11.6-33.1-29.2-34.5l-8-.7C185.5 444.7 160 417 160 383.7l0-95.7 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-95.7c0-33.3 25.5-61 58.7-63.8l8-.7c17.6-1.5 30.7-16.9 29.2-34.5S239-1.4 221.3 .1l-8 .7C179.2 3.6 149.2 19.7 128 43.7c-21.2-24-51.2-40-85.4-42.9l-8-.7C17-1.4 1.6 11.7 .1 29.3z"/></svg>';
        transferFocus.setAttribute('aria-label', Ed11y.M.transferFocus);
        transferFocus.setAttribute('title', Ed11y.M.transferFocus);
        transferFocus.classList.add('ed11y-transfer-focus');
        this.navBar.append(transferFocus);
        transferFocus.addEventListener('click', function(){Ed11y.transferFocus();});
      }
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
    }
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
    if (this.initialized) {
      switch (attr) {
      case 'data-ed11y-action':
        if (newValue !== 'false') {
          let changeTo = newValue === 'open' ? true : false;
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
