import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { CornerOrnament } from '../ui/SectionDivider'
import Reveal from '../ui/Reveal'
import MuseumPlacard from '../foundation/MuseumPlacard'
import chapterOpenersData from '../../content/chapterOpeners.json'

interface EditorialChapterProps {
  id: string
  chapterNum: string // e.g. "०", "१", "२"
  numeralArabic?: number
  title: string
  subtitle?: string
  sanskritTitle?: string
  epigraph?: string
  sectionTheme?: 'ivory' | 'sandstone' | 'dawn' | 'night'
  marginaliaContent?: ReactNode
  children: ReactNode
}

export default function EditorialChapter({
  id,
  chapterNum,
  numeralArabic = 0,
  title,
  subtitle,
  sanskritTitle,
  epigraph,
  sectionTheme = 'ivory',
  marginaliaContent,
  children
}: EditorialChapterProps) {
  const [ref] = useInView<HTMLElement>({ threshold: 0.05 })

  const themeClass = {
    ivory: 'section-ivory',
    sandstone: 'section-sandstone',
    dawn: 'section-dawn',
    night: 'section-night',
  }[sectionTheme]

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-20 md:py-32 border-b border-[var(--border-hairline)] overflow-hidden transition-colors duration-500 ${themeClass}`}
      aria-labelledby={`${id}-heading`}
    >
      <CornerOrnament position="tl" />
      <CornerOrnament position="tr" />

      <div className="editorial-grid">
        {/* LEFT COLUMN: Sticky Giant Devanagari Numeral (2 Cols) */}
        <aside className="col-span-12 lg:col-span-2 relative">
          <div className="lg:sticky lg:top-28 flex flex-row lg:flex-col items-baseline lg:items-start justify-between gap-4 mb-6 lg:mb-0">
            {/* 20vw Outlined Stroke Numeral */}
            <span
              className="sanskrit select-none pointer-events-none opacity-20 font-bold block leading-none"
              style={{
                fontSize: 'clamp(5rem, 14vw, 13rem)',
                WebkitTextStroke: '2px var(--gold)',
                color: 'transparent',
              }}
              aria-hidden="true"
            >
              {chapterNum}
            </span>

            <div className="lg:mt-4">
              <span className="text-[11px] uppercase tracking-[0.2em] font-[var(--font-marginalia)] text-[var(--saffron)] font-bold block">
                Chapter {numeralArabic}
              </span>
              {sanskritTitle && (
                <span className="sanskrit text-xs text-[var(--vermilion)] block mt-0.5">
                  {sanskritTitle}
                </span>
              )}
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: Editorial Reading Body (7 Cols) */}
        <div className="col-span-12 lg:col-span-7">
          {/* Chapter Title & Subtitle Header */}
          <header className="mb-10">
            <Reveal origin="depth-in" type="heading">
              <h2
                id={`${id}-heading`}
                className="text-balance mb-3 text-[var(--text-primary)]"
              >
                {title}
              </h2>
            </Reveal>

            {subtitle && (
              <Reveal origin="bottom" type="body" delay={0.15}>
                <p className="text-xl md:text-2xl font-[var(--font-body)] italic text-[var(--text-muted)] leading-relaxed">
                  {subtitle}
                </p>
              </Reveal>
            )}

            {/* Curated Chapter Opener (Punchy Vetted Copy) */}
            {(() => {
              const openerObj = chapterOpenersData.openers.find(o => o.chapter === numeralArabic)
              if (!openerObj) return null
              return (
                <div className="my-6 p-5 rounded-xl border border-[var(--gold)]/30 bg-[var(--surface)]/60 backdrop-blur-sm gold-leaf-border shadow-md">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--gold)] font-bold block mb-1.5">
                    Opening Axiom
                  </span>
                  <p className="text-lg md:text-xl font-serif italic text-[var(--text-primary)] leading-snug font-semibold">
                    "{openerObj.line}"
                  </p>
                  {openerObj.claimNote && (
                    <span className="text-[11px] text-[var(--text-muted)] block mt-1.5 font-sans">
                      • {openerObj.claimNote}
                    </span>
                  )}
                </div>
              )
            })()}

            {/* Museum Exhibit Room Placard with Audio Guide */}
            <MuseumPlacard chapterNum={numeralArabic} />

            {epigraph && (
              <Reveal origin="depth-out" type="quote" delay={0.25}>
                <blockquote className="my-6 p-4 rounded-r-lg border-l-2 border-[var(--gold)] bg-[var(--surface)] text-sm md:text-base italic text-[var(--ink-soft)] font-[var(--font-marginalia)] shadow-sm">
                  "{epigraph}"
                </blockquote>
              </Reveal>
            )}
          </header>

          {/* Prose Content */}
          <div className="prose-content max-w-none text-base md:text-lg leading-relaxed">
            {children}
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Marginalia Rail (3 Cols) */}
        <aside className="col-span-12 lg:col-span-3 mt-10 lg:mt-0">
          <div className="lg:sticky lg:top-28 space-y-6">
            {marginaliaContent ? (
              marginaliaContent
            ) : (
              <div className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border-hairline)] shadow-sm">
                <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] block mb-1">
                  Contemplative Focus
                </span>
                <p className="text-xs text-[var(--ink-faint)] italic leading-relaxed">
                  "The storm moves the tree. It does not move the ground."
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
