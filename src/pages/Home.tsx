import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../../src/components/animations/Hero'
import Reveal from '../components/ui/Reveal'
import { useJourneyProgress } from '../hooks/useJourneyProgress'
import { useWorld } from '../components/foundation/ThreeWorldsProvider'
import { triggerPortalTransition } from '../components/animations/PortalTransition'

// New v4 Motion & Spacing Components
import PinnedStorytelling from '../components/home/PinnedStorytelling'
import SanskritMarquee from '../components/ui/SanskritMarquee'
import StatsCounterSection from '../components/home/StatsCounterSection'
import HorizontalUpanishadRail from '../components/home/HorizontalUpanishadRail'
import TiltCard from '../components/ui/TiltCard'
import DoubleLineFrame from '../components/ui/borders/DoubleLineFrame'
import MandalaBorderBand from '../components/ui/borders/MandalaBorderBand'
import RollingLink from '../components/ui/RollingLink'

export default function Home() {
  const { setWorld } = useWorld()
  const { resumePath, completedCount } = useJourneyProgress()

  useEffect(() => {
    setWorld('forest')
    document.title = 'Dhairya: The Unshaken Self — Psychological Resilience in the Upanishads'
  }, [setWorld])

  const handleBegin = (e: React.MouseEvent, path: string, title: string) => {
    e.preventDefault()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    triggerPortalTransition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      to: path,
      nextTitle: title,
    })
  }

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 overflow-x-hidden">
      {/* ── 1. HERO SECTION (MONUMENTAL & CLUTTER-FREE) ────── */}
      <Hero
        onBegin={(e) => handleBegin(e, '/prologue', 'Prologue: Śānti Pāṭha')}
        onResume={(e) => handleBegin(e, resumePath, 'Resuming Journey')}
        resumePath={resumePath}
        completedCount={completedCount}
      />

      {/* ── 2. PINNED SCROLL-SCRUBBED STORYTELLING (3 TRUTHS) ─ */}
      <PinnedStorytelling />

      {/* ── 3. VELOCITY-SENSITIVE SANSKRIT MARQUEE TICKER ─── */}
      <SanskritMarquee className="my-16" />

      {/* ── 4. WHAT YOU WILL FIND: CORPUS STATS COUNTERS ───── */}
      <StatsCounterSection />

      {/* ── 5. THE 12 STATIONS OF FORTITUDE (RAIL / GRID) ──── */}
      <div className="my-16 sm:my-24">
        <HorizontalUpanishadRail />
      </div>

      {/* ── 6. SIGNATURE EXPERIENCES PREVIEW (CHAMFERED CARDS) ─ */}
      <section
        className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center"
        style={{ paddingBlock: 'clamp(6rem, 14vh, 12rem)' }}
        aria-label="Signature Interactive Experiences"
      >
        <Reveal type="eyebrow" trigger="scroll" delay={0.05} debugLabel="Experiences Eyebrow">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-3">
            साधना अनुभवः · Interactive Psychotechnologies
          </span>
        </Reveal>

        <Reveal type="heading" trigger="scroll" delay={0.15} debugLabel="Experiences Heading">
          <h2 className="text-3xl sm:text-5xl font-[var(--font-heading)] text-[var(--text-primary)] max-w-3xl mx-auto leading-tight mb-4">
            Embodied Contemplation
          </h2>
        </Reveal>

        <Reveal type="body" trigger="scroll" delay={0.25} debugLabel="Experiences Description">
          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-serif max-w-[64ch] mx-auto leading-relaxed mb-16">
            Ten signature interactive instruments translating ancient Upanishadic psychology into somatic and cognitive practices.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Card 1: Chariot of the Self */}
          <TiltCard
            notched={true}
            maxTilt={6}
            lift={8}
            dataCursor="Experience"
            className="p-8 bg-[var(--surface)] shadow-md border border-[var(--border-color)]"
          >
            <div className="flex flex-col justify-between h-full min-h-[260px]">
              <div>
                <span className="text-3xl block mb-3">🏹</span>
                <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-1">
                  Kaṭha Upaniṣad
                </span>
                <h3 className="font-[var(--font-heading)] text-xl text-[var(--text-primary)] mb-2">
                  The Chariot Caravan
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Calibrate the wild horses of sensory impulses with the steady reins of intellect (*buddhi*).
                </p>
              </div>
              <div className="pt-6 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)]">3D Chariot Model</span>
                <RollingLink to="/upanishad/katha" className="text-[var(--gold)] font-bold">
                  Take Reins →
                </RollingLink>
              </div>
            </div>
          </TiltCard>

          {/* Card 2: Two Birds Witness */}
          <TiltCard
            notched={true}
            maxTilt={6}
            lift={8}
            dataCursor="Experience"
            className="p-8 bg-[var(--surface)] shadow-md border border-[var(--border-color)]"
          >
            <div className="flex flex-col justify-between h-full min-h-[260px]">
              <div>
                <span className="text-3xl block mb-3">🦅</span>
                <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-1">
                  Muṇḍaka Upaniṣad
                </span>
                <h3 className="font-[var(--font-heading)] text-xl text-[var(--text-primary)] mb-2">
                  The Two Birds Witness
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Shift from the trembling bird eating bitter fruit to the golden bird watching in serene silence.
                </p>
              </div>
              <div className="pt-6 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)]">Interactive Dual-Self</span>
                <RollingLink to="/upanishad/mundaka" className="text-[var(--gold)] font-bold">
                  Observe →
                </RollingLink>
              </div>
            </div>
          </TiltCard>

          {/* Card 3: Four States Wheel */}
          <TiltCard
            notched={true}
            maxTilt={6}
            lift={8}
            dataCursor="Experience"
            className="p-8 bg-[var(--surface)] shadow-md border border-[var(--border-color)]"
          >
            <div className="flex flex-col justify-between h-full min-h-[260px]">
              <div>
                <span className="text-3xl block mb-3">🌀</span>
                <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-1">
                  Māṇḍūkya Upaniṣad
                </span>
                <h3 className="font-[var(--font-heading)] text-xl text-[var(--text-primary)] mb-2">
                  The Four States Wheel
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Navigate waking, dreaming, deep sleep, and the fourth silent witness (*Turīya*) through sacred sound.
                </p>
              </div>
              <div className="pt-6 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)]">AUM Audio Resonance</span>
                <RollingLink to="/upanishad/mandukya" className="text-[var(--gold)] font-bold">
                  Rotate Wheel →
                </RollingLink>
              </div>
            </div>
          </TiltCard>
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/experiences"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[var(--gold)]/40 hover:border-[var(--gold)] bg-[var(--surface)]/80 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all shadow-sm"
          >
            <span>Explore All 10 Signature Modules</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* ── 7. RESEARCH JOURNAL PREVIEW (DOUBLE-LINE FRAME) ─── */}
      <section
        className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center"
        style={{ paddingBlock: 'clamp(4rem, 10vh, 8rem)' }}
        aria-label="Research Journal Preview"
      >
        <DoubleLineFrame className="p-8 sm:p-14 rounded-3xl bg-[var(--surface-sunken)] shadow-sm">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-3">
            अनुसन्धान पत्रिका · Curatorial Research
          </span>
          <h2 className="text-2xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)] mb-4">
            The Dhairya Research Journal
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-serif max-w-[64ch] mx-auto leading-relaxed mb-8">
            Peer-reviewed explorations comparing classical Advaitic psychology, Śaṅkarācārya's commentaries, and contemporary cognitive science (ACT, Polyvagal Theory, Internal Family Systems).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-3xl mx-auto mb-10">
            <Link
              to="/journal/boy-who-argued-with-death"
              className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--gold)] transition-all shadow-xs block group"
            >
              <span className="text-[10px] uppercase tracking-wider text-[var(--gold)] font-mono block mb-1">
                Essay · Kaṭha Upaniṣad
              </span>
              <h4 className="font-[var(--font-heading)] text-base text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors">
                The Boy Who Argued with Death
              </h4>
              <p className="text-xs text-[var(--text-muted)] mt-2 line-clamp-2">
                Nachiketa's three boons as an archetype of existential distress tolerance and non-negotiable truth inquiry.
              </p>
            </Link>

            <Link
              to="/journal/panchakosha-burnout-five-layers"
              className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--gold)] transition-all shadow-xs block group"
            >
              <span className="text-[10px] uppercase tracking-wider text-[var(--saffron)] font-mono block mb-1">
                Essay · Taittirīya Upaniṣad
              </span>
              <h4 className="font-[var(--font-heading)] text-base text-[var(--text-primary)] group-hover:text-[var(--saffron)] transition-colors">
                The Anatomy of Burnout: Five Sheaths
              </h4>
              <p className="text-xs text-[var(--text-muted)] mt-2 line-clamp-2">
                How modern exhaustion misdiagnoses spiritual atrophy (*ānandamayakosha*) as mere physical fatigue.
              </p>
            </Link>
          </div>

          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[var(--gold)] hover:underline"
          >
            <span>Read All 18 Journal Essays</span>
            <span>→</span>
          </Link>
        </DoubleLineFrame>
      </section>

      {/* ── 8. FOOTER SANCTUARY & CREDITS TEASER ────────────── */}
      <footer
        className="border-t border-[var(--border-color)] bg-[var(--surface)] text-center transition-colors duration-500"
        style={{ paddingBlock: 'clamp(5rem, 10vh, 8rem)' }}
      >
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
          <div className="w-full max-w-md mx-auto mb-8 opacity-40">
            <MandalaBorderBand height={12} opacity={0.3} />
          </div>

          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' })
              window.dispatchEvent(new CustomEvent('replay-intro'))
            }}
            className="w-12 h-12 rounded-full border border-[var(--gold)]/40 bg-[var(--surface)] text-[var(--gold)] hover:text-[var(--gold-light)] hover:scale-110 flex items-center justify-center mb-4 transition-all cursor-pointer shadow-sm group"
            title="Replay intro sequence"
            aria-label="Replay intro"
          >
            <span className="sanskrit text-lg group-hover:rotate-12 transition-transform">ॐ</span>
          </button>

          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-2">
            धैर्य · The Unshaken Self
          </span>

          <p className="text-sm text-[var(--text-muted)] italic font-serif max-w-md mx-auto mb-8">
            "The storm moves the tree. It does not move the ground."
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--text-muted)] font-serif mb-8">
            <Link to="/prologue" className="hover:text-[var(--gold)] transition-colors">Prologue</Link>
            <span>·</span>
            <Link to="/corpus" className="hover:text-[var(--gold)] transition-colors">Corpus & Sages</Link>
            <span>·</span>
            <Link to="/verses" className="hover:text-[var(--gold)] transition-colors">Verse Library</Link>
            <span>·</span>
            <Link to="/glossary" className="hover:text-[var(--gold)] transition-colors">Glossary</Link>
            <span>·</span>
            <Link to="/bibliography" className="hover:text-[var(--gold)] transition-colors">Bibliography</Link>
            <span>·</span>
            <Link to="/quiz" className="hover:text-[var(--gold)] transition-colors">Quiz</Link>
            <span>·</span>
            <Link to="/experiences" className="hover:text-[var(--gold)] transition-colors">Experiences</Link>
            <span>·</span>
            <Link to="/journal" className="hover:text-[var(--gold)] transition-colors">Journal</Link>
            <span>·</span>
            <Link to="/credits" className="text-[var(--gold)] font-bold hover:underline transition-colors">
              Credits & Benediction
            </Link>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] font-mono">
            An Indian Knowledge System (IKS) Research Project · IKS-DH-2026
          </p>
        </div>
      </footer>
    </div>
  )
}
