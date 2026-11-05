import React, { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWorld } from '../foundation/ThreeWorldsProvider'
import type { WorldId } from '../foundation/ThreeWorldsProvider'
import ContinueBar from './ContinueBar'
import MuseumPlacard from '../foundation/MuseumPlacard'
import Reveal from '../ui/Reveal'
import DoubleLineFrame from '../ui/borders/DoubleLineFrame'
import type { UpanishadMeta } from '../../hooks/useJourneyProgress'

export interface PageStep {
  id: string
  label: string
  sanskritLabel?: string
}

interface UpanishadPageShellProps {
  meta: UpanishadMeta
  prev?: { title: string; path: string; devanagari?: string } | null
  next?: { title: string; path: string; devanagari?: string; teaser?: string } | null
  steps?: PageStep[]
  activeStep?: string
  onStepChange?: (stepId: string) => void
  resilienceInsight?: { title: string; text: string }
  modernParallel?: { title: string; text: string }
  reflectPrompt?: string
  sources?: string[]
  commentaryDrawer?: { title: string; content: ReactNode }
  children: ReactNode
}

export default function UpanishadPageShell({
  meta,
  prev,
  next,
  steps,
  activeStep,
  onStepChange,
  resilienceInsight,
  modernParallel,
  reflectPrompt,
  sources = [],
  commentaryDrawer,
  children,
}: UpanishadPageShellProps) {
  const { setWorld } = useWorld()
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const [commentaryOpen, setCommentaryOpen] = useState(false)
  const [insightOpen, setInsightOpen] = useState(true)

  // Sync World with ThreeWorldsProvider
  useEffect(() => {
    if (meta.world) {
      setWorld(meta.world as WorldId)
    }
    // Update document title for SEO & Accessibility
    document.title = `${meta.title} — Dhairya: The Unshaken Self`
    // Announce title to screen readers
    const liveRegion = document.getElementById('aria-route-announcer')
    if (liveRegion) {
      liveRegion.textContent = `Navigated to ${meta.title}, page ${meta.index} of 12`
    }
  }, [meta, setWorld])

  // Filter children so ONLY the active step section is displayed (One thing at a time)
  const childrenArray = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<{ id?: string }>[]
  const hasStepSections = steps && steps.length > 0 && childrenArray.some(c => c.props?.id && steps.some(s => s.id === c.props.id))

  const activeStepContent = hasStepSections
    ? childrenArray.filter(c => !c.props?.id || !steps.some(s => s.id === c.props.id) || c.props.id === activeStep)
    : children

  const shakhaClean = meta.shakha ? meta.shakha.split('(')[0].trim().toUpperCase() : ''

  return (
    <div
      className="page-container min-h-screen select-text"
      style={{
        width: '100%',
        marginInline: 'auto',
        paddingInline: 'clamp(1.25rem, 5vw, 6rem)',
        paddingTop: 'var(--header-height, 64px)',
        paddingBottom: 'clamp(4rem, 7vw, 7rem)',
      }}
    >
      <div className="content-column flex flex-col items-center justify-center">
        {/* ── 1. ROOM HERO: CLEAR CENTRED HIERARCHY ─────────── */}
        <header className="w-full max-w-4xl mx-auto text-center pt-8 sm:pt-12 mb-6">
          {/* Eyebrow: UPANISHAD X OF 12 · SHAKHA */}
          <div className="mb-3">
            <Reveal type="eyebrow" trigger="mount" delay={0.05} debugLabel={`${meta.title} (Eyebrow)`}>
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[var(--gold)] font-[var(--font-marginalia)] font-bold inline-block">
                UPANISHAD {meta.index} OF 12 {shakhaClean ? `· ${shakhaClean}` : ''}
              </span>
            </Reveal>
          </div>

          {/* Title: Kena Upaniṣad once only (clamp(2.5rem, 7vw, 6rem)) */}
          <h1
            className="font-[var(--font-heading)] text-[var(--text-primary)] leading-[1.08] tracking-wide text-balance mx-auto mb-2"
            style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)' }}
          >
            <Reveal type="kinetic-title" trigger="mount" delay={0.15} debugLabel={`${meta.title} (Title)`}>
              {meta.title}
            </Reveal>
          </h1>

          {/* Devanagari directly beneath in gold */}
          <div
            className="sanskrit text-[var(--gold)] font-serif mb-4 drop-shadow-sm mx-auto"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontFamily: 'var(--font-sanskrit)' }}
          >
            <Reveal type="devanagari-title" trigger="mount" delay={0.3} debugLabel={`${meta.title} (Devanagari)`}>
              {meta.sanskritTitle || meta.devanagari}
            </Reveal>
          </div>

          {/* Subtitle in italic, one line, max 60ch */}
          <Reveal type="subtitle" trigger="mount" delay={0.4} debugLabel={`${meta.title} (Subtitle)`}>
            <p className="italic font-[var(--font-body)] text-base sm:text-xl text-[var(--text-secondary)] max-w-[60ch] mx-auto mb-6 leading-relaxed text-balance">
              "{meta.theme}"
            </p>
          </Reveal>

          {/* Placard Strip: 3 small chips + collapsible gallery note */}
          <div className="w-full max-w-2xl mx-auto">
            <Reveal type="pop-tags" trigger="mount" delay={0.5} debugLabel={`${meta.title} (Placard Chips)`}>
              <MuseumPlacard
                title={meta.title}
                dateRange={meta.dateRange}
                shakha={meta.shakha}
                roomType={meta.theme}
                audioDescription={meta.teaser}
                galleryNote={meta.galleryNote}
              />
            </Reveal>
          </div>
        </header>

        {/* ── 2. STICKY SUB-BAR FOR STEP NAVIGATION ───────────── */}
        {steps && steps.length > 0 && (
          <div className="sticky top-[var(--header-height,64px)] z-40 w-full max-w-[1200px] mx-auto py-3 my-4 backdrop-blur-md bg-[var(--bg-primary)]/92 border-y border-[var(--border-hairline)] shadow-sm">
            <Reveal type="pop-tags" trigger="mount" delay={0.55} debugLabel={`${meta.title} (Step Tabs)`}>
              <nav
                aria-label="Room step navigation"
                className="w-full flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar px-2 py-1"
              >
                {steps.map((st, i) => {
                  const isCurrent = activeStep === st.id
                  const cleanLabel = st.label.replace(/^\d+[\.\s]+/, '')
                  return (
                    <button
                      key={st.id}
                      onClick={() => onStepChange?.(st.id)}
                      aria-current={isCurrent ? 'step' : undefined}
                      className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-[var(--font-marginalia)] uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        isCurrent
                          ? 'bg-[var(--gold)] text-[#2B1B10] font-bold shadow-md ring-2 ring-[var(--gold)]/40 scale-102'
                          : 'border border-[var(--border-color)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--gold)] hover:border-[var(--gold)]'
                      }`}
                    >
                      <span className="opacity-70 mr-1.5">{i + 1}.</span>
                      {cleanLabel}
                    </button>
                  )
                })}
              </nav>
            </Reveal>
          </div>
        )}

        {/* ── 3. ACTIVE STEP CONTENT ONLY (One Thing at a Time) ── */}
        <main className="w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center space-y-12 my-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep || 'default-step'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full flex flex-col items-center justify-center space-y-8"
            >
              {activeStepContent}
            </motion.div>
          </AnimatePresence>

          {/* ── 4. RESILIENCE INSIGHT & COMMENTARY DRAWERS ─────── */}
          {(resilienceInsight || modernParallel || reflectPrompt) && (
            <Reveal type="unfold-box" trigger="scroll" delay={0.1} debugLabel="Resilience Insight Box">
              <DoubleLineFrame className="w-full max-w-[1000px] mx-auto rounded-3xl bg-[var(--surface)]/80 backdrop-blur-md shadow-md p-6 sm:p-8 space-y-6">
                <section aria-label="Resilience Analysis">
                  <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                    <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold">
                      ✦ Upaniṣadic Psychology & Resilience Insight
                    </span>
                    <button
                      onClick={() => setInsightOpen(!insightOpen)}
                      className="text-xs font-mono text-[var(--gold)] hover:underline cursor-pointer"
                      aria-expanded={insightOpen}
                    >
                      {insightOpen ? '− Collapse' : '+ Expand'}
                    </button>
                  </div>

                  {insightOpen && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      {resilienceInsight && (
                        <div className="p-5 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--gold)]/20 shadow-xs space-y-2">
                          <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
                            Ancient Core Principle
                          </span>
                          <h3 className="text-base sm:text-lg font-[var(--font-heading)] text-[var(--text-primary)]">
                            {resilienceInsight.title}
                          </h3>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            {resilienceInsight.text}
                          </p>
                        </div>
                      )}

                      {modernParallel && (
                        <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-hairline)] shadow-xs space-y-2">
                          <span className="text-[10px] uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block">
                            Modern Clinical / Cognitive Parallel
                          </span>
                          <h3 className="text-base sm:text-lg font-[var(--font-heading)] text-[var(--text-primary)]">
                            {modernParallel.title}
                          </h3>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            {modernParallel.text}
                          </p>
                        </div>
                      )}

                      {reflectPrompt && (
                        <div className="md:col-span-2 p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-hairline)] text-center">
                          <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-1">
                            👁 Reflective Inquiry
                          </span>
                          <p className="text-base font-serif italic text-[var(--text-primary)] leading-relaxed max-w-[68ch] mx-auto">
                            "{reflectPrompt}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              </DoubleLineFrame>
            </Reveal>
          )}

          {/* ── 5. EXPANDABLE DRAWERS: COMMENTARY & CITATIONS ── */}
          <Reveal type="unfold-box" trigger="scroll" delay={0.15} debugLabel="Commentary & Sources Box">
            <section aria-label="Scholarly Commentary and Sources" className="w-full max-w-[1000px] mx-auto space-y-3">
              {commentaryDrawer && (
                <div className="border border-[var(--border-color)] rounded-2xl bg-[var(--surface)]/50 overflow-hidden shadow-xs">
                  <button
                    onClick={() => setCommentaryOpen(!commentaryOpen)}
                    aria-expanded={commentaryOpen}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-[var(--font-heading)] text-sm sm:text-base text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[var(--gold)]">📜</span>
                      {commentaryDrawer.title}
                    </span>
                    <span className="text-xs text-[var(--gold)] font-bold font-mono">
                      {commentaryOpen ? '− HIDE' : '+ READ COMMENTARY'}
                    </span>
                  </button>
                  <AnimatePresence>
                    {commentaryOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-6 text-sm text-[var(--text-secondary)] border-t border-[var(--border-hairline)]"
                      >
                        <div className="pt-4 leading-relaxed space-y-3 max-w-[68ch]">
                          {commentaryDrawer.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {sources.length > 0 && (
                <div className="border border-[var(--border-color)] rounded-2xl bg-[var(--surface)]/50 overflow-hidden shadow-xs">
                  <button
                    onClick={() => setSourcesOpen(!sourcesOpen)}
                    aria-expanded={sourcesOpen}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-[var(--font-heading)] text-sm sm:text-base text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[var(--gold)]">📚</span>
                      Primary Editions & Scholarly Citations ({sources.length})
                    </span>
                    <span className="text-xs text-[var(--gold)] font-bold font-mono">
                      {sourcesOpen ? '− HIDE' : '+ VIEW SOURCES'}
                    </span>
                  </button>
                  <AnimatePresence>
                    {sourcesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-6 text-xs text-[var(--text-muted)] border-t border-[var(--border-hairline)]"
                      >
                        <ul className="pt-4 space-y-2 list-disc list-inside max-w-[68ch]">
                          {sources.map((src, i) => (
                            <li key={i} className="leading-relaxed">
                              {src}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </section>
          </Reveal>

          {/* ── 6. BOTTOM CONTINUE BAR (Centred max-w-[1200px]) ── */}
          <div className="w-full max-w-[1200px] mx-auto">
            <ContinueBar
              currentIndex={meta.index}
              totalCount={12}
              prev={prev}
              next={next}
              worldColor={meta.world === 'cave' ? '#07060B' : meta.world === 'cosmic' ? '#04060E' : '#0B130E'}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
