import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { audioEngine } from '../../lib/audioEngine'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface GravityWord {
  id: string
  devanagari: string
  iast: string
  meaning: string
  verse: string
  chapter: number
  chapterId: string
  x: number
  y: number
  vx: number
  vy: number
}

const INITIAL_WORDS: Omit<GravityWord, 'x' | 'y' | 'vx' | 'vy'>[] = [
  {
    id: 'abhaya',
    devanagari: 'अभय',
    iast: 'Abhaya',
    meaning: 'Absolute Fearlessness: Dissolving the illusion of a threatening second.',
    verse: 'Taittirīya 2.9.1 & Bṛhadāraṇyaka 1.4.2',
    chapter: 3,
    chapterId: 'ch-3',
  },
  {
    id: 'titiksha',
    devanagari: 'तितिक्षा',
    iast: 'Titikṣā',
    meaning: 'Noble Endurance: Bearing acute tribulation without resentment or depression.',
    verse: 'Bṛhadāraṇyaka 4.4.23',
    chapter: 8,
    chapterId: 'ch-8',
  },
  {
    id: 'viveka',
    devanagari: 'विवेक',
    iast: 'Viveka',
    meaning: 'Discernment: Separating the transient object from the enduring witness.',
    verse: 'Kaṭha 1.2.1-2',
    chapter: 4,
    chapterId: 'ch-4',
  },
  {
    id: 'shraddha',
    devanagari: 'श्रद्धा',
    iast: 'Śraddhā',
    meaning: 'Existential Trust: Conviction in the validity of deep inner inquiry.',
    verse: 'Kaṭha 1.1.2',
    chapter: 4,
    chapterId: 'ch-4',
  },
  {
    id: 'shama',
    devanagari: 'शम',
    iast: 'Śama',
    meaning: 'Mental Tranquility: Calming the reactive tempest of the emotional field.',
    verse: 'Bṛhadāraṇyaka 4.4.23',
    chapter: 8,
    chapterId: 'ch-8',
  },
  {
    id: 'dama',
    devanagari: 'दम',
    iast: 'Dama',
    meaning: 'Sensory Mastery: Guiding the outward horses of perception with steady reins.',
    verse: 'Bṛhadāraṇyaka 5.2.3',
    chapter: 8,
    chapterId: 'ch-8',
  },
  {
    id: 'atman',
    devanagari: 'आत्मन्',
    iast: 'Ātman',
    meaning: 'The Immortal Self: The unshakeable ground that was never vulnerable.',
    verse: 'Kaṭha 1.2.18 & Chāndogya 6.8.7',
    chapter: 7,
    chapterId: 'ch-7',
  },
  {
    id: 'sakshi',
    devanagari: 'साक्षी',
    iast: 'Sākṣī',
    meaning: 'Witness Consciousness: The unmoving observer unaffected by circumstance.',
    verse: 'Muṇḍaka 3.1.1',
    chapter: 10,
    chapterId: 'ch-10',
  },
  {
    id: 'turiya',
    devanagari: 'तुरीय',
    iast: 'Turīya',
    meaning: 'The Fourth: Pure silent awareness beyond waking, dream, and deep sleep.',
    verse: 'Māṇḍūkya 7',
    chapter: 10,
    chapterId: 'ch-10',
  },
  {
    id: 'shreyas',
    devanagari: 'श्रेयस्',
    iast: 'Śreyas',
    meaning: 'The Enduring Good: The path of lasting freedom over transient pleasure.',
    verse: 'Kaṭha 1.2.1',
    chapter: 4,
    chapterId: 'ch-4',
  },
]

export default function WordGravity() {
  const prefersReduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedWord, setSelectedWord] = useState<GravityWord | null>(null)
  const [words, setWords] = useState<GravityWord[]>([])
  const targetPos = useRef({ x: 300, y: 200 })

  useEffect(() => {
    // Initialize positions in a circle
    const count = INITIAL_WORDS.length
    const radius = 150
    const initial = INITIAL_WORDS.map((w, i) => {
      const angle = (i / count) * Math.PI * 2
      return {
        ...w,
        x: 300 + Math.cos(angle) * radius,
        y: 200 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
      }
    })
    setWords(initial)
  }, [])

  // Soft gravity animation loop (pure transform/math)
  useEffect(() => {
    if (prefersReduced) return
    let animId: number

    const tick = () => {
      setWords((prev) =>
        prev.map((word) => {
          if (selectedWord && selectedWord.id === word.id) {
            // Selected word is pulled to center
            const dx = 300 - word.x
            const dy = 200 - word.y
            return {
              ...word,
              x: word.x + dx * 0.15,
              y: word.y + dy * 0.15,
            }
          }

          // Gentle attraction towards cursor / touch center
          const dx = targetPos.current.x - word.x
          const dy = targetPos.current.y - word.y
          const dist = Math.hypot(dx, dy) || 1
          const force = Math.min(25 / (dist + 50), 0.35)

          let vx = (word.vx + (dx / dist) * force) * 0.96
          let vy = (word.vy + (dy / dist) * force) * 0.96

          // Orbit swirl component
          vx += (-dy / dist) * 0.45
          vy += (dx / dist) * 0.45

          return {
            ...word,
            x: Math.max(30, Math.min(570, word.x + vx)),
            y: Math.max(30, Math.min(370, word.y + vy)),
            vx,
            vy,
          }
        })
      )
      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [selectedWord, prefersReduced])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const handleSelectWord = (word: GravityWord) => {
    audioEngine.playTempleBell(600, 2.5, 0.25)
    setSelectedWord(word)
  }

  return (
    <div
      className="relative my-12 p-8 md:p-12 rounded-2xl border border-[var(--gold)]/30 overflow-hidden shadow-2xl select-none"
      style={{
        background: 'linear-gradient(180deg, #070612 0%, #100E26 100%)',
        color: '#F4EEDC',
      }}
      aria-label="Word Gravity Sanskrit Concept Module"
    >
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/30 bg-white/5 text-[10px] font-mono tracking-widest uppercase text-[var(--gold)] mb-3">
          <span>Interaction 1.7</span>
          <span>•</span>
          <span>Semantic Gravity Orbit</span>
        </div>
        <h3
          className="text-2xl md:text-3xl font-bold tracking-wide text-white mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Word Gravity
        </h3>
        <p className="text-xs md:text-sm text-white/70 font-serif italic">
          10 foundational pillars of Upanishadic resilience orbiting in gentle gravitational equilibrium. Move your cursor or tap to draw them into your orbit. Click any word to inspect its root meaning.
        </p>
      </div>

      {/* Interactive Gravity Simulation Field */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-[400px] md:h-[450px] bg-black/40 rounded-2xl border border-white/10 overflow-hidden cursor-crosshair"
      >
        {/* Orbital Center Core */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 rounded-full border border-[var(--gold)]/20 animate-spin-slow" />
          <div className="absolute w-2 h-2 rounded-full bg-[var(--gold)]/50" />
        </div>

        {/* Orbiting Sanskrit Word Badges */}
        {words.map((word) => {
          const isSelected = selectedWord?.id === word.id

          return (
            <button
              key={word.id}
              onClick={() => handleSelectWord(word)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider transition-colors duration-200 cursor-pointer ${
                isSelected
                  ? 'border-[var(--gold)] bg-[var(--gold)] text-black font-bold shadow-[0_0_20px_#D4AF37] z-30 scale-110'
                  : 'border-[var(--gold)]/40 bg-[var(--surface)]/90 text-[var(--gold)] hover:border-[var(--gold)] hover:scale-105 z-10'
              }`}
              style={{
                left: `${word.x}px`,
                top: `${word.y}px`,
              }}
              aria-label={`Inspect ${word.iast}`}
            >
              <span className="sanskrit mr-1.5 font-bold">{word.devanagari}</span>
              <span className="iast uppercase text-[10px]">{word.iast}</span>
            </button>
          )
        })}

        {/* Selected Concept Inspection Modal Panel */}
        <AnimatePresence>
          {selectedWord && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-x-4 bottom-4 md:inset-x-12 md:bottom-6 z-40 p-6 rounded-2xl bg-[#0F0E24]/95 border border-[var(--gold)] shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-start justify-between pb-3 mb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="sanskrit text-2xl md:text-3xl font-bold text-[var(--gold)]">
                      {selectedWord.devanagari}
                    </span>
                    <span className="iast text-lg text-white font-medium">
                      {selectedWord.iast}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-white/50 block mt-1">
                    Scripture: {selectedWord.verse}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedWord(null)}
                  className="text-white/60 hover:text-white p-1 text-sm cursor-pointer"
                  aria-label="Close word panel"
                >
                  ✕
                </button>
              </div>

              <p className="font-serif italic text-base md:text-lg text-amber-100 mb-4 leading-relaxed">
                "{selectedWord.meaning}"
              </p>

              <div className="flex items-center justify-between pt-2">
                <a
                  href={`#${selectedWord.chapterId}`}
                  onClick={() => setSelectedWord(null)}
                  className="text-xs font-mono uppercase tracking-wider text-[var(--gold)] hover:underline flex items-center gap-1.5"
                >
                  Jump to Chapter {selectedWord.chapter} →
                </a>
                <span className="text-[10px] font-mono text-white/40">
                  Click another term to pull to center
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Accessible Keyboard Fallback List */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-2">
          Accessible Directory of Orbiting Concepts:
        </span>
        <div className="flex flex-wrap gap-2">
          {INITIAL_WORDS.map((w) => (
            <button
              key={w.id}
              onClick={() => handleSelectWord({ ...w, x: 300, y: 200, vx: 0, vy: 0 })}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-white/80 border border-white/10 cursor-pointer"
            >
              {w.devanagari} ({w.iast})
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
