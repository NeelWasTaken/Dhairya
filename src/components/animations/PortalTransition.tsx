import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface PortalEventDetail {
  x: number
  y: number
  to: string
  nextTitle?: string
  worldColor?: string
}

type PortalListener = (isTransitioning: boolean) => void
const portalListeners = new Set<PortalListener>()
let isPortalCurrentlyActive = false

export function getIsPortalActive(): boolean {
  return isPortalCurrentlyActive
}

export function subscribePortalTransition(fn: PortalListener) {
  portalListeners.add(fn)
  fn(isPortalCurrentlyActive)
  return () => {
    portalListeners.delete(fn)
  }
}

function notifyPortalListeners(active: boolean) {
  isPortalCurrentlyActive = active
  portalListeners.forEach(fn => fn(active))
}

let portalTriggerFn: ((detail: PortalEventDetail) => void) | null = null

export function triggerPortalTransition(detail: PortalEventDetail) {
  if (portalTriggerFn) {
    portalTriggerFn(detail)
  } else {
    // Fallback if portal not mounted
    window.location.href = detail.to
  }
}

export default function PortalTransition() {
  const navigate = useNavigate()
  const prefersReduced = useReducedMotion()

  const [active, setActive] = useState(false)
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 50, y: 50 })
  const [worldColor, setWorldColor] = useState('#0B0F19')
  const [nextTitle, setNextTitle] = useState('')
  const [stage, setStage] = useState<'idle' | 'expanding' | 'landing'>('idle')

  const handleTrigger = useCallback((detail: PortalEventDetail) => {
    if (active) return

    setCoords({ x: detail.x, y: detail.y })
    setWorldColor(detail.worldColor || '#07060B')
    setNextTitle(detail.nextTitle || '')
    setActive(true)
    notifyPortalListeners(true)

    if (prefersReduced) {
      setTimeout(() => {
        navigate(detail.to)
        window.scrollTo({ top: 0, behavior: 'instant' })
        setTimeout(() => {
          setActive(false)
          notifyPortalListeners(false)
        }, 200)
      }, 150)
      return
    }

    setStage('expanding')

    // Midpoint: navigate and reset scroll
    setTimeout(() => {
      navigate(detail.to)
      window.scrollTo({ top: 0, behavior: 'instant' })
      setStage('landing')

      // Complete transition
      setTimeout(() => {
        setActive(false)
        setStage('idle')
        notifyPortalListeners(false)
      }, 500)
    }, 450)
  }, [active, navigate, prefersReduced])

  useEffect(() => {
    portalTriggerFn = handleTrigger
    return () => {
      portalTriggerFn = null
    }
  }, [handleTrigger])

  if (!active) return null

  if (prefersReduced) {
    return (
      <div
        className="fixed inset-0 z-[99995] pointer-events-none transition-opacity duration-300 bg-[var(--bg-primary)] opacity-90"
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className="fixed inset-0 z-[99995] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Radial Iris Wipe expanding from click coordinates */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={{
          background: `radial-gradient(circle at ${coords.x}px ${coords.y}px, rgba(201,162,58,0.25) 0%, ${worldColor} 65%)`,
          clipPath: stage === 'expanding'
            ? `circle(160% at ${coords.x}px ${coords.y}px)`
            : stage === 'landing'
            ? `circle(160% at ${coords.x}px ${coords.y}px)`
            : `circle(0px at ${coords.x}px ${coords.y}px)`,
          opacity: stage === 'landing' ? 0 : 1,
          transition: 'clip-path 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease',
        }}
      >
        {/* Central expanding golden aura */}
        <div
          className="absolute rounded-full border border-[var(--gold)]/40 -translate-x-1/2 -translate-y-1/2 animate-ping"
          style={{
            left: coords.x,
            top: coords.y,
            width: '120px',
            height: '120px',
          }}
        />

        {/* Transient Next Title Kinetic Mask Reveal */}
        {nextTitle && stage === 'landing' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-4xl md:text-5xl font-[var(--font-heading)] gold-shimmer animate-mask-rise"
            >
              {nextTitle}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
