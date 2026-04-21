import Lang from '../../sa11y-js/utils/lang';
import * as Utils from '../../sa11y-js/utils/utils';
import { State } from '../../sa11y-js/core/state';
// EDITORIA11Y PATCH: imports UI from the editoria11y layer so pushResult can
// look up an existing mark entry for this (element, test) pair and attach a
// back-reference to it on the result. Adoption lets drawResult reuse the
// already-rendered button/tip/highlight across rechecks instead of tearing
// them down and rebuilding — a cheap fix for flicker and for the
// stale-index race documented in docs/race-condition-plan.md.
//
// If this patch is shared upstream, this cross-layer import would become a
// hook (e.g. State.onPushResult) so sa11y proper has no downstream deps.
import { UI } from '../../js/core/ui.js';

export function pushResult({
  test,
  element = null,
  type = 'error',
  args = [],
  content = null,
  dismiss = '',
  dismissAll = false,
  developer = false,
  margin = null,
  inline = false,
  position = null,
  ...customProps
}) {
  // If rule is turned off, don't push to result object.
  const rule = State.option.checks[test];
  if (!rule) return null;

  // If a string is passed, we construct the tooltip. Otherwise, pass in constructed DOM node.
  const rawContent = rule.content || content || test;
  const finalContent =
    typeof rawContent === 'string' ? Lang.sprintf(rawContent, ...args) : rawContent;

  // Final issue object sent to results array.
  const result = {
    test,
    ...(element && { element }),
    type: rule.type || type,
    content: finalContent,
    ...(args.length && { args }),
    inline: rule.inline || inline,
    ...(position && { position }),
    dismiss: Utils.prepareDismissal(test + dismiss),
    dismissAll: rule.dismissAll ? test : dismissAll,
    developer: rule.developer ?? developer,
    ...(margin && { margin }),
    ...customProps,
  };

  // EDITORIA11Y PATCH: adoption lookup.
  // If a MarkEntry already exists for this (element, test) pair from a
  // previous run, attach a back-reference to it on the result. drawResult
  // will reuse the existing DOM instead of rebuilding, and will stamp the
  // entry with the current runGen at that point. Entries still carrying
  // a stale runGen after draws run are orphans — their (element, test)
  // pair did not produce a result in this run — and are torn down by
  // sweepOrphans. See docs/race-condition-plan.md for the full flow.
  if (element && UI.marks) {
    const byTest = UI.marks.get(element);
    const existing = byTest?.get(test);
    if (existing) {
      result.markEntry = existing;
    }
  }

  State.results.push(result);
  return result;
}
