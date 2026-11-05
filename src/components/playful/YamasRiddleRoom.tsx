import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import riddlesData from '../../content/riddles.json'
import { audioEngine } from '../../lib/audioEngine'

export default function YamasRiddleRoom() {
  const [currentStep, setCurrentStep] = useState(0) // 0, 1, 2 = riddles; 3 = final chamber
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [doorOpen, setDoorOpen] = useState(false)
  const [torchFlicker, setTorchFlicker] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const currentRiddle = riddlesData.riddles[currentStep]

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx)
    const opt = currentRiddle.options[idx]

    if (opt.isCorrect) {
      audioEngine.playTempleBell(528, 3.5, 0.4)
      setDoorOpen(true)
      setFeedback(opt.explanation)
    } else {
      // Room dims slightly and torch gutters, but user can retry!
      setTorchFlicker(true)
      setTimeout(() => setTorchFlicker(false), 900)
      setFeedback(`Gently reflect: ${opt.explanation}`)
    }
  }

  const handleProceedDoor = () => {
    setDoorOpen(false)
    setSelectedOption(null)
    setFeedback(null)
    setCurrentStep((prev) => prev + 1)
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setSelectedOption(null)
    setDoorOpen(false)
    setFeedback(null)
  }

  return (
    <div
      className="relative my-12 p-6 md:p-10 rounded-2xl border border-[var(--gold)]/30 overflow-hidden shadow-2xl transition-all duration-700 select-none"
      style={{
        background: torchFlicker
          ? '#050407'
          : 'radial-gradient(circle at 50% 30%, #171424 0%, #0A0912 100%)',
        color: '#F4EEDC',
      }}
      aria-label="Yama's Riddle Room Philosophical Game"
    >
      {/* Stone Chamber Ambient Torch Glows */}
      <div
        className={`absolute top-6 left-8 w-16 h-16 rounded-full bg-amber-500/20 blur-xl pointer-events-none transition-opacity duration-300 ${
          torchFlicker ? 'opacity-20' : 'opacity-80 animate-pulse'
        }`}
      />
      <div
        className={`absolute top-6 right-8 w-16 h-16 rounded-full bg-amber-500/20 blur-xl pointer-events-none transition-opacity duration-300 ${
          torchFlicker ? 'opacity-20' : 'opacity-80 animate-pulse'
        }`}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header HUD */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2 text-[var(--gold)]">
            <span className="text-base">🏛️</span>
            <span className="uppercase tracking-widest font-bold">Yama's Chamber</span>
          </div>

          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i < currentStep
                    ? 'bg-[var(--gold)] shadow-[0_0_8px_#D4AF37]'
                    : i === currentStep
                    ? 'bg-amber-400 ring-2 ring-amber-400/50'
                    : 'bg-white/20'
                }`}
              />
            ))}
            <span className="ml-2 text-white/50">
              {currentStep < 3 ? `Door ${currentStep + 1} of 3` : 'Sanctum'}
            </span>
          </div>
        </div>

        {/* 1. Riddle Stages (Steps 0, 1, 2) */}
        {currentStep < 3 && (
          <div>
            <div className="text-center mb-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--gold)] font-bold block mb-1">
                {currentRiddle.doorName} • {currentRiddle.sanskritDoor}
              </span>
              <p className="font-serif italic text-lg md:text-xl text-amber-100 leading-relaxed font-semibold">
                "{currentRiddle.chamberPrompt}"
              </p>
              <span className="text-xs font-mono text-white/40 block mt-1.5">
                Primary Scripture: {currentRiddle.verseSource}
              </span>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3 mb-6">
              {currentRiddle.options.map((opt, idx) => {
                const isSelected = selectedOption === idx
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={doorOpen}
                    className={`w-full text-left p-4 rounded-xl border text-sm md:text-base transition-all duration-200 cursor-pointer ${
                      isSelected && opt.isCorrect
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                        : isSelected && !opt.isCorrect
                        ? 'border-rose-500/60 bg-rose-950/30 text-rose-200'
                        : 'border-white/10 bg-white/5 hover:border-[var(--gold)]/50 hover:bg-white/10 text-white/90'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-[var(--gold)] font-bold mt-0.5">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span className="font-serif leading-snug">{opt.text}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Explanation / Non-punitive Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-4 rounded-xl text-xs md:text-sm font-sans mb-6 border ${
                    doorOpen
                      ? 'bg-emerald-900/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-amber-900/20 border-amber-500/40 text-amber-200'
                  }`}
                >
                  <p className="leading-relaxed">{feedback}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stone Door Unlocking Animation */}
            {doorOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-6 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/40"
              >
                <div className="flex items-center justify-center gap-2 text-[var(--gold)] mb-2 font-mono text-xs uppercase tracking-widest">
                  <span>✦ The Heavy Stone Door Slides Open ✦</span>
                </div>
                <button
                  onClick={handleProceedDoor}
                  className="px-6 py-2.5 rounded-full bg-[var(--gold)] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-amber-300 transition-all cursor-pointer"
                >
                  Pass to the Next Chamber ▸
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* 2. Final Chamber Culmination (Step 3) */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 space-y-5"
          >
            <span className="text-4xl text-[var(--gold)] block">ॐ</span>
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[var(--gold)] font-bold block">
              The Inner Sanctum of Yama Reached
            </span>

            <h3
              className="text-2xl md:text-4xl font-bold tracking-wide text-white leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              "You have rejected both fear and craving."
            </h3>

            <p className="font-serif italic text-base md:text-lg text-white/80 leading-relaxed max-w-lg mx-auto">
              Yama bows to Nachiketa: "May we ever find seekers like you, who cannot be bought with kingdoms and who look death straight in the eye to find that which never dies."
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#ch-4"
                className="px-6 py-2.5 rounded-full bg-[var(--gold)] text-black font-bold text-xs font-mono uppercase tracking-wider hover:bg-amber-300 transition-all shadow-lg"
              >
                Read Kaṭha Upaniṣad Chapter IV →
              </a>
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-full border border-white/20 text-white/70 hover:text-white text-xs font-mono uppercase tracking-wider hover:border-white/40 transition-all cursor-pointer"
              >
                Replay Riddle Chamber
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
