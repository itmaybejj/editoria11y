# Testing

Testing is accomplished with the ["Nightwatch" framework](https://nightwatchjs.org/). Browsers are driven with the ["Selenium" package](https://www.selenium.dev/downloads/). The tests are declared as development depenencies.

## Running tests
Simply run this command: `npx nightwatch tests`

If you're having trouble connecting to a specific browser, try targetting just a specific one: `npx nightwatch tests --env chrome`