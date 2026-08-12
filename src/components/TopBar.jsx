import { useEffect, useState } from 'react'
import { useLocale } from '../i18n/useLocale'
import { useTheme } from '../theme/useTheme'

function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const pad = (n) => String(n).padStart(2, '0')
  return (
    <span className="tabular-nums text-phosphor-dim">
      {pad(now.getHours())}:{pad(now.getMinutes())}
      <span className="cursor-blink">:</span>
      {pad(now.getSeconds())}
    </span>
  )
}

export default function TopBar() {
  const { locale, setLocale, t } = useLocale()
  const { theme, setTheme } = useTheme()
  return (
    <header className="flex items-center justify-between border-b border-chrome-edge bg-chrome px-3 py-1.5 text-sm">
      <div className="flex items-baseline gap-2">
        <span className="text-phosphor-bright glow" aria-hidden="true">
          ◉
        </span>
        <span className="font-bold tracking-[0.25em] uppercase text-phosphor-bright">
          {t('os.name')}
        </span>
        <span className="text-xs text-phosphor-faint">{t('os.version')}</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={t('theme.toggle')}
          className="border border-chrome-edge px-2 py-0.5 text-xs text-phosphor-dim transition-colors hover:border-phosphor-dim hover:text-phosphor"
        >
          [ {t(`theme.${theme}`)} ]
        </button>
        <div
          role="group"
          aria-label={t('lang.toggle')}
          className="flex border border-chrome-edge text-xs"
        >
          {['no', 'en'].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code)}
              aria-pressed={locale === code}
              className={`px-2 py-0.5 uppercase transition-colors ${
                locale === code
                  ? 'bg-phosphor font-bold text-crt-deep'
                  : 'text-phosphor-dim hover:text-phosphor'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
        <Clock />
      </div>
    </header>
  )
}
