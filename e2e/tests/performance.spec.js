/**
 * Performance benchmark: runs full Editoria11y checks on tests/performance.htm, and compares the
 * median time of each phase (UI.runTimings, recorded in src/js/core/run.js) with a baseline.
 *
 * It never fails on timing. Timings vary a lot between machines, so this only reports the
 * numbers, and warns when the total is more than WARN_RATIO times the baseline, to make major
 * regressions noticeable.
 *
 * Baselines are per platform and browser (e.g. linux-chromium.json for `npm test` in Docker,
 * darwin-chromium.json for `npm run test:host` on a Mac), because the two are not comparable.
 *
 * Runs in its own Playwright project ("perf"), after the other tests have finished so they do
 * not compete for CPU. The page loads dist/, so build first.
 *
 *   Run alone:           npm run test:perf          (host browsers: npm run test:perf:host)
 *   Every phase:         npm run test:perf --verbose   (or npm test --verbose, or PERF_VERBOSE=1)
 *   Record baselines:    PERF_BASELINE=update npm run test:perf
 *
 * By default only the total is printed, plus any phase that took more than PHASE_REPORT_RATIO
 * times its baseline. Verbose prints every phase and whether the results match the baseline's.
 *
 * Re-record the baselines on the same machine after an intentional performance change, or after
 * changing what performance.htm generates.
 */
import fs from 'node:fs';
import { test, expect } from '@playwright/test';

const WARN_RATIO = 2;
const PHASE_REPORT_RATIO = 2;
// Phases this much slower or less are not reported as slow: small phases are dominated by timer
// resolution, so 0.5 ms -> 1.2 ms is noise, not a regression.
const PHASE_REPORT_MIN_MS = 2;
const ITERATIONS = 15;
const WARMUP = 3;
const baselineDir = new URL('../performance-baselines/', import.meta.url);
const updateBaseline = process.env.PERF_BASELINE === 'update';
// `npm test --verbose` reaches the test process as npm_config_loglevel (scripts/test-docker.js
// forwards it into the container).
const verbose =
  Boolean(process.env.PERF_VERBOSE) ||
  ['verbose', 'silly'].includes(process.env.npm_config_loglevel);

function readBaseline(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw new Error(`Could not read performance baseline ${file.pathname}: ${error.message}`);
  }
}

const ms = (n) => `${n.toFixed(1)} ms`;

test('Check run time compared with baseline', async ({ page, browserName }, testInfo) => {
  test.setTimeout(180_000);
  const environment = `${process.platform}-${browserName}`;

  await page.goto('/tests/performance.htm');
  await page.waitForFunction(() => window.benchmarkReady, null, { timeout: 30_000 });
  const run = await page.evaluate(
    ({ iterations, warmup }) => window.runBenchmark(iterations, warmup),
    { iterations: ITERATIONS, warmup: WARMUP },
  );

  // Not a timing check: a broken benchmark page would otherwise report fast, empty runs.
  expect(run.elements).toBeGreaterThan(1000);
  expect(run.results).toBeGreaterThan(0);

  const baselineFile = new URL(`${environment}.json`, baselineDir);

  if (updateBaseline) {
    fs.mkdirSync(baselineDir, { recursive: true });
    const record = { recorded: new Date().toISOString().slice(0, 10), ...run };
    fs.writeFileSync(baselineFile, `${JSON.stringify(record, null, 2)}\n`);
    console.info(`[perf ${environment}] Baseline recorded: total ${ms(run.medians.total)}`);
    return;
  }

  const baseline = readBaseline(baselineFile);
  const lines = [];
  let warning = null;

  if (!baseline) {
    lines.push(
      `total ${ms(run.medians.total)} (no baseline recorded for ${environment}; record one with PERF_BASELINE=update)`,
    );
  } else if (baseline.elements !== run.elements) {
    // The page changed since the baseline was recorded, so the numbers are not comparable.
    lines.push(
      `total ${ms(run.medians.total)} (baseline is for a different page: ${baseline.elements} elements, now ${run.elements}; re-record it)`,
    );
  } else {
    const ratio = run.medians.total / baseline.medians.total;
    lines.push(
      `total ${ms(run.medians.total)} vs baseline ${ms(baseline.medians.total)} (${ratio.toFixed(2)}x, recorded ${baseline.recorded})`,
    );
    for (const [phase, value] of Object.entries(run.medians)) {
      if (phase === 'total') continue;
      const base = baseline.medians[phase];
      // A phase with no baseline is a new ruleset: always worth seeing.
      const slow =
        base === undefined ||
        (value > base * PHASE_REPORT_RATIO && value - base >= PHASE_REPORT_MIN_MS);
      if (!verbose && !slow) continue;
      const compared =
        base === undefined
          ? 'no baseline'
          : `baseline ${ms(base)}${base >= 5 || slow ? `, ${(value / base).toFixed(2)}x` : ''}`;
      lines.push(
        `  ${phase.padEnd(22)} ${ms(value).padStart(10)}  (${compared})${slow && base !== undefined ? '  <- slow' : ''}`,
      );
    }
    if (verbose) {
      lines.push(
        `  results ${run.results}, ${run.fingerprint === baseline.fingerprint ? 'identical to baseline' : 'differ from baseline (expected if a ruleset changed)'}`,
      );
    }
    if (ratio > WARN_RATIO) {
      warning = `Total check time ${ms(run.medians.total)} is ${ratio.toFixed(1)}x the ${environment} baseline (${ms(baseline.medians.total)}). Possible performance regression.`;
    }
  }

  const report = lines.join('\n');
  console.info(`[perf ${environment}] ${report}`);
  testInfo.annotations.push({ type: 'performance', description: report });
  await testInfo.attach('performance.json', {
    body: JSON.stringify({ run, baseline }, null, 2),
    contentType: 'application/json',
  });

  if (warning) {
    console.warn(`\n⚠️  [perf ${environment}] ${warning}\n`);
    testInfo.annotations.push({ type: 'warning', description: warning });
  }
});
