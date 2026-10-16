import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, X, CheckCircle2, AlertCircle, BookOpen, Lightbulb, Bot, Check, ArrowRight, Languages } from 'lucide-react'
import { TEST_TOPICS, IBA_TEST_PATTERNS } from '../data/testPrepData'

const SUGGESTIONS = [
  'IBA Karachi Pattern',
  'Sukkur IBA STS Pattern',
  'Percentages',
  'Analogies',
  'Algebra & Quadratics',
  'Sentence Completion',
  'Speed & Time',
  'General Knowledge'
]

export default function HeroTestSearch({ onOpenDoraemon }) {
  const [query, setQuery] = useState('')
  const [selectedTopicId, setSelectedTopicId] = useState('analogies')
  const [selectedPatternKey, setSelectedPatternKey] = useState(null)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showUrdu, setShowUrdu] = useState(false)

  // Filter topics based on search query
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null

    // Check for test pattern match
    if (q.includes('iba karachi') || q.includes('karachi') || q.includes('bba') || q.includes('cut off') || q.includes('negative')) {
      return { type: 'pattern', key: 'ibaKarachi' }
    }
    if (q.includes('sukkur') || q.includes('sts') || q.includes('nthp') || q.includes('sthp') || q.includes('siba')) {
      return { type: 'pattern', key: 'sukkurIbaSts' }
    }

    const matches = TEST_TOPICS.filter(t => 
      t.title.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.shortDesc.toLowerCase().includes(q) ||
      (t.urduDesc && t.urduDesc.includes(q))
    )

    return matches.length > 0 ? { type: 'topics', items: matches } : { type: 'none' }
  }, [query])

  // Current active topic to display
  const activeTopic = useMemo(() => {
    if (searchResults?.type === 'topics') {
      return searchResults.items[0]
    }
    return TEST_TOPICS.find(t => t.id === selectedTopicId) || TEST_TOPICS[0]
  }, [searchResults, selectedTopicId])

  const activePattern = useMemo(() => {
    if (searchResults?.type === 'pattern') {
      return IBA_TEST_PATTERNS[searchResults.key]
    }
    if (selectedPatternKey) {
      return IBA_TEST_PATTERNS[selectedPatternKey]
    }
    return null
  }, [searchResults, selectedPatternKey])

  const handleSelectChip = chip => {
    setQuery(chip)
    if (chip === 'IBA Karachi Pattern') {
      setSelectedPatternKey('ibaKarachi')
      setSelectedTopicId(null)
    } else if (chip === 'Sukkur IBA STS Pattern') {
      setSelectedPatternKey('sukkurIbaSts')
      setSelectedTopicId(null)
    } else {
      setSelectedPatternKey(null)
      const found = TEST_TOPICS.find(t => t.title.toLowerCase().includes(chip.toLowerCase()) || chip.toLowerCase().includes(t.title.toLowerCase()))
      if (found) setSelectedTopicId(found.id)
    }
  }

  const handleSelectOption = (mcqIdx, optIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [mcqIdx]: optIdx }))
  }

  const handleAskDoraemon = topicTitle => {
    if (typeof onOpenDoraemon === 'function') {
      onOpenDoraemon(`Explain "${topicTitle}" for IBA admission test with shortcuts and sample questions.`)
    } else {
      window.dispatchEvent(new CustomEvent('open-doraemon', { detail: { query: `Explain "${topicTitle}" for IBA admission test with shortcuts and sample questions.` } }))
    }
  }

  return (
    <div className="mt-8 w-full max-w-4xl">
      {/* Search Bar Input Container */}
      <div className="relative rounded-3xl border border-lav-300/80 bg-white/90 p-2 shadow-soft backdrop-blur-xl transition focus-within:border-vio-500 focus-within:ring-4 focus-within:ring-vio-500/10 dark:border-white/15 dark:bg-ink-800/90">
        <div className="flex items-center gap-3 px-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-vio-500 to-vio-700 text-white shadow-sm">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value)
              if (selectedPatternKey) setSelectedPatternKey(null)
            }}
            placeholder="Search any IBA & STS test topic (e.g., Percentages, Analogies, STS Pattern, Algebra)..."
            aria-label="Search test topics and MCQs"
            className="w-full bg-transparent py-2.5 text-sm font-medium text-ink-900 placeholder:text-ink-700/50 focus:outline-none dark:text-white dark:placeholder:text-lav-200/50 sm:text-base"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setSelectedPatternKey(null); setSelectedTopicId('analogies') }}
              aria-label="Clear search"
              className="rounded-xl p-1.5 text-ink-700/60 hover:bg-lav-100 hover:text-ink-900 dark:text-lav-200/60 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-lav-200/60 px-3 pt-2.5 dark:border-white/10">
          <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-vio-700 dark:text-vio-400">
            <Sparkles size={12} /> Popular:
          </span>
          {SUGGESTIONS.map(chip => (
            <button
              key={chip}
              onClick={() => handleSelectChip(chip)}
              className="rounded-full bg-lav-100/80 px-2.5 py-1 text-xs font-semibold text-ink-700 transition hover:bg-vio-600 hover:text-white dark:bg-ink-900 dark:text-lav-200 dark:hover:bg-vio-600 dark:hover:text-white"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Result Display Box */}
      <AnimatePresence mode="wait">
        {activePattern ? (
          /* TEST PATTERN DISPLAY */
          <motion.div
            key={activePattern.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="card mt-4 overflow-hidden border-vio-200 p-5 dark:border-white/15 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lav-200/70 pb-4 dark:border-white/10">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-vio-600/10 px-3 py-1 text-xs font-bold text-vio-700 dark:bg-vio-400/20 dark:text-vio-300">
                  <BookOpen size={14} /> Official Test Pattern
                </span>
                <h3 className="mt-2 text-xl font-bold text-ink-900 dark:text-white sm:text-2xl">{activePattern.title}</h3>
                <p className="mt-1 text-sm opacity-80">{activePattern.shortDesc}</p>
              </div>
              <button
                onClick={() => handleAskDoraemon(activePattern.title)}
                className="btn-primary !py-2 !text-xs sm:!text-sm"
              >
                <Bot size={16} /> Ask Doraemon Bot
              </button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-lav-50 p-4 dark:bg-ink-900/70">
                <p className="text-xs font-bold uppercase tracking-wide text-vio-600 dark:text-vio-400">Total Questions & Time</p>
                <p className="mt-1 text-lg font-bold">{activePattern.totalQuestions} • {activePattern.duration}</p>
                <p className="mt-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
                  Negative Marking: {activePattern.negativeMarking}
                </p>
              </div>
              <div className="rounded-2xl bg-lav-50 p-4 dark:bg-ink-900/70">
                <p className="text-xs font-bold uppercase tracking-wide text-vio-600 dark:text-vio-400">Passing & Cut-off Policy</p>
                <p className="mt-1 text-xs leading-relaxed opacity-85">{activePattern.passingCriteria}</p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-bold text-ink-900 dark:text-white">Section Breakdown:</h4>
              <div className="mt-2 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {activePattern.sections.map((sec, i) => (
                  <div key={i} className="rounded-2xl border border-lav-200/80 bg-white p-3.5 shadow-sm dark:border-white/10 dark:bg-ink-800">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-vio-700 dark:text-vio-400">{sec.name}</span>
                      <span className="rounded-full bg-lav-100 px-2 py-0.5 text-xs font-semibold dark:bg-ink-900">{sec.weight}</span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-ink-700 dark:text-lav-200">{sec.count}</p>
                    <p className="mt-2 text-[11px] leading-relaxed opacity-75">{sec.topics}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-emerald-500/10 p-3.5 text-xs font-medium text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300">
              <strong>💡 Pro Tip:</strong> {activePattern.tips}
            </div>
          </motion.div>
        ) : activeTopic ? (
          /* TOPIC SUMMARY & SAMPLE MCQS */
          <motion.div
            key={activeTopic.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="card mt-4 overflow-hidden border-vio-200 p-5 dark:border-white/15 sm:p-6"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lav-200/70 pb-4 dark:border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-vio-600/10 px-2.5 py-0.5 text-xs font-bold text-vio-700 dark:bg-vio-400/20 dark:text-vio-300">
                    {activeTopic.category}
                  </span>
                  <span className="text-xs font-medium opacity-60">IBA & STS High-Frequency</span>
                </div>
                <h3 className="mt-1.5 text-xl font-bold text-ink-900 dark:text-white sm:text-2xl">{activeTopic.title}</h3>
                <p className="mt-1 text-sm text-ink-700/80 dark:text-lav-200/80">
                  {showUrdu && activeTopic.urduDesc ? activeTopic.urduDesc : activeTopic.shortDesc}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowUrdu(u => !u)}
                  className={`btn !px-3 !py-1.5 !text-xs font-semibold ${showUrdu ? 'bg-vio-600 text-white' : 'bg-lav-100 dark:bg-ink-900'}`}
                  title="Toggle Urdu Explanation"
                >
                  <Languages size={15} /> {showUrdu ? 'English' : 'اردو میں'}
                </button>
                <button
                  onClick={() => handleAskDoraemon(activeTopic.title)}
                  className="btn-primary !px-3.5 !py-2 !text-xs sm:!text-sm"
                >
                  <Bot size={16} /> Practice with Doraemon
                </button>
              </div>
            </div>

            {/* Key Formulas & Rules */}
            <div className="mt-4 rounded-2xl bg-lav-50 p-4 dark:bg-ink-900/60">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-vio-700 dark:text-vio-400">
                <Lightbulb size={16} /> Key Rules & Shortcut Formulas:
              </div>
              <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-ink-800 dark:text-lav-200 sm:text-sm">
                {activeTopic.keyRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-vio-600 dark:bg-vio-400" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              {showUrdu && activeTopic.urduExplanation && (
                <div dir="rtl" className="mt-3 border-t border-lav-200/70 pt-2 text-xs leading-relaxed text-vio-900 dark:border-white/10 dark:text-lav-200 sm:text-sm">
                  <strong>اردو میں خلاصہ: </strong> {activeTopic.urduExplanation}
                </div>
              )}
            </div>

            {/* Practice MCQs Interactive Section */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-ink-900 dark:text-white">
                  Sample Authentic IBA Questions ({activeTopic.mcqs.length}):
                </h4>
                <span className="text-xs opacity-60">Tap an option to check answer</span>
              </div>

              <div className="mt-3 space-y-4">
                {activeTopic.mcqs.map((mcq, mIdx) => {
                  const userChoice = selectedAnswers[mIdx]
                  const isAnswered = userChoice !== undefined
                  const isCorrect = userChoice === mcq.correct

                  return (
                    <div
                      key={mIdx}
                      className="rounded-2xl border border-lav-200 bg-white p-4 transition shadow-sm dark:border-white/10 dark:bg-ink-800"
                    >
                      <p className="text-sm font-semibold text-ink-900 dark:text-white sm:text-base">
                        <span className="text-vio-600 dark:text-vio-400 font-bold mr-1">Q{mIdx + 1}.</span> {mcq.question}
                      </p>

                      {/* Options */}
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {mcq.options.map((opt, oIdx) => {
                          const isOptionSelected = userChoice === oIdx
                          const isOptionCorrect = oIdx === mcq.correct

                          let btnStyle = 'border-lav-200 bg-lav-50/50 hover:bg-lav-100 dark:border-white/10 dark:bg-ink-900/50 dark:hover:bg-ink-900'
                          if (isAnswered) {
                            if (isOptionCorrect) {
                              btnStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold'
                            } else if (isOptionSelected) {
                              btnStyle = 'border-rose-500 bg-rose-500/15 text-rose-800 dark:text-rose-300 font-medium'
                            } else {
                              btnStyle = 'opacity-60 border-lav-200 dark:border-white/10'
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectOption(mIdx, oIdx)}
                              className={`flex items-center justify-between rounded-xl border p-2.5 text-left text-xs transition sm:text-sm ${btnStyle}`}
                            >
                              <span>
                                <span className="font-bold mr-2 text-vio-600 dark:text-vio-400">
                                  {String.fromCharCode(65 + oIdx)}.
                                </span>
                                {opt}
                              </span>
                              {isAnswered && isOptionCorrect && <CheckCircle2 size={16} className="text-emerald-600 shrink-0 ml-1" />}
                              {isAnswered && isOptionSelected && !isOptionCorrect && <AlertCircle size={16} className="text-rose-600 shrink-0 ml-1" />}
                            </button>
                          )
                        })}
                      </div>

                      {/* Explanation Reveal */}
                      {isAnswered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className={`mt-3 rounded-xl p-3 text-xs leading-relaxed ${isCorrect ? 'bg-emerald-500/10 text-emerald-900 dark:text-emerald-200' : 'bg-lav-100 text-ink-900 dark:bg-ink-900 dark:text-lav-200'}`}
                        >
                          <div className="flex items-center gap-1.5 font-bold mb-1">
                            {isCorrect ? (
                              <span className="text-emerald-600 flex items-center gap-1"><Check size={14} /> Correct!</span>
                            ) : (
                              <span className="text-rose-600 flex items-center gap-1"><X size={14} /> Incorrect</span>
                            )}
                            <span className="opacity-70">— Correct option is ({String.fromCharCode(65 + mcq.correct)})</span>
                          </div>
                          <p>{mcq.explanation}</p>
                          {showUrdu && mcq.urduExp && (
                            <p dir="rtl" className="mt-1 font-medium text-vio-800 dark:text-lav-200">
                              <strong>اردو میں حل:</strong> {mcq.urduExp}
                            </p>
                          )}
                        </motion.div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          /* NO DIRECT MATCH */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card mt-4 p-5 text-center dark:border-white/10"
          >
            <p className="text-sm font-semibold">No direct topic summary found for "{query}".</p>
            <p className="mt-1 text-xs opacity-75">
              Ask our Doraemon AI Assistant to get an instant answer, formula shortcuts, and authentic MCQs!
            </p>
            <button
              onClick={() => handleAskDoraemon(query)}
              className="btn-primary mt-3 !px-4 !py-2 text-xs"
            >
              <Bot size={15} /> Ask Doraemon Bot about "{query}"
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
