import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import DrawCircleScreen, { type DrawCircleSuccessData } from './DrawCircleScreen'
import Sun from './Sun'
import SunflowerBloom from './SunflowerBloom'
import MistyBackgroundCanvas from './MistyBackgroundCanvas'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface SunEntrySequenceProps {
  onComplete: () => void
  condensed?: boolean
}

type SequencePhase =
  | 'draw'
  | 'circle_morph'
  | 'sun_forming'
  | 'sun_glow'
  | 'sunflower_bloom'
  | 'hero_reveal'
  | 'finished'

export default function SunEntrySequence({ onComplete, condensed = false }: SunEntrySequenceProps) {
  const prefersReduced = useReducedMotion()
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const morphSvgRef = useRef<SVGSVGElement | null>(null)
  const morphPathRef = useRef<SVGPathElement | null>(null)
  const sunWrapperRef = useRef<HTMLDivElement | null>(null)
  const bloomWrapperRef = useRef<HTMLDivElement | null>(null)

  // Current visual phase
  const [phase, setPhase] = useState<SequencePhase>('draw')
  const [warmth, setWarmth] = useState(0) // 0 = morning dawn gold & saffron, 1 = blazing radiant solar gold
  const [blurAmount, setBlurAmount] = useState(14)
  const [debugProgress, setDebugProgress] = useState(0)

  // Sun properties
  const [sunProps, setSunProps] = useState({
    rayProgress: 0,
    discScale: 0,
    haloOpacity: 0.3,
  })

  // Sunflower properties
  const [bloomProps, setBloomProps] = useState({
    progress: 0,
    scale: 1.0,
    rotation: 0,
  })

  // Circular iris reveal mask
  const [irisRadius, setIrisRadius] = useState(0)

  const isDebug = typeof window !== 'undefined' && window.location.search.includes('debug=entry')

  // Check returning visitor
  const isReturning = condensed || (() => {
    try {
      return sessionStorage.getItem('dhairya_entry_completed') === 'true'
    } catch {
      return false
    }
  })()

  // Reduced motion quick transition
  useEffect(() => {
    if (prefersReduced) {
      const timer = setTimeout(() => onComplete(), 400)
      return () => clearTimeout(timer)
    }
  }, [prefersReduced, onComplete])

  // Returning visitor condensed mode: auto-draw circle after 1s and run condensed sequence
  useEffect(() => {
    if (!isReturning || phase !== 'draw') return
    const timer = setTimeout(() => {
      handleCircleSuccess({
        cx: window.innerWidth / 2,
        cy: window.innerHeight / 2,
        radius: Math.min(window.innerWidth * 0.22, 160),
        points: [],
      })
      if (masterTimelineRef.current) {
        masterTimelineRef.current.timeScale(2.6) // ~3s total duration
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [isReturning, phase])

  // Fast-forward / Skip handler
  const handleFastForward = () => {
    if (masterTimelineRef.current) {
      masterTimelineRef.current.timeScale(6)
    } else {
      onComplete()
    }
  }

  // Handle successful circle drawn by user or auto demo
  const handleCircleSuccess = (data: DrawCircleSuccessData) => {
    setPhase('circle_morph')

    const targetCx = window.innerWidth / 2
    const targetCy = window.innerHeight / 2
    const targetRadius = Math.min(window.innerWidth * 0.3, window.innerHeight * 0.3, 220)

    const tl = gsap.timeline({
      onUpdate: () => {
        if (isDebug && masterTimelineRef.current) {
          setDebugProgress(masterTimelineRef.current.progress())
        }
      },
      onComplete: () => {
        try {
          sessionStorage.setItem('dhairya_entry_completed', 'true')
        } catch {}
        setPhase('finished')
        const heroH1 = document.querySelector('h1')
        if (heroH1) (heroH1 as HTMLElement).focus()
        onComplete()
      },
    })
    masterTimelineRef.current = tl

    // -------------------------------------------------------------
    // PHASE A: CIRCLE MORPH & CENTER TRANSLATION (0.0s - 3.0s)
    // -------------------------------------------------------------
    // Build initial rough SVG path from user stroke
    if (morphPathRef.current && data.points.length > 2) {
      const dInitial = data.points
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
        .join(' ')
      morphPathRef.current.setAttribute('d', dInitial)
    }

    // Morph rough stroke into fitted circle & travel to screen center
    const circleObj = {
      cx: data.cx,
      cy: data.cy,
      r: data.radius,
      warmthVal: 0,
      blurVal: 14,
    }

    tl.to(circleObj, {
      cx: targetCx,
      cy: targetCy,
      r: targetRadius,
      warmthVal: 0.65, // Background warms to golden amber
      blurVal: 4, // Softens blur as circle focuses into center
      duration: 1.0,
      ease: 'power3.inOut',
      onUpdate: () => {
        setWarmth(circleObj.warmthVal)
        setBlurAmount(circleObj.blurVal)
        if (morphPathRef.current) {
          // Circle path around current (cx, cy)
          const dCircle = `M ${circleObj.cx - circleObj.r} ${circleObj.cy} ` +
            `a ${circleObj.r} ${circleObj.r} 0 1,0 ${circleObj.r * 2} 0 ` +
            `a ${circleObj.r} ${circleObj.r} 0 1,0 -${circleObj.r * 2} 0`
          morphPathRef.current.setAttribute('d', dCircle)
        }
      },
    }, 0)

    // Sun disc appears inside the circle
    tl.call(() => setPhase('sun_forming'), undefined, 0.9)

    tl.to(sunProps, {
      discScale: 1.0,
      duration: 0.8,
      ease: 'back.out(1.4)',
      onUpdate: () => setSunProps({ ...sunProps }),
    }, 1.0)

    // 16 Rays uncurl clockwise with S-waves
    tl.to(sunProps, {
      rayProgress: 1.0,
      haloOpacity: 0.8,
      duration: 1.4,
      ease: 'expo.out',
      onUpdate: () => setSunProps({ ...sunProps }),
    }, 1.5)

    // Fade out morphing stroke as sun takes over
    if (morphPathRef.current) {
      tl.to(morphPathRef.current, {
        opacity: 0,
        duration: 0.5,
      }, 1.6)
    }

    // -------------------------------------------------------------
    // PHASE B: GLOW AND DIM TWICE (3.0s - 4.6s)
    // -------------------------------------------------------------
    tl.call(() => setPhase('sun_glow'), undefined, 3.0)

    // Breath 1: dim -> glow
    tl.to(sunProps, {
      haloOpacity: 0.35,
      duration: 0.5,
      ease: 'sine.inOut',
      onUpdate: () => setSunProps({ ...sunProps }),
    }, 3.0)
    tl.to(sunProps, {
      haloOpacity: 0.95,
      duration: 0.5,
      ease: 'sine.inOut',
      onUpdate: () => setSunProps({ ...sunProps }),
    }, 3.5)

    // Breath 2: peak radiant hold + background warming to 0.85
    tl.to(sunProps, {
      haloOpacity: 1.35,
      duration: 0.45,
      ease: 'power2.out',
      onUpdate: () => setSunProps({ ...sunProps }),
    }, 4.0)

    tl.to(circleObj, {
      warmthVal: 0.85,
      blurVal: 10,
      duration: 0.6,
      onUpdate: () => {
        setWarmth(circleObj.warmthVal)
        setBlurAmount(circleObj.blurVal)
      },
    }, 4.0)

    // -------------------------------------------------------------
    // PHASE C: SUN TO SUNFLOWER BLOOM (4.6s - 6.6s)
    // -------------------------------------------------------------
    tl.call(() => setPhase('sunflower_bloom'), undefined, 4.6)

    // Fade sun wrapper as sunflower takes over
    tl.to(sunWrapperRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power1.out',
    }, 4.6)

    // Unfurl 32 petals & pop in phyllotaxis seeds on canvas
    const bloomObj = { p: 0, rot: 0, scale: 0.9 }
    tl.to(bloomObj, {
      p: 1.0,
      rot: 8,
      scale: 1.05,
      duration: 1.4,
      ease: 'back.out(1.8)',
      onUpdate: () => {
        setBloomProps({
          progress: bloomObj.p,
          scale: bloomObj.scale,
          rotation: bloomObj.rot,
        })
      },
    }, 4.6)

    // Settle bloom scale
    tl.to(bloomObj, {
      scale: 1.0,
      rot: 0,
      duration: 0.4,
      ease: 'sine.inOut',
      onUpdate: () => {
        setBloomProps({
          progress: bloomObj.p,
          scale: bloomObj.scale,
          rotation: bloomObj.rot,
        })
      },
    }, 6.0)

    // -------------------------------------------------------------
    // PHASE D: BLOOM EXPANDS & REVEALS HOME HERO (6.6s - 8.0s)
    // -------------------------------------------------------------
    tl.call(() => setPhase('hero_reveal'), undefined, 6.6)

    // Flower scales up while seed center opens as circular iris window
    const irisObj = { r: 0, bloomScale: 1.0, containerOpacity: 1.0 }

    tl.to(irisObj, {
      r: 150, // 150% radius unmasks entire viewport
      bloomScale: 4.8,
      containerOpacity: 0,
      duration: 1.2,
      ease: 'power3.inOut',
      onUpdate: () => {
        setIrisRadius(irisObj.r)
        setBloomProps((prev) => ({ ...prev, scale: irisObj.bloomScale }))
        if (containerRef.current) {
          containerRef.current.style.opacity = String(irisObj.containerOpacity)
        }
      },
    }, 6.6)
  }

  // Debug Stage Jumps
  const handleJumpStage = (targetPhase: SequencePhase) => {
    if (!masterTimelineRef.current) {
      handleCircleSuccess({
        cx: window.innerWidth / 2,
        cy: window.innerHeight / 2,
        radius: Math.min(window.innerWidth * 0.22, 160),
        points: [],
      })
    }
    setTimeout(() => {
      if (!masterTimelineRef.current) return
      if (targetPhase === 'draw') masterTimelineRef.current.seek(0)
      if (targetPhase === 'sun_forming') masterTimelineRef.current.seek(2.5)
      if (targetPhase === 'sun_glow') masterTimelineRef.current.seek(3.5)
      if (targetPhase === 'sunflower_bloom') masterTimelineRef.current.seek(5.2)
      if (targetPhase === 'hero_reveal') masterTimelineRef.current.seek(6.8)
    }, 50)
  }

  if (prefersReduced) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[900] select-none overflow-hidden"
      style={{
        pointerEvents: phase === 'finished' ? 'none' : 'auto',
        clipPath:
          phase === 'hero_reveal'
            ? `circle(${100 - irisRadius * 0.65}% at 50% 50%)`
            : 'none',
      }}
      role="region"
      aria-label="The Sun & Sunflower Entry Sequence"
    >
      {/* 1. Interactive Draw Screen Phase */}
      {phase === 'draw' && (
        <DrawCircleScreen
          onSuccess={handleCircleSuccess}
          onSkip={handleFastForward}
          warmth={warmth}
          blurAmount={blurAmount}
        />
      )}

      {/* 2. Sequence Animations After Circle (Misty Canvas + Sun + Sunflower) */}
      {phase !== 'draw' && (
        <>
          {/* Continuous Colorful Misty Canvas Background */}
          <MistyBackgroundCanvas
            warmth={warmth}
            blurAmount={blurAmount}
            rippleProgress={0}
          />

          {/* SVG Canvas for Rough Stroke to Perfect Circle Morph */}
          <svg
            ref={morphSvgRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: 'visible' }}
          >
            <path
              ref={morphPathRef}
              d=""
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: 'drop-shadow(0 0 10px #FFFFFF) drop-shadow(0 0 20px rgba(255, 235, 170, 0.8))',
              }}
            />
          </svg>

          {/* Sun Component Assembly */}
          <div
            ref={sunWrapperRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: phase === 'sun_forming' || phase === 'sun_glow' ? 1 : 0,
              transition: 'opacity 0.3s ease-out',
            }}
          >
            <Sun
              size="min(60vmin, 520px)"
              rayProgress={sunProps.rayProgress}
              discScale={sunProps.discScale}
              haloOpacity={sunProps.haloOpacity}
              animate={true}
            />
          </div>

          {/* Sunflower Bloom Assembly */}
          <div
            ref={bloomWrapperRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: phase === 'sunflower_bloom' || phase === 'hero_reveal' ? 1 : 0,
              transform: `scale(${bloomProps.scale})`,
              transition: 'opacity 0.3s ease-out',
            }}
          >
            <SunflowerBloom
              progress={bloomProps.progress}
              rotation={bloomProps.rotation}
              scale={1.0}
              size={560}
            />
          </div>

          {/* Skip / Fast-Forward Button */}
          <button
            type="button"
            onClick={handleFastForward}
            className="absolute top-6 right-8 z-50 px-4 py-1.5 text-xs tracking-[0.2em] uppercase font-mono text-[#FFF0BA] bg-black/40 hover:bg-[#FFF0BA] hover:text-[#07060B] border border-[#FFF0BA]/40 rounded-full transition-colors backdrop-blur-md cursor-pointer"
            aria-label="Skip animation"
          >
            Skip ▸ (Esc)
          </button>
        </>
      )}

      {/* 3. Dev HUD for ?debug=entry */}
      {isDebug && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[999] bg-[#161224]/90 border border-[#D9B45A]/40 rounded-xl px-5 py-3 backdrop-blur-lg flex items-center gap-3 text-xs font-mono text-[#FAF8F3]">
          <span className="text-[#D9B45A] font-bold">ENTRY HUD</span>
          <button
            type="button"
            onClick={() => handleJumpStage('draw')}
            className="px-2 py-1 bg-[#201835] hover:bg-[#D9B45A] hover:text-[#07060B] rounded border border-white/10"
          >
            Draw
          </button>
          <button
            type="button"
            onClick={() => handleJumpStage('sun_forming')}
            className="px-2 py-1 bg-[#201835] hover:bg-[#D9B45A] hover:text-[#07060B] rounded border border-white/10"
          >
            Sun
          </button>
          <button
            type="button"
            onClick={() => handleJumpStage('sun_glow')}
            className="px-2 py-1 bg-[#201835] hover:bg-[#D9B45A] hover:text-[#07060B] rounded border border-white/10"
          >
            Glow
          </button>
          <button
            type="button"
            onClick={() => handleJumpStage('sunflower_bloom')}
            className="px-2 py-1 bg-[#201835] hover:bg-[#D9B45A] hover:text-[#07060B] rounded border border-white/10"
          >
            Sunflower
          </button>
          <button
            type="button"
            onClick={() => handleJumpStage('hero_reveal')}
            className="px-2 py-1 bg-[#201835] hover:bg-[#D9B45A] hover:text-[#07060B] rounded border border-white/10"
          >
            Reveal
          </button>
          <div className="flex items-center gap-2 ml-2">
            <span>{(debugProgress * 8.0).toFixed(1)}s</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={debugProgress}
              onChange={(e) => {
                const val = parseFloat(e.target.value)
                if (masterTimelineRef.current) masterTimelineRef.current.progress(val)
              }}
              className="w-24 accent-[#D9B45A]"
            />
          </div>
        </div>
      )}
    </div>
  )
}
