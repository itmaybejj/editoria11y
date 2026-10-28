// Link checker results: the `brokenLinks` option paints a CMS link checker's
// flagged links as `link` (broken) and `linkManual` (needs a manual check)
// results, and lists them in the Links visualizer. See tests/links.htm.
import { expect, test } from '@playwright/test';
import { clickPanel, gotoPainted, repaintAfter } from './helpers.js';

const PAGE = '/tests/links.htm';
const OPEN_TIP = 'ed11y-element-tip[data-ed11y-open="true"]';
// Custom-element hosts can have no box of their own, so wait for presence,
// not Playwright's default of visibility.
const PRESENT = { state: 'attached' };

/** Clicks the result button drawn for the link inside `.{containerClass}`. */
async function openTip(page, containerClass) {
  await page.evaluate((cls) => {
    document
      .querySelector(`.${cls} ed11y-element-result`)
      .shadowRoot.querySelector('.toggle')
      .click();
  }, containerClass);
  await page.waitForSelector(OPEN_TIP, PRESENT);
}

async function closeTip(page) {
  await page.evaluate((sel) => {
    document.querySelector(sel).shadowRoot.querySelector('.close').click();
  }, OPEN_TIP);
  await page.waitForSelector(OPEN_TIP, { state: 'detached' });
}

/** Everything the spec wants to know about the open tip. */
function readTip() {
  const tip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]').shadowRoot;
  const target = tip.querySelector('.message .ed11y-link-target');
  return {
    title: tip.querySelector('.message .title')?.textContent.trim(),
    text: tip.querySelector('.message').textContent,
    targetHref: target?.getAttribute('href') ?? null,
    targetBlank: target?.getAttribute('target') ?? null,
    badge: tip.querySelector('.error-badge').textContent.trim(),
    buttons: Array.from(tip.querySelectorAll('.ed11y-tip-dismissals button')).map((b) =>
      (b.querySelector('.text') ?? b).textContent.trim(),
    ),
  };
}

/** Clicks a button in the open tip and waits for the dismissal event it sends. */
async function clickTipButton(page, selector) {
  const before = await page.evaluate(() => window.ed11yTestEvents.length);
  await page.evaluate(
    ({ tipSel, sel }) => {
      document.querySelector(tipSel).shadowRoot.querySelector(sel).click();
    },
    { tipSel: OPEN_TIP, sel: selector },
  );
  await page.waitForFunction((count) => window.ed11yTestEvents.length > count, before);
}

/** Light-DOM check for a result button; Playwright locators would pierce shadow roots. */
const hasResult = (page, containerClass) =>
  page.evaluate((cls) => !!document.querySelector(`.${cls} ed11y-element-result`), containerClass);

/** Turns on "show hidden alerts" so dismissed links get result buttons. */
async function showHidden(page) {
  await repaintAfter(page, () => clickPanel(page, '#ed11y-show-hidden'));
  await page.waitForSelector('.okd ed11y-element-result', PRESENT);
}

/** Turns on the visualizers, which also paints visualizer-only results. */
async function visualize(page) {
  await repaintAfter(page, () => clickPanel(page, '#ed11y-visualize'));
  await page.waitForSelector('.manual ed11y-element-result', PRESENT);
}

const counts = () => ({
  errorCount: Ed11y.UI.errorCount,
  warningCount: Ed11y.UI.warningCount,
  dismissedCount: Ed11y.UI.dismissedCount,
  totalCount: Ed11y.UI.totalCount,
});

test.describe('Link checker results', () => {
  test('paints broken links as errors and unverifiable links as manual checks', async ({
    page,
  }) => {
    await gotoPainted(page, PAGE);
    expect(await hasResult(page, 'broken'), 'Broken link gets a result button').toBe(true);
    expect(
      await hasResult(page, 'unpublished'),
      'Stored path matches the anchor once the language prefix is stripped',
    ).toBe(true);
    expect(
      await hasResult(page, 'manual'),
      'Manual-check link is painted like any other manual check',
    ).toBe(true);
    expect(await hasResult(page, 'redirect'), 'Redirecting link is painted').toBe(true);
    expect(await hasResult(page, 'okd'), 'Marked-OK link is hidden').toBe(false);
    expect(await hasResult(page, 'fine'), 'Unflagged link is untouched').toBe(false);

    const broken = await page.evaluate(() => {
      const toggle = document
        .querySelector('.broken ed11y-element-result')
        .shadowRoot.querySelector('.toggle');
      return {
        className: toggle.className,
        label: toggle.getAttribute('aria-label'),
        hasIcon: !!toggle.querySelector('svg'),
        linkResults: Ed11y.State.results.filter((r) => r.data?.hash).length,
      };
    });
    expect(broken.className, 'Toggle carries link class').toContain('ed11y-link');
    expect(broken.className, 'Broken link toggle uses the error colors').not.toContain(
      'dismissable',
    );
    expect(broken.hasIcon, 'Toggle shows the broken-link icon').toBe(true);
    expect(broken.label, 'Toggle is labelled as a broken link').toContain('Broken link');
    expect(broken.linkResults, 'A flagged link absent from the page produces no result').toBe(6);

    const count = await page.evaluate(counts);
    expect(count.errorCount, 'Broken and unpublished links count as issues').toBe(2);
    expect(count.warningCount, 'Unverifiable and redirect count as manual checks').toBe(2);
    expect(count.dismissedCount, 'Marked-OK link and ignored link count as hidden').toBe(2);

    const manual = await page.evaluate(() => {
      const toggle = document
        .querySelector('.manual ed11y-element-result')
        .shadowRoot.querySelector('.toggle');
      return { className: toggle.className, label: toggle.getAttribute('aria-label') };
    });
    expect(manual.className, 'Manual toggle carries its own class').toContain('ed11y-link-manual');
    expect(manual.className, 'Manual toggle uses the warning colors').toContain('dismissable');
    expect(manual.label, 'Manual toggle label asks for a check').toContain('Check this link');
  });

  test('offers only Mark OK on a broken link and shows its target', async ({ page }) => {
    await gotoPainted(page, PAGE);
    await openTip(page, 'broken');
    const tip = await page.evaluate(readTip);
    expect(tip.title, 'Tip title names the problem').toBe('Broken link');
    expect(tip.badge, 'Badge names the link class').toBe('Broken link');
    expect(tip.targetHref, 'Tip links to the target').toBe('/no-such-page');
    expect(tip.targetBlank, 'Target opens in a new tab').toBe('_blank');
    expect(tip.buttons, 'A link the checker calls broken only offers Mark OK').toEqual(['Mark OK']);
    await closeTip(page);
  });

  test('offers both verdicts on a manual check, and reports a broken action without a dismissal', async ({
    page,
  }) => {
    await gotoPainted(page, PAGE);
    await openTip(page, 'manual');
    const tip = await page.evaluate(readTip);
    expect(tip.title, 'Tip title names the problem').toBe('Link needs a manual check');
    expect(tip.badge, 'Badge names the link class').toBe('Check this link');
    expect(tip.buttons, 'Mark OK offered').toContain('Mark OK');
    expect(tip.buttons, 'Mark broken offered').toContain('Mark broken');
    expect(tip.buttons, 'Ignore hidden when OK allowed').not.toContain('Ignore');

    // The dismissal event fires before the redraw; check the redrawn page.
    await repaintAfter(page, () => clickTipButton(page, '.dismiss.broken'));
    const value = await page.evaluate(() => {
      const page = Ed11y.State.option.currentPage;
      return {
        last: window.ed11yTestEvents.at(-1),
        recorded: !!Ed11y.UI.dismissedAlerts[page]?.HREF_UNVERIFIABLE,
        stillPainted: !!document.querySelector('.manual ed11y-element-result'),
      };
    });
    expect(value.last.dismissAction, 'Broken action dispatched').toBe('broken');
    expect(value.last.dismissTest, 'Test key travels').toBe('HREF_UNVERIFIABLE');
    expect(value.last.dismissType, 'Result type travels with it').toBe('linkManual');
    expect(value.last.dismissData.hash, 'Opaque hash travels').toBe('def456');
    expect(value.last.dismissData.href, 'Stored href travels').toBe('https://example.com/locked');
    expect(value.recorded, 'Mark broken is not stored as a dismissal').toBe(false);
    expect(value.stillPainted, 'The link stays visible after marking').toBe(true);
  });

  test('names the destination of a link that redirects to another site', async ({ page }) => {
    await gotoPainted(page, PAGE);
    await openTip(page, 'redirect');
    const tip = await page.evaluate(readTip);
    expect(tip.title, 'Tip title names the problem').toBe('Link redirects to a different site');
    expect(tip.text, 'Tip shows where the link now lands').toContain('other.example.org/landing');
    expect(tip.targetHref, 'Tip links to the target').toBe('https://example.com/moved');
    expect(tip.buttons, 'Redirects are manual checks').toContain('Mark broken');
    await closeTip(page);
  });

  test('shows Restore on marked-OK and ignored links, and clears the verdict once restored', async ({
    page,
  }) => {
    await gotoPainted(page, PAGE);
    await showHidden(page);

    await openTip(page, 'okd');
    let tip = await page.evaluate(readTip);
    expect(tip.title, 'Marked-OK link keeps its finding').toBe('Broken link');
    expect(tip.badge, 'Hidden links get a neutral badge').toBe('Hidden link alert');
    expect(tip.buttons, 'Only Restore on a marked-OK link').toEqual([
      'Restore this alert marked as OK',
    ]);
    await closeTip(page);

    await openTip(page, 'ignored');
    tip = await page.evaluate(readTip);
    expect(tip.buttons, 'Only Restore on an ignored link').toEqual(['Restore this ignored alert']);
    await repaintAfter(page, () => clickTipButton(page, '.ed11y-tip-dismissals button'));
    const value = await page.evaluate(() => {
      const last = window.ed11yTestEvents.at(-1);
      return {
        action: last.dismissAction,
        type: last.dismissType,
        hash: last.dismissData.hash,
        entry: Ed11y.State.option.brokenLinks.find((l) => l.hash === 'hide012'),
        dismissed: document
          .querySelector('.ignored ed11y-element-result')
          ?.shadowRoot.querySelector('.toggle')
          .classList.contains('dismissed'),
        status: Ed11y.State.results.find((r) => r.data?.hash === 'hide012')?.dismissalStatus,
      };
    });
    expect(value.action, 'Restore dispatches a reset').toBe('reset');
    expect(value.type, 'Result type travels with it').toBe('link');
    expect(value.hash, 'Opaque hash travels').toBe('hide012');
    expect(value.entry, 'Entry still listed').toBeTruthy();
    expect(value.entry.dismissed, 'Verdict cleared on the entry').toBeFalsy();
    expect(value.dismissed, 'Restored link is drawn as active').toBe(false);
    expect(value.status, 'Restored result carries no verdict').toBeFalsy();
  });

  test('keeps checks left out of brokenLinksShowChecks behind the visualizers', async ({
    page,
  }) => {
    await gotoPainted(page, `${PAGE}?deferChecks`);
    expect(await hasResult(page, 'broken'), 'Broken link is painted').toBe(true);
    expect(await hasResult(page, 'manual'), 'Unverifiable link waits').toBe(false);
    expect(await hasResult(page, 'redirect'), 'Listed status is painted').toBe(true);
    let count = await page.evaluate(counts);
    expect(count.warningCount, 'Only the redirect counts as a manual check').toBe(1);
    expect(
      count.dismissedCount,
      'The waiting check shares the hidden count with the dismissed links',
    ).toBe(3);
    const visualizerOnly = await page.evaluate(() =>
      Ed11y.State.results.filter((r) => r.visualizerOnly).map((r) => r.test),
    );
    expect(visualizerOnly, 'Only the unlisted status is flagged visualizer-only').toEqual([
      'HREF_UNVERIFIABLE',
    ]);

    await visualize(page);
    count = await page.evaluate(counts);
    expect(count.warningCount, 'Manual checks counted while visualizing').toBe(2);
    expect(count.dismissedCount, 'Only the marked-OK and ignored links count as hidden').toBe(2);
    expect(count.totalCount, 'Broken, unpublished and manual links in the total').toBe(4);
  });

  test('lists every flagged link in the Links visualizer', async ({ page }) => {
    await gotoPainted(page, `${PAGE}?deferChecks`);
    await visualize(page);
    const value = await page.evaluate(() => {
      const panel = document.querySelector('ed11y-element-panel').shadowRoot;
      const tab = panel.querySelector('#ed11y-links-tab');
      return {
        hasTab: !!tab,
        summary: tab?.querySelector('.summary-title')?.textContent.trim(),
        rows: Array.from(panel.querySelectorAll('#ed11y-link-list li')).map((li) => ({
          className: li.className,
          status: li.querySelector('.ed11y-link-status')?.textContent.trim(),
          text: li.querySelector('a')?.textContent.trim(),
          href: li.querySelector('a')?.getAttribute('href'),
          target: li.querySelector('a')?.getAttribute('target'),
          buttonClass: li.querySelector('button')?.className,
          hasIcon: !!li.querySelector('button svg'),
        })),
      };
    });
    expect(value.hasTab, 'Links tab present when links were passed').toBe(true);
    expect(value.summary, 'Tab is titled').toBe('Links');
    const rows = value.rows;
    expect(rows.length, 'One row per flagged link found on the page').toBe(6);
    expect(
      rows.map((r) => r.status),
      'Rows follow page order and carry a text badge',
    ).toEqual(['Broken', 'Unpublished', 'Unverified', 'Redirected', 'Marked OK', 'Ignored']);
    expect(rows[0].text, 'Internal path shown as stored').toBe('/no-such-page');
    expect(rows[2].text, 'Scheme stripped from the display text').toBe('example.com/locked');
    expect(rows[2].href, 'Row links to the target').toBe('https://example.com/locked');
    expect(rows[2].target, 'Row link opens in a new tab').toBe('_blank');
    expect(rows[0].className, 'Broken row colored as an error').toContain('ed11y-error');
    expect(rows[2].className, 'Manual row colored as a warning').toContain('ed11y-warning');
    expect(rows[4].className, 'Hidden rows are not colored as errors').not.toContain('ed11y-error');
    expect(rows[4].className, 'Hidden rows are not colored as warnings').not.toContain(
      'ed11y-warning',
    );
    expect(rows[0].buttonClass, 'Broken row button styled').toContain('ed11y-link-broken');
    expect(rows[2].buttonClass, 'Manual row button in warning colors').toContain('dismissable');
    expect(rows[4].buttonClass, 'Hidden row button in dismissed colors').toContain('dismissed');
    expect(rows[0].hasIcon && rows[4].hasIcon, 'Row buttons carry the link sprites').toBe(true);
  });

  test('opening the Links tab shows hidden alerts, and a row button jumps to its alert', async ({
    page,
  }) => {
    await gotoPainted(page, `${PAGE}?deferChecks`);
    await visualize(page);
    expect(await hasResult(page, 'okd'), 'Marked-OK link hidden before the tab opens').toBe(false);
    await repaintAfter(page, () =>
      page.evaluate(() => {
        document
          .querySelector('ed11y-element-panel')
          .shadowRoot.querySelector('#ed11y-links-tab').open = true;
      }),
    );
    await page.waitForSelector('.okd ed11y-element-result', PRESENT);
    const value = await page.evaluate(() => {
      const panel = document.querySelector('ed11y-element-panel').shadowRoot;
      return {
        showDismissed: Ed11y.UI.showDismissed,
        pressed: panel.querySelector('#ed11y-show-hidden').getAttribute('data-ed11y-pressed'),
        resultIndex: panel
          .querySelectorAll('#ed11y-link-list li button')[2]
          ?.getAttribute('data-ed11y-result'),
      };
    });
    expect(value.showDismissed, 'Hidden alerts are shown').toBe(true);
    expect(value.pressed, 'Show-hidden button reflects the state').toBe('true');
    expect(value.resultIndex, 'Row buttons point at a result').toBeTruthy();

    await page.evaluate(() => {
      document
        .querySelector('ed11y-element-panel')
        .shadowRoot.querySelectorAll('#ed11y-link-list li button')[2]
        .click();
    });
    await page.waitForSelector(OPEN_TIP, PRESENT);
    const tip = await page.evaluate(readTip);
    expect(tip.title, 'The row opened its own alert').toBe('Link needs a manual check');
    await closeTip(page);
  });

  test('paints links outside the check root only where brokenLinksRoots points', async ({
    page,
  }) => {
    await gotoPainted(page, PAGE);
    expect(await hasResult(page, 'sitenav'), 'Navigation link outside the root is skipped').toBe(
      false,
    );

    await gotoPainted(page, `${PAGE}?allRoots`);
    expect(await hasResult(page, 'sitenav'), 'Navigation link painted through the roots').toBe(
      true,
    );
    expect(await hasResult(page, 'broken'), 'Links inside the root are still painted').toBe(true);
    const count = await page.evaluate(counts);
    expect(count.errorCount, 'The navigation link joins the issue count').toBe(3);
  });

  test('shows Ignore instead of Mark OK when OK is not allowed', async ({ page }) => {
    await gotoPainted(page, `${PAGE}?noOk`);
    await openTip(page, 'broken');
    const tip = await page.evaluate(readTip);
    expect(tip.buttons, 'Ignore offered').toContain('Ignore');
    expect(tip.buttons, 'Mark broken withheld with Mark OK').not.toContain('Mark broken');
    expect(tip.buttons, 'Mark OK withheld').not.toContain('Mark OK');
  });

  test('lets the site withhold link marks through allowLinkMarks', async ({ page }) => {
    await gotoPainted(page, `${PAGE}?noMark`);
    await openTip(page, 'broken');
    const value = await page.evaluate(() => ({
      allowOK: Ed11y.State.option.allowOK,
      buttons: Array.from(
        document
          .querySelector('ed11y-element-tip[data-ed11y-open="true"]')
          .shadowRoot.querySelectorAll('.ed11y-tip-dismissals button'),
      ).map((b) => (b.querySelector('.text') ?? b).textContent.trim()),
    }));
    expect(value.allowOK, 'Page still allows OK for other results').toBe(true);
    expect(value.buttons, 'Only Ignore offered for links').toEqual(['Ignore']);
  });
});
