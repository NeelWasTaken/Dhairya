import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { audioEngine } from '../../lib/audioEngine'

interface NumericPreloaderProps {
  onComplete: () => void
}

export default function NumericPreloader({ onComplete }: NumericPreloaderProps) {
  const prefersReduced = useReducedMotion()
  const [count, setCount] = useState(0)
  const [isFinishing, setIsFinishing] = useState(false)

  useEffect(() => {
    if (prefersReduced) {
      onComplete()
      return
    }

    // Play initial bell
    try {
      audioEngine.playTempleBell(432, 2.5, 0.3)
    } catch {}

    // Non-linear counter progression (0 -> 100 in ~1600ms)
    const startTime = performance.now()
    const duration = 1600

    const updateCounter = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-in-out quartic curve
      const eased =
        progress < 0.5
          ? 8 * progress * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 4) / 2

      const currentVal = Math.floor(eased * 100)
      setCount(currentVal)

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        setCount(100)
        setIsFinishing(true)
        setTimeout(() => {
          onComplete()
        }, 650)
      }
    }

    const rafId = requestAnimationFrame(updateCounter)
    return () => cancelAnimationFrame(rafId)
  }, [onComplete, prefersReduced])

  // Tens and ones for digit roller feel
  const tens = Math.floor(count / 10)
  const ones = count % 10

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] bg-[#08070D] flex flex-col items-center justify-center select-none overflow-hidden"
        initial={{ opacity: 1 }}
        animate={
          isFinishing
            ? {
                clipPath: 'circle(150% at 50% 50%)',
                opacity: 0,
                transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
              }
            : {
                clipPath: 'circle(100% at 50% 50%)',
                opacity: 1,
              }
        }
        exit={{ opacity: 0 }}
      >
        {/* Subtle radial ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(184, 137, 43, 0.12) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        {/* Center Container */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          {/* Eyebrow Label */}
          <motion.span
            className="text-xs uppercase tracking-[0.35em] text-[var(--gold)] font-[var(--font-marginalia)] font-bold mb-4 block opacity-80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            PRAMĀṆA · SANCTUM INITIALIZING
          </motion.span>

          {/* Giant Monospace Numeric Display */}
          <div className="flex items-baseline justify-center font-mono select-none my-2">
            {/* Value display */}
            <div
              className="text-7xl sm:text-9xl md:text-[10rem] font-bold tracking-tighter leading-none"
              style={{
                color: '#FAF8F3',
                fontFamily: 'var(--font-heading), monospace',
                textShadow: '0 0 50px rgba(184, 137, 43, 0.3)',
              }}
            >
              {count < 100 ? (
                <span>
                  <span className="opacity-40">0</span>
                  <span>{tens}</span>
                  <span>{ones}</span>
                </span>
              ) : (
                <span>100</span>
              )}
            </div>

            <span
              className="text-2xl sm:text-3xl text-[var(--gold)] font-serif italic ml-2 font-bold"
              style={{ fontFamily: 'var(--font-marginalia)' }}
            >
              %
            </span>
          </div>

          {/* Sanskrit Aphorism Beneath */}
          <motion.div
            className="mt-6 flex flex-col items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="sanskrit text-lg sm:text-xl text-[var(--gold)] tracking-widest">
              धैर्यम् सर्वत्र साधनम्
            </span>
            <span className="text-xs text-[#FAF8F3]/60 italic font-serif tracking-wider">
              "Fortitude is the universal instrument."
            </span>
          </motion.div>

          {/* Progress bar hairline */}
          <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full mt-8 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--gold)] via-[var(--saffron)] to-[var(--gold-light)]"
              style={{ width: `${count}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={onComplete}
          className="absolute top-6 right-6 z-20 px-4 py-2 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 text-xs font-mono uppercase tracking-widest backdrop-blur-sm transition-all cursor-pointer"
          aria-label="Skip preloader animation"
        >
          Skip ▸
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
