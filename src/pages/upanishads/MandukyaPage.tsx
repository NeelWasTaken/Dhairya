import { useState, lazy, Suspense } from 'react'
import UpanishadPageShell from '../../components/layout/UpanishadPageShell'
import upanishadsData from '../../content/upanishads.json'
import versesData from '../../content/verses.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import type { Verse } from '../../components/ui/VerseCard'
import LazyViewport from '../../components/ui/LazyViewport'
import DevanagariScenery from '../../components/foundation/DevanagariScenery'
import type { UpanishadMeta } from '../../hooks/useJourneyProgress'

const ShowpieceMandukyaDepth = lazy(() => import('../../components/interactive/ShowpieceMandukyaDepth'))
const MandukyaSpinWheel = lazy(() => import('../../components/interactive/MandukyaSpinWheel'))
const FourStatesWheel = lazy(() => import('../../components/animations/FourStatesWheel'))
const SageConstellations = lazy(() => import('../../components/interactive/SageConstellations'))

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

const mandukyaMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'mandukya')!
const prevMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'mundaka')!
const nextMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'taittiriya')!

const steps = [
  { id: 'om', label: '1. The Syllable Om (v. 1)' },
  { id: 'states', label: '2. The Four States' },
  { id: 'turiya', label: '3. Silent Turīya (v. 7)' },
  { id: 'wheels', label: '4. Kinetic Wheels of Awareness' },
]

export default function MandukyaPage() {
  const [activeStep, setActiveStep] = useState('om')

  const v1 = versesMap.get('mandukya-1')
  const v7 = versesMap.get('mandukya-7')

  return (
    <UpanishadPageShell
      meta={mandukyaMeta}
      prev={{ title: prevMeta.title, path: prevMeta.path, devanagari: prevMeta.devanagari }}
      next={{ title: nextMeta.title, path: nextMeta.path, devanagari: nextMeta.devanagari, teaser: nextMeta.teaser }}
      steps={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
      resilienceInsight={{
        title: 'The Unscarred Ground: Turīya Cannot Be Burned or Traumatized',
        text: 'Trauma and stress leave chemical and neural footprints in the waking state (Jāgrat) and nightmare echoes in the dream state (Svapna). But the Māṇḍūkya identifies the fourth state (Turīya): the pure witness consciousness upon which all three states project like a movie on a screen. Fire on the screen does not burn the screen; floods do not drown it. You are the screen.',
      }}
      modernParallel={{
        title: 'Neurobiology of States & Non-Dual Contemplation',
        text: 'Modern neuroscience maps waking, REM dreaming, and delta deep-sleep as distinct EEG frequency bands. Māṇḍūkya goes beyond states to the meta-state: the background awareness that recognizes you slept soundly without dreams. Clinical mindfulness now utilizes this non-dual cognitive stance to decouple traumatic memory from core identity.',
      }}
      reflectPrompt="Can you feel the silent background presence in which this moment, your breathing, and these words are appearing?"
      sources={[
        'Māṇḍūkya Upaniṣad with Gauḍapāda\'s Kārikā and Śaṅkara\'s Commentary, translated by Swami Nikhilananda, Ramakrishna-Vivekananda Center, 1949.',
        'Radhakrishnan, S. The Principal Upaniṣads. London: George Allen & Unwin, 1953 (pp. 693–705).',
        'Sharma, B. N. K. The Philosophy of Śrī Madhvācārya. Motilal Banarsidass, 1986.',
      ]}
      commentaryDrawer={{
        title: 'Gauḍapāda on Māṇḍūkya: The A-U-M Matras and the Amatra Silence',
        content: (
          <>
            <p>
              In his celebrated *Māṇḍūkya Kārikā*, Ādi Śaṅkara\'s grand-preceptor Gauḍapāda explains the phonetic and ontological structure of Praṇava:
              *A* represents Vaiśvānara (waking consciousness in the gross realm), *U* represents Taijasa (dream consciousness in the subtle realm), and *M* represents Prājña (deep sleep in the causal realm).
            </p>
            <p>
              The silence following the chant (*amatra*) is Turīya: ungraspable by sensory apparatus, benign (*śivam*), non-dual (*advaitam*). The knower of Turīya abides in supreme fearlessness, free from the fluctuation of circumstances.
            </p>
          </>
        ),
      }}
    >
      {/* Step 1: Om Syllable */}
      <section id="om" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <DevanagariScenery
          glyph="om"
          caption="Om: The Gateway Between Sound & Silence"
          subtitle="A, U, M dissolve into the fourth dimension of silent witness awareness (Turīya)"
        />

        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ६.१ · ओमित्येतदक्षरमिदं सर्वम्
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            All is the Syllable Om
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              The Māṇḍūkya is the shortest yet most psychologically radical Upaniṣad: twelve verses that dissect all human experience into waking (*Jāgrat*), dreaming (*Svapna*), deep sleep (*Suṣupti*), and the non-dual witness (*Turīya*).
            </p>
          </div>
        </div>

        {v1 && <FullWidthVerseBand verse={v1} />}

        {/* Showpiece Mandukya Depth */}
        <Suspense fallback={<div className="h-40 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="160px">
            <ShowpieceMandukyaDepth />
          </LazyViewport>
        </Suspense>
      </section>

      {/* Step 2: Verse 7 (Turiya) */}
      <section id="turiya" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ६.२ · चतुर्थं मन्यन्ते स आत्मा
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Turīya: The Unshakeable Fourth
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              Neither cognitive nor non-cognitive, neither conscious of the external nor internal world, unseen, ungraspable, without distinctive mark, unthinkable, indescribable—the essence of the one Self, the cessation of all phenomena, tranquil, auspicious, non-dual. That is the Self to be realized.
            </p>
          </div>
        </div>

        {v7 && <FullWidthVerseBand verse={v7} />}
      </section>

      {/* Step 3: Kinetic Wheels of Awareness */}
      <section id="wheels" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ६.३ · अवस्था त्रय विवेकः
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Kinetic Spinning Wheels of Consciousness
          </h2>
        </div>

        {/* Mandukya Spin Wheel */}
        <Suspense fallback={<div className="h-80 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="350px">
            <MandukyaSpinWheel />
          </LazyViewport>
        </Suspense>

        {/* Four States Wheel */}
        <Suspense fallback={<div className="h-80 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="350px">
            <FourStatesWheel />
          </LazyViewport>
        </Suspense>

        {/* Sage Constellations */}
        <Suspense fallback={<div className="h-80 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="350px">
            <SageConstellations />
          </LazyViewport>
        </Suspense>
      </section>
    </UpanishadPageShell>
  )
}
