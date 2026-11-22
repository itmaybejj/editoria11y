#!/bin/bash

# Format JS, build .min file and run tests

# Stop on the first failing step instead of reporting a build that did not happen.
set -euo pipefail

# Paths below are relative to the repository root.
cd "$(dirname "$0")/.."

npx eslint ./js --fix
npx uglifyjs ./js/{ed11y-localization,ed11y-test-embeds,ed11y-test-headings,ed11y-test-images,ed11y-test-links,ed11y-test-text,ed11y,ed11y-element-alt,ed11y-element-panel,ed11y-element-result,ed11y-element-tip}.js -m --source-map  --output dist/editoria11y.min.js
npx css-minify -d ./css -o ./dist
#sass --style=compressed css/editoria11y.css dist/editoria11y.min.css
npx nightwatch tests --workers=4 --env=chrome
