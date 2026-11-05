interface MandalaBorderBandProps {
  className?: string
  opacity?: number
  height?: number
  color?: string
}

export default function MandalaBorderBand({
  className = '',
  opacity = 0.35,
  height = 14,
  color = 'var(--gold)',
}: MandalaBorderBandProps) {
  return (
    <div
      className={`w-full overflow-hidden flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ height: `${height}px`, opacity }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        style={{ color }}
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <pattern
          id="mandala-band-pattern"
          x="0"
          y="0"
          width="48"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          {/* Diamond motif */}
          <polygon points="24,2 32,7 24,12 16,7" stroke="currentColor" fill="none" opacity="0.8" />
          <circle cx="24" cy="7" r="1.5" fill="currentColor" />
          {/* Petal arcs */}
          <path d="M16 7 Q20 3 24 7 Q20 11 16 7 Z" fill="none" opacity="0.4" />
          <path d="M32 7 Q28 3 24 7 Q28 11 32 7 Z" fill="none" opacity="0.4" />
          {/* Horizontal connecting hairline */}
          <line x1="0" y1="7" x2="16" y2="7" stroke="currentColor" opacity="0.4" />
          <line x1="32" y1="7" x2="48" y2="7" stroke="currentColor" opacity="0.4" />
          {/* Side tiny dots */}
          <circle cx="8" cy="7" r="1" fill="currentColor" opacity="0.6" />
          <circle cx="40" cy="7" r="1" fill="currentColor" opacity="0.6" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#mandala-band-pattern)" />
      </svg>
    </div>
  )
}
