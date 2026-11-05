import { Link } from 'react-router-dom'
import { useJourneyProgress } from '../../hooks/useJourneyProgress'
import { triggerPortalTransition } from '../animations/PortalTransition'

export default function ProgressThread() {
  const { upanishads, currentUpanishad, isVisited } = useJourneyProgress()

  const handleBeadClick = (e: React.MouseEvent, path: string, title: string) => {
    e.preventDefault()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    triggerPortalTransition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      to: path,
      nextTitle: title,
    })
  }

  return (
    <aside
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col items-center select-none"
      style={{ height: '55vh' }}
      aria-label="Journey progress thread"
    >
      {/* Thread Line */}
      <div className="absolute inset-y-0 w-px bg-[var(--border-color)] left-1/2 -translate-x-1/2 pointer-events-none" />

      {/* 12 Upanishad Beads */}
      <div className="h-full flex flex-col justify-between items-center relative z-10">
        {upanishads.map((u) => {
          const isCurrent = currentUpanishad?.slug === u.slug
          const visited = isVisited(u.path)

          return (
            <Link
              key={u.slug}
              to={u.path}
              onClick={(e) => handleBeadClick(e, u.path, u.title)}
              className="group relative flex items-center justify-center cursor-pointer"
              aria-label={`${u.title} (Station ${u.index})`}
            >
              <div
                className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                  isCurrent
                    ? 'bg-[var(--gold)] border-[var(--gold)] scale-150 ring-4 ring-[var(--gold)]/20 shadow-[0_0_10px_rgba(201,162,58,0.8)]'
                    : visited
                    ? 'bg-[var(--gold)] border-[var(--gold)]/60'
                    : 'bg-[var(--surface)] border-[var(--border-color)] group-hover:border-[var(--gold)]'
                }`}
              />

              {/* Tooltip on left */}
              <span
                className="absolute right-6 px-2.5 py-1 text-xs whitespace-nowrap rounded-lg bg-[#07060B] border border-[var(--gold)]/30 text-[var(--gold-light)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl font-[var(--font-marginalia)] z-50"
              >
                {u.index}. {u.title}
              </span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
