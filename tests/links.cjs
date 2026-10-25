// Link checker results: the `brokenLinks` option paints a CMS link checker's
// flagged links as `link` (broken) and `linkManual` (needs a manual check)
// results, and lists them in the Links visualizer. See tests/links.htm.
describe('Link checker results', function () {
  const path = require('path');
  const absolutePath = `file:///${path.resolve('./tests/links.htm')}`;

  // Click the result button drawn for the link inside `.{containerClass}`.
  const openTip = (browser, containerClass) => {
    browser.execute(
      function (cls) {
        document
          .querySelector(`.${cls} ed11y-element-result`)
          .shadowRoot.querySelector('.toggle')
          .click();
      },
      [containerClass],
    );
    browser.waitForElementPresent('ed11y-element-tip[data-ed11y-open="true"]', 2000);
  };

  const closeTip = (browser) => {
    browser.execute(function () {
      document
        .querySelector('ed11y-element-tip[data-ed11y-open="true"]')
        .shadowRoot.querySelector('.close')
        .click();
    });
    browser.waitForElementNotPresent('ed11y-element-tip[data-ed11y-open="true"]', 2000);
  };

  // Everything the spec wants to know about the open tip.
  const readTip = function () {
    const tip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]').shadowRoot;
    const target = tip.querySelector('.message .ed11y-link-target');
    return {
      title: tip.querySelector('.message .title')?.textContent.trim(),
      text: tip.querySelector('.message').textContent,
      targetHref: target?.getAttribute('href') ?? null,
      targetBlank: target?.getAttribute('target') ?? null,
      badge: tip.querySelector('.error-badge').textContent.trim(),
      badgeClass: tip.querySelector('.error-badge').className,
      buttons: Array.from(tip.querySelectorAll('.ed11y-tip-dismissals button')).map((b) =>
        (b.querySelector('.text') ?? b).textContent.trim(),
      ),
    };
  };

  before((browser) => browser.navigateTo(absolutePath));

  it('paints broken links as errors and unverifiable links as manual checks', function (browser) {
    browser.waitForElementPresent('ed11y-element-result', 2000);
    browser.assert.elementPresent('.broken ed11y-element-result', 'Broken link gets a result button');
    browser.assert.elementPresent(
      '.unpublished ed11y-element-result',
      'Stored path matches the anchor once the language prefix is stripped',
    );
    browser.assert.elementPresent(
      '.manual ed11y-element-result',
      'Manual-check link is painted like any other manual check',
    );
    browser.assert.elementPresent('.redirect ed11y-element-result', 'Redirecting link is painted');
    browser.assert.not.elementPresent('.okd ed11y-element-result', 'Marked-OK link is hidden');
    browser.assert.not.elementPresent('.fine ed11y-element-result', 'Unflagged link is untouched');

    browser.execute(
      function () {
        const toggle = document
          .querySelector('.broken ed11y-element-result')
          .shadowRoot.querySelector('.toggle');
        return {
          className: toggle.className,
          label: toggle.getAttribute('aria-label'),
          hasIcon: !!toggle.querySelector('svg'),
          errorCount: Ed11y.UI.errorCount,
          warningCount: Ed11y.UI.warningCount,
          dismissedCount: Ed11y.UI.dismissedCount,
          linkResults: Ed11y.State.results.filter((r) => r.data?.hash).length,
        };
      },
      [],
      (result) => {
        browser.assert.ok(result.value.className.includes('ed11y-link'), 'Toggle carries link class');
        browser.assert.ok(
          !result.value.className.includes('dismissable'),
          'Broken link toggle uses the error colors',
        );
        browser.assert.ok(result.value.hasIcon, 'Toggle shows the broken-link icon');
        browser.assert.ok(
          result.value.label.includes('Broken link'),
          'Toggle is labelled as a broken link',
        );
        browser.assert.equal(result.value.errorCount, 2, 'Broken and unpublished links count as issues');
        browser.assert.equal(result.value.warningCount, 2, 'Unverifiable and redirect count as manual checks');
        browser.assert.equal(
          result.value.dismissedCount,
          2,
          'Marked-OK link and ignored link count as hidden',
        );
        browser.assert.equal(result.value.linkResults, 6, 'A flagged link absent from the page produces no result');
      },
    );

    browser.execute(
      function () {
        const toggle = document
          .querySelector('.manual ed11y-element-result')
          .shadowRoot.querySelector('.toggle');
        return { className: toggle.className, label: toggle.getAttribute('aria-label') };
      },
      [],
      (result) => {
        browser.assert.ok(
          result.value.className.includes('ed11y-link-manual'),
          'Manual toggle carries its own class',
        );
        browser.assert.ok(
          result.value.className.includes('dismissable'),
          'Manual toggle uses the warning colors',
        );
        browser.assert.ok(
          result.value.label.includes('Check this link'),
          'Manual toggle label asks for a check',
        );
      },
    );

    // Reveal hidden alerts for the Restore tests below.
    browser.execute(function () {
      document
        .querySelector('ed11y-element-panel')
        .shadowRoot.querySelector('#ed11y-show-hidden')
        .click();
    });
    browser.waitForElementPresent('.okd ed11y-element-result', 2000);
  });

  it('offers only Mark OK on a broken link and shows its target', function (browser) {
    openTip(browser, 'broken');
    browser.execute(readTip, [], (result) => {
      browser.assert.equal(result.value.title, 'Broken link', 'Tip title names the problem');
      browser.assert.equal(result.value.badge, 'Broken link', 'Badge names the link class');
      browser.assert.ok(result.value.badgeClass.includes('ed11y-alert'), 'Badge uses the error colors');
      browser.assert.equal(result.value.targetHref, '/no-such-page', 'Tip links to the target');
      browser.assert.equal(result.value.targetBlank, '_blank', 'Target opens in a new tab');
      browser.assert.deepEqual(
        result.value.buttons,
        ['Mark OK'],
        'A link the checker calls broken only offers Mark OK',
      );
    });
    closeTip(browser);
  });

  it('offers both verdicts on a manual check, and reports a broken action without a dismissal', function (browser) {
    openTip(browser, 'manual');
    browser.execute(readTip, [], (result) => {
      browser.assert.equal(result.value.title, 'Link needs a manual check', 'Tip title names the problem');
      browser.assert.equal(result.value.badge, 'Check this link', 'Badge names the link class');
      browser.assert.ok(
        result.value.badgeClass.includes('ed11y-warning'),
        'Badge uses the warning colors',
      );
      browser.assert.ok(result.value.buttons.includes('Mark OK'), 'Mark OK offered');
      browser.assert.ok(result.value.buttons.includes('Mark broken'), 'Mark broken offered');
      browser.assert.ok(!result.value.buttons.includes('Ignore'), 'Ignore hidden when OK allowed');
    });

    browser.execute(function () {
      document
        .querySelector('ed11y-element-tip[data-ed11y-open="true"]')
        .shadowRoot.querySelector('.dismiss.broken')
        .click();
    });
    browser.pause(600);
    browser.execute(
      function () {
        const last = window.ed11yTestEvents[window.ed11yTestEvents.length - 1];
        const page = Ed11y.State.option.currentPage;
        return {
          last: last,
          recorded: !!(
            Ed11y.UI.dismissedAlerts[page] && Ed11y.UI.dismissedAlerts[page].HREF_UNVERIFIABLE
          ),
          stillPainted: !!document.querySelector('.manual ed11y-element-result'),
        };
      },
      [],
      (result) => {
        browser.assert.equal(result.value.last.dismissAction, 'broken', 'Broken action dispatched');
        browser.assert.equal(result.value.last.dismissTest, 'HREF_UNVERIFIABLE', 'Test key travels');
        browser.assert.equal(result.value.last.dismissType, 'linkManual', 'Result type travels with it');
        browser.assert.equal(result.value.last.dismissData.hash, 'def456', 'Opaque hash travels');
        browser.assert.equal(
          result.value.last.dismissData.href,
          'https://example.com/locked',
          'Stored href travels',
        );
        browser.assert.ok(!result.value.recorded, 'Mark broken is not stored as a dismissal');
        browser.assert.ok(result.value.stillPainted, 'The link stays visible after marking');
      },
    );
  });

  it('names the destination of a link that redirects to another site', function (browser) {
    openTip(browser, 'redirect');
    browser.execute(readTip, [], (result) => {
      browser.assert.equal(
        result.value.title,
        'Link redirects to a different site',
        'Tip title names the problem',
      );
      browser.assert.ok(
        result.value.text.includes('other.example.org/landing'),
        'Tip shows where the link now lands',
      );
      browser.assert.equal(result.value.targetHref, 'https://example.com/moved', 'Tip links to the target');
      browser.assert.ok(result.value.buttons.includes('Mark broken'), 'Redirects are manual checks');
    });
    closeTip(browser);
  });

  it('shows Restore on marked-OK and ignored links, and clears the verdict once restored', function (browser) {
    // Hidden alerts are still shown from the first test.
    browser.waitForElementPresent('.okd ed11y-element-result', 2000);
    openTip(browser, 'okd');
    browser.execute(readTip, [], (result) => {
      browser.assert.equal(result.value.title, 'Broken link', 'Marked-OK link keeps its finding');
      browser.assert.equal(result.value.badge, 'Hidden link alert', 'Hidden links get a neutral badge');
      browser.assert.deepEqual(
        result.value.buttons,
        ['Restore this alert marked as OK'],
        'Only Restore on a marked-OK link',
      );
    });
    closeTip(browser);

    openTip(browser, 'ignored');
    browser.execute(readTip, [], (result) => {
      browser.assert.deepEqual(
        result.value.buttons,
        ['Restore this ignored alert'],
        'Only Restore on an ignored link',
      );
    });
    browser.execute(function () {
      document
        .querySelector('ed11y-element-tip[data-ed11y-open="true"]')
        .shadowRoot.querySelector('.ed11y-tip-dismissals button')
        .click();
    });
    browser.pause(600);
    browser.execute(
      function () {
        const last = window.ed11yTestEvents[window.ed11yTestEvents.length - 1];
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
      },
      [],
      (result) => {
        browser.assert.equal(result.value.action, 'reset', 'Restore dispatches a reset');
        browser.assert.equal(result.value.type, 'link', 'Result type travels with it');
        browser.assert.equal(result.value.hash, 'hide012', 'Opaque hash travels');
        browser.assert.ok(result.value.entry && !result.value.entry.dismissed, 'Verdict cleared on the entry');
        browser.assert.strictEqual(result.value.dismissed, false, 'Restored link is drawn as active');
        browser.assert.ok(!result.value.status, 'Restored result carries no verdict');
      },
    );
  });

  it('keeps checks left out of brokenLinksShowChecks behind the visualizers', function (browser) {
    browser.navigateTo(`${absolutePath}?deferChecks`);
    browser.waitForElementPresent('.broken ed11y-element-result', 2000);
    browser.assert.not.elementPresent('.manual ed11y-element-result', 'Unverifiable link waits');
    browser.assert.elementPresent('.redirect ed11y-element-result', 'Listed status is painted');
    browser.execute(
      function () {
        return {
          warningCount: Ed11y.UI.warningCount,
          dismissedCount: Ed11y.UI.dismissedCount,
          visualizerOnly: Ed11y.State.results.filter((r) => r.visualizerOnly).map((r) => r.test),
        };
      },
      [],
      (result) => {
        browser.assert.equal(result.value.warningCount, 1, 'Only the redirect counts as a manual check');
        browser.assert.equal(
          result.value.dismissedCount,
          3,
          'The waiting check shares the hidden count with the dismissed links',
        );
        browser.assert.deepEqual(
          result.value.visualizerOnly,
          ['HREF_UNVERIFIABLE'],
          'Only the unlisted status is flagged visualizer-only',
        );
      },
    );
    browser.execute(function () {
      document
        .querySelector('ed11y-element-panel')
        .shadowRoot.querySelector('#ed11y-visualize')
        .click();
    });
    browser.waitForElementPresent('.manual ed11y-element-result', 2000);
    browser.execute(
      function () {
        return {
          warningCount: Ed11y.UI.warningCount,
          dismissedCount: Ed11y.UI.dismissedCount,
          totalCount: Ed11y.UI.totalCount,
        };
      },
      [],
      (result) => {
        browser.assert.equal(result.value.warningCount, 2, 'Manual checks counted while visualizing');
        browser.assert.equal(
          result.value.dismissedCount,
          2,
          'Only the marked-OK and ignored links count as hidden',
        );
        browser.assert.equal(result.value.totalCount, 4, 'Broken, unpublished and manual links in the total');
      },
    );
  });

  it('lists every flagged link in the Links visualizer', function (browser) {
    browser.pause(300);
    browser.execute(
      function () {
        const panel = document.querySelector('ed11y-element-panel').shadowRoot;
        const tab = panel.querySelector('#ed11y-links-tab');
        const rows = Array.from(panel.querySelectorAll('#ed11y-link-list li'));
        return {
          hasTab: !!tab,
          summary: tab?.querySelector('.summary-title')?.textContent.trim(),
          rows: rows.map((li) => ({
            className: li.className,
            status: li.querySelector('.ed11y-link-status')?.textContent.trim(),
            text: li.querySelector('a')?.textContent.trim(),
            href: li.querySelector('a')?.getAttribute('href'),
            target: li.querySelector('a')?.getAttribute('target'),
            buttonClass: li.querySelector('button')?.className,
            hasIcon: !!li.querySelector('button svg'),
          })),
        };
      },
      [],
      (result) => {
        browser.assert.ok(result.value.hasTab, 'Links tab present when links were passed');
        browser.assert.equal(result.value.summary, 'Links', 'Tab is titled');
        const rows = result.value.rows;
        browser.assert.equal(rows.length, 6, 'One row per flagged link found on the page');
        browser.assert.deepEqual(
          rows.map((r) => r.status),
          ['Broken', 'Unpublished', 'Unverified', 'Redirected', 'Marked OK', 'Ignored'],
          'Rows follow page order and carry a text badge',
        );
        browser.assert.equal(rows[0].text, '/no-such-page', 'Internal path shown as stored');
        browser.assert.equal(rows[2].text, 'example.com/locked', 'Scheme stripped from the display text');
        browser.assert.equal(rows[2].href, 'https://example.com/locked', 'Row links to the target');
        browser.assert.equal(rows[2].target, '_blank', 'Row link opens in a new tab');
        browser.assert.ok(rows[0].className.includes('ed11y-error'), 'Broken row colored as an error');
        browser.assert.ok(rows[2].className.includes('ed11y-warning'), 'Manual row colored as a warning');
        browser.assert.ok(
          !rows[4].className.includes('ed11y-error') && !rows[4].className.includes('ed11y-warning'),
          'Hidden rows are not colored',
        );
        browser.assert.ok(rows[0].buttonClass.includes('ed11y-link-broken'), 'Broken row button styled');
        browser.assert.ok(rows[2].buttonClass.includes('dismissable'), 'Manual row button in warning colors');
        browser.assert.ok(rows[4].buttonClass.includes('dismissed'), 'Hidden row button in dismissed colors');
        browser.assert.ok(rows[0].hasIcon && rows[4].hasIcon, 'Row buttons carry the link sprites');
      },
    );
  });

  it('opening the Links tab shows hidden alerts, and a row button jumps to its alert', function (browser) {
    browser.assert.not.elementPresent('.okd ed11y-element-result', 'Marked-OK link hidden before the tab opens');
    browser.execute(function () {
      document.querySelector('ed11y-element-panel').shadowRoot.querySelector('#ed11y-links-tab').open = true;
    });
    browser.waitForElementPresent('.okd ed11y-element-result', 2000);
    browser.execute(
      function () {
        const panel = document.querySelector('ed11y-element-panel').shadowRoot;
        return {
          showDismissed: Ed11y.UI.showDismissed,
          pressed: panel.querySelector('#ed11y-show-hidden').getAttribute('data-ed11y-pressed'),
          resultIndex: panel
            .querySelectorAll('#ed11y-link-list li button')[2]
            .getAttribute('data-ed11y-result'),
        };
      },
      [],
      (result) => {
        browser.assert.ok(result.value.showDismissed, 'Hidden alerts are shown');
        browser.assert.equal(result.value.pressed, 'true', 'Show-hidden button reflects the state');
        browser.assert.ok(result.value.resultIndex !== null, 'Row buttons point at a result');
      },
    );
    browser.pause(300);
    browser.execute(function () {
      document
        .querySelector('ed11y-element-panel')
        .shadowRoot.querySelectorAll('#ed11y-link-list li button')[2]
        .click();
    });
    browser.waitForElementPresent('ed11y-element-tip[data-ed11y-open="true"]', 2000);
    browser.execute(readTip, [], (result) => {
      browser.assert.equal(result.value.title, 'Link needs a manual check', 'The row opened its own alert');
    });
    closeTip(browser);
  });

  it('shows Ignore instead of Mark OK when OK is not allowed', function (browser) {
    browser.navigateTo(`${absolutePath}?noOk`);
    browser.waitForElementPresent('.broken ed11y-element-result', 2000);
    openTip(browser, 'broken');
    browser.execute(readTip, [], (result) => {
      browser.assert.ok(result.value.buttons.includes('Ignore'), 'Ignore offered');
      browser.assert.ok(!result.value.buttons.includes('Mark broken'), 'Mark broken withheld with Mark OK');
      browser.assert.ok(!result.value.buttons.includes('Mark OK'), 'Mark OK withheld');
    });
  });

  it('lets the site withhold link marks through allowLinkMarks', function (browser) {
    browser.navigateTo(`${absolutePath}?noMark`);
    browser.waitForElementPresent('.broken ed11y-element-result', 2000);
    openTip(browser, 'broken');
    browser.execute(
      function () {
        const tip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]').shadowRoot;
        return {
          allowOK: Ed11y.State.option.allowOK,
          buttons: Array.from(tip.querySelectorAll('.ed11y-tip-dismissals button')).map((b) =>
            (b.querySelector('.text') ?? b).textContent.trim(),
          ),
        };
      },
      [],
      (result) => {
        browser.assert.ok(result.value.allowOK, 'Page still allows OK for other results');
        browser.assert.deepEqual(result.value.buttons, ['Ignore'], 'Only Ignore offered for links');
      },
    );
    browser.end();
  });
});
