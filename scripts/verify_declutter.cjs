const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const OUT_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/screenshots_declutter';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function verifyPageMetrics(page, pageName, viewportName) {
  const metrics = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const winWidth = window.innerWidth;
    const hasHorizontalOverflow = docWidth > winWidth;

    // Check reading column or main card symmetry
    const card = document.querySelector('.content-column') || document.querySelector('.reading-column') || document.querySelector('main > div');
    let marginDiff = 0;
    let cardLeft = 0;
    let cardRight = 0;
    if (card) {
      const rect = card.getBoundingClientRect();
      cardLeft = rect.left;
      cardRight = winWidth - rect.right;
      marginDiff = Math.abs(cardLeft - cardRight);
    }

    // Check header collisions
    let headerOverlap = false;
    const headerLeft = document.querySelector('header a[href="/"]');
    const headerCenter = document.querySelector('header .sanskrit');
    const headerRight = document.querySelector('header nav');
    if (headerLeft && headerCenter && headerRight) {
      const rLeft = headerLeft.getBoundingClientRect();
      const rCenter = headerCenter.getBoundingClientRect();
      const rRight = headerRight.getBoundingClientRect();
      // Overlap occurs if rLeft.right > rCenter.left or rCenter.right > rRight.left
      if (rLeft.right > rCenter.left || rCenter.right > rRight.left) {
        headerOverlap = true;
      }
    }

    return {
      docWidth,
      winWidth,
      hasHorizontalOverflow,
      marginDiff,
      cardLeft,
      cardRight,
      headerOverlap,
    };
  });

  console.log(`[Metrics - ${pageName} (${viewportName})] scrollWidth: ${metrics.docWidth}px, innerWidth: ${metrics.winWidth}px, overflow: ${metrics.hasHorizontalOverflow}, leftMargin: ${metrics.cardLeft.toFixed(1)}px, rightMargin: ${metrics.cardRight.toFixed(1)}px, marginDiff: ${metrics.marginDiff.toFixed(1)}px, headerOverlap: ${metrics.headerOverlap}`);

  if (metrics.hasHorizontalOverflow) {
    console.error(`❌ FAIL: Horizontal overflow detected on ${pageName} (${viewportName}): docWidth (${metrics.docWidth}) > innerWidth (${metrics.winWidth})`);
  }
  if (metrics.headerOverlap) {
    console.error(`❌ FAIL: Header element collision detected on ${pageName} (${viewportName})`);
  }
  if (metrics.marginDiff > 8 && metrics.winWidth >= 768) {
    console.warn(`⚠️ Warning: Content asymmetry on ${pageName} (${viewportName}): diff = ${metrics.marginDiff.toFixed(1)}px`);
  }

  return metrics;
}

async function run() {
  console.log('=== STARTING DHAIRYA DECLUTTER & CENTERING VERIFICATION ===');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  const consoleErrors = [];

  // ==========================================
  // 1. KENA BREAKPOINTS (1920, 1440, 1024, 768, 390)
  // ==========================================
  console.log('\n--- 1. KENA BREAKPOINT VERIFICATIONS ---');
  const viewports = [
    { name: '1920px', width: 1920, height: 1080, file: '01-kena-1920px.png' },
    { name: '1440px', width: 1440, height: 900,  file: '02-kena-1440px.png' },
    { name: '1024px', width: 1024, height: 768,  file: '03-kena-1024px.png' },
    { name: '768px',  width: 768,  height: 1024, file: '04-kena-768px.png' },
    { name: '390px',  width: 390,  height: 844,  file: '05-kena-390px.png' },
  ];

  for (const vp of viewports) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    await ctx.addInitScript(() => {
      sessionStorage.setItem('dhairya_gate_v4', 'true');
    });
    const page = await ctx.newPage();
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(`[Console Error (${vp.name})] ${msg.text()}`);
    });

    await page.goto('http://127.0.0.1:4173/upanishad/kena');
    await page.waitForSelector('h1:has-text("Kena Upaniṣad")', { timeout: 8000 });
    await page.waitForTimeout(600);

    await verifyPageMetrics(page, 'Kena', vp.name);

    await page.screenshot({ path: path.join(OUT_DIR, vp.file) });
    console.log(`[Screenshot] Saved ${vp.file}`);
    await ctx.close();
  }

  // ==========================================
  // 2. KATHA (1440px & 390px, LIGHT & DARK)
  // ==========================================
  console.log('\n--- 2. KATHA (LIGHT & DARK) VERIFICATIONS ---');
  const kathaConfigs = [
    { name: '1440px-light', width: 1440, height: 900, theme: 'light', file: '06-katha-1440px-light.png' },
    { name: '1440px-dark',  width: 1440, height: 900, theme: 'night', file: '07-katha-1440px-dark.png' },
    { name: '390px-light',  width: 390,  height: 844, theme: 'light', file: '08-katha-390px-light.png' },
    { name: '390px-dark',   width: 390,  height: 844, theme: 'night', file: '09-katha-390px-dark.png' },
  ];

  for (const cfg of kathaConfigs) {
    const ctx = await browser.newContext({ viewport: { width: cfg.width, height: cfg.height } });
    await ctx.addInitScript(() => {
      sessionStorage.setItem('dhairya_gate_v4', 'true');
    });
    const page = await ctx.newPage();
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(`[Console Error (Katha ${cfg.name})] ${msg.text()}`);
    });

    await page.goto('http://127.0.0.1:4173/upanishad/katha');
    await page.waitForSelector('h1:has-text("Kaṭha Upaniṣad")', { timeout: 8000 });

    if (cfg.theme === 'night') {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'night');
      });
      await page.waitForTimeout(400);
    }

    await verifyPageMetrics(page, `Katha (${cfg.theme})`, `${cfg.width}px`);
    await page.screenshot({ path: path.join(OUT_DIR, cfg.file) });
    console.log(`[Screenshot] Saved ${cfg.file}`);
    await ctx.close();
  }

  // ==========================================
  // 3. HOME (1440px & 390px, LIGHT & DARK)
  // ==========================================
  console.log('\n--- 3. HOME (LIGHT & DARK) VERIFICATIONS ---');
  const homeConfigs = [
    { name: '1440px-light', width: 1440, height: 900, theme: 'light', file: '10-home-1440px-light.png' },
    { name: '1440px-dark',  width: 1440, height: 900, theme: 'night', file: '11-home-1440px-dark.png' },
    { name: '390px-light',  width: 390,  height: 844, theme: 'light', file: '12-home-390px-light.png' },
    { name: '390px-dark',   width: 390,  height: 844, theme: 'night', file: '13-home-390px-dark.png' },
  ];

  for (const cfg of homeConfigs) {
    const ctx = await browser.newContext({ viewport: { width: cfg.width, height: cfg.height } });
    await ctx.addInitScript(() => {
      sessionStorage.setItem('dhairya_gate_v4', 'true');
    });
    const page = await ctx.newPage();
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(`[Console Error (Home ${cfg.name})] ${msg.text()}`);
    });

    await page.goto('http://127.0.0.1:4173/');
    await page.waitForTimeout(800);

    // Skip gate if shown
    const skipBtn = await page.$('button:has-text("Skip Intro")');
    if (skipBtn) {
      await skipBtn.click();
      await page.waitForTimeout(1000);
    }

    if (cfg.theme === 'night') {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'night');
      });
      await page.waitForTimeout(400);
    }

    await verifyPageMetrics(page, `Home (${cfg.theme})`, `${cfg.width}px`);
    await page.screenshot({ path: path.join(OUT_DIR, cfg.file) });
    console.log(`[Screenshot] Saved ${cfg.file}`);
    await ctx.close();
  }

  // ==========================================
  // 4. KENA INTERACTION RECORDING & DRAWER TEST
  // ==========================================
  console.log('\n--- 4. RECORDING KENA INTERACTION & DRAWER TOGGLE ---');
  const videoCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: OUT_DIR,
      size: { width: 1440, height: 900 },
    },
  });
  await videoCtx.addInitScript(() => {
    sessionStorage.setItem('dhairya_gate_v4', 'true');
  });
  const videoPage = await videoCtx.newPage();
  await videoPage.goto('http://127.0.0.1:4173/upanishad/kena');
  await videoPage.waitForSelector('h1:has-text("Kena Upaniṣad")', { timeout: 8000 });
  await videoPage.waitForTimeout(1000);

  // Toggle Gallery Note drawer
  console.log('[Interaction] Clicking Gallery Note button...');
  const noteBtn = await videoPage.waitForSelector('button[aria-label="Toggle curatorial gallery note"]', { timeout: 5000 });
  await noteBtn.click();
  await videoPage.waitForTimeout(800);
  await videoPage.screenshot({ path: path.join(OUT_DIR, '14-kena-gallery-note-open.png') });
  console.log('[Screenshot] Saved 14-kena-gallery-note-open.png');

  // Toggle back closed
  await noteBtn.click();
  await videoPage.waitForTimeout(600);

  // Switch to Step 2
  console.log('[Interaction] Clicking Step 2 tab...');
  const step2Btn = await videoPage.waitForSelector('button:has-text("Cognitive Defusion")', { timeout: 5000 });
  await step2Btn.click();
  await videoPage.waitForTimeout(800);
  await videoPage.screenshot({ path: path.join(OUT_DIR, '15-kena-step2-active.png') });
  console.log('[Screenshot] Saved 15-kena-step2-active.png');

  // Switch to Step 3
  console.log('[Interaction] Clicking Step 3 tab...');
  const step3Btn = await videoPage.waitForSelector('button:has-text("Parable of the Gods")', { timeout: 5000 });
  await step3Btn.click();
  await videoPage.waitForTimeout(800);
  await videoPage.screenshot({ path: path.join(OUT_DIR, '16-kena-step3-active.png') });
  console.log('[Screenshot] Saved 16-kena-step3-active.png');

  // Scroll to verse band
  console.log('[Interaction] Scrolling smoothly down to FullWidthVerseBand...');
  await videoPage.evaluate(() => {
    window.scrollTo({ top: 700, behavior: 'smooth' });
  });
  await videoPage.waitForTimeout(1200);

  // Close video context to finish video encoding
  await videoPage.close();
  await videoCtx.close();

  // Find the video file and rename it
  const files = fs.readdirSync(OUT_DIR);
  const videoFile = files.find(f => f.endsWith('.webm'));
  if (videoFile) {
    const finalVideoPath = path.join(OUT_DIR, 'kena-interaction-walkthrough.webm');
    fs.renameSync(path.join(OUT_DIR, videoFile), finalVideoPath);
    console.log(`[Video] Renamed recording to: ${finalVideoPath}`);
  }

  // ==========================================
  // 5. CONSOLE ERROR AUDIT
  // ==========================================
  console.log('\n--- 5. CONSOLE ERROR AUDIT ---');
  if (consoleErrors.length === 0) {
    console.log('✅ PASS: Zero console errors across all viewports and pages!');
  } else {
    console.warn(`Found ${consoleErrors.length} console errors:`);
    consoleErrors.forEach(err => console.warn(err));
  }

  await browser.close();
  console.log('\n=== VERIFICATION COMPLETE ===');
}

run().catch(err => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
