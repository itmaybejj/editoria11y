class Ed11yElementTip extends HTMLElement {
  /* global Ed11y */
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized) {

      this.open = true;
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
      this.heading = document.createElement('div');
      this.heading.setAttribute('id','tip-' + this.resultID);
      this.heading.classList.add('title');
      this.heading.setAttribute('tabindex', '-1');
      this.heading.innerHTML = Ed11y.M[this.result.test].title;
      let content = document.createElement('div');
      content.classList.add('content');
      content.innerHTML = this.result.content;

      // Draw dismiss or restore buttons
      if (this.dismissable) {
        let dismissers = document.createElement('div');
        let dismissHelp = false;

        // Dismissal Key is set in [5] if alert has been dismissed.
        if (Ed11y.options.showDismissed && this.dismissed) {
          // Check if user has permission to reset this alert.
          let okd = Ed11y.dismissedAlerts[Ed11y.options.currentPage][this.result.test][this.result.dismissalKey] === 'ok';
          if ((okd && Ed11y.options.allowOK) || (!okd)) {
            // User can restore this alert.
            let undismissButton = document.createElement('button');
            undismissButton.classList.add('dismiss');
            undismissButton.textContent = okd ? Ed11y.M.undismissOKButton : Ed11y.M.undismissHideButton;
            dismissers.append(undismissButton);
            undismissButton.addEventListener('click', function(){Ed11y.dismissThis('reset');});
          } else {
            let undismissNote = document.createElement('div');
            undismissNote.classList.add('dismissed-note');
            undismissNote.textContent = Ed11y.M.undismissNotePermissions;
            dismissers.append(undismissNote);
          }
        } else {
          if (Ed11y.options.allowHide) {
            let dismissHideButton = document.createElement('button');
            dismissHideButton.classList.add('dismiss');
            // todo parameterize
            dismissHideButton.textContent = Ed11y.options.syncedDismissals === false ? Ed11y.M.dismissHideButtonContent : Ed11y.M.dismissHideSyncedButtonContent;
            //dismissHideButton.setAttribute('title', Ed11y.M.dismissHideButtonTitle);
            dismissers.append(dismissHideButton);
            dismissHideButton.addEventListener('click', function(){Ed11y.dismissThis('hide');});
            dismissHelp = true;
          }
          if (Ed11y.options.allowOK) {
            let dismissOKButton = document.createElement('button');
            dismissOKButton.classList.add('dismiss');
            dismissOKButton.textContent = Ed11y.options.syncedDismissals === false ? Ed11y.M.dismissOkButtonContent : Ed11y.M.dismissOkSyncedButtonContent;
            //dismissOKButton.setAttribute('title', Ed11y.M.dismissOkButtonTitle);
            dismissers.append(dismissOKButton);
            dismissOKButton.addEventListener('click', function(){Ed11y.dismissThis('ok');});
            dismissHelp = true;
          }
        }
        if (dismissHelp) {
          dismissHelp = document.createElement('button');
          dismissHelp.classList.add('dismiss');
          // todo parameterize
          dismissHelp.textContent = '?';
          dismissers.append(dismissHelp);
          dismissHelp.addEventListener('click', function(){Ed11y.dismissHelp(dismissHelp);});
        }
        content.append(dismissers);
      }
      let closeButton = document.createElement('button');
      closeButton.setAttribute('aria-label','close');
      closeButton.classList.add('close');
      closeButton.innerHTML = '&times;';
      let arrow = document.createElement('div');
      arrow.classList.add('arrow');

      this.tip.append(this.heading);
      this.tip.append(closeButton);
      this.tip.append(content);
      closeButton.addEventListener('click', (event) => {
        event.preventDefault;
        if(this.open) {
          // todo this needs to be part of the shadow DOM query I think
          let toggle = document.querySelector('ed11y-element-result[data-ed11y-open="true"]');
          Ed11y.toggledFrom.focus();
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
