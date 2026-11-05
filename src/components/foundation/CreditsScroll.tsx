import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import creditsData from '../../content/credits.json'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { audioEngine } from '../../lib/audioEngine'
import Reveal from '../ui/Reveal'
import ShareButton from '../ui/ShareButton'
import FurtherReadingBlock from '../ui/FurtherReadingBlock'

interface CreditsScrollProps {
  isStaticPage?: boolean
}

export default function CreditsScroll({ isStaticPage = false }: CreditsScrollProps) {
  const prefersReduced = useReducedMotion()
  const [leaderLanded, setLeaderLanded] = useState(false)
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number; delay: number; color: string }>>([])

  const leader = creditsData.team.find((t) => t.group === 'leader')!
  const members = creditsData.team.filter((t) => t.group === 'member')

  // Sound effect and teal-white spark burst when leader lands
  useEffect(() => {
    const timer = setTimeout(() => {
      setLeaderLanded(true)
      if (audioEngine.getIsSoundEnabled() && !audioEngine.getIsMuted()) {
        audioEngine.playTempleBell(432, 3.5, 0.4)
      }

      // Generate <= 36 subtle peacock-teal & luminous white sparks around leader
      if (!prefersReduced) {
        const newSparks = Array.from({ length: 32 }, (_, i) => ({
          id: i,
          x: (Math.random() - 0.5) * 340,
          y: (Math.random() - 0.5) * 180,
          delay: Math.random() * 1.4,
          color: i % 2 === 0 ? '#2FD4C4' : '#F4F8FF',
        }))
        setSparks(newSparks)
      }
    }, 800)

    return () => clearTimeout(timer)
  }, [prefersReduced])

  return (
    <section
      aria-label="Project Credits"
      className={`relative w-full ${
        isStaticPage ? 'min-h-screen py-24' : 'min-h-[140vh] py-32'
      } flex flex-col items-center justify-center bg-[#07060B] text-[#F3EFE0] overflow-hidden select-text`}
      style={{
        maskImage: isStaticPage
          ? 'none'
          : 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage: isStaticPage
          ? 'none'
          : 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
      }}
    >
      <style>{`
        @keyframes leaderTealSweep {
          0% { transform: translateX(-160%) skewX(-20deg); opacity: 0; }
          12% { opacity: 0.9; }
          28% { transform: translateX(260%) skewX(-20deg); opacity: 0; }
          100% { transform: translateX(260%) skewX(-20deg); opacity: 0; }
        }
        .leader-light-sweep {
          animation: leaderTealSweep ${prefersReduced ? '0s' : '10s ease-in-out infinite'};
        }
        @keyframes conicRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .conic-rotating-frame {
          animation: conicRotate ${prefersReduced ? '0s' : '20s linear infinite'};
        }
      `}</style>

      {/* Background Rotating Gold Mandala Line-work */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-15 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 600 600"
          className="w-[800px] h-[800px] animate-spin-slow stroke-[var(--gold)] fill-none"
          style={{ animationDuration: '120s' }}
        >
          <circle cx="300" cy="300" r="280" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="300" cy="300" r="230" strokeWidth="1" />
          <circle cx="300" cy="300" r="170" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="300" cy="300" r="110" strokeWidth="1.5" />
          <path d="M300 20 L300 580 M20 300 L580 300" strokeWidth="0.8" />
          <path d="M102 102 L498 498 M102 498 L498 102" strokeWidth="0.5" strokeDasharray="3 6" />
          <polygon points="300,50 516,425 84,425" strokeWidth="1" />
          <polygon points="300,550 516,175 84,175" strokeWidth="1" />
        </svg>
      </div>

      {/* Main Perspective Roll Container */}
      <div
        className={`relative z-10 w-full max-w-4xl px-4 sm:px-8 text-center transition-transform duration-700 ${
          prefersReduced ? '' : 'sm:[transform:perspective(1000px)_rotateX(6deg)]'
        }`}
      >
        {/* Project Title Block */}
        <div className="mb-16">
          <Reveal type="eyebrow" trigger="mount" delay={0.05} debugLabel="Credits Eyebrow">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-3">
              कृतज्ञता पत्रम् · The Final Scroll
            </span>
          </Reveal>
          <Reveal type="kinetic-title" trigger="mount" delay={0.15} debugLabel="Credits Title">
            <h2 className="text-3xl sm:text-5xl font-[var(--font-heading)] gold-shimmer tracking-wide mb-2">
              {creditsData.projectTitle}
            </h2>
          </Reveal>
          <Reveal type="subtitle" trigger="mount" delay={0.25} debugLabel="Credits Subtitle">
            <p className="text-sm sm:text-base font-[var(--font-heading-alt)] text-[var(--text-secondary)] tracking-widest uppercase">
              {creditsData.projectSubtitle}
            </p>
          </Reveal>
        </div>

        {/* ========================================================= */}
        {/* TEAM LEADER SECTION (Non-Gold Peacock-Teal/Indigo Accent) */}
        {/* ========================================================= */}
        <div className="mb-20 relative flex flex-col items-center">
          <Reveal type="eyebrow" trigger="mount" delay={0.3} debugLabel="Credits Leader Eyebrow">
            <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#2FD4C4] font-[var(--font-marginalia)] block mb-4 border-b border-[#2FD4C4]/60 pb-1 px-2">
              TEAM LEADER
            </span>
          </Reveal>

          <Reveal type="star-assemble" trigger="mount" delay={0.4} debugLabel="Credits Leader Name">
            <div className="relative inline-flex flex-col items-center p-6 sm:p-8 rounded-3xl group">
              {/* Soft Peacock-Teal to Electric-Indigo Radial Bloom */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl -z-10"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(47, 212, 196, 0.32) 0%, rgba(108, 124, 255, 0.16) 50%, transparent 75%)',
                  transform: 'scale(1.25)',
                  filter: 'blur(16px)',
                }}
              />

              {/* Rotating Conic Gradient Frame (Transform only) */}
              <div className="absolute inset-0 rounded-3xl p-[1.5px] overflow-hidden -z-10 pointer-events-none">
                <div
                  className="w-[200%] h-[200%] -top-1/2 -left-1/2 absolute conic-rotating-frame"
                  style={{
                    background:
                      'conic-gradient(from 0deg, transparent 0deg, rgba(47, 212, 196, 0.7) 120deg, rgba(108, 124, 255, 0.8) 240deg, transparent 360deg)',
                  }}
                />
                <div className="w-full h-full bg-[#0D0A14] dark:bg-[#07060B] rounded-3xl" />
              </div>

              {/* Clickable Leader Name Linking to Instagram */}
              <a
                href={leader.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NEEL CHANEKAR on Instagram (opens in a new tab)"
                className="relative inline-block overflow-hidden py-1 px-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FD4C4] rounded-lg transition-transform duration-300 group-hover:scale-105"
              >
                {/* White-Teal Light Sweep Bar */}
                <div
                  className="absolute inset-0 pointer-events-none leader-light-sweep z-20"
                  style={{
                    width: '45%',
                    background:
                      'linear-gradient(90deg, transparent, rgba(47, 212, 196, 0.5) 40%, rgba(244, 248, 255, 0.9) 50%, rgba(108, 124, 255, 0.5) 60%, transparent)',
                  }}
                />

                <h3
                  className="text-4xl sm:text-7xl font-bold font-[var(--font-heading)] tracking-wider text-[#F4F8FF] text-shadow-teal cursor-pointer"
                  style={{
                    fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                    textShadow:
                      '0 0 24px rgba(47, 212, 196, 0.45), 0 0 45px rgba(108, 124, 255, 0.25)',
                  }}
                >
                  {leader.name}
                </h3>
              </a>

              {/* Teal-Indigo Underline Bar */}
              <div
                className="h-0.5 w-48 sm:w-64 mt-3 transition-transform duration-500 group-hover:scale-x-110"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, #2FD4C4 30%, #6C7CFF 70%, transparent)',
                }}
              />

              {/* Instagram Icon Button & Handle */}
              <div className="mt-4 flex items-center justify-center">
                <a
                  href={leader.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="NEEL CHANEKAR on Instagram (opens in a new tab)"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2FD4C4]/40 hover:border-[#2FD4C4] text-[#2FD4C4] hover:bg-[#2FD4C4]/15 hover:shadow-[0_0_15px_rgba(47,212,196,0.4)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FD4C4] cursor-pointer"
                >
                  {/* Inline SVG Instagram Glyph */}
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span className="text-xs font-mono tracking-wider font-semibold">
                    @aboutneeel
                  </span>
                </a>
              </div>

              {/* Print plain text URL */}
              <span className="hidden print:inline text-xs font-mono text-black mt-1">
                {leader.instagram}
              </span>

              {/* Teal-White Spark Particles */}
              {leaderLanded &&
                sparks.map((s) => (
                  <span
                    key={s.id}
                    className="absolute w-1.5 h-1.5 rounded-full pointer-events-none animate-ping"
                    style={{
                      left: `calc(50% + ${s.x}px)`,
                      top: `calc(50% + ${s.y}px)`,
                      animationDelay: `${s.delay}s`,
                      backgroundColor: s.color,
                      opacity: 0.7,
                    }}
                  />
                ))}
            </div>
          </Reveal>
        </div>

        {/* ========================================================= */}
        {/* TEAM MEMBERS SECTION (Unchanged Classic Styling)          */}
        {/* ========================================================= */}
        <div className="mb-24">
          <Reveal type="eyebrow" trigger="mount" delay={0.45} debugLabel="Credits Members Eyebrow">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--gold)] font-[var(--font-marginalia)] block mb-8">
              Team Members
            </span>
          </Reveal>

          <Reveal type="pop-tags" trigger="mount" delay={0.55} debugLabel="Credits Members List">
            <ul
              className="flex flex-col items-center gap-8 sm:gap-10 list-none p-0 m-0"
              aria-label="Team Members"
            >
              {members.map((member) => (
                <li
                  key={member.name}
                  className="relative group inline-block text-center cursor-default"
                >
                  <span
                    className="text-2xl sm:text-4xl font-[var(--font-heading)] text-[#F3EFE0] tracking-wide block transition-all duration-300 group-hover:text-[var(--gold)] group-hover:-translate-y-1"
                    style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)' }}
                    aria-label={member.name}
                  >
                    {member.name}
                  </span>
                  <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mx-auto mt-2 transition-all duration-500" />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ========================================================= */}
        {/* FURTHER SCHOLARLY READING BLOCK                           */}
        {/* ========================================================= */}
        <FurtherReadingBlock />

        {/* ACKNOWLEDGEMENTS BLOCK */}
        <div className="max-w-2xl mx-auto border-t border-[var(--border-hairline)] pt-12 mb-16 text-xs sm:text-sm text-[var(--text-muted)] space-y-4 text-center leading-relaxed">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--gold)] font-[var(--font-marginalia)]">
            Acknowledgements & Sources
          </h4>
          <p>{creditsData.acknowledgements.scholars}</p>
          <p>{creditsData.acknowledgements.libraries}</p>
          <p>{creditsData.acknowledgements.typography}</p>
          <p className="italic text-[var(--text-secondary)]">
            {creditsData.acknowledgements.disclaimer}
          </p>
          <div className="pt-2">
            <Link
              to="/bibliography"
              className="text-[var(--gold)] hover:underline font-bold text-xs uppercase tracking-wider"
            >
              View Full Scholarly Bibliography →
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CLOSING BENEDICTION MOTTO & THANK YOU                     */}
        {/* ========================================================= */}
        <Reveal type="quote" trigger="scroll" delay={0.2} debugLabel="Credits Benediction Motto">
          <div className="py-10 border-t border-[var(--border-hairline)] flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] block mb-3 font-[var(--font-marginalia)]">
              Thank you for reading
            </span>
            <span className="sanskrit text-2xl sm:text-4xl text-[var(--gold)] block mb-2">
              अंतः अस्ति प्रारंभः
            </span>
            <span className="text-sm sm:text-base font-serif italic text-[var(--text-secondary)] tracking-wider">
              "The end is the beginning."
            </span>
          </div>
        </Reveal>

        {/* END CONTROLS: SHARE, BACK TO TOP & REPLAY */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ShareButton />

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-2.5 rounded-full border border-[var(--border-color)] hover:border-[var(--gold)] text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--gold)] transition-all cursor-pointer shadow-sm"
          >
            ↑ Back to Top
          </button>

          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' })
              window.dispatchEvent(new CustomEvent('replay-intro'))
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--gold)]/40 hover:border-[var(--gold)] text-xs uppercase tracking-widest text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all cursor-pointer shadow-sm group"
          >
            {/* ॐ glyph with subtle sunflower hover state */}
            <span className="sanskrit text-sm group-hover:hidden">ॐ</span>
            <span className="hidden group-hover:inline-block w-3.5 h-3.5 text-[#E07A1F]">
              <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
                <circle cx="10" cy="10" r="3.5" fill="#4A2C12" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx="10"
                    cy="3"
                    rx="1.4"
                    ry="2.8"
                    fill="#F2B01E"
                    transform={`rotate(${i * 45} 10 10)`}
                  />
                ))}
              </svg>
            </span>
            <span>Replay Intro</span>
          </button>

          <Link
            to="/verses"
            className="px-6 py-2.5 rounded-full bg-[var(--gold)] text-[#2B1B10] font-bold text-xs uppercase tracking-widest hover:bg-[var(--gold-light)] transition-all shadow-sm"
          >
            Explore Verse Library →
          </Link>
        </div>
      </div>
    </section>
  )
}
