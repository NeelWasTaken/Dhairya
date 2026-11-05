import { useState } from 'react'
import { motion } from 'framer-motion'
import { audioEngine } from '../../lib/audioEngine'

export default function MandukyaSpinWheel() {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [activeZone, setActiveZone] = useState<'A' | 'U' | 'M' | 'Turiya'>('Turiya')

  const handlePointerDown = () => {
    setIsSpinning(true)
    audioEngine.playTempleBell(220, 1.2, 0.15)
  }

  const handlePointerUp = () => {
    setIsSpinning(false)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isSpinning) {
      setRotation(prev => prev + e.movementX * 1.5)
    }
  }

  const zoneDetails = {
    A: { name: "Jāgrat (A)", desc: "Waking consciousness: outward cognition, gross sensory stimulation, subject to physical agitation." },
    U: { name: "Svapna (U)", desc: "Dream consciousness: inward cognition, subtle mental flux, desires, anxieties." },
    M: { name: "Suṣupti (M)", desc: "Deep sleep: mass of unified awareness, temporary suspension of ego and distress." },
    Turiya: { name: "Turīya (Silence)", desc: "The unconditioned baseline of pure observation. Unbroken, silent, ever-still amidst the spinning wheel of states." }
  }[activeZone]

  return (
    <div className="my-16 p-6 md:p-10 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] shadow-xl text-center">
      <div className="mb-6">
        <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold">
          Māṇḍūkya Upaniṣad • Kinetic Contemplation
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-[var(--ink)]">
          The Mandukya Inertial Wheel
        </h3>
        <p className="text-xs text-[var(--text-muted)] italic mt-1 max-w-md mx-auto">
          Drag and spin the outer wheel with your cursor. Notice that no matter how violently the outer rings spin and blur, the golden centre (Turīya) remains anchored in silence.
        </p>
      </div>

      {/* Interactive Rotating Wheel Canvas */}
      <div className="relative w-72 h-72 md:w-88 md:h-88 mx-auto flex items-center justify-center my-6 select-none cursor-grab active:cursor-grabbing">
        {/* Outer Ring Sectors with Blur when spinning */}
        <motion.div
          className="absolute inset-0 rounded-full flex items-center justify-center"
          animate={{ rotate: rotation }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
          style={{
            filter: isSpinning ? 'blur(3px)' : 'none',
            transition: 'filter 0.3s ease',
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
        >
          <svg viewBox="0 0 300 300" className="w-full h-full">
            {/* Sector A */}
            <path
              d="M 150 150 L 50 40 A 130 130 0 0 1 250 40 Z"
              fill="#E07A1F"
              fillOpacity={activeZone === 'A' ? 0.6 : 0.25}
              onClick={() => setActiveZone('A')}
              className="cursor-pointer"
            />
            <text x="150" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
              Jāgrat (A)
            </text>

            {/* Sector U */}
            <path
              d="M 150 150 L 250 40 A 130 130 0 0 1 230 250 Z"
              fill="#B8301C"
              fillOpacity={activeZone === 'U' ? 0.6 : 0.25}
              onClick={() => setActiveZone('U')}
              className="cursor-pointer"
            />
            <text x="220" y="150" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
              Svapna (U)
            </text>

            {/* Sector M */}
            <path
              d="M 150 150 L 230 250 A 130 130 0 0 1 50 40 Z"
              fill="#0E6B6B"
              fillOpacity={activeZone === 'M' ? 0.6 : 0.25}
              onClick={() => setActiveZone('M')}
              className="cursor-pointer"
            />
            <text x="100" y="210" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
              Suṣupti (M)
            </text>
          </svg>
        </motion.div>

        {/* TURĪYA STILL CENTRE (Never Blurs, Solid Ground) */}
        <div
          onClick={() => {
            setActiveZone('Turiya')
            audioEngine.playTempleBell(880, 3.5, 0.3)
          }}
          className="absolute z-20 w-28 h-28 rounded-full bg-[var(--gold)] border-4 border-white shadow-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        >
          <span className="sanskrit text-2xl font-bold text-[#1E1B2E]">तुरीय</span>
          <span className="text-[9px] uppercase font-bold tracking-wider text-[#1E1B2E]/80">TURĪYA</span>
        </div>
      </div>

      {/* Description Box */}
      <div className="max-w-lg mx-auto p-4 rounded-xl bg-[var(--bg)] border border-[var(--border-hairline)] mt-4">
        <h4 className="text-sm font-bold text-[var(--vermilion)] mb-1">
          {zoneDetails.name}
        </h4>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          {zoneDetails.desc}
        </p>
      </div>
    </div>
  )
}
