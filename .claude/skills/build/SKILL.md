---
name: build
description: Build editoria11y dist files (lint, CSS, JS) and verify output
disable-model-invocation: true
---

Run the full build pipeline and verify:

1. Run `npm run build`
2. Verify dist/ files were generated: `ls dist/js/ed11y.esm.js dist/js/ed11y.umd.js dist/js/ed11y.esm.min.js dist/js/ed11y.umd.min.js`
3. Report any build errors or warnings
4. If the build fails, check `npm run lint` output separately to isolate whether the issue is linting or bundling
