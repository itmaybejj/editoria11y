// UrlNormalizer reduces URLs to the form a CMS link checker stores. It has no
// DOM or library state, so these tests take no `page` and start no browser.
import { expect, test } from '@playwright/test';
import { UrlNormalizer } from '../../src/js/utils/url-normalizer.js';

test.describe('UrlNormalizer', () => {
  const internalHosts = ['example.com', 'www.example.com', 'alt.example.net:8443'];

  test.describe('canonical', () => {
    const normalizer = new UrlNormalizer({ internalHosts, prefixes: ['/web/', '/en'] });

    test('reduces internal links to the path and query, without prefixes', () => {
      expect(normalizer.canonical('https://example.com/about?x=1#f')).toBe('/about?x=1');
      expect(normalizer.canonical('https://www.example.com/web/node/1')).toBe('/node/1');
      expect(normalizer.canonical('https://example.com/web/en/node/1')).toBe('/node/1');
      expect(normalizer.canonical('https://alt.example.net:8443/x')).toBe('/x');
    });

    test('strips a prefix only at a segment boundary', () => {
      expect(normalizer.canonical('https://www.example.com/webinar')).toBe('/webinar');
      expect(normalizer.canonical('https://example.com/web')).toBe('/');
      expect(normalizer.canonical('https://example.com/en?x=1')).toBe('/?x=1');
    });

    test('compares hosts without case, whichever way they are written', () => {
      const mixed = new UrlNormalizer({ internalHosts: ['WWW.Example.COM'] });
      expect(mixed.canonical('https://www.EXAMPLE.com/a')).toBe('/a');
    });

    test('keeps every parameter, whatever the lists say', () => {
      const filtering = new UrlNormalizer({ internalHosts, preserve: [], strip: ['destination'] });
      expect(filtering.canonical('https://example.com/a?destination=/b')).toBe(
        '/a?destination=/b',
      );
    });

    test('keeps the origin of external links and drops their fragment', () => {
      expect(normalizer.canonical('https://other.com/Page?q=1#top')).toBe(
        'https://other.com/Page?q=1',
      );
    });

    test('serializes other schemes as the browser does, without a fragment', () => {
      expect(normalizer.canonical('MAILTO:someone#top')).toBe('mailto:someone');
      expect(normalizer.canonical('zoommtg://example.com/join?confno=123')).toBe(
        'zoommtg://example.com/join?confno=123',
      );
    });

    test('resolves relative links against the base, and is null without one', () => {
      const based = new UrlNormalizer({ internalHosts, base: 'https://example.com/a/b' });
      expect(based.canonical('c?x=1')).toBe('/a/c?x=1');
      expect(normalizer.canonical('/relative')).toBeNull();
      expect(normalizer.canonical('not a url')).toBeNull();
    });
  });

  test.describe('identity', () => {
    const normalizer = new UrlNormalizer({
      internalHosts,
      prefixes: ['/web'],
      preserve: ['page', 'a b'],
      strip: ['ed1ref'],
    });

    test('drops what the checker drops from internal links', () => {
      expect(normalizer.identity('https://example.com/web/styles/a.jpg?itok=abc')).toBe(
        '/styles/a.jpg',
      );
      expect(normalizer.identity('https://example.com/list?utm_source=x&page=2')).toBe(
        '/list?page=2',
      );
    });

    test('leaves external links and other schemes alone', () => {
      expect(normalizer.identity('https://other.com/a.jpg?itok=abc&ed1ref=x#f')).toBe(
        'https://other.com/a.jpg?itok=abc&ed1ref=x',
      );
      expect(normalizer.identity('zoommtg://example.com/join?confno=123')).toBe(
        'zoommtg://example.com/join?confno=123',
      );
    });

    test('is stable when applied to its own output', () => {
      const once = normalizer.identity('https://example.com/web/list?itok=abc&page=2');
      const based = new UrlNormalizer({
        internalHosts,
        prefixes: ['/web'],
        preserve: ['page'],
        base: 'https://example.com/',
      });
      expect(based.identity(once)).toBe(once);
    });

    test('is null for what the browser cannot parse', () => {
      expect(normalizer.identity('not a url')).toBeNull();
    });
  });

  test.describe('stripParams', () => {
    const normalizer = new UrlNormalizer({
      internalHosts,
      preserve: ['page', 'a b'],
      strip: ['ed1ref', 'ed1links'],
    });

    test('filters internal links and keeps the rest of the URL', () => {
      expect(normalizer.stripParams('https://example.com/a?ed1ref=%2Fx&page=2&utm=y#top')).toBe(
        'https://example.com/a?page=2#top',
      );
      expect(normalizer.stripParams('https://example.com/a?ed1ref=%2Fx')).toBe(
        'https://example.com/a',
      );
    });

    test('compares names decoded and keeps pairs as written, in order', () => {
      const every = new UrlNormalizer({ internalHosts, strip: ['ed1ref'] });
      expect(every.stripParams('https://example.com/a?z=1&ed%31ref=x&&print&b=%2F')).toBe(
        'https://example.com/a?z=1&print&b=%2F',
      );
      expect(normalizer.stripParams('https://example.com/a?a%20b=1&print')).toBe(
        'https://example.com/a?a%20b=1',
      );
    });

    test('compares an undecodable name as written', () => {
      const every = new UrlNormalizer({ internalHosts, strip: ['ed1ref'] });
      expect(every.stripParams('https://example.com/a?%E0%A4%A=1')).toBe(
        'https://example.com/a?%E0%A4%A=1',
      );
    });

    test('keeps every parameter when no preserve list is given', () => {
      const every = new UrlNormalizer({ internalHosts });
      expect(every.stripParams('https://example.com/a?x=1&y=2')).toBe(
        'https://example.com/a?x=1&y=2',
      );
    });

    test('drops every parameter for an empty preserve list', () => {
      const none = new UrlNormalizer({ internalHosts, preserve: [] });
      expect(none.stripParams('https://example.com/a?x=1&y=2')).toBe('https://example.com/a');
    });

    test('leaves external links, other schemes and unparseable values alone', () => {
      expect(normalizer.stripParams('https://other.com/x?utm_source=y&ed1ref=z')).toBe(
        'https://other.com/x?utm_source=y&ed1ref=z',
      );
      expect(normalizer.stripParams('ftp://example.com/x?utm=y')).toBe(
        'ftp://example.com/x?utm=y',
      );
      expect(normalizer.stripParams('not a url')).toBe('not a url');
    });
  });

  // The checker stores a marker in place of a username or password, and the
  // link stays its own absolute row: its credentials are the problem to report,
  // so it must not merge with the same address written without them.
  test.describe('links with credentials', () => {
    const normalizer = new UrlNormalizer({
      internalHosts,
      prefixes: ['/web'],
      preserve: ['page'],
      strip: ['ed1ref'],
    });

    test('are reduced to the marker, whichever credentials they carry', () => {
      const stored = 'https://***@other.com/a?x=1';
      expect(normalizer.identity('https://user:secret@other.com/a?x=1#f')).toBe(stored);
      expect(normalizer.identity('https://token@other.com/a?x=1')).toBe(stored);
      expect(normalizer.identity('https://:secret@other.com/a?x=1')).toBe(stored);
      expect(normalizer.canonical('https://user:secret@other.com/a?x=1')).toBe(stored);
    });

    test('match what the checker stores, and not the same address without them', () => {
      const stored = 'https://***@other.com/a';
      expect(normalizer.identity(stored)).toBe(stored);
      expect(normalizer.identity('https://other.com/a')).not.toBe(stored);
    });

    test('are never internal, so keep their whole path and query', () => {
      expect(normalizer.identity('https://user:secret@example.com/web/a?itok=1&page=2')).toBe(
        'https://***@example.com/web/a?itok=1&page=2',
      );
      expect(normalizer.stripParams('https://user:secret@example.com/a?utm=y')).toBe(
        'https://user:secret@example.com/a?utm=y',
      );
    });

    test('are masked in other schemes too', () => {
      expect(normalizer.identity('ftp://user:secret@example.com/x#f')).toBe(
        'ftp://***@example.com/x',
      );
      expect(normalizer.identity('zoommtg://user:secret@zoom.us/join')).toBe(
        'zoommtg://***@zoom.us/join',
      );
    });
  });
});
