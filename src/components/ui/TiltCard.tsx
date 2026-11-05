import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  lift?: number
  notched?: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  dataCursor?: string
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  lift = 8,
  notched = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  dataCursor = 'View',
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return
      const card = cardRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Normalised coordinates for spotlight
      const pctX = (x / rect.width) * 100
      const pctY = (y / rect.height) * 100
      setMousePos({ x: pctX, y: pctY })

      // 3D tilt angles (clamped to maxTilt)
      const rX = ((y - centerY) / centerY) * -maxTilt
      const rY = ((x - centerX) / centerX) * maxTilt
      setRotateX(rX)
      setRotateY(rY)
    },
    [maxTilt, prefersReduced]
  )

  const handleMouseEnterCard = () => {
    setIsHovered(true)
    if (onMouseEnter) onMouseEnter()
  }

  const handleMouseLeaveCard = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
    if (onMouseLeave) onMouseLeave()
  }

  // Notched / chamfered clip-path polygon
  const notchedStyle = notched
    ? {
        clipPath: 'polygon(14px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px)',
      }
    : {}

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnterCard}
      onMouseLeave={handleMouseLeaveCard}
      onClick={onClick}
      data-cursor={dataCursor}
      className={`tilt-card-item relative transition-shadow duration-500 cursor-pointer ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      animate={
        prefersReduced
          ? {}
          : {
              rotateX,
              rotateY,
              y: isHovered ? -lift : 0,
            }
      }
      transition={{
        duration: 0.25,
        ease: 'easeOut',
      }}
    >
      <div
        className="w-full h-full relative overflow-hidden transition-all duration-500 rounded-3xl"
        style={notchedStyle}
      >
        {/* Inner Radial Spotlight Following Cursor */}
        {!prefersReduced && isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(224, 122, 31, 0.08), rgba(184, 137, 43, 0.04) 40%, transparent 80%)`,
              opacity: isHovered ? 1 : 0,
            }}
            aria-hidden="true"
          />
        )}

        {/* Dynamic Highlight Edge */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-500"
          style={{
            border: '1px solid rgba(184, 137, 43, 0.35)',
            boxShadow: isHovered
              ? 'inset 0 0 20px rgba(184, 137, 43, 0.12), 0 16px 36px -10px rgba(20, 18, 31, 0.14)'
              : 'none',
            opacity: isHovered ? 1 : 0.6,
          }}
          aria-hidden="true"
        />

        {children}
      </div>
    </motion.div>
  )
}
