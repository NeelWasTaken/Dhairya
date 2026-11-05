import { useState, lazy, Suspense } from 'react'
import UpanishadPageShell from '../../components/layout/UpanishadPageShell'
import upanishadsData from '../../content/upanishads.json'
import versesData from '../../content/verses.json'
import ch4 from '../../content/chapters/chapter-04.json'
import ch5 from '../../content/chapters/chapter-05.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import Reveal from '../../components/ui/Reveal'
import type { Verse } from '../../components/ui/VerseCard'
import LazyViewport from '../../components/ui/LazyViewport'
import DevanagariScenery from '../../components/foundation/DevanagariScenery'
import type { UpanishadMeta } from '../../hooks/useJourneyProgress'

// Lazy-loaded interactive modules
const ShowpieceNachiketaDescent = lazy(() => import('../../components/interactive/ShowpieceNachiketaDescent'))
const NachiketaPathfinder = lazy(() => import('../../components/interactive/NachiketaPathfinder'))
const NachiketaTimeline = lazy(() => import('../../components/animations/NachiketaTimeline'))
const YamasRiddleRoom = lazy(() => import('../../components/playful/YamasRiddleRoom'))
const WellDescent = lazy(() => import('../../components/emotional/WellDescent'))
const ShowpieceChariotCaravan = lazy(() => import('../../components/interactive/ShowpieceChariotCaravan'))
const ChariotSteering = lazy(() => import('../../components/interactive/ChariotSteering'))
const ChariotScene = lazy(() => import('../../components/animations/ChariotScene'))

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

const kathaMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'katha')!
const prevMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'kena')!
const nextMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'prashna')!

const steps = [
  { id: 'descent', label: '1. Nachiketa & Death' },
  { id: 'boons', label: '2. Śreyas vs Preyas' },
  { id: 'deathless', label: '3. The Deathless Self' },
  { id: 'chariot', label: '4. The Chariot Model' },
  { id: 'trials', label: '5. Yama\'s Riddle & Well' },
]

export default function KathaPage() {
  const [activeStep, setActiveStep] = useState('descent')

  const v18 = versesMap.get('katha-1-2-18')
  const vChariot = versesMap.get('katha-1-3-3')
  const v121 = versesMap.get('katha-1-2-1-2')
  const vWake = versesMap.get('katha-1-3-14')

  return (
    <UpanishadPageShell
      meta={kathaMeta}
      prev={{ title: prevMeta.title, path: prevMeta.path, devanagari: prevMeta.devanagari }}
      next={{ title: nextMeta.title, path: nextMeta.path, devanagari: nextMeta.devanagari, teaser: nextMeta.teaser }}
      steps={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
      resilienceInsight={{
        title: 'Facing Mortality: When You No Longer Fear Death, Nothing Can Shake You',
        text: 'Nachiketa rejected fleeting wealth, heavenly pleasures, and worldly fame because all of them end in death. By confronting mortality directly, he unearthed the unshakeable premise: that which observes birth and death was never born and never dies. True psychological resilience begins where existential denial ends.',
      }}
      modernParallel={{
        title: 'Terror Management Theory & Executive Function (Buddhi)',
        text: 'Modern Terror Management Theory (TMT) shows that unconscious death anxiety drives frantic consumerism, status anxiety, and dogmatism. Kaṭha demonstrates that transcending this terror through discernment (Buddhi as Charioteer) provides total emotional stability, while sensory impulsivity (unbridled horses) leads to psychic wreckage.',
      }}
      reflectPrompt="If you knew with absolute certainty that your core consciousness cannot be damaged by any circumstance, how would you act today?"
      sources={[...ch4.sources, ...ch5.sources]}
      commentaryDrawer={{
        title: 'Śaṅkara on Kaṭha: The Chariot, the Razor\'s Edge, and the Sovereign Ātman',
        content: (
          <>
            <p>
              In Kaṭha 1.3.3–9, Śaṅkara interprets the Chariot metaphor with acute psychological precision: the body is the vehicle, the intellect (*buddhi*) the driver, the mind (*manas*) the reins, the senses (*indriyas*) the horses, and the objects of desire the road.
            </p>
            <p>
              If the intellect lacks discernment and the mind is undisciplined, the senses become like vicious horses that plunge the chariot into the ditch of samsara. But for the disciplined charioteer, the journey reaches the supreme abode of Viṣṇu: the pristine stillness of pure awareness.
            </p>
          </>
        ),
      }}
    >
      {/* Step 1: Nachiketa & Descent into Yama's Abode */}
      <section id="descent" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <DevanagariScenery
          glyph="mrityu"
          caption="Mṛtyu: Death as the Great Teacher"
          subtitle="The threshold doorway to Yama's chamber of truth"
        />

        <Suspense fallback={<div className="h-40 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="160px">
            <ShowpieceNachiketaDescent />
          </LazyViewport>
        </Suspense>

        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <Reveal type="eyebrow" trigger="mount" stepId={activeStep} delay={0.05} debugLabel="Katha Step 1 Eyebrow">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
              ३.१ · नचिकेतोपाख्यानम्
            </span>
          </Reveal>
          <Reveal type="heading" trigger="mount" stepId={activeStep} delay={0.15} debugLabel="Katha Step 1 Heading">
            <h2
              className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
            >
              Facing Mortality Without Retreat
            </h2>
          </Reveal>
          <Reveal type="body" trigger="mount" stepId={activeStep} delay={0.25} debugLabel="Katha Step 1 Body">
            <div className="w-full max-w-[68ch] mx-auto text-left space-y-3">
              <p
                className="text-[var(--text-secondary)] leading-relaxed"
                style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
              >
                {ch4.content[0]?.text}
              </p>
              <p
                className="text-[var(--text-secondary)] leading-relaxed"
                style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
              >
                {ch4.content[1]?.text}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Pathfinder Choose-Your-Path */}
        <Suspense fallback={<div className="h-72 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="300px">
            <NachiketaPathfinder />
          </LazyViewport>
        </Suspense>
      </section>

      {/* Step 2: Śreyas vs Preyas */}
      <section id="boons" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <Reveal type="eyebrow" trigger="mount" stepId={activeStep} delay={0.05} debugLabel="Katha Step 2 Eyebrow">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
              ३.२ · श्रेयः प्रेयो विवेकः
            </span>
          </Reveal>
          <Reveal type="heading" trigger="mount" stepId={activeStep} delay={0.15} debugLabel="Katha Step 2 Heading">
            <h2
              className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
            >
              The Choice: What is Good vs What is Pleasant
            </h2>
          </Reveal>
          <Reveal type="body" trigger="mount" stepId={activeStep} delay={0.25} debugLabel="Katha Step 2 Body">
            <div className="w-full max-w-[68ch] mx-auto text-left">
              <p
                className="text-[var(--text-secondary)] leading-relaxed"
                style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
              >
                Yama offers Nachiketa gold, celestial maidens, kingdom, and centuries of pleasurable life. Nachiketa declines them all: "Transient are these, O Death; they wear out the vigor of all the senses. Keep your chariots and dancing." The choice of Śreyas (the noble/enduring) over Preyas (the immediately pleasing) is the cornerstone of psychological fortitude.
              </p>
            </div>
          </Reveal>
        </div>

        {v121 && <FullWidthVerseBand verse={v121} />}

        {/* Interactive Scroll Timeline of Nachiketa's 3 Boons */}
        <Suspense fallback={<div className="h-80 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="350px">
            <NachiketaTimeline />
          </LazyViewport>
        </Suspense>
      </section>

      {/* Step 3: The Deathless Self */}
      <section id="deathless" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <Reveal type="eyebrow" trigger="mount" stepId={activeStep} delay={0.05} debugLabel="Katha Step 3 Eyebrow">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
              ३.३ · न जायते म्रियते वा
            </span>
          </Reveal>
          <Reveal type="heading" trigger="mount" stepId={activeStep} delay={0.15} debugLabel="Katha Step 3 Heading">
            <h2
              className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
            >
              The Deathless Witness Within
            </h2>
          </Reveal>
          <Reveal type="body" trigger="mount" stepId={activeStep} delay={0.25} debugLabel="Katha Step 3 Body">
            <div className="w-full max-w-[68ch] mx-auto text-left">
              <p
                className="text-[var(--text-secondary)] leading-relaxed"
                style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
              >
                The knowing Self is never born; nor does it die. It sprang from nothing; nothing sprang from it. Unborn, eternal, everlasting, and ancient, it is not slain when the body is slain.
              </p>
            </div>
          </Reveal>
        </div>

        {v18 && <FullWidthVerseBand verse={v18} />}
        {vWake && <FullWidthVerseBand verse={vWake} />}
      </section>

      {/* Step 4: The Chariot Model */}
      <section id="chariot" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <Reveal type="eyebrow" trigger="mount" stepId={activeStep} delay={0.05} debugLabel="Katha Step 4 Eyebrow">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
              ३.४ · रथ रूपकम्
            </span>
          </Reveal>
          <Reveal type="heading" trigger="mount" stepId={activeStep} delay={0.15} debugLabel="Katha Step 4 Heading">
            <h2
              className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
            >
              The Chariot of Consciousness
            </h2>
          </Reveal>
          <Reveal type="body" trigger="mount" stepId={activeStep} delay={0.25} debugLabel="Katha Step 4 Body">
            <div className="w-full max-w-[68ch] mx-auto text-left">
              <p
                className="text-[var(--text-secondary)] leading-relaxed"
                style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
              >
                Know the Self as the lord of the chariot, the body as the chariot itself, the intellect (*buddhi*) as the charioteer, and the mind (*manas*) as the reins. The senses are the horses, and the objects of the senses are their paths.
              </p>
            </div>
          </Reveal>
        </div>

        {vChariot && <FullWidthVerseBand verse={vChariot} />}

        <Suspense fallback={<div className="h-40 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="160px">
            <ShowpieceChariotCaravan />
          </LazyViewport>
        </Suspense>

        {/* Interactive Chariot Steering */}
        <Suspense fallback={<div className="h-96 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="400px">
            <ChariotSteering />
          </LazyViewport>
        </Suspense>

        {/* Scroll-Driven Chariot Scene */}
        <Suspense fallback={<div className="h-80 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="350px">
            <ChariotScene />
          </LazyViewport>
        </Suspense>
      </section>

      {/* Step 5: Yama's Riddle Room & The Well Descent */}
      <section id="trials" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <Reveal type="eyebrow" trigger="mount" stepId={activeStep} delay={0.05} debugLabel="Katha Step 5 Eyebrow">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
              ३.५ · यम सभा
            </span>
          </Reveal>
          <Reveal type="heading" trigger="mount" stepId={activeStep} delay={0.15} debugLabel="Katha Step 5 Heading">
            <h2
              className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
            >
              Yama's Trials of Fortitude
            </h2>
          </Reveal>
        </div>

        {/* Riddle Room Interaction */}
        <Suspense fallback={<div className="h-96 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="400px">
            <YamasRiddleRoom />
          </LazyViewport>
        </Suspense>

        {/* Well Descent Experience */}
        <Suspense fallback={<div className="h-96 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="450px">
            <WellDescent />
          </LazyViewport>
        </Suspense>
      </section>
    </UpanishadPageShell>
  )
}
