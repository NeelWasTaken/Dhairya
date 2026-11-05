import { useState } from 'react'
import { motion } from 'framer-motion'
import { audioEngine } from '../../lib/audioEngine'

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export default function OfferAWorry() {
  const [inputText, setInputText] = useState('')
  const [isOffering, setIsOffering] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [starCount, setStarCount] = useState(0)
  const [stars, setStars] = useState<Star[]>([])

  const handleOffer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim() || isOffering) return

    setIsOffering(true)
    audioEngine.playStarAscend()

    // Add star to session sky
    const newStar: Star = {
      id: Date.now(),
      x: 20 + Math.random() * 60, // percentage x (20% - 80%)
      y: 15 + Math.random() * 45, // percentage y (15% - 60%)
      size: 2 + Math.random() * 2.5,
      delay: Math.random() * 0.5,
    }

    // Immediately obliterate input text from memory/state
    setTimeout(() => {
      setInputText('')
      setStars((prev) => [...prev, newStar])
      setStarCount((c) => c + 1)
      setIsOffering(false)
      setIsCompleted(true)
    }, 1200)
  }

  const handleAnother = () => {
    setIsCompleted(false)
    setInputText('')
  }

  return (
    <div
      className="relative my-12 p-8 md:p-12 rounded-2xl border border-[var(--gold)]/30 overflow-hidden shadow-2xl"
      style={{
        background: 'linear-gradient(180deg, #070817 0%, #0F132E 100%)',
        color: '#F3F2FA',
      }}
      aria-label="Offer a Worry Contemplative Module"
    >
      {/* Night Sky Canvas with Session Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white shadow-[0_0_12px_#D4AF37]"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/30 bg-white/5 text-[10px] font-mono tracking-widest uppercase text-[var(--gold)] mb-4">
          <span>Interaction 1.2</span>
          <span>•</span>
          <span>Transmuting the Weight</span>
          {starCount > 0 && <span>• {starCount} {starCount === 1 ? 'Star' : 'Stars'} Offered</span>}
        </div>

        <h3
          className="text-2xl md:text-3xl font-bold tracking-wide text-white mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Offer a Worry
        </h3>

        <p className="text-sm md:text-base text-white/70 font-serif italic mb-6">
          In Chāndogya 7, Nārada lays his grief before the sage Sanatkumāra. Write what feels heavy on your shoulders. Watch it release into the sky as a quiet point of light.
        </p>

        {/* State 1: Input Form */}
        {!isCompleted && (
          <form onSubmit={handleOffer} className="space-y-4">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Write something that's weighing on you..."
                disabled={isOffering}
                rows={3}
                className={`w-full p-4 rounded-xl border border-white/20 bg-black/40 text-white placeholder-white/40 focus:outline-none focus:border-[var(--gold)] transition-all resize-none text-sm md:text-base ${
                  isOffering ? 'animate-pulse text-amber-200' : ''
                }`}
                aria-label="Write your worry"
              />

              {/* Ascending Particle Animation when Offering */}
              {isOffering && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex gap-2 text-[var(--gold)] text-xl font-bold animate-bounce">
                    <span>✦</span>
                    <span className="delay-100">✦</span>
                    <span className="delay-200">✦</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/50">
                Ephemeral • Never stored or logged
              </span>

              <button
                type="submit"
                disabled={!inputText.trim() || isOffering}
                className="px-6 py-2.5 rounded-full bg-[var(--gold)] hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
              >
                {isOffering ? 'Dissolving...' : 'Offer it ▸'}
              </button>
            </div>
          </form>
        )}

        {/* State 2: Released Affirmation */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-6 space-y-4 text-center"
          >
            <span className="text-3xl text-[var(--gold)] block">✦</span>
            <p className="text-xl md:text-2xl font-serif italic text-white font-semibold">
              "Held for a moment. Set down."
            </p>
            <p className="text-xs text-white/60 font-sans max-w-md mx-auto">
              Your words have dissolved into stardust. They were never stored in memory, analytics, or storage.
            </p>

            <button
              onClick={handleAnother}
              className="mt-2 px-5 py-2 rounded-full border border-[var(--gold)]/40 hover:bg-[var(--gold)]/15 text-xs font-mono uppercase tracking-wider text-[var(--gold)] transition-colors cursor-pointer"
            >
              Offer Another Burden
            </button>
          </motion.div>
        )}

        {/* Strict Privacy & Wellbeing Guardrail */}
        <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-white/50 space-y-1">
          <p>
            <strong>Privacy Guarantee:</strong> This text is processed exclusively client-side in transient memory and is immediately wiped when offered. Nothing is ever sent to a server, saved in localStorage, or tracked.
          </p>
          <p className="text-amber-200/70 italic">
            <strong>Wellbeing Note:</strong> If you are struggling with overwhelming distress, please reach out to a qualified mental health professional or someone you trust. Dhairya is an educational and reflective exploration, not psychological therapy.
          </p>
        </div>
      </div>
    </div>
  )
}
