import { useLocale } from '../i18n/useLocale'
import { pick } from '../i18n/localeContext'
import { profile } from '../content/cv'

export default function AboutApp() {
  const { locale, t } = useLocale()
  return (
    <article className="space-y-4 text-sm">
      <div className="flex items-start gap-4">
        <div className="photo-crt w-24 shrink-0 border border-chrome-edge sm:w-28">
          <img src="/Jeppe-ferdig.jpg" alt={profile.name} width="800" height="1198" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-phosphor-bright glow">{profile.name}</h3>
          <p className="text-phosphor-dim">{pick(profile.title, locale)}</p>
        </div>
      </div>
      {profile.about[locale].map((paragraph) => (
        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
      ))}
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-t border-chrome-edge pt-3">
        <dt className="text-phosphor-faint">{t('about.age')}</dt>
        <dd className="m-0">{profile.age}</dd>
        <dt className="text-phosphor-faint">{t('about.location')}</dt>
        <dd className="m-0">{pick(profile.location, locale)}</dd>
        <dt className="text-phosphor-faint">{t('contact.email')}</dt>
        <dd className="m-0 truncate">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </dd>
      </dl>
    </article>
  )
}
