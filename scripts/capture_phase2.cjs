const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const OUT_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/screenshots_v4_phase2';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function run() {
  console.log('Launching browser for Phase 2 verification...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://127.0.0.1:5173/');
  const skipBtn = await page.$('button:has-text("Skip Intro")');
  if (skipBtn) await skipBtn.click();
  await page.waitForTimeout(1500);

  // 1. Well Descent (Chapter 4)
  console.log('Capturing Well Descent in Ch 4...');
  await page.evaluate(() => {
    const el = document.querySelector('[aria-label="The Well Descent Interactive Journey"]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT_DIR, '01-phase2-well-descent.png') });

  // 2. Offer a Worry (Chapter 6)
  console.log('Capturing Offer a Worry in Ch 6...');
  await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Offer a Worry Contemplative Module"]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT_DIR, '02-phase2-offer-a-worry.png') });

  // Test typing a worry & offering it
  const textarea = await page.$('textarea[placeholder="Write something that\'s weighing on you..."]');
  if (textarea) {
    await textarea.fill('Anxious about the uncertainty of tomorrow');
    const offerBtn = await page.$('button:has-text("Offer it")');
    if (offerBtn) await offerBtn.click();
    await page.waitForTimeout(1600);
    await page.screenshot({ path: path.join(OUT_DIR, '02b-phase2-worry-offered-star.png') });
  }

  // 3. Breath-Synced Page (Chapter 15)
  console.log('Capturing Breath-Synced Page in Ch 15...');
  await page.evaluate(() => {
    const el = document.getElementById('ch-15');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT_DIR, '03-phase2-breath-synced.png') });

  // 4. Kintsugi Crack ("Apply Stress") (Chapter 16)
  console.log('Capturing Kintsugi Crack in Ch 16...');
  await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Kintsugi Crack and Golden Repair Interactive Module"]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT_DIR, '04-phase2-kintsugi-pristine.png') });

  // Click Apply Stress
  const stressBtn = await page.$('button:has-text("Apply Stress")');
  if (stressBtn) {
    await stressBtn.click();
    await page.waitForTimeout(1800); // golden healing
    await page.screenshot({ path: path.join(OUT_DIR, '04b-phase2-kintsugi-healing.png') });
    await page.waitForTimeout(2000); // healed with golden seams
    await page.screenshot({ path: path.join(OUT_DIR, '04c-phase2-kintsugi-healed.png') });
  }

  await context.close();
  await browser.close();
  console.log('Phase 2 captures completed successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
