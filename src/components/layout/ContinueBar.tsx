import { useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { triggerPortalTransition } from '../animations/PortalTransition'

interface ContinueBarProps {
  currentIndex: number
  totalCount?: number
  prev?: { title: string; path: string; devanagari?: string } | null
  next?: { title: string; path: string; devanagari?: string; teaser?: string } | null
  worldColor?: string
}

export default function ContinueBar({
  currentIndex,
  totalCount = 12,
  prev,
  next,
  worldColor = '#07060B',
}: ContinueBarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  const handleNavigate = useCallback(
    (e: React.MouseEvent<HTMLElement>, to: string, nextTitle?: string) => {
      e.preventDefault()
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const x = e.clientX || rect.left + rect.width / 2
      const y = e.clientY || rect.top + rect.height / 2
      triggerPortalTransition({
        x,
        y,
        to,
        nextTitle,
        worldColor,
      })
    },
    [worldColor]
  )

  // Keyboard navigation: Left/Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea') return

      if (e.key === 'ArrowRight' && next) {
        e.preventDefault()
        triggerPortalTransition({
          x: window.innerWidth * 0.75,
          y: window.innerHeight * 0.85,
          to: next.path,
          nextTitle: next.title,
          worldColor,
        })
      } else if (e.key === 'ArrowLeft' && prev) {
        e.preventDefault()
        triggerPortalTransition({
          x: window.innerWidth * 0.25,
          y: window.innerHeight * 0.85,
          to: prev.path,
          nextTitle: prev.title,
          worldColor,
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prev, next, worldColor])

  // Mobile Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null

    // Swipe threshold 60px
    if (deltaX < -60 && next) {
      // Swiped Left -> go Next
      triggerPortalTransition({
        x: window.innerWidth * 0.8,
        y: window.innerHeight * 0.85,
        to: next.path,
        nextTitle: next.title,
        worldColor,
      })
    } else if (deltaX > 60 && prev) {
      // Swiped Right -> go Prev
      triggerPortalTransition({
        x: window.innerWidth * 0.2,
        y: window.innerHeight * 0.85,
        to: prev.path,
        nextTitle: prev.title,
        worldColor,
      })
    }
  }

  return (
    <nav
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Continue journey navigation"
      className="w-full max-w-[1200px] mx-auto mt-16 pt-8 pb-10 border-t border-[var(--border-color)] bg-[var(--surface)]/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden"
    >
      <div className="w-full max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Previous Upanishad */}
        <div className="w-full md:w-1/3 flex items-center justify-start">
          {prev ? (
            <Link
              to={prev.path}
              onClick={(e) => handleNavigate(e, prev.path, prev.title)}
              className="group inline-flex items-center gap-3 text-left p-3 rounded-xl hover:bg-[var(--surface-sunken)] transition-all cursor-pointer"
            >
              <span className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-sm text-[var(--gold)] group-hover:scale-110 transition-transform">
                ←
              </span>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-[var(--font-marginalia)] block">
                  Previous
                </span>
                <span className="font-[var(--font-heading)] text-sm md:text-base text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors">
                  {prev.devanagari ? `${prev.devanagari} · ` : ''}{prev.title}
                </span>
              </div>
            </Link>
          ) : (
            <Link
              to="/corpus"
              onClick={(e) => handleNavigate(e, '/corpus', 'Corpus & Milieu')}
              className="group inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--gold)] p-3 transition-colors"
            >
              ← Back to Corpus & Sages
            </Link>
          )}
        </div>

        {/* Center: Journey Page Indicator */}
        <div className="w-full md:w-1/3 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-xs font-[var(--font-marginalia)] tracking-widest uppercase text-[var(--gold)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            Page {currentIndex} of {totalCount}
          </div>
          <span className="block text-[11px] text-[var(--text-muted)] mt-1 tracking-wide">
            Use ← / → keys or swipe
          </span>
        </div>

        {/* Right: Next Upanishad (Hero Continue Action) */}
        <div className="w-full md:w-1/3 flex items-center justify-end">
          {next ? (
            <Link
              to={next.path}
              onClick={(e) => handleNavigate(e, next.path, next.title)}
              className="group w-full md:w-auto inline-flex items-center justify-between md:justify-end gap-4 p-4 rounded-xl bg-gradient-to-r from-[var(--gold)]/10 to-[var(--gold)]/20 hover:from-[var(--gold)]/20 hover:to-[var(--gold)]/30 border border-[var(--gold)]/40 hover:border-[var(--gold)] transition-all shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
                  Continue Journey →
                </span>
                <span className="font-[var(--font-heading)] text-base md:text-lg text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors font-semibold block">
                  {next.devanagari ? `${next.devanagari} · ` : ''}{next.title}
                </span>
                {next.teaser && (
                  <span className="text-xs text-[var(--text-muted)] line-clamp-1 max-w-xs block mt-0.5">
                    {next.teaser}
                  </span>
                )}
              </div>
              <span className="w-11 h-11 rounded-full bg-[var(--gold)] text-[#2B1B10] font-bold flex items-center justify-center text-lg group-hover:translate-x-1 transition-transform shadow-md shrink-0">
                →
              </span>
            </Link>
          ) : (
            <Link
              to="/epilogue"
              onClick={(e) => handleNavigate(e, '/epilogue', 'Epilogue')}
              className="group inline-flex items-center gap-3 p-4 rounded-xl bg-[var(--gold)] text-[#2B1B10] font-bold text-sm tracking-wider uppercase hover:bg-[var(--gold-light)] transition-all shadow-md"
            >
              <span>To Epilogue & Benediction</span>
              <span>→</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
