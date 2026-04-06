import { useState, useEffect, useCallback } from 'react'
export type Theme = 'dark' | 'light'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => setTheme(p => p === 'dark' ? 'light' : 'dark'), [])
  return { theme, toggleTheme }
}
