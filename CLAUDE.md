# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is Editoria11y

Editoria11y is an inline accessibility "spellcheck" tool for web pages and rich text editors. It runs automatically on page load and gives content authors immediate, actionable feedback about accessibility issues they can fix — without requiring developer intervention. It is a fork/extension of the Sa11y library and is distributed as a standalone JS library, and as Drupal and WordPress plugins.

## Commands

```bash
npm run build        # Full build: lint, clean dist, build CSS + JS
npm run build:css    # Build CSS only (lightningcss)
npm run build:js     # Build JS only (Vite, UMD + ESM, minified + unminified)
npm run lint         # Lint src/ with Biome
npm run lint:fix     # Auto-fix lint issues
npm run dev          # Start Vite dev server at localhost:8080, opens /tests/all_tests.htm
npm run watch        # Watch src/ and rebuild on changes
npm run test         # Run Nightwatch browser tests (Chrome headless, 4 workers)
```

### Running tests

Tests use Nightwatch (browser automation) against HTML test pages. There is no built-in way to run a single test file via npm; run the dev server (`npm run dev`) and open individual test pages manually for development. The main test suite runs against `tests/all_tests.htm`.

## Architecture

### Two-library structure

The codebase contains two layers:

1. **Sa11y foundation** (`src/sa11y-js/`) — the upstream accessibility-checking engine. Rulesets live in `src/sa11y-js/rulesets/`. Utilities for DOM traversal, contrast checking (APCA), and accessible name computation are here.

2. **Editoria11y layer** (`src/js/`) — wraps Sa11y with a CMS-author-focused UI, configuration system, and web components.

### Core flow

`src/js/ed11y.js` → `core/initialize.js` (setup, options, CSS injection) → `core/run.js` (orchestrates checks, collects results) → `core/visualize.js` (renders issues on page) → web components in `src/js/elements/` (panel, result buttons, tooltips).

### UI: Web Components

All UI is implemented as custom elements (`ed11y-element-panel`, `ed11y-element-result`, `ed11y-element-tip`, `ed11y-element-alt`) using Shadow DOM for encapsulation. CSS is bundled into the JS at build time via a custom Vite plugin in `scripts/build.js`.

### State

`src/js/core/ui.js` is the central state object shared across all modules. `src/sa11y-js/core/state.js` holds Sa11y's internal state.

### Configuration

`src/js/utils/ed11y-default-options.js` defines 100+ configurable properties. Options are merged at initialization time and control which checks run, which elements are ignored, theme, language, and editor integration.

### Internationalization

Language files in `src/lang/` (18+ languages). Each exports a translation object. Built into separate JS files in `dist/js/lang/` for on-demand loading by CMS plugins.

### Build output

`dist/js/` contains UMD and ESM bundles (minified and unminified). `dist/css/` contains the standalone stylesheet. Language files are built separately. The `dist/` folder is committed.

### Tests

`tests/all_tests.htm` — one positive for each test
`tests/unit_tests.htm` — primary test page (false negatives + false positives)
`tests/all_tests.cjs` — Nightwatch spec
`nightwatch.conf.js` — test configuration (Chrome headless)

### ACT Rule Conformance

`conformance/` contains a W3C ACT Rules conformance test suite. It uses Playwright to inject ed11y in headless mode into standardized test case HTML pages and compare results against expected outcomes. The rule mapping in `conformance/mapping/act-rule-mapping.js` maps ACT rule IDs to ed11y check keys. Test cases and rule metadata are sourced from a shallow clone of the `w3c/wcag-act-rules` Git repo (cached in `conformance/.cache/repo/`). See DEVELOPMENT.md for full docs, or use `/map-act-rule` and `/conformance` commands.

```bash
npm run conformance:download    # Clone/update w3c/wcag-act-rules repo into .cache/
npm run conformance:list        # List all ACT rules with mapping status
npm run conformance:discover    # Run ed11y against ALL test cases to find mapping candidates
npm run conformance:test        # Run conformance tests via Playwright
npm run conformance:report      # Generate EARL + HTML reports
npm run conformance:dev-report  # Generate dev report with all rules + review links
npm run conformance             # Download + test + report (full pipeline)
```

The test case server (`node conformance/scripts/serve-testcases.js`) supports a `?review` parameter that injects ed11y into test case pages for manual review. The dev report links to these review URLs. Workflow: edit code, `npm run build`, refresh.
