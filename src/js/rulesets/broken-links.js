import Constants from '../../sa11y-js/utils/constants.js';
import Lang from '../../sa11y-js/utils/lang.js';
import Elements from '../../sa11y-js/utils/elements.js';
import find from '../../sa11y-js/utils/find.js';
import * as Utils from '../../sa11y-js/utils/utils.js';
import { State } from '../../sa11y-js/core/state.js';

// Paints a CMS link checker's flagged links as results.
//
// The checker hands its findings over in the `brokenLinks` option (see
// ed11y-default-options.js). Each status maps to a test key, a result type
// (`link` is painted as an error, `linkManual` as a manual check; see
// utils/result-types.js) and a short label for the Links visualizer. A
// manual-check status left out of `brokenLinksShowChecks` is painted only
// while the visualizers are open or hidden alerts are shown. Status describes the problem; an entry's separate `dismissed`
// field carries the verdict on it (`ok`: an editor marked the link OK for
// every page; `hide`: this editor ignored the alert). Dismissed entries
// arrive hidden and offer Restore, which clears the verdict here so the
// link is painted with its real status until the checker says otherwise.
export const LINK_STATUSES = {
  broken: { test: 'HREF_BROKEN', type: 'link', label: 'linkStatusBroken' },
  unpublished: { test: 'HREF_UNPUBLISHED', type: 'link', label: 'linkStatusUnpublished' },
  markedBroken: { test: 'HREF_MARKED_BROKEN', type: 'link', label: 'linkStatusMarkedBroken' },
  access: { test: 'HREF_ACCESS', type: 'linkManual', label: 'linkStatusAccess' },
  unverifiable: { test: 'HREF_UNVERIFIABLE', type: 'linkManual', label: 'linkStatusUnverifiable' },
  redirect: { test: 'HREF_REDIRECT', type: 'linkManual', label: 'linkStatusRedirect' },
  serverError: { test: 'HREF_SERVER_ERROR', type: 'linkManual', label: 'linkStatusServerError' },
};

// An entry's optional `reason` (the checker's machine reason) picks a more
// specific test and label within its status. Reasons are listed per status
// so a reason never changes the result type; a reason not listed under the
// entry's status falls back to the status's own test and label.
export const LINK_REASONS = {
  broken: {
    invalid_host: { test: 'HREF_BAD_HOST', label: 'linkReasonBadHost' },
    malformed_url: { test: 'HREF_MALFORMED', label: 'linkReasonMalformed' },
    scheme_typo: { test: 'HREF_SCHEME_TYPO', label: 'linkReasonSchemeTypo' },
    missing_scheme: { test: 'HREF_MISSING_HTTPS', label: 'linkReasonMissingHttps' },
    missing_mailto: { test: 'HREF_MISSING_MAILTO', label: 'linkReasonMissingMailto' },
    invalid_email: { test: 'HREF_EMAIL_INVALID', label: 'linkReasonEmailInvalid' },
    invalid_phone: { test: 'HREF_PHONE_INVALID', label: 'linkReasonPhoneInvalid' },
    local_file: { test: 'HREF_LOCAL_FILE', label: 'linkReasonLocalFile' },
  },
  unverifiable: {
    private: { test: 'HREF_PRIVATE', label: 'linkReasonPrivate' },
    private_address: { test: 'HREF_PRIVATE', label: 'linkReasonPrivate' },
    ftp_link: { test: 'HREF_FTP', label: 'linkReasonFtp' },
    app_scheme: { test: 'HREF_APP_LINK', label: 'linkReasonAppLink' },
  },
  redirect: {
    redirect_scheme: { test: 'HREF_REDIRECT_APP', label: 'linkReasonRedirectApp' },
  },
};

// The test and label for an entry: its reason's when listed, else its status's.
const describeEntry = (entry) => {
  const status = LINK_STATUSES[entry.status];
  const reason =
    typeof entry.reason === 'string' &&
    Object.hasOwn(LINK_REASONS[entry.status] ?? {}, entry.reason)
      ? LINK_REASONS[entry.status][entry.reason]
      : null;
  return { ...status, ...reason };
};

const DISMISSED_LABELS = { ok: 'linkDismissedOk', hide: 'linkDismissedHide' };

export const isKnownLinkStatus = (status) =>
  typeof status === 'string' && Object.hasOwn(LINK_STATUSES, status);

export const isKnownDismissal = (dismissed) =>
  typeof dismissed === 'string' && Object.hasOwn(DISMISSED_LABELS, dismissed);

export const MANUAL_LINK_STATUSES = Object.keys(LINK_STATUSES).filter(
  (status) => LINK_STATUSES[status].type === 'linkManual',
);

// Whether a manual-check status is painted like any other manual check.
export const showsLinkCheck = (status) =>
  Array.isArray(State.option.brokenLinksShowChecks) &&
  State.option.brokenLinksShowChecks.includes(status);

// Whether editors may Mark OK and Mark broken on flagged links.
export const linkMarksAllowed = () =>
  typeof State.option.allowLinkMarks === 'boolean'
    ? State.option.allowLinkMarks
    : !!State.option.allowOK;

// The label shown beside a link in the Links visualizer: the verdict when
// there is one, otherwise the problem.
export const linkStatusLabel = (entry) => {
  if (isKnownDismissal(entry.dismissed)) {
    return Lang._(DISMISSED_LABELS[entry.dismissed]);
  }
  return isKnownLinkStatus(entry.status) ? Lang._(describeEntry(entry).label) : entry.status;
};

// Display form of a stored href: scheme dropped, as the eye reads it.
export const displayHref = (href) => String(href).replace(/^https?:\/\//i, '');

// Strips `prefix` from `path` at a segment boundary: '/en' takes '/en' and
// '/en/node/1' down to '/' and '/node/1' but leaves '/english' alone.
const stripPrefix = (path, prefix) => {
  const clean = String(prefix ?? '').replace(/\/+$/, '');
  if (!clean || !path.startsWith(clean)) {
    return path;
  }
  const rest = path.slice(clean.length);
  if (rest === '' || rest.startsWith('?')) {
    return `/${rest}`;
  }
  return rest.startsWith('/') ? rest : path;
};

// The form both sides of a match are reduced to: for internal links the
// root-relative path and query with configured prefixes stripped, for
// external links the origin, path and query, and for any other scheme
// (mailto:, tel:, file:, app links) the browser's serialization, which folds
// the scheme's case. Fragments never count. Returns null for an href the
// browser cannot parse; those are matched by the raw attribute.
export const canonicalHref = (href, options = State.option, base = document.baseURI) => {
  let url;
  try {
    url = new URL(String(href), base);
  } catch {
    return null;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    url.hash = '';
    return url.href;
  }
  const search = url.search === '?' ? '' : url.search;
  const host = url.host.toLowerCase();
  const internalHosts = Array.isArray(options.brokenLinksInternalHosts)
    ? options.brokenLinksInternalHosts.map((h) => String(h).toLowerCase())
    : [];
  if (host === window.location.host.toLowerCase() || internalHosts.includes(host)) {
    let path = url.pathname;
    const prefixes = Array.isArray(options.brokenLinksPathPrefixes)
      ? options.brokenLinksPathPrefixes
      : [];
    for (const prefix of prefixes) {
      path = stripPrefix(path, prefix);
    }
    return `${path || '/'}${search}`;
  }
  return `${url.origin}${url.pathname}${search}`;
};

// Validates the option once at startup so a malformed entry is reported
// where the integration can see it, not swallowed during a check.
export function prepareBrokenLinks() {
  if (!Array.isArray(State.option.brokenLinks)) {
    if (State.option.brokenLinks) {
      console.warn('Editoria11y: brokenLinks must be an array of { href, status } objects.');
    }
    State.option.brokenLinks = [];
    return;
  }
  State.option.brokenLinks = State.option.brokenLinks.filter((entry) => {
    const valid =
      entry && typeof entry.href === 'string' && entry.href && isKnownLinkStatus(entry.status);
    if (!valid) {
      console.warn(
        'Editoria11y: skipped a brokenLinks entry without a valid href and status.',
        entry,
      );
      return false;
    }
    if (entry.dismissed && !isKnownDismissal(entry.dismissed)) {
      console.warn(`Editoria11y: ignored an unknown brokenLinks dismissal "${entry.dismissed}".`);
      delete entry.dismissed;
    }
    return true;
  });

  if (State.option.brokenLinksRoots && typeof State.option.brokenLinksRoots !== 'string') {
    console.warn('Editoria11y: brokenLinksRoots must be a CSS selector string.');
    State.option.brokenLinksRoots = false;
  }

  if (!Array.isArray(State.option.brokenLinksShowChecks)) {
    console.warn('Editoria11y: brokenLinksShowChecks must be an array of statuses.');
    State.option.brokenLinksShowChecks = [...MANUAL_LINK_STATUSES];
  }
  State.option.brokenLinksShowChecks.forEach((status) => {
    if (!MANUAL_LINK_STATUSES.includes(status)) {
      console.warn(
        `Editoria11y: brokenLinksShowChecks lists "${status}", which is not a manual check.`,
      );
    }
  });
}

// Keys an entry can be found under: the canonical form and, as a fallback
// for hrefs the checker stored verbatim, the raw string.
const indexEntries = () => {
  const byHref = new Map();
  for (const entry of State.option.brokenLinks) {
    const canonical = canonicalHref(entry.href);
    if (canonical && !byHref.has(canonical)) {
      byHref.set(canonical, entry);
    }
    if (!byHref.has(entry.href)) {
      byHref.set(entry.href, entry);
    }
  }
  return byHref;
};

// Tip content: the test's explanation, then the target as a link so the
// editor can open it. The href is set as text, never HTML.
const buildContent = (entry, test) => {
  const content = Lang.sprintf(test, entry.redirectsTo ?? null);
  const target = document.createElement('p');
  const linkWrap = document.createElement('i');
  const link = document.createElement('a');
  link.classList.add('ed11y-link-target');
  link.href = entry.href;
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  const prefix = document.createElement('strong');
  link.textContent = displayHref(entry.href);
  // The tip names the destination; this is the link as written.
  prefix.textContent = entry.redirectsTo
    ? Lang._('linkRedirectOriginal')
    : Lang._('linksCheckThis');
  prefix.textContent += ' ';
  target.append(prefix);
  linkWrap.append(link);
  target.append(linkWrap);
  content.append(target);
  return content;
};

// The anchors to match against the entries: the links inside the check
// roots, or, when `brokenLinksRoots` names the containers the checker
// harvested (menus and footers sit outside a typical content root), every
// anchor in those. Container ignores apply either way through find().
export const linkAnchors = () => {
  const roots = State.option.brokenLinksRoots;
  if (typeof roots !== 'string' || !roots.trim()) {
    return Elements.Found.Links;
  }
  try {
    return find('a[href]', roots, Constants.Exclusions.Sa11yElements);
  } catch (error) {
    console.warn(`Editoria11y: could not search brokenLinksRoots "${roots}".`, error);
    return Elements.Found.Links;
  }
};

export function checkBrokenLinks() {
  if (!State.option.brokenLinks?.length) {
    return;
  }
  const byHref = indexEntries();
  for (const anchor of linkAnchors()) {
    if (!anchor.matches('a[href]')) {
      continue;
    }
    const entry = byHref.get(canonicalHref(anchor.href)) ?? byHref.get(anchor.getAttribute('href'));
    if (!entry) {
      continue;
    }
    const status = describeEntry(entry);
    const hash = entry.hash ?? entry.href;
    const result = {
      test: status.test,
      element: anchor,
      type: status.type,
      content: buildContent(entry, status.test),
      dismiss: Utils.prepareDismissal(`link${hash}`),
      data: { hash, href: entry.href, status: entry.status, redirectsTo: entry.redirectsTo },
      brokenLink: entry,
    };
    if (entry.dismissed) {
      result.dismissalStatus = entry.dismissed;
    }
    if (status.type === 'linkManual' && !showsLinkCheck(entry.status)) {
      result.visualizerOnly = true;
    }
    State.results.push(result);
  }
}

// Called when an editor restores a link alert. The checker is told through
// `ed11yDismissalUpdate`; clear the verdict here too so the next check
// paints the link with its real status instead of hiding it again.
export function forgetLinkVerdict(result) {
  if (result?.brokenLink) {
    delete result.brokenLink.dismissed;
  }
}
