import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface MagneticButtonProps {
  children: string
  devanagari?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  dataCursor?: string
  ariaLabel?: string
}

export default function MagneticButton({
  children,
  devanagari,
  onClick,
  className = '',
  variant = 'primary',
  dataCursor = 'Begin',
  ariaLabel,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const prefersReduced = useReducedMotion()
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [entrySide, setEntrySide] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom')
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (prefersReduced) return
      const btn = btnRef.current
      if (!btn) return

      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      // Clamp magnetic pull to 10px
      const dist = Math.sqrt(x * x + y * y)
      const maxPull = 10
      if (dist > 0) {
        const pull = Math.min(dist * 0.25, maxPull)
        setOffset({
          x: (x / dist) * pull,
          y: (y / dist) * pull,
        })
      }
    },
    [prefersReduced]
  )

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true)
    const btn = btnRef.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)

    // Detect closest entry edge
    if (Math.abs(dx) > Math.abs(dy)) {
      setEntrySide(dx > 0 ? 'right' : 'left')
    } else {
      setEntrySide(dy > 0 ? 'bottom' : 'top')
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setOffset({ x: 0, y: 0 })
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current
    if (btn) {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()
      setRipples(prev => [...prev.slice(-2), { id, x, y }])
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id))
      }, 700)
    }
    if (onClick) onClick(e)
  }

  // Directional wipe clip-paths
  const getWipeOrigin = () => {
    switch (entrySide) {
      case 'left':
        return 'inset(0% 100% 0% 0%)'
      case 'right':
        return 'inset(0% 0% 0% 100%)'
      case 'top':
        return 'inset(0% 0% 100% 0%)'
      case 'bottom':
      default:
        return 'inset(100% 0% 0% 0%)'
    }
  }

  const isPrimary = variant === 'primary'

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-cursor={dataCursor}
      aria-label={ariaLabel || children}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full font-bold cursor-pointer transition-shadow duration-500 ${className}`}
      animate={prefersReduced ? {} : { x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      style={{
        padding: '16px 36px',
        backgroundColor: isPrimary ? 'var(--gold)' : 'var(--surface)',
        color: isPrimary ? '#2B1B10' : 'var(--text-primary)',
        boxShadow: isPrimary
          ? '0 8px 24px -6px rgba(184, 137, 43, 0.35)'
          : '0 4px 16px -4px rgba(20, 18, 31, 0.08)',
      }}
    >
      {/* 1px Gradient Hairline Border */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full p-[1px] transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, var(--gold) 0%, var(--saffron) 50%, var(--indigo) 100%)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          opacity: isHovered ? 1 : 0.4,
        }}
        aria-hidden="true"
      />

      {/* Directional Wipe Fill Layer */}
      {!prefersReduced && (
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500 rounded-full"
          style={{
            background: isPrimary
              ? 'linear-gradient(135deg, var(--gold-light) 0%, var(--saffron) 100%)'
              : 'rgba(184, 137, 43, 0.12)',
            clipPath: isHovered ? 'inset(0% 0% 0% 0%)' : getWipeOrigin(),
            transition: 'clip-path 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Click Ripple Elements */}
      {ripples.map(r => (
        <span
          key={r.id}
          className="absolute rounded-full pointer-events-none animate-ripple z-10"
          style={{
            left: r.x,
            top: r.y,
            transform: 'translate(-50%, -50%)',
            background: isPrimary ? 'rgba(255, 255, 255, 0.45)' : 'rgba(184, 137, 43, 0.3)',
          }}
          aria-hidden="true"
        />
      ))}

      {/* Rolling Label Container */}
      <span className="relative z-10 block overflow-hidden h-[1.35em] leading-[1.35]">
        <span
          className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: isHovered && !prefersReduced ? 'translateY(-100%)' : 'translateY(0%)',
          }}
        >
          {children}
        </span>
        <span
          className="block absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: isHovered && !prefersReduced ? 'translateY(0%)' : 'translateY(100%)',
          }}
          aria-hidden="true"
        >
          {devanagari ? `${children} · ${devanagari}` : children}
        </span>
      </span>
    </motion.button>
  )
}
