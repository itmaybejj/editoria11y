---
name: check-translations
description: Diff English source strings against each translation, report stale/missing keys, and optionally update translations using parallel agents
disable-model-invocation: true
---

# Translation Sync Checker

Uses `src/lang/TRANSLATION_MANIFEST.json` to track which English commit each translation was last synced to, then generates targeted diffs to identify what changed.

## Scope

- **We translate**: `src/lang/*.js` files only (editoria11y's own strings)
- **We do NOT translate**: `src/sa11y-lang/*.js` files (managed in the Sa11y repo)
- **We do report**: changes in `src/sa11y-lang/en.js` for cross-repo sync review

## Two modes of work

This skill runs in two modes depending on the state of each translation file:

1. **Sync mode** (the common case): a translation already exists for a language; the skill diffs the English source between the translation's recorded commit and HEAD, and patches each language. This is described in Steps 1–2 below.

2. **First-pass mode**: a stub file exists in `src/lang/` but the editoria11y-specific objects (`testNames`, `tips`, `interfaceStrings`) are empty. Stubs carry an `// UNTRANSLATED STUB` header and are listed under `pendingTranslations` in `TRANSLATION_MANIFEST.json`. They need a complete first translation pass, not a diff, and live in `scripts/build.js` under a separate `pendingLangs` array (not built). See **First-pass translations** below. As of this writing there are no pending languages, but the workflow is documented for the next batch.

## Manifest location

`src/lang/TRANSLATION_MANIFEST.json` — contains:
- `englishSources`: the editoria11y English base files (`baseAll.js`, `baseEnglishOnly.js`)
- `sa11yEnglishSource`: the Sa11y English source (`src/sa11y-lang/en.js`) — monitored for changes but not translated here
- `baseline`: the commit all translations were initially baselined to
- `translations`: map of `{ "src/lang/xx.js": "<commit>" }` for each translation file

## Step 1: Identify what changed in English

Diff from the oldest translation commit to HEAD:

```bash
git diff <oldest_commit> HEAD -- src/lang/baseAll.js src/lang/baseEnglishOnly.js
```

If no diff, all translations are up to date — skip to Step 3.

If there is a diff, summarize:
- **Added keys** (new strings that need translation)
- **Removed keys** (strings that should be deleted from translations)
- **Changed values** (English wording changed — translation needs update)

## Step 2: Update translations (parallel agents)

Launch one Agent per language **in parallel** (use a single message with multiple Agent tool calls). Each agent receives the same English diff context.

Deploy the first 10 agents in one batch, then pipeline: launch another agent as soon as one finishes, rather than waiting for a full batch to complete.

### Shared spec file (recommended when 3+ languages are affected)

Instead of inlining the full English diff in every agent prompt, write the diff once to a shared file (e.g., `/tmp/ed11y-translation-spec.md`) and point each agent at it. This keeps per-prompt tokens low and guarantees consistency across languages. The spec file should contain:

- The OLD/NEW English for every changed key
- Recurring patterns to watch for (e.g., "all `Alt text:` prefixes are now wrapped in `<strong>...</strong>`")
- The critical rules block

### Critical agent instructions

Include ALL of the following rules in every agent prompt — these were learned from production failures:

```
CRITICAL RULES FOR WRITING TRANSLATION FILES:

1. NEVER use curly/smart quotes (' ' " ") as JavaScript string delimiters.
   Only use straight single quotes ('), straight double quotes ("), or backticks (`).

2. When a translated string contains an apostrophe (e.g., Italian "l'immagine",
   French "l'image"), you MUST either:
   - Use backtick delimiters: `L'immagine è marcata...`
   - Or escape the apostrophe: 'L\'immagine è marcata...'
   NEVER use curly quotes to work around apostrophes.

3. Use the Edit tool with targeted old_string/new_string replacements.
   Do NOT use the Write tool to rewrite the entire file — this risks
   corrupting unchanged content or introducing encoding issues.

4. After the last edit is made, verify the file parses by running:
   node -c <filepath>
   If it fails, fix the syntax error before finishing. Each node command pauses for user error, so try to group this into as few commands as possible.

5. Preserve the exact indentation style of the file (tabs, not spaces).

6. Keep all HTML markup, ${why.fix}, %(NAME) placeholders, and URLs
   exactly as-is — only translate the human-readable text.

7. INVISIBLE UNICODE HAZARD (especially fr.js): the Edit tool does byte-exact
   matching on old_string. French uses U+202F (narrow no-break space) and
   sometimes U+00A0 (no-break space) before ":", ";", "?", "!". These look
   identical to regular spaces when displayed. Other languages may use
   U+2011 (non-breaking hyphen) or U+2019 (curly apostrophe) inside words.
   If Edit fails with "String to replace not found" on text that looks
   correct, suspect invisible characters.

8. ESCAPE HATCH: if Edit fails twice on what looks like the same string,
   STOP LOOPING. Report back to the main process that Edit cannot match
   the target — include the target text and the error. The main process
   can inspect raw bytes via Bash + python3 and do the surgical edit.
   Do not invent XXX/YYY marker strategies or try to guess Unicode
   codepoints — those have historically left files corrupted.
```

### Agent prompt pattern

```
Update the [Language] translation file at [path].

English changes since last sync:
- ADDED testName: KEY = "English string"
- ADDED tip: KEY = `<p>English tip...</p>`
- CHANGED tip KEY — new English: `<p>New English...</p>`
- REMOVED: OLD_KEY

CRITICAL RULES FOR WRITING TRANSLATION FILES:
[paste the rules block above]

Read the file first. Use the Edit tool for targeted replacements.
Insert new keys alphabetically among existing keys.
Match the existing translation style and tone.
Run `node -c [filepath]` when done to verify syntax.
```

### After all agents complete

1. Run `npm run build` to verify everything compiles
2. Fix any syntax errors (most likely: unescaped apostrophes or curly quotes)
3. Update each translation's commit in `TRANSLATION_MANIFEST.json` to current HEAD

## Step 3: Report Sa11y English changes

Always check for changes in the Sa11y English source, even if editoria11y strings haven't changed:

```bash
git diff <oldest_commit> HEAD -- src/sa11y-lang/en.js
```

If there are changes, print a structured report for human review:

```markdown
## Sa11y English String Changes (for cross-repo sync)

These changes are in `src/sa11y-lang/en.js` and need to be synced
to the Sa11y repo and other consuming projects.

### New keys
| Key | Value |
|-----|-------|
| NEW_KEY | "New English string" |

### Changed keys
| Key | Old value | New value |
|-----|-----------|-----------|
| CHANGED_KEY | "Old text" | "New text" |

### Removed keys
| Key | Old value |
|-----|-----------|
| OLD_KEY | "Was this" |
```

This report is for the developer to manually sync across repos — do NOT attempt to translate or modify `src/sa11y-lang/` files.

## English dialect variants

`src/lang/en-gb.js` (British) and `src/lang/en-ca.js` (Canadian) are thin
dialect overlays over `baseAll.js`. They do NOT re-translate everything —
they import `baseAll.js` and override only the keys that differ in spelling
or word choice.

When baseAll.js gains a new string that contains dialect-sensitive words
(e.g. `color`, `colorblind`, `organize`, `visualize`, `emphasize`,
`capitalize`, `-ize`/`-ise` verbs, `-or`/`-our` nouns), both dialect files
may need a matching override entry:

- **en-gb** (British): override `color→colour`, `organize→organise`,
  `visualize→visualise`, `emphasize→emphasise`, `capitalize→capitalise`,
  and any other `-ize`/`-our` differences.
- **en-ca** (Canadian): override `-our` words only (`color→colour`,
  `colorblind→colourblind`). Canadian English keeps American `-ize`
  endings, so most other words stay as-is.

Tips that embed `${why.headings}` need the whole tip rewritten in
`en-gb.js` because the embedded block contains "organise". The list of
affected tips is in `en-gb.js` — look at `britishTips`.

## First-pass translations

When a `src/lang/<code>.js` file is a stub (`// UNTRANSLATED STUB` header, empty `testNames`/`tips`/`interfaceStrings`), the language needs a complete first translation pass instead of a diff. Such stubs should be enumerated in `TRANSLATION_MANIFEST.json` under a `pendingTranslations` block, and the language code should live in `scripts/build.js` under a separate `pendingLangs` array (not in the active `langs` array — building a stub would ship a half-Sa11y, no-editoria11y bundle).

### Workflow for a first-pass translation

1. Pick a fully-translated reference file in `src/lang/` whose tone you want to match (e.g. `da.js`, `de.js`, `es.js`). This is the *structural* model — same key set, same use of `${why.fix}`, `%(EL)`, etc.
2. Write a shared spec to `/tmp/claude/ed11y-translation-spec.md` with the workflow, file paths, and the critical-rules block. Per-language prompts can then be tiny (just "your CODE is X; read the spec; tone notes for this language").
3. For each pending language, launch one Sonnet Agent. **Cap parallel dispatch at 8 agents** — the harness has a parallel-tool-call limit. With 13 languages, do batches of 7 + 6.
4. Each translator agent:
   - Reads the stub file, `baseAll.js`, `baseEnglishOnly.js`, and one reference translation.
   - Translates every key from `baseAll.js` (NOT `baseEnglishOnly.js`) into the target language.
   - Uses targeted `Edit` calls to populate `testNames`, `why`, `tips`, and `interfaceStrings`, matching the alphabetization in the reference file.
   - Removes the `// UNTRANSLATED STUB` comment block once the file is complete.
   - Runs `node -c src/lang/<code>.js` to verify syntax.
5. After translators complete, **dispatch Opus proofreaders** (one per language, again capped at 8 in parallel) using a parallel `/tmp/claude/ed11y-proofread-spec.md`. Proofreaders polish for native-speaker naturalness, terminology consistency, grammar, and punctuation conventions of the target language. Each proofreader edits in place and re-runs `node -c`.
6. Promote the languages:
   - Move each code from `pendingLangs` to `langs` in `scripts/build.js` (alphabetical order).
   - In `TRANSLATION_MANIFEST.json`, delete the entry from `pendingTranslations` and add it to `translations` with the current HEAD commit.
   - Remove the `void pendingLangs;` line from `scripts/build.js` if `pendingLangs` is now empty.
   - Run `npm run build` and verify `dist/js/lang/<code>.js` and `<code>.umd.js` bundles appear.

### Tamil (ta) — special handling whenever a Tamil stub is created

Tamil in Sa11y is **human-translated**, not machine-translated. Treat the human translator's voice as authoritative.

If you ever create a new Tamil stub (or re-translate the existing `src/lang/ta.js` from scratch), the dispatching prompt for Tamil — and ONLY Tamil — must:

1. Include **a copy of the full contents of `src/sa11y-lang/ta.js`** inlined in the prompt (read it and inline it; do not just reference the path).
2. Include a vocabulary-anchor table mapping common accessibility concepts (alt text, heading, link, screen reader, accessible name, label, input field, image, button, element, attribute, contrast, etc.) to the human translator's chosen Tamil terms. Pull these from `src/sa11y-lang/ta.js`.
3. Include this directive verbatim:

   ```
   TAMIL-SPECIFIC: src/sa11y-lang/ta.js was written by a human translator,
   not by machine translation. Defer to its style, register, terminology,
   sentence rhythm, and word choice. Match how that file phrases analogous
   accessibility concepts rather than inventing fresh terms or copying tone
   from machine-translated sibling files. When in doubt, mirror the Sa11y
   wording even if it would read differently in machine translation.
   ```

4. Do NOT include the standard "match the existing translation style and tone of sibling files" instruction for Tamil — the directive above takes precedence.
5. The Tamil proofreader prompt must apply the same directive: verify the translator deferred to the Sa11y voice and align any drifted terms back to it.
6. All other rules in the critical-rules block still apply (no curly quotes, escape apostrophes, preserve placeholders, run `node -c`, etc.).

### Operational notes from the last batch

- Each translator + proofreader pair costs roughly 60k–180k tokens depending on language complexity. The Lithuanian and Slovak proofreaders ran 100+ tool calls — that's normal for languages with rich case morphology.
- Cyrillic (`bg`), Tamil script (`ta`), and accented Latin scripts all save fine as UTF-8 in `src/lang/`. If any character looks garbled in `git diff`, run `file src/lang/<code>.js` to confirm encoding.
- The dev report and consuming CMS plugins (Drupal, WordPress) discover languages via the built `dist/js/lang/` files, NOT via `src/lang/`. So a stub in `pendingLangs` is invisible to end users until it's promoted to `langs`.

## Files to skip

These are NOT translation targets — never modify them:
- `src/lang/en.js` — English bundle assembler
- `src/lang/en-us.js` — English US variant assembler
- `src/lang/_template.js` — template file
- `src/lang/baseAll.js` — English source (testNames, interfaceStrings, tips)
- `src/lang/baseEnglishOnly.js` — English-only overrides
- `src/sa11y-lang/*.js` — all Sa11y lang files (managed externally; **exception: read `src/sa11y-lang/ta.js` to feed the Tamil first-pass agent — see Tamil-specific handling above**)

## File structure reference

Each `src/lang/*.js` translation file contains:
- An import of its corresponding `src/sa11y-lang/*.js` file
- A `testNames` object (short alert titles)
- A `tips` object (detailed tooltip HTML using template literals with `${why.fix}`, `%(placeholder)` syntax)
- An `interfaceStrings` object (UI labels)
- An export combining everything with Sa11y strings via `Object.assign`
