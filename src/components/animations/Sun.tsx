import React, { useId, useMemo } from 'react'

export interface SunProps {
  rayCount?: number
  longLength?: number
  shortLength?: number
  waviness?: number
  seed?: number
  size?: number | string
  animate?: boolean
  className?: string
  style?: React.CSSProperties
  /** Optional ray progress [0..1] for formation animation */
  rayProgress?: number
  /** Optional disc scale [0..1] for formation animation */
  discScale?: number
  /** Optional halo opacity multiplier */
  haloOpacity?: number
}

function pseudoRandom(s: number) {
  let state = s % 2147483647
  if (state <= 0) state += 2147483646
  return function () {
    return (state = (state * 16807) % 2147483647) / 2147483647
  }
}

export default function Sun({
  rayCount = 16,
  longLength = 250,
  shortLength = 155,
  waviness = 1.0,
  seed = 42,
  size = 520,
  animate = true,
  className = '',
  style = {},
  rayProgress = 1.0,
  discScale = 1.0,
  haloOpacity = 1.0,
}: SunProps) {
  const uid = useId().replace(/:/g, '')
  const viewBoxSize = 600
  const cx = viewBoxSize / 2
  const cy = viewBoxSize / 2
  const rRim = 86
  const rInner = 72

  // Generate rays once per seed & parameters
  const rays = useMemo(() => {
    const rng = pseudoRandom(seed)
    const result = []

    for (let i = 0; i < rayCount; i++) {
      const angleDeg = (i * 360) / rayCount
      const isCardinal = i % 4 === 0
      const isLong = i % 2 === 0

      const baseLen = isCardinal ? longLength + 12 : isLong ? longLength * 0.9 : shortLength
      const len = baseLen + (rng() - 0.5) * 10
      const baseWidth = isCardinal ? 34 : isLong ? 31 : 27

      const dir = i % 2 === 0 ? 1 : -1
      const waveAmp1 = (isLong ? 20 : 13) * waviness * (0.85 + rng() * 0.3) * dir
      const waveAmp2 = -waveAmp1 * (0.75 + rng() * 0.3)
      const waveAmp3 = waveAmp1 * 0.35 * (0.8 + rng() * 0.4)

      const h = len - rRim
      const p0 = { x: -baseWidth / 2, y: -rRim }
      const q0 = { x: baseWidth / 2, y: -rRim }

      const p1 = { x: -baseWidth * 0.42 + waveAmp1, y: -rRim - h * 0.3 }
      const p2 = { x: -baseWidth * 0.22 + waveAmp2, y: -rRim - h * 0.65 }
      const tip = { x: waveAmp3, y: -len }

      const q1 = { x: baseWidth * 0.42 + waveAmp1, y: -rRim - h * 0.3 }
      const q2 = { x: baseWidth * 0.22 + waveAmp2, y: -rRim - h * 0.65 }

      const m0 = { x: 0, y: -rRim }
      const m1 = { x: waveAmp1, y: -rRim - h * 0.3 }
      const m2 = { x: waveAmp2, y: -rRim - h * 0.65 }

      const bodyPath =
        `M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} ` +
        `C ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}, ${tip.x.toFixed(2)} ${tip.y.toFixed(2)} ` +
        `C ${q2.x.toFixed(2)} ${q2.y.toFixed(2)}, ${q1.x.toFixed(2)} ${q1.y.toFixed(2)}, ${q0.x.toFixed(2)} ${q0.y.toFixed(2)} Z`

      const leftFlank =
        `M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} ` +
        `C ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}, ${tip.x.toFixed(2)} ${tip.y.toFixed(2)} ` +
        `C ${m2.x.toFixed(2)} ${m2.y.toFixed(2)}, ${m1.x.toFixed(2)} ${m1.y.toFixed(2)}, ${m0.x.toFixed(2)} ${m0.y.toFixed(2)} Z`

      const rightFlank =
        `M ${m0.x.toFixed(2)} ${m0.y.toFixed(2)} ` +
        `C ${m1.x.toFixed(2)} ${m1.y.toFixed(2)}, ${m2.x.toFixed(2)} ${m2.y.toFixed(2)}, ${tip.x.toFixed(2)} ${tip.y.toFixed(2)} ` +
        `C ${q2.x.toFixed(2)} ${q2.y.toFixed(2)}, ${q1.x.toFixed(2)} ${q1.y.toFixed(2)}, ${q0.x.toFixed(2)} ${q0.y.toFixed(2)} Z`

      const spinePath =
        `M ${m0.x.toFixed(2)} ${m0.y.toFixed(2)} ` +
        `C ${m1.x.toFixed(2)} ${m1.y.toFixed(2)}, ${m2.x.toFixed(2)} ${m2.y.toFixed(2)}, ${tip.x.toFixed(2)} ${tip.y.toFixed(2)}`

      result.push({
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
      })
    }

    return result
  }, [rayCount, longLength, shortLength, waviness, seed])

  const hammeredFilterId = `sun-hammered-${uid}`
  const rayGoldLongId = `ray-gold-long-${uid}`
  const rayGoldShortId = `ray-gold-short-${uid}`
  const rimTorusGradId = `rim-torus-grad-${uid}`
  const discRadialId = `disc-sun-radial-${uid}`
  const discMottleId = `disc-mottle-${uid}`

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        maxWidth: '100%',
        maxHeight: '100%',
        ...style,
      }}
      role="img"
      aria-label="Golden Sun with 16 serpentine rays and hammered gold disc"
    >
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Mottled Hammered Gold Texture Filter */}
          <filter id={hammeredFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDiffuseLighting in="noise" lightingColor="#FFEBB0" surfaceScale="2.8" diffuseConstant="1.2" result="light">
              <fePointLight x={cx - 40} y={cy - 40} z={120} />
            </feDiffuseLighting>
            <feBlend mode="multiply" in="SourceGraphic" in2="light" result="lit" />
            <feComposite operator="in" in="lit" in2="SourceGraphic" />
          </filter>

          {/* Ray Golden Gradients */}
          <linearGradient id={rayGoldLongId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#BA741A" />
            <stop offset="25%" stopColor="#E2A238" />
            <stop offset="60%" stopColor="#F2C558" />
            <stop offset="90%" stopColor="#FCE187" />
            <stop offset="100%" stopColor="#FFF2BD" />
          </linearGradient>

          <linearGradient id={rayGoldShortId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#B26C15" />
            <stop offset="35%" stopColor="#DB972E" />
            <stop offset="75%" stopColor="#EBB94C" />
            <stop offset="100%" stopColor="#FDE599" />
          </linearGradient>

          {/* Raised Rim Ring Gradient (Light highlight upper-left, bronze shadow lower-right) */}
          <linearGradient id={rimTorusGradId} x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#FFF4CA" />
            <stop offset="20%" stopColor="#F0BF58" />
            <stop offset="55%" stopColor="#B2741E" />
            <stop offset="85%" stopColor="#70400C" />
            <stop offset="100%" stopColor="#4A2606" />
          </linearGradient>

          {/* Central Disc Radial Gradient */}
          <radialGradient id={discRadialId} cx="44%" cy="42%" r="56%">
            <stop offset="0%" stopColor="#FFF1AD" />
            <stop offset="22%" stopColor="#FAD26B" />
            <stop offset="55%" stopColor="#E29E30" />
            <stop offset="85%" stopColor="#B56E16" />
            <stop offset="100%" stopColor="#7D4609" />
          </radialGradient>

          {/* Mottled Organic Layer */}
          <radialGradient id={discMottleId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 230, 0.45)" />
            <stop offset="45%" stopColor="rgba(240, 185, 60, 0.2)" />
            <stop offset="80%" stopColor="rgba(140, 75, 10, 0.35)" />
            <stop offset="100%" stopColor="rgba(80, 40, 5, 0.6)" />
          </radialGradient>
        </defs>

        <style>
          {`
            .sun-sway-even-${uid} {
              transform-origin: ${cx}px ${cy}px;
              animation: raySwayEven-${uid} var(--dur) ease-in-out infinite var(--delay);
            }
            .sun-sway-odd-${uid} {
              transform-origin: ${cx}px ${cy}px;
              animation: raySwayOdd-${uid} var(--dur) ease-in-out infinite var(--delay);
            }
            @keyframes raySwayEven-${uid} {
              0%, 100% { transform: rotate(var(--rot)) scale(1); }
              50% { transform: rotate(calc(var(--rot) + 2.4deg)) scale(1.012); }
            }
            @keyframes raySwayOdd-${uid} {
              0%, 100% { transform: rotate(var(--rot)) scale(1); }
              50% { transform: rotate(calc(var(--rot) - 2.6deg)) scale(0.99); }
            }
            .sun-shimmer-${uid} {
              transform-origin: ${cx}px ${cy}px;
              animation: discTextureShimmer-${uid} 5s ease-in-out infinite;
            }
            @keyframes discTextureShimmer-${uid} {
              0%, 100% { opacity: 0.88; transform: scale(1) rotate(0deg); }
              50% { opacity: 1; transform: scale(1.015) rotate(1.5deg); }
            }
          `}
        </style>

        <g id={`sun-root-${uid}`} transform={`translate(${cx}, ${cy})`}>
          {/* Ambient Solar Halos */}
          <circle
            r={rRim * 2.1}
            fill={`url(#${discRadialId})`}
            opacity={0.14 * haloOpacity}
            filter="blur(20px)"
          />
          <circle
            r={rRim * 1.35}
            fill="#FAD26B"
            opacity={0.22 * haloOpacity}
            filter="blur(10px)"
          />

          {/* 16 Serpentine Rays */}
          <g id={`sun-rays-${uid}`}>
            {rays.map((r) => {
              const swayClass = animate
                ? r.index % 2 === 0
                  ? `sun-sway-even-${uid}`
                  : `sun-sway-odd-${uid}`
                : ''

              return (
                <g
                  key={r.index}
                  className={swayClass}
                  style={
                    {
                      '--rot': `${r.angleDeg}deg`,
                      '--dur': `${r.swayDur}s`,
                      '--delay': `-${r.swayOffset}s`,
                      transform: `rotate(${r.angleDeg}deg) scale(${rayProgress})`,
                      transformOrigin: '0px 0px',
                      transition: 'transform 0.4s ease-out',
                      opacity: rayProgress > 0.05 ? 1 : 0,
                    } as React.CSSProperties
                  }
                >
                  {/* Outer Bronze Outline & Gold Fill */}
                  <path
                    d={r.bodyPath}
                    fill={r.isLong ? `url(#${rayGoldLongId})` : `url(#${rayGoldShortId})`}
                    stroke="#6B410F"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* Left Flank Golden Highlight */}
                  <path
                    d={r.leftFlank}
                    fill="rgba(255, 245, 195, 0.36)"
                    style={{ mixBlendMode: 'screen' }}
                  />

                  {/* Right Flank Shading */}
                  <path
                    d={r.rightFlank}
                    fill="rgba(90, 45, 8, 0.28)"
                    style={{ mixBlendMode: 'multiply' }}
                  />

                  {/* Central Ridge Highlight Spine */}
                  <path
                    d={r.spinePath}
                    fill="none"
                    stroke="rgba(255, 250, 225, 0.72)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </g>
              )
            })}
          </g>

          {/* Raised Rim Ring Collar (Embossed bevel torus) */}
          <g id={`sun-rim-${uid}`} style={{ transform: `scale(${discScale})`, transformOrigin: '0px 0px' }}>
            {/* Shadow cast onto underlying ray bases */}
            <circle r={rRim + 2} fill="none" stroke="rgba(40, 20, 5, 0.45)" strokeWidth="5" filter="blur(2px)" />

            {/* Outer Torus Ring */}
            <circle r={rRim} fill="none" stroke={`url(#${rimTorusGradId})`} strokeWidth="9" />
            <circle r={rRim + 4.5} fill="none" stroke="#663C0B" strokeWidth="1.4" />
            <circle r={rRim - 4.5} fill="none" stroke="#462404" strokeWidth="1.4" />

            {/* Inner Fine Step Bevel */}
            <circle r={rRim - 8} fill="none" stroke={`url(#${rimTorusGradId})`} strokeWidth="3" />
            <circle r={rRim - 10} fill="none" stroke="#361A02" strokeWidth="1.2" />
          </g>

          {/* Central Hammered Gold Sphere Disc */}
          <g
            id={`sun-center-disc-${uid}`}
            className={animate ? `sun-shimmer-${uid}` : ''}
            style={{ transform: `scale(${discScale})`, transformOrigin: '0px 0px' }}
          >
            {/* Base Textured Sphere */}
            <circle r={rInner} fill={`url(#${discRadialId})`} filter={`url(#${hammeredFilterId})`} />

            {/* Organic Mottled Depth Overlay */}
            <circle r={rInner} fill={`url(#${discMottleId})`} style={{ mixBlendMode: 'soft-light' }} />

            {/* Inner Bevel Highlight Hairline */}
            <circle r={rInner - 1} fill="none" stroke="rgba(255, 240, 185, 0.6)" strokeWidth="1.5" />

            {/* Luminous Center Bindu / Corona Core */}
            <circle r={14} fill="#FFFBE6" opacity={0.45} filter="blur(5px)" />
          </g>
        </g>
      </svg>
    </div>
  )
}
