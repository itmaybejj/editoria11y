#!/usr/bin/env node
/*
 * Detects drift between Sa11y upstream and ed11y's language files.
 *
 * Sa11y is vendored via scripts/get.sh. When upstream adds a new check,
 * the check key appears in src/sa11y-js/utils/default-options.js (under
 * `checks`) and descriptive strings land in src/sa11y-lang/en.js. Ed11y
 * must then mirror the key in src/lang/baseAll.js (`testNames` + `tips`).
 *
 * This script surfaces four kinds of drift:
 *   1. HARD ERROR: a Sa11y check key missing from testNames or tips
 *   2. HARD ERROR: asymmetry between testNames and tips
 *   3. WARNING: a Sa11y string key that isn't a check, isn't overridden by
 *      ed11y's interfaceStrings, and isn't explicitly allowlisted as a
 *      known UI string
 *   4. WARNING: stale allowlist entry whose key no longer exists in en.js
 *
 * Hard errors exit 1. Warnings do not block (unless --strict is passed).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

// Sa11y modules reference browser globals at module load. Shim the minimum
// needed so their top-level code executes under Node.
globalThis.window ??= { location: { hostname: 'localhost' } };
globalThis.document ??= {};

const { default: defaultOptions } = await import('../src/sa11y-js/utils/default-options.js');
const { default: Sa11yStrings } = await import('../src/sa11y-lang/en.js');
const { testNames, tips, interfaceStrings } = await import('../src/lang/baseAll.js');
const allowlistPath = path.join(repoRoot, 'src/lang/sa11y-ui-allowlist.json');
const pkgPath = path.join(repoRoot, 'package.json');

const args = new Set(process.argv.slice(2));
const strict = args.has('--strict');
const writeArtifact = args.has('--emit-artifact');
const jsonOut = args.has('--json');

/* ---------- Load inputs ---------- */

let allowlistData;
try {
	allowlistData = JSON.parse(fs.readFileSync(allowlistPath, 'utf8'));
} catch (e) {
	console.error(`Failed to read ${allowlistPath}: ${e.message}`);
	process.exit(2);
}
// Allowlist sections accept either an array of keys (when no reason is
// needed) or a { key: reason } object.
const asKeySet = (section) => {
	if (!section) return [];
	if (Array.isArray(section)) return section;
	return Object.keys(section);
};
const allowlistKeys = new Set([
	...asKeySet(allowlistData.uiStrings),
	...asKeySet(allowlistData.deferredChecks),
]);
const deferredSet = new Set(asKeySet(allowlistData.deferredChecks));

const checkKeys = new Set(Object.keys(defaultOptions.checks));
const sa11yStringKeys = new Set(Object.keys(Sa11yStrings.strings));
const testNameKeys = new Set(Object.keys(testNames));
const tipKeys = new Set(Object.keys(tips));
const interfaceKeys = new Set(Object.keys(interfaceStrings));

/* ---------- Run checks ---------- */

const errors = [];
const warnings = [];

// 1. Every Sa11y check key must be mirrored in testNames AND tips
//    (or explicitly deferred in the allowlist).
for (const key of checkKeys) {
	if (deferredSet.has(key)) continue;
	const missing = [];
	if (!testNameKeys.has(key)) missing.push('testNames');
	if (!tipKeys.has(key)) missing.push('tips');
	if (missing.length) errors.push({ kind: 'missing-mirror', key, missing });
}

// 2. Every testName must have a matching tip (hard error).
//    Extra tips without testNames may be shared snippets (e.g. BTN_TIP,
//    LINK_TIP used via string interpolation inside other tips) — allow
//    them, but warn if they are not also Sa11y strings or allowlisted.
for (const key of testNameKeys) {
	if (!tipKeys.has(key)) {
		if (deferredSet.has(key)) continue;
		errors.push({ kind: 'asymmetric', key, missing: ['tips'] });
	}
}
for (const key of tipKeys) {
	if (testNameKeys.has(key)) continue;
	if (sa11yStringKeys.has(key)) continue; // Shared snippet also in Sa11y (e.g. BTN_TIP)
	if (allowlistKeys.has(key)) continue;
	warnings.push({ kind: 'orphan-tip', key });
}

// 3. Any Sa11y string not accounted for somewhere should be flagged
for (const key of sa11yStringKeys) {
	if (checkKeys.has(key)) continue;
	if (interfaceKeys.has(key)) continue;
	if (tipKeys.has(key)) continue;
	if (allowlistKeys.has(key)) continue;
	warnings.push({ kind: 'unrecognized-sa11y-string', key });
}

// 4. Stale allowlist entries
for (const key of allowlistKeys) {
	if (!sa11yStringKeys.has(key) && !checkKeys.has(key)) {
		warnings.push({ kind: 'stale-allowlist', key });
	}
}

/* ---------- Emit machine artifact ---------- */

if (writeArtifact) {
	const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
	const artifact = {
		schemaVersion: 1,
		ed11yVersion: pkg.version,
		sa11yVersion: pkg.sa11yVersion,
		generatedAt: new Date().toISOString(),
		checks: Object.fromEntries(
			[...checkKeys].sort().map((key) => [key, {
				title: testNames[key] ?? null,
				deferred: Boolean(deferredSet.has(key)),
			}]),
		),
	};
	const outDir = path.join(repoRoot, 'dist');
	fs.mkdirSync(outDir, { recursive: true });
	const outPath = path.join(outDir, 'sa11y-check-keys.json');
	fs.writeFileSync(outPath, `${JSON.stringify(artifact, null, 2)}\n`);
	console.log(`Wrote ${path.relative(repoRoot, outPath)}`);
}

/* ---------- Report ---------- */

if (jsonOut) {
	console.log(JSON.stringify({ errors, warnings }, null, 2));
} else {
	if (errors.length) {
		console.error(`\n✖ ${errors.length} drift error(s) between Sa11y and ed11y language files:\n`);
		const missing = errors.filter((e) => e.kind === 'missing-mirror');
		const asym = errors.filter((e) => e.kind === 'asymmetric');
		if (missing.length) {
			console.error('  Unmirrored Sa11y check keys (add to src/lang/baseAll.js):');
			for (const e of missing) {
				console.error(`    - ${e.key} (missing in: ${e.missing.join(', ')})`);
			}
			console.error('\n  Paste-ready stubs:');
			console.error('    // In testNames:');
			for (const e of missing) {
				console.error(`    ${e.key}: 'TODO: short title',`);
			}
			console.error('    // In tips:');
			for (const e of missing) {
				console.error(`    ${e.key}: \`TODO: HTML description\`,`);
			}
			console.error(
				'\n  Or, if a check is intentionally not surfaced by ed11y, add it\n' +
				`  to the "deferredChecks" map in ${path.relative(repoRoot, allowlistPath)}.`,
			);
		}
		if (asym.length) {
			console.error('\n  testNames / tips asymmetry:');
			for (const e of asym) {
				console.error(`    - ${e.key} (missing in: ${e.missing.join(', ')})`);
			}
		}
	}
	if (warnings.length) {
		const unrec = warnings.filter((w) => w.kind === 'unrecognized-sa11y-string');
		const stale = warnings.filter((w) => w.kind === 'stale-allowlist');
		console.error(`\n⚠ ${warnings.length} warning(s):`);
		if (unrec.length) {
			console.error('\n  Sa11y strings not a check, not overridden by ed11y, not allowlisted:');
			for (const w of unrec) console.error(`    - ${w.key}`);
			console.error(
				`\n  Add each to "uiStrings" in ${path.relative(repoRoot, allowlistPath)}\n` +
				'  with a short reason, or mirror it in baseAll.js.',
			);
		}
		if (stale.length) {
			console.error('\n  Allowlist entries that no longer exist upstream:');
			for (const w of stale) console.error(`    - ${w.key}`);
		}
		const orphan = warnings.filter((w) => w.kind === 'orphan-tip');
		if (orphan.length) {
			console.error('\n  tips entries without a matching testNames entry (shared snippets?):');
			for (const w of orphan) console.error(`    - ${w.key}`);
		}
	}
	if (!errors.length && !warnings.length) {
		console.log('✓ Sa11y check keys and ed11y language files are in sync.');
	}
}

const hasBlockingError = errors.length > 0 || (strict && warnings.length > 0);
process.exit(hasBlockingError ? 1 : 0);
