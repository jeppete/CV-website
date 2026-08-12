import { useLocale } from '../i18n/useLocale'
import { pick } from '../i18n/localeContext'
import { skills } from '../content/cv'

export default function SkillsApp() {
  const { locale } = useLocale()
  return (
    <div className="space-y-4 text-sm">
      <p className="text-phosphor-dim">
        <span className="text-signal">$</span> jpm list --installed
      </p>
      {skills.map((group, index) => (
        <section key={group.id}>
          <h3 className="text-signal">
            {index === skills.length - 1 ? '└─' : '├─'} {pick(group.label, locale)}
          </h3>
          <ul className="mt-1.5 flex list-none flex-wrap gap-1.5 pl-5">
            {group.items.map((item) => (
              <li
                key={item.en}
                className="border border-chrome-edge bg-crt px-2 py-0.5 text-xs"
              >
                {pick(item, locale)}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
