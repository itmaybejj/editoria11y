// Every element marked .positive on a test page must get a result button,
// and every element marked .negative must not.
import { expect, test } from '@playwright/test';
import { gotoPainted } from './helpers.js';

/** Elements that break their .positive / .negative expectation. */
function findMismatches() {
  // Light-DOM descendants only: results are drawn next to the flagged
  // element, and nested shadow content is checked by its own markers.
  const describe = (el) =>
    (el.textContent.trim().replace(/\s+/g, ' ') || el.outerHTML).slice(0, 160);
  return {
    falseNegatives: [...document.querySelectorAll('.positive')]
      .filter((el) => !el.querySelector('ed11y-element-result'))
      .map(describe),
    falsePositives: [...document.querySelectorAll('.negative')]
      .filter((el) => el.querySelector('ed11y-element-result'))
      .map(describe),
    positives: document.querySelectorAll('.positive').length,
    negatives: document.querySelectorAll('.negative').length,
  };
}

for (const file of ['all_tests.htm']) {
  test.describe(`Checks on ${file}`, () => {
    test('flags every positive and no negative', async ({ page }) => {
      await gotoPainted(page, `/tests/${file}`);
      const value = await page.evaluate(findMismatches);
      expect(value.positives, 'the page has positive cases').toBeGreaterThan(0);
      expect(value.falseNegatives, 'POSITIVE elements without a result').toEqual([]);
      expect(value.falsePositives, 'NEGATIVE elements with a result').toEqual([]);
    });
  });
}
