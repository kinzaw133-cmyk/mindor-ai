import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Settings() {
  const { user } = useAuth()
  const { dark, toggle } = useTheme()
  const [name, setName] = useState(user?.user_metadata?.full_name || '')
  const [msg, setMsg] = useState('')
  const save = async e => {
    e.preventDefault(); setMsg('')
    const { error } = await supabase.auth.updateUser({ data: { full_name: name.trim() } })
    setMsg(error ? error.message : 'Saved')
  }
  return (
    <div className="mx-auto max-w-xl space-y-5">
      <h1 className="text-2xl font-extrabold">Settings</h1>
      <form onSubmit={save} className="card space-y-4 p-6">
        <label className="block text-sm font-semibold">Display name<input className="input mt-1.5" value={name} onChange={e => setName(e.target.value)} /></label>
        <p className="text-sm opacity-70">Email: {user?.email}</p>
        <div className="flex items-center gap-3"><button className="btn-primary">Save changes</button>{msg && <span role="status" className="text-sm">{msg}</span>}</div>
      </form>
      <div className="card flex items-center justify-between p-6">
        <div><p className="font-semibold">Dark mode</p><p className="text-sm opacity-70">Saved on this device.</p></div>
        <button role="switch" aria-checked={dark} onClick={toggle} className={`h-7 w-12 rounded-full p-1 transition ${dark ? 'bg-vio-600' : 'bg-lav-300'}`}>
          <span className={`block h-5 w-5 rounded-full bg-white transition ${dark ? 'translate-x-5' : ''}`} /></button>
      </div>
    </div>
  )
}
