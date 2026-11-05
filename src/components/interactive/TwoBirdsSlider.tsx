import { useState } from 'react'
import { audioEngine } from '../../lib/audioEngine'

export default function TwoBirdsSlider() {
  const [sliderPos, setSliderPos] = useState(50) // 0 (Experiencing / Jiva) to 100 (Witness / Saksi)

  const isEatingBird = sliderPos < 35
  const isWitnessBird = sliderPos > 65

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value)
    setSliderPos(val)
    if (val === 100) {
      audioEngine.playTempleBell(523.25, 3.0, 0.2)
    }
  }

  return (
    <div className="my-16 p-6 md:p-10 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border-hairline)]">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold">
            Muṇḍaka Upaniṣad 3.1.1 • Dual-Perspective Contemplation
          </span>
          <h3 className="text-2xl font-bold text-[var(--ink)]">
            The Two Birds Perspective Slider
          </h3>
        </div>

        {/* Perspective Dial Slider */}
        <div className="flex items-center gap-3 bg-[var(--bg)] p-3 rounded-xl border border-[var(--border-hairline)]">
          <span className="text-xs font-bold text-[var(--vermilion)]">Jīva (Experiencer)</span>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={handleSliderChange}
            className="w-36 accent-[var(--gold)] cursor-pointer"
          />
          <span className="text-xs font-bold text-[var(--gold)]">Sākṣī (Witness)</span>
        </div>
      </div>

      {/* Screen Canvas: Shifts from Shaky Saturated Jiva View to Calm Desaturated Witness View */}
      <div className={`relative w-full h-72 md:h-84 rounded-xl border border-[var(--border-color)] overflow-hidden flex items-center justify-center p-6 transition-all duration-700 ${
        isEatingBird
          ? 'bg-gradient-to-r from-red-100 to-amber-100 dark:from-red-950/40 dark:to-amber-950/40 animate-shake'
          : isWitnessBird
          ? 'bg-gradient-to-b from-[#181A28] to-[#0A0B14] text-white'
          : 'bg-[var(--bg-alt)]'
      }`}>
        <svg viewBox="0 0 600 300" className="w-full h-full">
          {/* Tree Silhouette */}
          <path
            d="M 280 300 Q 290 180 270 120 Q 250 80 300 40 Q 320 80 310 120 Q 330 180 340 300 Z"
            fill={isWitnessBird ? "#4A4660" : "#2B1B10"}
          />
          {/* Lower Branch (Jīva) */}
          <path
            d="M 280 180 Q 200 190 140 170 Q 90 150 60 160"
            stroke={isWitnessBird ? "#4A4660" : "#2B1B10"}
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          {/* Higher Branch (Sākṣī) */}
          <path
            d="M 290 120 Q 380 100 440 80 Q 500 60 540 70"
            stroke={isWitnessBird ? "#D4AF37" : "#3A3128"}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />

          {/* Bird 1: Jīva (Lower) */}
          <g
            transform="translate(130, 140)"
            opacity={1 - (sliderPos / 100) * 0.75}
            filter={isWitnessBird ? 'grayscale(80%)' : undefined}
          >
            <ellipse cx="20" cy="15" rx="20" ry="14" fill="#B8301C" />
            <circle cx="2" cy="8" r="8" fill="#B8301C" />
            <circle cx="0" cy="6" r="2" fill="#FFE4B5" />
            <polygon points="-6,8 -16,12 -6,14" fill="#E07A1F" />
            <circle cx="-18" cy="14" r="5" fill="#B8301C" />
            <text x="20" y="-8" textAnchor="middle" fill="#B8301C" fontSize="10" fontWeight="bold">
              Eating Fruit (Pain & Pleasure)
            </text>
          </g>

          {/* Bird 2: Sākṣī (Higher) */}
          <g
            transform="translate(420, 50)"
            opacity={0.3 + (sliderPos / 100) * 0.7}
          >
            <circle cx="20" cy="15" r="32" fill="#FFE4B5" fillOpacity={isWitnessBird ? 0.35 : 0.05} />
            <ellipse cx="20" cy="15" rx="22" ry="15" fill="#D4AF37" />
            <circle cx="2" cy="8" r="9" fill="#D4AF37" />
            <circle cx="0" cy="6" r="2" fill="#1E1B2E" />
            <polygon points="-5,8 -14,10 -5,12" fill="#E07A1F" />
            <text x="20" y="-12" textAnchor="middle" fill="#D4AF37" fontSize="11" fontWeight="bold">
              Silent Witness (Sākṣī)
            </text>
          </g>
        </svg>

        {/* Dynamic Context Pill */}
        <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
          <span className="px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-black/60 text-white shadow-lg">
            {isEatingBird
              ? '⚡ Jīva Mind: Shaky, Reactive, Caught in Pain and Pleasure'
              : isWitnessBird
              ? '🪷 Sākṣī Mind: Still, Transcendent, Unhurt by Circumstance'
              : '↔ Drag the slider to shift perspective from Agitation to Stillness'}
          </span>
        </div>
      </div>
    </div>
  )
}
