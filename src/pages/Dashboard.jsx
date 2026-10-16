import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Flame, MessageSquare, HelpCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const dayKey = d => new Date(d).toLocaleDateString('en-CA')

function streakOf(days) {
  const set = new Set(days); let n = 0; const d = new Date()
  if (!set.has(dayKey(d))) d.setDate(d.getDate() - 1)
  while (set.has(dayKey(d))) { n++; d.setDate(d.getDate() - 1) }
  return n
}

export default function Dashboard() {
  const { user } = useAuth()
  const [state, setState] = useState({ loading: true, error: '', convs: [], questions: 0, streak: 0, today: 0 })

  useEffect(() => {
    (async () => {
      const [c, m] = await Promise.all([
        supabase.from('conversations').select('id,title,updated_at').order('updated_at', { ascending: false }).limit(5),
        supabase.from('messages').select('created_at').eq('role', 'user').order('created_at', { ascending: false }).limit(1000)
      ])
      if (c.error || m.error) return setState(s => ({ ...s, loading: false, error: 'Could not load your activity. Refresh to try again.' }))
      const days = m.data.map(r => dayKey(r.created_at))
      setState({ loading: false, error: '', convs: c.data, questions: m.data.length, streak: streakOf(days), today: days.filter(d => d === dayKey(new Date())).length })
    })()
  }, [])

  const name = user?.user_metadata?.full_name?.split(' ')[0] || 'there'
  const h = new Date().getHours()
  const greet = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
  const stats = [
    { icon: Flame, label: 'Day streak', v: state.streak }, { icon: HelpCircle, label: 'Questions asked', v: state.questions }, { icon: MessageSquare, label: 'Asked today', v: state.today }
  ]

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-extrabold sm:text-3xl">{greet}, {name}</h1>
      <p className="mt-1 text-sm opacity-70">Here’s your study activity.</p>
      {state.error && <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">{state.error}</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map(s => (
          <div key={s.label} className="card flex items-center gap-4 p-5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lav-100 text-vio-600 dark:bg-vio-600/30 dark:text-white"><s.icon size={20} /></span>
            <div><p className="text-2xl font-extrabold">{state.loading ? '–' : s.v}</p><p className="text-xs opacity-70">{s.label}</p></div>
          </div>
        ))}
      </div>
      <section className="card mt-6 p-6">
        <div className="flex items-center justify-between"><h2 className="font-bold">Recent chats</h2><Link to="/app/tutor" className="btn-primary !py-2">New question</Link></div>
        {!state.loading && state.convs.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-lav-300 p-8 text-center dark:border-white/20">
            <p className="font-semibold">No chats yet</p>
            <p className="mt-1 text-sm opacity-70">Ask the AI Tutor your first question to start your streak.</p>
          </div>
        )}
        <ul className="mt-3 divide-y divide-lav-200/60 dark:divide-white/10">
          {state.convs.map(c => (
            <li key={c.id}><Link to={`/app/tutor?c=${c.id}`} className="flex items-center justify-between gap-3 py-3 text-sm hover:text-vio-600">
              <span className="truncate font-medium">{c.title}</span><span className="shrink-0 text-xs opacity-60">{new Date(c.updated_at).toLocaleDateString()}</span></Link></li>
          ))}
        </ul>
      </section>
    </div>
  )
}
