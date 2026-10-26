---
name: test
description: Run editoria11y browser tests in Docker (the only way they run inside the agent sandbox)
---

Run the Playwright browser tests and report results:

1. If `src/` changed since the last build, run `npm run build:js` first. Test pages load `dist/`, not `src/`.
2. Run `npm test`. To run a subset: `npm test -- <spec file name>` or `npm test -- --grep "<test title text>"`.
3. Report pass/fail counts. For each failure, read `e2e/test-results/<test>/error-context.md`: it holds the error and a snapshot of the page.
4. If Docker isn't running, say so and stop. Do not try `npm run test:host` or `npm run dev` instead: the macOS sandbox blocks browsers from starting and blocks local ports, so they fail in confusing ways.

Notes:
- The container has no network. A test that needs the internet will fail; serve fixtures from `tests/` instead.
- New browser specs go in `e2e/tests/*.spec.js`. Use the wait helpers in `e2e/tests/helpers.js` rather than fixed timeouts.
