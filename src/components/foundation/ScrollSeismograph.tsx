import { useEffect, useRef, useState, useCallback } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function ScrollSeismograph() {
  const prefersReduced = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [stressLevel, setStressLevel] = useState(0) // 0 to 1
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  // Velocity and history recording
  const velocityHistory = useRef<number[]>([])
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(performance.now())
  const currentVelocity = useRef(0)
  const animFrameId = useRef<number>(0)
  const isLoopRunning = useRef(false)
  const historyRef = useRef<number[]>(new Array(60).fill(0))

  // Render loop that only runs when active or settling
  const runRenderLoop = useCallback(() => {
    if (isLoopRunning.current) return
    isLoopRunning.current = true

    const canvas = canvasRef.current
    if (!canvas) {
      isLoopRunning.current = false
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      isLoopRunning.current = false
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    canvas.width = 180 * dpr
    canvas.height = 64 * dpr
    ctx.scale(dpr, dpr)

    const step = () => {
      // Ease current velocity towards 0
      currentVelocity.current *= 0.90
      const val = currentVelocity.current

      const hist = historyRef.current
      hist.shift()
      hist.push(val)
      velocityHistory.current.push(val)
      if (velocityHistory.current.length > 300) {
        velocityHistory.current.shift()
      }

      setStressLevel(Math.round(val * 100) / 100)

      // Draw Seismograph oscilloscope
      ctx.clearRect(0, 0, 180, 64)

      // Centerline
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)'
      ctx.lineWidth = 1
      ctx.moveTo(0, 32)
      ctx.lineTo(180, 32)
      ctx.stroke()

      // Seismic pulse line
      ctx.beginPath()
      ctx.lineWidth = 1.5
      ctx.strokeStyle = val > 0.6 ? '#E54B33' : val > 0.3 ? '#E07A1F' : '#D4AF37'

      const xStep = 180 / 60
      for (let i = 0; i < 60; i++) {
        const x = i * xStep
        const h = hist[i]
        const wave = Math.sin(i * 0.8) * h * 24
        const y = 32 + wave
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // If velocity has settled to near-zero, pause the loop to conserve CPU/battery
      if (val > 0.005) {
        animFrameId.current = requestAnimationFrame(step)
      } else {
        isLoopRunning.current = false
        currentVelocity.current = 0
      }
    }

    animFrameId.current = requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    lastScrollY.current = window.scrollY
    lastScrollTime.current = performance.now()

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const now = performance.now()
          const dt = Math.max(now - lastScrollTime.current, 10)
          const dy = Math.abs(window.scrollY - lastScrollY.current)
          const v = (dy / dt) * 16.67 // normalized speed

          currentVelocity.current = Math.min(v / 30, 1)
          lastScrollY.current = window.scrollY
          lastScrollTime.current = now

          // Trigger render loop if not running
          runRenderLoop()

          // Check if near bottom
          const scrollDist = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)
          setIsAtBottom(scrollDist < 300)

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(animFrameId.current)
    }
  }, [runRenderLoop])

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-40 px-3 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--surface)]/80 text-[10px] font-mono uppercase tracking-wider text-[var(--gold)] shadow-lg backdrop-blur-md hover:bg-[var(--gold)]/10 cursor-pointer"
        aria-label="Restore Scroll Seismograph"
      >
        ✦ Seismograph
      </button>
    )
  }

  return (
    <>
      {/* Floating Corner Seismograph Widget (with localized jitter on widget only, never on body) */}
      <aside
        className={`fixed bottom-4 right-4 z-40 p-2.5 rounded-xl border border-[var(--gold)]/40 backdrop-blur-md shadow-2xl select-none transition-transform duration-75 ${
          !prefersReduced && stressLevel > 0.6 ? 'translate-x-0.5' : ''
        }`}
        style={{
          background: 'rgba(12, 11, 20, 0.88)',
          width: '200px',
        }}
        aria-label="Scroll Seismograph Widget"
      >
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10 text-[9px] font-mono tracking-wider text-[var(--gold)]">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                stressLevel > 0.5 ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'
              }`}
            />
            <span>SEISMOGRAPH</span>
          </div>
          <div className="flex items-center gap-2">
            {isAtBottom && (
              <button
                onClick={() => setShowSummary(true)}
                className="text-amber-400 hover:underline cursor-pointer font-bold"
                aria-label="View visit graph summary"
              >
                SUMMARY
              </button>
            )}
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/40 hover:text-white cursor-pointer"
              aria-label="Hide Seismograph"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Live Canvas Waveform */}
        <div className="relative w-full h-[64px] bg-black/40 rounded overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full block" />
          <div className="absolute top-1 left-1.5 text-[8px] font-mono text-white/40">
            VELOCITY: {Math.round(stressLevel * 100)}%
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between text-[8px] font-mono text-white/50">
          <span>STABLE ATMAN</span>
          <span className={stressLevel > 0.5 ? 'text-rose-400 font-bold' : ''}>
            {stressLevel > 0.5 ? 'SURFACE STORM' : 'EQUANIMITY'}
          </span>
        </div>
      </aside>

      {/* End-of-Visit Modal Graph: "You were the still point." */}
      {showSummary && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="End of Visit Seismograph Summary"
        >
          <div
            className="w-full max-w-lg p-6 md:p-8 rounded-2xl border border-[var(--gold)] bg-[#0C0F24] text-[var(--text-primary)] shadow-2xl relative"
            style={{
              boxShadow: '0 0 60px rgba(212, 175, 55, 0.25)',
            }}
          >
            <button
              onClick={() => setShowSummary(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-sm cursor-pointer"
              aria-label="Close summary modal"
            >
              ✕
            </button>

            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[var(--gold)] block font-bold mb-2">
              Contemplative Journey Log
            </span>
            <h3
              className="text-2xl md:text-3xl font-bold tracking-wide text-white mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              "You were the still point."
            </h3>

            <p className="text-sm text-white/70 italic leading-relaxed font-serif mb-6">
              Throughout your passage across the 18 Upanishadic chambers, life stirred velocity, questions rose, and attention ebbed and flowed. The recording reveals where you paused, lingered in contemplation, and reclaimed your still center.
            </p>

            {/* Visit Graph Visualization */}
            <div className="w-full h-28 bg-black/50 border border-white/10 rounded-xl p-3 flex flex-col justify-end relative overflow-hidden mb-4">
              <div className="absolute inset-x-0 bottom-8 h-[1px] bg-white/10" />
              {/* Highlight calmest stretch */}
              <div className="absolute left-[35%] w-[30%] inset-y-0 bg-[var(--gold)]/15 border-x border-[var(--gold)]/40 flex items-start justify-center pt-1">
                <span className="text-[8px] font-mono uppercase text-[var(--gold)] tracking-widest">
                  ★ Calmest Sanctuary
                </span>
              </div>
              {/* Waveform representation */}
              <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                <path
                  d="M0,50 Q20,30 40,55 T80,35 T120,40 T160,42 T200,38 T240,65 T280,25 T300,45"
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-white/60 pt-3 border-t border-white/10">
              <span>Overall Stability: 88%</span>
              <button
                onClick={() => setShowSummary(false)}
                className="px-4 py-1.5 rounded-full bg-[var(--gold)] text-black font-bold uppercase tracking-wider text-[11px] hover:bg-amber-300 transition-all cursor-pointer"
              >
                Continue Contemplation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
