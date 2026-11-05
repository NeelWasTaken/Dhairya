import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

export default function StormTree() {
  const [stormIntensity, setStormIntensity] = useState(2) // 1 to 4
  const [ref] = useInView<HTMLDivElement>({ threshold: 0.25 })

  // Wind sway amplitudes based on intensity
  const swayDuration = [0, 4.5, 3.2, 2.0, 1.2][stormIntensity]
  const swayAngle = [0, 1.5, 3.5, 6.0, 9.5][stormIntensity]

  return (
    <div ref={ref} className="my-16 p-6 md:p-10 rounded-xl palm-leaf-border bg-[var(--bg-card)]">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)]">
          Core Philosophical Thesis • Illustrated Allegory
        </span>
        <h3 className="text-2xl md:text-3xl font-bold mt-1 text-[var(--ink)]">
          The Storm and the Still Tree
        </h3>
        <blockquote className="text-lg md:text-xl italic text-[var(--vermilion)] font-[var(--font-heading-alt)] my-2">
          "The storm moves the tree. It does not move the ground."
        </blockquote>
        <p className="text-xs text-[var(--text-muted)] max-w-lg mx-auto">
          Adjust the storm intensity slider below to watch the branches and canopy sway in the tempest while the deep taproot remains anchored in unshakeable stillness.
        </p>

        {/* Storm Intensity Controller */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <span className="text-xs font-semibold text-[var(--ink)]">Storm Intensity:</span>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setStormIntensity(lvl)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  stormIntensity === lvl
                    ? 'bg-[var(--indigo)] text-white shadow'
                    : 'bg-[var(--parchment-dark)]/40 text-[var(--ink-light)] hover:bg-[var(--parchment-dark)]'
                }`}
              >
                {lvl === 1 && 'Gentle Breeze'}
                {lvl === 2 && 'Gusting Gale'}
                {lvl === 3 && 'Monsoon Tempest'}
                {lvl === 4 && 'Cyclonic Fury'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Storm & Tree Illustration */}
      <div className="relative w-full max-w-2xl mx-auto my-6 bg-gradient-to-b from-[#162040]/30 to-[var(--parchment)] rounded-lg p-6 border border-[var(--border-color)] overflow-hidden shadow-inner">
        {/* Rain / Wind lines dynamically rendered */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
          <svg className="w-full h-full">
            {Array.from({ length: stormIntensity * 16 }).map((_, i) => {
              const x1 = (i * 35) % 600
              const y1 = (i * 25) % 360
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x1 - 20 - stormIntensity * 8}
                  y2={y1 + 40 + stormIntensity * 10}
                  stroke={stormIntensity >= 3 ? "#94B2E6" : "#C9A23A"}
                  strokeWidth={stormIntensity >= 3 ? 1.5 : 0.8}
                  strokeOpacity={0.4 + stormIntensity * 0.12}
                />
              )
            })}
          </svg>
        </div>

        <svg viewBox="0 0 600 420" className="w-full h-auto relative z-10">
          <defs>
            <filter id="rootGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#C9A23A" floodOpacity="0.8" />
            </filter>
            <linearGradient id="trunkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A3B32" />
              <stop offset="100%" stopColor="#2B1B10" />
            </linearGradient>
            <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8A6E20" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#C9A23A" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* THE GROUND HORIZON (Unshaken Earth) */}
          <rect x="0" y="270" width="600" height="150" fill="url(#groundGrad)" />
          <line x1="0" y1="270" x2="600" y2="270" stroke="#C9A23A" strokeWidth="3" />
          <text x="30" y="300" fill="#C9A23A" fontSize="11" fontFamily="var(--font-sanskrit)" fontWeight="bold">
            अचलम् अधिष्ठानम् (Unshaken Ground)
          </text>
          <text x="30" y="315" fill="#8A6E20" fontSize="9" fontFamily="var(--font-marginalia)">
            The Transcendent Ground of Being (Ātman)
          </text>

          {/* GLOWING TAPROOT & SUBTERRANEAN NETWORK (Completely Still) */}
          <g filter="url(#rootGlow)">
            {/* Central deep taproot */}
            <path
              d="M 300 270 Q 300 340 300 400"
              stroke="#C9A23A"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            {/* Deep lateral roots */}
            <path
              d="M 300 285 Q 220 310 160 360 M 300 310 Q 240 350 190 395"
              stroke="#C9A23A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 300 285 Q 380 310 440 360 M 300 310 Q 360 350 410 395"
              stroke="#C9A23A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Glowing nodes in the earth */}
            <circle cx="300" cy="350" r="6" fill="#FFE4B5" className="animate-pulse" />
            <circle cx="210" cy="340" r="4" fill="#FFE4B5" />
            <circle cx="390" cy="340" r="4" fill="#FFE4B5" />
          </g>

          {/* SWAYING TREE TRUNK & CANOPY (Pivot point at ground: 300, 270) */}
          <motion.g
            animate={{
              rotate: [-swayAngle, swayAngle, -swayAngle],
            }}
            transition={{
              duration: swayDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '300px 270px' }}
          >
            {/* Main Trunk */}
            <path
              d="M 285 270 Q 295 180 275 120 Q 290 80 300 60 Q 310 80 325 120 Q 305 180 315 270 Z"
              fill="url(#trunkGrad)"
            />

            {/* Swaying Aerial Roots */}
            <path
              d="M 270 140 Q 250 200 240 265 M 330 140 Q 350 200 360 265"
              stroke="#4A3B32"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Large Canopy Clusters */}
            {/* Left boughs */}
            <path
              d="M 280 140 Q 180 110 110 80 Q 70 70 90 40 Q 140 30 200 60 Q 250 80 280 110"
              fill="#3A3128"
              opacity="0.85"
            />
            <circle cx="140" cy="65" r="55" fill="#5C3D2E" opacity="0.3" />
            <circle cx="210" cy="60" r="50" fill="#E8892B" opacity="0.2" />

            {/* Right boughs */}
            <path
              d="M 320 140 Q 420 110 490 80 Q 530 70 510 40 Q 460 30 400 60 Q 350 80 320 110"
              fill="#3A3128"
              opacity="0.85"
            />
            <circle cx="460" cy="65" r="55" fill="#5C3D2E" opacity="0.3" />
            <circle cx="390" cy="60" r="50" fill="#C9A23A" opacity="0.25" />

            {/* Central crowning foliage */}
            <circle cx="300" cy="40" r="60" fill="#3A3128" opacity="0.9" />
            <circle cx="300" cy="40" r="50" fill="#C9A23A" opacity="0.25" />
          </motion.g>
        </svg>
      </div>

      {/* Philosophical Insight Card */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 rounded-lg bg-[var(--parchment-light)] border border-[var(--border-color)]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--saffron)] mb-1 font-[var(--font-marginalia)]">
            The Swaying Branches (Body, Emotion, Circumstance)
          </h4>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Pain, physical illness, career loss, relational grief, and social storms will inevitably buffet our mortal faculties. To demand that the branches never sway is futile denial. True resilience acknowledges the tempest without panic.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[var(--parchment-light)] border border-[var(--border-color)]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] mb-1 font-[var(--font-marginalia)]">
            The Fixed Ground (Pure Witnessing Ātman)
          </h4>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Beneath all sensory turbulence lies the unmoving ground of pure awareness. The storm cannot move the earth; death cannot touch what was never born. Knowing yourself as the bedrock ground is the ultimate secret of Dhairya.
          </p>
        </div>
      </div>
    </div>
  )
}
