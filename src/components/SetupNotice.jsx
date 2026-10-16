import { AlertTriangle } from 'lucide-react'
export default function SetupNotice() {
  return (
    <div role="alert" className="flex gap-3 rounded-2xl border border-amber-300/60 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
      <AlertTriangle className="mt-0.5 shrink-0" size={18} />
      <p><strong>Supabase isn’t configured.</strong> Copy <code>.env.example</code> to <code>.env</code>, add your project URL and anon key, then restart the dev server. See README.md.</p>
    </div>
  )
}
