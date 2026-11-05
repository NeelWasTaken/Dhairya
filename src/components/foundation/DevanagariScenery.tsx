import { useRef, useEffect, useState } from 'react'

interface DevanagariSceneryProps {
  glyph: 'dhi' | 'mrityu' | 'tat' | 'om'
  caption?: string
  subtitle?: string
}

export default function DevanagariScenery({ glyph, caption, subtitle }: DevanagariSceneryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Compute parallax factor
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height)
        setOffsetY((progress - 0.5) * 80) // Smooth +/- 40px translation
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const glyphConfig = {
    dhi: {
      char: 'धी',
      label: 'Dhī',
      meaning: 'Contemplative Discernment & The Ground of Resilience',
      doorway: false,
    },
    mrityu: {
      char: 'मृत्यु',
      label: 'Mṛtyu',
      meaning: 'Death as the Great Teacher • The Threshold Portal',
      doorway: true, // Counter acts as a doorway
    },
    tat: {
      char: 'तत्',
      label: 'Tat',
      meaning: 'That • Undifferentiated Non-dual Ground',
      doorway: false,
    },
    om: {
      char: 'ॐ',
      label: 'Om',
      meaning: 'The Whole Horizon of Sound & The Silence Beyond',
      doorway: false,
    },
  }[glyph]

  return (
    <div
      ref={containerRef}
      className="relative my-20 md:my-32 w-full min-h-[380px] md:min-h-[520px] flex items-center justify-center overflow-hidden select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* 1. Deep Background Architectural Layer (Slower Parallax) */}
      <div
        className="absolute inset-0 flex items-center justify-center will-change-transform opacity-15"
        style={{
          transform: `translate3d(0, ${offsetY * 0.4}px, 0) scale(1.1)`,
        }}
      >
        <span
          className="sanskrit font-bold text-center block text-transparent"
          style={{
            fontSize: 'clamp(14rem, 36vw, 28rem)',
            WebkitTextStroke: '2px var(--gold)',
            filter: 'drop-shadow(0 0 45px rgba(212, 175, 55, 0.25))',
            lineHeight: 1,
          }}
        >
          {glyphConfig.char}
        </span>
      </div>

      {/* 2. Middle Gateway Layer (In front of background, behind foreground text) */}
      <div
        className="absolute inset-0 flex items-center justify-center will-change-transform opacity-25"
        style={{
          transform: `translate3d(0, ${offsetY * 0.8}px, 0)`,
        }}
      >
        <span
          className="sanskrit font-bold text-center block"
          style={{
            fontSize: 'clamp(12rem, 32vw, 24rem)',
            color: 'rgba(212, 175, 55, 0.08)',
            textShadow: '0 0 50px rgba(212, 175, 55, 0.3)',
            lineHeight: 1,
          }}
        >
          {glyphConfig.char}
        </span>
      </div>

      {/* 3. Doorway portal if applicable (Yama's threshold) */}
      {glyphConfig.doorway && (
        <div
          className="absolute z-10 w-48 h-64 md:w-64 md:h-80 rounded-t-full border border-[var(--gold)]/40 pointer-events-auto"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(224, 99, 40, 0.15) 0%, transparent 80%)',
            boxShadow: '0 0 80px rgba(224, 99, 40, 0.25), inset 0 0 40px rgba(0,0,0,0.8)',
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--gold)] mb-1">
              Threshold Chamber
            </span>
            <span className="sanskrit text-2xl text-[var(--gold)] mb-2">द्वार</span>
            <p className="text-xs text-[var(--text-muted)] italic font-serif">
              "Enter the question from which no identity returns unchanged."
            </p>
          </div>
        </div>
      )}

      {/* 4. Foreground Content Floating in Front of Scenery */}
      <div className="relative z-20 text-center max-w-xl mx-auto px-6 pointer-events-auto">
        <span className="inline-block px-3 py-1 rounded-full border border-[var(--gold)]/30 bg-[var(--surface)]/60 backdrop-blur-sm text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--gold)] mb-3">
          Architectural Landmark • {glyphConfig.label}
        </span>
        <h4
          className="text-2xl md:text-3xl font-bold tracking-wide text-[var(--text-primary)]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {caption || glyphConfig.meaning}
        </h4>
        {subtitle && (
          <p className="text-sm text-[var(--text-secondary)] italic mt-2 font-serif">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
