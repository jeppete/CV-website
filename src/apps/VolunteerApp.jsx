import { useLocale } from '../i18n/useLocale'
import { pick } from '../i18n/localeContext'
import { volunteer, formatRange } from '../content/cv'

export default function VolunteerApp() {
  const { locale } = useLocale()
  return (
    <ol className="relative ml-1.5 list-none space-y-5 border-l border-chrome-edge pl-5">
      {volunteer.map((entry) => (
        <li key={entry.id} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-[26px] h-2.5 w-2.5 rotate-45 border border-phosphor-dim bg-crt-raised"
          />
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h3 className="font-bold text-phosphor-bright">{pick(entry.role, locale)}</h3>
            <span className="text-signal">@ {pick(entry.org, locale)}</span>
          </div>
          <p className="text-xs text-phosphor-dim">
            <time dateTime={entry.start}>{formatRange(entry.start, entry.end, locale)}</time>
            {' · '}
            {pick(entry.location, locale)}
          </p>
          <p className="mt-1 text-sm">{pick(entry.summary, locale)}</p>
        </li>
      ))}
    </ol>
  )
}
