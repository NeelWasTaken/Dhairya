import { useEffect, lazy, Suspense } from 'react'
import { useWorld } from '../../components/foundation/ThreeWorldsProvider'
import LazyViewport from '../../components/ui/LazyViewport'
import ContinueBar from '../../components/layout/ContinueBar'

const StormDialScene = lazy(() => import('../../components/interactive/StormDialScene'))
const StormTree = lazy(() => import('../../components/animations/StormTree'))
const KintsugiCrack = lazy(() => import('../../components/emotional/KintsugiCrack'))

export default function StormPage() {
  const { setWorld } = useWorld()

  useEffect(() => {
    setWorld('cave')
    document.title = 'The Storm & The Tree: Stress Synthesis — Dhairya'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [setWorld])

  return (
    <div className="page-container min-h-screen pb-20">
      <div className="content-column">
        {/* Header */}
      <header className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-xs font-[var(--font-marginalia)] uppercase tracking-widest text-[var(--gold)] mb-4">
          समीक्षा · Stress Synthesis
        </div>
        <h1 className="text-3xl sm:text-5xl font-[var(--font-heading)] text-[var(--text-primary)]">
          The Storm & The Anchored Tree
        </h1>
        <p className="text-base sm:text-lg font-[var(--font-heading-alt)] text-[var(--gold)] mt-2 tracking-widest uppercase">
          Dynamic Dial, Somatic Seismograph & Golden Kintsugi
        </p>
        <p className="text-sm text-[var(--text-muted)] mt-2 italic max-w-xl mx-auto">
          "The storm moves the tree. It does not move the ground."
        </p>
      </header>

      {/* Part 1: 5-Level Storm Dial Scene */}
      <section className="space-y-8 mb-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-1">
            वात चक्रम् · Interactive Weather Control
          </span>
          <h2 className="text-2xl sm:text-3xl font-[var(--font-heading)] text-[var(--text-primary)]">
            The 5-Level Storm Dial
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1 max-w-xl mx-auto">
            Dial through Level 1 (Gentle Breeze) to Level 5 (Existential Gale). Observe how the deep taproot remains immovable regardless of surface turbulence.
          </p>
        </div>

        <Suspense fallback={<div className="h-96 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="400px">
            <StormDialScene />
          </LazyViewport>
        </Suspense>

        {/* Tree Allegory */}
        <Suspense fallback={<div className="h-80 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="350px">
            <StormTree />
          </LazyViewport>
        </Suspense>
      </section>

      {/* Part 2: Kintsugi Crack ("Apply Stress") */}
      <section className="space-y-8 my-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block mb-1">
            सुवर्ण सन्धानम् · Anti-Fragility
          </span>
          <h2 className="text-2xl sm:text-3xl font-[var(--font-heading)] text-[var(--text-primary)]">
            Kintsugi Crack: Gold in the Fractures
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1 max-w-xl mx-auto">
            Click "Apply Stress" to break the ceramic vessel; click "Mend with Gold" to seal the fracture line with radiant gold resin, proving anti-fragility.
          </p>
        </div>

        <Suspense fallback={<div className="h-96 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="380px">
            <KintsugiCrack />
          </LazyViewport>
        </Suspense>
      </section>

      {/* Part 3: Scroll Seismograph HUD Summary */}
      <section className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] my-12 space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
          <h3 className="font-[var(--font-heading)] text-lg text-[var(--text-primary)]">
            Live Seismograph Integration
          </h3>
        </div>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          The persistent floating Seismograph monitor in the lower-right corner tracks your journey dynamics, velocity changes, and reading velocity in real time. It illustrates that whether you scroll rapidly or pause in quiet contemplation, your stable ground (*Ātman*) remains unperturbed.
        </p>
      </section>

      {/* Continue Navigation Bar */}
      <ContinueBar
        currentIndex={12}
        totalCount={12}
        prev={{
          title: 'Maitrī Upaniṣad',
          path: '/upanishad/maitri',
          devanagari: 'मैत्री',
        }}
        next={{
          title: 'Contemplative Toolkit',
          path: '/practices',
          devanagari: 'अभ्यासः',
          teaser: 'Your Generative Mandala, Word Gravity game, and the 7-day contemplative protocol.',
        }}
      />
      </div>
    </div>
  )
}
