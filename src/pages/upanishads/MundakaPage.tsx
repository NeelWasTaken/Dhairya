import { useState, lazy, Suspense } from 'react'
import UpanishadPageShell from '../../components/layout/UpanishadPageShell'
import upanishadsData from '../../content/upanishads.json'
import versesData from '../../content/verses.json'
import ch10 from '../../content/chapters/chapter-10.json'
import ch11 from '../../content/chapters/chapter-11.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import VerseCard from '../../components/ui/VerseCard'
import type { Verse } from '../../components/ui/VerseCard'
import LazyViewport from '../../components/ui/LazyViewport'
import type { UpanishadMeta } from '../../hooks/useJourneyProgress'

const TwoBirdsSlider = lazy(() => import('../../components/interactive/TwoBirdsSlider'))
const TwoBirds = lazy(() => import('../../components/animations/TwoBirds'))

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

const mundakaMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'mundaka')!
const prevMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'prashna')!
const nextMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'mandukya')!

const steps = [
  { id: 'birds', label: '1. The Two Birds (v. 3.1.1)' },
  { id: 'strength', label: '2. Spiritual Strength (v. 3.2.4)' },
  { id: 'bow', label: '3. The Bow of Om (v. 2.2.3)' },
  { id: 'satyam', label: '4. Satyam Eva Jayate (v. 3.1.6)' },
]

export default function MundakaPage() {
  const [activeStep, setActiveStep] = useState('birds')

  const vBirds1 = versesMap.get('mundaka-3-1-1')
  const vBirds2 = versesMap.get('mundaka-3-1-2')
  const vStrength = versesMap.get('mundaka-3-2-4')
  const vBow = versesMap.get('mundaka-2-2-3-4')
  const vSatyam = versesMap.get('mundaka-3-1-6')

  return (
    <UpanishadPageShell
      meta={mundakaMeta}
      prev={{ title: prevMeta.title, path: prevMeta.path, devanagari: prevMeta.devanagari }}
      next={{ title: nextMeta.title, path: nextMeta.path, devanagari: nextMeta.devanagari, teaser: nextMeta.teaser }}
      steps={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
      resilienceInsight={{
        title: 'The Witness Above the Storm: Shifting from Actor to Observer',
        text: 'The Muṇḍaka offers the world\'s most famous contemplative metaphor: two birds of golden plumage sit upon the same tree of life. One bird pecks frantically at sweet and bitter berries, oscillating between exhilaration and despair. The other bird simply looks on in radiant, detached stillness. When the first bird looks up and recognizes its identity with the spectator, all sorrow falls away.',
      }}
      modernParallel={{
        title: 'Self-As-Context (ACT) & Moral Courage',
        text: 'In Relational Frame Theory and Acceptance and Commitment Therapy, the distinction between "Self-as-Content" (the fluctuating narrative ego) and "Self-as-Context" (the observing arena) matches the Two Birds precisely. Muṇḍaka further insists that psychological integration requires moral backbone (*Bala*): truth triumphs (*Satyam eva jayate*) not through wishful thinking, but through unyielding cognitive clarity.',
      }}
      reflectPrompt="In your present challenge, are you the eating bird suffering every bite, or can you step back into the watching bird?"
      sources={[...ch10.sources, ...ch11.sources]}
      commentaryDrawer={{
        title: 'Śaṅkara on Muṇḍaka: The Bow of Praṇava and the Target of Brahman',
        content: (
          <>
            <p>
              In verse 2.2.3–4, the seer Angiras instructs Śaunaka: "Taking as bow the great weapon of the Upaniṣad, place upon it the arrow sharpened by meditation. Drawing it with mind absorbed in contemplation, hit that imperishable target."
            </p>
            <p>
              Śaṅkara comments that the bow is Om, the arrow is the individual self (*jīva*), and the target is Brahman. When the arrow strikes without tremor or wavering, the arrow becomes one with the target—the individual ego dissolves into infinite stillness.
            </p>
          </>
        ),
      }}
    >
      {/* Step 1: The Two Birds */}
      <section id="birds" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ५.१ · द्वा सुपर्णा सयुजा सखाया
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            The Allegory of the Two Birds
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              Two birds of beautiful plumage, closely companionable, perch upon the very same tree. One eats the sweet and bitter fruits of the tree, while the other looks on without eating, radiant and serene.
            </p>
          </div>
        </div>

        {vBirds1 && <FullWidthVerseBand verse={vBirds1} />}

        {/* Interactive Perspective Slider */}
        <Suspense fallback={<div className="h-72 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="300px">
            <TwoBirdsSlider />
          </LazyViewport>
        </Suspense>

        {/* Visual Animation of the Two Birds */}
        <Suspense fallback={<div className="h-72 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="300px">
            <TwoBirds />
          </LazyViewport>
        </Suspense>

        {vBirds2 && <FullWidthVerseBand verse={vBirds2} />}
      </section>

      {/* Step 2: Spiritual Strength */}
      <section id="strength" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ५.२ · नायमात्मा बलहीनेन लभ्यः
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Strength as a Spiritual Mandate
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              "This Self cannot be attained by one devoid of vigor, nor through inadvertence." Fortitude (*Dhairya*) is not passive endurance; it is dynamic inner stamina (*Bala*).
            </p>
          </div>
        </div>

        {vStrength && <FullWidthVerseBand verse={vStrength} />}
      </section>

      {/* Step 3: The Bow of Om & Satyam */}
      <section id="bow" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block">
            ५.३ · प्रणवो धनुः शरो ह्यात्मा
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            The Great Bow of Om & Ultimate Victory of Truth
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {vBow && <VerseCard verse={vBow} />}
          {vSatyam && <VerseCard verse={vSatyam} />}
        </div>
      </section>
    </UpanishadPageShell>
  )
}
