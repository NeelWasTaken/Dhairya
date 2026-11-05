const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const MOBILE_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/screenshots_v4_mobile';
const VIDEO_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/recordings';

if (!fs.existsSync(MOBILE_DIR)) fs.mkdirSync(MOBILE_DIR, { recursive: true });
if (!fs.existsSync(VIDEO_DIR)) fs.mkdirSync(VIDEO_DIR, { recursive: true });

async function run() {
  console.log('Starting Phase 5 Performance Profiling & Video Recording...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  // 1. Desktop Recording & Profiling Context (1440x900)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: VIDEO_DIR,
      size: { width: 1440, height: 900 },
    },
  });

  const page = await desktopContext.newPage();
  await page.goto('http://127.0.0.1:5173/');
  const skipBtn = await page.$('button:has-text("Skip Intro")');
  if (skipBtn) await skipBtn.click();
  await page.waitForTimeout(1000);

  // Measure desktop scroll FPS
  console.log('Measuring Desktop Scroll FPS across new foundation...');
  const desktopFps = await page.evaluate(async () => {
    let frames = 0;
    let start = performance.now();
    let running = true;
    function count() { frames++; if (running) requestAnimationFrame(count); }
    requestAnimationFrame(count);

    let interval = setInterval(() => { window.scrollBy({ top: 35, behavior: 'auto' }); }, 16);
    await new Promise((r) => setTimeout(r, 4000));
    running = false;
    clearInterval(interval);
    return Math.round(frames / ((performance.now() - start) / 1000));
  });
  console.log('Desktop FPS measured:', desktopFps);

  // Walkthrough to /experiences
  console.log('Navigating to /experiences...');
  await page.goto('http://127.0.0.1:5173/experiences');
  await page.waitForTimeout(1500);

  // Walkthrough to /journal
  console.log('Navigating to /journal...');
  await page.goto('http://127.0.0.1:5173/journal');
  await page.waitForTimeout(1500);

  // Open article
  await page.goto('http://127.0.0.1:5173/journal/chariot-horses-reins-self-regulation');
  await page.waitForTimeout(1500);

  await desktopContext.close();

  // 2. Mobile Emulation Context (390x844 iPhone 14)
  console.log('Starting Mobile Emulation Captures (390px)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });

  const mPage = await mobileContext.newPage();

  // Mobile Home
  await mPage.goto('http://127.0.0.1:5173/');
  const mSkip = await mPage.$('button:has-text("Skip Intro")');
  if (mSkip) await mSkip.click();
  await mPage.waitForTimeout(1000);
  await mPage.screenshot({ path: path.join(MOBILE_DIR, '01-mobile-home-placard.png') });

  // Measure mobile scroll FPS
  const mobileFps = await mPage.evaluate(async () => {
    let frames = 0;
    let start = performance.now();
    let running = true;
    function count() { frames++; if (running) requestAnimationFrame(count); }
    requestAnimationFrame(count);

    let interval = setInterval(() => { window.scrollBy({ top: 25, behavior: 'auto' }); }, 16);
    await new Promise((r) => setTimeout(r, 3000));
    running = false;
    clearInterval(interval);
    return Math.round(frames / ((performance.now() - start) / 1000));
  });
  console.log('Mobile FPS measured:', mobileFps);

  // Mobile Experiences Hub
  await mPage.goto('http://127.0.0.1:5173/experiences');
  await mPage.waitForTimeout(1200);
  await mPage.screenshot({ path: path.join(MOBILE_DIR, '02-mobile-experiences-hub.png') });

  // Mobile Journal Index
  await mPage.goto('http://127.0.0.1:5173/journal');
  await mPage.waitForTimeout(1200);
  await mPage.screenshot({ path: path.join(MOBILE_DIR, '03-mobile-journal-index.png') });

  // Mobile Journal Detail
  await mPage.goto('http://127.0.0.1:5173/journal/boy-who-argued-with-death');
  await mPage.waitForTimeout(1200);
  await mPage.screenshot({ path: path.join(MOBILE_DIR, '04-mobile-journal-detail.png') });

  await mobileContext.close();
  await browser.close();

  console.log('Performance Profiling & Walkthrough Captures Completed!');
  return { desktopFps, mobileFps };
}

run()
  .then((res) => {
    console.log('FINAL BENCHMARK:', JSON.stringify(res));
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
