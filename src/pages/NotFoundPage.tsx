import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DoubleLineFrame from '../components/ui/borders/DoubleLineFrame'

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '404: Path Not Found — Dhairya: The Unshaken Self'
  }, [])

  return (
    <main
      className="relative min-h-[90vh] flex items-center justify-center px-4 py-24 select-none"
      role="main"
      aria-label="404 Page Not Found"
    >
      <div className="w-full max-w-xl mx-auto text-center">
        <DoubleLineFrame className="p-10 sm:p-14 bg-[var(--surface)]/80 backdrop-blur-md rounded-2xl shadow-xl">
          {/* Sacred Om Glyph */}
          <div className="mx-auto w-16 h-16 rounded-full border border-[var(--gold)]/40 flex items-center justify-center mb-6 shadow-inner bg-[var(--gold)]/5">
            <span className="sanskrit text-3xl text-[var(--gold)]">ॐ</span>
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-3">
            अनधिगत मार्गम् · 404
          </span>

          <h1 className="text-2xl sm:text-4xl font-[var(--font-heading)] font-bold tracking-wide mb-4 text-[var(--text-primary)]">
            This path is not in the manuscript
          </h1>

          <p className="text-sm sm:text-base font-serif italic text-[var(--text-secondary)] leading-relaxed mb-8 max-w-md mx-auto">
            The verse or commentary you seek belongs to an unwritten folio. Return to the core canon or orient yourself upon the journey map.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-2.5 rounded-full bg-[var(--gold)] text-[#201309] font-bold text-xs uppercase tracking-widest hover:bg-[var(--gold-light)] transition-all shadow-md"
            >
              Return Home
            </Link>
            <Link
              to="/#map"
              className="px-6 py-2.5 rounded-full border border-[var(--gold)]/40 hover:border-[var(--gold)] text-xs uppercase tracking-widest text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all"
            >
              Journey Map
            </Link>
          </div>
        </DoubleLineFrame>
      </div>
    </main>
  )
}
