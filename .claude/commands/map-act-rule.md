---
description: Research an ACT rule and propose a mapping to ed11y check keys
arguments:
  - name: rule_id
    description: The ACT rule ID (e.g., "23a2a8") or "list" to show unmapped rules
    required: true
---

# Map ACT Rule to Editoria11y

## Prerequisites

Test case data comes from a shallow clone of the w3c/wcag-act-rules repo. If the cache is missing, run `npm run conformance:download` first.

## If $ARGUMENTS.rule_id is "list"

Run `npm run conformance:list` to show all ACT rules with their mapping status.
Add `-- --unmapped` to show only unmapped rules, or `-- --json` for machine-readable output.

## If $ARGUMENTS.rule_id is a specific rule ID

Research the ACT rule and propose a mapping:

1. **Read the ACT rule page** at `https://www.w3.org/WAI/standards-guidelines/act/rules/$ARGUMENTS.rule_id/proposed/` — understand its applicability, expectations, and test case examples

2. **Read the current mapping** in `conformance/mapping/act-rule-mapping.js` — check if this rule is already mapped

3. **Check rule metadata** in `conformance/.cache/wcag-mapping.json` — find the rule's WCAG criteria, type, and deprecation status

4. **Search ed11y rulesets** for relevant checks:
   - Read `src/js/utils/ed11y-default-options.js` to find all check IDs
   - Search `src/sa11y-js/rulesets/` for checks that test the same thing the ACT rule tests
   - Pay attention to: what elements are selected, what conditions trigger the check, whether the check is enabled by default

5. **Propose a mapping** with:
   - Which ed11y `checkKeys` correspond to this rule
   - Which options/plugins need to be enabled
   - Coverage assessment: `full`, `partial`, or `todo` with explanation
   - Any gaps where ed11y doesn't cover what the ACT rule tests
   - Any concerns about false positives or methodology differences

6. **If the mapping looks viable**, offer to:
   - Add the entry to `act-rule-mapping.js`
   - Download the new test cases: `npm run conformance:download`
   - Run the test for this rule: `npx playwright test --config=conformance/playwright.config.js -- --grep "$ARGUMENTS.rule_id"`
   - Show the results

Always present ambiguous decisions to the user before committing a mapping.
