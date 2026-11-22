describe('Right-to-left layout', function() {

  const path = require('path');
  const absolutePath = 'file:///' + path.resolve('./tests/rtl.htm');

  // Returns the computed values of `props` for the element matching `selector`
  // inside the panel's shadow root, or null if it is not there.
  const panelStyles = function(selector, props) {
    const root = document.querySelector('ed11y-element-panel')?.shadowRoot;
    const el = root?.querySelector(selector);
    if (!el) {
      return null;
    }
    const style = getComputedStyle(el);
    const values = {};
    props.forEach(prop => {
      values[prop] = style.getPropertyValue(prop);
    });
    return values;
  };

  const expectStyles = function(browser, selector, expected, label) {
    browser.execute(panelStyles, [selector, Object.keys(expected)], result => {
      const values = result.value;
      browser.assert.ok(values !== null, `${label}: ${selector} exists`);
      if (!values) {
        return;
      }
      for (const [prop, test] of Object.entries(expected)) {
        const pass = test instanceof RegExp ? test.test(values[prop]) : values[prop] === test;
        browser.assert.ok(pass, `${label}: ${prop} is ${test} (got "${values[prop]}")`);
      }
    });
  };

  before(browser => {
    browser.navigateTo(absolutePath);
    browser.waitForElementPresent('ed11y-element-result', 1000);
    // The bar is open because the page has errors; let transitions settle.
    browser.pause(500);
  });

  it('Panel resolves as right-to-left', function(browser) {
    expectStyles(browser, '#ed11y-panel', {direction: 'rtl'}, 'panel');
  });

  it('Jump button is the rounded left end', function(browser) {
    expectStyles(browser, 'button.ed11y-jump', {
      'border-top-left-radius': /^[1-9]/,
      'border-top-right-radius': '0px',
      'margin-left': '0px',
      'margin-right': '-3px',
    }, 'jump');
  });

  it('First button is the rounded right end', function(browser) {
    expectStyles(browser, '#ed11y-show-hidden:first-child, .ed11y-buttonbar [hidden]:first-child + #ed11y-visualize', {
      'border-top-right-radius': /^[1-9]/,
      'border-top-left-radius': '0px',
    }, 'first button');
  });

  it('Visualize keeps the error-state padding on the toggle side', function(browser) {
    expectStyles(browser, '.ed11y-errors #ed11y-visualize', {
      'padding-left': '11px',
      'margin-left': '-3px',
      'margin-right': '0px',
    }, 'visualize');
  });

  it('Pressed visualize casts its shadow to the left', function(browser) {
    browser.execute(function() {
      document.querySelector('ed11y-element-panel').shadowRoot.querySelector('#ed11y-visualize').click();
    });
    browser.pause(300);
    expectStyles(browser, '#ed11y-visualize[data-ed11y-pressed="true"]', {
      'box-shadow': /\s-7px 0px 0px 0px$/,
    }, 'pressed visualize');
  });

  after(browser => browser.end());

});
