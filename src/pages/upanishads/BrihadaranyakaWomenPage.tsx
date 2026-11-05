import { useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useWorld } from '../../components/foundation/ThreeWorldsProvider'
import versesData from '../../content/verses.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import type { Verse } from '../../components/ui/VerseCard'
import LazyViewport from '../../components/ui/LazyViewport'

const CaveDescent = lazy(() => import('../../components/interactive/CaveDescent'))

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

export default function BrihadaranyakaWomenPage() {
  const { setWorld } = useWorld()

  useEffect(() => {
    setWorld('cosmic')
    document.title = 'Bṛhadāraṇyaka: Gārgī & Maitreyī — Dhairya'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [setWorld])

  const vMaitreyi = versesMap.get('brhadaranyaka-2-4-5')
  const vGargi = versesMap.get('brhadaranyaka-3-8-8-10')

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
          <span className="text-[var(--gold)] font-semibold">Gārgī & Maitreyī</span>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-2">
            बृहदारण्यकोपनिषत् · विदुषी संकुल
          </span>
          <h1
            className="font-[var(--font-heading)] text-[var(--text-primary)] text-balance mx-auto mb-2"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
          >
            Dialectical Audacity & The Question of Immortality
          </h1>
          <p className="text-sm sm:text-base font-[var(--font-heading-alt)] text-[var(--gold)] tracking-widest uppercase">
            Gārgī Vācaknavī & Maitreyī
          </p>
        </header>

      {/* Part 1: Gargi Vacaknavi */}
      <section className="space-y-8 mb-16">
        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] space-y-4">
          <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            १. गार्गी वाचकनवी · The Archer of Janaka's Court
          </span>
          <h2 className="font-[var(--font-heading)] text-2xl text-[var(--text-primary)]">
            "Across What is the Universe Woven, Warp and Woof?"
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            In the royal court of King Janaka of Videha, a thousand prize cattle with gold-plated horns await the greatest sage of the age. As veteran male scholars fall silent before Yājñavalkya's formidable intellect, only one debater steps forward for a second round: Gārgī Vācaknavī.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            "O venerable assembly," Gārgī announces, "I shall rise against Yājñavalkya with two questions, like a fierce warrior from Kāśī or Videha who strings their unbent bow and draws two arrows to the ear!" Her relentless cross-examination forces Yājñavalkya to articulate the supreme ontological frontier: the Imperishable (*Akṣara*), across which space itself is woven.
          </p>
        </div>

        {vGargi && <FullWidthVerseBand verse={vGargi} />}
      </section>

      {/* Part 2: Maitreyi */}
      <section className="space-y-8 my-16">
        <div className="p-6 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-color)] space-y-4">
          <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block">
            २. मैत्रेयी संवादः · The Rejection of Transient Wealth
          </span>
          <h2 className="font-[var(--font-heading)] text-2xl text-[var(--text-primary)]">
            "What Shall I Do with That by Which I Do Not Become Immortal?"
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            When Yājñavalkya announces his departure for the forest and offers to divide his earthly fortune, his contemplative wife Maitreyī refuses to be pacified by material security: "If the whole earth full of riches were mine, would I become immortal through it?" "No," replies Yājñavalkya, "your life would simply be like that of wealthy people; there is no hope of immortality through wealth."
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Maitreyī's response (*Yenāhaṃ nāmṛtā syāṃ kimahaṃ tena kuryām?*) cuts through thousands of years of existential compromise. She demands the knowledge of that which outlasts biological decay and economic flux.
          </p>
        </div>

        {vMaitreyi && <FullWidthVerseBand verse={vMaitreyi} />}
      </section>

      {/* Part 3: 3D Cave of the Heart Descent */}
      <section className="space-y-8 my-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-1">
            दहर गुहा प्रवेशः · 3D Interactive Descent
          </span>
          <h2 className="text-2xl sm:text-3xl font-[var(--font-heading)] text-[var(--text-primary)]">
            Descend into the Cave of the Heart
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            The inner sanctum (*Hṛdayākāśa*) where the immortal witness resides beyond space and time.
          </p>
        </div>

        <Suspense fallback={<div className="h-96 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="450px">
            <CaveDescent />
          </LazyViewport>
        </Suspense>
      </section>

        {/* Return Navigation */}
        <div className="mt-16 pt-8 border-t border-[var(--border-color)] flex items-center justify-between">
          <Link
            to="/brihadaranyaka/discipline"
            className="inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:underline font-bold"
          >
            ← Chamber 2: Titikṣā & The Thunder
          </Link>
          <Link
            to="/upanishad/brihadaranyaka"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--surface)] border border-[var(--gold)] text-[var(--gold)] font-bold text-xs uppercase tracking-wider hover:bg-[var(--gold)]/10 transition-all shadow-sm"
          >
            <span>Back to Bṛhadāraṇyaka Overview ↑</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
