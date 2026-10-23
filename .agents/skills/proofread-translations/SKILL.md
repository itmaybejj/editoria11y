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
  never edit those files here — fixes go to the Sa11y repo, see **Sa11y lang files** below), and
  the URLs it used.
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
11. A whole string in another language: pasted from a sibling locale or never translated
    (Indonesian in hu, Greek in es, Danish in nb, Czech "Nadpis"/"že" in sl and et).

## Sa11y lang files (`src/sa11y-lang/`)

These are copies of the Sa11y repo's `src/lang/*.js` (locally `/Users/jjameson/Sites/sa11y`; Sa11y
names them `ptBR.js`/`ptPT.js`/`enUS.js` where we use `pt-br`/`pt-pt`/`en-us`). **Edit them in the
Sa11y repo** and copy the result here; don't edit the copies here. Editoria11y shows Sa11y's `ui`
strings (ON/OFF, ERROR, WARNING, ALERT_TEXT, colour filters…) in the same panel as its own, and
matches page text with Sa11y's `ruleset` arrays, so both need the same care as `src/lang/`. Use the
term choices in our `src/lang/<code>.js` header notes there too.

In October 2026 every Sa11y language except Tamil was proofread: `ruleset` and `ui` in full, and
`tooltip` for obvious errors only. Tooltips still lag behind the English in every file (sentences,
`%(TEXT)` blocks and `{B}` badges that English added later). Syncing that is the Sa11y
maintainer's job; don't mix it into a proofread. Files without the "machine-generated" header
(de, es, fr, pl, sk, uk) are human-translated: objective fixes only.

Sa11y's `biome.json` doesn't include `src/lang`, so the only validation is importing the file:

```bash
node .agents/skills/proofread-translations/check-sa11y-lang.mjs                    # src/sa11y-lang here
node .agents/skills/proofread-translations/check-sa11y-lang.mjs ~/Sites/sa11y/src/lang de fr
```

Expected findings after the 2026-10 pass: `ta.js` (not proofread) and `es.js`
`EXTRA EMBED_FOCUSABLE` (a stale key).

### How the ruleset arrays are matched

Know this before judging an entry. Since the 2026-10 fix, the lists and the page text go through
the same normalization (`foldForMatching` / `normalizeStopWord` in Sa11y's
`src/js/utils/utils.js`). The text is lowercased, and Greek accents, the dot of Turkish "İ" and
dotless "ı" are folded. For exact stop word matches, punctuation is removed and combining marks
(Tamil) are kept. So case and punctuation in an entry no longer matter. Before that fix,
capitalized or punctuated entries, every Tamil entry and all-caps Greek or Turkish text silently
never matched.

| Array | Matched as | So an entry must be |
| --- | --- | --- |
| `LINK_STOPWORDS` | the WHOLE link text equals the entry (after a "new window" phrase is removed) | a complete lazy link text people really write: "klicken Sie hier", "lees verder" |
| `SUS_ALT_STOPWORDS` | equals the 1st, 2nd or last word of the alt (`Intl.Segmenter`); Han/kana entries also match the start or end of the alt | a single word |
| `PLACEHOLDER_ALT_STOPWORDS` | the WHOLE alt equals the entry | a complete placeholder alt |
| `CLICK`, `NEW_WINDOW_PHRASES` | substring regex | a stem, or the inflected form real annotations use ("klikn", "w nowej karcie"). A nominative "nowa karta" never appears inside "otwiera się w nowej karcie" |
| `POTENTIAL_UI_ELEMENTS` | substring of a link name of up to 15 characters that targets a missing anchor | a control label; avoid very short strings that hide inside common words |
| `FILE_TYPE_PHRASES` | not read by any code | low priority |

The mix of English and translated entries is intentional; keep the English ones. Every locale
carries the full English `SUS_ALT_STOPWORDS` and `PLACEHOLDER_ALT_STOPWORDS` lists, so when `en.js`
adds an entry, add it to each locale. Only German also carries the English `LINK_STOPWORDS`.

### Sa11y-specific defects found in the 2026-10 pass

These are in addition to the **Recurring defects** above:

- **Wrong sense of short UI labels.**
  - "issue" as a magazine *edition* (`SKIP_TO_ISSUE` in about eight languages).
  - "On" as a preposition (zh 在, hu "A oldalon", et "Veebilehel", id "Pada").
  - "Error" as a measurement error (zh 误差).
  - `ALERT_TEXT` as "alarm" or "warning".
  - "Red blind" as a red *window blind*.
  
  Use the language's switch-state words for ON/OFF, and its word for "notification" for `ALERT_TEXT`.
- **Strings that sit next to a number.** `WARNINGS_FOUND` and `TOTAL_FOUND` follow a number in a
  separate element, and `PANEL_DISMISS_BUTTON` contains one. Use a form that reads correctly
  after any count: "Show dismissed (%(dismissCount))", or a dash form such as "– number of
  warnings found" in Slavic, Baltic and Romanian.
- **Placeholders that don't match English.** Some were renamed in English but not in the
  translations (`%(firstPrefix)` → `%(PREFIX)` in all 28 files). Some were translated
  (`%(επίπεδο)`). Both render as literal text.
- **Markup corrupted by translation.**
  - A translated `<strong>` (ko `<강함>`).
  - `<code>for</code>` and `<code>id</code>` translated.
  - HTML entities with full-width semicolons (zh `&lt；`).
- **Corrupted Turkish entries.** Some contain U+0307, left by a non-locale `toLowerCase()` of "İ".
- **Untranslated English examples.** The `QA_SUBSCRIPT` and `QA_UNDERLINE` examples ("4<sup>th</sup>
  instead of fourth", "strong importance"/"emphasis") were left in English in most files. Apply
  the ordinal-to-units rule from the translator rules above.
- **Literal stopwords that nobody writes as link text.** For example "paper" as the material,
  "learn" as "to study", "check out" as a hotel checkout, or "view" as a scenic view.

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
