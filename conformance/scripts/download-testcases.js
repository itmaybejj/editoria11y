#!/usr/bin/env node

/**
 * Downloads ACT Rule test cases from W3C.
 *
 * Fetches the test case index (testcases.json) and downloads the HTML files
 * for all mapped rules into conformance/.cache/pages/{ruleId}/{testcaseId}.html
 *
 * Usage:
 *   node conformance/scripts/download-testcases.js          # download new files only
 *   node conformance/scripts/download-testcases.js --force   # re-download all
 *   node conformance/scripts/download-testcases.js --all     # download ALL rules, not just mapped
 */

import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getMappedRuleIds } from '../mapping/act-rule-mapping.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = join(__dirname, '..', '.cache');
const PAGES_DIR = join(CACHE_DIR, 'pages');
const INDEX_URL = 'https://www.w3.org/WAI/content-assets/wcag-act-rules/testcases.json';
const DELAY_MS = 100;

const args = process.argv.slice(2);
const force = args.includes('--force');
const downloadAll = args.includes('--all');

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} for ${url}`);
      }
      return res;
    } catch (err) {
      if (attempt === retries) throw err;
      console.warn(`  Retry ${attempt}/${retries} for ${url}: ${err.message}`);
      await sleep(1000 * attempt);
    }
  }
}

async function main() {
  // 1. Fetch or read the test case index
  const indexPath = join(CACHE_DIR, 'testcases.json');
  let indexData;

  if (!force && (await fileExists(indexPath))) {
    console.log('Using cached testcases.json (use --force to re-download)');
    const { readFile } = await import('node:fs/promises');
    indexData = JSON.parse(await readFile(indexPath, 'utf-8'));
  } else {
    console.log(`Fetching ${INDEX_URL}...`);
    const res = await fetchWithRetry(INDEX_URL);
    indexData = await res.json();
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(indexPath, JSON.stringify(indexData, null, 2));
    console.log(`Saved testcases.json (${indexData.count} test cases)`);
  }

  // 2. Filter to mapped rules
  const mappedIds = new Set(getMappedRuleIds());
  const testcases = downloadAll
    ? indexData.testcases
    : indexData.testcases.filter((tc) => mappedIds.has(tc.ruleId));

  const ruleIds = new Set(testcases.map((tc) => tc.ruleId));
  console.log(
    `\n${downloadAll ? 'All' : 'Mapped'} rules: ${ruleIds.size} rules, ${testcases.length} test cases`,
  );

  // 3. Download each test case HTML
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const tc of testcases) {
    const ext = tc.relativePath.endsWith('.svg') ? '.svg' : '.html';
    const filePath = join(PAGES_DIR, tc.ruleId, `${tc.testcaseId}${ext}`);

    if (!force && (await fileExists(filePath))) {
      skipped++;
      continue;
    }

    try {
      await mkdir(dirname(filePath), { recursive: true });
      const res = await fetchWithRetry(tc.url);
      const html = await res.text();
      await writeFile(filePath, html);
      downloaded++;

      if (downloaded % 50 === 0) {
        console.log(`  Downloaded ${downloaded}...`);
      }

      await sleep(DELAY_MS);
    } catch (err) {
      console.error(`  FAILED: ${tc.ruleId}/${tc.testcaseId} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${downloaded} downloaded, ${skipped} cached, ${failed} failed`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
