import defaultOptions from '../../node_modules/sa11y/src/js/utils/default-options';
import Constants from '../../node_modules/sa11y/src/js/utils/constants.js';
import {M, State, Theme, UI} from "./state.js";
import {Lang} from "sa11y/src/js/sa11y.js";

const Options = (function options() {
  /* **************** */
  /* Global constants */
  /* **************** */
  let ed11yLang = {};
  let ed11yDefaults = {

		/**
		 * Sa11y overrides =============== */

		// Only check within these containers, e.g. "#main, footer." Default is to look for <main> and fall back to <body>.
		checkRoots: false, // @todo merge implement whatever syntax Sa11y releases.
		fixedRoots: false, // Array of specific nodes, overrides previous.
		/* e.g:
		fixedRoots: [
			{
				 root: direct domReference
				 framePositioner: direct domReference or false
			}
		]
		*/
		// Containers to globally ignore, e.g., "header *, .card *"
		ignoreByKey: { // not implemented in Sa11y
			// @todo merge discuss how to implement this in Sa11y core. Sa11y appends a descending selector; for these we only want to ignore QA and table checks, not inner link checks.
			'p': 'table p',
			'table': '[role="presentation"]',
		},
		containerIgnore: false, // @todo merge CMS was ignoreElements.

		// contrastIgnore: '.sr-only',
		outlineIgnore: '', // @todo merge CMS was in ignoreByKey
		// headerIgnore: '',
		// headerIgnoreSpan: '',
		// headerIgnoreStrings: '',
		imageIgnore: 'img[aria-hidden], [aria-hidden] img, ' +
			'img[role="presentation"], ' +
			'a[href][aria-label] img, button[aria-label] img, ' +
			'a[href][aria-labelledby] img, button[aria-labelledby] img', 		// @todo merge discuss moving to Sa11y.
		linkIgnore: '[aria-hidden][tabindex="-1"]', // @todo merge discuss moving to Sa11y.
		// linkIgnoreStrings: false,
		// linkIgnoreSpan: false, // @todo merge CMS was linkIgnoreSelector

		// Relative or absolute
    //cssUrls: false, // ['/folder/editoria11y.css','/folder/custom.css']

		// Control panel settings
		// aboutContent: '',
		panelPosition: 'right', // @todo merge CMS was panelPinTo
		// showMovePanelToggle: true,
		// checkAllHideToggles: false,
		// developerChecksOnByDefault: false,

		// Page outline
		showHinPageOutline: false, // @todo merge test.
		showTitleInPageOutline: true,

		// Image outline
		// showImageOutline: true,
		editImageURLofCMS: '', // @todo merge CMS test.
		// relativePathImageSRC: '',
		// relativePathImageID: '',
		// ignoreEditImageURL: [],
		// ignoreEditImageClass: [],

		// Other features
		// delayCheck: 0,
		// delayCustomCheck: 500,
		// detectSPArouting: false,
		doNotRun: '', // @todo merge test.
		// headless: false,
		selectorPath: false, // @todo merge what was this?
		// shadowComponents: '',
		// autoDetectShadowComponents: false,

		// Annotations.
		// showGoodImageButton: false,
		// showGoodLinkButton: false,
		// dismissAnnotations: true,
		// dismissAll: true,
		ignoreHiddenOverflow: '', // @todo merge do we need to add this Sa11y feature? "Modifies the annotation's parent container with overflow: hidden, making it visible and scrollable so content authors can access it."
		// insertAnnotationBefore: '',

		// Readability
		readabilityPlugin: false,
		// readabilityRoot: 'body',
		// readabilityIgnore: '',

		// Contrast
		contrastPlugin: false,
		// contrastAAA: false,
		// contrastAPCA: false,

		// Other plugins
		customChecks: false, // @todo merge migrate in embed check?
		// linksAdvancedPlugin: true,
		formLabelsPlugin: true, // @todo merge CMS turn off when editing.
		// embeddedContentPlugin: true,
		developerPlugin: false,
		// externalDeveloperChecks: false,
		colourFilterPlugin: false,
		// exportResultsPlugin: false,

		// Shared properties for some checks
		// susAltStopWords: '', // @todo merge I have some extras.
		// linkStopWords: '',
		extraPlaceholderStopWords: '',
		// imageWithinLightbox: '',

		/**
		* Editoria11y only =============== */

		// Provide list of test keys; get from localization file or results object.
		// @todo merge CMS provide translation layer or document change.
		// ignoreTests: false, //e.g. ['linkNewWindow', 'textUppercase']

		// Ignore Aria on these elements (Gutenberg labels headings while editing.)
		// @todo merge discuss these additions to the accessible name computation.
		ignoreAriaOnElements: false, // e.g. 'h1,h2,h3,h4,h5,h6'
		ignoreTextInElements: false, // e.g. '.inner-node-hidden-in-CSS'

    // Disable tests on specific elements
    // Include and modify this entire object in your call
		// @todo merge test and/or reimplement.
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

    // Disable the "is this element visible" check on themes that have 0-height elements.
    checkVisible: true,

    // Selector list for elements where the tip opening JS should wait for your theme to modify the DOM or CSS before opening the tip.
    hiddenHandlers: '',

    panelOffsetX: '25px',
    panelOffsetY: '25px',
    panelNoCover: '', // select other buttons to avoid.
    panelAttachTo: document.body,

    // Selector list for elements that hide overflow, truncating buttons.
    constrainButtons: false,

    // Interface
    lang: 'en', // @todo merge drop after migrating to Lang_..
    langSanitizes: false, // @todo merge drop after migrating to Lang_.
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
    embeddedContent: false, // @todo merge remove.
    embeddedContentTitle: '', // @todo merge remove.
    embeddedContentMessage: '', // @todo merge remove.

    linksUrls: false, // get from language pack
    linksMeaningless: false, // get from language pack
    altPlaceholder: false, // WP uses 'This image has an empty alt attribute; it's filename is etc.jpg'

    editLinks: false, // Add links to edit content in tooltips.

    // @todo merge discuss: how to handle this functionality.
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
  };

  function preProcessOptions(options) {
    const sa11yDefaults = defaultOptions;
    ed11yDefaults = {
      ...sa11yDefaults,
      ...ed11yDefaults,
    };

    // @todo merge re-implement: these get destroyed in constants.js
    //ed11yDefaults.checks.QA_DOCUMENT.sources = 'a[href$=\'.pdf\'], a[href*=\'.pdf?\']'
    //ed11yDefaults.checks.EMBED_VIDEO.sources = 'video, [src*="youtube.com"], [src*="brightcove.com"], [src*="dailymotion.com"], [src*="panopto.com"], [src*="Video"], [src*="video"], [src*="vimeo.com"], [src*="watch"], [src*="wistia.com"], [src*="vidyard.com"], [src*=yuja.com]';

		/*
		* video, [src*="Video"], [src*="video"], [src*="watch"], [src*="youtube.com"], [src*="vimeo.com"], [src*="panopto.com"], [src*="wistia.com"], [src*="dailymotion.com"], [src*="brightcove.com"], [src*="vidyard.com"], [src*="video"], [src*="[src*="youtube.com"]"], [src*="[src*="brightcove.com"]"], [src*="[src*="dailymotion.com"]"], [src*="[src*="panopto.com"]"], [src*="[src*="Video"]"], [src*="[src*="video"]"], [src*="[src*="vimeo.com"]"], [src*="[src*="watch"]"], [src*="[src*="wistia.com"]"], [src*="[src*="vidyard.com"]"], [src*="[src*=yuja.com]"]
		* */

    options = {
      ...ed11yDefaults,
      ...options,
    };
    /*
    * Options translation
    * */
    options.headless = options.alertMode === 'headless'; // @todo merge test if needed.
    options.customChecks = options.customTests > 0 && !options.customChecks ? 'listen' : false; // @todo merge test.

    // Toggleable plugins
		// @todo merge test if these are lost on [...merge].
/*    options.developerPlugin = false;
    options.colourFilterPlugin = false;
    options.exportResultsPlugin = false;
    options.showImageOutline = false;*/

    // Check for document types.

    if (options.documentLinks) { // @todo merge needed?
      options.checks.QA_DOCUMENT.sources = options.documentLinks;
    }

    if (options.panelAttachTo) {
      State.panelAttachTo = options.panelAttachTo; // todo merge Is this implemented anywhere?
    }

    /* ********************** */
    /* Embedded Content Setup */
    /* ********************** */
    //Constants.Global.AllEmbeddedContent = `${Constants.Global.VideoSources}, ${Constants.Global.AudioSources}, ${Constants.Global.VisualizationSources}`;
    // @todo merge: this means custom embeds needs to be converted to a custom test in the build.

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
      // @todo merge possibly lost some preload functionality.
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

  function postProcessOptions(option) {
    // @todo merge: test: does this need descendant selector?
    Constants.Exclusions.Sa11yElements = ['.ed11y-element'];

		State.english = Lang.langStrings.LANG_CODE.startsWith('en');

    // Main container exclusions.
    console.log('Constants: ')
    console.log(Constants);

    // Undo Sa11y overrides in constants.js.
    //Constants.Global.documentSources = option.checks.QA_DOCUMENT.sources;
    //Constants.Global.videoSources = option.checks.EMBED_VIDEO.sources;
    //Constants.Global.AudioSources = option.checks.EMBED_AUDIO.sources;
    //Constants.Global.dataVizSources = option.checks.EMBED_DATA_VIZ.sources;
    //Constants.Global.AllEmbeddedContent = `${Constants.Global.VideoSources}, ${Constants.Global.AudioSources}, ${Constants.Global.VisualizationSources}`;

    State.currentPage = options.currentPage ? options.currentPage : window.location.currentPage;

    Object.assign(Theme, State.options[State.options.theme]);
    Theme.baseFontSize = State.options.baseFontSize;
    Theme.buttonZIndex = State.options.buttonZIndex;
    Theme.baseFontFamily = State.options.baseFontFamily;

    // @todo merge this might be getting provided by Sa11y
    if (State.options.currentPage === false) {
      State.options.currentPage = window.location.pathname;
    }

    if (!State.options.linkStringsNewWindows) {
      State.options.linkStringsNewWindows = M.linkStringsNewWindows;
    }
    // @todo merge CMS remove wpadminbar from defaults and update wp module.
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
