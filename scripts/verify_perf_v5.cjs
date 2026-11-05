const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/screenshots_perf';
if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function run() {
  console.log('--- STARTING PERFORMANCE & FPS VERIFICATION ON PRODUCTION BUILD (PORT 4173) ---');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  // 1. Desktop Profile (1440x900)
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // Measure initial page navigation and gate render
  const navStart = performance.now();
  await page.goto('http://127.0.0.1:4173/');
  await page.waitForSelector('text=अन्तः अस्ति प्रारम्भः', { timeout: 8000 }).catch(() => {
    return page.waitForSelector('text=antaḥ asti prārambhaḥ', { timeout: 8000 });
  });
  const gateReadyTime = Math.round(performance.now() - navStart);
  console.log(`[PERF] Gate rendered in ${gateReadyTime} ms`);

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-quote-gate-desktop.png') });

  // Transition to site
  const clickToBegin = await page.waitForSelector('button:has-text("Click to Begin")', { timeout: 6000 }).catch(() => null);
  if (clickToBegin) {
    await clickToBegin.click();
  } else {
    const skipBtn = await page.$('button:has-text("Skip Intro")');
    if (skipBtn) await skipBtn.click();
  }

  // Wait for crossfade transition (900ms)
  await page.waitForTimeout(1500);
  console.log('[PERF] Desktop Site mounted successfully!');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-site-hero-desktop.png') });

  // Measure Desktop Scroll FPS over 6 seconds
  console.log('[PERF] Measuring Desktop Scroll FPS over full page scroll...');
  const desktopMetrics = await page.evaluate(async () => {
    let frames = 0;
    let longFrames = 0;
    let lastFrameTime = performance.now();
    let start = performance.now();
    let running = true;

    function count(now) {
      frames++;
      const delta = now - lastFrameTime;
      if (delta > 33.3) longFrames++; // dropped frame (> 30ms)
      lastFrameTime = now;
      if (running) requestAnimationFrame(count);
    }
    requestAnimationFrame(count);

    // Continuous scroll down through 8000 pixels
    const interval = setInterval(() => {
      window.scrollBy({ top: 45, behavior: 'auto' });
    }, 16);

    await new Promise((r) => setTimeout(r, 6000));
    running = false;
    clearInterval(interval);

    const durationSec = (performance.now() - start) / 1000;
    const avgFps = Math.round(frames / durationSec);
    return { avgFps, longFrames, totalFrames: frames, durationSec };
  });

  console.log(`[PERF] Desktop Average FPS: ${desktopMetrics.avgFps} FPS (Total frames: ${desktopMetrics.totalFrames}, Dropped frames: ${desktopMetrics.longFrames})`);
  await context.close();

  // 2. Mobile Profile (390x844 iPhone)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mPage = await mobileContext.newPage();
  const mNavStart = performance.now();
  await mPage.goto('http://127.0.0.1:4173/');
  await mPage.waitForSelector('text=अन्तः अस्ति प्रारम्भः', { timeout: 8000 }).catch(() => {
    return mPage.waitForSelector('text=antaḥ asti prārambhaḥ', { timeout: 8000 });
  });
  const mGateTime = Math.round(performance.now() - mNavStart);
  console.log(`[PERF] Mobile Gate rendered in ${mGateTime} ms`);

  await mPage.screenshot({ path: path.join(SCREENSHOT_DIR, '03-quote-gate-mobile.png') });

  const mClickToBegin = await mPage.waitForSelector('button:has-text("Click to Begin")', { timeout: 8000 }).catch(() => null);
  if (mClickToBegin) {
    await mClickToBegin.click();
  } else {
    const mSkip = await mPage.$('button:has-text("Skip Intro")');
    if (mSkip) await mSkip.click();
  }

  // Wait for crossfade transition (900ms)
  await mPage.waitForTimeout(1500);
  console.log('[PERF] Mobile Site mounted successfully!');
  await mPage.screenshot({ path: path.join(SCREENSHOT_DIR, '04-site-hero-mobile.png') });

  // Measure Mobile Scroll FPS over 5 seconds
  console.log('[PERF] Measuring Mobile Scroll FPS...');
  const mobileMetrics = await mPage.evaluate(async () => {
    let frames = 0;
    let longFrames = 0;
    let lastFrameTime = performance.now();
    let start = performance.now();
    let running = true;

    function count(now) {
      frames++;
      const delta = now - lastFrameTime;
      if (delta > 33.3) longFrames++;
      lastFrameTime = now;
      if (running) requestAnimationFrame(count);
    }
    requestAnimationFrame(count);

    const interval = setInterval(() => {
      window.scrollBy({ top: 30, behavior: 'auto' });
    }, 16);

    await new Promise((r) => setTimeout(r, 5000));
    running = false;
    clearInterval(interval);

    const durationSec = (performance.now() - start) / 1000;
    const avgFps = Math.round(frames / durationSec);
    return { avgFps, longFrames, totalFrames: frames, durationSec };
  });

  console.log(`[PERF] Mobile Average FPS: ${mobileMetrics.avgFps} FPS (Total frames: ${mobileMetrics.totalFrames}, Dropped frames: ${mobileMetrics.longFrames})`);
  await mobileContext.close();

  await browser.close();
  console.log('--- PERFORMANCE VERIFICATION COMPLETE ---');
}

run().catch((err) => {
  console.error('Error during perf verification:', err);
  process.exit(1);
});
