import { useCallback, useEffect, useMemo, useState } from 'react'
import { LocaleContext } from './localeContext'
import { strings } from '../content/strings'

const STORAGE_KEY = 'jeppeos.lang'

function initialLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'no' || saved === 'en') return saved
  } catch {
    /* storage unavailable */
  }
  const nav = (navigator.language || '').toLowerCase()
  return /^(no|nb|nn)/.test(nav) ? 'no' : 'en'
}

export default function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(initialLocale)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      /* storage unavailable */
    }
    document.documentElement.lang = locale
  }, [locale])

  // t('key') or t('key', arg) where %s in the string is replaced by arg.
  const t = useCallback(
    (key, arg) => {
      const value = strings[key]?.[locale] ?? key
      return arg !== undefined ? value.replace('%s', arg) : value
    },
    [locale],
  )

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
