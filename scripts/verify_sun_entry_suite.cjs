const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const OUT_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/sun_entry_proofs';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function run() {
  console.log('=== STARTING SUN ENTRY & CREDITS VERIFICATION SUITE ===');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  // =========================================================
  // 1. RECORDING: 1440px SUN ENTRY (Quote Gate -> Circle -> Sun -> Bloom -> Home)
  // =========================================================
  console.log('\n--- 1. RECORDING 1440px FULL SUN ENTRY SEQUENCE ---');
  const context1440 = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: OUT_DIR,
      size: { width: 1440, height: 900 },
    },
  });

  const page1440 = await context1440.newPage();
  const consoleErrors = [];
  page1440.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(`[1440p Error] ${msg.text()}`);
  });

  // Clear session storage before loading
  await page1440.addInitScript(() => {
    sessionStorage.clear();
  });

  console.log('Navigating to http://127.0.0.1:4173/ ...');
  await page1440.goto('http://127.0.0.1:4173/');

  // Wait 3.2s for Quote Gate 3-second hold
  console.log('Waiting 3.2s on Quote Gate...');
  await page1440.waitForTimeout(3200);

  // Click "Click to Begin"
  const beginBtn = await page1440.waitForSelector('button:has-text("Click to Begin")', { timeout: 10000 });
  console.log('Clicking "Click to Begin"...');
  await beginBtn.click();

  // Watch Stage 1 (Circle Screen, 0.0 - 3.4s)
  console.log('Observing Stage 1: Circle Screen (morphing shape, sketch circle, 0->100 counter, pulse)...');
  await page1440.waitForTimeout(3500);

  // Take intermediate screenshot of Sun forming / glow
  await page1440.screenshot({ path: path.join(OUT_DIR, 'sun-stage-forming-1440px.png') });

  // Watch Stage 2 & 3 (Sun forms, 2 glow/dim breaths, 3.4 - 6.6s)
  console.log('Observing Stage 2 & 3: Sun forms and glows...');
  await page1440.waitForTimeout(3200);

  // Watch Stage 4 (Sunflower bloom & reveal, 6.6 - 9.0s)
  console.log('Observing Stage 4: Sunflower bloom & unmasking Home hero...');
  await page1440.waitForTimeout(3500);

  // Wait for Home hero title to animate in
  console.log('Waiting for Home hero to settle...');
  await page1440.waitForSelector('h1', { timeout: 10000 });
  await page1440.waitForTimeout(2000);

  // Capture Home hero with small sunflower
  await page1440.screenshot({ path: path.join(OUT_DIR, 'home-hero-sunflower-1440px.png') });

  // Test hovering on the small sunflower
  console.log('Hovering over small sunflower beside title...');
  const sunflowerBtn = await page1440.waitForSelector('button[aria-label*="Personal Dedication"]', { timeout: 5000 });
  await sunflowerBtn.hover();
  await page1440.waitForTimeout(800);
  await page1440.screenshot({ path: path.join(OUT_DIR, 'sunflower-hover-tooltip-1440px.png') });

  // Click small sunflower to open dedication card
  console.log('Clicking small sunflower to open dedication modal...');
  await sunflowerBtn.click();
  await page1440.waitForTimeout(800);
  await page1440.screenshot({ path: path.join(OUT_DIR, 'sunflower-dedication-modal-1440px.png') });

  // Close modal with Esc
  await page1440.keyboard.press('Escape');
  await page1440.waitForTimeout(600);

  // Close context to finalize video
  const video1440 = await page1440.video();
  await context1440.close();
  if (video1440) {
    const videoPath1440 = await video1440.path();
    const finalVideo1440 = path.join(OUT_DIR, 'sun-entry-1440px.webm');
    fs.renameSync(videoPath1440, finalVideo1440);
    console.log('1440px video recorded and saved:', finalVideo1440);
  }

  // =========================================================
  // 2. RECORDING: 390px MOBILE SUN ENTRY
  // =========================================================
  console.log('\n--- 2. RECORDING 390px MOBILE SUN ENTRY ---');
  const context390 = await browser.newContext({
    viewport: { width: 390, height: 844 },
    recordVideo: {
      dir: OUT_DIR,
      size: { width: 390, height: 844 },
    },
  });

  const page390 = await context390.newPage();
  await page390.addInitScript(() => {
    sessionStorage.clear();
  });

  await page390.goto('http://127.0.0.1:4173/');
  await page390.waitForTimeout(3200);

  const beginBtnMobile = await page390.waitForSelector('button:has-text("Click to Begin")', { timeout: 10000 });
  await beginBtnMobile.click();

  // Watch full 9-second entry + hero landing
  await page390.waitForTimeout(10500);

  // Take screenshot of mobile Home hero with small sunflower
  await page390.screenshot({ path: path.join(OUT_DIR, 'home-hero-sunflower-390px.png') });

  const video390 = await page390.video();
  await context390.close();
  if (video390) {
    const videoPath390 = await video390.path();
    const finalVideo390 = path.join(OUT_DIR, 'sun-entry-390px.webm');
    fs.renameSync(videoPath390, finalVideo390);
    console.log('390px mobile video recorded and saved:', finalVideo390);
  }

  // =========================================================
  // 3. CREDITS LEADER HIGHLIGHT & INSTAGRAM LINK VERIFICATION
  // =========================================================
  console.log('\n--- 3. VERIFYING CREDITS LEADER HIGHLIGHT & INSTAGRAM LINK ---');
  const credsCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const credsPage = await credsCtx.newPage();

  // Load Credits Page directly
  await credsPage.goto('http://127.0.0.1:4173/credits');
  await credsPage.waitForSelector('text=NEEL CHANEKAR', { timeout: 8000 });
  await credsPage.waitForTimeout(1500);

  // Capture Dark Mode Credits Leader
  await credsPage.screenshot({ path: path.join(OUT_DIR, 'credits-leader-dark-1440px.png') });

  // Switch to Light Theme
  await credsPage.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'day');
    document.body.setAttribute('data-theme', 'day');
  });
  await credsPage.waitForTimeout(800);
  await credsPage.screenshot({ path: path.join(OUT_DIR, 'credits-leader-light-1440px.png') });

  // Verify Instagram Link URL and target
  const linkInfo = await credsPage.evaluate(() => {
    const leaderLink = document.querySelector('a[href*="instagram.com/aboutneeel"]');
    return {
      found: !!leaderLink,
      href: leaderLink ? leaderLink.getAttribute('href') : null,
      target: leaderLink ? leaderLink.getAttribute('target') : null,
      rel: leaderLink ? leaderLink.getAttribute('rel') : null,
      ariaLabel: leaderLink ? leaderLink.getAttribute('aria-label') : null,
      text: leaderLink ? leaderLink.innerText.trim() : null,
    };
  });
  console.log('Instagram Link Verification:', JSON.stringify(linkInfo, null, 2));

  // Verify Team Names Integrity in DOM
  const domTeamNames = await credsPage.evaluate(() => {
    const names = [];
    const leaderEl = document.querySelector('h3');
    if (leaderEl) names.push(leaderEl.innerText.trim());
    const memberEls = document.querySelectorAll('li span[aria-label]');
    memberEls.forEach(el => names.push(el.getAttribute('aria-label')));
    return names;
  });
  console.log('Rendered Team Names in DOM:', domTeamNames);

  // Responsive mobile credits screenshot
  await credsPage.setViewportSize({ width: 390, height: 844 });
  await credsPage.waitForTimeout(800);
  await credsPage.screenshot({ path: path.join(OUT_DIR, 'credits-leader-390px.png') });

  // Test 404 page
  await credsPage.goto('http://127.0.0.1:4173/unknown-path-test');
  await credsPage.waitForTimeout(1000);
  await credsPage.screenshot({ path: path.join(OUT_DIR, '404-manuscript-page.png') });

  await credsCtx.close();
  await browser.close();

  console.log('\n=== SUITE EXECUTION COMPLETED SUCCESSFULLY ===');
  console.log('Console Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors logged:', consoleErrors);
  }
}

run().catch(err => {
  console.error('Fatal error during suite execution:', err);
  process.exit(1);
});
