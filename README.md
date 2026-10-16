# Mindora AI – AI Study Assistant

React + Vite + Tailwind front end, Supabase (auth, Postgres, RLS), and a server-side AI route (`api/tutor.js`) that calls Anthropic's API. API keys never reach the browser.

## What's built
- Landing page with animated navbar (scroll-aware pill indicator, spring entrance, animated mobile menu), photo hero, interactive feature previews (answer styles, English/Urdu, flip-card), three-step section, CTA and footer
- Responsive assistant chatbot on the landing and login pages (answers questions about Mindora from fixed answers; it does not call the AI API)
- Sign up / log in (Supabase Auth), responsive split-screen login page with show/hide password and footer, protected routes
- `profiles` table created automatically at sign-up (migration 003)
- Design: Roboto body text, Poppins headings, palette #F8F6F4 / #E3F4F4 / #D2E9E9 / #C4DFDF / #E3F2FD (set in `tailwind.config.js`)
- App shell: collapsible animated sidebar (desktop), floating tab bar (mobile)
- **AI Tutor**: saved conversation history, follow-ups with context, Simple / Detailed / Exam-focused styles, Markdown + code blocks + tables, English/Urdu (auto RTL), loading, error, offline states, per-user daily limit
- Dashboard with stats computed from saved activity (streak, questions, today)
- Settings (name, dark/light mode), error boundary, setup notice if Supabase is missing

## Test prep
The tutor has a test selector (General, IBA, NTHP, STHP) that tailors answers toward aptitude-style maths, English and analytical reasoning. The tutor is told to say when it is unsure of the exact format; always confirm syllabus and dates on the official test announcement.

## Not built yet
Notes/PDF summarizer, quizzes, flashcards, planner/Pomodoro, analytics page, profile page. The schema and shell are set up so each can be added as a page + table.

## Photos
Landing and login photos are hotlinked from Unsplash (see `src/data/images.js`). If one cannot load, a palette-coloured placeholder is shown instead. To use your own pictures, drop files into `public/images/` and point `src` at them, e.g. `/images/hero.jpg`.

## Setup
1. `npm install`
2. Create a Supabase project. In the SQL editor run `supabase/migrations/001_init.sql`, then `002_test_track.sql`, then `003_profiles.sql`.
3. Copy `.env.example` to `.env` and fill in the Supabase URL/anon key and your `ANTHROPIC_API_KEY`.
4. Run with the Vercel CLI so `/api/tutor` works locally: `npx vercel dev`
   (`npm run dev` serves only the front end; the tutor will show a message that the AI endpoint isn't running.)
5. Deploy: import the repo into Vercel and add the same env vars in project settings.

In Supabase → Auth → Providers → Email, you may disable "Confirm email" for faster local testing.

## Security notes
- RLS restricts every row to its owner; the API route queries Supabase with the caller's JWT.
- Input is validated (length, style, conversation ownership) and capped by `DAILY_MESSAGE_LIMIT`.
- Only the Supabase anon key is in client code; it is public by design.
