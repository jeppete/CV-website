import { useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './themeContext'

const STORAGE_KEY = 'jeppeos.theme'
const THEME_COLORS = { dark: '#0b1013', light: '#ede3cd' }

function initialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* storage unavailable */
  }
  return 'dark' // the CRT identity is dark-first
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* storage unavailable */
    }
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme }), [theme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
