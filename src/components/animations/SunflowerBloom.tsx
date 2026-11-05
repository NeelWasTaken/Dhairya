import { useEffect, useRef, useMemo } from 'react'

export interface SunflowerBloomProps {
  progress?: number // 0 to 1
  scale?: number
  rotation?: number
  size?: number
  liteMode?: boolean
}

export default function SunflowerBloom({
  progress = 1.0,
  scale = 1.0,
  rotation = 0,
  size = 560,
  liteMode = false,
}: SunflowerBloomProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const seedCount = liteMode ? 160 : 420
  const maxRadius = 78
  const cx = size / 2
  const cy = size / 2

  // Render phyllotaxis seeds on 2D canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, size, size)

    const goldenAngle = 137.507764 * (Math.PI / 180)
    const currentSeeds = Math.floor(seedCount * Math.min(progress * 1.4, 1.0))
    const c = maxRadius / Math.sqrt(seedCount)

    for (let i = 0; i < currentSeeds; i++) {
      const r = c * Math.sqrt(i)
      const theta = i * goldenAngle + (rotation * Math.PI) / 180
      const x = cx + r * Math.cos(theta)
      const y = cy + r * Math.sin(theta)
      const seedSize = 1.8 + (r / maxRadius) * 2.2

      const grad = ctx.createRadialGradient(
        x - seedSize * 0.35,
        y - seedSize * 0.35,
        0.5,
        x,
        y,
        seedSize
      )
      grad.addColorStop(0, '#F5A623')
      grad.addColorStop(0.35, '#995213')
      grad.addColorStop(0.85, '#4A2C12')
      grad.addColorStop(1, '#2B1607')

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(x, y, seedSize, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [progress, rotation, size, seedCount, maxRadius, cx, cy])

  // 32 Petals: 16 Front layer + 16 Back layer offset by 11.25 deg
  const petals = useMemo(() => {
    const front = []
    const back = []
    const petalLen = 175
    const baseW = 28
    const midW = 34

    // Single petal path template pointing UP (0,0 is center)
    // From y = -maxRadius down to y = -petalLen
    const r0 = maxRadius
    const p0 = { x: -baseW / 2, y: -r0 }
    const q0 = { x: baseW / 2, y: -r0 }
    const h = petalLen - r0

    const p1 = { x: -midW / 2, y: -r0 - h * 0.45 }
    const p2 = { x: -midW * 0.3, y: -r0 - h * 0.82 }
    const tip = { x: 0, y: -petalLen }

    const q1 = { x: midW / 2, y: -r0 - h * 0.45 }
    const q2 = { x: midW * 0.3, y: -r0 - h * 0.82 }

    const petalPath = `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${tip.x} ${tip.y} C ${q2.x} ${q2.y}, ${q1.x} ${q1.y}, ${q0.x} ${q0.y} Z`
    const veinPath = `M 0 ${-r0} L 0 ${-petalLen * 0.95}`

    for (let i = 0; i < 16; i++) {
      front.push({
        id: `f-${i}`,
        angle: i * 22.5,
        path: petalPath,
        vein: veinPath,
      })
      back.push({
        id: `b-${i}`,
        angle: i * 22.5 + 11.25,
        path: petalPath,
        vein: veinPath,
      })
    }
    return { front, back }
  }, [maxRadius])

  // Petal unfold factor based on progress (0 to 1)
  const petalScale = Math.min(Math.max((progress - 0.15) * 1.35, 0), 1.0)
  const petalOpenAngle = (1 - petalScale) * 15

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="absolute inset-0 overflow-visible"
      >
        <defs>
          <linearGradient id="frontPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#C97A14" />
            <stop offset="25%" stopColor="#EFA41C" />
            <stop offset="65%" stopColor="#F5BA28" />
            <stop offset="100%" stopColor="#FDE37B" />
          </linearGradient>

          <linearGradient id="backPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#A85E0E" />
            <stop offset="35%" stopColor="#D98A16" />
            <stop offset="85%" stopColor="#EFA41C" />
            <stop offset="100%" stopColor="#F8C74D" />
          </linearGradient>

          <radialGradient id="centerRimShade" cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(40, 20, 5, 0.45)" />
          </radialGradient>
        </defs>

        <g transform={`translate(${cx}, ${cy})`}>
          {/* Back Layer of 16 Petals */}
          <g id="back-petals" opacity={petalScale}>
            {petals.back.map((p) => (
              <g
                key={p.id}
                transform={`rotate(${p.angle}) scale(${petalScale * 0.95}) rotate(${petalOpenAngle})`}
                style={{ transformOrigin: '0px 0px', transition: 'transform 0.2s ease-out' }}
              >
                <path
                  d={p.path}
                  fill="url(#backPetalGrad)"
                  stroke="#7A420B"
                  strokeWidth="1.2"
                />
              </g>
            ))}
          </g>

          {/* Front Layer of 16 Petals */}
          <g id="front-petals" opacity={petalScale}>
            {petals.front.map((p) => (
              <g
                key={p.id}
                transform={`rotate(${p.angle}) scale(${petalScale})`}
                style={{ transformOrigin: '0px 0px', transition: 'transform 0.2s ease-out' }}
              >
                <path
                  d={p.path}
                  fill="url(#frontPetalGrad)"
                  stroke="#8B4D0D"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                {/* Petal Central Spine Vein */}
                <path
                  d={p.vein}
                  stroke="rgba(255, 235, 160, 0.55)"
                  strokeWidth="1.0"
                  strokeLinecap="round"
                />
              </g>
            ))}
          </g>

          {/* Center Collar Shadow Ring */}
          <circle r={maxRadius + 2} fill="url(#centerRimShade)" />
          <circle r={maxRadius} fill="none" stroke="#5E3108" strokeWidth="2.5" />
        </g>
      </svg>

      {/* 2D Canvas Phyllotaxis Seed Center */}
      <canvas
        ref={canvasRef}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
