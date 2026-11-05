import { useState, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import MagneticButton from '../ui/MagneticButton'
import RollingLink from '../ui/RollingLink'
import MandalaBorderBand from '../ui/borders/MandalaBorderBand'
import HeroSunflower from './HeroSunflower'

const HeroParticles = lazy(() => import('../../scenes/HeroParticles'))

interface HeroProps {
  onBegin?: (e: React.MouseEvent) => void
  onResume?: (e: React.MouseEvent) => void
  resumePath?: string
  completedCount?: number
}

export default function Hero({
  onBegin,
  onResume,
  resumePath,
  completedCount = 0,
}: HeroProps) {
  const prefersReduced = useReducedMotion()
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleHeroClick = (e: React.MouseEvent) => {
    // Avoid creating ripples when clicking buttons or links
    if ((e.target as HTMLElement).closest('button, a')) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples(prev => [...prev.slice(-2), { id, x, y }])
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 1200)
  }

  const titleLetters = 'DHAIRYA'.split('')

  return (
    <section
      onClick={handleHeroClick}
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden text-center select-none pt-24 pb-16 px-4"
      aria-label="Hero section"
    >
      {/* Ink Ripple Elements on click */}
      {ripples.map(r => (
        <span
          key={r.id}
          className="absolute rounded-full pointer-events-none animate-ink-ripple z-30 border border-[var(--gold)]/40"
          style={{
            left: r.x,
            top: r.y,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(184, 137, 43, 0.25) 0%, rgba(224, 122, 31, 0.15) 50%, transparent 75%)',
          }}
          aria-hidden="true"
        />
      ))}

      {/* Shared WebGL particles background */}
      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>

      {/* Top Mandala Motif Band */}
      <div className="w-full max-w-xl mx-auto mb-8 opacity-40">
        <MandalaBorderBand height={12} opacity={0.3} />
      </div>

      {/* Main Hero Container (Centred, max 1100px) */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto flex flex-col items-center justify-center space-y-6">
        {/* Sacred Om Symbol with Golden Aura */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-12 h-12 rounded-full border border-[var(--border-color)] bg-[var(--surface)]/60 backdrop-blur-md flex items-center justify-center shadow-xs mb-1"
          aria-hidden="true"
        >
          <span className="text-xl sanskrit font-serif text-[var(--gold)]">ॐ</span>
        </motion.div>

        {/* Monumental Centred Title: clamp(3rem, 10vw, 9rem) */}
        <div className="overflow-hidden py-2">
          <h1
            className="font-[var(--font-heading)] leading-[1.05] tracking-[0.14em] text-[var(--text-primary)] mx-auto font-extrabold"
            style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
          >
            <span className="sr-only">Dhairya</span>
            <span aria-hidden="true" className="inline-flex flex-wrap justify-center overflow-hidden">
              {titleLetters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={prefersReduced ? { opacity: 1 } : { y: '110%', rotateX: -20, opacity: 0 }}
                  animate={{ y: '0%', rotateX: 0, opacity: 1 }}
                  transition={
                    prefersReduced
                      ? { duration: 0 }
                      : {
                          duration: 1.1,
                          delay: 0.15 + i * 0.05,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                  className="inline-block gold-shimmer"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <HeroSunflower size={32} className="ml-2 sm:ml-3 -translate-y-2 sm:-translate-y-4" />
          </h1>
        </div>

        {/* Devanagari Title beneath: vermilion or gold */}
        <motion.p
          className="sanskrit text-2xl sm:text-3xl md:text-4xl text-[var(--vermilion)] font-serif font-bold tracking-widest drop-shadow-xs"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          धैर्यम् · The Unshaken Self
        </motion.p>

        {/* One-Line Thesis */}
        <motion.p
          className="text-base sm:text-xl text-[var(--text-secondary)] font-serif max-w-[64ch] mx-auto leading-relaxed text-balance"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          Psychological resilience as the realization of the invulnerable witness.
        </motion.p>

        {/* Tagline: "The storm moves the tree. It does not move the ground." */}
        <motion.p
          className="text-sm sm:text-base italic text-[var(--gold)] font-serif max-w-[55ch] mx-auto tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.9, delay: 0.9, ease: 'easeOut' }}
        >
          "The storm moves the tree. It does not move the ground."
        </motion.p>

        {/* Primary Call to Action Button + Resume Link */}
        <motion.div
          className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-5 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton
            onClick={onBegin}
            dataCursor="Begin"
            ariaLabel="Begin the journey through the Upanishads"
            className="text-xs sm:text-sm uppercase tracking-[0.2em]"
          >
            Begin the Journey →
          </MagneticButton>

          {completedCount > 0 && resumePath && (
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[var(--gold)]">⚡</span>
              <RollingLink
                to={resumePath}
                onClick={onResume}
                dataCursor="Resume"
                ariaLabel={`Resume Station (${completedCount} of 12 explored)`}
                className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--gold)]"
              >
                {`Resume Station (${completedCount}/12)`}
              </RollingLink>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Mandala Motif Band */}
      <div className="w-full max-w-xl mx-auto mt-12 opacity-35">
        <MandalaBorderBand height={12} opacity={0.25} />
      </div>
    </section>
  )
}
