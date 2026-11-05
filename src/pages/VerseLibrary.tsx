import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import VerseCard from '../components/ui/VerseCard'
import type { Verse } from '../components/ui/VerseCard'
import allVersesData from '../content/verses.json'

const verses = allVersesData as Verse[]

export default function VerseLibrary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUpanishad, setSelectedUpanishad] = useState<string>('All')
  const [selectedTag, setSelectedTag] = useState<string>('All')
  const [sanskritStudyMode, setSanskritStudyMode] = useState(false)

  // Extract distinct upanishads & tags
  const upanishads = useMemo(() => {
    return ['All', ...new Set(verses.map(v => v.upanishad))]
  }, [])

  const tags = useMemo(() => {
    const set = new Set<string>()
    verses.forEach(v => v.tags.forEach(t => set.add(t)))
    return ['All', ...Array.from(set).sort()]
  }, [])

  const filteredVerses = useMemo(() => {
    return verses.filter(v => {
      const matchesSearch =
        searchTerm === '' ||
        v.devanagari.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.iast.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.resilienceReading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesUp = selectedUpanishad === 'All' || v.upanishad === selectedUpanishad
      const matchesTag = selectedTag === 'All' || v.tags.includes(selectedTag)

      return matchesSearch && matchesUp && matchesTag
    })
  }, [searchTerm, selectedUpanishad, selectedTag])

  return (
    <div className="page-container min-h-screen pb-20">
      <div className="content-column max-w-6xl">
        {/* Back button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--saffron)] hover:text-[var(--vermilion)] font-[var(--font-marginalia)]"
        >
          ← Return to Sanctuary
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)]">
          Canonical Corpus • 43 Verified Verses
        </span>
        <h1 className="text-3xl md:text-5xl font-bold mt-2 text-[var(--ink)]">
          The Upaniṣadic Verse Library
        </h1>
        <p className="text-base text-[var(--text-muted)] italic max-w-2xl mx-auto mt-3">
          Explore primary Sanskrit verses on psychological fortitude across the twelve classical Upaniṣads. All translations are original scholarly renderings with word-by-word breakdowns.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] mb-8 shadow-sm">
        <div className="grid md:grid-cols-12 gap-4">
          {/* Search bar */}
          <div className="md:col-span-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-light)] mb-1 font-[var(--font-marginalia)]">
              Search Verses / Themes
            </label>
            <input
              type="text"
              placeholder="Search Sanskrit, English, tags (e.g. fearlessness, chariot, 1.3.14)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
            />
          </div>

          {/* Upanishad Filter */}
          <div className="md:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-light)] mb-1 font-[var(--font-marginalia)]">
              Filter by Upaniṣad
            </label>
            <select
              value={selectedUpanishad}
              onChange={(e) => setSelectedUpanishad(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
            >
              {upanishads.map((up) => (
                <option key={up} value={up}>{up}</option>
              ))}
            </select>
          </div>

          {/* Theme / Tag Filter */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-light)] mb-1 font-[var(--font-marginalia)]">
              Resilience Tag
            </label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
            >
              {tags.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Sanskrit Study Mode Toggle */}
          <div className="md:col-span-2 flex flex-col justify-end">
            <button
              onClick={() => setSanskritStudyMode(!sanskritStudyMode)}
              className={`w-full py-2 px-3 rounded text-xs font-bold transition-all border ${
                sanskritStudyMode
                  ? 'bg-[var(--vermilion)] text-white border-[var(--vermilion)]'
                  : 'bg-[var(--parchment-dark)]/40 text-[var(--ink)] border-[var(--border-color)] hover:bg-[var(--parchment-dark)]'
              }`}
            >
              {sanskritStudyMode ? '✓ Sanskrit Mode' : 'Sanskrit Study Mode'}
            </button>
          </div>
        </div>

        {/* Counter */}
        <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex justify-between items-center text-xs text-[var(--text-muted)] font-[var(--font-marginalia)]">
          <span>Showing {filteredVerses.length} of {verses.length} verses</span>
          {(searchTerm || selectedUpanishad !== 'All' || selectedTag !== 'All') && (
            <button
              onClick={() => { setSearchTerm(''); setSelectedUpanishad('All'); setSelectedTag('All') }}
              className="underline text-[var(--saffron)] hover:text-[var(--vermilion)]"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Verses Grid */}
      {filteredVerses.length === 0 ? (
        <div className="text-center py-16 p-6 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)]">
          <p className="text-lg text-[var(--text-muted)] italic">No verses found matching your search criteria.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedUpanishad('All'); setSelectedTag('All') }}
            className="mt-3 px-4 py-2 text-xs font-semibold rounded bg-[var(--gold)] text-[#2B1B10]"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredVerses.map((v) => (
            <VerseCard key={v.id} verse={v} showSanskritFirst={sanskritStudyMode} />
          ))}
        </div>
      )}
      </div>
    </div>
  )
}
