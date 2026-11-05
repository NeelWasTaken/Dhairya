import { useState, lazy, Suspense } from 'react'
import UpanishadPageShell from '../../components/layout/UpanishadPageShell'
import upanishadsData from '../../content/upanishads.json'
import versesData from '../../content/verses.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import type { Verse } from '../../components/ui/VerseCard'
import LazyViewport from '../../components/ui/LazyViewport'
import type { UpanishadMeta } from '../../hooks/useJourneyProgress'

const HoldToBreathe = lazy(() => import('../../components/interactive/HoldToBreathe'))
const BreathingMandala = lazy(() => import('../../components/animations/BreathingMandala'))
const BreathSyncedPage = lazy(() => import('../../components/emotional/BreathSyncedPage'))

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

const prashnaMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'prashna')!
const prevMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'katha')!
const nextMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'mundaka')!

const steps = [
  { id: 'prana', label: '1. The Primacy of Prāṇa' },
  { id: 'heart', label: '2. The Subtle Channels (v. 3.3)' },
  { id: 'practice', label: '3. Breath Mastery Interactions' },
]

export default function PrashnaPage() {
  const [activeStep, setActiveStep] = useState('prana')
  const vPrana = versesMap.get('prasna-3-3-4')

  return (
    <UpanishadPageShell
      meta={prashnaMeta}
      prev={{ title: prevMeta.title, path: prevMeta.path, devanagari: prevMeta.devanagari }}
      next={{ title: nextMeta.title, path: nextMeta.path, devanagari: nextMeta.devanagari, teaser: nextMeta.teaser }}
      steps={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
      resilienceInsight={{
        title: 'Prāṇa as the Anchor: Regulating the Breath Stills the Storm',
        text: 'In the Praśna Upaniṣad, the six seekers ask sage Pippalāda how life enters and sustains the body. Pippalāda demonstrates that all sensory functions are subservient to Prāṇa (the vital breath). When the breath is disordered, the mind is tossed; when the breath is rhythmic and regulated, the nervous system anchors into profound homeostasis.',
      }}
      modernParallel={{
        title: 'Vagal Tone & Heart Rate Variability (HRV)',
        text: 'Contemporary neurobiology confirms what the Atharvavedic seers documented: conscious breath regulation stimulates the vagus nerve, down-regulating sympathetic fight-or-flight reactivity and restoring parasympathetic calm. Slow, rhythmic exhalations directly increase Heart Rate Variability (HRV), the primary physiological marker of emotional resilience.',
      }}
      reflectPrompt="When adversity strikes, notice your breath. Can you lengthen your exhale and feel your centre return?"
      sources={[
        'Praśna Upaniṣad with the Commentary of Śaṅkarācārya, translated by Swami Gambhirananda, Advaita Ashrama, 1957.',
        'Radhakrishnan, S. The Principal Upaniṣads. London: George Allen & Unwin, 1953 (pp. 401–434).',
        'Porges, S. W. The Polyvagal Theory: Neurophysiological Foundations of Emotions, Attachment, Communication, and Self-regulation. Norton, 2011.',
      ]}
      commentaryDrawer={{
        title: 'Pippalāda\'s Discourse on the Five Prāṇas',
        content: (
          <>
            <p>
              In chapter 3 of Praśna, sage Pippalāda explains the fivefold division of vital energy: *Prāṇa* (inward drawing), *Apāna* (downward elimination), *Samāna* (equalizing digestion), *Vyāna* (pervasive circulation), and *Udāna* (upward ascension at death).
            </p>
            <p>
              Śaṅkara comments that like a king stationing governors in provinces, the sovereign Self directs these vital winds. The meditator who understands how the rays of the heart connect to these vital currents attains complete mastery over psychic fragmentation.
            </p>
          </>
        ),
      }}
    >
      {/* Step 1: The Primacy of Prana */}
      <section id="prana" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ४.१ · प्राण महिमा
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            The Sovereign Breath
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              In Praśna 2, the senses quarrel over who holds up the body: speech says "I sustain it," sight says "I sustain it." Then Prāṇa begins to rise as if leaving, and instantly all senses are pulled upward like bees following their queen. When Prāṇa settles, all senses settle. Prāṇa is the supreme somatic anchor.
            </p>
          </div>
        </div>
      </section>

      {/* Step 2: Verse 3.3.4 */}
      <section id="heart" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ४.२ · हृदि ह्येष आत्मा
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            The 101 Nādīs of the Heart
          </h2>
        </div>

        {vPrana && <FullWidthVerseBand verse={vPrana} />}
      </section>

      {/* Step 3: Interactive Somatic Toolkit */}
      <section id="practice" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ४.३ · प्राणाभ्यासः · Somatic Resilience Engine
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Breath Mastery Interactive Toolkit
          </h2>
        </div>

        {/* Breath Synced Page Module */}
        <Suspense fallback={<div className="h-40 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="160px">
            <BreathSyncedPage />
          </LazyViewport>
        </Suspense>

        {/* Hold to Breathe Interactive Engine */}
        <Suspense fallback={<div className="h-64 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="250px">
            <HoldToBreathe />
          </LazyViewport>
        </Suspense>

        {/* Breathing Mandala Guided Experience */}
        <Suspense fallback={<div className="h-80 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />}>
          <LazyViewport minHeight="350px">
            <BreathingMandala />
          </LazyViewport>
        </Suspense>
      </section>
    </UpanishadPageShell>
  )
}
