// Stylesheets reach every shadow root once: as shared adopted CSSStyleSheets
// when the page is served over HTTP, or as one cloned <link> bundle per root
// when the CSS cannot be fetched as text (file:// pages).
const http = require('http');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const types = { '.htm': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };

// Collects style facts for the document and every Editoria11y shadow root.
function inspectStyles() {
  const roots = [...document.querySelectorAll('.ed11y-element, ed11y-element-panel')]
    .map((host) => host.shadowRoot)
    .filter(Boolean);
  const toggle = document.querySelector('ed11y-element-result').shadowRoot.querySelector('.toggle');
  const firstSheets = roots[0].adoptedStyleSheets;
  return {
    rootCount: roots.length,
    togglePosition: getComputedStyle(toggle).position,
    maxLinkBundles: Math.max(...roots.map((r) => r.querySelectorAll('.ed11y-style').length)),
    adopted: roots.map((r) => r.adoptedStyleSheets.length),
    duplicateAdoptions: roots.some(
      (r) => new Set(r.adoptedStyleSheets).size !== r.adoptedStyleSheets.length,
    ),
    // Same CSSStyleSheet objects in every root means one parsed copy in memory.
    allShareSheets: roots.every(
      (r) =>
        r.adoptedStyleSheets.length === firstSheets.length &&
        r.adoptedStyleSheets.every((s, i) => s === firstSheets[i]),
    ),
    documentAdopted: document.adoptedStyleSheets.length,
  };
}

describe('Shared stylesheets', function () {
  let server;
  let port;

  before((browser, done) => {
    server = http.createServer((req, res) => {
      const file = path.join(repoRoot, decodeURIComponent(new URL(req.url, 'http://x').pathname));
      if (!file.startsWith(repoRoot) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404).end();
        return;
      }
      const query = new URL(req.url, 'http://x').searchParams;
      const type = types[path.extname(file)] || 'application/octet-stream';
      if (query.has('serve-as')) {
        // Simulates a server that labels the CSS with the wrong type.
        res.writeHead(200, { 'Content-Type': query.get('serve-as') });
      } else if (type === 'text/css' && !req.headers.accept?.includes('text/css')) {
        // Like the Vite dev server: CSS requested without Accept: text/css
        // is served as a JavaScript module.
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end('const __vite__css = ".toggle{}"; export default __vite__css;');
        return;
      } else {
        res.writeHead(200, { 'Content-Type': type });
      }
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => {
      port = server.address().port;
      done();
    });
  });

  it('adopts one shared copy of the CSS over HTTP', function (browser) {
    browser.navigateTo(`http://127.0.0.1:${port}/tests/all_tests.htm`);
    browser.waitForElementPresent('ed11y-element-result', 2000);
    browser.pause(500);
    browser.execute(inspectStyles, [], ({ value }) => {
      browser.assert.ok(value.rootCount > 1, `found ${value.rootCount} shadow roots`);
      browser.assert.equal(value.togglePosition, 'absolute', 'result toggle is styled');
      browser.assert.equal(value.maxLinkBundles, 0, 'no <link> bundles in shadow roots');
      browser.assert.ok(value.adopted.every((n) => n > 0), 'every shadow root adopted sheets');
      browser.assert.ok(!value.duplicateAdoptions, 'no root adopted a sheet twice');
      browser.assert.ok(value.allShareSheets, 'all roots share the same sheet objects');
      browser.assert.ok(value.documentAdopted > 0, 'document adopted sheets');
    });
  });

  it('falls back to one <link> bundle per root on file://', function (browser) {
    browser.navigateTo(`file:///${path.resolve(repoRoot, 'tests/all_tests.htm')}`);
    browser.waitForElementPresent('ed11y-element-result', 2000);
    browser.pause(500);
    browser.execute(inspectStyles, [], ({ value }) => {
      browser.assert.equal(value.togglePosition, 'absolute', 'result toggle is styled');
      browser.assert.equal(value.maxLinkBundles, 1, 'at most one <link> bundle per root');
      browser.assert.ok(value.adopted.every((n) => n === 0), 'fallback roots adopt nothing');
    });
  });

  // Custom cssUrls must behave as they did when loaded by <link>.
  function inspectCustomSheet() {
    const root = document.querySelector('ed11y-element-result').shadowRoot;
    const style = getComputedStyle(root.querySelector('.toggle'));
    const prop = (name) => style.getPropertyValue(name).trim();
    return {
      cursor: style.cursor,
      unquoted: prop('--ed11y-test-unquoted'),
      quoted: prop('--ed11y-test-quoted'),
      root: prop('--ed11y-test-root'),
      data: prop('--ed11y-test-data'),
      fragment: prop('--ed11y-test-fragment'),
      string: prop('--ed11y-test-string'),
      linkBundles: root.querySelectorAll('.ed11y-style').length,
      adopted: root.adoptedStyleSheets.length,
    };
  }

  it('resolves relative url()s in custom sheets against the sheet', function (browser) {
    const sheetDir = `http://127.0.0.1:${port}/tests/custom-css/`;
    const icon = `url("${sheetDir}check.svg")`;
    browser.navigateTo(`http://127.0.0.1:${port}/tests/custom_css.htm?sheet=relative-urls`);
    browser.waitForElementPresent('ed11y-element-result', 2000);
    browser.pause(500);
    browser.execute(inspectCustomSheet, [], ({ value }) => {
      browser.assert.ok(value.adopted > 0, 'custom sheet is shared, not linked');
      browser.assert.equal(value.linkBundles, 0, 'no <link> fallback');
      browser.assert.equal(value.cursor, `${icon}, pointer`, 'cursor resolves next to the sheet');
      browser.assert.equal(value.unquoted, icon, 'unquoted url() is absolutized');
      browser.assert.equal(value.quoted, icon, 'quoted ../ url() is absolutized');
      browser.assert.equal(value.root, icon, 'root-relative url() uses the sheet origin');
      browser.assert.equal(
        value.data,
        'url(data:image/gif;base64,R0lGODlhAQABAAAAACw=)',
        'data: URI is untouched',
      );
      browser.assert.equal(value.fragment, 'url(#mask)', 'fragment reference is untouched');
      browser.assert.equal(value.string, '"url(not-a-url.svg)"', 'url( inside a string is untouched');
    });
  });

  it('falls back to <link> when a custom sheet uses @import', function (browser) {
    browser.navigateTo(`http://127.0.0.1:${port}/tests/custom_css.htm?sheet=with-import`);
    browser.waitForElementPresent('ed11y-element-result', 2000);
    browser.pause(500);
    browser.execute(inspectCustomSheet, [], ({ value }) => {
      browser.assert.equal(value.adopted, 0, 'nothing adopted');
      browser.assert.equal(value.linkBundles, 1, 'one <link> bundle');
      browser.assert.equal(
        value.cursor,
        `url("http://127.0.0.1:${port}/tests/custom-css/check.svg"), pointer`,
        'imported rule applies',
      );
    });
  });

  it('falls back to <link> when a sheet is not served as text/css', function (browser) {
    browser.navigateTo(`http://127.0.0.1:${port}/tests/custom_css.htm?serve-as=text/plain`);
    browser.waitForElementPresent('ed11y-element-result', 2000);
    browser.pause(500);
    browser.execute(inspectCustomSheet, [], ({ value }) => {
      browser.assert.equal(value.adopted, 0, 'the mislabeled response is not adopted');
      browser.assert.equal(value.linkBundles, 1, 'one <link> bundle');
    });
  });

  after((browser) => {
    server.close();
    browser.end();
  });
});
