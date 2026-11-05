import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function ShowpieceFearMerge() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 })
  const prefersReduced = useReducedMotion()
  const [stage, setStage] = useState<'converge' | 'dissolve' | 'fearless'>('converge')

  const shadowFragments = [
    { text: 'THE OTHER', from: { x: '-35vw', y: '-15vh' } },
    { text: 'ISOLATION', from: { x: '35vw', y: '-15vh' } },
    { text: 'FRAGILITY', from: { x: '-35vw', y: '15vh' } },
    { text: 'MORTALITY', from: { x: '35vw', y: '15vh' } },
  ]

  if (prefersReduced) {
    return (
      <div className="my-12 p-8 rounded-2xl bg-[var(--surface)] border border-rose-200 dark:border-rose-900/40 text-center">
        <p className="sanskrit text-2xl text-[var(--vermilion)] mb-2">
          द्वितीयाद्वै भयं भवति • अभयं वै प्रतिष्ठा
        </p>
        <p className="text-sm italic text-stone-600 dark:text-stone-300">
          "Fear arises only from the illusion of a second. Knowing the non-dual Self, one becomes fearless."
        </p>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="relative my-12 p-10 md:p-14 rounded-2xl bg-[#0F0D17] border border-[#2A233D] overflow-hidden text-center min-h-[260px] flex flex-col items-center justify-center select-none shadow-2xl"
      aria-label="Fear Dissolving into Non-Dual Light"
    >
      <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] font-mono block mb-4">
        Bṛhadāraṇyaka 1.4.2 • Convergence of Duality
      </span>

      {/* Dark fragments converging toward center */}
      {stage !== 'fearless' && (
        <div className="relative w-full h-24 flex items-center justify-center">
          {shadowFragments.map((frag, idx) => (
            <motion.span
              key={idx}
              className="absolute font-mono text-xs uppercase tracking-widest text-stone-400 font-bold bg-white/5 px-3 py-1 rounded border border-white/10"
              initial={{ x: frag.from.x, y: frag.from.y, opacity: 0 }}
              animate={
                isInView
                  ? {
                      x: 0,
                      y: 0,
                      opacity: [0, 0.9, 0],
                      scale: [1, 0.8, 0.2],
                    }
                  : {}
              }
              transition={{
                duration: 2.2,
                ease: [0.16, 1, 0.3, 1],
                delay: idx * 0.15,
              }}
              onAnimationComplete={() => {
                if (idx === shadowFragments.length - 1) {
                  setStage('fearless')
                }
              }}
            >
              {frag.text}
            </motion.span>
          ))}
        </div>
      )}

      {/* Final Line Emerging Calmly from Center */}
      <AnimatePresence>
        {stage === 'fearless' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="text-center"
          >
            <span className="sanskrit text-2xl md:text-4xl text-[var(--gold)] font-bold block mb-2 drop-shadow-[0_0_25px_rgba(201,162,58,0.6)]">
              अभयं वै जनक प्राप्तोऽसि
            </span>
            <p className="text-sm md:text-base italic text-[#FBF7EF] font-[var(--font-heading-alt)]">
              "You have attained fearlessness, for where there is no 'other', there is no terror."
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
