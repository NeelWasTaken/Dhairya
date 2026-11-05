import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from '../interactive/ThemeToggle'
import JourneyMapModal from './JourneyMapModal'
import { useJourneyProgress } from '../../hooks/useJourneyProgress'
import { triggerPortalTransition } from '../animations/PortalTransition'
import { audioEngine } from '../../lib/audioEngine'

export default function Nav() {
  const location = useLocation()
  const { upanishads, currentUpanishad, journeyProgressRatio } = useJourneyProgress()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(audioEngine.getIsMuted())
  const settingsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close settings popover on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setIsSettingsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handlePageClick = (e: React.MouseEvent, path: string, title: string) => {
    if (location.pathname === path) return
    e.preventDefault()
    setIsMenuOpen(false)
    setIsSettingsOpen(false)
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    triggerPortalTransition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      to: path,
      nextTitle: title,
    })
  }

  // Derive center Devanagari title based on current path
  const getCenterDevanagari = () => {
    const path = location.pathname
    if (currentUpanishad) {
      return currentUpanishad.sanskritTitle || currentUpanishad.devanagari
    }
    if (path.startsWith('/chandogya/6')) return 'छान्दोग्य ६ · तत्त्वमसि'
    if (path.startsWith('/chandogya/7')) return 'छान्दोग्य ७ · भूमा'
    if (path.startsWith('/brihadaranyaka/fear')) return 'बृहदारण्यक · भयमुक्ति'
    if (path.startsWith('/brihadaranyaka/discipline')) return 'बृहदारण्यक · तितिक्षा'
    if (path.startsWith('/brihadaranyaka/women-sages')) return 'विदुषी संकुल'
    if (path === '/prologue') return 'शान्तिपाठः'
    if (path === '/corpus') return 'वाङ्मयम्'
    if (path === '/storm') return 'वात चक्रम्'
    if (path === '/practices') return 'साधना'
    if (path === '/critiques') return 'समीक्षा'
    if (path === '/epilogue') return 'उपसंहारः'
    if (path === '/credits') return 'कृतज्ञता पत्रम्'
    if (path === '/verses') return 'श्लोकाः'
    if (path === '/glossary') return 'शब्दकोशः'
    if (path === '/timeline') return 'कालक्रमः'
    if (path === '/bibliography') return 'ग्रन्थसूची'
    if (path === '/quiz') return 'प्रश्नोत्तरी'
    if (path === '/experiences') return 'अनुभूतयः'
    if (path.startsWith('/journal')) return 'शोधपत्रिका'
    if (path === '/about') return 'परिचयः'
    return 'धैर्यम्'
  }

  const toggleSound = () => {
    const muted = audioEngine.getIsMuted()
    audioEngine.setMuted(!muted)
    setIsMuted(!muted)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? 'bg-[var(--bg-primary)]/94 backdrop-blur-md shadow-sm border-b border-[var(--border-color)]'
            : 'bg-[var(--bg-primary)]/90 backdrop-blur-sm border-b border-[var(--border-hairline)]'
        }`}
        style={{ height: 'var(--header-height, 64px)' }}
        role="banner"
      >
        <div
          className="w-full max-w-[1440px] mx-auto h-full px-4 sm:px-6 grid items-center"
          style={{ gridTemplateColumns: '1fr auto 1fr' }}
        >
          {/* ── ZONE 1: LEFT (Logo & Brand) ────────────────────── */}
          <div className="flex items-center justify-start">
            <Link
              to="/"
              onClick={(e) => handlePageClick(e, '/', 'Home')}
              className="inline-flex items-center gap-2 group cursor-pointer select-none"
              aria-label="Dhairya Home"
            >
              <span
                className="sanskrit text-2xl text-[var(--gold)] group-hover:scale-110 transition-transform font-serif drop-shadow-sm"
                aria-label="Sacred Om"
              >
                ॐ
              </span>
              <span className="font-[var(--font-heading-alt)] text-base sm:text-lg font-bold tracking-widest text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors">
                <span className="gold-shimmer">DHAIRYA</span>
              </span>
            </Link>
          </div>

          {/* ── ZONE 2: CENTER (Devanagari Page Name Only) ────────── */}
          <div className="flex items-center justify-center px-2">
            <div
              className="sanskrit text-base sm:text-xl font-serif text-[var(--gold)] tracking-wide font-medium drop-shadow-sm whitespace-nowrap cursor-default select-none"
              style={{ fontFamily: 'var(--font-sanskrit)' }}
            >
              {getCenterDevanagari()}
            </div>
          </div>

          {/* ── ZONE 3: RIGHT (Compact Nav & Settings Popover) ───── */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2">
            {/* Journey Map Button */}
            <button
              onClick={() => setIsMapOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-[var(--gold)] border border-[var(--gold)]/40 hover:bg-[var(--gold)]/15 transition-all shadow-sm cursor-pointer whitespace-nowrap"
              title="Open full Journey Map"
              aria-label="Open Journey Map"
            >
              <span aria-hidden="true">🗺️</span>
              <span className="hidden xl:inline">Map</span>
            </button>

            {/* Verses Link */}
            <Link
              to="/verses"
              onClick={(e) => handlePageClick(e, '/verses', 'Verse Library')}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--gold)] hover:bg-[var(--surface-sunken)] transition-colors"
              title="Verse Library"
              aria-label="Verse Library"
            >
              <span aria-hidden="true" className="xl:hidden">📜</span>
              <span className="hidden xl:inline">Verses</span>
            </Link>

            {/* Glossary Link */}
            <Link
              to="/glossary"
              onClick={(e) => handlePageClick(e, '/glossary', 'Glossary')}
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--gold)] hover:bg-[var(--surface-sunken)] transition-colors"
              title="Philosophical Glossary"
              aria-label="Glossary"
            >
              <span aria-hidden="true" className="xl:hidden">📖</span>
              <span className="hidden xl:inline">Glossary</span>
            </Link>

            {/* Experiences Link */}
            <Link
              to="/experiences"
              onClick={(e) => handlePageClick(e, '/experiences', 'Experiences Hub')}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--gold)] hover:bg-[var(--surface-sunken)] transition-colors"
              title="Interactive Experiences"
              aria-label="Experiences Hub"
            >
              <span aria-hidden="true" className="xl:hidden">✨</span>
              <span className="hidden xl:inline">Experiences</span>
            </Link>

            {/* Journal Link */}
            <Link
              to="/journal"
              onClick={(e) => handlePageClick(e, '/journal', 'Research Journal')}
              className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--gold)] hover:bg-[var(--surface-sunken)] transition-colors"
              title="Research Journal"
              aria-label="Journal"
            >
              <span aria-hidden="true" className="xl:hidden">🖋️</span>
              <span className="hidden xl:inline">Journal</span>
            </Link>

            {/* Credits Link */}
            <Link
              to="/credits"
              onClick={(e) => handlePageClick(e, '/credits', 'The Final Scroll')}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors font-bold"
              title="Closing Credits"
              aria-label="Closing Credits"
            >
              <span aria-hidden="true" className="xl:hidden">✦</span>
              <span className="hidden xl:inline">Credits</span>
            </Link>

            {/* Settings Popover Button */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isSettingsOpen
                    ? 'border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)]'
                    : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--gold)] hover:border-[var(--gold)]/50'
                }`}
                title="Settings & Audio"
                aria-label="Settings and audio controls"
                aria-expanded={isSettingsOpen}
              >
                <span className="text-sm leading-none block">⚙️</span>
              </button>

              {/* Popover Dropdown */}
              <AnimatePresence>
                {isSettingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-64 p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] shadow-2xl backdrop-blur-xl z-50 space-y-3"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] border-b border-[var(--border-hairline)] pb-1.5">
                      Preferences & Atmosphere
                    </div>

                    {/* Theme Toggle Row */}
                    <div className="flex items-center justify-between text-xs text-[var(--text-primary)]">
                      <span>Appearance</span>
                      <ThemeToggle />
                    </div>

                    {/* Temple Sound Toggle Row */}
                    <div className="flex items-center justify-between text-xs text-[var(--text-primary)]">
                      <span>Chime & Ambient Audio</span>
                      <button
                        onClick={toggleSound}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all ${
                          !isMuted
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        }`}
                      >
                        {!isMuted ? '🔊 Active' : '🔇 Muted'}
                      </button>
                    </div>

                    {/* Quick Link to Timeline & Quiz */}
                    <div className="pt-2 border-t border-[var(--border-hairline)] grid grid-cols-2 gap-1 text-[11px]">
                      <Link
                        to="/timeline"
                        onClick={() => setIsSettingsOpen(false)}
                        className="p-1.5 rounded hover:bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:text-[var(--gold)] text-center"
                      >
                        Timeline
                      </Link>
                      <Link
                        to="/quiz"
                        onClick={() => setIsSettingsOpen(false)}
                        className="p-1.5 rounded hover:bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:text-[var(--gold)] text-center"
                      >
                        Quiz
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden p-2 rounded-full border border-[var(--border-color)] text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75">
                {isMenuOpen ? (
                  <>
                    <line x1="4" y1="4" x2="16" y2="16" />
                    <line x1="16" y1="4" x2="4" y2="16" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="17" y2="6" />
                    <line x1="3" y1="14" x2="17" y2="14" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── SLIM PROGRESS RAIL (3px line at very bottom edge of header) ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--border-hairline)] overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.round(journeyProgressRatio * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Journey Progress Across 12 Upanishads"
        >
          <div
            className="h-full bg-gradient-to-r from-[var(--gold)] via-[var(--saffron)] to-[var(--gold)] transition-all duration-500 ease-out"
            style={{ width: `${Math.max(journeyProgressRatio * 100, 3)}%` }}
          />
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[var(--header-height,64px)] z-40 sm:hidden backdrop-blur-2xl bg-[var(--bg-primary)]/96 border-b border-[var(--border-color)] max-h-[85vh] overflow-y-auto p-4 space-y-4 shadow-2xl"
          >
            {/* Quick Action Hubs */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[var(--border-hairline)]">
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsMapOpen(true)
                }}
                className="p-3 rounded-xl text-center bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 font-mono text-xs uppercase tracking-wider font-bold"
              >
                🗺️ Full Journey Map
              </button>
              <Link
                to="/experiences"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-xl text-center bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border-color)] font-mono text-xs uppercase tracking-wider"
              >
                ✨ Experiences Hub
              </Link>
              <Link
                to="/verses"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-xl text-center bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border-color)] font-mono text-xs uppercase tracking-wider"
              >
                📜 Verse Library
              </Link>
              <Link
                to="/credits"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-xl text-center bg-[var(--surface)] text-[var(--gold)] border border-[var(--gold)]/30 font-mono text-xs uppercase tracking-wider font-bold"
              >
                ✦ Closing Credits
              </Link>
            </div>

            {/* 12 Upanishads Grid */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] block mb-2">
                12 Core Upanishad Rooms
              </span>
              <div className="grid grid-cols-3 gap-2">
                {upanishads.map((u) => {
                  const isCurrent = currentUpanishad?.slug === u.slug
                  return (
                    <Link
                      key={u.slug}
                      to={u.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`p-2.5 rounded-xl text-center border transition-all ${
                        isCurrent
                          ? 'bg-[var(--gold)] text-[#2B1B10] font-bold border-[var(--gold)]'
                          : 'bg-[var(--surface)] border-[var(--border-color)] hover:border-[var(--gold)]'
                      }`}
                    >
                      <div className="text-base sanskrit font-serif">{u.devanagari}</div>
                      <div className="text-[10px] truncate mt-0.5">{u.title}</div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Journey Map Modal */}
      <JourneyMapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
    </>
  )
}
