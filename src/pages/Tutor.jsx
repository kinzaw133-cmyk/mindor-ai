import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Plus, Send, History, X, Trash2, WifiOff } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const STYLES = [
  { k: 'simple', label: 'Simple' },
  { k: 'detailed', label: 'Detailed' },
  { k: 'exam', label: 'Exam-focused' }
]
const TRACKS = [
  { k: 'general', label: 'General' }, { k: 'iba', label: 'IBA' }, { k: 'nthp', label: 'NTHP' }, { k: 'sthp', label: 'STHP' }
]
const isRtl = t => /[\u0600-\u06FF]/.test(t || '')

export default function Tutor() {
  const { user, session } = useAuth()
  const [params, setParams] = useSearchParams()
  const convId = params.get('c')
  const [convs, setConvs] = useState([])
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [style, setStyle] = useState('simple')
  const [track, setTrack] = useState(() => localStorage.getItem('mi-track') || 'general')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [drawer, setDrawer] = useState(false)
  const [online, setOnline] = useState(navigator.onLine)
  const endRef = useRef(null)

  const loadConvs = useCallback(async () => {
    const { data } = await supabase.from('conversations').select('id,title,style,updated_at').order('updated_at', { ascending: false }).limit(50)
    setConvs(data || [])
  }, [])

  useEffect(() => { loadConvs() }, [loadConvs])
  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false)
    addEventListener('online', on); addEventListener('offline', off)
    return () => { removeEventListener('online', on); removeEventListener('offline', off) }
  }, [])

  useEffect(() => {
    setError('')
    if (!convId) return setMsgs([])
    supabase.from('messages').select('id,role,content').eq('conversation_id', convId).order('created_at').then(({ data, error }) => {
      if (error) setError('Could not load this chat.'); else setMsgs(data)
    })
  }, [convId])
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, sending])

  const send = async e => {
    e?.preventDefault()
    const text = input.trim()
    if (!text || sending) return
    if (!online) return setError('You’re offline. Reconnect and try again.')
    setError(''); setSending(true)
    let id = convId
    if (!id) {
      const { data, error } = await supabase.from('conversations').insert({ user_id: user.id, style, track }).select('id').single()
      if (error) { setSending(false); return setError('Could not start a chat. Check your database setup.') }
      id = data.id
      setParams({ c: id }, { replace: true })
    }
    setMsgs(m => [...m, { id: 'tmp', role: 'user', content: text }]); setInput('')
    try {
      const r = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ conversationId: id, message: text, style, track })
      })
      const ct = r.headers.get('content-type') || ''
      if (!ct.includes('json')) throw new Error('The AI endpoint isn’t running. Start the app with `npx vercel dev` (see README).')
      const j = await r.json()
      if (!r.ok) throw new Error(j.error || 'Something went wrong.')
      setMsgs(m => [...m, { id: crypto.randomUUID(), role: 'assistant', content: j.reply }])
      loadConvs()
    } catch (err) {
      setMsgs(m => m.filter(x => x.id !== 'tmp'))
      setInput(text)
      setError(err.message)
    } finally { setSending(false) }
  }

  const remove = async id => {
    await supabase.from('conversations').delete().eq('id', id)
    if (id === convId) setParams({}); loadConvs()
  }

  const list = (
    <div className="flex h-full flex-col">
      <button onClick={() => { setParams({}); setDrawer(false) }} className="btn-primary w-full"><Plus size={18} />New chat</button>
      <ul className="mt-3 flex-1 space-y-1 overflow-y-auto">
        {convs.length === 0 && <li className="p-3 text-sm opacity-60">Your chats will appear here.</li>}
        {convs.map(c => (
          <li key={c.id} className={`group flex items-center rounded-xl ${c.id === convId ? 'bg-lav-100 dark:bg-vio-600/30' : 'hover:bg-lav-50 dark:hover:bg-white/5'}`}>
            <button className="min-w-0 flex-1 truncate px-3 py-2.5 text-left text-sm font-medium" onClick={() => { setParams({ c: c.id }); setDrawer(false) }}>{c.title}</button>
            <button onClick={() => remove(c.id)} aria-label={`Delete chat ${c.title}`} className="p-2 opacity-60 hover:opacity-100 md:opacity-0 md:group-hover:opacity-100"><Trash2 size={15} /></button>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="mx-auto flex h-[calc(100dvh-9rem)] max-w-6xl gap-4 md:h-[calc(100dvh-6rem)]">
      <aside className="card hidden w-64 shrink-0 p-3 md:block">{list}</aside>
      {drawer && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setDrawer(false)}>
          <div className="card h-full w-72 max-w-[85%] rounded-l-none p-3" onClick={e => e.stopPropagation()}>
            <button className="btn-ghost mb-2 !p-2" onClick={() => setDrawer(false)} aria-label="Close history"><X size={18} /></button>{list}
          </div>
        </div>
      )}
      <section className="card flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2 border-b border-lav-200/60 p-3 dark:border-white/10">
          <button className="btn-ghost !p-2.5 md:hidden" onClick={() => setDrawer(true)} aria-label="Open chat history"><History size={18} /></button>
          <div role="radiogroup" aria-label="Explanation style" className="flex rounded-2xl bg-lav-100 p-1 dark:bg-ink-900">
            {STYLES.map(s => (
              <button key={s.k} role="radio" aria-checked={style === s.k} onClick={() => setStyle(s.k)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${style === s.k ? 'bg-white text-vio-700 shadow dark:bg-vio-600 dark:text-white' : 'opacity-70'}`}>{s.label}</button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold sm:text-sm">Test
            <select className="input !w-auto !py-1.5" value={track} aria-label="Test preparation track"
              onChange={e => { setTrack(e.target.value); localStorage.setItem('mi-track', e.target.value) }}>
              {TRACKS.map(t => <option key={t.k} value={t.k}>{t.label}</option>)}
            </select>
          </label>
          {!online && <span className="ml-auto flex items-center gap-1 text-xs text-amber-600"><WifiOff size={14} />Offline</span>}
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
          {msgs.length === 0 && !sending && (
            <div className="grid h-full place-items-center text-center">
              <div className="max-w-sm"><h2 className="text-xl font-extrabold">What are you studying?</h2>
                <p className="mt-2 text-sm opacity-70">Pick your test above (IBA, NTHP or STHP), then ask a question or paste an aptitude problem. English and Urdu both work.</p></div>
            </div>
          )}
          {msgs.map(m => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : ''}`}>
              <div dir={isRtl(m.content) ? 'rtl' : 'ltr'} className={`md max-w-[92%] break-words rounded-3xl px-4 py-2.5 text-sm sm:max-w-[80%] ${m.role === 'user' ? 'bg-vio-600 text-white' : 'bg-lav-50 dark:bg-ink-900'}`}>
                {m.role === 'user' ? <p className="whitespace-pre-wrap">{m.content}</p> : <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>}
              </div>
            </div>
          ))}
          {sending && <div className="flex gap-1.5 px-2" role="status" aria-label="Tutor is thinking">{[0, 1, 2].map(i => <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-vio-500" style={{ animationDelay: `${i * .15}s` }} />)}</div>}
          <div ref={endRef} />
        </div>

        {error && <p role="alert" className="mx-4 mb-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">{error}</p>}
        <form onSubmit={send} className="flex items-end gap-2 border-t border-lav-200/60 p-3 dark:border-white/10">
          <textarea className="input max-h-40 min-h-[48px] resize-none" rows={1} value={input} maxLength={4000} dir="auto"
            onChange={e => setInput(e.target.value)} placeholder="Ask a question…" aria-label="Your question"
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) send(e) }} />
          <button className="btn-primary !p-3.5" disabled={sending || !input.trim()} aria-label="Send"><Send size={18} /></button>
        </form>
      </section>
    </div>
  )
}
