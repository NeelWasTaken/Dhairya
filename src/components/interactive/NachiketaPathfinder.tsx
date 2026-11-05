import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { audioEngine } from '../../lib/audioEngine'

interface GateChoice {
  gateNum: number
  title: string
  context: string
  preyasOffer: {
    title: string
    desc: string
    visual: string
    shloka: string
  }
  sreyasOffer: {
    title: string
    desc: string
    visual: string
    shloka: string
  }
}

const gates: GateChoice[] = [
  {
    gateNum: 1,
    title: "Gate I: Filial Reconciliation vs Worldly Escape",
    context: "After waiting three nights hungry at Death's door, Yama grants the first boon. What shall you ask?",
    preyasOffer: {
      title: "Escape to Heavenly Comfort",
      desc: "Forget your angry mortal father; ask for an immediate retreat to painless celestial pleasures.",
      visual: "🏰",
      shloka: "Kaṭha 1.1.9: Preyas whispers avoidance of painful family knots."
    },
    sreyasOffer: {
      title: "Reconcile with Father Vājaśravas",
      desc: "Ask that his wrath be pacified and he welcome you back with a serene and loving heart (śānta-saṅkalpaḥ).",
      visual: "🕊️",
      shloka: "Kaṭha 1.1.10: Śreyas resolves relational guilt first before seeking metaphysics."
    }
  },
  {
    gateNum: 2,
    title: "Gate II: Sensual Luxury vs Sacrificial Fire (Competence)",
    context: "Yama offers the second boon. The fire that bridges mortal effort to celestial fulfillment.",
    preyasOffer: {
      title: "Perpetual Physical Youth & Satiation",
      desc: "Ask that your bodily senses never age and your mortal thirsts never know disappointment.",
      visual: "🍷",
      shloka: "Kaṭha 1.1.12: Preyas seeks biological invulnerability."
    },
    sreyasOffer: {
      title: "Master the Nāciketa Fire",
      desc: "Learn the exact structural contemplation of the sacred altar that transmutes biological energy into spiritual illumination.",
      visual: "🔥",
      shloka: "Kaṭha 1.1.13: Śreyas cultivates cognitive discipline and sacred execution."
    }
  },
  {
    gateNum: 3,
    title: "Gate III: The Great Temptation — Empire vs The Unborn Self",
    context: "Yama tests you with maximum fury: 'Ask for centenarian sons, gold, elephants, kingdoms over all the earth, fair maidens with harps—do not ask me of Death!'",
    preyasOffer: {
      title: "Accept Worldly Empire & Pleasures",
      desc: "Accept the golden chariots and celestial nymphs: enjoy what cannot be won by mortals.",
      visual: "👑",
      shloka: "Kaṭha 1.2.2: 'Śvobhāvā martyasya—pleasures wear out the senses of mortals.'"
    },
    sreyasOffer: {
      title: "Reject Golden Handcuffs; Demand Ātma-Jñāna",
      desc: "Declare: 'Keep your chariots and dancers! No boon other than the imperishable Self will I accept.'",
      visual: "👁️",
      shloka: "Kaṭha 1.2.18: 'Na jāyate mriyate vā vipaścin—The knowing Self is never born, nor dies.'"
    }
  }
]

export default function NachiketaPathfinder() {
  const [currentGate, setCurrentGate] = useState(0)
  const [choices, setChoices] = useState<('preyas' | 'sreyas')[]>([])
  const [isCompleted, setIsCompleted] = useState(false)

  const gate = gates[currentGate]

  const handleChoose = (choice: 'preyas' | 'sreyas') => {
    audioEngine.playTempleBell(choice === 'sreyas' ? 587.33 : 329.63, 2.0, 0.25)
    const nextChoices = [...choices, choice]
    setChoices(nextChoices)

    if (currentGate < gates.length - 1) {
      setCurrentGate(currentGate + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handleReset = () => {
    setCurrentGate(0)
    setChoices([])
    setIsCompleted(false)
  }

  return (
    <div className="my-16 p-6 md:p-10 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-[var(--border-hairline)] pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold">
            Interactive Moral Labyrinth • Kaṭha Upaniṣad
          </span>
          <h3 className="text-2xl font-bold text-[var(--ink)]">
            Nachiketa's Three Gates: Choose Your Path
          </h3>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[var(--bg)] border border-[var(--border-hairline)]">
          {!isCompleted ? `Gate ${currentGate + 1} of 3` : 'Journey Completed'}
        </span>
      </div>

      {!isCompleted ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={gate.gateNum}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
          >
            <h4 className="text-xl font-bold text-[var(--vermilion)] mb-2">
              {gate.title}
            </h4>
            <p className="text-sm md:text-base text-[var(--text-secondary)] mb-8 leading-relaxed">
              {gate.context}
            </p>

            {/* Two Choices: Preyas vs Sreyas */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Option A: Preyas */}
              <div
                onClick={() => handleChoose('preyas')}
                className="p-6 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-800 hover:border-amber-500 cursor-pointer transition-all hover:scale-[1.02] shadow-sm group"
              >
                <div className="text-4xl mb-3">{gate.preyasOffer.visual}</div>
                <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-300 font-bold font-[var(--font-marginalia)]">
                  The Path of Preyas (Pleasant / Fragile)
                </span>
                <h5 className="text-lg font-bold text-[var(--ink)] mt-1 mb-2">
                  {gate.preyasOffer.title}
                </h5>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  {gate.preyasOffer.desc}
                </p>
                <div className="text-[11px] font-mono text-[var(--text-muted)] border-t border-amber-200 dark:border-amber-900 pt-2 italic">
                  {gate.preyasOffer.shloka}
                </div>
              </div>

              {/* Option B: Sreyas */}
              <div
                onClick={() => handleChoose('sreyas')}
                className="p-6 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-emerald-300 dark:border-emerald-800 hover:border-emerald-500 cursor-pointer transition-all hover:scale-[1.02] shadow-sm group"
              >
                <div className="text-4xl mb-3">{gate.sreyasOffer.visual}</div>
                <span className="text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-300 font-bold font-[var(--font-marginalia)]">
                  The Path of Śreyas (The Good / Resilient)
                </span>
                <h5 className="text-lg font-bold text-[var(--ink)] mt-1 mb-2">
                  {gate.sreyasOffer.title}
                </h5>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  {gate.sreyasOffer.desc}
                </p>
                <div className="text-[11px] font-mono text-[var(--text-muted)] border-t border-emerald-200 dark:border-emerald-900 pt-2 italic">
                  {gate.sreyasOffer.shloka}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        /* Summary Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 text-center bg-[var(--bg-alt)] rounded-xl border border-[var(--border-color)]"
        >
          <div className="text-5xl mb-3">🪔</div>
          <h4 className="text-2xl font-bold text-[var(--ink)] mb-2">
            Your Contemplative Path Report
          </h4>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto mb-6">
            You chose {choices.filter(c => c === 'sreyas').length} of 3 Śreyas gates.
            {choices.filter(c => c === 'sreyas').length === 3
              ? " You walked Nachiketa's hero journey with unwavering fidelity, refusing all golden bribes in exchange for the unborn Self."
              : " You tasted both the seductive comfort of Preyas and the enduring rigor of Śreyas. Contemplation requires noticing how easily the mind trades immortality for comfort."}
          </p>

          <button
            onClick={handleReset}
            className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-[var(--gold)] text-[#1E1B2E] hover:bg-[var(--gold-light)] shadow transition-all"
          >
            Retread the Three Gates
          </button>
        </motion.div>
      )}
    </div>
  )
}
