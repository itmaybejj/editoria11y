import {Results, State, UI} from './state';
import Elements from '../../sa11y/utils/elements';
import {Options} from './options';
import {buildElementList, panelLabel} from './utils';
import Constants from '../../sa11y/utils/constants';
import {showHeadingsPanel} from '../logic/visualize';

export function syncResults(results) {
	// Dispatch event for synchronizers.
	if (!State.incremental) {
		window.setTimeout(function () {
			document.dispatchEvent(new CustomEvent('ed11yResults',  {
				// @todo cms document detail
				detail: {
					results: results,
					incremental: State.incremental,
				}
			}));
		}, 0);
	}
}

const pushResult = function(i, inContent) {
	if (!inContent) {
		// Dev only part of page is for devs only.
		State.splitConfiguration.devResults[i].outsideContentRoots = true;
		// Prepend to dismissal key
		State.splitConfiguration.devResults[i].dismiss = `≈dev§${State.splitConfiguration.devResults[i].dismiss}`;
		checkDismissed(i, true);
		if (State.splitConfiguration.showDev) {
			Results.push(State.splitConfiguration.devResults[i]);
		}
	} else if (State.splitConfiguration.devChecks.has(State.splitConfiguration.devResults[i].test)) {
		// DevOnly test is for devs only.
		if (State.splitConfiguration.showDev) {
			Results.push(State.splitConfiguration.devResults[i]);
		}
	} else {
		// Content test in content area is for everyone.
		Results.push(State.splitConfiguration.devResults[i]);
	}
}

export function handleSyncOnlyResults() {

	State.splitConfiguration.devResults = filterAlerts(true);

	Object.assign(Options, State.splitConfiguration.contentOptions);

	buildElementList(true);

	let everything = false;
	let headings = false;
	let images = false;
	let excludedHeadings = false;
	let contrast = false;
	let links = false;

	for (let i = 0; i < State.splitConfiguration.devResults.length; i++) {
		let result = State.splitConfiguration.devResults[i];
		if (!result.element) {
			State.splitConfiguration.devResults.splice(i, 1);
			continue;
		}
		if (!everything) {
			everything = new WeakSet(Elements.Found.Everything);
		}
		if (result.test.indexOf('HEADING') === 0) {
			if (!headings) {
				headings = new WeakSet(Elements.Found.Headings);
				excludedHeadings = new WeakSet(Elements.Found.ExcludedHeadings)
			}
			pushResult(i, headings.has(result.element) && !excludedHeadings.has(result.element));
			continue;
		}
		if (result.test.indexOf('CONTRAST') > -1) {
			if (!contrast) {
				contrast = new WeakSet(Elements.Found.Contrast);
			}
			pushResult(i, contrast.has(result.element));
			continue;
		}
		if (result.element.matches('img')) {
			if (!images) {
				images = new WeakSet(Elements.Found.Images);
			}
			pushResult(i, images.has(result.element));
			continue;
		}
		if (result.element.matches('a')) {
			links = new WeakSet(Elements.Found.Links);
			pushResult(i, links.has(result.element));
			continue;
		}
		pushResult(i, everything.has(result.element));
	}

	syncResults(State.splitConfiguration.devResults);

	Object.assign(Options, State.splitConfiguration.devOptions);

}

export function countAlerts () {
	State.dismissedCount = 0;
	State.errorCount = 0;
	State.warningCount = 0;
	State.dismissedCount = 0;

	for (let i = Results.length - 1; i >= 0; i--) {
		if (Results[i].dismissalStatus) {
			State.dismissedCount++;
		} else if (Results[i].type === 'warning') {
			State.warningCount++;
		} else {
			State.errorCount++;
		}

		let location = Results[i].element;
		let interactive = function(location) {
			return location.closest('a, button, img, svg, input, iframe, [role="button"], [role="link"]');
		};
		let canPositionInside = function(location) {
			return !interactive(location) && location.closest('p, table, li, blockquote, h1, h2, h3, h4, h5, h6');
		};

		// Todo limit afterBegin to P and TD such.
		if (Results[i].element.shadowRoot) {
			while (location.parentElement && location.parentElement.shadowRoot) {
				location = location.parentElement;
			}
		}
		if (!canPositionInside(location)) {
			Results[i].location = interactive(location) ?? location;
			Results[i].position = 'beforebegin';
		} else {
			Results[i].location = location;
			Results[i].position = 'afterbegin';
		}
	}
	State.totalCount = State.errorCount + State.warningCount;
	if (State.ignoreAll) {
		State.dismissedCount = State.totalCount + State.dismissedCount;
		State.errorCount = 0;
		State.warningCount = 0;
		State.totalCount = 0;
	}
}

export function checkDismissed(i, splitConfiguration) {
	const result = splitConfiguration ? State.splitConfiguration.devResults[i] : Results[i];
	if (Options.currentPage in State.dismissedAlerts
		&& result.test in State.dismissedAlerts[Options.currentPage]
		&& result.dismiss in State.dismissedAlerts[Options.currentPage][result.test]) {
		// Remove results[i] if it has been marked OK or ignored, increment dismissed match counter.
		if (splitConfiguration) {
			State.splitConfiguration.devResults[i].dismissalStatus = State.dismissedAlerts[Options.currentPage][result.test][result.dismiss];
		} else {
			Results.dismissalStatus = State.dismissedAlerts[Options.currentPage][result.test][result.dismiss];
		}
	}
}

export function filterAlerts (splitConfiguration) {
	// @todo next we can't return and assign results any more; pass string to here instead.

	// Review results array to remove dismissed or ignored items
	const results = splitConfiguration ? State.splitConfiguration.devResults : Results;

	for (let i = results.length - 1; i >= 0; i--) {
		let splice = false;

		/*
		if (Options.ignoreTests &&
			Options.ignoreTests.includes(test)) {
			// Would be faster to skip test, but this is easy and reliable.
			results.splice(i, 1);
			continue;
		}*/
		// todo postpone: we could remove active range from list if it is not in oldResults to prevent tagging while people are typing. But we'd have to walk the array. Expensive!
		/*if (State.incremental && Ed11y.oldResults.length > 0) {
			// Don't flag new issues in the active range while people are typing.
		}*/
		if (results[i].test === 'READABILITY') {
			State.readability = results[i];
			if (State.visualizing) {
				const badge = Constants.Panel.readabilityInfo?.querySelector('.readability-score');
				if (badge) {
					const badgeClass = results[i].difficultyToken === 'GOOD' ? 'readability-score' : 'readability-score ed11y-warning';
					badge.setAttribute('class', badgeClass);
				}
			}
			splice = true;
		} else if (results[i].test === 'META_TITLE') {
			if (Elements.Found.Headings.length > 0) {
				if (splitConfiguration) {
					State.splitConfiguration.devResults.element = Elements.Found.Everything[0];
				} else {
					Results[i].element = Elements.Found.Everything[0];
				}
			}
		} else if (!results[i].element || results[i].type === 'good') {
			splice = true;
		} else if (!splitConfiguration) {
			// Split config modifies key before checking.
			checkDismissed(i);
		}
		if (splice) {
			if (splitConfiguration) {
				State.splitConfiguration.devResults.splice(i, 1);
			} else {
				Results.splice(i, 1);
			}
		}
	}

	return results;
}
