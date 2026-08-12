import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocale } from '../i18n/useLocale'

// Client for the /api/chat serverless assistant. Keeps conversation state and
// renders it in the terminal aesthetic. All grounding + safety live server-side.
export default function ChatApp() {
  const { locale, t } = useLocale()
  const [messages, setMessages] = useState([]) // {role:'user'|'assistant', content}
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null) // 'error' | 'notConfigured'
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const sessionId = useMemo(
    () => (globalThis.crypto?.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2)),
    [],
  )

  const suggestions = [t('chat.suggest1'), t('chat.suggest2'), t('chat.suggest3')]

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, pending, error])

  const send = useCallback(
    async (text) => {
      const content = text.trim()
      if (!content || pending) return
      setError(null)
      const next = [...messages, { role: 'user', content }]
      setMessages(next)
      setInput('')
      setPending(true)
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ messages: next, locale, sessionId }),
        })
        if (res.status === 503 || res.status === 404) {
          // 503 = key unset in prod; 404 = no serverless function (plain vite dev).
          setError('notConfigured')
          return
        }
        if (!res.ok) throw new Error('request_failed')
        const data = await res.json()
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
      } catch {
        setError('error')
      } finally {
        setPending(false)
        inputRef.current?.focus()
      }
    },
    [messages, pending, locale, sessionId],
  )

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col text-sm">
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label={t('app.chat')}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3"
      >
        <p className="text-signal">» {t('chat.intro')}</p>

        {messages.length === 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="border border-chrome-edge bg-crt-raised px-2 py-0.5 text-xs text-phosphor-dim transition-colors hover:border-phosphor-dim hover:text-phosphor"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
            <div
              className={`max-w-[85%] border px-2.5 py-1.5 ${
                m.role === 'user'
                  ? 'border-phosphor-dim bg-chrome/50 text-phosphor-bright'
                  : 'border-chrome-edge bg-crt-raised text-phosphor'
              }`}
            >
              <span className="mr-1.5 select-none text-phosphor-faint" aria-hidden="true">
                {m.role === 'user' ? '>' : '$'}
              </span>
              <span className="whitespace-pre-wrap break-words">{m.content}</span>
            </div>
          </div>
        ))}

        {pending && (
          <div className="flex justify-start">
            <div className="border border-chrome-edge bg-crt-raised px-2.5 py-1.5 text-phosphor-dim">
              <span className="cursor-blink">▮</span> {t('chat.thinking')}
            </div>
          </div>
        )}

        {error && (
          <div className="text-alert">
            {t(error === 'notConfigured' ? 'chat.notConfigured' : 'chat.error')}
            {error === 'error' && (
              <button
                type="button"
                onClick={() => {
                  const last = [...messages].reverse().find((m) => m.role === 'user')
                  if (last) {
                    setMessages((prev) => prev.slice(0, prev.findLastIndex((m) => m.role === 'user')))
                    send(last.content)
                  }
                }}
                className="ml-2 underline hover:text-phosphor-bright"
              >
                {t('chat.retry')}
              </button>
            )}
          </div>
        )}
      </div>

      <p className="border-t border-chrome-edge bg-chrome/40 px-3 py-1 text-[10px] text-phosphor-faint">
        {t('chat.disclaimer')}
      </p>

      <div className="flex gap-2 border-t border-chrome-edge bg-crt-deep p-2">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={pending}
          aria-label={t('chat.inputLabel')}
          placeholder={t('chat.placeholder')}
          autoCapitalize="sentences"
          autoComplete="off"
          enterKeyHint="send"
          className="h-9 flex-1 border border-chrome-edge bg-crt px-2.5 text-sm text-phosphor outline-none placeholder:text-phosphor-faint focus:border-phosphor-dim disabled:opacity-60"
        />
        <button
          type="button"
          onClick={() => send(input)}
          disabled={pending || !input.trim()}
          className="border border-chrome-edge bg-crt-raised px-3 text-sm text-phosphor-bright transition-colors hover:border-phosphor-dim disabled:opacity-40"
        >
          {t('chat.send')}
        </button>
      </div>
    </div>
  )
}
