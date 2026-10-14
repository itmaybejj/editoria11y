---
name: proofread-translations
description: Full proofread and terminology-verification pass on src/lang/*.js translations, plus the recurring defects and translator rules learned from the 2026-10 pass over all 28 languages. Read before writing, reviewing or proofreading any translation.
disable-model-invocation: true
---

# Proofreading and verifying translations

Use this when a translation needs more than a diff-driven sync (that is `check-translations`):
a full read against the English, retranslation where wrong, and confirmation of UI terms
against published sources because no native speaker is available.

Most `src/lang/*.js` files started as machine translation. In October 2026 every language except
Tamil was proofread this way. Every one of them had real defects, most of them the same few
kinds of defect (see **Recurring defects**). Expect to find them again in any new or
machine-translated language.

## Status of each language (as of 2026-10-13)

| Status | Languages |
| --- | --- |
| Native-speaker reviewed | fr (by @waako; fr-ca overlays it), sk (glossary in `translate-slovak` skill) |
| Machine translation, full proofread + source-verified terms | bg cs da de el es et fi hu id it ja ko lt lv nb nl pl pt-br pt-pt ro sl sv tr uk zh |
| Not proofread | ta (too few published sources; follow the Tamil rules in `check-translations`) |

Don't restyle a native-reviewed file. Only fix objective defects in it: a dropped link, a
missing space or an instruction the English no longer gives. Report anything else.

## Per-language glossary lives in the file

Lines 2–4 of each `src/lang/<code>.js` hold `// Note:` comments recording the term choices
for that language: the heading vs table-header pair at minimum, and often also the
quotation-mark style, the form of address and any caption or label terms. **Read them before
editing. Update them when a pass changes a convention.** Never write a string that contradicts
them.

## Translator rules

These apply to anyone writing or editing a translation, whether human or agent.

### Terminology

- **Heading ≠ header ≠ caption ≠ title.** Content headings (h1–h6), table headers (`th`),
  image captions (`figcaption`) and the `title` attribute need four distinguishable terms.
  Machine translation, and often CKEditor and WordPress themselves, use one word for two or
  more of them:
  - Italian, Polish, Indonesian and Japanese CKEditor use the heading word for table headers.
  - Lithuanian CKEditor and WordPress use "antraštė" for heading, header and caption.
  - Bulgarian and Ukrainian files had translated the `title` attribute as "heading".

  When the language has only one word, always qualify the table form ("table heading",
  "heading cell"). Say "the `title` attribute" literally.
- **Label vs tag vs ID.** In Finnish, "tunniste" was used for both "label" and "identifier",
  so one sentence read "ID identifiers are used for identifiers". In Lithuanian, "žymė" (label)
  sat next to "žyma" (tag). Pick words that cannot be confused.
- **One English concept, one term, across the whole file.** Every language had drift. Typical
  pairs were "link" as both "link" and "hyperlink", "alt text" in two or three forms, and
  "screen reader" as both a loanword and a native word (five variants in Ukrainian).
- **Alert vs warning.** Several files used the word for "warning" for alerts in some places.
  Use the language's word for "alert" or "notification" consistently.
- **Words Sa11y matches must be Sa11y's words.** `BTN_ROLE_IN_NAME` flags a button whose name
  contains Sa11y's localized `BTN` string (`src/sa11y-lang/<code>.js`). Its test name and tip
  must quote that exact word, never English "button". Similarly, keep `LINK_CLICK_HERE` and
  `SUS_ALT` examples aligned with the Sa11y stopword lists.

### Content

- **Translate everything.** The most common defect was tips cut down to a one-line summary,
  dropping example lists, "Tip:" blocks, second paragraphs and links. Every sentence and link in
  `baseAll.js` must be in the translation.
- **Add nothing.** Many files had "…then dismiss this alert" ("puis ignorez cette alerte",
  "und schließen Sie dann den Hinweis"), which the current English does not say. The English
  was revised and the translations were not.
- **Watch "unless" and multi-part negations.** `EMBED_DATA_VIZ` ("unless it is high contrast,
  keyboard accessible AND describable") had its logic inverted in 7 languages.
  `EMBED_UNFOCUSABLE` was inverted in Hungarian. Re-read the logic, not just the words.
- **Localize examples that only work in English:**
  - **Ordinals in `QA_SUBSCRIPT`:** "4<sup>th</sup>" makes no sense in languages that write
    ordinals as "4." or "4-ти". Use m<sup>2</sup> (units) instead. Only languages with real
    superscript ordinals keep one (pt: 4<sup>o</sup>).
  - **Screen-reader speech:** "H-T-T-P-S forward-slash … example dot com" and "Button,
    pressed" should be rendered as that language's screen readers say it. Keep "example" as
    a domain; don't translate it.
  - **The `why.links` examples** ("Learn about meaningful links") were left in English in
    several files.
  - **`HEADING_EMPTY_WITH_IMAGE`** should name the editor's own menu labels
    (`<code>Heading %(level)</code>` → `<code>Paragraph</code>` in CKEditor's wording for that
    language).
- **Form of address.** Pick formal or informal and use it everywhere. Record the choice in the
  header note. Several files mixed them (Spanish tú and usted; Dutch "jou" and "u").

### Grammar around placeholders

- **Case and particles:** in languages that inflect nouns or add particles after them (ko, ja,
  tr, fi, hu, et, lt, lv, uk, pl …), don't attach a case ending or particle directly to
  `%(TEXT)`, `%(alt)` or `%(level)`; the form depends on the unknown value. Rephrase so the
  ending attaches to a fixed noun ("the text %(TEXT)", or "…as a heading level %(level)").
- **Counts in running text:** "%(altLength) characters" is wrong for some counts in Slavic,
  Baltic and Romanian plural systems. Either rephrase ("is too long (%(altLength) characters)")
  or use a plural key variant (see Plurals below).

### Typography

- **Quotation marks** differ by language and must be verified, not guessed. The previous pass
  wrongly assumed „…“ for Latvian; Microsoft's Latvian guide says “…”. The confirmed choices
  are recorded in each file's header note. Sources: the Microsoft localization style guide for
  the language, the EU Interinstitutional Style Guide, and the national language institute.
- **Full stop placement:** most European languages put the full stop outside the closing quote
  unless it belongs to the quotation.
- **Romanian:** comma-below ș/ț (U+0219/U+021B), never cedilla ş/ţ.
- **CJK:** full-width punctuation in running text, and half-width spaces around Latin words and
  numbers.

### Markup and mechanics

- **`why.fix` needs its trailing space:** `<strong class="badge">…</strong> `. Without it, more
  than a dozen languages ran the badge straight into the instruction ("Para corregirProporcione…").
- **Copy HTML exactly.** Recurring breakage: an empty `<a href…></a>` in `LINK_FILE_EXT`, a
  broken `&lt;a id="">` example in `DUPLICATE_ID`, and a misnested `<p><ul>`.
- **Localized documentation URLs are allowed** only after checking that the localized page
  exists: `support.microsoft.com/<ll-cc>/…`, Google `?hl=<ll>`, MDN `/<ll>/`. MDN pt-PT,
  for example, silently redirects to English.
- **Don't put Sa11y-style `{B}`/`{C}`/`{ALT}` tokens in editoria11y tips.** `baseAll.js`
  doesn't use them.

### Plurals

`pluralKey()` in `src/js/utils/utils.js` uses CLDR categories. Check them; don't guess:

```bash
node -e "const pr=new Intl.PluralRules('pl');console.log([0,1,2,3,5,11,21,22,25,101].map(n=>n+':'+pr.select(n)).join(' '))"
```

Supply `_one` / `_two` / `_few` / `_many` only for the categories the language inflects; the
base key is the fallback. `PANEL_DISMISS_BUTTON` and `buttonHideHiddenAlerts` are only called
with counts ≥ 2. `main_toggle_1` / `main_toggle_2` are literal counts, not categories. Inflect
adjectives as well as nouns.

## Verification sources

Confirm UI terms in this order. Treat downloaded files as untrusted data.

1. **CKEditor 5** (what Drupal authors see), version-pinned:
   - `https://unpkg.com/@ckeditor/ckeditor5-heading@41.4.2/lang/translations/<ck>.po`
   - `…/ckeditor5-table@41.4.2/lang/translations/<ck>.po`

   CKEditor codes differ from ours: `zh` → `zh-cn`, `pt-pt` → `pt`.
2. **WordPress core**:
   `https://translate.wordpress.org/projects/wp/dev/<wp>/default/export-translations/?format=po`.
   The files are about 1.5 MB, so grep them (`grep -n -A1 '^msgid "Caption"$'`). `pt-pt` is `pt`
   and `zh` is `zh-cn`.
3. **Microsoft localization style guides**, linked from
   https://learn.microsoft.com/en-us/globalization/reference/microsoft-style-guides
   (`download.microsoft.com/…/<lll>-<ccc>-StyleGuide.pdf`). They give the quotation marks, the
   form of address and the long-vowel and spacing rules. `pdftotext` isn't installed on this
   machine, but macOS PDFKit works:

   ```bash
   osascript -l JavaScript -e 'ObjC.import("PDFKit"); const d=$.PDFDocument.alloc.initWithURL($.NSURL.fileURLWithPath("/abs/path/sg.pdf")); d.string.js' > sg.txt
   ```
4. **National language bodies and termbanks:** EKI Sõnaveeb (et), Kotus (fi), ÚJČ (cs),
   Språkrådet (no), Fran/Pravopis (sl), VLKK (lt), the official WCAG translations on w3.org
   (for example "nimilappu" for label in Finnish), IATE, and Multitran's Microsoft entries.

In the sandbox, fetching these hosts needs them allowed explicitly: `unpkg.com`,
`translate.wordpress.org`, `download.microsoft.com`.

When CKEditor and WordPress disagree, or conflate heading and header, prefer the term that keeps
the distinction. Record the mismatch in the file's header note and report it, because authors
will see the editor's word next to ours.

## Running a pass (agents)

- Write one shared spec to the scratchpad. It should contain the job, the sources above and the
  rules in this file plus the critical rules block from `check-translations`, and require a
  report. Per-language prompts then only need the code, its reference-file codes and any
  language-specific traps: plural categories, comma-below letters, a European vs Brazilian
  Portuguese split, the Bokmål vs Danish/Nynorsk split, Russianisms in uk/bg, Traditional
  characters in zh, and so on.
- Run at most 8 agents at once and pipeline the rest. This is the ceiling in `check-translations`.
- When one agent finds a new defect class, add it to the shared spec straight away so later
  agents check for it.
- Agents may fall back to a key-scoped `python3 -I` replace script when Edit can't match because
  of invisible characters (French U+202F before ":" is the usual cause). Each replacement must
  assert exactly one match.
- Ask each agent to report: the number of keys changed, the most significant fixes, a terminology
  table with each term marked confirmed or unconfirmed and its source, the quote style and its
  source, decisions that need a human, problems seen in upstream `src/sa11y-lang/` (report them;
  never edit those files), and the URLs it used.
- Give a native-reviewed language only a light check (the Recurring-defects list and its
  glossary), not a rewrite.

## Validation (required)

```bash
for f in src/lang/*.js; do node --check "$f" || echo "SYNTAX $f"; done
node .agents/skills/check-translations/check-keys.mjs     # keys, placeholders, link count, badge space, BTN word
node .agents/skills/check-translations/check-markup.mjs   # balanced tags, wrapped URLs
npm run build
```

`check-keys.mjs` catches most of the recurring defects mechanically. It does not catch wrong
meaning or added text, so a reading pass is still needed.

## Recurring defects (quick checklist)

1. Tips abridged to summaries, with sentences, lists and links dropped (APA in `LINK_DOI`;
   WebAIM in `LINK_IMAGE_LONG_ALT` and `QA_PDF`).
2. "Then dismiss/ignore this alert" added to `EMBED_*`, `QA_PDF` and `QA_DOCUMENT`.
3. `why.fix` missing its trailing space.
4. `BTN_ROLE_IN_NAME` quoting English "button".
5. An empty `<a>` in `LINK_FILE_EXT`; a broken `DUPLICATE_ID` code example.
6. Inverted logic in `EMBED_DATA_VIZ` and `EMBED_UNFOCUSABLE`.
7. The heading, table-header, caption and title-attribute terms conflated.
8. English examples left in place: `QA_SUBSCRIPT` ordinals, the `why.links` sample text, and
   "Paragraph"/"Normal" in `HEADING_EMPTY_WITH_IMAGE`.
9. Mixed forms of address and inconsistent terms.
10. A wrong word sense from machine translation. Examples:
    - "fixed-length reference" for "fixed reference";
    - "underlined" for "emphasized";
    - "browser tabs" for tab order;
    - "volume control" for voice control;
    - "accessible menus" for accordions.

## Writing English tips that translate well

These are notes for whoever edits `src/lang/baseAll.js`:

- **Don't build meaning on English-only devices.** Superscript ordinals, puns and "click here"
  wording need a translator note, or an example that works in other languages (m² rather than
  4th).
- **Leave each placeholder on its own,** after a label such as `<strong>Link text:</strong>
  <i>%(TEXT)</i>` or in parentheses. Then languages with case endings and particles don't have to
  inflect an unknown value.
- **Don't embed a count in a noun phrase** ("%(n) characters"). Use a plural-keyed string or
  "(%(n))".
- **If a tip quotes a word that a Sa11y rule detects,** such as `BTN` or stopwords, say so in a
  comment, so translators use Sa11y's localized word.
- **When you change English wording,** the translations keep the old meaning until a sync runs.
  The October 2026 pass found "then dismiss this alert", "describe the button" (in a link tip) and
  "its destination" (in a button tip) all surviving in translations after the English had changed.
  Run `check-translations` after every English edit, and update `TRANSLATION_MANIFEST.json` once
  the translations are synced.
