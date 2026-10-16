import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, RotateCw, CheckCircle, ChevronLeft, ChevronRight, Shuffle, Sparkles, BookOpen, Layers, Languages, Bot } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChatWidget from '../components/ChatWidget'
import { FLASHCARD_DECKS } from '../data/testPrepData'

export default function FlashcardsPage() {
  const [activeDeckIdx, setActiveDeckIdx] = useState(0)
  const [cardIdx, setCardIdx] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showUrdu, setShowUrdu] = useState(false)
  const [mastered, setMastered] = useState({})

  const currentDeck = FLASHCARD_DECKS[activeDeckIdx]
  const currentCard = currentDeck.cards[cardIdx]
  const totalCards = currentDeck.cards.length
  const cardKey = `${activeDeckIdx}-${cardIdx}`
  const isMastered = !!mastered[cardKey]

  const handleNext = () => {
    setIsFlipped(false)
    setCardIdx(prev => (prev + 1) % totalCards)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setCardIdx(prev => (prev - 1 + totalCards) % totalCards)
  }

  const handleShuffle = () => {
    setIsFlipped(false)
    const randomIdx = Math.floor(Math.random() * totalCards)
    setCardIdx(randomIdx)
  }

  const toggleMastered = () => {
    setMastered(prev => ({ ...prev, [cardKey]: !prev[cardKey] }))
  }

  return (
    <div className="min-h-screen bg-lav-50 text-ink-900 dark:bg-ink-900 dark:text-lav-100">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-vio-600 transition hover:text-vio-700 dark:text-vio-400"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-vio-600/10 px-3 py-1 text-xs font-bold text-vio-700 dark:bg-white/10 dark:text-lav-200">
            <Sparkles size={14} /> IBA Aptitude Flashcard Hub
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="mt-4">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            IBA & STS Interactive Flashcards
          </h1>
          <p className="mt-2 max-w-2xl text-base opacity-80 sm:text-lg">
            Master high-frequency vocabulary, quick math formulas, and STS general knowledge with 3D memory cards.
          </p>
        </div>

        {/* Deck Selectors */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {FLASHCARD_DECKS.map((deck, idx) => (
            <button
              key={deck.id}
              onClick={() => {
                setActiveDeckIdx(idx)
                setCardIdx(0)
                setIsFlipped(false)
              }}
              className={`rounded-2xl px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
                activeDeckIdx === idx
                  ? 'bg-vio-600 text-white shadow-soft dark:bg-vio-600'
                  : 'border border-lav-300 bg-white hover:bg-lav-100 dark:border-white/10 dark:bg-ink-800 dark:hover:bg-ink-700'
              }`}
            >
              {deck.title} ({deck.count})
            </button>
          ))}
        </div>

        {/* Flashcard Active Workspace */}
        <div className="mt-8">
          <div className="flex items-center justify-between text-xs font-semibold opacity-75">
            <span>Card {cardIdx + 1} of {totalCards}</span>
            <button
              onClick={() => setShowUrdu(u => !u)}
              className="inline-flex items-center gap-1 text-vio-600 dark:text-vio-400 font-bold hover:underline"
            >
              <Languages size={15} /> {showUrdu ? 'Urdu On (اردو)' : 'Show Urdu (اردو)'}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-lav-200 dark:bg-ink-800">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-vio-600 transition-all duration-300"
              style={{ width: `${((cardIdx + 1) / totalCards) * 100}%` }}
            />
          </div>

          {/* 3D Flippable Card */}
          <div className="mt-6 [perspective:1000px]">
            <motion.div
              onClick={() => setIsFlipped(f => !f)}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative min-h-[19rem] w-full cursor-pointer rounded-3xl border-2 border-lav-200/90 bg-white p-6 shadow-soft [transform-style:preserve-3d] dark:border-white/15 dark:bg-ink-800 sm:min-h-[22rem] sm:p-10"
            >
              {/* FRONT (QUESTION / STEM) */}
              <div
                className="absolute inset-0 flex flex-col justify-between p-6 [backface-visibility:hidden] sm:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-bold text-sky-700 dark:text-sky-300">
                    Question / Term
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium opacity-60">
                    <RotateCw size={13} /> Click card to flip
                  </span>
                </div>

                <div className="my-auto text-center">
                  <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-4xl text-ink-900 dark:text-white">
                    {currentCard.q}
                  </h2>
                  <p className="mt-3 text-xs opacity-60">Tap to reveal explanation, shortcuts & examples</p>
                </div>

                <div className="flex items-center justify-between text-xs opacity-70">
                  <span>Topic: {currentDeck.title}</span>
                  <span className="font-semibold text-vio-600 dark:text-vio-400">Click to flip →</span>
                </div>
              </div>

              {/* BACK (ANSWER & EXPLANATION) */}
              <div
                className="absolute inset-0 flex flex-col justify-between p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-10 bg-gradient-to-br from-vio-900 via-ink-900 to-ink-900 text-white rounded-3xl"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-300">
                    Meaning & Answer
                  </span>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      toggleMastered()
                    }}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition ${
                      isMastered ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <CheckCircle size={14} /> {isMastered ? 'Mastered!' : 'Mark as Learned'}
                  </button>
                </div>

                <div className="my-auto space-y-3">
                  <p className="text-base font-bold sm:text-xl text-lav-100">
                    {currentCard.a}
                  </p>
                  {currentCard.eg && (
                    <div className="rounded-2xl bg-white/10 p-3 text-xs sm:text-sm text-lav-200">
                      <strong>Usage / Worked Example:</strong> {currentCard.eg}
                    </div>
                  )}
                  {showUrdu && currentCard.urdu && (
                    <div dir="rtl" className="rounded-2xl bg-white/10 p-3 text-xs sm:text-sm text-lav-200">
                      <strong>اردو میں معنی: </strong> {currentCard.urdu}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-lav-300">
                  <span>Click anywhere to flip back</span>
                  <span className="font-semibold">← Flip</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="btn-ghost border border-lav-300 dark:border-white/15 !px-4 !py-2.5 text-xs sm:text-sm"
              >
                <ChevronLeft size={18} /> Previous
              </button>
              <button
                onClick={handleNext}
                className="btn-primary !px-5 !py-2.5 text-xs sm:text-sm"
              >
                Next Card <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleShuffle}
                className="btn-ghost border border-lav-300 dark:border-white/15 !px-3.5 !py-2.5 text-xs sm:text-sm"
                title="Shuffle Cards"
              >
                <Shuffle size={16} /> Shuffle
              </button>
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent('open-doraemon', {
                      detail: { query: `Test me on "${currentCard.q}" with a sample question!` }
                    })
                  )
                }}
                className="btn-ghost bg-sky-500/10 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 !px-3.5 !py-2.5 text-xs sm:text-sm font-bold"
              >
                <Bot size={16} /> Practice with Doraemon
              </button>
            </div>
          </div>
        </div>

        {/* All Cards in Deck Overview */}
        <section className="mt-16">
          <h3 className="text-xl font-bold">All Cards in this Deck ({currentDeck.title}):</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {currentDeck.cards.map((card, i) => (
              <div
                key={i}
                onClick={() => {
                  setCardIdx(i)
                  setIsFlipped(false)
                  window.scrollTo({ top: 220, behavior: 'smooth' })
                }}
                className={`card cursor-pointer p-4 transition hover:-translate-y-1 ${
                  cardIdx === i ? 'ring-2 ring-vio-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-vio-600 dark:text-vio-400">Card #{i + 1}</span>
                  {mastered[`${activeDeckIdx}-${i}`] && (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                      ✓ Mastered
                    </span>
                  )}
                </div>
                <h4 className="mt-2 font-display text-base font-bold">{card.q}</h4>
                <p className="mt-1 line-clamp-2 text-xs opacity-75">{card.a}</p>
                {card.urdu && (
                  <p dir="rtl" className="mt-1 line-clamp-1 text-xs text-vio-800 dark:text-lav-300">
                    {card.urdu}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  )
}
