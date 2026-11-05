import { useState, useEffect } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function BackToTop() {
  const prefersReduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setScrollProgress(Math.min(scrollY / docHeight, 1.0))
      }
      setVisible(scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? 'instant' : 'smooth',
    })
  }

  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeOffset = circumference - scrollProgress * circumference

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-[800] w-12 h-12 rounded-full bg-[var(--surface)]/90 text-[var(--gold)] border border-[var(--gold)]/30 backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] cursor-pointer ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll back to top of manuscript"
    >
      <svg
        viewBox="0 0 44 44"
        width="44"
        height="44"
        className="absolute inset-0 -rotate-90 pointer-events-none"
      >
        {/* Track */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.15"
        />
        {/* Progress Fill */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
          className="transition-all duration-75"
        />
      </svg>
      <span className="text-sm font-bold relative z-10">↑</span>
    </button>
  )
}
