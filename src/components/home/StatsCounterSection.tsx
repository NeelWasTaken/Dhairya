import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import DoubleLineFrame from '../ui/borders/DoubleLineFrame'

const STATS = [
  { value: 12, label: 'Principal Upaniṣads', sanskrit: 'द्वादश उपनिषदः', desc: 'From Īśā to Maitri' },
  { value: 43, label: 'Verified Stanzas', sanskrit: 'त्रयश्चत्वारिंशत् श्लोकाः', desc: 'With word-by-word analysis' },
  { value: 10, label: 'Signature Experiences', sanskrit: 'दश अनुभूताः', desc: 'Chariot, Two Birds, Koshas...' },
  { value: 18, label: 'Scholarly Essays', sanskrit: 'अष्टादश लेखाः', desc: 'Peer-reviewed research journal' },
]

function CountUp({ target, inView }: { target: number; inView: boolean }) {
  const [val, setVal] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (prefersReduced) {
      setVal(target)
      return
    }

    const duration = 1400
    const startTime = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4) // ease-out quartic
      setVal(Math.floor(eased * target))

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setVal(target)
      }
    }

    const rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [inView, target, prefersReduced])

  return <span>{val}</span>
}

export default function StatsCounterSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      aria-label="Corpus Statistics"
    >
      <DoubleLineFrame className="p-8 sm:p-14 rounded-3xl bg-[var(--surface)] shadow-lg">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-[var(--font-marginalia)] font-bold block mb-2">
            प्रमाण संक्षेपः · What You Will Find
          </span>
          <h2 className="text-2xl sm:text-4xl font-[var(--font-heading)] text-[var(--text-primary)]">
            A Rigorous Digital Corpus
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2 max-w-lg mx-auto">
            Every verse verified against primary critical editions, free from modern fabrication.
          </p>
        </div>

        {/* 4 Stats Grid with Line-draw Dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-hairline)] pt-2">
          {STATS.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`text-center flex flex-col items-center ${idx > 0 ? 'pt-6 lg:pt-0 lg:pl-6' : ''}`}
            >
              <div
                className="text-4xl sm:text-6xl font-bold font-mono tracking-tight text-[var(--gold)] mb-1"
                style={{ fontFamily: 'var(--font-heading), monospace' }}
              >
                <CountUp target={s.value} inView={inView} />
              </div>
              <span className="sanskrit text-sm text-[var(--saffron)] font-bold mb-1 block">
                {s.sanskrit}
              </span>
              <span className="font-[var(--font-heading)] text-sm sm:text-base text-[var(--text-primary)] font-semibold block">
                {s.label}
              </span>
              <span className="text-xs text-[var(--text-muted)] mt-1 block">
                {s.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </DoubleLineFrame>
    </section>
  )
}
