describe('Load Demo Page', function() {

  var path = require("path");
  var absolutePath = "file:///" + path.resolve("./demo/index.htm")

  before(browser => browser.navigateTo(absolutePath));

  it('Load Demo Page', function(browser) {
    browser
      .waitForElementVisible('body')
      .assert.textContains('body', 'Editoria11y Unit Tests')
  });

  after(browser => browser.end());
});
