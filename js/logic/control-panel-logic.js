import State from "../utils/state.js";
import {store} from "../sa11y/src/js/utils/utils.js"
import {checkAll, resetAll} from "./check.js";
import Constants from "../sa11y/src/js/utils/constants.js";
import ed11yLang from "../lang/localization.js";

export const handleBarClick = function(event) {
  event.preventDefault();
  State.theme.message.textContent = '';
  let id = event.currentTarget.getAttribute('id');
  switch (id) {
    case 'ed11y-toggle':
      this.togglePanel();
      break;
    case 'ed11y-show-hidden':
      this.toggleShowDismissals();
      break;
    case 'ed11y-visualize':
      if (!State.open) {
        this.togglePanel();
      }
      this.visualize();
      break;
    default:
      break;
  }
}

//@todo merge
const newIncrementalResults = function() {
  return false;
}

const paintReady = function () {
    for (const [key, value] of Object.entries(State.theme.vars)) {
      document.documentElement.style.setProperty(`--ed11y-${key}`, `${value}`);
    }

    // May be redundant, but preloads unbundled files.
    if (document.querySelector('body')) {
      // May be redundant, but preloads unbundled files.
      State.theme.attachCSS(document.querySelector('body'));
    }
    Constants.Root.forEach((root) => {
      // Shadow elements don't inherit styles, so they need their own copy.
      if (State.options.shadowComponents) {
        root.querySelectorAll(State.options.shadowComponents)?.forEach((shadowHost) => {
          if (shadowHost.shadowRoot) {
            State.theme.attachCSS(shadowHost.shadowRoot);
          }
        });
      }
    });
    State.bodyStyle = true;
  };

const alignPanel = function() {
  if (!State.theme.panelElement) {
    return false;
  }
  if (State.options.panelPinTo === 'left') {
    State.theme.panel.classList.add('ed11y-pin-left');
  }
  let xMost = 0;
  let yMost = 0;
  // @todo merge elements.
  /*    if (Ed11y.elements.panelPin) {
        Ed11y.elements.panelPin.forEach(el => {
          let bounds = el.getBoundingClientRect();
          if (State.options.panelPinTo === 'right') {
            xMost = windowWidth - bounds.left > xMost && bounds.left > windowWidth / 3 ? windowWidth - bounds.left : xMost;
          } else {
            xMost = bounds.right > xMost && xMost + bounds.right < windowWidth / 3 ? xMost + bounds.right : xMost;
          }
          yMost = bounds.height > yMost && bounds.height + yMost < window.innerHeight / 2 ? yMost + bounds.height : yMost;
        });
      }*/
  if (xMost > 0 && xMost < window.innerWidth - 240) {
    // push off horizontal
    State.theme.panelElement.style.setProperty(State.options.panelPinTo, xMost + 10 + 'px');
    State.theme.panelElement.style.setProperty('bottom', State.options.panelOffsetY);
  } else if (xMost > 0 && xMost > window.innerWidth - 240 && yMost > 0) {
    // push off vertical
    State.theme.panelElement.style.setProperty(State.options.panelPinTo, State.options.panelOffsetX);
    State.theme.panelElement.style.setProperty('bottom', `calc(${State.options.panelOffsetY} + ${yMost}px)`);
  } else {
    // no push
    State.theme.panelElement.style.setProperty(State.options.panelPinTo, State.options.panelOffsetX);
    State.theme.panelElement.style.setProperty('bottom', State.options.panelOffsetY);
  }
};

export const updatePanel = function () {
  // @todo merge
  //Ed11y.pauseObservers();
  // Stash old values for incremental updates.
  if (State.incremental) {
    // Check for a change in the result counts.
    if (State.forceFullCheck || newIncrementalResults()) {
      State.forceFullCheck = false;
      /*if (State.options.alertMode === 'assertive' && Ed11y.totalCount > 0 && (Ed11y.warningCount > oldWarnings || State.errorCount > oldErrors)) {
        console.warn('forced open');
        State.theme.showPanel = true;
      }*/
      //Ed11y.resetResults(true);
    } else {
      // Todo: commented out in 2.3.11:
      // Reconnect map
      // @todo merge
      /*Ed11y.results = Ed11y.oldResults;
      window.setTimeout(function() {
        if ( !Ed11y.alignPending ) {
          Ed11y.alignButtons();
          Ed11y.alignPanel();
          Ed11y.alignPending = false;
        }
        Ed11y.running = false;
      },0);
      Ed11y.resumeObservers();*/
      return;
    }
  } else {
    const uri = encodeURI(State.currentPage);
    if (State.totalCount > 0) {
      // Record what has been seen at this route.
      // We do not do this on incremental updates.
      // Todo question: should we not do this at all for contentEditable?
      State.seen[uri] = State.totalCount;
      store.setItem('editoria11yResultCount', JSON.stringify(Ed11y.seen));
    } else if (State.seen[uri]) {
      delete State.seen[uri];
    }
  }

  if (State.options.alertMode !== 'headless') {
    // Not headless; draw the interface.

    if (!State.theme.bodyStyle) {
      paintReady();
    }

    if (State.onLoad === true) {
      State.onLoad = false;

      if (!State.options.inlineAlerts) {
        // todo move to incremental check or timeout; no need to do on load.
        State.oldResultString = `${State.errorCount} ${State.warningCount}`;
        State.results.forEach(result => {
          State.oldResultString += result.test + result.element.outerHTML;
        });
      }

      // Create the panel DOM on load.

      State.theme.panel = document.createElement('ed11y-element-panel');
      State.theme.attachCSS(State.theme.panel);
      document.body.appendChild(State.theme.panel);
      // @todo merge language handling?
      State.theme.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = ed11yLang.en.buttonToolsContent;
      State.theme.panel.querySelector('#ed11y-headings-tab .summary-title').textContent = ed11yLang.en.buttonOutlineContent;
      State.theme.panel.querySelector('#ed11y-headings-tab .details-title').innerHTML = ed11yLang.en.panelCheckOutline;
      State.theme.panel.querySelector('#ed11y-alts-tab .summary-title').textContent = ed11yLang.en.buttonAltsContent;
      State.theme.panel.querySelector('#ed11y-alts-tab .details-title').innerHTML = ed11yLang.en.panelCheckAltText;
      State.theme.panel.querySelector('.jump-next.ed11y-sr-only').textContent = ed11yLang.en.buttonFirstContent;

      State.theme.panel.setAttribute('aria-label', ed11yLang.en.panelControls);
      if (State.options.reportsURL) {
        let reportLink = document.createElement('a');
        reportLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96C0 61 29 32 64 32l384 0c35 0 64 29 64 64l0 320c0 35-29 64-64 64L64 480c-35 0-64-29-64-64L0 96zm64 0l0 64 64 0 0-64L64 96zm384 0L192 96l0 64 256 0 0-64zM64 224l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64zM64 352l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64z"/></svg><span class="ed11y-sr-only"></span>';
        reportLink.setAttribute('id' , 'ed11y-reports-link');
        reportLink.setAttribute('href', State.options.reportsURL);
        reportLink.setAttribute('target', '_blank');
        reportLink.setAttribute('aria-label', ed11yLang.en.reportsLink);
        reportLink.querySelector('.ed11y-sr-only').textContent = ed11yLang.en.reportsLink;
        State.theme.showDismissed.insertAdjacentElement('beforebegin', reportLink);
      }

      // Decide whether to open the panel on load.
      if (State.ignoreAll ||
        (!State.options.inlineAlerts && State.totalCount > 75)
      ) {
        State.showPanel = false;
      } else if (State.options.alertMode === 'active' ||
        !State.options.userPrefersShut ||
        State.options.showDismissed
      ) {
        // Show always on load for active mode or by user preference.
        State.showPanel = true;
      } else if (
        State.totalCount > 0 &&
        !State.ignoreAll &&
        ( State.options.alertMode === 'assertive' ||
          State.options.alertMode === 'polite' &&
          State.seen[encodeURI(State.currentPage)] !== State.totalCount
        )
      ) {
        // Show sometimes for assertive/polite if there are new items.
        State.showPanel = true;
      }
    }

    // Now we can open or close the panel.
    if (!State.showPanel) {
      console.log(7);
      // Close panel.
      resetAll();
      console.log('8');
    } else {
      // Ignore issue count if this resulted from a user action.
      console.log(9);
      State.open = true;
      State.theme.panel.classList.remove('ed11y-shut');
      State.theme.panel.classList.add('ed11y-active');
      State.theme.panelToggle.setAttribute('aria-expanded', 'true');
      State.theme.panelToggleTitle.textContent = State.totalCount > 0 ? ed11yLang.en.buttonHideAlerts : ed11yLang.en.buttonHideChecker;
      // Prepare show hidden alerts button.
      if (State.dismissedCount === 0) {
        // Reset show hidden default option when irrelevant.
        State.theme.showDismissed.setAttribute('hidden', '');
        State.theme.showDismissed.setAttribute('data-ed11y-pressed', 'false');
        State.options.showDismissed = false;
      } else if (State.dismissedCount === 1) {
        State.theme.showDismissed.querySelector('.ed11y-sr-only').textContent = State.options.showDismissed ? ed11yLang.en.buttonHideHiddenAlert : ed11yLang.en.buttonShowHiddenAlert;
        State.theme.showDismissed.dataset.ed11yPressed = `${State.options.showDismissed}`;
        State.theme.showDismissed.removeAttribute('hidden');
      } else {
        State.theme.showDismissed.querySelector('.ed11y-sr-only').textContent = State.options.showDismissed ? ed11yLang.en.buttonHideHiddenAlerts(State.dismissedCount) : ed11yLang.en.buttonShowHiddenAlerts(State.dismissedCount);
        State.theme.showDismissed.dataset.ed11yPressed = `${State.options.showDismissed}`;
        State.theme.showDismissed.removeAttribute('hidden');
      }
console.log(10);
      window.setTimeout(function () {
        if (!State.ignoreAll) {
          requestAnimationFrame(() => State.theme.showResults());
        }
      }, 0);
    }
    // Update buttons.
    if (State.totalCount > 0 || (State.options.showDismissed && State.dismissedCount > 0)) {
      State.theme.panelToggleTitle.textContent = State.open ? ed11yLang.en.buttonHideAlerts : ed11yLang.en.buttonShowAlerts;
      State.theme.panelJumpNext.removeAttribute('hidden');
      if (State.errorCount > 0) {
        // Errors
        State.theme.panel.classList.remove('ed11y-warnings', 'ed11y-pass');
        State.theme.panel.classList.add('ed11y-errors');
        document.documentElement.style.setProperty('--ed11y-activeBackground', State.theme.alert);
        document.documentElement.style.setProperty('--ed11y-activeColor', '#fff');
        document.documentElement.style.setProperty('--ed11y-activeBorder', '#fff7');
        document.documentElement.style.setProperty('--ed11y-activePanelBorder', '#def');
      }
      else if (State.warningCount > 0) {
        // Warnings
        State.theme.panel.classList.remove('ed11y-errors', 'ed11y-pass');
        State.theme.panel.classList.add('ed11y-warnings');
        document.documentElement.style.setProperty('--ed11y-activeBackground', State.theme.warning);
        document.documentElement.style.setProperty('--ed11y-activeColor', '#111');
        document.documentElement.style.setProperty('--ed11y-activeBorder', '#947605');
        document.documentElement.style.setProperty('--ed11y-activePanelBorder', '#947605');
      } else {
        // Issues present but dismissed.
        State.theme.panel.classList.remove('ed11y-errors', 'ed11y-warnings');
        State.theme.panel.classList.add('ed11y-pass');
        document.documentElement.style.setProperty('--ed11y-activeBackground', State.theme.panelBar);
        document.documentElement.style.setProperty('--ed11y-activeColor', State.theme.panelBarText);
        document.documentElement.style.setProperty('--ed11y-activeBorder', State.theme.panelBarText + '44');
        document.documentElement.style.setProperty('--ed11y-activePanelBorder', State.theme.panelBarText + '88');
      }
      // todo postpone: aria alert on load?
      /*window.setTimeout(function () {
        //Ed11y.announce.textContent = text;
      }, 1500);*/
      if (State.dismissedCount > 0 && State.totalCount === 0) {
        State.theme.panelCount.textContent = State.dismissedCount;
      } else {
        State.theme.panelCount.textContent = State.totalCount > 99 ? '99+' : State.totalCount;
      }
    } else {
      State.theme.panelJumpNext.setAttribute('hidden', '');
      document.documentElement.style.setProperty('--ed11y-activeBackground', State.theme.panelBar);
      document.documentElement.style.setProperty('--ed11y-activeColor', State.theme.panelBarText);
      document.documentElement.style.setProperty('--ed11y-activeBorder', State.theme.panelBarText + '44');
      document.documentElement.style.setProperty('--ed11y-activePanelBorder', State.theme.panelBarText + '88');

      State.theme.panelCount.style.display = 'display: none;';
      State.theme.panel.classList.remove('ed11y-warnings', 'ed11y-errors');
      State.theme.panel.classList.add('ed11y-pass');

      if (State.dismissedCount > 0) {
        State.theme.panelCount.textContent = 'i';
        if (State.open) {
          State.theme.panelToggleTitle.textContent = ed11yLang.en.buttonHideChecker;
        } else {
          State.theme.panelToggleTitle.textContent = State.dismissedCount > 1 ?
            ed11yLang.en.buttonShowHiddenAlerts(State.dismissedCount) :
            ed11yLang.en.buttonShowHiddenAlert;
        }
      } else {
        // todo 3.x: move these inline and just change the class.
        State.theme.panelToggleTitle.textContent = State.open ? ed11yLang.en.buttonHideChecker : ed11yLang.en.buttonShowNoAlert;
      }
    }
    State.theme.panelToggle.classList.remove('disabled');
    State.theme.panelToggle.removeAttribute('aria-disabled');
    alignPanel();
    console.log('i tried');
  }




  // todo merge convert to find
/*
  window.setTimeout(() => {
    if (State.options.watchForChanges) {
      Ed11y.elements.editable?.forEach(editable => {
        if (!editable.matches('.drag-observe')) {
          editable.classList.add('drag-observe');
          editable.addEventListener('drop', () => {
            // This event does not bubble.
            Ed11y.forceFullCheck = true;
            Ed11y.incrementalCheck();
          });
        }
      });
      if (State.options.watchForChanges === 'checkRoots') {
        Ed11y.roots?.forEach((root) => {
          startObserver( root );
        });
      } else {
        startObserver( document.body );
      }
      Ed11y.resumeObservers(); // on recheck.
    }
  }, 0);

  Ed11y.resumeObservers();*/
  State.running = false;
};



export const togglePanel = function() {
  State.ignoreAll = false;

  if (!State.doubleClickPrevent) {
    // Prevent clicks piling up while scan is running.
    if (State.running !== true) {
      State.running = true;
      // Re-scan each time the panel reopens.
      if (State.theme.panel.classList.contains('ed11y-shut') === true) {
        State.onLoad = false;
        State.incremental = false;
        State.showPanel = true;
        if (State.dismissedCount > 0 && State.warningCount === 0 && State.errorCount === 0) {
          State.showDismissed = false;
          this.toggleShowDismissals();
        } else {
          // todo!
          checkAll();
        }
        State.userPrefersShut = false;
        localStorage.setItem('editoria11yShow', '1');
      }
      else {
        State.theme.panelToggleTitle.textContent = State.totalCount > 0 ? ed11yLang.en.buttonShowAlerts : ed11yLang.en.buttonShowNoAlert;
        State.showDismissed = false;

        // todo!
        resetAll();
        State.userPrefersShut = true;

        // todo OOS Sa11y storage system.
        localStorage.setItem('editoria11yShow', '0');
      }
    }
  }
  State.doubleClickPrevent = true;
  window.setTimeout(function () {
    State.doubleClickPrevent = false;
  }, 200);
  return false;
}

export const toggleShowDismissals = function() {

}

export const visualize = function() {

}
