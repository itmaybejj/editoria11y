export const Options = {

	checkRoots: false, // @todo CMS merge implement whatever syntax Sa11y releases.
	fixedRoots: false, // Array of specific nodes, overrides previous.
	ignoreElements: '',

	ignoreAriaOnElements: false, // e.g. 'h1,h2,h3,h4,h5,h6'
	ignoreTextInElements: false, // e.g. '.inner-node-hidden-in-CSS'

	// Include and modify this entire object in your call
	// @todo merge test and/or reimplement.
	headingsOnlyFromCheckRoots: false, // Whether the Headings panel shows all headings on page or only from checked content.

	// Set alertModes:
	// 'headless': do not draw interface
	// 'userPreference: respect user preference.
	// 'polite': open for new issues.
	// 'assertive': open for any issues.
	// 'active': always open.
	// CMS integrations can switch between polite & headless at runtime.
	alertMode: 'userPreference',
	inlineAlerts: true,
	watchForChanges: 'checkRoots', // 'document', false, 'checkRoots';

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
	ignoreAllIfPresent: false, // @todo CMS merge dismissal system.

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
	embeddedContent: false, // @todo merge replace with custom test.
	embeddedContentTitle: '',
	embeddedContentMessage: '',

	linksUrls: false, // get from language pack
	linksMeaningless: false, // get from language pack
	altPlaceholder: '', // WP uses 'This image has an empty alt attribute; it's filename is etc.jpg'

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

	// Target area to check
	checkRoot: 'body',

	// Exclusions
	containerIgnore: '',
	contrastIgnore: '.sr-only',
	outlineIgnore: '',
	headerIgnore: '',
	headerIgnoreSpan: 'ed11y-element-heading-label',
	headerIgnoreStrings: '',
	imageIgnore: 'img[aria-hidden], [aria-hidden] img, ' +
		'img[role="presentation"], ' +
		'a[href][aria-label] img, button[aria-label] img, ' +
		'a[href][aria-labelledby] img, button[aria-labelledby] img',
	linkIgnore: '[aria-hidden][tabindex="-1"]',
	linkIgnoreSpan: '.ed11y-element',
	linkIgnoreStrings: '',

	// Control panel settings
	aboutContent: '',
	panelPosition: 'right',
	showMovePanelToggle: true,
	checkAllHideToggles: false,
	developerChecksOnByDefault: false,

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
	readabilityRoot: 'body',
	readabilityIgnore: '',

	// Contrast
	contrastPlugin: false,
	contrastAAA: false,
	contrastAPCA: false,

	// Other plugins
	customChecks: false, // @todo CMS merge test this functionality.
	linksAdvancedPlugin: true,
	formLabelsPlugin: true, // @todo CMS merge turn off when editing.
	embeddedContentPlugin: true,
	developerPlugin: false,
	externalDeveloperChecks: false,
	colourFilterPlugin: false,
	exportResultsPlugin: false,

	// Shared properties for some checks
	susAltStopWords: '',
	linkStopWords: '',
	extraPlaceholderStopWords: '',
	imageWithinLightbox: '',

	checks: {
		// Sa11y: Heading checks
		HEADING_SKIPPED_LEVEL: true,
		HEADING_EMPTY_WITH_IMAGE: true,
		HEADING_EMPTY: true,
		HEADING_FIRST: true, // @todo CMS migrate to this from the complicated setters.
		HEADING_LONG: {
			maxLength: 170,
		},
		HEADING_MISSING_ONE: false,

		// Sa11y: Image checks
		MISSING_ALT_LINK: true,
		MISSING_ALT_LINK_HAS_TEXT: true,
		MISSING_ALT: true,
		IMAGE_DECORATIVE_CAROUSEL: {
			sources: '.carousel',
		},
		LINK_IMAGE_NO_ALT_TEXT: true,
		LINK_IMAGE_TEXT: true,
		IMAGE_FIGURE_DECORATIVE: true,
		IMAGE_DECORATIVE: true,
		LINK_ALT_FILE_EXT: true,
		ALT_FILE_EXT: true,
		LINK_PLACEHOLDER_ALT: true,
		ALT_PLACEHOLDER: true,
		LINK_SUS_ALT: true,
		SUS_ALT: true,
		LINK_IMAGE_LONG_ALT: {
			maxLength: 250,
		},
		IMAGE_ALT_TOO_LONG: {
			maxLength: 250,
		},
		LINK_IMAGE_ALT: {
			dismissAll: true,
		},
		LINK_IMAGE_ALT_AND_TEXT: true,
		IMAGE_FIGURE_DUPLICATE_ALT: true,
		IMAGE_PASS: {
			dismissAll: true,
		},
		ALT_UNPRONOUNCEABLE: true,
		LINK_ALT_UNPRONOUNCEABLE: true,
		ALT_MAYBE_BAD: {
			minLength: 15,
		},
		LINK_ALT_MAYBE_BAD: {
			minLength: 15,
		},

		// Sa11y: Link checks
		DUPLICATE_TITLE: false,
		LINK_EMPTY_LABELLEDBY: true,
		LINK_EMPTY_NO_LABEL: true,
		LINK_STOPWORD: true,
		LINK_STOPWORD_ARIA: true,
		LINK_SYMBOLS: true,
		LINK_CLICK_HERE: false,
		LINK_DOI: false,
		LINK_URL: {
			maxLength: 40,
		},
		LINK_LABEL: {
			dismissAll: true,
		},
		LINK_EMPTY: true,
		LINK_IDENTICAL_NAME: false,
		LINK_NEW_TAB: {
			dismissAll: true,
		},
		LINK_FILE_EXT: true,

		// Sa11y: Form labels checks
		LABELS_MISSING_IMAGE_INPUT: true,
		LABELS_INPUT_RESET: true,
		LABELS_MISSING_LABEL: true,
		LABELS_ARIA_LABEL_INPUT: true,
		LABELS_NO_FOR_ATTRIBUTE: true,
		LABELS_PLACEHOLDER: true,

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
		EMBED_MISSING_TITLE: true,
		EMBED_GENERAL: true,

		// Quality assurance checks
		QA_BAD_LINK: {
			sources: '',
		},
		QA_STRONG_ITALICS: false,
		QA_IN_PAGE_LINK: false,
		QA_DOCUMENT: {
			sources: 'a[href$=\'.pdf\'], a[href*=\'.pdf?\']',
			dismissAll: true,
		},
		QA_PDF: {
			dismissAll: true,
		},
		QA_BLOCKQUOTE: true,
		TABLES_MISSING_HEADINGS: true,
		TABLES_SEMANTIC_HEADING: true,
		TABLES_EMPTY_HEADING: true,
		QA_FAKE_HEADING: true,
		QA_FAKE_LIST: true,
		QA_UPPERCASE: true,
		QA_UNDERLINE: false,
		QA_SUBSCRIPT: false,
		QA_NESTED_COMPONENTS: {
			sources: '',
		},
		QA_JUSTIFY: false,
		QA_SMALL_TEXT: false,

		// Sa11y: Meta checks
		META_LANG: false,
		META_SCALABLE: false,
		META_MAX: false,
		META_REFRESH: false,

		// Sa11y: Developer checks
		DUPLICATE_ID: false,
		META_TITLE: false,
		UNCONTAINED_LI: false,
		TABINDEX_ATTR: true,
		HIDDEN_FOCUSABLE: true,
		LABEL_IN_NAME: true,
		BTN_EMPTY: true,
		BTN_EMPTY_LABELLEDBY: true,
		BTN_ROLE_IN_NAME: true,

		// Sa11y: Contrast checks
		CONTRAST_WARNING: {
			dismissAll: true,
		},
		CONTRAST_INPUT: true,
		CONTRAST_ERROR: true,
		CONTRAST_PLACEHOLDER: true,
		CONTRAST_PLACEHOLDER_UNSUPPORTED: true,
		CONTRAST_ERROR_GRAPHIC: true,
		CONTRAST_WARNING_GRAPHIC: {
			dismissAll: true,
		},
		CONTRAST_UNSUPPORTED: {
			dismissAll: true,
		},
	},
};
