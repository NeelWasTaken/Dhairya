const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const OUT_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/screenshots_v4_phase3';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function run() {
  console.log('Launching browser for Phase 3 verification...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1. Visit /experiences hub
  console.log('Capturing Experiences Hub at /experiences...');
  await page.goto('http://127.0.0.1:5173/experiences');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT_DIR, '01-phase3-experiences-hub.png') });

  // 2. Test Yama's Riddle Room
  console.log('Testing Yama\'s Riddle Room...');
  await page.evaluate(() => {
    const el = document.getElementById('exp-riddles');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '02-phase3-yamas-riddle-room.png') });

  // Select correct option A
  const optA = await page.$('button:has-text("The wise inspect both")');
  if (optA) {
    await optA.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(OUT_DIR, '02b-phase3-riddle-door-unlocked.png') });
  }

  // 3. Test Your Mandala
  console.log('Testing Your Mandala reflection...');
  await page.evaluate(() => {
    const el = document.getElementById('exp-mandala');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '03-phase3-your-mandala-q1.png') });

  // Click through 6 questions
  for (let i = 0; i < 6; i++) {
    const btn = await page.$('#exp-mandala button:has(span.font-serif)');
    if (btn) {
      await btn.click();
      await page.waitForTimeout(400);
    }
  }
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT_DIR, '03b-phase3-mandala-generated.png') });

  // 4. Test Word Gravity
  console.log('Testing Word Gravity...');
  await page.evaluate(() => {
    const el = document.getElementById('exp-gravity');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '04-phase3-word-gravity.png') });

  // Click on "अभय" (Abhaya)
  const abhayaBtn = await page.$('button:has-text("अभय")');
  if (abhayaBtn) {
    await abhayaBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, '04b-phase3-word-inspected.png') });
  }

  // 5. Test Palm-Leaf Gallery
  console.log('Testing Palm-Leaf Gallery...');
  await page.evaluate(() => {
    const el = document.getElementById('exp-sages');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '05-phase3-palm-leaf-gallery.png') });

  // Click on Gārgī
  const gargiBtn = await page.$('button:has-text("Gārgī")');
  if (gargiBtn) {
    await gargiBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, '05b-phase3-palm-leaf-unrolled-gargi.png') });
  }

  await context.close();
  await browser.close();
  console.log('Phase 3 captures completed successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
