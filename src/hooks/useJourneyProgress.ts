import { useState, useEffect, useMemo, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import upanishadsData from '../content/upanishads.json'

export interface UpanishadMeta {
  index: number
  slug: string
  title: string
  devanagari: string
  sanskritTitle: string
  iast: string
  path: string
  shakha: string
  dateRange: string
  world: 'cave' | 'forest' | 'cosmic'
  theme: string
  teaser: string
  galleryNote: string
}

const STORAGE_KEY = 'dhairya_progress_v1'

interface SavedProgress {
  visitedPaths: string[]
  lastVisitedPath: string
  completedIndex: number
}

export function useJourneyProgress() {
  const location = useLocation()
  const upanishads = upanishadsData as UpanishadMeta[]

  const [progress, setProgress] = useState<SavedProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch {}
    return {
      visitedPaths: ['/'],
      lastVisitedPath: '/upanishad/isha',
      completedIndex: 0,
    }
  })

  // Determine current active Upanishad if on an /upanishad/:slug route
  const currentUpanishad = useMemo(() => {
    return upanishads.find(u => location.pathname.startsWith(u.path)) || null
  }, [location.pathname, upanishads])

  const currentIndex = currentUpanishad ? currentUpanishad.index : 0

  // Calculate prev and next
  const prevUpanishad = useMemo(() => {
    if (!currentUpanishad || currentUpanishad.index <= 1) return null
    return upanishads[currentUpanishad.index - 2]
  }, [currentUpanishad, upanishads])

  const nextUpanishad = useMemo(() => {
    if (!currentUpanishad) return upanishads[0]
    if (currentUpanishad.index >= upanishads.length) return null
    return upanishads[currentUpanishad.index]
  }, [currentUpanishad, upanishads])

  // Mark current route as visited
  useEffect(() => {
    const currentPath = location.pathname
    setProgress(prev => {
      const nextVisited = Array.from(new Set([...prev.visitedPaths, currentPath]))
      const nextCompleted = currentUpanishad ? Math.max(prev.completedIndex, currentUpanishad.index) : prev.completedIndex
      const updated: SavedProgress = {
        visitedPaths: nextVisited,
        lastVisitedPath: currentPath,
        completedIndex: nextCompleted,
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {}
      return updated
    })
  }, [location.pathname, currentUpanishad])

  const isVisited = useCallback((path: string) => {
    return progress.visitedPaths.includes(path)
  }, [progress.visitedPaths])

  // Resume path: highest visited upanishad or next unvisited
  const resumePath = useMemo(() => {
    const nextUnvisited = upanishads.find(u => !progress.visitedPaths.includes(u.path))
    if (nextUnvisited) return nextUnvisited.path
    return progress.lastVisitedPath || '/upanishad/isha'
  }, [progress, upanishads])

  // Journey progress ratio: 0.0 at Prologue/Isha to 1.0 at Epilogue/Credits
  const journeyProgressRatio = useMemo(() => {
    if (location.pathname === '/' || location.pathname === '/prologue') return 0.0
    if (location.pathname === '/corpus') return 0.05
    if (currentUpanishad) {
      return 0.08 + (currentUpanishad.index / 12) * 0.72
    }
    if (location.pathname === '/storm') return 0.82
    if (location.pathname === '/practices') return 0.88
    if (location.pathname === '/critiques') return 0.92
    if (location.pathname === '/epilogue') return 0.97
    if (location.pathname === '/credits') return 1.0
    return 0.5
  }, [location.pathname, currentUpanishad])

  return {
    upanishads,
    currentUpanishad,
    currentIndex,
    prevUpanishad,
    nextUpanishad,
    isVisited,
    resumePath,
    journeyProgressRatio,
    completedCount: progress.completedIndex,
  }
}
