import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const STAGES = [
  {
    stage: '01',
    label: 'STHITI · THE PERIPHERY',
    devanagari: 'स्थितिः · शरीरम्',
    statement: 'The storm moves the tree. It shakes only the outermost foliage of the ego.',
    insight: 'Modern anxiety confuses the agitated leaf for the entire organism. When grief or panic arrives, it touches only the peripheral sheaths (koshas).',
    color: '#E07A1F',
    glyph: '🌿',
  },
  {
    stage: '02',
    label: 'VICHĀRA · THE INQUIRY',
    devanagari: 'विचारः · केनेषितम्',
    statement: 'Who sends the mind forth? The mind is an instrument, not the sovereign observer.',
    insight: 'The moment you ask "Who is watching this racing thought?", the hypnosis breaks. You step back from the whirlpool onto the solid riverbank.',
    color: '#1B2150',
    glyph: '👁',
  },
  {
    stage: '03',
    label: 'DHAIYA · THE IMMORTAL GROUND',
    devanagari: 'धैर्यम् · अमृतम्',
    statement: 'Resilience is not bouncing back; it is realizing you never left the unshakeable ground.',
    insight: 'True fortitude (Dhairya) does not fortify a fragile ego. It rests in the witness (Ātman) that was never wounded, never born, and never shaken.',
    color: '#B8892B',
    glyph: 'ॐ',
  },
]

export default function PinnedStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [activeStage, setActiveStage] = useState(0)

  useEffect(() => {
    if (prefersReduced) return

    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable <= 0) return

      // Progress from 0 to 1 through the container
      const currentScroll = -rect.top
      const progress = Math.max(0, Math.min(currentScroll / totalScrollable, 0.999))
      const stageIndex = Math.min(Math.floor(progress * STAGES.length), STAGES.length - 1)
      setActiveStage(stageIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReduced])

  const stage = STAGES[activeStage]

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{
        height: prefersReduced ? 'auto' : '300vh',
      }}
      aria-label="The Three Truths of Dhairya"
    >
      {/* Pinned Sticky Viewport */}
      <div
        className={`w-full flex items-center justify-center ${
          prefersReduced ? 'py-20 relative' : 'sticky top-0 h-screen overflow-hidden'
        }`}
      >
        {/* Soft dynamic background aura shifting with stage */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-1000"
          style={{
            background:
              activeStage === 0
                ? 'radial-gradient(ellipse at 50% 50%, rgba(224, 122, 31, 0.05) 0%, transparent 70%)'
                : activeStage === 1
                ? 'radial-gradient(ellipse at 50% 50%, rgba(27, 33, 80, 0.08) 0%, transparent 70%)'
                : 'radial-gradient(ellipse at 50% 50%, rgba(184, 137, 43, 0.08) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Content Container (Centred, max 1100px) */}
        <div className="relative z-10 w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Stage Progress Ruler / Header */}
          <div className="inline-flex items-center gap-4 mb-8 select-none">
            {STAGES.map((s, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  if (prefersReduced) return
                  const container = containerRef.current
                  if (container) {
                    const top = container.offsetTop + (idx / STAGES.length) * (container.offsetHeight - window.innerHeight)
                    window.scrollTo({ top, behavior: 'smooth' })
                  }
                }}
              >
                <span
                  className={`text-xs font-mono font-bold tracking-widest transition-colors duration-300 ${
                    idx === activeStage ? 'text-[var(--gold)] scale-110' : 'text-[var(--text-muted)] opacity-50'
                  }`}
                >
                  {s.stage}
                </span>
                <span
                  className={`w-12 sm:w-20 h-[2px] rounded-full transition-all duration-500 ${
                    idx === activeStage ? 'bg-[var(--gold)]' : 'bg-[var(--border-hairline)]'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Active Stage Label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`label-${activeStage}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="mb-4"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
                {stage.label} · {stage.devanagari}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Focal Glyph */}
          <div className="w-14 h-14 rounded-full border border-[var(--border-color)] bg-[var(--surface)] shadow-md flex items-center justify-center text-2xl mb-8">
            <span>{stage.glyph}</span>
          </div>

          {/* Giant Display Statement (Masked line rise feel) */}
          <div className="max-w-4xl mx-auto min-h-[140px] sm:min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={`stmt-${activeStage}`}
                className="text-2xl sm:text-4xl md:text-5xl font-[var(--font-heading)] text-[var(--text-primary)] leading-[1.18] tracking-wide text-balance"
                initial={{ opacity: 0, y: 35, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -35, rotateX: 10 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {stage.statement}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Curatorial Insight Body Paragraph (max 68ch, centred) */}
          <div className="max-w-[68ch] mx-auto mt-6 min-h-[70px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={`insight-${activeStage}`}
                className="text-sm sm:text-base text-[var(--text-secondary)] font-serif italic leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                "{stage.insight}"
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
