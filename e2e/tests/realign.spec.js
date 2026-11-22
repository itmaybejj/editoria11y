// Typing in an editable region reflows the content after the caret. Result
// buttons there are absolutely positioned, so the realign the MutationObserver
// requests (incrementalAlign, on the next animation frame) must move them with
// their targets — without waiting for the slow incremental recheck (500ms+).
import { expect, test } from '@playwright/test';
import { gotoPainted } from './helpers.js';

// startObserver schedules one realign 1s after it attaches. Edit after it has
// fired so these tests only pass if the edit itself triggers the realign.
const SETTLE_MS = 1100;
// Well under slowIncremental's 500ms debounce, well over a few frames.
const REALIGN_MS = 250;
test.describe.configure({ timeout: 6_000 });

async function gotoSettled(page) {
  await gotoPainted(page, '/tests/editable-realign.htm');
  await page.waitForTimeout(SETTLE_MS);
}

/** Vertical gap between each visible result toggle and the element it flags. */
function buttonOffsets() {
  return [...document.querySelectorAll('ed11y-element-result')]
    .filter((host) => host.result?.element)
    .map((host) => {
      const toggle = host.shadowRoot.querySelector('button');
      const target = host.result.element.getBoundingClientRect();
      return Math.round(toggle.getBoundingClientRect().top - target.top);
    });
}

/** Replaces the typing target's text, as a characterData mutation. */
async function typeWords(page, count) {
  return page.evaluate((n) => {
    const link = document.querySelector('#editable-region a');
    const top = link.getBoundingClientRect().top;
    document.querySelector('#typing-target').firstChild.data =
      `Type here.${' more words'.repeat(n)}`;
    return Math.abs(link.getBoundingClientRect().top - top);
  }, count);
}

test('result buttons follow their targets while typing', async ({ page }) => {
  await gotoSettled(page);
  const before = await page.evaluate(buttonOffsets);
  expect(before.length, 'the fixture has results to align').toBeGreaterThan(0);

  const shift = await typeWords(page, 300);
  expect(shift, 'the edit moved the flagged content').toBeGreaterThan(50);
  await expect
    .poll(() => page.evaluate(buttonOffsets), { timeout: REALIGN_MS })
    .toEqual(before);
});

test('realign keeps working after the first edit', async ({ page }) => {
  await gotoSettled(page);
  const before = await page.evaluate(buttonOffsets);

  for (const words of [100, 300, 0]) {
    await typeWords(page, words);
    await expect
      .poll(() => page.evaluate(buttonOffsets), { timeout: REALIGN_MS })
      .toEqual(before);
  }
});

test('no animation-frame loop keeps running once aligned', async ({ page }) => {
  await gotoSettled(page);
  await typeWords(page, 100);
  // Let the realign and the slow incremental recheck finish.
  await page.waitForTimeout(1500);
  const frames = await page.evaluate(async () => {
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
  // An idle page requests no frames; a retry loop requests ~30 in 500ms.
  expect(frames).toBeLessThan(3);
});
