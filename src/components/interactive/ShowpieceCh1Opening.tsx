import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function ShowpieceCh1Opening() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.25 })
  const prefersReduced = useReducedMotion()
  const [hasLanded, setHasLanded] = useState(false)

  // 8 fragments arriving from all 8 directions
  const fragments = [
    { text: 'Resilience', from: { x: '-40vw', y: '-30vh' }, delay: 0.1 },
    { text: 'is abiding', from: { x: '0vw', y: '-40vh' }, delay: 0.2 },
    { text: 'in the unshakeable', from: { x: '40vw', y: '-30vh' }, delay: 0.15 },
    { text: 'ground (Ātman)', from: { x: '45vw', y: '0vh' }, delay: 0.25 },
    { text: 'while the storm', from: { x: '35vw', y: '35vh' }, delay: 0.3 },
    { text: 'of circumstance', from: { x: '0vw', y: '40vh' }, delay: 0.2 },
    { text: 'moves the tree.', from: { x: '-35vw', y: '35vh' }, delay: 0.28 },
    { text: 'It does not move the ground.', from: { x: '-45vw', y: '0vh' }, delay: 0.35 },
  ]

  if (prefersReduced) {
    return (
      <div className="my-12 p-8 rounded-2xl bg-[var(--surface)] border border-[var(--gold)]/30 text-center shadow-lg">
        <p className="text-xl md:text-2xl font-[var(--font-heading-alt)] text-[var(--ink)] leading-relaxed font-semibold">
          "Resilience is abiding in the unshakeable ground (Ātman) while the storm of circumstance moves the tree. It does not move the ground."
        </p>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="relative my-12 p-8 md:p-12 rounded-2xl bg-gradient-to-b from-[var(--surface)] to-[var(--bg-alt)] border border-[var(--gold)]/40 overflow-hidden shadow-xl text-center"
      aria-label="Chapter 1 Opening: Words arriving from 8 directions"
    >
      <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] font-mono block mb-4">
        Eight-Directional Synthesis • अष्टदिक् संधानम्
      </span>

      {/* The 8 Fragments */}
      <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 max-w-3xl mx-auto">
        {fragments.map((frag, i) => (
          <motion.span
            key={i}
            className="text-lg md:text-2xl font-[var(--font-heading-alt)] font-semibold text-[var(--ink)] inline-block"
            initial={{
              x: frag.from.x,
              y: frag.from.y,
              opacity: 0,
              filter: 'blur(10px)',
            }}
            animate={
              isInView
                ? {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                  }
                : {}
            }
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
              delay: frag.delay,
            }}
            onAnimationComplete={() => {
              if (i === fragments.length - 1) {
                setHasLanded(true)
              }
            }}
          >
            {frag.text}
          </motion.span>
        ))}
      </div>

      {/* Gold Light Sweep Flash when last word lands */}
      <AnimatePresence>
        {hasLanded && (
          <motion.div
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(201,162,58,0.3)_0%,transparent_70%)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
