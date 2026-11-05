import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dedicationData from '../../content/dedication.json'

interface DedicationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DedicationModal({ isOpen, onClose }: DedicationModalProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Personal Dedication"
        >
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#FAF8F3] dark:bg-[#161224] text-[#14121F] dark:text-[#FAF8F3] border border-[#B8892B]/40 dark:border-[#B8892B]/30 rounded-2xl p-8 shadow-2xl text-center"
          >
            {/* Corner Decorative Accents */}
            <div className="absolute top-3 left-3 text-xs text-[#B8892B]/40">❦</div>
            <div className="absolute top-3 right-3 text-xs text-[#B8892B]/40">❦</div>
            <div className="absolute bottom-3 left-3 text-xs text-[#B8892B]/40">❦</div>
            <div className="absolute bottom-3 right-3 text-xs text-[#B8892B]/40">❦</div>

            {/* Sunflower Icon */}
            <div className="mx-auto w-10 h-10 mb-4 flex items-center justify-center text-[#E07A1F]">
              <svg viewBox="0 0 40 40" width="40" height="40" className="animate-spin-slow">
                <circle cx="20" cy="20" r="7" fill="#4A2C12" stroke="#E07A1F" strokeWidth="1.5" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx="20"
                    cy="6"
                    rx="2.5"
                    ry="5"
                    fill="#F2B01E"
                    stroke="#8B4D0D"
                    strokeWidth="0.8"
                    transform={`rotate(${i * 30} 20 20)`}
                  />
                ))}
              </svg>
            </div>

            {/* Subheading / Label */}
            <span className="block text-[11px] font-[var(--font-marginalia)] uppercase tracking-[0.25em] text-[#B8892B] mb-3">
              Personal Dedication
            </span>

            {/* Dedication Text */}
            <blockquote className="font-serif italic text-lg sm:text-xl leading-relaxed text-[#14121F] dark:text-[#FAF8F3] mb-6 px-2">
              &ldquo;{dedicationData.text}&rdquo;
            </blockquote>

            {/* Signature if present */}
            {dedicationData.signature && (
              <p className="text-xs tracking-widest uppercase font-serif text-[#7A4E14] dark:text-[#D4AF37]/80">
                — {dedicationData.signature}
              </p>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2 text-xs uppercase tracking-widest font-[var(--font-marginalia)] bg-[#B8892B]/15 hover:bg-[#B8892B] text-[#7A4E14] dark:text-[#FAF8F3] hover:text-[#FAF8F3] dark:hover:text-[#07060B] rounded-full transition-colors cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
