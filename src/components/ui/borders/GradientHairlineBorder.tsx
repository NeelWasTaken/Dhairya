import type { ReactNode } from 'react'

interface GradientHairlineBorderProps {
  children: ReactNode
  className?: string
  borderRadius?: number
  brightenOnHover?: boolean
}

export default function GradientHairlineBorder({
  children,
  className = '',
  borderRadius = 9999,
  brightenOnHover = true,
}: GradientHairlineBorderProps) {
  return (
    <div
      className={`group relative ${className}`}
      style={{ borderRadius: `${borderRadius}px` }}
    >
      {/* 1px Gradient Hairline using mask-composite */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          brightenOnHover ? 'opacity-40 group-hover:opacity-100' : 'opacity-50'
        }`}
        style={{
          borderRadius: `${borderRadius}px`,
          padding: '1px',
          background: 'linear-gradient(135deg, var(--gold) 0%, var(--saffron) 50%, var(--indigo) 100%)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
        aria-hidden="true"
      />

      {children}
    </div>
  )
}
