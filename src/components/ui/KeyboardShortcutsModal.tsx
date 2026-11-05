import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { audioEngine } from '../../lib/audioEngine'

export default function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea') return

      if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      } else if (!isOpen) {
        if (e.key.toLowerCase() === 'm') {
          // Open map or navigate to journey
          navigate('/#map')
        } else if (e.key.toLowerCase() === 's') {
          audioEngine.setMuted(!audioEngine.getIsMuted())
        } else if (e.key.toLowerCase() === 't') {
          // Toggle theme
          const currentTheme = document.documentElement.getAttribute('data-theme') || 'day'
          const next = currentTheme === 'night' ? 'day' : 'night'
          document.documentElement.setAttribute('data-theme', next)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, navigate])

  const shortcuts = [
    { key: '?', label: 'Open / Close Shortcuts Overlay' },
    { key: '← / →', label: 'Previous / Continue Upanishad Section' },
    { key: 'M', label: 'Jump to Journey Map' },
    { key: 'S', label: 'Toggle Ambient Audio & Bells' },
    { key: 'T', label: 'Toggle Day / Night Sky Theme' },
    { key: 'Esc', label: 'Dismiss Dialog / Skip Intro' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md select-none"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard Shortcuts"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#FAF8F3] dark:bg-[#161224] text-[#14121F] dark:text-[#FAF8F3] border border-[#B8892B]/40 dark:border-[#B8892B]/30 rounded-2xl p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#B8892B]/20 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#B8892B]/15 text-[#B8892B] flex items-center justify-center font-bold text-sm">
                  ⌨
                </span>
                <h3 className="font-[var(--font-heading)] text-xl font-bold tracking-wide">
                  Manuscript Navigation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--gold)] cursor-pointer"
                aria-label="Close shortcuts dialog"
              >
                ✕ Esc
              </button>
            </div>

            <ul className="space-y-3.5 list-none p-0 m-0">
              {shortcuts.map((sc) => (
                <li
                  key={sc.key}
                  className="flex items-center justify-between text-sm py-1.5 border-b border-black/5 dark:border-white/5"
                >
                  <span className="text-[var(--text-secondary)]">{sc.label}</span>
                  <kbd className="px-2.5 py-1 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 rounded text-xs font-mono font-bold text-[#E07A1F]">
                    {sc.key}
                  </kbd>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 text-center">
              <span className="text-[11px] font-[var(--font-marginalia)] uppercase tracking-widest text-[var(--gold)]">
                Press any key to navigate or Esc to return
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
