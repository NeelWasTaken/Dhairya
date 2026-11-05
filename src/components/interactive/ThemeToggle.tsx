import { useRef } from 'react'
import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle() {
  const [theme, toggleTheme] = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Optional View Transitions API or clip-path circular reveal
    const rect = buttonRef.current?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : e.clientX
    const y = rect ? rect.top + rect.height / 2 : e.clientY

    // Create ripple circle element
    const ripple = document.createElement('div')
    ripple.className = 'theme-clip-transition'
    ripple.style.background = theme === 'day' ? '#07060B' : '#FBF7EF'
    ripple.style.clipPath = `circle(0px at ${x}px ${y}px)`
    ripple.style.transition = 'clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
    document.body.appendChild(ripple)

    requestAnimationFrame(() => {
      const maxDim = Math.hypot(window.innerWidth, window.innerHeight)
      ripple.style.clipPath = `circle(${maxDim}px at ${x}px ${y}px)`
    })

    setTimeout(() => {
      toggleTheme()
      setTimeout(() => {
        ripple.style.opacity = '0'
        ripple.style.transition = 'opacity 0.3s ease'
        setTimeout(() => ripple.remove(), 350)
      }, 50)
    }, 400)
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      className="relative w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border-color)] bg-[var(--surface)] hover:scale-105 transition-all shadow-sm group"
      aria-label={`Switch to ${theme === 'day' ? 'Night Gurukul' : 'Dawn Manuscript'} theme`}
      title={`Switch to ${theme === 'day' ? 'Night Gurukul' : 'Dawn Manuscript'} mode`}
    >
      <span className="text-lg transition-transform duration-300 group-hover:rotate-12">
        {theme === 'day' ? '🌙' : '☀️'}
      </span>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
