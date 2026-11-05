import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { audioEngine } from '../../lib/audioEngine'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface CrackPath {
  d: string
  length: number
}

// Procedural seeded crack network
const CRACK_PATHS: CrackPath[] = [
  { d: 'M 20 50 Q 140 120 220 180 T 360 210 Q 520 260 680 230 T 820 310', length: 850 },
  { d: 'M 220 180 Q 280 80 340 30', length: 220 },
  { d: 'M 360 210 Q 400 340 450 420', length: 250 },
  { d: 'M 520 260 Q 600 130 680 70 T 780 20', length: 320 },
  { d: 'M 680 230 Q 720 360 760 440', length: 240 },
  { d: 'M 140 120 Q 90 220 50 320', length: 230 },
]

export default function KintsugiCrack() {
  const prefersReduced = useReducedMotion()
  const [stage, setStage] = useState<'pristine' | 'cracking' | 'healing' | 'healed'>('pristine')
  const [shake, setShake] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleApplyStress = () => {
    if (stage !== 'pristine') return

    audioEngine.playKintsugiCrack()
    setStage('cracking')
    setShake(true)

    // Stop screen shake after 300ms
    setTimeout(() => setShake(false), 300)

    // After 1.2s of fracture hold, gold starts flowing
    setTimeout(() => {
      setStage('healing')
      audioEngine.playGoldFlow()
    }, 1200)

    // Healed with golden seams after 3.2s
    setTimeout(() => {
      setStage('healed')
    }, 3400)
  }

  const handleReset = () => {
    setStage('pristine')
    setShake(false)
  }

  return (
    <div
      ref={containerRef}
      className={`relative my-12 p-8 md:p-12 rounded-2xl border transition-all duration-500 overflow-hidden ${
        shake && !prefersReduced ? 'translate-x-1 translate-y-[-1px]' : ''
      }`}
      style={{
        background:
          stage === 'healed'
            ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(20, 18, 30, 0.6) 100%)'
            : 'var(--surface)',
        borderColor: stage === 'healed' ? 'rgba(212, 175, 55, 0.5)' : 'var(--border-hairline)',
        boxShadow:
          stage === 'healed'
            ? '0 0 50px rgba(212, 175, 55, 0.2), inset 0 0 30px rgba(212, 175, 55, 0.1)'
            : 'var(--shadow-soft)',
      }}
      aria-label="Kintsugi Crack and Golden Repair Interactive Module"
    >
      {/* 1. Procedural Fracture / Golden Seams SVG Canvas Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 850 450"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="goldLiquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE8A8" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9E7618" />
          </linearGradient>
          <filter id="goldGleam" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {stage !== 'pristine' &&
          CRACK_PATHS.map((path, idx) => (
            <g key={idx}>
              {/* Dark fracture underlying trench */}
              <motion.path
                d={path.d}
                fill="none"
                stroke={stage === 'cracking' ? '#E54B33' : '#141126'}
                strokeWidth={stage === 'cracking' ? 2.5 : 3}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />

              {/* Flowing liquid gold line */}
              {(stage === 'healing' || stage === 'healed') && (
                <motion.path
                  d={path.d}
                  fill="none"
                  stroke="url(#goldLiquidGradient)"
                  strokeWidth={3}
                  strokeLinecap="round"
                  filter="url(#goldGleam)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: prefersReduced ? 0.2 : 1.8,
                    delay: idx * 0.15,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </g>
          ))}
      </svg>

      {/* 2. Interactive Controls & Content */}
      <div className="relative z-20 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/30 bg-[var(--surface)]/80 text-[10px] font-mono tracking-widest uppercase text-[var(--gold)] mb-4">
          <span>Interaction 1.1</span>
          <span>•</span>
          <span>The Fracture & The Gold</span>
        </div>

        <h3
          className="text-2xl md:text-3xl font-bold tracking-wide text-[var(--text-primary)] mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {stage === 'healed'
            ? 'The Golden Seams (Kintsugi)'
            : stage === 'cracking'
            ? 'Acute Fracture'
            : 'Resilience Under Stress'}
        </h3>

        <p className="text-base text-[var(--text-secondary)] font-serif italic leading-relaxed mb-6">
          {stage === 'pristine' &&
            'Every living structure encounters tensile stress. The mind often fears that cracking equals irreparable destruction. Press the button to observe how rupture transforms.'}
          {stage === 'cracking' &&
            'The initial shock wave shears the surface. Do not look away. What yields is only the rigid outer casing.'}
          {stage === 'healing' &&
            'Witness the deliberate inflow: attention, patience, and compassion filling the broken boundaries with gold.'}
          {stage === 'healed' &&
            '"Not repaired to look unbroken, but made more beautiful for having broken."'}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          {stage === 'pristine' && (
            <button
              onClick={handleApplyStress}
              className="px-6 py-2.5 rounded-full bg-rose-900/40 hover:bg-rose-900/60 border border-rose-500/50 text-rose-200 text-xs font-mono tracking-widest uppercase shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              ⚡ Apply Stress
            </button>
          )}

          {stage === 'healed' && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[var(--gold)] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
                Golden Seam Formed
              </span>
              <button
                onClick={handleReset}
                className="px-4 py-1.5 rounded-full border border-white/20 hover:border-white/40 text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Pedagogical Label & Disclaimer */}
        <div className="mt-8 pt-4 border-t border-[var(--border-hairline)] text-[11px] text-[var(--text-muted)] space-y-1">
          <p className="font-sans">
            <strong>Label:</strong> Kintsugi is a traditional Japanese craft philosophy, used here as a modern cross-cultural metaphor, not an Upanishadic doctrine.
          </p>
          <p className="italic font-serif">
            Upanishadic parallel: While the vessel (śarīra) bears the fractures of experience, the witnessing space within remains whole and uncut (*acchedyo 'yam*).
          </p>
        </div>
      </div>
    </div>
  )
}
