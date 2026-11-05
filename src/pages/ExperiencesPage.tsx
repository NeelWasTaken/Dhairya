import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import LazyViewport from '../components/ui/LazyViewport'

const KintsugiCrack = lazy(() => import('../components/emotional/KintsugiCrack'))
const OfferAWorry = lazy(() => import('../components/emotional/OfferAWorry'))
const YamasRiddleRoom = lazy(() => import('../components/playful/YamasRiddleRoom'))
const YourMandala = lazy(() => import('../components/playful/YourMandala'))
const WordGravity = lazy(() => import('../components/playful/WordGravity'))
const PalmLeafGallery = lazy(() => import('../components/playful/PalmLeafGallery'))
const BreathSyncedPage = lazy(() => import('../components/emotional/BreathSyncedPage'))
const Panchakosha3DViewer = lazy(() => import('../components/interactive/Panchakosha3DViewer'))
const TwoBirdsSlider = lazy(() => import('../components/interactive/TwoBirdsSlider'))
const StormDialScene = lazy(() => import('../components/interactive/StormDialScene'))

export default function ExperiencesPage() {
  return (
    <div className="page-container min-h-screen pb-20">
      <div className="content-column max-w-6xl">
        {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[var(--gold)] mb-4 hover:underline"
        >
          ← Return to Home Portal
        </Link>
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--gold)] block font-bold mb-2">
          Interactive Sanctuary
        </span>
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-wide text-[var(--text-primary)] mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          The Experiences Hub
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] font-serif italic leading-relaxed">
          Ten signature somatic, philosophical, and generative modules exploring psychological fortitude in the Upanishads. Engage directly below or encounter them embedded in their respective rooms.
        </p>
      </div>

      {/* Grid of Interactive Modules */}
      <div className="space-y-20">
        {/* 1. 3D Panchakosha Concentric Peeler */}
        <section id="exp-koshas" className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-bold block">
                01 · 3D WebGL Scene
              </span>
              <h2 className="text-xl sm:text-2xl font-[var(--font-heading)] text-[var(--text-primary)]">
                Panchakosha Concentric Peeler
              </h2>
            </div>
            <Link
              to="/upanishad/taittiriya"
              className="text-xs font-bold text-[var(--gold)] hover:underline"
            >
              Room: Taittirīya →
            </Link>
          </div>
          <Suspense fallback={<div className="h-96 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
            <LazyViewport minHeight="450px">
              <Panchakosha3DViewer />
            </LazyViewport>
          </Suspense>
        </section>

        {/* 2. Storm Dial Scene */}
        <section id="exp-storm" className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-bold block">
                02 · Dynamic Weather
              </span>
              <h2 className="text-xl sm:text-2xl font-[var(--font-heading)] text-[var(--text-primary)]">
                5-Level Storm Dial & Anchored Taproot
              </h2>
            </div>
            <Link to="/storm" className="text-xs font-bold text-[var(--gold)] hover:underline">
              Room: The Storm & Tree →
            </Link>
          </div>
          <Suspense fallback={<div className="h-96 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
            <LazyViewport minHeight="400px">
              <StormDialScene />
            </LazyViewport>
          </Suspense>
        </section>

        {/* 3. Kintsugi Crack */}
        <section id="exp-kintsugi" className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-mono font-bold block">
                03 · Somatic Anti-Fragility
              </span>
              <h2 className="text-xl sm:text-2xl font-[var(--font-heading)] text-[var(--text-primary)]">
                Kintsugi Ceramic Stress Fracture & Gold Mend
              </h2>
            </div>
            <Link to="/storm" className="text-xs font-bold text-[var(--gold)] hover:underline">
              Room: The Storm & Tree →
            </Link>
          </div>
          <Suspense fallback={<div className="h-96 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
            <LazyViewport minHeight="380px">
              <KintsugiCrack />
            </LazyViewport>
          </Suspense>
        </section>

        {/* 4. Offer a Worry */}
        <section id="exp-worry" className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-bold block">
                04 · Cathartic Ritual
              </span>
              <h2 className="text-xl sm:text-2xl font-[var(--font-heading)] text-[var(--text-primary)]">
                Offer a Worry into the Sacred Fire
              </h2>
            </div>
            <Link to="/chandogya/7" className="text-xs font-bold text-[var(--gold)] hover:underline">
              Room: Chāndogya 7 →
            </Link>
          </div>
          <Suspense fallback={<div className="h-96 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
            <LazyViewport minHeight="380px">
              <OfferAWorry />
            </LazyViewport>
          </Suspense>
        </section>

        {/* 5. Yama's Riddle Room */}
        <section id="exp-riddles" className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-bold block">
                05 · Philosophical Game
              </span>
              <h2 className="text-xl sm:text-2xl font-[var(--font-heading)] text-[var(--text-primary)]">
                Yama's Three Riddle Gates
              </h2>
            </div>
            <Link to="/upanishad/katha" className="text-xs font-bold text-[var(--gold)] hover:underline">
              Room: Kaṭha →
            </Link>
          </div>
          <Suspense fallback={<div className="h-96 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
            <LazyViewport minHeight="400px">
              <YamasRiddleRoom />
            </LazyViewport>
          </Suspense>
        </section>

        {/* 6. Your Generative Mandala */}
        <section id="exp-mandala" className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-bold block">
                06 · Generative Art
              </span>
              <h2 className="text-xl sm:text-2xl font-[var(--font-heading)] text-[var(--text-primary)]">
                Synthesize Your Mandala
              </h2>
            </div>
            <Link to="/practices" className="text-xs font-bold text-[var(--gold)] hover:underline">
              Room: Practices →
            </Link>
          </div>
          <Suspense fallback={<div className="h-96 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
            <LazyViewport minHeight="450px">
              <YourMandala />
            </LazyViewport>
          </Suspense>
        </section>

        {/* 7. Word Gravity */}
        <section id="exp-gravity" className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-mono font-bold block">
                07 · Physics Arcade
              </span>
              <h2 className="text-xl sm:text-2xl font-[var(--font-heading)] text-[var(--text-primary)]">
                Word Gravity: Mantras in Motion
              </h2>
            </div>
            <Link to="/practices" className="text-xs font-bold text-[var(--gold)] hover:underline">
              Room: Practices →
            </Link>
          </div>
          <Suspense fallback={<div className="h-80 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
            <LazyViewport minHeight="360px">
              <WordGravity />
            </LazyViewport>
          </Suspense>
        </section>

        {/* 8. Two Birds Perspective Slider */}
        <section id="exp-birds" className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-bold block">
                08 · Cognitive Stance
              </span>
              <h2 className="text-xl sm:text-2xl font-[var(--font-heading)] text-[var(--text-primary)]">
                Two Birds Perspective Slider
              </h2>
            </div>
            <Link to="/upanishad/mundaka" className="text-xs font-bold text-[var(--gold)] hover:underline">
              Room: Muṇḍaka →
            </Link>
          </div>
          <Suspense fallback={<div className="h-72 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
            <LazyViewport minHeight="300px">
              <TwoBirdsSlider />
            </LazyViewport>
          </Suspense>
        </section>

        {/* 9. Palm-Leaf Gallery of Sages */}
        <section id="exp-sages" className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-bold block">
                09 · Manuscript Archive
              </span>
              <h2 className="text-xl sm:text-2xl font-[var(--font-heading)] text-[var(--text-primary)]">
                Palm-Leaf Gallery of the Ancient Seers
              </h2>
            </div>
            <Link to="/corpus" className="text-xs font-bold text-[var(--gold)] hover:underline">
              Room: Corpus & Milieu →
            </Link>
          </div>
          <Suspense fallback={<div className="h-96 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
            <LazyViewport minHeight="420px">
              <PalmLeafGallery />
            </LazyViewport>
          </Suspense>
        </section>

        {/* 10. Breath-Synced Page */}
        <section id="exp-breath" className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-bold block">
                10 · Somatic Respiration
              </span>
              <h2 className="text-xl sm:text-2xl font-[var(--font-heading)] text-[var(--text-primary)]">
                Breath-Synced Page Rhythm
              </h2>
            </div>
            <Link to="/upanishad/prashna" className="text-xs font-bold text-[var(--gold)] hover:underline">
              Room: Praśna →
            </Link>
          </div>
          <Suspense fallback={<div className="h-40 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
            <LazyViewport minHeight="160px">
              <BreathSyncedPage />
            </LazyViewport>
          </Suspense>
        </section>
      </div>
      </div>
    </div>
  )
}
