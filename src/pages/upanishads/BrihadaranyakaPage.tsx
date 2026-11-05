import { useState } from 'react'
import { Link } from 'react-router-dom'
import UpanishadPageShell from '../../components/layout/UpanishadPageShell'
import upanishadsData from '../../content/upanishads.json'
import versesData from '../../content/verses.json'
import ch8 from '../../content/chapters/chapter-08.json'
import ch14 from '../../content/chapters/chapter-14.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import VerseCard from '../../components/ui/VerseCard'
import type { Verse } from '../../components/ui/VerseCard'
import type { UpanishadMeta } from '../../hooks/useJourneyProgress'

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

const brihadMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'brihadaranyaka')!
const prevMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'chandogya')!
const nextMeta = (upanishadsData as UpanishadMeta[]).find(u => u.slug === 'shvetashvatara')!

const steps = [
  { id: 'overview', label: '1. The Great Forest' },
  { id: 'chambers', label: '2. The Three Sub-Chambers' },
  { id: 'light', label: '3. The Light Within (v. 4.3.6)' },
  { id: 'titiksha', label: '4. Titikṣā (v. 4.4.23)' },
]

export default function BrihadaranyakaPage() {
  const [activeStep, setActiveStep] = useState('overview')

  const vLight = versesMap.get('brhadaranyaka-4-3-6')
  const vTitiksha = versesMap.get('brhadaranyaka-4-4-23')
  const vDaDaDa = versesMap.get('brhadaranyaka-5-2-3')

  return (
    <UpanishadPageShell
      meta={brihadMeta}
      prev={{ title: prevMeta.title, path: prevMeta.path, devanagari: prevMeta.devanagari }}
      next={{ title: nextMeta.title, path: nextMeta.path, devanagari: nextMeta.devanagari, teaser: nextMeta.teaser }}
      steps={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
      resilienceInsight={{
        title: 'Titikṣā: Forbearance Without Psychic Bitterness',
        text: 'The Bṛhadāraṇyaka defines the hallmarks of the sage in 4.4.23: calm (*śānta*), self-controlled (*dānta*), withdrawn (*uparati*), forbearing (*titikṣu*), and concentrated (*samāhita*). Titikṣā is not passive resignation or victimhood; it is the conscious ability to absorb external shocks and thermal changes without allowing resentment to poison the inner spring of consciousness.',
      }}
      modernParallel={{
        title: 'Affect Tolerance & Stoic Psychological Equanimity',
        text: 'Contemporary dialectical behavior therapy (DBT) teaches distress tolerance—the capacity to withstand negative emotional states without resorting to impulsive escapes. The Bṛhadāraṇyaka\'s concept of Titikṣā parallels this clinical principle, providing metaphysical anchoring: when heat and cold, praise and blame strike, they touch only the psychological periphery; the inner witness remains whole.',
      }}
      reflectPrompt="Can you tolerate discomfort without inventing an enemy to blame for it?"
      sources={[...ch8.sources, ...ch14.sources]}
      commentaryDrawer={{
        title: 'Śaṅkara on the Assembly of King Janaka and the Three Syllables of Thunder',
        content: (
          <>
            <p>
              In chapter 5, the Supreme Father Prajāpati utters a single thunderclap syllable "DA" to three classes of beings: gods, humans, and demons. Each hears the remedy for their dominant psychological vulnerability:
              The gods, prone to sensory indulgence, hear *Dāmyata* ("Cultivate self-mastery").
              Humans, prone to greed and grasping, hear *Datta* ("Give generously").
              The demons, prone to cruelty and wrath, hear *Dayadhvam* ("Practice compassion").
            </p>
            <p>
              Śaṅkara notes that these three groups are not mythological species in separate worlds, but three behavioral tendencies within every human mind. Psychological resilience requires balancing restraint, generosity, and boundless empathy.
            </p>
          </>
        ),
      }}
    >
      {/* Step 1: The Great Forest */}
      <section id="overview" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            १०.१ · बृहदारण्यकोपनिषत्
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            The Great Forest of Consciousness
          </h2>
          <div className="w-full max-w-[68ch] mx-auto text-left">
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', lineHeight: 1.75 }}
            >
              The largest and most intellectually daring of all Upaniṣads, home to the philosophical tournament at King Janaka's court, Yājñavalkya's dialogues, and the profound realization that dread dissolves when non-duality is understood.
            </p>
          </div>
        </div>
      </section>

      {/* Step 2: The Three Sub-Chambers */}
      <section id="chambers" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            गहन अन्वेषणम् · Specialized Chambers
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Explore the Three Bṛhadāraṇyaka Sanctuaries
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/brihadaranyaka/fear"
            className="group p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--gold)] transition-all shadow-sm hover:scale-[1.02]"
          >
            <span className="text-[10px] font-bold font-[var(--font-marginalia)] uppercase tracking-widest text-[var(--gold)] block mb-2">
              Chamber 1 · भय विलयः
            </span>
            <h3 className="font-[var(--font-heading-alt)] text-lg text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors mb-2">
              Fear Needs a Second
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Why dread arises exclusively from perceived separation, and the interactive Fear Dissolve meditation.
            </p>
            <span className="text-xs text-[var(--gold)] font-bold block mt-4 group-hover:translate-x-1 transition-transform">
              Enter Chamber →
            </span>
          </Link>

          <Link
            to="/brihadaranyaka/discipline"
            className="group p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--gold)] transition-all shadow-sm hover:scale-[1.02]"
          >
            <span className="text-[10px] font-bold font-[var(--font-marginalia)] uppercase tracking-widest text-[var(--saffron)] block mb-2">
              Chamber 2 · तितिक्षा व दमः
            </span>
            <h3 className="font-[var(--font-heading-alt)] text-lg text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors mb-2">
              Titikṣā & The Thunder
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Enduring friction without rancor, and the three divine syllables of thunder: Dāmyata, Datta, Dayadhvam.
            </p>
            <span className="text-xs text-[var(--gold)] font-bold block mt-4 group-hover:translate-x-1 transition-transform">
              Enter Chamber →
            </span>
          </Link>

          <Link
            to="/brihadaranyaka/women-sages"
            className="group p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--gold)] transition-all shadow-sm hover:scale-[1.02]"
          >
            <span className="text-[10px] font-bold font-[var(--font-marginalia)] uppercase tracking-widest text-[var(--gold)] block mb-2">
              Chamber 3 · विदुषी संकुल
            </span>
            <h3 className="font-[var(--font-heading-alt)] text-lg text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors mb-2">
              Gārgī & Maitreyī
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Dialectical audacity: Gārgī pins Yājñavalkya against the cosmic loom; Maitreyī chooses immortality over all wealth.
            </p>
            <span className="text-xs text-[var(--gold)] font-bold block mt-4 group-hover:translate-x-1 transition-transform">
              Enter Chamber →
            </span>
          </Link>
        </div>
      </section>

      {/* Step 3: The Light Within (Verse 4.3.6) */}
      <section id="light" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
            १०.२ · आत्मैवास्य ज्योतिर्भवति
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            When Sun, Moon, and Fire Go Out: The Unextinguished Light
          </h2>
        </div>

        {vLight && <FullWidthVerseBand verse={vLight} />}
      </section>

      {/* Step 4: Titiksha & Da-Da-Da */}
      <section id="titiksha" className="w-full max-w-[1000px] mx-auto space-y-8 flex flex-col items-center">
        <div className="w-full p-8 sm:p-10 rounded-[20px] bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-center space-y-4">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block">
            १०.३ · तितिक्षा व दमः
          </span>
          <h2
            className="font-[var(--font-heading-alt)] font-semibold text-[var(--text-primary)] text-balance mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Endurance Without Bitterness
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {vTitiksha && <VerseCard verse={vTitiksha} />}
          {vDaDaDa && <VerseCard verse={vDaDaDa} />}
        </div>
      </section>
    </UpanishadPageShell>
  )
}
