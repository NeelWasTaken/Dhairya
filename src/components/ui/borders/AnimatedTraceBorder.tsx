import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

interface AnimatedTraceBorderProps {
  children: React.ReactNode
  className?: string
  borderRadius?: number
  isHovered?: boolean
}

export default function AnimatedTraceBorder({
  children,
  className = '',
  borderRadius = 24,
  isHovered = false,
}: AnimatedTraceBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [hasScrolledIn, setHasScrolledIn] = useState(false)

  useEffect(() => {
    if (prefersReduced) {
      setHasScrolledIn(true)
      return
    }

    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledIn(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [prefersReduced])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius: `${borderRadius}px` }}
    >
      {/* Base Hairline Border */}
      <div
        className="absolute inset-0 pointer-events-none border transition-colors duration-500"
        style={{
          borderRadius: `${borderRadius}px`,
          borderColor: isHovered ? 'rgba(184, 137, 43, 0.45)' : 'var(--border-hairline)',
        }}
        aria-hidden="true"
      />

      {/* SVG Trace Line that draws itself on scroll-in */}
      {!prefersReduced && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ borderRadius: `${borderRadius}px` }}
          aria-hidden="true"
        >
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx={borderRadius - 1}
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1.5"
            strokeDasharray="1000"
            strokeDashoffset={hasScrolledIn ? '0' : '1000'}
            style={{
              transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: hasScrolledIn ? 0.35 : 0,
            }}
          />
        </svg>
      )}

      {/* Traveling Shimmer Light on Hover via conic-gradient mask */}
      {!prefersReduced && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none animate-spin-slow opacity-80"
          style={{
            borderRadius: `${borderRadius}px`,
            padding: '1px',
            background: 'conic-gradient(from 0deg, transparent 0%, transparent 70%, var(--gold) 85%, var(--saffron) 95%, transparent 100%)',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
          }}
          aria-hidden="true"
        />
      )}

      {children}
    </div>
  )
}
