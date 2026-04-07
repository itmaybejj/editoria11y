# Setup
* Run `scripts/get.sh` to pull and patch Sa11y library files and install node dependencies.
* git config core.hooksPath scripts/hooks
* Run NPM scripts as needed:
  * `npm run watch` compiles and watches JS and CSS folders for changes.
  * `npm run build` compiles once.
  * `npm run lint` lints
  * `npm run test` runs nightwatch tests. 
    * Note that the ChromeDriver dependency needs to be updated with almost every version of Chrome and may be out of date in the repo.
    * Note the first test after a computer reboot often times out. Run it twice before assuming ChromeDriver is the problem.

# ACT Rule Conformance Testing

Editoria11y includes a test suite that measures conformance against the [W3C ACT Rules](https://www.w3.org/WAI/standards-guidelines/act/rules/) — standardized test cases for accessibility checkers.

## Quick start

```bash
npm run build                  # Ensure dist/ is current
npm run conformance:download   # Fetch test cases from W3C (cached after first run)
npm run conformance:test       # Run ed11y against all mapped test cases
npm run conformance:report     # Generate EARL + HTML reports
npm run conformance            # All three steps in sequence
```

## Running tests

**First run:** You need Playwright browsers installed. If you haven't used Playwright before:
```bash
npx playwright install chromium
```

**Download test cases:** `npm run conformance:download` fetches the W3C test case index and downloads HTML files for all mapped ACT rules into `conformance/.cache/`. This is cached — subsequent runs skip existing files. Use `--force` to re-download everything, or `--all` to download test cases for ALL ACT rules (not just the ones ed11y maps to).

**Run tests:** `npm run conformance:test` starts a local server, launches Chromium via Playwright, injects ed11y into each test case page in headless mode, and checks whether ed11y's results match the expected outcome.

**Generate reports:** `npm run conformance:report` reads the test results and produces:
- `conformance/reports/earl-report.json` — EARL JSON-LD format for W3C submission
- `conformance/reports/conformance-report.html` — human-readable report with inline HTML snippets

## Interpreting results

Each ACT test case has an expected outcome:
- **`failed`** — the page has an accessibility issue; ed11y SHOULD flag something
- **`passed`** — the page is fine; ed11y should NOT flag it
- **`inapplicable`** — the rule doesn't apply; ed11y should NOT flag it

A test case is **consistent** when ed11y's behavior matches. The HTML report shows per-rule pass rates and lets you expand each test case to see the actual HTML markup and which ed11y check keys fired (or didn't).

Common reasons for inconsistency:
- **False negative** (expected `failed`, ed11y didn't flag): ed11y's check doesn't cover this specific pattern
- **False positive** (expected `passed`, ed11y flagged): ed11y is too aggressive or the mapping is wrong
- **Mapping mismatch**: the ACT rule tests something slightly different from what ed11y checks

## Updating the rule mapping

The mapping lives in `conformance/mapping/act-rule-mapping.js`. Each entry maps a W3C ACT rule ID to:
- `checkKeys` — ed11y result `.test` values that indicate ed11y detected the issue
- `options` — ed11y constructor options needed (e.g., enabling plugins)
- `coverage` — `"full"`, `"partial"`, or `"todo"` (uncertain, needs review)

**To add a new rule:**
1. Find the ACT rule at https://www.w3.org/WAI/standards-guidelines/act/rules/
2. Identify which ed11y check keys correspond (see `src/js/utils/ed11y-default-options.js` for all check IDs)
3. Add an entry to `actRuleMapping` in the mapping file
4. Run `npm run conformance:download` to fetch the new test cases
5. Run `npm run conformance:test` and review results

**Rules marked `coverage: 'todo'`** are uncertain mappings flagged for review. The mapping may be wrong or the approaches may differ (e.g., ed11y uses APCA contrast vs ACT's WCAG 2.x luminance ratio). Run the tests and use the HTML report to determine if the mapping is valid.

## Submitting to W3C

The EARL report (`conformance/reports/earl-report.json`) follows the W3C format for ACT implementation reports. To submit:
1. Ensure all `todo` mappings are resolved or removed
2. Run a clean conformance pass: `npm run build && npm run conformance`
3. Submit via the [ACT implementations page](https://www.w3.org/WAI/standards-guidelines/act/implementations/) or contact group-act-rules@w3.org

## Remaining work

- **Expand rule mapping**: ~15-20 ACT rules are currently mapped. Review the full rule list for additional coverage, particularly ARIA attribute rules that may partially overlap with ed11y's developer checks.
- **Resolve `todo` mappings**: Contrast rules (afw4f7, 09o5cg) use different algorithms; language rules (de46e4) use different approaches; image filename rule (9eb3f6) and SVG rule (7d6734) need validation.
- **Language detection**: Ed11y uses Chrome's `LanguageDetector` API which may not be available in Playwright's Chromium. Language-related test cases may time out or produce `cantTell` results.
- **CI integration**: Add a GitHub Actions workflow to run conformance tests on a schedule (weekly) or on demand.
- **Edge cases**: Some test cases use SVG files or XML. The test runner handles `.svg` extensions but exotic test cases may need special handling.

# Distribution

* Update version numbers and copyright information
* remember there is a copy of the readme at index.md (with CSS)

