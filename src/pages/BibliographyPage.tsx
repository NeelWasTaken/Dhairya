import { Link } from 'react-router-dom'
import bibliographyData from '../content/bibliography.json'

export default function BibliographyPage() {
  const { primarySources, indianPsychology, modernResilience } = bibliographyData

  return (
    <div className="page-container min-h-screen pb-20">
      <div className="content-column max-w-5xl">
        <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--saffron)] hover:text-[var(--vermilion)] font-[var(--font-marginalia)]"
        >
          ← Return to Sanctuary
        </Link>
      </div>

      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)]">
          Scholarly Citations & Critical Apparatus
        </span>
        <h1 className="text-3xl md:text-5xl font-bold mt-2 text-[var(--ink)]">
          Annotated Bibliography
        </h1>
        <p className="text-base text-[var(--text-muted)] italic max-w-2xl mx-auto mt-3">
          All translations are either original scholarly renderings or public-domain editions (Max Müller, SBE). Modern literature is cited strictly for comparative dialogue.
        </p>
      </div>

      {/* SECTION 1: PRIMARY TEXTS & TRANSLATIONS */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-6 border-b border-[var(--border-color)] pb-3">
          <span className="text-2xl">📜</span>
          <h2 className="text-2xl font-bold text-[var(--ink)]">
            Primary Sanskrit Texts & Classical Translations
          </h2>
        </div>
        <div className="space-y-6">
          {primarySources.map((item, i) => (
            <div key={i} className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm">
              <h3 className="text-base font-bold text-[var(--ink)]">
                {item.author} ({item.year}). <em className="text-[var(--vermilion)]">{item.title}</em>.
              </h3>
              <p className="text-xs text-[var(--text-muted)] mb-2 font-[var(--font-marginalia)]">
                {item.publisher}, {item.location}. {item.volume || ''}
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: SCHOLARSHIP ON INDIAN PSYCHOLOGY */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-6 border-b border-[var(--border-color)] pb-3">
          <span className="text-2xl">🧠</span>
          <h2 className="text-2xl font-bold text-[var(--ink)]">
            Scholarship on Indian Psychology & Epistemology
          </h2>
        </div>
        <div className="space-y-6">
          {indianPsychology.map((item, i) => (
            <div key={i} className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm">
              <h3 className="text-base font-bold text-[var(--ink)]">
                {item.author} ({item.year}). <em className="text-[var(--saffron)]">{item.title}</em>.
              </h3>
              <p className="text-xs text-[var(--text-muted)] mb-2 font-[var(--font-marginalia)]">
                {item.publisher}, {item.location}.
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: MODERN RESILIENCE PSYCHOLOGY */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-6 border-b border-[var(--border-color)] pb-3">
          <span className="text-2xl">🛡️</span>
          <h2 className="text-2xl font-bold text-[var(--ink)]">
            Modern Resilience & Cognitive Psychology
          </h2>
        </div>
        <p className="text-xs text-[var(--text-muted)] italic mb-4">
          Note: These contemporary works are cited strictly as dialogue partners and comparative models, not to suggest that ancient seers "predicted" modern clinical findings.
        </p>
        <div className="space-y-6">
          {modernResilience.map((item, i) => (
            <div key={i} className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm">
              <h3 className="text-base font-bold text-[var(--ink)]">
                {item.author} ({item.year}). "{item.title}."
              </h3>
              <p className="text-xs text-[var(--text-muted)] mb-2 font-[var(--font-marginalia)]">
                {item.journal ? `${item.journal}, ${item.volume}` : `${item.publisher}, ${item.location}`}
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  )
}
