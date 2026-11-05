import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Verse } from './VerseCard'
import Reveal from './Reveal'
import DoubleLineFrame from './borders/DoubleLineFrame'

interface FullWidthVerseBandProps {
  verse: Verse
}

export default function FullWidthVerseBand({ verse }: FullWidthVerseBandProps) {
  const [showWordByWord, setShowWordByWord] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="full-width-verse-band my-12 select-none transition-colors duration-500">
      <div className="w-full max-w-[1200px] mx-auto">
        <DoubleLineFrame className="p-6 sm:p-10 rounded-3xl bg-[var(--surface)]/80 backdrop-blur-md shadow-md">
          {/* Top Tagline / Meta */}
          <Reveal type="pop-tags" trigger="scroll" delay={0.05} debugLabel="Verse Tags Bar">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-[var(--border-color)] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold">
                  {verse.upanishad} • {verse.location}
                </span>
                {!verse.verified && (
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-mono">
                    ⚠ verify
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-end">
                {verse.tags.map(t => (
                  <span key={t} className="text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--surface-sunken)] text-[var(--ink-faint)] border border-[var(--border-hairline)] font-[var(--font-marginalia)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* GIANT DEVANAGARI DISPLAY BANNER (Balanced wrapping, no horizontal scroll) */}
          <div className="text-center my-6">
            <Reveal type="verse-devanagari" trigger="scroll" delay={0.15} debugLabel="Verse Devanagari Banner">
              <h2
                className="sanskrit text-[var(--vermilion)] leading-snug font-serif text-balance cursor-pointer hover:scale-[1.01] transition-transform drop-shadow-sm max-w-[42ch] mx-auto"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', overflowWrap: 'anywhere' }}
                onClick={() => setIsFlipped(!isFlipped)}
                title="Click to toggle classical commentary"
              >
                {verse.devanagari}
              </h2>
            </Reveal>

            <Reveal type="iast-translation" trigger="scroll" delay={0.25} debugLabel="Verse IAST Subtext">
              <p className="iast text-xs sm:text-sm text-[var(--text-muted)] mt-3 max-w-[56ch] mx-auto tracking-wide">
                {verse.iast}
              </p>
            </Reveal>
          </div>

          {/* Translation Quote */}
          <Reveal type="quote" trigger="scroll" delay={0.35} debugLabel="Verse Translation Quote">
            <blockquote
              className="text-center max-w-[62ch] mx-auto text-base sm:text-xl font-[var(--font-body)] italic text-[var(--text-primary)] my-6 leading-relaxed text-balance"
            >
              "{verse.translation}"
            </blockquote>
          </Reveal>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setShowWordByWord(!showWordByWord)}
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--surface)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--gold)] hover:text-[#2B1B10] transition-all shadow-xs cursor-pointer"
            >
              {showWordByWord ? 'Hide Word Breakdown' : 'Anatomical Word Breakdown'}
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--surface)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--peacock)] hover:text-white transition-all shadow-xs cursor-pointer"
            >
              {isFlipped ? 'Show Verse Text' : 'Classical Commentary & Resilience Notes'}
            </button>
          </div>

          {/* Word-by-word Breakdown Drawer */}
          <AnimatePresence>
            {showWordByWord && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-color)] shadow-xs overflow-hidden text-center max-w-[900px] mx-auto"
              >
                <h4 className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold mb-4">
                  Sanskrit Word-by-Word Analysis
                </h4>
                <div className="flex flex-wrap gap-3 justify-center">
                  {verse.wordByWord.map((w, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-[var(--surface)] text-center min-w-[90px] border border-[var(--border-hairline)]">
                      <span className="sanskrit text-base font-bold text-[var(--vermilion)] block">{w.sa}</span>
                      <span className="text-xs text-[var(--text-secondary)] font-sans">{w.en}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Flipped Commentary & Insight Panel */}
          <AnimatePresence>
            {isFlipped && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="mt-6 p-6 sm:p-8 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-color)] shadow-md grid md:grid-cols-2 gap-6 text-left max-w-[950px] mx-auto"
              >
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] font-[var(--font-marginalia)] mb-2">
                    Śaṅkarācārya's Bhāṣya Commentary
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {verse.commentary.shankara || verse.commentary.other}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--saffron)] font-[var(--font-marginalia)] mb-2">
                  Psychological Resilience Reading
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {verse.resilienceReading}
                </p>
                {verse.modernParallel && (
                  <div className="pt-3 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)]">
                    <strong className="text-[var(--gold)]">Modern Parallel:</strong> {verse.modernParallel}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </DoubleLineFrame>
      </div>
    </div>
  )
}
