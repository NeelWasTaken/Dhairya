import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

type DividerType = 'mandala' | 'lotus' | 'om' | 'simple'

interface SectionDividerProps {
  type?: DividerType
}

function MandalaMotif() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="glow-gold">
      <circle cx="30" cy="30" r="28" stroke="var(--gold)" strokeWidth="0.5" opacity="0.4" />
      <circle cx="30" cy="30" r="24" stroke="var(--gold)" strokeWidth="0.5" opacity="0.3" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x1 = 30 + Math.cos(angle) * 10
        const y1 = 30 + Math.sin(angle) * 10
        const x2 = 30 + Math.cos(angle) * 22
        const y2 = 30 + Math.sin(angle) * 22
        return (
          <ellipse
            key={i}
            cx={(x1 + x2) / 2}
            cy={(y1 + y2) / 2}
            rx="6"
            ry="3"
            fill="var(--gold)"
            opacity="0.15"
            transform={`rotate(${(i / 8) * 360} ${(x1 + x2) / 2} ${(y1 + y2) / 2})`}
          />
        )
      })}
      <circle cx="30" cy="30" r="4" fill="var(--gold)" opacity="0.3" />
      <circle cx="30" cy="30" r="2" fill="var(--saffron)" opacity="0.5" />
    </svg>
  )
}

function LotusMotif() {
  return (
    <svg width="50" height="30" viewBox="0 0 50 30" fill="none">
      <path d="M25 28 C20 22 10 18 8 10 C6 4 14 2 25 8 C36 2 44 4 42 10 C40 18 30 22 25 28Z" fill="var(--lotus)" opacity="0.2" />
      <path d="M25 26 C22 20 16 16 14 12 C12 8 18 6 25 10 C32 6 38 8 36 12 C34 16 28 20 25 26Z" fill="var(--lotus)" opacity="0.3" />
      <path d="M25 22 C23 18 20 16 18 14 C16 12 20 10 25 13 C30 10 34 12 32 14 C30 16 27 18 25 22Z" fill="var(--lotus)" opacity="0.4" />
    </svg>
  )
}

function OmMotif() {
  return (
    <span className="sanskrit text-2xl" style={{ color: 'var(--gold)', opacity: 0.4 }}>ॐ</span>
  )
}

const motifs: Record<DividerType, () => ReactNode> = {
  mandala: MandalaMotif,
  lotus: LotusMotif,
  om: OmMotif,
  simple: () => <div className="w-2 h-2 rounded-full bg-[var(--gold)] opacity-30" />,
}

export default function SectionDivider({ type = 'mandala' }: SectionDividerProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.5 })
  const Motif = motifs[type]

  return (
    <motion.div
      ref={ref}
      className="section-divider"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      aria-hidden="true"
    >
      <Motif />
    </motion.div>
  )
}

export function CornerOrnament({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const rotations = { tl: '0', tr: '90', bl: '270', br: '180' }
  const positions = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    bl: 'bottom-0 left-0',
    br: 'bottom-0 right-0',
  }

  return (
    <div className={`absolute ${positions[position]} w-12 h-12 opacity-20 pointer-events-none`} aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none" style={{ transform: `rotate(${rotations[position]}deg)` }}>
        <path d="M0 0 Q24 0 24 24 Q12 24 12 12 Q12 0 0 0Z" fill="var(--gold)" opacity="0.3" />
        <path d="M0 0 Q12 0 12 12" stroke="var(--gold)" strokeWidth="0.5" fill="none" />
        <circle cx="6" cy="6" r="1.5" fill="var(--gold)" opacity="0.4" />
      </svg>
    </div>
  )
}
