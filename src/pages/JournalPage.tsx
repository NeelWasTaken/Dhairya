import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import journalIndexData from '../content/journal/index.json'

const ALL_TAGS = [
  'All',
  'Fear',
  'Grief',
  'Self-regulation',
  'Witness',
  'Women Sages',
  'Translation',
  'Practice',
  'Comparison',
]

export default function JournalPage() {
  const [selectedTag, setSelectedTag] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    return journalIndexData.filter((post) => {
      const matchesTag =
        selectedTag === 'All' ||
        post.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())

      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesTag && matchesSearch
    })
  }, [selectedTag, searchQuery])

  return (
    <div className="page-container min-h-screen pb-20">
      <div className="content-column max-w-6xl">
        {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[var(--gold)] mb-4 hover:underline"
        >
          ← Return to Main Manuscript
        </Link>
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--gold)] block font-bold mb-2">
          Scholarly Inquiries • The Reading Room
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold tracking-wide text-[var(--text-primary)] mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          The Research Journal
        </h1>
        <p className="text-base md:text-lg text-[var(--text-secondary)] font-serif italic leading-relaxed">
          Eleven peer-informed essays exploring ancient Vedantic epistemologies, modern clinical parallels, critical hermeneutics, and cognitive self-regulation.
        </p>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="mb-10 space-y-4">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search essays by keyword, concept, or sage..."
            className="w-full px-5 py-3 rounded-full border border-[var(--border-hairline)] bg-[var(--surface)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)] text-sm shadow-sm transition-all"
            aria-label="Search journal essays"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Tag Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[var(--gold)] text-black font-bold shadow-md'
                  : 'bg-[var(--surface)] border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:border-[var(--gold)]/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Essays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="dawn-card p-6 md:p-8 flex flex-col justify-between group hover:border-[var(--gold)]/60 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[var(--gold)] mb-3">
                <span>{post.date}</span>
                <span>• {post.readingTime}</span>
              </div>

              <h2
                className="text-xl md:text-2xl font-bold tracking-wide text-[var(--text-primary)] mb-3 group-hover:text-[var(--gold)] transition-colors leading-snug"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <Link to={`/journal/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-sm md:text-base text-[var(--text-secondary)] font-serif italic leading-relaxed line-clamp-3 mb-6">
                {post.summary}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-[var(--gold)]/10 text-[var(--gold)] text-[10px] font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-hairline)] text-xs font-mono">
                <span className="text-[var(--text-muted)]">
                  Ch. {post.relatedChapters.join(', ')} Reference
                </span>
                <Link
                  to={`/journal/${post.slug}`}
                  className="font-bold text-[var(--gold)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                >
                  Read Essay →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16 text-[var(--text-muted)]">
          <p className="font-serif italic text-lg">
            No essays found matching your filter criteria.
          </p>
          <button
            onClick={() => {
              setSelectedTag('All')
              setSearchQuery('')
            }}
            className="mt-3 px-4 py-1.5 rounded-full bg-[var(--gold)]/20 text-[var(--gold)] text-xs font-mono uppercase tracking-wider"
          >
            Clear Filters
          </button>
        </div>
      )}
      </div>
    </div>
  )
}
