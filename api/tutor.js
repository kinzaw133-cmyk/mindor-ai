// Vercel serverless function. Runs server-side only; keys never reach the browser.
import { createClient } from '@supabase/supabase-js'

const STYLES = {
  simple: 'Explain simply, as to a beginner. Short sentences, everyday analogies, minimal jargon.',
  detailed: 'Give a thorough, step-by-step explanation with reasoning, examples, and edge cases.',
  exam: 'Be exam-focused: key definitions, formulas, likely question patterns, a concise worked example, and a short checklist of points that earn marks.'
}

const TRACKS = {
  general: 'The student is studying general school, college or university material.',
  iba: 'The student is preparing for the IBA (Pakistan) admission aptitude test. Focus on the usual aptitude areas: quantitative/maths, English (grammar, vocabulary, comprehension), and analytical/critical reasoning. Teach shortcuts, time management and common trick patterns.',
  nthp: 'The student is preparing for the NTHP (National Talent Hunt Programme) test run by IBA Sukkur. Focus on aptitude-style maths, English and analytical reasoning; teach shortcuts and time management.',
  sthp: 'The student is preparing for the STHP (Sindh Talent Hunt Programme) test run by IBA Sukkur. Focus on aptitude-style maths, English and analytical reasoning; teach shortcuts and time management.'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { SUPABASE_URL, SUPABASE_ANON_KEY, ANTHROPIC_API_KEY } = process.env
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !ANTHROPIC_API_KEY)
    return res.status(503).json({ error: 'Server is not configured. Set SUPABASE_URL, SUPABASE_ANON_KEY and ANTHROPIC_API_KEY.' })

  const token = (req.headers.authorization || '').replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Sign in required.' })

  // Client acts as the user, so Row Level Security applies to every query.
  const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { global: { headers: { Authorization: `Bearer ${token}` } } })
  const { data: userData, error: authErr } = await sb.auth.getUser(token)
  if (authErr || !userData?.user) return res.status(401).json({ error: 'Session expired. Sign in again.' })
  const user = userData.user

  const { conversationId, message, style = 'simple', track = 'general' } = req.body || {}
  if (typeof message !== 'string' || !message.trim() || message.length > 4000)
    return res.status(400).json({ error: 'Message must be 1–4000 characters.' })
  if (!conversationId || !STYLES[style] || !TRACKS[track]) return res.status(400).json({ error: 'Invalid request.' })

  // Usage limit: messages per rolling 24h
  const limit = Number(process.env.DAILY_MESSAGE_LIMIT || 60)
  const since = new Date(Date.now() - 864e5).toISOString()
  const { count } = await sb.from('messages').select('id', { count: 'exact', head: true }).eq('role', 'user').gte('created_at', since)
  if ((count ?? 0) >= limit) return res.status(429).json({ error: `Daily limit of ${limit} questions reached. Try again tomorrow.` })

  const { data: conv } = await sb.from('conversations').select('id,title').eq('id', conversationId).single()
  if (!conv) return res.status(404).json({ error: 'Conversation not found.' })

  const { data: history } = await sb.from('messages').select('role,content').eq('conversation_id', conversationId)
    .order('created_at', { ascending: false }).limit(20)
  const turns = [...(history || []).reverse(), { role: 'user', content: message.trim() }]

  const system = `You are Mindora AI, a patient AI tutor for school, college and university students.
${STYLES[style]}
${TRACKS[track]}
When you are not sure of an exact current test format or syllabus, say so and tell the student to check the official test announcement.
Reply in the same language the student writes in (English, Urdu, etc.). For Urdu use Urdu script unless asked otherwise.
Use Markdown. Put code in fenced blocks with a language tag. Write maths clearly, step by step.
If you are unsure, say so rather than guessing.`

  let reply
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6', max_tokens: 1500, system, messages: turns })
    })
    const j = await r.json()
    if (!r.ok) return res.status(502).json({ error: j?.error?.message || 'AI provider error.' })
    reply = (j.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n')
  } catch {
    return res.status(502).json({ error: 'Could not reach the AI provider.' })
  }

  const rows = [
    { conversation_id: conversationId, user_id: user.id, role: 'user', content: message.trim() },
    { conversation_id: conversationId, user_id: user.id, role: 'assistant', content: reply }
  ]
  const { error: insErr } = await sb.from('messages').insert(rows)
  if (insErr) return res.status(500).json({ error: 'Answer generated but could not be saved.' })
  const patch = { updated_at: new Date().toISOString(), style, track }
  if (conv.title === 'New chat') patch.title = message.trim().slice(0, 48)
  await sb.from('conversations').update(patch).eq('id', conversationId)
  return res.status(200).json({ reply, title: patch.title })
}
