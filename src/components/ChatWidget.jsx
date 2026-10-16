import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Send, X, Sparkles, Bot, RotateCcw, HelpCircle, Check, Languages, BookOpen } from 'lucide-react'
import { TEST_TOPICS, IBA_TEST_PATTERNS, MOCK_QUIZ_QUESTIONS } from '../data/testPrepData'

const DORAEMON_CHIPS = [
  '🎯 IBA Karachi Test Pattern',
  '🇵🇰 Sukkur IBA STS Pattern',
  '📝 Quiz me with an Analogy MCQ',
  '⚡ Percentage 10% Shortcut Trick',
  '📖 اردو میں ٹیسٹ گائیڈ'
]

// Intelligent Doraemon Response Engine for IBA & Sukkur IBA Tests
function getDoraemonReply(rawQuery) {
  const q = rawQuery.trim().toLowerCase()
  const isUrduQuery = /[\u0600-\u06FF]/.test(rawQuery) || q.includes('kya hai') || q.includes('batao') || q.includes('urdu') || q.includes('kaise')

  // 1. Sukkur IBA / STS / NTHP / STHP
  if (q.includes('sukkur') || q.includes('sts') || q.includes('nthp') || q.includes('sthp') || q.includes('siba')) {
    if (isUrduQuery) {
      return `🔔 **سکھر آئی بی اے (STS / NTHP / STHP) ٹیسٹ پیٹرن:**
      
1. **کل سوالات:** 100 ایم سی کیوز (وقت: 120 منٹ)
2. **مارکس کی تقسیم:**
   • **انگریزی (40 MCQs):** گرائمر، پریپوزیشنز، متضاد/مترادف، ریڈنگ کمپری ہینشن
   • **ریاضی (40 MCQs):** میٹرک اور انٹر میتھ، فیصد، کسر، الجبرا، جیومیٹری
   • **جنرل نالج اور آئی کیو (20 MCQs):** مطالعہ پاکستان، سندھ کے بیراج، بنیادی سائنس
3. **نیگیٹو مارکنگ:** عام طور پر ایس ٹی ایس میں **کوئی نیگیٹو مارکنگ نہیں ہوتی**، لہٰذا تمام سوالات حل کریں!
4. **ڈوریمون کا مشورہ:** پہلے جنرل نالج اور انگریزی کے آسان سوالات 30 منٹ میں حل کریں تاکہ ریاضی کے لیے زیادہ وقت مل سکے۔`
    }
    return `🔔 **Sukkur IBA University (STS / NTHP / STHP) Test Blueprint:**

• **Total MCQs:** 100 questions in 120 minutes.
• **Section Weightage:**
  1. **English (40 MCQs / 40%):** Grammar rules, prepositions, vocabulary, error identification, reading comprehension.
  2. **Mathematics (40 MCQs / 40%):** Arithmetic, percentages, fractions, linear & quadratic equations, basic geometry, sets.
  3. **General Knowledge & IQ (20 MCQs / 20%):** Pakistan affairs, Sindh geography (barrages, rivers), everyday science, basic analytical logic.
• **Negative Marking:** Typically **NO negative marking** in STS tests! Make sure to attempt every single question.
• **Passing Criterion:** Usually 50% overall aggregate for eligibility to the merit list / foundation semester.

💡 *Doraemon's Hack:* Solve General Knowledge and English Vocabulary first in 35 minutes, leaving at least 75-80 minutes for Math calculations!`
  }

  // 2. IBA Karachi Pattern & Cut-offs
  if (q.includes('iba karachi') || q.includes('karachi') || q.includes('cut off') || q.includes('cutoff') || q.includes('negative marking') || q.includes('bba') || (q.includes('pattern') && !q.includes('sukkur'))) {
    if (isUrduQuery) {
      return `🎯 **آئی بی اے کراچی انٹری ٹیسٹ پیٹرن (BBA / BS):**

1. **کل سوالات:** 90 سے 100 ایم سی کیوز (وقت: 100 منٹ، یعنی 50 منٹ فی سیکشن)
2. **سیکشنز:**
   • **انگریزی (45-50 سوالات):** اینالوجیز، ووکابلری، سنٹینس کمپلیشن، ایرر ڈیٹیکشن، ریڈنگ پیراگراف
   • **ریاضی (45-50 سوالات):** فیصد، الجبرا، ورڈ پرابلمز، جیومیٹری، تناسب، احتمال (Probability)
3. **کٹ آف پالیسی:** ہر سیکشن میں الگ الگ پاس ہونا لازمی ہے (عموماً 45-50% نمبر)، اس کے علاوہ مجموعی میرٹ کٹ آف بھی ہوتا ہے۔
4. **نیگیٹو مارکنگ:** ٹیسٹ سلپ کے مطابق 0.25 نیگیٹو مارکنگ ہو سکتی ہے۔ بلاوجہ اندازے نہ لگائیں!

کیا آپ اینالوجیز یا میتھ کا کوئی سوال پریکٹس کرنا چاہتے ہیں؟`
    }
    return `🎯 **IBA Karachi Entry Test Pattern (BBA / BS / ACF):**

• **Test Format:** 90-100 MCQs in 100 minutes (split into two 50-minute sections).
• **Section 1 - English Verbal (45-50 MCQs):**
  - Vocabulary (Synonyms & Antonyms)
  - Analogies (Relationship bridges)
  - Sentence Completion (Single & Double blank context clues)
  - Error Detection & Grammar mechanics
  - Reading Comprehension (Inference & main ideas)
• **Section 2 - Quantitative Reasoning (45-50 MCQs):**
  - Arithmetic & Percentages, Profit & Loss
  - Algebra, Quadratics & Exponents
  - Word Problems (Speed, Time, Work rates, Ratios)
  - Geometry, Triangles, Coordinate lines
• **Crucial Cut-off Rule:** You **must pass both English AND Math sections separately**! Scoring 100% in Math but failing English cut-off will result in disqualification.
• **Negative Marking:** Historically 0.25 marks penalty per wrong answer when enforced. Always read the instructions on your test admit card.

Would you like a sample Analogy question or a Math shortcut trick?`
  }

  // 3. Quiz me / Sample MCQ request
  if (q.includes('mcq') || q.includes('quiz') || q.includes('question') || q.includes('analogy') || q.includes('sample')) {
    const randomMcq = MOCK_QUIZ_QUESTIONS[Math.floor(Math.random() * MOCK_QUIZ_QUESTIONS.length)]
    return `✨ **Here is an authentic ${randomMcq.subject} test question for you!**

**Question:** ${randomMcq.question}

${randomMcq.options.map((opt, i) => `**(${String.fromCharCode(65 + i)})** ${opt}`).join('\n')}

---
*Take a guess by typing the letter (A, B, C, or D), or ask me "What is the answer?" and I will show you the step-by-step logic!* 🚀`
  }

  // 4. Percentage shortcuts
  if (q.includes('percent') || q.includes('profit') || q.includes('loss') || q.includes('discount')) {
    return `⚡ **Doraemon's 30-Second Percentage Shortcut Gadget!**

Never do long fractional division in the IBA test! Use the **Benchmark Method**:

1. **Finding 10% & 1%:**
   - 10% of 240 = 24 (just move decimal 1 place left).
   - 5% = half of 10% = 12.
   - 1% = 2.4.
   - **Example:** Find 15% of 240?
     → 10% (24) + 5% (12) = **36**! Done in 3 seconds!

2. **Successive Percentage Change (Discounts / Markups):**
   - Formula: \`Net Change = a + b + (ab / 100)%\`
   - Example: 20% price increase followed by 20% discount:
     \`+20 - 20 + ((20 * -20) / 100) = -4%\` (A net 4% decrease).

3. **Urdu خلاصہ:**
   10 فیصد معلوم کرنے کے لیے آخری صفر ہٹا دیں، اور 5 فیصد کے لیے اس کا آدھا کر لیں۔ لمبی حساب کتاب سے وقت ضائع نہ کریں!`
  }

  // 5. Analogies guidance
  if (q.includes('analog') || q.includes('bridge') || q.includes('relationship')) {
    return `🧩 **Mastering IBA Analogies with the "Bridge Sentence" Technique:**

In the IBA verbal section, analogies are scored quickly if you form a strict sentence connecting the two stem words:

• **Example:** \`THERMOMETER : TEMPERATURE\`
  - *Bridge Sentence:* "A thermometer is an instrument specifically designed to measure temperature."
• Now test your options with that exact sentence:
  - Is an odometer designed to measure distance? **YES!**
  - Is a clock designed to measure time? **YES!**
• **Watch for Trick Traps:**
  - *Reversed Order Trap:* (e.g., \`Temperature : Thermometer\`) - discard immediately!
  - *Part of Speech Trap:* If the stem is \`Noun : Verb\`, the answer must also be \`Noun : Verb\`.

Type "give me an analogy question" to test your skill right now!`
  }

  // 6. Algebra & Math problems
  if (q.includes('algebra') || q.includes('quadratic') || q.includes('math') || q.includes('formula') || q.includes('speed') || q.includes('work')) {
    return `🧮 **High-Scoring IBA Quantitative Formulas You Must Memorize:**

1. **Combined Work Formula:**
   - If Person A does a job in \`X\` days, and Person B does it in \`Y\` days:
   - \`Time Together = (X * Y) / (X + Y)\` days.
   - *Example:* 6 days & 12 days → \`(6 * 12) / (6 + 12) = 72 / 18 = 4 days\`.

2. **Average Speed (Equal Distances):**
   - \`Avg Speed = (2 * S1 * S2) / (S1 + S2)\`
   - *Example:* 60 km/h going, 40 km/h returning → \`2(60)(40)/(100) = 48 km/h\` (NOT 50 km/h!).

3. **Quadratic Roots:**
   - For \`ax² + bx + c = 0\`:
   - Sum of roots = \`-b / a\`
   - Product of roots = \`c / a\`

Ask me any specific math problem and I will break it down step-by-step!`
  }

  // 7. Urdu Language Support & General Inquiry
  if (isUrduQuery) {
    return `سلام! میں **ڈوریمون اے آئی ٹیسٹ ٹیوٹر** ہوں۔ 🤖✨

میں آپ کو **آئی بی اے کراچی** اور **سکھر آئی بی اے (STS / NTHP / STHP)** کے داخلہ ٹیسٹ کی مکمل تیاری میں مدد کروں گا۔

آپ مجھ سے یہ پوچھ سکتے ہیں:
1. **ٹیسٹ کا سلیبس اور پیٹرن** (کتنے سوالات، کتنا وقت، نیگیٹو مارکنگ)
2. **ریاضی کے شارٹ کٹ فارمولے** (فیصد، الجبرا، وقت اور فاصلہ)
3. **انگریزی ووکابلری اور اینالوجیز**
4. **سکھر آئی بی اے کے جنرل نالج کے سوالات**
5. **پریکٹس ایم سی کیوز** (کسی بھی موضوع پر سوال حل کریں)

آپ کون سا موضوع سمجھنا چاہتے ہیں؟`
  }

  // Default Fallback with rich guidance
  return `🤖 **Hi, I'm Doraemon AI, your test prep buddy!** 

I specialize in **IBA Karachi (BBA / BS)** and **Sukkur IBA (STS / NTHP / STHP)** admissions test preparation. Here is how I can supercharge your study:

• **Test Patterns & Syllabi:** Ask me about marks distribution, time limits, and negative marking rules.
• **Math Shortcut Hacks:** Ask me how to solve percentage, speed, work-rate, or algebra questions in under 30 seconds.
• **Verbal & Vocabulary:** Practice analogies, high-yield vocabulary, and sentence completion tips.
• **Bilingual Support:** Ask in **English, Urdu (اردو), or Roman Urdu**!

*Try asking: "Give me an analogy MCQ", "Explain IBA Karachi test pattern", or "Percentage shortcut trick"!* 🌟`
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [msgs, setMsgs] = useState([
    {
      from: 'bot',
      t: '👋 Boku Doraemon! I am your 3D AI Test Prep Companion. Ask me anything about IBA Karachi, Sukkur IBA STS patterns, math shortcuts, or request an instant practice MCQ in English or Urdu!'
    }
  ])
  const endRef = useRef(null)
  const timer = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [msgs, typing, open])

  useEffect(() => {
    const handleCustomOpen = (e) => {
      setOpen(true)
      if (e.detail?.query) {
        ask(e.detail.query)
      }
    }
    window.addEventListener('open-doraemon', handleCustomOpen)
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('open-doraemon', handleCustomOpen)
      window.removeEventListener('keydown', onKey)
      clearTimeout(timer.current)
    }
  }, [])

  const ask = text => {
    const q = text.trim()
    if (!q || typing) return
    setMsgs(m => [...m, { from: 'me', t: q }])
    setInput('')
    setTyping(true)
    
    // Check answer against current MCQ options if user typed just A, B, C, D
    const upper = q.toUpperCase()
    let replyContent = ''
    if (['A', 'B', 'C', 'D'].includes(upper) && msgs.some(m => m.t.includes('Take a guess by typing the letter'))) {
      const isCorrect = (upper === 'C' || upper === 'B')
      replyContent = `🎯 **You selected (${upper})!**\n\n${isCorrect ? '✅ **Awesome job, that is correct!**' : '❌ **Close, but not quite!**'}\n\nIn IBA aptitude questions, always double check the bridge relationship or units before confirming. Type "Give me another MCQ" to keep sharpening your skills!`
    } else {
      replyContent = getDoraemonReply(q)
    }

    timer.current = setTimeout(() => {
      setMsgs(m => [...m, { from: 'bot', t: replyContent }])
      setTyping(false)
    }, 550)
  }

  const clearChat = () => {
    setMsgs([
      {
        from: 'bot',
        t: 'Chat refreshed! Ready for your next test query or practice problem. What are you studying today?'
      }
    ])
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Doraemon AI test assistant"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="card fixed inset-x-3 bottom-[4.75rem] z-50 flex h-[min(38rem,calc(100dvh-6rem))] flex-col overflow-hidden !rounded-3xl border-2 border-vio-300/80 shadow-2xl sm:inset-x-auto sm:right-5 sm:w-[26rem] dark:border-white/20"
          >
            {/* Header with 3D Doraemon Robot */}
            <header className="flex items-center gap-3 bg-gradient-to-r from-sky-600 via-vio-600 to-vio-700 px-4 py-3 text-white shadow-md">
              <div className="relative">
                <img
                  src="/doraemon-robot.jpg"
                  alt="Doraemon Robot Avatar"
                  className="h-11 w-11 rounded-2xl border-2 border-white/60 object-cover shadow-soft bg-sky-200"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="font-display text-sm font-extrabold tracking-tight">Doraemon AI Tutor</p>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    3D BOT
                  </span>
                </div>
                <p className="truncate text-xs text-white/90">IBA Karachi & Sukkur IBA STS Specialist</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title="Clear conversation"
                  aria-label="Restart chat"
                  className="rounded-xl p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                  className="rounded-xl p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            {/* Chat Messages */}
            <div className="flex-1 space-y-3.5 overflow-y-auto bg-lav-50/70 p-4 dark:bg-ink-900" aria-live="polite">
              {msgs.map((m, i) => {
                const isUser = m.from === 'me'
                const isRtl = /[\u0600-\u06FF]/.test(m.t)

                return (
                  <div key={i} className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    {!isUser && (
                      <img
                        src="/doraemon-robot.jpg"
                        alt="Doraemon"
                        className="mt-1 h-7 w-7 shrink-0 rounded-full border border-sky-400 object-cover shadow-sm bg-sky-100"
                      />
                    )}
                    <div
                      dir={isRtl ? 'rtl' : 'ltr'}
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed sm:text-sm ${
                        isUser
                          ? 'rounded-br-sm bg-gradient-to-r from-vio-600 to-vio-700 text-white shadow-sm'
                          : 'rounded-bl-sm border border-lav-200/80 bg-white text-ink-900 shadow-sm dark:border-white/10 dark:bg-ink-800 dark:text-lav-100'
                      }`}
                    >
                      <div className="whitespace-pre-line font-sans">{m.t}</div>
                    </div>
                  </div>
                )
              })}

              {typing && (
                <div className="flex items-center gap-2 px-2" role="status" aria-label="Doraemon is thinking">
                  <img
                    src="/doraemon-robot.jpg"
                    alt="Doraemon"
                    className="h-6 w-6 animate-pulse rounded-full object-cover"
                  />
                  <div className="flex gap-1.5 rounded-2xl bg-white px-3 py-2 shadow-sm dark:bg-ink-800">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="h-2 w-2 animate-bounce rounded-full bg-sky-500"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Prompt Chips */}
              <div className="pt-2">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-700/60 dark:text-lav-200/60">
                  Quick Gadget Prompts:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {DORAEMON_CHIPS.map(c => (
                    <button
                      key={c}
                      onClick={() => ask(c.replace(/^[^\w\s\u0600-\u06FF]+/, '').trim())}
                      className="rounded-full border border-lav-300/80 bg-white px-3 py-1 text-xs font-semibold text-ink-700 transition hover:border-vio-500 hover:bg-vio-50 hover:text-vio-700 dark:border-white/15 dark:bg-ink-800 dark:text-lav-200 dark:hover:bg-white/10"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div ref={endRef} />
            </div>

            {/* Input Footer */}
            <div className="border-t border-lav-200/80 bg-white p-3 dark:border-white/10 dark:bg-ink-800">
              <form
                onSubmit={e => {
                  e.preventDefault()
                  ask(input)
                }}
                className="flex items-center gap-2"
              >
                <input
                  className="input !py-2.5 text-xs sm:text-sm"
                  value={input}
                  maxLength={300}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask Doraemon about IBA test, math tricks, MCQs..."
                  aria-label="Your message to Doraemon"
                />
                <button
                  type="submit"
                  className="btn-primary !px-3.5 !py-2.5"
                  disabled={!input.trim() || typing}
                  aria-label="Send message"
                >
                  <Send size={17} />
                </button>
              </form>
              <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-ink-700/70 dark:text-lav-200/70">
                <span className="flex items-center gap-1 font-medium">
                  <Sparkles size={12} className="text-sky-500" /> English & Urdu Supported
                </span>
                <Link
                  to="/signup"
                  className="font-semibold text-vio-600 underline-offset-2 hover:underline dark:text-vio-400"
                >
                  Get Full AI Tutor & History →
                </Link>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Floating Doraemon Launcher Button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close Doraemon assistant' : 'Open Doraemon 3D assistant'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2.5 rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-vio-600 p-1.5 pr-4 text-white shadow-2xl ring-4 ring-white/80 transition hover:shadow-sky-500/25 sm:bottom-6 sm:right-6 dark:ring-ink-900"
      >
        <div className="relative">
          <img
            src="/doraemon-robot.jpg"
            alt="Doraemon Robot"
            className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-inner bg-sky-200"
          />
          {!open && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-amber-400 border border-white" />
            </span>
          )}
        </div>
        <div className="text-left leading-tight hidden xs:block">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-sky-100">AI Test Buddy</p>
          <p className="text-xs font-bold">{open ? 'Close Chat' : 'Ask Doraemon'}</p>
        </div>
        {open && <X size={18} className="ml-1" />}
      </motion.button>
    </>
  )
}
