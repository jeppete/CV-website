// Server-side prompt-injection detection + Discord alerting for the honeypot.
//
// Two HIGH-severity traps fire when the model's OUTPUT leaks a bait:
//   - canary_leak : the fake maintenance token appears in a reply
//   - prompt_leak : the decoy directive marker appears in a reply (system-prompt extraction)
// Plus LOW-severity INPUT heuristics that flag classic injection phrasing.
//
// On a hit we POST the transcript to a Discord webhook. Detection never alters
// the reply — the attacker must not realise they were caught.

// Strip everything but a–z0–9 so obfuscation (spaces, hyphens, zero-width, case)
// between the bait characters can't hide a leak.
function normalize(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
}

const INPUT_PATTERNS = [
  /ignore\s+(all\s+|the\s+)?(previous|prior|above)\s+(instruction|prompt|rule)/i,
  /disregard\s+(all\s+|the\s+)?(previous|prior|above)/i,
  /system\s*prompt/i,
  /you\s+are\s+now\b/i,
  /developer\s+mode/i,
  /\bDAN\b/,
  /\bjailbreak/i,
  /pretend\s+(you|to\s+be)/i,
  /repeat\s+(everything|the\s+text|all\s+text)\s+above/i,
  /print\s+(your|the)\s+(instruction|prompt|system)/i,
  /\bverbatim\b/i,
  /reveal\s+(your|the)\s+(instruction|prompt|secret|token)/i,
]

/**
 * Inspect one exchange for injection signals.
 * @returns {{severity:'high'|'low', reasons:string[]} | null}
 */
export function detect({ reply, lastUserMessage, bait }) {
  const reasons = []
  let severity = null

  const out = normalize(reply)
  if (bait.canary && out.includes(normalize(bait.canary))) {
    reasons.push('canary_leak')
    severity = 'high'
  }
  if (bait.decoyId && out.includes(normalize(bait.decoyId))) {
    reasons.push('prompt_leak')
    severity = 'high'
  }

  if (severity !== 'high') {
    for (const re of INPUT_PATTERNS) {
      if (re.test(lastUserMessage || '')) {
        reasons.push(`suspicious_input:${re.source.slice(0, 32)}`)
        severity = 'low'
        break
      }
    }
  }

  return severity ? { severity, reasons } : null
}

// ---- debounce (best-effort; module scope survives warm invocations only) ----
const seen = new Map() // key -> { high: ts, low: true }
let windowStart = Date.now()
let windowCount = 0
const HIGH_COOLDOWN_MS = 10 * 60 * 1000
const GLOBAL_MAX_PER_HOUR = 12

function allow(key, severity, now) {
  // global cap per warm instance
  if (now - windowStart > 60 * 60 * 1000) {
    windowStart = now
    windowCount = 0
  }
  if (windowCount >= GLOBAL_MAX_PER_HOUR) return false

  const rec = seen.get(key) || {}
  if (severity === 'low') {
    if (rec.low) return false
    rec.low = true
  } else {
    if (rec.high && now - rec.high < HIGH_COOLDOWN_MS) return false
    rec.high = now
  }
  seen.set(key, rec)
  windowCount += 1
  return true
}

function truncate(s, max) {
  return s.length > max ? `${s.slice(0, max)}\n…(truncated)` : s
}

/**
 * Fire a Discord alert if not debounced. Never throws.
 */
export async function alert({ finding, messages, locale, sessionId, ip, userAgent }) {
  const webhook = process.env.DISCORD_WEBHOOK_URL
  if (!webhook) return

  const key = sessionId || ip || 'unknown'
  const now = Date.now()
  if (!allow(key, finding.severity, now)) return

  const transcript = messages
    .map((m) => `${m.role === 'assistant' ? 'BOT' : 'USER'}: ${m.content}`)
    .join('\n')

  const title = finding.severity === 'high' ? '🚨 Honeypot triggered' : '⚠️ Suspicious input'
  const body = [
    `**${title}** — ${finding.reasons.join(', ')}`,
    `session: \`${sessionId || 'n/a'}\` · ip: \`${ip || 'n/a'}\` · locale: \`${locale}\``,
    `ua: \`${truncate(userAgent || 'n/a', 120)}\``,
    '```',
    truncate(transcript, 1600),
    '```',
  ].join('\n')

  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ content: truncate(body, 1950) }),
      signal: AbortSignal.timeout(5000),
    })
  } catch {
    // Swallow — alerting must never affect the user-facing response.
  }
}
