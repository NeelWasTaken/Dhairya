import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

interface KoshaLayer {
  id: string
  name: string
  sanskrit: string
  level: string
  color: string
  strokeColor: string
  radius: number
  domain: string
  description: string
  practice: string
  clinicalParallel: string
}

const koshas: KoshaLayer[] = [
  {
    id: 'annnamaya',
    name: 'Annamaya Kośa',
    sanskrit: 'अन्नमयकोश',
    level: 'Gross Physical Sheath',
    color: '#B3341F',
    strokeColor: '#E8892B',
    radius: 170,
    domain: 'Physical Vitality & Somatic Health',
    description: 'The outermost sheath composed of food, minerals, and bodily tissues. It grounds the human organism in physical reality.',
    practice: 'Sāttvic nutrition, somatic rest, restorative sleep, rhythmic movement, and nervous system regulation.',
    clinicalParallel: 'Somatic psychology, biological homeostasis, and autonomic stress regulation.'
  },
  {
    id: 'pranamaya',
    name: 'Prāṇamaya Kośa',
    sanskrit: 'प्राणमयकोश',
    level: 'Vital Energetic Sheath',
    color: '#E8892B',
    strokeColor: '#C9A23A',
    radius: 135,
    domain: 'Autonomic Energy & Breath Integration',
    description: 'The subtle energetic currents (Prāṇa, Apāna, Samāna, Udāna, Vyāna) circulating through 72,000 energetic channels (nāḍīs).',
    practice: 'Diaphragmatic prāṇāyāma (4-4-6 breathing cadence, Nādī Śodhana) to shift autonomic tone into parasympathetic safety.',
    clinicalParallel: 'Polyvagal vagal nerve stimulation, respiratory sinus arrhythmia, and HRV biofeedback.'
  },
  {
    id: 'manomaya',
    name: 'Manomaya Kośa',
    sanskrit: 'मनोमयकोश',
    level: 'Mental & Emotional Sheath',
    color: '#C9A23A',
    strokeColor: '#F4B86A',
    radius: 100,
    domain: 'Emotional Processing & Sensory Reactive Mind',
    description: 'The layer of feeling, impulsive craving (rāga), aversion (dveṣa), and continuous internal dialogue that reacts to circumstances.',
    practice: 'Metacognitive emotion labeling, witnessing grief without immediate reaction, and cultivating the three thunder-virtues (Dāma, Dāna, Dayā).',
    clinicalParallel: 'Affect regulation, cognitive reappraisal, and dialectical emotional tolerance.'
  },
  {
    id: 'vijnanamaya',
    name: 'Vijñānamaya Kośa',
    sanskrit: 'विज्ञानमयकोश',
    level: 'Intellectual & Wisdom Sheath',
    color: '#2C3E6B',
    strokeColor: '#6B87CC',
    radius: 65,
    domain: 'Executive Discernment (Buddhi) & Meaning',
    description: 'The discriminative capacity (viveka) that distinguishes between the changing and the timeless, agency, and ethical resolve.',
    practice: 'Daily viveka reflection, cognitive reframing of adversity, value-congruent decision-making (śreyas over preyas).',
    clinicalParallel: 'Executive functioning, cognitive flexibility, and Viktor Frankl\'s existential meaning discovery.'
  },
  {
    id: 'anandamaya',
    name: 'Ānandamaya Kośa',
    sanskrit: 'आनन्दमयकोश',
    level: 'Causal Bliss Sheath',
    color: '#D96C8A',
    strokeColor: '#FFCAD4',
    radius: 30,
    domain: 'Intrinsic Joy & Peaceful Core',
    description: 'The innermost reflection of pure unconditioned awareness (Ātman); experienced in deep dreamless sleep and profound samādhi.',
    practice: 'Resting in pure silent awareness (Turīya), feeling the primordial unhurt baseline of consciousness beneath all sorrow.',
    clinicalParallel: 'Self-transcendence, peak experiences (Maslow), and default-mode network quietude in deep meditation.'
  }
]

export default function KoshaLotus() {
  const [activeKosha, setActiveKosha] = useState<KoshaLayer>(koshas[0])
  const [ref] = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <div ref={ref} className="my-16 p-6 md:p-10 rounded-xl palm-leaf-border bg-[var(--bg-card)]">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)]">
          Taittirīya Upaniṣad 2.1–5 • Brahmānandavallī
        </span>
        <h3 className="text-2xl md:text-3xl font-bold mt-1 text-[var(--ink)]">
          The Pañcakośa: Concentric Architecture of the Self
        </h3>
        <p className="text-sm text-[var(--text-muted)] italic max-w-xl mx-auto mt-2">
          Click upon any glowing ring or petal layer to peel open its diagnostic domain and resilience practice.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* SVG Concentric Onion / Lotus */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <filter id="koshaGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Concentric Sheath Rings */}
              {koshas.map((k) => {
                const isSelected = activeKosha.id === k.id
                return (
                  <g key={k.id} className="cursor-pointer" onClick={() => setActiveKosha(k)}>
                    <motion.circle
                      cx="200"
                      cy="200"
                      r={k.radius}
                      fill={k.color}
                      fillOpacity={isSelected ? 0.35 : 0.12}
                      stroke={k.strokeColor}
                      strokeWidth={isSelected ? 3.5 : 1.5}
                      strokeDasharray={isSelected ? undefined : "6 4"}
                      filter={isSelected ? 'url(#koshaGlow)' : undefined}
                      animate={{
                        scale: isSelected ? [1, 1.03, 1] : 1,
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {/* Ring Label along boundary */}
                    <text
                      x="200"
                      y={200 - k.radius + 14}
                      textAnchor="middle"
                      fill={k.strokeColor}
                      fontSize={k.radius < 50 ? "8" : "10"}
                      fontFamily="var(--font-sanskrit)"
                      fontWeight="bold"
                    >
                      {k.sanskrit}
                    </text>
                  </g>
                )
              })}

              {/* Centre Bindu: The Atman beyond all sheaths */}
              <circle cx="200" cy="200" r="10" fill="#FFF8E7" />
              <circle cx="200" cy="200" r="5" fill="#E8892B" className="animate-ping" />
              <text x="200" y="222" textAnchor="middle" fill="#C9A23A" fontSize="9" fontFamily="var(--font-sanskrit)" fontWeight="bold">
                साक्षी (आत्मा)
              </text>
            </svg>
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="lg:col-span-6">
          {/* Quick Select Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {koshas.map((k) => {
              const isSelected = activeKosha.id === k.id
              return (
                <button
                  key={k.id}
                  onClick={() => setActiveKosha(k)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                    isSelected
                      ? 'shadow-md scale-105'
                      : 'opacity-70 hover:opacity-100 bg-[var(--parchment-dark)]/40 text-[var(--ink)]'
                  }`}
                  style={{
                    backgroundColor: isSelected ? k.color : undefined,
                    color: isSelected ? '#FFFFFF' : undefined,
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: k.strokeColor }} />
                  <span>{k.name.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>

          {/* Active Sheath Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKosha.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-xl bg-[var(--parchment-light)] border border-[var(--border-color)] shadow-sm"
              style={{ borderLeft: `5px solid ${activeKosha.color}` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-widest font-[var(--font-marginalia)]" style={{ color: activeKosha.color }}>
                  {activeKosha.level}
                </span>
                <span className="sanskrit text-xl font-bold text-[var(--vermilion)]">
                  {activeKosha.sanskrit}
                </span>
              </div>

              <h4 className="text-xl font-bold text-[var(--ink)] mb-2">
                {activeKosha.name}: {activeKosha.domain}
              </h4>
              <p className="text-sm text-[var(--text-primary)] mb-4 leading-relaxed">
                {activeKosha.description}
              </p>

              {/* Practical Exercise Box */}
              <div className="p-3.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] mb-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--saffron)] mb-1 font-[var(--font-marginalia)]">
                  🌿 Upaniṣadic Resilience Practice
                </h5>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {activeKosha.practice}
                </p>
              </div>

              {/* Modern Clinical Parallel */}
              <div className="text-xs text-[var(--text-muted)] italic">
                <strong>Modern Parallel:</strong> {activeKosha.clinicalParallel}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
