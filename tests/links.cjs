// Link-checker result types: `link` (broken) and `linkManual` (needs a
// manual check). These are pushed by an external custom test, the way a CMS
// link checker integration would push them. See tests/links.htm.
describe('Link checker result types', function () {
  const path = require('path');
  const absolutePath = `file:///${path.resolve('./tests/links.htm')}`;

  before((browser) => browser.navigateTo(absolutePath));

  it('paints broken links and hides manual checks until hidden alerts are shown', function (browser) {
    browser.waitForElementPresent('ed11y-element-result', 2000);
    browser.assert.elementPresent('.broken ed11y-element-result', 'Broken link gets a result button');
    browser.assert.not.elementPresent(
      '.manual ed11y-element-result',
      'Manual-check link is hidden by default',
    );
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
          dismissedCount: Ed11y.UI.dismissedCount,
        };
      },
      [],
      (result) => {
        browser.assert.ok(result.value.className.includes('ed11y-link'), 'Toggle carries link class');
        browser.assert.ok(result.value.hasIcon, 'Toggle shows the broken-link icon');
        browser.assert.ok(
          result.value.label.includes('Broken link'),
          'Toggle is labelled as a broken link',
        );
        browser.assert.equal(result.value.errorCount, 1, 'Broken link counts as an issue');
        browser.assert.equal(result.value.dismissedCount, 1, 'Manual check counts as hidden');
      },
    );

    // Reveal hidden alerts; the manual check should now be painted.
    browser.execute(function () {
      document
        .querySelector('ed11y-element-panel')
        .shadowRoot.querySelector('#ed11y-show-hidden')
        .click();
    });
    browser.waitForElementPresent('.manual ed11y-element-result', 2000);
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
          result.value.label.includes('manual'),
          'Manual toggle label mentions a manual check',
        );
      },
    );
  });

  it('offers Mark OK and Mark broken, and reports a broken action without a dismissal', function (browser) {
    browser.execute(function () {
      document
        .querySelector('.broken ed11y-element-result')
        .shadowRoot.querySelector('.toggle')
        .click();
    });
    browser.waitForElementPresent('ed11y-element-tip[data-ed11y-open="true"]', 2000);
    browser.execute(
      function () {
        const tip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]').shadowRoot;
        return {
          badge: tip.querySelector('.error-badge').textContent.trim(),
          buttons: Array.from(tip.querySelectorAll('.ed11y-tip-dismissals button')).map((b) =>
            b.textContent.trim(),
          ),
        };
      },
      [],
      (result) => {
        browser.assert.equal(result.value.badge, 'Broken link', 'Badge names the link class');
        browser.assert.ok(result.value.buttons.includes('Mark OK'), 'Mark OK offered');
        browser.assert.ok(result.value.buttons.includes('Mark broken'), 'Mark broken offered');
        browser.assert.ok(!result.value.buttons.includes('Ignore'), 'Ignore hidden when OK allowed');
      },
    );

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
          recorded: !!(Ed11y.UI.dismissedAlerts[page] && Ed11y.UI.dismissedAlerts[page].LINK_BROKEN),
          stillPainted: !!document.querySelector('.broken ed11y-element-result'),
        };
      },
      [],
      (result) => {
        browser.assert.equal(result.value.last.dismissAction, 'broken', 'Broken action dispatched');
        browser.assert.equal(result.value.last.dismissType, 'link', 'Result type travels with it');
        browser.assert.equal(result.value.last.dismissData.hash, 'abc123', 'Opaque data travels');
        browser.assert.ok(!result.value.recorded, 'Mark broken is not stored as a dismissal');
        browser.assert.ok(result.value.stillPainted, 'Broken link stays visible after marking');
      },
    );
  });

  it('reveals manual checks while the visualizers are open', function (browser) {
    browser.navigateTo(absolutePath);
    browser.waitForElementPresent('.broken ed11y-element-result', 2000);
    browser.assert.not.elementPresent('.manual ed11y-element-result', 'Hidden before visualizing');
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
        browser.assert.equal(result.value.warningCount, 1, 'Manual check counted while visualizing');
        browser.assert.equal(result.value.dismissedCount, 0, 'Nothing counted as hidden');
        browser.assert.equal(result.value.totalCount, 2, 'Both links in the total');
      },
    );
    // Closing the visualizers hides it again.
    browser.execute(function () {
      document
        .querySelector('ed11y-element-panel')
        .shadowRoot.querySelector('#ed11y-visualize')
        .click();
    });
    browser.waitForElementNotPresent('.manual ed11y-element-result', 2000);
  });

  it('shows Ignore instead of Mark OK when OK is not allowed', function (browser) {
    browser.navigateTo(`${absolutePath}?noOk`);
    browser.waitForElementPresent('.broken ed11y-element-result', 2000);
    browser.execute(function () {
      document
        .querySelector('.broken ed11y-element-result')
        .shadowRoot.querySelector('.toggle')
        .click();
    });
    browser.waitForElementPresent('ed11y-element-tip[data-ed11y-open="true"]', 2000);
    browser.execute(
      function () {
        const tip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]').shadowRoot;
        return Array.from(tip.querySelectorAll('.ed11y-tip-dismissals button')).map((b) =>
          b.textContent.trim(),
        );
      },
      [],
      (result) => {
        browser.assert.ok(result.value.includes('Ignore'), 'Ignore offered');
        browser.assert.ok(!result.value.includes('Mark broken'), 'Mark broken withheld with Mark OK');
        browser.assert.ok(!result.value.includes('Mark OK'), 'Mark OK withheld');
      },
    );
  });

  it('lets the checker withhold marks per result through data.allowMark', function (browser) {
    browser.navigateTo(`${absolutePath}?noMark`);
    browser.waitForElementPresent('.broken ed11y-element-result', 2000);
    browser.execute(function () {
      document
        .querySelector('.broken ed11y-element-result')
        .shadowRoot.querySelector('.toggle')
        .click();
    });
    browser.waitForElementPresent('ed11y-element-tip[data-ed11y-open="true"]', 2000);
    browser.execute(
      function () {
        const tip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]').shadowRoot;
        return {
          allowOK: Ed11y.State.option.allowOK,
          buttons: Array.from(tip.querySelectorAll('.ed11y-tip-dismissals button')).map((b) =>
            b.textContent.trim(),
          ),
        };
      },
      [],
      (result) => {
        browser.assert.ok(result.value.allowOK, 'Page still allows OK for other results');
        browser.assert.deepEqual(result.value.buttons, ['Ignore'], 'Only Ignore offered for this link');
      },
    );
    browser.end();
  });
});
