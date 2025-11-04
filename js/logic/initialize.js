import Constants from 'sa11y/src/js/utils/constants.js';
import {State, Theme, UI} from "../utils/state.js";
import {Lang} from "sa11y/src/js/sa11y.js";
import {Options} from "../utils/options.js";
import {documentLoadingCheck, store} from "sa11y/src/js/utils/utils.js";
import {checkRunPrevent} from "../utils/utils.js";
import {checkAll, continueCheck, windowResize} from "./interface.js";
import ed11yLang from "../lang/localization.js";
import {Ed11yElementAlt} from "../elements/ed11y-element-alt.js";
import {Ed11yElementResult} from "../elements/ed11y-element-result.js";
import {
	Ed11yElementHeadingLabel,
	Ed11yElementPanel
} from "../elements/ed11y-element-panel.js";
import {Ed11yElementTip} from "../elements/ed11y-element-tip.js";

function preProcessOptions(userOptions) {
	Object.assign(Options, userOptions);

	if (!userOptions.checkRoots) {
		Options.checkRoots = document.querySelector('main') !== null ? 'main' : 'body'; // needed or redundant?
	}

	/*
	* Options translation
	* */
	Options.headless = userOptions.alertMode === 'headless';
	Options.customChecks = userOptions.customTests > 0 && !userOptions.customChecks ? 'listen' : false; // @todo merge test.

	// Check for document types.
	if (userOptions.panelAttachTo) {
		State.panelAttachTo = userOptions.panelAttachTo;
	}

	/* ********************** */
	/* Embedded Content Setup */
	/* ********************** */
	//Constants.Global.AllEmbeddedContent = `${Constants.Global.VideoSources}, ${Constants.Global.AudioSources}, ${Constants.Global.VisualizationSources}`;
	// @todo merge: this means custom embeds needs to be converted to a custom test in the build.

	/* *********** */
	/* Theme setup */
	/* *********** */
	Theme.push = Options[Options.theme];
	Theme.baseFontSize = Options.baseFontSize;
	Theme.buttonZIndex = Options.buttonZIndex;
	Theme.baseFontFamily = Options.baseFontFamily;

	let cssUrls = [`https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${State.version}/dist/editoria11y.min.css`];
	if (!userOptions.cssUrls) {
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
}

export function postProcessOptions(userOptions) {
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

	State.currentPage = userOptions.currentPage ? userOptions.currentPage : window.location.currentPage;

	Object.assign(Theme, Options[Options.theme]);
	Theme.baseFontSize = Options.baseFontSize;
	Theme.buttonZIndex = Options.buttonZIndex;
	Theme.baseFontFamily = Options.baseFontFamily;

	if (Options.currentPage === false) {
		Options.currentPage = window.location.pathname;
	}


	if (!Options.linkStringsNewWindows) {
		Options.linkStringsNewWindows = Lang._('linkStringsNewWindows');
	}
	// @todo CMS merge remove wpadminbar from defaults and update wp module.
	/*Exclusions.Container = ['#wpadminbar', '#wpadminbar *', ...exclusions];
	if (option.containerIgnore) {
		const containerSelectors = option.containerIgnore.split(',').map((item) => item.trim());
		Exclusions.Container = Exclusions.Container.concat(
			containerSelectors.flatMap((item) => [`${item} *`, item]),
		);
	}*/

	// @todo merge re-implement: these get destroyed in constants.js
	//console.log( Options.documentLinks);
	//console.log(Constants.Global.checks.QA_DOCUMENT.sources);
	// Todo need to look at checks.QA_DOCUMENT.sources.
	if ( userOptions['documentLinks']) { // @todo merge needed?
		Constants.Global.documentSources = userOptions['documentLinks'] ?
			userOptions['documentLinks']
			: Options.checks.QA_DOCUMENT.sources;
	}
	console.log(Constants.Global.documentSources);
	//Constants.Global.documentSources = userOptions.

	//ed11yDefaults.checks.QA_DOCUMENT.sources = 'a[href$=\'.pdf\'], a[href*=\'.pdf?\']'
	//ed11yDefaults.checks.EMBED_VIDEO.sources = 'video, [src*="youtube.com"], [src*="brightcove.com"], [src*="dailymotion.com"], [src*="panopto.com"], [src*="Video"], [src*="video"], [src*="vimeo.com"], [src*="watch"], [src*="wistia.com"], [src*="vidyard.com"], [src*=yuja.com]';

	/*
	* video, [src*="Video"], [src*="video"], [src*="watch"], [src*="youtube.com"], [src*="vimeo.com"], [src*="panopto.com"], [src*="wistia.com"], [src*="dailymotion.com"], [src*="brightcove.com"], [src*="vidyard.com"], [src*="video"], [src*="[src*="youtube.com"]"], [src*="[src*="brightcove.com"]"], [src*="[src*="dailymotion.com"]"], [src*="[src*="panopto.com"]"], [src*="[src*="Video"]"], [src*="[src*="video"]"], [src*="[src*="vimeo.com"]"], [src*="[src*="watch"]"], [src*="[src*="wistia.com"]"], [src*="[src*="vidyard.com"]"], [src*="[src*=yuja.com]"]
	* */

	let localResultCount = store.getItem('editoria11yResultCount');
	State.seen = localResultCount && localResultCount !== 'undefined' ?
		JSON.parse(localResultCount) : {};

	// Build list of dismissed alerts
	if (Options.syncedDismissals === false) {
		State.dismissedAlerts = localStorage.getItem('ed11ydismissed');
		State.dismissedAlerts = State.dismissedAlerts ? JSON.parse(State.dismissedAlerts) : {};
	} else {
		State.dismissedAlerts = {};
		State.dismissedAlerts[Options.currentPage] = Options.syncedDismissals;
	}

	// Convert the container ignore user option to a CSS :not selector.
	// @todo merge get this from the global.
	State.ignore = Options.containerIgnore ? `:not(${Options.containerIgnore})` : '';

	console.log(Constants.Global.documentSources);
}

export function firstCheck (userOptions) {
	if (State.once) {
		console.error('double init');
		return;
	}
	State.once = true;

	// Initialize global constants and exclusions.
	preProcessOptions(userOptions);
	Constants.initializeRoot(Options.checkRoots, Options.checkRoots)
	Constants.initializeGlobal(Options);
	// Constants.initializeReadability(Options);
	Constants.initializeExclusions(Options);
	postProcessOptions(userOptions);
	customElements.define('ed11y-element-alt', Ed11yElementAlt);
	customElements.define('ed11y-element-result', Ed11yElementResult);
	customElements.define('ed11y-element-heading-label',
		Ed11yElementHeadingLabel);
	customElements.define('ed11y-element-panel', Ed11yElementPanel);
	customElements.define('ed11y-element-tip', Ed11yElementTip);

	// Once document has fully loaded.
	documentLoadingCheck(() => {
		if (checkRunPrevent()) {
			return false;
		}

		State.running = true;

		console.log('running')

		// Run tests
		checkAll();

		document.addEventListener('ed11yResume', function () {
			continueCheck(State.customTestsRemaining);
		});
		// Set up observers.
		// Todo only needed if we are watching for changes.
		window.addEventListener('keydown', () => {
			State.interaction = true;
		});
		window.addEventListener('click', () => {
			State.interaction = true;
		});
		window.addEventListener('resize', function () { windowResize(); });
		// Move toggles when something expands or collapses.
		const mightExpand = document.querySelectorAll('[aria-expanded], [aria-controls]');
		mightExpand?.forEach(expandable => {
			expandable.addEventListener('click', () => {
				window.setTimeout(() => {
					windowResize();
				}, 333);
			});
		});

	});
}


