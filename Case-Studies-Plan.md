# Case Studies Feature — Master Plan

End-to-end plan to convert `CaseStudyStrip` from hard-coded mock data to a fully admin-managed dynamic content system, served to the marketing site through a category-filtered public API.

This document is the **single source of truth** to drive three follow-up implementation plans (one per phase). Each phase is independently buildable + testable.

> **Strict mandates**
> - End-to-end type safety. `any` is banned. Unused exports / vars must be removed.
> - No shortcuts, no hot patches. Mirror the architectural conventions already established by the `blogs` and `leads` modules.
> - Modular, maintainable, well-indexed. No premature abstractions — but extract the obviously reusable (e.g. Cloudinary upload widget) since it benefits both blogs and case studies.

---

## Skills to invoke during each phase

| Skill | When |
|-------|------|
| `clean-code` | Always — pragmatic, no over-engineering, no unused code |
| `zod` | API validators (Phase 1) + any admin form schemas (Phase 2) |
| `postgres-best-practices` | Drizzle schema + indexes (Phase 1) |
| `tanstack-query-best-practices` | Admin hooks (Phase 2) + web client cache (Phase 3) |
| `shadcn` | Adding `alert-dialog` to admin's local `components/ui/` (Phase 2) |
| `next-best-practices` | Replacing hardcoded arrays with server fetches in RSC service pages (Phase 3) |
| `caveman` | Optional — terse status updates during implementation |

---

## Architectural decisions (locked in)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Category scope | **Single-level** — 7 categories | Sub-pages (e.g. `/pay-per-call/consumer-initiated`, `/app-dev/ios`) inherit parent. Avoids 17-row exploding category list. |
| Record richness | **Card-only fields** | Matches `CaseStudyCardItem` shape 1:1. No detail page, no rich body. Strip placeholder swap, nothing more. |
| Status workflow | **draft / published / archived** + `display_order` int | Drafts for WIP, archived hides from public but kept for reference, manual order for editorial control. |
| Image | **Single cover image** | Reuses Cloudinary signature flow already shipped in `uploads.api.ts`. |
| Public endpoint | **`GET /api/case-studies?category=<slug>`** | Filtered, published-only, single round trip per page. |
| Admin endpoints | Full REST + dedicated **reorder** + **status patch** sub-routes | Mirrors `leads`/`blogs` REST patterns. |
| Admin list view | **Grid** (cards) with pagination, search, filters | Per user request — distinct from leads/contact table views. |
| Delete UX | **shadcn `alert-dialog`** confirmation | No `window.confirm()`. |
| Reorder UX | **Up/Down arrow buttons** per card + numeric input on edit form | Two paths to the same write. No new dnd dep. |

---

## Categories (locked enum)

Derived from `apps/web/app/services/*` parent routes:

```
pay-per-call
pay-per-lead
digital-marketing
app-dev
cms
web-dev
hire-call-center
```

All sub-routes (`/pay-per-call/consumer-initiated`, `/app-dev/ios`, `/cms/wordpress`, etc.) inherit their parent route's category at fetch time.

---

## Accent palette (locked enum)

Matches `CaseStudyCardAccentColor` in `apps/web/types/services.ts`:

```
pastel-peach | pastel-lilac | pastel-lime | pastel-mint | pastel-sky | pastel-blush
```

If `accent_color` is `null` on the record, the frontend falls back to the same `index % 6` rotation already in `CaseStudyStrip.tsx`.

---

# PHASE 1 — Backend API (apps/api)

**Goal**: a fully working REST surface with persisted, validated, indexed case study records.
**Test exit criterion**: curl can create, list (filtered + paginated), update, reorder, status-change, delete records, and the public endpoint returns only `published` rows for a given category.

## 1.1 Drizzle schema — `apps/api/src/db/schema/case_studies.schema.ts` (new)

```ts
export const caseStudyCategoryEnum = pgEnum('case_study_category', [
  'pay-per-call',
  'pay-per-lead',
  'digital-marketing',
  'app-dev',
  'cms',
  'web-dev',
  'hire-call-center',
]);

export const caseStudyStatusEnum = pgEnum('case_study_status', [
  'draft',
  'published',
  'archived',
]);

export const caseStudyAccentEnum = pgEnum('case_study_accent', [
  'pastel-peach',
  'pastel-lilac',
  'pastel-lime',
  'pastel-mint',
  'pastel-sky',
  'pastel-blush',
]);

export const caseStudiesTable = pgTable('case_studies', {
  id: uuid('id').defaultRandom().primaryKey(),

  title: varchar('title', { length: 200 }).notNull(),
  slug: varchar('slug', { length: 220 }).notNull().unique(),
  description: text('description').notNull(),

  image_url: varchar('image_url', { length: 2048 }),
  image_alt: varchar('image_alt', { length: 255 }),
  accent_color: caseStudyAccentEnum('accent_color'),   // null → frontend rotates
  link: varchar('link', { length: 2048 }),

  category: caseStudyCategoryEnum('category').notNull(),
  status: caseStudyStatusEnum('status').default('draft').notNull(),
  display_order: integer('display_order').default(0).notNull(),

  published_at: timestamp('published_at', { withTimezone: true }),
  created_by: uuid('created_by').references(() => usersTable.id, { onDelete: 'set null' }),

  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}, (table) => [
  // Public query: list published for a given category, ordered by display_order then recency
  index('case_studies_public_idx').on(table.category, table.status, table.display_order),

  // Admin list / sort
  index('case_studies_status_updated_idx').on(table.status, table.updated_at),
  index('case_studies_category_idx').on(table.category),
  index('case_studies_created_at_idx').on(table.created_at),
]);

export type CaseStudy = typeof caseStudiesTable.$inferSelect;
export type NewCaseStudy = typeof caseStudiesTable.$inferInsert;
```

Add `export * from './case_studies.schema'` to `apps/api/src/db/schema/index.ts`.

### Why these indexes (`postgres-best-practices` skill applies)

- `(category, status, display_order)`: covers the hot public query `WHERE category = ? AND status = 'published' ORDER BY display_order ASC` — leftmost prefix matches, no extra sort.
- `(status, updated_at)`: admin list defaults to "all statuses, newest activity first" + status-filtered views.
- `category` alone: counts / faceting in admin filters.
- `created_at`: backup admin sort dimension.

## 1.2 Zod validator — `apps/api/src/validators/case-study.validator.ts` (new)

Invoke the **`zod`** skill. Use v4 native types: `z.url()`, `z.coerce.number()`, etc.

```ts
export const caseStudyCategorySchema = z.enum([
  'pay-per-call','pay-per-lead','digital-marketing','app-dev','cms','web-dev','hire-call-center',
]);

export const caseStudyStatusSchema = z.enum(['draft','published','archived']);

export const caseStudyAccentSchema = z.enum([
  'pastel-peach','pastel-lilac','pastel-lime','pastel-mint','pastel-sky','pastel-blush',
]);

const optionalUrl = z.url().optional().or(z.literal(''));

export const caseStudyCreateSchema = z.object({
  title: z.string().trim().min(2).max(200),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(220).optional(),
  description: z.string().trim().min(10),
  imageUrl: optionalUrl,
  imageAlt: z.string().trim().max(255).optional().or(z.literal('')),
  accentColor: caseStudyAccentSchema.optional(),
  link: optionalUrl,
  category: caseStudyCategorySchema,
  status: caseStudyStatusSchema.optional(),    // default 'draft' on the server
  displayOrder: z.coerce.number().int().min(0).optional(),
});

export const caseStudyUpdateSchema = caseStudyCreateSchema.partial();

export const caseStudyStatusUpdateSchema = z.object({ status: caseStudyStatusSchema });

export const caseStudyReorderSchema = z.object({
  items: z.array(z.object({ id: z.uuid(), displayOrder: z.int().min(0) })).min(1),
});

export const caseStudyListQuerySchema = z.object({
  category: z.union([caseStudyCategorySchema, z.array(caseStudyCategorySchema)]).optional(),
  status:   z.union([caseStudyStatusSchema, z.array(caseStudyStatusSchema)]).optional(),
  search: z.string().optional(),
  sortBy: z.enum(['created_at','updated_at','display_order','status','title']).optional(),
  sortOrder: z.enum(['asc','desc']).optional(),
  page:  z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export const caseStudyPublicListQuerySchema = z.object({
  category: caseStudyCategorySchema,
  limit: z.coerce.number().int().min(1).max(50).optional(),
});

export type CaseStudyCreateInput       = z.infer<typeof caseStudyCreateSchema>;
export type CaseStudyUpdateInput       = z.infer<typeof caseStudyUpdateSchema>;
export type CaseStudyStatusUpdateInput = z.infer<typeof caseStudyStatusUpdateSchema>;
export type CaseStudyReorderInput      = z.infer<typeof caseStudyReorderSchema>;
export type CaseStudyListQueryInput    = z.infer<typeof caseStudyListQuerySchema>;
export type CaseStudyPublicListQueryInput = z.infer<typeof caseStudyPublicListQuerySchema>;
```

## 1.3 Service — `apps/api/src/modules/case-studies/case-studies.service.ts` (new)

Mirror `apps/api/src/modules/blogs/blogs.service.ts` patterns:

- `create(data)` — auto-generates slug from title if not provided. Collision-safe (`-2`, `-3`, …).
- `getByIdOrThrow(id)`
- `update(id, data)` — sets `published_at` on transition `*` → `published` if not previously set.
- `updateStatus(id, status)` — same publish transition logic.
- `reorder(items)` — transactional `UPDATE … SET display_order = CASE id …`.
- `remove(id)` — hard delete (case studies don't have FK dependents).
- `listAdmin(query)` — paginated, filterable, searchable across `title`, `description`, `slug`. Mirror leads `buildWhere` / `buildOrderBy` pattern.
- `listPublic({ category, limit })` — `WHERE category = ? AND status = 'published' ORDER BY display_order ASC, created_at DESC LIMIT n`. Default limit = 12. **Uses the `case_studies_public_idx` index**.

### Slug helper

Add `apps/api/src/utils/slug.util.ts` (reuse if `blogs.service.ts` already exports one — keep DRY).

```ts
export function slugify(title: string): string {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g,'').trim()
    .replace(/\s+/g,'-').replace(/-+/g,'-')
    .slice(0, 200);
}
```

If blogs has an inline version, extract to a shared util — `clean-code` skill mandate, but only if extraction is mechanical and risk-free.

## 1.4 Controller — `apps/api/src/modules/case-studies/case-studies.controller.ts` (new)

Mirror `blogs.controller.ts`. Methods:

- `create` (admin) — maps camelCase body → snake_case `NewCaseStudy`, empty strings → `null`, defaults `status: 'draft'`, captures `created_by` from `req.user.id`.
- `listAdmin` (admin) — parses query via `caseStudyListQuerySchema`, returns `{ data, meta }`.
- `getById` (admin) — uuid validate + service call.
- `update` (admin) — partial update via `caseStudyUpdateSchema`.
- `updateStatus` (admin) — dedicated PATCH endpoint.
- `reorder` (admin) — accepts the array, transactional service call.
- `remove` (admin) — hard delete.
- `listPublic` (public) — parses `caseStudyPublicListQuerySchema`, returns plain array (no pagination meta — frontend consumes as `CaseStudyCardItem[]`).

All responses use the existing `ApiResponse<T>` envelope.

## 1.5 Routes — `apps/api/src/modules/case-studies/case-studies.routes.ts` (new)

```ts
publicCaseStudiesRouter.get('/', controller.listPublic);

adminCaseStudiesRouter.use(authenticate, authorize('admin'));
adminCaseStudiesRouter.get('/', controller.listAdmin);
adminCaseStudiesRouter.post('/reorder', validateData(caseStudyReorderSchema), controller.reorder);
adminCaseStudiesRouter.post('/', validateData(caseStudyCreateSchema), controller.create);
adminCaseStudiesRouter.get('/:id', controller.getById);
adminCaseStudiesRouter.patch('/:id', validateData(caseStudyUpdateSchema), controller.update);
adminCaseStudiesRouter.patch('/:id/status', validateData(caseStudyStatusUpdateSchema), controller.updateStatus);
adminCaseStudiesRouter.delete('/:id', controller.remove);
```

## 1.6 Wire in `apps/api/src/app.ts`

```ts
import { adminCaseStudiesRouter, publicCaseStudiesRouter } from './modules/case-studies/case-studies.routes';
// …
app.use('/api/case-studies', publicCaseStudiesRouter);
app.use('/api/admin/case-studies', adminCaseStudiesRouter);
```

## 1.7 Migration

```bash
pnpm --filter api db:generate
# inspect SQL
pnpm --filter api db:push
```

Generated migration must include the three enums + table + four indexes. **No mutations to existing tables.**

## 1.8 Phase 1 verification

```bash
# create
curl -X POST http://localhost:8080/api/admin/case-studies \
  -H 'Cookie: <admin session>' -H 'Content-Type: application/json' \
  -d '{"title":"Solar Growth","description":"300% qualified inbound calls...","category":"pay-per-call","accentColor":"pastel-peach"}'

# publish
curl -X PATCH http://localhost:8080/api/admin/case-studies/<id>/status -H ... -d '{"status":"published"}'

# admin list + filter
curl 'http://localhost:8080/api/admin/case-studies?category=pay-per-call&status=published&page=1&limit=10' -H ...

# reorder
curl -X POST http://localhost:8080/api/admin/case-studies/reorder -H ... \
  -d '{"items":[{"id":"…","displayOrder":0},{"id":"…","displayOrder":1}]}'

# public
curl 'http://localhost:8080/api/case-studies?category=pay-per-call'
# expect: only published, ordered by display_order asc
```

Then: `pnpm --filter api exec tsc --noEmit` clean. **End of Phase 1.**

---

# PHASE 2 — Admin UI (apps/admin)

**Goal**: full grid-based CRUD UX for case studies, including image upload, reordering, status changes, and confirmed delete.
**Test exit criterion**: admin can create / edit / delete / reorder / publish case studies entirely through the UI, with optimistic-ish UX (React Query auto-invalidate on success). Browser at 375 px through 1920 px must be usable.

## 2.1 Pre-flight — add missing shadcn primitive

Use the **`shadcn`** skill.

```bash
cd apps/admin && pnpm dlx shadcn@latest add alert-dialog
```

Verify `apps/admin/src/components/ui/alert-dialog.tsx` exists and exports `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogAction`, `AlertDialogCancel`.

## 2.2 Types — `apps/admin/src/types/case-study.types.ts` (new)

Mirror `contact-submission.types.ts` shape with snake_case fields matching API response. Export:

- `CaseStudyCategory` (string literal union — 7 values)
- `CaseStudyStatus` (`'draft' | 'published' | 'archived'`)
- `CaseStudyAccent` (6-value union)
- `CaseStudy` interface
- `CaseStudiesListMeta`, `CaseStudiesListParams`
- `CaseStudyCreatePayload`, `CaseStudyUpdatePayload` (camelCase to match API contract)
- `CaseStudyReorderItem`

## 2.3 API config additions — `apps/admin/src/config/api.config.ts`

```ts
ADMIN: {
  ...,
  CASE_STUDIES: '/api/admin/case-studies',
  CASE_STUDY_BY_ID: (id: string) => `/api/admin/case-studies/${id}`,
  CASE_STUDY_STATUS: (id: string) => `/api/admin/case-studies/${id}/status`,
  CASE_STUDIES_REORDER: '/api/admin/case-studies/reorder',
}
```

## 2.4 API service — `apps/admin/src/services/case-study.api.ts` (new)

Methods mirroring `contact-submission.api.ts` shape:

- `listCaseStudies(params)`
- `getCaseStudyById(id)`
- `createCaseStudy(payload)`
- `updateCaseStudy(id, payload)`
- `updateCaseStudyStatus(id, status)`
- `reorderCaseStudies(items)`
- `deleteCaseStudy(id)`

Each unwraps `ApiResponse<T>` and throws on `!success`.

## 2.5 React Query hooks — `apps/admin/src/hooks/use-case-studies.ts` (new)

Use **`tanstack-query-best-practices`** skill.

```ts
useCaseStudies(params)              → ['case-studies', params]
useCaseStudy(id)                    → ['case-study', id], enabled: !!id
useCreateCaseStudy()                → invalidate ['case-studies']
useUpdateCaseStudy()                → invalidate ['case-studies'] + ['case-study', id]
useUpdateCaseStudyStatus()          → same
useReorderCaseStudies()             → invalidate ['case-studies']
useDeleteCaseStudy()                → invalidate ['case-studies']
```

## 2.6 Reusable Cloudinary upload component — `apps/admin/src/components/common/image-upload.tsx` (new)

Extract the Cloudinary signature + upload flow currently inline in `blog-edit.tsx` into a small controlled component. Props:

```ts
interface ImageUploadProps {
  value?: string | null;         // current image URL
  alt?: string | null;
  folder?: string;               // 'case-studies' for this feature
  onChange: (next: { url: string; alt?: string } | null) => void;
  disabled?: boolean;
}
```

Behaviour:
- Renders preview (next/image-equivalent `<img>` since admin is Vite + plain React) + Replace + Remove buttons.
- Drag-and-drop optional (skip for v1 — file input only).
- Internal loading state with Skeleton overlay.
- Calls `uploadsApi.getCloudinarySignature(folder)` → `uploadToCloudinary(...)` → `onChange`.
- Uses existing `apps/admin/src/services/uploads.api.ts` verbatim.

Blogs can adopt later — out of scope for this feature, but the path is open. **Do not refactor `blog-edit.tsx` in this phase.**

## 2.7 Route + sidebar wiring

`apps/admin/src/utils/constants.ts`:

```ts
DASHBOARD_CASE_STUDIES: '/dashboard/case-studies',
DASHBOARD_CASE_STUDY_CREATE: '/dashboard/case-studies/new',
DASHBOARD_CASE_STUDY_EDIT_PATTERN: '/dashboard/case-studies/:id/edit',
DASHBOARD_CASE_STUDY_EDIT: (id: string) => `/dashboard/case-studies/${id}/edit`,
```

`apps/admin/src/App.tsx` — import + register 3 routes inside `<PrivateLayout>`.

`apps/admin/src/components/dashboard/app-sidebar.tsx` — new nav entry `{ title: 'Case Studies', href: ROUTES.DASHBOARD_CASE_STUDIES, icon: BookOpenCheck }` (lucide).

## 2.8 List page — `apps/admin/src/pages/dashboard/case-studies.tsx` (new) — **GRID**

This is the **major UX departure** from leads/contacts pages.

### Layout

```
<header>
  Title: "Case Studies"
  Subtitle: "Manage success stories shown across service pages."
  Right: Button "New case study" → /dashboard/case-studies/new
</header>

<Card padding=4>
  <CardHeader>
    Title row: "Case study library" + count
    Filter row (grid lg:grid-cols-5):
      - Search (col-span-2)
      - Category select (7 options + "All")
      - Status select (3 options + "All")
      - Sort by + Order (split col)
    Action row: Refresh + Clear filters
  </CardHeader>

  <CardContent>
    {loading      → grid of 8 skeleton cards}
    {empty        → empty-state card with "Reset filters" / "Create one" CTA}
    {grid         → responsive: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap=4}

    Each card:
      <aspect-video> cover image (or accent-colored fallback w/ placeholder)
      Top-left overlay: status badge
      Top-right overlay: category pill
      Body: title (line-clamp-1), description (line-clamp-2)
      Footer row:
        Left: reorder buttons (ChevronUp / ChevronDown) — disabled at extremes
        Right: actions menu (Edit, Status dropdown, Delete) via DropdownMenu

    Pagination block under grid: same Pagination shadcn pattern as leads (PaginationPrevious / Numbers / Next + Rows-per-page select)
  </CardContent>
</Card>

<AlertDialog open={deleteId !== null}>
  Title: "Delete this case study?"
  Body: "This permanently removes the entry. Cannot be undone."
  Footer: Cancel / Delete (destructive)
</AlertDialog>
```

### Responsive grid rules

- Mobile (`< 640px`): 1 column, image aspect 16/9
- Small (`>= 640px`): 2 columns
- Large (`>= 1024px`): 3 columns
- XL (`>= 1280px`): 4 columns
- Card min height controlled by image + 2-line description clamp → roughly uniform.

### Reorder semantics

- Up arrow → mutate via `useReorderCaseStudies` swapping with the card at `i-1` **within the same category filter view only**.
- If filter = "All" categories, disable reorder arrows (reordering requires single-category context). Show tooltip explaining.

### Search debounce

Reuse `apps/admin/src/hooks/use-debounced-callback.ts` (350ms).

### Loading skeletons

`SkeletonCard` component locally inside the page file — 8 instances rendered while `isLoading`. Each is `aspect-video` skeleton + 2 line skeletons below.

## 2.9 Create page — `apps/admin/src/pages/dashboard/case-study-create.tsx` (new)

Use `react-hook-form` + `zodResolver` + a local `caseStudyCreateClientSchema` matching the API shape.

Fields (single form, no wizard):
- Title (required)
- Slug (optional — placeholder: "auto-generated from title")
- Description (Textarea, required, char counter)
- Category (Select, required)
- Cover image (ImageUpload + alt-text input)
- Accent color (Select with swatches — optional, "auto-rotate" placeholder)
- External link (Input url, optional)
- Display order (number, default 0)
- Status (Select: draft / published — `archived` not exposed on create)

On submit → `useCreateCaseStudy` → navigate to edit page on success (so user can upload images / further tweak).

## 2.10 Edit page — `apps/admin/src/pages/dashboard/case-study-edit.tsx` (new)

Same form as create + Status dropdown including `archived`. Uses `useCaseStudy(id)` to hydrate defaults. On submit → `useUpdateCaseStudy`. Sticky footer with Save + Delete (Delete opens the same AlertDialog as the list page).

## 2.11 Phase 2 verification

1. `pnpm --filter @paypercall/admin dev` + api running.
2. Sidebar shows new "Case Studies" item with `BookOpenCheck` icon.
3. Grid renders correctly at 375 px, 768 px, 1280 px, 1920 px.
4. Create a draft → edit page hydrates → upload image → preview shows → set published → row appears in public endpoint via curl.
5. Reorder arrows persist new order across reload.
6. Status dropdown changes badge + filter recall picks up changes.
7. Delete via AlertDialog → row removed, grid count decrements.
8. `pnpm --filter @paypercall/admin exec tsc --noEmit -p tsconfig.app.json` — **zero new errors**, zero `any`, zero unused imports.

---

# PHASE 3 — Public consumption (apps/web)

**Goal**: every existing `<CaseStudyStrip />` in service pages and sub-pages fetches its data from the new public endpoint, with no visual regression and proper loading skeletons where applicable.
**Test exit criterion**: visit all 17 service pages. Each strip shows live DB data (or graceful empty state) instead of mock arrays. Lighthouse score and CLS unchanged from baseline.

## 3.1 Public API client — `apps/web/lib/api/case-studies.ts` (new)

Mirror `apps/web/lib/api/blogs.ts` pattern. Use **`next-best-practices`** skill.

```ts
import 'server-only';
import { cache } from 'react';
import type { CaseStudyCardItem } from '@/types/services';

type Category = 'pay-per-call' | 'pay-per-lead' | 'digital-marketing' | 'app-dev' | 'cms' | 'web-dev' | 'hire-call-center';

interface ApiCaseStudy {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  image_alt: string | null;
  accent_color: CaseStudyCardItem['accentColor'] | null;
  link: string | null;
}

interface PublicListResponse {
  success: boolean;
  data?: ApiCaseStudy[];
  message?: string;
}

export const getCaseStudiesByCategory = cache(
  async (category: Category, limit = 12): Promise<CaseStudyCardItem[]> => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) return [];

    const url = `${base}/api/case-studies?category=${encodeURIComponent(category)}&limit=${limit}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];

    const body = (await res.json()) as PublicListResponse;
    if (!body.success || !body.data) return [];

    return body.data.map(toCard);
  },
);

function toCard(record: ApiCaseStudy): CaseStudyCardItem {
  return {
    title: record.title,
    description: record.description,
    image: record.image_url ? { src: record.image_url, alt: record.image_alt ?? record.title } : undefined,
    accentColor: record.accent_color ?? undefined,
    link: record.link ?? undefined,
  };
}
```

Notes:
- `server-only` import + `cache()` for per-request dedupe across nested layouts.
- ISR via `next: { revalidate: 60 }` — independent of page-level `revalidate = 3600`.
- Graceful empty-array fallback on failure — service pages render the surrounding section (title / CTA) but the strip silently returns null via its `if (!items.length) return null;` guard already present.

## 3.2 Replace hard-coded arrays — page-by-page

The 17 call sites identified by the explorer agent:

**Main pages (7):**
- `apps/web/app/services/pay-per-call/page.tsx`
- `apps/web/app/services/pay-per-lead/page.tsx`
- `apps/web/app/services/digital-marketing/page.tsx`
- `apps/web/app/services/app-dev/page.tsx`
- `apps/web/app/services/cms/page.tsx`
- `apps/web/app/services/web-dev/page.tsx` (if exists)
- `apps/web/app/services/hire-call-center/page.tsx` (if exists)

**Sub-pages (10):** under `pay-per-call/*`, `pay-per-lead/*`, `digital-marketing/*`, `app-dev/*`, `cms/*`, `web-dev/*`.

For each page (all are RSC):

```tsx
import { getCaseStudiesByCategory } from '@/lib/api/case-studies';

export default async function Page() {
  const caseStudies = await getCaseStudiesByCategory('pay-per-call');   // or parent slug for sub-pages
  // … rest of page
  <CaseStudyStrip items={caseStudies} title="…" description="…" cta={…} className={SECTION_PADDING} />
}
```

Sub-pages pass the **parent's** category, e.g. `/services/app-dev/ios/page.tsx` calls `getCaseStudiesByCategory('app-dev')`. This matches the locked-in decision.

### Cleanup

- Delete the now-unused `PAY_PER_CALL_CASE_STUDIES` / `CASE_STUDIES` const arrays.
- Delete unused exports from `apps/web/components/sections/services/pay-per-lead/content.ts` etc. — but **only the case study arrays**, leave the rest of the file intact.
- Delete `apps/web/lib/utils/case-study-mapper.ts` only if no other consumer remains after migration. Verify with `grep`.

## 3.3 Loading skeleton (only where applicable)

Service pages are server components, so the strip data resolves before render — no streaming skeleton needed there.

However, if any page later promotes the strip to client-side fetching (e.g. for personalization), the pattern is:

```tsx
// apps/web/components/sections/services/shared/CaseStudyStripSkeleton.tsx
export function CaseStudyStripSkeleton() {
  return (
    <section className="w-full">
      <div className="section-container">
        <div className="mb-12 text-center space-y-3">
          <div className="h-10 w-2/3 mx-auto rounded bg-muted animate-pulse" />
          <div className="h-4 w-1/2 mx-auto rounded bg-muted animate-pulse" />
        </div>
        <div className="flex gap-6 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-[320px] h-[420px] rounded-3xl bg-muted animate-pulse shrink-0" />
          ))}
        </div>
      </div>
    </section>
  );
}
```

For Phase 3 we ship this file but only wrap it around the strip in pages where we choose to render via `<Suspense>`. Default is direct `await` in the RSC.

## 3.4 Phase 3 verification

1. Seed at least one published case study per category via admin UI.
2. `pnpm --filter web dev`, visit each of the 17 pages — strip renders with seeded data.
3. Visit a page whose category has zero published rows → strip returns null (component already guards `if (!items.length) return null`). Verify surrounding section spacing still feels right; if not, add a placeholder treatment in a follow-up.
4. `pnpm --filter web typecheck` — zero new errors.
5. Run a Lighthouse pass on `/services/pay-per-call`: CLS, LCP must not regress vs main.
6. Verify ISR with a content change in admin: change a card title, wait ≤ 60 s, refresh public page — new value appears.

---

## Files matrix

### Backend (Phase 1)

| File | Action |
|------|--------|
| `apps/api/src/db/schema/case_studies.schema.ts` | New |
| `apps/api/src/db/schema/index.ts` | Modify (add export) |
| `apps/api/src/validators/case-study.validator.ts` | New |
| `apps/api/src/modules/case-studies/case-studies.service.ts` | New |
| `apps/api/src/modules/case-studies/case-studies.controller.ts` | New |
| `apps/api/src/modules/case-studies/case-studies.routes.ts` | New |
| `apps/api/src/utils/slug.util.ts` | New (or extract from blogs.service.ts) |
| `apps/api/src/app.ts` | Modify (mount routers) |
| `apps/api/src/db/drizzle/000N_*.sql` | Auto-generated |

### Admin (Phase 2)

| File | Action |
|------|--------|
| `apps/admin/src/components/ui/alert-dialog.tsx` | New (shadcn add) |
| `apps/admin/src/types/case-study.types.ts` | New |
| `apps/admin/src/config/api.config.ts` | Modify (4 endpoints) |
| `apps/admin/src/services/case-study.api.ts` | New |
| `apps/admin/src/hooks/use-case-studies.ts` | New |
| `apps/admin/src/components/common/image-upload.tsx` | New (reusable) |
| `apps/admin/src/components/case-studies/case-study-status-badge.tsx` | New |
| `apps/admin/src/components/case-studies/case-study-grid-card.tsx` | New |
| `apps/admin/src/components/case-studies/case-study-form.tsx` | New (shared by create + edit) |
| `apps/admin/src/components/case-studies/case-study-delete-dialog.tsx` | New |
| `apps/admin/src/pages/dashboard/case-studies.tsx` | New (grid list) |
| `apps/admin/src/pages/dashboard/case-study-create.tsx` | New |
| `apps/admin/src/pages/dashboard/case-study-edit.tsx` | New |
| `apps/admin/src/utils/constants.ts` | Modify (4 ROUTES entries) |
| `apps/admin/src/App.tsx` | Modify (3 route registrations) |
| `apps/admin/src/components/dashboard/app-sidebar.tsx` | Modify (1 nav item) |

### Web (Phase 3)

| File | Action |
|------|--------|
| `apps/web/lib/api/case-studies.ts` | New |
| `apps/web/components/sections/services/shared/CaseStudyStripSkeleton.tsx` | New |
| `apps/web/app/services/pay-per-call/page.tsx` | Modify |
| `apps/web/app/services/pay-per-lead/page.tsx` | Modify |
| `apps/web/app/services/digital-marketing/page.tsx` | Modify |
| `apps/web/app/services/app-dev/page.tsx` | Modify |
| `apps/web/app/services/cms/page.tsx` | Modify |
| `apps/web/app/services/web-dev/page.tsx` | Modify |
| `apps/web/app/services/hire-call-center/page.tsx` | Modify (if exists) |
| `apps/web/app/services/*/[sub]/page.tsx` × 10 | Modify |
| `apps/web/components/sections/services/pay-per-lead/content.ts` | Modify (remove array) |
| `apps/web/components/sections/services/digital-marketing/content.ts` | Modify (remove array) |
| `apps/web/lib/utils/case-study-mapper.ts` | Delete if no remaining consumer |

---

## Type-safety contract (the bright-line rules)

- **Zero `any`** in any file touched. Use `unknown` + narrowing where boundary parsing is needed.
- **Zero unused imports / variables / exports**. ESLint will catch most; manually sweep the rest.
- All API request bodies parsed through their zod schema in `validateData(...)` middleware **before** the controller body cast.
- All admin form values typed via `z.infer<typeof clientSchema>`.
- Web client `toCard()` only narrows the validated public payload — no field coercion guesswork.
- Drizzle `$inferSelect` / `$inferInsert` are the authoritative DB types; admin types mirror snake_case from the API response, NOT the camelCase used in admin form payloads (the conversion happens in `case-study.api.ts`).

---

## Per-phase TODOs (driver for follow-up planning sessions)

Each item below is what we will turn into a TaskCreate slate when we open the dedicated plan for the corresponding phase.

### Phase 1 — API

- [ ] Create `case_studies.schema.ts` with enums + table + indexes; barrel-export
- [ ] Create `case-study.validator.ts` with create/update/status/reorder/listAdmin/listPublic zod schemas
- [ ] Extract / introduce `slug.util.ts` (collision-safe slugify)
- [ ] Create `case-studies.service.ts` (CRUD + reorder + listPublic with index-aligned query)
- [ ] Create `case-studies.controller.ts` (camelCase ↔ snake_case mapping, empty-string → null)
- [ ] Create `case-studies.routes.ts` with public + admin routers
- [ ] Wire both routers in `app.ts`
- [ ] `pnpm db:generate` + inspect migration SQL + `db:push`
- [ ] curl smoke test (create / list / publish / reorder / delete / public list)
- [ ] `pnpm exec tsc --noEmit` clean

### Phase 2 — Admin

- [ ] `pnpm dlx shadcn@latest add alert-dialog` (verify exports)
- [ ] `case-study.types.ts`
- [ ] api.config endpoint additions
- [ ] `case-study.api.ts`
- [ ] `use-case-studies.ts` hooks
- [ ] `components/common/image-upload.tsx` (extracted Cloudinary widget)
- [ ] `components/case-studies/case-study-status-badge.tsx`
- [ ] `components/case-studies/case-study-grid-card.tsx` (with reorder arrows, status menu)
- [ ] `components/case-studies/case-study-form.tsx` (rhf + zod; reused by create + edit)
- [ ] `components/case-studies/case-study-delete-dialog.tsx` (alert-dialog wrapper)
- [ ] `pages/dashboard/case-studies.tsx` — grid + filters + pagination + skeleton
- [ ] `pages/dashboard/case-study-create.tsx`
- [ ] `pages/dashboard/case-study-edit.tsx`
- [ ] ROUTES + App.tsx + sidebar nav (with `BookOpenCheck` icon)
- [ ] Responsive QA at 375 / 768 / 1280 / 1920
- [ ] tsc clean, no `any`, no unused

### Phase 3 — Web

- [ ] `apps/web/lib/api/case-studies.ts` (cache + ISR + server-only)
- [ ] `CaseStudyStripSkeleton.tsx` (kept for future client-side use)
- [ ] Replace arrays in 7 main service pages
- [ ] Replace arrays in 10 sub-pages (all pass parent category)
- [ ] Remove dead `CASE_STUDIES` constants + `case-study-mapper.ts` if orphaned
- [ ] Visual QA across all 17 pages with seeded data
- [ ] Empty-state QA (category with zero published rows)
- [ ] Lighthouse: confirm no LCP / CLS regression
- [ ] ISR confirmation: edit a record in admin, see public page update ≤ 60 s

---

## Phase boundaries (testing handoffs)

```
                ┌────────────────┐
                │  PHASE 1: API  │  curl + tsc → ship Phase 1 alone
                └───────┬────────┘
                        │
                        ▼
        ┌──────────────────────────────┐
        │  PHASE 2: ADMIN (depends on  │  browser CRUD against live API
        │   Phase 1)                   │  → ship Phase 1 + 2 together
        └───────┬──────────────────────┘
                │
                ▼
   ┌──────────────────────────────────────┐
   │  PHASE 3: WEB (depends on Phase 1 +  │  visit every service page
   │   data seeded via Phase 2 admin)     │  → full feature complete
   └──────────────────────────────────────┘
```

Each phase has its own tsc gate, its own browser/curl test, and its own follow-up plan file (to be authored when we sit down to build that phase).

---

## Out of scope (deferred, but called out)

- Detail page (`/case-studies/:slug` on web) — future, once richer fields demand it
- Drag-and-drop reorder UI (we ship up/down arrows v1; can layer `@dnd-kit/sortable` later without schema change)
- Multi-image gallery — schema already extensible via additional table if needed
- Per-user permissions beyond `admin` role
- Bulk publish / bulk archive — single-row mutations only in v1
- i18n / multi-language case studies — out of scope
- Public RSS / sitemap entries — not requested
