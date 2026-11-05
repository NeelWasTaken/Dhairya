import { useState, useEffect, useRef, type ReactNode } from 'react'

interface LazyViewportProps {
  children: ReactNode
  minHeight?: string | number
  rootMargin?: string
  placeholderText?: string
}

export default function LazyViewport({
  children,
  minHeight = '300px',
  rootMargin = '350px 0px',
  placeholderText,
}: LazyViewportProps) {
  const [isNearViewport, setIsNearViewport] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsNearViewport(true)
          } else {
            // Dispose/unmount when scrolling away to free GPU memory & rAF loops
            setIsNearViewport(false)
          }
        })
      },
      { rootMargin, threshold: 0.01 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div
      ref={containerRef}
      style={{ minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }}
      className="relative w-full"
    >
      {isNearViewport ? (
        children
      ) : (
        <div
          className="w-full flex items-center justify-center p-8 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface)]/20"
          style={{ minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }}
          aria-hidden="true"
        >
          {placeholderText && (
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--gold)]/40">
              {placeholderText}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
