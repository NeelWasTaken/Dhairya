import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  size: number
  color: string
}

export default function ResilientParticleText({
  text = "तरति शोकमात्मवित्",
  subtitle = "Chāndogya 7.1.3 • 'The Knower of the Self Crosses Over Sorrow'"
}: {
  text?: string
  subtitle?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReduced = useReducedMotion()
  const [isScattered, setIsScattered] = useState(false)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 90 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    // Render offscreen text to generate particle grid
    const initParticles = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      canvas.width = width
      canvas.height = height

      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, width, height)

      // Measure font
      const fontSize = Math.min(width / (text.length * 0.7), 64)
      ctx.font = `bold ${fontSize}px 'Tiro Devanagari Sanskrit', serif`
      ctx.fillStyle = '#FFFFFF'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, width / 2, height / 2)

      const imgData = ctx.getImageData(0, 0, width, height)
      ctx.clearRect(0, 0, width, height)

      const particles: Particle[] = []
      const step = 4 // Sampling gap

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4
          if (imgData.data[index] > 180) {
            particles.push({
              x: x + (Math.random() - 0.5) * 10,
              y: y + (Math.random() - 0.5) * 10,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              size: Math.random() * 2 + 1.2,
              color: Math.random() > 0.3 ? '#B8301C' : '#E07A1F',
            })
          }
        }
      }
      particlesRef.current = particles
    }

    initParticles()

    // Physics Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let disturbedCount = 0

      const particles = particlesRef.current
      const mouse = mouseRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Vector from mouse to particle
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)

        // Mouse repulsion
        if (dist < mouse.radius) {
          disturbedCount++
          const force = (mouse.radius - dist) / mouse.radius
          const angle = Math.atan2(dy, dx)
          p.vx += Math.cos(angle) * force * 7
          p.vy += Math.sin(angle) * force * 7
        }

        // Return force (Hooke's spring law)
        const homeDx = p.originX - p.x
        const homeDy = p.originY - p.y
        p.vx += homeDx * 0.08
        p.vy += homeDy * 0.08

        // Friction dampening
        p.vx *= 0.82
        p.vy *= 0.82

        p.x += p.vx
        p.y += p.vy

        // Draw particle
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      setIsScattered(disturbedCount > 25)
      animationFrameId = requestAnimationFrame(render)
    }

    if (!prefersReduced) {
      render()
    } else {
      ctx.font = "bold 36px 'Tiro Devanagari Sanskrit', serif"
      ctx.fillStyle = "#B8301C"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(text, canvas.width / 2, canvas.height / 2)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current.x = e.touches[0].clientX - rect.left
        mouseRef.current.y = e.touches[0].clientY - rect.top
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', initParticles)

    return () => {
      cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', initParticles)
    }
  }, [text, prefersReduced])

  return (
    <div className="my-12 p-6 md:p-8 rounded-xl bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold">
          Playable Metaphor • Resilient Particle Physics
        </span>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--bg-alt)] text-[var(--ink-soft)] font-mono">
          {isScattered ? '⚡ Perturbed (Scattering...)' : '✦ Unbroken (In Balance)'}
        </span>
      </div>

      <div className="relative w-full h-40 md:h-48 rounded-lg bg-[var(--bg)] border border-[var(--border-hairline)] overflow-hidden cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <p className="text-sm font-semibold text-[var(--ink)] mt-3">
        {subtitle}
      </p>
      <p className="text-xs italic text-[var(--saffron)] mt-1 font-[var(--font-marginalia)]">
        "Scattered by storms, yet it magnetically returns to form." Hover or drag your finger across the script.
      </p>
    </div>
  )
}
