import Elements from '../../sa11y-js/utils/elements';
import { buildElementList } from './utils';
import Constants from '../../sa11y-js/utils/constants';
import { dismissDigest } from '../../sa11y-js/utils/utils.js';
import { UI } from '../core/ui.js';
import { State } from '../../sa11y-js/core/state.js';

export function syncResults(results) {
  // Dispatch event.
  if (!UI.incremental) {
    window.setTimeout(() => {
      document.dispatchEvent(
        new CustomEvent('ed11yResults', {
          // @todo cms/document new detail
          detail: {
            results: results,
            incremental: UI.incremental,
          },
        }),
      );
    }, 0);
  }
}

const pushResult = async (i, inContent) => {
  if (!inContent) {
    // Dev only part of page is for devs only.
    UI.splitConfiguration.devResults[i].outsideContentRoots = true;
    // Separate dismissal key stack outside content area.
    UI.splitConfiguration.devResults[i].dismiss =
      `≈dev§${UI.splitConfiguration.devResults[i].dismiss}`;
    await checkDismissed(i, true);
    if (UI.splitConfiguration.showDev) {
      State.results.push(UI.splitConfiguration.devResults[i]);
    }
  } else if (UI.splitConfiguration.devChecks.has(UI.splitConfiguration.devResults[i].test)) {
    // DevOnly test is for devs only.
    await checkDismissed(i, true);
    if (UI.splitConfiguration.showDev) {
      State.results.push(UI.splitConfiguration.devResults[i]);
    }
  } else {
    // Content test, in content area, so it is for everyone.
    await checkDismissed(i, true);
    State.results.push(UI.splitConfiguration.devResults[i]);
  }
};

export async function handleSyncOnlyResults() {
  UI.splitConfiguration.devResults.length = 0;
  UI.splitConfiguration.devResults = Array.from(State.results);
  State.results.length = 0;
  await filterAlerts(true).then();

  Object.assign(State.option, UI.splitConfiguration.contentOptions);

  buildElementList(true);

  let everything = false;
  let headings = false;
  let images = false;
  let _excludedHeadings = false;
  let contrast = false;
  let links = false;

  for (let i = 0; i < UI.splitConfiguration.devResults.length; i++) {
    const result = UI.splitConfiguration.devResults[i];
    if (!result.element) {
      UI.splitConfiguration.devResults.splice(i, 1);
      continue;
    }
    if (!everything) {
      everything = new WeakSet(Elements.Found.Everything);
    }
    if (result.test.indexOf('HEADING') === 0) {
      if (!headings) {
        headings = new WeakSet(Elements.Found.Headings);
        _excludedHeadings = new WeakSet(Elements.Found.ExcludedHeadings);
      }
      await pushResult(i, headings.has(result.element));
      continue;
    }
    if (result.test.indexOf('CONTRAST') > -1) {
      if (!contrast) {
        contrast = new WeakSet(Elements.Found.Contrast);
      }
      await pushResult(i, contrast.has(result.element));
      continue;
    }
    if (result.element.matches('img')) {
      if (!images) {
        images = new WeakSet(Elements.Found.Images);
      }
      await pushResult(i, images.has(result.element));
      continue;
    }
    if (result.element.matches('a')) {
      links = new WeakSet(Elements.Found.Links);
      await pushResult(i, links.has(result.element));
      continue;
    }
    await pushResult(i, everything.has(result.element));
  }

  syncResults(UI.splitConfiguration.devResults);

  Object.assign(State.option, UI.splitConfiguration.devOptions);
  // @todo will this now lose checks?
}

export function countAlerts() {
  UI.dismissedCount = 0;
  UI.errorCount = 0;
  UI.warningCount = 0;
  UI.dismissedCount = 0;
  const insertBefore = 'a, button, input, iframe, [role="button"], [role="link"]';
  for (let i = State.results.length - 1; i >= 0; i--) {
    if (State.results[i].dismissalStatus) {
      UI.dismissedCount++;
    } else if (State.results[i].type === 'warning') {
      UI.warningCount++;
    } else {
      UI.errorCount++;
    }

    State.results[i].position = 'beforebegin';
    if (State.results[i].element.shadowRoot) {
      while (State.results[i].element.parentElement?.shadowRoot) {
        State.results[i].element = location.parentElement;
      }
    }
    if (
      State.option.insertAnnotationBefore &&
      State.results[i].element.closest(State.option.insertAnnotationBefore)
    ) {
      State.results[i].element = State.results[i].element.closest(
        State.option.insertAnnotationBefore,
      );
    } else if (State.results[i].element.closest(`${insertBefore}, img, svg`)) {
      State.results[i].element =
        State.results[i].element.closest(insertBefore) ?? State.results[i].element;
    } else if (
      State.results[i].element.matches(
        'p, strong, em, i, u, table, td, th, li, blockquote, h1, h2, h3, h4, h5, h6',
      )
    ) {
      State.results[i].position = 'afterbegin';
    }
  }
  UI.totalCount = UI.errorCount + UI.warningCount;
  if (UI.ignoreAll) {
    UI.dismissedCount = UI.totalCount + UI.dismissedCount;
    UI.errorCount = 0;
    UI.warningCount = 0;
    UI.totalCount = 0;
  } else if (UI.showDismissed) {
    UI.totalCount += UI.dismissedCount;
  }
}

const inDismissals = (result, i, splitConfiguration, digest) => {
  if (
    State.option.currentPage in UI.dismissedAlerts &&
    result.test in UI.dismissedAlerts[State.option.currentPage] &&
    digest in UI.dismissedAlerts[State.option.currentPage][result.test]
  ) {
    // Remove results[i] if it has been marked OK or ignored, increment dismissed match counter.
    if (splitConfiguration) {
      UI.splitConfiguration.devResults[i].dismissalStatus =
        UI.dismissedAlerts[State.option.currentPage][result.test][digest];
    } else {
      State.results[i].dismissalStatus =
        UI.dismissedAlerts[State.option.currentPage][result.test][digest];
    }
  }
};

export async function checkDismissed(i, splitConfiguration) {
  // @todo cms convert old keys.
  // @todo drop keys not found in a run to prevent object expansion.
  const result = splitConfiguration ? UI.splitConfiguration.devResults[i] : State.results[i];
  const digested = UI.dismissKeys[result.dismiss];
  if (digested) {
    if (splitConfiguration) {
      UI.splitConfiguration.devResults[i].dismiss = digested;
    } else {
      State.results[i].dismiss = digested;
    }
    inDismissals(result, i, splitConfiguration, digested);
  } else {
    await dismissDigest(State.option.pepper, result.dismiss).then((digest) => {
      UI.dismissKeys[result.dismiss] = digest;
      if (splitConfiguration) {
        UI.splitConfiguration.devResults[i].dismiss = digest;
      } else {
        State.results[i].dismiss = digest;
      }
      // Cache a copy.
      inDismissals(result, i, splitConfiguration, digest);
    });
  }
}

export async function filterAlerts(splitConfiguration) {
  // Review results array to remove dismissed or ignored items
  const results = splitConfiguration ? UI.splitConfiguration.devResults : State.results;

  if (!results.length) {
    return;
  }
  for (let i = results.length - 1; i >= 0; i--) {
    let splice = false;

    // todo postpone: we could remove active range from list if it is not in oldResults to prevent tagging while people are typing. But we'd have to walk the array. Expensive!
    /*if (UI.incremental && Ed11y.oldResults.length > 0) {
			// Don't flag new issues in the active range while people are typing.
		}*/
    const checkIgnored = State.option.ignoreByTest[results[i].test];
    if (checkIgnored && results[i].element.matches(checkIgnored)) {
      splice = true;
    } else if (results[i].test === 'READABILITY') {
      UI.readability = results[i];
      if (UI.visualizing) {
        const badge = Constants.Panel.readabilityInfo?.querySelector('.readability-score');
        if (badge) {
          const badgeClass =
            results[i].difficultyToken === 'GOOD'
              ? 'readability-score'
              : 'readability-score ed11y-warning';
          badge.setAttribute('class', badgeClass);
        }
      }
      splice = true;
    } else if (results[i].type === 'good') {
      splice = true;
    } else if (!results[i].element) {
      // Todo: figure out a better plan than sticking the alert on the first matched element.
      if (Elements.Found.Headings.length > 0) {
        if (splitConfiguration) {
          UI.splitConfiguration.devResults[i].element = Elements.Found.Everything[0];
          UI.splitConfiguration.devResults[i].outsideContentRoots = true;
        } else {
          State.results[i].element = Elements.Found.Everything[0];
        }
      }
    } else if (
      results[i].test === 'TABLES_EMPTY_HEADING' &&
      results[i].element.matches(':first-child')
    ) {
      results[i].type = 'warning';
    } else if (!splitConfiguration) {
      // Split config modifies key before checking.
      await checkDismissed(i, false);
    }
    if (splice) {
      if (splitConfiguration) {
        UI.splitConfiguration.devResults.splice(i, 1);
      } else {
        State.results.splice(i, 1);
      }
    }
  }
}
