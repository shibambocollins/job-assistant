# AI Job Assistant — Frontend Context for Claude

**Purpose of this document:** Complete context for building the React frontend. Backend is complete and tested. This doc is weighted heavily toward *how to implement the visual design so it reads as human-crafted*, not toward re-explaining the API (the endpoint reference is included but kept lean — it hasn't changed). Pair this with `Job_Assistant_Master_Design_Brief.md` for the full screen-by-screen spec.

**Developer:** Collins — final-year Diploma in ICT Application Development student at CPUT, Cape Town.

**Status:** Backend complete (auth, CV upload + AI extraction, job CRUD, Muse discovery, all tested). Frontend not yet started. This is the starting point.

---

## 1. The Core Instruction, Stated Plainly

Every screen must look like it was designed by one deliberate senior product designer, not assembled from default component-library instincts. The single biggest risk on this project is producing something that is *functionally* correct but visually reads as generic AI-tool output — evenly-padded cards, purple gradients, identical rounded corners on everything, centered text everywhere. That look is the thing to actively design against at the CSS/Tailwind implementation level, not just avoid in the abstract.

This section translates the design brief's principles into concrete frontend implementation decisions — the actual class-level and layout-level choices that separate "looks templated" from "looks designed."

---

## 2. What Makes an Interface Read as AI-Generated (and the Fix, at the Code Level)

| AI-generated tell | Concrete fix |
|---|---|
| Every card uses identical padding (`p-6` everywhere, no exceptions) | Vary padding intentionally by content density — a stat card can be tighter (`p-4`), a feature explanation card more generous (`p-8`). Not random — driven by what the content needs. |
| Uniform `rounded-xl`/`rounded-2xl` on every single element | Use a restrained radius scale: sharp/minimal (`rounded-md`) on cards and containers, fully rounded (`rounded-full`) only on pills, badges, and avatars. Radius should communicate a role, not decorate everything equally. |
| Gradient backgrounds as default styling (`bg-gradient-to-r from-X to-Y`) | Solid colors from the fixed palette only. No gradients anywhere in this project — not on buttons, not on hero backgrounds, not on cards. |
| Perfectly even 3-column symmetric grids for every section | Break symmetry deliberately — a 60/40 split instead of 50/50, a hero with an asymmetric two-column layout (text narrower than the illustration, or vice versa), a features section where one card is visually larger because it's the flagship feature (AI CV analysis), not equal-weighted with the rest. |
| Icon-in-a-colored-circle for every single feature, applied uniformly | Use icons (Lucide) sparingly and only where they add real scanability — not as decoration on every list item. When used, vary their treatment; don't wrap all of them in identical circles. |
| `shadow-lg` applied uniformly to every card/surface | Mix elevation techniques: some surfaces use a 1px Stone Grey border with no shadow at all, some use a very subtle shadow (`shadow-sm`), reserve any stronger shadow for genuinely floating elements like modals/dropdowns. |
| Default Tailwind type scale used without a considered hierarchy (`text-sm`, `text-base`, `text-lg`, `text-xl` applied without intention) | Define a real type scale up front (Section 4) and use it consistently — every heading level should have a deliberate, specific size/weight/line-height, not whatever the nearest default utility happens to be. |
| Centered text + centered layout as the default for every section | Left-align body content and most section headers by default. Reserve centered alignment for the hero headline and final CTA only — centering everything is a strong "template" tell. |
| Emoji used as icons | Never. Use Lucide icons exclusively, or no icon at all. |
| Even, metronomic vertical spacing between every section (`py-24` repeated identically down the whole landing page) | Vary section spacing based on visual weight — a dense section (features grid) can have tighter vertical padding than a sparse one (testimonials), so the page has rhythm instead of a mechanical beat. |
| Glassmorphic navbars, floating blob SVGs behind hero text, glowing orb decorations | None of these. Flat, solid Warm White or White surfaces. No decorative background shapes anywhere in this project. |

---

## 3. Color System (Fixed — Reference Only, Full Detail in Master Design Brief)

| Role | Hex | Usage |
|---|---|---|
| Primary brand | `#7A5C46` (Walnut Brown) | Headings, wordmark, primary text accents |
| Primary accent/CTA | `#6F8A68` (Sage Green) | Primary buttons, links, active states, focus rings |
| Secondary accent | `#8FA38A` (Moss Green) | Secondary button fills, subtle highlights |
| Secondary brand | `#A58A76` (Taupe) | Hover states on brown elements |
| Background | `#F8F7F4` (Warm White) | Page background — never pure white for the page itself |
| Surface | `#FFFFFF` (White) | Cards, modals, inputs — this is what creates contrast against the page background |
| Border | `#E8E5E1` (Stone Grey) | All borders/dividers |
| Primary text | `#1F1F1F` (Charcoal) | Body copy, headings |
| Secondary text | `#6B6B6B` (Soft Grey) | Captions, timestamps, placeholders |

**Status colors:** Saved → Stone Grey · Applied → Dusty Blue `#6C8299` · Interview → Ochre `#B8863F` · Offer → Sage Green `#6F8A68` · Rejected → Terracotta `#B5654A`

**Tailwind config:** define all of these as named theme colors (`walnut`, `sage`, `moss`, `taupe`, `warm-white`, `stone`, `charcoal`, `soft-grey`, plus the five status colors) in `tailwind.config.js` rather than using arbitrary hex values inline throughout components. This is both cleaner code and a forcing function that prevents accidentally introducing an off-palette color mid-build.

---

## 4. Type Scale (Define Once, Use Everywhere — Don't Improvise Per Component)

- **Display/H1** (landing hero only): large, heading typeface, tight line-height, Charcoal or Walnut Brown
- **H2** (section headers): clearly smaller than H1 but still commanding — this is where most AI-generated sites get lazy and just use `text-2xl font-bold` everywhere; be more deliberate than that
- **H3** (card titles, subsection headers): UI sans-serif, medium weight
- **Body**: UI sans-serif, Charcoal, comfortable line-height (1.5–1.6) for readability in dense dashboard views
- **Caption/meta** (timestamps, helper text): Soft Grey, smaller, used sparingly

Two typefaces total: one with actual character for headings (not a default system sans), one highly legible UI font for everything else. Pick these once in the Tailwind config as `font-heading` and `font-sans`, don't mix in a third font anywhere.

---

## 5. Spacing and Layout Discipline

- 8-point spacing system throughout (`4px` increments minimum, `8px` as the base unit) — every margin/padding value should be a multiple of this, no arbitrary `13px` or `p-[17px]` values
- Dashboard and dense list views: tighter, scanable spacing — this is a tool people use daily, not a marketing page, so don't apply landing-page-generous whitespace to the dashboard
- Landing page: more generous spacing is appropriate, but vary it per section per the table in Section 2 rather than repeating the same vertical rhythm down the whole page
- Card/list asymmetry: on the Dashboard, the "Discover jobs" CTA area should read as visually heavier/more prominent than the job list rows beneath it — larger padding, bolder button, more breathing room around it — while the list itself stays tight and dense

---

## 6. Component-Level Rules

**Buttons** — four types, visually distinct, never improvised per screen:
- Primary: filled Sage Green, white text, `rounded-md` (not pill-shaped unless it's genuinely a small tag/badge)
- Secondary: outline, Walnut Brown or Sage Green border, transparent fill
- Ghost: text-only, no border, no background, used for Cancel/dismiss
- Destructive: filled Terracotta, delete confirmations only — never used for anything else, so it retains its warning meaning

**Status pills**: small, `rounded-full`, colored background at roughly 15% opacity with full-strength text color from the same hue — never a full-card color wash, never used decoratively anywhere except actual status indication

**Cards**: White surface, Stone Grey 1px border, minimal/no shadow by default — reserve any shadow increase for hover states only, as a subtle interaction cue rather than baseline decoration

**Forms**: inline validation states using Terracotta for errors — never a popup/toast for field-level validation, only for action-level feedback (save success, delete confirmation, etc.)

**Loading states**: skeleton placeholders (shaped blocks matching the real content layout) for list/detail views on initial load. Spinners are acceptable only for button-level in-progress states (e.g. "Discover jobs" button while the Muse API call is in flight), never for full-page or list content loading.

---

## 7. Illustration Style (Landing Page Only)

Flat or isometric vector illustration, Slack/Notion/Stripe/Linear/Vercel tier — limited color palette pulled directly from the brand colors above, no arbitrary rainbow illustration colors, no cartoonish faces. Integrated directly into its section's layout, never floating over a decorative blob shape. If no suitable illustration asset is available, it is better to omit it entirely and let strong typography carry the hero section than to drop in a generic stock illustration that breaks the palette discipline.

---

## 8. Screens to Build (Reference — Full Spec in Master Design Brief)

1. Landing page (public)
2. Login
3. Register
4. Dashboard
5. Add/Edit Job (modal/panel)
6. CV page
7. Job Detail + Analysis
8. Chat

No logo yet — wordmark only, set in the heading typeface.

---

## 9. Backend API Reference (Condensed — Unchanged, Backend Is Complete)

**Base URL (dev):** `http://localhost:8080` · **Base URL (prod):** not yet deployed

**Auth:** every protected call needs `Authorization: Bearer <token>`

| Endpoint | Method | Auth | Notes |
|---|---|---|---|
| `/auth/register` | POST | No | `{email, password, fullName}` → `{message, token}` |
| `/auth/login` | POST | No | `{email, password}` → `{message, token}` |
| `/auth/me` | GET | Yes | → `{email, authorities}` |
| `/cv/upload` | POST | Yes | `multipart/form-data`, field name `file` → `{id, message}`. One CV per user — no replace endpoint yet. |
| `/cv/my-cv` | GET | Yes | → full CV object. **`skillsJson` is a stringified JSON string — requires a second `JSON.parse()`** to get `{skills[], education[], certifications[], projects[], experience[]}`. `experience` may legitimately be empty — not an error. |
| `/jobs` | POST | Yes | `{title, company, description, location}` → `JobApplicationResponse` |
| `/jobs` | GET | Yes | → array of `JobApplicationResponse` |
| `/jobs/{id}/status` | PATCH | Yes | `{status}` — one of `SAVED/APPLIED/INTERVIEW/OFFER/REJECTED` |
| `/jobs/{id}` | DELETE | Yes | → `204` |
| `/jobs/discover` | POST | Yes | No body. Requires CV uploaded first. Can return empty array on repeat calls — correct dedup behavior, not a bug. Takes a few seconds (external Muse API call) — use a button-level loading state. |

**`JobApplicationResponse` shape:**
```json
{ "id": 1, "jobTitle": "string", "company": "string", "location": "string", "status": "SAVED", "appliedDate": "2026-08-04", "createdAt": "ISO datetime" }
```

**Not yet built (backend pending — build these screens visually with mock data first, wire later):** `POST /jobs/{jobId}/analyze`, `GET /jobs/{jobId}/analysis`, `POST /chat`, `GET /chat/history`

**Known backend quirks to handle gracefully:** most errors are generic `500`s rather than precise status codes — be defensive in error handling rather than branching on specific codes; H2 is in-memory so all data wipes on backend restart during dev — if data vanishes mid-testing, check whether the backend restarted before assuming a frontend bug.

---

## 10. Build Order

1. Scaffold — React + Vite + Tailwind, theme colors/fonts configured per Sections 3–4 before writing any screen
2. Auth screens + token storage + protected route wrapper
3. Dashboard, wired to `GET /jobs`
4. Add Job modal, wired to `POST /jobs`
5. CV page, wired to upload + `GET /cv/my-cv` (remember the double `JSON.parse`)
6. Discover Jobs button, wired to `POST /jobs/discover`
7. Status update + delete on job list
8. Landing page (no backend dependency, can be built anytime)
9. Job Detail + Analysis — build UI now with mock data, wire once backend Analysis service ships
10. Chat — build UI now with mock data, wire once backend Chat service ships

---

## 11. Final Check Before Calling Any Screen Done

Look at it and ask: could this be mistaken for a default shadcn/ui or Tailwind UI template with the colors swapped? If yes, it needs another pass — vary the spacing, break a symmetry somewhere, remove a redundant shadow or border-radius, tighten the copy. The goal on every screen is that it reads as a specific, considered decision, not a component library's default output wearing this project's color palette.
