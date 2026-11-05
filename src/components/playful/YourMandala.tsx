import { useState, useRef, useEffect } from 'react'
import mandalaData from '../../content/mandalaQuestions.json'
import { audioEngine } from '../../lib/audioEngine'

interface VisualParams {
  petals: number
  symmetry: number
  weight: number
  geometry: string
  innerRings: number
  shade: string
  centerGlyph: string
}

export default function YourMandala() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // Derive visual params from user choices
  const getParams = (): VisualParams => {
    const q0 = mandalaData.questions[0].options[answers['pace'] ?? 0].param as { petals?: number; symmetry?: number }
    const q1 = mandalaData.questions[1].options[answers['anchors'] ?? 0].param as { weight?: number }
    const q2 = mandalaData.questions[2].options[answers['support'] ?? 0].param as { geometry?: string }
    const q3 = mandalaData.questions[3].options[answers['curiosity'] ?? 0].param as { innerRings?: number }
    const q4 = mandalaData.questions[4].options[answers['rest'] ?? 0].param as { shade?: string }
    const q5 = mandalaData.questions[5].options[answers['meaning'] ?? 0].param as { centerGlyph?: string }

    return {
      petals: q0.petals || 12,
      symmetry: q0.symmetry || 6,
      weight: q1.weight || 2.0,
      geometry: q2.geometry || 'geometric',
      innerRings: q3.innerRings || 4,
      shade: q4.shade || 'indigo-gold',
      centerGlyph: q5.centerGlyph || 'धैर्यम्',
    }
  }

  const handleSelectOption = (qId: string, optIdx: number) => {
    audioEngine.playTempleBell(432 + optIdx * 60, 1.8, 0.2)
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }))

    if (currentQ < mandalaData.questions.length - 1) {
      setCurrentQ((q) => q + 1)
    } else {
      setIsGenerating(true)
      setTimeout(() => {
        setIsGenerating(false)
        setIsCompleted(true)
      }, 900)
    }
  }

  // Draw generative mandala on canvas
  const drawMandala = (
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    exportMode: boolean = false
  ) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const params = getParams()

    // Background
    ctx.fillStyle = '#070817'
    ctx.fillRect(0, 0, width, height)

    // Center coordinates & radius
    const cx = width / 2
    const cy = exportMode ? height * 0.44 : height / 2
    const maxRadius = Math.min(width, height) * (exportMode ? 0.32 : 0.4)

    // Subtle background ambient aura
    const aura = ctx.createRadialGradient(cx, cy, 10, cx, cy, maxRadius * 1.2)
    aura.addColorStop(0, 'rgba(212, 175, 55, 0.18)')
    aura.addColorStop(0.7, 'rgba(109, 136, 232, 0.08)')
    aura.addColorStop(1, 'rgba(7, 8, 23, 0)')
    ctx.fillStyle = aura
    ctx.fillRect(0, 0, width, height)

    // Gold linework configuration
    ctx.strokeStyle = '#D4AF37'
    ctx.lineWidth = params.weight
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // 1. Concentric Guide Rings
    for (let r = 1; r <= params.innerRings; r++) {
      ctx.beginPath()
      ctx.arc(cx, cy, (maxRadius / params.innerRings) * r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 + r * 0.08})`
      ctx.stroke()
    }

    // 2. Petal Geometry
    const totalPetals = params.petals
    const angleStep = (Math.PI * 2) / totalPetals

    for (let i = 0; i < totalPetals; i++) {
      const angle = i * angleStep
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)

      // Outer Petal
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.quadraticCurveTo(maxRadius * 0.3, maxRadius * 0.6, 0, maxRadius)
      ctx.quadraticCurveTo(-maxRadius * 0.3, maxRadius * 0.6, 0, 0)
      ctx.strokeStyle = '#F3D580'
      ctx.stroke()

      // Inner Filigree Loop
      ctx.beginPath()
      ctx.arc(0, maxRadius * 0.5, maxRadius * 0.15, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)'
      ctx.stroke()

      ctx.restore()
    }

    // 3. Center Seed Glyphs
    ctx.save()
    ctx.font = `bold ${Math.round(maxRadius * 0.22)}px 'Tiro Devanagari Sanskrit', serif`
    ctx.fillStyle = '#FFE8A8'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = 'rgba(212, 175, 55, 0.8)'
    ctx.shadowBlur = 20
    ctx.fillText(params.centerGlyph, cx, cy)
    ctx.restore()

    // 4. Export Card Typography (if downloading as social image)
    if (exportMode) {
      ctx.save()
      ctx.textAlign = 'center'
      ctx.fillStyle = '#FFE8A8'
      ctx.font = "bold 32px 'Cinzel Decorative', serif"
      ctx.fillText('DHAIRYA', cx, height * 0.84)

      ctx.fillStyle = '#C5BFD4'
      ctx.font = "italic 22px 'Cormorant Garamond', Georgia, serif"
      ctx.fillText('Your Personal Contemplative Mandala', cx, height * 0.88)

      ctx.fillStyle = 'rgba(212, 175, 55, 0.7)'
      ctx.font = "14px 'SF Mono', monospace"
      ctx.fillText(`CENTER SEED: ${params.centerGlyph} • 18 UPANISHADIC CHAMBERS`, cx, height * 0.92)
      ctx.restore()
    }
  }

  // Render on live canvas when completed
  useEffect(() => {
    if (isCompleted && canvasRef.current) {
      const canvas = canvasRef.current
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = 420 * dpr
      canvas.height = 420 * dpr
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(dpr, dpr)
      drawMandala(canvas, 420, 420, false)
    }
  }, [isCompleted, answers])

  // Client-side PNG download
  const handleDownload = (format: 'square' | 'portrait') => {
    const offscreen = document.createElement('canvas')
    const width = 1080
    const height = format === 'portrait' ? 1350 : 1080
    offscreen.width = width
    offscreen.height = height

    drawMandala(offscreen, width, height, true)

    const link = document.createElement('a')
    link.download = `dhairya-mandala-${format}.png`
    link.href = offscreen.toDataURL('image/png')
    link.click()
  }

  const handleReset = () => {
    setCurrentQ(0)
    setAnswers({})
    setIsCompleted(false)
  }

  return (
    <div
      className="relative my-12 p-8 md:p-12 rounded-2xl border border-[var(--gold)]/30 overflow-hidden shadow-2xl"
      style={{
        background: 'linear-gradient(180deg, #060714 0%, #0E1026 100%)',
        color: '#F3F2FA',
      }}
      aria-label="Your Mandala Contemplative Generator"
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/30 bg-white/5 text-[10px] font-mono tracking-widest uppercase text-[var(--gold)] mb-4">
          <span>Interaction 1.6</span>
          <span>•</span>
          <span>Generative Contemplation</span>
        </div>

        <h3
          className="text-2xl md:text-3xl font-bold tracking-wide text-white mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Your Mandala
        </h3>

        <p className="text-sm md:text-base text-white/70 font-serif italic mb-8 max-w-lg mx-auto">
          Six questions reflecting on your unique relationship with pace, anchors, and meaning. No scores or clinical labels—your answers purely shape geometric gold linework.
        </p>

        {/* 1. Question Flow */}
        {!isCompleted && !isGenerating && (
          <div className="text-left space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--gold)] border-b border-white/10 pb-2">
              <span>Question {currentQ + 1} of {mandalaData.questions.length}</span>
              <span>{Math.round(((currentQ + 1) / mandalaData.questions.length) * 100)}%</span>
            </div>

            <h4 className="text-lg md:text-xl font-serif text-white leading-snug">
              {mandalaData.questions[currentQ].prompt}
            </h4>

            <div className="space-y-3">
              {mandalaData.questions[currentQ].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(mandalaData.questions[currentQ].id, idx)}
                  className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[var(--gold)]/60 hover:bg-[var(--gold)]/10 text-sm md:text-base transition-all duration-200 cursor-pointer flex items-center justify-between group"
                >
                  <span className="font-serif group-hover:text-[var(--gold)] transition-colors">
                    {opt.label}
                  </span>
                  <span className="text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity">
                    ✦
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Generating Indicator */}
        {isGenerating && (
          <div className="py-16 space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-[var(--gold)] border-t-transparent animate-spin mx-auto" />
            <p className="text-sm font-mono text-[var(--gold)] uppercase tracking-widest">
              Synthesizing Golden Geometry...
            </p>
          </div>
        )}

        {/* 2. Completed Generative Mandala View & Download */}
        {isCompleted && (
          <div className="py-4 space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-2xl border border-[var(--gold)]/40 shadow-[0_0_50px_rgba(212,175,55,0.25)]"
              />
            </div>

            <div className="space-y-2">
              <p className="font-serif italic text-lg text-white">
                "An artistic visual record of your contemplative inquiry."
              </p>
              <p className="text-xs font-mono text-white/50">
                Client-rendered • Zero data stored or uploaded
              </p>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleDownload('square')}
                className="px-5 py-2.5 rounded-full bg-[var(--gold)] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-all shadow-md cursor-pointer"
              >
                📥 Download Square (1080×1080)
              </button>
              <button
                onClick={() => handleDownload('portrait')}
                className="px-5 py-2.5 rounded-full border border-[var(--gold)]/50 text-[var(--gold)] hover:bg-[var(--gold)]/15 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                📥 Download Portrait (1080×1350)
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-full border border-white/20 text-white/60 hover:text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
              >
                Regenerate
              </button>
            </div>
          </div>
        )}

        {/* Wellbeing Guardrail & Meaning Note */}
        <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-white/50 space-y-1">
          <p>
            <strong>What this means:</strong> This mandala is a reflective artistic keepsake designed to celebrate your contemplative journey. It does not measure, diagnose, or score your psychological state.
          </p>
          <p className="text-amber-200/70 italic">
            If you are navigating deep emotional difficulty, please consider reaching out to a licensed professional or a trusted companion.
          </p>
        </div>
      </div>
    </div>
  )
}
