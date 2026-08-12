// Vercel serverless function: the "Ask Jeppe" chat endpoint.
//
// Grounds a Gemini model in the site's CV data, runs the prompt-injection
// honeypot on every exchange, and returns the model reply unchanged. All
// secrets (API key, webhook, bait values) are env vars — never client-side.

import { buildSystemPrompt } from './_lib/prompt.js'
import { detect, alert } from './_lib/honeypot.js'

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models'
const DEFAULT_MODEL = 'gemini-2.5-flash'

// Input limits (best-effort abuse/cost guard; see plan for durable-limit note).
const MAX_MESSAGES = 20
const MAX_MSG_CHARS = 2000
const MAX_TOTAL_CHARS = 8000

// Best-effort in-memory rate limit (per warm instance).
const hits = new Map() // ip -> number[] timestamps
const RATE_MAX = 15
const RATE_WINDOW_MS = 5 * 60 * 1000

function rateLimited(ip) {
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS)
  arr.push(now)
  hits.set(ip, arr)
  return arr.length > RATE_MAX
}

function clientIp(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || ''
}

// Validate + normalise the message list. Returns null on invalid input.
function sanitize(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return null
  let trimmed = messages.slice(-MAX_MESSAGES)
  let total = 0
  const clean = []
  for (const m of trimmed) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) return null
    if (typeof m.content !== 'string') return null
    const content = m.content.trim()
    if (!content) continue
    if (content.length > MAX_MSG_CHARS) return null
    total += content.length
    clean.push({ role: m.role, content })
  }
  if (clean.length === 0 || total > MAX_TOTAL_CHARS) return null
  // Gemini requires the first turn to be from the user.
  while (clean.length && clean[0].role !== 'user') clean.shift()
  if (clean.length === 0 || clean[clean.length - 1].role !== 'user') return null
  return clean
}

async function callGemini({ systemPrompt, messages, model, apiKey }) {
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const base = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents,
    generationConfig: { temperature: 0.2, maxOutputTokens: 512 },
    safetySettings: [
      'HARM_CATEGORY_HARASSMENT',
      'HARM_CATEGORY_HATE_SPEECH',
      'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      'HARM_CATEGORY_DANGEROUS_CONTENT',
    ].map((category) => ({ category, threshold: 'BLOCK_ONLY_HIGH' })),
  }

  async function post(withThinking) {
    const body = withThinking
      ? { ...base, generationConfig: { ...base.generationConfig, thinkingConfig: { thinkingBudget: 0 } } }
      : base
    return fetch(`${GEMINI_URL}/${model}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20000),
    })
  }

  let res = await post(true)
  // Some models reject thinkingConfig with 400 — retry once without it.
  if (res.status === 400) res = await post(false)
  if (!res.ok) throw new Error(`gemini_status_${res.status}`)

  const data = await res.json()
  if (data.promptFeedback?.blockReason) throw new Error('blocked')
  const reply = (data.candidates?.[0]?.content?.parts || [])
    .map((p) => p.text || '')
    .join('')
    .trim()
  if (!reply) throw new Error('empty')
  return reply
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    res.status(503).json({ error: 'not_configured' })
    return
  }

  const ip = clientIp(req)
  if (rateLimited(ip)) {
    res.status(429).json({ error: 'rate_limited' })
    return
  }

  const { messages, locale: rawLocale, sessionId } = req.body || {}
  const locale = rawLocale === 'no' ? 'no' : 'en'
  const clean = sanitize(messages)
  if (!clean) {
    res.status(400).json({ error: 'bad_request' })
    return
  }

  const bait = { canary: process.env.HONEYPOT_CANARY, decoyId: process.env.HONEYPOT_DECOY_ID }
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL

  let reply
  try {
    const systemPrompt = buildSystemPrompt(locale, bait)
    reply = await callGemini({ systemPrompt, messages: clean, model, apiKey })
  } catch {
    res.status(502).json({ error: 'upstream' })
    return
  }

  // Honeypot: inspect this exchange, alert on a hit, but return the reply
  // untouched so detection stays covert.
  try {
    const lastUserMessage = clean[clean.length - 1].content
    const finding = detect({ reply, lastUserMessage, bait })
    if (finding) {
      await alert({
        finding,
        messages: [...clean, { role: 'assistant', content: reply }],
        locale,
        sessionId,
        ip,
        userAgent: req.headers['user-agent'],
      })
    }
  } catch {
    // Detection/alerting must never break the response.
  }

  res.status(200).json({ reply })
}
