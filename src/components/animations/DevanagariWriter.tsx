import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface DevanagariWriterProps {
  text: string
  translation?: string
  source?: string
  className?: string
}

export default function DevanagariWriter({
  text = 'ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै ।',
  translation = 'May we be protected together; may we be nourished together; may we work with great vigor.',
  source = 'Taittirīya Upaniṣad Śānti Pāṭha',
  className = ''
}: DevanagariWriterProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.25 })
  const prefersReduced = useReducedMotion()
  const [isWritten, setIsWritten] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsWritten(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  return (
    <div ref={ref} className={`my-10 p-6 md:p-8 rounded-lg text-center relative overflow-hidden bg-[var(--parchment-light)] border border-[var(--border-color)] ${className}`}>
      {/* Decorative string-hole rings on palm-leaf sides */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[var(--parchment-dark)] bg-[var(--parchment)]" aria-hidden="true" />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[var(--parchment-dark)] bg-[var(--parchment)]" aria-hidden="true" />

      {/* Source header */}
      {source && (
        <span className="text-xs uppercase tracking-widest text-[var(--saffron)] font-[var(--font-marginalia)] block mb-3">
          {source}
        </span>
      )}

      {/* Sanskrit Text with stroke/clip reveal effect */}
      <div className="relative inline-block my-2 px-6">
        <motion.p
          className="sanskrit text-2xl md:text-3xl leading-relaxed text-[var(--vermilion)] transition-all duration-1000"
          style={{
            textShadow: isWritten ? '0 0 16px rgba(232, 137, 43, 0.4)' : 'none',
          }}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {text}
        </motion.p>

        {/* Shimmer line sweep when written */}
        {isWritten && !prefersReduced && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(201,162,58,0.2), transparent)',
            }}
          />
        )}
      </div>

      {/* English translation */}
      {translation && (
        <motion.p
          className="text-base italic text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto font-[var(--font-body)]"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          "{translation}"
        </motion.p>
      )}
    </div>
  )
}
