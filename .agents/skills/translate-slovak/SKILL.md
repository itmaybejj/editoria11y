---
name: translate-slovak
description: Glossary and phrasing rules for Slovak (sk) translations of Editoria11y and Sa11y strings. Read before writing or reviewing src/lang/sk.js or src/sa11y-lang/sk.js.
disable-model-invocation: true
---

# Slovak translation notes

Derived from a native-speaker rewrite of the machine-translated `src/sa11y-lang/sk.js`
(upstream Sa11y PR). Apply these when producing or reviewing any Slovak string.

## Glossary

| English | Use | Never |
| --- | --- | --- |
| accessible name | prístupný názov | prístupné meno |
| assistive technology | asistenčné technológie | asistívne technológie |
| alt text | alternatívny text (always spelled out) | alt text, text alt |
| issue / alert | problém / upozornenie | vydanie |
| heading | nadpis (capitalized in "Nadpis 1", "Nadpis 2") | smerovanie, položka, záhlavie |
| label (`<label>`, field/element label) | štítok | popis |
| caption (figcaption) | popis (pod obrázkom) | nadpis, titul, titulok |
| description | opis | — |
| accessibility | prístupnosť | dostupnosť |
| carousel | karusel | kolotoč |
| colour blindness | slepota na … farbu | roleta, farebná slepá |
| frame / iframe | rámec | rám |
| complex words | zložité slová | zložené slová |
| Deaf and hard of hearing | Nepočujúci a nedoslýchaví | osoby s poruchou sluchu |
| developer checks | vývojárske kontroly | kontroly vývojáře (Czech) |
| justified text | text zarovnaný do bloku | zarovnaný text |
| "click here" | „kliknite sem“ | „kliknite tu“ |
| Learn more about … | Viac informácií o … | Ďalšie informácie o … |
| To fix … | Ak to chcete opraviť … | Ak to chcete napraviť … |
| fragile (of code) | nespoľahlivý | krehký |
| raw URL | holá URL adresa | surová URL adresa |
| editors (people) | redaktori | editori |

Note: the two files diverge deliberately on table headers — `sa11y-lang/sk.js` uses
**záhlavie**, `lang/sk.js` uses **hlavička**. Both are correct; keep each file internally
consistent. No string from one surfaces beside the other in a tooltip.

## Phrasing

- **Quotes:** Slovak typographic quotes `„…“`. Never `"…"`, `&quot;`, or `»…«`.
- **Verify whether → `či`, not `že`.** "Skontrolujte, **či** je dostupný prepis."
  ("Uistite sa, **že** …" is correct — different verb.)
- **Imperative, not nominalized.** "Odstráňte prázdne odkazy", not "Odstránenie prázdnych odkazov".
- **Reflexive passive over `byť` + participle** (Germanism):
  "Nenašli sa žiadne obrázky", not "Neboli nájdené žiadne obrázky".
- **Statements stay statements.** English sentences ending in `.` must not become `?`.
- **`sa zdá byť` is machine-translation filler.** Prefer `je zrejme …` or `sa líši od …`.
- **`ani` after a negated verb**, not `alebo`: "nemal obsahovať prípony súborov **ani** rozmery".
- Untranslated English left inside markup ("Head %(level)", "Normal", "Paragraph",
  "strong importance", "4<sup>th</sup>") is a red flag — translate it
  (Nadpis / Normálny / Odsek / silný dôraz / 4<sup>.</sup>).

## Mechanics

- Keep `%(...)` placeholders identical in count, spelling and order to `en.js` / `baseAll.js`.
  Placeholder names are case-sensitive (`%(TEXT)` ≠ `%(text)`).
- Keep HTML markup, `{B}` / `{C}` / `{L}` / `{ALT}` tokens, and `<hr>` separators unchanged.
- `src/lang/*.js` keys must match `src/lang/baseAll.js` exactly, except that translations may
  add `META_MAX` / `META_SCALABLE` tips (most do) to override the Sa11y fallback.
- Localize documentation links where a locale exists:
  `support.google.com/docs/answer/6199477?hl=sk`,
  `support.microsoft.com/sk-sk/office/…`.
## Plurals

Counted phrases use CLDR plural categories via `pluralKey()` in
[src/js/utils/utils.js](../../../src/js/utils/utils.js). For a base key, a language supplies
`${base}_one`, `_two`, `_few`, `_many`, `_zero` **only for the categories it actually
inflects**; every other count falls back to the base key. Languages with a single plural form
need no extra strings.

Never invent count thresholds — check the real categories first:

```js
const pr = new Intl.PluralRules('sk');
[1, 2, 3, 5, 21, 101].map((n) => `${n}:${pr.select(n)}`);
// [ '1:one', '2:few', '3:few', '5:other', '21:other', '101:other' ]
```

Slovak uses **one** (1), **few** (2-4) and **other** (5+). Note that Slovak does *not* restart
the cycle at 21 or 101, unlike Polish, Ukrainian, Lithuanian and Slovene.

| Key | Count | Slovak |
| --- | --- | --- |
| `main_toggle_1` | exactly 1 | Jedno upozornenie na prístupnosť |
| `main_toggle_2` | exactly 2 | Dve upozornenia na prístupnosť |
| `main_toggle_few` | 3-4 | ` upozornenia na prístupnosť` |
| `main_toggle_plural` | 5+ (fallback) | ` upozornení na prístupnosť` |
| `PANEL_DISMISS_BUTTON_one` | 1 | Zobraziť %(dismissCount) skryté upozornenie |
| `PANEL_DISMISS_BUTTON_few` | 2-4 | Zobraziť %(dismissCount) skryté upozornenia |
| `PANEL_DISMISS_BUTTON` | 5+ (fallback) | Zobraziť %(dismissCount) skrytých upozornení |
| `buttonHideHiddenAlerts_few` | 2-4 | Skryť %(count) skryté upozornenia |
| `buttonHideHiddenAlerts` | 5+ (fallback) | Skryť %(count) skrytých upozornení |

`main_toggle_1` and `main_toggle_2` spell the number out and match on the literal count, so they
are not plural categories. `buttonHideHiddenAlerts` is only ever called with 2 or more, which is
why Slovak needs no `_one` for it.

Inflect the adjective too, not just the noun: *skryté upozornenia* (few) vs *skrytých upozornení*
(other).
