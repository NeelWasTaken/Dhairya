const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const OUT_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/screenshots_v4_phase4';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function run() {
  console.log('Launching browser for Phase 4 verification...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1. Visit /journal
  console.log('Capturing Journal Index at /journal...');
  await page.goto('http://127.0.0.1:5173/journal');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT_DIR, '01-phase4-journal-index.png') });

  // 2. Filter by Tag "Grief"
  console.log('Testing Tag filter "Grief"...');
  const griefTag = await page.$('button:has-text("Grief")');
  if (griefTag) {
    await griefTag.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, '02-phase4-journal-tag-grief.png') });
  }

  // 3. Open first post: The Boy Who Argued with Death
  console.log('Opening essay: boy-who-argued-with-death...');
  await page.goto('http://127.0.0.1:5173/journal/boy-who-argued-with-death');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT_DIR, '03-phase4-journal-detail-nachiketa.png') });

  // 4. Scroll down to show sticky related verses rail and attribution
  console.log('Capturing related verses rail and attribution...');
  await page.evaluate(() => window.scrollBy({ top: 750, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '04-phase4-journal-related-rail.png') });

  // 5. Open Maitreyī essay
  console.log('Opening essay: maitreyi-question-immortality...');
  await page.goto('http://127.0.0.1:5173/journal/maitreyi-question-immortality');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT_DIR, '05-phase4-journal-detail-maitreyi.png') });

  await context.close();
  await browser.close();
  console.log('Phase 4 captures completed successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
