# Job Assistant AI — Frontend

React frontend for Job Assistant AI — an AI-powered job search tool that reads your CV, discovers real tech job listings, scores how well you fit each one, and helps you track applications and prep for interviews.

**Live app:** https://job-assistant-web.vercel.app
**Backend repo:** https://github.com/shibambocollins/job-application-assistant-api

> The backend runs on Azure's free tier, which sleeps after inactivity — the first request after a while can take 20–30s to wake up.

---

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- react-router-dom v7
- axios
- Vitest + React Testing Library (unit/component tests)

---

## Running Locally

### Prerequisites
- Node 20+
- The [backend](https://github.com/shibambocollins/job-application-assistant-api) running locally, or the live API URL

### Setup

```bash
git clone https://github.com/shibambocollins/job-assistant.git
cd job-assistant

npm install
cp .env.example .env.local
```

Fill in `.env.local`:

```
VITE_API_BASE_URL=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

```bash
npm run dev
```

Runs on `http://localhost:5173`.

---

## Scripts

```bash
npm run dev         # Start dev server
npm run build       # Type-check and build for production
npm run preview     # Preview the production build locally
npm run test        # Run the test suite once
npm run test:watch  # Run tests in watch mode
npm run lint        # Lint with oxlint
```

---

## What It Does

- **Auth** — email/password or Google Sign-In, forgot/reset password, change password, delete account
- **CV** — upload a PDF/DOCX, see the AI-extracted skills, education, certifications, projects, and experience
- **Dashboard** — paginated table of tracked applications, status updates, link to the original job posting, add jobs manually or via auto-discovery
- **Job detail** — run an AI fit analysis (match score, missing skills, strengths, suggestions) against your CV
- **Chat** — ask the AI about your job search with context of your CV and tracked jobs
- **Profile** — account info, CV summary, change password, delete account

---

## Testing

Vitest + jsdom + React Testing Library. Covers form validation logic, key UI components (`Alert`, `StatusBadge`, `ScoreRing`, `Reveal`), hooks, API error-handling helpers, and a full Dashboard pagination flow.

```bash
npm run test
```

---

## Deployment

Deployed on Vercel from `main`. `vercel.json` rewrites all routes to `index.html` so client-side routing works on refresh/direct navigation (a plain SPA without this returns Vercel's platform 404 on any route but `/`).

---

## Accessibility

Text and UI colors are checked against WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text/UI components) against the backgrounds they actually render on.

---

Built by Collins (Ntsobokwane Collins Shibambo) — final-year Diploma in ICT Application Development student at CPUT.
