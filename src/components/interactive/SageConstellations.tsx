import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { audioEngine } from '../../lib/audioEngine'

interface SageStar {
  id: string
  name: string
  sanskrit: string
  constellation: string
  quote: string
  source: string
  role: string
  x: number
  y: number
}

const sages: SageStar[] = [
  {
    id: 'nachiketa',
    name: 'Nachiketa',
    sanskrit: 'नचिकेता',
    constellation: 'The Archer of Truth',
    quote: 'Śvobhāvā martyasya—All pleasures wear out the senses tomorrow. Keep your chariots and dancers! Teach me of the Self.',
    source: 'Kaṭha Upaniṣad 1.2.2',
    role: 'Heroic seeker who confronted Death itself to demand immortal knowledge.',
    x: 80,
    y: 90
  },
  {
    id: 'yajnavalkya',
    name: 'Yājñavalkya',
    sanskrit: 'याज्ञवल्क्य',
    constellation: 'The Self-Luminous Light',
    quote: 'When the sun has set, and the moon has set, and fire is stilled—the Self alone is the light that guides a person.',
    source: 'Bṛhadāraṇyaka Upaniṣad 4.3.6',
    role: 'Supreme sage of King Janaka\'s court; teacher of neti-neti and non-dual consciousness.',
    x: 260,
    y: 50
  },
  {
    id: 'gargi',
    name: 'Gārgī Vācaknavī',
    sanskrit: 'गार्गी वाचकनवी',
    constellation: 'The Unbending Bow',
    quote: 'Across what is the fabric of space itself woven? In the Imperishable (Akṣara), O Gārgī, space is woven back and forth.',
    source: 'Bṛhadāraṇyaka Upaniṣad 3.8.8',
    role: 'Philosopher of unyielding intellectual courage who twice cross-examined Yājñavalkya.',
    x: 440,
    y: 80
  },
  {
    id: 'maitreyi',
    name: 'Maitreyī',
    sanskrit: 'मैत्रेयी',
    constellation: 'The Golden Vessel',
    quote: 'What shall I do with that which cannot make me immortal? Tell me only of that which leads beyond decay.',
    source: 'Bṛhadāraṇyaka Upaniṣad 2.4.5',
    role: 'Spiritual seeker who renounced worldly fortune to pursue immortal wisdom.',
    x: 170,
    y: 200
  },
  {
    id: 'uddalaka',
    name: 'Uddālaka Āruṇi',
    sanskrit: 'उद्दालक आरुणि',
    constellation: 'The Banyan & Salt',
    quote: 'That which is this subtle essence—in it all that exists has its reality. That is the True. That thou art, O Śvetaketu!',
    source: 'Chāndogya Upaniṣad 6.8.7',
    role: 'Master pedagogue who used salt-in-water and banyan seeds to reveal omnipresent awareness.',
    x: 370,
    y: 210
  }
]

export default function SageConstellations() {
  const [selectedSage, setSelectedSage] = useState<SageStar>(sages[0])

  const handleSelect = (sage: SageStar) => {
    setSelectedSage(sage)
    audioEngine.playTempleBell(659.25, 2.5, 0.2)
  }

  return (
    <div className="my-16 p-6 md:p-10 rounded-2xl bg-[#080710] border border-[var(--gold)]/30 text-white shadow-2xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold">
            Nocturnal Celestial Sanctuary • Ṛṣi-Maṇḍala
          </span>
          <h3 className="text-2xl font-bold text-white">
            Star-Sage Constellations
          </h3>
        </div>
        <span className="text-xs text-[var(--gold)] font-mono">
          Click any star to open their immortal discourse
        </span>
      </div>

      {/* Celestial Starfield Canvas */}
      <div className="relative w-full max-w-2xl h-80 mx-auto rounded-xl bg-[radial-gradient(ellipse_at_center,#1A1428_0%,#07060B_100%)] border border-white/10 overflow-hidden flex items-center justify-center p-4">
        {/* Constellation Connecting Lines */}
        <svg viewBox="0 0 540 280" className="w-full h-full absolute inset-0">
          <line x1="80" y1="90" x2="260" y2="50" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          <line x1="260" y1="50" x2="440" y2="80" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          <line x1="80" y1="90" x2="170" y2="200" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          <line x1="170" y1="200" x2="370" y2="210" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          <line x1="370" y1="210" x2="440" y2="80" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

          {/* Star Nodes */}
          {sages.map((sage) => {
            const isSelected = selectedSage.id === sage.id
            return (
              <g
                key={sage.id}
                onClick={() => handleSelect(sage)}
                className="cursor-pointer transition-transform duration-300"
              >
                {/* Glow ring */}
                <circle
                  cx={sage.x}
                  cy={sage.y}
                  r={isSelected ? 16 : 8}
                  fill="#D4AF37"
                  fillOpacity={isSelected ? 0.45 : 0.15}
                  className={isSelected ? "animate-ping" : undefined}
                />
                {/* Star center */}
                <circle
                  cx={sage.x}
                  cy={sage.y}
                  r={isSelected ? 6 : 4}
                  fill={isSelected ? "#FFF8E7" : "#E07A1F"}
                />
                {/* Label */}
                <text
                  x={sage.x}
                  y={sage.y - 12}
                  textAnchor="middle"
                  fill={isSelected ? "#FFE4B5" : "#A69FB8"}
                  fontSize={isSelected ? "11" : "9"}
                  fontWeight="bold"
                  fontFamily="var(--font-heading-alt)"
                >
                  {sage.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Selected Sage Profile Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSage.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-6 p-6 rounded-xl bg-white/5 border border-white/10 text-left max-w-2xl mx-auto backdrop-blur-md"
        >
          <div className="flex items-center justify-between gap-4 mb-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono">
                {selectedSage.constellation}
              </span>
              <h4 className="text-xl font-bold text-white">{selectedSage.name}</h4>
            </div>
            <span className="sanskrit text-2xl text-[var(--saffron)] font-bold">
              {selectedSage.sanskrit}
            </span>
          </div>

          <p className="text-xs text-[#C5BFD4] mb-3 leading-relaxed">
            {selectedSage.role}
          </p>

          <blockquote className="p-3 rounded-lg bg-black/40 border-l-2 border-[var(--gold)] text-sm italic text-[#FFE8A8] font-[var(--font-marginalia)] leading-relaxed mb-2">
            "{selectedSage.quote}"
          </blockquote>

          <span className="text-[11px] text-[var(--gold)]/70 font-mono">
            Source: {selectedSage.source}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
