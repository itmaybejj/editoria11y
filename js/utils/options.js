import ed11yLang from '../lang/localization.js';
//import * as Utils from './utils.js';
import defaultOptions from '../../node_modules/sa11y/src/js/utils/default-options';
import Constants from '../../node_modules/sa11y/src/js/utils/constants.js';
import {State, Theme, UI} from "./state.js";

const Options = (function options() {
  /* **************** */
  /* Global constants */
  /* **************** */
  const Global = {};
  let ed11yLang = {};
  let ed11yDefaults = {

    // Relative or absolute
    //cssUrls: false, // ['/folder/editoria11y.css','/folder/custom.css']
    cssUrls: false,

    // Only check within these containers, e.g. "#main, footer." Default is to look for <main> and fall back to <body>.
    checkRoots: false,
    fixedRoots: false, // Array of specific nodes, overrides previous.
    /* e.g:
    fixedRoots: [
      {
         root: direct domReference
         framePositioner: direct domReference or false
      }
    ]
    */

    // Shadow components inside the checkroot to check within, e.g., 'accordion, spa-content'
    shadowComponents: false,
    autoDetectShadowComponents: true,

    // Containers to globally ignore, e.g., "header *, .card *"
    ignoreElements: false,

    // Provide list of test keys; get from localization file or results object.
    // @todo merge provide translation layer or document change.
    ignoreTests: false, //e.g. ['linkNewWindow', 'textUppercase']

    // Ignore Aria on these elements (Gutenberg labels headings while editing.)
    ignoreAriaOnElements: false, // e.g. 'h1,h2,h3,h4,h5,h6'
    ignoreTextInElements: false, // e.g. '.inner-node-hidden-in-CSS'

    // Disable tests on specific elements
    // Include and modify this entire object in your call
    ignoreByKey: {
      'p': 'table p',
      // 'h': false,
      'img': '[aria-hidden], [aria-hidden] img, ' +
        '[role="presentation"], ' +
        'a[href][aria-label] img, button[aria-label] img, ' +
        'a[href][aria-labelledby] img, button[aria-labelledby] img',
      'a': '[aria-hidden][tabindex]', // disable link text check on properly disabled links
      // 'li': false,
      // 'blockquote': false,
      // 'iframe': false,
      // 'audio': false,
      // 'video': false,
      'table': '[role="presentation"]',
    },

    headingsOnlyFromCheckRoots: false, // Whether the Headings panel shows all headings on page or only from checked content.

    // Set alertModes
    // 'headless': do not draw interface
    // 'userPreference: respect user preference.
    // 'polite': open for new issues.
    // 'assertive': open for any issues.
    // 'active': always open.
    // CMS integrations can switch between polite & headless at runtime.
    alertMode: 'userPreference',
    inlineAlerts: true,
    watchForChanges: true, // true, false, 'checkRoots';

    // This covers CKEditor, TinyMCE and Gutenberg. Being less specific may help performance.
    editableContent: '[contenteditable="true"]:not(.gutenberg__editor [contenteditable]), .gutenberg__editor .interface-interface-skeleton__content',

    // Dismissed alerts
    currentPage: false, // uses window.location.pathname unless a string is provided.
    allowHide: true, // enables end-user ignore button
    allowOK: true,  // enables end-user mark OK button
    syncedDismissals: false, // provide empty or populated object {} to enable sync functions
    reportsURL: false, // Provides a link to site-wide reports
    showDismissed: false, // start panel with dismissed items visible; used when coming directly from a dashboard

    // Hide all alerts if these elements are absent, e.g., ".edit-button"
    // Used to not heckle editors on pages they cannot fix; they can still click a "show hidden" button to check manually.
    ignoreAllIfAbsent: false,
    ignoreAllIfPresent: false,

    // Disable checker altogether if these elements are present or absent, e.g., ".live-editing-toolbar, .frontpage" or ".editable-content"
    preventCheckingIfPresent: false,
    preventCheckingIfAbsent: false,

    // Regex of strings to remove from links before checking to see if link titles are meaningful. E.g.:
    // "\(link is external\)|\(link sends email\)"
    linkIgnoreStrings: false,
    linkIgnoreSelector: false,

    // Disable the "is this element visible" check on themes that have 0-height elements.
    checkVisible: true,

    // Selector list for elements where the tip opening JS should wait for your theme to modify the DOM or CSS before opening the tip.
    hiddenHandlers: '',

    panelPinTo: 'right',
    panelOffsetX: '25px',
    panelOffsetY: '25px',
    panelNoCover: '', // select other buttons to avoid.
    panelAttachTo: document.body,

    // Selector list for elements that hide overflow, truncating buttons.
    constrainButtons: false,

    // Interface
    lang: 'en',
    langSanitizes: false, // Some translation modules will double-escape
    theme: 'sleekTheme',
    sleekTheme: {
      bg: '#eff2ff', // e8f4ff
      bgHighlight: '#7b1919',
      text: '#20160c',
      primary: '#276499', // 276499
      primaryText: '#eff2ff',
      button: 'transparent', // deprecate?
      panelBar: '#1e517c',
      panelBarText: '#fffdf7',
      panelBarShadow: '0 0 0 1px #276499',
      activeTab: '#276499',
      activeTabText: '#fffffe',
      focusRing: '#007aff',
      outlineWidth: '0',
      borderRadius: '3px',
      ok: '#1f5381',
      warning: 'rgb(250, 216, 89)',
      warningText: '#20160c',
      alert: 'rgb(184, 5, 25)',
      alertText: '#f4f7ff',
    },
    darkTheme: {
      bg: '#0a2051',
      bgHighlight: '#7b1919',
      text: '#f4f7ff',
      primary: '#3052a0',
      primaryText: '#f4f7ff',
      button: 'transparent',
      panelBar: '#3052a0',
      panelBarText: '#f4f7ff',
      panelBarShadow: 'inset 0 0 1px, 0 0 0 1px #0a2051',
      activeTab: '#0a2051',
      activeTabText: '#fffffe',
      focusRing: 'cyan',
      outlineWidth: '2px',
      borderRadius: '3px',
      ok: '#0a307a',
      warning: 'rgb(250, 216, 89)',
      warningText: '#20160c',
      alert: 'rgb(184, 5, 25)',
      alertText: '#f4f7ff',
    },
    lightTheme: {
      bg: '#fffffe',
      bgHighlight: '#7b1919',
      text: '#20160c',
      primary: '#0a307a',
      primaryText: '#fffdf7',
      panelBar: '#0a307a',
      panelBarText: '#f4f7ff',
      panelBarShadow: '0 0 0 1px #0a307a',
      button: 'transparent',
      activeTab: '#b9c0cf',
      activeTabText: '#20160c',
      focusRing: '#007aff',
      outlineWidth: '0',
      borderRadius: '3px',
      ok: '#0a307a',
      warning: 'rgb(250, 216, 89)',
      warningText: '#20160c',
      alert: 'rgb(184, 5, 25)',
      alertText: '#f4f7ff',
    },
    // Base z-index for buttons.
    // 1299 maximizes TinyMCE compatibility.
    buttonZIndex: 1299,
    // CSS overrides and additions.

    baseFontSize: 'clamp(14px, 1.5vw, 16px)',
    baseFontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',

    // Test customizations
    embeddedContent: false, // @todo remove in favor of custom checks?
    embeddedContentTitle: '', // @todo test or remove?
    embeddedContentMessage: '', // @todo test or remove?

    linksUrls: false, // get from language pack
    linksMeaningless: false, // get from language pack
    altPlaceholder: false, // WP uses 'This image has an empty alt attribute; it's filename is etc.jpg'
    // * Not implemented Yet:
    // ruleset toggling
    // form label tests
    // detectSPArouting: false,

    editLinks: false, // Add links to edit content in tooltips.

    // @todo merge: port this functionality.
    editorHeadingLevel: [
      // Sets previous heading level for contentEditable fields.
      // With 'ignore' set, first heading level is ignored in editable zones.
      // This is ideal for systems with separate backend editing pages.
      // Set to 'inherit' for fields edited in a frontend context.
      /*{
        selector: '.example-inherit',
        previousHeading: 'inherit',
      },
      {
        selector: '.example-l3',
        previousHeading: 3,
      },*/
      {
        selector: '*',
        previousHeading: 0, // Ignores first heading for level skip detection.
      },
    ],

    userPrefersShut: localStorage.getItem('editoria11yShow') === '0',

    customTests: 0,

    // @todo merge do we need the image and button descenders and the tabindex selector? If so should it be in the MR?
    imageIgnore: '[aria-hidden], [aria-hidden] img, [role="presentation"], a[href][aria-label] img, button[aria-label] img, a[href][aria-labelledby] img, button[aria-labelledby] img',
    linkIgnore: '[aria-hidden][tabindex="-1"]',
  };

  function preProcessOptions(options) {
    const sa11yDefaults = defaultOptions;
    ed11yDefaults = {
      ...sa11yDefaults,
      ...ed11yDefaults,
    };

    // @todo MERGE these get destroyed in constants.js
    ed11yDefaults.checks.QA_DOCUMENT.sources = 'a[href$=\'.pdf\'], a[href*=\'.pdf?\']';
    ed11yDefaults.checks.EMBED_VIDEO.sources = 'video, [src*="youtube.com"], [src*="brightcove.com"], [src*="dailymotion.com"], [src*="panopto.com"], [src*="Video"], [src*="video"], [src*="vimeo.com"], [src*="watch"], [src*="wistia.com"], [src*="vidyard.com"], [src*=yuja.com]';


    options = {
      ...ed11yDefaults,
      ...options,
    };
    console.log('merged');
    console.log(options);
    /*
    * Options translation
    * */
    options.headless = options.alertMode === 'headless';
    options.customChecks = options.customTests > 0 && !options.customChecks ? 'listen' : false;

    // Toggleable plugins
    options.developerPlugin = false;
    options.colourFilterPlugin = false;
    options.exportResultsPlugin = false;
    options.showImageOutline = false;
    // @todo merge what are these?
    // Constants.Global.ignoreContentOutsideRoots = option.ignoreContentOutsideRoots;

  //  options.panelPosition = panelPinTo; // Syntax?

    // Check for document types.

    if (options.documentLinks) {
      options.checks.QA_DOCUMENT.sources = options.documentLinks;
    }
    // @todo merge this changed name from linkIgnoreSelector.

    if (options.linkIgnoreSelector) {
      options.linkIgnoreSpan = options.linkIgnoreSelector;
    }

    if (options.panelAttachTo) {
      State.panelAttachTo = options.panelAttachTo; // todo Is this implemented anywhere?
    }


    // @todo Merge ignoreByKey deprecation documentation and conversion. These tests still need overrides:
    // 'p': 'table p',
    //  'table': '[role="presentation"]'

    /* ********************** */
    /* Embedded Content Setup */
    /* ********************** */
    //Constants.Global.AllEmbeddedContent = `${Constants.Global.VideoSources}, ${Constants.Global.AudioSources}, ${Constants.Global.VisualizationSources}`;
    // @todo merge: this means custom embeds needs to be a custom test.

    /* ************** */
    /* Language setup */
    /* ************** */
    // @todo merge how to emulate Sa11y translations?
    ed11yLang = {
      // Fall back to En strings if language or string is unavailable
      ...ed11yLang['en'],
      ...ed11yLang[options.lang]
    };

    /* *********** */
    /* Theme setup */
    /* *********** */
    Theme.push = options[options.theme];
    Theme.baseFontSize = options.baseFontSize;
    Theme.buttonZIndex = options.buttonZIndex;
    Theme.baseFontFamily = options.baseFontFamily;

    let cssUrls = [`https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${State.version}/dist/editoria11y.min.css`];
    if (!options.cssUrls) {
      const cssLink = document.querySelector('link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]');
      if (cssLink) {
        cssUrls = [cssLink.getAttribute('href')];
      } else {
        console.warn('Editoria11y CSS file parameter is missing; attempting to load from CDN.');
      }
    }
    const cssBundle = document.createElement('div');
    cssBundle.classList.add('ed11y-style');
    cssBundle.setAttribute('hidden','');
    cssUrls?.forEach( sheet => {
      const cssLink = document.createElement('link');
      cssLink.setAttribute('rel', 'stylesheet');
      // @todo preload.
      cssLink.setAttribute('media', 'all');
      if (sheet.indexOf('?') < 0) {
        sheet = sheet + '?ver=' + State.version;
      }
      cssLink.setAttribute('href', sheet);
      cssBundle.append(cssLink);
    });
    UI.attachCSS = function(appendTo) {
      const link = cssBundle.cloneNode(true)
      appendTo.appendChild(link);
    };

    return options;
  }

  const Sync = {};
  function postProcessOptions(option) {
    // @todo merge: test: does this need descendant selector?
    Constants.Exclusions.Sa11yElements = ['.ed11y-element'];

    // Main container exclusions.
    console.log('Constants: ')
    console.log(Constants);

    // Undo Sa11y overrides in constants.js.
    Constants.Global.documentSources = option.checks.QA_DOCUMENT.sources;
    Constants.Global.videoSources = option.checks.EMBED_VIDEO.sources;
    Constants.Global.AudioSources = option.checks.EMBED_AUDIO.sources;
    Constants.Global.dataVizSources = option.checks.EMBED_DATA_VIZ.sources;
    Constants.Global.AllEmbeddedContent = `${Constants.Global.VideoSources}, ${Constants.Global.AudioSources}, ${Constants.Global.VisualizationSources}`;

    State.currentPage = options.currentPage ? options.currentPage : window.location.currentPage;
    // @todo merge remove wpadminbar from defaults and update wp module.
    /*Exclusions.Container = ['#wpadminbar', '#wpadminbar *', ...exclusions];
    if (option.containerIgnore) {
      const containerSelectors = option.containerIgnore.split(',').map((item) => item.trim());
      Exclusions.Container = Exclusions.Container.concat(
        containerSelectors.flatMap((item) => [`${item} *`, item]),
      );
    }*/

  }

  return {
    preProcessOptions,
    ed11yLang,
    postProcessOptions,
  };
}());

export default Options;
