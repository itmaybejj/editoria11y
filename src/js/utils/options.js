export const Options = {
  // Default options.

  // Sa11y properties =======================

  // Target area to check
  checkRoot: false, // Editoria11y uses "checkRoots" below.
  fixedRoots: false, // Array of specific nodes, overrides previous.

  // Exclusions
  containerIgnore: '',
  contrastIgnore: '.sr-only',
  outlineIgnore: '',
  headerIgnore: '',
  headerIgnoreSpan: 'ed11y-element-heading-label, .ed11y-wrapper',
  headerIgnoreStrings: '',
  imageIgnore:
    'img[aria-hidden], [aria-hidden] img, ' +
    'img[role="presentation"], ' +
    'a[href][aria-label] img, button[aria-label] img, ' +
    'a[href][aria-labelledby] img, button[aria-labelledby] img',
  linkIgnore: '[aria-hidden][tabindex="-1"]',
  linkIgnoreSpan: '.ed11y-element',
  linkIgnoreStrings: [], // @todo cms/documentation this changed to array
  ignoreContentOutsideRoots: false, // @todo cms/documentation was headingsOnlyFromCheckRoots

  // Control panel settings
  // aboutContent: '', // @todo implement?
  panelPosition: 'right', // @todo use?
  // showMovePanelToggle: true, // @todo implement?
  // checkAllHideToggles: false, // @todo implement?
  developerChecksOnByDefault: false, // @todo cms use?

  // Page outline
  showHinPageOutline: false,
  showTitleInPageOutline: false,

  // Image outline
  showImageOutline: true,
  editImageURLofCMS: '',
  relativePathImageSRC: '',
  relativePathImageID: '',
  ignoreEditImageURL: [],
  ignoreEditImageClass: [],

  // Other features
  delayCheck: 0,
  delayCustomCheck: 500,
  detectSPArouting: false,
  doNotRun: '',
  headless: false,
  selectorPath: false,
  shadowComponents: '',
  autoDetectShadowComponents: false,

  // Annotations
  showGoodImageButton: true,
  showGoodLinkButton: true,
  dismissAnnotations: true,
  dismissAll: true,
  ignoreHiddenOverflow: '',
  insertAnnotationBefore: '',

  // Readability
  readabilityPlugin: false,
  readabilityRoot: 'main',
  readabilityIgnore: '',

  // Contrast
  contrastPlugin: false,
  contrastAlgorithm: 'AA',

  // Other plugins
  customChecks: false,
  linksAdvancedPlugin: true,
  formLabelsPlugin: true,
  embeddedContentPlugin: true,
  developerPlugin: false, // @todo CMS enable following
  externalDeveloperChecks: false,
  colourFilterPlugin: false,
  exportResultsPlugin: false,

  // Options for accName computation: Ignore ARIA on these elements.
  ignoreAriaOnElements: false, // e.g. 'h1,h2,h3,h4,h5,h6'
  ignoreTextInElements: false, // e.g. '.inner-node-hidden-in-CSS'

  // Shared properties for some checks
  susAltStopWords: '',
  linkStopWords: '',
  extraPlaceholderStopWords: '',
  imageWithinLightbox: '',
  initialHeadingLevel: [],
  // @todo document change?
  // Sets previous heading level for contentEditable fields.
  // With 'ignore' set, first heading level is ignored in editable zones.
  // This is ideal for systems with separate backend editing pages.
  // Set to 'inherit' for fields edited in a frontend context.
  /*
	[
		{
			selector: '.example-inherit',
			previousHeading: 'inherit',
		},
		{
			selector: '.example-l3',
			previousHeading: 3,
		},
	],*/

  // Editoria11y Only ==============================
  // checkRoots: false, // todo document change
  // ignoreElements: '', // todo document change

  splitConfiguration: false,
  /*
	// List checks and config for reporting results not shown to editors.
	// If split configuration is set, the check and option keys must be present.
	syncOnlyConfiguration {
		checks: [], // Test keys defined below to not be display on page.

		options: {
			checkRoot: false,
			containerIgnore: '',
			contrastIgnore: '.sr-only',
			outlineIgnore: '',
			headerIgnore: '',
			imageIgnore: '',
			linkIgnore: '[aria-hidden][tabindex="-1"]',
		},
	}
	*/

  // Set alertModes:
  alertMode: 'userPreference',
  // 'headless': do not draw run
  // 'userPreference: respect user preference.
  // 'polite': open for new issues.
  // 'assertive': open for any issues.
  // 'active': always open.
  // CMS integrations can switch between polite & headless at runtime.
  inlineAlerts: true,
  watchForChanges: 'checkRoots', // 'document', false, 'checkRoots';

  // This covers CKEditor, TinyMCE and Gutenberg. Being less specific may help performance.
  editableContent:
    '[contenteditable="true"]:not(.gutenberg__editor [contenteditable]), .gutenberg__editor .run-run-skeleton__content',

  // Dismissed alerts
  currentPage: window.location.pathname,
  allowHide: true, // Enables end-user ignore button
  allowOK: true, // Enables end-user mark OK button
  syncedDismissals: false, // Provide empty or populated object {} to enable sync functions
  pepper: window.location.hostname, // Provide a string to seed hashes.
  reportsURL: false, // Provides a link to site-wide reports
  showDismissed: false, // start panel with dismissed items visible; used when coming directly from a dashboard

  // Hide all alerts if these elements are absent, e.g., ".edit-button"
  // Used to not heckle editors on pages they cannot fix; they can still click a "show hidden" button to check manually.
  ignoreAllIfAbsent: false,
  ignoreAllIfPresent: false, // @todo CMS test.

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
  theme: 'sleekTheme',
  sleekTheme: {
    bg: '#eff2ff',
    bgHighlight: '#7b1919',
    bgOutlines: '#276499',
    text: '#20160c',
    primary: '#276499',
    primaryText: '#eff2ff',
    button: 'transparent', // deprecate?
    panelBar: '#1e517c',
    panelBarText: '#fffdf7',
    panelBarShadow: '0 0 0 1px #276499',
    activeTab: '#276499',
    activeTabText: '#fffffe',
    focusRing: '#007aff',
    outlineWidth: '1px',
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
    bgOutlines: '#f4f7ff',
    text: '#f4f7ff',
    primary: '#cbd8f3', // '#3052a0',
    primaryText: '#00081d', // '#f4f7ff',
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
    bgOutlines: '#0a307a',
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
    outlineWidth: '0px',
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

  baseFontSize: 'clamp(14px, 1.6vw, 16px)',
  baseFontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',

  linksUrls: false, // get from language pack
  linksMeaningless: false, // get from language pack
  // @todo cms/document wp this was a string.
  altPlaceholder: [], // WP uses 'This image has an empty alt attribute; it's filename is etc.jpg'

  editLinks: false, // Add links to edit content in tooltips.

  userPrefersShut: localStorage.getItem('editoria11yShow') === '0',

  customTests: 0,

  // Sa11y checks ==================
  checks: {
    // Sa11y: Heading checks
    HEADING_SKIPPED_LEVEL: {
      type: 'warning',
    },
    HEADING_EMPTY_WITH_IMAGE: true,
    HEADING_EMPTY: true,
    HEADING_FIRST: true, // @todo CMS
    HEADING_LONG: {
      maxLength: 170,
    },
    HEADING_MISSING_ONE: false,

    // Sa11y: Image checks
    MISSING_ALT_LINK: true,
    MISSING_ALT_LINK_HAS_TEXT: true,
    MISSING_ALT: true,
    IMAGE_DECORATIVE_CAROUSEL: false, // Todo consider.
    LINK_IMAGE_NO_ALT_TEXT: {
      type: 'error',
    },
    LINK_IMAGE_TEXT: false, // Not interested.
    IMAGE_FIGURE_DECORATIVE: {
      type: 'warning',
    }, // New
    IMAGE_DECORATIVE: {
      type: 'warning',
    },
    LINK_ALT_FILE_EXT: true,
    ALT_FILE_EXT: true,
    LINK_PLACEHOLDER_ALT: true,
    ALT_PLACEHOLDER: true,
    LINK_SUS_ALT: true,
    SUS_ALT: true,
    LINK_IMAGE_LONG_ALT: {
      maxLength: 160,
    },
    IMAGE_ALT_TOO_LONG: {
      maxLength: 160,
    },
    LINK_IMAGE_ALT: false, // Not interested.
    LINK_IMAGE_ALT_AND_TEXT: true,
    IMAGE_FIGURE_DUPLICATE_ALT: true,
    IMAGE_PASS: false, // Could be used to visualize alt content.
    ALT_UNPRONOUNCEABLE: true,
    LINK_ALT_UNPRONOUNCEABLE: true,
    ALT_MAYBE_BAD: {
      minLength: 15,
    },
    LINK_ALT_MAYBE_BAD: {
      minLength: 15,
    },

    // Sa11y: Link checks
    DUPLICATE_TITLE: false, // Todo pro.
    LINK_EMPTY_LABELLEDBY: false, // Todo pro.
    LINK_EMPTY_NO_LABEL: true,
    LINK_STOPWORD: {
      type: 'warning',
    },
    LINK_STOPWORD_ARIA: false, // Todo pro.
    LINK_SYMBOLS: true,
    LINK_CLICK_HERE: false,
    LINK_DOI: true, // Todo consider.
    LINK_URL: {
      maxLength: 40,
    },
    LINK_LABEL: {
      dismissAll: true,
    },
    LINK_EMPTY: true,
    LINK_IDENTICAL_NAME: false, // Todo pro.
    LINK_NEW_TAB: {
      dismissAll: true,
    },
    LINK_FILE_EXT: false, // Todo test vs LinkPurpose.

    // Form label checks module not yet enabled.
    // Todo pro.
    LABELS_MISSING_IMAGE_INPUT: false,
    LABELS_INPUT_RESET: false,
    LABELS_MISSING_LABEL: false,
    LABELS_ARIA_LABEL_INPUT: false,
    LABELS_NO_FOR_ATTRIBUTE: false,
    LABELS_PLACEHOLDER: false,

    // Embedded content checks
    EMBED_AUDIO: {
      sources: '',
    },
    EMBED_VIDEO: {
      sources: '',
    },
    EMBED_DATA_VIZ: {
      sources: '',
    },
    EMBED_UNFOCUSABLE: true,
    EMBED_MISSING_TITLE: {
      type: 'warning',
    },
    EMBED_GENERAL: true,

    // Quality assurance checks
    QA_BAD_LINK: {
      sources: '',
    },
    QA_STRONG_ITALICS: true,
    QA_IN_PAGE_LINK: true,
    QA_DOCUMENT: false, // Todo CMS consider.
    QA_PDF: {
      sources: "a[href$='.pdf'], a[href*='.pdf?']",
      dismissAll: true,
    },
    QA_BLOCKQUOTE: true,
    TABLES_MISSING_HEADINGS: true,
    TABLES_SEMANTIC_HEADING: true,
    TABLES_EMPTY_HEADING: true,
    QA_FAKE_HEADING: true,
    QA_FAKE_LIST: true,
    QA_UPPERCASE: true,
    QA_UNDERLINE: true,
    QA_SUBSCRIPT: true,
    QA_NESTED_COMPONENTS: false, // Todo pro.
    QA_JUSTIFY: true, // Todo pro.
    QA_SMALL_TEXT: false, // Todo pro.

    // Sa11y: Meta checks
    META_LANG: false, // Todo pro.
    META_SCALABLE: false, // Not interested.
    META_MAX: false, // Not interested.
    META_REFRESH: false, // Todo pro.

    // Sa11y: Developer checks
    // Todo pro.
    DUPLICATE_ID: false,
    META_TITLE: false,
    UNCONTAINED_LI: false,
    TABINDEX_ATTR: false,
    HIDDEN_FOCUSABLE: false,
    LABEL_IN_NAME: false,
    BTN_EMPTY: false,
    BTN_EMPTY_LABELLEDBY: false,
    BTN_ROLE_IN_NAME: false,

    // Sa11y: Contrast checks
    // Todo pro.
    CONTRAST_WARNING: false, // dismissAll
    CONTRAST_INPUT: false,
    CONTRAST_ERROR: false,
    CONTRAST_PLACEHOLDER: false,
    CONTRAST_PLACEHOLDER_UNSUPPORTED: false, // Show error on unsupported color spaces.
    CONTRAST_ERROR_GRAPHIC: false,
    CONTRAST_WARNING_GRAPHIC: false, // Don't enable.
    CONTRAST_UNSUPPORTED: false, // Show error on unsupported color spaces.

    // @todo remove from CMS and deprecate.
    // EMBED_CUSTOM: { sources: '#embed', },
  },
};
