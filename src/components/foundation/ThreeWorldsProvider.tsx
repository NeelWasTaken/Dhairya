import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import worldsData from '../../content/worlds.json'
import { audioEngine } from '../../lib/audioEngine'

export type WorldId = 'cave' | 'forest' | 'cosmic'

export interface WorldDefinition {
  id: WorldId
  name: string
  sanskrit: string
  description: string
  bg: string
  surface: string
  accent: string
  accentSecondary: string
  glow: string
  text: string
  textMuted: string
  soundBed: string
  revealOrigin: string
}

interface ThreeWorldsContextType {
  activeWorldId: WorldId
  activeWorld: WorldDefinition
  setWorld: (world: WorldId) => void
  currentChapter: number
}

const ThreeWorldsContext = createContext<ThreeWorldsContextType>({
  activeWorldId: 'forest',
  activeWorld: worldsData.worlds.forest as WorldDefinition,
  setWorld: () => {},
  currentChapter: 0,
})

export function useWorld() {
  return useContext(ThreeWorldsContext)
}

interface ThreeWorldsProviderProps {
  children: ReactNode
}

export default function ThreeWorldsProvider({ children }: ThreeWorldsProviderProps) {
  const [activeWorldId, setActiveWorldId] = useState<WorldId>('forest')
  const [currentChapter, setCurrentChapter] = useState<number>(0)

  const activeWorld = (worldsData.worlds as Record<string, WorldDefinition>)[activeWorldId] || worldsData.worlds.forest

  // Apply world variables to document root for smooth transitions
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--world-bg', activeWorld.bg)
    root.style.setProperty('--world-surface', activeWorld.surface)
    root.style.setProperty('--world-accent', activeWorld.accent)
    root.style.setProperty('--world-accent-secondary', activeWorld.accentSecondary)
    root.style.setProperty('--world-glow', activeWorld.glow)
    root.style.setProperty('--world-text', activeWorld.text)
    root.style.setProperty('--world-text-muted', activeWorld.textMuted)

    // Notify AudioEngine if sound is on
    if (audioEngine.getIsSoundEnabled() && !audioEngine.getIsMuted()) {
      if (activeWorldId === 'cave') {
        // low drone resonance
        audioEngine.setStormIntensity(1)
      } else if (activeWorldId === 'cosmic') {
        audioEngine.setStormIntensity(0)
      } else {
        audioEngine.setStormIntensity(0)
      }
    }
  }, [activeWorldId, activeWorld])

  // Track active chapter via IntersectionObserver on each chapter section
  useEffect(() => {
    const chapterEls = document.querySelectorAll('section[id^="ch-"]')
    if (!chapterEls.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const chId = entry.target.id.replace('ch-', '')
            const chNum = parseInt(chId, 10)
            if (!isNaN(chNum)) {
              setCurrentChapter(chNum)
              const mappedWorld = (worldsData.chapterWorldMapping as Record<string, string>)[chId] as WorldId
              if (mappedWorld && mappedWorld !== activeWorldId) {
                setActiveWorldId(mappedWorld)
              }
            }
          }
        })
      },
      { threshold: 0.35 }
    )

    chapterEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [activeWorldId])

  return (
    <ThreeWorldsContext.Provider
      value={{
        activeWorldId,
        activeWorld,
        setWorld: setActiveWorldId,
        currentChapter,
      }}
    >
      {children}
    </ThreeWorldsContext.Provider>
  )
}
