import { useEffect, lazy, Suspense } from 'react'
import { useWorld } from '../../components/foundation/ThreeWorldsProvider'
import versesData from '../../content/verses.json'
import ch17 from '../../content/chapters/chapter-17.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import type { Verse } from '../../components/ui/VerseCard'
import LazyViewport from '../../components/ui/LazyViewport'
import ContinueBar from '../../components/layout/ContinueBar'

const DevanagariWriter = lazy(() => import('../../components/animations/DevanagariWriter'))
const ShowpieceEpilogueAscent = lazy(() => import('../../components/interactive/ShowpieceEpilogueAscent'))

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

export default function EpiloguePage() {
  const { setWorld } = useWorld()

  useEffect(() => {
    setWorld('cosmic')
    document.title = 'Epilogue: Asato Mā Sad Gamaya — Dhairya'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [setWorld])

  const vAsato = versesMap.get('brhadaranyaka-1-3-28')

  return (
    <div className="page-container min-h-screen pb-20">
      <div className="content-column">
        {/* Header */}
      <header className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-xs font-[var(--font-marginalia)] uppercase tracking-widest text-[var(--gold)] mb-4">
          उपसंहारः · Epilogue
        </div>
        <h1 className="text-3xl sm:text-5xl font-[var(--font-heading)] text-[var(--text-primary)]">
          Asato Mā Sad Gamaya
        </h1>
        <p className="text-base sm:text-lg font-[var(--font-heading-alt)] text-[var(--gold)] mt-2 tracking-widest uppercase">
          From the Unreal to the Real · The Final Benediction
        </p>
      </header>

      {/* Sacred Invocation & Writer */}
      <section className="space-y-8 mb-16">
        <Suspense fallback={<div className="h-32 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="120px">
            <DevanagariWriter
              text="ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥ ॐ शान्तिः शान्तिः शान्तिः ॥"
              translation="From the unreal lead me to the Real. From darkness lead me to Light. From death lead me to Immortality. Om, peace, peace, peace."
              source="Bṛhadāraṇyaka Upaniṣad 1.3.28"
            />
          </LazyViewport>
        </Suspense>

        {vAsato && <FullWidthVerseBand verse={vAsato} />}

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] prose prose-invert max-w-none text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
          <p className="first-letter:text-5xl first-letter:font-[var(--font-heading)] first-letter:text-[var(--gold)] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            {ch17.content[0]?.text}
          </p>
          <p>{ch17.content[1]?.text}</p>
        </div>
      </section>

      {/* Signature Showpiece: Epilogue Ascending Light and Om Constellation */}
      <section className="space-y-8 my-16 text-center">
        <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-1">
          प्रणव तारामण्डल · Constellation
        </span>
        <h2 className="text-2xl sm:text-3xl font-[var(--font-heading)] text-[var(--text-primary)]">
          The Constellation of Pure Awareness
        </h2>

        <Suspense fallback={<div className="h-44 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="180px">
            <ShowpieceEpilogueAscent />
          </LazyViewport>
        </Suspense>
      </section>

      {/* Continue to Final Scroll Credits */}
      <ContinueBar
        currentIndex={12}
        totalCount={12}
        prev={{
          title: 'Honest Limits & Critiques',
          path: '/critiques',
          devanagari: 'सीमा',
        }}
        next={{
          title: 'The Final Scroll: Credits',
          path: '/credits',
          devanagari: 'कृतज्ञता',
          teaser: 'Project credits, team members, scholars, open-source libraries, and motto.',
        }}
      />
      </div>
    </div>
  )
}
