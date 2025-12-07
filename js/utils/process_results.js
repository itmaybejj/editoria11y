import {Results, State} from './state';
import Elements from '../../sa11y/utils/elements';
import {Options} from './options';
import {buildElementList, smush} from './utils';
import Constants from '../../sa11y/utils/constants';

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

export function handleSyncOnlyResults() {

	State.splitConfiguration.results = filterAlerts(true);

	syncResults(State.splitConfiguration.results);

	buildElementList(true);

	let everything = false;
	let headings = false;
	let images = false;
	let excludedHeadings = false;
	let contrast = false;
	let links = false;

	for (let i = 0; i < State.splitConfiguration.results.length; i++) {
		let result = State.splitConfiguration.results[i];
		if (!result.element) {
			continue;
		}
		if (State.splitConfiguration.checks.has(result.test)) {
			// Synced but not shown.
			continue;
		}
		if (result.test.indexOf('HEADING') === 0) {
			if (!headings) {
				headings = new WeakSet(Elements.Found.Headings);
				excludedHeadings = new WeakSet(Elements.Found.ExcludedHeadings)
			}
			if (headings.has(result.element) && !excludedHeadings.has(result.element)) {
				Results.push(result);
			}
			continue;
		}
		if (result.test.indexOf('CONTRAST') > -1) {
			if (!contrast) {
				contrast = new WeakSet(Elements.Found.Contrast);
			}
			if (contrast.has(result.element)) {
				Results.push(result);
			}
			continue;
		}
		if (result.element.matches('img')) {
			if (!images) {
				images = new WeakSet(Elements.Found.Images);
			}
			if (images.has(result.element)) {
				Results.push(result);
			}
			continue;
		}
		if (result.element.matches('a')) {
			links = new WeakSet(Elements.Found.Links);
			if (links.has(result.element)) {
				Results.push(result);
			}
			continue;
		}
		if (!everything) {
			everything = new WeakSet(Elements.Found.Everything);
		}
		if (everything.has(result.element)) {
			Results.push(result);
		}
	}

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

export function filterAlerts (splitConfiguration) {
	// @todo next we can't return and assign results any more; pass string to here instead.

	// Review results array to remove dismissed or ignored items
	const results = splitConfiguration ? State.splitConfiguration.results : Results;

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
					State.splitConfiguration.results.element = Elements.Found.Everything[0];
				} else {
					Results[i].element = Elements.Found.Everything[0];
				}
			}
		} else if (!results[i].element || results[i].type === 'good') {
			splice = true;
		} else {
			// We run the user provided dismissal key through the text sanitization to support legacy data with special characters.
			if (Options.currentPage in State.dismissedAlerts
				&& results[i].test in State.dismissedAlerts[Options.currentPage]
				&& results[i].dismiss in State.dismissedAlerts[Options.currentPage][results[i].test]) {
				// Remove results[i] if it has been marked OK or ignored, increment dismissed match counter.
				if (splitConfiguration) {
					State.splitConfiguration.results[i].dismissalStatus = true;
				} else {
					Results[i].dismissalStatus = true;
				}
			}
		}
		if (splice) {
			if (splitConfiguration) {
				State.splitConfiguration.results.splice(i, 1);
			} else {
				Results.splice(i, 1);
			}
		}
	}

	return results;
}
