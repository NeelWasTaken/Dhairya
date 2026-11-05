import { useInView } from '../../hooks/useInView'

interface FloatingMarginaliaProps {
  note: string
  author?: string
  side?: 'left' | 'right'
}

export default function FloatingMarginalia({
  note,
  author = 'Scholarly Gloss',
  side = 'right'
}: FloatingMarginaliaProps) {
  const [ref] = useInView<HTMLDivElement>({ threshold: 0.3 })

  return (
    <div
      ref={ref}
      className={`my-6 p-4 rounded border border-[var(--border-color)] bg-[var(--parchment-light)]/90 backdrop-blur-sm shadow-sm max-w-sm ${
        side === 'right' ? 'md:ml-auto md:border-r-4 md:border-r-[var(--gold)]' : 'md:mr-auto md:border-l-4 md:border-l-[var(--gold)]'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs">📜</span>
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)]">
          {author}
        </span>
      </div>
      <p className="text-xs text-[var(--text-secondary)] italic leading-relaxed font-[var(--font-marginalia)]">
        "{note}"
      </p>
    </div>
  )
}
