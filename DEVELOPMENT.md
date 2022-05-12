# Setup
* Run `npm install` to gather dependencies.

# Testing

## Code style
Run `npx eslint js` from the project root.

## Unit tests
Testing is accomplished with the ["Nightwatch" framework](https://nightwatchjs.org/). The tests are declared as development depenencies.
Run `npx nightwatch tests --env=[chrome|firefox|edge|safari]` from the project root.
