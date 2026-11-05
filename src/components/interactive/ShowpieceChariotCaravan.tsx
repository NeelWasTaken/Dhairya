import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function ShowpieceChariotCaravan() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.25 })
  const prefersReduced = useReducedMotion()

  const labels = [
    { role: 'आत्मानं रथिनं विद्धि', entity: 'Ātman = The Lord & Rider', delay: 0.1 },
    { role: 'शरीरं रथमेव तु', entity: 'Śarīra = The Chariot Frame', delay: 0.25 },
    { role: 'बुद्धिं तु सारथिं विद्धि', entity: 'Buddhi = The Charioteer (Discernment)', delay: 0.4 },
    { role: 'मनः प्रग्रहमेव च', entity: 'Manas = The Attentional Reins', delay: 0.55 },
    { role: 'इन्द्रियाणि हयानाहुः', entity: 'Indriyas = The Five Senses (Horses)', delay: 0.7 },
  ]

  if (prefersReduced) {
    return (
      <div className="my-10 p-6 rounded-xl bg-[var(--surface)] border border-[var(--border-color)]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
          {labels.map((l, i) => (
            <div key={i} className="p-3 bg-[var(--bg-alt)] rounded-lg">
              <span className="sanskrit text-sm font-bold text-[var(--vermilion)] block">{l.role}</span>
              <span className="text-xs text-[var(--ink-soft)] font-medium">{l.entity}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="my-12 p-8 md:p-10 rounded-2xl bg-[var(--surface)] border border-[var(--gold)]/30 overflow-hidden shadow-lg"
      aria-label="Chariot Caravan Labels arriving from the Right"
    >
      <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] font-mono block mb-4 text-center">
        Sensory Caravan Arrival • रथयात्रा पद संधानम्
      </span>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {labels.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ x: '50vw', opacity: 0, skewX: 10, filter: 'blur(8px)' }}
            animate={
              isInView
                ? {
                    x: 0,
                    opacity: 1,
                    skewX: 0,
                    filter: 'blur(0px)',
                  }
                : {}
            }
            transition={{
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1],
              delay: item.delay,
            }}
            className="p-4 rounded-xl bg-[var(--bg-alt)] border border-[var(--border-hairline)] text-center flex flex-col justify-between hover:border-[var(--gold)] transition-colors"
          >
            <span className="sanskrit text-sm md:text-base font-bold text-[var(--vermilion)] block mb-1">
              {item.role}
            </span>
            <span className="text-xs text-[var(--ink-soft)] font-[var(--font-marginalia)]">
              {item.entity}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
