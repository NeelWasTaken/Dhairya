import { useState, useEffect } from 'react'
import galleryExhibits from '../../content/galleryExhibits.json'

interface MuseumPlacardProps {
  chapterNum?: number
  title?: string
  dateRange?: string
  shakha?: string
  roomType?: string
  audioDescription?: string
  galleryNote?: string
}

export default function MuseumPlacard({
  chapterNum,
  title,
  dateRange,
  shakha,
  roomType,
  audioDescription,
  galleryNote,
}: MuseumPlacardProps) {
  const exhibit = typeof chapterNum === 'number'
    ? galleryExhibits.exhibits.find((e) => e.chapter === chapterNum) || galleryExhibits.exhibits[0]
    : {
        room: roomType || 'Sanctuary of Fortitude',
        sanskrit: 'उपनिषद्',
        source: title ? (shakha ? `${title} · ${shakha}` : title) : 'Upaniṣad',
        dateRange: dateRange || 'c. 800 – 400 BCE',
        shakha: shakha || 'Vedic Oral Tradition',
        audioGuideText: audioDescription || `${title || 'Upaniṣad'}${shakha ? ` (${shakha})` : ''}. Historical date range: ${dateRange || 'Ancient'}. ${galleryNote || ''}`,
        curatorialNote: galleryNote || audioDescription || `Sacred philosophical dialogue from ${shakha || 'the Vedic tradition'}.`,
      }

  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [isNoteOpen, setIsNoteOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768
    }
    return true
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true)
    }
  }, [])

  const handleAudioGuide = () => {
    if (!isSupported) return

    if (isPlayingAudio) {
      window.speechSynthesis.cancel()
      setIsPlayingAudio(false)
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(exhibit.audioGuideText)
    utterance.rate = 0.95
    utterance.pitch = 0.95

    utterance.onend = () => setIsPlayingAudio(false)
    utterance.onerror = () => setIsPlayingAudio(false)

    window.speechSynthesis.speak(utterance)
    setIsPlayingAudio(true)
  }

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const exhibitShakha = exhibit && 'shakha' in exhibit ? (exhibit as { shakha?: string }).shakha : undefined
  const displayDate = dateRange || exhibit.dateRange || 'c. 800 – 400 BCE'
  const displayShakha = shakha || exhibitShakha || 'Vedic Tradition'
  const displayNote = galleryNote || exhibit.curatorialNote

  return (
    <div className="w-full flex flex-col items-center justify-center my-4 space-y-3">
      {/* ── PLACARD STRIP: Three small chips in one centered row ── */}
      <div
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-[var(--font-marginalia)]"
        role="region"
        aria-label="Historical Context Chips"
      >
        {/* Chip 1: Date */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-[var(--text-secondary)]">
          <span className="text-[var(--gold)] font-bold">Date:</span>
          <span>{displayDate}</span>
        </div>

        {/* Chip 2: Branch / Shakha */}
        {displayShakha && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border-color)] shadow-sm text-[var(--text-secondary)] max-w-xs truncate">
            <span className="text-[var(--saffron)] font-bold">Branch:</span>
            <span className="truncate">{displayShakha}</span>
          </div>
        )}

        {/* Chip 3: Audio Guide Button */}
        {isSupported && (
          <button
            onClick={handleAudioGuide}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer shadow-sm ${
              isPlayingAudio
                ? 'bg-[var(--gold)] text-[#2B1B10] border-[var(--gold)] font-bold ring-2 ring-[var(--gold)]/30'
                : 'bg-[var(--surface)] border-[var(--gold)]/40 text-[var(--gold)] hover:bg-[var(--gold)]/10'
            }`}
            aria-label={isPlayingAudio ? 'Stop audio guide' : 'Play audio guide'}
          >
            <span>{isPlayingAudio ? '⏹' : '🎧'}</span>
            <span>{isPlayingAudio ? 'Pause Guide' : 'Audio Guide'}</span>
          </button>
        )}

        {/* Chip 4: Curatorial Note Toggle */}
        {displayNote && (
          <button
            onClick={() => setIsNoteOpen(!isNoteOpen)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border-hairline)] text-[var(--text-muted)] hover:text-[var(--gold)] hover:border-[var(--gold)]/30 transition-colors cursor-pointer text-xs"
            aria-expanded={isNoteOpen}
            aria-label="Toggle curatorial gallery note"
          >
            <span>📜 Context</span>
            <span className="text-[10px] opacity-70">{isNoteOpen ? '▲' : '▼'}</span>
          </button>
        )}
      </div>

      {/* ── COLLAPSIBLE GALLERY NOTE DRAWER ─────────────────── */}
      {displayNote && isNoteOpen && (
        <div className="w-full max-w-[68ch] mx-auto p-4 sm:p-5 rounded-2xl bg-[var(--surface)]/80 backdrop-blur-sm border border-[var(--border-hairline)] shadow-sm animate-fade-in text-center my-2">
          <p
            className="italic text-[var(--text-secondary)] leading-relaxed text-balance"
            style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)' }}
          >
            "{displayNote}"
          </p>
        </div>
      )}
    </div>
  )
}
