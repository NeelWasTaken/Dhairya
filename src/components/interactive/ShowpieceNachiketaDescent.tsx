import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function ShowpieceNachiketaDescent() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const prefersReduced = useReducedMotion()

  const lines = [
    { sa: 'तिस्रो रात्रीर्यदवात्सीर्गृहे मे', en: 'Three nights, child, you waited outside my stone portal unfed...' },
    { sa: 'नचिकेतः प्रमदात्प्रमत्तो', en: 'Yama tests: Take gold, long life, and kingdoms of ephemeral delight.' },
    { sa: 'श्वोभावा मर्त्यस्य यदन्तकैतत्', en: 'Nachiketa answers: "All these perish tomorrow, O Death. Reveal the Imperishable."' },
  ]

  if (prefersReduced) {
    return (
      <div className="my-12 p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
        {lines.map((l, i) => (
          <div key={i} className="mb-4 text-center">
            <span className="sanskrit text-lg text-[var(--vermilion)] block">{l.sa}</span>
            <span className="text-xs text-[var(--text-muted)] italic">{l.en}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`relative my-12 p-8 md:p-14 rounded-2xl transition-colors duration-1000 overflow-hidden text-center border ${
        isInView ? 'bg-[#0A0710] border-[#2B1B3D]' : 'bg-[var(--surface)] border-[var(--border-color)]'
      }`}
      aria-label="Nachiketa Descent into Yama's Abode"
    >
      <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] font-mono block mb-6">
        Descent into Death's Hall • यमसभा प्रवेशः
      </span>

      <div className="space-y-6 max-w-2xl mx-auto">
        {lines.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ y: '-40vh', opacity: 0, filter: 'blur(8px)' }}
            animate={
              isInView
                ? {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                  }
                : {}
            }
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
              delay: idx * 0.35,
            }}
            className="p-4 rounded-xl bg-white/[0.03] border border-white/5"
          >
            <span className="sanskrit text-lg md:text-xl text-[var(--gold)] font-bold block mb-1">
              {item.sa}
            </span>
            <span className="text-xs md:text-sm text-stone-300 italic font-[var(--font-heading-alt)]">
              "{item.en}"
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
