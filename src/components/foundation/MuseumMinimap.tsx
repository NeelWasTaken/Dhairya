import { useState, useEffect } from 'react'
import galleryExhibits from '../../content/galleryExhibits.json'
import { useWorld } from './ThreeWorldsProvider'

export default function MuseumMinimap() {
  const { currentChapter } = useWorld()
  const [isOpen, setIsOpen] = useState(false)
  const [visitedRooms, setVisitedRooms] = useState<Set<number>>(new Set([0]))

  useEffect(() => {
    setVisitedRooms((prev) => {
      const next = new Set(prev)
      next.add(currentChapter)
      return next
    })
  }, [currentChapter])

  const scrollToRoom = (chNum: number) => {
    const el = document.getElementById(`ch-${chNum}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      {/* Trigger Button in Nav */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface)]/80 hover:border-[var(--gold)]/60 text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] transition-all cursor-pointer backdrop-blur-sm"
        aria-label="Toggle Museum Floorplan Minimap"
        aria-expanded={isOpen}
      >
        <svg className="w-3.5 h-3.5 text-[var(--gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        <span className="hidden sm:inline">Room {currentChapter}</span>
        <span className="text-[10px] text-[var(--gold)]">✦</span>
      </button>

      {/* Popover Floor-Plan Minimap */}
      {isOpen && (
        <div
          className="absolute right-0 top-12 z-50 w-80 md:w-96 p-5 rounded-2xl border border-[var(--gold)]/40 shadow-2xl backdrop-blur-xl animate-fade-in"
          style={{
            background: 'var(--world-surface, #141322)',
            color: 'var(--text-primary)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 175, 55, 0.15)',
          }}
        >
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-hairline)]">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--gold)] block font-bold">
                Exhibition Floor Plan
              </span>
              <h4 className="text-sm font-serif font-bold text-[var(--text-primary)]">
                Dhairya: 18 Gallery Chambers
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 cursor-pointer"
              aria-label="Close Floor Plan"
            >
              ✕
            </button>
          </div>

          {/* Grid of 18 Museum Rooms */}
          <div className="grid grid-cols-6 gap-2 mb-4">
            {galleryExhibits.exhibits.map((ex) => {
              const isActive = ex.chapter === currentChapter
              const isVisited = visitedRooms.has(ex.chapter)

              return (
                <button
                  key={ex.chapter}
                  onClick={() => scrollToRoom(ex.chapter)}
                  className={`relative aspect-square flex flex-col items-center justify-center rounded-md border text-xs font-mono font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'border-[var(--gold)] bg-[var(--gold)] text-black shadow-[0_0_15px_rgba(212,175,55,0.7)] scale-105 z-10'
                      : isVisited
                      ? 'border-[var(--gold)]/40 bg-[var(--gold)]/15 text-[var(--gold)]'
                      : 'border-white/10 bg-white/5 text-[var(--text-muted)] hover:border-white/30'
                  }`}
                  title={`${ex.room}: ${ex.source}`}
                  aria-label={`Go to ${ex.room}`}
                >
                  <span>{ex.chapter}</span>
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Active Chamber Details */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
            <div className="flex items-center justify-between text-[11px] text-[var(--gold)] font-mono mb-1">
              <span>{galleryExhibits.exhibits[currentChapter]?.room}</span>
              <span className="italic font-serif">{galleryExhibits.exhibits[currentChapter]?.sanskrit}</span>
            </div>
            <p className="font-semibold text-[var(--text-primary)] truncate">
              {galleryExhibits.exhibits[currentChapter]?.source}
            </p>
            <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mt-1">
              {galleryExhibits.exhibits[currentChapter]?.curatorialNote}
            </p>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] mt-3 pt-2 border-t border-[var(--border-hairline)] font-mono">
            <span>Visited: {visitedRooms.size}/18 Rooms</span>
            <span className="text-[var(--gold)]">✦ Gold = Explored</span>
          </div>
        </div>
      )}
    </div>
  )
}
