import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ChariotPart {
  id: string
  name: string
  sanskrit: string
  symbol: string
  role: string
  psychologicalMeaning: string
  verse: string
  location: string
}

const chariotParts: ChariotPart[] = [
  {
    id: 'atman',
    name: 'The Passenger / Master',
    sanskrit: 'आत्मानं रथिनं विद्धि',
    symbol: 'Rider in the Chariot',
    role: 'Pure Witnessing Self',
    psychologicalMeaning: 'The unshakeable transcendent observer who owns the journey but does not touch the dust of the road.',
    verse: 'ātmānaṃ rathinaṃ viddhi śarīraṃ ratham eva tu',
    location: 'Kaṭha Upaniṣad 1.3.3'
  },
  {
    id: 'sarira',
    name: 'The Chariot',
    sanskrit: 'शरीरं रथमेव तु',
    symbol: 'Chariot Body',
    role: 'Physical Body & Somatic Vehicle',
    psychologicalMeaning: 'The biological organism that must be maintained with health and balance to endure the rigors of life.',
    verse: 'śarīraṃ ratham eva tu',
    location: 'Kaṭha Upaniṣad 1.3.3'
  },
  {
    id: 'buddhi',
    name: 'The Charioteer',
    sanskrit: 'बुद्धिं तु सारथिं विद्धि',
    symbol: 'Charioteer holding the reins',
    role: 'Discriminative Intellect & Executive Function',
    psychologicalMeaning: 'The executive decision-maker capable of long-term vision (śreyas), self-regulation, and discernment.',
    verse: 'buddhiṃ tu sārathiṃ viddhi',
    location: 'Kaṭha Upaniṣad 1.3.3'
  },
  {
    id: 'manas',
    name: 'The Reins',
    sanskrit: 'मनः प्रग्रहमेव च',
    symbol: 'Taut Leather Reins',
    role: 'Attentional Reins of the Mind',
    psychologicalMeaning: 'The dynamic link transmitting executive orders to sensory impulses. When slack, horses go wild; when firm, direction is held.',
    verse: 'manaḥ pragraham eva ca',
    location: 'Kaṭha Upaniṣad 1.3.3'
  },
  {
    id: 'indriyas',
    name: 'The Horses',
    sanskrit: 'इन्द्रियाणि हयानाहुः',
    symbol: 'Wild Galloping Stallions',
    role: 'The Five Senses',
    psychologicalMeaning: 'Powerful biological drives (vision, audition, touch, taste, smell) that pull energy toward stimulation.',
    verse: 'indriyāṇi hayān āhuḥ',
    location: 'Kaṭha Upaniṣad 1.3.4'
  },
  {
    id: 'visayas',
    name: 'The Road',
    sanskrit: 'विषयांस्तेषु गोचरान्',
    symbol: 'Winding Mountain Highway',
    role: 'Worldly Objects & Experiential Terrain',
    psychologicalMeaning: 'The unpredictable sensory landscapes and situations through which our life journey travels.',
    verse: 'viṣayāṃs teṣu gocarān',
    location: 'Kaṭha Upaniṣad 1.3.4'
  }
]

export default function ChariotScene() {
  const [activePart, setActivePart] = useState<ChariotPart>(chariotParts[2]) // Buddhi as default
  const [containerRef] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const prefersReduced = useReducedMotion()

  // Track progress on scroll
  useEffect(() => {
    if (prefersReduced) return
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const total = rect.height + windowHeight
        const current = windowHeight - rect.top
        const fraction = Math.min(Math.max(current / total, 0), 1)
        const step = Math.min(Math.floor(fraction * chariotParts.length), chariotParts.length - 1)
        setActivePart(chariotParts[step])
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReduced, containerRef])

  return (
    <div ref={containerRef} className="my-16 p-6 md:p-10 rounded-xl palm-leaf-border bg-[var(--bg-card)]">
      {/* Title */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)]">
          Interactive Allegory • Kaṭha Upaniṣad 1.3
        </span>
        <h3 className="text-2xl md:text-3xl mt-1 text-[var(--ink)]">
          The Chariot of Executive Mastery
        </h3>
        <p className="text-sm text-[var(--text-muted)] italic max-w-xl mx-auto mt-2">
          Click or scroll through each component to see how ancient India mapped the anatomy of self-regulation.
        </p>
      </div>

      {/* SVG Chariot Illustration */}
      <div className="relative w-full max-w-3xl mx-auto mb-8 bg-[var(--parchment)] rounded-lg p-4 border border-[var(--parchment-dark)] overflow-hidden shadow-inner">
        <svg viewBox="0 0 800 360" className="w-full h-auto" fill="none">
          <defs>
            <linearGradient id="chariotGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C9A23A" />
              <stop offset="100%" stopColor="#8A6E20" />
            </linearGradient>
            <linearGradient id="roadGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D9BF8C" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#E8892B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D9BF8C" stopOpacity="0.3" />
            </linearGradient>
            <filter id="partGlow">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#C9A23A" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Road (Viṣayas) */}
          <path
            d="M 20 300 C 200 300, 300 330, 500 310 C 650 295, 750 320, 780 320"
            stroke="url(#roadGrad)"
            strokeWidth="24"
            strokeLinecap="round"
            className="cursor-pointer"
            onClick={() => setActivePart(chariotParts[5])}
          />
          <path
            d="M 20 300 C 200 300, 300 330, 500 310 C 650 295, 750 320, 780 320"
            stroke={activePart.id === 'visayas' ? '#E8892B' : '#B3341F'}
            strokeWidth="3"
            strokeDasharray="8 6"
            strokeOpacity="0.6"
          />

          {/* Chariot Body (Śarīra) */}
          <g
            className="cursor-pointer transition-transform duration-300"
            onClick={() => setActivePart(chariotParts[1])}
            filter={activePart.id === 'sarira' ? 'url(#partGlow)' : undefined}
          >
            {/* Wheel */}
            <circle cx="210" cy="270" r="42" stroke="#C9A23A" strokeWidth="6" fill="#F1E3C4" />
            <circle cx="210" cy="270" r="8" fill="#B3341F" />
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1="210"
                y1="270"
                x2={210 + Math.cos((i / 8) * Math.PI * 2) * 42}
                y2={270 + Math.sin((i / 8) * Math.PI * 2) * 42}
                stroke="#C9A23A"
                strokeWidth="2.5"
              />
            ))}
            {/* Carriage Body */}
            <path
              d="M 130 250 L 150 170 C 150 150, 240 145, 270 175 L 290 250 Z"
              fill="url(#chariotGold)"
              opacity="0.9"
            />
            {/* Canopy */}
            <path d="M 140 155 Q 210 120 280 155 Z" fill="#B3341F" opacity="0.85" />
            <line x1="210" y1="120" x2="210" y2="105" stroke="#C9A23A" strokeWidth="2" />
            <polygon points="210,105 235,112 210,119" fill="#E8892B" />
          </g>

          {/* Passenger / Atman */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePart(chariotParts[0])}
            filter={activePart.id === 'atman' ? 'url(#partGlow)' : undefined}
          >
            {/* Golden Aura */}
            <circle cx="190" cy="180" r="24" fill="#FFE4B5" opacity="0.6" className="animate-pulse" />
            <circle cx="190" cy="180" r="16" fill="#C9A23A" opacity="0.4" />
            {/* Silhouette */}
            <circle cx="190" cy="172" r="7" fill="#2B1B10" />
            <path d="M 180 195 C 180 183, 200 183, 200 195 Z" fill="#2B1B10" />
            <text x="190" y="160" textAnchor="middle" fill="#C9A23A" fontSize="11" fontFamily="var(--font-sanskrit)">
              आत्मा
            </text>
          </g>

          {/* Charioteer / Buddhi */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePart(chariotParts[2])}
            filter={activePart.id === 'buddhi' ? 'url(#partGlow)' : undefined}
          >
            <circle cx="260" cy="185" r="9" fill="#2B1B10" />
            <path d="M 248 220 C 248 200, 272 200, 272 220 Z" fill="#B3341F" />
            {/* Arm holding reins */}
            <path d="M 268 205 Q 310 215 360 218" stroke="#2B1B10" strokeWidth="3" fill="none" />
            <text x="260" y="170" textAnchor="middle" fill="#B3341F" fontSize="11" fontFamily="var(--font-sanskrit)">
              बुद्धि
            </text>
          </g>

          {/* Reins (Manas) */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePart(chariotParts[3])}
            filter={activePart.id === 'manas' ? 'url(#partGlow)' : undefined}
          >
            <path
              d="M 310 210 Q 400 215 510 210"
              stroke={activePart.id === 'manas' ? '#E8892B' : '#C9A23A'}
              strokeWidth={activePart.id === 'manas' ? '4' : '2.5'}
              fill="none"
              strokeDasharray="4 2"
            />
            <path
              d="M 310 215 Q 405 225 510 220"
              stroke={activePart.id === 'manas' ? '#E8892B' : '#C9A23A'}
              strokeWidth={activePart.id === 'manas' ? '4' : '2.5'}
              fill="none"
            />
            <text x="410" y="200" textAnchor="middle" fill="#E8892B" fontSize="11" fontFamily="var(--font-sanskrit)">
              मनः (प्रग्रहम्)
            </text>
          </g>

          {/* Yoke Pole */}
          <line x1="260" y1="250" x2="520" y2="245" stroke="#3A3128" strokeWidth="6" strokeLinecap="round" />

          {/* Horses (Indriyas) */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePart(chariotParts[4])}
            filter={activePart.id === 'indriyas' ? 'url(#partGlow)' : undefined}
          >
            {/* 5 Stallions stylised */}
            {[0, 1, 2].map((idx) => {
              const offsetX = idx * 28
              const offsetY = idx * 10
              return (
                <g key={idx} transform={`translate(${offsetX}, ${offsetY})`} opacity={1 - idx * 0.2}>
                  {/* Horse Body */}
                  <path
                    d="M 520 230 C 530 190, 560 170, 590 180 C 620 175, 650 200, 660 230 L 630 250 L 530 250 Z"
                    fill="#3A3128"
                  />
                  {/* Neck & Head */}
                  <path
                    d="M 590 180 C 600 150, 620 135, 645 130 C 660 130, 670 145, 665 160 C 655 170, 640 185, 620 195 Z"
                    fill="#3A3128"
                  />
                  {/* Mane */}
                  <path d="M 605 155 Q 595 145 615 138 Q 600 130 635 125" stroke="#E8892B" strokeWidth="2.5" fill="none" />
                  {/* Legs */}
                  <line x1="540" y1="250" x2="525" y2="295" stroke="#3A3128" strokeWidth="4" />
                  <line x1="560" y1="250" x2="550" y2="290" stroke="#3A3128" strokeWidth="4" />
                  <line x1="630" y1="245" x2="645" y2="295" stroke="#3A3128" strokeWidth="4" />
                  <line x1="645" y1="240" x2="670" y2="285" stroke="#3A3128" strokeWidth="4" />
                </g>
              )
            })}
            <text x="610" y="115" textAnchor="middle" fill="#E8892B" fontSize="12" fontFamily="var(--font-sanskrit)">
              इन्द्रियाणि (हयाः)
            </text>
          </g>
        </svg>
      </div>

      {/* Part Selection Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-6" role="tablist">
        {chariotParts.map((part) => {
          const isActive = activePart.id === part.id
          return (
            <button
              key={part.id}
              onClick={() => setActivePart(part)}
              className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[var(--saffron)] text-white shadow-md scale-105'
                  : 'bg-[var(--parchment-dark)]/40 text-[var(--ink-light)] hover:bg-[var(--parchment-dark)]'
              }`}
              style={{ fontFamily: 'var(--font-heading-alt)' }}
              role="tab"
              aria-selected={isActive}
            >
              <span className="sanskrit text-sm">{part.sanskrit.split(' ')[0]}</span>
              <span>{part.name.split('/')[0]}</span>
            </button>
          )
        })}
      </div>

      {/* Active Part Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePart.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="p-5 md:p-6 rounded-lg bg-[var(--parchment-light)] border border-[var(--border-color)] relative"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3 border-b border-[var(--border-color)] pb-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-[var(--saffron)] font-[var(--font-marginalia)]">
                {activePart.location}
              </span>
              <h4 className="text-xl text-[var(--ink)] font-bold">{activePart.name}</h4>
            </div>
            <div className="text-right">
              <span className="sanskrit text-xl text-[var(--vermilion)] block">{activePart.sanskrit}</span>
              <span className="iast text-xs text-[var(--text-muted)]">{activePart.verse}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] mb-1 font-[var(--font-marginalia)]">
                Allegory & Function
              </h5>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                <strong className="text-[var(--ink)]">{activePart.symbol}:</strong> {activePart.role}
              </p>
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--saffron)] mb-1 font-[var(--font-marginalia)]">
                Resilience & Self-Regulation Insight
              </h5>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {activePart.psychologicalMeaning}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
