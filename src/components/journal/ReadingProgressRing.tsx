import { useEffect, useState } from 'react'

export default function ReadingProgressRing() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0) {
        const p = Math.min(Math.max(window.scrollY / total, 0), 1)
        setProgress(p)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - progress * circumference

  return (
    <div
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 p-2 rounded-full border border-[var(--gold)]/40 bg-[var(--surface)]/90 backdrop-blur-md shadow-xl select-none"
      aria-label={`Reading progress: ${Math.round(progress * 100)}%`}
    >
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-white/10"
            fill="transparent"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke="var(--gold)"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-150 ease-out"
            fill="transparent"
          />
        </svg>
        <span className="absolute text-[9px] font-mono font-bold text-[var(--gold)]">
          {Math.round(progress * 100)}%
        </span>
      </div>

      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] pr-2 hidden sm:inline">
        Reading Progress
      </span>
    </div>
  )
}
