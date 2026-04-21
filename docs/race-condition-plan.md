# Race-condition hardening plan — tip/highlight dispatch

Working document for the multi-phase refactor of Editoria11y's result
dispatch, drawing, and highlight pipeline. Captures decisions taken
during analysis so that work can resume after interruption.

## Reported symptom

When a suite runs several times in a row against quickly-changing
content (e.g. an author typing or pasting into a contenteditable),
opening a tip sometimes draws the highlight around a different issue's
target element. Underlying cause is a bundle of related staleness /
flicker bugs in the dispatch/redraw pipeline.

## Root causes identified

1. **Integer array index is a load-bearing key across runs.**
   `data-ed11y-result` on buttons, `State.results[n]` lookups, and
   `UI.editableHighlight` keys all use the position in
   `State.results`. Across rechecks, position N can refer to two
   completely different issues. The 100 ms "flicker prevention" delay
   in `resetResults` (`src/js/utils/utils.js:473-488`) keeps old
   buttons in the DOM while `State.results` has already been rebuilt,
   so old buttons silently fetch new issues.

2. **`UI.editableHighlight` is never cleared on `resetResults`.**
   DOM is removed (`el.remove()`), map entries persist. On next show,
   `editableHighlighter` at `src/js/core/run.js:472-474` "revives" the
   detached element by appending it to `document.body`, inheriting
   styling from the previous issue until re-styled.

3. **`editableHighlighter` does not position the highlight itself.**
   It sets `top:0; left:0; opacity:1`, then delegates to
   `alignHighlights()`, which only repositions the entry matching
   `UI.openTip.button.dataset.ed11yResult`. But `toggleTip` at
   `src/js/elements/ed11y-element-result.js:103-130` calls
   `editableHighlighter` BEFORE setting `UI.openTip`. Highlight is
   briefly at (0,0) until a later `alignTip` RAF re-runs
   `alignHighlights`.

4. **`alignHighlights` does `UI.editableHighlight = []`** when it
   encounters a stale entry (`src/js/core/run.js:974`). Assigns an
   array where an object is expected.

5. **No run generation / bail-out token.** `enqueueTests` time-slices
   tests with `setTimeout(0)`. DOM can mutate between slices; stale
   element refs leak into `State.results`. `continueCheck` is async
   (awaits `filterAlerts`). Overlapping runs are possible.

6. **Observer callback has redundant `setTimeout(0)` shells** on top
   of `lagBounce` and on top of `incrementalAlign`'s own setTimeout.
   Not a correctness bug, just scheduling noise.

7. **`incrementalCheck` silently drops work when a tip is open.**
   Returns early; does not re-arm on close. Edits made while a tip is
   open are lost unless another mutation fires after close.

## Design decisions

- **Pre-requisite: stable keys per (element, test).** Adoption needs
  a stable identity that survives across runs. Element ref + test
  name satisfies this. `dismissKey` is content-derived and must NOT
  be used for identity (it shifts as content is edited).

- **`UI.marks = new WeakMap<Element, Map<test, MarkEntry>>`** for
  target-to-marks lookup. `UI.markRegistry = new Set<MarkEntry>` as
  an iterable view (WeakMap isn't iterable) for the end-of-run
  orphan sweep.

- **`MarkEntry` shape:**

  ```
  {
    result,       // latest pushResult payload
    button,       // <ed11y-element-result>
    tip,          // <ed11y-element-tip> (or null, lazy-built)
    highlight,    // <ed11y-element-highlight> (or null, lazy-built)
    generation,   // last checkAll runGen that touched this entry
    element,      // target DOM ref (also the WeakMap key)
    test,
  }
  ```

- **Run generation is the liveness signal.** `UI.runGen` bumps at
  `checkAll` entry. `pushResult` stamps entry with current runGen.
  After dispatch, any entry with stale runGen is an orphan.

- **Same token guards async continuation.** Capture generation at
  `checkAll` entry; compare at `updatePanel` entry. Mismatch → bail.
  Protects against aborted/overlapping runs.

- **Adoption happens in `pushResult` itself**, patched via the
  existing `src/sa11y-patch/` pattern. `get.sh` is updated to copy
  the patched file on upstream pulls. Inline comments mark what is
  changed for upstream sharing.

- **DOM churn batched into one RAF.** Orphan teardown + new-draw
  happen in a single frame. Drop the 100 ms `delayedReset` setTimeout
  — adoption eliminates the flicker it was working around.

- **`sortPos` is re-computed every run.** User confirmed: if content
  mutated, positions are unknown. No way around
  `getBoundingClientRect()` on every live entry per run.

- **Content refresh on adopt.** Always rewrite tip inner content from
  the new result. Cheap compared to rebuilding shadow root.

- **Fallback full rebuild when orphan ratio exceeds threshold.**
  If orphans > 50% of live entries, skip adoption and fall through to
  a single-RAF full rebuild. Covers pathological reset scenarios.

## Phases (shippable independently)

**Status:** All five phases implemented. See commit history for per-phase
diffs.

### Phase 1 — Generation scaffolding ([E]) — DONE

- Add `UI.runGen` counter to `src/js/core/ui.js`.
- Bump in `checkAll` (`src/js/core/run.js:1335`).
- Capture at `checkAll` entry, compare in `updatePanel` entry; bail
  on mismatch.
- Defensive only, no visible behavior change. Ships alone.

### Phase 2 — Adoption ([A] + [B]) — DONE

- `src/sa11y-patch/utils/pushResult.js`: patched copy that looks up
  `UI.marks.get(element)?.get(test)` and returns existing result
  reference, stamping `.generation = UI.runGen` and refreshing
  `.result.content`. Fallthrough to original behavior when no match.
- Copy into `src/sa11y-js/utils/pushResult.js`.
- `scripts/get.sh`: append `cp` line for the new patch.
- `src/js/core/ui.js`: add `marks` WeakMap and `markRegistry` Set.
- `src/js/core/visualize.js:drawResult`: create MarkEntry, register
  it. If adopting, skip creation and reuse.
- `src/js/utils/utils.js:resetResults`: no longer remove result/tip
  DOM with a 100 ms delay. Instead, orphan sweep runs in `updatePanel`
  under one RAF: for each `UI.markRegistry` entry where
  `generation !== UI.runGen`, remove button/tip/highlight and
  unregister.
- `src/js/core/run.js:editableHighlighter`: prefer
  `markEntry.highlight` over `UI.editableHighlight[resultID]`.
- Keep legacy `UI.editableHighlight` map for now; phase 3 will drop
  its revival path.

### Phase 3 — Highlight hygiene + synchronous positioning ([C] + [D]) — DONE

- Set highlight position inline in `editableHighlighter(id, true)`
  from target's bounding rect. Remove the (0,0) + alignHighlights
  two-step.
- Drop revival logic at `src/js/core/run.js:472-474`; if the DOM is
  detached, we're in a bug state — log and recreate.
- Fix `UI.editableHighlight = []` → `{}` at
  `src/js/core/run.js:974`. In practice, after phase 2 this map may
  be replaced by `markEntry.highlight` references entirely.

### Phase 4 — Observer callback cleanup ([F, scoped]) — DONE

- Drop redundant `setTimeout(0)` shells in the mutation observer
  callback at `src/js/core/run.js:1186-1218`.
- Convert `incrementalAlign` (`src/js/core/run.js:735`) from
  setTimeout-based to RAF-coalesced. Alignment is rendering work.
- No align/check coupling changes. Align continues to run on scroll
  without invoking any check path.

### Phase 5 — Pending recheck on tip close ([G]) — DONE

- `UI.recheckPendingOnClose` flag.
- `incrementalCheck` sets it when early-returning due to `UI.tipOpen`.
- `toggleTip(false)` consumes it, calling `incrementalCheckDebounce`.

## Tests to add

Nightwatch page that:
- Runs initial check, captures button element identity for a known
  issue (via window-exposed generation counter or a `data-runGen`
  attribute).
- Mutates a different region of the page, triggers recheck.
- Asserts the unchanged issue's button element identity is preserved
  (adoption worked).
- Also asserts a changed issue's button was replaced.

## Batching strategy

- Phase 1 + Phase 2 in first implementation pass. User will test +
  commit before phases 3–5.
- Each subsequent phase is a separate PR / commit batch.

## Open questions / parking lot

- Jump list identity. `UI.jumpList` holds button refs. Adopted
  buttons stay referenced; but their `data-ed11y-jump-position` is
  rewritten in `buildJumpList`. Confirm no listeners rely on it being
  stable.
- `result.toggle = mark` back-reference in `drawResult` — on adopt,
  reassign to existing mark, not a new one.
- `UI.oldResults` / `newIncrementalResults` fast-path in
  `updatePanel` — may become redundant once adoption is in place.
  Don't remove in phase 2; revisit later.
- Split-configuration results (`UI.splitConfiguration.devResults`) —
  also cleared at `checkAll:1374`. Adoption should work for these
  too, since they share the `pushResult` path.
