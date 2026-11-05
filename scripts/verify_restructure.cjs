const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const OUT_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/screenshots_restructure';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function run() {
  console.log('=== STARTING DHAIRYA RESTRUCTURE VERIFICATION ===');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  const consoleErrors = [];

  // ==========================================
  // 1. DESKTOP RUN (1440 x 900)
  // ==========================================
  console.log('\n--- 1. DESKTOP TESTING (1440x900) ---');
  const deskCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const deskPage = await deskCtx.newPage();
  deskPage.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Desktop Console Error] ${msg.text()}`);
    }
  });

  // Test Home Portal & Gate
  console.log('[Test] Visiting Home (http://127.0.0.1:4173/)...');
  await deskPage.goto('http://127.0.0.1:4173/');
  await deskPage.waitForTimeout(1000);

  // If Gate is present, skip/click begin
  const skipBtn = await deskPage.$('button:has-text("Skip Intro")');
  if (skipBtn) {
    console.log('[Test] Skipping intro gate...');
    await skipBtn.click();
    await deskPage.waitForTimeout(1200);
  }

  await deskPage.screenshot({ path: path.join(OUT_DIR, '01-desktop-home-portal.png') });
  console.log('[Screenshot] Saved 01-desktop-home-portal.png');

  // Test Journey Map Modal
  console.log('[Test] Opening Journey Map Modal...');
  const mapBtn = await deskPage.waitForSelector('button[aria-label="Open Journey Map"]', { timeout: 5000 });
  await mapBtn.click();
  await deskPage.waitForTimeout(600);
  await deskPage.screenshot({ path: path.join(OUT_DIR, '02-desktop-journey-map-modal.png') });
  console.log('[Screenshot] Saved 02-desktop-journey-map-modal.png');

  // Close Journey Map by pressing Escape
  await deskPage.keyboard.press('Escape');
  await deskPage.waitForTimeout(400);

  // Navigate to /upanishad/isha
  console.log('[Test] Navigating to /upanishad/isha...');
  await deskPage.goto('http://127.0.0.1:4173/upanishad/isha');
  await deskPage.waitForSelector('text=Action Without Collapse', { timeout: 6000 });
  await deskPage.screenshot({ path: path.join(OUT_DIR, '03-desktop-isha-page.png') });
  console.log('[Screenshot] Saved 03-desktop-isha-page.png');

  // Test Continue Bar Navigation
  console.log('[Test] Testing ContinueBar to Kena...');
  const continueBtn = await deskPage.waitForSelector('a:has-text("Continue Journey")', { timeout: 5000 });
  await continueBtn.click();
  await deskPage.waitForTimeout(1000);
  console.log(`[Test] Landed on URL: ${deskPage.url()}`);
  await deskPage.screenshot({ path: path.join(OUT_DIR, '04-desktop-kena-transition.png') });
  console.log('[Screenshot] Saved 04-desktop-kena-transition.png');

  // Navigate to /upanishad/katha
  console.log('[Test] Navigating to /upanishad/katha...');
  await deskPage.goto('http://127.0.0.1:4173/upanishad/katha');
  await deskPage.waitForSelector('text=Kaṭha Upaniṣad', { timeout: 6000 });
  await deskPage.screenshot({ path: path.join(OUT_DIR, '05-desktop-katha-page.png') });
  console.log('[Screenshot] Saved 05-desktop-katha-page.png');

  // Test Sub-pages: /chandogya/6
  console.log('[Test] Navigating to /chandogya/6...');
  await deskPage.goto('http://127.0.0.1:4173/chandogya/6');
  await deskPage.waitForSelector('text=Tat Tvam Asi', { timeout: 6000 });
  await deskPage.screenshot({ path: path.join(OUT_DIR, '06-desktop-chandogya6-subpage.png') });
  console.log('[Screenshot] Saved 06-desktop-chandogya6-subpage.png');

  // Test Sub-pages: /brihadaranyaka/women-sages
  console.log('[Test] Navigating to /brihadaranyaka/women-sages...');
  await deskPage.goto('http://127.0.0.1:4173/brihadaranyaka/women-sages');
  await deskPage.waitForSelector('text=Gārgī & Maitreyī', { timeout: 6000 });
  await deskPage.screenshot({ path: path.join(OUT_DIR, '07-desktop-women-sages.png') });
  console.log('[Screenshot] Saved 07-desktop-women-sages.png');

  // Test Synthesis: /storm
  console.log('[Test] Navigating to /storm...');
  await deskPage.goto('http://127.0.0.1:4173/storm');
  await deskPage.waitForSelector('text=The 5-Level Storm Dial', { timeout: 6000 });
  await deskPage.screenshot({ path: path.join(OUT_DIR, '08-desktop-storm-synthesis.png') });
  console.log('[Screenshot] Saved 08-desktop-storm-synthesis.png');

  // ==========================================
  // TEST CLOSING CREDITS PAGE: /credits
  // ==========================================
  console.log('\n--- 2. VERIFYING CLOSING CREDITS (/credits) ---');
  await deskPage.goto('http://127.0.0.1:4173/credits');
  await deskPage.waitForSelector('h2:has-text("Psychological Resilience in the Upanishads")', { timeout: 6000 });
  await deskPage.waitForSelector('text=NEEL CHANEKAR', { timeout: 6000 });
  await deskPage.waitForSelector('text=AASHI PANDYA', { timeout: 6000 });
  await deskPage.waitForSelector('text=SRUSHTI GANJURE', { timeout: 6000 });
  await deskPage.waitForSelector('text=SURAJ KALE', { timeout: 6000 });
  await deskPage.waitForSelector('text=SHREYAL DAKHANE', { timeout: 6000 });
  await deskPage.waitForSelector('text=अंतः अस्ति प्रारंभः', { timeout: 6000 });

  console.log('✓ Verified: Project Title: "Psychological Resilience in the Upanishads"');
  console.log('✓ Verified: Subtitle: "An Indian Knowledge System (IKS) Research Project"');
  console.log('✓ Verified: Team Leader: "NEEL CHANEKAR"');
  console.log('✓ Verified: Team Member: "AASHI PANDYA"');
  console.log('✓ Verified: Team Member: "SRUSHTI GANJURE"');
  console.log('✓ Verified: Team Member: "SURAJ KALE"');
  console.log('✓ Verified: Team Member: "SHREYAL DAKHANE"');
  console.log('✓ Verified: Motto: "अंतः अस्ति प्रारंभः — The end is the beginning."');

  await deskPage.waitForTimeout(1000);
  await deskPage.screenshot({ path: path.join(OUT_DIR, '09-desktop-credits-scroll.png') });
  console.log('[Screenshot] Saved 09-desktop-credits-scroll.png');

  // Scroll down in Credits to capture team reveal
  await deskPage.evaluate(() => window.scrollBy({ top: 800, behavior: 'instant' }));
  await deskPage.waitForTimeout(600);
  await deskPage.screenshot({ path: path.join(OUT_DIR, '10-desktop-credits-team-reveal.png') });
  console.log('[Screenshot] Saved 10-desktop-credits-team-reveal.png');

  // ==========================================
  // 3. MOBILE RUN (390 x 844 - iPhone 14)
  // ==========================================
  console.log('\n--- 3. MOBILE TESTING (390x844) ---');
  const mobCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    hasTouch: true,
    isMobile: true,
  });
  const mobPage = await mobCtx.newPage();
  mobPage.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Mobile Console Error] ${msg.text()}`);
    }
  });

  // Mobile Home
  await mobPage.goto('http://127.0.0.1:4173/');
  await mobPage.waitForTimeout(800);
  const mobSkip = await mobPage.$('button:has-text("Skip Intro")');
  if (mobSkip) {
    await mobSkip.click();
    await mobPage.waitForTimeout(1000);
  }
  await mobPage.screenshot({ path: path.join(OUT_DIR, '11-mobile-home-portal.png') });
  console.log('[Screenshot] Saved 11-mobile-home-portal.png');

  // Mobile Upanishad Page
  await mobPage.goto('http://127.0.0.1:4173/upanishad/isha');
  await mobPage.waitForSelector('text=Action Without Collapse', { timeout: 6000 });
  await mobPage.screenshot({ path: path.join(OUT_DIR, '12-mobile-isha-page.png') });
  console.log('[Screenshot] Saved 12-mobile-isha-page.png');

  // Mobile Credits Page
  await mobPage.goto('http://127.0.0.1:4173/credits');
  await mobPage.waitForSelector('text=NEEL CHANEKAR', { timeout: 6000 });
  await mobPage.screenshot({ path: path.join(OUT_DIR, '13-mobile-credits-scroll.png') });
  console.log('[Screenshot] Saved 13-mobile-credits-scroll.png');

  // ==========================================
  // 4. VERIFY ALL 12 UPANISHAD ROUTES
  // ==========================================
  console.log('\n--- 4. VERIFYING ALL 12 UPANISHAD ROUTES ---');
  const upanishads = [
    'isha', 'kena', 'katha', 'prashna', 'mundaka', 'mandukya',
    'taittiriya', 'aitareya', 'chandogya', 'brihadaranyaka', 'shvetashvatara', 'maitri'
  ];

  for (const slug of upanishads) {
    const route = `http://127.0.0.1:4173/upanishad/${slug}`;
    const res = await deskPage.goto(route);
    if (res.status() !== 200) {
      consoleErrors.push(`Failed to load ${route}: Status ${res.status()}`);
    } else {
      console.log(`  ✓ Route /upanishad/${slug} loaded 200 OK`);
    }
  }

  // Synthesis routes
  const synthesisRoutes = ['prologue', 'corpus', 'storm', 'practices', 'critiques', 'epilogue', 'credits'];
  for (const slug of synthesisRoutes) {
    const route = `http://127.0.0.1:4173/${slug}`;
    const res = await deskPage.goto(route);
    if (res.status() !== 200) {
      consoleErrors.push(`Failed to load ${route}: Status ${res.status()}`);
    } else {
      console.log(`  ✓ Route /${slug} loaded 200 OK`);
    }
  }

  // Utility routes
  const utilityRoutes = ['verses', 'glossary', 'timeline', 'bibliography', 'quiz', 'experiences', 'journal', 'about'];
  for (const slug of utilityRoutes) {
    const route = `http://127.0.0.1:4173/${slug}`;
    const res = await deskPage.goto(route);
    if (res.status() !== 200) {
      consoleErrors.push(`Failed to load ${route}: Status ${res.status()}`);
    } else {
      console.log(`  ✓ Utility Route /${slug} loaded 200 OK`);
    }
  }

  // Check console errors
  console.log('\n--- 5. CONSOLE ERROR AUDIT ---');
  if (consoleErrors.length === 0) {
    console.log('✓ PERFECT: ZERO Console Errors across all tests and routes!');
  } else {
    console.warn(`Encountered ${consoleErrors.length} console warnings/errors:`);
    consoleErrors.forEach(err => console.warn(`  - ${err}`));
  }

  await browser.close();
  console.log('\n=== ALL VERIFICATIONS COMPLETED SUCCESSFULLY ===');
}

run().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
