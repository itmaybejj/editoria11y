import Constants from '../../sa11y-js/utils/constants.js';
import Lang from '../../sa11y-js/utils/lang.js';
import { documentLoadingCheck, store } from '../../sa11y-js/utils/utils.js';
import { checkRunPrevent, smush } from '../utils/utils.js';
import { checkAll, continueCheck, windowResize } from './run.js';
import { Ed11yElementAlt } from '../elements/ed11y-element-alt.js';
import { Ed11yElementResult } from '../elements/ed11y-element-result.js';
import { Ed11yElementHeadingLabel, Ed11yElementPanel } from '../elements/ed11y-element-panel.js';
import { Ed11yElementTip } from '../elements/ed11y-element-tip.js';
import { lang } from '../../lang/en-us.js';
import { State } from '../../sa11y-js/core/state.js';
import { UI } from './ui.js';
import { ed11yDefaultOptions } from '../utils/ed11y-default-options.js';

const preProcessOptions = async (userOptions) => {
  smush(State.option, ed11yDefaultOptions, ['checks']);
  smush(State.option, userOptions, ['checks']);
  Object.assign(State.option.checks, ed11yDefaultOptions.checks, userOptions.checks);
  if (!userOptions.lang) {
    State.option.lang = lang;
  }
  Lang.addI18n(State.option.lang.strings);
  Lang.testNames = State.option.lang.testNames;
  const titles = Object.entries(Lang.testNames);
  for (let i = 0; i < titles.length; i++) {
    Lang.langStrings[titles[i][0]] =
      `<div class="title" tabindex="-1">${Lang.testNames[`${titles[i][0]}`]}</div>${Lang.langStrings[titles[i][0]]}`;
  }

  UI.english = Lang.langStrings.LANG_CODE.startsWith('en');

  if (UI.english) {
    State.option.extraPlaceholderStopWords = userOptions.extraPlaceholderStopWords
      ? userOptions.extraPlaceholderStopWords.Lang.langStrings.extraPlaceholderStopWords
      : Lang.langStrings.extraPlaceholderStopWords;
  }

  if (State.option.fixedRoots) {
    State.option.checkRoot = State.option.fixedRoots;
  } else if (!State.option.checkRoot) {
    State.option.checkRoot = document.querySelector('main') !== null ? 'main' : 'body'; // needed or redundant?
  }

  if (userOptions.splitConfiguration) {
    UI.splitConfiguration.active = true;
    UI.splitConfiguration.showDev = userOptions.splitConfiguration.showDev;
    // Store both content (default) and dev options in UI.
    UI.splitConfiguration.devOptions = userOptions.splitConfiguration.devOptions;
    UI.splitConfiguration.contentOptions = {};
    // Store "content" value for each sync override.
    Object.keys(UI.splitConfiguration.devOptions).forEach((key) => {
      // Cache the base configuration to restore after first check.
      UI.splitConfiguration.contentOptions[key] = userOptions[key];
    });
    UI.splitConfiguration.devChecks = new Set(userOptions.splitConfiguration.devChecks);

    // We run tests in dev mode, then filter them to content mode as needed.
    Object.assign(State.option, UI.splitConfiguration.devOptions);
  }

  /*
   * Options translation
   * */
  State.option.headless = userOptions.alertMode === 'headless';

  // Check for document types.
  if (userOptions.panelAttachTo) {
    UI.panelAttachTo = userOptions.panelAttachTo;
  }

  /* *********** */
  /* Theme setup */
  /* *********** */
  UI.theme.push = State.option[State.option.theme];
  UI.theme.baseFontSize = State.option.baseFontSize;
  UI.theme.buttonZIndex = State.option.buttonZIndex;
  UI.theme.baseFontFamily = State.option.baseFontFamily;
  //  UI.inlineAlerts = !document.querySelector('[cotenteditable]') && State.option.inlineAlerts;
  // todo change to that after next action.
  UI.inlineAlerts = State.option.inlineAlerts;
  UI.showDismissed = State.option.showDismissed;

  // Deprecated
  /*if (userOptions.linkIgnoreSelector && !userOptions.linkIgnoreSpan) {
    State.option.linkIgnoreSpan = userOptions.linkIgnoreSelector;
  }*/

  let cssUrls = userOptions.cssUrls;
  if (!cssUrls) {
    const cssLink = document.querySelector(
      'link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]',
    );
    if (cssLink) {
      cssUrls = [cssLink.getAttribute('href')];
    } else {
      cssUrls = [
        `https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${UI.version}/dist/editoria11y.min.css`,
      ];
      console.warn('Editoria11y CSS file parameter is missing; attempting to load from CDN.');
    }
  }
  const cssBundle = document.createElement('div');
  cssBundle.classList.add('ed11y-style');
  cssBundle.setAttribute('hidden', '');
  cssUrls?.forEach((sheet) => {
    const cssLink = document.createElement('link');
    cssLink.setAttribute('rel', 'stylesheet');
    // @todo after merge possibly lost some preload functionality.
    cssLink.setAttribute('media', 'all');
    if (sheet.indexOf('?') < 0) {
      sheet = `${sheet}?ver=${UI.version}`;
    }
    cssLink.setAttribute('href', sheet);
    cssBundle.append(cssLink);
  });
  UI.attachCSS = (appendTo) => {
    const link = cssBundle.cloneNode(true);
    appendTo.appendChild(link);
  };
};

const postProcessOptions = (userOptions) => {
  // Override Sa11y's exclusion settings.

  // This is separate because sometimes that's what we are looking for.
  Constants.Exclusions.Sa11yElements = ['.ed11y-element', 'ed11y-element-heading-label'];

  Constants.Exclusions.Container = ['style', 'script', 'noscript'];
  if (State.option.containerIgnore) {
    const containerSelectors = State.option.containerIgnore.split(',').map((item) => item.trim());
    Constants.Exclusions.Container = Constants.Exclusions.Container.concat(
      containerSelectors.flatMap((item) => [`${item} *`, item]),
    );
  }
  if (userOptions.ignoreElements) {
    const elementSelectors = userOptions.ignoreElements.split(',').map((item) => item.trim());
    Constants.Exclusions.Container = Constants.Exclusions.Container.concat(elementSelectors);
  }

  Constants.Panel.readabilityInfo = document.createElement('div');
  Constants.Panel.readabilityDetails = document.createElement('div');

  Object.assign(UI.theme, State.option[State.option.theme]);
  UI.theme.baseFontSize = State.option.baseFontSize;
  UI.theme.buttonZIndex = State.option.buttonZIndex;
  UI.theme.baseFontFamily = State.option.baseFontFamily;

  if (!State.option.linkStringsNewWindows) {
    State.option.linkStringsNewWindows = Lang._('linkStringsNewWindows');
  }

  if (userOptions.documentLinks) {
    Constants.Global.documentSources = userOptions.documentLinks;
  }

  const localResultCount = store.getItem('editoria11yResultCount');
  UI.seen =
    localResultCount && localResultCount !== 'undefined' ? JSON.parse(localResultCount) : {};

  // Build list of dismissed alerts
  if (State.option.syncedDismissals === false) {
    UI.dismissedAlerts = localStorage.getItem('ed11ydismissed');
    UI.dismissedAlerts = UI.dismissedAlerts ? JSON.parse(UI.dismissedAlerts) : {};
  } else {
    UI.dismissedAlerts = {};
    UI.dismissedAlerts[State.option.currentPage] = State.option.syncedDismissals;
  }
};

export async function initialize(userOptions) {
  if (UI.once) {
    console.error('double init');
    return;
  }
  UI.once = true;

  // Initialize global constants and exclusions.
  await preProcessOptions(userOptions).then();
  // We override Sa11y's root initializer because we use strings not arrays.

  Constants.initializeGlobal();
  // @todo CMS readability param
  Constants.initializeReadability();
  Constants.initializeExclusions();
  postProcessOptions(userOptions);
  customElements.define('ed11y-element-alt', Ed11yElementAlt);
  customElements.define('ed11y-element-result', Ed11yElementResult);
  customElements.define('ed11y-element-heading-label', Ed11yElementHeadingLabel);
  customElements.define('ed11y-element-panel', Ed11yElementPanel);
  customElements.define('ed11y-element-tip', Ed11yElementTip);

  // Once document has fully loaded.
  documentLoadingCheck(() => {
    if (checkRunPrevent()) {
      UI.disabled = true;
      return false;
    }

    UI.running = true;

    // Run tests
    checkAll();

    document.addEventListener('ed11yResume', () => {
      continueCheck(true).then();
    });
    // Set up observers.
    // Todo only needed if we are watching for changes.
    window.addEventListener(
      'keydown',
      () => {
        UI.interaction = true;
      },
      {
        passive: true,
      },
    );
    window.addEventListener(
      'click',
      () => {
        UI.interaction = true;
      },
      {
        passive: true,
      },
    );
    window.addEventListener(
      'resize',
      () => {
        windowResize();
      },
      {
        passive: true,
      },
    );
    // Move toggles when something expands or collapses.
    const mightExpand = document.querySelectorAll('[aria-expanded], [aria-controls]');
    mightExpand?.forEach((expandable) => {
      expandable.addEventListener(
        'click',
        () => {
          window.setTimeout(() => {
            windowResize();
          }, 333);
        },
        {
          passive: true,
        },
      );
    });
  });
}
