import { useRef, useEffect, useState } from 'react'
import { audioEngine } from '../../lib/audioEngine'

interface CarvedRing {
  depth: number
  devanagari: string
  iast: string
  translation: string
  source: string
}

const CARVED_RINGS: CarvedRing[] = [
  {
    depth: 10,
    devanagari: 'न जायते म्रियते वा विपश्चित्',
    iast: 'na jāyate mriyate vā vipaścit',
    translation: 'The knowing self is never born, nor does it ever die.',
    source: 'Kaṭha Upaniṣad 1.2.18',
  },
  {
    depth: 35,
    devanagari: 'अणोरणीयान् महतो महीयान्',
    iast: 'aṇor aṇīyān mahato mahīyān',
    translation: 'Subtler than the subtlest, vaster than the vastest.',
    source: 'Kaṭha Upaniṣad 1.2.20',
  },
  {
    depth: 65,
    devanagari: 'अदृष्टम् अव्यवहार्यम् अग्राह्यम्',
    iast: 'adṛṣṭam avyavahāryam agrāhyam',
    translation: 'Unseen, beyond empirical relation, incomprehensible by thought.',
    source: 'Māṇḍūkya Upaniṣad 7',
  },
  {
    depth: 90,
    devanagari: 'प्रपञ्चोपशमं शान्तं शिवमद्वैतम्',
    iast: 'prapañcopaśamaṃ śāntaṃ śivam advaitam',
    translation: 'Cessation of the manifold world, tranquil, benign, without a second.',
    source: 'Māṇḍūkya Upaniṣad 7',
  },
]

export default function WellDescent() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [descentProgress, setDescentProgress] = useState(0) // 0 to 100%
  const [hasPlayedDescent, setHasPlayedDescent] = useState(false)
  const [hasPlayedAscent, setHasPlayedAscent] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const total = rect.height - windowHeight
        const current = Math.max(0, -rect.top)
        const progress = Math.min(Math.max((current / total) * 100, 0), 100)
        setDescentProgress(progress)

        // Audio cues at threshold depths
        if (progress > 40 && !hasPlayedDescent) {
          audioEngine.playWellDescent()
          setHasPlayedDescent(true)
        }
        if (progress > 85 && !hasPlayedAscent) {
          audioEngine.playWellAscent()
          setHasPlayedAscent(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasPlayedDescent, hasPlayedAscent])

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-[220vh] my-16 bg-[#04040A] text-[#F4EEDC] overflow-hidden select-none"
      aria-label="The Well Descent Interactive Journey"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Dynamic Light Dimming & Stone Well Wall Texture */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(20, 18, 30, ${1 - descentProgress * 0.009}) 0%, #030308 ${Math.max(20, 100 - descentProgress * 0.6)}%)`,
          }}
        />

        {/* Floating Stone Masonry Rings */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
          style={{
            transform: `translate3d(0, ${-(descentProgress - 50) * 12}px, 0)`,
          }}
        >
          {/* Circular Well Aperture Ring */}
          <div
            className="w-[320px] h-[320px] md:w-[580px] md:h-[580px] rounded-full border border-[var(--gold)]/20 transition-all duration-300"
            style={{
              transform: `scale(${1 + descentProgress * 0.006})`,
              boxShadow: `inset 0 0 ${descentProgress * 1.5}px rgba(0,0,0,0.9)`,
            }}
          />
        </div>

        {/* Floating Stone Wall Inscriptions (Visible at specific depths) */}
        <div className="relative z-10 max-w-2xl px-6 text-center">
          {CARVED_RINGS.map((ring, idx) => {
            const distance = Math.abs(descentProgress - ring.depth)
            const opacity = Math.max(0, 1 - distance / 15)

            return (
              <div
                key={idx}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 transition-opacity duration-300 pointer-events-none"
                style={{ opacity }}
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--gold)] block mb-2">
                  Depth Ring {idx + 1} • {ring.source}
                </span>
                <p className="sanskrit text-2xl md:text-3xl text-amber-200 font-bold mb-2">
                  {ring.devanagari}
                </p>
                <p className="iast text-xs text-white/70 italic tracking-widest mb-3">
                  {ring.iast}
                </p>
                <p className="font-serif italic text-base md:text-lg text-white/90 leading-relaxed max-w-lg mx-auto">
                  "{ring.translation}"
                </p>
              </div>
            )
          })}

          {/* Bottom Culmination: "What remains when everything falls away?" */}
          <div
            className="transition-all duration-500"
            style={{
              opacity: descentProgress > 80 ? 1 : 0,
              transform: `scale(${descentProgress > 80 ? 1 : 0.95})`,
            }}
          >
            <span className="text-3xl text-[var(--gold)] block mb-3 animate-pulse">✦</span>
            <h3
              className="text-2xl md:text-4xl font-bold tracking-wide text-white mb-4"
              style={{
                fontFamily: 'var(--font-heading)',
                textShadow: '0 0 35px rgba(212, 175, 55, 0.7)',
              }}
            >
              "What remains when everything falls away?"
            </h3>
            <p className="text-sm text-white/60 font-serif italic max-w-md mx-auto mb-6">
              The body ceases action; the senses withdraw; thoughts settle into silence. That which observes the emptiness is itself the unshakeable ground.
            </p>
            <div className="inline-block px-4 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-xs font-mono uppercase tracking-widest text-[var(--gold)]">
              Scroll upward or downward to return to the light
            </div>
          </div>
        </div>

        {/* Depth Meter HUD */}
        <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3 text-xs font-mono text-white/40">
          <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--gold)] transition-all duration-200"
              style={{ width: `${descentProgress}%` }}
            />
          </div>
          <span>WELL DEPTH: {Math.round(descentProgress * 10)} FATHOMS</span>
        </div>
      </div>
    </div>
  )
}
