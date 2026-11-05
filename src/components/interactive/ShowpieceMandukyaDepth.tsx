import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function ShowpieceMandukyaDepth() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 })
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return (
      <div className="my-12 p-8 rounded-2xl bg-[#090812] border border-[#231B38] text-center text-white">
        <span className="sanskrit text-3xl text-[var(--gold)] block mb-2">
          शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः
        </span>
        <p className="text-sm italic text-stone-300">
          "Unseen, beyond empirical dealings, peaceful, auspicious, non-dual — that is the Fourth (Turīya). That is the Self."
        </p>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="relative my-14 p-12 md:p-16 rounded-3xl bg-[#08060F] border border-[#221B36] overflow-hidden text-center text-white shadow-2xl flex flex-col items-center justify-center min-h-[320px]"
      aria-label="Mandukya Depth Emergence and Silent Turiya Center"
    >
      {/* Background depth ripple */}
      <motion.div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(201,162,58,0.2)_0%,rgba(14,107,107,0.1)_45%,transparent_75%)]"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={isInView ? { scale: 1.5, opacity: 1 } : {}}
        transition={{ duration: 2.0, ease: 'easeOut' }}
      />

      <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] font-mono block mb-6 relative z-10">
        Māṇḍūkya 7 • Depth of the Witness
      </span>

      {/* Outer Three States emerging from depth (z-axis, blur) */}
      <motion.div
        initial={{ scale: 0.25, opacity: 0, filter: 'blur(16px)' }}
        animate={isInView ? { scale: 1, opacity: 0.75, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 relative z-10 space-y-1"
      >
        <p className="text-sm md:text-base text-stone-400 font-mono tracking-widest uppercase">
          [ Waking: Gross World ] • [ Dream: Subtle Worlds ] • [ Deep Sleep: Causal Void ]
        </p>
      </motion.div>

      {/* TURĪYA: Absolute Stillness at Center (Zero motion, slow fade only) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 2.2, ease: 'easeInOut' }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <span
          className="sanskrit text-2xl md:text-4xl text-[var(--gold)] font-bold block mb-3 drop-shadow-[0_0_30px_rgba(201,162,58,0.7)]"
        >
          शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः
        </span>
        <p className="text-base md:text-lg italic text-[#FBF7EF] font-[var(--font-heading-alt)]">
          "Tranquil, auspicious, and non-dual — that is the Fourth (Turīya). It moves not, yet observes all movement."
        </p>
      </motion.div>
    </div>
  )
}
