import { appIds } from '../os/appMeta'
import { pick } from '../i18n/localeContext'
import { profile, experience, education, skills, volunteer, formatRange } from '../content/cv'

// A command's run(args, ctx) returns an array of line descriptors:
//   string                                  → plain output line
//   { kind: 'ok'|'err'|'link'|'neofetch' }  → styled/rich line
// ctx = { openWindow, setLocale, locale, t, clear }

const sectionIds = ['about', 'experience', 'education', 'skills', 'volunteer', 'contact']

function printSection(id, ctx) {
  const { locale } = ctx
  switch (id) {
    case 'about':
      return [
        { kind: 'ok', text: profile.name },
        pick(profile.title, locale),
        ...profile.about[locale].map((p) => `  ${p}`),
      ]
    case 'experience':
      return experience.map(
        (job) =>
          `• ${pick(job.role, locale)} — ${pick(job.org, locale)}  (${formatRange(job.start, job.end, locale)})`,
      )
    case 'education':
      return education.map(
        (e) =>
          `• ${pick(e.degree, locale)} — ${pick(e.org, locale)}  (${formatRange(e.start, e.end, locale)})`,
      )
    case 'skills':
      return skills.map(
        (g) => `• ${pick(g.label, locale)}: ${g.items.map((i) => pick(i, locale)).join(', ')}`,
      )
    case 'volunteer':
      return volunteer.map(
        (v) =>
          `• ${pick(v.role, locale)} — ${pick(v.org, locale)}  (${formatRange(v.start, v.end, locale)})`,
      )
    case 'contact':
      return [
        { kind: 'link', href: `mailto:${profile.email}`, text: profile.email },
        { kind: 'link', href: profile.phoneHref, text: profile.phone },
        { kind: 'link', href: profile.linkedin, text: 'linkedin.com/in/jeppe-thy' },
        { kind: 'link', href: profile.github, text: 'github.com/jeppete' },
      ]
    default:
      return [{ kind: 'err', text: ctx.t('open.unknown', id) }]
  }
}

function openApp(id, ctx) {
  ctx.openWindow(id)
  return [{ kind: 'ok', text: ctx.t('open.opened', ctx.t(`app.${id}`)) }]
}

function sectionCommand(id, descKey) {
  return {
    name: id,
    descKey,
    run: (args, ctx) => [...printSection(id, ctx), ...openApp(id, ctx)],
  }
}

export const commands = [
  {
    name: 'help',
    aliases: ['hjelp', '?'],
    descKey: 'cmd.help',
    run: (args, ctx) =>
      commands
        .filter((c) => !c.hidden)
        .map((c) => `${c.name.padEnd(12)}${ctx.t(c.descKey)}`),
  },
  {
    name: 'whoami',
    descKey: 'cmd.whoami',
    run: (args, ctx) => [...printSection('about', ctx), ...openApp('about', ctx)],
  },
  sectionCommand('experience', 'cmd.experience'),
  sectionCommand('education', 'cmd.education'),
  sectionCommand('skills', 'cmd.skills'),
  sectionCommand('volunteer', 'cmd.volunteer'),
  sectionCommand('contact', 'cmd.contact'),
  {
    name: 'open',
    descKey: 'cmd.open',
    argCompletions: appIds,
    run: (args, ctx) => {
      const id = args[0]
      if (!id) return [ctx.t('open.usage')]
      if (!appIds.includes(id)) return [{ kind: 'err', text: ctx.t('open.unknown', id) }]
      return openApp(id, ctx)
    },
  },
  {
    name: 'ls',
    aliases: ['dir'],
    descKey: 'cmd.ls',
    run: () => [appIds.map((id) => `${id}/`).join('  ')],
  },
  {
    name: 'cat',
    hidden: true,
    argCompletions: sectionIds,
    run: (args, ctx) => {
      if (!args[0]) return [ctx.t('open.usage').replace('open', 'cat')]
      return printSection(args[0], ctx)
    },
  },
  {
    name: 'lang',
    descKey: 'cmd.lang',
    argCompletions: ['no', 'en'],
    run: (args, ctx) => {
      const target = args[0]
      if (target !== 'no' && target !== 'en') return [ctx.t('lang.usage', ctx.locale)]
      ctx.setLocale(target)
      return [{ kind: 'ok', text: ctx.t(`lang.set.${target}`) }]
    },
  },
  {
    name: 'theme',
    descKey: 'cmd.theme',
    argCompletions: ['dark', 'light'],
    run: (args, ctx) => {
      const target = args[0]
      if (target !== 'dark' && target !== 'light') {
        return [ctx.t('theme.usage', ctx.t(`theme.${ctx.theme}`))]
      }
      ctx.setTheme(target)
      return [{ kind: 'ok', text: ctx.t(`theme.set.${target}`) }]
    },
  },
  {
    name: 'neofetch',
    descKey: 'cmd.neofetch',
    run: () => [{ kind: 'neofetch' }],
  },
  {
    name: 'clear',
    aliases: ['cls'],
    descKey: 'cmd.clear',
    run: (args, ctx) => {
      ctx.clear()
      return []
    },
  },
  {
    name: 'sudo',
    hidden: true,
    run: (args, ctx) => [{ kind: 'err', text: ctx.t('sudo.denied') }],
  },
  {
    name: 'exit',
    aliases: ['logout', 'quit'],
    hidden: true,
    run: (args, ctx) => [ctx.t('exit.denied')],
  },
]

export function findCommand(name) {
  return commands.find((c) => c.name === name || c.aliases?.includes(name))
}

export const commandNames = commands.filter((c) => !c.hidden).map((c) => c.name)
