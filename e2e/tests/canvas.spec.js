// Page-builder canvases: content in an iframe (fixedRoots + framePositioners)
// that may be zoomed with a CSS transform and that sits in a scrolling
// viewport. Result buttons are drawn in the main document, so in-frame rects
// have to be scaled by the zoom and offset by the frame; with `alertAttachTo`
// the buttons live in the viewport and scroll with it.
import { expect, test } from '@playwright/test';
import { gotoPainted } from './helpers.js';

const PAGE = '/tests/canvas.htm';
// The links in the canvas that get a result and are in view on load.
const VISIBLE = ['first', 'second', 'inside'];
test.describe.configure({ timeout: 8_000 });

/**
 * Every result drawn for an element in the frame: the gap between its button
 * and its target, both in main-document pixels, whether it is shown and
 * clickable, and which element it is attached to. The button's host is
 * measured rather than the button, which animates in.
 */
function readResults() {
  const frame = document.getElementById('canvas');
  const rect = frame.getBoundingClientRect();
  const scale = rect.width / frame.offsetWidth;
  const originLeft = rect.left + frame.clientLeft * scale;
  const originTop = rect.top + frame.clientTop * scale;
  return [...document.querySelectorAll('ed11y-element-result')]
    .filter((host) => host.result?.element?.id)
    .map((host) => {
      const target = host.result.element.getBoundingClientRect();
      const toggle = host.getBoundingClientRect();
      return {
        id: host.result.element.id,
        x: Math.round(toggle.left - (originLeft + target.left * scale)),
        y: Math.round(toggle.top - (originTop + target.top * scale)),
        offscreen: host.classList.contains('ed11y-offscreen'),
        clickable: getComputedStyle(host).pointerEvents !== 'none',
        parent: host.parentElement?.id || host.parentElement?.tagName.toLowerCase(),
        transform: host.style.transform,
      };
    });
}

/** The first result drawn for each flagged element, keyed by the element's id. */
async function results(page) {
  const all = await page.evaluate(readResults);
  const byId = {};
  for (const result of all) byId[result.id] ??= result;
  return byId;
}

/** Just the button-to-target gaps of the results in view. */
async function gaps(page) {
  const all = await results(page);
  return Object.fromEntries(VISIBLE.map((id) => [id, all[id] && { x: all[id].x, y: all[id].y }]));
}

/** Expects two gap maps to match within a pixel of rounding. */
function expectSameGaps(actual, expected) {
  for (const id of VISIBLE) {
    expect(actual[id], `${id} has a result`).toBeTruthy();
    expect(Math.abs(actual[id].x - expected[id].x), `${id} x`).toBeLessThanOrEqual(1);
    expect(Math.abs(actual[id].y - expected[id].y), `${id} y`).toBeLessThanOrEqual(1);
  }
}

/** Polls until the gaps match `expected`. */
async function expectGapsSettleTo(page, expected) {
  await expect
    .poll(async () => {
      try {
        expectSameGaps(await gaps(page), expected);
        return true;
      } catch {
        return false;
      }
    })
    .toBe(true);
}

/** Resolves after the next two animation frames, so queued aligns have run. */
const nextFrames = (page) =>
  page.evaluate(
    () =>
      new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );

/** Starts a full recheck, the way an integration does after swapping content. */
const recheck = (page) =>
  page.evaluate(() => {
    Ed11y.UI.forceFullCheck = true;
    Ed11y.refresh();
  });

/** Collects console messages of one type. */
function collectConsole(page, type) {
  const messages = [];
  page.on('console', (message) => {
    if (message.type() === type) messages.push(message.text());
  });
  return messages;
}

let unzoomed;
// Where each button sits on an unzoomed, unscrolled canvas: the reference the
// other layouts are compared with.
test.beforeAll(async ({ browser }, testInfo) => {
  const page = await browser.newPage({ baseURL: testInfo.project.use.baseURL });
  await gotoPainted(page, PAGE);
  unzoomed = await gaps(page);
  await page.close();
});

test('the unzoomed canvas has a result beside each visible link', () => {
  for (const id of VISIBLE) {
    expect(unzoomed[id], `${id} has a result`).toBeTruthy();
  }
});

test('result buttons sit beside their targets in a zoomed frame', async ({ page }) => {
  await gotoPainted(page, `${PAGE}?scale=0.5`);
  expectSameGaps(await gaps(page), unzoomed);
});

test('Ed11y.realign() follows a zoom the library cannot see', async ({ page }) => {
  await gotoPainted(page, PAGE);
  await page.evaluate(() => {
    document.getElementById('stage').style.transform = 'scale(0.5)';
  });
  await nextFrames(page);
  const before = await gaps(page);
  expect(before.second.y, 'zooming alone leaves the buttons behind').not.toBe(unzoomed.second.y);

  await page.evaluate(() => Ed11y.realign());
  await expectGapsSettleTo(page, unzoomed);
});

test('alerts in a scroll zone inside a zoomed frame hide outside it', async ({ page }) => {
  await gotoPainted(page, `${PAGE}?scale=0.5`);
  let all = await results(page);
  expect(all.inside.offscreen, 'the link in view is shown').toBe(false);
  expect(all.below, 'the link below the fold has a result').toBeTruthy();
  expect(all.below.offscreen, 'the link below the fold is hidden').toBe(true);

  // An in-frame scroller fires no event the library watches.
  await page.evaluate(() => {
    const scroller = document.getElementById('canvas').contentDocument.getElementById('scroller');
    scroller.scrollTop = scroller.scrollHeight;
    Ed11y.realign();
  });
  await expect.poll(async () => (await results(page)).below.offscreen).toBe(false);
  all = await results(page);
  expect(all.inside.offscreen, 'the link scrolled away is hidden').toBe(true);
});

test.describe('alertAttachTo', () => {
  test('puts result buttons in the container, where they scroll with it', async ({ page }) => {
    await gotoPainted(page, `${PAGE}?attach=element`);
    const all = await results(page);
    for (const id of VISIBLE) expect(all[id].parent, id).toBe('viewport');
    expectSameGaps(await gaps(page), unzoomed);

    // No realign: the container's own scrolling moves them.
    await page.evaluate(() => {
      document.getElementById('viewport').scrollTop = 150;
    });
    await nextFrames(page);
    expectSameGaps(await gaps(page), unzoomed);
  });

  test('without it, scrolling the container leaves the buttons behind', async ({ page }) => {
    await gotoPainted(page, PAGE);
    await page.evaluate(() => {
      document.getElementById('viewport').scrollTop = 150;
    });
    await nextFrames(page);
    expect((await gaps(page)).first.y).not.toBe(unzoomed.first.y);
  });

  test('accepts a selector', async ({ page }) => {
    await gotoPainted(page, `${PAGE}?attach=selector`);
    const all = await results(page);
    for (const id of VISIBLE) expect(all[id].parent, id).toBe('viewport');
    expectSameGaps(await gaps(page), unzoomed);
  });

  test('a selector that matches nothing warns and falls back to the body', async ({ page }) => {
    const warnings = collectConsole(page, 'warning');
    await gotoPainted(page, `${PAGE}?attach=missing`);
    const all = await results(page);
    for (const id of VISIBLE) expect(all[id].parent, id).toBe('body');
    expectSameGaps(await gaps(page), unzoomed);
    expect(warnings.some((text) => text.includes('alertAttachTo'))).toBe(true);
    expect(await page.evaluate(() => document.querySelectorAll('sa11y-console-error').length)).toBe(
      0,
    );
  });

  test('warns when the container is not positioned', async ({ page }) => {
    const warnings = collectConsole(page, 'warning');
    await gotoPainted(page, `${PAGE}?attach=static`);
    expect(warnings.some((text) => text.includes('alertAttachTo'))).toBe(true);
  });

  test('Ed11y.setAlertAttachTo() moves existing buttons into a new container', async ({
    page,
  }) => {
    await gotoPainted(page, PAGE);
    await page.evaluate(() => Ed11y.setAlertAttachTo('#viewport'));
    await expect
      .poll(async () => {
        const all = await results(page);
        return VISIBLE.every((id) => all[id]?.parent === 'viewport');
      })
      .toBe(true);
    await expectGapsSettleTo(page, unzoomed);
  });

  test('buttons are redrawn in the body when their container is removed', async ({ page }) => {
    const warnings = collectConsole(page, 'warning');
    await gotoPainted(page, PAGE);
    await page.evaluate(() => {
      const holder = document.createElement('div');
      holder.id = 'holder';
      holder.style.position = 'relative';
      document.body.prepend(holder);
      Ed11y.setAlertAttachTo(holder);
    });
    await expect
      .poll(async () => (await results(page)).first?.parent)
      .toBe('holder');

    // A page builder re-renders its chrome and drops the container.
    await page.evaluate(() => {
      document.getElementById('holder').remove();
      Ed11y.realign();
    });
    await expect
      .poll(async () => {
        const all = await results(page);
        return VISIBLE.every((id) => all[id]?.parent === 'body');
      })
      .toBe(true);
    await expectGapsSettleTo(page, unzoomed);
    expect(warnings.some((text) => text.includes('alertAttachTo'))).toBe(true);
  });
});

test.describe('a frame that cannot be measured', () => {
  const hideFrame = (page, hidden) =>
    page.evaluate((hide) => {
      document.getElementById('canvas').style.display = hide ? 'none' : '';
      Ed11y.realign();
    }, hidden);

  test('keeps its buttons in place but not clickable, briefly', async ({ page }) => {
    await gotoPainted(page, PAGE);
    const before = await results(page);
    await hideFrame(page, true);
    await nextFrames(page);
    const held = await results(page);
    for (const id of VISIBLE) {
      if (!held[id]) continue; // A recheck may already have dropped it.
      expect(held[id].transform, `${id} did not move`).toBe(before[id].transform);
      expect(held[id].clickable, `${id} is not clickable while held`).toBe(false);
    }
  });

  test('hides its buttons if it stays unmeasurable', async ({ page }) => {
    await gotoPainted(page, PAGE);
    await hideFrame(page, true);
    await expect
      .poll(
        async () => {
          const all = await page.evaluate(readResults);
          return all.every((result) => result.offscreen && !result.clickable);
        },
        { timeout: 4_000 },
      )
      .toBe(true);
  });

  test('restores its buttons once it can be measured again', async ({ page }) => {
    await gotoPainted(page, PAGE);
    await hideFrame(page, true);
    await nextFrames(page);
    await hideFrame(page, false);
    await recheck(page);
    await expectGapsSettleTo(page, unzoomed);
    const all = await results(page);
    for (const id of VISIBLE) {
      expect(all[id].clickable, `${id} is clickable`).toBe(true);
      expect(all[id].offscreen, `${id} is shown`).toBe(false);
    }
  });
});
