// Stylesheets reach every shadow root once: as shared adopted CSSStyleSheets
// when the page is served over HTTP, or as one cloned <link> bundle per root
// when the CSS cannot be shared (file:// pages, @import, wrong Content-Type).
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { expect, test } from '@playwright/test';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/** Resolves once the first result button's toggle has Editoria11y styles. */
async function waitForStyledResult(page) {
  await page.waitForFunction(() => {
    const toggle = document
      .querySelector('ed11y-element-result')
      ?.shadowRoot?.querySelector('.toggle');
    return toggle && getComputedStyle(toggle).position === 'absolute';
  });
}

/** Style facts for the document and every Editoria11y shadow root. */
function inspectStyles() {
  const roots = [...document.querySelectorAll('.ed11y-element, ed11y-element-panel')]
    .map((host) => host.shadowRoot)
    .filter(Boolean);
  const firstSheets = roots[0].adoptedStyleSheets;
  return {
    rootCount: roots.length,
    maxLinkBundles: Math.max(...roots.map((r) => r.querySelectorAll('.ed11y-style').length)),
    adopted: roots.map((r) => r.adoptedStyleSheets.length),
    duplicateAdoptions: roots.some(
      (r) => new Set(r.adoptedStyleSheets).size !== r.adoptedStyleSheets.length,
    ),
    // Same CSSStyleSheet objects in every root means one parsed copy in memory.
    allShareSheets: roots.every(
      (r) =>
        r.adoptedStyleSheets.length === firstSheets.length &&
        r.adoptedStyleSheets.every((s, i) => s === firstSheets[i]),
    ),
    documentAdopted: document.adoptedStyleSheets.length,
  };
}

/** Custom cssUrls must behave as they did when loaded by <link>. */
function inspectCustomSheet() {
  const root = document.querySelector('ed11y-element-result').shadowRoot;
  const style = getComputedStyle(root.querySelector('.toggle'));
  const prop = (name) => style.getPropertyValue(name).trim();
  return {
    cursor: style.cursor,
    unquoted: prop('--ed11y-test-unquoted'),
    quoted: prop('--ed11y-test-quoted'),
    root: prop('--ed11y-test-root'),
    data: prop('--ed11y-test-data'),
    fragment: prop('--ed11y-test-fragment'),
    string: prop('--ed11y-test-string'),
    linkBundles: root.querySelectorAll('.ed11y-style').length,
    adopted: root.adoptedStyleSheets.length,
  };
}

test.describe('Shared stylesheets', () => {
  test('adopts one shared copy of the CSS over HTTP', async ({ page }) => {
    await page.goto('/tests/all_tests.htm');
    await waitForStyledResult(page);
    const value = await page.evaluate(inspectStyles);
    expect(value.rootCount, 'several shadow roots').toBeGreaterThan(1);
    expect(value.maxLinkBundles, 'no <link> bundles in shadow roots').toBe(0);
    expect(
      value.adopted.every((n) => n > 0),
      'every shadow root adopted sheets',
    ).toBe(true);
    expect(value.duplicateAdoptions, 'no root adopted a sheet twice').toBe(false);
    expect(value.allShareSheets, 'all roots share the same sheet objects').toBe(true);
    expect(value.documentAdopted, 'document adopted sheets').toBeGreaterThan(0);
  });

  test('falls back to one <link> bundle per root on file://', async ({ page }) => {
    await page.goto(pathToFileURL(path.join(repoRoot, 'tests/all_tests.htm')).href);
    await waitForStyledResult(page);
    const value = await page.evaluate(inspectStyles);
    expect(value.maxLinkBundles, 'at most one <link> bundle per root').toBe(1);
    expect(
      value.adopted.every((n) => n === 0),
      'fallback roots adopt nothing',
    ).toBe(true);
  });

  test('resolves relative url()s in custom sheets against the sheet', async ({ page, baseURL }) => {
    const icon = `url("${baseURL}/tests/custom-css/check.svg")`;
    await page.goto('/tests/custom_css.htm?sheet=relative-urls');
    await waitForStyledResult(page);
    // The base sheet and the override fill separately; wait for the override.
    await page.waitForFunction(() => {
      const toggle = document
        .querySelector('ed11y-element-result')
        .shadowRoot.querySelector('.toggle');
      return getComputedStyle(toggle).getPropertyValue('--ed11y-test-unquoted') !== '';
    });
    const value = await page.evaluate(inspectCustomSheet);
    expect(value.adopted, 'custom sheet is shared, not linked').toBeGreaterThan(0);
    expect(value.linkBundles, 'no <link> fallback').toBe(0);
    expect(value.cursor, 'cursor resolves next to the sheet').toBe(`${icon}, pointer`);
    expect(value.unquoted, 'unquoted url() is absolutized').toBe(icon);
    expect(value.quoted, 'quoted ../ url() is absolutized').toBe(icon);
    expect(value.root, 'root-relative url() uses the sheet origin').toBe(icon);
    expect(value.data, 'data: URI is untouched').toBe(
      'url(data:image/gif;base64,R0lGODlhAQABAAAAACw=)',
    );
    expect(value.fragment, 'fragment reference is untouched').toBe('url(#mask)');
    expect(value.string, 'url( inside a string is untouched').toBe('"url(not-a-url.svg)"');
  });

  test('falls back to <link> when a custom sheet uses @import', async ({ page, baseURL }) => {
    await page.goto('/tests/custom_css.htm?sheet=with-import');
    await page.waitForFunction(() => {
      const root = document.querySelector('ed11y-element-result')?.shadowRoot;
      const toggle = root?.querySelector('.toggle');
      return toggle && getComputedStyle(toggle).cursor.startsWith('url(');
    });
    const value = await page.evaluate(inspectCustomSheet);
    expect(value.adopted, 'nothing adopted').toBe(0);
    expect(value.linkBundles, 'one <link> bundle').toBe(1);
    expect(value.cursor, 'imported rule applies').toBe(
      `url("${baseURL}/tests/custom-css/check.svg"), pointer`,
    );
  });

  test('falls back to <link> when a sheet is not served as text/css', async ({ page }) => {
    await page.goto('/tests/custom_css.htm?sheet-type=text/plain');
    await page.waitForFunction(() =>
      document.querySelector('ed11y-element-result')?.shadowRoot?.querySelector('.ed11y-style'),
    );
    const value = await page.evaluate(inspectCustomSheet);
    expect(value.adopted, 'the mislabeled response is not adopted').toBe(0);
    expect(value.linkBundles, 'one <link> bundle').toBe(1);
  });
});
