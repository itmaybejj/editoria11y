import Constants from '../../sa11y/utils/constants.js';
import {State, Theme, UI} from "../utils/state.js";
import Lang from "../../sa11y/utils/lang.js";
import {Options} from "../utils/options.js";
import {documentLoadingCheck, store} from "../../sa11y/utils/utils.js";
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

const preProcessOptions = function(userOptions) {
	Object.assign(Options, userOptions);

	if (!userOptions.checkRoots) {
		Options.checkRoots = document.querySelector('main') !== null ? 'main' : 'body'; // needed or redundant?
	}

	/*
	* Options translation
	* */
	Options.headless = userOptions.alertMode === 'headless';

	// Check for document types.
	if (userOptions.panelAttachTo) {
		State.panelAttachTo = userOptions.panelAttachTo;
	}

	/* *********** */
	/* Theme setup */
	/* *********** */
	Theme.push = Options[Options.theme];
	Theme.baseFontSize = Options.baseFontSize;
	Theme.buttonZIndex = Options.buttonZIndex;
	Theme.baseFontFamily = Options.baseFontFamily;
	State.inlineAlerts = Options.inlineAlerts;
	State.showDismissed = Options.showDismissed;

	if (userOptions.linkIgnoreSelector && !userOptions.linkIgnoreSpan) {
		Options.linkIgnoreSpan = userOptions.linkIgnoreSelector;
	}

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
		// @todo after merge possibly lost some preload functionality.
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

const postProcessOptions = function(userOptions) {

	// Override Sa11y's exclusion settings.

	// This is separate because sometimes that's what we are looking for.
	Constants.Exclusions.Sa11yElements = ['.ed11y-element', 'ed11y-element-heading-label'];

	Constants.Exclusions.Container = ['style', 'script', 'noscript'];
	if (Options.containerIgnore) {
		const containerSelectors = Options.containerIgnore.split(',').map((item) => item.trim());
		Constants.Exclusions.Container = Constants.Exclusions.Container.concat(
			containerSelectors.flatMap((item) => [`${item} *`, item]),
		);
	}
	if (Options.ignoreElements) {
		const elementSelectors = Options.ignoreElements.split(',').map((item) => item.trim());
		Constants.Exclusions.Container = Constants.Exclusions.Container.concat(elementSelectors);
	}

	State.english = Lang.langStrings.LANG_CODE.startsWith('en');

	Object.assign(Theme, Options[Options.theme]);
	Theme.baseFontSize = Options.baseFontSize;
	Theme.buttonZIndex = Options.buttonZIndex;
	Theme.baseFontFamily = Options.baseFontFamily;

	if (!Options.linkStringsNewWindows) {
		Options.linkStringsNewWindows = Lang._('linkStringsNewWindows');
	}

	if ( userOptions['documentLinks']) {
		Constants.Global.documentSources = userOptions['documentLinks'];
	}

	Object.assign(Lang.langStrings, ed11yLang.strings);
	if (Lang.langStrings.LANG_CODE.startsWith('en')) {
		// todo CMS merge also include as fallbacks untranslated strings.
		let oldTitle = '';
		const overrides = Object.entries(ed11yLang.tests);
		for(let i = 0; i < overrides.length; i++) {
			if (typeof overrides[i][1] === 'object') {
				oldTitle = overrides[i][1]['title'];
			} else {
				Lang.langStrings[overrides[i][0]] = `<div class="title" tabindex="-1"><div class="ed11y-tip-alert"></div>${oldTitle}</div>${overrides[i][1]}`
			}
		}
	}

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

}

export function initialize (userOptions) {
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

		// Run tests
		checkAll();

		document.addEventListener('ed11yResume', function () {
			continueCheck(true);
		});
		// Set up observers.
		// Todo only needed if we are watching for changes.
		window.addEventListener('keydown', () => {
			State.interaction = true;
		}, {
			passive: true,
		});
		window.addEventListener('click', () => {
			State.interaction = true;
		}, {
			passive: true,
		});
		window.addEventListener('resize', function () { windowResize(); }, {
			passive: true,
		});
		// Move toggles when something expands or collapses.
		const mightExpand = document.querySelectorAll('[aria-expanded], [aria-controls]');
		mightExpand?.forEach(expandable => {
			expandable.addEventListener('click', () => {
				window.setTimeout(() => {
					windowResize();
				}, 333);
			}, {
				passive: true,
			});
		});

	});
}


