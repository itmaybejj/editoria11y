import Options from "./utils/options.js";
import Lang from '../node_modules/sa11y/src/js/utils/lang';
import Constants from "sa11y/src/js/utils/constants.js";
import ed11yLang from "./lang/localization.js";
import {State, Theme, M, UI} from "./utils/state.js";
import {windowResize} from "./utils/observers.js";
import {checkAll, makeItSo} from "./utils/check.js";

class Ed11y {

  constructor(options) {

    State.version = '3.0.0';
    State.options = Options.preProcessOptions(options);
    // Initialize global constants and exclusions.
    Constants.initializeGlobal(State.options);
    Constants.initializeReadability(State.options);
    Constants.initializeExclusions(State.options);
    Options.postProcessOptions(State.options);

    Object.assign(M, ed11yLang['en'], ed11yLang[State.options.lang]);

    Object.assign(Theme, State.options[State.options.theme]);
    Theme.baseFontSize = State.options.baseFontSize;
    Theme.buttonZIndex = State.options.buttonZIndex;
    Theme.baseFontFamily = State.options.baseFontFamily;

    if (State.options.currentPage === false) {
      State.options.currentPage = window.location.pathname;
    }

    if (!State.options.linkStringsNewWindows) {
      State.options.linkStringsNewWindows = M.linkStringsNewWindows;
    }

    window.addEventListener('keydown', () => {
      State.interaction = true;
    });
    window.addEventListener('click', () => {
      State.interaction = true;
    });

    // Move toggles when something expands or collapses.
    const mightExpand = document.querySelectorAll('[aria-expanded], [aria-controls]');
    mightExpand?.forEach(expandable => {
      expandable.addEventListener('click', () => {
        window.setTimeout(() => {
          windowResize();
        }, 333);
      });
    });

    // Escape key closes panels.
    const escapeWatch = function (event) {
      if (event.keyCode === 27) {
        if (event.target.closest('ed11y-element-panel') && UI.panelToggle.getAttribute('aria-expanded') === 'true') {
          UI.panelToggle.focus();
          UI.panelToggle.click();
        } else if (event.target.hasAttribute('data-ed11y-open')) {
          if (State.openTip.button) {
            State.toggledFrom.focus();
            State.openTip.button.shadowRoot.querySelector('button').click();
          }
        }
      }
    };
    document.addEventListener('keyup', function (event) {escapeWatch(event); });


    if (CSS.supports('selector(:has(body))')) {
      makeItSo();
    } else {
      console.warn(M.consoleNotSupported);
    }

    /* Export exposed interfaces */
    this.checkAll = checkAll();
  }
}

export {
  Lang,
  Ed11y,
  checkAll
}
