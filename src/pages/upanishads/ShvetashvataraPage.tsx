import { useState } from 'react'
import UpanishadPageShell from '../../components/layout/UpanishadPageShell'
import upanishadsData from '../../content/upanishads.json'
import versesData from '../../content/verses.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import type { Verse } from '../../components/ui/VerseCard'
import type { UpanishadMeta } from '../../hooks/useJourneyProgress'

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

const shvetaMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'shvetashvatara')!
const prevMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'brihadaranyaka')!
const nextMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'maitri')!

const steps = [
  { id: 'posture', label: '1. Somatic Posture (v. 2.8.9)' },
  { id: 'fire', label: '2. The Fire of Yoga' },
  { id: 'birds', label: '3. The Two Birds Echo (v. 4.6.7)' },
]

export default function ShvetashvataraPage() {
  const [activeStep, setActiveStep] = useState('posture')

  const vPosture = versesMap.get('svetasvatara-2-8-9')
  const vBirdsEcho = versesMap.get('svetasvatara-4-6-7')

  return (
    <UpanishadPageShell
      meta={shvetaMeta}
      prev={{ title: prevMeta.title, path: prevMeta.path, devanagari: prevMeta.devanagari }}
      next={{ title: nextMeta.title, path: nextMeta.path, devanagari: nextMeta.devanagari, teaser: nextMeta.teaser }}
      steps={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
      resilienceInsight={{
        title: 'Somatic Posture as Psychological Anchor: The Bridge to Yoga',
        text: 'The Śvetāśvatara provides the explicit bridge between Upaniṣadic philosophy and somatic practice: holding the three upper body parts (chest, neck, head) erect and aligned, one draws sensory turbulence inward into the heart by the boat of Praṇava. Physical alignment creates psychological containment; an upright spine signals the nervous system that you are neither fleeing nor collapsing.',
      }}
      modernParallel={{
        title: 'Embodied Cognition & Postural Feedback',
        text: 'Embodied cognition research (e.g., Carney, Cuddy & Yap; Riskind & Gotay) demonstrates that spinal alignment directly influences endocrine and autonomic nervous responses: upright posture reduces cortisol spikes and increases perceived agency during cognitive stress. Śvetāśvatara formulated this somatic feedback loop over two millennia ago.',
      }}
      reflectPrompt="When feeling overwhelmed, notice your posture. Can you lengthen your spine, drop your shoulders, and feel your physical uprightness anchor your mind?"
      sources={[
        'Śvetāśvatara Upaniṣad with the Commentary of Śaṅkarācārya, translated by Swami Gambhirananda, Advaita Ashrama, 1957.',
        'Radhakrishnan, S. The Principal Upaniṣads. London: George Allen & Unwin, 1953 (pp. 707–750).',
        'Olivelle, Patrick. The Early Upanisads. Oxford University Press, 1998.',
      ]}
      commentaryDrawer={{
        title: 'Śaṅkara on Śvetāśvatara 2.8–9: Restraining the Senses Like Vicious Horses',
        content: (
          <>
            <p>
              In his commentary on verse 2.9, Śaṅkara notes: *Yuktaceṣṭaḥ samāhitamānaso bhūtvā* — having brought one\'s activities under disciplined regulation and with concentrated mind, one restrains breathing through the nostrils when thoughts scatter.
            </p>
            <p>
              Just as a wise charioteer steadily checks unruly horses harnessed to a carriage, so should the contemplative vigilantly hold the mind from running after distracting objects. In a secluded spot free from noise, dust, and wind, the light of contemplation shines like a flame in a windless shelter.
            </p>
          </>
        ),
      }}
    >
      {/* Step 1: Somatic Posture */}
      <section id="posture" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ११.१ · त्रिरुन्नतं स्थाप्य समं शरीरम्
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            The Somatic Posture of Steadfastness
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              Holding the three upper parts (chest, neck, head) erect and aligned, one draws the senses inward into the heart by the boat of Pranava, crossing all fearful currents.
            </p>
          </div>
        </div>

        {vPosture && <FullWidthVerseBand verse={vPosture} />}
      </section>

      {/* Step 2: The Fire of Yoga */}
      <section id="fire" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block">
            ११.२ · योगाग्निमयं शरीरम्
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            The Body Tempered in the Fire of Yoga
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              In Śvetāśvatara 2.12, the seer declares: "When earth, water, fire, air, and space arise fivefold in yoga, for him who has attained a body tempered in the fire of yoga, there is neither disease, nor old age, nor untimely death." Resilience is not merely an intellectual idea; it is cellular, breath-driven, and somatic.
            </p>
          </div>
        </div>
      </section>

      {/* Step 3: Two Birds Echo */}
      <section id="birds" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ११.३ · द्वा सुपर्णा सयुजा सखाया · The Cosmic Echo
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            The Witness of Nature
          </h2>
        </div>

        {vBirdsEcho && <FullWidthVerseBand verse={vBirdsEcho} />}
      </section>
    </UpanishadPageShell>
  )
}
