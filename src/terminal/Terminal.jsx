import { useEffect, useRef, useState } from 'react'
import { useTerminal } from './useTerminal'
import OutputLine, { Prompt } from './OutputLine'
import { useLocale } from '../i18n/useLocale'
import { useIsMobile } from '../components/useIsMobile'

const CHIPS = ['help', 'chat', 'whoami', 'experience', 'education', 'skills', 'contact', 'neofetch']

export default function Terminal() {
  const { lines, input, setInput, exec, historyPrev, historyNext, complete } = useTerminal()
  const { t } = useLocale()
  const isMobile = useIsMobile()
  const inputRef = useRef(null)
  const scrollRef = useRef(null)
  const [caret, setCaret] = useState(0)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  useEffect(() => {
    if (!isMobile) inputRef.current?.focus()
  }, [isMobile])

  const syncCaret = (e) => setCaret(e.target.selectionStart ?? e.target.value.length)

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      exec(input)
      setCaret(0)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      historyPrev()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      historyNext()
    } else if (e.key === 'Tab') {
      e.preventDefault()
      complete()
    }
  }

  // Keep the visual caret in sync when input changes programmatically
  // (history navigation, tab completion).
  useEffect(() => {
    const el = inputRef.current
    if (el && el.value !== input) return // controlled update pending
    setCaret((c) => Math.min(c, input.length))
  }, [input])

  useEffect(() => {
    const el = inputRef.current
    if (el && document.activeElement === el) setCaret(el.selectionStart ?? input.length)
  }, [input])

  const runChip = (cmd) => {
    exec(cmd)
    if (!isMobile) inputRef.current?.focus()
  }

  const before = input.slice(0, caret)
  const atCaret = input[caret] ?? ' '
  const after = input.slice(caret + 1)

  return (
    // Click-to-focus convenience; the real input remains keyboard-accessible.
    <div className="flex h-full min-h-0 flex-col" onClick={() => inputRef.current?.focus()}>
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="min-h-0 flex-1 overflow-y-auto px-3 py-2 text-sm"
      >
        {lines.map((line) => (
          <OutputLine key={line.id} line={line} />
        ))}
        <div className="term-line text-phosphor-bright" aria-hidden="true">
          <Prompt />
          <span>{before}</span>
          <span
            className={`${focused ? 'cursor-blink' : 'opacity-40'} -mb-0.5 inline-block w-[1ch] bg-phosphor text-crt-deep`}
          >
            {atCaret}
          </span>
          <span>{after}</span>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto border-t border-chrome-edge bg-chrome/60 px-2 py-1.5">
        {CHIPS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              runChip(cmd)
            }}
            className="shrink-0 border border-chrome-edge bg-crt-raised px-2 py-0.5 text-xs text-phosphor-dim transition-colors hover:border-phosphor-dim hover:text-phosphor"
          >
            {cmd}
          </button>
        ))}
      </div>

      <input
        ref={inputRef}
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          syncCaret(e)
        }}
        onKeyDown={onKeyDown}
        onKeyUp={syncCaret}
        onClick={syncCaret}
        onSelect={syncCaret}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={t('term.inputLabel')}
        placeholder={t('term.placeholder')}
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="off"
        spellCheck="false"
        enterKeyHint="go"
        className="h-9 border-t border-chrome-edge bg-crt-deep px-3 text-sm text-phosphor outline-none placeholder:text-phosphor-faint md:pointer-events-none md:absolute md:h-px md:w-px md:border-0 md:opacity-0"
      />
    </div>
  )
}
