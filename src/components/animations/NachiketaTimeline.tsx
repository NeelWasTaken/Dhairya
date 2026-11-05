import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

interface BoonStage {
  id: number
  gate: string
  title: string
  sanskrit: string
  description: string
  yamaOffer: string
  nachiketaResponse: string
  resilienceLesson: string
  bgColor: string
  textColor: string
}

const stages: BoonStage[] = [
  {
    id: 1,
    gate: "The First Gate: Reconciliation",
    title: "Pacifying the Father's Anger",
    sanskrit: "शान्तसंकल्पः सुमना यथा स्यात्",
    description: "Nachiketa asks that his father Vājaśravas, whose anger sent him to Death's realm, be freed from wrath, peaceful in mind, and welcome him back with tender recognition.",
    yamaOffer: "Granted freely: Vājaśravas will sleep peacefully and welcome his son with renewed affection.",
    nachiketaResponse: "Nachiketa secures relational restoration first—resolving filial guilt and completing domestic closure before seeking esoteric wisdom.",
    resilienceLesson: "Grief and trauma processing begins with relational closure. You cannot pursue higher existential mastery while running away from unresolved relational wounds.",
    bgColor: "#B3341F",
    textColor: "#F1E3C4"
  },
  {
    id: 2,
    gate: "The Second Gate: Competence",
    title: "The Fire of Purpose (Nāciketa Agni)",
    sanskrit: "लोकादिमग्निं तमुवाच तस्मै",
    description: "Nachiketa asks to learn the sacred Fire that leads to heavenly realms where hunger, thirst, aging, and fear of death do not exist.",
    yamaOffer: "Yama explains the precise structural architecture of the Fire altar. Nachiketa repeats the entire instruction flawlessly.",
    nachiketaResponse: "Delighted by his brilliant cognitive memory and focus, Yama names the altar forever after him: the Nāciketa Fire.",
    resilienceLesson: "Mastery of tools, cognitive discipline, and practical competence. Resilient individuals develop high skill and execution stamina before tackling existential crises.",
    bgColor: "#E8892B",
    textColor: "#2B1B10"
  },
  {
    id: 3,
    gate: "The Third Gate: Immortality",
    title: "The Great Mystery Beyond Death",
    sanskrit: "येयं प्रेते विचिकित्सा मनुष्ये",
    description: "Nachiketa asks the ultimate existential question: 'When a human being dies, this doubt remains—some say he exists, others say he does not. Teach me the truth of the Self beyond death!'",
    yamaOffer: "Yama tests him fiercely: 'Ask for centenarian sons, herds of cattle, gold, chariots, celestial nymphs, kingdoms over the whole earth—do not press me on death!'",
    nachiketaResponse: "Nachiketa rejects all worldly offers: 'Śvobhāvā martyasya—all these pleasures perish tomorrow and wear out the vigor of the senses! Keep your chariots and dancers! No boon other than the Self will I accept.'",
    resilienceLesson: "Delayed gratification and unbribable existential integrity. True resilience refuses shallow consumerist pacifiers when confronted with mortality, insisting on bedrock truth.",
    bgColor: "#1D2A4D",
    textColor: "#E8DCC8"
  }
]

export default function NachiketaTimeline() {
  const [activeStage, setActiveStage] = useState(0)
  const [ref] = useInView<HTMLDivElement>({ threshold: 0.2 })

  const current = stages[activeStage]

  return (
    <div ref={ref} className="my-16 rounded-xl overflow-hidden shadow-2xl transition-colors duration-700 border border-[var(--border-color)]"
      style={{ backgroundColor: current.bgColor, color: current.textColor }}
    >
      {/* Header Banner */}
      <div className="p-6 md:p-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest opacity-75 font-[var(--font-marginalia)]">
            Kaṭha Upaniṣad 1.1–1.2 • The Three Gates of Yama's Palace
          </span>
          <h3 className="text-2xl md:text-3xl font-bold mt-1" style={{ color: current.textColor }}>
            Nachiketa's Heroic Inquiry
          </h3>
        </div>
        <div className="flex gap-2">
          {stages.map((stg, idx) => (
            <button
              key={stg.id}
              onClick={() => setActiveStage(idx)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeStage === idx
                  ? 'bg-white/20 shadow-lg ring-2 ring-white/50 scale-105'
                  : 'bg-black/20 opacity-60 hover:opacity-90'
              }`}
              style={{ fontFamily: 'var(--font-heading-alt)' }}
            >
              <span>Gate {idx + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 md:p-10 grid md:grid-cols-12 gap-8 items-center">
        {/* Left Column: Narrative */}
        <div className="md:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest mb-3">
                {current.gate}
              </div>
              <h4 className="text-2xl md:text-3xl font-bold mb-2">{current.title}</h4>
              <p className="sanskrit text-lg mb-4 opacity-90">{current.sanskrit}</p>
              <p className="text-base leading-relaxed opacity-95 mb-6">{current.description}</p>

              {/* Yama's Temptation vs Nachiketa's Resolve */}
              <div className="p-4 rounded-lg bg-black/20 border border-white/10 space-y-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] block mb-0.5">
                    Yama's Test / Response
                  </span>
                  <p className="text-sm opacity-90">{current.yamaOffer}</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--saffron)] block mb-0.5">
                    Nachiketa's Stance
                  </span>
                  <p className="text-sm opacity-90">{current.nachiketaResponse}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Resilience Analysis Card */}
        <div className="md:col-span-5">
          <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-[var(--gold)] flex items-center justify-center text-xl mb-4 text-[#2B1B10]">
              {activeStage === 0 && '🕊️'}
              {activeStage === 1 && '🔥'}
              {activeStage === 2 && '👑'}
            </div>
            <h5 className="text-sm font-bold uppercase tracking-widest text-[var(--gold)] mb-2 font-[var(--font-marginalia)]">
              Psychological Resilience Decoded
            </h5>
            <p className="text-base leading-relaxed mb-4">{current.resilienceLesson}</p>

            {/* Stepper Dots */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs opacity-75 font-[var(--font-marginalia)]">
                Boon {activeStage + 1} of 3
              </span>
              <div className="flex gap-2">
                <button
                  disabled={activeStage === 0}
                  onClick={() => setActiveStage((p) => Math.max(p - 1, 0))}
                  className="px-2.5 py-1 rounded bg-black/20 disabled:opacity-30 text-xs hover:bg-black/40"
                >
                  ← Prev
                </button>
                <button
                  disabled={activeStage === 2}
                  onClick={() => setActiveStage((p) => Math.min(p + 1, 2))}
                  className="px-2.5 py-1 rounded bg-black/20 disabled:opacity-30 text-xs hover:bg-black/40"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
