#!/usr/bin/env node
// Structural check of Sa11y's lang files (Sa11y repo src/lang/, mirrored here as src/sa11y-lang/)
// against their en.js.
//
// Usage:
//   node .agents/skills/proofread-translations/check-sa11y-lang.mjs                 # src/sa11y-lang
//   node .agents/skills/proofread-translations/check-sa11y-lang.mjs ~/Sites/sa11y/src/lang de fr
//
// Reports, per locale:
//   - missing / extra keys
//   - for ui strings: %(placeholder) set, {B}/{C}/{ALT} tokens, <a href> count and tag names vs English
//   - for every string: placeholders that don't exist in English (e.g. a translated %(επίπεδο))
//   - words mixing scripts (a Cyrillic "е" inside a Latin word), English "Heading N" left in a string
//   - multi-word SUS_ALT_STOPWORDS entries (compared one word at a time, so they never match)
//     and duplicate ruleset entries
// Tooltip drift (English sentences or placeholders added after translation) is NOT reported.
// Exit code is non-zero on any finding. ta.js has known findings.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const dir =
  args[0] && existsSync(path.join(args[0], 'en.js'))
    ? path.resolve(args.shift())
    : path.resolve(here, '../../../src/sa11y-lang');
const only = args;
const en = (await import(pathToFileURL(path.join(dir, 'en.js')))).default.strings;
// ui keys = the block between 'const ui = {' and 'const tooltip = {' in en.js.
const enSrc = readFileSync(path.join(dir, 'en.js'), 'utf8');
const uiBlock = enSrc.slice(enSrc.indexOf('const ui = {'), enSrc.indexOf('const tooltip = {'));
const uiKeys = new Set([...uiBlock.matchAll(/^  ([A-Z_]+):/gm)].map((m) => m[1]));
const allPh = new Set(Object.values(en).flatMap((v) => String(v).match(/%\([^)]*\)/g) || []));
const skip = new Set(['en.js', 'enUS.js', 'en-us.js']);
const files = readdirSync(dir)
  .filter((f) => f.endsWith('.js') && !skip.has(f))
  .filter((f) => !only.length || only.includes(f.replace(/\.js$/, '')));

const ph = (s) => (String(s).match(/%\([^)]*\)/g) || []).sort().join(',');
const tok = (s) => (String(s).match(/\{(B|C|ALT|r)\}/g) || []).sort().join(',');
const links = (s) => (String(s).match(/<a\s[^>]*href=/g) || []).length;
const tags = (s) =>
  (String(s).match(/<\/?(strong|code|hr|a|em|br|span|ul|li|p)\b/g) || [])
    .map((t) => t.replace('<', ''))
    .sort()
    .join(',');
// A "word" containing letters from two scripts (e.g. Latin + Cyrillic/Greek).
const scripts = [/\p{Script=Latin}/u, /\p{Script=Cyrillic}/u, /\p{Script=Greek}/u];
const mixed = (s) =>
  String(s)
    .replace(/<[^>]+>/g, ' ')
    .split(/[^\p{L}]+/u)
    .filter((w) => w && scripts.filter((re) => re.test(w)).length > 1);

let total = 0;
for (const f of files) {
  const mod = (await import(pathToFileURL(path.join(dir, f)))).default;
  const t = mod.strings;
  const out = [];
  for (const k of Object.keys(en)) {
    if (!(k in t)) {
      out.push(`MISSING ${k}`);
      continue;
    }
    if (Array.isArray(en[k])) continue;
    for (const p of String(t[k]).match(/%\([^)]*\)/g) || [])
      if (!allPh.has(p)) out.push(`UNKNOWN-PLACEHOLDER ${k}: ${p}`);
    if (!uiKeys.has(k)) continue;
    if (ph(en[k]) !== ph(t[k])) out.push(`PLACEHOLDER ${k}: en[${ph(en[k])}] vs [${ph(t[k])}]`);
    if (tok(en[k]) !== tok(t[k])) out.push(`TOKEN ${k}: en[${tok(en[k])}] vs [${tok(t[k])}]`);
    if (links(en[k]) !== links(t[k])) out.push(`LINKS ${k}: en ${links(en[k])} vs ${links(t[k])}`);
    if (tags(en[k]) !== tags(t[k])) out.push(`TAGS ${k}: en[${tags(en[k])}] vs [${tags(t[k])}]`);
  }
  for (const k of Object.keys(t)) if (!(k in en)) out.push(`EXTRA ${k}`);
  for (const [k, v] of Object.entries(t)) {
    const vals = Array.isArray(v) ? v : [v];
    for (const s of vals) {
      const m = mixed(s);
      if (m.length) out.push(`MIXED-SCRIPT ${k}: ${m.join(' ')}`);
    }
    if (!Array.isArray(v) && f !== 'ta.js' && /Heading [1-6]/.test(v)) out.push(`ENGLISH-HEADING ${k}`);
  }
  const rs = mod.ruleset || {};
  const dupes = (a) => a.filter((w, i) => a.indexOf(w) !== i);
  for (const [k, arr] of Object.entries(rs)) {
    if (!Array.isArray(arr)) continue;
    for (const w of arr) {
      // Case and punctuation are normalized on both sides at runtime (Utils.foldForMatching /
      // normalizeStopWord), so entries only need to be single words where compared per word.
      if (k === 'SUS_ALT_STOPWORDS' && /\s/.test(w))
        out.push(`MULTIWORD ${k}: "${w}" (compared per word; never matches)`);
      if (w !== w.trim()) out.push(`WHITESPACE ${k}: "${w}"`);
    }
    const d = dupes(arr);
    if (d.length) out.push(`DUPLICATE ${k}: ${[...new Set(d)].join(', ')}`);
  }
  total += out.length;
  console.log(`== ${f} (${out.length})`);
  for (const line of out) console.log('  ' + line);
}
process.exitCode = total ? 1 : 0;
