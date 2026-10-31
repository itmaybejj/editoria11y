// Shared helpers for Editoria11y browser specs.

/**
 * Counts ed11yResultsPainted events in window.__ed11yPaints, from before any
 * page script runs. Call once per page, before the first goto().
 *
 * @param {import('@playwright/test').Page} page
 */
export async function trackPaints(page) {
  await page.addInitScript(() => {
    window.__ed11yPaints = 0;
    document.addEventListener('ed11yResultsPainted', () => {
      window.__ed11yPaints++;
    });
  });
}

/**
 * Opens a page and resolves once Editoria11y has painted its first results.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} url
 */
export async function gotoPainted(page, url) {
  await trackPaints(page);
  await page.goto(url);
  await page.waitForFunction(() => window.__ed11yPaints > 0);
}

/**
 * Runs an action that makes Editoria11y repaint, and resolves after it has.
 *
 * @param {import('@playwright/test').Page} page
 * @param {() => Promise<unknown>} action
 */
export async function repaintAfter(page, action) {
  const before = await page.evaluate(() => window.__ed11yPaints);
  await action();
  await page.waitForFunction((count) => window.__ed11yPaints > count, before);
}

/**
 * Clicks a button in the Editoria11y panel's shadow root.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} selector
 */
export async function clickPanel(page, selector) {
  await page.evaluate((sel) => {
    document.querySelector('ed11y-element-panel').shadowRoot.querySelector(sel).click();
  }, selector);
}
