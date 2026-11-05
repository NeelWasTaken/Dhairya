const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const OUT_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/draw_circle_proofs';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function run() {
  console.log('=== STARTING DRAW A CIRCLE ENTRY SUITE ===');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  // =========================================================
  // 1. CAPTURE DRAW SCREEN AT 1440px & 390px
  // =========================================================
  console.log('\n--- 1. CAPTURING DRAW SCREEN ---');
  const page1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page1440.addInitScript(() => sessionStorage.clear());
  await page1440.goto('http://127.0.0.1:4173/');

  // Wait for Quote Gate
  await page1440.waitForTimeout(3200);
  const beginBtn = await page1440.waitForSelector('button:has-text("Click to Begin")');
  await beginBtn.click();

  // Now on Draw Circle Screen
  await page1440.waitForTimeout(1000);
  const draw1440Path = path.join(OUT_DIR, 'draw-screen-1440px.png');
  await page1440.screenshot({ path: draw1440Path });
  console.log('Saved draw-screen-1440px.png');

  // Mobile 390px
  await page1440.setViewportSize({ width: 390, height: 844 });
  await page1440.waitForTimeout(500);
  const draw390Path = path.join(OUT_DIR, 'draw-screen-390px.png');
  await page1440.screenshot({ path: draw390Path });
  console.log('Saved draw-screen-390px.png');
  await page1440.close();

  // =========================================================
  // 2. SIDE-BY-SIDE COMPARISON: reference vs our draw screen
  // =========================================================
  console.log('\n--- 2. CREATING SIDE-BY-SIDE DRAW SCREEN COMPARISON ---');
  const compareHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Draw Screen Comparison</title>
  <style>
    body { background: #0D0A14; color: #FAF8F3; font-family: monospace; padding: 30px; margin: 0; }
    h1 { text-align: center; color: #70E0D0; letter-spacing: 0.15em; font-size: 1.25rem; }
    .row { display: flex; gap: 30px; justify-content: center; align-items: stretch; margin-top: 20px; }
    .card { background: #161224; border: 1px solid rgba(112, 224, 208, 0.3); border-radius: 12px; padding: 20px; flex: 1; max-width: 680px; }
    .card h2 { color: #8EEAC8; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0; margin-bottom: 12px; }
    .img-box { width: 100%; height: 380px; display: flex; align-items: center; justify-content: center; background: #000; border-radius: 8px; overflow: hidden; }
    .img-box img { max-width: 100%; max-height: 100%; object-fit: contain; }
  </style>
</head>
<body>
  <h1>DRAW A CIRCLE: REFERENCE VS DHAIRYA DRAW SCREEN</h1>
  <div class="row">
    <div class="card">
      <h2>Reference Image (/public/reference/draw-screen.png)</h2>
      <div class="img-box">
        <img src="/Users/neel/.gemini/antigravity/scratch/dhairya/public/reference/draw-screen.png" alt="Reference" />
      </div>
    </div>
    <div class="card">
      <h2>Our Procedural Misty Canvas Draw Screen</h2>
      <div class="img-box">
        <img src="${draw1440Path}" alt="Our Implementation" />
      </div>
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(OUT_DIR, 'compare_draw.html'), compareHtml);
  const comparePage = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  await comparePage.goto('file://' + path.join(OUT_DIR, 'compare_draw.html'));
  await comparePage.waitForTimeout(800);
  await comparePage.screenshot({ path: path.join(OUT_DIR, 'draw-screen-side-by-side.png') });
  await comparePage.close();
  console.log('Saved draw-screen-side-by-side.png');

  // =========================================================
  // 3. RECORDING: 1440px FULL WORKFLOW WITH MOUSE DRAWING
  // =========================================================
  console.log('\n--- 3. RECORDING 1440px FULL MOUSE WORKFLOW ---');
  const recordCtx1440 = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: OUT_DIR,
      size: { width: 1440, height: 900 },
    },
  });

  const recPage1440 = await recordCtx1440.newPage();
  await recPage1440.addInitScript(() => sessionStorage.clear());
  await recPage1440.goto('http://127.0.0.1:4173/');

  // Wait on Quote Gate
  await recPage1440.waitForTimeout(3200);
  const begin1440 = await recPage1440.waitForSelector('button:has-text("Click to Begin")');
  await begin1440.click();

  // On Draw Screen: simulate drawing a circle with the mouse
  console.log('Simulating hand-drawn circle stroke with mouse...');
  await recPage1440.waitForTimeout(1000);

  const cx = 720;
  const cy = 450;
  const r = 160;
  const steps = 36;

  // Move to start point (top of circle)
  await recPage1440.mouse.move(cx, cy - r);
  await recPage1440.mouse.down();

  for (let i = 1; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2 - Math.PI / 2;
    // Add slight natural hand jitter
    const jitter = (Math.sin(i * 3) * 6);
    const px = cx + (r + jitter) * Math.cos(angle);
    const py = cy + (r + jitter) * Math.sin(angle);
    await recPage1440.mouse.move(px, py);
    await recPage1440.waitForTimeout(25);
  }

  // Release mouse to complete circle
  await recPage1440.mouse.up();
  console.log('Stroke completed. Observing morph, sun growth, solar breathing, sunflower bloom, and Home hero...');

  // Observe morph to circle, sun growth (3s), solar breathing (1.6s), bloom (2s), hero reveal (1.4s)
  await recPage1440.waitForTimeout(9000);

  // Wait for Home hero to land
  await recPage1440.waitForSelector('h1', { timeout: 8000 });
  await recPage1440.waitForTimeout(2000);

  const v1440 = await recPage1440.video();
  await recordCtx1440.close();
  if (v1440) {
    const orig = await v1440.path();
    const target = path.join(OUT_DIR, 'draw-a-circle-1440px.webm');
    fs.renameSync(orig, target);
    console.log('Saved 1440px recording:', target);
  }

  // =========================================================
  // 4. RECORDING: 390px MOBILE WITH TOUCH EMULATION
  // =========================================================
  console.log('\n--- 4. RECORDING 390px MOBILE WITH TOUCH EMULATION ---');
  const recordCtx390 = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    recordVideo: {
      dir: OUT_DIR,
      size: { width: 390, height: 844 },
    },
  });

  const recPage390 = await recordCtx390.newPage();
  await recPage390.addInitScript(() => sessionStorage.clear());
  await recPage390.goto('http://127.0.0.1:4173/');

  await recPage390.waitForTimeout(3200);
  const begin390 = await recPage390.waitForSelector('button:has-text("Click to Begin")');
  await begin390.click();

  // On Mobile: draw circle via touch dispatch
  await recPage390.waitForTimeout(1000);
  console.log('Simulating touch circle on mobile...');
  await recPage390.evaluate(() => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const r = 90;
    const steps = 30;

    const el = document.querySelector('div[aria-label*="Draw a Circle"]');
    if (!el) return;

    // Dispatch touch sequence
    const startX = cx;
    const startY = cy - r;
    el.dispatchEvent(new PointerEvent('pointerdown', { clientX: startX, clientY: startY, bubbles: true }));

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const angle = (step / steps) * Math.PI * 2 - Math.PI / 2;
      const px = cx + r * Math.cos(angle);
      const py = cy + r * Math.sin(angle);
      el.dispatchEvent(new PointerEvent('pointermove', { clientX: px, clientY: py, bubbles: true }));

      if (step >= steps) {
        clearInterval(interval);
        el.dispatchEvent(new PointerEvent('pointerup', { clientX: px, clientY: py, bubbles: true }));
      }
    }, 20);
  });

  await recPage390.waitForTimeout(9500);

  const v390 = await recPage390.video();
  await recordCtx390.close();
  if (v390) {
    const orig = await v390.path();
    const target = path.join(OUT_DIR, 'draw-a-circle-390px.webm');
    fs.renameSync(orig, target);
    console.log('Saved 390px mobile recording:', target);
  }

  // =========================================================
  // 5. CLIPS OF: FAILED DRAW, "DRAW FOR ME", AND SKIP
  // =========================================================
  console.log('\n--- 5. RECORDING FAILED DRAW & ASSISTANCE PATHS ---');
  const assistCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: OUT_DIR,
      size: { width: 1440, height: 900 },
    },
  });
  const assistPage = await assistCtx.newPage();
  await assistPage.addInitScript(() => sessionStorage.clear());
  await assistPage.goto('http://127.0.0.1:4173/');

  await assistPage.waitForTimeout(3200);
  const assistBegin = await assistPage.waitForSelector('button:has-text("Click to Begin")');
  await assistBegin.click();

  // Test 1: Draw a straight line (fail)
  await assistPage.waitForTimeout(800);
  console.log('Testing failed draw (straight line)...');
  await assistPage.mouse.move(500, 450);
  await assistPage.mouse.down();
  await assistPage.mouse.move(900, 450);
  await assistPage.mouse.up();

  // Wait for "TRY AGAIN, A LITTLE ROUNDER" to appear
  await assistPage.waitForSelector('text=TRY AGAIN, A LITTLE ROUNDER', { timeout: 4000 });
  await assistPage.screenshot({ path: path.join(OUT_DIR, 'draw-failed-try-again.png') });
  console.log('Saved draw-failed-try-again.png');

  // Test 2: Click "Draw for me" button
  console.log('Clicking "Draw for me"...');
  const drawForMeBtn = await assistPage.waitForSelector('button:has-text("Draw for me")');
  await drawForMeBtn.click();

  // Observe auto-drawn circle & transition
  await assistPage.waitForTimeout(6000);

  const vAssist = await assistPage.video();
  await assistCtx.close();
  if (vAssist) {
    const orig = await vAssist.path();
    const target = path.join(OUT_DIR, 'failed-draw-and-draw-for-me.webm');
    fs.renameSync(orig, target);
    console.log('Saved failed-draw-and-draw-for-me.webm');
  }

  // =========================================================
  // 6. FPS TELEMETRY MEASUREMENT
  // =========================================================
  console.log('\n--- 6. MEASURING FPS TELEMETRY ---');
  const fpsPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await fpsPage.addInitScript(() => sessionStorage.clear());
  await fpsPage.goto('http://127.0.0.1:4173/');
  await fpsPage.waitForTimeout(3200);

  await fpsPage.evaluate(() => {
    window.__fpsFrames = [];
    let last = performance.now();
    function loop(now) {
      window.__fpsFrames.push(now - last);
      last = now;
      if (window.__fpsFrames.length < 450) {
        requestAnimationFrame(loop);
      }
    }
    requestAnimationFrame(loop);
  });

  const fpsBegin = await fpsPage.waitForSelector('button:has-text("Click to Begin")');
  await fpsBegin.click();

  // Auto trigger circle
  await fpsPage.waitForTimeout(1000);
  const autoBtn = await fpsPage.waitForSelector('button:has-text("Draw for me")');
  await autoBtn.click();
  await fpsPage.waitForTimeout(7500);

  const fpsStats = await fpsPage.evaluate(() => {
    const deltas = window.__fpsFrames.slice(15);
    const avgDelta = deltas.reduce((a, b) => a + b, 0) / deltas.length;
    const fps = 1000 / avgDelta;
    const slowFrames = deltas.filter(d => d > 20).length;
    return {
      framesMeasured: deltas.length,
      avgFrameTimeMs: avgDelta.toFixed(2),
      estimatedFPS: fps.toFixed(1),
      framesExceeding20ms: slowFrames,
      slowFramePercentage: ((slowFrames / deltas.length) * 100).toFixed(1) + '%',
    };
  });
  console.log('FPS Telemetry Result:', fpsStats);
  await fpsPage.close();

  await browser.close();
  console.log('\n=== SUITE COMPLETED SUCCESSFULLY ===');
}

run().catch(err => {
  console.error('Suite error:', err);
  process.exit(1);
});
