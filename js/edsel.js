// Options, language object, constants, and utilities.
import defaultOptions from './sa11y/src/js/utils/default-options';
import Lang from './sa11y/src/js/utils/lang';
import * as Utils from './sa11y/src//js/utils/utils';
import Constants from './sa11y/src/js/utils/constants';
import Elements from './sa11y/src/js/utils/elements';
import find from './sa11y/src/js/utils/find';
import findShadowComponents from './sa11y/src/js/logic/find-shadow-components';

// Extras
// import detectPageChanges from './sa11y/dist/js/features/detect-page-changes';
// import { dismissLogic, dismissButtons, removeDismissListeners } from './features/dismiss-annotations';
// import { addColourFilters, resetColourFilters } from './sa11y/dist/js/features/colour-filters';
// import { exportResults, removeExportListeners } from './sa11y/dist/js/features/export-results';
import ConsoleErrors from './sa11y/src/js/interface/console-error';

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

// Checks/rulesets
import checkImages from './sa11y/src/js/rulesets/images';
import checkHeaders from './sa11y/src/js/rulesets/headers';
import checkLinkText from './sa11y/src/js/rulesets/link-text';
import checkContrast from './sa11y/src/js/rulesets/contrast';
import checkLabels from './sa11y/src/js/rulesets/labels';
import checkReadability from './sa11y/src/js/rulesets/readability';
import checkEmbeddedContent from './sa11y/src/js/rulesets/embedded-content';
import checkQA from './sa11y/src/js/rulesets/quality-assurance';
import checkDeveloper from './sa11y/src/js/rulesets/developer';
import Options from "./utils/options.js";
// import checkCustom from './sa11y/src/js/sa11y-custom-checks';

class Ed11y {
  constructor(options) {

    console.log(options);
    options = Options.preProcessOptions(options);
    console.log(options);
    const option = {
      ...defaultOptions,
      ...options,
      checks: {
        ...defaultOptions.checks,
        ...options.checks,
      },
    };
    console.log(option);

    /* *********************************************************** */
    /*  Initialize: Start your engines.                            */
    /* *********************************************************** */
    this.initialize = () => {
      // Do not run Sa11y if any supplied elements detected on page.
      const checkRunPrevent = () => {
        const { doNotRun } = option;
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

        // Initialize global constants and exclusions.
        Constants.initializeGlobal(option);
        Constants.initializeReadability(option);
        Constants.initializeExclusions(option);

        // Make "Developer checks" on by default or if toggle switch is visually hidden.
        if (option.developerChecksOnByDefault) {
          if (Utils.store.getItem('sa11y-developer') === null || option.checkAllHideToggles) {
            Utils.store.setItem('sa11y-developer', 'On');
          }
        }

      }
    };

    /* *********************************************************** */
    /*  Check All: Where all the magic happens.                    */
    /* *********************************************************** */
    this.checkAll = async (
      desiredRoot = option.checkRoot,
      desiredReadabilityRoot = option.readabilityRoot,
      fixedRoots = option.fixedRoots,
    ) => {
      try {
        // @todo merge does Editoria11y need to separate out these clears?
        this.results = [];
        this.headingOutline = [];
        this.errorCount = 0;
        this.warningCount = 0;
        this.customChecksRunning = false;

        // Initialize root areas to check.
        Constants.initializeRoot(desiredRoot, desiredReadabilityRoot, fixedRoots);

        // Find all web components on the page.
        // @todo Merge work needed.
        findShadowComponents(option);

        // Find and cache elements.
        // @todo Merge work needed.
        Elements.initializeElements(option);

        // Ruleset checks
        checkHeaders(this.results, option, this.headingOutline);
        checkLinkText(this.results, option);
        checkImages(this.results, option);
        checkLabels(this.results, option);
        checkQA(this.results, option);
        checkDeveloper(this.results, option);
        if (option.embeddedContentPlugin) checkEmbeddedContent(this.results, option);
        if (option.contrastPlugin) checkContrast(this.results, option);
        if (option.readabilityPlugin) checkReadability();

        // Build array of images to be used for image panel.
        this.imageResults = Elements.Found.Images.map((image) => {
          const match = this.results.find((i) => i.element === image);
          return match && {
            element: image,
            type: match.type,
            dismiss: match.dismiss,
            developer: match.developer,
          };
        }).filter(Boolean);

        /* Custom checks */
        if (option.customChecks === true) {
          // Option 1: Provide via sa11y-custom-checks.js
          checkCustom(this.results);
        } else if (typeof option.customChecks === 'object') {
          // Option 2: Provide as an object when instantiated.
          this.results.push(...option.customChecks);
        } else if (option.customChecks === 'listen') {
          // Option 3: Provide via event listener. Yoinked from Editoria11y!
          this.customChecksRunning = true;
          this.customChecksFinished = 0;
          document.addEventListener('sa11y-resume', () => {
            this.customChecksFinished += 1;
            if (this.customChecksFinished === 1) {
              this.customChecksRunning = false;
              this.updateResults();
            }
          });
          window.setTimeout(() => {
            if (this.customChecksRunning === true) {
              this.customChecksRunning = false;
              this.updateResults();
              throw Error('Sa11y: No custom checks were returned.');
            }
          }, option.delayCustomCheck);
          window.setTimeout(() => {
            const customChecks = new CustomEvent('sa11y-custom-checks');
            document.dispatchEvent(customChecks);
          }, 0);
        }

        // No custom checks running.
        if (!this.customChecksRunning) this.updateResults();
      } catch (error) {
        const consoleErrors = new ConsoleErrors(error);
        document.body.appendChild(consoleErrors);
        throw Error(error);
      }
    };

    this.updateResults = () => {
      // Filter out heading issues that are outside of the target root.
      this.results = this.results.filter((heading) => heading.isWithinRoot !== false);

      // Filter out "Developer checks" if toggled off or if using externally supplied developer checks.
      const devChecks = Utils.store.getItem('sa11y-developer') === 'Off' || Utils.store.getItem('sa11y-developer') === null;
      if (devChecks || option.externalDeveloperChecks === true) {
        this.results = this.results.filter((issue) => issue.developer !== true);
      }

      // Filter out external vendor results based on "Developer checks" state.
      if (devChecks) {
        this.results = this.results.filter((issue) => issue.external !== true);
      }

      // Generate HTML path, and optionally CSS selector path of element.
      this.results.forEach(($el, id) => {
        const cssPath = option.selectorPath ? Utils.generateSelectorPath($el.element) : '';
        const htmlPath = $el.element?.outerHTML.replace(/\s{2,}/g, ' ').trim() || '';
        Object.assign($el, {htmlPath, cssPath, id});
      });
    }

    /* *********************************************************** */
    /*  Reset all: Clears everything and resets the panel.         */
    /* *********************************************************** */
    this.resetAll = (restartPanel = true) => {
      Constants.Global.html.removeAttribute('data-sa11y-active');

      // Remove data attribute from shadow root elements.
      document.querySelectorAll('[data-sa11y-has-shadow-root]').forEach((el) => {
        el.shadowRoot.querySelectorAll('style.sa11y-css-utilities').forEach((style) => style.remove());
        el.removeAttribute('data-sa11y-has-shadow-root');
      });

    };

    /* *********************************************************** */
    /*  Methods: Useful utilities for integrations.                */
    /* *********************************************************** */

    // Method: find utility.
    this.find = (selector, desiredRoot, exclude) => find(selector, desiredRoot, exclude);

    // Method: prepare dismissal keys.
    this.prepareDismissal = (string) => Utils.prepareDismissal(string);

    // Method: sanitize HTML.
    this.sanitizeHTML = (string) => Utils.sanitizeHTML(string);

    // Method: truncate string.
    this.truncateString = (string, maxLength) => Utils.truncateString(string, maxLength);

    /* *********************************************************** */
    /*  Initialize Sa11y.                                          */
    /* *********************************************************** */
    this.initialize();
  }
}

export {
  Lang,
  Ed11y,
};
