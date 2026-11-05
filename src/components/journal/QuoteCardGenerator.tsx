import { useState, useEffect } from 'react'

interface QuoteCardGeneratorProps {
  postTitle: string
}

export default function QuoteCardGenerator({ postTitle }: QuoteCardGeneratorProps) {
  const [selectedText, setSelectedText] = useState('')
  const [buttonPos, setButtonPos] = useState<{ x: number; y: number } | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection()
      if (!selection || selection.isCollapsed) {
        if (!showModal) {
          setButtonPos(null)
          setSelectedText('')
        }
        return
      }

      const text = selection.toString().trim()
      if (text.length >= 15 && text.length <= 400) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        setButtonPos({
          x: rect.left + rect.width / 2,
          y: Math.max(10, rect.top - 45),
        })
        setSelectedText(text)
      } else {
        if (!showModal) setButtonPos(null)
      }
    }

    document.addEventListener('mouseup', handleSelectionChange)
    return () => document.removeEventListener('mouseup', handleSelectionChange)
  }, [showModal])

  const handleDownloadCard = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1080
    canvas.height = 1080
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Manuscript styled dark parchment background
    ctx.fillStyle = '#0B0A14'
    ctx.fillRect(0, 0, 1080, 1080)

    // Inner gold hairline border
    ctx.strokeStyle = '#D4AF37'
    ctx.lineWidth = 3
    ctx.strokeRect(60, 60, 960, 960)

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)'
    ctx.lineWidth = 1
    ctx.strokeRect(75, 75, 930, 930)

    // Corner Ornaments
    const drawCorner = (x: number, y: number) => {
      ctx.fillStyle = '#D4AF37'
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()
    }
    drawCorner(60, 60)
    drawCorner(1020, 60)
    drawCorner(60, 1020)
    drawCorner(1020, 1020)

    // Header Title
    ctx.textAlign = 'center'
    ctx.fillStyle = '#D4AF37'
    ctx.font = "bold 34px 'Cinzel Decorative', serif"
    ctx.fillText('DHAIRYA', 540, 160)

    ctx.fillStyle = '#A19DAE'
    ctx.font = "16px 'SF Mono', monospace"
    ctx.fillText('RESEARCH JOURNAL • THE UNSHAKEN SELF', 540, 200)

    // Sanskrit Om Watermark
    ctx.fillStyle = 'rgba(212, 175, 55, 0.08)'
    ctx.font = "bold 260px 'Tiro Devanagari Sanskrit', serif"
    ctx.fillText('ॐ', 540, 560)

    // Selected Quote Text (Wrapped nicely)
    ctx.fillStyle = '#F4EEDC'
    ctx.font = "italic 36px 'Cormorant Garamond', Georgia, serif"
    const words = `"${selectedText}"`.split(' ')
    let line = ''
    let y = 380
    const lineHeight = 54
    const maxWidth = 800

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' '
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, 540, y)
        line = words[n] + ' '
        y += lineHeight
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, 540, y)

    // Footer Attribution
    ctx.fillStyle = '#D4AF37'
    ctx.font = "bold 22px 'Cinzel', serif"
    ctx.fillText(postTitle, 540, 880)

    ctx.fillStyle = '#79758F'
    ctx.font = "16px 'Cormorant Garamond', serif"
    ctx.fillText('Psychological Resilience in the Upanishads', 540, 915)

    // Download PNG
    const link = document.createElement('a')
    link.download = `dhairya-quote-card.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    setShowModal(false)
  }

  return (
    <>
      {/* Floating Highlight Button */}
      {buttonPos && !showModal && (
        <button
          onClick={() => setShowModal(true)}
          style={{
            position: 'fixed',
            left: `${buttonPos.x}px`,
            top: `${buttonPos.y}px`,
            transform: 'translateX(-50%)',
          }}
          className="z-50 px-3 py-1.5 rounded-full bg-[var(--gold)] text-black font-mono text-[11px] font-bold uppercase tracking-wider shadow-2xl hover:bg-amber-300 transition-all flex items-center gap-1.5 cursor-pointer animate-fade-in"
          aria-label="Create sharable quote card from selection"
        >
          <span>✦</span>
          <span>Share Quote Card</span>
        </button>
      )}

      {/* Quote Card Preview Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Shareable Quote Card Preview"
        >
          <div className="relative w-full max-w-lg p-6 md:p-8 rounded-2xl border border-[var(--gold)] bg-[#0C0B18] text-[#F4EEDC] shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-sm cursor-pointer"
              aria-label="Close quote modal"
            >
              ✕
            </button>

            <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--gold)] block font-bold mb-2">
              Shareable Manuscript Card
            </span>

            {/* Preview Card */}
            <div className="p-6 my-4 rounded-xl border border-[var(--gold)]/40 bg-black/50 text-center space-y-4">
              <span className="sanskrit text-2xl text-[var(--gold)] block">ॐ</span>
              <p className="font-serif italic text-lg md:text-xl text-white leading-relaxed">
                "{selectedText}"
              </p>
              <div className="pt-2 border-t border-white/10 text-xs text-[var(--gold)] font-mono">
                {postTitle}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-white/50 font-mono">
                1080 × 1080 PNG Export
              </span>
              <button
                onClick={handleDownloadCard}
                className="px-5 py-2.5 rounded-full bg-[var(--gold)] text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
              >
                📥 Download Quote Card
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
