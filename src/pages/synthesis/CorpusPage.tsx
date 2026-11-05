import { lazy, Suspense, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useWorld } from '../../components/foundation/ThreeWorldsProvider'
import LazyViewport from '../../components/ui/LazyViewport'
import ContinueBar from '../../components/layout/ContinueBar'

const PalmLeafGallery = lazy(() => import('../../components/playful/PalmLeafGallery'))

export default function CorpusPage() {
  const { setWorld } = useWorld()

  useEffect(() => {
    setWorld('forest')
    document.title = 'The Upanishadic Corpus & Sages — Dhairya'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [setWorld])

  return (
    <div className="page-container min-h-screen pb-20">
      <div className="content-column">
        {/* Header */}
      <header className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-xs font-[var(--font-marginalia)] uppercase tracking-widest text-[var(--gold)] mb-4">
          २ · उपनिषद् वाङ्मयम् · Milieu
        </div>
        <h1 className="text-3xl sm:text-5xl font-[var(--font-heading)] text-[var(--text-primary)]">
          The Upaniṣadic Corpus
        </h1>
        <p className="text-base sm:text-lg font-[var(--font-heading-alt)] text-[var(--gold)] mt-2 tracking-widest uppercase">
          Forest Academies, Sages & The Geography of Awakening
        </p>
        <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl mx-auto leading-relaxed">
          Composed primarily between 800 BCE and 200 BCE along the Gangetic plains, these texts mark humanity's pivotal transition from external sacrificial ritualism to introspective psychological mastery.
        </p>
      </header>

      {/* Historical Milieu & Vedic Shakhas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-2">
            Chronological Arc
          </span>
          <h3 className="font-[var(--font-heading)] text-lg text-[var(--text-primary)] mb-2">
            c. 800 BCE – 200 BCE
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Pre-dating both classical Greek philosophy and Buddhist dialectic, contemporaneous with the early Axial Age transition worldwide.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <span className="text-[10px] uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block mb-2">
            Vedic Shakhas
          </span>
          <h3 className="font-[var(--font-heading)] text-lg text-[var(--text-primary)] mb-2">
            Four Streams
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Preserved by memory lineage across Ṛgveda (Aitareya), Sāmaveda (Chāndogya, Kena), Yajurveda (Bṛhadāraṇyaka, Kaṭha, Taittirīya, Īśā), and Atharvaveda (Muṇḍaka, Māṇḍūkya, Praśna).
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)]">
          <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-2">
            Geographical Heart
          </span>
          <h3 className="font-[var(--font-heading)] text-lg text-[var(--text-primary)] mb-2">
            Kuru-Pāñcāla to Videha
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Debates took place in royal assemblies (King Janaka), forest hermitages (Naimiṣāraṇya), and simple dwellings under the banyan tree.
          </p>
        </div>
      </section>

      {/* Signature Module: Palm-Leaf Gallery of the Sages */}
      <section className="my-16 space-y-6">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-1">
            ऋषि संकुल · Interactive Archive
          </span>
          <h2 className="text-2xl sm:text-3xl font-[var(--font-heading)] text-[var(--text-primary)]">
            Palm-Leaf Gallery of the Sages
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Swipe and explore the historical voices that shaped the psychology of the Self.
          </p>
        </div>

        <Suspense fallback={<div className="h-96 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="420px">
            <PalmLeafGallery />
          </LazyViewport>
        </Suspense>
      </section>

      {/* Direct links to appendices */}
      <section className="p-6 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-bold text-[var(--text-primary)] block font-[var(--font-heading)]">
            Want deeper chronological and textual context?
          </span>
          <span className="text-[var(--text-muted)]">
            Explore the historical timeline, Sanskrit glossary, and primary bibliography.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/timeline"
            className="px-4 py-2 rounded-xl border border-[var(--border-color)] hover:border-[var(--gold)] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
          >
            Historical Timeline →
          </Link>
          <Link
            to="/glossary"
            className="px-4 py-2 rounded-xl border border-[var(--border-color)] hover:border-[var(--gold)] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
          >
            Glossary of 50 Terms →
          </Link>
        </div>
      </section>

      {/* Continue Navigation Bar */}
      <ContinueBar
        currentIndex={0}
        totalCount={12}
        prev={{
          title: 'Prologue & Śānti Pāṭha',
          path: '/prologue',
          devanagari: 'प्रस्तावना',
        }}
        next={{
          title: 'Īśā Upaniṣad',
          path: '/upanishad/isha',
          devanagari: 'ईशा',
          teaser: 'Action without collapse: seeing all reality enveloped by the Divine.',
        }}
      />
      </div>
    </div>
  )
}
