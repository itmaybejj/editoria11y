describe('Tests Run', function() {

  var path = require('path');
  var absolutePath = 'file:///' + path.resolve('./tests/all_tests.htm');

  before(browser => browser.navigateTo(absolutePath));

  it('No false negatives', function(browser) {
    browser.waitForElementPresent('ed11y-element-panel', 500);
     
    browser.elements('css selector','.positive', nodeContents => {
      nodeContents.value.forEach(node => {
        for (const [key, value] of Object.entries(node)) {
          let elText;
          browser.elementIdText(value, function(result) {
            elText = result.value;
          });
          browser.elementIdElement(value, 'css selector', 'ed11y-element-result', function(result) {
            browser.verify.ok(Object.entries(result.value).length !== 0, `POSITIVE: ${elText}`);
          });
        }

      })
    });
    
    //browser.assert.not.elementPresent('.negative > ed11y-element-result');
    //const resultElements = browser.findElements('.positive');

    //Array.from(resultElements).forEach((item) => {item.assert.elementPresent('ed11y-element-result').console.log(item.getId())});
  });

  /*var noFalsePositive = function (item) {
    item.assert.not.elementPresent('ed11y-element-result', item.getId());
  };*/

  
});
it('No false positives', function(browser) {
 
  //const resultElements = browser.findElements('.negative');

  //Array.from(resultElements).forEach(item => noFalsePositive(item));
  browser.elements('css selector','.negative', nodeContents => {
    nodeContents.value.forEach(node => {
      for (const [key, value] of Object.entries(node)) {
        let elText;
        browser.elementIdText(value, function(result) {
          elText = result.value;
        });
        browser.elementIdElement(value, 'css selector', 'ed11y-element-result', function(result) {
          browser.verify.ok(Object.entries(result.value).length === 0, `NEGATIVE: ${elText}`);
        });
      }

    })
  });

  after(browser => browser.end());
  
});
