import { useLocale } from '../i18n/useLocale'
import { pick } from '../i18n/localeContext'
import { experience, formatRange } from '../content/cv'

export default function ExperienceApp() {
  const { locale } = useLocale()
  return (
    <ol className="relative ml-1.5 list-none space-y-5 border-l border-chrome-edge pl-5">
      {experience.map((job) => {
        const current = job.end === null
        return (
          <li key={job.id} className="relative">
            <span
              aria-hidden="true"
              className={`absolute top-1.5 -left-[26px] h-2.5 w-2.5 rotate-45 border ${
                current ? 'border-signal bg-signal/40' : 'border-phosphor-dim bg-crt-raised'
              }`}
            />
            <div className="flex flex-wrap items-baseline gap-x-2">
              <h3 className="font-bold text-phosphor-bright">{pick(job.role, locale)}</h3>
              <span className="text-signal">
                @{' '}
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noreferrer" className="text-signal">
                    {pick(job.org, locale)}
                  </a>
                ) : (
                  pick(job.org, locale)
                )}
              </span>
            </div>
            <p className="text-xs text-phosphor-dim">
              <time dateTime={job.start}>{formatRange(job.start, job.end, locale)}</time>
              {pick(job.location, locale) && ` · ${pick(job.location, locale)}`}
            </p>
            <p className="mt-1 text-sm">{pick(job.summary, locale)}</p>
            {job.tags && (
              <p className="mt-1.5 flex flex-wrap gap-1.5">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-chrome-edge px-1.5 text-[10px] text-phosphor-dim"
                  >
                    #{tag}
                  </span>
                ))}
              </p>
            )}
          </li>
        )
      })}
    </ol>
  )
}
