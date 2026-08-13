import { useCallback, useRef, useState } from 'react'
import { commands, commandNames, findCommand } from './commands'
import { useOS } from '../os/useOS'
import { useLocale } from '../i18n/useLocale'
import { useTheme } from '../theme/useTheme'
import { useFlags } from '../os/useFlags'

let lineCounter = 0
const nextId = () => ++lineCounter

function toLine(entry) {
  return typeof entry === 'string'
    ? { id: nextId(), kind: 'out', text: entry }
    : { id: nextId(), ...entry }
}

function longestCommonPrefix(items) {
  return items.reduce((acc, item) => {
    let i = 0
    while (i < acc.length && i < item.length && acc[i] === item[i]) i++
    return acc.slice(0, i)
  })
}

export function useTerminal() {
  const { openWindow, closeWindow } = useOS()
  const { locale, setLocale, t } = useLocale()
  const { theme, setTheme } = useTheme()
  const flags = useFlags()
  const [input, setInput] = useState('')
  const [lines, setLines] = useState(() => [
    toLine({ kind: 'ok', text: t('term.welcome1') }),
    toLine(t('term.welcome2')),
  ])
  const historyRef = useRef({ items: [], index: -1, draft: '' })

  const push = useCallback((entries) => {
    setLines((prev) => [...prev, ...entries.map(toLine)])
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const exec = useCallback(
    (raw) => {
      const text = raw.trim()
      push([{ kind: 'input', text: raw }])
      setInput('')
      if (!text) return
      const h = historyRef.current
      if (h.items[h.items.length - 1] !== text) h.items.push(text)
      h.index = -1
      h.draft = ''
      const [name, ...args] = text.split(/\s+/)
      const cmd = findCommand(name.toLowerCase())
      if (!cmd) {
        push([{ kind: 'err', text: t('term.notfound', name) }])
        return
      }
      push(cmd.run(args, { openWindow, closeWindow, setLocale, locale, t, clear, theme, setTheme, flags }) || [])
    },
    [push, clear, openWindow, closeWindow, setLocale, locale, t, theme, setTheme, flags],
  )

  const historyPrev = useCallback(() => {
    const h = historyRef.current
    if (h.items.length === 0) return
    if (h.index === -1) {
      h.draft = input
      h.index = h.items.length - 1
    } else if (h.index > 0) {
      h.index--
    }
    setInput(h.items[h.index])
  }, [input])

  const historyNext = useCallback(() => {
    const h = historyRef.current
    if (h.index === -1) return
    if (h.index < h.items.length - 1) {
      h.index++
      setInput(h.items[h.index])
    } else {
      h.index = -1
      setInput(h.draft)
    }
  }, [])

  const complete = useCallback(() => {
    const parts = input.split(/\s+/)
    let candidates
    let replaceFrom
    if (parts.length <= 1) {
      const prefix = parts[0] || ''
      candidates = commandNames.filter((n) => n.startsWith(prefix))
      replaceFrom = input.length - prefix.length
    } else {
      const cmd = findCommand(parts[0].toLowerCase())
      const prefix = parts[parts.length - 1]
      candidates = (cmd?.argCompletions || []).filter((n) => n.startsWith(prefix))
      replaceFrom = input.length - prefix.length
    }
    if (candidates.length === 0) return
    if (candidates.length === 1) {
      setInput(input.slice(0, replaceFrom) + candidates[0] + (parts.length <= 1 ? ' ' : ''))
      return
    }
    const lcp = longestCommonPrefix(candidates)
    setInput(input.slice(0, replaceFrom) + lcp)
    push([`${t('term.completions')}  ${candidates.join('  ')}`])
  }, [input, push, t])

  return { lines, input, setInput, exec, historyPrev, historyNext, complete }
}

export { commands }
