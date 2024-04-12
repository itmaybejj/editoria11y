#!/bin/bash

# Format JS, build .min file and run tests

npx eslint ./js --fix
uglifyjs ./js/{ed11y-localization,ed11y-element-alt,ed11y-element-panel,ed11y-element-result,ed11y-element-tip,ed11y-test-embeds,ed11y-test-headings,ed11y-test-images,ed11y-test-links,ed11y-test-text,ed11y}.js -c -m --output dist/editoria11y.min.js
npx nightwatch tests --workers=4 --env=chrome
