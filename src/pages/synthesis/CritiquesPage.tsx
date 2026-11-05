import { useEffect } from 'react'
import { useWorld } from '../../components/foundation/ThreeWorldsProvider'
import ch16 from '../../content/chapters/chapter-16.json'
import ContinueBar from '../../components/layout/ContinueBar'

export default function CritiquesPage() {
  const { setWorld } = useWorld()

  useEffect(() => {
    setWorld('cave')
    document.title = 'Critiques & Honest Limits — Dhairya'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [setWorld])

  return (
    <div className="page-container min-h-screen pb-20">
      <div className="content-column">
        {/* Header */}
      <header className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-xs font-[var(--font-marginalia)] uppercase tracking-widest text-[var(--gold)] mb-4">
          सीमा विमर्शः · Honest Limits
        </div>
        <h1 className="text-3xl sm:text-5xl font-[var(--font-heading)] text-[var(--text-primary)]">
          Critiques & The Boundaries of Resilience
        </h1>
        <p className="text-base sm:text-lg font-[var(--font-heading-alt)] text-[var(--gold)] mt-2 tracking-widest uppercase">
          Avoiding Spiritual Bypassing & Validating Human Pain
        </p>
        <p className="text-sm text-[var(--text-muted)] mt-2 italic max-w-xl mx-auto">
          "A philosophy of resilience that cannot look grief, trauma, and structural oppression in the eye is not wisdom—it is escapism."
        </p>
      </header>

      {/* Core Scholarly Critiques */}
      <section className="space-y-8 mb-16">
        <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] prose prose-invert max-w-none text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
          <p className="first-letter:text-5xl first-letter:font-[var(--font-heading)] first-letter:text-[var(--gold)] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            {ch16.content[0]?.text}
          </p>
          <p>{ch16.content[1]?.text}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--gold)]/30 space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)] font-bold block">
              १. The Danger of Spiritual Bypassing
            </span>
            <h3 className="font-[var(--font-heading)] text-lg text-[var(--text-primary)]">
              Metaphysics Must Not Gaslight Grief
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Telling someone who is grieving or traumatized that "the world is an illusion (*Māyā*)" or "your soul cannot feel pain" is toxic spiritual bypassing. In the Upaniṣads, sages weep, kings grieve, and disciples express genuine sorrow. *Dhairya* does not deny sorrow; it provides an unshakeable ground upon which tears can be shed safely.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-color)] space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] font-bold block">
              २. Structural Oppression vs Inner Fortitude
            </span>
            <h3 className="font-[var(--font-heading)] text-lg text-[var(--text-primary)]">
              Resilience is Not an Excuse for Injustice
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Demanding that marginalized or exploited populations practice "inner stoicism" while systems oppress them is a misuse of contemplative philosophy. Psychological resilience empowers the individual to survive and dismantle injustice with clear vision, but it never excuses the perpetrators of harm.
            </p>
          </div>
        </div>

        {/* Sources */}
        <div className="p-6 rounded-2xl bg-[var(--surface)]/40 border border-[var(--border-hairline)] text-xs text-[var(--text-muted)] space-y-2">
          <span className="font-bold text-[var(--text-primary)] block font-[var(--font-heading)]">
            Critical Scholarly References
          </span>
          <ul className="list-disc list-inside space-y-1">
            {ch16.sources.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Continue Navigation Bar */}
      <ContinueBar
        currentIndex={12}
        totalCount={12}
        prev={{
          title: 'Contemplative Toolkit',
          path: '/practices',
          devanagari: 'अभ्यासः',
        }}
        next={{
          title: 'Epilogue: Asato Mā Sad Gamaya',
          path: '/epilogue',
          devanagari: 'उपसंहारः',
          teaser: 'From the unreal lead me to the Real: the final benediction and ॐ constellation.',
        }}
      />
      </div>
    </div>
  )
}
