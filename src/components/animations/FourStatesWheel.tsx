import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

interface StateData {
  id: string
  name: string
  sanskrit: string
  soundLetter: string
  realm: string
  description: string
  resilienceReading: string
  color: string
}

const states: StateData[] = [
  {
    id: 'jagrat',
    name: 'Waking State',
    sanskrit: 'जाग्रत् (वैश्वानर)',
    soundLetter: 'A (अकार)',
    realm: 'External gross physical world',
    description: 'Consciousness directed outward (bahiṣ-prajña), perceiving seven limbs and nineteen mouths of sensory intake. The realm of daily activity and sensory encounters.',
    resilienceReading: 'Resilience in the waking world requires self-regulation, distress tolerance, and ethical action without outcome-fixation.',
    color: '#E8892B'
  },
  {
    id: 'svapna',
    name: 'Dream State',
    sanskrit: 'स्वप्न (तैजस)',
    soundLetter: 'U (उकार)',
    realm: 'Internal subtle mental world',
    description: 'Consciousness directed inward (antaḥ-prajña), fashioning dreams and desires from the subtle impressions (saṃskāras) of waking experience.',
    resilienceReading: 'Resilience in the subtle realm involves observing subconscious fear patterns, processing dream symbolism, and deconstructing psychological projections.',
    color: '#B3341F'
  },
  {
    id: 'susupti',
    name: 'Deep Sleep',
    sanskrit: 'सुषुप्ति (प्राज्ञ)',
    soundLetter: 'M (मकार)',
    realm: 'Undifferentiated causal peaceful void',
    description: 'Consciousness unified into a mass of awareness (prajñāna-ghana), experiencing effortless peace without desires, images, or friction.',
    resilienceReading: 'Shows that happiness does not depend upon possessing external objects; in deep sleep, with zero possessions or status, you experience pure undisturbed rest.',
    color: '#2C3E6B'
  },
  {
    id: 'turiya',
    name: 'The Fourth',
    sanskrit: 'तुरीय (अमात्र)',
    soundLetter: 'Silence after Om (अमात्र)',
    realm: 'Unconditioned Non-Dual Witness (Ātman)',
    description: 'Neither inwardly conscious nor outwardly conscious; invisible, ungraspable, unthinkable; peaceful, auspicious, non-dual—the unchanging background screen.',
    resilienceReading: 'The supreme foundation of Dhairya. When you know yourself as Turīya, waking storms and dream fears are recognized as mere ripples upon an ocean that cannot drown.',
    color: '#C9A23A'
  }
]

export default function FourStatesWheel() {
  const [selectedState, setSelectedState] = useState<StateData>(states[3]) // Default to Turiya
  const [ref] = useInView<HTMLDivElement>({ threshold: 0.25 })

  return (
    <div ref={ref} className="my-16 p-6 md:p-10 rounded-xl palm-leaf-border bg-[var(--bg-card)]">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)]">
          Māṇḍūkya Upaniṣad • The Four Dimensions of Consciousness
        </span>
        <h3 className="text-2xl md:text-3xl font-bold mt-1 text-[var(--ink)]">
          The Wheel of Māṇḍūkya: Three States & The Unshaken Centre
        </h3>
        <p className="text-sm text-[var(--text-muted)] italic max-w-xl mx-auto mt-2">
          Click upon any ring quadrant or the luminous golden centre to reveal its psychological dimension.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Interactive Rotating Wheel */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
            {/* Ambient Ripple Circles */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[var(--gold)] opacity-20 pointer-events-none"
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-[var(--saffron)] opacity-25 pointer-events-none"
              animate={{ scale: [1.03, 0.97, 1.03] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <svg viewBox="0 0 360 360" className="w-full h-full">
              {/* Outer Ring Sectors for 3 States: Jagrat, Svapna, Susupti */}
              {/* 1. Jagrat: Top-Left sector */}
              <path
                d="M 180 180 L 60 70 A 155 155 0 0 1 290 60 Z"
                fill="#E8892B"
                fillOpacity={selectedState.id === 'jagrat' ? 0.45 : 0.15}
                stroke="#E8892B"
                strokeWidth={selectedState.id === 'jagrat' ? 3 : 1}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedState(states[0])}
              />
              <text x="180" y="75" textAnchor="middle" fill="#E8892B" fontSize="12" fontFamily="var(--font-sanskrit)" fontWeight="bold">
                जाग्रत् (A)
              </text>

              {/* 2. Svapna: Bottom-Right sector */}
              <path
                d="M 180 180 L 290 60 A 155 155 0 0 1 270 300 Z"
                fill="#B3341F"
                fillOpacity={selectedState.id === 'svapna' ? 0.45 : 0.15}
                stroke="#B3341F"
                strokeWidth={selectedState.id === 'svapna' ? 3 : 1}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedState(states[1])}
              />
              <text x="260" y="190" textAnchor="middle" fill="#B3341F" fontSize="12" fontFamily="var(--font-sanskrit)" fontWeight="bold">
                स्वप्न (U)
              </text>

              {/* 3. Susupti: Bottom-Left sector */}
              <path
                d="M 180 180 L 270 300 A 155 155 0 0 1 60 70 Z"
                fill="#2C3E6B"
                fillOpacity={selectedState.id === 'susupti' ? 0.45 : 0.15}
                stroke="#2C3E6B"
                strokeWidth={selectedState.id === 'susupti' ? 3 : 1}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedState(states[2])}
              />
              <text x="130" y="270" textAnchor="middle" fill="#6B87CC" fontSize="12" fontFamily="var(--font-sanskrit)" fontWeight="bold">
                सुषुप्ति (M)
              </text>

              {/* 4. TURIYA: The Still, Silent Centre Hub */}
              <circle
                cx="180"
                cy="180"
                r="52"
                fill="#C9A23A"
                fillOpacity={selectedState.id === 'turiya' ? 0.95 : 0.75}
                stroke="#FFE4B5"
                strokeWidth={selectedState.id === 'turiya' ? 4 : 2}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedState(states[3])}
              />
              <circle cx="180" cy="180" r="46" fill="#F1E3C4" fillOpacity="0.2" className="pointer-events-none" />
              <text x="180" y="176" textAnchor="middle" fill="#2B1B10" fontSize="16" fontFamily="var(--font-sanskrit)" fontWeight="bold">
                तुरीय
              </text>
              <text x="180" y="195" textAnchor="middle" fill="#2B1B10" fontSize="9" fontFamily="var(--font-marginalia)" fontWeight="bold">
                THE FOURTH
              </text>
            </svg>
          </div>
        </div>

        {/* Right Details Description */}
        <div className="lg:col-span-6">
          {/* Quick select buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {states.map((st) => {
              const isSelected = selectedState.id === st.id
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedState(st)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    isSelected
                      ? 'shadow-lg scale-105 ring-2 ring-white/40'
                      : 'opacity-70 hover:opacity-100 bg-[var(--parchment-dark)]/40 text-[var(--ink)]'
                  }`}
                  style={{
                    backgroundColor: isSelected ? st.color : undefined,
                    color: isSelected ? '#FFFFFF' : undefined,
                  }}
                >
                  {st.name}
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedState.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-xl bg-[var(--parchment-light)] border border-[var(--border-color)] shadow-sm"
              style={{ borderLeft: `5px solid ${selectedState.color}` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-widest font-[var(--font-marginalia)]" style={{ color: selectedState.color }}>
                  {selectedState.soundLetter}
                </span>
                <span className="sanskrit text-xl font-bold text-[var(--vermilion)]">
                  {selectedState.sanskrit}
                </span>
              </div>

              <h4 className="text-xl font-bold text-[var(--ink)] mb-1">
                {selectedState.name}
              </h4>
              <p className="text-xs text-[var(--text-muted)] italic mb-3 font-[var(--font-marginalia)]">
                Domain: {selectedState.realm}
              </p>
              <p className="text-sm text-[var(--text-primary)] mb-4 leading-relaxed">
                {selectedState.description}
              </p>

              {/* Resilience Application Box */}
              <div className="p-3.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)]">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--saffron)] mb-1 font-[var(--font-marginalia)]">
                  Unshakable Resilience Reading
                </h5>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {selectedState.resilienceReading}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
