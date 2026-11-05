import { useRef, useEffect } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface SanskritMarqueeProps {
  className?: string
}

const TERMS = [
  { sanskrit: 'अभय', iast: 'abhaya', en: 'fearlessness' },
  { sanskrit: 'तितिक्षा', iast: 'titikṣā', en: 'endurance' },
  { sanskrit: 'विवेक', iast: 'viveka', en: 'discernment' },
  { sanskrit: 'धैर्य', iast: 'dhairya', en: 'fortitude' },
  { sanskrit: 'वैराग्य', iast: 'vairāgya', en: 'non-clinging' },
  { sanskrit: 'समाधान', iast: 'samādhāna', en: 'equanimity' },
  { sanskrit: 'उपशम', iast: 'upaśama', en: 'tranquility' },
  { sanskrit: 'आत्मन्', iast: 'ātman', en: 'the witness' },
]

export default function SanskritMarquee({ className = '' }: SanskritMarqueeProps) {
  const prefersReduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReduced) return

    let currentPos = 0
    let lastScrollY = window.scrollY
    let velocity = 1
    let rafId: number

    const handleScroll = () => {
      const scrollY = window.scrollY
      const delta = scrollY - lastScrollY
      lastScrollY = scrollY

      // Velocity multiplier and directional reversal
      if (Math.abs(delta) > 0.5) {
        velocity = delta > 0 ? 1 + Math.min(Math.abs(delta) * 0.12, 6) : -(1 + Math.min(Math.abs(delta) * 0.12, 6))
      }
    }

    const animate = () => {
      // Ease velocity back toward base speed of 1
      const targetSpeed = velocity >= 0 ? 1 : -1
      velocity += (targetSpeed - velocity) * 0.05

      currentPos += velocity * 1.2
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-currentPos}px, 0, 0)`
      }

      // Loop around seamlessly
      if (currentPos > 2400) currentPos -= 2400
      if (currentPos < 0) currentPos += 2400

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [prefersReduced])

  const repeatedTerms = [...TERMS, ...TERMS, ...TERMS, ...TERMS]

  return (
    <div
      className={`w-full overflow-hidden py-6 border-y border-[var(--border-hairline)] bg-[var(--surface-sunken)]/60 backdrop-blur-sm select-none ${className}`}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="inline-flex items-center gap-12 whitespace-nowrap will-change-transform"
      >
        {repeatedTerms.map((t, i) => (
          <div key={i} className="inline-flex items-center gap-3">
            <span className="sanskrit text-xl sm:text-2xl text-[var(--gold)] font-serif font-bold">
              {t.sanskrit}
            </span>
            <span className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-[var(--font-marginalia)] font-bold">
              {t.iast}
            </span>
            <span className="text-[11px] text-[var(--text-muted)] italic font-serif">
              ({t.en})
            </span>
            <span className="text-[var(--gold)] opacity-40 ml-4">✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
