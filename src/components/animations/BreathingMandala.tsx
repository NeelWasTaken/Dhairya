import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

type BreathPhase = 'idle' | 'inhale' | 'hold' | 'exhale'

export default function BreathingMandala() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<BreathPhase>('idle')
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [cyclesCompleted, setCyclesCompleted] = useState(0)
  const [ref] = useInView<HTMLDivElement>({ threshold: 0.25 })

  // 4-4-6 Cadence
  useEffect(() => {
    if (!isActive) {
      setPhase('idle')
      return
    }

    let currentPhase: BreathPhase = 'inhale'
    let duration = 4
    setPhase(currentPhase)
    setSecondsLeft(duration)

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1

        // Transition phase
        if (currentPhase === 'inhale') {
          currentPhase = 'hold'
          duration = 4
        } else if (currentPhase === 'hold') {
          currentPhase = 'exhale'
          duration = 6
        } else {
          currentPhase = 'inhale'
          duration = 4
          setCyclesCompleted((c) => c + 1)
        }
        setPhase(currentPhase)
        return duration
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive])

  const phaseInstruction = {
    idle: 'Tap "Begin Prāṇāyāma" to start the 4-4-6 calming cycle',
    inhale: 'Inhale gently through nostrils (4s) • Prāṇa expands',
    hold: 'Hold with serene stillness (4s) • Kumbhaka balance',
    exhale: 'Exhale slowly and completely (6s) • Parasympathetic release',
  }[phase]

  const lotusScale = {
    idle: 1,
    inhale: 1.35,
    hold: 1.35,
    exhale: 0.85,
  }[phase]

  const phaseColor = {
    idle: '#C9A23A',
    inhale: '#E8892B',
    hold: '#C9A23A',
    exhale: '#2C3E6B',
  }[phase]

  return (
    <div ref={ref} className="my-16 p-6 md:p-10 rounded-xl palm-leaf-border bg-[var(--bg-card)]">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)]">
          Praśna Upaniṣad 3 • Śvetāśvatara 2.8–9
        </span>
        <h3 className="text-2xl md:text-3xl font-bold mt-1 text-[var(--ink)]">
          The Breathing Lotus: Prāṇāyāma Sanctuary
        </h3>
        <p className="text-sm text-[var(--text-muted)] italic max-w-xl mx-auto mt-2">
          Experience classical Upaniṣadic breath regulation (4s inhale • 4s hold • 6s exhale) to ground autonomic turbulence.
        </p>
      </div>

      {/* Lotus Mandala Animated Stage */}
      <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto flex items-center justify-center">
        {/* Animated Expanding Mandala SVG */}
        <motion.svg
          viewBox="0 0 300 300"
          className="w-full h-full"
          animate={{
            scale: lotusScale,
            rotate: isActive ? (phase === 'inhale' ? 45 : phase === 'exhale' ? -45 : 0) : 0,
          }}
          transition={{
            duration: phase === 'inhale' ? 4 : phase === 'hold' ? 0.3 : phase === 'exhale' ? 6 : 1,
            ease: 'easeInOut',
          }}
        >
          {/* Outer circle halo */}
          <circle cx="150" cy="150" r="130" stroke={phaseColor} strokeWidth="1" strokeDasharray="6 4" opacity="0.3" />
          <circle cx="150" cy="150" r="110" stroke={phaseColor} strokeWidth="1.5" opacity="0.4" />

          {/* 12 Radiant Lotus Petals */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2
            const cx = 150 + Math.cos(angle) * 60
            const cy = 150 + Math.sin(angle) * 60
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx="40"
                ry="18"
                fill={phaseColor}
                fillOpacity={isActive ? 0.22 : 0.12}
                stroke={phaseColor}
                strokeWidth="1.5"
                transform={`rotate(${(i / 12) * 360} ${cx} ${cy})`}
              />
            )
          })}

          {/* Inner 8 Petals */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            const cx = 150 + Math.cos(angle) * 30
            const cy = 150 + Math.sin(angle) * 30
            return (
              <ellipse
                key={`inner-${i}`}
                cx={cx}
                cy={cy}
                rx="26"
                ry="12"
                fill="#FFE4B5"
                fillOpacity={0.4}
                stroke="#C9A23A"
                strokeWidth="1"
                transform={`rotate(${(i / 8) * 360} ${cx} ${cy})`}
              />
            )
          })}

          {/* Centre Golden Seed */}
          <circle cx="150" cy="150" r="22" fill="#FFE4B5" />
          <circle cx="150" cy="150" r="14" fill={phaseColor} />
        </motion.svg>

        {/* Central Display Counter */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {isActive ? (
            <>
              <span className="text-3xl md:text-4xl font-bold font-mono text-[var(--ink)]">
                {secondsLeft}s
              </span>
              <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold mt-1">
                {phase.toUpperCase()}
              </span>
            </>
          ) : (
            <span className="sanskrit text-4xl text-[var(--gold)]">ॐ</span>
          )}
        </div>
      </div>

      {/* Instruction & Controls */}
      <div className="text-center mt-6">
        <p className="text-sm font-semibold text-[var(--text-primary)] min-h-[1.5rem] mb-4 font-[var(--font-heading-alt)]">
          {phaseInstruction}
        </p>

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-all shadow-md ${
              isActive
                ? 'bg-[var(--vermilion)] text-white hover:bg-[var(--vermilion-dark)]'
                : 'bg-[var(--gold)] text-[#2B1B10] hover:bg-[var(--gold-light)]'
            }`}
            style={{ fontFamily: 'var(--font-heading-alt)' }}
          >
            {isActive ? 'Pause Prāṇāyāma' : 'Begin Prāṇāyāma (4-4-6)'}
          </button>

          {cyclesCompleted > 0 && (
            <span className="text-xs text-[var(--text-muted)] font-[var(--font-marginalia)]">
              Cycles: {cyclesCompleted}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
