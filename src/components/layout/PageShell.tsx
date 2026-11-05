import type { ReactNode } from 'react'

interface PageShellProps {
  children: ReactNode
  maxWidth?: 'default' | 'narrow' | 'wide' | 'full'
  className?: string
}

export default function PageShell({
  children,
  maxWidth = 'default',
  className = '',
}: PageShellProps) {
  const maxWidthClass =
    maxWidth === 'narrow'
      ? 'max-w-[850px]'
      : maxWidth === 'wide'
      ? 'max-w-[1400px]'
      : maxWidth === 'full'
      ? 'max-w-full'
      : 'max-w-[1200px]'

  return (
    <div
      className={`page-container min-h-screen ${className}`}
      style={{
        width: '100%',
        marginInline: 'auto',
        paddingInline: 'clamp(1.25rem, 5vw, 6rem)',
        paddingTop: 'var(--header-height, 64px)',
        paddingBottom: 'clamp(3rem, 6vw, 6rem)',
      }}
    >
      <div className={`w-full ${maxWidthClass} mx-auto`}>
        {children}
      </div>
    </div>
  )
}
