import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { audioEngine } from '../../lib/audioEngine'

export default function HoldToBreathe() {
  const [isHolding, setIsHolding] = useState(false)
  const [breathValue, setBreathValue] = useState(0) // 0 to 100
  const [cycleCount, setCycleCount] = useState(0)
  const [pranaScore, setPranaScore] = useState(0)
  const [showBurst, setShowBurst] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const loop = () => {
      setBreathValue((prev) => {
        if (isHolding) {
          // Inhale expansion
          const next = prev + 1.2
          if (next >= 100) {
            audioEngine.playBreathTone(true)
            return 100
          }
          return next
        } else {
          // Exhale contraction
          const next = prev - 0.9
          if (next <= 0) {
            if (prev > 75) {
              // Completed full cycle!
              setCycleCount((c) => c + 1)
              setPranaScore((s) => s + 25)
              setShowBurst(true)
              audioEngine.playTempleBell(880, 2.5, 0.3)
              setTimeout(() => setShowBurst(false), 1200)
            }
            return 0
          }
          return next
        }
      })
      timerRef.current = requestAnimationFrame(loop)
    }

    timerRef.current = requestAnimationFrame(loop)
    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current)
    }
  }, [isHolding])

  const handlePointerDown = () => {
    setIsHolding(true)
    audioEngine.playBreathTone(true)
  }

  const handlePointerUp = () => {
    setIsHolding(false)
    audioEngine.playBreathTone(false)
  }

  const scaleFactor = 0.85 + (breathValue / 100) * 0.55

  return (
    <div className="my-16 p-6 md:p-10 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] shadow-xl text-center select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border-hairline)]">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold">
            Praśna Upaniṣad • Somatic Biofeedback
          </span>
          <h3 className="text-2xl font-bold text-[var(--ink)]">
            Hold-to-Breathe Prāṇa Engine
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[var(--bg)] border border-[var(--border-hairline)]">
            Cycles: {cycleCount}
          </span>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[var(--gold)]/20 border border-[var(--gold)]/40 text-[var(--gold)]">
            Prāṇa Score: {pranaScore}
          </span>
        </div>
      </div>

      {/* Lotus Kinetic Breathing Canvas */}
      <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto flex items-center justify-center my-6">
        {/* Ember Burst on Completed Cycle */}
        <AnimatePresence>
          {showBurst && (
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-[var(--gold)] bg-[var(--gold)]/20 pointer-events-none z-30"
              initial={{ scale: 0.8, opacity: 1 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
            />
          )}
        </AnimatePresence>

        {/* Lotus Flower Scaling */}
        <motion.svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          animate={{ scale: scaleFactor }}
          transition={{ ease: 'easeOut', duration: 0.1 }}
        >
          {/* Petals */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            const cx = 100 + Math.cos(angle) * 35
            const cy = 100 + Math.sin(angle) * 35
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx="30"
                ry="14"
                fill={isHolding ? '#E07A1F' : '#0E6B6B'}
                fillOpacity={0.4}
                stroke={isHolding ? '#E07A1F' : '#0E6B6B'}
                strokeWidth="1.5"
                transform={`rotate(${(i / 8) * 360} ${cx} ${cy})`}
              />
            )
          })}
          <circle cx="100" cy="100" r="16" fill="#D4AF37" />
        </motion.svg>

        {/* Ratio Guide & Status */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold font-mono text-[var(--ink)]">
            {Math.round(breathValue)}%
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] mt-1">
            {isHolding ? 'INHALE & EXPAND' : 'EXHALE & RELEASE'}
          </span>
        </div>
      </div>

      {/* Big Press & Hold Interaction Button */}
      <div className="max-w-md mx-auto">
        <button
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
          className={`w-full py-4 px-8 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg transition-all ${
            isHolding
              ? 'bg-[var(--saffron)] text-white scale-105 shadow-[0_0_25px_rgba(224,122,31,0.5)]'
              : 'bg-[var(--surface)] border-2 border-[var(--gold)] text-[var(--ink)] hover:bg-[var(--bg-alt)]'
          }`}
          style={{ fontFamily: 'var(--font-heading-alt)' }}
        >
          {isHolding ? 'Holding: Prāṇa Expanding...' : 'Press & Hold to Inhale • Release to Exhale'}
        </button>
        <p className="text-xs text-[var(--text-muted)] italic mt-2 font-[var(--font-marginalia)]">
          Follow your natural rhythm: inhale fully to 100%, then release gently for a complete parasympathetic cycle.
        </p>
      </div>
    </div>
  )
}
