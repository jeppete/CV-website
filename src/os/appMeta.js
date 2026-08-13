// Pure data about the "apps" — safe to import from anywhere (no components,
// so the terminal command registry can use it without circular imports).
// x/y/w are desktop spawn hints in px.

export const appMeta = [
  { id: 'terminal', glyph: '>_', titleKey: 'app.terminal', x: 48, y: 48, w: 640, h: 460 },
  { id: 'about', glyph: '@', titleKey: 'app.about', x: 720, y: 72, w: 420 },
  { id: 'experience', glyph: '$', titleKey: 'app.experience', x: 140, y: 100, w: 560 },
  { id: 'education', glyph: '#', titleKey: 'app.education', x: 200, y: 140, w: 520 },
  { id: 'skills', glyph: '%', titleKey: 'app.skills', x: 260, y: 120, w: 500 },
  { id: 'volunteer', glyph: '&', titleKey: 'app.volunteer', x: 320, y: 160, w: 540 },
  { id: 'contact', glyph: '*', titleKey: 'app.contact', x: 380, y: 180, w: 440 },
  { id: 'chat', glyph: '?', titleKey: 'app.chat', x: 300, y: 90, w: 460, h: 520 },
  { id: 'vault', glyph: '⚑', titleKey: 'app.vault', x: 240, y: 110, w: 520, hidden: true },
]

export const appIds = appMeta.map((a) => a.id)

export const publicAppIds = appMeta.filter((a) => !a.hidden).map((a) => a.id)

export function getAppMeta(id) {
  return appMeta.find((a) => a.id === id)
}
