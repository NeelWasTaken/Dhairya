import { useState } from 'react'
import { Link } from 'react-router-dom'
import timelineData from '../content/timeline.json'

interface Era {
  period: string
  dates: string
  region: string
  keyDevelopments: string
  psychologicalFocus: string
}

const eras = timelineData as Era[]

const regions = [
  { name: "Videha", desc: "Kingdom of King Janaka; home of debate assemblies featuring Yājñavalkya, Gārgī, and Maitreyī (Bṛhadāraṇyaka).", x: 380, y: 190 },
  { name: "Kuru-Pañcāla", desc: "Heartland of late Vedic ritual interiorization and early philosophical debates along the Yamuna and Ganges.", x: 260, y: 150 },
  { name: "Kāśī (Vārāṇasī)", desc: "Ancient cultural capital ruled by King Ajātaśatru; center of profound inquiries into dream and deep sleep.", x: 330, y: 210 },
  { name: "Kekaya", desc: "Kingdom of King Aśvapati Kaikeya, where householders taught sages about the universal Vaiśvānara Self.", x: 190, y: 120 },
  { name: "Naimiṣāraṇya", desc: "Sacred forest academy where hundreds of wandering seekers assembled for prolonged contemplative seminars.", x: 290, y: 180 },
]

export default function TimelinePage() {
  const [selectedRegion, setSelectedRegion] = useState(regions[0])

  return (
    <div className="page-container min-h-screen pb-20">
      <div className="content-column max-w-6xl">
        <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--saffron)] hover:text-[var(--vermilion)] font-[var(--font-marginalia)]"
        >
          ← Return to Sanctuary
        </Link>
      </div>

      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)]">
          Historical Context & Geography (c. 1500 BCE – 1300 CE)
        </span>
        <h1 className="text-3xl md:text-5xl font-bold mt-2 text-[var(--ink)]">
          Timeline & Geography of the Upaniṣads
        </h1>
        <p className="text-base text-[var(--text-muted)] italic max-w-2xl mx-auto mt-3">
          Trace the historical evolution of the Indian Knowledge System from ancient sacrificial hymns to forest academies and royal debate assemblies.
        </p>
      </div>

      {/* Interactive Map of Ancient India (Gangetic Plain & Vedic Kingdoms) */}
      <div className="my-10 p-6 md:p-8 rounded-xl palm-leaf-border bg-[var(--bg-card)]">
        <h2 className="text-xl md:text-2xl font-bold text-center text-[var(--ink)] mb-2">
          Geographical Centres of Upaniṣadic Dialogue
        </h2>
        <p className="text-xs text-center text-[var(--text-muted)] italic mb-6">
          Click any marked kingdom on the parchment map to explore its philosophical significance.
        </p>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* SVG Map of Northern Subcontinent */}
          <div className="lg:col-span-7 bg-[var(--parchment)] p-4 rounded-lg border border-[var(--parchment-dark)] shadow-inner">
            <svg viewBox="0 0 500 340" className="w-full h-auto">
              <defs>
                <filter id="cityGlow">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#E8892B" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* Subcontinent outline silhouette simplified */}
              <path
                d="M 80 40 Q 200 20 340 60 Q 450 110 470 190 Q 420 280 320 330 Q 230 310 160 250 Q 70 160 80 40 Z"
                fill="#D9BF8C"
                opacity="0.3"
              />

              {/* Major Sacred Rivers: Indus (Sindhu) and Ganges (Gaṅgā) */}
              {/* Indus system */}
              <path
                d="M 120 40 Q 150 90 140 160 Q 120 220 100 260"
                stroke="#6B87CC"
                strokeWidth="2.5"
                fill="none"
                opacity="0.6"
              />
              <text x="110" y="140" fill="#2C3E6B" fontSize="9" fontFamily="var(--font-marginalia)">
                Sindhu
              </text>

              {/* Ganges & Yamuna */}
              <path
                d="M 210 110 Q 250 140 330 190 Q 400 230 460 250"
                stroke="#6B87CC"
                strokeWidth="3"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M 200 130 Q 240 160 320 200"
                stroke="#6B87CC"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
              />
              <text x="340" y="180" fill="#2C3E6B" fontSize="10" fontFamily="var(--font-marginalia)" fontWeight="bold">
                Gaṅgā
              </text>
              <text x="240" y="170" fill="#2C3E6B" fontSize="8" fontFamily="var(--font-marginalia)">
                Yamunā
              </text>

              {/* Himalayan Mountain Ridge */}
              <path
                d="M 160 60 Q 260 50 380 70 Q 440 90 480 110"
                stroke="#8A7E6A"
                strokeWidth="4"
                strokeDasharray="4 3"
                fill="none"
                opacity="0.5"
              />
              <text x="300" y="55" fill="#8A7E6A" fontSize="9" fontFamily="var(--font-marginalia)">
                Himālaya
              </text>

              {/* Kingdom Markers */}
              {regions.map((reg) => {
                const isSelected = selectedRegion.name === reg.name
                return (
                  <g
                    key={reg.name}
                    className="cursor-pointer transition-transform duration-300"
                    onClick={() => setSelectedRegion(reg)}
                    filter={isSelected ? 'url(#cityGlow)' : undefined}
                  >
                    <circle
                      cx={reg.x}
                      cy={reg.y}
                      r={isSelected ? 9 : 6}
                      fill={isSelected ? '#B3341F' : '#C9A23A'}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <text
                      x={reg.x}
                      y={reg.y - 12}
                      textAnchor="middle"
                      fill={isSelected ? '#B3341F' : '#2B1B10'}
                      fontSize={isSelected ? "11" : "9"}
                      fontFamily="var(--font-heading-alt)"
                      fontWeight="bold"
                    >
                      {reg.name}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Region Details Card */}
          <div className="lg:col-span-5 p-6 rounded-lg bg-[var(--parchment-light)] border border-[var(--border-color)]">
            <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold">
              Ancient Kingdom Profile
            </span>
            <h3 className="text-2xl font-bold text-[var(--ink)] mt-1 mb-3">
              {selectedRegion.name}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              {selectedRegion.desc}
            </p>
            <div className="p-3 rounded bg-[var(--bg-primary)] text-xs text-[var(--text-muted)] italic">
              Key Textual Settings: Bṛhadāraṇyaka Upaniṣad, Chāndogya Upaniṣad, Kaṭha Upaniṣad.
            </div>
          </div>
        </div>
      </div>

      {/* Chronological Era Cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
          Chronology of Psychological & Contemplative Evolution
        </h2>

        {eras.map((era, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-[var(--border-color)]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)]">
                  {era.dates}
                </span>
                <h3 className="text-xl font-bold text-[var(--ink)]">{era.period}</h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-[var(--parchment-dark)]/40 text-[var(--ink-light)] self-start font-[var(--font-marginalia)]">
                📍 {era.region}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm mt-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--saffron)] mb-1 font-[var(--font-marginalia)]">
                  Historical & Literary Milestones
                </h4>
                <p className="text-[var(--text-primary)] leading-relaxed">{era.keyDevelopments}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--indigo)] mb-1 font-[var(--font-marginalia)]">
                  Psychological & Resilience Paradigm
                </h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">{era.psychologicalFocus}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}
