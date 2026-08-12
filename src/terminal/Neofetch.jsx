import { useLocale } from '../i18n/useLocale'
import { pick } from '../i18n/localeContext'
import { profile } from '../content/cv'
import { asciiLogo } from '../content/strings'

const SWATCHES = ['#ffb454', '#ffd9a0', '#7ddc78', '#ff6d6d', '#3a5059', '#c68f52']

export default function Neofetch() {
  const { locale, t } = useLocale()
  const fields = [
    [t('neofetch.os'), 'JeppeOS 1.0 LTS'],
    [t('neofetch.host'), pick(profile.location, locale)],
    [t('neofetch.kernel'), t('neofetch.kernelValue')],
    [t('neofetch.uptime'), t('neofetch.uptimeValue')],
    [t('neofetch.shell'), 'jsh 5.2'],
    [t('neofetch.packages'), t('neofetch.packagesValue')],
    [t('neofetch.locale'), locale === 'no' ? 'no_NO / en_US' : 'en_US / no_NO'],
  ]
  return (
    <div className="my-2 flex flex-wrap items-start gap-x-6 gap-y-2">
      <pre aria-hidden="true" className="text-[6px] leading-[1.15] text-phosphor-bright glow sm:text-[8px]">
        {asciiLogo}
      </pre>
      <div>
        <p className="text-signal">
          jeppe<span className="text-phosphor-dim">@</span>jeppeos
        </p>
        <p aria-hidden="true" className="text-phosphor-faint">
          ─────────────
        </p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3">
          {fields.map(([label, value]) => (
            <div key={label} className="col-span-2 grid grid-cols-subgrid">
              <dt className="text-phosphor-bright">{label}</dt>
              <dd className="m-0">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-2 flex gap-1" aria-hidden="true">
          {SWATCHES.map((c) => (
            <span key={c} className="h-3 w-5" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  )
}
