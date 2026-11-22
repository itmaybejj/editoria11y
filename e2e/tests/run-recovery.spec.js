// A check run that throws must not leave Editoria11y frozen. Before this was
// handled, UI.running stayed true and observers stayed paused, so no later edit
// was checked, the panel toggle ignored clicks, and incrementalAlign retried
// every animation frame forever.
import { expect, test } from '@playwright/test';
import { gotoPainted } from './helpers.js';

const PAGE = '/tests/editable-realign.htm';
test.describe.configure({ timeout: 8_000 });

/** Adds a "click here" link with the given id, the way an author would. */
async function addIssue(page, id) {
  await page.evaluate((linkId) => {
    // Rechecks only start after an interaction.
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    const p = document.createElement('p');
    p.innerHTML = `<a id="${linkId}" href="#somewhere">click here</a>`;
    document.querySelector('#editable-region').append(p);
  }, id);
}

/** Whether a result button is drawn for the link with this id. */
async function isFlagged(page, id) {
  return page.evaluate(
    (linkId) =>
      [...document.querySelectorAll('ed11y-element-result')].some(
        (host) => host.result?.element?.id === linkId,
      ),
    id,
  );
}

const errorDialogs = () => document.querySelectorAll('sa11y-console-error').length;

/** Animation frames requested during 500ms of idle time. */
async function idleFrames(page) {
  return page.evaluate(async () => {
    let count = 0;
    const raf = window.requestAnimationFrame;
    window.requestAnimationFrame = (cb) => {
      count++;
      return raf.call(window, cb);
    };
    await new Promise((resolve) => setTimeout(resolve, 500));
    window.requestAnimationFrame = raf;
    return count;
  });
}

test('a run that fails outside the rulesets ends, and the next edit is checked', async ({
  page,
}) => {
  await gotoPainted(page, PAGE);

  // Break one step of painting the panel, once.
  await page.evaluate(() => {
    const toggle = Ed11y.UI.panelToggle;
    const original = toggle.removeAttribute;
    window.__ed11yFailures = 0;
    toggle.removeAttribute = function (...args) {
      if (window.__ed11yFailNext) {
        window.__ed11yFailNext = false;
        window.__ed11yFailures++;
        throw new Error('Simulated paint failure');
      }
      return original.apply(this, args);
    };
    window.__ed11yFailNext = true;
  });
  await addIssue(page, 'during-failure');
  await page.waitForFunction(() => window.__ed11yFailures === 1);

  await expect.poll(() => page.evaluate(() => Ed11y.UI.running)).toBe(false);
  expect(await page.evaluate(errorDialogs), 'the failure is shown').toBe(1);
  expect(await idleFrames(page), 'no frame loop after a failure').toBeLessThan(3);

  // The next edit is checked and drawn.
  await addIssue(page, 'after-failure');
  await expect.poll(() => isFlagged(page, 'after-failure')).toBe(true);
  expect(await isFlagged(page, 'during-failure')).toBe(true);
});

test('a custom test that answers after being dropped does not stall later runs', async ({
  page,
}) => {
  // One custom test that misses the 1000ms deadline on the first run, so it
  // is dropped, and then answers anyway.
  await page.addInitScript(() => {
    document.addEventListener(
      'ed11yRunCustomTests',
      () => {
        setTimeout(() => {
          document.dispatchEvent(new CustomEvent('ed11yResume'));
          window.__ed11yLateResume = true;
        }, 1200);
      },
      { once: true },
    );
  });
  await gotoPainted(page, `${PAGE}?customTests=1`);
  await page.waitForFunction(() => window.__ed11yLateResume === true);

  await addIssue(page, 'after-late-answer');
  await expect.poll(() => isFlagged(page, 'after-late-answer')).toBe(true);
  expect(await page.evaluate(() => Ed11y.UI.running)).toBe(false);
});

test('a ruleset that throws is reported once and the other rulesets still run', async ({
  page,
}) => {
  await gotoPainted(page, PAGE);

  // A custom rule whose element set throws on every run.
  await page.evaluate(() => {
    Ed11y.State.option.customRules.push({
      testKey: 'throwingRule',
      elementSet: {
        forEach() {
          throw new Error('Simulated ruleset failure');
        },
      },
    });
  });

  await addIssue(page, 'first-edit');
  await expect.poll(() => isFlagged(page, 'first-edit')).toBe(true);
  await addIssue(page, 'second-edit');
  await expect.poll(() => isFlagged(page, 'second-edit')).toBe(true);

  expect(await page.evaluate(errorDialogs), 'one dialog, not one per run').toBe(1);
  expect(await page.evaluate(() => Ed11y.UI.running)).toBe(false);
});
