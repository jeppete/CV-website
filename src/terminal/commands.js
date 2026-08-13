import { appIds, publicAppIds } from '../os/appMeta'
import { pick } from '../i18n/localeContext'
import { profile, experience, education, skills, volunteer, formatRange } from '../content/cv'
import { flagTable, readStorageFlag, checkRootPassword, getRootFlag } from '../os/flagState'
import { fakeFiles, fakeFileNames } from './fakeFiles'

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
    name: 'chat',
    aliases: ['ask'],
    descKey: 'cmd.chat',
    run: (args, ctx) => openApp('chat', ctx),
  },
  {
    name: 'flags',
    descKey: 'cmd.flags',
    run: (args, ctx) => {
      const { t } = ctx
      if (args[0] === 'reset') {
        ctx.flags.reset()
        ctx.closeWindow('vault')
        return [{ kind: 'ok', text: t('flags.resetDone') }]
      }
      const { captured, total, allCaptured } = ctx.flags
      const lines = [t('flags.header', `${captured.length}/${total}`)]
      for (const f of flagTable) {
        if (captured.includes(f.id)) {
          lines.push({ kind: 'ok', text: `[ ✓ ] ${t(f.nameKey)}` })
        } else {
          lines.push('[   ] ???')
        }
      }
      if (allCaptured) lines.push({ kind: 'ok', text: t('flags.done') })
      return lines
    },
  },
  {
    name: 'capture',
    aliases: ['submit'],
    descKey: 'cmd.capture',
    run: (args, ctx) => {
      const { t } = ctx
      if (args.length === 0) return [t('capture.usage')]
      const res = ctx.flags.capture(args.join(' '))
      if (res.status === 'invalid') return [{ kind: 'err', text: t('capture.invalid') }]
      if (res.status === 'dupe') return [t('capture.dupe')]
      const flag = flagTable.find((f) => f.id === res.id)
      const lines = [
        { kind: 'ok', text: t('capture.ok', `${res.count}/${ctx.flags.total}`) },
        `  ${t(flag.quipKey)}`,
      ]
      if (res.allCaptured) {
        lines.push(
          { kind: 'ok', text: t('capture.alldone1') },
          { kind: 'ok', text: t('capture.alldone2') },
          { kind: 'ok', text: t('capture.alldone3') },
        )
        ctx.openWindow('vault')
      }
      return lines
    },
  },
  {
    name: 'open',
    descKey: 'cmd.open',
    argCompletions: publicAppIds,
    run: (args, ctx) => {
      const id = args[0]
      if (!id) return [ctx.t('open.usage')]
      if (id === 'vault' && !ctx.flags.allCaptured) {
        return [{ kind: 'err', text: ctx.t('open.locked') }]
      }
      if (!appIds.includes(id)) return [{ kind: 'err', text: ctx.t('open.unknown', id) }]
      return openApp(id, ctx)
    },
  },
  {
    name: 'ls',
    aliases: ['dir'],
    descKey: 'cmd.ls',
    run: (args, ctx) => {
      const ids = ctx.flags.allCaptured ? [...publicAppIds, 'vault'] : publicAppIds
      const entries = ids.map((id) => `${id}/`)
      if (args.includes('-a')) entries.push(...fakeFileNames)
      return [entries.join('  ')]
    },
  },
  {
    name: 'cat',
    hidden: true,
    argCompletions: [...sectionIds, ...fakeFileNames],
    run: (args, ctx) => {
      if (!args[0]) return [ctx.t('open.usage').replace('open', 'cat')]
      if (fakeFiles[args[0]]) return fakeFiles[args[0]]
      if (args[0] === 'env.backup' || args[0] === 'robots.txt') {
        return [ctx.t('cat.webroot', `/${args[0]}`)]
      }
      return printSection(args[0], ctx)
    },
  },
  {
    name: 'printenv',
    hidden: true,
    run: (args, ctx) => [
      ctx.t('printenv.note'),
      `JEPPEOS_LANG=${ctx.locale}`,
      `JEPPEOS_THEME=${ctx.theme}`,
      'JEPPEOS_SHELL=/bin/jsh',
      `JEPPEOS_DEBUG_SESSION=${readStorageFlag()}`,
    ],
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
    run: (args, ctx) => {
      if (args[0] === 'su') {
        if (!args[1]) return [{ kind: 'err', text: ctx.t('sudo.passreq') }]
        if (checkRootPassword(args[1])) {
          return [
            { kind: 'ok', text: ctx.t('sudo.root1') },
            ctx.t('sudo.root2'),
            { kind: 'ok', text: ctx.t('sudo.root3', getRootFlag()) },
          ]
        }
        return [{ kind: 'err', text: ctx.t('sudo.wrongpass') }]
      }
      return [{ kind: 'err', text: ctx.t('sudo.denied') }, ctx.t('sudo.logged')]
    },
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
