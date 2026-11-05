import { useState, lazy, Suspense } from 'react'
import UpanishadPageShell from '../../components/layout/UpanishadPageShell'
import upanishadsData from '../../content/upanishads.json'
import versesData from '../../content/verses.json'
import ch3 from '../../content/chapters/chapter-03.json'
import ch9 from '../../content/chapters/chapter-09.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import type { Verse } from '../../components/ui/VerseCard'
import LazyViewport from '../../components/ui/LazyViewport'
import type { UpanishadMeta } from '../../hooks/useJourneyProgress'

const Panchakosha3DViewer = lazy(() => import('../../components/interactive/Panchakosha3DViewer'))
const KoshaLotus = lazy(() => import('../../components/animations/KoshaLotus'))

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

const taittiriyaMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'taittiriya')!
const prevMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'mandukya')!
const nextMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'aitareya')!

const steps = [
  { id: 'fearless', label: '1. Fearlessness in Bliss (v. 2.4.1)' },
  { id: 'koshas', label: '2. The Five Sheaths (Koshas)' },
  { id: 'bhrigu', label: '3. Bhṛgu\'s Inquiry (v. 3.1)' },
]

export default function TaittiriyaPage() {
  const [activeStep, setActiveStep] = useState('fearless')

  const vBliss = versesMap.get('taittiriya-2-4-1')
  const vMindRetreat = versesMap.get('taittiriya-2-9-1')
  const vOrder = versesMap.get('taittiriya-2-1-5')
  const vBhrigu = versesMap.get('taittiriya-3-1')

  return (
    <UpanishadPageShell
      meta={taittiriyaMeta}
      prev={{ title: prevMeta.title, path: prevMeta.path, devanagari: prevMeta.devanagari }}
      next={{ title: nextMeta.title, path: nextMeta.path, devanagari: nextMeta.devanagari, teaser: nextMeta.teaser }}
      steps={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
      resilienceInsight={{
        title: 'The Onion of Identity: Why Stress Breaks the Periphery, Not the Center',
        text: 'When we suffer burn-out, we assume our whole life is ruined. The Taittirīya reveals the human being as five concentric sheaths (*pañcakośa*): physical food body (Annamaya), vital energy (Prāṇamaya), emotional reactivity (Manomaya), intellect (Vijñānamaya), and unconditioned joy (Ānandamaya). Fatigue belongs to the food body; anxiety belongs to the emotional mind. The core witness is untouched by either.',
      }}
      modernParallel={{
        title: 'Biopsychosocial Model & Polyvagal Layering',
        text: 'George Engel\'s biopsychosocial framework partitions human distress across biological, psychological, and sociological layers. The Taittirīya system provided an identical diagnostic model 2,600 years ago: treat physical depletion at the food sheath, nervous exhaustion at the prāṇic sheath, and rumination at the cognitive sheath—while remembering that your foundational Self is unconditional wholeness.',
      }}
      reflectPrompt="Which layer of your experience is currently crying out for attention: physical nourishment, breath, emotional rest, or intellectual clarity?"
      sources={[...ch3.sources, ...ch9.sources]}
      commentaryDrawer={{
        title: 'Śaṅkara on the Five Sheaths and the Bhṛgu Vallī Pedagogy',
        content: (
          <>
            <p>
              In his commentary on the *Brahmavallī*, Śaṅkara notes that the sequence of koshas proceeds from the grossest (*sthūla*) to the subtlest (*sūkṣma*). Just as one peels layers of husks to reveal the grain, the seeker peels through bodily and emotional identifications until only the luminous Ātman remains.
            </p>
            <p>
              In the *Bhṛgu Vallī*, young Bhṛgu repeatedly returns to his father Varuṇa asking for the definition of Brahman. Varuṇa does not lecture; he commands: "Do tapas (deep investigative reflection)." Bhṛgu discovers layer by layer that food passes, breath passes, mind passes, but that bliss from which all beings arise and into which they return is the ultimate reality.
            </p>
          </>
        ),
      }}
    >
      {/* Step 1: Fearlessness */}
      <section id="fearless" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ७.१ · आनन्दं ब्रह्मणो विद्वान्
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            The Bliss That Conquers Fear
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              "He who knows the bliss of Brahman, whence words along with the mind turn back unable to attain, fears nothing from any quarter." The Taittirīya reveals that fearlessness is not emotional numbness, but grounding in primordial bliss (*Ānanda*).
            </p>
          </div>
        </div>

        {vBliss && <FullWidthVerseBand verse={vBliss} />}
        {vMindRetreat && <FullWidthVerseBand verse={vMindRetreat} />}
      </section>

      {/* Step 2: Panchakosha Interactive 3D Viewer & Lotus */}
      <section id="koshas" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ७.२ · पञ्चकोश विवेकः
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            3D Concentric Peeler of the Five Sheaths
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-[60ch] mx-auto">
            Drag and peel through the 5 concentric layers (physical, vital, mental, wisdom, bliss) to uncover the radiant witness core.
          </p>
        </div>

        {/* 3D WebGL Canvas */}
        <Suspense fallback={<div className="h-96 rounded-2xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="450px">
            <Panchakosha3DViewer />
          </LazyViewport>
        </Suspense>

        {/* Concentric Kosha Lotus Animation */}
        <Suspense fallback={<div className="h-72 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="300px">
            <KoshaLotus />
          </LazyViewport>
        </Suspense>

        {vOrder && <FullWidthVerseBand verse={vOrder} />}
      </section>

      {/* Step 3: Bhrigu Valli Inquiry */}
      <section id="bhrigu" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block">
            ७.३ · भृगु वल्ली तपस्
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Bhṛgu's Empirical Investigation
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              {ch9.content[0]?.text}
            </p>
          </div>
        </div>

        {vBhrigu && <FullWidthVerseBand verse={vBhrigu} />}
      </section>
    </UpanishadPageShell>
  )
}
