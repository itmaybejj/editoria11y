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

## Files to skip

These are NOT translation targets — never modify them:
- `src/lang/en.js` — English bundle assembler
- `src/lang/en-us.js` — English US variant assembler
- `src/lang/_template.js` — template file
- `src/lang/baseAll.js` — English source (testNames, interfaceStrings, tips)
- `src/lang/baseEnglishOnly.js` — English-only overrides
- `src/sa11y-lang/*.js` — all Sa11y lang files (managed externally)

## File structure reference

Each `src/lang/*.js` translation file contains:
- An import of its corresponding `src/sa11y-lang/*.js` file
- A `testNames` object (short alert titles)
- A `tips` object (detailed tooltip HTML using template literals with `${why.fix}`, `%(placeholder)` syntax)
- An `interfaceStrings` object (UI labels)
- An export combining everything with Sa11y strings via `Object.assign`
