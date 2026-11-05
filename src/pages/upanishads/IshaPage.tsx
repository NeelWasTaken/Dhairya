import { useState } from 'react'
import UpanishadPageShell from '../../components/layout/UpanishadPageShell'
import upanishadsData from '../../content/upanishads.json'
import versesData from '../../content/verses.json'
import ch13 from '../../content/chapters/chapter-13.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import VerseCard from '../../components/ui/VerseCard'
import type { Verse } from '../../components/ui/VerseCard'
import type { UpanishadMeta } from '../../hooks/useJourneyProgress'

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

const ishaMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'isha')!
const nextMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'kena')!

const steps = [
  { id: 'purnam', label: 'Wholeness (Pūrṇam)' },
  { id: 'verse1', label: 'Enveloping All (v. 1)' },
  { id: 'action', label: '100-Year Engagement (v. 2)' },
  { id: 'unity', label: 'Beyond Sorrow (v. 7)' },
  { id: 'vidya', label: 'Vidyā & Avidyā' },
]

export default function IshaPage() {
  const [activeStep, setActiveStep] = useState('purnam')

  const shantiVerse = versesMap.get('isha-shanti-purnam')
  const v1 = versesMap.get('isha-1')
  const v2 = versesMap.get('isha-2')
  const v7 = versesMap.get('isha-7')

  return (
    <UpanishadPageShell
      meta={ishaMeta}
      prev={{ title: 'The Corpus & Sages', path: '/corpus', devanagari: 'वाङ्मयम्' }}
      next={{ title: nextMeta.title, path: nextMeta.path, devanagari: nextMeta.devanagari, teaser: nextMeta.teaser }}
      steps={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
      resilienceInsight={{
        title: 'Engaged Non-Attachment: The Armor of Tena Tyaktena',
        text: 'The Īśā Upaniṣad resolves the ancient paradox between quietism and burn-out. You do not withdraw from the world to stay pure, nor do you grasp at outcomes with panic. You enjoy the world through renouncing possessiveness (*tena tyaktena bhuñjīthāḥ*). This is the psychological root of anti-fragile action.',
      }}
      modernParallel={{
        title: 'Locus of Control & Process Orientation',
        text: 'Contemporary cognitive psychology recognizes that psychological distress stems largely from conflating effort (within control) with outcomes (outside control). The Īśā anticipates this 2,500 years earlier: act with full vitality for a hundred years, yet maintain absolute internal detachment from possessive clinging.',
      }}
      reflectPrompt="What would your daily work feel like if you saw every situation as already enveloped by sacred presence, requiring your full effort but zero clutching?"
      sources={ch13.sources}
      commentaryDrawer={{
        title: 'Śaṅkara on Īśāvāsyopaniṣad: Renunciation as the Foundation of Fearless Living',
        content: (
          <>
            <p>
              In his preamble to the Īśāvāsya Bhāṣya, Ādi Śaṅkara notes that the first verse sets forth the highest knowledge for the steadfast contemplative: recognizing that whatever moves in this moving world is cloaked in the Supreme Lord. By abandoning the false attribution of independent reality to transient objects, one protects oneself from covetousness.
            </p>
            <p>
              Verse 2 addresses those who are engaged in active life: "Only by performing works here should one desire to live a hundred years." Action performed with a sacrificial ethos does not bind the actor. In verse 7, Śaṅkara explains that when one sees all beings as the Self, where can there be grief or delusion? Grief (*śoka*) and delusion (*moha*) are born exclusively from perceived separation.
            </p>
          </>
        ),
      }}
    >
      {/* Step 1: Wholeness */}
      <section id="purnam" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            १.१ · शान्तिपाठः
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            The Axiom of Undivided Wholeness
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              The Īśā opens not with an apology for human weakness, but with a mathematical paradox of consciousness: That is whole, this is whole; from wholeness comes wholeness; when wholeness is taken from wholeness, wholeness remains.
            </p>
          </div>
        </div>

        {shantiVerse && <FullWidthVerseBand verse={shantiVerse} />}
      </section>

      {/* Step 2: Verse 1 */}
      <section id="verse1" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            १.२ · ईशावास्यम्
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Enveloping the World in Presence
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left space-y-3">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              {ch13.content[0]?.text}
            </p>
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              {ch13.content[1]?.text}
            </p>
          </div>
        </div>

        {v1 && <FullWidthVerseBand verse={v1} />}
      </section>

      {/* Step 3: Action Without Collapse */}
      <section id="action" className="w-full max-w-[1000px] mx-auto space-y-6 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block">
            १.३ · कर्मण्यता
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            The 100-Year Life of Fearless Engagement
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              In verse 2, the seer proclaims that one should desire to live a hundred years performing actions without grasping. When you see all beings in the Self and the Self in all beings (verse 7), there is neither delusion nor grief.
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {v2 && <VerseCard verse={v2} />}
          {v7 && <VerseCard verse={v7} />}
        </div>
      </section>

      {/* Step 4: Vidyā & Avidyā Synthesis */}
      <section id="vidya" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            १.४ · विद्या-अविद्या समन्वयः
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            The Two Wings of Resilience: Practical Competence & Transcendent Anchor
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              In verses 9–14, the Īśā issues its famous warning against extreme one-sidedness: those who pursue worldly mechanics (*avidyā*) alone enter blindness, but those who cling to transcendent abstraction (*vidyā*) enter greater darkness. True resilience integrates both: by empirical knowledge we navigate physical survival; by self-knowledge we realize immortality.
            </p>
          </div>
        </div>
      </section>
    </UpanishadPageShell>
  )
}
