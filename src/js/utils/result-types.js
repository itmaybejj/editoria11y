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
// Both offer "Mark OK" (or "Ignore" when OK is not allowed) and "Mark broken".
// "Mark broken" is not a dismissal: it is dispatched through
// `ed11yDismissalUpdate` with `dismissAction: 'broken'` for the integration
// that pushed the result to act on.
export const LINK_RESULT_TYPES = {
  link: { badge: 'linkBrokenBadge', className: 'ed11y-link' },
  linkManual: { badge: 'linkManualBadge', className: 'ed11y-link-manual' },
};

export const isLinkResult = (result) =>
  typeof result?.type === 'string' && Object.hasOwn(LINK_RESULT_TYPES, result.type);

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
