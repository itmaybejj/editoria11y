# Setup
* Run `npm install` to gather dependencies.
* Use `uglifyjs js/{ed11y-localization,ed11y-element-alt,ed11y-element-panel,ed11y-element-result,ed11y-test-embeds,ed11y-test-headings,ed11y-test-images,ed11y-test-links,ed11y-test-text,ed11y}.js -c --verbose --output dist/editoria11y.min.js` to help locate unused and duplicated variables.

# Distribution
* Update version numbers and copyright information
* Generate the min.js [todo MVP: preserve license info] `uglifyjs js/{ed11y-localization,ed11y-element-alt,ed11y-element-panel,ed11y-element-result,ed11y-test-embeds,ed11y-test-headings,ed11y-test-images,ed11y-test-links,ed11y-test-text,ed11y}.js -c -m --output dist/editoria11y.min.js` 

# Testing

## Code style
Run `npx eslint js` from the project root.

## Unit tests
Testing is accomplished with the ["Nightwatch" framework](https://nightwatchjs.org/). The tests are declared as development depenencies.
Run `npx nightwatch tests --env=firefox` (or chrome/edge/safari...) from the project root.
