import { useState } from 'react'
import UpanishadPageShell from '../../components/layout/UpanishadPageShell'
import upanishadsData from '../../content/upanishads.json'
import versesData from '../../content/verses.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import Reveal from '../../components/ui/Reveal'
import type { Verse } from '../../components/ui/VerseCard'
import type { UpanishadMeta } from '../../hooks/useJourneyProgress'

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

const kenaMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'kena')!
const prevMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'isha')!
const nextMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'katha')!

const steps = [
  { id: 'inquiry', label: '1. The Initial Question (v. 1)' },
  { id: 'defusion', label: '2. Cognitive Defusion' },
  { id: 'parable', label: '3. Parable of the Gods' },
]

export default function KenaPage() {
  const [activeStep, setActiveStep] = useState('inquiry')
  const v1 = versesMap.get('kena-1-1')

  return (
    <UpanishadPageShell
      meta={kenaMeta}
      prev={{ title: prevMeta.title, path: prevMeta.path, devanagari: prevMeta.devanagari }}
      next={{ title: nextMeta.title, path: nextMeta.path, devanagari: nextMeta.devanagari, teaser: nextMeta.teaser }}
      steps={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
      resilienceInsight={{
        title: 'De-Centring the Mind: You Are the Witness, Not the Turbulence',
        text: 'When we panic, we believe we ARE the racing thoughts. Kena begins by asking: By whom impelled does the mind fly forth? The moment you ask "Who is watching this mind?", the identification snaps. The mind is revealed as an instrument in the foreground, while your real identity is the unmoved background awareness.',
      }}
      modernParallel={{
        title: 'Metacognitive Awareness & ACT Defusion',
        text: 'In Acceptance and Commitment Therapy (ACT), cognitive defusion trains individuals to see thoughts as transient cognitive events rather than literal truths. Kena pioneered this metacognitive leap: "That which cannot be thought by the mind, but by which the mind itself is perceived—know That alone as Brahman."',
      }}
      reflectPrompt="When your thoughts race with anxiety, who is the quiet presence listening to them?"
      sources={[
        'Kena Upaniṣad with the Commentary of Śaṅkarācārya, translated by Swami Gambhirananda, Advaita Ashrama, 1957.',
        'Radhakrishnan, S. The Principal Upaniṣads. London: George Allen & Unwin, 1953 (pp. 579–592).',
        'Müller, F. Max. Sacred Books of the East, Vol. 1: The Upanishads. Oxford: Clarendon Press, 1879.',
      ]}
      commentaryDrawer={{
        title: 'Śaṅkara on Kena: The Ear of the Ear, the Mind of the Mind',
        content: (
          <>
            <p>
              In his commentary on verse 1.2 (*Śrotasya śrotraṃ manaso mano yad*), Śaṅkara explains that consciousness does not possess organs; rather, all sense faculties are like unlit lamps that derive their illuminating power from the single witness consciousness (Ātman).
            </p>
            <p>
              The subsequent parable of the gods (Agni and Vāyu failing to burn or move a simple blade of grass when pride grips them) illustrates that our personal psychological energy is borrowing its power from the cosmic ground. When pride and panic collapse, the stillness of the Supreme shines unobstructed.
            </p>
          </>
        ),
      }}
    >
      {/* ── Step 1: The Initial Question ── */}
      <section id="inquiry" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <Reveal type="eyebrow" trigger="mount" stepId={activeStep} delay={0.05} debugLabel="Step 1 Eyebrow">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
              २.१ · प्रश्नोपक्रमः
            </span>
          </Reveal>
          <Reveal type="heading" trigger="mount" stepId={activeStep} delay={0.15} debugLabel="Step 1 Heading">
            <h2
              className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
            >
              By Whom Impelled Does the Mind Fly Forth?
            </h2>
          </Reveal>
          <Reveal type="body" trigger="mount" stepId={activeStep} delay={0.25} debugLabel="Step 1 Body">
            <div className="w-full max-w-[68ch] mx-auto text-left">
              <p
                className="text-[var(--text-secondary)] leading-relaxed text-justify sm:text-left"
                style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
              >
                The disciple asks the teacher: By whose will directed does the mind light upon its objects? By whose command does the first breath move? By whose will do people utter speech? What god directs the eye and the ear?
              </p>
            </div>
          </Reveal>
          {/* Centered Tags Row */}
          <Reveal type="pop-tags" trigger="mount" stepId={activeStep} delay={0.35} debugLabel="Step 1 Tags">
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {['Inquiry', 'Metacognition', 'Ego-Deconstruction', 'Curiosity'].map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-[var(--surface-sunken)] text-[var(--text-muted)] border border-[var(--border-hairline)] font-[var(--font-marginalia)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {v1 && <FullWidthVerseBand verse={v1} />}
      </section>

      {/* ── Step 2: Cognitive Defusion ── */}
      <section id="defusion" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <Reveal type="eyebrow" trigger="mount" stepId={activeStep} delay={0.05} debugLabel="Step 2 Eyebrow">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block">
              २.२ · आत्म-मनो विवेकः
            </span>
          </Reveal>
          <Reveal type="heading" trigger="mount" stepId={activeStep} delay={0.15} debugLabel="Step 2 Heading">
            <h2
              className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
            >
              The Mind is Not the Final Master
            </h2>
          </Reveal>
          <Reveal type="body" trigger="mount" stepId={activeStep} delay={0.25} debugLabel="Step 2 Body">
            <div className="w-full max-w-[68ch] mx-auto text-left">
              <p
                className="text-[var(--text-secondary)] leading-relaxed"
                style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
              >
                Most emotional suffering occurs because we believe our thoughts have absolute authority over reality. The Kena seer dismantles this tyranny by pointing out that the mind is merely an object of awareness, never the ultimate subject. When emotional storms hit, you can rest in that which observes the storm without getting wet.
              </p>
            </div>
          </Reveal>
          {/* Centered Tags Row */}
          <Reveal type="pop-tags" trigger="mount" stepId={activeStep} delay={0.35} debugLabel="Step 2 Tags">
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {['Cognitive Defusion', 'Observer Self', 'Emotional Equanimity'].map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-[var(--surface-sunken)] text-[var(--text-muted)] border border-[var(--border-hairline)] font-[var(--font-marginalia)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Step 3: Parable of the Gods ── */}
      <section id="parable" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <Reveal type="eyebrow" trigger="mount" stepId={activeStep} delay={0.05} debugLabel="Step 3 Eyebrow">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
              २.३ · यक्ष उपाख्यानम्
            </span>
          </Reveal>
          <Reveal type="heading" trigger="mount" stepId={activeStep} delay={0.15} debugLabel="Step 3 Heading">
            <h2
              className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
            >
              The Humbling of Agni & Vāyu
            </h2>
          </Reveal>
          <Reveal type="body" trigger="mount" stepId={activeStep} delay={0.25} debugLabel="Step 3 Body">
            <div className="w-full max-w-[68ch] mx-auto text-left">
              <p
                className="text-[var(--text-secondary)] leading-relaxed"
                style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
              >
                In chapter 3, Fire (Agni) boasts he can burn anything, and Wind (Vāyu) boasts he can blow away anything. A mysterious Yakṣa (Brahman in disguise) places a single blade of dry straw before them. Neither can burn nor move it. The parable teaches that our cognitive faculties function only by virtue of the underlying ground. Remembering this dissolves psychological inflation and acute vulnerability.
              </p>
            </div>
          </Reveal>
          {/* Centered Tags Row */}
          <Reveal type="pop-tags" trigger="mount" stepId={activeStep} delay={0.35} debugLabel="Step 3 Tags">
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {['Humility', 'Psychological Inflation', 'Underlying Ground'].map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-[var(--surface-sunken)] text-[var(--text-muted)] border border-[var(--border-hairline)] font-[var(--font-marginalia)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </UpanishadPageShell>
  )
}
