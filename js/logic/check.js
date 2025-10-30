import * as Utils from "../sa11y/src/js/utils/utils.js";
import Elements from '../sa11y/src/js/utils/elements.js';
import Options from '../utils/options.js';
import Constants from '../sa11y/src/js/utils/constants.js';
import State from "../utils/state.js";
import findShadowComponents from "../sa11y/src/js/logic/find-shadow-components.js";
// Checks/rulesets
import checkImages from '../sa11y/src/js/rulesets/images';
import checkHeaders from '../sa11y/src/js/rulesets/headers';
import checkLinkText from '../sa11y/src/js/rulesets/link-text';
// import checkContrast from '../sa11y/src/js/rulesets/contrast';
import checkLabels from '../sa11y/src/js/rulesets/labels';
// import checkReadability from '../sa11y/src/js/rulesets/readability';
// import checkEmbeddedContent from '../sa11y/src/js/rulesets/embedded-content';
import checkQA from '../sa11y/src/js/rulesets/quality-assurance';
// import checkDeveloper from '../sa11y/src/js/rulesets/developer';
import ConsoleErrors from "../sa11y/src/js/interface/console-error.js";
import {updatePanel} from "./control-panel-logic.js";
import {prepareDismissal} from "../sa11y/src/js/utils/utils.js";


// @todo merge this should be wrapped into my dismissal logic I think.
export function countAlerts() {

  State.errorCount = 0;
  State.warningCount = 0;
  State.dismissedCount = 0;

  // Review results array to remove dismissed or ignored items
  for (let i = State.results.length - 1; i >= 0; i--) {

    // @todo merge we need the test name here
    let test = State.results[i].content;

    if (State.options.ignoreTests &&
      State.options.ignoreTests.includes(test)) {
      // Would be faster to skip test, but this is easy and reliable.
      State.results.splice(i, 1);
      continue;
    }
    console.log('count');

    // todo postpone: we could remove active range from list if it is not in oldResults to prevent tagging while people are typing. But we'd have to walk the array. Expensive!
    /*if (Ed11y.incremental && Ed11y.oldResults.length > 0) {
      // Don't flag new issues in the active range while people are typing.
    }*/

    let dismissKey = prepareDismissal(State.results[i].dismiss);
    console.log(dismissKey);
    console.log(State.dismissedAlerts);
    console.log(test);
    console.log(State.currentPage);

    // We run the user provided dismissal key through the text sanitization to support legacy data with special characters.
    if (dismissKey !== false && State.currentPage in State.dismissedAlerts && test in State.dismissedAlerts[State.currentPage] && dismissKey in State.dismissedAlerts[State.currentPage][test]) {
      // Remove result if it has been marked OK or ignored, increment dismissed match counter.
      console.log('co0unt');

      State.dismissedCount++;
      State.results[i].dismissalStatus = State.dismissedAlerts[Ed11y.options.currentPage][test][dismissKey];
    } else if (State.results[i].dismissalKey) {
      console.log('cou1nt');

      State.warningCount++;
      State.results[i].dismissalStatus = false;
    } else {
      console.log('co2unt');

      State.errorCount++;
      State.results[i].dismissalStatus = false;
    }
  }

  State.totalCount = State.errorCount + State.warningCount;

  // Dispatch event for synchronizers.
  if (!State.incremental) {
    window.setTimeout(function () {
      let syncResults = new CustomEvent('ed11yResults');
      document.dispatchEvent(syncResults);
    }, 0);
  }

  if (State.ignoreAll) {
    State.dismissedCount = State.totalCount + State.dismissedCount;
    State.errorCount = 0;
    State.warningCount = 0;
    State.totalCount = 0;
  }
  console.log('counted');

}


export function resetAll() {
  /*Ed11y.pauseObservers();
  Ed11y.resetResults();
  Ed11y.resetPanel();*/
  State.incremental = false;
  State.running = false;
  State.showPanel = false;
  State.open = false;
}

export const checkAll = function (
  desiredRoot = State.options.checkRoot,
  desiredReadabilityRoot = State.options.readabilityRoot,
  fixedRoots = State.options.fixedRoots,
) {
  try {
    // @todo merge does Editoria11y need to separate out these clears?
    State.results = []; // erm...
    State.headingOutline = [];
    State.errorCount = 0;
    State.warningCount = 0;
    State.customChecksRunning = false;
    // Initialize root areas to check.
    Constants.initializeRoot(desiredRoot, desiredReadabilityRoot, fixedRoots);
    // Find all web components on the page.
    // @todo Merge work needed.
    findShadowComponents(Constants.Global);
    // Find and cache elements.
    // @todo Merge work needed.
    Elements.initializeElements(State.options);
    // Ruleset checks
    checkHeaders(State.results, State.options, State.headingOutline);
    checkLinkText(State.results, State.options);
    checkImages(State.results, State.options);
    checkLabels(State.results, State.options);
    checkQA(State.results, State.options);
    // checkDeveloper(this.results, Options);
    // @todo merge work needed
    // if (State.options.embeddedContentPlugin) checkEmbeddedContent(State.results, Options);
    // if (Options.contrastPlugin) checkContrast(this.results, Options);
    // if (Options.readabilityPlugin) checkReadability();
    // Build array of images to be used for image panel.
    State.imageResults = Elements.Found.Images.map((image) => {
      const match = State.results.find((i) => i.element === image);
      return match && {
        element: image,
        type: match.type,
        dismiss: match.dismiss,
        developer: match.developer,
      };
    }).filter(Boolean);
    /* Custom checks */
    if (Constants.customChecks === 'listen') {
      console.log('listening');
      // Option 3: Provide via event listener. Yoinked from Editoria11y!
      State.customChecksRunning = true;
      State.customChecksFinished = 0;
      document.addEventListener('sa11y-resume', () => {
        State.customChecksFinished += 1;
        if (State.customChecksFinished === 1) {
          State.customChecksRunning = false;
          this.updateResults();
        }
      });
      window.setTimeout(() => {
        if (State.customChecksRunning === true) {
          State.customChecksRunning = false;
          this.updateResults();
          throw Error('Sa11y: No custom checks were returned.');
        }
      }, Options.delayCustomCheck);
      window.setTimeout(() => {
        const customChecks = new CustomEvent('sa11y-custom-checks');
        document.dispatchEvent(customChecks);
      }, 0);
    } else if (typeof Constants.customChecks === 'object') {
      // Option 2: Provide as an object when instantiated.
      State.results.push(...Options.customChecks);
    }

    // No custom checks running.
    if (!State.customChecksRunning) updateResults();
  } catch (error) {
    const consoleErrors = new ConsoleErrors(error);
    document.body.appendChild(consoleErrors);
    throw Error(error);
  }
  return true;
};

export const updateResults = () => {
  // Filter out heading issues that are outside of the target root.
  State.results = State.results.filter((heading) => heading.isWithinRoot !== false);
  // Filter out "Developer checks" if toggled off or if using externally supplied developer checks.
  /*const devChecks = Utils.store.getItem('sa11y-developer') === 'Off' || Utils.store.getItem('sa11y-developer') === null;
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
  });*/

  if (State.options.headless === false) {
    // Check for dismissed items and update results array.

    // @todo Merge and replace.
    // until then....
    State.totalCount = State.results.length;
    updatePanel();
    /*        const dismiss = dismissLogic(
              this.results,
              this.panelTooltips,
              this.checkAll,
              this.resetAll,
            );
            this.results = dismiss.updatedResults;
            this.dismissed = dismiss.dismissedIssues;
            this.dismissedPageResults = dismiss.dismissedResults;*/
    }

    // Dispatch custom event that stores the results array.
    // @todo merge Ed11y events
    window.sa11yCheckComplete = null;
    const event = new CustomEvent('sa11y-check-complete', {
      detail: {
        results: State.results,
        // @todo merge need the param.
        page: window.location.pathname,
      },
    });
    window.sa11yCheckComplete = event.detail;
    document.dispatchEvent(event);

    countAlerts();
}
