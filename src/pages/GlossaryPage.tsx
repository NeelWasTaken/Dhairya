import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import glossaryData from '../content/glossary.json'

interface Term {
  term: string
  devanagari: string
  iast: string
  meaning: string
  category: string
  etymology: string
}

const terms = glossaryData as Term[]

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = useMemo(() => {
    return ['All', ...new Set(terms.map((t) => t.category))].sort()
  }, [])

  const filteredTerms = useMemo(() => {
    return terms.filter((t) => {
      const matchesSearch =
        searchTerm === '' ||
        t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.devanagari.includes(searchTerm) ||
        t.iast.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.etymology.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCat = selectedCategory === 'All' || t.category === selectedCategory
      return matchesSearch && matchesCat
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="page-container min-h-screen pb-20">
      <div className="content-column max-w-6xl">
        <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--saffron)] hover:text-[var(--vermilion)] font-[var(--font-marginalia)]"
        >
          ← Return to Sanctuary
        </Link>
      </div>

      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)]">
          Lexicon of Consciousness • 75 Classical Concepts
        </span>
        <h1 className="text-3xl md:text-5xl font-bold mt-2 text-[var(--ink)]">
          The Upaniṣadic Glossary
        </h1>
        <p className="text-base text-[var(--text-muted)] italic max-w-2xl mx-auto mt-3">
          Explore Sanskrit technical terms with precise philosophical definitions, etymologies, and psychological readings.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] mb-8 shadow-sm">
        <div className="grid md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-light)] mb-1 font-[var(--font-marginalia)]">
              Search Terms / Meanings
            </label>
            <input
              type="text"
              placeholder="Search by English, Devanagari, or IAST (e.g. abhaya, titikṣā, witness)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
            />
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-light)] mb-1 font-[var(--font-marginalia)]">
              Filter by Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex justify-between items-center text-xs text-[var(--text-muted)] font-[var(--font-marginalia)]">
          <span>Displaying {filteredTerms.length} of {terms.length} entries</span>
          {(searchTerm || selectedCategory !== 'All') && (
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All') }}
              className="underline text-[var(--saffron)] hover:text-[var(--vermilion)]"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Glossary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTerms.map((item) => (
          <div
            key={item.term}
            className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-lg font-bold text-[var(--ink)]">{item.term}</h3>
                  <span className="iast text-xs text-[var(--text-muted)]">{item.iast}</span>
                </div>
                <span className="sanskrit text-2xl text-[var(--vermilion)]">{item.devanagari}</span>
              </div>

              <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider bg-[var(--parchment-dark)]/50 text-[var(--ink-faint)] mb-3">
                {item.category}
              </span>

              <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-3">
                {item.meaning}
              </p>
            </div>

            <div className="pt-2 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)] italic font-[var(--font-marginalia)]">
              <strong>Etymology:</strong> {item.etymology}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}
