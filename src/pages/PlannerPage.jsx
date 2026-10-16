import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, Pause, RotateCcw, CheckSquare, Square, Sparkles, Clock, Target, Calendar, Bot, Bell } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChatWidget from '../components/ChatWidget'

const TIMER_PRESETS = [
  { label: '25m Pomodoro', seconds: 25 * 60 },
  { label: '50m Deep Prep', seconds: 50 * 60 },
  { label: '5m Short Break', seconds: 5 * 60 },
  { label: '15m Long Break', seconds: 15 * 60 }
]

const STUDY_ROADMAP = [
  {
    week: 'Week 1: Verbal Reasoning & Core Grammar',
    topics: [
      { id: 'w1-1', title: 'Master Bridge Sentences for IBA Analogies (15 worked pairs)' },
      { id: 'w1-2', title: 'Memorize 50 High-Frequency IBA Vocabulary Words with Urdu meanings' },
      { id: 'w1-3', title: 'Sentence Completion: Learn Pivot & Contrast Signal Words (Although, Despite)' },
      { id: 'w1-4', title: 'Sukkur IBA STS Prepositions & Subject-Verb Agreement Drills' }
    ]
  },
  {
    week: 'Week 2: Quantitative Foundations & Shortcuts',
    topics: [
      { id: 'w2-1', title: '10% & 1% Mental Benchmark Percentage Calculation Method' },
      { id: 'w2-2', title: 'Successive Discounts & Price Markups shortcut formula' },
      { id: 'w2-3', title: 'Speed, Distance & Time: Average Speed (2xy / x+y) problems' },
      { id: 'w2-4', title: 'Work-Rate Problems: Combined time formula (xy / x+y)' }
    ]
  },
  {
    week: 'Week 3: Advanced Math, Algebra & Geometry',
    topics: [
      { id: 'w3-1', title: 'Quadratic Equations: Factoring, Discriminant (b² - 4ac) & Roots' },
      { id: 'w3-2', title: 'Pythagorean Triples (3-4-5, 5-12-13) & Circle Geometry' },
      { id: 'w3-3', title: 'Ratios, Proportions & Mixture replacement shortcuts' },
      { id: 'w3-4', title: 'Probability & Combinations (Coin tosses, dice, cards)' }
    ]
  },
  {
    week: 'Week 4: STS General Knowledge & Full Mock Tests',
    topics: [
      { id: 'w4-1', title: 'Sindh Barrages, Rivers & Pakistan Geography for STS' },
      { id: 'w4-2', title: '1973 Constitution, Historical Dates & Basic Everyday Science' },
      { id: 'w4-3', title: 'Simulated 100-Minute Full IBA Karachi Mock Test under exam conditions' },
      { id: 'w4-4', title: 'Review weak-area cut-offs with Doraemon AI Tutor' }
    ]
  }
]

export default function PlannerPage() {
  const [activePreset, setActivePreset] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIMER_PRESETS[0].seconds)
  const [isRunning, setIsRunning] = useState(false)
  const [completedTopics, setCompletedTopics] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('iba-planner-topics') || '{}')
    } catch {
      return {}
    }
  })

  // Timer Countdown Effect
  useEffect(() => {
    let interval = null
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const setPreset = idx => {
    setActivePreset(idx)
    setTimeLeft(TIMER_PRESETS[idx].seconds)
    setIsRunning(false)
  }

  const toggleTopic = id => {
    setCompletedTopics(prev => {
      const updated = { ...prev, [id]: !prev[id] }
      localStorage.setItem('iba-planner-topics', JSON.stringify(updated))
      return updated
    })
  }

  // Calculate Progress
  const totalTopicsCount = STUDY_ROADMAP.reduce((acc, w) => acc + w.topics.length, 0)
  const completedCount = Object.values(completedTopics).filter(Boolean).length
  const progressPercent = Math.round((completedCount / totalTopicsCount) * 100)

  const initialSeconds = TIMER_PRESETS[activePreset].seconds
  const timerProgress = ((initialSeconds - timeLeft) / initialSeconds) * 100

  return (
    <div className="min-h-screen bg-lav-50 text-ink-900 dark:bg-ink-900 dark:text-lav-100">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-vio-600 transition hover:text-vio-700 dark:text-vio-400"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-700 dark:bg-sky-500/20 dark:text-sky-300">
            <Sparkles size={14} /> IBA Prep Schedule & Focus Hub
          </div>
        </div>

        {/* Title */}
        <div className="mt-4">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Study Planner & Focus Pomodoro Timer
          </h1>
          <p className="mt-2 text-base opacity-80 sm:text-lg">
            Structured 30-day roadmap tailored for IBA Karachi (BBA/BS) & Sukkur IBA STS admissions tests.
          </p>
        </div>

        {/* FOCUS TIMER CARD */}
        <div className="card mt-8 overflow-hidden border-2 border-vio-200/80 p-6 text-center dark:border-white/10 sm:p-10">
          <div className="flex flex-wrap justify-center gap-2">
            {TIMER_PRESETS.map((p, i) => (
              <button
                key={p.label}
                onClick={() => setPreset(i)}
                className={`rounded-2xl px-3.5 py-1.5 text-xs font-bold transition sm:text-sm ${
                  activePreset === i
                    ? 'bg-vio-600 text-white shadow-soft'
                    : 'bg-lav-100 hover:bg-lav-200 dark:bg-ink-900 dark:hover:bg-ink-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Digital Clock Display */}
          <div className="mt-8">
            <div className="font-display text-6xl font-extrabold tracking-tight sm:text-8xl text-ink-900 dark:text-white">
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-vio-600 dark:text-vio-400">
              {isRunning ? '🔥 Focus Session in Progress — Zero Distractions!' : 'Session Paused'}
            </p>
          </div>

          {/* Progress Line */}
          <div className="mx-auto mt-6 max-w-md h-2.5 overflow-hidden rounded-full bg-lav-200 dark:bg-ink-900">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-vio-600 transition-all duration-300"
              style={{ width: `${timerProgress}%` }}
            />
          </div>

          {/* Timer Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setIsRunning(r => !r)}
              className="btn-primary !px-8 !py-3.5 text-base"
            >
              {isRunning ? (
                <><Pause size={20} /> Pause Timer</>
              ) : (
                <><Play size={20} /> Start Focus Session</>
              )}
            </button>
            <button
              onClick={() => {
                setIsRunning(false)
                setTimeLeft(TIMER_PRESETS[activePreset].seconds)
              }}
              className="btn-ghost border border-lav-300 dark:border-white/15 !px-5 !py-3.5 text-base"
              title="Reset Timer"
            >
              <RotateCcw size={18} /> Reset
            </button>
          </div>
        </div>

        {/* 30-DAY SYLLABUS ROADMAP & CHECKLIST */}
        <section className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                30-Day IBA & STS Study Blueprint
              </h2>
              <p className="mt-1 text-sm opacity-75">
                Check off topics as you conquer them to track your test readiness.
              </p>
            </div>

            {/* Overall Readiness Pill */}
            <div className="rounded-2xl border border-lav-200 bg-white px-5 py-3 shadow-soft dark:border-white/10 dark:bg-ink-800">
              <div className="flex items-center gap-3">
                <Target size={22} className="text-emerald-500" />
                <div>
                  <p className="text-xs font-bold opacity-70">Preparation Progress</p>
                  <p className="text-lg font-extrabold text-ink-900 dark:text-white">
                    {completedCount} of {totalTopicsCount} Topics ({progressPercent}%)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Weeks Accordion / List */}
          <div className="mt-8 space-y-6">
            {STUDY_ROADMAP.map((week, wIdx) => (
              <div key={wIdx} className="card p-6">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-vio-700 dark:text-vio-400">
                  <Calendar size={18} /> {week.week}
                </h3>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {week.topics.map(topic => {
                    const isDone = !!completedTopics[topic.id]
                    return (
                      <div
                        key={topic.id}
                        onClick={() => toggleTopic(topic.id)}
                        className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition ${
                          isDone
                            ? 'border-emerald-400 bg-emerald-500/10 text-emerald-900 dark:border-emerald-500/20 dark:text-emerald-200 line-through opacity-80'
                            : 'border-lav-200/80 bg-lav-50/50 hover:bg-lav-100 dark:border-white/10 dark:bg-ink-900/50 dark:hover:bg-ink-900'
                        }`}
                      >
                        <span className="mt-0.5 shrink-0 text-vio-600 dark:text-vio-400">
                          {isDone ? <CheckSquare size={18} className="text-emerald-600" /> : <Square size={18} />}
                        </span>
                        <span className="text-xs font-semibold leading-relaxed sm:text-sm">
                          {topic.title}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Need Guidance Box */}
          <div className="card mt-8 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-sky-500/10 via-vio-500/10 to-transparent p-6 dark:border-white/10">
            <div>
              <h4 className="font-bold text-base">Stuck on any syllabus topic?</h4>
              <p className="mt-1 text-xs opacity-80">
                Ask our Doraemon AI bot to break down any formula, grammar rule, or past paper question.
              </p>
            </div>
            <button
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent('open-doraemon', {
                    detail: { query: 'Can you help me design a custom 2-week revision plan for the upcoming IBA test?' }
                  })
                )
              }}
              className="btn-primary !py-2.5 !px-4 text-xs sm:text-sm"
            >
              <Bot size={16} /> Ask Doraemon for Study Advice
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  )
}
