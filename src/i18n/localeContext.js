import { createContext } from 'react'

export const LocaleContext = createContext(null)

// Resolve a { no, en } content field for the active locale.
export function pick(field, locale) {
  if (field && typeof field === 'object' && !Array.isArray(field)) return field[locale]
  return field
}
