import { useLocale } from '../i18n/useLocale'
import { pick } from '../i18n/localeContext'
import { education, formatRange } from '../content/cv'

export default function EducationApp() {
  const { locale } = useLocale()
  return (
    <ol className="list-none space-y-5">
      {education.map((entry) => (
        <li key={entry.id} className="border-l-2 border-chrome-edge pl-4">
          <h3 className="font-bold text-phosphor-bright">{pick(entry.degree, locale)}</h3>
          <p className="text-sm text-signal">{pick(entry.org, locale)}</p>
          <p className="text-xs text-phosphor-dim">
            <time dateTime={entry.start}>{formatRange(entry.start, entry.end, locale)}</time>
            {' · '}
            {pick(entry.location, locale)}
          </p>
        </li>
      ))}
    </ol>
  )
}
