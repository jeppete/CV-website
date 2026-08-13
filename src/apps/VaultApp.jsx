import { useLocale } from '../i18n/useLocale'
import { flagTable } from '../os/flagState'
import { profile } from '../content/cv'

export default function VaultApp() {
  const { t } = useLocale()
  return (
    <article className="space-y-4 text-sm">
      <div>
        <h3 className="text-base font-bold text-phosphor-bright glow">{t('vault.congratsTitle')}</h3>
        <p className="mt-1 text-phosphor-dim">{t('vault.congratsBody')}</p>
      </div>
      <section className="border-t border-chrome-edge pt-3">
        <h3 className="text-signal">{t('vault.flagsTitle')}</h3>
        <ul className="mt-1.5 list-none space-y-1.5 pl-0">
          {flagTable.map((flag) => (
            <li key={flag.id}>
              <span className="text-phosphor-bright">⚑ {t(flag.nameKey)}</span>
              <span className="text-phosphor-dim"> — {t(flag.lessonKey)}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t border-chrome-edge pt-3">
        <h3 className="text-signal">{t('vault.interestsTitle')}</h3>
        <p className="mt-1">{t('vault.interestsBody')}</p>
      </section>
      <footer className="border-t border-chrome-edge pt-3">
        <p>
          {t('vault.contact')}{' '}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      </footer>
    </article>
  )
}
