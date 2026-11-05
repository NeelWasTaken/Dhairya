import { useEffect, useRef } from 'react'

interface MistyBackgroundCanvasProps {
  /** Warmth level [0..1]: 0 = morning dawn gold & saffron, 1 = blazing high-noon solar radiance */
  warmth?: number
  /** Ripple wave [0..1] radiating from circle center */
  rippleProgress?: number
  rippleCenter?: { x: number; y: number }
  /** Soft frosted blur amount in pixels */
  blurAmount?: number
}

interface Particle {
  x: number
  y: number
  radius: number
  speedY: number
  swaySpeed: number
  swayOffset: number
  alpha: number
  baseAlpha: number
}

export default function MistyBackgroundCanvas({
  warmth = 0,
  rippleProgress = 0,
  rippleCenter = { x: 0.5, y: 0.5 },
  blurAmount = 14,
}: MistyBackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Pre-generate 45 floating golden sun-pollen particles
    const particleCount = 45
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = 0.25 + Math.random() * 0.55
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1.2 + Math.random() * 2.8,
        speedY: 0.25 + Math.random() * 0.65,
        swaySpeed: 0.8 + Math.random() * 1.4,
        swayOffset: Math.random() * Math.PI * 2,
        alpha: baseAlpha,
        baseAlpha,
      })
    }

    // Pre-generate subtle crystalline scratches / glass hairlines
    const scratchCount = 20
    const scratches: Array<{ x1: number; y1: number; x2: number; y2: number; alpha: number }> = []
    for (let i = 0; i < scratchCount; i++) {
      scratches.push({
        x1: Math.random(),
        y1: Math.random(),
        x2: Math.random() * 0.12 + (Math.random() - 0.06),
        y2: Math.random() * 0.12 + (Math.random() - 0.06),
        alpha: 0.06 + Math.random() * 0.12,
      })
    }

    let time = 0

    const render = () => {
      time += 0.009
      const w = Math.max(0, Math.min(1, warmth))

      // Coordinates for Sun & Sunflower composition
      const isMobile = width < 640
      const sunX = width * 0.5
      const sunY = isMobile ? height * 0.42 : height * 0.43
      const sunBaseR = Math.min(width, height) * (isMobile ? 0.22 : 0.155)

      // Sunflower sits gracefully in the lower realm, intertwined with the solar aura
      const flowerX = width * 0.5
      const flowerY = isMobile ? height * 0.58 : height * 0.64
      const flowerBaseR = Math.min(width, height) * (isMobile ? 0.18 : 0.13)

      // -------------------------------------------------------------
      // 1. RICH CELESTIAL DAWN SKY GRADIENT
      // -------------------------------------------------------------
      // Deep plum & midnight indigo at the far edges, rising into glorious
      // solar saffron, marigold amber, and luminous core gold.
      const skyGrad = ctx.createRadialGradient(
        sunX,
        sunY,
        sunBaseR * 0.2,
        sunX,
        sunY,
        Math.max(width, height) * 0.95
      )

      // Dynamic color interpolation based on warmth
      skyGrad.addColorStop(0, '#FFFBE8') // Radiant solar core
      skyGrad.addColorStop(0.12, w > 0.5 ? '#FFE082' : '#FFD54F') // Solar gold
      skyGrad.addColorStop(0.26, w > 0.5 ? '#FF9800' : '#FFA726') // Radiant marigold amber
      skyGrad.addColorStop(0.42, w > 0.5 ? '#E65100' : '#D84315') // Warm saffron crimson
      skyGrad.addColorStop(0.62, '#880E4F') // Sunrise magenta-plum
      skyGrad.addColorStop(0.82, '#311242') // Celestial deep purple
      skyGrad.addColorStop(1, '#11081F') // Midnight indigo threshold

      ctx.fillStyle = skyGrad
      ctx.fillRect(0, 0, width, height)

      // -------------------------------------------------------------
      // 2. VOLUMETRIC SUNBEAMS / GOD RAYS
      // -------------------------------------------------------------
      // Radiating light beams reaching across the canvas
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      const rayCount = 18
      const maxRayDist = Math.max(width, height) * 1.1
      for (let i = 0; i < rayCount; i++) {
        const baseAngle = (i * Math.PI * 2) / rayCount + time * 0.03
        const spread = (Math.PI / rayCount) * (0.6 + 0.3 * Math.sin(time * 0.7 + i))
        const rayAlpha = (0.09 + 0.06 * Math.sin(time * 1.1 + i * 2)) * (0.8 + w * 0.4)

        const rayGrad = ctx.createRadialGradient(sunX, sunY, sunBaseR * 0.5, sunX, sunY, maxRayDist)
        rayGrad.addColorStop(
          0,
          i % 2 === 0 ? `rgba(255, 230, 140, ${rayAlpha * 1.5})` : `rgba(255, 170, 60, ${rayAlpha})`
        )
        rayGrad.addColorStop(
          0.5,
          i % 2 === 0 ? `rgba(255, 200, 90, ${rayAlpha * 0.8})` : `rgba(255, 140, 40, ${rayAlpha * 0.5})`
        )
        rayGrad.addColorStop(1, 'transparent')

        ctx.fillStyle = rayGrad
        ctx.beginPath()
        ctx.moveTo(sunX, sunY)
        ctx.arc(sunX, sunY, maxRayDist, baseAngle - spread * 0.5, baseAngle + spread * 0.5)
        ctx.closePath()
        ctx.fill()
      }
      ctx.restore()

      // -------------------------------------------------------------
      // 3. THE RADIANT SUN (Procedural homage to sun.png)
      // -------------------------------------------------------------
      ctx.save()
      // Outer Solar Corona Halos
      const coronaGrad = ctx.createRadialGradient(sunX, sunY, sunBaseR * 0.7, sunX, sunY, sunBaseR * 2.6)
      coronaGrad.addColorStop(0, `rgba(255, 240, 180, ${0.45 + 0.1 * Math.sin(time * 1.4)})`)
      coronaGrad.addColorStop(0.4, `rgba(255, 170, 50, ${0.28 + 0.08 * Math.cos(time * 1.2)})`)
      coronaGrad.addColorStop(0.8, 'rgba(230, 80, 20, 0.12)')
      coronaGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = coronaGrad
      ctx.beginPath()
      ctx.arc(sunX, sunY, sunBaseR * 2.6, 0, Math.PI * 2)
      ctx.fill()

      // 16 S-Curved Serpentine Golden Rays
      const sunRays = 16
      const rotBase = time * 0.06
      for (let i = 0; i < sunRays; i++) {
        const isLong = i % 2 === 0
        const isCardinal = i % 4 === 0
        const rayLen = isCardinal
          ? sunBaseR * 2.35
          : isLong
          ? sunBaseR * 2.1
          : sunBaseR * 1.65
        const rayAngle = (i * Math.PI * 2) / sunRays + rotBase
        const baseW = isLong ? 26 : 20

        const dir = i % 2 === 0 ? 1 : -1
        const sway = Math.sin(time * 1.3 + i) * 6 * dir

        ctx.save()
        ctx.translate(sunX, sunY)
        ctx.rotate(rayAngle)

        // S-curve ray path
        ctx.beginPath()
        ctx.moveTo(-baseW * 0.5, -sunBaseR * 0.95)
        ctx.bezierCurveTo(
          -baseW * 0.4 + sway,
          -sunBaseR - (rayLen - sunBaseR) * 0.35,
          -baseW * 0.2 - sway * 0.8,
          -sunBaseR - (rayLen - sunBaseR) * 0.7,
          0,
          -rayLen
        )
        ctx.bezierCurveTo(
          baseW * 0.2 - sway * 0.8,
          -sunBaseR - (rayLen - sunBaseR) * 0.7,
          baseW * 0.4 + sway,
          -sunBaseR - (rayLen - sunBaseR) * 0.35,
          baseW * 0.5,
          -sunBaseR * 0.95
        )
        ctx.closePath()

        // Rich Gold Gradient for ray body
        const rGrad = ctx.createLinearGradient(0, -sunBaseR, 0, -rayLen)
        rGrad.addColorStop(0, '#FFD54F')
        rGrad.addColorStop(0.4, '#FFA000')
        rGrad.addColorStop(0.85, '#E65100')
        rGrad.addColorStop(1, '#FFE082')
        ctx.fillStyle = rGrad
        ctx.fill()

        // Ray central ridge highlight
        ctx.strokeStyle = 'rgba(255, 250, 220, 0.65)'
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.moveTo(0, -sunBaseR)
        ctx.bezierCurveTo(
          sway * 0.5,
          -sunBaseR - (rayLen - sunBaseR) * 0.4,
          -sway * 0.4,
          -sunBaseR - (rayLen - sunBaseR) * 0.75,
          0,
          -rayLen * 0.96
        )
        ctx.stroke()

        ctx.restore()
      }

      // Sun Disc Rim (Embossed Torus)
      ctx.lineWidth = 7
      ctx.strokeStyle = '#B26A00'
      ctx.beginPath()
      ctx.arc(sunX, sunY, sunBaseR, 0, Math.PI * 2)
      ctx.stroke()

      ctx.lineWidth = 2.5
      ctx.strokeStyle = '#FFE082'
      ctx.beginPath()
      ctx.arc(sunX, sunY, sunBaseR + 3, 0, Math.PI * 2)
      ctx.stroke()

      // Center Hammered Gold Solar Disc
      const discGrad = ctx.createRadialGradient(
        sunX - sunBaseR * 0.25,
        sunY - sunBaseR * 0.25,
        sunBaseR * 0.1,
        sunX,
        sunY,
        sunBaseR
      )
      discGrad.addColorStop(0, '#FFF8E1')
      discGrad.addColorStop(0.35, '#FFCA28')
      discGrad.addColorStop(0.7, '#F57C00')
      discGrad.addColorStop(1, '#8D3C08')
      ctx.fillStyle = discGrad
      ctx.beginPath()
      ctx.arc(sunX, sunY, sunBaseR * 0.94, 0, Math.PI * 2)
      ctx.fill()

      // Core bindu highlight
      const binduGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunBaseR * 0.35)
      binduGrad.addColorStop(0, 'rgba(255, 255, 255, 0.75)')
      binduGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = binduGrad
      ctx.beginPath()
      ctx.arc(sunX, sunY, sunBaseR * 0.35, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // -------------------------------------------------------------
      // 4. THE BLOOMING SUNFLOWER (Golden Petals, Terracotta Core & Botanical Leaves)
      // -------------------------------------------------------------
      ctx.save()
      // A. Lush Botanical Emerald Leaves & Foliage (Framing the lower foundation)
      const leafCount = 8
      for (let i = 0; i < leafCount; i++) {
        const lAngle = Math.PI * 0.2 + (i * Math.PI * 0.6) / (leafCount - 1)
        const leafLen = flowerBaseR * 2.3
        const lx = flowerX + Math.cos(lAngle) * flowerBaseR * 0.9
        const ly = flowerY + Math.sin(lAngle) * flowerBaseR * 0.9

        ctx.save()
        ctx.translate(lx, ly)
        ctx.rotate(lAngle + Math.PI / 2)

        const leafGrad = ctx.createLinearGradient(0, 0, 0, leafLen)
        leafGrad.addColorStop(0, '#1B5E20')
        leafGrad.addColorStop(0.4, '#2E7D32')
        leafGrad.addColorStop(0.8, '#43A047')
        leafGrad.addColorStop(1, '#81C784')

        ctx.fillStyle = leafGrad
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.bezierCurveTo(-30, leafLen * 0.35, -24, leafLen * 0.75, 0, leafLen)
        ctx.bezierCurveTo(24, leafLen * 0.75, 30, leafLen * 0.35, 0, 0)
        ctx.closePath()
        ctx.fill()

        // Leaf central spine
        ctx.strokeStyle = 'rgba(200, 255, 210, 0.5)'
        ctx.lineWidth = 1.8
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, leafLen * 0.92)
        ctx.stroke()

        ctx.restore()
      }

      // B. 32 Golden Sunflower Petals (Two lush staggered tiers)
      const petalTiers = [
        { count: 16, offsetDeg: 0, lenMult: 1.85, widthMult: 34, isBack: true },
        { count: 16, offsetDeg: 11.25, lenMult: 1.72, widthMult: 32, isBack: false },
      ]

      for (const tier of petalTiers) {
        for (let i = 0; i < tier.count; i++) {
          const angleDeg = (i * 360) / tier.count + tier.offsetDeg + Math.sin(time * 0.6 + i) * 1.5
          const angleRad = (angleDeg * Math.PI) / 180
          const petalLen = flowerBaseR * tier.lenMult
          const pWidth = tier.widthMult

          ctx.save()
          ctx.translate(flowerX, flowerY)
          ctx.rotate(angleRad)

          // Petal tear-drop silhouette
          ctx.beginPath()
          ctx.moveTo(-pWidth * 0.35, -flowerBaseR * 0.88)
          ctx.bezierCurveTo(
            -pWidth * 0.55,
            -flowerBaseR - petalLen * 0.35,
            -pWidth * 0.3,
            -flowerBaseR - petalLen * 0.75,
            0,
            -flowerBaseR - petalLen
          )
          ctx.bezierCurveTo(
            pWidth * 0.3,
            -flowerBaseR - petalLen * 0.75,
            pWidth * 0.55,
            -flowerBaseR - petalLen * 0.35,
            pWidth * 0.35,
            -flowerBaseR * 0.88
          )
          ctx.closePath()

          const pGrad = ctx.createLinearGradient(0, -flowerBaseR * 0.88, 0, -flowerBaseR - petalLen)
          if (tier.isBack) {
            pGrad.addColorStop(0, '#E65100') // Deeper amber base for shadow
            pGrad.addColorStop(0.45, '#FFA000')
            pGrad.addColorStop(0.85, '#FFCA28')
            pGrad.addColorStop(1, '#FFF59D')
          } else {
            pGrad.addColorStop(0, '#F57C00')
            pGrad.addColorStop(0.35, '#FFB300')
            pGrad.addColorStop(0.8, '#FFD54F')
            pGrad.addColorStop(1, '#FFFDE7')
          }

          ctx.fillStyle = pGrad
          ctx.fill()

          // Petal delicate central vein
          ctx.strokeStyle = tier.isBack ? 'rgba(255, 235, 150, 0.4)' : 'rgba(255, 255, 210, 0.7)'
          ctx.lineWidth = 1.3
          ctx.beginPath()
          ctx.moveTo(0, -flowerBaseR * 0.88)
          ctx.lineTo(0, -flowerBaseR - petalLen * 0.94)
          ctx.stroke()

          ctx.restore()
        }
      }

      // C. Sunflower Center Seed Head (Phyllotaxis Golden Spiral Pattern)
      const seedCount = 140
      const goldenAngle = 137.507764 * (Math.PI / 180)
      const maxSeedR = flowerBaseR * 0.88
      const cSeed = maxSeedR / Math.sqrt(seedCount)

      // Base seed bed disc
      const seedBedGrad = ctx.createRadialGradient(flowerX, flowerY, 0, flowerX, flowerY, maxSeedR)
      seedBedGrad.addColorStop(0, '#6D4C41')
      seedBedGrad.addColorStop(0.6, '#4E342E')
      seedBedGrad.addColorStop(1, '#27150C')
      ctx.fillStyle = seedBedGrad
      ctx.beginPath()
      ctx.arc(flowerX, flowerY, maxSeedR, 0, Math.PI * 2)
      ctx.fill()

      // Golden phyllotaxis seeds
      for (let i = 0; i < seedCount; i++) {
        const sr = cSeed * Math.sqrt(i)
        const stheta = i * goldenAngle + time * 0.05
        const sx = flowerX + sr * Math.cos(stheta)
        const sy = flowerY + sr * Math.sin(stheta)
        const sSize = 1.6 + (sr / maxSeedR) * 2.2

        const sGrad = ctx.createRadialGradient(sx - 0.5, sy - 0.5, 0.2, sx, sy, sSize)
        sGrad.addColorStop(0, '#FFD54F')
        sGrad.addColorStop(0.4, '#D87D2A')
        sGrad.addColorStop(0.85, '#6D3310')
        sGrad.addColorStop(1, '#27150C')

        ctx.fillStyle = sGrad
        ctx.beginPath()
        ctx.arc(sx, sy, sSize, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      // -------------------------------------------------------------
      // 5. FLOATING GOLDEN SUN POLLEN & DUST EMBERS
      // -------------------------------------------------------------
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      for (const p of particles) {
        p.y -= p.speedY
        p.x += Math.sin(time * p.swaySpeed + p.swayOffset) * 0.55

        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }

        const pPulse = 0.7 + 0.3 * Math.sin(time * 2 + p.swayOffset)
        const currentAlpha = p.baseAlpha * pPulse

        const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5)
        pGrad.addColorStop(0, `rgba(255, 255, 230, ${currentAlpha})`)
        pGrad.addColorStop(0.5, `rgba(255, 215, 90, ${currentAlpha * 0.6})`)
        pGrad.addColorStop(1, 'transparent')

        ctx.fillStyle = pGrad
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      // -------------------------------------------------------------
      // 6. FROSTED GLASS CAUSTICS & TRANSLUCENT SCRATCHES
      // -------------------------------------------------------------
      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      const causticCount = 6
      for (let i = 0; i < causticCount; i++) {
        const cx = width * (0.35 + 0.3 * Math.sin(time * 0.4 + i))
        const cy = height * (0.4 + 0.3 * Math.cos(time * 0.35 + i * 1.4))
        const rad = Math.min(width, height) * (0.32 + 0.12 * Math.sin(time * 0.8 + i))

        const cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad)
        const alpha = 0.08 + 0.03 * Math.sin(time * 1.1 + i)
        cGrad.addColorStop(0, `rgba(255, 250, 220, ${alpha})`)
        cGrad.addColorStop(0.6, `rgba(255, 225, 160, ${alpha * 0.4})`)
        cGrad.addColorStop(1, 'transparent')

        ctx.fillStyle = cGrad
        ctx.beginPath()
        ctx.arc(cx, cy, rad, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      // Subtle ice/glass scratches catching golden highlights
      ctx.save()
      ctx.strokeStyle = 'rgba(255, 245, 210, 0.09)'
      ctx.lineWidth = 1.1
      for (const s of scratches) {
        ctx.beginPath()
        ctx.moveTo(s.x1 * width, s.y1 * height)
        ctx.lineTo((s.x1 + s.x2) * width, (s.y1 + s.y2) * height)
        ctx.stroke()
      }
      ctx.restore()

      // -------------------------------------------------------------
      // 7. WATER RIPPLE DISPLACEMENT WAVE (When circle completes)
      // -------------------------------------------------------------
      if (rippleProgress > 0 && rippleProgress < 1) {
        ctx.save()
        const rx = rippleCenter.x * width
        const ry = rippleCenter.y * height
        const maxR = Math.max(width, height) * 0.85
        const rCurrent = rippleProgress * maxR
        const rAlpha = (1 - rippleProgress) * 0.65

        ctx.strokeStyle = `rgba(255, 255, 255, ${rAlpha})`
        ctx.lineWidth = 3.5 * (1 - rippleProgress)
        ctx.beginPath()
        ctx.arc(rx, ry, rCurrent, 0, Math.PI * 2)
        ctx.stroke()

        if (rCurrent > 30) {
          ctx.strokeStyle = `rgba(255, 235, 170, ${rAlpha * 0.6})`
          ctx.lineWidth = 1.8
          ctx.beginPath()
          ctx.arc(rx, ry, Math.max(0, rCurrent - 28), 0, Math.PI * 2)
          ctx.stroke()
        }
        ctx.restore()
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [warmth, rippleProgress, rippleCenter])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      style={{
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
        transform: 'scale(1.05)', // Prevent edge blur vignette bleeding
        transition: 'filter 0.6s ease-out',
      }}
    />
  )
}
