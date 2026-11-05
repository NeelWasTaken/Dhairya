import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useJourneyProgress } from '../../hooks/useJourneyProgress'
import { triggerPortalTransition } from '../animations/PortalTransition'

interface JourneyMapModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function JourneyMapModal({ isOpen, onClose }: JourneyMapModalProps) {
  const { upanishads, currentUpanishad, isVisited, resumePath } = useJourneyProgress()
  const modalRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleSelectNode = (e: React.MouseEvent, path: string, title: string) => {
    e.preventDefault()
    onClose()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    triggerPortalTransition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      to: path,
      nextTitle: title,
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Journey Map of the 12 Upanishads"
          className="fixed inset-0 z-[99990] flex items-center justify-center p-4 sm:p-8"
        >
          {/* Backdrop with dark veil */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#07060B]/95 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[var(--gold)]/30 bg-[var(--surface)] p-6 sm:p-10 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[var(--border-color)] pb-6 mb-8">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-1">
                  Sacred River of Inquiry · १२ उपनिषदः
                </span>
                <h2 className="text-2xl sm:text-3xl font-[var(--font-heading)] text-[var(--text-primary)]">
                  The Journey Map
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                  12 core stations of psychological resilience from pre-dawn to cosmic sunrise.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={resumePath}
                  onClick={(e) => handleSelectNode(e, resumePath, 'Resuming Journey')}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--gold)] text-[#2B1B10] hover:bg-[var(--gold-light)] transition-all shadow-sm"
                >
                  <span>⚡ Resume Journey</span>
                </Link>

                <button
                  onClick={onClose}
                  aria-label="Close journey map"
                  className="w-10 h-10 rounded-full border border-[var(--border-color)] hover:border-[var(--gold)] flex items-center justify-center text-lg text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* River Grid of 12 Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {upanishads.map((u) => {
                const visited = isVisited(u.path)
                const isCurrent = currentUpanishad?.slug === u.slug

                return (
                  <Link
                    key={u.slug}
                    to={u.path}
                    onClick={(e) => handleSelectNode(e, u.path, u.title)}
                    className={`group relative rounded-2xl p-5 border transition-all text-left block cursor-pointer ${
                      isCurrent
                        ? 'border-[var(--gold)] bg-[var(--gold)]/10 ring-2 ring-[var(--gold)]/40 shadow-lg'
                        : visited
                        ? 'border-[var(--gold)]/30 bg-[var(--surface-sunken)] hover:border-[var(--gold)]/80 hover:bg-[var(--surface)]'
                        : 'border-[var(--border-color)] bg-[var(--surface)]/50 hover:border-[var(--gold)]/40'
                    }`}
                  >
                    {/* Top Row: Index Badge & Status */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-[var(--font-marginalia)] border border-[var(--gold)]/40 bg-[var(--surface)] text-[var(--gold)]">
                          {u.index}
                        </span>
                        <span className="sanskrit text-lg text-[var(--gold)]">
                          {u.devanagari}
                        </span>
                      </div>

                      {isCurrent ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--gold)] text-[#2B1B10]">
                          Active
                        </span>
                      ) : visited ? (
                        <span className="text-xs text-[var(--gold)]" title="Visited">
                          ✓
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                          Unexplored
                        </span>
                      )}
                    </div>

                    {/* Title & Theme */}
                    <h3 className="font-[var(--font-heading)] text-lg text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors">
                      {u.title}
                    </h3>
                    <span className="text-xs font-semibold text-[var(--text-secondary)] block mt-0.5">
                      {u.theme}
                    </span>

                    {/* Teaser Description */}
                    <p className="text-xs text-[var(--text-muted)] mt-2 line-clamp-2 leading-relaxed">
                      {u.teaser}
                    </p>

                    {/* Shakha tag */}
                    <div className="mt-4 pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                      <span>{u.shakha.split('(')[0]}</span>
                      <span className="text-[var(--gold)] font-bold group-hover:translate-x-1 transition-transform">
                        Enter Room →
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Bottom Synthesis & Orientation Rail */}
            <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-muted)]">Orientation:</span>
                <Link
                  to="/prologue"
                  onClick={(e) => handleSelectNode(e, '/prologue', 'Prologue: Śānti Pāṭha')}
                  className="px-3 py-1 rounded-full border border-[var(--border-color)] hover:border-[var(--gold)] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
                >
                  Prologue
                </Link>
                <Link
                  to="/corpus"
                  onClick={(e) => handleSelectNode(e, '/corpus', 'Corpus & Milieu')}
                  className="px-3 py-1 rounded-full border border-[var(--border-color)] hover:border-[var(--gold)] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
                >
                  Corpus & Sages
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[var(--text-muted)]">Synthesis:</span>
                <Link
                  to="/storm"
                  onClick={(e) => handleSelectNode(e, '/storm', 'The Storm & The Tree')}
                  className="px-3 py-1 rounded-full border border-[var(--border-color)] hover:border-[var(--gold)] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
                >
                  Storm & Tree
                </Link>
                <Link
                  to="/practices"
                  onClick={(e) => handleSelectNode(e, '/practices', 'Contemplative Toolkit')}
                  className="px-3 py-1 rounded-full border border-[var(--border-color)] hover:border-[var(--gold)] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
                >
                  Practices
                </Link>
                <Link
                  to="/epilogue"
                  onClick={(e) => handleSelectNode(e, '/epilogue', 'Epilogue')}
                  className="px-3 py-1 rounded-full border border-[var(--border-color)] hover:border-[var(--gold)] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
                >
                  Epilogue
                </Link>
                <Link
                  to="/credits"
                  onClick={(e) => handleSelectNode(e, '/credits', 'Closing Credits')}
                  className="px-3 py-1 rounded-full border border-[var(--gold)]/40 text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors font-bold"
                >
                  Credits
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
