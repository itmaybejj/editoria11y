#!/usr/bin/env node

/**
 * Local HTTP server for ACT conformance testing.
 *
 * Serves:
 *   /testcases/{ruleId}/{testcaseId}.html  → cached test case HTML
 *   /testcases/...?review                  → same, with ed11y injected for manual review
 *   /dist/*                                → ed11y built files from project root
 *   /conformance/reports/*                 → generated reports
 *   /test-assets/*                         → placeholder (assets not needed for DOM analysis)
 *
 * Security:
 *   - Binds to 127.0.0.1 only (not accessible from the network)
 *   - All file paths are validated against their allowed root directory
 *
 * Usage:
 *   node conformance/scripts/serve-testcases.js           # default port 8844
 *   node conformance/scripts/serve-testcases.js --port=9000
 */

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, dirname, extname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(join(__dirname, '..', '..'));
const CACHE_DIR = resolve(join(__dirname, '..', '.cache'));
const REPORTS_DIR = resolve(join(__dirname, '..', 'reports'));

const portArg = process.argv.find((a) => a.startsWith('--port='));
const PORT = portArg ? Number.parseInt(portArg.split('=')[1], 10) : 8844;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

function getMime(filePath) {
  return MIME_TYPES[extname(filePath)] || 'application/octet-stream';
}

/**
 * Resolve a file path and verify it stays within the allowed root directory.
 * Returns null if the path escapes the root (path traversal attempt).
 */
function safePath(root, unsafePath) {
  const resolved = resolve(root, unsafePath);
  const rel = relative(root, resolved);
  if (rel.startsWith('..') || resolve(root, rel) !== resolved) {
    return null;
  }
  return resolved;
}

/**
 * Inject ed11y into test case HTML for manual review.
 * Adds a review info bar and initializes ed11y with all checks enabled.
 * Metadata (expected outcome, mapped keys) is read from URL query params
 * by client-side JS, keeping the server stateless.
 */
function injectReviewMode(html) {
  const injection = [
    '',
    '<!-- ed11y review mode injection -->',
    '<style>',
    ' body {padding: 3rem;}',
    ' body > :first-child { outline: 1px solid #4a6; outline-offset: 1rem;}',
    ' ed11y-element-panel {margin-bottom: 3rem;}',
    '  #ed11y-review-bar {',
    '    position: fixed; bottom: 0; left: 0; right: 0; z-index: 999999;',
    '    background: #1a1a2e; color: #e0e0e0; padding: 6px 16px;',
    '    font: 13px/1.4 system-ui, sans-serif; display: flex; gap: 16px;',
    '    align-items: center; flex-wrap: wrap; border-bottom: 2px solid #4a6;',
    '  }',
    '  #ed11y-review-bar code {',
    '    background: #2a2a3e; padding: 1px 6px; border-radius: 3px;',
    '    font-family: ui-monospace, monospace; font-size: 12px;',
    '  }',
    '  #ed11y-review-bar a { color: #6cf; }',
    '  #ed11y-review-bar .expected-failed { color: #f88; }',
    '  #ed11y-review-bar .expected-passed { color: #8f8; }',
    '  #ed11y-review-bar .expected-inapplicable { color: #aaa; }',
    '  #ed11y-review-spacer { height: 38px; }',
    '</style>',
    '<div id="ed11y-review-spacer"></div>',
    '<div id="ed11y-review-bar" data-ed11y-ignore>',
    '  <span id="ed11y-rb-info">Loading...</span>',
    '</div>',
    '<link rel="stylesheet" media="all" href="/dist/css/editoria11y.css">',
    '<script src="/dist/js/ed11y.umd.js"></script>',
    '<script src="/dist/js/lang/en.umd.js"></script>',
    '<script>',
    '  var params = new URLSearchParams(window.location.search);',
    '  var pathParts = window.location.pathname.split("/");',
    '  var ruleId = pathParts[2] || "";',
    '  var expected = params.get("expected") || "unknown";',
    '  var keys = params.get("keys") || "";',
    '  var ruleName = decodeURIComponent(params.get("rule") || "");',
    '  var expClass = "expected-" + expected;',
    '',
    '  var bar = document.getElementById("ed11y-rb-info");',
    '  bar.innerHTML =',
    '    "<strong>" + ruleId + "</strong> " + ruleName +',
    '    " &middot; Expected: <code class=\\"" + expClass + "\\">" + expected + "</code>" +',
    '    " &middot; Keys: <code>" + (keys || "unmapped") + "</code>" +',
    '    " &middot; <a href=\\"/conformance/reports/dev-report.html#rule-" + ruleId + "\\">\\u2190 Report</a>";',
    '',
    '  if (typeof Ed11y !== "undefined" && typeof Ed11yLangEn !== "undefined") {',
    '    window.setTimeout(function() {',
    '      Ed11y.Lang.addI18n(Ed11yLangEn.strings);',
    '      new Ed11y.Ed11y({',
    '        checkRoot: "body",',
    '        containerIgnore: "#ed11y-review-bar *",',
    '        contrastPlugin: true,',
    '        developerPlugin: true,',
    '      embeddedContentPlugin: true,',
    '      linksAdvancedPlugin: true,',
    '      formLabelsPlugin: true,',
    '      inlineAlerts: false,',
    '      watchForChanges: true,',
    '      checks: {',
    'HEADING_SKIPPED_LEVEL: true,',
    'HEADING_EMPTY_WITH_IMAGE: true,',
    'HEADING_EMPTY: true,',
    'HEADING_FIRST: false,',
    'HEADING_LONG: {',
    'maxLength: 170,',
    '},',
    'HEADING_MISSING_ONE: false,',

    // Image checks
    'MISSING_ALT_LINK: true,',
    'MISSING_ALT_LINK_HAS_TEXT: true,',
    'MISSING_ALT: true,',
    'IMAGE_DECORATIVE_CAROUSEL: {',
    'sources: ".carousel",',
    '},',
    'LINK_IMAGE_NO_ALT_TEXT: true,',
    'LINK_IMAGE_TEXT: true,',
    'IMAGE_FIGURE_DECORATIVE: true,',
    'IMAGE_DECORATIVE: true,',
    'LINK_ALT_FILE_EXT: true,',
    'ALT_FILE_EXT: true,',
    'LINK_PLACEHOLDER_ALT: true,',
    'ALT_PLACEHOLDER: true,',
    'LINK_SUS_ALT: true,',
    'SUS_ALT: true,',
    'LINK_IMAGE_LONG_ALT: {',
    'maxLength: 250,',
    '},',
    'IMAGE_ALT_TOO_LONG: {',
    'maxLength: 250,',
    '},',
    'LINK_IMAGE_ALT: true,',
    // {dismissAll: true,} default.
    'LINK_IMAGE_ALT_AND_TEXT: true,',
    'IMAGE_FIGURE_DUPLICATE_ALT: true,',
    'IMAGE_PASS: {',
    'dismissAll: true,',
    '},',
    'ALT_UNPRONOUNCEABLE: true,',
    'LINK_ALT_UNPRONOUNCEABLE: true,',
    'ALT_MAYBE_BAD: {',
    //minLength: 15,
    '},',
    'LINK_ALT_MAYBE_BAD: {',
    'minLength: 15,',
    '},',

    // Link checks
    'DUPLICATE_TITLE: {',
    'dismissAll: true,',
    '},',
    'LINK_EMPTY_LABELLEDBY: true,',
    'LINK_EMPTY_NO_LABEL: true,',
    'LINK_STOPWORD: {',
    'type: "warning",',
    '},',
    'LINK_STOPWORD_ARIA: true,',
    'LINK_SYMBOLS: true,',
    'LINK_CLICK_HERE: true,',
    'LINK_DOI: {',
    'dismissAll: true,',
    '},',
    'LINK_URL: {',
    'maxLength: 40,',
    '},',
    'LINK_LABEL: {',
    'dismissAll: true,',
    '},',
    'LINK_EMPTY: true,',
    'LINK_IDENTICAL_NAME: {',
    'dismissAll: true,',
    '},',
    'LINK_NEW_TAB: {',
    'dismissAll: true,',
    '},',
    'LINK_FILE_EXT: true,',

    // Form labels checks
    'LABELS_MISSING_IMAGE_INPUT: true,',
    'LABELS_INPUT_RESET: true,',
    'LABELS_MISSING_LABEL: true,',
    'LABELS_ARIA_LABEL_INPUT: true,',
    'LABELS_NO_FOR_ATTRIBUTE: true,',
    'LABELS_PLACEHOLDER: true,',

    // Embedded content checks
    'EMBED_AUDIO: {',
    'sources: "",',
    '},',
    'EMBED_VIDEO: {',
    'sources: "",',
    '},',
    'EMBED_DATA_VIZ: {',
    'sources: "",',
    '},',
    'EMBED_CUSTOM: {',
    'sources: "#embed_custom",',
    '},',
    'EMBED_UNFOCUSABLE: true,',
    'EMBED_MISSING_TITLE: true,',
    'EMBED_GENERAL: true,',

    // Quality assurance checks
    'QA_BAD_LINK: {',
    'sources: "[href*=\\"tugboatqa.com\\"]",',
    '},',
    'QA_STRONG_ITALICS: true,',
    'QA_IN_PAGE_LINK: true,',
    'QA_DOCUMENT: {',
    //sources: '',
    'dismissAll: true,',
    '},',
    'QA_PDF: {',
    'dismissAll: true,',
    '},',
    'QA_BLOCKQUOTE: true,',
    'TABLES_MISSING_HEADINGS: true,',
    'TABLES_SEMANTIC_HEADING: true,',
    'TABLES_EMPTY_HEADING: true,',
    'QA_FAKE_HEADING: true,',
    'QA_FAKE_LIST: true,',
    'QA_UPPERCASE: true,',
    'QA_UNDERLINE: true,',
    'QA_SUBSCRIPT: true,',
    'QA_NESTED_COMPONENTS: {',
    'sources: "",',
    '},',
    'QA_JUSTIFY: true,',
    'QA_SMALL_TEXT: true,',

    // Meta checks
    'META_LANG: true,',
    'META_SCALABLE: true,',
    'META_MAX: true,',
    'META_REFRESH: true,',

    // Developer checks
    'DUPLICATE_ID: true,',
    'META_TITLE: {',
    'warning: true,',
    '},',
    'UNCONTAINED_LI: true,',
    'TABINDEX_ATTR: true,',
    'HIDDEN_FOCUSABLE: true,',
    'LABEL_IN_NAME: true,',
    'BTN_EMPTY: true,',
    'BTN_EMPTY_LABELLEDBY: true,',
    'BTN_ROLE_IN_NAME: true,',

    // Contrast checks
    'CONTRAST_WARNING: {',
    'dismissAll: true,',
    '},',
    'CONTRAST_INPUT: true,',
    'CONTRAST_ERROR: true,',
    'CONTRAST_PLACEHOLDER: true,',
    'CONTRAST_PLACEHOLDER_UNSUPPORTED: true,',
    'CONTRAST_ERROR_GRAPHIC: true,',
    'CONTRAST_WARNING_GRAPHIC: true,',
    'CONTRAST_UNSUPPORTED: {',
    'dismissAll: true,',
    '      }',
    '    },',
    '    });',
    '  }, 0);',
    '  }',
    '</script>',
  ].join('\n');

  // Insert before </body> if present, otherwise append
  if (html.includes('</body>')) {
    return html.replace('</body>', injection + '\n</body>');
  }
  return html + injection;
}

// 1x1 transparent PNG for placeholder images
const PLACEHOLDER_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQAB' +
  'Nl7BcQAAAABJRU5ErkJggg==',
  'base64',
);

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(url.pathname);

  try {
    // Serve cached test case pages (with optional review mode)
    if (pathname.startsWith('/testcases/')) {
      const relativePart = pathname.replace('/testcases/', '');
      const filePath = safePath(join(CACHE_DIR, 'pages'), relativePart);
      if (!filePath) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
      }

      if (url.searchParams.has('review') && getMime(filePath).startsWith('text/html')) {
        const html = await readFile(filePath, 'utf-8');
        const injected = injectReviewMode(html);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(injected);
      } else {
        const content = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': getMime(filePath) });
        res.end(content);
      }
      return;
    }

    // Serve ed11y dist files
    if (pathname.startsWith('/dist/')) {
      const filePath = safePath(join(PROJECT_ROOT, 'dist'), pathname.replace('/dist/', ''));
      if (!filePath) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
      }
      const content = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': getMime(filePath) });
      res.end(content);
      return;
    }

    // Serve conformance reports
    if (pathname.startsWith('/conformance/reports/')) {
      const filePath = safePath(REPORTS_DIR, pathname.replace('/conformance/reports/', ''));
      if (!filePath) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
      }
      const content = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': getMime(filePath) });
      res.end(content);
      return;
    }

    // Placeholder for test assets — return a transparent pixel for images,
    // empty content for everything else. Ed11y checks DOM attributes, not
    // rendered pixels, so this is fine for conformance testing.
    if (pathname.startsWith('/test-assets/')) {
      const ext = extname(pathname);
      if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(PLACEHOLDER_PNG);
      } else if (ext === '.mp4' || ext === '.webm') {
        res.writeHead(200, { 'Content-Type': 'video/mp4' });
        res.end(Buffer.alloc(0));
      } else {
        res.writeHead(200, { 'Content-Type': getMime(pathname) });
        res.end('');
      }
      return;
    }

    // Health check
    if (pathname === '/health') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('ok');
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`Not found: ${pathname}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`File not found: ${pathname}`);
    } else {
      console.error(`Error serving ${pathname}:`, err.message);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal server error');
    }
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`ACT test case server running at http://localhost:${PORT}`);
  console.log(`  Test cases: /testcases/{ruleId}/{testcaseId}.html`);
  console.log(`  Review:     /testcases/...?review&expected=...&keys=...&rule=...`);
  console.log(`  Ed11y dist: /dist/*`);
  console.log(`  Reports:    /conformance/reports/*`);
  console.log(`  Assets:     /test-assets/* (placeholders)`);
});

export { server, PORT };
