import { useState, useEffect } from 'react'
import { audioEngine } from '../../lib/audioEngine'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function BreathSyncedPage() {
  const prefersReduced = useReducedMotion()
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale')
  const [seconds, setSeconds] = useState(4)

  useEffect(() => {
    if (!isActive || prefersReduced) {
      document.documentElement.style.removeProperty('--breath-scale')
      document.documentElement.style.removeProperty('--breath-spacing')
      document.documentElement.style.removeProperty('--breath-glow')
      return
    }

    let currentPhase: 'inhale' | 'exhale' = 'inhale'
    let timer: ReturnType<typeof setTimeout>

    const runCycle = () => {
      if (currentPhase === 'inhale') {
        setPhase('inhale')
        setSeconds(4)
        audioEngine.playBreathTone(true)

        // Smooth CSS variable dilation
        document.documentElement.style.setProperty('--breath-scale', '1.01')
        document.documentElement.style.setProperty('--breath-spacing', '0.015em')
        document.documentElement.style.setProperty('--breath-glow', 'rgba(212, 175, 55, 0.25)')

        timer = setTimeout(() => {
          currentPhase = 'exhale'
          runCycle()
        }, 4000)
      } else {
        setPhase('exhale')
        setSeconds(6)
        audioEngine.playBreathTone(false)

        document.documentElement.style.setProperty('--breath-scale', '0.995')
        document.documentElement.style.setProperty('--breath-spacing', '0.005em')
        document.documentElement.style.setProperty('--breath-glow', 'rgba(212, 175, 55, 0.08)')

        timer = setTimeout(() => {
          currentPhase = 'inhale'
          runCycle()
        }, 6000)
      }
    }

    runCycle()

    return () => {
      clearTimeout(timer)
      document.documentElement.style.removeProperty('--breath-scale')
      document.documentElement.style.removeProperty('--breath-spacing')
      document.documentElement.style.removeProperty('--breath-glow')
    }
  }, [isActive, prefersReduced])

  return (
    <div className="relative my-8 p-6 md:p-8 rounded-xl border border-[var(--gold)]/30 bg-[var(--surface)]/70 backdrop-blur-md shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="space-y-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--gold)] font-bold">
            Interaction 1.9 • Somatic Entrainment
          </span>
        </div>
        <h4 className="text-xl font-bold font-[var(--font-heading)] text-[var(--text-primary)]">
          Breathe with the Page (Prāṇa-Spanda)
        </h4>
        <p className="text-xs text-[var(--text-secondary)] font-serif italic max-w-md">
          Synchronize the page's ambient illumination and heading cadence to a grounding 4-second inhalation and 6-second exhalation.
        </p>
      </div>

      <div className="flex items-center gap-4">
        {isActive && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[var(--gold)]">
            <span className="capitalize">{phase} ({seconds}s)</span>
            <span className="w-1 h-1 rounded-full bg-[var(--gold)] animate-ping" />
          </div>
        )}

        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            isActive
              ? 'bg-[var(--gold)] text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.5)]'
              : 'border border-[var(--gold)]/50 text-[var(--gold)] hover:bg-[var(--gold)]/10'
          }`}
          aria-label={isActive ? 'Deactivate breath synchrony' : 'Activate breath synchrony'}
        >
          {isActive ? 'Stop Breathing' : 'Breathe with Page'}
        </button>
      </div>
    </div>
  )
}
