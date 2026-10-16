import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { isConfigured } from './lib/supabase'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Tutor from './pages/Tutor'
import Settings from './pages/Settings'
import FlashcardsPage from './pages/FlashcardsPage'
import QuizzesPage from './pages/QuizzesPage'
import PlannerPage from './pages/PlannerPage'
import AppShell from './components/AppShell'

function Protected() {
  const { user, loading } = useAuth()
  if (!isConfigured) return <Navigate to="/login" replace />
  if (loading) return <div className="grid min-h-screen place-items-center text-sm opacity-60">Loading…</div>
  return user ? <AppShell><Outlet /></AppShell> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/flashcards" element={<FlashcardsPage />} />
      <Route path="/quizzes" element={<QuizzesPage />} />
      <Route path="/planner" element={<PlannerPage />} />
      <Route path="/login" element={<Auth mode="login" />} />
      <Route path="/signup" element={<Auth mode="signup" />} />
      <Route element={<Protected />}>
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/tutor" element={<Tutor />} />
        <Route path="/app/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

