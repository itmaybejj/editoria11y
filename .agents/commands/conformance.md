---
description: Run ACT conformance tests and show results
arguments:
  - name: scope
    description: "all" to run everything, or an ACT rule ID to test one rule, or "report" to regenerate reports
    required: false
---

# Run ACT Conformance Tests

## Setup check
Verify `conformance/.cache/testcases.json` exists. If not, run `npm run conformance:download` first.
Verify `dist/js/ed11y.umd.js` exists. If not, run `npm run build` first.

## Based on scope

### If scope is empty or "all"
Run the full suite:
```
npx playwright test --config=conformance/playwright.config.js
```
Then generate reports:
```
node conformance/scripts/generate-report.js
```
Show the summary table from the report generator output.

### If scope is a rule ID (e.g., "23a2a8")
Run just that rule:
```
npx playwright test --config=conformance/playwright.config.js -- --grep "{scope}"
```
Then show the per-rule JSON from `conformance/reports/parts/{scope}.json`, highlighting inconsistent cases with their expected vs actual results.

### If scope is "report"
Just regenerate reports from existing test data:
```
node conformance/scripts/generate-report.js
```

## After running
- Tell the user the HTML report is at `conformance/reports/conformance-report.html`
- If there are inconsistencies, briefly categorize them (false negatives vs false positives vs errors)
- For rules with errors/timeouts, explain what happened (e.g., meta refresh navigation)
