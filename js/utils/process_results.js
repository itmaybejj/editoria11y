import {State} from './state';
import Elements from '../../sa11y/utils/elements';
import {Options} from './options';
import {buildElementList} from './utils';
import Constants from '../../sa11y/utils/constants';

export function syncResults(results) {
	// Dispatch event for synchronizers.
	if (!State.incremental) {
		// todo Sync Only results need dismissal filtering.
		window.setTimeout(function () {
			document.dispatchEvent(new CustomEvent('ed11yResults',  {
				// @todo cms document detail
				detail: {
					results: results,
					totalCount: State.totalCount,
				}
			}));
		}, 0);
	}
}

export function handleSyncOnlyResults() {

	State.splitConfiguration.results = processDismissedAlerts(State.splitConfiguration.results);

	Object.assign(Options, State.splitConfiguration.showOptions);

	syncResults(State.splitConfiguration.results);

	buildElementList(true);

	let everything = false;
	let headings = false;
	let images = false;
	let excludedHeadings = false;
	let contrast = false;
	let links = false;

	State.results = State.splitConfiguration.results.filter((result) => {
		if (!result.element) {
			return false;
		}
		console.log(State.splitConfiguration.checks);
		console.log(result.test, typeof result.test, State.splitConfiguration.checks.has(result.test));
		if (State.splitConfiguration.checks.has(result.test)) {
			return false;
		}
		if (result.test.indexOf('HEADING') > -1) {
			if (!headings) {
				headings = new WeakSet(Elements.Found.Headings);
				excludedHeadings = new WeakSet(Elements.Found.ExcludedHeadings)
			}
			return headings.has(result.element) && !excludedHeadings.has(result.element);
		}
		if (result.test.indexOf('CONTRAST') > -1) {
			if (!contrast) {
				contrast = new WeakSet(Elements.Found.Contrast);
			}
			return contrast.has(result.element);
		}
		if (result.element.matches('img')) {
			if (!images) {
				images = new WeakSet(Elements.Found.Images);
			}
			return images.has(result.element)
		}
		if (result.element.matches('a')) {
			links = new WeakSet(Elements.Found.Links);
			return links.has(result.element);
		}
		if (!everything) {
			everything = new WeakSet(Elements.Found.Everything);
		}
		return everything.has(result.element);
	})
}

export function countAlerts () {
	State.dismissedCount = 0;
	State.errorCount = 0;
	State.warningCount = 0;
	State.dismissedCount = 0;

	for (let i = State.results.length - 1; i >= 0; i--) {
		if (State.results[i].dismissalStatus) {
			State.dismissedCount++;
		} else if (State.results[i].type === 'warning') {
			State.warningCount++;
		} else {
			State.errorCount++;
		}

		let location = State.results[i].element;
		let interactive = location.closest('a, button, img, svg, input, iframe, [role="button"], [role="link"]');
		let canPositionInside = !interactive && location.closest('p, table, li, blockquote, h1, h2, h3, h4, h5, h6');

		// Todo limit afterBegin to P and TD such.
		if (State.results[i].element.shadowRoot) {
			while (location.parentElement && location.parentElement.shadowRoot) {
				location = location.parentElement;
			}
		} else if (!canPositionInside) {
			State.results[i].location = interactive ?? location;
			State.results[i].position = 'beforebegin';
		} else {
			State.results[i].location = location;
			State.results[i].position = 'afterbegin';
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

export function processDismissedAlerts (results) {

	// Review results array to remove dismissed or ignored items

	for (let i = results.length - 1; i >= 0; i--) {

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
			results.splice(i, 1);
		} else if (!results[i].type || results[i].type === 'good') {
			results.splice(i, 1);
		} else {
			// We run the user provided dismissal key through the text sanitization to support legacy data with special characters.
			if (Options.currentPage in State.dismissedAlerts
				&& results[i].test in State.dismissedAlerts[Options.currentPage]
				&& results[i].dismiss in State.dismissedAlerts[Options.currentPage][results[i].test]) {
				// Remove results[i] if it has been marked OK or ignored, increment dismissed match counter.
				results[i].dismissalStatus = true;
			}
		}
	}

	return results;
}
