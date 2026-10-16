import { useState } from 'react'
import { GraduationCap } from 'lucide-react'

// Shows a real photo; if it can't load (offline, blocked, bad URL) it falls back to a palette-coloured tile.
export default function Photo({ img, className = '', icon: Icon = GraduationCap, eager = false }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div role="img" aria-label={img.alt}
        className={`grid place-items-center bg-gradient-to-br from-lav-200 via-mist to-lav-300 text-vio-600 dark:from-ink-700 dark:via-ink-800 dark:to-ink-700 dark:text-vio-400 ${className}`}>
        <Icon size={44} strokeWidth={1.5} />
      </div>
    )
  }
  return <img src={img.src} alt={img.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}
