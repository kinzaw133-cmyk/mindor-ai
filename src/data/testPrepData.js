// Authentic IBA University (IBA Karachi & Sukkur IBA STS / NTHP / STHP) Test Preparation Knowledge Base
// Includes test patterns, topic summaries, formula shortcuts, authentic MCQs with explanations, and Urdu translations.

export const IBA_TEST_PATTERNS = {
  ibaKarachi: {
    title: 'IBA Karachi Entry Test Pattern (BBA / BS / ACF)',
    shortDesc: 'Aptitude test conducted by IBA Karachi for Undergraduate Admissions (Round 1 & Round 2).',
    totalQuestions: '90 - 100 MCQs',
    duration: '100 Minutes (50 min per section)',
    sections: [
      { name: 'English (Verbal Reasoning)', count: '45-50 MCQs', weight: '50%', topics: 'Vocabulary, Analogies, Sentence Completion, Error Detection, Reading Comprehension' },
      { name: 'Mathematics (Quantitative Reasoning)', count: '45-50 MCQs', weight: '50%', topics: 'Arithmetic, Percentages, Algebra, Geometry, Word Problems, Probability, Number Systems' }
    ],
    passingCriteria: 'Individual section cut-offs (usually ~45-50% in English AND Math separately) plus overall composite merit cutoff.',
    negativeMarking: '0.25 marks deducted for wrong answers in selected test years (or penalty as per test slip instructions). Always confirm with current admission circular.',
    tips: 'Time management is key: ~60 seconds per question. Never spend more than 90 seconds on a single math problem. Eliminate obvious wrong options first.'
  },
  sukkurIbaSts: {
    title: 'Sukkur IBA University (STS / NTHP / STHP) Pattern',
    shortDesc: 'SIBA Testing Services (STS) pattern for Direct Admission, NTHP (National Talent Hunt), and STHP (Sindh Talent Hunt).',
    totalQuestions: '100 MCQs',
    duration: '120 Minutes',
    sections: [
      { name: 'English', count: '40 MCQs', weight: '40%', topics: 'Grammar, Prepositions, Synonyms/Antonyms, Spelling, Sentence Correction, Comprehension' },
      { name: 'Mathematics', count: '40 MCQs', weight: '40%', topics: 'Matric & Inter Math: Fractions, Linear/Quadratic Equations, Ratios, Percentages, Geometry, Sets' },
      { name: 'General Knowledge & IQ', count: '20 MCQs', weight: '20%', topics: 'Pakistan Studies, Everyday Science, Current Affairs, Basic Analytical Logic' }
    ],
    passingCriteria: 'Minimum 50% overall aggregate, with specific program-wise interview eligibility.',
    negativeMarking: 'Generally NO negative marking for STS aptitude tests (unless specifically stated).',
    tips: 'Attempt all questions since there is typically no negative marking. Start with General Knowledge and English grammar to save time for Math.'
  }
}

export const TEST_TOPICS = [
  {
    id: 'analogies',
    title: 'Analogies (IBA Verbal Section)',
    category: 'English Verbal',
    shortDesc: 'Analogies test your ability to recognize logical relationships between word pairs. A core fixture in IBA Karachi & STS tests.',
    urduDesc: 'اینالوجیز میں الفاظ کے باہمی تعلق کو سمجھا جاتا ہے جیسے کہ آلہ اور اس کا کام، جز اور کل، یا سبب اور اثر۔',
    keyRules: [
      'Bridge Sentence Technique: Form a clear, specific sentence connecting Word A and Word B. E.g., "A thermometer is used to measure temperature."',
      'Match Parts of Speech: If the stem is NOUN : VERB, the answer pair must follow the same grammatical order.',
      'Common Relations: Cause & Effect, Tool & User, Part to Whole, Degree of Intensity, Characteristic & Object.'
    ],
    urduExplanation: 'اینالوجیز کو حل کرنے کا سنہری اصول "برج سینٹنس" ہے، یعنی دونوں الفاظ کے درمیان ایک جملہ بنائیں اور وہی تعلق دی گئی آپشنز میں تلاش کریں۔',
    mcqs: [
      {
        question: 'ODOMETER : DISTANCE ::',
        options: ['scale : weight', 'length : width', 'inch : foot', 'mileage : speed'],
        correct: 0,
        explanation: 'An odometer is an instrument used to measure distance, just as a scale is an instrument used to measure weight.',
        urduExp: 'اوڈومیٹر فاصلہ ناپنے کا آلہ ہے، بالکل اسی طرح ترازو (Scale) وزن ناپنے کا آلہ ہے۔'
      },
      {
        question: 'CANDLE : WAX ::',
        options: ['metal : anvil', 'tire : rubber', 'fire : wood', 'book : reader'],
        correct: 1,
        explanation: 'A candle is made entirely out of wax; similarly, a tire is made out of rubber.',
        urduExp: 'موم بتی موم سے بنتی ہے، اسی طرح ٹائر ربڑ سے بنتا ہے۔'
      },
      {
        question: 'WHISPER : SHOUT ::',
        options: ['walk : run', 'listen : hear', 'touch : hold', 'cry : weep'],
        correct: 0,
        explanation: 'Whisper and shout represent extremes of vocal intensity. Similarly, walk and run represent degrees of locomotion.',
        urduExp: 'سرگوشی اور چیخ بولنے کی شدت کے دو مختلف درجے ہیں، اسی طرح چلنا اور دوڑنا حرکت کے درجات ہیں۔'
      }
    ]
  },
  {
    id: 'percentages',
    title: 'Percentages & Profit/Loss Shortcuts',
    category: 'Mathematics',
    shortDesc: 'Aptitude math heavily tests mental calculations of percentages, price markups, successive discounts, and profit margins.',
    urduDesc: 'فیصد کے سوالات آئی بی اے ٹیسٹ کا بنیادی حصہ ہیں۔ اس میں منافع، نقصان اور مسلسل رعایت کے شارٹ کٹس شامل ہیں۔',
    keyRules: [
      'Benchmark 10% & 1% Method: To find 15% of 80: 10% = 8, 5% = 4 -> Total = 12.',
      'Multiplier Method: An increase of 25% means multiplying by 1.25. A decrease of 20% means multiplying by 0.80.',
      'Successive Discounts: Single equivalent discount for d1% and d2% = (d1 + d2 - (d1 * d2)/100)%.'
    ],
    urduExplanation: '10 فیصد اور 1 فیصد کا اصول اپنائیں۔ 80 کا 10 فیصد 8 ہے، اس کا آدھا 4 ہے۔ تو 15 فیصد ہوا 12۔ کبھی بھی لمبی تقسیم نہ کریں۔',
    mcqs: [
      {
        question: 'If the price of a textbook is increased by 20% and then decreased by 20%, what is the net percentage change in price?',
        options: ['No change (0%)', '4% decrease', '4% increase', '2% decrease'],
        correct: 1,
        explanation: 'Net change = x + y + (xy/100). Here +20 - 20 - (400/100) = -4%. Hence, a 4% decrease.',
        urduExp: 'شارٹ کٹ فارمولا: +20 - 20 - (20*20/100) = -4%۔ یعنی قیمت میں 4 فیصد کمی آئے گی۔'
      },
      {
        question: 'A shopkeeper offers two successive discounts of 10% and 10%. What is the single equivalent discount?',
        options: ['20%', '19%', '18.5%', '21%'],
        correct: 1,
        explanation: 'Equivalent discount = 10 + 10 - (10 * 10 / 100) = 20 - 1 = 19%.',
        urduExp: 'مسلسل رعایت کا فارمولا: 10 + 10 - (100/100) = 19 فیصد۔'
      },
      {
        question: 'What is 35% of 160?',
        options: ['52', '56', '58', '60'],
        correct: 1,
        explanation: '10% of 160 = 16. 30% = 16 * 3 = 48. 5% = 8. Total = 48 + 8 = 56.',
        urduExp: '160 کا 10% = 16، تو 30% = 48۔ 5% = 8۔ کل = 48 + 8 = 56۔'
      }
    ]
  },
  {
    id: 'algebra-quadratics',
    title: 'Algebra & Quadratic Equations',
    category: 'Mathematics',
    shortDesc: 'Algebra problems in IBA focus on factorizations, roots of quadratics, discriminants, and systems of linear equations.',
    urduDesc: 'الجبرے میں دو درجی مساوات، فیکٹرائزیشن، اور ایک ساتھ مساواتوں کو حل کرنے کے تیز ترین طریقے پوچھے جاتے ہیں۔',
    keyRules: [
      'Quadratic Discriminant: D = b² - 4ac. If D > 0 (2 real roots), D = 0 (1 repeated root), D < 0 (complex roots).',
      'Sum and Product of Roots: For ax² + bx + c = 0, Sum = -b/a, Product = c/a.',
      'Difference of Squares: a² - b² = (a - b)(a + b). Vital for simplifying tricky fractions instantly.'
    ],
    urduExplanation: 'دو درجی مساوات کے جڑوں کا مجموعہ -b/a اور حاصل ضرب c/a ہوتا ہے۔ آپشنز کو مساوات میں درج کر کے فوری جواب معلوم کریں۔',
    mcqs: [
      {
        question: 'If x² - 5x + 6 = 0, what are the roots of the equation?',
        options: ['x = -2, -3', 'x = 2, 3', 'x = 1, 6', 'x = -1, -6'],
        correct: 1,
        explanation: 'Factoring: (x - 2)(x - 3) = 0, hence roots are x = 2 and x = 3.',
        urduExp: 'مساوات کے اجزائے ضربی (x - 2)(x - 3) بنتے ہیں، لہٰذا جواب 2 اور 3 ہے۔'
      },
      {
        question: 'If (x + y) = 10 and (x - y) = 4, what is the value of x² - y²?',
        options: ['40', '14', '60', '100'],
        correct: 0,
        explanation: 'x² - y² = (x + y)(x - y) = 10 * 4 = 40.',
        urduExp: 'شارٹ کٹ فارمولا: x² - y² = (x + y)(x - y) = 10 * 4 = 40۔'
      }
    ]
  },
  {
    id: 'sentence-completion',
    title: 'Sentence Completion & Context Clues',
    category: 'English Verbal',
    shortDesc: 'Fill in the blanks questions test vocabulary in context, syntactic awareness, and transition words (contrast vs. support).',
    urduDesc: 'جملے کی تکمیل میں سیاق و سباق کے اشاروں اور گرائمر کا استعمال کر کے خالی جگہ پُر کی جاتی ہے۔',
    keyRules: [
      'Identify Pivot Words: Words like "although, however, despite, yet" indicate contrast. Words like "furthermore, and, because" indicate support.',
      'Predict Before Looking: Cover the choices and predict a simple word that fits the context, then find the synonym in the options.',
      'Double Blanks: Eliminate choices where the first blank fails, which instantly cuts down options by 50%.'
    ],
    urduExplanation: 'جملے میں تضاد ظاہر کرنے والے الفاظ (although, but) اور حمایت ظاہر کرنے والے الفاظ (because, so) کو تلاش کریں۔',
    mcqs: [
      {
        question: 'Although she was usually ________, tonight she was unusually talkative.',
        options: ['eloquent', 'reticent', 'gregarious', 'effusive'],
        correct: 1,
        explanation: '"Although" signals contrast with "talkative". "Reticent" means reserved or silent.',
        urduExp: 'لفظ "Although" تضاد ظاہر کر رہا ہے۔ "talkative" کا الٹ "reticent" (کم گو) ہے۔'
      },
      {
        question: 'Because the evidence was ________, the judge was forced to dismiss the case.',
        options: ['conclusive', 'inconclusive', 'overwhelming', 'irrefutable'],
        correct: 1,
        explanation: '"Because" signals cause-and-effect. A case is dismissed when evidence is not convincing (inconclusive).',
        urduExp: 'مقدمہ خارج ہوا کیونکہ ثبوت غیر حتمی (inconclusive) تھے۔'
      }
    ]
  },
  {
    id: 'speed-time-work',
    title: 'Speed, Distance & Time / Work Problems',
    category: 'Mathematics',
    shortDesc: 'Work-rate and relative speed questions are among the most frequently tested quantitative word problems in IBA & STS.',
    urduDesc: 'رفتار، فاصلہ، وقت اور مل کر کام کرنے کی رفتار کے مسائل۔ ان کے آسان اور تیز ترین فارمولے۔',
    keyRules: [
      'Work Rate Formula: If A takes x days and B takes y days, together they take (x * y) / (x + y) days.',
      'Average Speed: If a car travels distance d at speed x and returns at speed y, Average Speed = (2xy) / (x + y).',
      'Relative Speed: Same direction = (s1 - s2); Opposite direction = (s1 + s2).'
    ],
    urduExplanation: 'اگر دو لوگ الگ الگ کام x اور y دنوں میں کرتے ہیں تو مل کر (x * y) / (x + y) دنوں میں کریں گے۔',
    mcqs: [
      {
        question: 'Ali can finish a job in 6 days and Bilal can finish the same job in 12 days. How many days will they take together?',
        options: ['4 days', '6 days', '9 days', '3 days'],
        correct: 0,
        explanation: 'Combined time = (6 * 12) / (6 + 12) = 72 / 18 = 4 days.',
        urduExp: 'شارٹ کٹ: (6 * 12) / (6 + 12) = 72 / 18 = 4 دن۔'
      },
      {
        question: 'A car travels from City A to B at 60 km/h and returns at 40 km/h. What is the average speed for the whole round trip?',
        options: ['50 km/h', '48 km/h', '45 km/h', '52 km/h'],
        correct: 1,
        explanation: 'Average speed = 2xy / (x + y) = 2(60)(40) / (60 + 40) = 4800 / 100 = 48 km/h.',
        urduExp: 'شارٹ کٹ اوسط رفتار: 2(60)(40) / (60 + 40) = 48 کلومیٹر فی گھنٹہ۔'
      }
    ]
  },
  {
    id: 'general-knowledge-sts',
    title: 'Sukkur IBA STS General Knowledge & Pakistan Studies',
    category: 'General Knowledge',
    shortDesc: 'Sukkur IBA tests (STS / NTHP / STHP) dedicate 20% weightage to Pakistan affairs, geography, international bodies, and basic science.',
    urduDesc: 'سکھر آئی بی اے ایس ٹی ایس ٹیسٹ میں 20 فیصد جنرل نالج، مطالعہ پاکستان، دریا، بیراج اور سائنسی معلومات ہوتی ہیں۔',
    keyRules: [
      'High-yield topics: Major dams (Tarbela, Mangla), barrages of Sindh (Sukkur, Guddu, Kotri), constitution years (1956, 1962, 1973).',
      'Geography: Largest desert (Thar), highest peak (K2), mountain ranges (Himalayas, Karakoram, Hindu Kush).',
      'Everyday Science: Vitamins, solar system, atmospheric layers, basic physics units.'
    ],
    urduExplanation: 'سندھ کے بیراج (سکھر، گڈو، کوٹری) اور پاکستان کے اہم ترین جغرافیائی مقامات لازمی یاد رکھیں۔',
    mcqs: [
      {
        question: 'Which is the oldest barrage built on the Indus River in Sindh?',
        options: ['Guddu Barrage', 'Kotri Barrage', 'Sukkur Barrage (Lloyd Barrage)', 'Taunsa Barrage'],
        correct: 2,
        explanation: 'Sukkur Barrage (originally named Lloyd Barrage) was commissioned in 1932 and is the oldest on River Indus.',
        urduExp: 'سکھر بیراج (لارڈ بیراج) 1932 میں مکمل ہوا اور یہ دریائے سندھ پر سب سے قدیم بیراج ہے۔'
      },
      {
        question: 'What is the SI unit of electric current?',
        options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
        correct: 1,
        explanation: 'The SI unit of electric current is Ampere (A).',
        urduExp: 'کرنٹ کی اکائی ایمپیئر (Ampere) ہے۔'
      }
    ]
  }
]

export const FLASHCARD_DECKS = [
  {
    id: 'iba-vocab',
    title: 'IBA High-Yield Vocabulary',
    count: 6,
    cards: [
      { q: 'EPHEMERAL', a: 'Lasting for a very short time; fleeting or momentary.', urdu: 'عارضی، قلیل مدتی، جو جلد ختم ہو جائے۔', eg: 'Fame in modern media is often ephemeral.' },
      { q: 'MITIGATE', a: 'To make less severe, serious, or painful; alleviate.', urdu: 'شدت میں کمی لانا، بوجھ ہلکا کرنا۔', eg: 'The government took steps to mitigate the flood damage.' },
      { q: 'PRAGMATIC', a: 'Dealing with things sensibly and realistically based on practical considerations.', urdu: 'حقیقت پسندانہ، عملی۔', eg: 'We need a pragmatic approach rather than theoretical speculation.' },
      { q: 'UBIQUITOUS', a: 'Present, appearing, or found everywhere at the same time.', urdu: 'ہر جگہ موجود، ہمہ گیر۔', eg: 'Smartphones have become ubiquitous in daily life.' },
      { q: 'LACONIC', a: 'Using very few words; concise or terse in speech.', urdu: 'مختصر گو، کم الفاظ میں بات کہنے والا۔', eg: 'His laconic reply of "No" ended the meeting.' },
      { q: 'CAPRICIOUS', a: 'Given to sudden and unaccountable changes of mood or behavior; erratic.', urdu: 'غیر متوقع، متلون مزاج۔', eg: 'The weather in the mountains can be highly capricious.' }
    ]
  },
  {
    id: 'math-shortcuts',
    title: 'Quantitative Formulas & Shortcuts',
    count: 6,
    cards: [
      { q: 'Percentage Multiplier Trick', a: '25% increase = multiply by 1.25. 15% decrease = multiply by 0.85.', urdu: 'اضافے کے لیے 1 میں فیصد جوڑیں (1.25)، کمی کے لیے 1 سے تفریق کریں (0.85)۔', eg: '25% increase on 400 = 400 * 1.25 = 500.' },
      { q: 'Combined Work Equation', a: 'Time Together = (A * B) / (A + B)', urdu: 'مل کر کام کرنے کا وقت = دونوں کا ضرب تقسیم دونوں کا مجموعہ۔', eg: 'If A=4 and B=6, Time = (4*6)/(4+6) = 24/10 = 2.4 days.' },
      { q: 'Average Speed for Equal Distance', a: 'Avg Speed = (2 * S1 * S2) / (S1 + S2)', urdu: 'برابر فاصلے کے لیے اوسط رفتار = 2 * S1 * S2 / (S1 + S2)۔', eg: 'Going at 60 km/h, returning at 40 km/h = 48 km/h.' },
      { q: 'Sum of First n Natural Numbers', a: 'Sum = [n * (n + 1)] / 2', urdu: 'پہلے n قدرتی اعداد کا مجموعہ = n(n+1)/2۔', eg: 'Sum of 1 to 50 = (50 * 51) / 2 = 1275.' },
      { q: 'Pythagorean Triples', a: 'Common right triangles: 3-4-5, 5-12-13, 8-15-17, 7-24-25.', urdu: 'قائمۃ الزاویہ مثلث کے مشہور ٹرپلز: 3-4-5 اور 5-12-13۔', eg: 'If sides are 6 and 8, hypotenuse is 10 (multiple of 3-4-5).' },
      { q: 'Difference of Squares', a: 'a² - b² = (a - b)(a + b)', urdu: 'دو مربعوں کا فرق = (a - b)(a + b)۔', eg: '52² - 48² = (52 - 48)(52 + 48) = 4 * 100 = 400.' }
    ]
  },
  {
    id: 'sts-gk',
    title: 'Sukkur IBA STS General Knowledge',
    count: 5,
    cards: [
      { q: 'First & Oldest Barrage of Sindh', a: 'Sukkur Barrage (Lloyd Barrage), completed in 1932.', urdu: 'سندھ کا سب سے پہلا اور بڑا بیراج سکھر بیراج (1932) ہے۔', eg: 'Feeds 7 major canals across Sindh and Balochistan.' },
      { q: 'Current Constitution of Pakistan', a: 'Enacted in 1973 (passed unanimously on April 10, enforced August 14, 1973).', urdu: 'پاکستان کا موجودہ آئین 1973 کا آئین ہے۔', eg: 'Replaced the 1962 presidential constitution.' },
      { q: 'Largest Artificial (Man-made) Lake', a: 'Keenjhar Lake (Kalri Lake) in Thatta district, Sindh.', urdu: 'پاکستان کی سب سے بڑی مصنوعی جھیل کینجھر جھیل (ٹھٹہ) ہے۔', eg: 'Major source of drinking water for Karachi.' },
      { q: 'Highest Civilian Award in Pakistan', a: 'Nishan-e-Pakistan', urdu: 'پاکستان کا سب سے بڑا سول ایوارڈ نشانِ پاکستان ہے۔', eg: 'Followed by Hilal, Sitara, and Tamgha.' },
      { q: 'Speed of Light in Vacuum', a: 'Approximately 3 × 10⁸ m/s (300,000 km/s).', urdu: 'خلا میں روشنی کی رفتار تقریباً 300,000 کلومیٹر فی سیکنڈ ہے۔', eg: 'Fundamental physical constant denoted by "c".' }
    ]
  }
]

export const MOCK_QUIZ_QUESTIONS = [
  {
    id: 1,
    subject: 'English Verbal',
    question: 'Select the pair that best expresses a relationship similar to that in the original pair:\n\nARCHITECT : BLUEPRINT ::',
    options: ['sculptor : chisel', 'carpenter : lumber', 'composer : score', 'novelist : book'],
    correct: 2,
    explanation: 'An architect creates a blueprint as an instruction design for a building; a composer creates a musical score as an instruction design for music.',
    urduExp: 'ماہر تعمیرات عمارت کا نقشہ (Blueprint) بناتا ہے، بالکل ویسے ہی موسیقار (Composer) دھن کا اسکور لکھتا ہے۔'
  },
  {
    id: 2,
    subject: 'Mathematics',
    question: 'A fruit seller buys apples at 4 for Rs. 50 and sells them at 5 for Rs. 70. What is his percentage profit or loss?',
    options: ['10% profit', '12% profit', '15% profit', '8% loss'],
    correct: 1,
    explanation: 'Cost per apple = 50/4 = Rs. 12.50. Selling price per apple = 70/5 = Rs. 14.00. Profit = 14 - 12.50 = 1.50. Profit % = (1.50 / 12.50) * 100 = 12% profit.',
    urduExp: 'ایک سیب کی لاگت = 12.5 روپے، فروخت = 14 روپے، نفع = 1.5 روپے۔ نفع فیصد = (1.5/12.5)*100 = 12 فیصد۔'
  },
  {
    id: 3,
    subject: 'English Verbal',
    question: 'Choose the word most opposite in meaning (Antonym) to VINDICATE:',
    options: ['exonerate', 'incriminate', 'justify', 'absolve'],
    correct: 1,
    explanation: 'Vindicate means to clear from blame or suspicion. The antonym is incriminate (to imply guilt or blame).',
    urduExp: 'Vindicate کا مطلب بے گناہ ثابت کرنا ہے۔ اس کا متضاد لفظ Incriminate (مجرم ٹھہرانا) ہے۔'
  },
  {
    id: 4,
    subject: 'Mathematics',
    question: 'If the average (arithmetic mean) of 5 numbers is 18, and four of the numbers are 12, 16, 20, and 24, what is the fifth number?',
    options: ['18', '20', '15', '22'],
    correct: 0,
    explanation: 'Sum of all 5 numbers = 5 * 18 = 90. Sum of the four numbers = 12 + 16 + 20 + 24 = 72. Fifth number = 90 - 72 = 18.',
    urduExp: 'پانچوں اعداد کا مجموعہ = 5 * 18 = 90۔ چار اعداد کا مجموعہ = 72۔ پانچواں عدد = 90 - 72 = 18۔'
  },
  {
    id: 5,
    subject: 'General Knowledge',
    question: 'Which is the largest natural freshwater lake in Pakistan and one of the largest in Asia?',
    options: ['Saiful Muluk Lake', 'Manchar Lake', 'Keenjhar Lake', 'Attabad Lake'],
    correct: 1,
    explanation: 'Manchar Lake, located in Jamshoro/Dadu districts of Sindh, is the largest natural freshwater lake in Pakistan.',
    urduExp: 'منچھر جھیل (سندھ) پاکستان کی سب سے بڑی قدرتی میٹھے پانی کی جھیل ہے۔'
  },
  {
    id: 6,
    subject: 'Mathematics',
    question: 'What is the value of x if 2^(2x + 1) = 32?',
    options: ['1', '2', '3', '4'],
    correct: 1,
    explanation: '32 = 2^5. So 2^(2x + 1) = 2^5 => 2x + 1 = 5 => 2x = 4 => x = 2.',
    urduExp: '32 دراصل 2 کی پاور 5 ہے۔ لہٰذا 2x + 1 = 5 بنتا ہے، جس سے x = 2 نکلتا ہے۔'
  }
]
