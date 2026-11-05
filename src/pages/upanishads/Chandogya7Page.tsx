import { useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useWorld } from '../../components/foundation/ThreeWorldsProvider'
import versesData from '../../content/verses.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import type { Verse } from '../../components/ui/VerseCard'
import LazyViewport from '../../components/ui/LazyViewport'

const OfferAWorry = lazy(() => import('../../components/emotional/OfferAWorry'))

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

export default function Chandogya7Page() {
  const { setWorld } = useWorld()

  useEffect(() => {
    setWorld('forest')
    document.title = 'Chāndogya 7: Nārada\'s Grief & Offer a Worry — Dhairya'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [setWorld])

  const vSorrow = versesMap.get('chandogya-7-1-3')
  const vBhuma = versesMap.get('chandogya-7-23-1')

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
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[var(--text-muted)] flex items-center justify-center gap-2">
          <Link to="/" className="hover:text-[var(--gold)]">Home</Link>
          <span>/</span>
          <Link to="/upanishad/chandogya" className="hover:text-[var(--gold)]">Chāndogya Upaniṣad</Link>
          <span>/</span>
          <span className="text-[var(--gold)] font-semibold">Chapter 7 (Nārada & Sanatkumāra)</span>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-2">
            छान्दोग्योपनिषत् · सप्तमोऽध्यायः
          </span>
          <h1
            className="font-[var(--font-heading)] text-[var(--text-primary)] text-balance mx-auto mb-2"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
          >
            Tarati Śokam: The Ascent to the Infinite
          </h1>
          <p className="text-sm sm:text-base font-[var(--font-heading-alt)] text-[var(--gold)] tracking-widest uppercase">
            Nārada's Cure for Burnout & The Offer a Worry Ritual
          </p>
        </header>

      {/* Section 1: The Confession of Narada */}
      <section className="space-y-8 mb-16">
        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] space-y-4">
          <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            १. नारद परिदेवना · The Scholar's Grief
          </span>
          <h2 className="font-[var(--font-heading)] text-2xl text-[var(--text-primary)]">
            "I Know the Mantras, But Not the Self"
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The celebrated scholar Nārada approaches the child-sage Sanatkumāra with profound humility. He recites the vast encyclopedia of his education: the four Vedas, epics, grammar, mathematics, astronomy, ethics, dialectics, military science, and the fine arts. "Yet with all this erudition," Nārada admits, "I am sorrowful (*so'haṃ bhagavo śocāmi*). I have heard from revered teachers that only the Knower of the Self crosses beyond sorrow. Guide me across this ocean of grief."
          </p>
        </div>

        {vSorrow && <FullWidthVerseBand verse={vSorrow} />}
      </section>

      {/* Section 2: Bhuma (The Infinite) */}
      <section className="space-y-8 my-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-1">
            २. भूमा विद्या · The Infinite
          </span>
          <h2 className="text-2xl sm:text-3xl font-[var(--font-heading)] text-[var(--text-primary)]">
            Yo Vai Bhūmā Tat Sukham
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            "In the finite (*alpa*) there is no happiness; only in the Infinite (*Bhūmā*) is there lasting joy."
          </p>
        </div>

        {vBhuma && <FullWidthVerseBand verse={vBhuma} />}

        <div className="p-6 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
          <p>
            Sanatkumāra leads Nārada step by step through speech, mind, will, thought, meditation, and vitality, concluding at *Bhūmā*: that state where one sees nothing else, hears nothing else, and knows nothing else as separate from awareness.
          </p>
          <p>
            When consciousness expands to embrace the Whole, petty rivalries, status fears, and existential panic dissolve like salt in an endless ocean.
          </p>
        </div>
      </section>

      {/* Section 3: Signature Emotional Interaction: Offer a Worry */}
      <section className="space-y-8 my-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-1">
            चिन्ता समर्पणम् · Contemplative Practice
          </span>
          <h2 className="text-2xl sm:text-3xl font-[var(--font-heading)] text-[var(--text-primary)]">
            Offer a Worry into the Sacred Fire
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1 max-w-xl mx-auto">
            Type an acute mental burden or anxiety below. Watch it dissolve into glowing ash and float upward into the boundless ether of the Self.
          </p>
        </div>

        <Suspense fallback={<div className="h-96 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="380px">
            <OfferAWorry />
          </LazyViewport>
        </Suspense>
      </section>

        {/* Return to Chandogya Hub */}
        <div className="w-full mt-16 pt-8 border-t border-[var(--border-color)] flex items-center justify-between">
          <Link
            to="/chandogya/6"
            className="inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:underline font-bold"
          >
            ← Chāndogya 6: Tat Tvam Asi
          </Link>
          <Link
            to="/upanishad/chandogya"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--surface)] border border-[var(--gold)] text-[var(--gold)] font-bold text-xs uppercase tracking-wider hover:bg-[var(--gold)]/10 transition-all shadow-sm"
          >
            <span>Back to Chāndogya Overview ↑</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
