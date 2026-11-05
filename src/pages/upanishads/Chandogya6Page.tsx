import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useWorld } from '../../components/foundation/ThreeWorldsProvider'
import versesData from '../../content/verses.json'
import FullWidthVerseBand from '../../components/ui/FullWidthVerseBand'
import VerseCard from '../../components/ui/VerseCard'
import type { Verse } from '../../components/ui/VerseCard'

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach(v => versesMap.set(v.id, v))

export default function Chandogya6Page() {
  const { setWorld } = useWorld()

  useEffect(() => {
    setWorld('forest')
    document.title = 'Chāndogya 6: Tat Tvam Asi & Uddālaka — Dhairya'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [setWorld])

  const vTat = versesMap.get('chandogya-6-8-7')
  const vBanyan = versesMap.get('chandogya-6-12')
  const vSalt = versesMap.get('chandogya-6-13')

  return (
    <div
      className="page-container min-h-screen"
      style={{
        width: '100%',
        marginInline: 'auto',
        paddingInline: 'clamp(1.25rem, 5vw, 6rem)',
        paddingTop: 'var(--header-height, 64px)',
        paddingBottom: 'clamp(4rem, 6vw, 6rem)',
      }}
    >
      <div className="w-full max-w-[1100px] mx-auto flex flex-col items-center">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[var(--text-muted)] flex items-center justify-center gap-2">
          <Link to="/" className="hover:text-[var(--gold)]">Home</Link>
          <span>/</span>
          <Link to="/upanishad/chandogya" className="hover:text-[var(--gold)]">Chāndogya Upaniṣad</Link>
          <span>/</span>
          <span className="text-[var(--gold)] font-semibold">Chapter 6 (Uddālaka & Śvetaketu)</span>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-2">
            छान्दोग्योपनिषत् · षष्ठोऽध्यायः
          </span>
          <h1
            className="font-[var(--font-heading)] text-[var(--text-primary)] text-balance mx-auto mb-2"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
          >
            Tat Tvam Asi: The Indestructible Identity
          </h1>
          <p className="text-sm sm:text-base font-[var(--font-heading-alt)] text-[var(--gold)] tracking-widest uppercase">
            Uddālaka's 9 Parables of Subtle Reality
          </p>
        </header>

      {/* Main Dialogue Content */}
      <section className="space-y-12">
        {vTat && <FullWidthVerseBand verse={vTat} />}

        {/* The Two Archetypal Parables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          {/* Parable 1: The Banyan Seed */}
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--gold)]/30 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
              १. वटबीज दृष्टान्तः · The Banyan Seed
            </span>
            <h3 className="font-[var(--font-heading)] text-xl text-[var(--text-primary)]">
              The Power in What Seems to Be Nothing
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              "Bring me a fruit of the banyan tree," said the father. "Break it. What do you see?" "Extremely tiny seeds, father." "Break one of the seeds. What do you see inside?" "Nothing at all, father." The father smiled: "My son, from that very subtlety which you cannot see, this gigantic banyan tree grows. Believe me, that subtle essence is the truth of all this. That is the Self. That Thou Art, Śvetaketu."
            </p>
            {vBanyan && <VerseCard verse={vBanyan} />}
          </div>

          {/* Parable 2: The Salt in Water */}
          <div className="p-6 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-color)] space-y-4">
            <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block">
              २. लवणतोय दृष्टान्तः · Salt in Water
            </span>
            <h3 className="font-[var(--font-heading)] text-xl text-[var(--text-primary)]">
              Invisible Yet Omnipresent Essence
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              "Put this salt into water and come back tomorrow morning," instructed Uddālaka. The next morning, the father asked: "Bring me the salt." Śvetaketu looked into the water, but the salt was gone. "Sip from the surface. How is it?" "Salty." "Sip from the middle. How is it?" "Salty." "Sip from the bottom. How is it?" "Salty." "You cannot see the salt with your eyes, yet it pervades every drop. So too does the immortal Self pervade your entire existence."
            </p>
            {vSalt && <VerseCard verse={vSalt} />}
          </div>
        </div>

        {/* Psychological Insight */}
        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-hairline)] text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
          <h4 className="font-bold text-[var(--text-primary)] font-[var(--font-heading)] text-base">
            The Psychological Antidote to Fragility
          </h4>
          <p>
            When we identify exclusively with the visible gross body or our temporary social position, every external setback threatens our existence. Uddālaka systematically trains the mind to identify with the invisible, pervasive essence (*aṇimā*). You are not the fragile leaf that falls in autumn; you are the sap that gives life to the entire tree.
          </p>
        </div>
      </section>

        {/* Return to Chandogya Hub */}
        <div className="w-full mt-16 pt-8 border-t border-[var(--border-color)] flex items-center justify-between">
          <Link
            to="/upanishad/chandogya"
            className="inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:underline font-bold"
          >
            ← Return to Chāndogya Overview
          </Link>
          <Link
            to="/chandogya/7"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--gold)] text-[#2B1B10] font-bold text-xs uppercase tracking-wider hover:bg-[var(--gold-light)] transition-all shadow-md"
          >
            <span>Chāndogya 7: Nārada's Sorrow →</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
