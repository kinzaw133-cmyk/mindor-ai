import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
export default function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <button onClick={toggle} className="btn-ghost !p-2.5" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
