import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function CustomCursor() {
  const prefersReduced = useReducedMotion()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  const [cursorLabel, setCursorLabel] = useState('')
  const [isInteractive, setIsInteractive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Detect touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)

      // Direct transform on dot for zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }

      // Check hovered element for data-cursor context label
      const target = (e.target as HTMLElement)?.closest('[data-cursor], button, a, .tilt-card-item')
      if (target) {
        const label = target.getAttribute('data-cursor') || ''
        setCursorLabel(label)
        setIsInteractive(true)
      } else {
        setCursorLabel('')
        setIsInteractive(false)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    // Single rAF loop for smooth trailing ring
    const render = () => {
      // Lerp ring toward mouse
      const ease = 0.18
      ringX += (mouseX - ringX) * ease
      ringY += (mouseY - ringY) * ease

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }

      rafId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [isVisible, prefersReduced])

  if (isTouch || prefersReduced) return null

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[var(--gold)] will-change-transform"
        style={{
          boxShadow: '0 0 10px rgba(184, 137, 43, 0.6)',
        }}
      />

      {/* Trailing Outer Ring with Capsule Expansion & Context Label */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-[var(--gold)] flex items-center justify-center transition-all duration-300 will-change-transform ${
          isInteractive
            ? 'w-20 h-10 -ml-10 -mt-5 bg-[var(--surface)]/80 backdrop-blur-md shadow-lg border-[var(--gold)]/80'
            : 'w-9 h-9 -ml-[18px] -mt-[18px] border-[var(--gold)]/40 bg-transparent'
        }`}
        style={{
          mixBlendMode: cursorLabel ? 'normal' : 'difference',
        }}
      >
        {cursorLabel && (
          <span
            ref={labelRef}
            className="text-[10px] font-[var(--font-marginalia)] uppercase font-bold tracking-widest text-[var(--gold)] select-none animate-fade-in"
          >
            {cursorLabel}
          </span>
        )}
      </div>
    </div>
  )
}
