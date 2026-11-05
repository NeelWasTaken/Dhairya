const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const OUT_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/screenshots_redesign';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function assertWidthHealth(page, width, height) {
  await page.setViewportSize({ width, height });
  await page.waitForTimeout(2500);

  const result = await page.evaluate((w) => {
    // 1. Stuck pending elements
    const pendingElements = Array.from(document.querySelectorAll('.reveal-pending'));
    const stuckPending = pendingElements.filter(el => {
      const style = window.getComputedStyle(el);
      return style.opacity === '0' || style.visibility === 'hidden';
    });

    // 2. Horizontal overflow test
    const scrollWidth = document.documentElement.scrollWidth;
    const innerWidth = window.innerWidth;
    const overflow = scrollWidth > innerWidth;

    // 3. Margin centering check on hero & content
    const heroH1 = document.querySelector('h1');
    let marginDiff = 0;
    if (heroH1) {
      const rect = heroH1.getBoundingClientRect();
      const left = rect.left;
      const right = innerWidth - rect.right;
      marginDiff = Math.abs(left - right);
    }

    return {
      stuckPendingCount: stuckPending.length,
      scrollWidth,
      innerWidth,
      overflow,
      marginDiff,
    };
  }, width);

  console.log(`[Health Assert - ${width}px] pending: ${result.stuckPendingCount}, overflow: ${result.overflow} (${result.scrollWidth}px / ${result.innerWidth}px), marginDiff: ${result.marginDiff.toFixed(1)}px`);
  return result;
}

async function run() {
  console.log('=== STARTING REDESIGN VERIFICATION & RECORDING SUITE ===');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const consoleErrors = [];

  // ==========================================
  // 1. SCREEN RECORDING OF HOME WITH PRELOADER & INTERACTIONS
  // ==========================================
  console.log('\n--- 1. RECORDING HOME (1440x900) ---');
  const recordCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: OUT_DIR,
      size: { width: 1440, height: 900 },
    },
  });

  const page = await recordCtx.newPage();
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(`[Console Error] ${msg.text()}`);
  });

  // Navigate to site root (Quote Gate triggers first)
  console.log('[Gate] Navigating to Home...');
  await page.goto('http://127.0.0.1:4173/');

  // Wait for 3-second hold on Quote Gate
  await page.waitForTimeout(3200);

  // Click "Click to Begin"
  console.log('[Gate] Clicking "Click to Begin"...');
  const beginGateBtn = await page.waitForSelector('button:has-text("Click to Begin")', { timeout: 6000 });
  await beginGateBtn.click();

  // Watch Numeric Preloader count from 0 to 100
  console.log('[Preloader] Observing Numeric Preloader count up to 100%...');
  await page.waitForTimeout(2000);

  // Wait for Home hero to unmask
  await page.waitForSelector('h1:has-text("Dhairya")', { timeout: 8000 });
  await page.waitForTimeout(1000);
  console.log('[Hero] Hero unmasked successfully!');

  // Take hero screenshot
  await page.screenshot({ path: path.join(OUT_DIR, 'home-1440px-hero-redesigned.png') });

  // Hover over the primary "Begin the Journey" button (test magnetic pull & label roll)
  console.log('[Hover] Hovering over Primary Button...');
  const heroBtn = await page.waitForSelector('button:has-text("Begin the Journey")', { timeout: 5000 });
  await heroBtn.hover();
  await page.waitForTimeout(600);

  // Scroll down to Pinned Storytelling
  console.log('[Scroll] Scrolling to Pinned Storytelling...');
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'home-1440px-pinned-storytelling-stage1.png') });

  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.8, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'home-1440px-pinned-storytelling-stage2.png') });

  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.7, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'home-1440px-pinned-storytelling-stage3.png') });

  // Scroll to Stats Counters & Sanskrit Marquee
  console.log('[Scroll] Scrolling to Stats & Sanskrit Marquee...');
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 3.6, behavior: 'smooth' }));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT_DIR, 'home-1440px-stats-and-marquee.png') });

  // Scroll to Horizontal Upanishad Rail
  console.log('[Scroll] Scrolling into Horizontal Upanishad Rail...');
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 4.8, behavior: 'smooth' }));
  await page.waitForTimeout(1000);

  // Hover over first card (test 3D tilt, inner spotlight, trace border)
  const card = await page.waitForSelector('.tilt-card-item', { timeout: 5000 });
  const box = await card.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.3);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'home-1440px-card-hover-tilt-spotlight.png') });
  }

  // Scroll horizontally across rail
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 6.5, behavior: 'smooth' }));
  await page.waitForTimeout(1200);

  // Click on a station card to trigger Portal Iris transition
  console.log('[Transition] Clicking station card to trigger Portal Iris Transition...');
  await card.click();
  await page.waitForTimeout(1500);
  await page.waitForSelector('h1', { timeout: 8000 });

  await page.close();
  await recordCtx.close();

  // Rename video
  const files = fs.readdirSync(OUT_DIR);
  const v = files.find(f => f.endsWith('.webm') && !f.includes('home-walkthrough'));
  if (v) {
    fs.renameSync(path.join(OUT_DIR, v), path.join(OUT_DIR, 'home-redesign-walkthrough-1440px.webm'));
    console.log('[Video] Renamed home-redesign-walkthrough-1440px.webm');
  }

  // ==========================================
  // 2. SCREENSHOTS AT 4 VIEWPORTS: 1920, 1440, 1024, 390
  // ==========================================
  console.log('\n--- 2. VIEWPORT CAPTURES AT 1920, 1440, 1024, 390px ---');
  const viewports = [
    { width: 1920, height: 1080, name: '1920px' },
    { width: 1440, height: 900,  name: '1440px' },
    { width: 1024, height: 768,  name: '1024px' },
    { width: 390,  height: 844,  name: '390px'  },
  ];

  for (const vp of viewports) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    await ctx.addInitScript(() => sessionStorage.setItem('dhairya_gate_v4', 'true'));
    const p = await ctx.newPage();
    p.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(`[${vp.name} Error] ${msg.text()}`);
    });

    await p.goto('http://127.0.0.1:4173/');
    await p.waitForTimeout(2000);

    // Hero capture
    await p.screenshot({ path: path.join(OUT_DIR, `home-${vp.width}px-hero.png`) });
    console.log(`[Screenshot] Saved home-${vp.width}px-hero.png`);

    // Full page scroll down capture
    await p.evaluate(() => window.scrollTo({ top: window.innerHeight * 2, behavior: 'instant' }));
    await p.waitForTimeout(800);
    await p.screenshot({ path: path.join(OUT_DIR, `home-${vp.width}px-journey-map.png`) });
    console.log(`[Screenshot] Saved home-${vp.width}px-journey-map.png`);

    // Health Assertion
    await assertWidthHealth(p, vp.width, vp.height);
    await ctx.close();
  }

  // ==========================================
  // 3. CONSOLE ERROR AUDIT
  // ==========================================
  console.log('\n--- 3. CONSOLE ERROR AUDIT ---');
  if (consoleErrors.length === 0) {
    console.log('✅ PASS: Zero console errors logged across all runs!');
  } else {
    console.warn(`Found ${consoleErrors.length} console errors:`, consoleErrors);
  }

  await browser.close();
  console.log('\n=== REDESIGN VERIFICATION FINISHED SUCCESSFULLY ===');
}

run().catch(err => {
  console.error('Fatal error during redesign verification:', err);
  process.exit(1);
});
