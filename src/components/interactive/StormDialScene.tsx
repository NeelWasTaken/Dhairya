import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { audioEngine } from '../../lib/audioEngine'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function StormDialScene() {
  const [dialValue, setDialValue] = useState(2) // 1 (calm) to 5 (tempest)
  const [isLightning, setIsLightning] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    audioEngine.setStormIntensity(dialValue)

    // Random lightning flash in high storm
    if (dialValue >= 4 && !prefersReduced) {
      const interval = setInterval(() => {
        if (Math.random() > 0.6) {
          setIsLightning(true)
          audioEngine.triggerThunder()
          setTimeout(() => setIsLightning(false), 120)
        }
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [dialValue, prefersReduced])

  // Sway physics params
  const swayAngle = [0, 1.5, 4.0, 7.5, 12.0, 18.0][dialValue]
  const swaySpeed = [0, 4.0, 2.5, 1.8, 1.1, 0.7][dialValue]

  return (
    <div className="my-16 p-6 md:p-10 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] shadow-xl relative overflow-hidden transition-colors duration-700">
      {/* Lightning Flash Overlay */}
      <AnimatePresence>
        {isLightning && (
          <motion.div
            className="absolute inset-0 bg-white/40 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </AnimatePresence>

      {/* Header & Dial Controller */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-[var(--border-hairline)] pb-6 relative z-10">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold">
            Interactive Thesis • WebGL Audio & Physics
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--ink)]">
            The Storm Dial: Tested in Tempest
          </h3>
          <p className="text-xs text-[var(--text-muted)] italic mt-1 font-[var(--font-marginalia)]">
            Drag the dial to summon cyclonic monsoon gales and observe the immovable ground.
          </p>
        </div>

        {/* Dial Stepper */}
        <div className="flex items-center gap-3 bg-[var(--bg)] p-3 rounded-xl border border-[var(--border-hairline)]">
          <span className="text-xs font-bold font-mono text-[var(--ink-soft)]">
            Storm Intensity:
          </span>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={dialValue}
            onChange={(e) => setDialValue(parseInt(e.target.value))}
            className="w-32 accent-[var(--saffron)] cursor-pointer"
          />
          <span className="text-xs font-bold font-mono px-2 py-1 rounded bg-[var(--surface)] border border-[var(--border-color)] text-[var(--ink)]">
            Level {dialValue}
          </span>
        </div>
      </div>

      {/* Main SVG Banyan Canvas */}
      <div className={`relative w-full h-80 md:h-96 rounded-xl overflow-hidden border border-[var(--border-color)] transition-colors duration-1000 ${
        dialValue >= 4 ? 'bg-[#0B0D18]' : dialValue >= 3 ? 'bg-[#181B28]' : 'bg-[var(--bg-alt)]'
      }`}>
        {/* Rain particles */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70">
          {Array.from({ length: dialValue * 30 }).map((_, i) => {
            const x = (i * 25) % 800
            const y = (i * 18) % 400
            return (
              <line
                key={i}
                x1={x}
                y1={y}
                x2={x - dialValue * 8}
                y2={y + 35 + dialValue * 10}
                stroke={dialValue >= 4 ? "#94B2E6" : "#B8892B"}
                strokeWidth={dialValue >= 4 ? 2 : 1}
                strokeOpacity={0.4 + dialValue * 0.12}
              />
            )
          })}
        </svg>

        <svg viewBox="0 0 800 400" className="w-full h-full relative z-20">
          <defs>
            <filter id="rootGoldGlow">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#D4AF37" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* THE UNMOVED GROUND (Horizon & Subterranean Bedrock) */}
          <rect x="0" y="270" width="800" height="130" fill={dialValue >= 4 ? "#0E111E" : "#E8DFC8"} />
          <line x1="0" y1="270" x2="800" y2="270" stroke="#B8892B" strokeWidth="4" />

          {/* Glowing Immovable Taproot */}
          <g filter="url(#rootGoldGlow)">
            {/* Central Taproot */}
            <path
              d="M 400 270 Q 400 340 400 395"
              stroke="#D4AF37"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            {/* Deep subterranean anchored filaments */}
            <path
              d="M 400 280 Q 280 320 180 380 M 400 310 Q 320 350 250 395"
              stroke="#D4AF37"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 400 280 Q 520 320 620 380 M 400 310 Q 480 350 550 395"
              stroke="#D4AF37"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* SWAYING TREE CANOPY (Pivot at 400, 270) */}
          <motion.g
            animate={{
              rotate: [-swayAngle, swayAngle, -swayAngle],
            }}
            transition={{
              duration: swaySpeed,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '400px 270px' }}
          >
            {/* Trunk */}
            <path
              d="M 380 270 Q 395 180 370 110 Q 390 60 400 40 Q 410 60 430 110 Q 405 180 420 270 Z"
              fill="#2B1B10"
            />
            {/* Swaying Aerial Roots */}
            <path
              d="M 360 140 Q 330 200 320 265 M 440 140 Q 470 200 480 265"
              stroke="#3A3128"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Foliage Clusters */}
            <circle cx="280" cy="80" r="75" fill="#1E1B2E" opacity="0.85" />
            <circle cx="520" cy="80" r="75" fill="#1E1B2E" opacity="0.85" />
            <circle cx="400" cy="50" r="85" fill="#1E1B2E" opacity="0.9" />
            <circle cx="400" cy="50" r="70" fill="#E07A1F" opacity="0.15" />
          </motion.g>
        </svg>

        {/* Max Storm Dynamic Banner */}
        <AnimatePresence>
          {dialValue >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-x-0 bottom-4 z-30 text-center pointer-events-none"
            >
              <span className="px-6 py-2 rounded-full bg-[var(--vermilion)] text-white font-bold tracking-widest text-xs uppercase shadow-2xl drop-shadow-[0_0_20px_rgba(229,75,51,0.8)] font-[var(--font-heading)]">
                "The storm moves the tree. It does not move the ground."
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
