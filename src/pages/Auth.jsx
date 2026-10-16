import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Check, Mail, User, KeyRound } from 'lucide-react'
import { supabase, isConfigured } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'
import SetupNotice from '../components/SetupNotice'
import Footer from '../components/Footer'
import ChatWidget from '../components/ChatWidget'
import Photo from '../components/Photo'
import { IMG } from '../data/images'

// Defined outside Auth so inputs keep focus while typing
const Field = ({ icon: Icon, label, children }) => (
  <label className="block text-sm font-semibold">
    <span className="mb-1.5 block">{label}</span>
    <div className="relative"><Icon size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />{children}</div>
  </label>
)

const perks = ['Explanations in English and Urdu', 'Simple, detailed or exam-focused answers', 'Every chat saved to your private account']

export default function Auth({ mode }) {
  const isSignup = mode === 'signup'
  const { user } = useAuth()
  const nav = useNavigate()
  const [f, setF] = useState({ name: '', email: '', password: '' })
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [info, setInfo] = useState('')
  if (user) return <Navigate to="/app" replace />

  const submit = async e => {
    e.preventDefault(); setErr(''); setInfo('')
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Enter a valid email address.')
    if (f.password.length < 8) return setErr('Password must be at least 8 characters.')
    if (isSignup && !f.name.trim()) return setErr('Enter your name.')
    setBusy(true)
    const { data, error } = isSignup
      ? await supabase.auth.signUp({ email: f.email, password: f.password, options: { data: { full_name: f.name.trim() } } })
      : await supabase.auth.signInWithPassword({ email: f.email, password: f.password })
    setBusy(false)
    if (error) return setErr(error.message)
    if (isSignup && !data.session) return setInfo('Check your inbox to confirm your email, then log in.')
    nav('/app')
  }
  const set = k => e => setF({ ...f, [k]: e.target.value })

  return (
    <div className="flex min-h-screen flex-col">
      <div className="grid flex-1 lg:grid-cols-[1.05fr_1fr]">
        {/* Image panel (desktop) */}
        <aside className="relative hidden overflow-hidden lg:flex">
          <Photo img={IMG.auth} eager className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/60 to-ink-900/30" />
          <div className="relative flex flex-1 flex-col justify-between p-10 text-white xl:p-14">
            <Logo light />
            <div>
              <h2 className="max-w-md text-4xl font-extrabold leading-tight">{isSignup ? 'Start studying smarter today.' : 'Pick up right where you left off.'}</h2>
              <ul className="mt-6 space-y-3">
                {perks.map(p => <li key={p} className="flex items-center gap-3 text-white/90"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/20"><Check size={14} /></span>{p}</li>)}
              </ul>
            </div>
          </div>
        </aside>

        {/* Form */}
        <main className="relative flex items-center justify-center bg-lav-50 px-4 py-10 dark:bg-ink-900 sm:px-8">
          <div className="absolute right-4 top-4"><ThemeToggle /></div>
          <div className="w-full max-w-md">
            <div className="mb-6 flex justify-center lg:hidden"><Logo /></div>
            <div className="relative mb-6 h-32 overflow-hidden rounded-3xl shadow-soft sm:h-40 lg:hidden">
              <Photo img={IMG.auth} eager className="h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent" />
              <p className="absolute bottom-3 left-4 right-4 font-display text-sm font-semibold text-white">{isSignup ? 'Start studying smarter today.' : 'Pick up right where you left off.'}</p>
            </div>
            <form onSubmit={submit} className="card space-y-4 p-6 sm:p-8" noValidate>
              <div>
                <h1 className="text-2xl font-extrabold">{isSignup ? 'Create your account' : 'Welcome back'}</h1>
                <p className="mt-1 text-sm opacity-70">{isSignup ? 'Free to start. No card needed.' : 'Log in to continue your study streak.'}</p>
              </div>
              {!isConfigured && <SetupNotice />}
              {isSignup && <Field icon={User} label="Name"><input className="input !pl-10" value={f.name} onChange={set('name')} autoComplete="name" /></Field>}
              <Field icon={Mail} label="Email"><input type="email" className="input !pl-10" value={f.email} onChange={set('email')} autoComplete="email" /></Field>
              <Field icon={KeyRound} label="Password">
                <input type={show ? 'text' : 'password'} className="input !pl-10 !pr-12" value={f.password} onChange={set('password')} autoComplete={isSignup ? 'new-password' : 'current-password'} />
                <button type="button" onClick={() => setShow(v => !v)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 opacity-60 hover:bg-lav-100 hover:opacity-100 dark:hover:bg-white/10">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </Field>
              {isSignup && <p className="-mt-2 text-xs opacity-65">Use at least 8 characters.</p>}
              {err && <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">{err}</p>}
              {info && <p role="status" className="text-sm font-medium text-emerald-700 dark:text-emerald-400">{info}</p>}
              <button className="btn-primary w-full !py-3" disabled={busy || !isConfigured}>{busy ? 'Please wait…' : isSignup ? 'Create account' : 'Log in'}</button>
              <p className="text-center text-sm opacity-75">{isSignup ? 'Already have an account?' : 'New to Mindora AI?'}{' '}
                <Link className="font-semibold text-vio-600 underline-offset-2 hover:underline dark:text-vio-400" to={isSignup ? '/login' : '/signup'}>{isSignup ? 'Log in' : 'Create one'}</Link></p>
              <p className="flex items-center justify-center gap-1.5 border-t border-lav-200/70 pt-4 text-xs opacity-65 dark:border-white/10"><Lock size={13} />Accounts and chats are stored in a secured database with row-level privacy.</p>
            </form>
          </div>
        </main>
      </div>
      <Footer compact />
      <ChatWidget />
    </div>
  )
}
