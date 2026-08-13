import { motion } from 'framer-motion'
import { appMeta } from '../os/appMeta'
import { useOS } from '../os/useOS'
import { useFlags } from '../os/useFlags'
import { useLocale } from '../i18n/useLocale'

export default function Dock() {
  const { windows, openWindow } = useOS()
  const { allCaptured } = useFlags()
  const { t } = useLocale()
  const openIds = new Set(windows.map((w) => w.id))

  return (
    <nav
      aria-label={t('dock.label')}
      className="flex justify-start gap-1 overflow-x-auto border-t border-chrome-edge bg-chrome px-2 py-1.5 md:justify-center md:gap-2"
    >
      {appMeta
        .filter((app) => !app.hidden || allCaptured)
        .map((app) => {
          const Button = app.hidden ? motion.button : 'button'
          const popIn = app.hidden
            ? {
                initial: { scale: 0, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }
            : {}
          return (
            <Button
              key={app.id}
              type="button"
              onClick={() => openWindow(app.id)}
              className="group flex w-16 shrink-0 flex-col items-center gap-0.5 px-1.5 py-0.5 md:w-20"
              {...popIn}
            >
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center border border-chrome-edge bg-crt-raised text-sm text-phosphor-bright transition-colors group-hover:border-phosphor-dim group-hover:glow md:h-10 md:w-10"
              >
                {app.glyph}
              </span>
              <span className="text-center text-[10px] leading-tight text-phosphor-dim group-hover:text-phosphor">
                {t(app.titleKey)}
              </span>
              <span
                aria-hidden="true"
                className={`h-1 w-1 rounded-full ${openIds.has(app.id) ? 'bg-signal' : 'bg-transparent'}`}
              />
            </Button>
          )
        })}
    </nav>
  )
}
