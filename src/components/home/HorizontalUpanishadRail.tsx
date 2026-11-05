import { useRef, useState, useEffect } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useJourneyProgress } from '../../hooks/useJourneyProgress'
import { triggerPortalTransition } from '../animations/PortalTransition'
import TiltCard from '../ui/TiltCard'
import AnimatedTraceBorder from '../ui/borders/AnimatedTraceBorder'

export default function HorizontalUpanishadRail() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { upanishads, isVisited } = useJourneyProgress()

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  // Pinned Horizontal Scroll on Desktop
  useEffect(() => {
    if (prefersReduced || !isDesktop) return

    const handleScroll = () => {
      const container = containerRef.current
      const track = trackRef.current
      if (!container || !track) return

      const rect = container.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable <= 0) return

      const currentScroll = -rect.top
      const progress = Math.max(0, Math.min(currentScroll / totalScrollable, 1))
      setScrollProgress(progress)

      const maxTranslate = track.scrollWidth - window.innerWidth + 120
      if (maxTranslate > 0) {
        track.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReduced, isDesktop])

  const handleCardClick = (e: React.MouseEvent, path: string, title: string) => {
    e.preventDefault()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    triggerPortalTransition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      to: path,
      nextTitle: title,
    })
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{
        height: isDesktop && !prefersReduced ? '350vh' : 'auto',
      }}
      aria-label="The 12 Stations of Fortitude"
    >
      <div
        className={`${
          isDesktop && !prefersReduced
            ? 'sticky top-0 h-screen overflow-hidden flex flex-col justify-center'
            : 'py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'
        }`}
      >
        {/* Section Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto px-4 select-none">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-2">
            १२ उपनिषदः · Visual Journey Map
          </span>
          <h2 className="text-3xl sm:text-5xl font-[var(--font-heading)] text-[var(--text-primary)]">
            The 12 Stations of Fortitude
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2 max-w-xl mx-auto">
            {isDesktop && !prefersReduced
              ? 'Scroll vertically to travel through the 12 contemplative chambers.'
              : 'Each Upaniṣad is an architected sanctuary. Select any station to enter.'}
          </p>

          {/* Desktop Progress Track Bar */}
          {isDesktop && !prefersReduced && (
            <div className="w-64 h-[2px] bg-[var(--border-hairline)] mx-auto mt-6 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--gold)] transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          )}
        </div>

        {/* ── DESKTOP PINNED HORIZONTAL RAIL ──────────────────── */}
        {isDesktop && !prefersReduced ? (
          <div
            ref={trackRef}
            className="flex items-center gap-8 pl-12 pr-24 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {upanishads.map((u, idx) => {
              const visited = isVisited(u.path)
              const isSibling = hoveredIdx !== null && hoveredIdx !== idx

              return (
                <div
                  key={u.slug}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="w-[360px] shrink-0 transition-all duration-400"
                  style={{
                    opacity: isSibling ? 0.6 : 1,
                    transform: isSibling ? 'scale(0.98)' : 'scale(1)',
                  }}
                >
                  <AnimatedTraceBorder isHovered={hoveredIdx === idx} borderRadius={24}>
                    <TiltCard
                      notched={true}
                      maxTilt={6}
                      lift={8}
                      dataCursor="Enter"
                      onClick={(e) => handleCardClick(e, u.path, u.title)}
                      className="p-8 bg-[var(--surface)]/95 shadow-md hover:shadow-2xl text-left h-[440px] flex flex-col justify-between select-none"
                    >
                      {/* Top Bar: Number + Devanagari */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full border border-[var(--gold)]/40 flex items-center justify-center text-xs font-bold text-[var(--gold)] font-[var(--font-marginalia)]">
                              {u.index}
                            </span>
                            <span className="sanskrit text-2xl text-[var(--gold)] transition-transform duration-300 group-hover:-translate-y-1">
                              {u.devanagari}
                            </span>
                          </div>

                          {visited ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--gold)] font-[var(--font-marginalia)]">
                              ✓ Explored
                            </span>
                          ) : (
                            <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-mono">
                              Station {u.index}
                            </span>
                          )}
                        </div>

                        {/* Title & Theme */}
                        <h3 className="font-[var(--font-heading)] text-2xl text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors">
                          {u.title}
                        </h3>
                        <span className="text-xs font-semibold text-[var(--gold)] block mt-1">
                          {u.theme}
                        </span>

                        {/* Teaser Description */}
                        <p className="text-xs text-[var(--text-muted)] mt-4 line-clamp-3 leading-relaxed">
                          {u.teaser}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                        <span className="truncate max-w-[180px]">{u.shakha.split('(')[0]}</span>
                        <span className="text-[var(--gold)] font-bold flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                          <span>Enter</span>
                          <span>→</span>
                        </span>
                      </div>
                    </TiltCard>
                  </AnimatedTraceBorder>
                </div>
              )
            })}
          </div>
        ) : (
          /* ── TABLET / MOBILE / REDUCED MOTION 3-COL GRID ────── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {upanishads.map((u, idx) => {
              const visited = isVisited(u.path)
              const isSibling = hoveredIdx !== null && hoveredIdx !== idx

              return (
                <div
                  key={u.slug}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="transition-all duration-300"
                  style={{
                    opacity: isSibling ? 0.7 : 1,
                    transform: isSibling ? 'scale(0.98)' : 'scale(1)',
                  }}
                >
                  <AnimatedTraceBorder isHovered={hoveredIdx === idx} borderRadius={24}>
                    <TiltCard
                      notched={true}
                      maxTilt={4}
                      lift={6}
                      dataCursor="Enter"
                      onClick={(e) => handleCardClick(e, u.path, u.title)}
                      className="p-7 sm:p-8 bg-[var(--surface)]/95 shadow-md text-left flex flex-col justify-between select-none min-h-[380px]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full border border-[var(--gold)]/40 flex items-center justify-center text-xs font-bold text-[var(--gold)] font-[var(--font-marginalia)]">
                              {u.index}
                            </span>
                            <span className="sanskrit text-2xl text-[var(--gold)]">
                              {u.devanagari}
                            </span>
                          </div>

                          {visited ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--gold)] font-[var(--font-marginalia)]">
                              ✓ Explored
                            </span>
                          ) : (
                            <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-mono">
                              Station {u.index}
                            </span>
                          )}
                        </div>

                        <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors">
                          {u.title}
                        </h3>
                        <span className="text-xs font-semibold text-[var(--gold)] block mt-1">
                          {u.theme}
                        </span>

                        <p className="text-xs text-[var(--text-muted)] mt-4 line-clamp-3 leading-relaxed">
                          {u.teaser}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs text-[var(--text-muted)] mt-6">
                        <span className="truncate max-w-[180px]">{u.shakha.split('(')[0]}</span>
                        <span className="text-[var(--gold)] font-bold flex items-center gap-1">
                          <span>Enter Room</span>
                          <span>→</span>
                        </span>
                      </div>
                    </TiltCard>
                  </AnimatedTraceBorder>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
