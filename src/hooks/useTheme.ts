import { useState, useCallback, useEffect } from 'react'

type Theme = 'day' | 'night'

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dhairya-theme')
      if (saved === 'day' || saved === 'night') return saved
    }
    return 'day'
  })

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'day' ? 'night' : 'day'
      localStorage.setItem('dhairya-theme', next)
      return next
    })
  }, [])

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return [theme, toggle]
}
