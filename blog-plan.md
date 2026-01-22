## Blog System Implementation Plan (Block-based, Tiptap JSON source of truth)

### Goal
- **SEO-optimized, server-rendered blog** with **full editorial control** and **block-based storage** (no HTML blobs, no markdown storage).

### Non‑negotiable principles (must stay true throughout implementation)
- **Block-based content model**: one blog → many ordered blocks.
- **Tiptap JSON is the single source of truth** for block content.
- **Images live in Cloudinary and are stored by URL only** (no binary upload through backend).
- **Server-rendered blog pages** for SEO.
- **Editor controls image placement** inside content (not inferred/auto-inserted).

### Repo reality check (current conventions to follow)
- **API**: `apps/api` is **Express 5** with `modules/*` routers, Zod validation middleware (`validateData`), and Drizzle schema in `apps/api/src/db/schema`.
- **Admin**: `apps/admin` is **Vite + React Router + React Query + shadcn/ui** patterns already used for auth/users.
- **Web**: `apps/web` is **Next.js App Router** and already uses `next/image` remotePatterns.

---

## Key questions (answer before/at milestone boundaries)

### Questions that affect schema + public SEO
- **Author model**: should a blog have an `author_id` (FK to `users`) or a fixed organization author (single author for all posts)?
- **Slug policy**: enforce lowercase only + hyphens only (`my-post-title`) or allow nested paths (`category/my-post`)?
- **Public visibility**: do we want `unlisted` (accessible by URL but not listed) in addition to `draft | published`?
- **Categories/tags**: required now or later? (schema changes if now)

### Questions that affect preview & caching
- **Preview**: do you want Next.js **Draft Mode** (`/api/preview`) with a secret token, or a simpler “preview via admin-authenticated API call” only?
- **Revalidation**: do you want revalidation triggered automatically from the API (webhook-style), or time-based only (e.g., 60s)?

### Questions that affect Cloudinary
- **Cloudinary folder**: should uploads go under a fixed folder like `blog/`? (recommended)
- **Allowed formats**: images only (`jpg/png/webp/avif`) or allow `gif`?

---

## Content model (strict, block-first)

### What is stored in the database
- **Blogs table**: metadata only (listing + SEO + routing).
- **Blog blocks table**: each row is **one ordered block**, `content` stores **raw Tiptap node JSON** for that block.

### “Raw Tiptap node JSON” (what goes into `blog_blocks.content`)
- Store **the node JSON** for the block, not HTML.
- Example **heading** block content:

```json
{
  "type": "heading",
  "attrs": { "level": 2 },
  "content": [{ "type": "text", "text": "Section title" }]
}
```

### Supported Tiptap nodes/marks (initial scope)
Keep this **small, high-value, renderable server-side**. Expand only when needed.

- **Block nodes (each maps to one `blog_blocks` row)**:
  - `paragraph` (type: `paragraph`)
  - `heading` (type: `heading`)
  - `image` (type: `image`)
  - `codeBlock` (type: `code`)
  - `blockquote` (type: `quote`)
  - `bulletList` (type: `bullet_list`)
  - `orderedList` (type: `ordered_list`)
  - `horizontalRule` (type: `divider`)
  - `gallery` (custom node) (type: `gallery`)

  References:
  - Nodes: [Tiptap node extensions](https://tiptap.dev/docs/editor/extensions/nodes)

- **Inline nodes/marks (stored inside block JSON)**:
  - text
  - marks: `bold`, `italic`, `underline`, `strike`, `code`, `link`

  References:
  - Marks: [Tiptap mark extensions](https://tiptap.dev/docs/editor/extensions/marks)

---

## Part 1 — API (`apps/api`) — Database + CRUD + Cloudinary signature

### Milestone 1.0 — Finalize API decisions (questions to answer)
- **Decide author model** (recommended: `author_id` FK to `users`, optional).
- **Confirm slug regex** and whether slashes are allowed.
- **Confirm preview approach** (Draft Mode token vs admin-only preview).
- **Confirm block types** for v1 (the list above is recommended).

---

### Milestone 1.1 — Drizzle schema + migrations

#### Todo (bite-sized)
- **Create enums** in `apps/api/src/db/schema`:
  - `blog_status`: `draft | published` (optional later: `unlisted`)
  - `blog_block_type`: `paragraph | heading | image | gallery | quote | code | bullet_list | ordered_list | divider`
- **Create `blogs` table** (metadata only):
  - `id` uuid PK defaultRandom
  - `title` varchar(255) notNull
  - `slug` varchar(255) notNull unique + indexed
  - `excerpt` varchar(500) nullable (or text)
  - `cover_image_url` varchar(2048) notNull (URL only)
  - `seo_title` varchar(60) nullable
  - `seo_description` varchar(160) nullable
  - `is_featured` boolean default false notNull
  - `status` enum default `draft` notNull
  - `published_at` timestamp tz nullable
  - `created_at`, `updated_at` timestamps tz (follow existing pattern)
  - **Optional**: `author_id` uuid FK → `users.id` (strongly recommended for structured data)
- **Create `blog_blocks` table**:
  - `id` uuid PK defaultRandom
  - `blog_id` uuid FK → `blogs.id` notNull (cascade delete recommended)
  - `type` enum notNull
  - `content` jsonb notNull (stores raw Tiptap node JSON)
  - `order` int notNull
  - `created_at` timestamp tz defaultNow notNull
- **Add constraints/indexes**:
  - unique index on (`blog_id`, `order`)
  - index on (`blog_id`)
  - (optional) index on (`blog_id`, `type`)
- **Run migrations** using existing scripts:
  - `pnpm -C apps/api db:generate`
  - `pnpm -C apps/api db:migrate`

#### Notes (why these constraints matter)
- Unique (`blog_id`, `order`) helps enforce “no duplicates”.
- We will enforce “no gaps” at reorder time in the service logic by rewriting `order = 0..n-1`.

---

### Milestone 1.2 — Zod validators (API-level enforcement)

#### Todo
- **Add `apps/api/src/db/validator/blog.validator.ts`**:
  - `blogCreateSchema`
  - `blogUpdateSchema`
  - `blogPublishSchema` (or publish is a status update with extra checks)
  - Slug regex: `^[a-z0-9]+(?:-[a-z0-9]+)*$` (if slashes allowed, change)
  - `seo_title` max 60, `seo_description` max 160
- **Add `apps/api/src/db/validator/blogBlock.validator.ts`**:
  - `blockCreateSchema` (type + content)
  - `blockUpdateSchema`
  - `blockReorderSchema`:
    - `blogId` uuid
    - `orderedBlockIds` array(uuid) with **no duplicates**

#### Publish validation rules (must be enforced server-side)
Before setting `status = published`:
- **title** present
- **slug** present and unique
- **cover_image_url** present
- **at least 1 block exists** for the blog
- (optional) `excerpt` required for SEO quality (recommended)

---

### Milestone 1.3 — API modules & routes (match existing `modules/*` convention)

#### Admin routes (protected)
Create module: `apps/api/src/modules/blogs/`:
- `blogs.routes.ts`
- `blogs.controller.ts`
- `blogs.service.ts`
- `blogs.repository.ts` (optional, if you prefer)

Routes to implement (as requested):
- `POST /api/admin/blogs`
- `PUT /api/admin/blogs/:id`
- `DELETE /api/admin/blogs/:id`
- `POST /api/admin/blogs/:id/blocks`
- `PUT /api/admin/blocks/:id`
- `DELETE /api/admin/blocks/:id`
- `POST /api/admin/blocks/reorder`

Auth/role rules:
- Add `authenticate` + `authorize('admin')` to all `/api/admin/*` routes.

#### Public routes (no auth)
- `GET /api/blogs` (published only; metadata only)
- `GET /api/blogs/:slug` (published only; includes ordered blocks)

#### Todo
- **Register routers** in `apps/api/src/app.ts`:
  - `app.use('/api/blogs', publicBlogsRouter)`
  - `app.use('/api/admin/blogs', adminBlogsRouter)` (or `adminRouter` prefix)
- **Keep response shape consistent** with existing controllers:
  - `{ success, statusCode, message, data }`
- **Validate UUID params** using existing helper (`isValidUUID`) before DB calls.

---

### Milestone 1.4 — Cloudinary signed upload config endpoint (no backend uploads)

#### Endpoint
- `POST /api/admin/uploads/cloudinary-signature`
  - Protected: `authenticate` + `authorize('admin')`
  - Returns a payload the client can use to upload **directly to Cloudinary**

#### Recommended response shape
- `cloudName`
- `apiKey`
- `timestamp`
- `signature`
- `folder` (optional but recommended, e.g. `blog/`)
- `allowedFormats` (optional, for UI hints)

#### Todo
- **Add env vars** in `apps/api`:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - optional: `CLOUDINARY_UPLOAD_FOLDER=blog`
- **Implement signature generation** server-side (HMAC SHA-1 per Cloudinary spec or use Cloudinary SDK).
- **Do not accept files** in this endpoint—only return signature config.

---

### Milestone 1.5 — Ordering integrity (service logic)

#### Requirements
- No duplicates, no gaps.
- Reorder must be atomic.

#### Todo
- In reorder service:
  - Verify all `blockIds` belong to `blogId`.
  - Verify counts match (no missing blocks unless you explicitly allow partial reorder).
  - Update all orders in a transaction: `order = index` (0..n-1).
- For create block:
  - Set `order = lastOrder + 1` (or count).
- For delete block:
  - Option A (recommended): re-pack orders after delete (transaction).
  - Option B: allow gaps until next reorder (but this violates your rule—avoid).

---

## Part 2 — Admin (`apps/admin`) — Editorial UI with Tiptap + block CRUD + DnD

### Milestone 2.0 — Finalize Admin UX decisions (questions to answer)
- **Editing pattern**: inline editors for every block vs “edit-in-panel” single editor instance (recommended for performance: edit-in-panel).
- **Autosave cadence**: debounce interval (recommended 800–1200ms) + save-on-blur.
- **Preview**: open `apps/web` preview URL with token vs draft mode.

---

### Milestone 2.1 — Dependencies (keep minimal)

#### Todo
- Install Tiptap:
  - `@tiptap/react`
  - `@tiptap/starter-kit`
  - `@tiptap/extension-image`
  - `@tiptap/extension-link`
  - (optional) `@tiptap/extension-underline`
- Install drag-and-drop:
  - `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- (Optional) image upload helper:
  - keep it plain `fetch` + `FormData` to Cloudinary (no extra libs needed)

---

### Milestone 2.2 — API client + types (follow existing axios + react-query patterns)

#### Todo
- Add `apps/admin/src/types/blog.types.ts`:
  - `Blog`, `BlogStatus`, `BlogBlock`, `BlogBlockType`
- Add `apps/admin/src/schemas/blog.schema.ts` (Zod) mirroring API constraints:
  - slug regex, SEO lengths, publish readiness
- Add `apps/admin/src/services/blog.api.ts` using `axiosInstance`:
  - `createBlog`, `updateBlog`, `deleteBlog`
  - `listBlogs` (admin list endpoint you may add, or reuse public)
  - `getBlogById` (admin-only; required for editor)
  - `createBlock`, `updateBlock`, `deleteBlock`, `reorderBlocks`
  - `getCloudinarySignature`
- Add React Query hooks with stable keys:
  - `['blogs']`, `['blog', blogId]`, `['blogBlocks', blogId]`

---

### Milestone 2.3 — Blog metadata screens (CRUD + publish controls)

#### Pages/routes (React Router)
- `/blogs` (admin list)
- `/blogs/new` (create metadata)
- `/blogs/:id/edit` (metadata + blocks)

#### Todo
- Blog list:
  - table/grid with status, title, slug, updated_at
  - filters: status (draft/published), featured
- Blog form:
  - `title`, `slug`, `excerpt`, `seo_title`, `seo_description`, `is_featured`
  - cover image uploader (Cloudinary direct upload)
  - save button + status badge
- Publish UX:
  - “Publish” button visible only when publish-ready
  - show explicit validation errors when not ready

---

### Milestone 2.4 — Block editor architecture (block = one row)

#### Recommended editing model (simple + maintainable)
- Render blocks as a sortable list.
- Only one block is “active” for editing at a time (side panel / modal).
- The editor instance is configured based on the block type, and on save it updates that single block row.

#### Todo
- Block list UI:
  - “Add block” dropdown: paragraph, heading, image, gallery, quote, code, lists, divider
  - each block shows a compact preview (first line, thumbnail for images)
- Block create flow:
  - create block row immediately (server returns id)
  - open edit panel for new block
- Autosave:
  - debounce updates while editing
  - show saving/saved/error indicators
- Delete:
  - confirm dialog
  - after delete, orders re-pack (API handles)

---

### Milestone 2.5 — Tiptap configuration per block type

#### Core rule
- Store **raw Tiptap node JSON** in `blog_blocks.content` (not HTML).

#### Todo
- For each block type, define:
  - `extensions` list (StarterKit + needed nodes/marks)
  - allowed marks (bold/italic/underline/strike/code/link)
  - serialization: `editor.getJSON()` should return a doc—extract the single top-level node to store

#### Important implementation detail (prevents “HTML blob” drift)
- Force the editor content to have **exactly one top-level node** representing the block.
- On save, store `doc.content[0]` (the node) as `blog_blocks.content`.

---

### Milestone 2.6 — Images inside blocks (Cloudinary direct upload)

#### Todo
- Add “Insert image” action in editor:
  - call `POST /api/admin/uploads/cloudinary-signature`
  - upload directly to Cloudinary with returned signature
  - insert image node with `src = returnedUrl`, `alt`
- Ensure editor can also edit:
  - `alt` text (for accessibility + SEO)
  - (optional) caption as separate paragraph block

---

### Milestone 2.7 — Gallery block (custom node, one block)

#### Data shape requirement
- Gallery is **one block** with multiple images + one layout choice.

#### Recommended Tiptap node attrs
- Custom node `gallery` with attrs:
  - `images: Array<{ url: string; alt?: string }>`
  - `layout: 'grid' | 'carousel'` (start with `grid`)

#### Todo
- Implement gallery editor UI (no heavy WYSIWYG needed):
  - add/remove images
  - reorder images within gallery
  - set `alt` per image
  - choose layout
- Persist as Tiptap node JSON in `blog_blocks.content`.

---

### Milestone 2.8 — Preview mode (server-rendered)

#### Options (choose one)
- **Option A (recommended)**: Next.js Draft Mode in `apps/web` with a secret token issued by API.
- **Option B**: Preview via a short-lived signed token appended to preview URL; web uses it to fetch draft data from API.

#### Todo
- Add “Preview” button in admin:
  - opens `/blog/[slug]` in `apps/web` with preview token (or draft mode enable route)
- Ensure previews render server-side, including blocks.

---

## Part 3 — Web (`apps/web`) — SSR routes + block rendering + SEO

### Milestone 3.0 — Finalize Web decisions (questions to answer)
- **Base URL** to call API from server components (env var).
- **Revalidation policy** (time-based vs tag-based).
- **Preview strategy** (match admin decision).

---

### Milestone 3.1 — Add routes

#### Todo
- Create pages:
  - `app/blogs/page.tsx`
  - `app/blog/[slug]/page.tsx`
- Add `generateMetadata` for both pages.

---

### Milestone 3.2 — Server-side data fetching layer

#### Todo
- Add `apps/web/lib/api/blogs.ts` (server-only helpers):
  - `getBlogsList()`
  - `getBlogBySlug(slug)`
- Use Next fetch caching:
  - list: `{ next: { revalidate: 60 } }` (example)
  - detail: `{ next: { revalidate: 60 } }`
- Handle 404s cleanly (use `notFound()`).

---

### Milestone 3.3 — Block renderer (semantic HTML, no markdown parsing)

#### Core rule
- Render from **Tiptap node JSON** only (from `blog_blocks.content`).

#### Recommended approach (maintainable)
- Implement a small recursive renderer:
  - `renderNode(node)` for block nodes
  - `renderInline(node)` for text + marks

#### Todo
- Implement `components/blog/BlockRenderer.tsx`:
  - switch on `block.type`
  - render semantic tags:
    - paragraph → `<p>`
    - heading → `<h2>`/`<h3>` based on `attrs.level`
    - quote → `<blockquote>`
    - code → `<pre><code>`
    - lists → `<ul>/<ol>` + `<li>`
    - divider → `<hr>`
    - image → `next/image` + meaningful `alt`
    - gallery → `Gallery` component
- Implement link mark rendering:
  - `<a href rel="noopener noreferrer" target="_blank">` (target optional)
- Ensure safe rendering:
  - never inject HTML via `dangerouslySetInnerHTML`

---

### Milestone 3.4 — Blog listing UX (professional, SEO-friendly)

#### Todo
- `/blogs`:
  - featured post hero (if `is_featured`)
  - grid of blog cards (title, excerpt, published_at)
  - pagination (recommended) to keep SSR fast
- Use `next/image` for cover images.
- Add internal links to detail pages.

---

### Milestone 3.5 — SEO (mandatory)

#### Metadata
- Detail page `generateMetadata`:
  - title: `seo_title ?? title`
  - description: `seo_description ?? excerpt`
  - og:image: `cover_image_url`
  - canonical: `/blog/[slug]`

#### Structured data (JSON-LD)
- Add Article schema to blog detail page:
  - headline, description, image, datePublished, dateModified, author

#### Todo
- Add `components/blog/ArticleJsonLd.tsx` that outputs `<script type="application/ld+json">…</script>` server-side.
- Ensure author data is available (depends on Milestone 1.0 decision).

---

### Milestone 3.6 — Performance rules

#### Todo
- Add Cloudinary hostname to `apps/web/next.config.mjs` `images.remotePatterns`.
- Lazy-load non-hero images:
  - hero cover: `priority`
  - content images: default lazy loading
- Avoid client rendering for blog content:
  - keep pages as server components
  - only small client components if truly needed (e.g., gallery carousel)

---

### Milestone 3.7 — Preview mode (server-rendered)

#### Option A: Next.js Draft Mode (recommended)
- Todo:
  - add `app/api/preview/route.ts` to enable draft mode with secret
  - add `app/api/preview/disable/route.ts`
  - when draft mode enabled, fetch draft blog content (API must provide a preview endpoint)

#### Option B: Tokenized preview URL
- Todo:
  - admin generates short-lived token
  - web reads token query param, calls API preview endpoint, renders SSR

---

## Suggested implementation order (minimize rework)
- **API schema + public read endpoints first** (Milestones 1.1–1.3).
- **Web renderer + SEO** next (Milestones 3.1–3.6) using seeded test data.
- **Admin editor** last (Milestones 2.1–2.7) once read paths are stable.
- Add **preview** after both admin + web exist (Milestones 2.8 + 3.7).

---

## Notes / improvements that preserve your non‑negotiables
- **Add `author_id`** to blogs for real Article schema authoring (recommended).
- Consider **soft-delete** for blocks (optional) to avoid accidental loss; still render only active blocks.
- Keep the initial supported nodes small (paragraph/heading/image/list/quote/code/divider/gallery) to ensure SSR renderer stays simple and safe.


