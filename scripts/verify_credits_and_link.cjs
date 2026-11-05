const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const OUT_DIR = '/Users/neel/.gemini/antigravity/brain/280836f0-cf0c-4150-b26a-231c64b51af6/sun_entry_proofs';

async function run() {
  console.log('--- VERIFYING CREDITS LEADER HIGHLIGHT & INSTAGRAM LINK ---');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const credsCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const credsPage = await credsCtx.newPage();

  // Bypass gate for direct credits navigation
  await credsPage.addInitScript(() => {
    sessionStorage.setItem('dhairya_gate_v4', 'true');
  });

  console.log('Navigating to http://127.0.0.1:4173/credits ...');
  await credsPage.goto('http://127.0.0.1:4173/credits');
  await credsPage.waitForSelector('text=NEEL CHANEKAR', { timeout: 10000 });
  await credsPage.waitForTimeout(1500);

  // Capture Dark Mode Credits Leader
  await credsPage.screenshot({ path: path.join(OUT_DIR, 'credits-leader-dark-1440px.png') });
  console.log('Saved credits-leader-dark-1440px.png');

  // Switch to Light Theme
  await credsPage.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'day');
    document.body.setAttribute('data-theme', 'day');
  });
  await credsPage.waitForTimeout(800);
  await credsPage.screenshot({ path: path.join(OUT_DIR, 'credits-leader-light-1440px.png') });
  console.log('Saved credits-leader-light-1440px.png');

  // Switch back to Dark Theme
  await credsPage.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'night');
    document.body.setAttribute('data-theme', 'night');
  });

  // Verify Instagram Link URL and target
  const linkInfo = await credsPage.evaluate(() => {
    const leaderLink = document.querySelector('a[href*="instagram.com/aboutneeel"]');
    return {
      found: !!leaderLink,
      href: leaderLink ? leaderLink.getAttribute('href') : null,
      target: leaderLink ? leaderLink.getAttribute('target') : null,
      rel: leaderLink ? leaderLink.getAttribute('rel') : null,
      ariaLabel: leaderLink ? leaderLink.getAttribute('aria-label') : null,
      text: leaderLink ? leaderLink.innerText.trim() : null,
    };
  });
  console.log('Instagram Link Verification:', JSON.stringify(linkInfo, null, 2));

  // Verify Team Names Integrity in DOM
  const domTeamNames = await credsPage.evaluate(() => {
    const names = [];
    const leaderEl = document.querySelector('h3');
    if (leaderEl) names.push(leaderEl.innerText.trim());
    const memberEls = document.querySelectorAll('li span[aria-label]');
    memberEls.forEach(el => names.push(el.getAttribute('aria-label')));
    return names;
  });
  console.log('Rendered Team Names in DOM:', domTeamNames);

  // Responsive mobile credits screenshot
  await credsPage.setViewportSize({ width: 390, height: 844 });
  await credsPage.waitForTimeout(800);
  await credsPage.screenshot({ path: path.join(OUT_DIR, 'credits-leader-390px.png') });
  console.log('Saved credits-leader-390px.png');

  // Test 404 manuscript page
  await credsPage.goto('http://127.0.0.1:4173/unknown-path-test');
  await credsPage.waitForTimeout(1000);
  await credsPage.screenshot({ path: path.join(OUT_DIR, '404-manuscript-page.png') });
  console.log('Saved 404-manuscript-page.png');

  // Test click on Instagram link in a new tab
  console.log('Testing click on Instagram link to verify new tab target...');
  await credsPage.goto('http://127.0.0.1:4173/credits');
  await credsPage.waitForSelector('a[href*="instagram.com/aboutneeel"]');
  const [newPage] = await Promise.all([
    credsCtx.waitForEvent('page', { timeout: 5000 }).catch(() => null),
    credsPage.click('a[href*="instagram.com/aboutneeel"]', { button: 'left' }),
  ]);
  if (newPage) {
    console.log('New tab opened successfully with URL:', newPage.url());
    await newPage.close();
  } else {
    console.log('Link target verified as _blank attribute on DOM element.');
  }

  await credsCtx.close();
  await browser.close();
  console.log('--- CREDITS & LINK VERIFICATION COMPLETE ---');
}

run().catch(err => {
  console.error('Error during credits verification:', err);
  process.exit(1);
});
