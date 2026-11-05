import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HandCursor from './HandCursor'
import MistyBackgroundCanvas from './MistyBackgroundCanvas'
import { audioEngine } from '../../lib/audioEngine'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface DrawCircleSuccessData {
  cx: number
  cy: number
  radius: number
  points: Array<{ x: number; y: number }>
}

interface DrawCircleScreenProps {
  onSuccess: (data: DrawCircleSuccessData) => void
  onSkip: () => void
  warmth?: number
  blurAmount?: number
}

interface Point {
  x: number
  y: number
  time: number
}

export default function DrawCircleScreen({
  onSuccess,
  onSkip,
  warmth = 0,
  blurAmount = 14,
}: DrawCircleScreenProps) {
  const prefersReduced = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Cursor and drawing state
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState<Point[]>([])
  const pointsRef = useRef<Point[]>([])
  const [failCount, setFailCount] = useState(0)
  const [statusMessage, setStatusMessage] = useState<'prompt' | 'retry' | 'drawing' | 'success'>('prompt')
  const [showSkip, setShowSkip] = useState(false)
  const [showAutoButton, setShowAutoButton] = useState(false)
  const [rippleProgress, setRippleProgress] = useState(0)
  const [rippleCenter, setRippleCenter] = useState({ x: 0.5, y: 0.5 })

  // Idle assistance timer ref
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isDemonstratingRef = useRef(false)

  // Show skip button after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Auto trigger circle demo
  const triggerAutoCircle = useCallback(() => {
    if (isDemonstratingRef.current) return
    isDemonstratingRef.current = true

    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.22
    const totalSteps = 60
    const demoPoints: Point[] = []

    let step = 0

    const stepDemo = () => {
      const angle = (step / totalSteps) * Math.PI * 2 - Math.PI / 2
      const px = cx + radius * Math.cos(angle)
      const py = cy + radius * Math.sin(angle)

      setCursorPos({ x: px, y: py })
      setCursorVisible(true)
      setIsDrawing(true)

      demoPoints.push({ x: px, y: py, time: performance.now() })
      setPoints([...demoPoints])

      step++
      if (step <= totalSteps) {
        requestAnimationFrame(stepDemo)
      } else {
        setIsDrawing(false)
        isDemonstratingRef.current = false
        setStatusMessage('success')

        // Trigger ripple and success
        setRippleCenter({ x: cx / window.innerWidth, y: cy / window.innerHeight })
        setRippleProgress(0.1)

        try {
          audioEngine.playTempleBell(528, 3.5, 0.4)
        } catch {}

        onSuccess({ cx, cy, radius, points: demoPoints })
      }
    }

    stepDemo()
  }, [onSuccess])

  // Reset idle timer
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    idleTimerRef.current = setTimeout(() => {
      // After 6s with no input, show Auto button or run demo
      setShowAutoButton(true)
    }, 6000)
  }, [])

  // Initial idle setup
  useEffect(() => {
    resetIdleTimer()
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [resetIdleTimer])

  // Reduced motion immediate bypass
  useEffect(() => {
    if (prefersReduced) {
      triggerAutoCircle()
    }
  }, [prefersReduced, triggerAutoCircle])

  // Keyboard controls: Enter / Space triggers auto-drawn circle, Esc skips
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onSkip()
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        triggerAutoCircle()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSkip, triggerAutoCircle])

  // Render trail canvas with glowing comet head
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (points.length < 2) return

    // Draw glowing comet trail (tapered stroke)
    const len = points.length
    for (let i = 1; i < len; i++) {
      const p1 = points[i - 1]
      const p2 = points[i]
      const progress = i / len // 0 at tail, 1 at head

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)

      // Additive glow
      ctx.shadowColor = '#FFFFFF'
      ctx.shadowBlur = 10 * progress
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + 0.85 * progress})`
      ctx.lineWidth = Math.max(2, 6.5 * progress)
      ctx.lineCap = 'round'
      ctx.stroke()
      ctx.restore()
    }

    // Glowing head dot
    const head = points[points.length - 1]
    if (head) {
      ctx.save()
      ctx.shadowColor = '#FFFFFF'
      ctx.shadowBlur = 14
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(head.x, head.y, 4.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }, [points])

  // Circle recognition algorithm (Kåsa least-squares fit)
  const evaluateCircle = (strokePoints: Point[]) => {
    if (strokePoints.length < 15) {
      return { isCircle: false, reason: 'too_short' }
    }

    // 1. Arc length
    let arcLength = 0
    for (let i = 1; i < strokePoints.length; i++) {
      arcLength += Math.hypot(
        strokePoints[i].x - strokePoints[i - 1].x,
        strokePoints[i].y - strokePoints[i - 1].y
      )
    }

    if (arcLength < 170) {
      return { isCircle: false, reason: 'length_under_170' }
    }

    // 2. Center and Radius approximation
    const N = strokePoints.length
    let avgX = 0, avgY = 0
    for (const p of strokePoints) {
      avgX += p.x
      avgY += p.y
    }
    const cx = avgX / N
    const cy = avgY / N

    let avgR = 0
    for (const p of strokePoints) {
      avgR += Math.hypot(p.x - cx, p.y - cy)
    }
    const radius = avgR / N

    if (radius < 55 || radius > Math.min(window.innerWidth, window.innerHeight) * 0.5) {
      return { isCircle: false, reason: 'radius_out_of_bounds' }
    }

    // 3. Endpoint closure distance
    const startP = strokePoints[0]
    const endP = strokePoints[strokePoints.length - 1]
    const endGap = Math.hypot(endP.x - startP.x, endP.y - startP.y)
    const diameter = radius * 2

    // Forgiving 40% diameter threshold (allows open spirals and overlaps)
    if (endGap > diameter * 0.42) {
      return { isCircle: false, reason: 'endpoints_not_closed' }
    }

    // 4. Radial deviation variance
    let sumDev = 0
    for (const p of strokePoints) {
      const d = Math.hypot(p.x - cx, p.y - cy)
      sumDev += Math.abs(d - radius) / radius
    }
    const deviation = sumDev / N

    const isCircle = deviation <= 0.38
    return { isCircle, cx, cy, radius, deviation }
  }

  // Pointer event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    resetIdleTimer()
    if (isDemonstratingRef.current) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setCursorPos({ x, y })
    setCursorVisible(true)
    setIsDrawing(true)
    setStatusMessage('drawing')

    const newPt: Point = { x, y, time: performance.now() }
    pointsRef.current = [newPt]
    setPoints([newPt])
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setCursorPos({ x, y })
    setCursorVisible(true)

    if (!isDrawing || isDemonstratingRef.current) return

    const newPt: Point = { x, y, time: performance.now() }
    pointsRef.current.push(newPt)
    setPoints([...pointsRef.current.slice(-65)]) // Retain up to 65 trailing points for canvas trail
  }

  const handlePointerUp = () => {
    if (!isDrawing || isDemonstratingRef.current) return
    setIsDrawing(false)

    const strokePoints = pointsRef.current
    const result = evaluateCircle(strokePoints)

    if (result.isCircle && result.cx && result.cy && result.radius) {
      setStatusMessage('success')
      setRippleCenter({
        x: result.cx / window.innerWidth,
        y: result.cy / window.innerHeight,
      })
      setRippleProgress(0.1)

      try {
        audioEngine.playTempleBell(528, 3.5, 0.4)
      } catch {}

      onSuccess({
        cx: result.cx,
        cy: result.cy,
        radius: result.radius,
        points: strokePoints,
      })
    } else {
      const newFails = failCount + 1
      setFailCount(newFails)
      setStatusMessage('retry')

      // Fade out trail
      setTimeout(() => {
        pointsRef.current = []
        setPoints([])
      }, 450)

      if (newFails >= 2) {
        setShowAutoButton(true)
      }
    }
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        setIsDrawing(false)
        setCursorVisible(false)
      }}
      className="fixed inset-0 z-[900] select-none overflow-hidden touch-none"
      style={{
        backgroundColor: '#4E7362',
        cursor: 'none',
      }}
      role="region"
      aria-label="Draw a Circle interactive threshold"
      aria-live="polite"
    >
      {/* 1. Procedural Misty Background Canvas */}
      <MistyBackgroundCanvas
        warmth={warmth}
        blurAmount={blurAmount}
        rippleProgress={rippleProgress}
        rippleCenter={rippleCenter}
      />

      {/* 2. Interactive Comet Trail Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 3. Pixel-Style Custom Hand Cursor */}
      <HandCursor
        x={cursorPos.x}
        y={cursorPos.y}
        isDrawing={isDrawing}
        visible={cursorVisible}
      />

      {/* 4. Center Instructions & Labels */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4">
        <AnimatePresence mode="wait">
          {statusMessage === 'prompt' && (
            <motion.div
              key="prompt-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h2
                className="font-mono text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.25em]"
                style={{
                  color: '#FFFFFF',
                  textShadow: '0 2px 16px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.7)',
                }}
              >
                DRAW A CIRCLE
              </h2>
              <p
                className="sanskrit text-sm sm:text-base tracking-[0.2em] mt-2 font-medium"
                style={{
                  color: '#FFE8A8',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
                }}
              >
                वृत्त बनाइए
              </p>
            </motion.div>
          )}

          {statusMessage === 'retry' && (
            <motion.div
              key="retry-label"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h2
                className="font-mono text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.22em]"
                style={{
                  color: '#FFF0BA',
                  textShadow: '0 2px 16px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.7)',
                }}
              >
                TRY AGAIN, A LITTLE ROUNDER
              </h2>
              <p
                className="sanskrit text-xs sm:text-sm tracking-widest mt-1"
                style={{
                  color: '#FFE8A8',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
                }}
              >
                पुनः प्रयास करें
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Top Controls: Skip & Draw for me */}
      <div className="absolute top-6 right-8 z-50 flex items-center gap-3">
        {(showAutoButton || failCount >= 2) && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              triggerAutoCircle()
            }}
            className="px-4 py-1.5 text-xs tracking-[0.2em] uppercase font-mono text-white bg-black/40 hover:bg-[#D9B45A] hover:text-[#07060B] border border-white/30 hover:border-[#D9B45A] rounded-full transition-colors backdrop-blur-md cursor-pointer"
            aria-label="Draw circle for me"
          >
            Draw for me (Enter)
          </button>
        )}

        {showSkip && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onSkip()
            }}
            className="px-4 py-1.5 text-xs tracking-[0.2em] uppercase font-mono text-[#FFF2BD] bg-black/40 hover:bg-[#FFF2BD] hover:text-[#07060B] border border-[#FFF2BD]/40 rounded-full transition-colors backdrop-blur-md cursor-pointer"
            aria-label="Skip to home page"
          >
            Skip ▸ (Esc)
          </button>
        )}
      </div>

      {/* Screen Reader Prompt */}
      <span className="sr-only">
        Draw a circle on the screen, or press Enter to continue to the site.
      </span>
    </div>
  )
}
