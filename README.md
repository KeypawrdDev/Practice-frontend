# SkillForge

A practice-driven Next.js + React 19 application that exercises modern frontend best practices: Server Components, Server Actions, async forms, optimistic UI, React Query, virtualization, Storybook, testing pyramid, a11y, performance budgets, and production hardening.

---

## 0) TL;DR Quick Start
```bash
# 1) Create the repo (or clone if this already exists)
npx create-next-app@latest skillforge --ts --eslint --app
cd skillforge

# 2) Install core deps
npm i @tanstack/react-query zustand zod
npm i prisma @prisma/client
npm i -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
npm i -D vitest @testing-library/react @testing-library/jest-dom msw playwright
npm i -D @types/node @types/react @types/react-dom

# 3) Init Prisma (SQLite in dev)
npx prisma init --datasource-provider sqlite

# 4) Dev server
npm run dev
```
> The full guided setup is below. If you’re starting from an already scaffolded repo, skip to **“Phase 1: Scaffold & Baseline Quality Gates.”**

---

## 1) Project Goals
- Learn by shipping: every week adds a feature **and** a quality gate (tests, a11y, perf).
- Prefer **server components** for data rendering; use client components only for interactivity.
- Mutations use **Server Actions** with `useActionState`, `useFormStatus`, `useOptimistic`.
- Reads are cached with **React Query** where CSR fits (client islands), otherwise RSC.
- Keep client global state minimal (a few **Zustand** stores max).
- Bake in **testing**, **a11y**, **observability**, and **performance budgets** from day one.

---

## 2) Architecture Overview
**Stack:** Next.js (App Router), TypeScript (strict), Tailwind + shadcn/ui, Prisma (SQLite→Postgres), Auth.js, React Query, Zod, MSW, Vitest/RTL, Playwright, Storybook, Sentry.

**Folders**
```
app/                 # routes (mostly RSC)
  (marketing)/       # public landing
  dashboard/
  boards/[id]/
  notes/[slug]/
  api/               # route handlers (webhooks/REST fallbacks)
components/          # shared UI (client where needed)
features/            # feature-scoped modules (boards, tasks, comments, notes)
lib/                 # db, auth, validators, fetchers
styles/
tests/               # unit + e2e
.storybook/          # storybook config
```

**Data Model (Prisma)**
- User, Board, Task (status/priority enums), Tag, TaskTag, Comment, Note, Attachment.

---

## 3) Environments & Secrets
Create `.env.local` (dev) and configure CI/Vercel secrets (prod):
```
# Database
DATABASE_URL="file:./dev.db"              # dev (SQLite)
# DATABASE_URL="postgresql://..."         # prod

# Auth
AUTH_SECRET="replace_me"
NEXTAUTH_URL="http://localhost:3000"
GITHUB_ID=...
GITHUB_SECRET=...

# Uploads (choose one)
UPLOADTHING_SECRET=...
UPLOADTHING_APP_ID=...
# or S3 compatible
S3_ENDPOINT=...
S3_BUCKET=...
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...

# Observability
SENTRY_DSN=...
```

---

## 4) Scripts
Add/confirm these in `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "storybook": "storybook dev -p 6006",
    "storybook:build": "storybook build",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "ci": "npm run lint && npm run typecheck && npm run test && npm run e2e"
  }
}
```

---

## 5) Phase Plan (8 Weeks)
Each phase has **deliverables**, **quality gates**, and **acceptance criteria**. Work as issues/PRs.

### Phase 1 — Scaffold & Baseline Quality Gates
- **Deliverables:** TS strict, ESLint+Prettier, Tailwind, shadcn/ui, basic layout, Auth.js.
- **Quality:** unit test baseline (Vitest), E2E smoke (Playwright), MSW installed.
- **Accept:** Lighthouse a11y ≥ 95 on marketing page; login → dashboard passes E2E.

### Phase 2 — Boards & Tasks CRUD (Server Actions)
- **Deliverables:** Create/rename board; CRUD tasks; Zod validation; optimistic inserts.
- **Quality:** RTL tests for forms; error boundaries; Suspense shells for lists.
- **Accept:** No client waterfalls; mutation error paths covered by tests.

### Phase 3 — Caching & Prefetch
- **Deliverables:** React Query for client islands; pagination/infinite scroll; route prefetch.
- **Quality:** MSW handlers for lists; retry/backoff tested.
- **Accept:** 0 redundant calls on nav; stale-while-revalidate documented.

### Phase 4 — Comments & Uploads
- **Deliverables:** Drag-drop upload with progress and cancel; attachments list.
- **Quality:** a11y live regions; keyboard path; failure UI.
- **Accept:** Upload cancel works; SR announces progress; optimistic row rollback.

### Phase 5 — Notes + Search
- **Deliverables:** Markdown editor (client) + RSC preview; debounced search with `useDeferredValue`.
- **Quality:** perf note (before/after); RTL tests for editor events.
- **Accept:** Editor responsive on large doc; search perceived ≤ 150ms.

### Phase 6 — Performance & Large Lists
- **Deliverables:** Virtualized TaskList (5k+ items); code-split heavy libs; transitions.
- **Quality:** bundle analyzer budget (< 250 kB gz per main route); profiler notes.
- **Accept:** TTI < 2.5s; ≥ 60fps while fast scrolling.

### Phase 7 — Design System & Storybook
- **Deliverables:** Tokens, Button/Input/Modal/Toast/Skeleton; stories with controls.
- **Quality:** Storybook a11y + interactions addons; visual diff in CI.
- **Accept:** DS primitives documented; visual baseline captured.

### Phase 8 — Observability, i18n, Hardening
- **Deliverables:** Sentry, Web Vitals, 404/500 pages, i18n (en + one RTL), auth guards.
- **Quality:** chaos test a failing action; MTTR checklist.
- **Accept:** Errors captured with context; CLS/LCP reported; RTL UI usable.

---

## 6) Implementation Steps (Day 1–2 Detailed)
1. **Init repo** with Next.js App Router (TS, ESLint). Commit.
2. **Tailwind**: configure `globals.css`, `tailwind.config.ts` with app paths.
3. **shadcn/ui**: `npx shadcn-ui@latest init` and add Button, Input, Dialog.
4. **Prisma**: define schema for User/Board/Task; `npm run db:push`; seed script.
5. **Auth.js**: GitHub/email provider; protect `/dashboard`, `/boards/*`, `/notes/*`.
6. **Layouts**: AppShell with skip-to-content, nav landmarks, focus styles.
7. **Testing**: Vitest setup + RTL custom render; MSW worker; one Playwright smoke.

---

## 7) Coding Standards
- **TypeScript:** no `any`/`unknown` leaks; discriminated unions for enums.
- **State:** keep local; compute derived values on render; avoid Context unless necessary.
- **Effects:** minimal and idempotent; correct deps; prefer actions over effects.
- **Accessibility:** roles/labels/state; keyboard first; focus management; contrast AA.
- **Performance:** measure before optimizing; prefer RSC; lazy-load heavy client code.

---

## 8) Testing Strategy
- **Unit (Vitest):** utility fns, hooks.
- **Component (RTL):** forms, lists, modals (with MSW).
- **E2E (Playwright):** login → create board → add task → upload file → edit note.
- **Visual:** Storybook screenshot diffs in CI (optional to start).

Run tests:
```bash
npm run test       # unit/component
npm run e2e        # end-to-end (headless)
npm run e2e:ui     # interactive runner
```

---

## 9) Performance Budget
- Route JS (gz) < **250 kB**; image sizes responsive; no render-blocking waterfalls.
- List scroll ≥ **60fps** on mid-tier laptop; TTI < **2.5s** on cold load.
- Use `useTransition`/`useDeferredValue` for input-heavy views.

---

## 10) CI/CD
- GitHub Actions: lint → typecheck → unit → e2e → deploy (preview).
- Block merge on red checks; attach Lighthouse or Web Vitals summary to PR (optional).
- Deploy to Vercel; set env vars in project settings.

---

## 11) Contributions & Branching
- Create a GitHub issue per backlog item; link PRs.
- Branch naming: `feat/*`, `fix/*`, `chore/*`, `test/*`.
- Each PR must include: tests, a11y notes, perf notes (before/after if relevant).

---

## 12) Troubleshooting
- **Auth callback loop**: verify `NEXTAUTH_URL` matches site URL and provider creds.
- **Prisma schema drift**: run `npm run db:push`; check VSCode Prisma extension warnings.
- **Playwright fails on CI**: run `npx playwright install --with-deps` in workflow.
- **Type errors from shadcn/ui**: re-generate components; ensure TS module resolution is `NodeNext`.

---

## 13) Roadmap Backlog (copy into GitHub Issues)
1. Scaffold repo (Phase 1)  
2. Prisma schema + seed  
3. Auth + protected routes  
4. Board/Task CRUD with Server Actions  
5. Virtualized TaskList  
6. React Query prefetch on boards  
7. Comments + uploads with progress/cancel  
8. Notes editor + RSC preview  
9. Storybook + tokens + primitives  
10. E2E happy path  
11. Sentry + Web Vitals + 404/500  
12. i18n baseline & RTL pass

---

## 14) License & Credits
- MIT (default). Adapt as you wish.
- Built as a learning vehicle for practicing modern React/Next.js engineering.