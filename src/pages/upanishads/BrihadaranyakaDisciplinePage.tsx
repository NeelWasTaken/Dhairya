import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useWorld } from '../../components/foundation/ThreeWorldsProvider'
import versesData from '../../content/verses.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import type { Verse } from '../../components/ui/VerseCard'

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

export default function BrihadaranyakaDisciplinePage() {
  const { setWorld } = useWorld()

  useEffect(() => {
    setWorld('cosmic')
    document.title = 'Bṛhadāraṇyaka: Titikṣā & The Thunder — Dhairya'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [setWorld])

  const vTitiksha = versesMap.get('brhadaranyaka-4-4-23')
  const vDaDaDa = versesMap.get('brhadaranyaka-5-2-3')

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
          <span className="text-[var(--gold)] font-semibold">Titikṣā & The Thunder</span>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-2">
            बृहदारण्यकोपनिषत् · ४.४.२३ & ५.२.३
          </span>
          <h1
            className="font-[var(--font-heading)] text-[var(--text-primary)] text-balance mx-auto mb-2"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
          >
            Titikṣā & The Thunder's Three Syllables
          </h1>
          <p className="text-sm sm:text-base font-[var(--font-heading-alt)] text-[var(--gold)] tracking-widest uppercase">
            Forbearance Without Bitterness & The Three Disciplines of DA
          </p>
        </header>

      {/* Section 1: Titiksha */}
      <section className="space-y-8 mb-16">
        {vTitiksha && <FullWidthVerseBand verse={vTitiksha} />}

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
          <p>
            *Titikṣā* is often translated into English as "forbearance" or "endurance," but its psychological nuance is far richer. In the commentary of Śaṅkara on 4.4.23, Titikṣā is defined as: <em>sahanama sarva-duḥkhānām apratīkāra-pūrvakam cintā-vilāpa-rahitam</em> — "bearing all dualities of life (heat and cold, pleasure and pain, honor and dishonor) without anxious rumination, without lamentation, and without retaliatory malice."
          </p>
          <p>
            Most endurance in modern life is toxic because it marinates in suppressed bitterness. Upaniṣadic Titikṣā is radiant: you absorb friction like the deep sea absorbs a pebble, remaining calm because your core value is not determined by the weather.
          </p>
        </div>
      </section>

      {/* Section 2: The Three Syllables of Thunder (DA-DA-DA) */}
      <section className="space-y-8 my-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-1">
            ५.२.३ · तदेतदेवैषा दैवी वागनुवदति स्तनयित्नुः
          </span>
          <h2 className="text-2xl sm:text-3xl font-[var(--font-heading)] text-[var(--text-primary)]">
            The Divine Thunder: DA, DA, DA
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            The threefold antidote to sensory greed, possessiveness, and cruelty.
          </p>
        </div>

        {vDaDaDa && <FullWidthVerseBand verse={vDaDaDa} />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--gold)]/30 text-center">
            <span className="text-3xl font-serif text-[var(--gold)] block mb-2">दाम्यत</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] block mb-2">
              Dāmyata · Self-Mastery
            </span>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              For those with power and privilege who drift into sensory dissipation: rein in the wandering horses of the mind.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--gold)]/30 text-center">
            <span className="text-3xl font-serif text-[var(--saffron)] block mb-2">दत्त</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] block mb-2">
              Datta · Give Generously
            </span>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              For humans plagued by scarcity mindset and hoarding: release gripping, open your hands, and share freely.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--gold)]/30 text-center">
            <span className="text-3xl font-serif text-[var(--gold)] block mb-2">दयध्वम्</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] block mb-2">
              Dayadhvam · Practice Compassion
            </span>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              For those hardened by anger and punitive instincts: cultivate radical gentleness toward all suffering creatures.
            </p>
          </div>
        </div>
      </section>

        {/* Return Navigation */}
        <div className="w-full mt-16 pt-8 border-t border-[var(--border-color)] flex items-center justify-between">
          <Link
            to="/brihadaranyaka/fear"
            className="inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:underline font-bold"
          >
            ← Chamber 1: Fear Needs a Second
          </Link>
          <Link
            to="/brihadaranyaka/women-sages"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--gold)] text-[#2B1B10] font-bold text-xs uppercase tracking-wider hover:bg-[var(--gold-light)] transition-all shadow-md"
          >
            <span>Next: Gārgī & Maitreyī →</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
