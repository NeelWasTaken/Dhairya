import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { CornerOrnament } from '../ui/SectionDivider'
import Reveal from '../ui/Reveal'

interface ChapterSectionProps {
  id: string
  chapterNum: string  // Devanagari numeral
  title: string
  subtitle?: string
  dark?: boolean
  children: ReactNode
}

export default function ChapterSection({ id, chapterNum, title, subtitle, dark = false, children }: ChapterSectionProps) {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.05 })
  const prefersReduced = useReducedMotion()

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-16 md:py-24 ${dark ? 'section-dark' : ''}`}
      aria-labelledby={`${id}-title`}
    >
      {/* Corner ornaments */}
      <CornerOrnament position="tl" />
      <CornerOrnament position="tr" />

      <div className="content-container relative">
        {/* Chapter number */}
        <motion.div
          className="text-center mb-8"
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="sanskrit text-5xl md:text-6xl block mb-4"
            style={{ color: dark ? 'var(--gold)' : 'var(--gold)', opacity: 0.4 }}
            aria-hidden="true"
          >
            {chapterNum}
          </span>
          <h2
            id={`${id}-title`}
            className="text-balance mb-2"
            style={{ color: dark ? 'var(--gold)' : 'var(--text-primary)' }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="text-lg italic"
              style={{ fontFamily: 'var(--font-body)', color: dark ? 'var(--gold-light)' : 'var(--text-muted)' }}
            >
              {subtitle}
            </p>
          )}
          {/* Decorative underline */}
          <div className="flex items-center justify-center gap-2 mt-4" aria-hidden="true">
            <div className="w-12 h-px" style={{ background: dark ? 'var(--gold)' : 'var(--saffron)', opacity: 0.4 }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: dark ? 'var(--gold)' : 'var(--saffron)', opacity: 0.6 }} />
            <div className="w-12 h-px" style={{ background: dark ? 'var(--gold)' : 'var(--saffron)', opacity: 0.4 }} />
          </div>
        </motion.div>

        {/* Chapter content */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

/** Resilience Insight callout box */
export function ResilienceInsight({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <Reveal origin="center-out" type="statement">
      <div className="resilience-box">
        <h4>{title || 'Resilience Insight'}</h4>
        <div className="text-[0.95rem] leading-relaxed">{children}</div>
      </div>
    </Reveal>
  )
}

/** Modern Parallel callout box */
export function ModernParallel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <Reveal origin="right" type="body">
      <div className="modern-parallel-box">
        <h4>{title || 'Modern Parallel'}</h4>
        <div className="text-[0.95rem] leading-relaxed">{children}</div>
      </div>
    </Reveal>
  )
}

/** Reflect prompt */
export function ReflectPrompt({ children }: { children: ReactNode }) {
  return (
    <Reveal origin="bottom-left" type="quote">
      <div className="reflect-prompt">
        {children}
      </div>
    </Reveal>
  )
}

/** Drop cap paragraph */
export function DropCapParagraph({ children }: { children: ReactNode }) {
  return (
    <Reveal origin="left" type="body">
      <p className="drop-cap">{children}</p>
    </Reveal>
  )
}

/** Source list at chapter end */
export function ChapterSources({ sources }: { sources: string[] }) {
  return (
    <div className="mt-8 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <h4 className="text-xs uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-marginalia)', color: 'var(--text-muted)' }}>
        Sources for this chapter
      </h4>
      <ul className="text-xs space-y-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-marginalia)' }}>
        {sources.map((s, i) => (
          <li key={i}>• {s}</li>
        ))}
      </ul>
    </div>
  )
}
