import { useState } from 'react'
import { useInView } from '../../hooks/useInView'

export default function TwoBirds() {
  const [witnessMode, setWitnessMode] = useState(false)
  const [ref] = useInView<HTMLDivElement>({ threshold: 0.25 })

  return (
    <div ref={ref} className="my-16 p-6 md:p-10 rounded-xl palm-leaf-border bg-[var(--bg-card)]">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)]">
          Muṇḍaka Upaniṣad 3.1.1 • Śvetāśvatara 4.6
        </span>
        <h3 className="text-2xl md:text-3xl font-bold mt-1 text-[var(--ink)]">
          The Two Birds: Experiencer & Silent Witness
        </h3>
        <p className="text-sm text-[var(--text-muted)] italic max-w-xl mx-auto mt-2">
          Hover or tap the toggle to shift perspective from the restless eating bird to the serene witnessing consciousness.
        </p>

        {/* Perspective Toggle Switch */}
        <div className="mt-4 inline-flex items-center gap-3 p-1.5 rounded-full bg-[var(--parchment-dark)]/50 border border-[var(--border-color)]">
          <button
            onClick={() => setWitnessMode(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              !witnessMode
                ? 'bg-[var(--vermilion)] text-white shadow'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Eating Bird (Jīva • Suffering)
          </button>
          <button
            onClick={() => setWitnessMode(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              witnessMode
                ? 'bg-[var(--gold)] text-[#2B1B10] shadow'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Witness Bird (Sākṣī • Peace)
          </button>
        </div>
      </div>

      {/* SVG Tree Scene */}
      <div className="relative w-full max-w-2xl mx-auto my-6 bg-[var(--parchment)] rounded-lg p-6 border border-[var(--border-color)] shadow-inner overflow-hidden">
        <svg viewBox="0 0 600 380" className="w-full h-auto">
          <defs>
            <filter id="witnessGlow">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#C9A23A" floodOpacity="0.9" />
            </filter>
            <filter id="desaturateBlur">
              <feColorMatrix type="saturate" values="0.1" />
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
          </defs>

          {/* Majestic Tree (Body / Life) */}
          {/* Trunk */}
          <path
            d="M 280 380 Q 290 280 270 200 Q 250 140 300 80 Q 320 140 310 200 Q 330 280 340 380 Z"
            fill="#3A3128"
          />
          {/* Branches */}
          {/* Left Branch (Lower - for the eating bird) */}
          <path
            d="M 280 230 Q 200 240 140 220 Q 90 200 60 210"
            stroke="#3A3128"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 140 220 Q 120 260 80 270"
            stroke="#3A3128"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right Branch (Higher - for the witness bird) */}
          <path
            d="M 290 170 Q 380 150 440 120 Q 500 90 540 110"
            stroke="#3A3128"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 440 120 Q 470 70 510 50"
            stroke="#3A3128"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />

          {/* Foliage Clusters */}
          <circle cx="90" cy="190" r="45" fill="#5C3D2E" opacity="0.15" />
          <circle cx="160" cy="200" r="40" fill="#E8892B" opacity="0.12" />
          <circle cx="470" cy="90" r="50" fill="#C9A23A" opacity="0.18" />
          <circle cx="530" cy="70" r="38" fill="#5C3D2E" opacity="0.15" />

          {/* Sweet & Bitter Fruits on the lower branches */}
          <circle cx="110" cy="245" r="7" fill="#B3341F" />
          <circle cx="145" cy="240" r="6" fill="#E8892B" />
          <circle cx="75" cy="230" r="8" fill="#B3341F" />
          <circle cx="170" cy="210" r="6" fill="#C9A23A" />

          {/* BIRD 1: Jīva (The Experiencing / Eating Bird on Left Branch) */}
          <g
            className="cursor-pointer transition-all duration-700"
            filter={witnessMode ? 'url(#desaturateBlur)' : undefined}
            opacity={witnessMode ? 0.45 : 1}
            onClick={() => setWitnessMode(false)}
          >
            {/* Body */}
            <ellipse cx="140" cy="180" rx="24" ry="16" fill="#B3341F" />
            {/* Head */}
            <circle cx="118" cy="172" r="11" fill="#B3341F" />
            <circle cx="114" cy="170" r="2" fill="#FFE4B5" />
            {/* Beak eating a red fruit */}
            <polygon points="107,173 95,178 107,181" fill="#C9A23A" />
            <circle cx="93" cy="180" r="5" fill="#E8892B" />
            {/* Wing */}
            <path d="M 130 175 Q 160 170 162 188 Q 140 190 130 175" fill="#8A2714" />
            {/* Tail */}
            <polygon points="160,180 185,190 180,180" fill="#8A2714" />
            {/* Label */}
            <text x="140" y="150" textAnchor="middle" fill="#B3341F" fontSize="12" fontFamily="var(--font-sanskrit)" fontWeight="bold">
              भोक्ता जीवः (Experiencing)
            </text>
            <text x="140" y="162" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-marginalia)">
              Swinging between joy & sorrow
            </text>
          </g>

          {/* BIRD 2: Sākṣī (The Witness Bird on Higher Right Branch) */}
          <g
            className="cursor-pointer transition-all duration-700"
            filter={witnessMode ? 'url(#witnessGlow)' : undefined}
            onClick={() => setWitnessMode(true)}
          >
            {/* Golden Radiant Halo */}
            <circle
              cx="460"
              cy="80"
              r="34"
              fill="#FFE4B5"
              fillOpacity={witnessMode ? 0.5 : 0.2}
              className={witnessMode ? "animate-pulse" : undefined}
            />
            {/* Body */}
            <ellipse cx="460" cy="80" rx="26" ry="17" fill="#C9A23A" />
            {/* Head */}
            <circle cx="438" cy="72" r="12" fill="#C9A23A" />
            <circle cx="434" cy="70" r="2.5" fill="#2B1B10" />
            {/* Beak (Closed, peaceful) */}
            <polygon points="426,73 415,75 426,79" fill="#E8892B" />
            {/* Radiant Wing */}
            <path d="M 450 75 Q 482 68 485 88 Q 460 92 450 75" fill="#E8892B" />
            {/* Tail */}
            <polygon points="480,82 505,90 500,80" fill="#E8892B" />
            {/* Label */}
            <text x="460" y="42" textAnchor="middle" fill="#C9A23A" fontSize="13" fontFamily="var(--font-sanskrit)" fontWeight="bold">
              साक्षी आत्मा (Witness)
            </text>
            <text x="460" y="55" textAnchor="middle" fill="#C9A23A" fontSize="9" fontFamily="var(--font-marginalia)">
              Silent • Unshaken • Free
            </text>
          </g>
        </svg>
      </div>

      {/* Explanatory Contrast Card */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className={`p-4 rounded-lg border transition-all ${
          !witnessMode
            ? 'bg-[var(--parchment-light)] border-[var(--vermilion)] ring-1 ring-[var(--vermilion)]/30'
            : 'bg-[var(--bg-primary)]/40 border-[var(--border-color)] opacity-60'
        }`}>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--vermilion)] mb-1 font-[var(--font-heading-alt)]">
            The Lower Bird: Sensory Immersion (Jīva)
          </h4>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Consumes the sweet and bitter fruits of circumstances. When sweet fruits arrive, it rejoices; when bitter fruits arrive, it is crushed by helplessness (<em>anīśayā śocati muhyamānaḥ</em>). Represents reactive cognitive identification with temporary emotional states.
          </p>
        </div>

        <div className={`p-4 rounded-lg border transition-all ${
          witnessMode
            ? 'bg-[var(--parchment-light)] border-[var(--gold)] ring-1 ring-[var(--gold)]/30 shadow-md'
            : 'bg-[var(--bg-primary)]/40 border-[var(--border-color)] opacity-60'
        }`}>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--gold)] mb-1 font-[var(--font-heading-alt)]">
            The Upper Bird: The Witnessing Consciousness (Sākṣī)
          </h4>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Perches upon the same branch in serene stillness, watching without eating. The moment the lower bird turns to look upon this unshakeable companion, its grief dissolves (<em>vīta-śokaḥ</em>). Represents metacognitive decentering—recognizing that you are the observer of pain, not the pain itself.
          </p>
        </div>
      </div>
    </div>
  )
}
