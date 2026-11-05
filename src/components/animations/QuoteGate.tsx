import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { audioEngine } from '../../lib/audioEngine'

interface QuoteGateProps {
  onComplete: () => void
  onStartTransition?: () => void
}

export default function QuoteGate({ onComplete, onStartTransition }: QuoteGateProps) {
  const prefersReduced = useReducedMotion()
  const [showButton, setShowButton] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Exactly 3-second hold before revealing "Click to Begin"
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleBegin = () => {
    if (isExiting) return
    setIsExiting(true)
    if (onStartTransition) onStartTransition()

    // Do not mark entry completed yet; only Quote Gate transition has started
    try {
      sessionStorage.setItem('dhairya_quote_gate_seen', 'true')
    } catch {
      // ignore
    }

    audioEngine.init(true)
    audioEngine.playTempleBell(432, 3.5, 0.4)

    if (prefersReduced) {
      onComplete()
      return
    }

    // Quick, elegant 600ms transition to site
    setTimeout(() => {
      onComplete()
    }, 600)
  }

  const handleSkip = () => {
    // Do not mark entry completed yet; only Quote Gate transition has started
    try {
      sessionStorage.setItem('dhairya_quote_gate_seen', 'true')
    } catch {
      // ignore
    }
    audioEngine.init(true)
    onComplete()
  }

  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-[#07060B] select-none overflow-hidden"
      style={{
        backgroundColor: '#07060B',
        position: 'fixed',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      role="dialog"
      aria-modal="true"
      aria-label="Contemplative Quote Gate"
    >
      {/* Subtle radial ambient vignette in dark indigo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(29, 42, 77, 0.25) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Perfectly Centered Quote Container */}
      <div
        className="relative z-10 w-full mx-auto flex flex-col items-center justify-center"
        style={{
          paddingInline: 'clamp(1.25rem, 6vw, 6rem)',
          maxWidth: '900px',
        }}
      >
        {/* Line 1: Devanagari Sanskrit Quote */}
        <h1
          className="sanskrit font-bold tracking-wide leading-tight mb-4"
          style={{
            color: '#D9B45A',
            fontSize: 'clamp(2.4rem, 6.5vw, 4.8rem)',
            textShadow: '0 0 40px rgba(217, 180, 90, 0.35)',
          }}
        >
          अंतः अस्ति प्रारंभः
        </h1>

        {/* Line 2: IAST Transliteration */}
        <p
          className="iast font-medium tracking-[0.2em] uppercase mb-4"
          style={{
            color: '#FFE4B5',
            fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
          }}
        >
          antaḥ asti prārambhaḥ
        </p>

        {/* Line 3: English Translation */}
        <p
          className="italic tracking-wider leading-relaxed"
          style={{
            fontFamily: 'var(--font-body)',
            color: '#E6D8B8',
            fontSize: 'clamp(1.15rem, 2.4vw, 1.75rem)',
          }}
        >
          "The end is the beginning."
        </p>

        {/* Subtle separator line */}
        <div
          className="w-20 h-[1px] mx-auto my-8 opacity-40"
          style={{
            background: 'linear-gradient(90deg, transparent, #D9B45A, transparent)',
          }}
        />

        {/* Action Button after 3-second hold */}
        <div className="min-h-[72px] flex items-center justify-center">
          <AnimatePresence>
            {showButton && !isExiting && (
              <motion.button
                onClick={handleBegin}
                className="group focus:outline-none cursor-pointer rounded-full"
                style={{
                  padding: '14px 36px',
                  border: '1px solid rgba(217, 180, 90, 0.6)',
                  background: 'rgba(217, 180, 90, 0.12)',
                  boxShadow: '0 0 30px rgba(217, 180, 90, 0.3)',
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                aria-label="Click to begin the journey"
              >
                <span
                  className="font-bold tracking-[0.25em] uppercase block transition-transform group-hover:scale-105"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: '#FFE8A8',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)',
                  }}
                >
                  Click to Begin
                </span>
                <span
                  className="sanskrit tracking-widest block mt-0.5 opacity-80"
                  style={{
                    color: '#E07A1F',
                    fontSize: '0.75rem',
                  }}
                >
                  प्रारम्भ करें
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Direct Skip Button */}
      {!isExiting && (
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-20 px-4 py-2 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 text-xs font-mono uppercase tracking-widest backdrop-blur-sm transition-all cursor-pointer"
          aria-label="Skip to main content"
        >
          Skip Intro ▸
        </button>
      )}
    </motion.div>
  )
}
