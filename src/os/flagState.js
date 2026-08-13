// CTF flag hunt — core state, no React. Imported by both commands.js and FlagsProvider.
// Flags are never stored in plaintext here: capture validation compares cyrb53 hashes,
// and runtime-revealed flags are shift-obfuscated so the public bundle doesn't grep-spoil.

const STORAGE_KEY = 'jeppeos.flags'

// cyrb53 (public domain) — tiny synchronous string hash.
function cyrb53(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed
  let h2 = 0x41c6ce57 ^ seed
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16)
}

// reverse + charCode-shift; counterpart of the ob() used at build time
function deob(s) {
  return s
    .split('')
    .reverse()
    .map((c) => String.fromCharCode(c.charCodeAt(0) - 1))
    .join('')
}

const STORAGE_FLAG_OBF = '~4g5t`5`u1o`t2`4h5s1ut`m5d1m|FQQFK'
const ROOT_FLAG_OBF = '~zs1ut2i`mm4it`52w`u11s|FQQFK'
const ROOT_PASSWORD_HASH = '5ffdd1fa60445'

export const flagTable = [
  { id: 'recon', hash: '1f11969e968c53' },
  { id: 'b64', hash: '1b81c0119a8c08' },
  { id: 'storage', hash: '1cf005f3bd2832' },
  { id: 'leak', hash: '72dbd6ede6b76' },
  { id: 'root', hash: '121b3fe0f48ca5' },
].map((f) => ({ ...f, quipKey: `flags.quip.${f.id}`, nameKey: `flags.name.${f.id}` }))

export const TOTAL_FLAGS = flagTable.length

export function loadCaptured() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return flagTable.filter((f) => raw.includes(f.id)).map((f) => f.id)
  } catch {
    return []
  }
}

export function saveCaptured(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    /* storage unavailable */
  }
}

// checkFlag(input, captured) -> { status: 'ok' | 'dupe' | 'invalid', id? }
export function checkFlag(input, captured) {
  const cleaned = input.trim().replace(/^['"]|['"]$/g, '')
  const match = flagTable.find((f) => f.hash === cyrb53(cleaned))
  if (!match) return { status: 'invalid' }
  if (captured.includes(match.id)) return { status: 'dupe', id: match.id }
  return { status: 'ok', id: match.id }
}

// Flag 3: planted client-side on purpose — the lesson is that localStorage is readable.
export function plantStorageFlag() {
  try {
    localStorage.setItem('jeppeos.debug_session', deob(STORAGE_FLAG_OBF))
  } catch {
    /* storage unavailable */
  }
}

export function readStorageFlag() {
  try {
    return localStorage.getItem('jeppeos.debug_session') || ''
  } catch {
    return ''
  }
}

// Flag 5: sudo su <password> chain.
export function checkRootPassword(input) {
  return cyrb53(input) === ROOT_PASSWORD_HASH
}

export function getRootFlag() {
  return deob(ROOT_FLAG_OBF)
}
