import { useLocale } from '../i18n/useLocale'
import { pick } from '../i18n/localeContext'
import { profile, experience } from '../content/cv'

// Company display name → website, sourced from any experience entry with a `url`
// (both locale spellings), so the About text links the same places as Experience.
const companyLinks = experience
  .filter((job) => job.url)
  .flatMap((job) => {
    const names = typeof job.org === 'string' ? [job.org] : [job.org.no, job.org.en]
    return names.map((name) => [name, job.url])
  })

const linkPattern =
  companyLinks.length > 0
    ? new RegExp(`(${companyLinks.map(([n]) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
    : null

// Turn a plain string into nodes with company names wrapped in links.
function linkify(text) {
  if (!linkPattern) return text
  return text.split(linkPattern).map((part, i) => {
    const hit = companyLinks.find(([name]) => name === part)
    return hit ? (
      <a key={i} href={hit[1]} target="_blank" rel="noreferrer">
        {part}
      </a>
    ) : (
      part
    )
  })
}

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
          <p className="text-phosphor-dim">{linkify(pick(profile.title, locale))}</p>
        </div>
      </div>
      {profile.about[locale].map((paragraph) => (
        <p key={paragraph.slice(0, 24)}>{linkify(paragraph)}</p>
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
