import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface TrailDot {
  id: number
  x: number
  y: number
}

export default function EmberCursor() {
  const prefersReduced = useReducedMotion()
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState<TrailDot[]>([])
  const [isFinePointer, setIsFinePointer] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      setIsFinePointer(true)
    }
  }, [])

  useEffect(() => {
    if (prefersReduced || !isFinePointer) return

    let counter = 0
    let lastTime = 0
    let rafId: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX
      const clientY = e.clientY

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setPos({ x: clientX, y: clientY })
          rafId = null
        })
      }

      const now = performance.now()
      if (now - lastTime < 50) return
      lastTime = now

      counter++
      const newDot: TrailDot = {
        id: counter,
        x: clientX,
        y: clientY,
      }

      setTrail((prev) => [...prev.slice(-6), newDot])
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [prefersReduced, isFinePointer])

  // Fade out trail dots
  useEffect(() => {
    if (trail.length === 0) return
    const timer = setTimeout(() => {
      setTrail((prev) => prev.slice(1))
    }, 90)
    return () => clearTimeout(timer)
  }, [trail])

  if (prefersReduced || !isFinePointer) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9990] overflow-hidden" aria-hidden="true">
      {/* Soft Gold Glow Dot following cursor */}
      <div
        className="fixed w-4 h-4 rounded-full bg-[var(--gold)]/40 blur-[2px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out shadow-[0_0_12px_rgba(201,162,58,0.5)]"
        style={{ left: pos.x, top: pos.y }}
      />

      {/* Trailing golden embers */}
      {trail.map((dot, index) => {
        const opacity = (index + 1) / trail.length
        return (
          <div
            key={dot.id}
            className="fixed rounded-full bg-[var(--gold)]/30 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: dot.x,
              top: dot.y,
              width: 3,
              height: 3,
              opacity: opacity * 0.4,
              boxShadow: '0 0 6px rgba(201,162,58,0.3)',
            }}
          />
        )
      })}
    </div>
  )
}
