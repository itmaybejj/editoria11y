// One pass over the CSS. Comments and strings are matched as whole tokens so
// url( or @import inside them is skipped. Capture groups:
// 1-3: url() value (double-quoted, single-quoted, unquoted); 4: @import;
// 5: image-set(, whose bare string arguments would be URLs; not rewritten.
const CSS_REFERENCES =
  /\/\*[\s\S]*?\*\/|"(?:[^"\\\n]|\\[\s\S])*"|'(?:[^'\\\n]|\\[\s\S])*'|\burl\(\s*(?:"((?:[^"\\\n]|\\[\s\S])*)"|'((?:[^'\\\n]|\\[\s\S])*)'|([^\s"'()]*))\s*\)|(@import\b)|(\bimage-set\()/gi;

// Left as written: data: and other schemes, protocol-relative, fragments.
const ABSOLUTE_REFERENCE = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i;

/** Thrown for CSS a constructed sheet cannot load the way <link> would. */
class UnshareableCssError extends Error {}

/**
 * Shares one parsed copy of the Editoria11y stylesheets across the document
 * and every shadow root that needs them.
 *
 * Browsers with constructable stylesheets (Chrome 73+, Firefox 101+,
 * Safari 16.4+) fetch each file once, parse it once, and adopt the same
 * CSSStyleSheet objects everywhere. Other browsers, or any failure to fetch
 * the CSS as text (file:// pages, CORS, a CSP connect-src rule), fall back to
 * cloning <link> elements into each target.
 *
 * A constructed sheet has no URL of its own, so before adopting a sheet its
 * relative url()s are rewritten to absolute ones, matching how <link> would
 * resolve them. CSS that cannot be made equivalent (@import, any image-set(),
 * escaped URLs) uses the <link> fallback instead.
 */
export class SharedStyles {
  /**
   * @param {string[]} urls Stylesheet URLs, already cache-busted.
   */
  constructor(urls) {
    this.urls = urls;
    this.linkBundle = SharedStyles.buildLinkBundle(urls);
    this.sheets = [];
    // Roots adopted before the fetch settles; moved to <link>s if it fails.
    this.pendingRoots = new Set();
    this.mode = SharedStyles.supported() ? 'adopt' : 'link';
    if (this.mode === 'adopt') {
      this.sheets = urls.map(() => new CSSStyleSheet());
      this.ready = this.load();
    } else {
      this.ready = Promise.resolve();
    }
  }

  static supported() {
    return (
      typeof CSSStyleSheet !== 'undefined' &&
      'replace' in CSSStyleSheet.prototype &&
      'adoptedStyleSheets' in Document.prototype &&
      'adoptedStyleSheets' in ShadowRoot.prototype
    );
  }

  static absolute(url) {
    return new URL(url, document.baseURI).href;
  }

  /**
   * Rewrites relative url()s in a stylesheet to absolute URLs.
   *
   * @param {string} css Stylesheet text.
   * @param {string} sheetUrl Absolute URL the text was fetched from.
   * @returns {string}
   * @throws {UnshareableCssError} If the CSS needs <link> loading to work.
   */
  static absolutizeUrls(css, sheetUrl) {
    return css.replace(CSS_REFERENCES, (token, double, single, bare, atImport, imageSet) => {
      if (atImport) {
        throw new UnshareableCssError(`@import in ${sheetUrl}`);
      }
      if (imageSet) {
        throw new UnshareableCssError(`image-set() in ${sheetUrl}`);
      }
      const ref = double ?? single ?? bare;
      if (ref === undefined || ref === '' || ABSOLUTE_REFERENCE.test(ref)) {
        // A comment, a string, or a url() that resolves the same anywhere.
        return token;
      }
      if (ref.includes('\\')) {
        throw new UnshareableCssError(`escaped url() in ${sheetUrl}`);
      }
      // URL serialization percent-encodes quotes, so the result is safe to quote.
      return `url("${new URL(ref, sheetUrl).href}")`;
    });
  }

  static buildLinkBundle(urls) {
    const bundle = document.createElement('div');
    bundle.classList.add('ed11y-style');
    bundle.setAttribute('hidden', '');
    urls.forEach((url) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('media', 'all');
      link.setAttribute('href', url);
      bundle.append(link);
    });
    return bundle;
  }

  async load() {
    try {
      const texts = await Promise.all(
        this.urls.map(async (url) => {
          // Ask as <link> does: some servers (e.g. the Vite dev server) answer
          // a CSS URL with JavaScript unless text/css is accepted.
          const response = await fetch(url, { headers: { Accept: 'text/css,*/*;q=0.1' } });
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText} for ${url}`);
          }
          // replace() silently discards what it cannot parse, so check the
          // type here. <link> also ignores a sheet not served as text/css.
          const type = response.headers.get('Content-Type');
          if (type && type.split(';')[0].trim().toLowerCase() !== 'text/css') {
            throw new UnshareableCssError(`${url} was served as ${type}, not text/css`);
          }
          return response.text();
        }),
      );
      // Rewrite every sheet before filling any, so a failure leaves none half-loaded.
      const rewritten = texts.map((text, i) =>
        SharedStyles.absolutizeUrls(text, SharedStyles.absolute(this.urls[i])),
      );
      // Adopted sheets are live: filling them restyles every root already attached.
      await Promise.all(rewritten.map((text, i) => this.sheets[i].replace(text)));
    } catch (error) {
      console.warn('Editoria11y: could not share stylesheets; falling back to <link>.', error);
      this.mode = 'link';
      this.pendingRoots.forEach((root) => {
        root.adoptedStyleSheets = root.adoptedStyleSheets.filter((s) => !this.sheets.includes(s));
        this.appendLinks(SharedStyles.linkTarget(root));
      });
      this.sheets = [];
    } finally {
      this.pendingRoots.clear();
      this.pendingRoots = null;
    }
  }

  /**
   * Resolves what to style: a Document or ShadowRoot as given, otherwise the
   * root node an element is connected to. Detached elements return null.
   *
   * @param {Node} target
   * @returns {Document|ShadowRoot|null}
   */
  static resolveRoot(target) {
    if (target instanceof Document || target instanceof ShadowRoot) {
      return target;
    }
    const root = target?.getRootNode?.();
    return root instanceof Document || root instanceof ShadowRoot ? root : null;
  }

  /** A document cannot take a second child element, so its links go in <head>. */
  static linkTarget(root) {
    return root instanceof Document ? root.head || root.body : root;
  }

  appendLinks(target) {
    // One bundle per target, matching the shared-sheet dedupe.
    for (const child of target.children) {
      if (child.classList.contains('ed11y-style')) {
        return;
      }
    }
    target.appendChild(this.linkBundle.cloneNode(true));
  }

  /**
   * Styles a document, a shadow root, or the root an element is connected to.
   * Safe to call repeatedly on the same target.
   *
   * @param {Document|ShadowRoot|Element} target
   */
  attach(target) {
    if (!target) {
      return;
    }
    const root = SharedStyles.resolveRoot(target);
    if (this.mode === 'link' || !root) {
      // A detached element cannot adopt sheets; give it links as before.
      this.appendLinks(root ? SharedStyles.linkTarget(root) : target);
      return;
    }
    const missing = this.sheets.filter((sheet) => !root.adoptedStyleSheets.includes(sheet));
    if (missing.length) {
      // Reassign rather than push: older engines expose a frozen array.
      root.adoptedStyleSheets = [...root.adoptedStyleSheets, ...missing];
    }
    this.pendingRoots?.add(root);
  }
}
