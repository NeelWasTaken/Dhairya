import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function ShowpieceEpilogueAscent() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 })
  const prefersReduced = useReducedMotion()
  const [showConstellation, setShowConstellation] = useState(false)

  const steps = [
    { sa: 'ॐ असतो मा सद्गमय ।', en: 'Lead me from the unreal to the Real.' },
    { sa: 'तमसो मा ज्योतिर्गमय ।', en: 'Lead me from darkness to Light.' },
    { sa: 'मृत्योर्माऽमृतं गमय ॥', en: 'Lead me from death to Immortality.' },
  ]

  if (prefersReduced) {
    return (
      <div className="my-14 p-10 rounded-2xl bg-[var(--surface)] border border-[var(--gold)]/30 text-center">
        {steps.map((s, i) => (
          <div key={i} className="mb-4">
            <span className="sanskrit text-2xl text-[var(--vermilion)] block">{s.sa}</span>
            <span className="text-sm italic text-[var(--ink-soft)]">{s.en}</span>
          </div>
        ))}
        <span className="sanskrit text-5xl text-[var(--gold)] block mt-6">ॐ</span>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="relative my-14 p-12 md:p-18 rounded-3xl bg-gradient-to-b from-[#0D0A17] via-[#140E24] to-[#07060B] border border-[var(--gold)]/40 overflow-hidden text-center text-white shadow-2xl min-h-[420px] flex flex-col items-center justify-center"
      aria-label="Ascending Light Lines and Om Constellation"
    >
      <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] font-mono block mb-8">
        Bṛhadāraṇyaka 1.3.28 • The Ascending Light
      </span>

      {/* The 3 Lines Climbing from the Bottom */}
      <div className="space-y-6 max-w-2xl mx-auto mb-10">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ y: '50vh', opacity: 0, filter: 'blur(10px)' }}
            animate={
              isInView
                ? {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                  }
                : {}
            }
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              delay: idx * 0.45,
            }}
            onAnimationComplete={() => {
              if (idx === steps.length - 1) {
                setShowConstellation(true)
              }
            }}
            className="p-4 rounded-xl bg-white/[0.04] border border-white/5 shadow-inner"
          >
            <span className="sanskrit text-2xl md:text-3xl text-[var(--gold)] font-bold block mb-1">
              {step.sa}
            </span>
            <span className="text-xs md:text-sm text-stone-300 italic font-[var(--font-heading-alt)]">
              "{step.en}"
            </span>
          </motion.div>
        ))}
      </div>

      {/* Stars Form the Sacred Om Constellation */}
      <AnimatePresence>
        {showConstellation && (
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="relative flex flex-col items-center mt-4"
          >
            <span
              className="sanskrit text-7xl md:text-8xl text-[var(--gold)] font-bold drop-shadow-[0_0_50px_rgba(201,162,58,0.9)]"
              style={{ filter: 'drop-shadow(0 0 35px #C9A23A)' }}
            >
              ॐ
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-mono mt-2">
              The Cosmic Constellation Awakens
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
