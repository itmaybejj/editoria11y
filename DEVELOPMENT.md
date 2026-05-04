# Setup
* Run `scripts/get.sh` to pull and patch Sa11y library files and install node dependencies.
* One-time per-clone git config:
  * `git config core.hooksPath scripts/hooks` — installs the pre-commit hook (refuses direct commits to the protected branch and rebuilds dist/ when src/ is staged).
  * `git config merge.theirs.driver "cp -f %B %A"` — registers the custom merge driver referenced by `.gitattributes` so build artifacts (`dist/**` and `scripts/sa11y-check-keys.json`) auto-resolve to the incoming version on `git pull`. They get rebuilt before every commit, so conflicts in them are never meaningful.
* Run NPM scripts as needed:
  * `npm run watch` compiles and watches JS and CSS folders for changes.
  * `npm run build` compiles once.
  * `npm run lint` lints
  * `npm run test` runs nightwatch tests. 
    * Note that the ChromeDriver dependency needs to be updated with almost every version of Chrome and may be out of date in the repo.
    * Note the first test after a computer reboot often times out. Run it twice before assuming ChromeDriver is the problem.

# Dev server

Start the Vite dev server for working on ed11y source code:
```bash
npm run dev    # starts at http://localhost:8080, opens /tests/all_tests.htm
```
Stop with <kbd>Ctrl+C</kbd>.

# ACT Rule Conformance Testing

Editoria11y includes a test suite that measures conformance against the [W3C ACT Rules](https://www.w3.org/WAI/standards-guidelines/act/rules/) — standardized test cases for accessibility checkers.

## Quick start

```bash
npm run build                  # Ensure dist/ is current
npm run conformance:download   # Clone w3c/wcag-act-rules repo (cached after first run)
npm run conformance:test       # Run ed11y against all mapped test cases
npm run conformance:report     # Generate EARL + HTML reports
npm run conformance            # All steps in sequence, including dev report
```

## Conformance server

The conformance test suite uses a separate local server (not the Vite dev server) to serve ACT test case pages and ed11y dist files.

**Start the server:**
```bash
node conformance/scripts/serve-testcases.js
```

Then visit http://localhost:8844/conformance/reports/conformance-report.html

This starts at **http://localhost:8844**. Stop with <kbd>Ctrl+C</kbd>.

The server binds to `127.0.0.1` only (not accessible from the network) and validates all file paths to prevent directory traversal.

**Available routes:**
| Route | Description |
|-------|-------------|
| `/testcases/{ruleId}/{testcaseId}.html` | ACT test case HTML |
| `/testcases/...?review&expected=...&keys=...&rule=...` | Same, with ed11y injected for manual review |
| `/dist/*` | Ed11y built files |
| `/conformance/reports/conformance-report.html` | Generated reports |
| `/conformance/reports/dev-report.html` | Generated reports |
| `/test-assets/*` | Placeholder images/video for test cases |
| `/health` | Health check |

## Dev report and manual review

The dev report shows **all** ACT rules (not just mapped ones) and links each test case to a review URL that runs ed11y in the browser.

**Generate and view:**
```bash
npm run build                  # Ensure dist/ is current
npm run conformance:download   # Ensure test cases are cached
npm run conformance:discover   # Run ed11y against all test cases (optional, adds signal data)
npm run conformance:dev-report # Generate the dev report HTML
node conformance/scripts/serve-testcases.js  # Start the server
```
Then open: **http://localhost:8844/conformance/reports/dev-report.html**

> **Important:** The dev report must be viewed through the server, not as a `file://` URL, because the test case review links need the server to inject ed11y.

**Review workflow:**
1. Click a test case link in the dev report — it opens with ed11y running and shows an info bar with the expected outcome and mapped check keys
2. Edit ed11y source code
3. Run `npm run build`
4. Refresh the browser to see updated behavior

## Discovery

The discovery script runs ed11y against **every** ACT test case (not just mapped rules) and records which check keys fire. This identifies potential mapping candidates for unmapped rules.

```bash
npm run conformance:discover              # 4 concurrent workers (default)
npm run conformance:discover -- --concurrency=8  # faster with more workers
```

Output:
- `conformance/reports/discovery-raw.json` — per-test-case results
- `conformance/reports/discovery-analysis.json` — per-rule analysis with signal scores

**Signal score:** For each check key, `signal = (failed hit rate) - (passed hit rate)`. A high signal means the check fires on failed test cases but not on passed ones — a strong mapping candidate. Low signal means the check fires equally on all test cases (noise from the minimal test HTML, e.g., "page missing h1").

## Listing rules

```bash
npm run conformance:list             # All rules with mapping status
npm run conformance:list -- --unmapped  # Only unmapped rules
npm run conformance:list -- --json      # Machine-readable output
```

## Running tests

**First run:** You need Playwright browsers installed. If you haven't used Playwright before:
```bash
npx playwright install chromium
```

**Download test cases:** `npm run conformance:download` clones the [w3c/wcag-act-rules](https://github.com/w3c/wcag-act-rules) repo (shallow) into `conformance/.cache/repo/` and creates symlinks so other scripts find test cases at their expected paths. This is cached — subsequent runs do a `git fetch + reset`. Use `--force` to re-clone from scratch.

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

Or use the `/map-act-rule` Claude Code command to automate this research.

**Rules marked `coverage: 'todo'`** are uncertain mappings flagged for review. The mapping may be wrong or the approaches may differ (e.g., ed11y uses APCA contrast vs ACT's WCAG 2.x luminance ratio). Run the tests and use the HTML report to determine if the mapping is valid.

## Submitting to W3C

The EARL report (`conformance/reports/earl-report.json`) follows the W3C format for ACT implementation reports. To submit:
1. Ensure all `todo` mappings are resolved or removed
2. Run a clean conformance pass: `npm run build && npm run conformance`
3. Submit via the [ACT implementations page](https://www.w3.org/WAI/standards-guidelines/act/implementations/) or contact group-act-rules@w3.org

## Remaining work

- **Expand rule mapping**: ~23 ACT rules are currently mapped. Run `npm run conformance:discover` to find additional candidates, and `npm run conformance:list -- --unmapped` to see what's left.
- **Resolve `todo` mappings**: Contrast rules (afw4f7, 09o5cg) use different algorithms; language rules (de46e4) use different approaches; image filename rule (9eb3f6) and SVG rule (7d6734) need validation; menuitem rule (m6b1q3) needs investigation.
- **Language detection**: Ed11y uses Chrome's `LanguageDetector` API which may not be available in Playwright's Chromium. Language-related test cases may time out or produce `cantTell` results.
- **CI integration**: Add a GitHub Actions workflow to run conformance tests on a schedule (weekly) or on demand.
- **Edge cases**: Some test cases use SVG files or XML. The test runner handles `.svg` extensions but exotic test cases may need special handling.

# Distribution

* Update version numbers and copyright information
* remember there is a copy of the readme at index.md (with CSS)
