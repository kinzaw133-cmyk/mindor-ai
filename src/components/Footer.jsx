import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import Logo from './Logo'

const product = [
  ['AI Tutor & Search', '/#tutor', false],
  ['Test Blueprint & Steps', '/#how', false],
  ['Interactive Flashcards', '/flashcards', true],
  ['Practice Quizzes Arena', '/quizzes', true],
  ['Study Planner & Focus Timer', '/planner', true]
]
const account = [['Log in', '/login', true], ['Create free account', '/signup', true]]

export default function Footer({ compact = false }) {
  const year = new Date().getFullYear()
  if (compact) {
    return (
      <footer className="border-t border-lav-300/60 bg-lav-100/60 px-5 py-5 text-xs dark:border-white/10 dark:bg-ink-800/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="opacity-75">© {year} Mindora AI. Study smarter with Doraemon AI tutor.</p>
          <nav aria-label="Footer" className="flex gap-5 font-medium">
            <Link className="hover:text-vio-600 dark:hover:text-vio-400" to="/">Home</Link>
            <Link className="hover:text-vio-600 dark:hover:text-vio-400" to="/flashcards">Flashcards</Link>
            <Link className="hover:text-vio-600 dark:hover:text-vio-400" to="/quizzes">Quizzes</Link>
            <Link className="hover:text-vio-600 dark:hover:text-vio-400" to="/planner">Planner</Link>
          </nav>
        </div>
      </footer>
    )
  }
  return (
    <footer className="mt-10 border-t border-lav-300/60 bg-lav-100/70 dark:border-white/10 dark:bg-ink-800/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-75">
            Personal AI study assistant and test prep partner for IBA Karachi, Sukkur IBA (STS / NTHP / STHP), and everyday learning. Ask in English or Urdu and get step-by-step explanations.
          </p>
        </div>
        <nav aria-label="Test Prep Tools">
          <h2 className="text-sm font-bold">Aptitude Prep Tools</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {product.map(([label, href, isRouter]) => (
              <li key={label}>
                {isRouter ? (
                  <Link to={href} className="opacity-75 hover:text-vio-600 hover:opacity-100 dark:hover:text-vio-400">
                    {label}
                  </Link>
                ) : (
                  <a href={href} className="opacity-75 hover:text-vio-600 hover:opacity-100 dark:hover:text-vio-400">
                    {label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Account">
          <h2 className="text-sm font-bold">Account</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {account.map(([l, h]) => (
              <li key={l}>
                <Link to={h} className="opacity-75 hover:text-vio-600 hover:opacity-100 dark:hover:text-vio-400">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-lav-300/60 dark:border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs">
          <p className="opacity-75">© {year} Mindora AI. Always confirm syllabus and dates on the official test announcement.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn-ghost !px-3 !py-1.5 !text-xs">
            <ArrowUp size={14} /> Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
