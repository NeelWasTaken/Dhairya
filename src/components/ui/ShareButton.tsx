import { useState } from 'react'

interface ShareButtonProps {
  className?: string
}

export default function ShareButton({ className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareData = {
      title: 'Dhairya — The Unshaken Self',
      text: 'Psychological Resilience in the Upanishads: An immersive scholarly journey.',
      url: window.location.origin,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          // Fall back to clipboard
        } else {
          return
        }
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.origin)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch {
      // Fallback
    }
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleShare}
        className={`inline-flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-widest font-[var(--font-marginalia)] border border-[#2FD4C4]/40 hover:border-[#2FD4C4] text-[#2FD4C4] hover:bg-[#2FD4C4]/10 rounded-full transition-all cursor-pointer backdrop-blur-sm ${className}`}
        aria-label="Share this site"
      >
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        <span>Share Site</span>
      </button>

      {/* Toast Notification */}
      {copied && (
        <div
          role="status"
          className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#161224] text-[#2FD4C4] border border-[#2FD4C4]/50 text-[11px] rounded-md shadow-lg whitespace-nowrap animate-fade-in"
        >
          Link copied to clipboard!
        </div>
      )}
    </div>
  )
}
