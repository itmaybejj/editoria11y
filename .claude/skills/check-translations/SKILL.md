---
name: check-translations
description: Diff English source strings against each translation, report stale/missing keys, and optionally update translations using parallel agents
disable-model-invocation: true
---

# Translation Sync Checker

Uses `src/lang/TRANSLATION_MANIFEST.json` to track which English commit each translation was last synced to, then generates targeted diffs to identify what changed.

## Manifest location

`src/lang/TRANSLATION_MANIFEST.json` — contains:
- `englishSources`: the English base files whose changes drive translations
- `baseline`: the commit all translations were initially baselined to
- `translations`: map of `{ "src/lang/xx.js": "<commit>" }` for every translation file

## Step 1: Identify what changed in English

For each English source file listed in `englishSources`, diff from the oldest translation commit to HEAD:

```bash
git diff <oldest_commit> HEAD -- src/lang/baseAll.js src/lang/baseEnglishOnly.js src/sa11y-lang/en.js
```

If no diff, all translations are up to date — report that and stop.

If there is a diff, summarize:
- **Added keys** (new strings that need translation)
- **Removed keys** (strings that should be deleted from translations)
- **Changed values** (English wording changed — translation needs update)

## Step 2: Audit each translation

For each translation file in the manifest:

1. Read the translation file and extract its exported keys
2. Read the corresponding English base:
   - `src/lang/*.js` translations → compare against keys in `src/lang/baseAll.js` (testNames + interfaceStrings + tips)
   - `src/sa11y-lang/*.js` translations → compare against keys in `src/sa11y-lang/en.js`
3. Report:
   - **Missing keys**: in English but not in translation
   - **Extra keys**: in translation but not in English (possibly removed)
   - **Stale keys**: keys whose English value changed since the translation's recorded commit

## Step 3: Output summary

```
| Language | File               | Missing | Extra | Stale | Last synced |
|----------|--------------------|---------|-------|-------|-------------|
| da       | src/lang/da.js     | 2       | 0     | 5     | 590d164     |
| da       | src/sa11y-lang/da.js | 0     | 1     | 3     | 590d164     |
...
```

Then list the specific keys per language that need attention.

## Updating translations (parallel agents)

To update all stale translations, launch one Agent per language **in parallel** (use a single message with multiple Agent tool calls). Each agent should:

1. Receive the English diff (changed/added/removed keys with old and new English values)
2. Read the target translation file
3. For **added keys**: translate the English value, matching the style/tone of existing translations in that file
4. For **removed keys**: delete them from the translation
5. For **changed keys**: update the translation to reflect the new English meaning, preserving the translation's natural phrasing where possible
6. Write the updated file
7. Do NOT touch keys that haven't changed in English

Example agent prompt pattern:
```
Update the Danish translation file src/lang/da.js.

English changes since last sync (commit 590d164):
- ADDED: NEW_KEY = "New English string"
- CHANGED: EXISTING_KEY: "Old English" → "New English"  
- REMOVED: OLD_KEY

Read the current translation file, apply these changes (translate added/changed keys to Danish, remove deleted keys), and write the result. Match the existing translation style. Do not modify unchanged keys.
```

After all agents complete, update the manifest:
```bash
COMMIT=$(git rev-parse HEAD)
# Update each translation's commit in TRANSLATION_MANIFEST.json to $COMMIT
```

## Important notes

- `src/lang/en.js` and `src/lang/en-us.js` are **not** translations — they assemble the English bundle. Skip them.
- `src/lang/_template.js` is a template. Skip it.
- `src/sa11y-lang/en.js` and `src/sa11y-lang/enUS.js` are English sources, not translations. Skip them.
- The `src/lang/*.js` files contain `testNames`, `interfaceStrings`, and `tips` objects. The `src/sa11y-lang/*.js` files contain a single `strings` object.
- Some translations are marked "Machine translation" in a comment — these are lower priority for human review but should still be kept in sync.
