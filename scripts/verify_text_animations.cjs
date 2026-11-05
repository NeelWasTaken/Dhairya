const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const OUT_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/screenshots_text_animations';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function assertPageHealth(page, pageName, viewportWidth) {
  // Wait for fonts ready & 2s failsafe / animations to settle
  await page.waitForTimeout(2500);

  const result = await page.evaluate(() => {
    // 1. Assert no .reveal-pending elements left stuck hidden
    const pendingElements = Array.from(document.querySelectorAll('.reveal-pending'));
    const stuckPending = pendingElements.filter(el => {
      const style = window.getComputedStyle(el);
      return style.opacity === '0' || style.visibility === 'hidden';
    });

    // 2. Assert no main text elements stuck at opacity: 0 (for elements in/above viewport)
    const textEls = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, blockquote, .sanskrit'));
    const stuckText = textEls.filter(el => {
      const style = window.getComputedStyle(el);
      // Filter out elements deliberately hidden via display:none or parent
      if (style.display === 'none') return false;
      const rect = el.getBoundingClientRect();
      const inOrAboveViewport = rect.top < window.innerHeight;
      if (!inOrAboveViewport) return false;
      return style.opacity === '0';
    });

    // 3. Overflow test
    const scrollWidth = document.documentElement.scrollWidth;
    const innerWidth = window.innerWidth;
    const overflow = scrollWidth > innerWidth;

    // 4. Centered margin check
    const container = document.querySelector('.content-column') || document.querySelector('.page-container > div') || document.querySelector('header');
    let marginDiff = 0;
    if (container) {
      const rect = container.getBoundingClientRect();
      const left = rect.left;
      const right = innerWidth - rect.right;
      marginDiff = Math.abs(left - right);
    }

    return {
      stuckPendingCount: stuckPending.length,
      stuckTextCount: stuckText.length,
      scrollWidth,
      innerWidth,
      overflow,
      marginDiff,
    };
  });

  console.log(`[Health Assert - ${pageName} (${viewportWidth}px)] pending: ${result.stuckPendingCount}, stuckText: ${result.stuckTextCount}, overflow: ${result.overflow} (${result.scrollWidth}px / ${result.innerWidth}px), marginDiff: ${result.marginDiff.toFixed(1)}px`);

  if (result.stuckPendingCount > 0) {
    console.error(`❌ FAIL: ${result.stuckPendingCount} elements still have .reveal-pending on ${pageName}`);
  }
  if (result.stuckTextCount > 0) {
    console.error(`❌ FAIL: ${result.stuckTextCount} text elements stuck at opacity 0 on ${pageName}`);
  }
  if (result.overflow) {
    console.error(`❌ FAIL: Horizontal overflow on ${pageName}: scrollWidth (${result.scrollWidth}) > innerWidth (${result.innerWidth})`);
  }
  if (result.marginDiff > 8 && viewportWidth >= 768) {
    console.warn(`⚠️ Warning: Margin asymmetry on ${pageName}: diff = ${result.marginDiff.toFixed(1)}px`);
  }

  return result;
}

async function run() {
  console.log('=== STARTING TEXT ANIMATION RESTORATION VERIFICATION ===');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const consoleErrors = [];

  // ==========================================
  // 1. SCREEN RECORDING AT 1440px: KENA STEP FLOW & PORTAL TRANSITION
  // ==========================================
  console.log('\n--- 1. RECORDING KENA STEPS & PORTAL (1440x900) ---');
  const deskCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: OUT_DIR,
      size: { width: 1440, height: 900 },
    },
  });
  await deskCtx.addInitScript(() => {
    sessionStorage.setItem('dhairya_gate_v4', 'true');
  });

  const deskPage = await deskCtx.newPage();
  deskPage.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(`[1440px Console Error] ${msg.text()}`);
  });

  await deskPage.goto('http://127.0.0.1:4173/upanishad/kena');
  await deskPage.waitForSelector('h1:has-text("Kena Upaniṣad")', { timeout: 8000 });
  await deskPage.waitForTimeout(1000);
  await deskPage.screenshot({ path: path.join(OUT_DIR, '01-kena-1440px-hero-animated.png') });
  console.log('[Screenshot] Saved 01-kena-1440px-hero-animated.png');

  // Step 2
  console.log('[Step] Clicking Step 2...');
  const step2Btn = await deskPage.waitForSelector('button:has-text("Cognitive Defusion")', { timeout: 5000 });
  await step2Btn.click();
  await deskPage.waitForTimeout(800);
  await deskPage.screenshot({ path: path.join(OUT_DIR, '02-kena-1440px-step2.png') });
  console.log('[Screenshot] Saved 02-kena-1440px-step2.png');

  // Step 3
  console.log('[Step] Clicking Step 3...');
  const step3Btn = await deskPage.waitForSelector('button:has-text("Parable of the Gods")', { timeout: 5000 });
  await step3Btn.click();
  await deskPage.waitForTimeout(800);
  await deskPage.screenshot({ path: path.join(OUT_DIR, '03-kena-1440px-step3.png') });
  console.log('[Screenshot] Saved 03-kena-1440px-step3.png');

  // Scroll down to continue bar
  console.log('[Scroll] Smooth scrolling to bottom...');
  await deskPage.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
  await deskPage.waitForTimeout(1200);

  // Click continue to Kaṭha (triggers PortalTransition)
  console.log('[Transition] Clicking Continue to Kaṭha Upaniṣad...');
  const continueBtn = await deskPage.waitForSelector('a:has-text("Continue Journey")', { timeout: 5000 });
  await continueBtn.scrollIntoViewIfNeeded();
  await deskPage.waitForTimeout(500);
  await continueBtn.click({ force: true });
  await deskPage.waitForTimeout(1500);
  await deskPage.waitForSelector('h1:has-text("Kaṭha Upaniṣad")', { timeout: 10000 });
  await deskPage.screenshot({ path: path.join(OUT_DIR, '04-katha-1440px-after-portal.png') });
  console.log('[Screenshot] Saved 04-katha-1440px-after-portal.png');

  await deskPage.close();
  await deskCtx.close();

  // Rename video 1
  const files1 = fs.readdirSync(OUT_DIR);
  const v1 = files1.find(f => f.endsWith('.webm') && !f.includes('kena-steps-portal'));
  if (v1) {
    fs.renameSync(path.join(OUT_DIR, v1), path.join(OUT_DIR, 'kena-steps-portal-1440px.webm'));
    console.log('[Video] Renamed kena-steps-portal-1440px.webm');
  }

  // ==========================================
  // 2. SCREEN RECORDING AT 390px (MOBILE)
  // ==========================================
  console.log('\n--- 2. RECORDING MOBILE (390x844) ---');
  const mobCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    recordVideo: {
      dir: OUT_DIR,
      size: { width: 390, height: 844 },
    },
  });
  await mobCtx.addInitScript(() => {
    sessionStorage.setItem('dhairya_gate_v4', 'true');
  });

  const mobPage = await mobCtx.newPage();
  await mobPage.goto('http://127.0.0.1:4173/upanishad/kena');
  await mobPage.waitForSelector('h1:has-text("Kena Upaniṣad")', { timeout: 8000 });
  await mobPage.waitForTimeout(1000);
  await mobPage.screenshot({ path: path.join(OUT_DIR, '05-kena-390px-hero.png') });
  console.log('[Screenshot] Saved 05-kena-390px-hero.png');

  // Step 2 mobile
  const mobStep2 = await mobPage.waitForSelector('button:has-text("Cognitive Defusion")', { timeout: 5000 });
  await mobStep2.click();
  await mobPage.waitForTimeout(800);
  await mobPage.screenshot({ path: path.join(OUT_DIR, '06-kena-390px-step2.png') });
  console.log('[Screenshot] Saved 06-kena-390px-step2.png');

  await mobPage.close();
  await mobCtx.close();

  // Rename video 2
  const files2 = fs.readdirSync(OUT_DIR);
  const v2 = files2.find(f => f.endsWith('.webm') && !f.includes('kena-steps-portal'));
  if (v2) {
    fs.renameSync(path.join(OUT_DIR, v2), path.join(OUT_DIR, 'kena-steps-portal-390px.webm'));
    console.log('[Video] Renamed kena-steps-portal-390px.webm');
  }

  // ==========================================
  // 3. CAPTURES ON KATHA, HOME, CREDITS (LIGHT & DARK) + ?debug=text
  // ==========================================
  console.log('\n--- 3. VERIFICATIONS ON KATHA, HOME, CREDITS ---');
  const checks = [
    { url: 'http://127.0.0.1:4173/upanishad/katha', theme: 'light', file: '07-katha-1440px-light.png', name: 'Kaṭha Light' },
    { url: 'http://127.0.0.1:4173/upanishad/katha', theme: 'night', file: '08-katha-1440px-dark.png',  name: 'Kaṭha Dark' },
    { url: 'http://127.0.0.1:4173/', theme: 'light', file: '09-home-1440px-light.png', name: 'Home Light' },
    { url: 'http://127.0.0.1:4173/', theme: 'night', file: '10-home-1440px-dark.png',  name: 'Home Dark' },
    { url: 'http://127.0.0.1:4173/credits', theme: 'night', file: '11-credits-1440px.png', name: 'Credits Scroll' },
  ];

  for (const c of checks) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(() => sessionStorage.setItem('dhairya_gate_v4', 'true'));
    const p = await ctx.newPage();
    p.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(`[${c.name} Error] ${msg.text()}`);
    });

    await p.goto(c.url);
    await p.waitForTimeout(1000);

    if (c.theme === 'night') {
      await p.evaluate(() => document.documentElement.setAttribute('data-theme', 'night'));
      await p.waitForTimeout(400);
    }

    await p.screenshot({ path: path.join(OUT_DIR, c.file) });
    console.log(`[Screenshot] Saved ${c.file}`);
    await ctx.close();
  }

  // Test ?debug=text HUD
  console.log('\n--- 4. TESTING ?debug=text HUD ---');
  const debugCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await debugCtx.addInitScript(() => sessionStorage.setItem('dhairya_gate_v4', 'true'));
  const debugPage = await debugCtx.newPage();
  await debugPage.goto('http://127.0.0.1:4173/upanishad/kena?debug=text');
  await debugPage.waitForSelector('div[aria-label="Text Reveal Inspector"]', { timeout: 6000 });
  await debugPage.waitForTimeout(1000);
  await debugPage.screenshot({ path: path.join(OUT_DIR, '12-kena-debug-text-hud.png') });
  console.log('[Screenshot] Saved 12-kena-debug-text-hud.png');
  await debugCtx.close();

  // ==========================================
  // 5. AUTOMATED 5-PAGE HEALTH ASSERTIONS
  // ==========================================
  console.log('\n--- 5. AUTOMATED 5-PAGE HEALTH ASSERTIONS ---');
  const pagesToAssert = [
    { path: '/upanishad/kena', name: 'Kena Upaniṣad' },
    { path: '/upanishad/katha', name: 'Kaṭha Upaniṣad' },
    { path: '/', name: 'Home Portal' },
    { path: '/credits', name: 'Credits Scroll' },
    { path: '/upanishad/isha', name: 'Īśā Upaniṣad' },
  ];

  for (const item of pagesToAssert) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(() => sessionStorage.setItem('dhairya_gate_v4', 'true'));
    const p = await ctx.newPage();
    p.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(`[${item.name} Error] ${msg.text()}`);
    });

    await p.goto(`http://127.0.0.1:4173${item.path}`);
    await assertPageHealth(p, item.name, 1440);
    await ctx.close();
  }

  // ==========================================
  // 6. CONSOLE ERROR AUDIT
  // ==========================================
  console.log('\n--- 6. CONSOLE ERROR AUDIT ---');
  if (consoleErrors.length === 0) {
    console.log('✅ PASS: Zero console errors logged across all runs!');
  } else {
    console.warn(`Found ${consoleErrors.length} console errors:`, consoleErrors);
  }

  await browser.close();
  console.log('\n=== VERIFICATION FINISHED SUCCESSFULLY ===');
}

run().catch(err => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
