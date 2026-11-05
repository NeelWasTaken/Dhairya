import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import DedicationModal from './DedicationModal'

interface HeroSunflowerProps {
  size?: number
  className?: string
}

export default function HeroSunflower({ size = 32, className = '' }: HeroSunflowerProps) {
  const prefersReduced = useReducedMotion()
  const [rotation, setRotation] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // Track cursor on desktop to turn sunflower toward mouse (+/- 25 deg)
  useEffect(() => {
    if (prefersReduced) return
    if (typeof window === 'undefined') return

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return
      const rect = buttonRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY

      // Calculate angle in degrees
      const angleRad = Math.atan2(dy, dx)
      const angleDeg = (angleRad * 180) / Math.PI

      // Clamp to +/- 25 degrees of upward facing
      const target = Math.max(-25, Math.min(25, angleDeg - 90))
      setRotation(target)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReduced])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setShowModal(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className={`group relative inline-flex items-center justify-center align-middle cursor-pointer transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A1F] rounded-full p-1 max-[360px]:hidden ${className}`}
        style={{
          width: `${size + 8}px`,
          height: `${size + 8}px`,
          verticalAlign: 'middle',
        }}
        aria-label="Personal Dedication — click to read"
      >
        {/* Subtle Tooltip */}
        <span
          className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[9px] tracking-wider uppercase font-[var(--font-marginalia)] rounded bg-[#161224] text-[#FAF8F3] dark:bg-[#FAF8F3] dark:text-[#14121F] shadow pointer-events-none transition-all duration-200 z-30 whitespace-nowrap ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}
        >
          Dedication
        </span>

        {/* Sunflower SVG */}
        <div
          className={`relative flex items-center justify-center transition-transform ${
            !prefersReduced ? 'animate-gentle-bob' : ''
          }`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: prefersReduced
              ? 'none'
              : `rotate(${rotation}deg) scale(${isHovered ? 1.12 : 1.0})`,
            transition: 'transform 0.25s ease-out',
          }}
        >
          <svg
            viewBox="0 0 40 40"
            width={size}
            height={size}
            className="overflow-visible select-none drop-shadow-sm"
          >
            <defs>
              <linearGradient id="heroSunflowerPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#C97A14" />
                <stop offset="50%" stopColor="#F2B01E" />
                <stop offset="100%" stopColor="#FDE37B" />
              </linearGradient>
            </defs>

            {/* Back Layer of 12 Petals */}
            <g transform="translate(20, 20)">
              {Array.from({ length: 12 }).map((_, i) => (
                <ellipse
                  key={`bg-${i}`}
                  cx="0"
                  cy="-13"
                  rx={isHovered ? 2.8 : 2.4}
                  ry="5.2"
                  fill="#D98A16"
                  stroke="#7A420B"
                  strokeWidth="0.6"
                  transform={`rotate(${i * 30 + 15})`}
                />
              ))}

              {/* Front Layer of 12 Petals */}
              {Array.from({ length: 12 }).map((_, i) => (
                <ellipse
                  key={`fg-${i}`}
                  cx="0"
                  cy="-13.5"
                  rx={isHovered ? 3.0 : 2.6}
                  ry="5.8"
                  fill="url(#heroSunflowerPetalGrad)"
                  stroke="#8B4D0D"
                  strokeWidth="0.7"
                  transform={`rotate(${i * 30})`}
                />
              ))}

              {/* Seed Head Center Disc */}
              <circle r="7.2" fill="#4A2C12" stroke="#2B1607" strokeWidth="1.2" />
              <circle r="6.0" fill="#6B3E19" opacity="0.6" />
              <circle r="2.5" fill="#E59B27" opacity="0.8" />
            </g>
          </svg>
        </div>
      </button>

      {/* Dedication Modal */}
      <DedicationModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
