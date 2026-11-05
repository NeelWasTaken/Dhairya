import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface Verse {
  id: string
  upanishad: string
  location: string
  devanagari: string
  iast: string
  wordByWord: Array<{ sa: string; en: string }>
  translation: string
  commentary: { shankara: string; other: string }
  resilienceReading: string
  modernParallel: string
  tags: string[]
  sources: string[]
  verified: boolean
  chapter: number
}

interface VerseCardProps {
  verse: Verse
  showSanskritFirst?: boolean
}

export default function VerseCard({ verse, showSanskritFirst = false }: VerseCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showWordByWord, setShowWordByWord] = useState(false)
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="verse-card my-8 cursor-pointer"
      initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setIsFlipped(!isFlipped)}
      role="article"
      aria-label={`Verse from ${verse.upanishad} ${verse.location}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setIsFlipped(!isFlipped)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span
            className="text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-marginalia)', color: 'var(--saffron)' }}
          >
            {verse.upanishad}
          </span>
          <span className="text-xs ml-2" style={{ color: 'var(--text-muted)' }}>
            {verse.location}
          </span>
        </div>
        {!verse.verified && (
          <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-800" title="This verse requires verification">
            ⚠ verify
          </span>
        )}
        <div className="flex gap-1">
          {verse.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'var(--parchment-dark)', color: 'var(--text-muted)', fontFamily: 'var(--font-marginalia)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Devanagari text */}
            <div className="mb-4">
              <p
                className="sanskrit text-center leading-relaxed"
                style={{
                  fontSize: showSanskritFirst ? '1.4em' : '1.2em',
                  color: 'var(--vermilion)',
                }}
              >
                {verse.devanagari}
              </p>
            </div>

            {/* IAST */}
            <p className="iast text-center text-sm mb-4">
              {verse.iast}
            </p>

            {/* Translation */}
            <blockquote
              className="text-center italic text-lg leading-relaxed mb-4 px-4"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}
            >
              "{verse.translation}"
            </blockquote>

            <p className="text-center text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-marginalia)' }}>
              — Original rendering by this site. Click to see commentary →
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Word by word toggle */}
            <button
              onClick={(e) => { e.stopPropagation(); setShowWordByWord(!showWordByWord) }}
              className="text-xs underline mb-3 block"
              style={{ color: 'var(--saffron)', fontFamily: 'var(--font-marginalia)' }}
            >
              {showWordByWord ? 'Hide' : 'Show'} word-by-word
            </button>

            {showWordByWord && (
              <div className="mb-4 p-3 rounded" style={{ background: 'var(--parchment-dark)', opacity: 0.7 }}>
                <div className="flex flex-wrap gap-3 justify-center">
                  {verse.wordByWord.map((w, i) => (
                    <div key={i} className="text-center">
                      <span className="sanskrit text-sm block" style={{ color: 'var(--vermilion)' }}>{w.sa}</span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{w.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Commentary */}
            {verse.commentary.shankara && (
              <div className="mb-3">
                <h5 className="text-xs uppercase tracking-wider mb-1" style={{ fontFamily: 'var(--font-marginalia)', color: 'var(--gold)' }}>
                  Śaṅkara's Reading (paraphrased)
                </h5>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {verse.commentary.shankara}
                </p>
              </div>
            )}

            {verse.commentary.other && (
              <div className="mb-3">
                <h5 className="text-xs uppercase tracking-wider mb-1" style={{ fontFamily: 'var(--font-marginalia)', color: 'var(--gold)' }}>
                  Other Readings
                </h5>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {verse.commentary.other}
                </p>
              </div>
            )}

            {/* Resilience Reading */}
            <div className="resilience-box mt-4">
              <h4>Resilience Reading</h4>
              <p className="text-sm">{verse.resilienceReading}</p>
            </div>

            {/* Modern Parallel */}
            {verse.modernParallel && (
              <div className="modern-parallel-box">
                <h4>Modern Parallel</h4>
                <p className="text-sm">{verse.modernParallel}</p>
              </div>
            )}

            {/* Sources */}
            <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-marginalia)' }}>
                Sources: {verse.sources.join('; ')}
              </p>
            </div>

            <p className="text-center text-xs mt-2" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-marginalia)' }}>
              ← Click to see verse
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
