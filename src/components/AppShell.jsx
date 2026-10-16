import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, MessageCircleQuestion, Settings, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { supabase } from '../lib/supabase'

const items = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/tutor', label: 'AI Tutor', icon: MessageCircleQuestion },
  { to: '/app/settings', label: 'Settings', icon: Settings }
]

function Item({ it, collapsed }) {
  return (
    <NavLink to={it.to} end={it.end} title={it.label}
      className={({ isActive }) => `relative flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition ${isActive ? 'text-vio-700 dark:text-white' : 'text-ink-700/80 hover:bg-lav-100 dark:text-lav-200 dark:hover:bg-white/5'}`}>
      {({ isActive }) => (<>
        {isActive && <motion.span layoutId="side-pill" className="absolute inset-0 rounded-2xl bg-lav-100 dark:bg-vio-600/30" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
        <it.icon size={20} className="relative shrink-0" />
        {!collapsed && <span className="relative">{it.label}</span>}
      </>)}
    </NavLink>
  )
}

export default function AppShell({ children }) {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('mi-collapsed') === '1')
  const nav = useNavigate()
  const toggle = () => setCollapsed(c => { localStorage.setItem('mi-collapsed', c ? '0' : '1'); return !c })
  const signOut = async () => { await supabase.auth.signOut(); nav('/') }

  return (
    <div className="flex min-h-screen">
      <motion.aside animate={{ width: collapsed ? 84 : 248 }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className="sticky top-0 hidden h-screen shrink-0 flex-col border-r border-lav-200/70 bg-white p-3 dark:border-white/10 dark:bg-ink-800 md:flex">
        <div className="flex items-center justify-between px-1.5 py-2">{collapsed ? <Logo to="/app" /> : <Logo to="/app" />}</div>
        <nav className="mt-6 flex flex-col gap-1" aria-label="App">{items.map(it => <Item key={it.to} it={it} collapsed={collapsed} />)}</nav>
        <div className="mt-auto flex flex-col gap-1">
          <button onClick={toggle} className="btn-ghost !justify-start" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            {collapsed ? <PanelLeftOpen size={20} /> : <><PanelLeftClose size={20} /><span>Collapse</span></>}
          </button>
          <button onClick={signOut} className="btn-ghost !justify-start"><LogOut size={20} />{!collapsed && <span>Log out</span>}</button>
        </div>
      </motion.aside>

      <div className="flex min-w-0 flex-1 flex-col pb-20 md:pb-0">
        <header className="flex items-center justify-between px-4 py-3 md:justify-end md:px-8">
          <div className="md:hidden"><Logo to="/app" /></div>
          <ThemeToggle />
        </header>
        <main className="min-w-0 flex-1 px-4 pb-8 md:px-8">{children}</main>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-30 flex justify-around rounded-3xl border border-lav-200/70 bg-white/90 p-1.5 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-ink-800/90 md:hidden" aria-label="App mobile">
        {items.map(it => (
          <NavLink key={it.to} to={it.to} end={it.end} aria-label={it.label}
            className={({ isActive }) => `flex min-w-[64px] flex-col items-center gap-0.5 rounded-2xl px-3 py-2 text-[11px] font-semibold transition ${isActive ? 'bg-vio-600 text-white' : 'text-ink-700 dark:text-lav-200'}`}>
            <it.icon size={20} />{it.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
