import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import journalIndex from '../content/journal/index.json'
import versesData from '../content/verses.json'
import VerseCard from '../components/ui/VerseCard'
import type { Verse } from '../components/ui/VerseCard'
import ReadingProgressRing from '../components/journal/ReadingProgressRing'
import QuoteCardGenerator from '../components/journal/QuoteCardGenerator'

interface JournalPostFull {
  slug: string
  title: string
  date: string
  readingTime: string
  tags: string[]
  relatedChapters: number[]
  relatedVerses: string[]
  summary: string
  viewOrigin: string
  limits: string
  sections: {
    heading: string
    paragraphs: string[]
  }[]
  sources: string[]
}

const versesMap = new Map<string, Verse>()
;(versesData as Verse[]).forEach((v) => versesMap.set(v.id, v))

export default function JournalDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<JournalPostFull | null>(null)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [speechRate, setSpeechRate] = useState(1.0)
  const [isSupported, setIsSupported] = useState(false)

  // Load post dynamic JSON
  useEffect(() => {
    async function loadPost() {
      try {
        const mod = await import(`../content/journal/${slug}.json`)
        setPost(mod.default || mod)
      } catch (e) {
        console.error('Failed to load post:', e)
        setPost(null)
      }
    }
    if (slug) {
      loadPost()
      window.scrollTo(0, 0)
    }
  }, [slug])

  // SpeechSynthesis audio narration
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true)
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const handleToggleAudio = () => {
    if (!post || !isSupported) return

    if (isPlayingAudio) {
      window.speechSynthesis.cancel()
      setIsPlayingAudio(false)
      return
    }

    window.speechSynthesis.cancel()

    // Aggregate text for narration
    const fullText = [
      post.title,
      post.summary,
      ...post.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
    ].join('. ')

    const utterance = new SpeechSynthesisUtterance(fullText)
    utterance.rate = speechRate
    utterance.pitch = 1.0

    utterance.onend = () => setIsPlayingAudio(false)
    utterance.onerror = () => setIsPlayingAudio(false)

    window.speechSynthesis.speak(utterance)
    setIsPlayingAudio(true)
  }

  const handleRateChange = (newRate: number) => {
    setSpeechRate(newRate)
    if (isPlayingAudio) {
      window.speechSynthesis.cancel()
      setIsPlayingAudio(false)
    }
  }

  // Next post in sequence
  const currentIndex = journalIndex.findIndex((p) => p.slug === slug)
  const nextPost =
    currentIndex >= 0 && currentIndex < journalIndex.length - 1
      ? journalIndex[currentIndex + 1]
      : journalIndex[0]

  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Loading Essay...</h2>
        <Link to="/journal" className="text-[var(--gold)] underline">
          ← Back to Research Journal
        </Link>
      </div>
    )
  }

  return (
    <div className="page-container relative min-h-screen pb-24">
      {/* Scroll Reading Progress Ring */}
      <ReadingProgressRing />

      {/* Floating Highlight-to-Share Quote Card Generator */}
      <QuoteCardGenerator postTitle={post.title} />

      <div className="content-column max-w-6xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/journal"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[var(--gold)] hover:underline"
          >
            ← Research Journal Index
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-xs font-mono text-[var(--gold)]">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
            <span>•</span>
            <span>Chapters: {post.relatedChapters.map((c) => `§${c}`).join(', ')}</span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold tracking-wide text-[var(--text-primary)] mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {post.title}
          </h1>

          <p className="text-lg md:text-xl font-serif italic text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-8">
            "{post.summary}"
          </p>

          {/* Web Speech API Listen Mode Controls */}
          {isSupported && (
            <div className="inline-flex items-center gap-3 p-2 rounded-full border border-[var(--gold)]/40 bg-[var(--surface)] shadow-md">
              <button
                onClick={handleToggleAudio}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-[var(--gold)] text-black font-bold shadow-md'
                    : 'bg-white/5 text-[var(--gold)] hover:bg-[var(--gold)]/10'
                }`}
                aria-label={isPlayingAudio ? 'Pause Narration' : 'Listen to Essay Narration'}
              >
                <span>{isPlayingAudio ? '⏸ Pause' : '🎧 Listen to Essay'}</span>
              </button>

              <div className="flex items-center gap-1 pr-3 text-xs font-mono text-[var(--text-muted)]">
                <span>Speed:</span>
                {[0.9, 1.0, 1.2].map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRateChange(r)}
                    className={`px-1.5 py-0.5 rounded text-[10px] ${
                      speechRate === r
                        ? 'bg-[var(--gold)]/20 text-[var(--gold)] font-bold'
                        : 'hover:text-white'
                    }`}
                  >
                    {r}x
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Two-Column Grid: Main Reading Body + Sticky Related Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Reading Column (8 cols) */}
          <main className="lg:col-span-8 space-y-12">
            {/* Attribution Callout: Where this view comes from */}
            <div className="p-6 rounded-xl border border-[var(--gold)]/30 bg-[var(--surface)]/80 shadow-sm">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--gold)] font-bold block mb-1">
                Where This View Comes From
              </span>
              <p className="text-xs md:text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                {post.viewOrigin}
              </p>
            </div>

            {/* Essay Sections */}
            {post.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold tracking-wide text-[var(--text-primary)] pt-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {section.heading}
                </h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-base md:text-lg font-serif text-[var(--text-primary)] leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}

            {/* Critical Limits Callout */}
            <div className="p-6 rounded-xl border border-rose-900/40 bg-rose-950/20 shadow-sm">
              <span className="text-[10px] uppercase font-mono tracking-widest text-rose-300 font-bold block mb-1">
                Critical Limits & Boundaries
              </span>
              <p className="text-xs md:text-sm font-sans text-rose-200/90 leading-relaxed">
                {post.limits}
              </p>
            </div>

            {/* Complete Scholarly Bibliography */}
            <section className="pt-8 border-t border-[var(--border-hairline)] space-y-3">
              <h3 className="text-lg font-bold font-mono uppercase tracking-wider text-[var(--gold)]">
                Sources & References
              </h3>
              <ul className="space-y-2 text-xs md:text-sm font-serif italic text-[var(--text-secondary)]">
                {post.sources.map((src, i) => (
                  <li key={i} className="pl-4 border-l-2 border-[var(--gold)]/40">
                    {src}
                  </li>
                ))}
              </ul>
            </section>
          </main>

          {/* Sticky Related Rail (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Primary Scripture Cards */}
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold)] block font-bold">
                  Referenced Upanishad Verses
                </span>
                {post.relatedVerses.map((vId) => {
                  const verse = versesMap.get(vId)
                  return verse ? <VerseCard key={vId} verse={verse} /> : null
                })}
              </div>

              {/* Next in Journal Portal */}
              <div className="p-6 rounded-2xl border border-[var(--gold)]/40 bg-[var(--surface)] shadow-lg space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--gold)] block">
                  Next in the Journal →
                </span>
                <h4
                  className="text-lg font-bold text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <Link to={`/journal/${nextPost.slug}`}>{nextPost.title}</Link>
                </h4>
                <p className="text-xs font-serif italic text-[var(--text-muted)] line-clamp-2">
                  {nextPost.summary}
                </p>
                <Link
                  to={`/journal/${nextPost.slug}`}
                  className="inline-block pt-1 text-xs font-mono uppercase tracking-wider text-[var(--gold)] font-bold hover:underline"
                >
                  Continue Reading ➔
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
