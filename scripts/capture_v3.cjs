const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const OUT_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/screenshots_v3';
const VIDEO_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/recordings';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
if (!fs.existsSync(VIDEO_DIR)) fs.mkdirSync(VIDEO_DIR, { recursive: true });

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

  // Clear cache and session storage
  await page.goto('http://127.0.0.1:5173/');
  await page.evaluate(() => {
    sessionStorage.clear();
    localStorage.clear();
  });
  await page.reload({ waitUntil: 'networkidle' });

  // 1. First screen: ONLY quote on dark background (No lamp!)
  console.log('Capturing First Screen: Quote Gate only...');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT_DIR, '01-quote-gate-initial.png') });

  // 2. 3-second hold -> "Click to Begin" appears
  console.log('Waiting for 3-second hold to reveal Click to Begin...');
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(OUT_DIR, '02-quote-gate-ready.png') });

  // 3. Click "Click to Begin" -> startup sequence -> hero
  console.log('Clicking "Click to Begin"...');
  const beginBtn = await page.$('button:has-text("Click to Begin")');
  if (beginBtn) {
    await beginBtn.click();
  } else {
    await page.click('button:has-text("Skip Intro")');
  }

  // Wait for startup sequence to settle into hero
  await page.waitForTimeout(2500);
  console.log('Capturing Hero after Quote Gate startup sequence...');
  await page.screenshot({ path: path.join(OUT_DIR, '03-hero-after-quote-gate.png') });

  // 4. Directional Text Emergence: Chapter 1 (8-directional synthesis)
  console.log('Capturing Chapter 1: 8-Directional Text Synthesis...');
  await page.evaluate(() => document.getElementById('ch-1')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '04-ch1-eight-directions.png') });

  // 5. Chapter 3: Fear fragments converging & dissolving
  console.log('Capturing Chapter 3: Fear Fragments Converging & Dissolving...');
  await page.evaluate(() => document.getElementById('ch-3')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(OUT_DIR, '05-ch3-fear-dissolve.png') });

  // 6. Chapter 4: Nachiketa story lines descending from above
  console.log('Capturing Chapter 4: Nachiketa Descent into Yama Hall...');
  await page.evaluate(() => document.getElementById('ch-4')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '06-ch4-nachiketa-descent.png') });

  // 7. Chapter 5: Chariot labels arriving like passing caravan from right
  console.log('Capturing Chapter 5: Chariot Caravan Arrival...');
  await page.evaluate(() => document.getElementById('ch-5')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '07-ch5-chariot-caravan.png') });

  // 8. Chapter 10: Mandukya depth emergence & still Turiya center
  console.log('Capturing Chapter 10: Mandukya Depth & Silent Turiya...');
  await page.evaluate(() => document.getElementById('ch-10')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(OUT_DIR, '08-ch10-mandukya-depth.png') });

  // 9. Chapter 17: Epilogue ascending lines & Om constellation
  console.log('Capturing Chapter 17: Epilogue Ascending Light & Om Constellation...');
  await page.evaluate(() => document.getElementById('ch-17')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(OUT_DIR, '09-ch17-epilogue-ascent.png') });

  // 10. Footer with neutral Om replay button
  console.log('Capturing Footer with neutral Om replay button...');
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '10-footer-om-replay.png') });

  await context.close();

  // Mobile Screenshots (390px)
  console.log('Starting Mobile Screenshots (390px)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });

  const mPage = await mobileContext.newPage();
  await mPage.goto('http://127.0.0.1:5173/');
  await mPage.evaluate(() => {
    sessionStorage.clear();
    localStorage.clear();
  });
  await mPage.reload({ waitUntil: 'networkidle' });

  // Mobile Quote Gate Initial
  await mPage.waitForTimeout(1000);
  await mPage.screenshot({ path: path.join(OUT_DIR, '11-mobile-quote-gate.png') });

  // Skip into site
  const mSkip = await mPage.$('button:has-text("Skip Intro")');
  if (mSkip) await mSkip.click();
  await mPage.waitForTimeout(2000);

  // Mobile Hero
  await mPage.screenshot({ path: path.join(OUT_DIR, '12-mobile-hero.png') });

  // Mobile Chapter 1 Directional Text
  await mPage.evaluate(() => document.getElementById('ch-1')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  await mPage.waitForTimeout(1500);
  await mPage.screenshot({ path: path.join(OUT_DIR, '13-mobile-ch1-directional.png') });

  // Mobile Chapter 5 Chariot
  await mPage.evaluate(() => document.getElementById('ch-5')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  await mPage.waitForTimeout(1500);
  await mPage.screenshot({ path: path.join(OUT_DIR, '14-mobile-ch5-chariot.png') });

  await mobileContext.close();
  await browser.close();

  console.log('All Quote Gate & Directional Text Emergence captures completed successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
