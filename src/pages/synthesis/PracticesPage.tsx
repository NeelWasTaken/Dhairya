import { useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useWorld } from '../../components/foundation/ThreeWorldsProvider'
import LazyViewport from '../../components/ui/LazyViewport'
import ContinueBar from '../../components/layout/ContinueBar'

const YourMandala = lazy(() => import('../../components/playful/YourMandala'))
const WordGravity = lazy(() => import('../../components/playful/WordGravity'))

export default function PracticesPage() {
  const { setWorld } = useWorld()

  useEffect(() => {
    setWorld('forest')
    document.title = 'Practices: Contemplative Toolkit — Dhairya'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [setWorld])

  return (
    <div className="page-container min-h-screen pb-20">
      <div className="content-column">
        {/* Header */}
      <header className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-xs font-[var(--font-marginalia)] uppercase tracking-widest text-[var(--gold)] mb-4">
          अभ्यास योगः · Practices
        </div>
        <h1 className="text-3xl sm:text-5xl font-[var(--font-heading)] text-[var(--text-primary)]">
          The Contemplative Toolkit
        </h1>
        <p className="text-base sm:text-lg font-[var(--font-heading-alt)] text-[var(--gold)] mt-2 tracking-widest uppercase">
          Śravaṇa, Manana & Experiential Nididhyāsana
        </p>
        <p className="text-sm text-[var(--text-muted)] mt-2 italic max-w-xl mx-auto">
          "Philosophy in ancient India was never mere armchair theory; it was an existential medicine designed to transform how you experience adversity."
        </p>
      </header>

      {/* The Vedantic Triad */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-2">
            १. श्रवणम् · Śravaṇa
          </span>
          <h3 className="font-[var(--font-heading)] text-lg text-[var(--text-primary)] mb-2">
            Attentive Listening
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Receptive listening to primary wisdom teachings without instant argumentative distortion or premature cynicism.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <span className="text-[10px] uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block mb-2">
            २. मननम् · Manana
          </span>
          <h3 className="font-[var(--font-heading)] text-lg text-[var(--text-primary)] mb-2">
            Rigorous Reflection
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Interrogating the teaching with relentless reason and dialectic until all intellectual doubts and contradictions are resolved.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-2">
            ३. निदिध्यासनम् · Nididhyāsana
          </span>
          <h3 className="font-[var(--font-heading)] text-lg text-[var(--text-primary)] mb-2">
            Direct Assimilation
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Abiding in the discovered truth until it shifts from an abstract thought into your visceral, automatic default reaction under stress.
          </p>
        </div>
      </section>

      {/* Signature Module 1: Your Generative Mandala */}
      <section className="space-y-8 my-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-1">
            मण्डल रचना · Generative Art
          </span>
          <h2 className="text-2xl sm:text-3xl font-[var(--font-heading)] text-[var(--text-primary)]">
            Your Generative Mandala of Resilience
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1 max-w-xl mx-auto">
            Answer 3 short contemplative inquiries to synthesize your personal geometric mandala, visualizing your unique balance of fortitude.
          </p>
        </div>

        <Suspense fallback={<div className="h-96 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="450px">
            <YourMandala />
          </LazyViewport>
        </Suspense>
      </section>

      {/* Signature Module 2: Word Gravity Game */}
      <section className="space-y-8 my-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block mb-1">
            अक्षर गुरुत्वम् · Physics Play
          </span>
          <h2 className="text-2xl sm:text-3xl font-[var(--font-heading)] text-[var(--text-primary)]">
            Word Gravity: Catch the Falling Sanskrit Mantras
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1 max-w-xl mx-auto">
            Drag the bowl to catch falling sacred keywords; observe how steady discernment catches fortitude while letting anxiety drift past.
          </p>
        </div>

        <Suspense fallback={<div className="h-80 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="360px">
            <WordGravity />
          </LazyViewport>
        </Suspense>
      </section>

      {/* Quiz Banner Link */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[var(--gold)]/10 via-[var(--gold)]/20 to-[var(--gold)]/10 border border-[var(--gold)]/40 text-center my-12">
        <h3 className="font-[var(--font-heading)] text-2xl text-[var(--text-primary)] mb-2">
          Test Your Upaniṣadic Fortitude
        </h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto mb-6">
          Take the comprehensive 15-question interactive quiz measuring your mastery of Sanskrit terms, psychological models, and philosophical insights.
        </p>
        <Link
          to="/quiz"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider bg-[var(--gold)] text-[#2B1B10] hover:bg-[var(--gold-light)] transition-all shadow-md"
        >
          🎯 Launch the 15-Question Resilience Quiz →
        </Link>
      </div>

      {/* Continue Navigation Bar */}
      <ContinueBar
        currentIndex={12}
        totalCount={12}
        prev={{
          title: 'The Storm & The Tree',
          path: '/storm',
          devanagari: 'समीक्षा',
        }}
        next={{
          title: 'Honest Limits & Critiques',
          path: '/critiques',
          devanagari: 'सीमा',
          teaser: 'Validating pain, structural injustice, and avoiding spiritual bypassing.',
        }}
      />
      </div>
    </div>
  )
}
