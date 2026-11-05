import { useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import UpanishadPageShell from '../../components/layout/UpanishadPageShell'
import upanishadsData from '../../content/upanishads.json'
import versesData from '../../content/verses.json'
import ch6 from '../../content/chapters/chapter-06.json'
import ch7 from '../../content/chapters/chapter-07.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import type { Verse } from '../../components/ui/VerseCard'
import LazyViewport from '../../components/ui/LazyViewport'
import type { UpanishadMeta } from '../../hooks/useJourneyProgress'

const ResilientParticleText = lazy(() => import('../../components/interactive/ResilientParticleText'))

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

const chandogyaMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'chandogya')!
const prevMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'aitareya')!
const nextMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'brihadaranyaka')!

const steps = [
  { id: 'overview', label: '1. Beyond Sorrow' },
  { id: 'subpages', label: '2. Deep Dialogue Sub-Pages' },
  { id: 'particles', label: '3. Particle Resilience Simulation' },
  { id: 'satyakama', label: '4. Satyakāma Jābāla' },
]

export default function ChandogyaPage() {
  const [activeStep, setActiveStep] = useState('overview')

  const vSorrow = versesMap.get('chandogya-7-1-3')
  const vBhuma = versesMap.get('chandogya-7-23-1')
  const vSatya = versesMap.get('chandogya-4-4-5')

  return (
    <UpanishadPageShell
      meta={chandogyaMeta}
      prev={{ title: prevMeta.title, path: prevMeta.path, devanagari: prevMeta.devanagari }}
      next={{ title: nextMeta.title, path: nextMeta.path, devanagari: nextMeta.devanagari, teaser: nextMeta.teaser }}
      steps={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
      resilienceInsight={{
        title: 'Tarati Śokam Ātmavit: The Knower of the Self Crosses Beyond Sorrow',
        text: 'Nārada arrives before Sanatkumāra having mastered every branch of science, literature, music, and astronomy, yet confessing: "I am overwhelmed with sorrow." Sanatkumāra tells him that all worldly disciplines are merely names. Only the realization of the Self (*Ātman*) and the Infinite (*Bhūmā*) delivers freedom from sorrow, because in the finite there is no enduring happiness.',
      }}
      modernParallel={{
        title: 'Information Overload vs Experiential Wholeness',
        text: 'Nārada\'s predicament is the exact crisis of the modern information age: hyper-educated, endlessly connected, yet emotionally depleted. Knowledge of facts does not equal inner grounding. Chāndogya shows that mental suffering ends only when we shift from acquiring fragmented data to resting in the underlying ground of wholeness.',
      }}
      reflectPrompt="Are you seeking comfort in more information, or are you willing to touch the simple silence behind all knowledge?"
      sources={[...ch6.sources, ...ch7.sources]}
      commentaryDrawer={{
        title: 'Śaṅkara on the Dialogue between Uddālaka and Śvetaketu',
        content: (
          <>
            <p>
              In chapter 6, Uddālaka Āruṇi tests his arrogant young son Śvetaketu with nine pedagogical illustrations of "Tat Tvam Asi" (That Thou Art).
            </p>
            <p>
              By breaking open the tiny fruit of the banyan tree and asking what he sees inside ("Nothing, father"), Uddālaka reveals that the invisible subtlety is that very power from which this colossal tree emerges. Similarly, dissolved salt permeates water invisibly. The Self is subtle, all-pervading, and unbreakable.
            </p>
          </>
        ),
      }}
    >
      {/* Step 1: Beyond Sorrow Overview */}
      <section id="overview" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ९.१ · तरति शोकमात्मवित्
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Crossing the River of Grief
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              Nārada arrives before Sanatkumāra exhausted and grieving, despite knowing all worldly sciences. The teacher tells him: "Whatever you have studied is merely names. Only the Knower of the Self crosses beyond sorrow (*Tarati śokam ātmavit*)."
            </p>
          </div>
        </div>

        {vSorrow && <FullWidthVerseBand verse={vSorrow} />}
        {vBhuma && <FullWidthVerseBand verse={vBhuma} />}
      </section>

      {/* Step 2: Deep Dialogue Sub-Pages Rail */}
      <section id="subpages" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            शाखा अन्वेषणम् · Deep Dialogues
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Explore the Two Great Chāndogya Chambers
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-[60ch] mx-auto">
            Step directly into the specialized dialogues of Uddālaka and Sanatkumāra.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/chandogya/6"
            className="group p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--gold)] transition-all shadow-sm hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold font-[var(--font-marginalia)] uppercase tracking-widest text-[var(--gold)]">
                Chāndogya 6 · उद्दालक-श्वेतकेतु
              </span>
              <span className="text-xs text-[var(--gold)] group-hover:translate-x-1 transition-transform">
                Open Chamber →
              </span>
            </div>
            <h3 className="font-[var(--font-heading-alt)] text-lg text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors mb-2">
              Tat Tvam Asi: The Banyan Seed & The Salt in Water
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Explore the 9 illustrations of identity that does not break under pressure, from the invisible heart of the banyan seed to the dissolved salt.
            </p>
          </Link>

          <Link
            to="/chandogya/7"
            className="group p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--gold)] transition-all shadow-sm hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold font-[var(--font-marginalia)] uppercase tracking-widest text-[var(--saffron)]">
                Chāndogya 7 · नारद-सनत्कुमार
              </span>
              <span className="text-xs text-[var(--gold)] group-hover:translate-x-1 transition-transform">
                Open Chamber →
              </span>
            </div>
            <h3 className="font-[var(--font-heading-alt)] text-lg text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors mb-2">
              The Ocean of Sorrow & The Offer a Worry Ritual
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Discover Nārada's intellectual burn-out, the ascent to the Infinite (*Bhūmā*), and participate in the interactive "Offer a Worry" ritual.
            </p>
          </Link>
        </div>
      </section>

      {/* Step 3: Resilient Particle Text Simulation */}
      <section id="particles" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ९.३ · अन्तःकरण संस्कारः · Dynamic Simulation
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Resilient Particle Text Simulation
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-[60ch] mx-auto">
            Disturb the particles with your cursor; observe them spontaneously reconstitute around the immutable center.
          </p>
        </div>

        <Suspense fallback={<div className="h-64 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="250px">
            <ResilientParticleText
              text="तरति शोकमात्मवित्"
              subtitle="The Knower of the Self crosses beyond all sorrow."
            />
          </LazyViewport>
        </Suspense>
      </section>

      {/* Step 4: Satyakama Jabala */}
      <section id="satyakama" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ९.४ · सत्यकाम जाबाल उपाख्यानम्
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Authenticity as Fortitude: Satyakāma Jābāla
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left space-y-3">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              Young Satyakāma did not know his lineage. When asked by sage Gautama, he spoke with absolute honesty: "I do not know my father's clan; my mother told me she worked as a maid in her youth." The teacher accepted him immediately: "None but a true seeker could speak such unvarnished truth."
            </p>
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              Resilience does not rely on defensive deception or borrowed pedigrees. Unshakable self-worth rests upon total alignment with truth (*Satya*).
            </p>
          </div>
        </div>

        {vSatya && <FullWidthVerseBand verse={vSatya} />}
      </section>
    </UpanishadPageShell>
  )
}
