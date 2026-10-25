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
        browser.assert.ok(
          !result.value.className.includes('dismissable'),
          'Broken link toggle uses the error colors',
        );
        browser.assert.ok(result.value.hasIcon, 'Toggle shows the broken-link icon');
        browser.assert.ok(
          result.value.label.includes('Broken link'),
          'Toggle is labelled as a broken link',
        );
        browser.assert.equal(result.value.errorCount, 1, 'Broken link counts as an issue');
        browser.assert.equal(
          result.value.dismissedCount,
          3,
          'Manual check, marked-OK link and ignored link count as hidden',
        );
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
          result.value.className.includes('dismissable'),
          'Manual toggle uses the warning colors',
        );
        browser.assert.ok(
          result.value.label.includes('manual'),
          'Manual toggle label mentions a manual check',
        );
      },
    );
  });

  it('offers only Mark OK on a broken link', function (browser) {
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
          badgeClass: tip.querySelector('.error-badge').className,
          buttons: Array.from(tip.querySelectorAll('.ed11y-tip-dismissals button')).map((b) =>
            b.textContent.trim(),
          ),
        };
      },
      [],
      (result) => {
        browser.assert.equal(result.value.badge, 'Broken link', 'Badge names the link class');
        browser.assert.ok(result.value.badgeClass.includes('ed11y-alert'), 'Badge uses the error colors');
        browser.assert.deepEqual(
          result.value.buttons,
          ['Mark OK'],
          'A link the checker calls broken only offers Mark OK',
        );
      },
    );
    browser.execute(function () {
      document
        .querySelector('ed11y-element-tip[data-ed11y-open="true"]')
        .shadowRoot.querySelector('.close')
        .click();
    });
    browser.waitForElementNotPresent('ed11y-element-tip[data-ed11y-open="true"]', 2000);
  });

  it('offers both verdicts on a manual check, and reports a broken action without a dismissal', function (browser) {
    browser.execute(function () {
      document
        .querySelector('.manual ed11y-element-result')
        .shadowRoot.querySelector('.toggle')
        .click();
    });
    browser.waitForElementPresent('ed11y-element-tip[data-ed11y-open="true"]', 2000);
    browser.execute(
      function () {
        const tip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]').shadowRoot;
        return {
          badge: tip.querySelector('.error-badge').textContent.trim(),
          badgeClass: tip.querySelector('.error-badge').className,
          buttons: Array.from(tip.querySelectorAll('.ed11y-tip-dismissals button')).map((b) =>
            b.textContent.trim(),
          ),
        };
      },
      [],
      (result) => {
        browser.assert.equal(
          result.value.badge,
          'Link needs a manual check',
          'Badge names the link class',
        );
        browser.assert.ok(
          result.value.badgeClass.includes('ed11y-warning'),
          'Badge uses the warning colors',
        );
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
          recorded: !!(Ed11y.UI.dismissedAlerts[page] && Ed11y.UI.dismissedAlerts[page].LINK_MANUAL),
          stillPainted: !!document.querySelector('.manual ed11y-element-result'),
        };
      },
      [],
      (result) => {
        browser.assert.equal(result.value.last.dismissAction, 'broken', 'Broken action dispatched');
        browser.assert.equal(result.value.last.dismissType, 'linkManual', 'Result type travels with it');
        browser.assert.equal(result.value.last.dismissData.hash, 'def456', 'Opaque data travels');
        browser.assert.ok(!result.value.recorded, 'Mark broken is not stored as a dismissal');
        browser.assert.ok(result.value.stillPainted, 'The link stays visible after marking');
      },
    );
  });

  it('shows Restore on marked-OK and ignored links', function (browser) {
    // Hidden alerts are still shown from the first test.
    browser.waitForElementPresent('.okd ed11y-element-result', 2000);
    browser.execute(function () {
      document.querySelector('.okd ed11y-element-result').shadowRoot.querySelector('.toggle').click();
    });
    browser.waitForElementPresent('ed11y-element-tip[data-ed11y-open="true"]', 2000);
    browser.execute(
      function () {
        const tip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]').shadowRoot;
        return {
          title: tip.querySelector('.message .title')?.textContent.trim(),
          buttons: Array.from(tip.querySelectorAll('.ed11y-tip-dismissals button')).map((b) =>
            b.textContent.trim(),
          ),
        };
      },
      [],
      (result) => {
        browser.assert.equal(result.value.title, 'Broken link', 'String content renders with its title');
        browser.assert.deepEqual(
          result.value.buttons,
          ['Restore this alert marked as OK'],
          'Only Restore on a marked-OK link',
        );
      },
    );
    browser.execute(function () {
      document
        .querySelector('ed11y-element-tip[data-ed11y-open="true"]')
        .shadowRoot.querySelector('.close')
        .click();
    });
    browser.waitForElementNotPresent('ed11y-element-tip[data-ed11y-open="true"]', 2000);

    browser.execute(function () {
      document
        .querySelector('.ignored ed11y-element-result')
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
        browser.assert.deepEqual(
          result.value,
          ['Restore this ignored alert'],
          'Only Restore on an ignored link',
        );
      },
    );
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
        return { action: last.dismissAction, type: last.dismissType, hash: last.dismissData.hash };
      },
      [],
      (result) => {
        browser.assert.equal(result.value.action, 'reset', 'Restore dispatches a reset');
        browser.assert.equal(result.value.type, 'link', 'Result type travels with it');
        browser.assert.equal(result.value.hash, 'hide012', 'Opaque data travels');
      },
    );
    browser.execute(
      function () {
        const toggle = document
          .querySelector('.ignored ed11y-element-result')
          ?.shadowRoot.querySelector('.toggle');
        return {
          dismissed: toggle?.classList.contains('dismissed'),
          status: Ed11y.State.results.find((r) => r.data?.hash === 'hide012')?.dismissalStatus,
        };
      },
      [],
      (result) => {
        browser.assert.strictEqual(result.value.dismissed, false, 'Restored link is drawn as active');
        browser.assert.ok(!result.value.status, 'Restored link arrives without a verdict');
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
        browser.assert.equal(
          result.value.dismissedCount,
          2,
          'Only the marked-OK and ignored links count as hidden',
        );
        browser.assert.equal(result.value.totalCount, 2, 'Broken and manual links in the total');
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
