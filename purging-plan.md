# Monorepo Architecture Cleanup & Restructuring

A safe, non-breaking reorganization of `apps/web`, `apps/admin`, `apps/api`, and `packages/ui` to establish consistent structure, remove dead code, eliminate duplication, and enforce proper boundaries.

---

## Audit Summary

| Category | Count | Severity |
|---|---|---|
| Duplicate files (same code in multiple places) | 7 | 🔴 High |
| Unused / dead files | 12 | 🟡 Medium |
| Out-of-place files (wrong directory) | 6 | 🟡 Medium |
| Structural inconsistencies | 9 | 🟡 Medium |
| Type-safety gaps (`any` types, loose typing) | 5 | 🔴 High |
| Cross-app boundary violations | 2 | 🔴 High |
| Bogus dependency | 1 | 🟡 Medium |

---

## Decisions (Resolved)

| Question | Decision |
|---|---|
| Admin UI migration strategy | ✅ Migrate admin to use `@workspace/ui` (cleaner, eliminates ~16 duplicates) |
| Admin `pages/index.tsx` | ✅ Remove — redundant with route-level redirect in `App.tsx`. Best practice is one redirect source. |
| Legacy blog redirect (`/blog/[slug]`) | ✅ Remove — no internal links exist to `/blog/` (singular). All sitemap, navbar, and page links use `/blogs/`. |
| Digital marketing `constants.ts` + `content.ts` | ✅ Merge `constants.ts` into `content.ts` per service area. Pay-per-call keeps its file since it also exports types used by multiple components. |
| Placeholder pages (news, packages) | ✅ Remove from routing, sidebar, constants, and delete page files |
| Cross-app navbar data import | ✅ Extract shared navigation data to `packages/ui` |

---

## Proposed Changes

### Phase 1: Dead Code & Unused Files Removal

Safe removals with zero import dependencies.

#### [DELETE] [react.svg](file:///home/sami/workspace/client_projects/PayPerCall/apps/admin/src/assets/react.svg)
- Vite scaffold leftover. Not imported anywhere.

#### [DELETE] [use-mobile.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/admin/src/hooks/use-mobile.ts)
- Duplicate of `use-mobile.tsx`. The `.tsx` version is the one imported by `sidebar.tsx` (via `@/hooks/use-mobile`, bundler resolves `.tsx` first). The `.ts` version is never imported.

#### [DELETE] [world-map-demo.tsx](file:///home/sami/workspace/client_projects/PayPerCall/apps/web/components/world-map-demo.tsx)
- Demo component from Aceternity UI. Not imported anywhere in the codebase.

#### [DELETE] [index.tsx](file:///home/sami/workspace/client_projects/PayPerCall/apps/admin/src/pages/index.tsx)
- Redundant: `App.tsx` already has `<Route path='/' element={<Navigate to={ROUTES.LOGIN} replace />} />`. This page component is never rendered because the route-level redirect catches `/` first.

#### [DELETE] [page.tsx](file:///home/sami/workspace/client_projects/PayPerCall/apps/web/app/blog/[slug]/page.tsx) (and the `blog/` directory)
- Legacy redirect from `/blog/:slug` → `/blogs/:slug`. No internal links use `/blog/` (singular). Sitemap, navbar, and all page links already use `/blogs/`. If SEO preservation is later needed, this can be handled via `next.config.mjs` redirects instead.

#### [DELETE] `.gitkeep` files (5 files)
- `apps/web/lib/.gitkeep` — directory has actual files
- `apps/web/hooks/.gitkeep` — directory is empty; delete the entire `hooks/` dir
- `apps/web/components/.gitkeep` — directory has actual files
- `packages/ui/src/hooks/.gitkeep` — directory is empty; delete the entire `hooks/` dir
- `packages/ui/src/components/.gitkeep` — directory has actual files

#### [MODIFY] [package.json](file:///home/sami/workspace/client_projects/PayPerCall/apps/web/package.json)
- Remove the bogus `"install": "^0.13.0"` dependency. This is the npm `install` package (a noop) that was likely added accidentally.

---

### Phase 2: Remove Placeholder Pages & Associated Routing

#### [DELETE] [news.tsx](file:///home/sami/workspace/client_projects/PayPerCall/apps/admin/src/pages/dashboard/news.tsx)
- Stub page with only "Coming soon" text. No functionality.

#### [DELETE] [packages.tsx](file:///home/sami/workspace/client_projects/PayPerCall/apps/admin/src/pages/dashboard/packages.tsx)
- Stub page with only "Coming soon" text. No functionality.

#### [MODIFY] [App.tsx](file:///home/sami/workspace/client_projects/PayPerCall/apps/admin/src/App.tsx)
- Remove the `import` lines for `NewsPage` and `PackagesPage`
- Remove the two `<Route>` entries for `ROUTES.DASHBOARD_NEWS` and `ROUTES.DASHBOARD_PACKAGES`

#### [MODIFY] [constants.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/admin/src/utils/constants.ts)
- Remove `DASHBOARD_NEWS` and `DASHBOARD_PACKAGES` from the `ROUTES` object

#### [MODIFY] [app-sidebar.tsx](file:///home/sami/workspace/client_projects/PayPerCall/apps/admin/src/components/dashboard/app-sidebar.tsx)
- Remove the "News" and "Packages" entries from the sidebar navigation items
- Remove unused `Newspaper` and `Package` icon imports from lucide-react

---

### Phase 3: Fix Cross-App Boundary Violations

#### Issue 1: Admin importing from Web's navbar data

**Current:** `apps/admin/src/pages/dashboard/leads.tsx` imports `navigationData` from `../../../../web/components/shared/navbar/data.ts`. Admin uses it to extract service categories for the leads filter dropdown.

**Fix:** Extract the shared navigation data + types to `packages/ui` as a proper shared dependency.

#### [NEW] `packages/ui/src/data/navigation.ts`
- Move the `NavItem` type definition (currently in `apps/web/components/shared/navbar/types.ts`) and `navigationData` array here. Both web and admin will import from this shared location.

#### [MODIFY] [package.json](file:///home/sami/workspace/client_projects/PayPerCall/packages/ui/package.json)
- Add `"./data/*": "./src/data/*.ts"` to the `exports` map.

#### [MODIFY] [data.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/web/components/shared/navbar/data.ts)
- Re-export `navigationData` and `footerData` from `@workspace/ui/data/navigation` instead of defining in-place.

#### [MODIFY] [types.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/web/components/shared/navbar/types.ts)
- Re-export the `NavItem` type from `@workspace/ui/data/navigation` instead of defining in-place.

#### [MODIFY] [leads.tsx](file:///home/sami/workspace/client_projects/PayPerCall/apps/admin/src/pages/dashboard/leads.tsx)
- Change import from `../../../../web/components/shared/navbar/data` → `@workspace/ui/data/navigation`.

#### [MODIFY] [tsconfig.app.json](file:///home/sami/workspace/client_projects/PayPerCall/apps/admin/tsconfig.app.json)
- Remove `"../web/components/navbar/**/*.ts"` from the `include` array.

---

### Phase 4: Admin UI Component Consolidation

> [!IMPORTANT]
> Migrate admin to use `@workspace/ui` components where overlap exists. Keep admin-only components that aren't in `packages/ui`.

#### Step 4a: Add missing components to `@workspace/ui`

Before we can delete admin's copies, we need to ensure `packages/ui` has everything admin needs. Two components admin uses aren't in `packages/ui` yet:

#### [NEW] `packages/ui/src/components/separator.tsx`
- Add shadcn `Separator` component to the shared UI package.

#### [NEW] `packages/ui/src/components/tooltip.tsx`
- Add shadcn `Tooltip` component to the shared UI package.

#### Update `packages/ui/package.json` exports
These are already covered by the wildcard `"./components/*": "./src/components/*.tsx"` export pattern — no change needed.

#### Step 4b: Delete duplicate admin components

| Admin File to DELETE | Replaced by |
|---|---|
| `components/ui/avatar.tsx` | `@workspace/ui/components/avatar` |
| `components/ui/button.tsx` | `@workspace/ui/components/button` |
| `components/ui/card.tsx` | `@workspace/ui/components/card` |
| `components/ui/dropdown-menu.tsx` | `@workspace/ui/components/dropdown-menu` |
| `components/ui/form.tsx` | `@workspace/ui/components/form` |
| `components/ui/input.tsx` | `@workspace/ui/components/input` |
| `components/ui/label.tsx` | `@workspace/ui/components/label` |
| `components/ui/select.tsx` | `@workspace/ui/components/select` |
| `components/ui/separator.tsx` | `@workspace/ui/components/separator` |
| `components/ui/sonner.tsx` | `@workspace/ui/components/sonner` |
| `components/ui/tooltip.tsx` | `@workspace/ui/components/tooltip` |

#### Components to KEEP in admin (admin-only, not in `packages/ui`):
- `sidebar.tsx` — admin-specific layout with complex state
- `pagination.tsx` — admin-only
- `table.tsx` — admin-only
- `badge.tsx` — admin-only
- `skeleton.tsx` — admin-only
- `sheet.tsx` — used by sidebar

#### Step 4c: Delete duplicate `lib/utils.ts`

#### [DELETE] [utils.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/admin/src/lib/utils.ts)
- Identical to `@workspace/ui/lib/utils` (same `cn` function with `clsx` + `tailwind-merge`).

#### Step 4d: Update all admin imports

All files that currently import from the deleted paths need to be updated:

| Old Import | New Import |
|---|---|
| `@/components/ui/button` | `@workspace/ui/components/button` |
| `@/components/ui/card` | `@workspace/ui/components/card` |
| `@/components/ui/input` | `@workspace/ui/components/input` |
| `@/components/ui/label` | `@workspace/ui/components/label` |
| `@/components/ui/form` | `@workspace/ui/components/form` |
| `@/components/ui/avatar` | `@workspace/ui/components/avatar` |
| `@/components/ui/dropdown-menu` | `@workspace/ui/components/dropdown-menu` |
| `@/components/ui/select` | `@workspace/ui/components/select` |
| `@/components/ui/separator` | `@workspace/ui/components/separator` |
| `@/components/ui/sonner` | `@workspace/ui/components/sonner` |
| `@/components/ui/tooltip` | `@workspace/ui/components/tooltip` |
| `@/lib/utils` | `@workspace/ui/lib/utils` |

**Files affected** (imports referencing `@/lib/utils`):
- All remaining admin-only UI components: `sidebar.tsx`, `pagination.tsx`, `table.tsx`, `badge.tsx`, `skeleton.tsx`, `sheet.tsx`
- `components/common/loading.tsx`, `components/NavLink.tsx`

**Files affected** (imports referencing deleted `@/components/ui/*`):
- `App.tsx` (sonner, tooltip)
- `components/auth/login-form.tsx`, `signup-form.tsx`
- `components/blog/block-editor-panel.tsx`, `block-list.tsx`
- `components/common/insufficient-permissions.tsx`
- `components/dashboard/app-sidebar.tsx`
- `layout/private-layout.tsx`, `public-layout.tsx`
- `pages/dashboard/*.tsx` (blogs, blog-create, blog-edit, leads, profile)
- `pages/auth/login.tsx`, `signup.tsx`

---

### Phase 5: Admin Structural Cleanup

#### [MOVE] `components/NavLink.tsx` → `components/common/NavLink.tsx`
- Currently sits directly in `components/` root alongside feature folders (`auth/`, `blog/`, `common/`, `dashboard/`). It's a shared utility component — belongs in `common/`.
- Update imports in files referencing `@/components/NavLink`.

---

### Phase 6: API Structural Improvements

#### Step 6a: Move validators out of `db/`

#### [MOVE] `db/validator/` → `validators/`
- The validators validate HTTP request payloads. They use `drizzle-zod` to derive from DB schemas but they're _application-layer_ validators, not _database_ validators. This is a semantic mismatch.

**Files to move:**
- `db/validator/auth.validator.ts` → `validators/auth.validator.ts`
- `db/validator/blog.validator.ts` → `validators/blog.validator.ts`
- `db/validator/blogBlock.validator.ts` → `validators/blogBlock.validator.ts`
- `db/validator/lead.validator.ts` → `validators/lead.validator.ts`
- `db/validator/user.validator.ts` → `validators/user.validator.ts`

**Import updates needed in:**
- `modules/auth/auth.routes.ts` — imports `loginSchema` from `../../db/validator/auth.validator` and `userInsertSchema` from `../../db/validator/user.validator`
- `modules/users/user.routes.ts` — imports from `../../db/validator/user.validator`
- `modules/blogs/blogs.routes.ts` — imports from `../../db/validator/blog.validator`
- `modules/blocks/blocks.routes.ts` — imports from `../../db/validator/blogBlock.validator`
- `modules/leads/leads.routes.ts` — imports from `../../db/validator/lead.validator`

All `../../db/validator/` paths become `../../validators/`.

#### Step 6b: Move `AppError` to `utils/error.util.ts`

#### [MODIFY] [error.util.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/api/src/utils/error.util.ts)
- Move the `AppError` class from `errorHandler.ts` into this file alongside the other error classes.

#### [MODIFY] [errorHandler.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/api/src/middlewares/errorHandler.ts)
- Remove the `AppError` class definition; import it from `../utils/error.util` instead.
- Update `db.util.ts` — currently imports `AppError` from `../middlewares/errorHandler`; change to `./error.util`.

#### Step 6c: Fix `express.d.ts` unused import

#### [MODIFY] [express.d.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/api/src/types/express.d.ts)
- Remove `import type { User } from '../db/schema/users.schema'` — imported but unused. The type augmentation uses inline `{ id: string; role: string }`.

---

### Phase 7: Type Safety Improvements

#### API: Eliminate `any` types

| File | Line(s) | Current | Fix |
|---|---|---|---|
| `middlewares/errorHandler.ts` | L15 | `details?: any` | `details?: Record<string, string[]>` |
| `middlewares/errorHandler.ts` | L25 | `err: any` | Typed error union: `Error & { statusCode?: number; details?: Record<string, string[]>; cause?: { code?: string }; code?: string }` |
| `middlewares/errorHandler.ts` | L38 | `issue: any` | Remove — `issue` is already typed by Zod's `ZodIssue` |
| `middlewares/validation.middleware.ts` | L4 | `z.ZodObject<any, any>` | `z.ZodTypeAny` (supports all schema types, not just objects) |

#### Web: Fix runtime logic in type file

#### [NEW] `apps/web/lib/utils/case-study-mapper.ts`
- Extract `PASTEL_COLORS` array and `mapCaseStudyToCard()` function from `types/services.ts`.

#### [MODIFY] [services.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/web/types/services.ts)
- Remove `PASTEL_COLORS` and `mapCaseStudyToCard()`. Type-only files should contain only types/interfaces.

#### Web: Fix `Record<string, any>` in blog types

#### [MODIFY] [blog.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/web/types/blog.ts)
- Change `attrs?: Record<string, any>` → `attrs?: Record<string, unknown>` (L49, L58)

---

### Phase 8: Web App Structure Improvements

#### Step 8a: Merge service `constants.ts` into `content.ts`

**Digital Marketing:**
#### [DELETE] [constants.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/web/components/sections/services/digital-marketing/constants.ts)
- Only contains `SECTION_PADDING` (1 line). Merge into `content.ts`.

#### [MODIFY] [content.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/web/components/sections/services/digital-marketing/content.ts)
- Add `export const SECTION_PADDING = 'max-w-7xl mx-auto py-20 md:py-24';` at the top.

#### [MODIFY] [index.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/web/components/sections/services/digital-marketing/index.ts)
- Change `export { SECTION_PADDING } from './constants'` → `export { SECTION_PADDING } from './content'`.

**Pay Per Lead:**
#### [DELETE] [constants.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/web/components/sections/services/pay-per-lead/constants.ts)
- Only contains `SECTION_PADDING` (1 line). Merge into `content.ts`.

#### [MODIFY] [content.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/web/components/sections/services/pay-per-lead/content.ts)
- Add `export const SECTION_PADDING = 'max-w-7xl mx-auto py-20 md:py-24';` at the top.

#### [MODIFY] [index.ts](file:///home/sami/workspace/client_projects/PayPerCall/apps/web/components/sections/services/pay-per-lead/index.ts)
- Change `export { SECTION_PADDING } from './constants'` → `export { SECTION_PADDING } from './content'`.

**Pay Per Call — KEEP `constants.ts`:**
- This file exports `SECTION_PADDING` + `CallGatewayAccent` and `CallLogicBgVariant` types that are imported by 5+ component files. Merging would create a circular dependency (components import types from constants, content imports types from components). Keep as-is.

#### Step 8b: Rename `lib/services/` → `lib/data/`

#### [MOVE] `lib/services/nav-items.ts` → `lib/data/service-navigation.ts`
- The `lib/services/` name is confusing — it sounds like API service clients but actually contains static configuration/data for the services section pages.
- Update all imports referencing `@/lib/services/nav-items` → `@/lib/data/service-navigation`.

---

## Proposed Target Architecture (After Cleanup)

### `apps/admin/src/`
```
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── auth/                   ← login-form, signup-form
│   ├── blog/                   ← block-editor-panel, block-list, block-utils
│   ├── common/                 ← insufficient-permissions, loading, mode-toggle, NavLink
│   ├── dashboard/              ← app-sidebar
│   └── ui/                     ← Admin-only: sidebar, pagination, table, badge, skeleton, sheet
├── config/                     ← api.config.ts
├── contexts/                   ← auth.context.ts
├── hooks/                      ← use-auth, use-blogs, use-debounced-callback, use-leads, use-mobile.tsx, use-role
├── layout/                     ← private-layout, public-layout
├── pages/
│   ├── auth/                   ← login, signup
│   ├── dashboard/              ← index, profile, blogs, blog-create, blog-edit, leads
│   └── not-found.tsx
├── providers/                  ← auth, query, theme
├── schemas/                    ← auth, blog, user
├── services/                   ← auth.api, axios, blog.api, lead.api, uploads.api, user.api
├── types/                      ← api, auth, blog, lead, user
└── utils/                      ← constants, token.util
```

### `apps/api/src/`
```
├── app.ts
├── server.ts
├── vercel.ts
├── config/                     ← env.ts
├── db/
│   ├── index.ts
│   ├── schema/                 ← users, session, blogs, blogBlocks, leads, index
│   └── drizzle/                ← migration files
├── middlewares/                 ← auth, errorHandler, logging, notFound, rateLimiting, validation
├── modules/
│   ├── auth/                   ← controller, routes, service, session.service
│   ├── blocks/                 ← controller, routes, service
│   ├── blogs/                  ← controller, routes, service
│   ├── health/                 ← controller, routes, service
│   ├── leads/                  ← controller, routes, service
│   ├── uploads/                ← controller, routes
│   └── users/                  ← controller, routes, service
├── types/                      ← auth.ts, express.d.ts
├── utils/                      ← apiResponse, blogBlocks, db, error (+ AppError), rateLimiter, sessionCleanup, token, validation
└── validators/                 ← auth, blog, blogBlock, lead, user  ← MOVED from db/validator/
```

### `apps/web/`
```
├── app/                        ← Next.js routes (blog/ directory removed)
├── components/
│   ├── domains/blog/           ← Blog-specific components
│   ├── sections/               ← Page section components
│   │   ├── blocks/
│   │   ├── contact/
│   │   ├── landing/
│   │   ├── services/           ← constants.ts merged into content.ts where appropriate
│   │   └── shared/
│   └── shared/                 ← Layout components (navbar, footer, providers, mode-toggle)
├── lib/
│   ├── animations.ts
│   ├── api/                    ← Server-side API clients
│   ├── data/                   ← Static config data (RENAMED from services/)
│   │   └── service-navigation.ts
│   ├── utils/                  ← NEW: runtime utilities extracted from types/
│   │   └── case-study-mapper.ts
│   └── validations/            ← Zod schemas for forms
├── types/                      ← blog.ts (any→unknown), services.ts (runtime logic extracted)
└── public/                     ← Static assets (unchanged)
```

### `packages/ui/src/`
```
├── components/
│   ├── sections/               ← Shared section components
│   ├── testimonials/           ← Testimonial components
│   ├── ui/                     ← Aceternity-style components (card-hover, world-map, etc.)
│   ├── separator.tsx           ← NEW (shadcn)
│   ├── tooltip.tsx             ← NEW (shadcn)
│   └── [existing components]
├── data/                       ← NEW: shared data
│   └── navigation.ts           ← Navigation data + NavItem types
├── lib/
│   └── utils.ts
└── styles/
    └── globals.css
```

---

## File Change Summary

| Action | Count |
|---|---|
| Files to DELETE | 24 (11 admin UI + 5 gitkeep + 2 placeholder pages + pages/index + react.svg + use-mobile.ts + world-map-demo + blog redirect + 2 constants.ts) |
| Files to CREATE | 5 (separator, tooltip, navigation data, case-study-mapper, service-navigation rename) |
| Files to MOVE | 6 (5 validators + NavLink) |
| Files to MODIFY (imports/content) | ~35+ |

---

## Verification Plan

### Automated Tests

```bash
# After EACH phase:
pnpm --filter web typecheck        # Next.js type checking
pnpm --filter admin build           # Vite + TSC build
pnpm --filter api build             # TSC build

# After ALL phases:
pnpm --filter web lint
pnpm --filter admin lint
pnpm --filter api lint
```

### Phase-Specific Checks

| Phase | Critical Verification |
|---|---|
| Phase 1 (dead code) | All three apps typecheck — confirms nothing was imported |
| Phase 2 (placeholder removal) | Admin `build` succeeds; `ROUTES` object has no dangling keys |
| Phase 3 (cross-app fix) | Admin `build` succeeds without `../web/` in tsconfig include |
| Phase 4 (UI consolidation) | Admin `build` succeeds; visually verify admin dashboard renders |
| Phase 5 (NavLink move) | Admin `build` succeeds |
| Phase 6 (API validators) | API `build` succeeds; dev server starts without errors |
| Phase 7 (type safety) | All three apps typecheck with zero `any` in modified files |
| Phase 8 (web structure) | Web `typecheck` succeeds; service pages still render |

### Safety Strategy
- Execute in phase order (Phase 1 → 8)
- Each phase is independently committable
- If any phase introduces a build failure, it can be reverted without affecting other phases
- Never change functionality — only move, rename, or delete unused code
