// Strips `prefix` from `path` at a segment boundary: '/en' takes '/en' and
// '/en/node/1' down to '/' and '/node/1' but leaves '/english' alone.
const stripPrefix = (path, prefix) => {
  const clean = String(prefix ?? '').replace(/\/+$/, '');
  if (!clean || !path.startsWith(clean)) {
    return path;
  }
  const rest = path.slice(clean.length);
  if (rest === '') {
    return '/';
  }
  return rest.startsWith('/') ? rest : path;
};

// A parameter's name for comparing: decoded, or as written when it cannot be.
const paramName = (pair) => {
  const name = pair.split('=', 1)[0];
  try {
    return decodeURIComponent(name);
  } catch {
    return name;
  }
};

const isWeb = (url) => url.protocol === 'http:' || url.protocol === 'https:';

// What the checker stores in place of a username or password.
export const REDACTED_CREDENTIALS = '***';

const hasCredentials = (url) => url.username !== '' || url.password !== '';

// Reduces URLs to the form a CMS link checker stores them in, so its findings
// can be matched back to anchors and its integration can report anchors the
// way the server will read them. Pure: no DOM and no library state.
//
// Internal links become their root-relative path and query, with configured
// prefixes stripped; external links keep their origin; any other scheme
// (mailto:, tel:, file:, app links) keeps the browser's serialization, which
// folds the scheme's case. Fragments never count, and only the query of an
// internal link is ever filtered: on another site, it is part of the address.
//
// A link with a username or password keeps its whole address, with a marker in
// place of the credentials, and is never internal: the credentials are the
// problem to report, so it stays apart from the same address without them.
export class UrlNormalizer {
  /**
   * @param {Object} [config]
   * @param {string[]} [config.internalHosts] Hosts (with any port) of this site.
   * @param {string[]} [config.prefixes] Path prefixes to strip, in order.
   * @param {?string[]} [config.preserve] Parameters that identify an internal
   *   link. Any other is dropped; null keeps every parameter.
   * @param {string[]} [config.strip] Parameters always dropped.
   * @param {string} [config.base] Resolves relative hrefs; without it they do
   *   not parse.
   */
  constructor({ internalHosts, prefixes, preserve, strip, base } = {}) {
    this.internalHosts = new Set(
      (Array.isArray(internalHosts) ? internalHosts : []).map((host) => String(host).toLowerCase()),
    );
    this.prefixes = Array.isArray(prefixes) ? prefixes : [];
    this.preserve = Array.isArray(preserve) ? new Set(preserve) : null;
    this.strip = new Set(Array.isArray(strip) ? strip : []);
    this.base = base;
  }

  // The canonical form with its whole query. For rules that read parameters
  // the stored form drops, such as an ignored "?destination=" route.
  canonical(href) {
    return this.reduce(href, (url) => url.search);
  }

  // The form the checker stores: canonical, less the dropped parameters.
  identity(href) {
    return this.reduce(href, (url) => this.filteredSearch(url));
  }

  // The URL as written but without the dropped parameters, for reporting an
  // anchor to the server. Returns what it was given when there is nothing to
  // filter or the URL does not parse.
  stripParams(href) {
    const url = this.parse(href);
    if (!url || !this.isInternal(url)) {
      return href;
    }
    url.search = this.filteredSearch(url);
    return url.href;
  }

  // Whether a parsed URL is a web link to this site, without credentials.
  isInternal(url) {
    return isWeb(url) && !hasCredentials(url) && this.internalHosts.has(url.host.toLowerCase());
  }

  parse(href) {
    try {
      return new URL(String(href), this.base);
    } catch {
      return null;
    }
  }

  reduce(href, internalSearch) {
    const url = this.parse(href);
    if (!url) {
      return null;
    }
    if (hasCredentials(url)) {
      url.username = REDACTED_CREDENTIALS;
      url.password = '';
      url.hash = '';
      return url.href;
    }
    if (!isWeb(url)) {
      url.hash = '';
      return url.href;
    }
    if (this.isInternal(url)) {
      const path = this.prefixes.reduce(stripPrefix, url.pathname);
      return `${path}${internalSearch(url)}`;
    }
    return `${url.origin}${url.pathname}${url.search}`;
  }

  // Names are compared decoded; pairs keep their encoding and order.
  filteredSearch(url) {
    const kept = url.search
      .slice(1)
      .split('&')
      .filter((pair) => {
        if (pair === '') {
          return false;
        }
        const name = paramName(pair);
        return !this.strip.has(name) && (this.preserve === null || this.preserve.has(name));
      });
    return kept.length ? `?${kept.join('&')}` : '';
  }
}
