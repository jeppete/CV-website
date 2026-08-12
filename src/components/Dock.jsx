import { appMeta } from '../os/appMeta'
import { useOS } from '../os/useOS'
import { useLocale } from '../i18n/useLocale'

export default function Dock() {
  const { windows, openWindow } = useOS()
  const { t } = useLocale()
  const openIds = new Set(windows.map((w) => w.id))

  return (
    <nav
      aria-label={t('dock.label')}
      className="flex justify-start gap-1 overflow-x-auto border-t border-chrome-edge bg-chrome px-2 py-1.5 md:justify-center md:gap-2"
    >
      {appMeta.map((app) => (
        <button
          key={app.id}
          type="button"
          onClick={() => openWindow(app.id)}
          className="group flex shrink-0 flex-col items-center gap-0.5 px-1.5 py-0.5"
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center border border-chrome-edge bg-crt-raised text-sm text-phosphor-bright transition-colors group-hover:border-phosphor-dim group-hover:glow md:h-10 md:w-10"
          >
            {app.glyph}
          </span>
          <span className="text-[10px] text-phosphor-dim group-hover:text-phosphor">
            {t(app.titleKey)}
          </span>
          <span
            aria-hidden="true"
            className={`h-1 w-1 rounded-full ${openIds.has(app.id) ? 'bg-signal' : 'bg-transparent'}`}
          />
        </button>
      ))}
    </nav>
  )
}
