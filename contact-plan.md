# Contact/Consultation Flow Plan

Goal: capture CTA submissions from all `/services/*` pages in `apps/web`, store in `apps/api`, and manage in `apps/admin` with status, filters, search, and sorting.

## Data Contract (Web → API)

Payload (JSON):
- `name` (string, required)
- `email` (string, required)
- `company` (string, optional)
- `projectType` (string, optional)
- `projectSummary` (string, required for detailed form)
- `category` (string, required) — e.g. `app-dev`, `web-dev`, `cms`
- `sourcePage` (string, required) — e.g. `/services/app-dev`

Server-managed fields:
- `status` (enum): `pending | processing | replied | won | lost` (default `pending`)
- `created_at`, `updated_at`
- optional: `ip_address`, `user_agent` for audit/abuse tracking

## API Routes (Apps/API)

Public:
- `POST /api/leads` — create lead/contact

Admin (auth + authorize admin):
- `GET /api/admin/leads` — list leads with filters, search, sort, pagination
- `GET /api/admin/leads/:id` — lead detail
- `PATCH /api/admin/leads/:id/status` — update status

Query params for list:
- `category` (string | string[])
- `status` (enum | enum[])
- `search` (string, fuzzy match across name/email/company/projectSummary)
- `sortBy` (`created_at` | `updated_at` | `status`)
- `sortOrder` (`asc` | `desc`)
- `page`, `limit`

---

## Part 1: `apps/web` (CTA capture)

Milestone: CTA form submits to API with `category` and `sourcePage`, shows success/error, and preserves existing UI.

Todos:
- Update `ConsultationCTA` props to accept `category` and `sourcePage`.
- Add React Hook Form + Zod validation to `ConsultationCTA` (required fields and email format).
- Use `axios` for submission; create `apps/web/lib/api/contact.ts` or similar client.
- Add submission state (loading, success, error) and inline messaging.
- Ensure `sourcePage` defaults from `usePathname()` if not passed.
- Update each services page to pass `category` (e.g. `app-dev`, `web-dev`, `cms`).
- Add `VITE_API_BASE_URL` or `NEXT_PUBLIC_API_BASE_URL` and use it in the web client.

Implementation notes:
- Keep the CTA component `use client`.
- Map `formVariant` to required fields.
- Return minimal response UI (no decorative visuals).

---

## Part 2: `apps/api` (Lead storage + admin access)

Milestone: lead schema, migration, validators, routes, controller, service, and query filtering are implemented.

Todos:
- Add schema: `apps/api/src/db/schema/leads.schema.ts`.
- Add enum: `lead_status` with `pending | processing | replied | won | lost`.
- Add indexes for `status`, `category`, `created_at`.
- Export schema in `db/schema/index.ts`.
- Add validators with `drizzle-zod` in `db/validator/lead.validator.ts`:
  - `leadCreateSchema` (public payload)
  - `leadStatusUpdateSchema` (admin status updates)
  - `leadListQuerySchema` (query params)
- Create module structure:
  - `modules/leads/leads.routes.ts`
  - `modules/leads/leads.controller.ts`
  - `modules/leads/leads.service.ts`
- Wire routes in `app.ts`:
  - `app.use('/api/leads', publicLeadsRouter)`
  - `app.use('/api/admin/leads', adminLeadsRouter)`
- Public route uses `validateData(leadCreateSchema)` and returns `201`.
- Admin routes use `authenticate` + `authorize('admin')`.
- Implement list query with pagination, filters, search, and sorting.
- DB Migration using "db:generate": "drizzle-kit generate", "db:migrate": "drizzle-kit migrate", "db:push": "drizzle-kit push" - package.json script

Implementation notes:
- Follow existing controller/route patterns from `blogs`.
- Use `AppError` for invalid IDs and bad query values.
- Log request metadata only if needed (avoid storing secrets).

---

## Part 3: `apps/admin` (Lead/Contact management)

Milestone: functional Lead Management page with list, filters, search, status update.

Todos:
- Add API endpoints in `apps/admin/src/config/api.config.ts`:
  - `ADMIN.LEADS`, `ADMIN.LEAD_BY_ID`, `ADMIN.LEAD_STATUS`.
- Create API client `apps/admin/src/services/lead.api.ts`.
- Add types: `Lead`, `LeadStatus`, list response meta.
- Add React Query hook `use-leads.ts` with filter/sort params.
- Replace placeholder `pages/dashboard/leads.tsx` with:
  - Table/grid list (name, email, category, status, created_at)
  - Filters (category, status)
  - Search input
  - Sort controls
  - Status update actions (dropdown or inline select)
- Add loading, empty, and error states.
- Reuse existing `axiosInstance` and auth flow.

Implementation notes:
- Keep UI professional and data-first.
- Avoid non-semantic or decorative icons.

---

## Validation & Testing

- Unit test schema validators (if existing patterns allow).
- Manual test flow:
  - Submit CTA on `/services/app-dev` → verify record in DB.
  - Log in admin → filter/search/sort and update status.


