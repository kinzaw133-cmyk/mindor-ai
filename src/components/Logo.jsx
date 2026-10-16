import { Link } from 'react-router-dom'
export default function Logo({ to = '/', light = false }) {
  return (
    <Link to={to} className={`flex items-center gap-2.5 font-display font-extrabold tracking-tight ${light ? 'text-white' : ''}`} aria-label="Mindora AI home">
      <img src="/logo.png" alt="" width="38" height="38" className="h-9 w-9 rounded-xl bg-white object-contain p-0.5 shadow-soft" />
      <span className="text-lg">Mindora <span className={light ? 'text-lav-300' : 'text-vio-600 dark:text-vio-400'}>AI</span></span>
    </Link>
  )
}
