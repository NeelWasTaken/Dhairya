import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { subscribePortalTransition } from '../components/animations/PortalTransition'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ── GLOBAL REVEAL REGISTRY FOR ?debug=text ──────────────────────
export interface RevealDebugItem {
  id: string
  label: string
  type: string
  origin: string
  triggerMode: 'mount' | 'scroll'
  state: 'pending' | 'playing' | 'done'
  failsafeTriggered: boolean
  replay?: () => void
}

const revealRegistry = new Map<string, RevealDebugItem>()
const registryListeners = new Set<() => void>()

export function registerRevealItem(item: RevealDebugItem) {
  revealRegistry.set(item.id, item)
  if (typeof window !== 'undefined') {
    window.__DHAIRYA_REVEALS__ = revealRegistry
  }
  registryListeners.forEach(fn => fn())
}

export function updateRevealItemState(id: string, state: 'pending' | 'playing' | 'done', failsafeTriggered: boolean = false) {
  const existing = revealRegistry.get(id)
  if (existing) {
    existing.state = state
    existing.failsafeTriggered = failsafeTriggered
    registryListeners.forEach(fn => fn())
  }
}

export function unregisterRevealItem(id: string) {
  revealRegistry.delete(id)
  registryListeners.forEach(fn => fn())
}

export function subscribeRevealRegistry(fn: () => void) {
  registryListeners.add(fn)
  return () => {
    registryListeners.delete(fn)
  }
}

export function getAllRevealItems(): RevealDebugItem[] {
  return Array.from(revealRegistry.values())
}

declare global {
  interface Window {
    __DHAIRYA_REVEALS__?: Map<string, RevealDebugItem>
  }
}

// ── usePageReady HOOK ───────────────────────────────────────────
export function usePageReady(stepKey?: string | number): boolean {
  const location = useLocation()
  const [fontsReady, setFontsReady] = useState(false)
  const [portalDone, setPortalDone] = useState(true)

  // 1. Wait for document.fonts.ready
  useEffect(() => {
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setFontsReady(true)
        ScrollTrigger.refresh()
      }).catch(() => {
        setFontsReady(true)
      })
    } else {
      setFontsReady(true)
    }
  }, [])

  // 2. Listen to portal transition completion
  useEffect(() => {
    const unsubscribe = subscribePortalTransition((isTransitioning) => {
      setPortalDone(!isTransitioning)
    })
    return unsubscribe
  }, [])

  // 3. Lifecycle hooks on route / step change: kill dead triggers, refresh ScrollTrigger
  useEffect(() => {
    // Clear out stale reveals from previous page
    revealRegistry.clear()
    registryListeners.forEach(fn => fn())

    // Refresh ScrollTrigger cleanly
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    return () => {
      clearTimeout(refreshTimer)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [location.pathname])

  // Step change refresh
  useEffect(() => {
    if (stepKey !== undefined) {
      const stepTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
      return () => clearTimeout(stepTimer)
    }
  }, [stepKey])

  // Debounced window resize handler (200ms)
  useEffect(() => {
    let resizeTimer: number
    const handleResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh()
      }, 200)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.clearTimeout(resizeTimer)
    }
  }, [])

  return fontsReady && portalDone
}
