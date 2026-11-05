import { useEffect, useState, useRef } from 'react'
import dayCycleData from '../../content/dayCycle.json'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useJourneyProgress } from '../../hooks/useJourneyProgress'

interface DayPhase {
  chapter: number
  time: string
  name: string
  sanskrit: string
  progress: number
  skyTop: string
  skyBottom: string
  sunMoon: { type: string; y: number; opacity: number }
  starsOpacity: number
  ambientLight: number
}

export default function DayLongSky() {
  const prefersReduced = useReducedMotion()
  const { journeyProgressRatio } = useJourneyProgress()
  const [inPageScroll, setInPageScroll] = useState(0)
  const [currentPhase, setCurrentPhase] = useState<DayPhase>(dayCycleData.phases[0])
  const [nextPhase, setNextPhase] = useState<DayPhase>(dayCycleData.phases[1])
  const [phaseRatio, setPhaseRatio] = useState(0)
  const ticking = useRef(false)

  // Combined progress: journey progress across 12 Upanishads + micro in-page scroll
  const effectiveProgress = Math.min(Math.max(journeyProgressRatio + (inPageScroll * 0.08), 0), 1)

  useEffect(() => {
    // Find current and next phase in lookup table based on effective progress
    const phases = dayCycleData.phases
    let idx = 0
    for (let i = 0; i < phases.length - 1; i++) {
      if (effectiveProgress >= phases[i].progress && effectiveProgress <= phases[i + 1].progress) {
        idx = i
        break
      }
    }

    const p1 = phases[idx]
    const p2 = phases[Math.min(idx + 1, phases.length - 1)]
    const range = p2.progress - p1.progress || 1
    const ratio = Math.min(Math.max((effectiveProgress - p1.progress) / range, 0), 1)

    setCurrentPhase(p1)
    setNextPhase(p2)
    setPhaseRatio(ratio)
  }, [effectiveProgress])

  useEffect(() => {
    let lastProgress = -1
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          if (totalHeight > 0) {
            const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1)

            // Only update React state if progress changed by at least 0.008 (saves 90%+ re-renders)
            if (Math.abs(progress - lastProgress) >= 0.008) {
              lastProgress = progress
              setInPageScroll(progress)
            }
          }
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (prefersReduced) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-[-10] opacity-40 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(180deg, rgba(7,6,15,0.4) 0%, rgba(20,17,38,0.2) 100%)',
        }}
        aria-hidden="true"
      />
    )
  }

  // Keep celestial orb restricted to high atmosphere with low opacity (<= 0.18) so it never overlaps content cards
  const celestialX = `${effectiveProgress * 80 + 10}%`
  const celestialY = `clamp(40px, 8vh, 110px)`
  const celestialOpacity = Math.min(
    (currentPhase.sunMoon.opacity + (nextPhase.sunMoon.opacity - currentPhase.sunMoon.opacity) * phaseRatio) * 0.18,
    0.2
  )
  const starsOpacity =
    currentPhase.starsOpacity + (nextPhase.starsOpacity - currentPhase.starsOpacity) * phaseRatio
  const isSun = currentPhase.sunMoon.type === 'sun'

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[-10] overflow-hidden transition-all duration-700"
      aria-hidden="true"
    >
      {/* 1. Underlying Dual Phase Gradients for Seamless Crossfade */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `linear-gradient(180deg, ${currentPhase.skyTop} 0%, ${currentPhase.skyBottom} 100%)`,
          opacity: 1 - phaseRatio * 0.5,
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `linear-gradient(180deg, ${nextPhase.skyTop} 0%, ${nextPhase.skyBottom} 100%)`,
          opacity: phaseRatio * 0.8,
        }}
      />

      {/* 2. Star Canopy (Deep Night / Witness Chapters) */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: starsOpacity * 0.75,
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, #e8d08d, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 90px 40px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 160px 120px, #d4af37, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 230px 180px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 310px 80px, #f4eedc, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 420px 240px, #ffffff, rgba(0,0,0,0))
          `,
          backgroundSize: '550px 550px',
        }}
      />

      {/* 3. Celestial Sun / Moon Arc */}
      <div
        className="absolute transition-transform duration-300 ease-out will-change-transform"
        style={{
          left: celestialX,
          top: celestialY,
          transform: 'translate(-50%, -50%)',
          opacity: celestialOpacity * 0.85,
        }}
      >
        {isSun ? (
          <div className="relative flex items-center justify-center">
            {/* Sun Core */}
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-amber-400 via-orange-300 to-yellow-100 shadow-[0_0_60px_rgba(245,158,11,0.6)]" />
            {/* Solar Corona Rays */}
            <div className="absolute inset-[-12px] rounded-full border border-amber-300/30 animate-spin-slow" />
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Moon Crescent */}
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-[inset_-8px_3px_0_2px_#F4EEDC] drop-shadow-[0_0_30px_rgba(244,238,220,0.5)] transform -rotate-12" />
          </div>
        )}
      </div>

      {/* 4. Subtle Vignette & Horizon Haze */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 80%, transparent 40%, rgba(7,6,11,0.5) 100%)',
        }}
      />
    </div>
  )
}
