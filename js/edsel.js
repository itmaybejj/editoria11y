// Options, language object, constants, and utilities.
import defaultOptions from '../node_modules/sa11y/src/js/utils/default-options';
import * as Ed11y from './core/ed11y.js'
import Lang from '../node_modules/sa11y/src/js/utils/lang';
import * as Utils from '../node_modules/sa11y/src/js/utils/utils';
import Constants from '../node_modules/sa11y/src/js/utils/constants';
import find from '../node_modules/sa11y/src/js/utils/find';
import State from './utils/state.js'

// import findShadowComponents from './sa11y/src/js/logic/find-shadow-components';

// Extras
// import detectPageChanges from './sa11y/dist/js/features/detect-page-changes';
// import { dismissLogic, dismissButtons, removeDismissListeners } from './features/dismiss-annotations';
// import { addColourFilters, resetColourFilters } from './sa11y/dist/js/features/colour-filters';
// import { exportResults, removeExportListeners } from './sa11y/dist/js/features/export-results';

// Create UI/interface elements
//import mainToggle from './sa11y/dist/js/logic/main-toggle-logic';
// import ControlPanel from './sa11y/dist/js/interface/control-panel';
// import settingsPanelToggles from './sa11y/dist/js/logic/settings-panel-logic';
// import initializePanelToggles from './sa11y/dist/js/logic/control-panel-logic';
// import generatePageOutline from './sa11y/dist/js/interface/page-outline';
// import generateImageOutline from './sa11y/dist/js/interface/image-outline';
// import { updatePanel, updateBadge, updateCount } from './sa11y/dist/js/logic/update-panel';
// import { AnnotationTooltips, PanelTooltips } from './sa11y/dist/js/interface/tooltips';
// import { Annotations, annotate } from './sa11y/dist/js/interface/annotations';
// import { HeadingAnchor, HeadingLabel } from './sa11y/dist/js/interface/heading-labels';
// import { skipToIssue, removeSkipBtnListeners } from './sa11y/dist/js/logic/skip-to-issue';

// import ConsoleErrors from './sa11y/src/js/interface/console-error';
import Options from "./utils/options.js";
// import {checkAll} from "../firstAttempt/check.js";
// import ControlPanel from "./interface/control-panel.js";
// import checkCustom from './sa11y/src/js/sa11y-custom-checks';

class Edsel {
  static Ed11y = Ed11y;
  constructor(options) {

    // @todo Sa11y style versioning magic.
    options.version = '3.0.0';
    State.options = Options.preProcessOptions(options);
    State.options = {
      ...defaultOptions,
      ...options,
      checks: {
        ...defaultOptions.checks,
        ...options.checks,
      },
    };
    // Initialize global constants and exclusions.
    Constants.initializeGlobal(State.options);
    Constants.initializeReadability(State.options);
    Constants.initializeExclusions(State.options);

    Options.postProcessOptions(State.options);


    /* *********************************************************** */
    /*  Initialize: Start your engines.                            */
    /* *********************************************************** */
    /*this.initialize = () => {
      // Do not run Sa11y if any supplied elements detected on page.
      const checkRunPrevent = () => {
        const { doNotRun } = State.options;
        return doNotRun.trim().length > 0 ? document.querySelector(doNotRun) : false;
      };

      if (!checkRunPrevent()) {
        // Register web components
        // customElements.define('sa11y-heading-label', HeadingLabel);
        // customElements.define('sa11y-heading-anchor', HeadingAnchor);
        // customElements.define('sa11y-annotation', Annotations);
        // customElements.define('sa11y-tooltips', AnnotationTooltips);
        // customElements.define('sa11y-panel-tooltips', PanelTooltips);
        // customElements.define('sa11y-control-panel', ControlPanel);
        // customElements.define('sa11y-console-error', ConsoleErrors);
        customElements.define('ed11y-element-panel', ControlPanel);

        // Initialize global constants and exclusions.
        Constants.initializeGlobal(State.options);
        Constants.initializeReadability(State.options);
        Constants.initializeExclusions(State.options);

        Options.postProcessOptions(State.options);


        // Build control panel.
        const controlPanel = new ControlPanel();
        document.body.appendChild(controlPanel);
        Theme.attachCSS(document.body);

        // Make "Developer checks" on by default or if toggle switch is visually hidden.

      }
    };*/



    /* *********************************************************** */
    /*  Reset all: Clears everything and resets the panel.         */
    /* *********************************************************** */
    //this.resetAll = (restartPanel = true) => {
      /*
      Constants.Global.html.removeAttribute('data-sa11y-active');

      // Remove data attribute from shadow root elements.
      document.querySelectorAll('[data-sa11y-has-shadow-root]').forEach((el) => {
        el.shadowRoot.querySelectorAll('style.sa11y-css-utilities').forEach((style) => style.remove());
        el.removeAttribute('data-sa11y-has-shadow-root');
      });
      */
    //};

    /* *********************************************************** */
    /*  Methods: Useful utilities for integrations.                */
    /* *********************************************************** */

    // Method: find utility.
    //this.find = (selector, desiredRoot, exclude) => find(selector, desiredRoot, exclude);

    // Method: prepare dismissal keys.
    this.prepareDismissal = (string) => Utils.prepareDismissal(string);

    // Method: sanitize HTML.
    this.sanitizeHTML = (string) => Utils.sanitizeHTML(string);

    // Method: truncate string.
    this.truncateString = (string, maxLength) => Utils.truncateString(string, maxLength);

    /* *********************************************************** */
    /*  Initialize Sa11y.                                          */
    /* *********************************************************** */

    /*this.initialize();

    this.checkAll = Check.checkAll;

    this.resetAll = Check.resetAll();

    Check.checkAll();

    this.results = function() {
      return State.results;
    };

    console.log(State);


    // todo incrementalCheck
    //checkAll();*/
  }
}

export {
  Lang,
  Edsel,
  Ed11y,
};
