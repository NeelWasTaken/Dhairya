import { lazy, Suspense, useEffect } from 'react'
import { useWorld } from '../../components/foundation/ThreeWorldsProvider'
import versesData from '../../content/verses.json'
import ch0 from '../../content/chapters/chapter-00.json'
import ch1 from '../../content/chapters/chapter-01.json'
import type { Verse } from '../../components/ui/VerseCard'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import SectionDivider from '../../components/ui/SectionDivider'
import LazyViewport from '../../components/ui/LazyViewport'
import DevanagariScenery from '../../components/foundation/DevanagariScenery'
import ContinueBar from '../../components/layout/ContinueBar'

const DevanagariWriter = lazy(() => import('../../components/animations/DevanagariWriter'))
const ShowpieceCh1Opening = lazy(() => import('../../components/interactive/ShowpieceCh1Opening'))

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

export default function ProloguePage() {
  const { setWorld } = useWorld()

  useEffect(() => {
    setWorld('forest')
    document.title = 'Prologue: Śānti Pāṭha & Dhairya — The Unshaken Self'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [setWorld])

  const shantiVerse = versesMap.get('taittiriya-shanti-saha-nav')

  return (
    <div className="page-container min-h-screen pb-20">
      <div className="content-column">
        {/* Header */}
      <header className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-xs font-[var(--font-marginalia)] uppercase tracking-widest text-[var(--gold)] mb-4">
          ० · प्राक्कथनम् · Orientation
        </div>
        <h1 className="text-3xl sm:text-5xl font-[var(--font-heading)] text-[var(--text-primary)]">
          Prologue: The Ground of Fortitude
        </h1>
        <p className="text-base sm:text-lg font-[var(--font-heading-alt)] text-[var(--gold)] mt-2 tracking-widest uppercase">
          Śānti Pāṭha & The Psychology of Dhairya
        </p>
        <p className="text-sm text-[var(--text-muted)] mt-2 italic max-w-xl mx-auto">
          "Resilience in the Upaniṣads is not an egoic shield; it is realizing that the conscious ground (Ātman) was never vulnerable."
        </p>
      </header>

      {/* Part 1: Invocation */}
      <section className="space-y-8 mb-16">
        <Suspense fallback={<div className="h-40 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="120px">
            <DevanagariWriter
              text="ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै । तेजस्वि नावधीतमस्तु मा विद्विषावहै ॥ ॐ शान्तिः शान्तिः शान्तिः ॥"
              translation="May the Divine protect us both (teacher and student). May we be nourished together. May we work together with great energy. May our study be brilliant. May there be no hatred between us. Om, peace, peace, peace."
              source="Taittirīya Upaniṣad 2.1 (Śāntipāṭha)"
            />
          </LazyViewport>
        </Suspense>

        {shantiVerse && <FullWidthVerseBand verse={shantiVerse} />}

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] prose prose-invert max-w-none text-[var(--text-secondary)] leading-relaxed space-y-4">
          <p className="first-letter:text-5xl first-letter:font-[var(--font-heading)] first-letter:text-[var(--gold)] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            {ch0.content[0]?.text}
          </p>
          <p>{ch0.content[1]?.text}</p>
        </div>
      </section>

      <SectionDivider type="lotus" />

      {/* Part 2: What is Resilience? */}
      <section className="space-y-10 my-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-1">
            १ · धैर्य लक्षणम्
          </span>
          <h2 className="text-2xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)]">
            What is Dhairya?
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Re-centring from the fragile persona to the invincible consciousness.
          </p>
        </div>

        <Suspense fallback={<div className="h-40 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="160px">
            <ShowpieceCh1Opening />
          </LazyViewport>
        </Suspense>

        <DevanagariScenery
          glyph="dhi"
          caption="Dhī: The Ground of Pure Discernment"
          subtitle="The root of Dhairya — an intellect anchored in unwavering awareness"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--gold)]/30 shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-2">
              ✦ Upaniṣadic Resilience Insight
            </span>
            <h3 className="text-lg font-[var(--font-heading)] text-[var(--text-primary)] mb-2">
              The Metallurgy of Steadfastness
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Western psychology often defines resilience as elastic return ("bouncing back"). The Upaniṣadic seers propose a deeper premise: *Dhairya* is not bouncing back, but realizing you never left the immortal ground of Being.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-color)] shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block mb-2">
              ⚖ Modern Psychological Parallel
            </span>
            <h3 className="text-lg font-[var(--font-heading)] text-[var(--text-primary)] mb-2">
              Ordinary Magic (Masten 2001)
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Modern developmental psychology observes that human resilience is normative adaptation. The Upaniṣads concur: your fundamental baseline is wholeness (*Pūrṇa*).
            </p>
          </div>
        </div>

        {/* Sources Drawer */}
        <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]/40 text-xs text-[var(--text-muted)]">
          <span className="font-bold text-[var(--text-primary)] block mb-2 font-[var(--font-heading)]">
            Primary Citations & Scholars
          </span>
          <ul className="list-disc list-inside space-y-1">
            {ch1.sources.slice(0, 5).map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Continue Navigation Bar */}
      <ContinueBar
        currentIndex={0}
        totalCount={12}
        prev={null}
        next={{
          title: 'The Corpus & Sages',
          path: '/corpus',
          devanagari: 'वाङ्मयम्',
          teaser: 'The Vedic milieu, geographical map, and the Palm-Leaf Gallery of Sages.',
        }}
      />
      </div>
    </div>
  )
}
