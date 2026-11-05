import { useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useWorld } from '../../components/foundation/ThreeWorldsProvider'
import versesData from '../../content/verses.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import type { Verse } from '../../components/ui/VerseCard'
import LazyViewport from '../../components/ui/LazyViewport'

const ShowpieceFearMerge = lazy(() => import('../../components/interactive/ShowpieceFearMerge'))
const FearDissolve = lazy(() => import('../../components/interactive/FearDissolve'))

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

export default function BrihadaranyakaFearPage() {
  const { setWorld } = useWorld()

  useEffect(() => {
    setWorld('cosmic')
    document.title = 'Bṛhadāraṇyaka: Fear Needs a Second — Dhairya'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [setWorld])

  const vFear = versesMap.get('brhadaranyaka-1-4-2')

  return (
    <div
      className="page-container min-h-screen"
      style={{
        width: '100%',
        marginInline: 'auto',
        paddingInline: 'clamp(1.25rem, 5vw, 6rem)',
        paddingTop: 'var(--header-height, 64px)',
        paddingBottom: 'clamp(4rem, 6vw, 6rem)',
      }}
    >
      <div className="w-full max-w-[1100px] mx-auto flex flex-col items-center">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[var(--text-muted)] flex items-center justify-center gap-2">
          <Link to="/" className="hover:text-[var(--gold)]">Home</Link>
          <span>/</span>
          <Link to="/upanishad/brihadaranyaka" className="hover:text-[var(--gold)]">Bṛhadāraṇyaka</Link>
          <span>/</span>
          <span className="text-[var(--gold)] font-semibold">Fear Needs a Second</span>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-2">
            बृहदारण्यकोपनिषत् · १.४.२
          </span>
          <h1
            className="font-[var(--font-heading)] text-[var(--text-primary)] text-balance mx-auto mb-2"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
          >
            Dvitīyād Vai Bhayaṃ Bhavati
          </h1>
          <p className="text-sm sm:text-base font-[var(--font-heading-alt)] text-[var(--gold)] tracking-widest uppercase">
            Fear Arises Only When a Second is Imagined
          </p>
        </header>

      {/* Verse Band */}
      <section className="space-y-8 mb-16">
        {vFear && <FullWidthVerseBand verse={vFear} />}

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
          <p>
            In Bṛhadāraṇyaka 1.4.2, the primordial Being reflects upon awakening: "In the beginning, this world was only the Self. Looking around, it saw nothing other than itself. It first uttered: 'I am.' Then fear arose in it. But then it reasoned: 'Since there is nothing other than me, of what am I afraid?' Thereupon its fear departed completely; for fear arises only where there is a second."
          </p>
          <p>
            This is the psychological core of non-dual resilience: fear is not a biological accident; it is the cognitive consequence of feeling isolated, divided, and surrounded by hostile "others." When you realize the ground of reality is non-dual awareness, there is no second entity that can ever annihilate you.
          </p>
        </div>
      </section>

      {/* Signature Interactions: Fear Merge Showpiece & Fear Dissolve Engine */}
      <section className="space-y-12 my-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-1">
            अभय प्रयोगः · Signature Interaction
          </span>
          <h2 className="text-2xl sm:text-3xl font-[var(--font-heading)] text-[var(--text-primary)]">
            Dissolve the Boundary of the Second
          </h2>
        </div>

        {/* Showpiece Fear Merge */}
        <Suspense fallback={<div className="h-40 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="160px">
            <ShowpieceFearMerge />
          </LazyViewport>
        </Suspense>

        {/* Interactive Fear Dissolve Engine */}
        <Suspense fallback={<div className="h-80 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="350px">
            <FearDissolve />
          </LazyViewport>
        </Suspense>
      </section>

        {/* Return Navigation */}
        <div className="w-full mt-16 pt-8 border-t border-[var(--border-color)] flex items-center justify-between">
          <Link
            to="/upanishad/brihadaranyaka"
            className="inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:underline font-bold"
          >
            ← Return to Bṛhadāraṇyaka Overview
          </Link>
          <Link
            to="/brihadaranyaka/discipline"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--gold)] text-[#2B1B10] font-bold text-xs uppercase tracking-wider hover:bg-[var(--gold-light)] transition-all shadow-md"
          >
            <span>Next: Titikṣā & The Thunder →</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
