import type { ReactNode } from 'react'

interface DoubleLineFrameProps {
  children?: ReactNode
  className?: string
  cornerOpacity?: number
  inset?: number
  borderColor?: string
}

export default function DoubleLineFrame({
  children,
  className = '',
  cornerOpacity = 0.25,
  inset = 6,
  borderColor = 'var(--gold)',
}: DoubleLineFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer 1px frame */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl border"
        style={{ borderColor: 'rgba(184, 137, 43, 0.35)' }}
        aria-hidden="true"
      />

      {/* Inner 1px frame offset by 6px */}
      <div
        className="absolute pointer-events-none rounded-xl border"
        style={{
          inset: `${inset}px`,
          borderColor: 'rgba(184, 137, 43, 0.22)',
        }}
        aria-hidden="true"
      />

      {/* Top-Left Lotus-bud / Kolam Corner Ornament */}
      <svg
        className="absolute pointer-events-none"
        style={{
          top: `${inset - 3}px`,
          left: `${inset - 3}px`,
          width: '18px',
          height: '18px',
          opacity: cornerOpacity,
          color: borderColor,
        }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M2 12 C2 7 7 2 12 2 M2 2 L6 2 M2 2 L2 6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M5 5 C8 3 11 3 13 5 C11 7 8 7 5 5 Z" fill="currentColor" opacity="0.5" />
      </svg>

      {/* Top-Right Corner */}
      <svg
        className="absolute pointer-events-none"
        style={{
          top: `${inset - 3}px`,
          right: `${inset - 3}px`,
          width: '18px',
          height: '18px',
          opacity: cornerOpacity,
          color: borderColor,
        }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M22 12 C22 7 17 2 12 2 M22 2 L18 2 M22 2 L22 6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M19 5 C16 3 13 3 11 5 C13 7 16 7 19 5 Z" fill="currentColor" opacity="0.5" />
      </svg>

      {/* Bottom-Left Corner */}
      <svg
        className="absolute pointer-events-none"
        style={{
          bottom: `${inset - 3}px`,
          left: `${inset - 3}px`,
          width: '18px',
          height: '18px',
          opacity: cornerOpacity,
          color: borderColor,
        }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M2 12 C2 17 7 22 12 22 M2 22 L6 22 M2 22 L2 18" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M5 19 C8 21 11 21 13 19 C11 17 8 17 5 19 Z" fill="currentColor" opacity="0.5" />
      </svg>

      {/* Bottom-Right Corner */}
      <svg
        className="absolute pointer-events-none"
        style={{
          bottom: `${inset - 3}px`,
          right: `${inset - 3}px`,
          width: '18px',
          height: '18px',
          opacity: cornerOpacity,
          color: borderColor,
        }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M22 12 C22 17 17 22 12 22 M22 22 L18 22 M22 22 L22 18" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M19 19 C16 21 13 21 11 19 C13 17 16 17 19 19 Z" fill="currentColor" opacity="0.5" />
      </svg>

      {children}
    </div>
  )
}
