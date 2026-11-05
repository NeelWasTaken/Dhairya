import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  const [copiedCitation, setCopiedCitation] = useState(false)
  return (
    <div className="page-container min-h-screen pb-20">
      <div className="content-column max-w-4xl">
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
          Scholarly Integrity & Ethical Charter
        </span>
        <h1 className="text-3xl md:text-5xl font-bold mt-2 text-[var(--ink)]">
          About "Dhairya — The Unshaken Self"
        </h1>
        <p className="text-base text-[var(--text-muted)] italic max-w-2xl mx-auto mt-3">
          A deep-research, digital humanities project exploring the psychological systems of resilience embedded within ancient Indian thought.
        </p>
      </div>

      <div className="space-y-10 text-[var(--text-primary)] leading-relaxed text-base">
        {/* Thesis */}
        <section className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
          <h2 className="text-xl font-bold text-[var(--ink)] mb-3 flex items-center gap-2">
            <span>🎯</span> Project Concept & Thesis
          </h2>
          <p className="mb-3">
            <strong>Dhairya (धैर्य)</strong> demonstrates that the classical Upaniṣads (c. 800 BCE – 200 BCE) hold one of the world's oldest, most comprehensive psychologies of human resilience. Unlike contemporary models that often define resilience solely as "bouncing back" to functional equilibrium after acute trauma, the Upaniṣadic paradigm models resilience as <strong>abiding in an unshakeable, fear-free conscious ground (Ātman) while life moves</strong>.
          </p>
          <blockquote className="italic border-l-4 border-[var(--saffron)] pl-4 my-3 text-[var(--ink-light)]">
            "The storm moves the tree. It does not move the ground."
          </blockquote>
          <p>
            Through fearlessness (<em>abhaya</em>), cognitive endurance (<em>titikṣā</em>), discriminative wisdom (<em>viveka</em>), self-regulation (<em>manas-nigraha</em>), values-alignment (<em>śreyas</em>), and direct identity beyond mortal fragility (<em>ātma-jñāna</em>), the seeker discovers that their bedrock identity was never broken.
          </p>
        </section>

        {/* Hard Rule — No Fabrication */}
        <section className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
          <h2 className="text-xl font-bold text-[var(--ink)] mb-3 flex items-center gap-2">
            <span>⚖️</span> Strict Scholarly Rules: No Fabrication
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-[var(--text-secondary)]">
            <li>
              <strong>Verified Textual Citations:</strong> Every Sanskrit verse, chapter-verse coordinates, and commentary attribution has been cross-referenced against reputable critical editions (GRETIL, SanskritDocuments, Patrick Olivelle 1998, Sarvepalli Radhakrishnan 1953).
            </li>
            <li>
              <strong>Copyright Integrity:</strong> No copyrighted modern translations have been reproduced. All English renderings are original scholarly translations created specifically for this project, accompanied by word-by-word anatomical glosses. Public-domain historical translations (Max Müller, Sacred Books of the East, 1879/1884) are cited where appropriate.
            </li>
            <li>
              <strong>Attribution Transparency:</strong> Interpretive perspectives explicitly state their philosophical lineage (e.g., "Śaṅkara's reading", "Radhakrishnan suggests", "This site's psychological reading").
            </li>
            <li>
              <strong>Non-Anachronism:</strong> Modern cognitive and clinical psychology works (Masten, Bonanno, Frankl, Seligman) are presented strictly as dialogue partners, not to make spurious claims that the Upaniṣads "predicted" modern empirical neuroscience.
            </li>
          </ul>
        </section>

        {/* Cite This Research Panel */}
        <section className="p-6 rounded-xl bg-[var(--surface)] border border-[var(--gold)]/30 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold font-[var(--font-heading)] text-[var(--gold)]">
              Cite This Research
            </h2>
            <button
              type="button"
              onClick={() => {
                const text = "Chanekar, N., Pandya, A., Ganjure, S., Kale, S., & Dakhane, S. (2026). Dhairya — The Unshaken Self: Psychological Resilience in the Upanishads. Indian Knowledge System (IKS) Research Initiative."
                navigator.clipboard.writeText(text)
                setCopiedCitation(true)
                setTimeout(() => setCopiedCitation(false), 2400)
              }}
              className="px-3 py-1.5 text-xs uppercase tracking-wider rounded-full border border-[var(--gold)]/40 hover:bg-[var(--gold)]/15 text-[var(--gold)] cursor-pointer transition-colors"
            >
              {copiedCitation ? "✓ Copied to Clipboard" : "Copy Citation"}
            </button>
          </div>
          <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 font-mono text-xs text-[var(--text-secondary)] leading-relaxed select-all border border-black/5 dark:border-white/5">
            Chanekar, N., Pandya, A., Ganjure, S., Kale, S., &amp; Dakhane, S. (2026). <em>Dhairya — The Unshaken Self: Psychological Resilience in the Upanishads</em>. Indian Knowledge System (IKS) Research Initiative.
          </div>
        </section>

        {/* Spiritual Bypassing Caution */}
        <section className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
          <h2 className="text-xl font-bold text-[var(--vermilion)] mb-3 flex items-center gap-2">
            <span>🛡️</span> Critical Safeguard: Against Spiritual Bypassing
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            Spiritual bypassing (Welwood, 1984) occurs when philosophical or transcendent notions are used to evade authentic emotional pain, unresolved trauma, or developmental deficits. The Upaniṣadic model actively safeguards against this through its <strong>Pañcakośa</strong> framework: true healing requires biological nourishment, breath stability, and emotional honesty before higher contemplative insight can blossom.
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Metaphysical realization is not an emotional sedative or an excuse for cognitive avoidance; it is the ultimate ground that gives one the courage to inhabit reality with radical vulnerability and compassion.
          </p>
        </section>

        {/* Clinical Mental Health Disclaimer */}
        <section className="p-6 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <span>⚕️</span> Clinical Mental Health Disclaimer
          </h2>
          <p className="text-xs leading-relaxed">
            The philosophical reflections, contemplative models, and breath practices presented on <em>Dhairya</em> are provided strictly for educational, historical, and self-enrichment purposes. They are <strong>not</strong> medical, psychiatric, or psychological diagnostic tools, nor do they constitute clinical therapy. If you are experiencing acute psychological distress, major depressive episodes, severe panic attacks, or thoughts of self-harm, please reach out immediately to a licensed mental health healthcare professional or local emergency crisis services.
          </p>
        </section>
      </div>
      </div>
    </div>
  )
}
