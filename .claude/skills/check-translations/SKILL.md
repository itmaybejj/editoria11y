---
name: check-translations
description: Compare translation files against English base to find missing or extra keys
disable-model-invocation: true
---

Compare all translation files against the English base to find missing or extra keys.

## Steps

1. Read the English base files:
   - `src/lang/en.js` (editoria11y strings)
   - `src/sa11y-lang/en.js` (sa11y strings)

2. For each translation file in `src/lang/` and `src/sa11y-lang/`:
   - Extract all exported string keys
   - Compare against the English base
   - Report any **missing keys** (in English but not in translation)
   - Report any **extra keys** (in translation but not in English)
   - Report any keys with **placeholder count mismatches** (different number of `%` placeholders)

3. Output a summary table showing each language and its status (OK, missing keys, extra keys)
