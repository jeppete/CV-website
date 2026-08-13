import { useLocale } from '../i18n/useLocale'
import { pick } from '../i18n/localeContext'
import { profile } from '../content/cv'

export default function ContactApp() {
  const { locale, t } = useLocale()
  const rows = [
    [t('contact.email'), profile.email, `mailto:${profile.email}`],
    ['LinkedIn', 'linkedin.com/in/jeppe-thy', profile.linkedin],
    ['GitHub', 'github.com/jeppete', profile.github],
    [t('contact.location'), pick(profile.location, locale), null],
  ]
  return (
    <div className="space-y-4 text-sm">
      <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
        {rows.map(([label, value, href]) => (
          <div key={label} className="col-span-2 grid grid-cols-subgrid items-baseline">
            <dt className="text-phosphor-faint">{label}</dt>
            <dd className="m-0 truncate">
              {href ? (
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {value}
                </a>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
