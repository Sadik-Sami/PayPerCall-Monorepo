---
name: Admin Blog Editor
overview: "Implement Part 2 (Admin) of the block-based blog system in `apps/admin`: metadata CRUD, block CRUD with a single active Tiptap editor panel, sortable ordering via dnd-kit, Cloudinary direct uploads, and Draft-Mode preview integration with `apps/web`."
todos:
  - id: admin-deps
    content: Add minimal dependencies for Part 2 (Tiptap + dnd-kit) to apps/admin and confirm versions are compatible with React 19 + Vite.
    status: completed
  - id: admin-blog-types
    content: Create `apps/admin/src/types/blog.types.ts` for Blog/BlogBlock enums and API response shapes used by UI.
    status: completed
    dependencies:
      - admin-deps
  - id: admin-blog-schemas
    content: "Create `apps/admin/src/schemas/blog.schema.ts` (Zod) mirroring API constraints: slug regex, SEO lengths, publish readiness checks."
    status: completed
    dependencies:
      - admin-blog-types
  - id: admin-api-config
    content: Extend `apps/admin/src/config/api.config.ts` endpoints for admin blogs/blocks/reorder, cloudinary signature, and web draft-mode preview routes.
    status: completed
    dependencies:
      - admin-blog-types
  - id: admin-blog-api-client
    content: Add `apps/admin/src/services/blog.api.ts` and `apps/admin/src/services/uploads.api.ts` using `axiosInstance` for blog CRUD, blocks CRUD, reorder, and Cloudinary signature.
    status: completed
    dependencies:
      - admin-api-config
  - id: admin-blog-hooks
    content: "Add small React Query hooks (queries + mutations) with stable keys: ['blogs'], ['blog', id], ['blogBlocks', id]."
    status: completed
    dependencies:
      - admin-blog-api-client
  - id: admin-blog-routes
    content: Add routes + constants for `/dashboard/blogs/new` and `/dashboard/blogs/:id/edit`, wire them in `App.tsx` and navigation if needed.
    status: completed
    dependencies:
      - admin-blog-hooks
  - id: admin-blog-list-page
    content: "Implement blog list page UI in `pages/dashboard/blogs.tsx`: table, filters, and actions (new/edit/delete)."
    status: completed
    dependencies:
      - admin-blog-routes
  - id: admin-blog-create-page
    content: "Implement create page: minimal metadata form → create blog → navigate to edit page."
    status: completed
    dependencies:
      - admin-blog-routes
  - id: admin-blog-edit-metadata
    content: Implement edit page metadata form + cover image uploader (Cloudinary direct upload) + publish readiness UI.
    status: completed
    dependencies:
      - admin-blog-routes
      - admin-blog-schemas
      - admin-blog-api-client
  - id: admin-blocks-dnd
    content: Implement blocks list with dnd-kit sortable + optimistic reorder + persist via reorder endpoint.
    status: completed
    dependencies:
      - admin-blog-edit-metadata
  - id: admin-block-editor-panel
    content: Implement single active block editor panel using Tiptap; persist single-node JSON; add debounced autosave + save-on-close.
    status: completed
    dependencies:
      - admin-blocks-dnd
      - admin-deps
  - id: admin-block-image-insert
    content: Implement image insertion inside blocks using Cloudinary direct upload; support editing alt text.
    status: completed
    dependencies:
      - admin-block-editor-panel
      - admin-blog-api-client
  - id: admin-preview-draft-mode
    content: Add Preview button to enable Draft Mode in `apps/web` then open the blog slug page for SSR preview.
    status: completed
    dependencies:
      - admin-blog-edit-metadata
  - id: admin-lint-pass
    content: Run `pnpm -C apps/admin lint` and resolve lint issues in new/changed files (keep changes minimal and localized).
    status: completed
    dependencies:
      - admin-preview-draft-mode
      - admin-block-image-insert
---

# Part 2 — Admin (apps/admin) Editorial UI Plan

## Goals (end-state)

- Admins can **create/edit/delete** blogs (metadata) and **publish/unpublish** based on explicit publish-readiness checks.
- Admins can manage **ordered blog blocks** (create/update/delete/reorder) where each block row stores **one Tiptap node JSON** as source of truth.
- Blocks are edited via **edit-in-panel** (single active editor instance), with **debounced autosave** and clear saving/error UI.
- Images are uploaded **directly to Cloudinary** using a server-issued signature; only the **Cloudinary URL** is stored.
- “Preview” opens `apps/web` and enables **Next.js Draft Mode** before navigating to the draft blog page.
- New/changed files pass `pnpm -C /home/sami/workspace/client_projects/PayPerCall/apps/admin lint`.

## Repo conventions we will follow

- Routing is defined in [`/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/App.tsx`](/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/App.tsx) using `react-router`.
- Auth + admin role gating already happens in [`/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/layout/private-layout.tsx`](/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/layout/private-layout.tsx).
- API calls go through `axiosInstance` in [`/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/services/axios.ts`](/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/services/axios.ts).
- Data fetching uses `@tanstack/react-query` via [`/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/providers/query.provider.tsx`](/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/providers/query.provider.tsx).
- Forms use `react-hook-form` + `zodResolver` + shadcn form components (see [`/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/pages/dashboard/profile.tsx`](/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/pages/dashboard/profile.tsx)).

## Assumptions / external prerequisites (kept minimal)

- API (Part 1) provides admin endpoints described in `blog-plan.md`, plus **two admin read endpoints** needed by the editor:
- `GET /api/admin/blogs` (list, includes drafts)
- `GET /api/admin/blogs/:id` (single blog by id, includes metadata)
- If these don’t exist yet, Part 2 UI can’t fully function; we will stub calls but mark them blocked.
- `apps/web` will expose Draft Mode enable/disable routes (Part 3, Milestone 3.7). For Part 2 we only wire the Admin button.

## Packages to add (admin)

- Tiptap: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`, `@tiptap/extension-link`, optionally `@tiptap/extension-underline`.
- Drag and drop: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`.

## Minimal architecture (keep code simple)

### Data flow (React Query)

- **List page** `/dashboard/blogs`
- `useQuery(['blogs'])` → admin list
- **Create page** `/dashboard/blogs/new`
- `useMutation(createBlog)` then navigate to edit page
- **Edit page** `/dashboard/blogs/:id/edit`
- `useQuery(['blog', id])` → admin get-by-id
- `useQuery(['blogBlocks', id])` → blocks list
- Mutations: update blog, publish/unpublish, create/update/delete block, reorder blocks

### Block editing (single active editor panel)

- Left: sortable list of blocks (compact preview)
- Right: editor panel for the selected block
- Autosave:
- Debounce ~1000ms while editing
- Save-on-blur/close panel
- Clear status: Saving… / Saved / Error (toast + inline)

### Tiptap storage rule

- Editor holds a doc; when saving we store **exactly one top-level node**:
- `const node = editor.getJSON().content?.[0]`
- Persist `node` as `blog_blocks.content`

## File map (new/changed)

- **Config**: update [`/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/config/api.config.ts`](/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/config/api.config.ts) with Blog + Upload + Preview endpoints
- **Types**: add `src/types/blog.types.ts`
- **Schemas**: add `src/schemas/blog.schema.ts` (client validation mirrored from API)
- **Services**: add `src/services/blog.api.ts`, `src/services/uploads.api.ts` (Cloudinary signature + direct upload helper)
- **Hooks**: add `src/hooks/use-blogs.ts` and/or colocated hooks for queries/mutations (small wrappers)
- **Pages**:
- update `src/pages/dashboard/blogs.tsx` (list)
- add `src/pages/dashboard/blog-create.tsx` (new)
- add `src/pages/dashboard/blog-edit.tsx` (edit)
- **Components**: add `src/components/blog/*` for reusable UI pieces
- **Routing/Nav**: update [`/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/App.tsx`](/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/App.tsx) + [`/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/utils/constants.ts`](/home/sami/workspace/client_projects/PayPerCall/apps/admin/src/utils/constants.ts) (+ sidebar links if present)

## Implementation todos (byte-sized)

### Milestone A — Foundations (types, schemas, endpoints)

- Add blog types/enums used across UI.
- Add Zod schemas mirroring API constraints (slug regex, SEO lengths, publish readiness).
- Extend `API_CONFIG.ENDPOINTS` with:
- Admin blog CRUD + blocks CRUD + reorder
- Cloudinary signature endpoint
- `apps/web` preview enable/disable (Draft Mode)

### Milestone B — API client + React Query hooks

- Implement `blogApi` methods with `axiosInstance`.
- Implement query/mutation hooks using stable keys:
- `['blogs']`, `['blog', blogId]`, `['blogBlocks', blogId]`
- Ensure no fetch waterfalls:
- `blog` and `blogBlocks` load via separate queries (parallel by default)

### Milestone C — Routing + pages shell

- Add routes:
- `/dashboard/blogs` (list)
- `/dashboard/blogs/new` (create)
- `/dashboard/blogs/:id/edit` (edit)
- Update sidebar nav if needed.

### Milestone D — Blog list + create flow

- List page:
- Table with status/title/slug/updated
- Filters: status, featured
- Actions: New, Edit, Delete
- Create page:
- Minimal form (title, slug optional) → create → navigate to edit

### Milestone E — Blog metadata editor (edit page)

- Metadata form:
- `title`, `slug`, `excerpt`, `seo_title`, `seo_description`, `is_featured`, `cover_image_url`
- Cloudinary direct upload UI for cover image:
- `getCloudinarySignature()` → `FormData` POST to Cloudinary → store returned URL
- Publish controls:
- Compute readiness from schema + blocks count
- Disable Publish with explicit reasons

### Milestone F — Blocks list + DnD reorder

- Render blocks list from `blogBlocks` query.
- Add “Add block” dropdown to create a block server-side then select it.
- Implement dnd-kit reorder:
- Optimistic UI reorder
- Persist via `POST /api/admin/blocks/reorder` with ordered IDs
- On error: revert + toast

### Milestone G — Block edit panel (single Tiptap instance)

- Right-side panel that changes editor config per block type.
- For supported block types in v1:
- paragraph, heading, quote, code, bullet/ordered list, divider, image, gallery
- Autosave:
- Debounced save for content changes (about 1000ms)
- Save-on-blur/close
- Avoid stale closures using refs; keep callbacks stable
- Ensure we persist **node-only JSON** (single top-level node) per `blog-plan.md`.

### Milestone H — Image insertion inside blocks

- Add “Insert image” action in the block editor:
- Signature → upload → insert `image` node with `src` + `alt`
- Add minimal alt editing (required for accessibility).

### Milestone I — Preview button (Draft Mode)

- Add “Preview” button on edit page:
- Call `apps/web` Draft Mode enable route
- Open new tab to `apps/web/blog/[slug]`
- (Optional) include a disable draft mode link/action

### Milestone J — Lint + polish pass

- Run `pnpm -C /home/sami/workspace/client_projects/PayPerCall/apps/admin lint`.
- Fix any eslint issues in newly added files.