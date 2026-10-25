import { UI } from '../core/ui.js';

// Result types pushed by external link checkers through the `customTests`
// handshake (see ed11y-default-options.js). They ride the normal result
// pipeline but get their own toggle styling, tip badge and action buttons:
//
//   link        The checker found the target broken. Counted as an issue and
//               painted immediately.
//   linkManual  The checker could not verify the target (blocked, login wall,
//               rate limited). Kept off the page until the user shows hidden
//               alerts or opens the visualizer panel.
//
// A broken link offers "Mark OK" (or "Ignore" when OK is not allowed); a
// manual check offers that and "Mark broken". A result pushed with
// `dismissalStatus: 'ok'` (the checker records a site-wide Mark OK) or
// `'hide'` is hidden like any dismissed alert and offers "Restore" when
// revealed. "Mark broken" is not a dismissal: it is dispatched through
// `ed11yDismissalUpdate` with `dismissAction: 'broken'` for the integration
// that pushed the result to act on, as "Restore" is with
// `dismissAction: 'reset'`.
//
// Colors come from the result's status, not its type: `severity` picks the
// same alert (error) or warning styling the built-in checks use. The shared
// `ed11y-link` class only swaps the glyph for an icon; `className` is a
// per-type hook for themes and tests and carries no styles of its own.
export const LINK_CLASS = 'ed11y-link';
export const LINK_RESULT_TYPES = {
  link: { badge: 'linkBrokenBadge', className: 'ed11y-link-broken', severity: 'error' },
  linkManual: { badge: 'linkManualBadge', className: 'ed11y-link-manual', severity: 'warning' },
};

export const isLinkResult = (result) =>
  typeof result?.type === 'string' && Object.hasOwn(LINK_RESULT_TYPES, result.type);

// Whether a result is painted with warning (yellow) rather than alert (red)
// colors. Broken links can be marked OK, but still read as errors.
export const isWarningStyled = (result) =>
  result?.type !== 'error' && LINK_RESULT_TYPES[result?.type]?.severity !== 'error';

export const isManualLink = (result) => result?.type === 'linkManual';

// Manual-check links surface in either "show hidden alerts" mode or while the
// visualizers (outline, alts, readability) are open.
export const manualLinksRevealed = () => UI.showDismissed || UI.visualizing;

// Results that stay off the page until the user asks to see hidden alerts.
export const isHiddenByDefault = (result) => !!result?.dismissalStatus || isManualLink(result);

// Whether a result gets a button on the page in the current panel state.
export const shouldDraw = (result) =>
  !isHiddenByDefault(result) ||
  UI.showDismissed ||
  (isManualLink(result) && !result.dismissalStatus && UI.visualizing);
