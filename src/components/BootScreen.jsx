import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useLocale } from '../i18n/useLocale'
import { bootLines, asciiLogo } from '../content/strings'

export default function BootScreen({ onDone }) {
  const { locale, t } = useLocale()
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (reduced) return undefined
    if (shown > bootLines.length) return undefined
    const delay = shown === 0 ? 400 : shown === bootLines.length ? 700 : 260
    const id = setTimeout(() => {
      if (shown === bootLines.length) onDone()
      else setShown((s) => s + 1)
    }, delay)
    return () => clearTimeout(id)
  }, [shown, reduced, onDone])

  useEffect(() => {
    if (reduced) return undefined
    const skip = () => onDone()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [reduced, onDone])

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-6 bg-crt-deep px-4">
      <pre
        aria-hidden="true"
        className="text-[7px] leading-[1.15] text-phosphor-bright glow sm:text-[10px] md:text-xs"
      >
        {asciiLogo}
      </pre>
      {reduced ? (
        <button
          type="button"
          onClick={onDone}
          className="border border-phosphor-dim px-4 py-1.5 text-phosphor-bright hover:bg-phosphor hover:text-crt-deep"
        >
          {t('boot.enter')} ⏎
        </button>
      ) : (
        <>
          <div className="min-h-40 w-full max-w-md text-sm" aria-live="polite">
            {bootLines.slice(0, shown).map((line) => (
              <p key={line.en} className="term-line">
                <span className="text-signal">[ OK ]</span> {line[locale]}
              </p>
            ))}
            {shown >= bootLines.length && (
              <p className="term-line">
                <span className="cursor-blink -mb-0.5 inline-block h-4 w-[1ch] bg-phosphor" />
              </p>
            )}
          </div>
          <p className="text-xs text-phosphor-faint">{t('boot.skip')}</p>
        </>
      )}
    </div>
  )
}
