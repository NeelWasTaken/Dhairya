const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const OUT_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/draw_circle_proofs';

async function run() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Load debug sun page: http://127.0.0.1:4173/?debug=entry
  await page.addInitScript(() => sessionStorage.clear());
  await page.goto('http://127.0.0.1:4173/?debug=entry');
  await page.waitForTimeout(1000);

  // Directly click "Sun" button in HUD
  const sunBtn = await page.waitForSelector('button:has-text("Sun")');
  await sunBtn.click();
  await page.waitForTimeout(1500);

  const sunStagePath = path.join(OUT_DIR, 'sun-formed-1440px.png');
  await page.screenshot({ path: sunStagePath });
  console.log('Saved sun-formed-1440px.png');

  // Generate comparison HTML
  const compareHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Sun Comparison</title>
  <style>
    body { background: #0D0A14; color: #FAF8F3; font-family: monospace; padding: 30px; margin: 0; }
    h1 { text-align: center; color: #D9B45A; letter-spacing: 0.15em; font-size: 1.25rem; }
    .row { display: flex; gap: 30px; justify-content: center; align-items: stretch; margin-top: 20px; }
    .card { background: #161224; border: 1px solid rgba(217, 180, 90, 0.3); border-radius: 12px; padding: 20px; flex: 1; max-width: 680px; }
    .card h2 { color: #FFE4B5; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0; margin-bottom: 12px; }
    .img-box { width: 100%; height: 420px; display: flex; align-items: center; justify-content: center; background: #000; border-radius: 8px; overflow: hidden; }
    .img-box img { max-width: 100%; max-height: 100%; object-fit: contain; }
  </style>
</head>
<body>
  <h1>THE SUN: REFERENCE IMAGE VS PROCEDURAL SVG SUN</h1>
  <div class="row">
    <div class="card">
      <h2>Reference Image (/public/reference/sun.png)</h2>
      <div class="img-box">
        <img src="/Users/neel/.gemini/antigravity/scratch/dhairya/public/reference/sun.png" alt="Reference" />
      </div>
    </div>
    <div class="card">
      <h2>Our Procedural SVG Sun (16 S-Curve Rays + Torus Rim + Disc)</h2>
      <div class="img-box">
        <img src="${sunStagePath}" alt="Our Implementation" />
      </div>
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(OUT_DIR, 'compare_sun.html'), compareHtml);
  const comparePage = await browser.newPage({ viewport: { width: 1440, height: 650 } });
  await comparePage.goto('file://' + path.join(OUT_DIR, 'compare_sun.html'));
  await comparePage.waitForTimeout(800);
  await comparePage.screenshot({ path: path.join(OUT_DIR, 'sun-side-by-side.png') });
  await comparePage.close();
  console.log('Saved sun-side-by-side.png');

  await browser.close();
}

run().catch(console.error);
