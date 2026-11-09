// Every built language bundle renders its results: each tip has a title from
// testNames, and no %(placeholder) is left unfilled. Lang.sprintf fills
// placeholders by position, so a missing one shows up here as literal text.
import { readdirSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { gotoPainted } from './helpers.js';

const langDir = new URL('../../dist/js/lang/', import.meta.url);
const langs = readdirSync(langDir)
  .filter((file) => file.endsWith('.umd.js'))
  .map((file) => file.replace(/\.umd\.js$/, ''));

// Same naming rule as the UMD builds in scripts/build.js.
const globalName = (code) => `Ed11yLang${code.charAt(0).toUpperCase()}${code.slice(1)}`;

// Titles that must be written in the language's own script.
const scripts = { ar: /\p{Script=Arabic}/u };

/** Serves all_tests.htm with the given language bundle in place of English. */
async function useLanguage(page, code) {
  await page.route('**/tests/all_tests.htm', async (route) => {
    const response = await route.fetch();
    const original = await response.text();
    const loader = '<script src="../dist/js/ed11y.umd.js"></script>';
    const option = 'lang: Ed11yLangEn.lang,';
    if (!original.includes(loader) || !original.includes(option)) {
      throw new Error('all_tests.htm no longer loads Editoria11y the way this spec expects');
    }
    const body = original
      .replace(loader, `${loader}\n<script src="../dist/js/lang/${code}.umd.js"></script>`)
      .replace(option, `lang: window['${globalName(code)}'].lang,`);
    await route.fulfill({ response, body });
  });
}

/** Summarizes the tip each result displays. */
function readResults() {
  return window.Ed11y.State.results.map((result) => {
    let content;
    if (typeof result.content === 'string') {
      content = document.createElement('div');
      content.innerHTML = result.content;
    } else {
      content = result.content?.cloneNode(true);
    }
    // Like ed11y-element-tip.js, drop Sa11y's plaintext tip that follows an <hr>.
    for (const hr of content?.querySelectorAll('hr') ?? []) {
      while (hr.nextSibling) hr.nextSibling.remove();
      hr.remove();
    }
    return {
      test: result.test,
      title: content?.querySelector('.title')?.textContent.trim() ?? '',
      text: content?.textContent ?? '',
    };
  });
}

for (const code of langs) {
  test(`results render in ${code}`, async ({ page }) => {
    await useLanguage(page, code);
    await gotoPainted(page, '/tests/all_tests.htm');
    const results = await page.evaluate(readResults);
    expect(results.length, 'the page has results').toBeGreaterThan(0);

    const untitled = results.filter((r) => !r.title || r.title === 'undefined').map((r) => r.test);
    expect(untitled, 'results without a translated title').toEqual([]);

    const unfilled = results
      .filter((r) => /%\([A-Za-z_]+\)/.test(r.text))
      .map((r) => `${r.test}: ${r.text.match(/%\([A-Za-z_]+\)/)[0]}`);
    expect(unfilled, 'results with an unfilled placeholder').toEqual([]);

    if (scripts[code]) {
      const foreign = results.filter((r) => !scripts[code].test(r.title)).map((r) => `${r.test}: ${r.title}`);
      expect(foreign, `titles not written in the ${code} script`).toEqual([]);
    }
  });
}
