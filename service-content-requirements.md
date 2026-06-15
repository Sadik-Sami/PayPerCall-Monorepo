# Service & Page Content Requirements

This document lists every piece of copy, image, link, and form field the website needs from you (the content owner). It is organised so you can fill it in section-by-section and hand the result back to the build team without ambiguity.

---

## How to read this document

The site is built from a small set of reusable "section components" (Hero, Image Split, FAQ, etc.). Each component has a fixed schema — a list of named fields it accepts.

- **Section 1 — Global / brand assets** lists items that appear on every page (logo, favicons, brand contact info, partner logos).
- **Section 2 — Section template reference** is the *master schema list*. Each entry shows every field a section accepts, its type, whether it is required, length/format guidance, and image specifications. Refer back to it whenever a page below says "uses ServiceHero" or "uses ImageContentSplit".
- **Section 3 — Per-page content requirements** lists every page on the site in route order. For each page it gives: the URL, the SEO metadata you need to write, the ordered list of sections that appear on the page, and the specific content values that must be supplied for that page's instance of each section.
- **Section 4 — Image asset summary** is a consolidated table of every image referenced anywhere in the site (path, suggested dimensions, format, current state).
- **Section 5 — Writing guidance** is a short style note so copy stays consistent with what is already shipped.

### Notation used in this document

- **Required / Optional** — Required fields make the section break or look unfinished if missing. Optional fields fall back to defaults or are hidden.
- **Type** — `string`, `string[]` (a list of strings), `url`, `image`, `enum (a | b | c)` (pick one of the listed values), `richObject` (a nested set of fields, schema given inline).
- **Length** — Suggested character ranges. Going over usually still works visually but may wrap awkwardly on mobile.
- **Image spec** — Minimum dimensions, format, and whether transparency / a focal subject is required.
- **Accent colour** — Where mentioned, accept one of: `mint`, `sky`, `lilac`, `peach`, `blush`, `lime`. These map to a pastel palette already defined in the design system — pick the one that best matches the section's tone.

---

## 1. Global / Brand Assets

These appear across every page. Provide once.

### 1.1 Brand identity

| Field | Type | Required | Notes |
|---|---|---|---|
| Company display name | string | Yes | Currently `Core Closer` / `CoreCloser` / `PayPerCall` — inconsistent in the codebase. Confirm canonical spelling. |
| Brand tagline | string (≤ 80 chars) | Yes | Used in footer + OG metadata. |
| Primary brand colour (hex) | string | No | Currently driven by the design tokens. Only provide if you want a brand-wide accent change. |
| Brand voice / tone notes | text | No | One paragraph. See Section 5 for current voice. |

### 1.2 Logos & icons

| Asset | Current path | Required spec | Notes |
|---|---|---|---|
| Primary logo (full colour) | `/public/logo.png` | PNG or SVG, transparent background, 512×512+ master, horizontal lockup preferred | Used in navbar + footer. SVG strongly preferred for scaling. |
| Favicon | `/public/favicon.ico` | ICO 32×32 + 16×16 | Already present — replace if rebranding. |
| Apple touch icon | `/public/apple-icon.png` | PNG 180×180 | iOS home screen. |
| Android icon 192 | `/public/web-app-manifest-192x192.png` | PNG 192×192 | PWA manifest. |
| Android icon 512 | `/public/web-app-manifest-512x512.png` | PNG 512×512 | PWA manifest. |
| Generic icon 0 | `/public/icon0.svg` | SVG | Light mode. |
| Generic icon 1 | `/public/icon1.png` | PNG ≥ 256×256 | Dark mode. |

### 1.3 Brand contact info (used in Hero blocks + ConsultationCTA + footer)

| Field | Type | Required | Currently |
|---|---|---|---|
| Website URL | url | Yes | `https://corecloser.com` |
| Sales phone (E.164 format) | string | Yes | `+1 (855) 330-2777` |
| Office address (one line) | string | Yes | `20555 US-19 N, Clearwater, FL 33763` |
| Sales email | email | Yes | Not currently displayed anywhere — confirm if needed. |
| Support email | email | No | Optional, for footer. |

### 1.4 Social profile URLs (footer)

Provide URLs (or write "n/a" to omit the icon):

- LinkedIn
- X / Twitter
- Facebook
- Instagram
- YouTube
- TikTok

### 1.5 Trusted-by client logos

Currently 30+ partner logos live at `/public/clients/logo_*.png` (Apple, AIG, Allstate, AARP, AT&T, etc.) and stream across the home page and several services pages.

| Item | Spec |
|---|---|
| Logo files | PNG or SVG, transparent background, monochrome preferred, ≥ 200px wide |
| Naming convention | `logo_<brand>.png` (snake_case) |
| Quantity | 20–40 ideal for the marquee strip |
| Permission | Confirm you have rights/permission to display each brand mark |

### 1.6 Hero slider / asymmetric service hero imagery

Currently at `/public/images/slider/slider-1…9.{jpg,webp,png}`. Used by every `ServiceHero` (web-dev, cms, app-dev hub + sub-routes) and on the home page.

| Item | Spec |
|---|---|
| Quantity | 9 hero images already present — confirm if these should be replaced with brand-specific photography |
| Dimensions | ≥ 1600×1200, landscape, focal subject in the centre-left third |
| Format | WebP preferred, JPG acceptable |
| Style | Professional, conversion-focused, human-led where possible |

### 1.7 Site-wide SEO defaults

| Field | Required | Currently |
|---|---|---|
| Site title suffix | Yes | `| Core Closer` / `| PayPerCall` — pick one and standardise |
| Default OG image | Yes (1200×630, PNG/JPG) | Not currently set — confirm a single hero image to use as default |
| Twitter handle | Yes | Not set — confirm |
| Robots policy | — | All pages currently `index, follow` |

---

## 2. Section template reference

This is the *schema bible*. Every page in Section 3 references these by name. Read the relevant entry when filling content for a page.

### 2.1 `HeroSection` — used on Pay Per Call hub, Pay Per Lead hub, Digital Marketing hub

A two-column split hero: copy on the left, contact card on the right, full-width background image fading in behind. Current example: pay-per-call.

| Field | Type | Required | Length | Notes |
|---|---|---|---|---|
| `title` | string | Yes | 1–4 words | Short, statement-style (e.g. "Pay Per Call"). |
| `subtitle` | string | Yes | 100–220 chars | The value-prop sentence under the title. |
| `callToAction.text` | string | Yes | 2–4 words | Primary button label (e.g. "Check Call Capacity"). |
| `callToAction.href` | url | Yes | — | Usually `/contact`. |
| `backgroundImage` | image (URL) | Yes | 1600×1000+, JPG/WebP, dark/atmospheric, must look fine with text overlaid | Provide a brand-owned image. Currently using Unsplash placeholders. |
| `contactInfo.website` | string | Yes | — | Defaults to brand URL. |
| `contactInfo.phone` | string | Yes | — | Defaults to brand phone. |
| `contactInfo.address` | string | Yes | — | Defaults to brand address. |

### 2.2 `ServiceHero` — used on Web Dev / CMS / App Dev / Hire Call Center / sub-routes

A flexible service hero. Variant decides layout density. Current example: web-dev hub.

| Field | Type | Required | Length | Notes |
|---|---|---|---|---|
| `pill` | string | No | 1–3 words | Top-of-hero badge text (e.g. "Web Development"). |
| `eyebrow` | string | No | 1 word | Smaller text above pill (e.g. "Services"). |
| `title` | string | Yes | 40–80 chars | Headline. |
| `subtitle` | string | Yes | 120–250 chars | Sub-headline / value prop. |
| `features` | string[] | No | 3–4 items, ≤ 28 chars each | Three trust-bullets that render as small checks. |
| `stat.value` | string | No | ≤ 12 chars | Bold number/string (e.g. "30 minutes", "96%"). |
| `stat.label` | string | No | ≤ 60 chars | Caption under the stat. |
| `primaryCta.label` | string | Yes | 2–4 words | Main button text. |
| `primaryCta.href` | url | Yes | — | |
| `secondaryCta.label` | string | No | 2–4 words | Outline button text. |
| `secondaryCta.href` | url | No | — | |
| `footnote` | string | No | ≤ 120 chars | Italic reassurance line under buttons. |
| `media.src` | image | Yes | See below | Hero photograph or illustration. |
| `media.alt` | string | Yes | ≤ 120 chars | Accessibility caption. |
| `media.caption` | string | No | ≤ 90 chars | Small text overlaid on the image. |
| `variant` | enum (`default`, `centered`, `asymmetric`, `professional`, `minimal`, `showcase`) | No | — | Defaults to `default`. Sub-pages typically use `asymmetric`. |

**Hero image spec**: ≥ 1600×1100, landscape, JPG/WebP/PNG, ideally a real photograph of people/product/dashboards rather than stock geometric art.

### 2.3 `KineticHero` — used on Graphics Design, Podcast Marketing, Video Editing

A type-driven kinetic hero with floating animated sticker decorations. No background image — uses pastel halos and SVG stickers instead. Current example: video-editing.

| Field | Type | Required | Length | Notes |
|---|---|---|---|---|
| `eyebrow` | string | Yes | ≤ 30 chars | Small label, conventionally starts with `/`. e.g. `/ Video Editing`. |
| `lines` | string[] | Yes | 3–4 lines, ≤ 18 chars/line | Headline broken into lines that stack vertically. |
| `accent.line` | number (0-indexed) | Yes | — | Which line index to gradient-style. |
| `accent.word` | string | Yes | — | Which exact word in that line gets the gradient italic treatment. |
| `accentColour` | enum (`mint`/`sky`/`lilac`/`peach`/`blush`/`lime`) | No | — | Gradient family for the accented word. |
| `subDeck` | string | Yes | 160–260 chars | The deck under the headline. |
| `primaryCta.label` | string | Yes | 2–5 words | |
| `primaryCta.href` | url | Yes | — | |
| `secondaryCta.label` | string | No | 2–5 words | |
| `secondaryCta.href` | url | No | — | |
| `badges` | richObject[] | No | 2–4 items | Each: `{ icon: 'star' \| 'sparkle' \| 'fire' \| 'diamond' \| 'check', label: ≤ 30 chars }` |
| `marqueeTokens` | string[] | No | 6–10 single words | Tiny scroller above the headline (e.g. discipline tags). |
| `haloAccents` | accent[] | No | 2 items | Two accent names — light gradients that bleed in from edges. |
| `stickerKind` | enum (`design`/`audio`/`video`) | No | — | Determines which SVG stickers float around. |
| `nowPlaying.eyebrow` | string | No | ≤ 16 chars | Small caption above the floating "Now playing/editing" chip (audio + video kinds only). |
| `nowPlaying.title` | string | No | ≤ 40 chars | Big text on the chip. |
| `nowPlaying.meta` | string | No | ≤ 28 chars | Timecode / duration line. |
| `nowPlaying.accent` | accent | No | — | Chip accent colour. |

No image input required — this hero is fully illustrative.

### 2.4 `CallLogicBanner` — used on Pay Per Call & Pay Per Lead sub-routes

Compact gradient banner hero with two CTAs. No image input.

| Field | Type | Required | Length | Notes |
|---|---|---|---|---|
| `badge` | string | Yes | 2–4 words | Top label (e.g. "Pay Per Call"). |
| `title` | string | Yes | 60–110 chars | Section headline. |
| `subtitle` | string | Yes | 100–180 chars | Deck. |
| `accent` | enum (`mint`/`sky`/`lilac`/`peach`) | Yes | — | Banner tint. |
| `bgVariant` | enum (`search_social`/`live_transfer`/`offline_media`) | Yes | — | Background pattern. |
| `primaryCta.label` + `.href` | string + url | Yes | — | Main CTA. |
| `secondaryLink.label` + `.href` | string + url | No | — | Back link. |

### 2.5 `ImageContentSplit` — used widely (PPC hub, PPL hub, Graphics, Podcast, Video, others)

A two-column section: image one side, bullets the other. Direction can flip with `reverse`.

| Field | Type | Required | Length | Notes |
|---|---|---|---|---|
| `kicker` | string | Yes | 2–4 words | Tiny pill above headline. |
| `kickerAccent` | accent | No | — | Pill colour. |
| `haloAccent` | accent | No | — | Background blur tint. |
| `headline` | string | Yes | 40–80 chars | H2. |
| `description` | string | Yes | 200–360 chars | Paragraph under headline. |
| `bullets` | richObject[] | Yes | 3 items | Each: `{ title: ≤ 50 chars, description: 80–160 chars }`. |
| `primaryCta.label` + `.href` | string + url | Yes | — | |
| `primaryCtaVariant` | enum (`electric`/`lilac`) | No | — | Button colour family. |
| `secondaryCta` | `{ label, href }` | No | — | Optional second CTA. |
| `image.src` | image (path or URL) | Yes | 1200×1200+, square or 4:3, JPG/PNG/WebP | Must be brand-owned. |
| `image.alt` | string | Yes | ≤ 120 chars | Descriptive alt. |
| `reverse` | boolean (when calling) | No | — | If true, image on right instead of left. |

### 2.6 `CapabilitiesBento` — used on Graphics Design, Podcast Marketing, Video Editing

Bento-style capabilities grid (6 tiles). Current example: video-editing.

| Top-level field | Type | Required | Length |
|---|---|---|---|
| `eyebrow` | string | Yes | ≤ 30 chars |
| `headline` | string | Yes | 30–80 chars |
| `description` | string | Yes | 160–280 chars |
| `tiles` | richObject[] | Yes | 6 items |

Each tile:

| Field | Type | Required | Length |
|---|---|---|---|
| `title` | string | Yes | ≤ 32 chars |
| `description` | string | Yes | 80–180 chars |
| `bullets` | string[] | No | 3 items, ≤ 36 chars each |
| `icon` | enum | Yes | Pick from: `Sparkles`, `Layout`, `Megaphone`, `Share2`, `Mail`, `Presentation`, `Palette`, `Brush`, `Camera`, `Film`, `PenTool`, `Mic`, `AudioLines`, `Radio`, `Scissors`, `Briefcase` |
| `accent` | accent | Yes | Tile background tint |
| `size` | enum (`sm`/`lg`/`wide`) | No | Defaults `sm`. Use `lg` on first tile, `wide` on last for variation |

### 2.7 `WorkMosaic` — used on Graphics Design, Podcast Marketing, Video Editing

Up to 9 portfolio tiles. Supports real images OR placeholder accent-tiles.

| Top-level field | Type | Required | Length |
|---|---|---|---|
| `eyebrow` | string | Yes | ≤ 30 chars |
| `headline` | string | Yes | 30–60 chars |
| `description` | string | No | 120–240 chars |
| `pieces` | richObject[] | Yes | 6–9 items |

Each piece:

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | ≤ 40 chars |
| `client` | string | No | Optional client name |
| `tag` | string | Yes | ≤ 20 chars, category tag |
| `accent` | accent | Yes | Tile tint |
| `aspect` | enum (`tall`/`wide`/`square`) | No | Defaults `square` |
| `image.src` | image | No | If omitted or `placeholder: true`, an accent tile is shown |
| `image.alt` | string | If image | — |
| `href` | url | No | If set, tile becomes clickable |
| `placeholder` | boolean | No | Force placeholder even if image provided |

**Real portfolio image spec**: 1000×1000+ (square) or 750×1000 (tall) or 1200×900 (wide), JPG/WebP, brand-owned.

### 2.8 `DesignPrinciples` — used on Graphics Design, Podcast Marketing, Video Editing

Three-card "principles" / "manifesto" section.

| Field | Type | Required | Length |
|---|---|---|---|
| `eyebrow` | string | Yes | ≤ 30 chars |
| `headline` | string | Yes | 30–60 chars |
| `description` | string | No | 80–160 chars |
| `principles` | richObject[] | Yes | 3 items |

Each principle:

| Field | Required | Length |
|---|---|---|
| `number` | Yes | "01" / "02" / "03" |
| `title` | Yes | 3–6 words |
| `description` | Yes | 140–240 chars |
| `accent` | Yes | one of the six accents |

### 2.9 `EngagementTiers` — used on Graphics Design, Podcast Marketing, Video Editing

Pricing/tier cards. Usually two tiers.

| Field | Type | Required | Length |
|---|---|---|---|
| `eyebrow` | string | Yes | ≤ 30 chars |
| `headline` | string | Yes | 30–60 chars |
| `description` | string | No | 80–180 chars |
| `tiers` | richObject[] | Yes | 2 items |

Each tier:

| Field | Required | Length |
|---|---|---|
| `name` | Yes | 2–4 words |
| `positioning` | Yes | 60–120 chars (one-line description of the tier) |
| `inclusions` | Yes | 5 items, ≤ 40 chars each (what's included) |
| `bestFor` | Yes | 50–120 chars |
| `accent` | Yes | accent colour |
| `cta.label` | Yes | 2–5 words |
| `cta.href` | Yes | url |
| `featured` | No | boolean — true on the recommended tier |

### 2.10 `CrossLinkBand` — used on Graphics, Podcast, Video

Single-card cross-sell band linking to a sibling service.

| Field | Required | Length |
|---|---|---|
| `eyebrow` | Yes | ≤ 24 chars |
| `headline` | Yes | 40–80 chars |
| `description` | Yes | 140–240 chars |
| `cta.label` | Yes | 3–5 words |
| `cta.href` | Yes | url (target service) |
| `accent` | No | accent colour |

### 2.11 `StrategicBlueprintSection` — used on PPC hub, PPL hub, Graphics, Podcast, Video

Four-step process visualisation. Falls back to default copy if no steps supplied.

| Top-level field | Required | Length |
|---|---|---|
| `badgeLabel` | No | ≤ 24 chars (e.g. "/ Process") |
| `title` | No | 30–60 chars |
| `description` | No | 140–280 chars |
| `steps` | No | 4 items — if omitted, default steps render |

Each step:

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | 2–4 words |
| `description` | Yes | 120–220 chars |
| `icon` | Yes | One of: `Target`, `Filter`, `Database`, `TrendingUp`, `PhoneCall`, `Activity`, `Scissors` (any Lucide icon name from the allowed map) |
| `bg`, `border`, `iconCircle`, `numberAccent` | Yes | Pastel utility classes — leave to dev team unless rebranding |

### 2.12 `ValuePropositionSection` — used on PPC hub, PPL hub, Hire Call Center

Mixed grid of value cards and before/after transformation pairs. Falls back to default Pay Per Call copy if nothing supplied.

| Top-level field | Required | Length |
|---|---|---|
| `badgeLabel` | No | ≤ 30 chars |
| `titleHighlight` | No | 2–4 words (gets gradient styling) |
| `description` | No | 160–280 chars |
| `valueCards` | No | 4 items |
| `transformationPairs` | No | 4 items |

Each value card:

| Field | Required | Length |
|---|---|---|
| `title` | Yes | 2–4 words |
| `description` | Yes | 120–220 chars |
| `icon` | Yes | Lucide name from the allowed set (`UserCheck`, `Filter`, `FileCheck`, `Zap`, `ShieldCheck`, `Shield`, `BarChart3`) |
| `theme` | Yes | One of `emerald`, `purple`, `amber`, `blue` |

Each transformation pair:

| Field | Required | Notes |
|---|---|---|
| `before` | Yes | 3–6 words ("Chasing form fills") |
| `after` | Yes | 3–6 words ("High-Intent Calls") |
| `featured` | No | boolean — true on the standout pair |

### 2.13 `TransformationComparisonSection` — used on PPL hub, Hire Call Center

Before vs after comparison with stats. Defaults to Pay Per Call copy.

| Top-level field | Required | Length |
|---|---|---|
| `ctaLabel` + `ctaHref` | No | — |
| `badgeLabel` | No | ≤ 30 chars |
| `titleHighlight` | No | 2–4 words |
| `description` | No | 160–280 chars |
| `beforeTitle` / `beforeDescription` | No | ≤ 40 chars / 100–200 chars |
| `afterTitle` / `afterDescription` | No | ≤ 40 chars / 100–200 chars |
| `beforeItems` | No | 3 items: `{ title, description, icon }` |
| `afterItems` | No | 4 items: `{ title, description, icon, pastel }` where pastel ∈ `pastel-mint`/`pastel-sky`/`pastel-lilac`/`pastel-peach` |
| `stats` | No | 3 items: `{ value: ≤ 10 chars, label, pastel }` |
| `readyTitle` / `readyDescription` | No | ≤ 60 chars / 100–200 chars |

### 2.14 `ROICalculatorSection` — used on PPC hub, PPL hub, Digital Marketing hub

Interactive ROI calculator. **No content input required from you** — the calculator's logic, copy, and defaults are pre-baked. Pass `mode` only:

| Field | Required | Notes |
|---|---|---|
| `mode` | No | enum: `call` (default) / `lead` / `marketing` — chooses which preset assumptions and labels appear |

### 2.15 `ProcessSteps` — used on Web Dev hub, App Dev hub, CMS hub, Hire Call Center

Generic 3–4 step process layout.

| Field | Required | Length |
|---|---|---|
| `title` | No | 30–60 chars |
| `description` | No | 100–200 chars |
| `steps` | Yes | 3–5 items, each `{ title: 2–4 words, description: 100–200 chars }` |
| `variant` | No | `grid` / `timeline` / `cards` (default `grid`) |

### 2.16 `TimelineSteps` — used on App Dev sub-routes

Vertical timeline. Same shape as `ProcessSteps.steps`, with simpler styling.

### 2.17 `CaseStudyStrip` — used widely (PPC hub, PPL hub, Hire Call Center, Web Dev hub & sub-routes, App Dev, CMS, Digital Marketing hub)

Horizontal scrollable case-study cards.

| Top-level field | Required | Length |
|---|---|---|
| `title` | No | 30–60 chars |
| `description` | No | 120–240 chars |
| `cta.text` + `cta.href` | No | — |
| `items` | Yes | 3–6 items |

Each case-study card (`CaseStudyCardItem`):

| Field | Required | Length |
|---|---|---|
| `title` | Yes | 2–4 words (client or programme name) |
| `description` | Yes | 200–360 chars — problem + solution + outcome in one paragraph |
| `image.src` | No | 1000×750+ JPG/WebP (renders behind a gradient) |
| `image.alt` | No | ≤ 120 chars |
| `accentColor` | No | one of `pastel-peach`, `pastel-lilac`, `pastel-lime`, `pastel-mint`, `pastel-sky`, `pastel-blush` |
| `link` | No | url to the full case study (none currently linked) |

> Web-dev sub-routes use a richer `CaseStudyItem` shape with separate `problem` / `solution` / `outcome` / `metrics` arrays, automatically mapped to the card format. Provide that detail per page in Section 3.

### 2.18 `ServiceCapabilitiesGateway` — used on every hub page (PPC, PPL, DM, Web Dev, CMS, App Dev, Hire Call Center)

The grid of capability cards linking out to sub-routes. **Content lives in `lib/data/service-navigation.ts` and is largely structural** — for each hub you only need to confirm:

| Field per card | Required | Length |
|---|---|---|
| `label` | Yes | 2–4 words |
| `summary` | Yes | 80–160 chars |
| `capabilities` | Yes | 3 items, ≤ 28 chars each |
| Icon | Yes | Lucide icon name |
| Section `title` | Yes | 30–60 chars |
| Section `subtitle` | Yes | 140–240 chars |
| `primaryCta.label` + `.href` | Yes | — |
| `primaryCtaNote` | No | ≤ 100 chars |

Boss: just confirm the labels, summaries, and three-bullet capability lists for every sub-route under each hub (lists shown per page in Section 3).

### 2.19 `ClientSuccessBreakdown` — used on Web Dev sub-routes, App Dev sub-routes

Three-up outcomes panel.

Top-level: `title` (default "Real outcomes from our clients"), `subtitle` (default "Measured results that matter to your business."), `outcomes` (3 items).

Each outcome:

| Field | Required | Length |
|---|---|---|
| `icon` | No | enum `clock` / `database` / `gitBranch` / `default` |
| `metric` | Yes | ≤ 12 chars — bold stat |
| `label` | Yes | ≤ 40 chars |
| `description` | Yes | 100–180 chars |
| `context` | No | ≤ 100 chars (italic supporting line) |

### 2.20 `DeliverablesSection` — used on Web Dev hub + sub-routes

Numbered deliverables grid.

| Field | Required | Length |
|---|---|---|
| `title` | No | 30–60 chars |
| `subtitle` | No | 100–200 chars |
| `standards` | No | 3–5 items, ≤ 100 chars each — bullet list of governing standards |
| `deliverables` | Yes | 4 items |

Each deliverable: `{ title (2–4 words), description (100–200 chars), bulletPoints (3 items, ≤ 32 chars each) }`.

### 2.21 `IntegrationLogos` — used on Web Dev, App Dev, CMS hubs

Logo grid of integrations.

| Field | Required | Notes |
|---|---|---|
| `title` | No | 30–60 chars |
| `description` | No | 100–200 chars |
| `ctaLabel` / `ctaHref` | No | — |
| `variant` | No | `grid` / `marquee` / `grouped` (defaults `grid`) |
| `integrations` | Yes | 8–16 items, each `{ name: ≤ 24 chars, logo?: image path, category?: ≤ 24 chars }` |

If you do not provide a `logo` for an integration the section falls back to a styled text chip. Provide logos when possible (PNG/SVG, transparent, ≥ 200px wide).

### 2.22 `TrustBanner` — used on Web Dev hub

Single trust band with guarantees + stats + badges. Defaults shipped — only override if values change.

| Field | Required | Length |
|---|---|---|
| `headline` | No | 40–80 chars |
| `subheadline` | No | 100–200 chars |
| `guarantees` | No | 4 items: `{ title: 2–4 words, description: 80–160 chars, icon? }` |
| `stats` | No | 3 items: `{ value: ≤ 12 chars, label: ≤ 24 chars, suffix? }` |
| `badges` | No | 3–5 short strings (compliance / certs) |
| `variant` | No | `default` / `minimal` / `gradient` |

### 2.23 `ResultsShowcase` — used on Web Dev hub

Outcome metrics grid. Defaults included.

| Field | Required | Length |
|---|---|---|
| `title` | No | 30–60 chars |
| `description` | No | 100–200 chars |
| `metrics` | No | 4 items: `{ value, label, helperText? }` |

### 2.24 `TestimonialsSection` — used on Web Dev hub, Graphics Design, Podcast Marketing, Video Editing

Testimonial carousel (or grid / featured).

| Field | Required | Length |
|---|---|---|
| `title` | No | 30–60 chars |
| `description` | No | 100–200 chars |
| `variant` | No | `carousel` / `grid` / `featured` |
| `testimonials` | Yes | 3–6 items |

Each testimonial:

| Field | Required | Length |
|---|---|---|
| `quote` | Yes | 120–260 chars |
| `author` | Yes | 2–4 words |
| `role` | Yes | ≤ 40 chars |
| `company` | Yes | 2–4 words |
| `avatar` | No | Square headshot ≥ 256×256, PNG/JPG |
| `rating` | No | integer 1–5 (renders as stars) |
| `highlight` | No | ≤ 36 chars — pull-quote shown in summary form |

### 2.25 `FAQ` — used on home, every hub, every sub-route, almost every page

Accordion list with an animated illustration on the right.

| Field | Required | Length |
|---|---|---|
| `items` | Yes | 4–8 items |
| `variant` | No | `landing` (default, blue/primary palette) / `pastel` (lilac/peach/sky — used on most service pages) |
| `badge` | No | ≤ 30 chars |
| `title` | No | 30–60 chars |
| `description` | No | 120–240 chars |

Each FAQ item: `{ question: ≤ 100 chars, answer: 200–500 chars, bulletPoints?: string[] }`.

### 2.26 `ConsultationCTA` — used on **every** hub + sub-route + about/contact-adjacent pages

The final lead-capture section. Two columns: left panel (badge + title + subtitle + features + tagline + form fields).

| Field | Required | Length |
|---|---|---|
| `category` | Yes | URL-safe slug used for lead routing (e.g. `pay-per-call`, `graphics-design`, `video-editing`) |
| `sourcePage` | No | Slug describing the originating sub-route (e.g. `exclusive`, `shared`, `real-time`). Auto-inferred from URL if omitted |
| `title` | Yes | 30–80 chars |
| `subtitle` | Yes | 100–220 chars |
| `badge.label` | No | ≤ 24 chars |
| `badge.icon` | No | Lucide name (e.g. `Check`, `Zap`) |
| `features` | Yes (preferred over `bullets`) | 3 items, each `{ title: 2–4 words, description: 80–160 chars, icon: Lucide name }` |
| `bullets` | No (legacy) | string[] — only used if `features` not supplied |
| `tagline` | No | ≤ 120 chars (italic line) |
| `formTitle` | No | ≤ 60 chars (right-column heading) |
| `submitLabel` | No | 3–5 words |
| `formVariant` | No | `short` (name + email) / `detailed` (+ company + project summary) |
| `urgencyBadge` | No | `{ text, icon }` — shown under submit (e.g. "Prefer to talk? Call …") |
| `verticalsOptions` | No | `{ value, label }[]` — replaces the free-text project type input with a select |
| `textareaLabel` / `textareaPlaceholder` | No | Overrides for the project summary textarea |

### 2.27 `StickyCTA` — used on every hub page

Floating bottom bar that appears after the user scrolls > 600 px.

| Field | Required | Length |
|---|---|---|
| `title` | Yes | ≤ 60 chars |
| `ctaText` | Yes | 2–5 words |
| `href` | Yes | url |

### 2.28 `CallProcessFlow` — used on PPC + PPL sub-routes

3-step flow diagram for sub-route hero detail.

| Field | Required | Length |
|---|---|---|
| `title` | Yes | 30–60 chars |
| `subtitle` | Yes | 100–200 chars |
| `accent` | Yes | accent colour |
| `steps` | Yes | exactly 3 items |

Each step: `{ step: '01'/'02'/'03', title: 2–4 words, description: 140–240 chars, techNotes: 3 items each ≤ 36 chars }`.

### 2.29 `CallAdvantagesGrid` — used on PPC + PPL sub-routes

3-up advantage cards.

| Field | Required | Length |
|---|---|---|
| `title` | Yes | 30–60 chars |
| `subtitle` | Yes | 60–120 chars |
| `items` | Yes | exactly 3 |

Each item: `{ title: 3–6 words, description: 140–240 chars, iconKey: Lucide name, tone: accent }`.

### 2.30 `DataDrivenFeaturesGrid` — used on PPC + PPL sub-routes

6-tile capability grid. A default content set (`DEFAULT_DATA_DRIVEN_FEATURES`) is shipped — only supply if overriding.

Top-level: `badge`, `title`, `subtitle`, `features`.

Each feature: `{ title: 3–6 words, description: 100–200 chars, iconKey: Lucide name, tone: accent }`.

### 2.31 `StandardVsOptimizedMicroCard` — used on PPC + PPL sub-routes

Two-column "standard vs CoreCloser-optimized" comparison.

| Field | Required |
|---|---|
| `title` | Yes |
| `accent` | Yes |
| `standard.label` + `standard.bullets` (3 items, ≤ 60 chars each) | Yes |
| `optimized.label` + `optimized.bullets` (3 items, ≤ 60 chars each) | Yes |
| `note` | No |

### 2.32 `IndustryTrustSlider` — used on PPC hub, PPL hub

A horizontal industry-logo slider. **No content input required** — content is currently hardcoded. If you want to swap or add industries, supply the list (current verticals: insurance, legal, home services, healthcare, financial).

### 2.33 `Industries` — used on home, PPC hub, PPL hub

10-industry grid. Hardcoded list:

> Insurance, Legal, Home Services, Healthcare, Financial Services, Solar / Energy, Education, Real Estate, Travel, Senior Care.

If you want to add/remove industries supply: `{ name, description (≤ 120 chars), icon (Lucide name) }`.

### 2.34 `DigitalMarketingPillarsSection` — used on Digital Marketing hub + sub-routes

4-pillar capability section.

| Field | Required | Length |
|---|---|---|
| `badgeLabel` | No | ≤ 30 chars |
| `title` | No | 30–80 chars |
| `description` | No | 140–280 chars |
| `pillars` | Yes | 4 items |
| `proofItems` | No | 3 items |
| `whyItWorksTitle` / `whyItWorksDescription` / `whyItWorksCta` | No | — |

Each pillar: `{ id, title: 1–2 words, description: 120–220 chars, ctaLabel: ≤ 30 chars all-caps, icon: Lucide name, theme: accent }`.

Each proof item: `{ title: 2–4 words, description: 100–180 chars, icon: Lucide name }`.

### 2.35 `DigitalMarketingGrowthMatrixSection` — used on Digital Marketing hub + sub-routes

4-step growth sprint visualisation.

| Field | Required |
|---|---|
| `badgeLabel`, `title`, `description` | No |
| `steps` | Yes — 4 items |
| `primaryCta.label` + `.href` | Yes |
| `secondaryCta` | No |
| `ctaTitle`, `ctaDescription` | No |

Each step: `{ step: '01'…'04', title, description, tagline (week label), icon, theme }`.

### 2.36 `IntegratedSuccessBlueprintsSection` — used on Digital Marketing hub

Composite section. Drives off `INTEGRATED_SUCCESS_BLUEPRINTS` constant. Confirm with dev team whether content edits are needed; if so the boss should treat it like CapabilitiesBento and supply per-pillar copy.

### 2.37 Digital marketing custom heroes (`SeoAuthorityHero`, `PpcPerformanceHero`, `EmailRetentionHero`, `SocialSignalHero`)

These are richly animated, **content baked into the components**. If you want to change the headline / sub-headline / accent tokens, that requires a small code edit — provide:

- New headline (1 line, ≤ 60 chars)
- New deck (180–300 chars)
- Primary CTA label + href

…and the dev team will update the component literals.

---

## 3. Per-page content requirements

Pages are listed in route order. For each page provide the metadata fields and the per-section content described.

### 3.0 Home — `/`

**SEO metadata**
- Title (≤ 60 chars), description (140–240 chars), OG image (1200×630).

**Sections in order** (all content currently hardcoded in components — supply only if you want changes):

1. **`Hero` (landing slider)** — Provide:
   - Slide 1: title (3–6 words), subtitle (140–240 chars)
   - Slide 2: title (3–6 words), subtitle (140–240 chars)
   - Background images for both slides (1600×1200+, JPG/WebP, dark-friendly)
2. **`TrustBar`** — Provide 3 trust points (≤ 28 chars each). Current: "No long-term contracts", "Performance-based pricing", "Start in 24-48 hours".
3. **`TechSpotlight`** — 4 service tile cards. For each: `title` (4–8 words), `description` (180–300 chars). Plus 4 trust indicators (title + Lucide icon). Currently: "Pay Per Call Lead Generation", "Pay Per Lead Services", "Digital Marketing That Scales", "Web & App Development Built to Convert".
4. **`ImpactStats`** — 4 animated counters. Each: `value` (number), `description` (≤ 60 chars). Currently: leads delivered, monthly inbound calls, average ROI, verticals.
5. **`Industries`** — see §2.33.
6. **`HowItWorks` / Steps** — 4-step process. Each: `title` (2–3 words), `description` (140–240 chars). Currently: Quick Discovery, Strategy & Setup, Launch & Deliver, Optimize & Scale.
7. **`Testimonials`** — Up to 30 testimonials (current: 22). Each: see §2.24 schema. Provide photos when possible (square ≥ 256×256).
8. **`Methodology`** — 4 method cards. Each: `title` (2–4 words), `description` (120–200 chars). Currently: Team Augmentation, MVP Services, End to End Dev, Offshore Office.
9. **`FAQ`** — 6 items already drafted; confirm or revise. See body of `app/page.tsx` lines 13–44 for current copy.
10. **`CTA`** — Final CTA panel — confirm headline (≤ 60 chars), subline (100–200 chars), CTA label + href.

---

### 3.1 Pay Per Call hub — `/services/pay-per-call`

**SEO metadata**: title, description, canonical, OG image (1200×630).

**Sections in order**:

1. **`HeroSection`** (§2.1)
   - `title`: "Pay Per Call"
   - `subtitle`: ~180 chars (current copy good — revise if desired)
   - `callToAction`: { text: "Check Call Capacity", href: "/contact" }
   - `backgroundImage`: 🆕 **replace Unsplash placeholder with brand-owned image** (1600×1000+, JPG/WebP)
   - `contactInfo`: pulled from Global Brand
2. **`IndustryTrustSlider`** — no input required
3. **`ROICalculatorSection`** — no input required (`mode='call'`)
4. **`ValuePropositionSection`** (§2.12) — uses default content; supply custom if rebranding
5. **`TransformationComparisonSection`** (§2.13) — uses default content
6. **`ImageContentSplit` #1** (§2.5)
   - `kicker`: "Intelligent Routing", accents `sky`
   - `headline`, `description`, 3 bullets — current copy good
   - `image`: `/images/ppc/ppc1.png` (provide 1200×1200+ replacement if rebranding)
7. **`ImageContentSplit` #2** — reverse layout, accents `lilac`
   - `image`: `/images/ppc/ppc2.png`
8. **`Industries`** (§2.33)
9. **`StrategicBlueprintSection`** (§2.11) — uses default 4 steps (Define Vertical → Connect Phone → Calls Flow → Scale at Will)
10. **`CaseStudyStrip`** (§2.17) — 3 case studies
    - Provide: `title`, `description`, optional `image` for each — currently: Solar Growth, Legal Scale, Tech Innovate
11. **`ServiceCapabilitiesGateway`** — links to 3 sub-routes (Consumer-Initiated, Live Transfer, Offline Media). Confirm card labels, summaries (80–160 chars each), CTA labels.
12. **`FAQ`** (§2.25) — 6 items currently. Revise or confirm.
13. **`ConsultationCTA`** (§2.26)
    - `category`: "pay-per-call"
    - `title`: "Apply for Call Capacity"
    - `subtitle`, `features` (3 items), `tagline`, `submitLabel` — confirm
14. **`StickyCTA`** — title, ctaText, href

---

### 3.2 Pay Per Call → Consumer-Initiated — `/services/pay-per-call/consumer-initiated`

**SEO metadata**: title, description, canonical, OG image, keywords.

**Sections in order**:

1. **`CallLogicBanner`** (§2.4) — accent `sky`, bgVariant `search_social`
2. **`CallProcessFlow`** (§2.28) — 3 steps (Signal capture → Qualification layer → Routing + attribution). Each step needs title + description + 3 techNotes.
3. **`CallAdvantagesGrid`** (§2.29) — 3 advantage cards.
4. **`DataDrivenFeaturesGrid`** (§2.30) — uses `DEFAULT_DATA_DRIVEN_FEATURES`. Override if you want bespoke features.
5. **`StandardVsOptimizedMicroCard`** (§2.31) — accent `sky`, 3 bullets per column.
6. **`FAQ`** — 4 items.
7. **`ConsultationCTA`** — category `pay-per-call`, 3 features, detailed form.

---

### 3.3 Pay Per Call → Live Transfer — `/services/pay-per-call/live-transfer`

Same section structure as 3.2 with:
- `CallLogicBanner` accent `mint`, bgVariant `live_transfer`
- Different titles/copy throughout (current copy good)
- FAQ topics: verification, hours/coverage, TCPA, fallback behaviour

---

### 3.4 Pay Per Call → Offline Media — `/services/pay-per-call/offline-media`

Same structure with:
- `CallLogicBanner` accent `peach`, bgVariant `offline_media`
- FAQ topics: tracking numbers, attribution depth, provisioning speed, dayparting

---

### 3.5 Pay Per Lead hub — `/services/pay-per-lead`

**Sections in order**:

1. **`HeroSection`** — title "Pay Per Lead", subtitle, CTA "Get Lead Pricing", `backgroundImage` (replace placeholder)
2. **`IndustryTrustSlider`**
3. **`ROICalculatorSection`** mode `lead`
4. **`ValuePropositionSection`** — content lives in `components/sections/services/pay-per-lead/content.ts` (`VALUE_CARDS`, `TRANSFORMATION_PAIRS`)
5. **`TransformationComparisonSection`** — content from `BEFORE_ITEMS`, `AFTER_ITEMS`, `STATS`
6. **`ImageContentSplit` #1** — kicker "Real-Time Delivery", `/images/ppl/ppl1.png`
7. **`ImageContentSplit` #2** — kicker "Verified Intent", `/images/ppc/ppc2.png`
8. **`Industries`**
9. **`StrategicBlueprintSection`** — `BLUEPRINT_STEPS` (Define Vertical → Specify Criteria → Connect Delivery → Scale at Will)
10. **`CaseStudyStrip`** — 3 case studies (`CASE_STUDIES`): Insurance Scale, Legal Intake, Solar Pipeline
11. **`ServiceCapabilitiesGateway`** — 3 sub-routes (Exclusive, Shared, Real-Time)
12. **`FAQ`** — 6 items (`FAQS`)
13. **`ConsultationCTA`** — `category: 'pay-per-lead'`, features from `CONSULTATION_FEATURES`
14. **`StickyCTA`**

> **Image needed**: `/public/images/ppl/ppl2.png` is referenced in the codebase as `/images/ppc/ppc2.png` (reused). If you want a distinct PPL image, supply it at 1200×1200+.

---

### 3.6 Pay Per Lead → Exclusive — `/services/pay-per-lead/exclusive`

Same structure as PPC sub-routes:
1. `CallLogicBanner` — accent `lilac`, bgVariant `search_social`
2. `CallProcessFlow` — 3 steps (Intent capture → Exclusive qualification → Direct delivery)
3. `CallAdvantagesGrid` — 3 advantages (full ownership, higher close-rate, controlled quality)
4. `DataDrivenFeaturesGrid` — 6 custom features (`EXCLUSIVE_FEATURES`)
5. `StandardVsOptimizedMicroCard`
6. `FAQ` — 4 items
7. `ConsultationCTA` — `sourcePage: 'exclusive'`, `submitLabel: 'Secure My Exclusive Leads'`

---

### 3.7 Pay Per Lead → Shared — `/services/pay-per-lead/shared`

Same shape with `mint` accent, `live_transfer` bgVariant, 6 `SHARED_FEATURES`, distribution-focused FAQ, `submitLabel: 'Secure My Shared Leads'`.

---

### 3.8 Pay Per Lead → Real-Time — `/services/pay-per-lead/real-time`

Same shape with `sky` accent, `search_social` bgVariant, 6 `REAL_TIME_FEATURES`, integration/latency-focused FAQ, `submitLabel: 'Secure My Real-Time Lead Flow'`.

---

### 3.9 Digital Marketing hub — `/services/digital-marketing`

**Sections in order**:

1. **`HeroSection`** — title "Digital Marketing", subtitle (~250 chars), CTA "Book a Growth Strategy Session", `backgroundImage` (replace Unsplash placeholder)
2. **Trust strip** — In-page section
   - Sub-headline: "Trusted by data-driven teams"
   - 6 platform logos (Apple, Google, Facebook/Meta, Twitter/X, Slack, WhatsApp) — currently from `/public/icons/`
   - 3 trust indicator cards (from `TRUST_INDICATORS` constant) — each `{ title, description, icon }`
3. **`ServiceCapabilitiesGateway`** — 4 sub-route cards (SEO, PPC, Email, Social) — see `DIGITAL_MARKETING_SERVICE_NAV` in `lib/data/service-navigation.ts`. Confirm labels + summaries.
4. **`DigitalMarketingPillarsSection`** (§2.34) — 4 pillars (`PILLARS`): Authority, Precision, Retention, Signal. Each ~140 chars.
5. **`DigitalMarketingGrowthMatrixSection`** (§2.35) — `GROWTH_SPRINT_STEPS` (4 steps).
6. **`IntegratedSuccessBlueprintsSection`** (§2.36) — `INTEGRATED_SUCCESS_BLUEPRINTS`. Content is multi-pillar and structured — best handled jointly with dev team.
7. **In-page ROI heading** — eyebrow "ROI Modeling", headline (~60 chars), description (~180 chars). Currently: "Forecast Marketing Efficiency Before You Scale Spend".
8. **`ROICalculatorSection`** mode `marketing`
9. **`CaseStudyStrip`** — `CASE_STUDIES` (3 items)
10. **`FAQ`** — `FAQS` (~6 items)
11. **`ConsultationCTA`** — `category: 'digital-marketing'`, features from `CONSULTATION_FEATURES`

---

### 3.10 Digital Marketing → SEO — `/services/digital-marketing/seo`

**Sections**:

1. **`SeoAuthorityHero`** (§2.37) — to change copy, supply: headline, deck, primary CTA label/href
2. **`SeoSearchEvolutionSection`** — content baked in. Supply changes via dev team.
3. **`DigitalMarketingPillarsSection`** — `SEO_PILLARS` + `SEO_PILLAR_PROOF_ITEMS`. Supply per-pillar copy if you want to change.
4. **`DigitalMarketingGrowthMatrixSection`** — 4 SEO growth steps. Each: title (2–3 words), description (160–280 chars), tagline (week label).
5. **`ConsultationCTA`** — 3 features (currently: Technical Health Assessment, Authority Content Roadmap, Revenue-Aligned KPIs). category `digital-marketing`.

---

### 3.11 Digital Marketing → PPC — `/services/digital-marketing/ppc`

Same shape as SEO with:
- `PpcPerformanceHero`
- `PpcSpendEvolutionSection`
- `PPC_PILLARS` + `PPC_PILLAR_PROOF_ITEMS`
- 4 PPC growth steps (Account Forensics → Control Framework → Creative Tests → Profit-First Scaling)
- 3 consultation features (Channel Audit, Testing & Bidding Plan, Pipeline KPIs)

---

### 3.12 Digital Marketing → Email — `/services/digital-marketing/email`

- `EmailRetentionHero`
- `EmailRoiEvolutionSection`
- `EMAIL_PILLARS` + `EMAIL_PILLAR_PROOF_ITEMS`
- 4 email growth steps (Lifecycle Audit → Segmentation Blueprint → Sequence Testing → Retention Scale)
- 3 features (Retention Opportunity Mapping, Automation Sequence Planning, Revenue-Linked Measurement)

---

### 3.13 Digital Marketing → Social — `/services/digital-marketing/social`

- `SocialSignalHero`
- `SocialSignalEvolutionSection`
- `SOCIAL_PILLARS` + `SOCIAL_PILLAR_PROOF_ITEMS`
- 4 social growth steps (Signal Audit → Content System → Format & Creative Testing → Demand Acceleration)
- 3 features (Channel Strategy, Content & Offer, Engagement-to-Pipeline)

---

### 3.14 Web Development hub — `/services/web-dev`

**Sections in order**:

1. **`WebDevHero`** — custom hero in `app/services/web-dev/_components/WebDevHero.tsx`. To change copy, supply: title, subtitle, primary/secondary CTAs, supporting media. Treat like §2.37.
2. **`TrustBanner`** (§2.22)
3. **`PremiumServicesGrid`** — content baked in. Provide 4–6 service tiles if rebranding: `{ title (3–6 words), description (140–240 chars), icon (Lucide), accent }`.
4. **`IndustryExpertiseSection`** — currently shows ~10 industries with metrics. Supply per-industry: `{ name, icon: Lucide, stats?: { label, value }[], description (≤ 120 chars) }`.
5. **`ResultsShowcase`** (§2.23) — 4 metric cards
6. **`ServiceCapabilitiesGateway`** — 4 web-dev sub-routes (Full-Stack, Business, Ecommerce, Landing Pages) — `WEB_DEV_SERVICE_NAV`
7. **`ProcessSteps`** — 4 steps (Discovery → Architecture → Development → Launch). Variant `cards`.
8. **`IntegrationLogos`** — currently no integrations passed (defaults). Provide if you want a logo grid.
9. **`CaseStudyStrip`** — 3 case studies. Each: `client`, `industry`, `problem`, `solution`, `outcome`, optional metrics (2 items: `{ label, value }`)
10. **`TestimonialsSection`** — variant `featured`. Provide 3–6 testimonials.
11. **`FAQSection`** — 4 items
12. **`ConsultationCTA`** — `category: 'web-dev'`, bullets (legacy)
13. **`StickyCTA`**

---

### 3.15 Web Dev → Full-Stack — `/services/web-dev/full-stack`

**Sections**:

1. **`ServiceHero`** (§2.2) with `HERO_CONTENT`:
   - `pill`, `eyebrow`, `title`, `subtitle`, 3 `features`, `stat { value, label }`, `primaryCta`, `secondaryCta`, `footnote`, `media { src, alt, caption }`
2. **`ClientSuccessBreakdown`** (§2.19) — 3 `SUCCESS_OUTCOMES`
3. **`ProcessSteps`** — 4 steps
4. **`IntegrationLogos`** — 12 integrations: `{ name, category }` (Stripe, Twilio, SendGrid, Auth0, HubSpot, Salesforce, Shopify, Datadog, Segment, Sentry, Vercel, AWS)
5. **`DeliverablesSection`** (§2.20) — 4 deliverables + 4 standards
6. **`CaseStudyStrip`** — case studies
7. **`FAQSection`** — FAQ items
8. **`ConsultationCTA`** — `category: 'web-dev'`

---

### 3.16 Web Dev → Business — `/services/web-dev/business`

Same pattern (ServiceHero + ClientSuccessBreakdown + ProcessSteps + CaseStudyStrip + FAQSection + ConsultationCTA). Confirm:
- Hero copy (CMS / lead gen positioning)
- 3 outcomes (different metrics)
- 4 process steps
- 3 case studies
- ~5 FAQ items

---

### 3.17 Web Dev → Ecommerce — `/services/web-dev/ecommerce`

Same pattern + `IntegrationLogos` with 8–12 ecommerce-specific integrations (Stripe, Shopify, Klaviyo, etc.).

---

### 3.18 Web Dev → Landing Page — `/services/web-dev/landing-page`

Same as 3.16 with landing-page positioning.

---

### 3.19 CMS hub — `/services/cms`

**Sections** (mirrors web-dev hub structure):

1. **`ServiceHero`** with `HERO_CONTENT` (pill "CMS Development", title "Content systems built for editorial teams and growth", variant `asymmetric`)
2. **`TrustBanner`**
3. **`PremiumServicesGrid`**
4. **`IndustryExpertiseSection`**
5. **`ResultsShowcase`**
6. **`ServiceCapabilitiesGateway`** — 4 CMS sub-routes (WordPress, Drupal, Content Hub, Wix Studio)
7. **`ProcessSteps`** — 4 steps (Platform Assessment, Architecture, Build & Integrate, Launch & Operate)
8. **`IntegrationLogos`**
9. **`CaseStudyStrip`**
10. **`TestimonialsSection`**
11. **`FAQSection`**
12. **`ConsultationCTA`** — `category: 'cms'`

**OG metadata**: ensure `/images/slider/slider-1.jpg` is the canonical OG image (1200×630 crop).

---

### 3.20 CMS → WordPress / Drupal / Content Hub / Wix Studio — `/services/cms/*`

Each sub-route uses the same pattern: `ServiceHero` + `ClientSuccessBreakdown` + `ProcessSteps` + `IntegrationLogos` (where applicable) + `CaseStudyStrip` + `FAQSection` + `ConsultationCTA`. For each sub-page provide:

- `HERO_CONTENT` per §2.2 (variant `asymmetric`)
- 3 SUCCESS_OUTCOMES with platform-specific metrics
- 4 PROCESS_STEPS
- 8–12 integration logos (WordPress: WooCommerce, Yoast, Gravity Forms, etc.; Drupal: Acquia, Pantheon, etc.; Content Hub: Contentful, Sanity, Strapi, etc.; Wix Studio: Wix App Market, Velo, etc.)
- 3 CASE_STUDIES
- 4–6 FAQ_ITEMS

---

### 3.21 App Development hub — `/services/app-dev`

Same shape as Web Dev hub:

1. `ServiceHero` (`HERO_CONTENT`, variant `asymmetric`, pill "App Development")
2. `TrustBanner`
3. `PremiumServicesGrid`
4. `IndustryExpertiseSection`
5. `ResultsShowcase`
6. `ServiceCapabilitiesGateway` — 3 sub-routes (iOS, Android, Cross-Platform)
7. `ProcessSteps` — 4 steps (Discovery, Design & Architecture, Development & Integration, Launch & Optimization)
8. `IntegrationLogos`
9. `CaseStudyStrip`
10. `TestimonialsSection`
11. `FAQSection`
12. `ConsultationCTA` — `category: 'app-dev'`

---

### 3.22 App Dev → iOS / Android / Cross-Platform — `/services/app-dev/*`

Same pattern: `ServiceHero` + `ClientSuccessBreakdown` + `TimelineSteps` (or `ProcessSteps`) + `CaseStudyStrip` + `FAQSection` + `ConsultationCTA`. Provide platform-specific copy.

---

### 3.23 Graphics Design — `/services/graphics-design`

**Sections in order**:

1. **`KineticHero`** (§2.3) — stickerKind `design`, accentColour from `_data/graphics-design-content.ts`
2. **`ClientsMarqueeStrip`** (uses logos from §1.5)
3. **`CapabilitiesBento`** (§2.6) — 6 tiles
4. **Disciplines marquee** — pass `MARQUEE_DISCIPLINES` (8 single-word tokens)
5. **`WorkMosaic`** (§2.7) — 9 pieces (currently placeholder mode)
6. **`StrategicBlueprintSection`** — 4 process phases
7. **`ImageContentSplit` #1** — kicker accent `sky`, image `/images/ppc/ppc1.png`
8. **`ImageContentSplit` #2** — reverse, lilac, image `/images/ppc/ppc2.png`
9. **`DesignPrinciples`** (§2.8) — 3 principles
10. **`EngagementTiers`** (§2.9) — 2 tiers (Launch sprint / Ongoing partner)
11. **`TestimonialsSection`** — 3 testimonials
12. **`CrossLinkBand`** (§2.10) — links to `/services/pay-per-call`
13. **`FAQ`** — 6 items
14. **`ConsultationCTA`** — `category: 'graphics-design'`
15. **`StickyCTA`**

All copy lives in `app/services/graphics-design/_data/graphics-design-content.ts` — provide replacements field-by-field if revising.

---

### 3.24 Podcast Marketing — `/services/podcast-marketing`

Same structure as Graphics Design with:
- `KineticHero` stickerKind `audio`, with `nowPlaying` chip
- 6 capability tiles (Strategy, Production, Distribution, Clips, Sponsorships, Sales enablement)
- Work mosaic: shows (placeholder)
- CrossLinkBand → `/services/graphics-design`
- ConsultationCTA `category: 'podcast-marketing'`

Content file: `app/services/podcast-marketing/_data/podcast-marketing-content.ts`.

---

### 3.25 Video Editing — `/services/video-editing` (just shipped)

Same structure with:
- `KineticHero` stickerKind `video`, `nowPlaying` chip ("Now editing")
- 6 capability tiles (Short-form ad cuts, UGC, Hook engineering, Motion graphics, Long-form repurposing, Sales-enablement)
- 9 placeholder reel tiles
- CrossLinkBand → `/services/podcast-marketing`
- ConsultationCTA `category: 'video-editing'`

Content file: `app/services/video-editing/_data/video-editing-content.ts`. Currently uses drafted copy — confirm or revise. Reuses `/images/ppc/ppc1.png` and `/images/ppc/ppc2.png` for the two stories — supply dedicated 1200×1200 video-themed images if available.

---

### 3.26 About → Why Us — `/about/why-us`

Content file: `app/about/why-us/_data/why-us-content.ts`. Provides:

- `WHY_US_SERVICE_CHIPS` — 4 short labels (≤ 24 chars each)
- `WHY_US_PILLARS` — 4 pillars `{ title, description (160–280 chars), icon, accent }`
- `WHY_US_COMPARISON_ROWS` — comparison rows (typical vs core-closer)
- `WHY_US_PROCESS_STEPS` — process steps
- `WHY_US_COMPLIANCE_ITEMS` — compliance badges
- `WHY_US_TESTIMONIALS` — 3 testimonials
- `WHY_US_FAQS` — 5–6 FAQ items
- `whyUsJsonLd` — service schema (auto-generated from above)

**Page-level metadata** — title, description, OG image.

---

### 3.27 About → Team — `/about/team`

Content file: `app/about/team/_data/team-content.ts`.

- `TEAM_TRUST_PILLS` — 3 short pills
- `TEAM_MEMBERS` — 6 members `{ name, role, department, bio (180–280 chars), linkedinHref (or `#` for placeholder), accent }`
- `TEAM_DEPARTMENTS` — 5 departments `{ name, description (140–220 chars), href, accent, points (3 items ≤ 36 chars) }`
- `TEAM_VALUES` — 4 values `{ title (2–4 words), description (120–200 chars), icon (`Target`/`BarChart3`/`ShieldCheck`/`Zap`), accent }`

**Image needed**: 6 headshots (≥ 600×600 square, JPG, neutral background). Currently using initials placeholders.

---

### 3.28 About → Clients — `/about/clients`

Content file: `app/about/clients/_data/clients-content.ts`.

- `INDUSTRIES` — industry groups with embedded `clients: ClientBrand[]` (logo file names)
- `HERO_PREVIEW_LOGOS` — subset for hero
- `HERO_COPY` — hero copy block
- `STATS` — metric stats
- `PARTNERSHIP_PRINCIPLES` — 3 principles
- `CROSS_LINK` — cross-link to another page
- `CTA_COPY` — bottom CTA
- `clientsJsonLd` — schema markup

**Image needed**: All client logos referenced by `INDUSTRIES[*].clients[*]`. PNG/SVG transparent, ≥ 200px wide.

---

### 3.29 About → Portfolio — `/about/portfolio`

Content file: `app/about/portfolio/_data/portfolio-content.ts`.

- `PORTFOLIO_TRUST_PILLS` (4 items)
- `PORTFOLIO_SERVICE_CHIPS` (6 items)
- `PORTFOLIO_PROOF_STATS` (3–4 metric items)
- `PORTFOLIO_PHILOSOPHY_CARDS` (3 items)
- `PORTFOLIO_CAPABILITIES` (6 items)
- `PORTFOLIO_OUTCOME_CARDS` (3 items)
- `PORTFOLIO_FAQS` (5–6 items)
- `PORTFOLIO_TESTIMONIALS` (3 items)

---

### 3.30 About → Testimonials — `/about/testimonials`

Content file: `app/about/testimonials/_data/testimonials-content.ts`.

- `TESTIMONIAL_STATS` — overview metrics
- `INDUSTRY_FILTERS` — filter chips (e.g. all/insurance/legal/home services/healthcare/financial/solar)
- `TESTIMONIALS` — 30+ testimonial records (current). Each: `{ quote, author, role, company, industry, rating, highlight, avatar?, detailedStory? }`
- `FEATURED_TESTIMONIALS` — derived
- `TESTIMONIAL_FAQS` — 4–5 FAQ items
- `TESTIMONIALS_CROSS_LINKS` — related-content cards

**Image needed**: headshots for the testimonials that include them (square ≥ 256×256).

---

### 3.31 Hire Call Center — `/hire-call-center`

**Sections in order**:

1. **`ServiceHero`** (§2.2) — supply: pill "Hire a Call Center", eyebrow "Inbound + Outbound Operations", title, subtitle, features (4 items), stat, primary CTA "Book Free Consultation", secondary CTA "Call +1 (855) 330-2777" (`tel:` link), `media` (currently Unsplash placeholder — replace with brand image)
2. **`AudienceFitSection`** (in `_components`) — confirm copy in `app/hire-call-center/_components/audience-fit-section.tsx`
3. **`ServicesBreakdown`** (in `_components`) — confirm copy
4. **`ValuePropositionSection`** — uses `VALUE_CARDS` + `TRANSFORMATION_PAIRS` from `_data/page-content.ts`
5. **`TransformationComparisonSection`** — uses `BEFORE_ITEMS`, `AFTER_ITEMS`, `TRANSFORMATION_STATS`
6. **`WhyChooseUs`** (in `_components`)
7. **`ProcessSteps`** — `processSteps` from `_data/process.ts`
8. **`PricingSection`** (in `_components`) — currently confirm pricing tiers
9. **`ServiceCapabilitiesGateway`** — uses `HIRE_SERVICE_CARDS` from `_data/page-content.ts` (3 cards)
10. **`CaseStudyStrip`** — `CASE_STUDY_ITEMS`
11. **`Testimonials`** (landing-style component) — reuses home testimonials
12. **`FAQ`** — `faqs` from `_data/faq.ts`
13. **`ConsultationCTA`** — `category: 'hire-call-center'`, with `urgencyBadge: 'Prefer to talk now? Call +1 (855) 330-2777'`

All data lives under `app/hire-call-center/_data/`. Update field-by-field.

---

### 3.32 Advertiser Signup — `/advertiser-signup`

**Sections in order**:

1. **Left column** (sticky):
   - `h1`: "Advertiser Signup" (current — confirm)
   - intro `subtitle` (~200 chars)
   - Two-paragraph supporting copy
   - 4 benefit bullets:
     - "Highest quality leads vetted 24/7."
     - "Robust compliance and anti-fraud technology (FraudBlock™)."
     - "Proprietary tracking and reporting software."
     - "Dedicated Account Management Team."
2. **Right column — `AdvertiserSignupForm`** (in `_components/advertiserSignupForm.tsx`). The form collects:

   | Field | Required | Type |
   |---|---|---|
   | Name | Yes | text |
   | Company Name | Yes | text |
   | Company Website | Yes | url |
   | Email Address | Yes | email |
   | IM Type | Yes | select (provide options) |
   | Screen Name | Yes | text |
   | Country | Yes | select |
   | City | Yes | text |
   | Address | Yes | text |
   | Zip / Postal Code | Yes | text |
   | Phone Number | Yes | phone input (international) |
   | Market niche(s) | Yes | multi-select (provide options) |
   | Top vertical | Yes | select (provide options) |
   | Product name(s) | Yes | text |
   | Traffic types | Yes | multi-select (provide options) |
   | Other marketing companies | No | text |

Provide the dropdown option lists for IM Type, Country, Market niches, Top vertical, Traffic types. Currently hardcoded in the form file.

---

### 3.33 Contact — `/contact`

Content file: `components/sections/contact/contact-data.ts`.

**Sections in order**:

1. **`ContactHero`** — uses `CONTACT_HERO_FEATURES` (3 items: title 3–6 words, description 120–200 chars) and `CONTACT_TRUST_POINTS` (3 short bullets)
2. **`ContactMultiStepForm`** — 4-step form collecting:

   | Step | Field | Required | Type |
   |---|---|---|---|
   | 1. About you | Full name | Yes | text |
   |  | Work email | Yes | email |
   |  | Phone | Yes | phone |
   |  | Company | Yes | text |
   |  | Preferred contact method | Yes | enum (Email / Phone / Zoom / WhatsApp) |
   | 2. Service interest | Service category | Yes | enum — populated from navbar Services (Pay Per Call / Pay Per Lead / Digital Marketing / Web & App Development) |
   |  | Service detail | Yes | enum — populated from sub-routes of chosen category |
   | 3. Project context | Business website | No | url |
   |  | Company size | Yes | enum (`CONTACT_COMPANY_SIZE_OPTIONS`) |
   |  | Monthly budget | Yes | enum (`CONTACT_BUDGET_OPTIONS`) |
   |  | Target regions | No | text |
   | 4. Schedule | Desired date | No | date picker |
   |  | Preferred meeting window | No | enum (`CONTACT_MEETING_WINDOW_OPTIONS`) |
   |  | Timezone | No | text |
   |  | Additional context | No | textarea |
   |  | Consent | Yes | checkbox |

3. **"What to Expect" section** (in `page.tsx`)
   - Eyebrow: "What To Expect"
   - Headline: "Everything is Built for Clear Next Steps"
   - Sub-description: 100–200 chars
   - 3 reassurance cards (`CONTACT_REASSURANCE_ITEMS`): question + answer
4. **`ContactWorldMapSection`** — uses `CONTACT_WORLD_MAP_DOTS` (geo coordinate pairs for the animated map; currently 6 pairs — NY↔London, Miami↔Berlin, etc.)

---

### 3.34 Blogs — `/blogs` & `/blogs/[slug]`

Powered by the blog API (`lib/api/blogs.ts`). The boss should provide:

**Per blog post**:

| Field | Required | Type | Notes |
|---|---|---|---|
| `title` | Yes | string (40–80 chars) | |
| `slug` | Yes | string (URL-safe, kebab-case) | |
| `excerpt` | No | string (140–240 chars) | Used on listing page and OG |
| `cover_image_url` | No | image URL | 16:9, ≥ 1200×675 |
| `published_at` | Yes | ISO date | |
| `author` | Yes | string | |
| `category` | No | string | |
| `tags` | No | string[] | |
| `content_blocks` | Yes | rich block JSON (paragraphs / headings / images / quotes / lists / embeds) | See `components/domains/blog/BlockRenderer.tsx` for supported block types |
| `meta.title` | No | ≤ 60 chars | Override page title |
| `meta.description` | No | 140–240 chars | Override page description |

**Listing page**:
- Hero headline: "Blog" (current)
- Hero sub: "Practical insights on lead generation, performance marketing, and scaling customer acquisition." (current — confirm)

---

### 3.35 Legal pages — `/legal/privacy-policy`, `/legal/terms-of-service`, `/legal/cookie-policy`, `/legal/gdpr-compliance`

All four powered by `app/legal/data.ts`. Each policy is `{ title, lastUpdated, intro, sections: { id, title, content: string[], list?: string[] }[] }`.

The boss should supply the actual legal text — these documents currently use placeholder body content. Required from legal/compliance team:

- Privacy Policy (typical sections: Information We Collect, How We Use, Sharing, Security, Your Rights, Cookies, Children, International, Updates, Contact)
- Terms of Service (Acceptance, Services Description, Account, Acceptable Use, Payment, IP, Disclaimers, Limitation of Liability, Termination, Governing Law, Contact)
- Cookie Policy
- GDPR Compliance statement

Also confirm "Last updated" date.

---

## 4. Image asset summary

Consolidated list of every image path referenced anywhere in the site. Items marked 🆕 need brand-owned replacements.

| Path | Used by | Spec | Current state |
|---|---|---|---|
| `/public/logo.png` | Navbar, footer | PNG/SVG ≥ 512×512 | Present — confirm |
| `/public/favicon.ico` | Browser tab | ICO 16/32 | Present |
| `/public/apple-icon.png` | iOS home screen | PNG 180×180 | Present |
| `/public/web-app-manifest-{192,512}x{192,512}.png` | PWA | PNG square | Present |
| `/public/icon0.svg`, `/public/icon1.png` | Theme variants | SVG / PNG ≥ 256×256 | Present |
| `/public/clients/logo_*.png` | Client marquee (home, about/clients) | PNG/SVG transparent ≥ 200 px wide | 30+ logos present — confirm rights |
| `/public/images/slider/slider-1.jpg` | CMS hub, App Dev hub heroes (OG image), other ServiceHero pages | JPG ≥ 1600×1100 | Present — confirm or replace |
| `/public/images/slider/slider-2.jpg` | Web Dev hub hero media | JPG ≥ 1600×1100 | Present |
| `/public/images/slider/slider-3.jpg` … `slider-9.{webp,png}` | Reserved for ServiceHero across sub-routes | JPG/WebP/PNG ≥ 1600×1100 | Present |
| `/public/images/ppc/ppc1.png` | PPC hub ImageContentSplit #1, Graphics story #1, Podcast story #1, Video story #1 | PNG/JPG ≥ 1200×1200 | Placeholder 🆕 |
| `/public/images/ppc/ppc2.png` | PPC hub ImageContentSplit #2, PPL hub ImageContentSplit #2, Graphics story #2, Podcast story #2, Video story #2 | PNG/JPG ≥ 1200×1200 | Placeholder 🆕 |
| `/public/images/ppc/ppc.png` | (older asset) | — | Present, currently unreferenced |
| `/public/images/ppl/ppl1.png` | PPL hub ImageContentSplit #1 | PNG/JPG ≥ 1200×1200 | Placeholder 🆕 |
| `/public/icons/apple.svg`, `google.svg`, `facebook.svg`, `twitter.svg`, `slack.svg`, `whatsapp.svg` | Digital Marketing hub trust strip | SVG ≥ 48×48 | Present |
| External Unsplash URL on PPC hub `HeroSection.backgroundImage` | PPC hub hero bg | 1600×1000+ JPG/WebP | 🆕 **must replace** — currently hot-linking Unsplash |
| External Unsplash URL on PPL hub `HeroSection.backgroundImage` | PPL hub hero bg | 1600×1000+ JPG/WebP | 🆕 **must replace** |
| External Unsplash URL on Digital Marketing hub `HeroSection.backgroundImage` | DM hub hero bg | 1600×1000+ JPG/WebP | 🆕 **must replace** |
| External Unsplash URL on Hire Call Center `ServiceHero.media.src` | HCC hero | 1600×1100+ JPG/WebP | 🆕 **must replace** |
| Headshots for `TEAM_MEMBERS` | About → Team | Square ≥ 600×600 | 🆕 — currently initials |
| Avatars for `TESTIMONIALS` | About → Testimonials, home Testimonials, Hire Call Center | Square ≥ 256×256 | 🆕 — optional but recommended |
| Blog cover images | `/blogs` listing, `/blogs/[slug]` | 16:9 ≥ 1200×675 JPG/WebP | Supplied per post |
| WorkMosaic real images (Graphics / Podcast / Video) | Service pages | Per §2.7 spec | 🆕 — currently placeholder mode |
| Case study images (optional) | All `CaseStudyStrip` instances | ≥ 1000×750 | 🆕 — currently styled accent tiles |

**Action summary**: at minimum, replace the four Unsplash-hosted hero backgrounds, supply two `/images/ppc/*.png` brand images for the split sections, supply `/images/ppl/ppl2.png` if a distinct PPL second image is wanted, and provide the six team headshots. Everything else is "improve when content is ready".

---

## 5. Writing guidance (tone of voice)

The site currently uses a consistent operator-led voice. If you want to maintain that, copy should:

- **Lead with the outcome, not the process.** "Pay only for qualified inbound calls" beats "We provide pay-per-call services."
- **Use specific numbers when honest.** "CPM dropped 28%" lands harder than "significantly improved CPM."
- **Treat the reader as a peer operator.** They are a marketer, founder, or growth lead — not a procurement officer. Use "your media plan", "your ad sets", "your CRM".
- **Avoid agency clichés.** No "synergy", "best-in-class", "world-class", "cutting-edge". Be concrete.
- **Three-bullet rhythm.** Most sections that take bullets use exactly 3 items. Keep it tight.
- **Short headlines, long decks.** Headlines = 30–80 chars. Decks = 140–280 chars.
- **One CTA per section.** Primary action is "/contact". A secondary "see the framework" / "view the reel" is fine.

When in doubt, mirror the voice already shipped on `/services/podcast-marketing` or `/services/video-editing` — those two pages are the most current reference for site tone.

---

## How to deliver content back

For each page, send back either:

1. A direct edit to the per-page content file under `apps/web/app/<route>/_data/` (the dev team can apply if you provide raw values), **or**
2. A spreadsheet / doc with one row per field, using the field names exactly as they appear in this document.

Images should be delivered as a separate folder mirroring the public asset paths (e.g. `images/ppc/ppc1.png`, `clients/logo_<brand>.png`) so they can be dropped in without renaming.

If a field is not provided, the current copy will remain in place.
