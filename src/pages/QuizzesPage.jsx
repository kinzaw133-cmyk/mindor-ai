import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle2, AlertCircle, Clock, RotateCcw, Trophy, Check, X, Bot, Sparkles, HelpCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChatWidget from '../components/ChatWidget'
import { MOCK_QUIZ_QUESTIONS } from '../data/testPrepData'

export default function QuizzesPage() {
  const [filterSubject, setFilterSubject] = useState('All')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes for sample quiz
  const [timerRunning, setTimerRunning] = useState(true)

  const filteredQuestions = filterSubject === 'All'
    ? MOCK_QUIZ_QUESTIONS
    : MOCK_QUIZ_QUESTIONS.filter(q => q.subject.toLowerCase().includes(filterSubject.toLowerCase()))

  const currentQ = filteredQuestions[currentIdx] || filteredQuestions[0]
  const totalQ = filteredQuestions.length

  useEffect(() => {
    if (!timerRunning || isSubmitted || timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(timer)
  }, [timerRunning, isSubmitted, timeLeft])

  const handleSelectOption = optIdx => {
    if (isSubmitted) return
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optIdx }))
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    setTimerRunning(false)
    window.scrollTo({ top: 100, behavior: 'smooth' })
  }

  const handleRestart = () => {
    setSelectedAnswers({})
    setIsSubmitted(false)
    setCurrentIdx(0)
    setTimeLeft(180)
    setTimerRunning(true)
  }

  // Calculate score
  const score = filteredQuestions.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.correct ? 1 : 0)
  }, 0)
  const percentage = Math.round((score / totalQ) * 100)

  return (
    <div className="min-h-screen bg-lav-50 text-ink-900 dark:bg-ink-900 dark:text-lav-100">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-vio-600 transition hover:text-vio-700 dark:text-vio-400"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
            <Sparkles size={14} /> Real IBA Test Simulation
          </div>
        </div>

        {/* Page Title */}
        <div className="mt-4">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            IBA & STS Authentic Quiz Arena
          </h1>
          <p className="mt-2 text-base opacity-80 sm:text-lg">
            Timed practice MCQs with individual cut-off simulation, immediate answer review, and bilingual explanations.
          </p>
        </div>

        {/* Subject Filter & Timer Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-lav-200 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-ink-800">
          {/* Subject Pills */}
          <div className="flex flex-wrap gap-2">
            {['All', 'English Verbal', 'Mathematics', 'General Knowledge'].map(sub => (
              <button
                key={sub}
                onClick={() => {
                  setFilterSubject(sub)
                  handleRestart()
                }}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                  filterSubject === sub
                    ? 'bg-vio-600 text-white'
                    : 'bg-lav-100 hover:bg-lav-200 dark:bg-ink-900 dark:hover:bg-ink-700'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2 rounded-2xl bg-lav-100 px-3.5 py-1.5 text-xs font-bold text-ink-900 dark:bg-ink-900 dark:text-white">
            <Clock size={16} className={timeLeft < 60 ? 'animate-pulse text-rose-500' : 'text-vio-600 dark:text-vio-400'} />
            <span>Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
          </div>
        </div>

        {/* QUIZ SCORECARD IF SUBMITTED */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card mt-8 overflow-hidden p-6 text-center sm:p-10"
          >
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 text-white shadow-lg">
              <Trophy size={40} />
            </div>
            <h2 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">Quiz Complete!</h2>
            <p className="mt-1 text-sm opacity-80">
              {percentage >= 50
                ? '🎉 Congratulations! You cleared the individual subject cut-off benchmark!'
                : 'Keep practicing! Review your mistakes below to turn weak areas into strengths.'}
            </p>

            <div className="mx-auto mt-6 flex max-w-sm justify-around rounded-2xl bg-lav-50 p-4 dark:bg-ink-900">
              <div>
                <p className="text-xs font-bold uppercase opacity-60">Score</p>
                <p className="text-2xl font-extrabold text-vio-600 dark:text-vio-400">{score} / {totalQ}</p>
              </div>
              <div className="h-10 w-px bg-lav-300 dark:bg-white/10" />
              <div>
                <p className="text-xs font-bold uppercase opacity-60">Percentage</p>
                <p className="text-2xl font-extrabold text-ink-900 dark:text-white">{percentage}%</p>
              </div>
              <div className="h-10 w-px bg-lav-300 dark:bg-white/10" />
              <div>
                <p className="text-xs font-bold uppercase opacity-60">Status</p>
                <p className={`text-base font-bold mt-1 ${percentage >= 50 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {percentage >= 50 ? 'PASSED' : 'RETRY'}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button onClick={handleRestart} className="btn-primary !px-6 !py-3">
                <RotateCcw size={16} /> Retake Quiz
              </button>
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent('open-doraemon', {
                      detail: { query: `I just scored ${score}/${totalQ} on the practice quiz. Can you explain the questions I got wrong?` }
                    })
                  )
                }}
                className="btn-ghost border border-lav-300 dark:border-white/15 !px-5 !py-3 font-bold"
              >
                <Bot size={18} /> Ask Doraemon to Explain Mistakes
              </button>
            </div>

            {/* In-depth Review */}
            <div className="mt-10 text-left">
              <h3 className="text-xl font-bold">Detailed Question Review:</h3>
              <div className="mt-4 space-y-4">
                {filteredQuestions.map((q, idx) => {
                  const userChoice = selectedAnswers[idx]
                  const isCorrect = userChoice === q.correct

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl border p-4 ${
                        isCorrect
                          ? 'border-emerald-300 bg-emerald-500/5 dark:border-emerald-500/20'
                          : 'border-rose-300 bg-rose-500/5 dark:border-rose-500/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-vio-700 dark:text-vio-400">
                          {q.subject} • Q{idx + 1}
                        </span>
                        <span className={`flex items-center gap-1 text-xs font-bold ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {isCorrect ? <><Check size={14} /> Correct</> : <><X size={14} /> Incorrect</>}
                        </span>
                      </div>
                      <p className="mt-2 font-semibold text-sm whitespace-pre-line">{q.question}</p>
                      
                      <div className="mt-2 grid gap-1.5 text-xs sm:grid-cols-2">
                        {q.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className={`rounded-xl p-2 font-medium ${
                              oIdx === q.correct
                                ? 'bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 font-bold'
                                : oIdx === userChoice
                                ? 'bg-rose-500/20 text-rose-900 dark:text-rose-200'
                                : 'opacity-60'
                            }`}
                          >
                            ({String.fromCharCode(65 + oIdx)}) {opt}
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 rounded-xl bg-white p-3 text-xs leading-relaxed dark:bg-ink-900">
                        <p className="font-semibold text-ink-900 dark:text-white">Explanation:</p>
                        <p className="mt-0.5 opacity-85">{q.explanation}</p>
                        {q.urduExp && (
                          <p dir="rtl" className="mt-1 font-medium text-vio-800 dark:text-lav-300">
                            <strong>اردو میں وضاحت:</strong> {q.urduExp}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          /* ACTIVE QUESTION VIEW */
          <div className="card mt-6 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-vio-600/10 px-3 py-1 text-xs font-bold text-vio-700 dark:bg-white/10 dark:text-lav-200">
                {currentQ.subject}
              </span>
              <span className="text-xs font-semibold opacity-70">
                Question {currentIdx + 1} of {totalQ}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="mt-5 text-lg font-bold leading-relaxed sm:text-xl text-ink-900 dark:text-white whitespace-pre-line">
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="mt-6 space-y-3">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentIdx] === oIdx
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left text-sm font-semibold transition ${
                      isSelected
                        ? 'border-vio-600 bg-vio-600 text-white shadow-soft dark:bg-vio-600'
                        : 'border-lav-200 bg-lav-50/50 hover:bg-lav-100 dark:border-white/10 dark:bg-ink-900/60 dark:hover:bg-ink-900'
                    }`}
                  >
                    <span>
                      <span className={`mr-2.5 font-bold ${isSelected ? 'text-white' : 'text-vio-600 dark:text-vio-400'}`}>
                        ({String.fromCharCode(65 + oIdx)})
                      </span>
                      {opt}
                    </span>
                    {isSelected && <CheckCircle2 size={18} className="shrink-0" />}
                  </button>
                )
              })}
            </div>

            {/* Controls */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-lav-200/80 pt-5 dark:border-white/10">
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                  disabled={currentIdx === 0}
                  className="btn-ghost border border-lav-300 dark:border-white/15 !px-4 !py-2.5 text-xs sm:text-sm"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentIdx(prev => Math.min(totalQ - 1, prev + 1))}
                  disabled={currentIdx === totalQ - 1}
                  className="btn-ghost border border-lav-300 dark:border-white/15 !px-4 !py-2.5 text-xs sm:text-sm"
                >
                  Next
                </button>
              </div>

              {currentIdx === totalQ - 1 || Object.keys(selectedAnswers).length === totalQ ? (
                <button onClick={handleSubmit} className="btn-primary !px-6 !py-2.5 text-xs sm:text-sm">
                  Submit Quiz & See Score
                </button>
              ) : (
                <button onClick={handleSubmit} className="btn-ghost text-xs font-semibold opacity-75 hover:opacity-100">
                  Finish Now ({Object.keys(selectedAnswers).length}/{totalQ} answered)
                </button>
              )}
            </div>

            {/* Question Quick Jump Map */}
            <div className="mt-6 flex flex-wrap gap-2 border-t border-lav-200/60 pt-4 dark:border-white/10">
              <span className="text-xs font-bold opacity-60 self-center mr-1">Questions:</span>
              {filteredQuestions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`h-8 w-8 rounded-xl text-xs font-bold transition ${
                    currentIdx === i
                      ? 'bg-vio-600 text-white'
                      : selectedAnswers[i] !== undefined
                      ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                      : 'bg-lav-100 dark:bg-ink-900'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <ChatWidget />
    </div>
  )
}
