#!/usr/bin/env node
// Structural check of translated locales against the English source (src/lang/baseAll.js).
//
// For every key in baseAll's testNames / tips / interfaceStrings, reports:
//   - keys missing from the translation
//   - %(placeholder) sets that differ (names are case-sensitive)
//   - a different number of <a href> links (catches dropped APA/WebAIM links)
//   - a "To fix" badge glued to the next word (why.fix missing its trailing space)
// and checks that the BTN_ROLE_IN_NAME test name quotes Sa11y's localized BTN word,
// which is the word the check actually matches.
//
// Usage:
//   node .agents/skills/check-translations/check-keys.mjs              # all locales
//   node .agents/skills/check-translations/check-keys.mjs src/lang/de.js
//
// Each file is imported in its own child process, because the Sa11y string objects
// are mutated by Object.assign and would otherwise leak between locales.
// Exit code is non-zero on any finding.

import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const skip = /^(baseAll|baseEnglishOnly|_template|en(-[a-z]+)?)\.js$/;

if (process.argv[2] === '--one') {
	const file = path.resolve(process.argv[3]);
	const base = await import(pathToFileURL(path.join(root, 'src/lang/baseAll.js')));
	const { lang } = await import(pathToFileURL(file));
	const issues = [];
	const gluedBadge = [];
	const placeholders = (s) => (String(s).match(/%\([A-Za-z_]+\)/g) || []).sort().join(',');
	const links = (s) => (String(s).match(/<a\s[^>]*href=/g) || []).length;
	for (const obj of ['testNames', 'tips', 'interfaceStrings']) {
		const source = base[obj];
		const target = obj === 'testNames' ? lang.testNames : lang.strings;
		for (const key of Object.keys(source)) {
			if (!(key in target)) {
				issues.push(`missing ${obj}.${key}`);
				continue;
			}
			if (placeholders(source[key]) !== placeholders(target[key])) {
				issues.push(`placeholders ${obj}.${key}: en [${placeholders(source[key])}] vs [${placeholders(target[key])}]`);
			}
			if (links(source[key]) !== links(target[key])) {
				issues.push(`links ${obj}.${key}: en ${links(source[key])} vs ${links(target[key])}`);
			}
			if (/class="badge">[^<]*<\/strong>(?=[^\s<])/.test(String(target[key]))) {
				gluedBadge.push(key);
			}
		}
	}
	if (gluedBadge.length) {
		issues.push(`badge glued to the next word in ${gluedBadge.length} tips, e.g. ${gluedBadge[0]} (why.fix needs a trailing space)`);
	}
	const btn = lang.strings.BTN;
	const roleName = lang.testNames.BTN_ROLE_IN_NAME;
	if (btn && roleName && !roleName.toLowerCase().includes(String(btn).toLowerCase())) {
		issues.push(`testNames.BTN_ROLE_IN_NAME should quote Sa11y's BTN word "${btn}": ${roleName}`);
	}
	if (issues.length) {
		console.log(`${path.relative(root, file)}\n  ${issues.join('\n  ')}`);
		process.exit(1);
	}
	process.exit(0);
}

const files = process.argv.length > 2
	? process.argv.slice(2)
	: readdirSync(path.join(root, 'src/lang'))
		.filter((f) => f.endsWith('.js') && !skip.test(f))
		.map((f) => path.join(root, 'src/lang', f));

let failed = 0;
for (const file of files) {
	try {
		execFileSync(process.execPath, [fileURLToPath(import.meta.url), '--one', file], { stdio: 'inherit' });
	} catch {
		failed++;
	}
}
if (failed) {
	console.log(`\n✗ ${failed} locale file(s) have structural differences from baseAll.js.`);
	process.exit(1);
}
console.log('✓ All locale files match baseAll.js keys, placeholders and links.');
