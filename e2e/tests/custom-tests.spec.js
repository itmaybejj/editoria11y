// The custom-test handshake: Editoria11y dispatches `ed11yRunCustomTests` with
// a `detail.runId`; each external test pushes its results and dispatches
// `ed11yResume`, optionally echoing `detail.runId`. An echoed ID that does not
// match the current run is an answer for an earlier run and must not count
// toward this one. Integrations written before run IDs send no ID; their
// answers are still accepted.
import { expect, test } from '@playwright/test';

const PAGE = '/tests/editable-realign.htm?customTests=1';
test.describe.configure({ timeout: 6_000 });

/**
 * Registers a custom test before Editoria11y loads. `answer` runs for each
 * ed11yRunCustomTests event, in the page, with (detail, resume), where
 * resume(detail?) dispatches ed11yResume.
 */
async function registerCustomTest(page, answer) {
  await page.addInitScript((source) => {
    window.__ed11yRuns = [];
    window.__ed11yPaintedAt = null;
    document.addEventListener('ed11yResultsPainted', () => {
      window.__ed11yPaintedAt ??= performance.now();
    });
    const resume = (detail) =>
      document.dispatchEvent(
        detail === undefined
          ? new CustomEvent('ed11yResume')
          : new CustomEvent('ed11yResume', { detail }),
      );
    // biome-ignore lint/security/noGlobalEval: test-only, source is this file.
    const handler = eval(`(${source})`);
    document.addEventListener('ed11yRunCustomTests', (event) => {
      window.__ed11yRuns.push(event.detail);
      handler(event.detail, resume);
    });
  }, answer.toString());
}

const painted = (page) => page.waitForFunction(() => window.__ed11yPaintedAt !== null);
const customTestCount = (page) => page.evaluate(() => Ed11y.State.option.customTests);

test('ed11yRunCustomTests carries the run ID', async ({ page }) => {
  await registerCustomTest(page, (detail, resume) => resume({ runId: detail.runId }));
  await page.goto(PAGE);
  await painted(page);
  const runs = await page.evaluate(() => window.__ed11yRuns);
  expect(runs).toHaveLength(1);
  expect(Number.isInteger(runs[0]?.runId), 'runId is an integer').toBe(true);
});

test('an answer with the current run ID is accepted', async ({ page }) => {
  await registerCustomTest(page, (detail, resume) => resume({ runId: detail.runId }));
  await page.goto(PAGE);
  await painted(page);
  // Accepted answers keep the test registered; a missed deadline drops it.
  expect(await customTestCount(page)).toBe(1);
});

test('an answer without a run ID is accepted, as before run IDs', async ({ page }) => {
  await registerCustomTest(page, (_detail, resume) => resume());
  await page.goto(PAGE);
  await painted(page);
  expect(await customTestCount(page)).toBe(1);
});

test('an answer with another run ID is ignored', async ({ page }) => {
  await registerCustomTest(page, (detail, resume) => {
    // A late answer for an earlier run arrives first...
    resume({ runId: detail.runId - 1 });
    // ...then this run's own answer.
    setTimeout(() => {
      window.__ed11yAnsweredAt = performance.now();
      resume({ runId: detail.runId });
    }, 300);
  });
  await page.goto(PAGE);
  await painted(page);
  const { paintedAt, answeredAt } = await page.evaluate(() => ({
    paintedAt: window.__ed11yPaintedAt,
    answeredAt: window.__ed11yAnsweredAt,
  }));
  expect(answeredAt, 'the run waited for its own answer').toBeDefined();
  expect(paintedAt).toBeGreaterThanOrEqual(answeredAt);
  expect(await customTestCount(page)).toBe(1);
});
