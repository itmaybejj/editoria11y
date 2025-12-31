import { Results, State } from './state';
import Elements from '../../sa11y/utils/elements';
import { Options } from './options';
import { buildElementList, dismissDigest } from './utils';
import Constants from '../../sa11y/utils/constants';

export function syncResults(results) {
  // Dispatch event for synchronizers.
  if (!State.incremental) {
    window.setTimeout(() => {
      document.dispatchEvent(
        new CustomEvent('ed11yResults', {
          // @todo cms document detail
          detail: {
            results: results,
            incremental: State.incremental,
          },
        }),
      );
    }, 0);
  }
}

const pushResult = async (i, inContent) => {
  if (!inContent) {
    // Dev only part of page is for devs only.
    State.splitConfiguration.devResults[i].outsideContentRoots = true;
    // Separate dismissal key stack outside content area.
    State.splitConfiguration.devResults[i].dismiss =
      `≈dev§${State.splitConfiguration.devResults[i].dismiss}`;
    await checkDismissed(i, true);
    if (State.splitConfiguration.showDev) {
      Results.push(State.splitConfiguration.devResults[i]);
    }
  } else if (State.splitConfiguration.devChecks.has(State.splitConfiguration.devResults[i].test)) {
    // DevOnly test is for devs only.
    await checkDismissed(i, true);
    if (State.splitConfiguration.showDev) {
      Results.push(State.splitConfiguration.devResults[i]);
    }
  } else {
    // Content test, in content area, so it is for everyone.
    await checkDismissed(i, true);
    Results.push(State.splitConfiguration.devResults[i]);
  }
};

export async function handleSyncOnlyResults() {
  await filterAlerts(true).then((results) => {
    State.splitConfiguration.devResults = results;
  });

  Object.assign(Options, State.splitConfiguration.contentOptions);

  buildElementList(true);

  let everything = false;
  let headings = false;
  let images = false;
  let _excludedHeadings = false;
  let contrast = false;
  let links = false;

  for (let i = 0; i < State.splitConfiguration.devResults.length; i++) {
    const result = State.splitConfiguration.devResults[i];
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

  syncResults(State.splitConfiguration.devResults);

  Object.assign(Options, State.splitConfiguration.devOptions);
}

export function countAlerts() {
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
    const interactive = (location) =>
      location.closest('a, button, img, svg, input, iframe, [role="button"], [role="link"]');
    const canPositionInside = (location) =>
      !interactive(location) &&
      location.closest('p, table, li, blockquote, h1, h2, h3, h4, h5, h6');

    // Todo limit afterBegin to P and TD such.
    if (Results[i].element.shadowRoot) {
      while (location.parentElement?.shadowRoot) {
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

const inDismissals = (result, i, splitConfiguration, digest) => {
  if (
    Options.currentPage in State.dismissedAlerts &&
    result.test in State.dismissedAlerts[Options.currentPage] &&
    digest in State.dismissedAlerts[Options.currentPage][result.test]
  ) {
    // Remove results[i] if it has been marked OK or ignored, increment dismissed match counter.
    // @todo we could use the presence of a key to convert to a version without a key.
    if (splitConfiguration) {
      State.splitConfiguration.devResults[i].dismissalStatus =
        State.dismissedAlerts[Options.currentPage][result.test][digest];
    } else {
      Results[i].dismissalStatus = State.dismissedAlerts[Options.currentPage][result.test][digest];
    }
  }
};

export async function checkDismissed(i, splitConfiguration) {
  // @todo 3.x convert old keys.
  // @todo drop keys not found in a run to prevent object expansion.
  const result = splitConfiguration ? State.splitConfiguration.devResults[i] : Results[i];
  const digested = State.dismissKeys[result.dismiss];
  if (digested) {
    if (splitConfiguration) {
      State.splitConfiguration.devResults[i].dismiss = digested;
    } else {
      Results[i].dismiss = digested;
    }
    inDismissals(result, i, splitConfiguration, digested);
  } else {
    // todo: test memory consumption while editing if digest keeps changing.
    await dismissDigest(result.dismiss).then((digest) => {
      State.dismissKeys[result.dismiss] = digest;
      if (splitConfiguration) {
        State.splitConfiguration.devResults[i].dismiss = digest;
      } else {
        Results[i].dismiss = digest;
      }
      // Cache a copy.
      inDismissals(result, i, splitConfiguration, digest);
    });
  }
}

export async function filterAlerts(splitConfiguration) {
  // @todo next we can't return and assign results any more; pass string to here instead.

  // Review results array to remove dismissed or ignored items
  const results = splitConfiguration ? State.splitConfiguration.devResults : Results;

  for (let i = results.length - 1; i >= 0; i--) {
    let splice = false;

    // todo postpone: we could remove active range from list if it is not in oldResults to prevent tagging while people are typing. But we'd have to walk the array. Expensive!
    /*if (State.incremental && Ed11y.oldResults.length > 0) {
			// Don't flag new issues in the active range while people are typing.
		}*/
    if (results[i].test === 'READABILITY') {
      State.readability = results[i];
      if (State.visualizing) {
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
    } else if (results[i].test === 'META_TITLE') {
      // Todo: figure out a better plan than sticking the alert on the first matched element.
      if (Elements.Found.Headings.length > 0) {
        if (splitConfiguration) {
          State.splitConfiguration.devResults[i].element = Elements.Found.Everything[0];
          State.splitConfiguration.devResults[i].outsideContentRoots = true;
        } else {
          Results[i].element = Elements.Found.Everything[0];
        }
      }
    } else if (!results[i].element || results[i].type === 'good') {
      splice = true;
    } else if (!splitConfiguration) {
      // Split config modifies key before checking.
      await checkDismissed(i, false);
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
