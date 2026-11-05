import { useState, useEffect } from 'react'

export interface DevicePerformance {
  isLite: boolean
  prefersReduced: boolean
  isTouch: boolean
}

export function checkIsLiteMode(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false

  const cores = navigator.hardwareConcurrency || 8
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  // Desktops (>4 cores & >4GB RAM) must NOT default to lite mode
  if (cores > 4 && memory > 4) return false

  // Truly resource-constrained device
  return cores <= 4 && (memory <= 4 || isTouch)
}

export function useDevicePerformance(): DevicePerformance {
  const [perf, setPerf] = useState<DevicePerformance>(() => ({
    isLite: false,
    prefersReduced: false,
    isTouch: false,
  }))

  useEffect(() => {
    const isLite = checkIsLiteMode()
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const update = () => {
      setPerf({
        isLite,
        prefersReduced: mq.matches,
        isTouch,
      })
    }

    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return perf
}
