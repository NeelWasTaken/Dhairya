import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import sagesData from '../../content/sages.json'
import { audioEngine } from '../../lib/audioEngine'

interface Sage {
  id: string
  name: string
  sanskrit: string
  title: string
  source: string
  date: string
  bio: string
  keyVerse: string
  resilienceLesson: string
  tags: string[]
}

export default function PalmLeafGallery() {
  const [selectedSage, setSelectedSage] = useState<Sage | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleOpenSage = (sage: Sage) => {
    audioEngine.playTempleBell(528, 2.5, 0.25)
    setSelectedSage(sage)
  }

  const scrollGallery = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <div
      className="relative my-12 p-6 md:p-10 rounded-2xl border border-[var(--gold)]/30 overflow-hidden shadow-2xl select-none"
      style={{
        background: 'linear-gradient(180deg, #120F0D 0%, #1A1512 100%)',
        color: '#F4EEDC',
      }}
      aria-label="Palm-Leaf Manuscript Gallery of the Sages"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/30 bg-white/5 text-[10px] font-mono tracking-widest uppercase text-[var(--gold)] mb-3">
            <span>Interaction 1.10</span>
            <span>•</span>
            <span>Birch-Bark & Palm-Leaf Archive</span>
          </div>
          <h3
            className="text-2xl md:text-3xl font-bold tracking-wide text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The Sages of the Forest
          </h3>
          <p className="text-xs md:text-sm text-white/70 font-serif italic mt-1 max-w-lg">
            Ancient birch-bark strips (*tālapattra*) bound with string. Tap any leaf to unroll the biography, key verse, and resilience contribution of each seeker.
          </p>
        </div>

        {/* Carousel Scroll Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollGallery('left')}
            className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm cursor-pointer"
            aria-label="Scroll left in sages gallery"
          >
            ←
          </button>
          <button
            onClick={() => scrollGallery('right')}
            className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm cursor-pointer"
            aria-label="Scroll right in sages gallery"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontally Scrolling Palm-Leaf Strips */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {sagesData.sages.map((sage) => (
          <button
            key={sage.id}
            onClick={() => handleOpenSage(sage)}
            className="flex-shrink-0 w-64 md:w-72 p-6 rounded-xl border border-amber-900/60 hover:border-[var(--gold)]/80 transition-all duration-300 relative group snap-start cursor-pointer text-left"
            style={{
              background: 'linear-gradient(135deg, #261E16 0%, #1A130D 100%)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}
          >
            {/* Palm-Leaf Punch Hole & Tie-String */}
            <div className="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-black/80 border border-amber-800/80 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-600/60" />
            </div>
            <div className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-black/80 border border-amber-800/80 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-600/60" />
            </div>

            {/* Tie-string line across leaf */}
            <div className="absolute top-[21px] inset-x-8 h-[1px] bg-amber-700/40 pointer-events-none" />

            {/* Content on Leaf Strip */}
            <div className="mt-6 pt-2">
              <span className="sanskrit text-3xl font-bold text-[var(--gold)] block mb-1 group-hover:scale-105 transition-transform">
                {sage.sanskrit}
              </span>
              <h4 className="text-lg font-bold text-white tracking-wide">
                {sage.name}
              </h4>
              <span className="text-[11px] font-serif italic text-amber-200/80 block line-clamp-1 mt-0.5">
                {sage.title}
              </span>

              <div className="mt-4 pt-3 border-t border-amber-900/40 flex items-center justify-between text-[10px] font-mono text-white/50">
                <span>{sage.source}</span>
                <span className="text-[var(--gold)] group-hover:translate-x-1 transition-transform">
                  Unroll Leaf ▸
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Unrolled Palm-Leaf Detailed Story Modal */}
      <AnimatePresence>
        {selectedSage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`Unrolled Palm-Leaf: ${selectedSage.name}`}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl p-6 md:p-8 rounded-2xl border border-[var(--gold)] bg-[#1B140E] text-[#F4EEDC] shadow-2xl overflow-hidden"
              style={{
                boxShadow: '0 0 60px rgba(212, 175, 55, 0.25)',
              }}
            >
              {/* Authentic Tie-string and Hole Ornaments */}
              <div className="absolute top-4 left-6 flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-black border border-[var(--gold)]/50" />
                <div className="w-16 h-[1px] bg-[var(--gold)]/40" />
              </div>

              <button
                onClick={() => setSelectedSage(null)}
                className="absolute top-4 right-6 text-white/60 hover:text-white text-sm cursor-pointer"
                aria-label="Close unrolled palm leaf"
              >
                ✕
              </button>

              <div className="mt-6 pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="sanskrit text-3xl md:text-4xl font-bold text-[var(--gold)]">
                    {selectedSage.sanskrit}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    {selectedSage.name}
                  </h3>
                </div>

                <span className="text-sm font-serif italic text-amber-200 block mt-1">
                  {selectedSage.title} • {selectedSage.source} ({selectedSage.date})
                </span>

                <div className="my-5 p-4 rounded-xl bg-black/40 border border-amber-900/50 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--gold)] block font-bold mb-1">
                      Historical & Philosophical Profile
                    </span>
                    <p className="font-serif text-sm leading-relaxed text-white/90">
                      {selectedSage.bio}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block font-bold mb-1">
                      Key Shloka
                    </span>
                    <p className="font-serif italic text-xs text-amber-100 leading-relaxed">
                      "{selectedSage.keyVerse}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 block font-bold mb-1">
                      Resilience Legacy
                    </span>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {selectedSage.resilienceLesson}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selectedSage.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[var(--gold)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedSage(null)}
                  className="w-full py-2.5 rounded-full bg-[var(--gold)] text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
                >
                  Roll Up Leaf Strip
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
