#!/usr/bin/env node
// Content-based record of the English strings the translations were last synced to.
//
// src/lang/translation-snapshot.json holds every English string as of the last
// completed translation run. Comparing it with the current English sources tells us
// what to translate, with no dependence on commit hashes (which squash merges and
// rebases throw away).
//
// Usage:
//   node .agents/skills/check-translations/english-snapshot.mjs
//       Report English strings added, changed or removed since the snapshot (Markdown).
//   node .agents/skills/check-translations/english-snapshot.mjs --json
//       The same report as JSON.
//   node .agents/skills/check-translations/english-snapshot.mjs --out <file>
//       Write the report to a file instead of stdout (e.g. a translator spec).
//   node .agents/skills/check-translations/english-snapshot.mjs --update
//       Record the current English as translated. Run only after every locale is done.
//   node .agents/skills/check-translations/english-snapshot.mjs --from <git-ref> [--update]
//       Use the English at a git ref instead of the working tree (for rebuilding a lost
//       or wrong snapshot from a known-good commit).
//
// Tips are stored with the shared `why` blocks folded back into `${why.key}`, so a
// change to one `why` block is reported once, not once per tip that embeds it.

import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const snapshotPath = path.join(root, 'src/lang/translation-snapshot.json');
const sources = {
	baseAll: 'src/lang/baseAll.js',
	baseEnglishOnly: 'src/lang/baseEnglishOnly.js',
	sa11y: 'src/sa11y-lang/en.js',
};
// Words that are spelled differently in en-gb / en-ca. A hit means the dialect
// overlays may need a matching override; it is a prompt to look, not a verdict.
// The sources are American English, so only the American spellings are listed.
const dialectWords =
	/\b\w*(color|\w{2,}iz(e|ed|es|ing|ation)|behavior|center|favor|honor|gray|catalog|analyz)\w*\b/gi;

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
	const i = args.indexOf(name);
	if (i === -1) return null;
	const value = args[i + 1];
	if (!value || value.startsWith('--')) {
		console.error(`${name} needs a value.`);
		process.exit(2);
	}
	return value;
};

const fromRef = option('--from');
const outFile = option('--out');

/**
 * Read a source file from the working tree, or from a git ref.
 */
function readSource(relPath) {
	if (!fromRef) {
		return readFileSync(path.join(root, relPath), 'utf8');
	}
	try {
		return execFileSync('git', ['show', `${fromRef}:${relPath}`], {
			cwd: root,
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'pipe'],
		});
	} catch (error) {
		console.error(`Could not read ${relPath} at ${fromRef}: ${error.stderr || error.message}`);
		process.exit(2);
	}
}

/**
 * Import the English sources from a temporary copy, so that a git ref and the working
 * tree load the same way and Node's module cache never serves a stale version.
 */
async function loadEnglish() {
	const dir = mkdtempSync(path.join(tmpdir(), 'ed11y-en-'));
	try {
		writeFileSync(path.join(dir, 'package.json'), '{"type":"module"}');
		const modules = {};
		for (const [name, relPath] of Object.entries(sources)) {
			let text = readSource(relPath);
			if (name === 'baseAll' && !/export\s+const\s+why\b/.test(text)) {
				// Older commits did not export `why`.
				text = text.replace(/(^|\n)const why\b/, '$1export const why');
			}
			const target = path.join(dir, relPath);
			mkdirSync(path.dirname(target), { recursive: true });
			writeFileSync(target, text);
			modules[name] = await import(pathToFileURL(target));
		}
		return modules;
	} finally {
		rmSync(dir, { recursive: true, force: true });
	}
}

const sortKeys = (obj) =>
	Object.fromEntries(Object.keys(obj).sort().map((key) => [key, obj[key]]));

/**
 * Replace each expanded `why` block in a tip with its `${why.key}` reference.
 */
function foldWhy(tips, why) {
	const blocks = Object.entries(why).sort((a, b) => b[1].length - a[1].length);
	const folded = {};
	for (const [key, value] of Object.entries(tips)) {
		let text = value;
		for (const [whyKey, whyText] of blocks) {
			text = text.split(whyText).join(`\${why.${whyKey}}`);
		}
		folded[key] = text;
	}
	return folded;
}

function buildSnapshot({ baseAll, baseEnglishOnly, sa11y }) {
	if (!baseAll.why) {
		console.error('src/lang/baseAll.js must export `why`.');
		process.exit(2);
	}
	return {
		editoria11y: {
			testNames: sortKeys(baseAll.testNames),
			why: sortKeys(baseAll.why),
			tips: sortKeys(foldWhy(baseAll.tips, baseAll.why)),
			interfaceStrings: sortKeys(baseAll.interfaceStrings),
			englishOverrides: sortKeys(baseEnglishOnly.englishOverrides),
		},
		sa11y: {
			strings: sortKeys(sa11y.default.strings),
		},
	};
}

function compare(before = {}, after = {}) {
	const result = { added: [], changed: [], removed: [] };
	for (const [key, value] of Object.entries(after)) {
		if (!(key in before)) {
			result.added.push({ key, value });
		} else if (JSON.stringify(before[key]) !== JSON.stringify(value)) {
			result.changed.push({ key, old: before[key], value });
		}
	}
	for (const [key, value] of Object.entries(before)) {
		if (!(key in after)) {
			result.removed.push({ key, old: value });
		}
	}
	return result;
}

function diffSnapshots(before, after) {
	const report = {};
	for (const group of Object.keys(after)) {
		for (const section of Object.keys(after[group])) {
			const result = compare(before?.[group]?.[section], after[group][section]);
			if (result.added.length || result.changed.length || result.removed.length) {
				report[`${group}.${section}`] = result;
			}
		}
	}
	return report;
}

const show = (value) => (typeof value === 'string' ? value : JSON.stringify(value));

function toMarkdown(report, from) {
	const lines = [`# English string changes since the translation snapshot`, ''];
	lines.push(`Compared: \`src/lang/translation-snapshot.json\` → ${from}`, '');
	if (!Object.keys(report).length) {
		lines.push('No changes. Translations are in sync with the English sources.');
		return `${lines.join('\n')}\n`;
	}
	const notes = {
		'editoria11y.englishOverrides': 'English-only; not translated. Review en-gb / en-ca dialect overlays only.',
		'sa11y.strings': 'Sa11y strings; not translated here. Report for cross-repo sync.',
	};
	const dialectHits = new Set();
	for (const [section, { added, changed, removed }] of Object.entries(report)) {
		lines.push(`## ${section}`, '');
		if (notes[section]) lines.push(`_${notes[section]}_`, '');
		for (const { key, value } of added) {
			lines.push(`- ADDED \`${key}\`:`, `  - NEW: ${show(value)}`);
		}
		for (const { key, old, value } of changed) {
			lines.push(`- CHANGED \`${key}\`:`, `  - OLD: ${show(old)}`, `  - NEW: ${show(value)}`);
		}
		for (const { key, old } of removed) {
			lines.push(`- REMOVED \`${key}\` (was: ${show(old)})`);
		}
		lines.push('');
		if (section.startsWith('editoria11y.') && section !== 'editoria11y.englishOverrides') {
			for (const { key, value } of [...added, ...changed]) {
				const words = show(value).replace(/<[^>]+>|https?:\/\/\S+/g, ' ').match(dialectWords);
				if (words) dialectHits.add(`\`${section.split('.')[1]}.${key}\`: ${[...new Set(words)].join(', ')}`);
			}
		}
	}
	if (dialectHits.size) {
		lines.push('## Dialect candidates (en-gb / en-ca)', '');
		lines.push('_Added or changed strings containing words that may need a British/Canadian override:_', '');
		for (const hit of dialectHits) lines.push(`- ${hit}`);
		lines.push('');
	}
	return `${lines.join('\n')}\n`;
}

const current = buildSnapshot(await loadEnglish());
const from = fromRef ? `git ref \`${fromRef}\`` : 'working tree';

if (flag('--update')) {
	const previous = existsSync(snapshotPath) ? JSON.parse(readFileSync(snapshotPath, 'utf8')) : {};
	const snapshot = {
		_comment:
			'English strings as of the last completed translation run. Do not edit by hand: run .agents/skills/check-translations/english-snapshot.mjs to see what changed since, and --update after every locale is translated.',
		// Stub locales awaiting a first full translation (see the check-translations skill).
		pendingTranslations: previous.pendingTranslations ?? {},
		...current,
	};
	writeFileSync(snapshotPath, `${JSON.stringify(snapshot, null, '\t')}\n`);
	console.log(`Updated ${path.relative(root, snapshotPath)} from the ${from}.`);
	process.exit(0);
}

if (!existsSync(snapshotPath)) {
	console.error(
		`${path.relative(root, snapshotPath)} does not exist. Create it from the last commit whose English was fully translated:\n` +
			'  node .agents/skills/check-translations/english-snapshot.mjs --from <git-ref> --update',
	);
	process.exit(2);
}

const report = diffSnapshots(JSON.parse(readFileSync(snapshotPath, 'utf8')), current);
const output = flag('--json') ? `${JSON.stringify(report, null, '\t')}\n` : toMarkdown(report, from);
if (outFile) {
	writeFileSync(outFile, output);
	console.log(`Wrote ${outFile}`);
} else {
	process.stdout.write(output);
}
