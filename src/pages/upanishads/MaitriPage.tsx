import { useState } from 'react'
import UpanishadPageShell from '../../components/layout/UpanishadPageShell'
import upanishadsData from '../../content/upanishads.json'
import versesData from '../../content/verses.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import type { Verse } from '../../components/ui/VerseCard'
import type { UpanishadMeta } from '../../hooks/useJourneyProgress'

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

const maitriMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'maitri')!
const prevMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'shvetashvatara')!

const steps = [
  { id: 'mind', label: '1. Mind as Forge (v. 6.34)' },
  { id: 'fire', label: '2. The Flame Without Fuel' },
  { id: 'cleansing', label: '3. Purifying the Stream' },
]

export default function MaitriPage() {
  const [activeStep, setActiveStep] = useState('mind')
  const vMaitri = versesMap.get('maitri-6-34')

  return (
    <UpanishadPageShell
      meta={maitriMeta}
      prev={{ title: prevMeta.title, path: prevMeta.path, devanagari: prevMeta.devanagari }}
      next={{
        title: 'The Storm & The Tree',
        path: '/storm',
        devanagari: 'समीक्षा',
        teaser: '5-Level Interactive Storm Dial, Kintsugi Crack, and Seismograph Summary.',
      }}
      steps={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
      resilienceInsight={{
        title: 'Yac Cittaḥ Tan Mayo Bhavati: You Become That Which You Contemplate',
        text: 'The Maitrī Upaniṣad delivers the psychological climax of the core journey: the mind alone is the cycle of distress (*cittameva hi saṃsāram*). Like fire when its fuel is consumed settles quietly into its source, so does the mind whose thoughts have been restrained settle peacefully into the Self. Whatever the mind constantly ruminates upon, that quality it takes on.',
      }}
      modernParallel={{
        title: 'Neuroplasticity & Attentional Bias Training',
        text: 'Modern neuroplasticity reveals that neurons that fire together, wire together. Constant catastrophic rumination physically strengthens anxious neural pathways; deliberate attentional anchoring on calmness, gratitude, and equanimity builds thick prefrontal resilience circuits. Maitrī recognized this neuro-cognitive conditioning: "As is one\'s thought, so one becomes; this is the timeless secret."',
      }}
      reflectPrompt="What mental fuel have you been feeding your mind today: panic and grievance, or stillness and dignity?"
      sources={[
        'Maitrī Upaniṣad (Maitrāyaṇīya), edited with translation by J. A. B. van Buitenen, Mouton & Co., 1962.',
        'Radhakrishnan, S. The Principal Upaniṣads. London: George Allen & Unwin, 1953 (pp. 793–859).',
        'Cowell, E. B. The Maitri or Maitrāyaṇīya Upanishad. Calcutta: Asiatic Society of Bengal, 1870.',
      ]}
      commentaryDrawer={{
        title: 'The Analogy of the Settled Hearth (Maitrī 6.34)',
        content: (
          <>
            <p>
              In Maitrī 6.34, the sage Śākāyanya presents the profound image of the fire: *Vahniryathā nirindhano yonāvupaśāmyati* — just as fire without fuel becomes quiescent in its own hearth, so thought when freed from the fuel of craving settles into its source.
            </p>
            <p>
              For one whose mind has dissolved into peace, who has purified thought through resolute inquiry, what joy is experienced in the Self cannot be described by speech; it can only be grasped directly by the purified heart.
            </p>
          </>
        ),
      }}
    >
      {/* Step 1: Mind as Forge */}
      <section id="mind" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            १२.१ · चित्तमेव हि संसारम्
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            The Mind Alone is the Forge of Destiny
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              "What a person thinks, that one becomes: this is the eternal mystery. When the mind is purified and centered, liberation follows naturally."
            </p>
          </div>
        </div>

        {vMaitri && <FullWidthVerseBand verse={vMaitri} />}
      </section>

      {/* Step 2: The Fire Without Fuel */}
      <section id="fire" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block">
            १२.२ · निर्इन्धनो वह्निः
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Withdrawing the Fuel of Anxious Narrative
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              Most emotional suffering is sustained not by the initial event, but by the endless stories the mind generates about the event. When you stop feeding the fire with catastrophic projections, the mental flame naturally settles back into the hearth of consciousness.
            </p>
          </div>
        </div>
      </section>

      {/* Step 3: Purifying the Stream */}
      <section id="cleansing" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            १२.३ · चित्त शुद्धिः
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            The Culmination of the 12 Stations
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              You have journeyed from the active engagement of Īśā, through the de-centring inquiry of Kena, the deathless chariot of Kaṭha, the vital breath of Praśna, the watching bird of Muṇḍaka, the unscarred Turīya of Māṇḍūkya, the five sheaths of Taittirīya, the pure awareness of Aitareya, the infinite freedom of Chāndogya, the radiant fearlessness of Bṛhadāraṇyaka, and the somatic stillness of Śvetāśvatara, arriving here at Maitrī: the realization that the mind, when purified of clutching, is your supreme ally.
            </p>
          </div>
        </div>
      </section>
    </UpanishadPageShell>
  )
}
