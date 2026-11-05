const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const OUT_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/screenshots_v4_phase1';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function run() {
  console.log('Launching browser for Phase 1 verification...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://127.0.0.1:5173/');
  // Skip quote gate if present
  const skipBtn = await page.$('button:has-text("Skip Intro")');
  if (skipBtn) await skipBtn.click();
  await page.waitForTimeout(1500);

  // 1. Chapter 0 Museum Placard
  console.log('Capturing Chapter 0 Museum Placard...');
  await page.evaluate(() => document.getElementById('ch-0')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT_DIR, '01-phase1-museum-placard.png') });

  // 2. Museum Minimap popover
  console.log('Capturing Museum Minimap Popover...');
  const minimapBtn = await page.$('button[aria-label="Toggle Museum Floorplan Minimap"]');
  if (minimapBtn) {
    await minimapBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT_DIR, '02-phase1-museum-minimap.png') });
    await minimapBtn.click(); // close
  }

  // 3. Devanagari Scenery: Dhī (Chapter 1)
  console.log('Capturing Devanagari Scenery: Dhī...');
  await page.evaluate(() => document.getElementById('ch-1')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT_DIR, '03-phase1-devanagari-dhi.png') });

  // 4. Devanagari Scenery: Mṛtyu Doorway (Chapter 4)
  console.log('Capturing Devanagari Scenery: Mṛtyu Doorway...');
  await page.evaluate(() => document.getElementById('ch-4')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT_DIR, '04-phase1-devanagari-mrityu-doorway.png') });

  // 5. Scroll Seismograph & Day-Long Sky (Chapter 10 Witness / Deep Night)
  console.log('Capturing Seismograph & Night Sky at Ch 10...');
  await page.evaluate(() => document.getElementById('ch-10')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT_DIR, '05-phase1-seismograph-and-sky.png') });

  await context.close();
  await browser.close();
  console.log('Phase 1 captures completed successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
