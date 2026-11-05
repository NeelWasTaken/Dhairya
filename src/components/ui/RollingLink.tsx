import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface RollingLinkProps {
  to: string
  children: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  dataCursor?: string
  ariaLabel?: string
}

export default function RollingLink({
  to,
  children,
  className = '',
  onClick,
  dataCursor = 'Explore',
  ariaLabel,
}: RollingLinkProps) {
  const prefersReduced = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const letters = children.split('')

  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor={dataCursor}
      aria-label={ariaLabel || children}
      className={`relative inline-block py-1 cursor-pointer group ${className}`}
    >
      <span className="relative z-10 inline-flex overflow-hidden">
        {letters.map((char, i) => (
          <span
            key={i}
            className="inline-block relative overflow-hidden"
            style={{ height: '1.25em' }}
          >
            <span
              className="inline-block transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transitionDelay: prefersReduced ? '0ms' : `${i * 18}ms`,
                transform: isHovered && !prefersReduced ? 'translateY(-100%)' : 'translateY(0%)',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
            <span
              className="inline-block absolute inset-0 text-[var(--gold)] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transitionDelay: prefersReduced ? '0ms' : `${i * 18}ms`,
                transform: isHovered && !prefersReduced ? 'translateY(0%)' : 'translateY(100%)',
              }}
              aria-hidden="true"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ))}
      </span>

      {/* Underline draws from left on enter, exits to right on leave */}
      <span
        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[var(--gold)] pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transformOrigin: isHovered ? 'left' : 'right',
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          opacity: isHovered ? 1 : 0,
        }}
        aria-hidden="true"
      />
    </Link>
  )
}
