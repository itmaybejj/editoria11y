#!/usr/bin/env node
// Markup linter for editoria11y translation files.
//
// Detects two classes of corruption that machine translation and careless
// edits introduce into the rendered tooltip HTML of each locale:
//   1. Unbalanced / misnested HTML tags (e.g. a stripped <a href="…"> opening
//      that leaves an orphan </a>, or an unescaped <title> that should be
//      &lt;title&gt;).
//   2. Bare (unwrapped) URLs — an http(s):// that is NOT inside an
//      href="…"/src="…" attribute, which usually means an anchor's opening
//      tag was lost and the URL is now visible link text.
//
// Each locale is imported in its OWN child process, because en/en-us/en-ca/
// en-gb all import src/sa11y-lang/en.js and mutate its shared strings object
// via Object.assign — checking them in one process cross-contaminates results.
//
// Usage (run from the repo root):
//   node .agents/skills/check-translations/check-markup.mjs                # all locales
//   node .agents/skills/check-translations/check-markup.mjs src/lang/fr.js # one file
// Exit code is non-zero when any issue is found (CI-friendly).

import { readdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { resolve } from 'path';
import { spawnSync } from 'child_process';

const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'wbr', 'source', 'area', 'base', 'col', 'embed', 'link', 'param', 'track']);

function checkTags(html) {
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g;
  const stack = []; const errs = []; let m;
  while ((m = re.exec(html))) {
    const close = m[1] === '/', name = m[2].toLowerCase(), self = m[3] === '/';
    if (VOID.has(name) || self) continue;
    if (!close) { stack.push(name); continue; }
    if (stack.length === 0) errs.push('stray </' + name + '>');
    else if (stack[stack.length - 1] === name) stack.pop();
    else {
      const idx = stack.lastIndexOf(name);
      if (idx === -1) errs.push('unmatched </' + name + '>');
      else { errs.push('misnested </' + name + '> (open <' + stack[stack.length - 1] + '>)'); stack.length = idx; }
    }
  }
  if (stack.length) errs.push('unclosed <' + stack.join('><') + '>');
  return errs;
}

function checkUrls(html) {
  const errs = []; const re = /https?:\/\/[^\s"'<>)]+/g; let m;
  while ((m = re.exec(html))) {
    const before = html.slice(Math.max(0, m.index - 60), m.index);
    if (/(href|src|cite|action)\s*=\s*["']?$/i.test(before)) continue; // inside an attribute
    if (/\(\s*["']?$/.test(before)) continue;                          // inside url(...)/css
    errs.push('bare URL ' + m[0].slice(0, 60));
  }
  return errs;
}

const arg = process.argv[2];

if (arg) {
  // Child mode: import one locale and report findings.
  const mod = await import(pathToFileURL(resolve(arg)).href);
  const L = mod.lang || mod.default?.lang || mod.default;
  if (!L) { console.log('NO_LANG_EXPORT'); process.exit(2); }
  let found = 0;
  for (const bucket of ['testNames', 'strings']) {
    const obj = L[bucket]; if (!obj) continue;
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v !== 'string') continue;
      const e = [...checkTags(v), ...checkUrls(v)];
      if (e.length) { console.log(bucket + '.' + k + ' :: ' + e.join(' | ')); found++; }
    }
  }
  process.exit(found ? 1 : 0);
} else {
  // Parent mode: spawn a child per locale.
  const langDir = resolve('src/lang');
  const skip = new Set(['baseAll.js', 'baseEnglishOnly.js', '_template.js']);
  const files = readdirSync(langDir).filter((f) => f.endsWith('.js') && !skip.has(f)).sort();
  const self = fileURLToPath(import.meta.url);
  let bad = 0;
  for (const f of files) {
    const r = spawnSync(process.execPath, [self, resolve(langDir, f)], { encoding: 'utf8' });
    const out = (r.stdout || '').trim();
    if (out) { console.log('===== ' + f + ' ====='); console.log(out); bad++; }
    if (r.stderr && r.stderr.trim()) { console.log('===== ' + f + ' (LOAD ERROR) ====='); console.log(r.stderr.trim()); bad++; }
  }
  console.log(bad ? `\n✗ ${bad} locale file(s) with markup issues.` : '✓ All locale files have balanced tags and wrapped URLs.');
  process.exit(bad ? 1 : 0);
}
