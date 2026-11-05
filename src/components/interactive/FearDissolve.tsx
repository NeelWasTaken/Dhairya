import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { audioEngine } from '../../lib/audioEngine'

interface ShadowFigure {
  id: number
  x: number
  y: number
  label: string
  dissolved: boolean
}

export default function FearDissolve() {
  const [shadows, setShadows] = useState<ShadowFigure[]>([
    { id: 1, x: 80, y: 50, label: "The Other (Separateness)", dissolved: false },
    { id: 2, x: 500, y: 70, label: "Anticipated Loss", dissolved: false },
    { id: 3, x: 90, y: 220, label: "Social Judgment", dissolved: false },
    { id: 4, x: 480, y: 230, label: "Mortality & Decay", dissolved: false },
  ])

  const [dissolvedCount, setDissolvedCount] = useState(0)

  const handleDissolve = (id: number) => {
    audioEngine.playTempleBell(440 + id * 60, 2.5, 0.25)
    setShadows((prev) =>
      prev.map((s) => (s.id === id ? { ...s, dissolved: true } : s))
    )
    setDissolvedCount((c) => c + 1)
  }

  const handleReset = () => {
    setShadows((prev) => prev.map((s) => ({ ...s, dissolved: false })))
    setDissolvedCount(0)
  }

  const allDissolved = dissolvedCount >= 4

  return (
    <div className="my-16 p-6 md:p-10 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] shadow-xl text-center select-none">
      <div className="mb-6">
        <span className="text-[10px] uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold">
          Bṛhadāraṇyaka Upaniṣad 1.4.2 • Dvitīyād Vai Bhayaṃ Bhavati
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-[var(--ink)]">
          Fear Dissolves in Oneness
        </h3>
        <p className="text-xs text-[var(--text-muted)] italic max-w-md mx-auto mt-1 font-[var(--font-marginalia)]">
          "Fear arises only from a perceived second entity." Click or drag the looming shadow figures toward the central Self to merge them into luminous unity.
        </p>
      </div>

      {/* Interactive Arena */}
      <div className="relative w-full max-w-2xl h-80 mx-auto rounded-xl bg-[var(--bg)] border border-[var(--border-hairline)] overflow-hidden flex items-center justify-center p-4">
        {/* Central Luminous Self */}
        <motion.div
          className="relative z-20 w-24 h-24 rounded-full bg-gradient-to-tr from-[var(--gold)] to-[#FFE4B5] border-2 border-white shadow-[0_0_40px_rgba(212,175,55,0.6)] flex flex-col items-center justify-center"
          animate={{
            scale: allDissolved ? [1, 1.25, 1.15] : [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="sanskrit text-2xl font-bold text-[#1E1B2E]">आत्मा</span>
          <span className="text-[9px] font-bold tracking-wider text-[#1E1B2E]/70 uppercase">ONENESS</span>
        </motion.div>

        {/* Orbiting Shadow Figures */}
        {shadows.map((sh) => (
          <AnimatePresence key={sh.id}>
            {!sh.dissolved ? (
              <motion.div
                className="absolute z-10 p-3 rounded-lg bg-[#141220] text-white border border-red-500/40 shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center gap-2"
                style={{ left: `${sh.x}px`, top: `${sh.y}px` }}
                onClick={() => handleDissolve(sh.id)}
                whileHover={{ scale: 1.08 }}
                drag
                dragConstraints={{ left: 0, right: 500, top: 0, bottom: 200 }}
                onDragEnd={(_, info) => {
                  // If dragged near center, dissolve
                  if (Math.abs(info.offset.x) > 40 || Math.abs(info.offset.y) > 40) {
                    handleDissolve(sh.id)
                  }
                }}
              >
                <span className="text-base">👤</span>
                <span className="text-[11px] font-semibold text-rose-300 font-mono">
                  {sh.label}
                </span>
              </motion.div>
            ) : (
              /* Light Burst when dissolved */
              <motion.div
                className="absolute w-8 h-8 rounded-full bg-[var(--gold)] pointer-events-none"
                style={{ left: `${sh.x}px`, top: `${sh.y}px` }}
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            )}
          </AnimatePresence>
        ))}

        {/* Victory message */}
        {allDissolved && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-x-0 bottom-4 z-30 pointer-events-none"
          >
            <span className="px-6 py-2 rounded-full bg-[var(--gold)] text-[#1E1B2E] font-bold text-xs uppercase tracking-widest shadow-xl">
              ✓ All Shadows Merged: Where There Is Oneness, What Sorrow Can Remain?
            </span>
          </motion.div>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        {allDissolved && (
          <button
            onClick={handleReset}
            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[var(--bg-alt)] hover:bg-[var(--gold)] text-[var(--ink)] transition-all"
          >
            Reset Experiment
          </button>
        )}
      </div>
    </div>
  )
}
