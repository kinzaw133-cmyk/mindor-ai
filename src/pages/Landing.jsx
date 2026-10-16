import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Brain, Languages, ListChecks, MessagesSquare, Code2, Target, ArrowRight,
  Check, RotateCw, Lock, Layers, ClipboardCheck, CalendarClock, Sparkles,
  Keyboard, SlidersHorizontal, Repeat2, Play, Pause, CheckCircle2, ChevronRight,
  Bot, Search, BookOpen, Clock, Lightbulb, Compass, Award
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChatWidget from '../components/ChatWidget'
import Photo from '../components/Photo'
import HeroTestSearch from '../components/HeroTestSearch'
import { IMG } from '../data/images'
import { FLASHCARD_DECKS, MOCK_QUIZ_QUESTIONS } from '../data/testPrepData'

const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
)

const STYLES = [
  { k: 'Simple', t: 'A percentage means “per 100”. Finding 15% of 80: 10% is 8, 5% is 4. Add them together and you get 12 in 3 seconds.' },
  { k: 'Detailed', t: 'For successive changes of a% and b%, the net percentage change is a + b + (ab/100). If price rises 20% and falls 20%, net = 20 - 20 - 400/100 = -4%.' },
  { k: 'Exam-focused', t: 'IBA Cut-Off Rule: You need ~45% in English AND Math independently. For Analogies, build a strict bridge sentence before inspecting choices.' }
]

function StyleDemo() {
  const [i, setI] = useState(0)
  return (
    <div>
      <div role="tablist" aria-label="Answer style" className="flex rounded-2xl bg-lav-100 p-1 dark:bg-ink-900">
        {STYLES.map((s, n) => (
          <button
            key={s.k}
            role="tab"
            aria-selected={i === n}
            onClick={() => setI(n)}
            className={`flex-1 rounded-xl px-2 py-1.5 text-xs font-semibold transition sm:text-sm ${
              i === n ? 'bg-white text-vio-700 shadow dark:bg-vio-600 dark:text-white' : 'opacity-70 hover:opacity-100'
            }`}
          >
            {s.k}
          </button>
        ))}
      </div>
      <motion.p
        key={i}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        role="tabpanel"
        className="mt-4 min-h-[6.5rem] text-sm leading-relaxed"
      >
        {STYLES[i].t}
      </motion.p>
      <p className="text-xs opacity-60">Interactive preview of Doraemon AI explanation styles.</p>
    </div>
  )
}

function LanguageDemo() {
  const [ur, setUr] = useState(false)
  return (
    <div>
      <div className="flex gap-2">
        {[['English', false], ['اردو', true]].map(([l, v]) => (
          <button
            key={l}
            onClick={() => setUr(v)}
            aria-pressed={ur === v}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              ur === v ? 'bg-vio-600 text-white' : 'bg-lav-100 hover:bg-lav-200 dark:bg-ink-900'
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      <motion.div
        key={String(ur)}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        dir={ur ? 'rtl' : 'ltr'}
        className="mt-4 space-y-2 text-sm"
      >
        <p className="ml-auto w-fit max-w-[90%] rounded-2xl bg-vio-600 px-3.5 py-2 text-white rtl:ml-0 rtl:mr-auto">
          {ur ? 'آئی بی اے ٹیسٹ میں فیصد معلوم کرنے کا تیز ترین طریقہ کیا ہے؟' : 'What is the fastest way to calculate percentages in the IBA test?'}
        </p>
        <p className="max-w-[90%] rounded-2xl bg-lav-50 px-3.5 py-2 leading-relaxed dark:bg-ink-900">
          {ur
            ? '10 فیصد اور 1 فیصد کا بینچ مارک طریقہ اپنائیں۔ جیسے 160 کا 10% = 16، اس کا آدھا 8۔ تو 35% فوراً نکل آتا ہے!'
            : 'Use the 10% & 1% benchmark method. E.g. 10% of 160 = 16, 5% is 8. Add them for lightning-fast mental math.'}
        </p>
      </motion.div>
    </div>
  )
}

// Interactive Live Flashcard Preview
function FlashcardInteractivePreview() {
  const [flip, setFlip] = useState(false)
  const [cardIdx, setCardIdx] = useState(0)
  const [showUrdu, setShowUrdu] = useState(false)

  const cards = FLASHCARD_DECKS[0].cards
  const current = cards[cardIdx]

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-vio-600/10 px-2.5 py-0.5 text-xs font-bold text-vio-700 dark:bg-white/10 dark:text-lav-200">
            Card {cardIdx + 1} of {cards.length}
          </span>
          <button
            onClick={() => setShowUrdu(u => !u)}
            className="text-xs font-semibold text-vio-600 dark:text-vio-400 hover:underline"
          >
            {showUrdu ? 'Urdu On' : 'Show Urdu'}
          </button>
        </div>

        {/* 3D Card */}
        <button
          onClick={() => setFlip(f => !f)}
          aria-label="Flip flashcard"
          className="mt-3 block w-full text-left [perspective:900px]"
        >
          <motion.div
            animate={{ rotateY: flip ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
            className="relative min-h-[10.5rem] rounded-2xl [transform-style:preserve-3d]"
          >
            {/* Front */}
            <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-lav-200 bg-white p-4 shadow-sm [backface-visibility:hidden] dark:border-white/10 dark:bg-ink-900">
              <span className="text-[10px] font-bold uppercase tracking-wider text-vio-600 dark:text-vio-400">
                Word / Term
              </span>
              <div className="my-auto text-center">
                <p className="font-display text-xl font-extrabold sm:text-2xl">{current.q}</p>
                <p className="mt-1 text-xs opacity-60">Tap to flip & reveal meaning</p>
              </div>
              <span className="flex items-center gap-1 text-[11px] opacity-70">
                <RotateCw size={12} /> Tap to flip
              </span>
            </div>

            {/* Back */}
            <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-vio-800 to-vio-900 p-4 text-white shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-lav-300">
                Definition & Example
              </span>
              <div className="my-auto space-y-1">
                <p className="text-xs font-bold sm:text-sm">{current.a}</p>
                {showUrdu && current.urdu && (
                  <p dir="rtl" className="text-xs text-lav-200">
                    {current.urdu}
                  </p>
                )}
              </div>
              <span className="text-[11px] text-lav-300">← Tap to flip back</span>
            </div>
          </motion.div>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-lav-200/80 pt-3 dark:border-white/10">
        <button
          onClick={() => {
            setFlip(false)
            setCardIdx(i => (i + 1) % cards.length)
          }}
          className="text-xs font-bold text-vio-600 dark:text-vio-400 hover:underline"
        >
          Next Card →
        </button>
        <Link
          to="/flashcards"
          className="btn-primary !px-3.5 !py-1.5 text-xs font-bold"
        >
          Open Flashcards Hub <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}

// Interactive Live Quiz Preview
function QuizInteractivePreview() {
  const [selectedOpt, setSelectedOpt] = useState(null)
  const q = MOCK_QUIZ_QUESTIONS[0]
  const isAnswered = selectedOpt !== null

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
            Sample IBA Question
          </span>
          <span className="text-xs opacity-60">Instant Feedback</span>
        </div>

        <p className="mt-3 text-xs font-bold sm:text-sm text-ink-900 dark:text-white leading-relaxed">
          {q.question}
        </p>

        <div className="mt-3 grid gap-1.5">
          {q.options.map((opt, i) => {
            let style = 'border-lav-200 bg-lav-50/50 hover:bg-lav-100 dark:border-white/10 dark:bg-ink-900'
            if (isAnswered) {
              if (i === q.correct) style = 'border-emerald-500 bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 font-bold'
              else if (i === selectedOpt) style = 'border-rose-500 bg-rose-500/15 text-rose-900 dark:text-rose-200'
              else style = 'opacity-50'
            }

            return (
              <button
                key={i}
                onClick={() => setSelectedOpt(i)}
                className={`flex items-center justify-between rounded-xl border p-2 text-left text-xs transition ${style}`}
              >
                <span>
                  <strong className="mr-1.5 text-vio-600 dark:text-vio-400">({String.fromCharCode(65 + i)})</strong>
                  {opt}
                </span>
                {isAnswered && i === q.correct && <Check size={14} className="text-emerald-600 shrink-0" />}
              </button>
            )
          })}
        </div>

        {isAnswered && (
          <p className="mt-2 text-[11px] leading-relaxed text-ink-700/80 dark:text-lav-200/80">
            💡 {q.explanation}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-lav-200/80 pt-3 dark:border-white/10">
        <button
          onClick={() => setSelectedOpt(null)}
          className="text-xs font-semibold opacity-70 hover:opacity-100"
        >
          Reset
        </button>
        <Link
          to="/quizzes"
          className="btn-primary !px-3.5 !py-1.5 text-xs font-bold"
        >
          Take Full Mock Quiz <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}

// Interactive Live Focus Timer & Planner Preview
function PlannerInteractivePreview() {
  const [seconds, setSeconds] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [tasks, setTasks] = useState({ t1: true, t2: false })

  useEffect(() => {
    let t = null
    if (running && seconds > 0) t = setInterval(() => setSeconds(s => s - 1), 1000)
    return () => clearInterval(t)
  }, [running, seconds])

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-sky-500/10 px-2.5 py-0.5 text-xs font-bold text-sky-700 dark:bg-sky-500/20 dark:text-sky-300">
            25m Pomodoro Focus
          </span>
          <span className="text-xs font-semibold opacity-60">IBA Study Tracker</span>
        </div>

        {/* Digital Display */}
        <div className="mt-3 text-center">
          <div className="font-display text-4xl font-extrabold text-ink-900 dark:text-white sm:text-5xl">
            {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
          </div>
          <div className="mt-2 flex justify-center gap-2">
            <button
              onClick={() => setRunning(r => !r)}
              className="btn-primary !px-4 !py-1 text-xs font-bold"
            >
              {running ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Start</>}
            </button>
            <button
              onClick={() => { setRunning(false); setSeconds(25 * 60) }}
              className="btn-ghost border border-lav-200 dark:border-white/10 !px-3 !py-1 text-xs"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="mt-4 space-y-1.5">
          <p className="text-[11px] font-bold uppercase tracking-wider opacity-60">Today's IBA Targets:</p>
          <div
            onClick={() => setTasks(t => ({ ...t, t1: !t.t1 }))}
            className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2 text-xs transition ${
              tasks.t1 ? 'border-emerald-400 bg-emerald-500/10 line-through opacity-75' : 'border-lav-200 bg-lav-50/50 dark:border-white/10 dark:bg-ink-900'
            }`}
          >
            <span className="font-bold text-emerald-600">{tasks.t1 ? '✓' : '○'}</span>
            <span>IBA Analogy Bridge Sentences (15 pairs)</span>
          </div>
          <div
            onClick={() => setTasks(t => ({ ...t, t2: !t.t2 }))}
            className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2 text-xs transition ${
              tasks.t2 ? 'border-emerald-400 bg-emerald-500/10 line-through opacity-75' : 'border-lav-200 bg-lav-50/50 dark:border-white/10 dark:bg-ink-900'
            }`}
          >
            <span className="font-bold text-emerald-600">{tasks.t2 ? '✓' : '○'}</span>
            <span>Sukkur IBA STS Sindh Barrages & GK</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-lav-200/80 pt-3 dark:border-white/10">
        <span className="text-xs opacity-60">Daily roadmap</span>
        <Link
          to="/planner"
          className="btn-primary !px-3.5 !py-1.5 text-xs font-bold"
        >
          Open 30-Day Planner <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}

export default function Landing() {
  const reduce = useReducedMotion()
  const float = reduce ? {} : { animate: { y: [0, -8, 0] }, transition: { repeat: Infinity, duration: 5, ease: 'easeInOut' } }
  const [activeStepTab, setActiveStepTab] = useState(0)

  // Creative Steps Data with authentic test topics
  const creativeSteps = [
    {
      num: '01',
      title: 'Target IBA & STS Blueprints',
      tag: 'Step 1: Diagnostics',
      desc: 'Pinpoint exact syllabus boundaries for IBA Karachi (BBA / BS) and Sukkur IBA (STS / NTHP / STHP). Eliminate guesswork with sectional cut-off awareness.',
      insight: 'Cut-off rule: You must score ~45-50% in English AND Math independently. Passing overall but failing one section results in automatic elimination.',
      example: 'IBA Karachi: 45-50 Verbal MCQs + 45-50 Quantitative MCQs (100 mins). STS: 40 English, 40 Math, 20 GK (120 mins, No negative marking).'
    },
    {
      num: '02',
      title: 'Deploy 30-Second Shortcut Gadgets',
      tag: 'Step 2: Speed Mastery',
      desc: 'Say goodbye to tedious manual algebra and 3-minute divisions. Learn benchmark multipliers, analogy bridge sentences, and answer-choice elimination.',
      insight: 'Benchmark trick: 10% of 240 is 24, 5% is 12, 1% is 2.4. Compute 15% of 240 instantly as 24 + 12 = 36 without touching pencil or paper!',
      example: 'Successive discount trick: 10% + 10% = 19% (NOT 20%). Work rate: Together = (A * B) / (A + B).'
    },
    {
      num: '03',
      title: 'Simulated Drills & Bilingual Explanations',
      tag: 'Step 3: Flawless Execution',
      desc: 'Drill authentic past-paper questions with instant step-by-step reasoning in both English and Urdu. Identify weak spots before the test day.',
      insight: 'Our cute 3D Doraemon AI explains complex formulas in simple Urdu (اردو) and English, breaking down each trap option.',
      example: 'Try asking Doraemon: "Explain the quadratic discriminant formula in Urdu" or "Generate an analogy MCQ".'
    }
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-mist via-lav-200 to-transparent blur-3xl dark:from-vio-600/25 dark:via-vio-700/10"
      />

      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section id="tutor" className="relative mx-auto max-w-6xl px-5 pb-16 pt-32 lg:pt-36">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            {/* Left Hero Content */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-lav-300 bg-white/80 px-3.5 py-1.5 text-xs font-bold text-vio-700 shadow-sm dark:border-white/15 dark:bg-white/5 dark:text-lav-200">
                <Sparkles size={14} className="text-sky-500" />
                <span>IBA Karachi · Sukkur IBA STS · NTHP · STHP</span>
              </div>

              <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Crack IBA & STS with an AI Tutor that explains it your way.
              </h1>

              <p className="mt-5 max-w-lg text-lg text-ink-700/80 dark:text-lav-200/80">
                Mindora AI is your personal aptitude test preparation partner. Get authentic syllabus breakdowns, 30-second math shortcuts, and step-by-step explanations in English & Urdu.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/signup" className="btn-primary !px-7 !py-3.5 text-base">
                  Start learning free <ArrowRight size={18} />
                </Link>
                <Link to="/login" className="btn-ghost !px-7 !py-3.5 text-base border border-lav-300 dark:border-white/15">
                  I have an account
                </Link>
                <Link to="/quizzes" className="btn-ghost !px-5 !py-3.5 text-base border border-emerald-300 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 dark:border-emerald-500/30">
                  <ClipboardCheck size={18} /> Practice Quiz
                </Link>
              </div>
            </motion.div>

            {/* Right Hero Visual with Doraemon Robot Avatar & Floating Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-lav-300/80 dark:ring-white/10 bg-gradient-to-tr from-sky-100 to-lav-100 dark:from-ink-900 dark:to-ink-800 p-2">
                <Photo img={IMG.hero} eager className="aspect-[4/4.2] w-full rounded-[2rem] object-cover sm:aspect-[5/4] lg:aspect-[4/4.3]" />
              </div>

              {/* Floating Doraemon Chat Callout */}
              <motion.div
                {...float}
                className="card absolute -left-2 bottom-6 max-w-[17rem] p-4 shadow-xl sm:-left-6 border-sky-300 dark:border-sky-500/30"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src="/doraemon-robot.jpg"
                    alt="Doraemon"
                    className="h-8 w-8 rounded-full border border-sky-400 object-cover bg-sky-200"
                  />
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wide text-sky-600 dark:text-sky-400">
                      Doraemon 3D Tutor
                    </p>
                    <p className="text-xs font-bold text-ink-900 dark:text-white">Percentage Shortcut Gadget</p>
                  </div>
                </div>
                <p className="mt-2 rounded-xl bg-lav-100 px-2.5 py-1.5 text-xs font-medium dark:bg-ink-900">
                  “15% of 80? 10% is 8, 5% is 4. Total = 12! Solved in 3 seconds.”
                </p>
              </motion.div>

              {/* Floating Test Pattern Badge */}
              <motion.div
                {...float}
                className="card absolute -right-2 top-6 flex items-center gap-2.5 p-3.5 shadow-xl sm:-right-6"
              >
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-vio-600 to-sky-600 text-white shadow-soft">
                  <Target size={20} />
                </span>
                <div>
                  <p className="text-xs font-extrabold text-ink-900 dark:text-white">IBA & STS Pattern</p>
                  <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Sectional Cut-offs Verified</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* HERO TEST SEARCH BAR */}
          <Reveal delay={0.2} className="mt-12">
            <HeroTestSearch
              onOpenDoraemon={q => {
                window.dispatchEvent(new CustomEvent('open-doraemon', { detail: { query: q } }))
              }}
            />
          </Reveal>
        </section>

        {/* FROM CONFUSED TO CONFIDENT IN THREE STEPS */}
        <section id="how" className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-vio-600 dark:text-vio-400">
                  Proven Aptitude Methodology
                </span>
                <h2 className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                  From confused to confident in three steps
                </h2>
              </div>
              <p className="max-w-md text-sm text-ink-700/80 dark:text-lav-200/80">
                Tailored for the real syllabus demands of IBA Karachi and Sukkur IBA (STS) admission tests.
              </p>
            </div>
          </Reveal>

          {/* Interactive Step Cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {creativeSteps.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 0.1}>
                <div
                  onClick={() => setActiveStepTab(idx)}
                  className={`card group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden p-6 transition duration-300 hover:-translate-y-1.5 ${
                    activeStepTab === idx ? 'ring-2 ring-vio-500 shadow-xl' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-3xl font-black text-lav-300 dark:text-white/20 group-hover:text-vio-600 transition">
                        {step.num}
                      </span>
                      <span className="rounded-full bg-vio-600/10 px-2.5 py-0.5 text-xs font-bold text-vio-700 dark:bg-white/10 dark:text-lav-200">
                        {step.tag}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl font-bold text-ink-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed opacity-75">{step.desc}</p>
                  </div>

                  <div className="mt-6 space-y-2 border-t border-lav-200/80 pt-4 dark:border-white/10">
                    <div className="rounded-xl bg-lav-50 p-2.5 text-xs leading-relaxed dark:bg-ink-900">
                      <strong className="text-vio-700 dark:text-vio-400">Key Authentic Insight: </strong>
                      {step.insight}
                    </div>
                    <div className="rounded-xl bg-emerald-500/10 p-2.5 text-[11px] font-medium text-emerald-800 dark:text-emerald-300">
                      <strong>Worked Example:</strong> {step.example}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* BUILT FOR HOW STUDENTS ACTUALLY STUDY - INTERACTIVE PREVIEWS */}
        <section id="features" className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Interactive Learning Suite
                </span>
                <h2 className="mt-2 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Built for how students actually study
                </h2>
              </div>
              <p className="max-w-md text-sm text-ink-700/80 dark:text-lav-200/80">
                Try the live interactive samples below. Each preview is fully responsive and unlocks full test topics.
              </p>
            </div>
          </Reveal>

          {/* MAIN 3 INTERACTIVE TOOLS (Flashcards, Quizzes, Planner) */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* 1. FLASHCARDS PREVIEW */}
            <Reveal delay={0.05}>
              <div className="card flex h-full flex-col overflow-hidden border-2 border-vio-200/80 p-5 dark:border-white/15">
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-vio-600 text-white shadow-sm">
                      <Layers size={18} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base">Flashcards</h3>
                      <p className="text-[11px] opacity-60">IBA Vocabulary & Math</p>
                    </div>
                  </div>
                  <Link
                    to="/flashcards"
                    className="text-xs font-bold text-vio-600 dark:text-vio-400 hover:underline"
                  >
                    Open Hub →
                  </Link>
                </div>
                <div className="mt-2 flex-1">
                  <FlashcardInteractivePreview />
                </div>
              </div>
            </Reveal>

            {/* 2. QUIZZES PREVIEW */}
            <Reveal delay={0.1}>
              <div className="card flex h-full flex-col overflow-hidden border-2 border-emerald-200/80 p-5 dark:border-white/15">
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm">
                      <ClipboardCheck size={18} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base">Practice Quizzes</h3>
                      <p className="text-[11px] opacity-60">Timed IBA & STS Mock</p>
                    </div>
                  </div>
                  <Link
                    to="/quizzes"
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    Open Arena →
                  </Link>
                </div>
                <div className="mt-2 flex-1">
                  <QuizInteractivePreview />
                </div>
              </div>
            </Reveal>

            {/* 3. PLANNER & FOCUS TIMER PREVIEW */}
            <Reveal delay={0.15}>
              <div className="card flex h-full flex-col overflow-hidden border-2 border-sky-200/80 p-5 dark:border-white/15">
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-600 text-white shadow-sm">
                      <CalendarClock size={18} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base">Planner + Focus</h3>
                      <p className="text-[11px] opacity-60">Pomodoro & 30-Day Plan</p>
                    </div>
                  </div>
                  <Link
                    to="/planner"
                    className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Open Schedule →
                  </Link>
                </div>
                <div className="mt-2 flex-1">
                  <PlannerInteractivePreview />
                </div>
              </div>
            </Reveal>
          </div>

          {/* ADDITIONAL CORE STUDY FEATURES GRID */}
          <div className="mt-8 grid gap-5 md:grid-cols-6">
            <Reveal className="md:col-span-4">
              <div className="card relative h-full min-h-[18rem] overflow-hidden">
                <Photo img={IMG.group} icon={MessagesSquare} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/50 to-transparent" />
                <div className="relative flex h-full min-h-[18rem] flex-col justify-end p-6 text-white sm:p-8">
                  <MessagesSquare size={26} className="text-sky-300" />
                  <h3 className="mt-3 text-xl font-bold sm:text-2xl">Follow-ups that remember context</h3>
                  <p className="mt-1 max-w-lg text-sm text-white/85">
                    Ask “Why was option B wrong?” or “Give me another math problem with different numbers”. Doraemon AI keeps the complete context of your study conversation.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="md:col-span-2">
              <div className="card h-full p-6">
                <Lock className="text-vio-600 dark:text-vio-400" />
                <h3 className="mt-4 font-bold">Private & Secure</h3>
                <p className="mt-1 text-sm opacity-75">Your study progress and test queries remain private to your student account.</p>
                <div className="mt-5 flex items-center gap-2 rounded-2xl bg-lav-100 p-3 text-xs font-medium dark:bg-ink-900">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Database row-level security enabled
                </div>
              </div>
            </Reveal>

            <Reveal className="md:col-span-3">
              <div className="card h-full p-6">
                <Target className="text-vio-600 dark:text-vio-400" />
                <h3 className="mt-4 font-bold">Three answer styles</h3>
                <p className="mb-4 mt-1 text-sm opacity-75">Switch between simple, detailed, and exam-focused on any question.</p>
                <StyleDemo />
              </div>
            </Reveal>

            <Reveal delay={0.08} className="md:col-span-3">
              <div className="card h-full p-6">
                <Languages className="text-vio-600 dark:text-vio-400" />
                <h3 className="mt-4 font-bold">English and Urdu (اردو)</h3>
                <p className="mb-4 mt-1 text-sm opacity-75">Write in either language and receive clear step-by-step explanations.</p>
                <LanguageDemo />
              </div>
            </Reveal>
          </div>

          {/* ROADMAP / NAVIGATION BAR */}
          <Reveal className="mt-6">
            <div className="card flex flex-wrap items-center justify-between gap-4 p-5">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <p className="text-sm font-bold text-ink-900 dark:text-white">Quick Test Prep Portals:</p>
                <Link to="/flashcards" className="flex items-center gap-1.5 text-xs font-semibold text-vio-600 dark:text-vio-400 hover:underline">
                  <Layers size={15} /> Flashcards Hub
                </Link>
                <Link to="/quizzes" className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                  <ClipboardCheck size={15} /> Quizzes Arena
                </Link>
                <Link to="/planner" className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                  <CalendarClock size={15} /> Planner + Pomodoro
                </Link>
              </div>

              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent('open-doraemon', {
                      detail: { query: 'Hi Doraemon! Tell me how to prepare for the IBA test starting today.' }
                    })
                  )
                }}
                className="btn-primary !px-4 !py-2 text-xs font-bold"
              >
                <Bot size={15} /> Chat with Doraemon
              </button>
            </div>
          </Reveal>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
              <Photo img={IMG.desk} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-900/95 via-ink-900/85 to-ink-900/40" />
              <div className="relative max-w-xl px-6 py-14 text-white sm:px-12 sm:py-16">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Ready to ace your IBA admission test?
                </h2>
                <p className="mt-3 text-base text-white/85">
                  Join thousands of candidates preparing for IBA Karachi, Sukkur IBA STS, NTHP, and STHP. Free flashcards, mock quizzes, and 24/7 Doraemon AI support.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/signup" className="btn !px-7 !py-3.5 bg-white text-base font-bold text-vio-700 hover:bg-lav-100 shadow-soft">
                    Start learning free
                  </Link>
                  <Link to="/quizzes" className="btn !px-7 !py-3.5 border border-white/40 text-base font-semibold text-white hover:bg-white/10">
                    Try Practice Quiz
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  )
}
