import { useState } from 'react'
import UpanishadPageShell from '../../components/layout/UpanishadPageShell'
import upanishadsData from '../../content/upanishads.json'
import versesData from '../../content/verses.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import type { Verse } from '../../components/ui/VerseCard'
import type { UpanishadMeta } from '../../hooks/useJourneyProgress'

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

const aitareyaMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'aitareya')!
const prevMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'taittiriya')!
const nextMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'chandogya')!

const steps = [
  { id: 'inquiry', label: '1. Which Self Shall We Worship?' },
  { id: 'mahvakya', label: '2. Prajñānam Brahma (v. 3.1.3)' },
  { id: 'anchor', label: '3. Identity as Resilience' },
]

export default function AitareyaPage() {
  const [activeStep, setActiveStep] = useState('inquiry')
  const vAitareya = versesMap.get('aitareya-3-1-3')

  return (
    <UpanishadPageShell
      meta={aitareyaMeta}
      prev={{ title: prevMeta.title, path: prevMeta.path, devanagari: prevMeta.devanagari }}
      next={{ title: nextMeta.title, path: nextMeta.path, devanagari: nextMeta.devanagari, teaser: nextMeta.teaser }}
      steps={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
      resilienceInsight={{
        title: 'Consciousness as the Indivisible Foundation',
        text: 'The Aitareya asks the most fundamental question in ancient psychology: Who is this Self whom we worship? Is it that by which we see forms, hear sounds, smell scents, or distinguish the sweet from the bitter? The sage concludes that all these cognitive operations—perception, intellect, memory, intention, desire—are merely designations of Prajñāna (pure consciousness). When life strips away titles, faculties, and external validations, consciousness itself remains unbroken.',
      }}
      modernParallel={{
        title: 'The Hard Problem of Consciousness & Psychological Anchor',
        text: 'Modern cognitive science differentiates between mental contents (emotions, memories, sensations) and phenomenal consciousness itself (what it feels like to be aware). The Aitareya\'s Great Saying ("Prajñānam Brahma") provides the ultimate therapeutic anchor: psychological distress consists entirely of contents of consciousness; it cannot taint consciousness itself.',
      }}
      reflectPrompt="When all your roles, responsibilities, and emotional moods fall quiet, what is the simple awareness that remains?"
      sources={[
        'Aitareya Upaniṣad with the Commentary of Śaṅkarācārya, translated by Swami Gambhirananda, Advaita Ashrama, 1957.',
        'Radhakrishnan, S. The Principal Upaniṣads. London: George Allen & Unwin, 1953 (pp. 513–532).',
        'Müller, F. Max. Sacred Books of the East, Vol. 1: The Upanishads. Oxford: Clarendon Press, 1879.',
      ]}
      commentaryDrawer={{
        title: 'Śaṅkara on Prajñāna: The Eye and the Foundation of the Universe',
        content: (
          <>
            <p>
              In his commentary on Aitareya 3.1.3, Ādi Śaṅkara explains that *Prajñāna* is that by which one knows (*prajñāyate anena iti prajñānam*). It is not an ephemeral mental state, but the very nature of Brahman: pure, eternal, luminous awareness.
            </p>
            <p>
              The world is said to be guided by consciousness (*prajñānetro lokaḥ*) and supported by consciousness (*prajñā pratiṣṭhā*). Because this foundation cannot be added to or subtracted from by external gains or losses, the contemplative who rests in Prajñāna is permanently liberated from psychological collapse.
            </p>
          </>
        ),
      }}
    >
      {/* Editorial Note: Keeping content honest & verified */}
      <div className="p-4 rounded-xl border border-[var(--gold)]/20 bg-[var(--gold)]/5 text-xs text-[var(--gold)] text-center mb-8 font-[var(--font-marginalia)]">
        ✦ Editorial Note: The Aitareya Upaniṣad is traditionally concise (three chapters). In keeping with our verified research standards, this room focuses strictly on its core psychological contribution: the Mahāvākya "Prajñānam Brahma" and consciousness as the indestructible basis of identity.
      </div>

      {/* Step 1: The Inquiry */}
      <section id="inquiry" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ८.१ · कोऽयमात्मेति वयमुपास्महे
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Who is This Self?
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              The seers gather in deep meditation to trace the origin of mental processes. Is the Self the eye that sees? The ear that hears? The tongue that tastes? Or the mind that plans? They discover that all functional faculties are temporary instruments of a single underlying awareness.
            </p>
          </div>
        </div>
      </section>

      {/* Step 2: The Mahavakya (Verse 3.1.3) */}
      <section id="mahvakya" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            ८.२ · प्रज्ञानं ब्रह्म · The Great Declaration
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Consciousness is the Ground of Reality
          </h2>
        </div>

        {vAitareya && <FullWidthVerseBand verse={vAitareya} />}
      </section>

      {/* Step 3: Identity as Resilience */}
      <section id="anchor" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block">
            ८.३ · अभेदानुभूतिः
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Resilience as Unshakeable Identity
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              If your identity is tied to your physical endurance, illness destroys you. If your identity is tied to your social reputation, criticism shatters you. But if you know yourself as *Prajñāna*—the awareness in which bodily health, social roles, and even emotions arise and fade—your resilience becomes unshakeable. You cannot lose what you intrinsically are.
            </p>
          </div>
        </div>
      </section>
    </UpanishadPageShell>
  )
}
