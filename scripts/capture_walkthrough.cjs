const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const OUT_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/screenshots_v2';
const VIDEO_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/recordings';

async function run() {
  console.log('Launching Chrome with video recording...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: VIDEO_DIR,
      size: { width: 1440, height: 900 },
    },
  });

  const page = await context.newPage();

  console.log('Navigating to http://127.0.0.1:5173/ ...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Awakening Gate Desktop
  console.log('Capturing Awakening Gate (Desktop)...');
  await page.screenshot({ path: path.join(OUT_DIR, '01-awakening-gate-desktop.png') });

  // Click to begin or skip transition to hero
  const skipBtn = await page.$('button:has-text("Skip Gate")');
  if (skipBtn) {
    console.log('Skipping gate sequence into Dawn Manuscript...');
    await skipBtn.click();
  } else {
    const beginBtn = await page.$('text=CLICK TO BEGIN');
    if (beginBtn) await beginBtn.click();
  }
  await page.waitForTimeout(2500);

  // 2. Hero Dawn Desktop
  console.log('Capturing Hero Dawn (Desktop)...');
  await page.screenshot({ path: path.join(OUT_DIR, '02-hero-dawn-desktop.png') });

  // 3. Editorial Layout Ch 0 & Ch 1
  console.log('Capturing Editorial Chapter Layout...');
  await page.evaluate(() => document.getElementById('ch-0')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '03-editorial-ch0-ch1-desktop.png') });

  // 4. Fear Dissolve Ch 3
  console.log('Capturing Fear Dissolve...');
  await page.evaluate(() => document.getElementById('ch-3')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '04-fear-dissolve-desktop.png') });

  // 5. Nachiketa Pathfinder Ch 4
  console.log('Capturing Nachiketa Pathfinder...');
  await page.evaluate(() => document.getElementById('ch-4')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '05-nachiketa-pathfinder-desktop.png') });

  // 6. Chariot Steering Ch 5
  console.log('Capturing Chariot Steering...');
  await page.evaluate(() => document.getElementById('ch-5')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '06-chariot-steering-desktop.png') });

  // 7. Resilient Particle Text Ch 6
  console.log('Capturing Resilient Particle Text...');
  await page.evaluate(() => document.getElementById('ch-6')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '07-resilient-particle-text-desktop.png') });

  // 8. Panchakosha 3D Ch 9
  console.log('Capturing Panchakosha 3D...');
  await page.evaluate(() => document.getElementById('ch-9')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '08-panchakosha-3d-desktop.png') });

  // 9. Mandukya Spin Wheel & Two Birds Slider Ch 10
  console.log('Capturing Mandukya Spin Wheel & Two Birds...');
  await page.evaluate(() => document.getElementById('ch-10')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '09-mandukya-spin-wheel-desktop.png') });
  await page.screenshot({ path: path.join(OUT_DIR, '10-twobirds-slider-desktop.png') });

  // 10. Storm Dial Scene Ch 13
  console.log('Capturing Storm Dial Scene...');
  await page.evaluate(() => document.getElementById('ch-13')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(1000);
  // Click Storm Level 5
  const stormBtn = await page.$('button:has-text("5")');
  if (stormBtn) await stormBtn.click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT_DIR, '11-storm-dial-desktop.png') });

  // 11. Cave Descent Ch 14
  console.log('Capturing Cave Descent...');
  await page.evaluate(() => document.getElementById('ch-14')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '12-cave-descent-desktop.png') });

  // 12. Night Gurukul Mode Toggle
  console.log('Toggling theme to Night Gurukul...');
  const themeBtn = await page.$('button[title*="Night Gurukul"]');
  if (themeBtn) {
    await themeBtn.click();
    await page.waitForTimeout(1200);
  }
  await page.screenshot({ path: path.join(OUT_DIR, '13-night-mode-desktop.png') });

  await context.close(); // Finalizes video recording!

  // --- MOBILE SCREENSHOTS (390 x 844) ---
  console.log('Starting Mobile Captures (390x844)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });

  const mPage = await mobileContext.newPage();
  await mPage.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await mPage.waitForTimeout(2000);

  // Mobile Awakening Gate
  await mPage.screenshot({ path: path.join(OUT_DIR, '14-awakening-gate-mobile.png') });

  // Skip Gate
  const mSkip = await mPage.$('button:has-text("Skip Gate")');
  if (mSkip) await mSkip.click();
  await mPage.waitForTimeout(2000);

  // Mobile Hero
  await mPage.screenshot({ path: path.join(OUT_DIR, '15-hero-dawn-mobile.png') });

  // Mobile Chariot Steering
  await mPage.evaluate(() => document.getElementById('ch-5')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await mPage.waitForTimeout(1000);
  await mPage.screenshot({ path: path.join(OUT_DIR, '16-chariot-steering-mobile.png') });

  // Mobile Storm Dial
  await mPage.evaluate(() => document.getElementById('ch-13')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await mPage.waitForTimeout(1000);
  await mPage.screenshot({ path: path.join(OUT_DIR, '17-storm-dial-mobile.png') });

  // Mobile Editorial Chapter
  await mPage.evaluate(() => document.getElementById('ch-1')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await mPage.waitForTimeout(1000);
  await mPage.screenshot({ path: path.join(OUT_DIR, '18-editorial-mobile.png') });

  await mobileContext.close();
  await browser.close();

  console.log('All screenshots and screen recording captured successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
