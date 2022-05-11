describe('Load Demo Page', function() {

  var path = require('path');
  var absolutePath = 'file:///' + path.resolve('./docs/tests/index.htm');

  before(browser => browser.navigateTo(absolutePath));

  it('Load Demo Page', function(browser) {
    browser
      .waitForElementVisible('ed11y-element-panel')
      .assert.elementPresent('ed11y-element-result');
  });

  after(browser => browser.end());
});
