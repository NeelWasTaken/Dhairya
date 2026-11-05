const fs = require('fs');

function generateSunSVG(options = {}) {
  const {
    rayCount = 16,
    longLength = 250,
    shortLength = 155,
    waviness = 1.0,
    seed = 42,
    size = 600,
    animate = true,
  } = options;

  function pseudoRandom(s) {
    let state = s % 2147483647;
    if (state <= 0) state += 2147483646;
    return function() {
      return (state = state * 16807 % 2147483647) / 2147483647;
    };
  }

  const rng = pseudoRandom(seed);
  const cx = size / 2;
  const cy = size / 2;
  const rRim = 86;
  const rInner = 72;

  // Build rays
  const rays = [];
  for (let i = 0; i < rayCount; i++) {
    const angleDeg = (i * 360) / rayCount; // 0 is Top (12 o'clock)
    const isCardinal = i % 4 === 0;
    const isLong = i % 2 === 0;
    
    // Exact lengths: Cardinal longest (~260px), Diagonal long (~225px), Intermediates short (~155px)
    const baseLen = isCardinal ? longLength + 12 : (isLong ? longLength * 0.90 : shortLength);
    const len = baseLen + (rng() - 0.5) * 10;
    // Base widths touching at rim
    const baseWidth = isCardinal ? 34 : (isLong ? 31 : 27);

    // Serpentine flame waviness:
    // Every ray has an organic S-wave. Alternating direction gives balanced solar dynamism.
    const dir = (i % 2 === 0 ? 1 : -1);
    const waveAmp1 = (isLong ? 20 : 13) * waviness * (0.85 + rng() * 0.3) * dir;
    const waveAmp2 = -waveAmp1 * (0.75 + rng() * 0.3);
    const waveAmp3 = waveAmp1 * 0.35 * (0.8 + rng() * 0.4);

    const h = len - rRim;
    // Local coords pointing UP: y goes from -rRim down to -len
    const p0 = { x: -baseWidth / 2, y: -rRim };
    const q0 = { x: baseWidth / 2, y: -rRim };

    // S-curve points
    // Left boundary
    const p1 = { x: -baseWidth * 0.42 + waveAmp1, y: -rRim - h * 0.30 };
    const p2 = { x: -baseWidth * 0.22 + waveAmp2, y: -rRim - h * 0.65 };
    const p3 = { x: waveAmp3 * 0.5, y: -rRim - h * 0.92 };
    const tip = { x: waveAmp3, y: -len };

    // Right boundary
    const q1 = { x: baseWidth * 0.42 + waveAmp1, y: -rRim - h * 0.30 };
    const q2 = { x: baseWidth * 0.22 + waveAmp2, y: -rRim - h * 0.65 };
    const q3 = { x: waveAmp3 * 0.5, y: -rRim - h * 0.92 };

    // Center spine (midline ridge)
    const m0 = { x: 0, y: -rRim };
    const m1 = { x: waveAmp1, y: -rRim - h * 0.30 };
    const m2 = { x: waveAmp2, y: -rRim - h * 0.65 };

    // Full closed path for ray
    const bodyPath = `M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} ` +
      `C ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}, ${tip.x.toFixed(2)} ${tip.y.toFixed(2)} ` +
      `C ${q2.x.toFixed(2)} ${q2.y.toFixed(2)}, ${q1.x.toFixed(2)} ${q1.y.toFixed(2)}, ${q0.x.toFixed(2)} ${q0.y.toFixed(2)} Z`;

    // Left flank (light highlight side)
    const leftFlank = `M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} ` +
      `C ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}, ${tip.x.toFixed(2)} ${tip.y.toFixed(2)} ` +
      `C ${m2.x.toFixed(2)} ${m2.y.toFixed(2)}, ${m1.x.toFixed(2)} ${m1.y.toFixed(2)}, ${m0.x.toFixed(2)} ${m0.y.toFixed(2)} Z`;

    // Right flank (warm bronze shading side)
    const rightFlank = `M ${m0.x.toFixed(2)} ${m0.y.toFixed(2)} ` +
      `C ${m1.x.toFixed(2)} ${m1.y.toFixed(2)}, ${m2.x.toFixed(2)} ${m2.y.toFixed(2)}, ${tip.x.toFixed(2)} ${tip.y.toFixed(2)} ` +
      `C ${q2.x.toFixed(2)} ${q2.y.toFixed(2)}, ${q1.x.toFixed(2)} ${q1.y.toFixed(2)}, ${q0.x.toFixed(2)} ${q0.y.toFixed(2)} Z`;

    // Midline spine curve
    const spinePath = `M ${m0.x.toFixed(2)} ${m0.y.toFixed(2)} ` +
      `C ${m1.x.toFixed(2)} ${m1.y.toFixed(2)}, ${m2.x.toFixed(2)} ${m2.y.toFixed(2)}, ${tip.x.toFixed(2)} ${tip.y.toFixed(2)}`;

    rays.push({
      index: i,
      angleDeg,
      bodyPath,
      leftFlank,
      rightFlank,
      spinePath,
      isLong,
      isCardinal,
      swayOffset: (i * 0.22).toFixed(2),
      swayDur: (3.6 + (i % 3) * 0.5).toFixed(2),
    });
  }

  return `
<svg viewBox="0 0 ${size} ${size}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="sun-svg" style="overflow: visible;">
  <defs>
    <!-- Mottled Hammered Gold Texture Filter -->
    <filter id="sunHammeredGold" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
      <feDiffuseLighting in="noise" lighting-color="#FFEBB0" surfaceScale="2.8" diffuseConstant="1.2" result="light">
        <fePointLight x="${cx - 40}" y="${cy - 40}" z="120" />
      </feDiffuseLighting>
      <feBlend mode="multiply" in="SourceGraphic" in2="light" result="lit" />
      <feComposite operator="in" in="lit" in2="SourceGraphic" />
    </filter>

    <!-- Ray Golden Gradients -->
    <linearGradient id="rayGoldLong" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#BA741A" />
      <stop offset="25%" stop-color="#E2A238" />
      <stop offset="60%" stop-color="#F2C558" />
      <stop offset="90%" stop-color="#FCE187" />
      <stop offset="100%" stop-color="#FFF2BD" />
    </linearGradient>

    <linearGradient id="rayGoldShort" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#B26C15" />
      <stop offset="35%" stop-color="#DB972E" />
      <stop offset="75%" stop-color="#EBB94C" />
      <stop offset="100%" stop-color="#FDE599" />
    </linearGradient>

    <!-- Raised Rim Ring Gradient (Light highlight upper-left, bronze shadow lower-right) -->
    <linearGradient id="rimTorusGrad" x1="15%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stop-color="#FFF4CA" />
      <stop offset="20%" stop-color="#F0BF58" />
      <stop offset="55%" stop-color="#B2741E" />
      <stop offset="85%" stop-color="#70400C" />
      <stop offset="100%" stop-color="#4A2606" />
    </linearGradient>

    <!-- Central Disc Radial Gradient -->
    <radialGradient id="discSunRadial" cx="44%" cy="42%" r="56%">
      <stop offset="0%" stop-color="#FFF1AD" />
      <stop offset="22%" stop-color="#FAD26B" />
      <stop offset="55%" stop-color="#E29E30" />
      <stop offset="85%" stop-color="#B56E16" />
      <stop offset="100%" stop-color="#7D4609" />
    </radialGradient>

    <!-- Mottled Organic Layer -->
    <radialGradient id="discMottle" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(255, 255, 230, 0.45)" />
      <stop offset="45%" stop-color="rgba(240, 185, 60, 0.2)" />
      <stop offset="80%" stop-color="rgba(140, 75, 10, 0.35)" />
      <stop offset="100%" stop-color="rgba(80, 40, 5, 0.6)" />
    </radialGradient>
  </defs>

  <style>
    .sun-ray {
      transform-origin: ${cx}px ${cy}px;
    }
    ${animate ? `
    @keyframes raySwayEven {
      0%, 100% { transform: rotate(var(--rot)) scale(1); }
      50% { transform: rotate(calc(var(--rot) + 2.4deg)) scale(1.012); }
    }
    @keyframes raySwayOdd {
      0%, 100% { transform: rotate(var(--rot)) scale(1); }
      50% { transform: rotate(calc(var(--rot) - 2.6deg)) scale(0.99); }
    }
    .sway-even {
      animation: raySwayEven var(--dur) ease-in-out infinite var(--delay);
    }
    .sway-odd {
      animation: raySwayOdd var(--dur) ease-in-out infinite var(--delay);
    }
    @keyframes discTextureShimmer {
      0%, 100% { opacity: 0.88; transform: scale(1) rotate(0deg); }
      50% { opacity: 1; transform: scale(1.015) rotate(1.5deg); }
    }
    .disc-shimmer {
      animation: discTextureShimmer 5s ease-in-out infinite;
      transform-origin: ${cx}px ${cy}px;
    }
    ` : ''}
  </style>

  <g id="sun-root" transform="translate(${cx}, ${cy})">
    <!-- Ambient Solar Halos -->
    <circle r="${rRim * 2.1}" fill="url(#discSunRadial)" opacity="0.14" filter="blur(20px)" />
    <circle r="${rRim * 1.35}" fill="#FAD26B" opacity="0.22" filter="blur(10px)" />

    <!-- 16 Serpentine Rays -->
    <g id="sun-rays">
      ${rays.map(r => `
        <g class="sun-ray ${animate ? (r.index % 2 === 0 ? 'sway-even' : 'sway-odd') : ''}"
           style="--rot: ${r.angleDeg}deg; --dur: ${r.swayDur}s; --delay: -${r.swayOffset}s; transform: rotate(${r.angleDeg}deg);">
          
          <!-- Outer Bronze Outline & Gold Fill -->
          <path d="${r.bodyPath}"
                fill="${r.isLong ? 'url(#rayGoldLong)' : 'url(#rayGoldShort)'}"
                stroke="#6B410F"
                stroke-width="1.8"
                stroke-linejoin="round"
                stroke-linecap="round" />

          <!-- Left Flank Golden Highlight -->
          <path d="${r.leftFlank}"
                fill="rgba(255, 245, 195, 0.36)"
                style="mix-blend-mode: screen;" />

          <!-- Right Flank Shading -->
          <path d="${r.rightFlank}"
                fill="rgba(90, 45, 8, 0.28)"
                style="mix-blend-mode: multiply;" />

          <!-- Central Ridge Highlight Spine -->
          <path d="${r.spinePath}"
                fill="none"
                stroke="rgba(255, 250, 225, 0.72)"
                stroke-width="1.2"
                stroke-linecap="round" />
        </g>
      `).join('\n')}
    </g>

    <!-- Raised Rim Ring Collar (Embossed bevel torus) -->
    <g id="sun-rim">
      <!-- Shadow cast onto underlying ray bases -->
      <circle r="${rRim + 2}" fill="none" stroke="rgba(40, 20, 5, 0.45)" stroke-width="5" filter="blur(2px)" />

      <!-- Outer Torus Ring -->
      <circle r="${rRim}" fill="none" stroke="url(#rimTorusGrad)" stroke-width="9" />
      <circle r="${rRim + 4.5}" fill="none" stroke="#663C0B" stroke-width="1.4" />
      <circle r="${rRim - 4.5}" fill="none" stroke="#462404" stroke-width="1.4" />

      <!-- Inner Fine Step Bevel -->
      <circle r="${rRim - 8}" fill="none" stroke="url(#rimTorusGrad)" stroke-width="3" />
      <circle r="${rRim - 10}" fill="none" stroke="#361A02" stroke-width="1.2" />
    </g>

    <!-- Central Hammered Gold Sphere Disc -->
    <g id="sun-center-disc" class="disc-shimmer">
      <!-- Base Textured Sphere -->
      <circle r="${rInner}" fill="url(#discSunRadial)" filter="url(#sunHammeredGold)" />

      <!-- Organic Mottled Depth Overlay -->
      <circle r="${rInner}" fill="url(#discMottle)" style="mix-blend-mode: soft-light;" />
      
      <!-- Inner Bevel Highlight Hairline -->
      <circle r="${rInner - 1}" fill="none" stroke="rgba(255, 240, 185, 0.6)" stroke-width="1.5" />
      
      <!-- Luminous Center Bindu / Corona Core -->
      <circle r="14" fill="#FFFBE6" opacity="0.45" filter="blur(5px)" />
    </g>
  </g>
</svg>
`;
}

// Write preview HTML file with side-by-side comparison
const svgMarkup = generateSunSVG({ animate: true });
const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Sun Reference vs SVG Comparison</title>
  <style>
    body {
      background: #0D0A14;
      color: #FAF8F3;
      font-family: system-ui, sans-serif;
      margin: 0;
      padding: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h1 { margin-bottom: 24px; font-weight: 400; letter-spacing: 0.1em; color: #D4AF37; }
    .comparison-row {
      display: flex;
      gap: 40px;
      justify-content: center;
      align-items: center;
    }
    .card {
      background: #161224;
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 12px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 480px;
    }
    .card h2 {
      font-size: 0.95rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-top: 0;
      margin-bottom: 16px;
      color: #E07A1F;
    }
    .img-box {
      width: 420px;
      height: 420px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .img-box img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  </style>
</head>
<body>
  <h1>SUN VISUAL REFERENCE VS PROCEDURAL SVG</h1>
  <div class="comparison-row">
    <div class="card">
      <h2>Original Reference Image (/public/reference/sun.png)</h2>
      <div class="img-box">
        <img src="/Users/neel/.gemini/antigravity/scratch/dhairya/public/reference/sun.png" alt="Reference Sun" />
      </div>
    </div>
    <div class="card">
      <h2>Original Procedural Layered SVG (&lt;Sun /&gt;)</h2>
      <div class="img-box">
        ${svgMarkup}
      </div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('/Users/neel/.gemini/antigravity/scratch/dhairya/scripts/sun_compare.html', html);
console.log('Refined sun_compare.html generated.');
