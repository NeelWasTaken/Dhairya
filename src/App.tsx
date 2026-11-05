import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLenis } from './hooks/useLenis'
import { audioEngine } from './lib/audioEngine'
import { SHOW_COSMIC_STARTUP } from './config'

// Layout & Global Components
import Nav from './components/layout/Nav'
import QuoteGate from './components/animations/QuoteGate'
import SunEntrySequence from './components/animations/SunEntrySequence'
import CustomCursor from './components/animations/CustomCursor'
import EmberCursor from './components/animations/EmberCursor'
import AmbientSound from './components/interactive/AmbientSound'
import TextDebugPanel from './components/ui/TextDebugPanel'
import ThreeWorldsProvider from './components/foundation/ThreeWorldsProvider'
import DayLongSky from './components/foundation/DayLongSky'
import ScrollSeismograph from './components/foundation/ScrollSeismograph'
import PortalTransition from './components/animations/PortalTransition'
import KeyboardShortcutsModal from './components/ui/KeyboardShortcutsModal'
import BackToTop from './components/ui/BackToTop'

// Orientation Pages
const Home = lazy(() => import('./pages/Home'))
const ProloguePage = lazy(() => import('./pages/synthesis/ProloguePage'))
const CorpusPage = lazy(() => import('./pages/synthesis/CorpusPage'))

// 12 Core Upanishad Pages
const IshaPage = lazy(() => import('./pages/upanishads/IshaPage'))
const KenaPage = lazy(() => import('./pages/upanishads/KenaPage'))
const KathaPage = lazy(() => import('./pages/upanishads/KathaPage'))
const PrashnaPage = lazy(() => import('./pages/upanishads/PrashnaPage'))
const MundakaPage = lazy(() => import('./pages/upanishads/MundakaPage'))
const MandukyaPage = lazy(() => import('./pages/upanishads/MandukyaPage'))
const TaittiriyaPage = lazy(() => import('./pages/upanishads/TaittiriyaPage'))
const AitareyaPage = lazy(() => import('./pages/upanishads/AitareyaPage'))
const ChandogyaPage = lazy(() => import('./pages/upanishads/ChandogyaPage'))
const BrihadaranyakaPage = lazy(() => import('./pages/upanishads/BrihadaranyakaPage'))
const ShvetashvataraPage = lazy(() => import('./pages/upanishads/ShvetashvataraPage'))
const MaitriPage = lazy(() => import('./pages/upanishads/MaitriPage'))

// Sub-pages
const Chandogya6Page = lazy(() => import('./pages/upanishads/Chandogya6Page'))
const Chandogya7Page = lazy(() => import('./pages/upanishads/Chandogya7Page'))
const BrihadaranyakaFearPage = lazy(() => import('./pages/upanishads/BrihadaranyakaFearPage'))
const BrihadaranyakaDisciplinePage = lazy(() => import('./pages/upanishads/BrihadaranyakaDisciplinePage'))
const BrihadaranyakaWomenPage = lazy(() => import('./pages/upanishads/BrihadaranyakaWomenPage'))

// Synthesis Pages
const StormPage = lazy(() => import('./pages/synthesis/StormPage'))
const PracticesPage = lazy(() => import('./pages/synthesis/PracticesPage'))
const CritiquesPage = lazy(() => import('./pages/synthesis/CritiquesPage'))
const EpiloguePage = lazy(() => import('./pages/synthesis/EpiloguePage'))
const CreditsPage = lazy(() => import('./pages/synthesis/CreditsPage'))

// Utility Pages
const VerseLibrary = lazy(() => import('./pages/VerseLibrary'))
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'))
const TimelinePage = lazy(() => import('./pages/TimelinePage'))
const BibliographyPage = lazy(() => import('./pages/BibliographyPage'))
const QuizPage = lazy(() => import('./pages/QuizPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ExperiencesPage = lazy(() => import('./pages/ExperiencesPage'))
const JournalPage = lazy(() => import('./pages/JournalPage'))
const JournalDetailPage = lazy(() => import('./pages/JournalDetailPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  const [appState, setAppState] = useState<'gate' | 'transition' | 'site'>(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('debug=entry')) {
      return 'transition'
    }
    try {
      return sessionStorage.getItem('dhairya_gate_v4') === 'true' ? 'site' : 'gate'
    } catch {
      return 'gate'
    }
  })
  const [easterEggActive, setEasterEggActive] = useState(false)

  // Lenis runs ONLY when site is active
  useLenis(appState === 'site')

  // Listener for replaying the Quote Gate from footer
  useEffect(() => {
    const handleReplay = () => {
      try {
        sessionStorage.removeItem('dhairya_gate_v4')
        sessionStorage.removeItem('dhairya_sun_entered')
      } catch {}
      setAppState('gate')
    }
    window.addEventListener('replay-intro', handleReplay)
    return () => window.removeEventListener('replay-intro', handleReplay)
  }, [])

  // Backward compatibility: redirect old chapter hashes (#ch-0 ... #ch-17)
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const hashRoutes: Record<string, string> = {
      '#ch-0': '/prologue',
      '#ch-1': '/prologue',
      '#ch-2': '/corpus',
      '#ch-3': '/brihadaranyaka/fear',
      '#ch-4': '/upanishad/katha',
      '#ch-5': '/upanishad/katha',
      '#ch-6': '/upanishad/chandogya',
      '#ch-7': '/chandogya/6',
      '#ch-8': '/brihadaranyaka/discipline',
      '#ch-9': '/upanishad/taittiriya',
      '#ch-10': '/upanishad/mandukya',
      '#ch-11': '/upanishad/mundaka',
      '#ch-12': '/upanishad/kena',
      '#ch-13': '/upanishad/isha',
      '#ch-14': '/brihadaranyaka/women-sages',
      '#ch-15': '/practices',
      '#ch-16': '/critiques',
      '#ch-17': '/epilogue',
    }

    if (hashRoutes[hash]) {
      window.location.replace(hashRoutes[hash])
    }
  }, [])

  // Easter Egg: Typing "OM" anywhere triggers bell chime & golden radiant burst
  useEffect(() => {
    let buffer = ''
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea') return

      buffer = (buffer + e.key.toUpperCase()).slice(-2)
      if (buffer === 'OM') {
        audioEngine.init(true)
        audioEngine.playTempleBell(528, 4.5, 0.5)
        setEasterEggActive(true)
        setTimeout(() => setEasterEggActive(false), 2400)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 1. GATE STATE: Only the Quote Gate is mounted on pure #07060B
  if (appState === 'gate') {
    return (
      <div className="min-h-screen bg-[#07060B]">
        <QuoteGate
          onStartTransition={() => {
            // If legacy cosmic startup is enabled in config.ts, route through it first
            if (SHOW_COSMIC_STARTUP) {
              setAppState('transition')
            } else {
              setAppState('transition')
            }
          }}
          onComplete={() => setAppState('transition')}
        />
      </div>
    )
  }

  // 2. TRANSITION & SITE STATE:
  // Pre-mount site structure behind Sun Entry sequence so sunflower bloom unmasks smoothly
  return (
    <ThreeWorldsProvider>
      <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
        {/* The Sun Entry Master Sequence (overlay) */}
        {appState === 'transition' && (
          <SunEntrySequence onComplete={() => setAppState('site')} />
        )}

        {/* Global Keyboard Shortcuts Modal (?) */}
        <KeyboardShortcutsModal />

        {/* Global Circular Progress Back-to-Top */}
        <BackToTop />

        {/* Screen Reader Route Announcer */}
        <div id="aria-route-announcer" aria-live="assertive" className="sr-only" />

        {/* Continuous Day-Long Scroll Sky Cycle */}
        <DayLongSky />

        {/* Live Scroll Seismograph stress & journey monitor */}
        <ScrollSeismograph />

        {/* Precision context cursor (View / Drag / Begin) */}
        <CustomCursor />

        {/* Spark trail cursor */}
        <EmberCursor />

        {/* Sticky navigation bar */}
        <Nav />

        {/* Global Circular Portal Iris Transition */}
        <PortalTransition />

        {/* Ambient sound toggle */}
        <AmbientSound />

        {/* Dev-only text origin debug panel (?debug=text) */}
        <TextDebugPanel />

        {/* Easter Egg OM Burst Notification */}
        {easterEggActive && (
          <div className="fixed inset-0 z-[99990] pointer-events-none flex items-center justify-center animate-fade-in bg-[radial-gradient(circle_at_center,rgba(201,162,58,0.3)_0%,transparent_70%)]">
            <div className="text-center animate-pulse">
              <span
                className="sanskrit text-8xl md:text-9xl text-[var(--gold)] drop-shadow-[0_0_50px_rgba(201,162,58,0.8)] block"
                style={{ filter: 'drop-shadow(0 0 40px #C9A23A)' }}
              >
                ॐ
              </span>
              <span className="font-[var(--font-heading-alt)] text-lg tracking-[0.3em] text-[var(--gold)] uppercase mt-2 block">
                Pranava Awoken
              </span>
            </div>
          </div>
        )}

        {/* Page Routing */}
        <main>
          <Suspense
            fallback={
              <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
                <span className="sanskrit text-4xl text-[var(--gold)] animate-pulse">ॐ</span>
              </div>
            }
          >
            <Routes>
              {/* Orientation Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/prologue" element={<ProloguePage />} />
              <Route path="/corpus" element={<CorpusPage />} />

              {/* 12 Core Upanishad Pages */}
              <Route path="/upanishad/isha" element={<IshaPage />} />
              <Route path="/upanishad/kena" element={<KenaPage />} />
              <Route path="/upanishad/katha" element={<KathaPage />} />
              <Route path="/upanishad/prashna" element={<PrashnaPage />} />
              <Route path="/upanishad/mundaka" element={<MundakaPage />} />
              <Route path="/upanishad/mandukya" element={<MandukyaPage />} />
              <Route path="/upanishad/taittiriya" element={<TaittiriyaPage />} />
              <Route path="/upanishad/aitareya" element={<AitareyaPage />} />
              <Route path="/upanishad/chandogya" element={<ChandogyaPage />} />
              <Route path="/upanishad/brihadaranyaka" element={<BrihadaranyakaPage />} />
              <Route path="/upanishad/shvetashvatara" element={<ShvetashvataraPage />} />
              <Route path="/upanishad/maitri" element={<MaitriPage />} />

              {/* Specialized Sub-Chambers */}
              <Route path="/chandogya/6" element={<Chandogya6Page />} />
              <Route path="/chandogya/7" element={<Chandogya7Page />} />
              <Route path="/brihadaranyaka/fear" element={<BrihadaranyakaFearPage />} />
              <Route path="/brihadaranyaka/discipline" element={<BrihadaranyakaDisciplinePage />} />
              <Route path="/brihadaranyaka/women-sages" element={<BrihadaranyakaWomenPage />} />

              {/* Synthesis & Credits Pages */}
              <Route path="/storm" element={<StormPage />} />
              <Route path="/practices" element={<PracticesPage />} />
              <Route path="/critiques" element={<CritiquesPage />} />
              <Route path="/epilogue" element={<EpiloguePage />} />
              <Route path="/credits" element={<CreditsPage />} />

              {/* Utilities & Explorations */}
              <Route path="/verses" element={<VerseLibrary />} />
              <Route path="/glossary" element={<GlossaryPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/bibliography" element={<BibliographyPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/experiences" element={<ExperiencesPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/journal/:slug" element={<JournalDetailPage />} />

              {/* 404 Manuscript Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </ThreeWorldsProvider>
  )
}
