import { useState, useRef, useEffect } from 'react'
import { audioEngine } from '../../lib/audioEngine'

export default function ChariotSteering() {
  const [isHoldingReins, setIsHoldingReins] = useState(false)
  const [steadiness, setSteadiness] = useState(70) // 0 to 100
  const frameRef = useRef<number | null>(null)

  // Simulation physics loop
  useEffect(() => {
    const loop = () => {
      setSteadiness((prev) => {
        if (isHoldingReins) {
          // Recover steadiness
          return Math.min(prev + 0.8, 100)
        } else {
          // Horses bolt towards distractions
          return Math.max(prev - 1.2, 10)
        }
      })
      frameRef.current = requestAnimationFrame(loop)
    }

    frameRef.current = requestAnimationFrame(loop)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [isHoldingReins])

  // Play sound when horses bolt or are calmed
  useEffect(() => {
    if (!isHoldingReins && steadiness < 30) {
      audioEngine.playHorseWhinny()
    }
  }, [isHoldingReins, steadiness])

  const handleStartHold = () => {
    setIsHoldingReins(true)
  }

  const handleStopHold = () => {
    setIsHoldingReins(false)
  }

  const isBolting = steadiness < 40
  const isOptimal = steadiness >= 80

  return (
    <div className={`my-14 p-6 md:p-10 rounded-xl border transition-all duration-500 shadow-md ${
      isBolting
        ? 'bg-rose-50/70 border-rose-300 dark:bg-rose-950/20 dark:border-rose-800'
        : isOptimal
        ? 'bg-amber-50/70 border-amber-300 dark:bg-amber-950/20 dark:border-amber-700'
        : 'bg-[var(--surface)] border-[var(--border-color)]'
    }`}>
      {/* Header & Mind Meter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border-hairline)]">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold">
            Interactive Simulator • Kaṭha Upaniṣad 1.3
          </span>
          <h3 className="text-2xl font-bold text-[var(--ink)]">
            Steer the Chariot: The Attentional Reins
          </h3>
        </div>

        {/* Live Mind Steadiness Gauge */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold font-mono text-[var(--ink-soft)]">
            Mind Steadiness:
          </span>
          <div className="w-36 h-3 bg-[var(--bg-alt)] rounded-full overflow-hidden border border-[var(--border-color)]">
            <div
              className={`h-full transition-all duration-150 ${
                isBolting ? 'bg-rose-500' : isOptimal ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${steadiness}%` }}
            />
          </div>
          <span className="text-xs font-bold font-mono text-[var(--ink)]">
            {Math.round(steadiness)}%
          </span>
        </div>
      </div>

      {/* Interactive Visual Stage */}
      <div className={`relative w-full h-64 md:h-72 rounded-xl bg-[var(--bg)] border border-[var(--border-color)] overflow-hidden flex items-center justify-center p-4 transition-transform duration-200 ${
        isBolting ? 'animate-shake' : ''
      }`}>
        {/* Road (Straight when optimal, wildly curved when bolting) */}
        <svg viewBox="0 0 600 240" className="w-full h-full">
          <path
            d={isBolting
              ? "M 20 180 Q 150 60 300 210 Q 450 70 580 160"
              : "M 20 160 Q 300 150 580 150"
            }
            stroke={isOptimal ? '#E07A1F' : '#3A3128'}
            strokeWidth={isOptimal ? 16 : 12}
            strokeDasharray={isOptimal ? undefined : "12 8"}
            fill="none"
            className="transition-all duration-700"
          />

          {/* Distractions (Sensory Bait) on Roadside */}
          {isBolting && (
            <g className="animate-pulse">
              <text x="140" y="80" fontSize="24">🍇</text>
              <text x="420" y="65" fontSize="24">💰</text>
              <text x="490" y="210" fontSize="24">🎵</text>
            </g>
          )}

          {/* The 5 Senses (Horses) */}
          <g transform={`translate(${isBolting ? 340 : 380}, 90)`} className="transition-all duration-500">
            {/* Lead Stallion */}
            <path
              d="M 60 40 C 75 10, 100 20, 115 45 C 105 60, 80 65, 60 40 Z"
              fill={isBolting ? '#B8301C' : '#3A3128'}
            />
            {/* Mane & Ears */}
            <polygon points="100,20 108,8 114,24" fill={isBolting ? '#E07A1F' : '#C9A23A'} />
            <text x="80" y="75" textAnchor="middle" fill="#E07A1F" fontSize="10" fontFamily="var(--font-sanskrit)" fontWeight="bold">
              {isBolting ? 'प्रमत्ता हयाः (Wild Horses)' : 'दान्ता हयाः (Tamed Senses)'}
            </text>
          </g>

          {/* Reins (Manas) */}
          <path
            d={isHoldingReins
              ? "M 180 120 Q 280 115 390 105"
              : "M 180 120 Q 280 165 390 120"
            }
            stroke={isHoldingReins ? '#B8892B' : '#B8301C'}
            strokeWidth={isHoldingReins ? 4 : 2}
            strokeDasharray={isHoldingReins ? undefined : "6 4"}
            fill="none"
            className="transition-all duration-300"
          />

          {/* Buddhi Charioteer holding the reins */}
          <g transform="translate(150, 85)">
            <circle cx="20" cy="20" r="14" fill="#1E1B2E" />
            <path d="M 5 60 C 5 35, 35 35, 35 60 Z" fill="#B8301C" />
            <text x="20" y="5" textAnchor="middle" fill="#B8892B" fontSize="10" fontFamily="var(--font-sanskrit)" fontWeight="bold">
              बुद्धिः
            </text>
          </g>
        </svg>

        {/* Central Overlay Cue */}
        <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
            isHoldingReins
              ? 'bg-emerald-500/80 text-white'
              : 'bg-rose-500/80 text-white animate-bounce'
          }`}>
            {isHoldingReins ? '✓ Reins Firmly Held • Buddhi Engaged' : '⚠ Press & Hold Reins to Steer!'}
          </span>
        </div>
      </div>

      {/* Interactive Controls & Shloka Feedback */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Big Drag / Hold Button */}
        <button
          onMouseDown={handleStartHold}
          onMouseUp={handleStopHold}
          onTouchStart={handleStartHold}
          onTouchEnd={handleStopHold}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all shadow-md select-none ${
            isHoldingReins
              ? 'bg-[var(--peacock)] text-white scale-105'
              : 'bg-[var(--gold)] text-[#1E1B2E] hover:bg-[var(--gold-light)]'
          }`}
          style={{ fontFamily: 'var(--font-heading-alt)' }}
        >
          {isHoldingReins ? 'Holding Reins (Manas) • Release to Slacken' : 'Press & Hold to Tighten Reins'}
        </button>

        {/* State explanation shloka */}
        <div className="text-right">
          <span className="sanskrit text-sm font-bold text-[var(--vermilion)] block">
            {isOptimal
              ? 'यस्त्वविज्ञानवान्भवत्ययुक्तेन मनसा सदा । तस्येन्द्रियाण्यवश्यानि...'
              : 'यस्तु विज्ञानवान्भवति युक्तेन मनसा सदा । तस्येन्द्रियाणि वश्यानि...'}
          </span>
          <span className="text-xs text-[var(--text-muted)] font-[var(--font-marginalia)]">
            {isOptimal
              ? 'Kaṭha 1.3.6: "Like well-trained steeds, his senses obey the charioteer."'
              : 'Kaṭha 1.3.5: "Uncontrolled mind allows wild horses to drag the chariot off the path."'}
          </span>
        </div>
      </div>
    </div>
  )
}
