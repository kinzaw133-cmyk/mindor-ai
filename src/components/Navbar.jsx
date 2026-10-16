import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Sparkles, Layers, ClipboardCheck, CalendarClock } from 'lucide-react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { label: 'AI Tutor', href: '/#tutor', id: 'tutor' },
  { label: 'Flashcards', to: '/flashcards', isPage: true, icon: Layers },
  { label: 'Quizzes', to: '/quizzes', isPage: true, icon: ClipboardCheck },
  { label: 'Planner & Timer', to: '/planner', isPage: true, icon: CalendarClock }
]

export default function Navbar() {
  const { user } = useAuth()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (item) => {
    setOpen(false)
    if (item.id && location.pathname === '/') {
      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
          scrolled
            ? 'border border-lav-200/70 bg-white/85 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-ink-800/85'
            : 'border border-transparent bg-white/50 backdrop-blur-md dark:bg-ink-900/50'
        }`}
        aria-label="Main"
      >
        <Logo />

        {/* Desktop Navigation Links */}
        <ul className="relative hidden items-center gap-1 md:flex">
          {navItems.map(item => {
            const isCurrentPage = item.to && location.pathname === item.to

            if (item.isPage) {
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`relative flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition lg:text-sm ${
                      isCurrentPage
                        ? 'bg-lav-100 text-vio-700 dark:bg-white/10 dark:text-white'
                        : 'text-ink-700 hover:text-vio-600 dark:text-lav-200'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            }

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => handleNavClick(item)}
                  className="relative rounded-xl px-3.5 py-2 text-xs font-bold text-ink-700 transition hover:text-vio-600 dark:text-lav-200 lg:text-sm"
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right CTA & Controls */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <div className="hidden items-center gap-1.5 sm:flex">
            {user ? (
              <Link to="/app" className="btn-primary !px-4 !py-2 text-xs sm:text-sm">
                Open dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn-ghost !px-3.5 !py-2 text-xs sm:text-sm">
                  Log in
                </Link>
                <Link to="/signup" className="btn-primary !px-4 !py-2 text-xs sm:text-sm">
                  Start free
                </Link>
              </>
            )}
          </div>
          <button
            className="btn-ghost !p-2 md:hidden"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className="card mx-auto mt-2 max-w-6xl p-3 md:hidden border-lav-300 dark:border-white/15"
          >
            {navItems.map((item, i) => {
              if (item.isPage) {
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-bold hover:bg-lav-100 dark:hover:bg-white/10"
                  >
                    {item.icon && <item.icon size={16} className="text-vio-600 dark:text-vio-400" />}
                    {item.label}
                  </Link>
                )
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => handleNavClick(item)}
                  className="block rounded-xl px-4 py-3 text-left text-sm font-bold hover:bg-lav-100 dark:hover:bg-white/10"
                >
                  {item.label}
                </a>
              )
            })}
            <div className="mt-2 flex gap-2 border-t border-lav-200/70 pt-3 dark:border-white/10">
              {user ? (
                <Link to="/app" className="btn-primary flex-1">
                  Open dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost flex-1">
                    Log in
                  </Link>
                  <Link to="/signup" className="btn-primary flex-1">
                    Start free
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
