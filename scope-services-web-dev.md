## Web Development Services Scope & Plan

This document defines the scope, structure, and implementation plan for all **Web Development** service pages under the `Services` section:

- `Web Development` overview (parent) – `/services/web-dev`
- `Full-Stack Development` – `/services/web-dev/full-stack`
- `Business Websites` – `/services/web-dev/business`
- `Ecommerce Websites` – `/services/web-dev/ecommerce`
- `Landing Pages` – `/services/web-dev/landing-page`

The plan is optimized for:

- **Maximum organic SEO** (search intent coverage, internal linking, schema, content depth)
- **Maximum performance** (prefer SSG / ISR, minimal client JS, good Core Web Vitals)
- **High trust and B2B credibility**, following the workspace rules (neutral, data-driven, no decorative fluff)

Reference patterns from:

- [Vivasoft – Top Custom Software Development Company](https://vivasoftltd.com/)
- [TekRevol – Web Development](https://www.tekrevol.com/web-development)
- Additional competitive research (USA, Canada, Bangladesh, Australia-based agencies)
- Rendering strategy guidance:
  - [CSR vs SSR vs SSG vs ISR – Deep Dive](https://dev.to/yugjadvani/csr-vs-ssr-vs-ssg-vs-isr-a-deep-dive-for-modern-web-development-33kl)
  - [Next.js SEO – Rendering Strategies](https://nextjs.org/learn/seo/rendering-strategies)

---

## 1. Global Strategy (Applies to All Web Dev Pages)

### 1.1 Rendering & Performance

- **Primary strategy**: **Static Site Generation (SSG)** with **Incremental Static Regeneration (ISR)** for all service pages:
  - Pre-render HTML at build time for **fast TTFB and crawlability**.
  - Use `revalidate` to allow content updates without full rebuilds.
- Use **Server Components** wherever possible (if using modern Next.js app router) to:
  - Minimize client bundle size.
  - Keep logic and data fetching on the server.
- Reserve **Client-Side Rendering (CSR)** only for:
  - Interactive elements (pricing toggles, FAQ accordions, calculators, forms enhancement).
  - Non-critical UI flourishes that don’t affect SEO-critical content.
- **Core Web Vitals** focus:
  - Inline critical CSS where appropriate; otherwise rely on framework-level optimization.
  - Optimize images (Next Image, AVIF/WebP, proper sizing).
  - Avoid layout shifts (fixed heights, proper skeletons if needed).

### 1.2 SEO Foundations

- **URL structure**: Use the already defined, clean, keyword-supportive paths:
  - `/services/web-dev`
  - `/services/web-dev/full-stack`
  - `/services/web-dev/business`
  - `/services/web-dev/ecommerce`
  - `/services/web-dev/landing-page`
- **Per-page SEO elements**:
  - Unique `<title>` (with primary keyword + brand).
  - Unique meta description (keyword + value prop, ~140–160 chars).
  - One clear `<h1>` with main keyword; logical `h2`/`h3` structure.
- **Content strategy**:
  - Each page targets a **primary intent** (e.g. “full stack web development services”, “business website development agency”, etc.).
  - 900–1,600 words of **high-quality, highly-structured** content per key page, broken into scannable sections.
- **Schema & SERP**:
  - Use `Organization` / `LocalBusiness` schema at site level (elsewhere).
  - Use `Service` schema for each service page (JSON-LD or appropriate Next.js pattern).
  - Use `FAQPage` schema where we have FAQ sections.
- **Internal linking**:
  - From **homepage**, **Services megamenu**, and **footer** to these pages (already partly covered by `navigationData` and `footerData`).
  - Cross-link horizontally between related services (e.g. Landing Pages ↔ Paid Advertising; Ecommerce ↔ SEO).
  - Link from **case studies/blog posts** into relevant service pages to reinforce topical authority.

### 1.3 Shared Page Components

Across all Web Dev service pages, use a consistent set of **trust-first, neutral** components, inspired by sites like Vivasoft and TekRevol while respecting the workspace constraints:

- **Hero** (SEO-friendly, no decorative fluff)
  - Clear H1 focusing on the specific service.
  - Short supporting paragraph describing outcomes (not hype).
  - Primary CTA: **“Book a Free Consultation”**.
  - Secondary CTA: **“View Case Studies”** or **“View Pricing”**.

- **Trust Indicators**
  - Row of **grayscale client logos** (no heavy animations).
  - Small metrics panel:
    - e.g. “X+ custom web projects delivered”, “Average page load < Ys”, “Z industries served”.
  - Industry badges or compliance if available (e.g. GDPR-ready practices, security posture).

- **Process Overview**
  - 3–5 step flow (Discovery → Architecture → Implementation → QA → Launch/Support).
  - Step-based layout with short, factual descriptions.

- **Case Study / Example Results**
  - 2–3 compact cards following Problem → Solution → Outcome structure.
  - Focus on measurable outcomes (conversion uplift, load time improvements, SEO visibility).

- **Free Consultation Section (Global)**
  - Dedicated, repeated section used across web-dev pages:
    - Headline: “Plan Your Next Web Project With a Free Strategy Session”.
    - 2–3 bullets on what’s included (requirements review, tech stack guidance, rough budget range).
    - Short form (name, email, company, project type, budget range).

- **Pricing Preview**
  - Consistent pattern across pages, but **content tuned per service**:
    - 3–4 tiers **or** sample engagement models (e.g. “Starter Website”, “Growth Website”, “Custom Build”).
    - “From $X” style pricing (copy, not necessarily real numbers yet).
  - Visually a bit **fancier** but still minimal:
    - Subtle borders, soft shadows, restrained accent color for the “Recommended” / middle tier.
    - No heavy gradients or playful illustrations.

- **FAQ Section**
  - 5–8 common questions per page, tuned to the service.
  - Use an accessible accordion component (light CSR).
  - Marked up as `FAQPage` schema for extra SEO.

### 1.4 Component Inventory (Detailed)

This section refines the component inventory for implementation and keeps it **type-safe and predictable** when built in TypeScript/React.

- **`ServiceHero`**
  - **Purpose**: Introduce the service with a clear H1, value-focused subheading, and primary/secondary CTAs.
  - **Core props/content**:
    - `title` (string – H1 text)
    - `subtitle` (string – supporting copy, 1–3 short sentences)
    - `primaryCta` ({ label: string; href: string })
    - `secondaryCta?` ({ label: string; href: string })
    - `eyebrow?` (string – optional small label above title)
  - **Behavior**:
    - No background video or heavy animations.
    - Optional subtle entrance animation on text (CSS-only, reduced-motion aware).
  - **Used on**: All Web Dev pages (`/services/web-dev`, `/full-stack`, `/business`, `/ecommerce`, `/landing-page`).

- **`TrustStrip`**
  - **Purpose**: Show logos + concise metrics to build credibility without dominating the layout.
  - **Core props/content**:
    - `logos` (array of { name: string; src: string; alt: string })
    - `metrics?` (array of { label: string; value: string; helperText?: string })
  - **Behavior**:
    - Logos always rendered in grayscale; no hover zoom or rotation.
    - Layout wraps gracefully on mobile; max 4–6 logos visible per row.
  - **Used on**: All Web Dev pages, ideally near the top (below hero or after first content section).

- **`ProcessSteps`**
  - **Purpose**: Communicate the delivery process in 3–5 steps with clear inputs/outputs.
  - **Core props/content**:
    - `steps` (array of { title: string; description: string; icon?: ReactNode | string })
  - **Behavior**:
    - Steps displayed horizontally on desktop, vertically stacked on mobile.
    - Icons, if used, must be simple and semantic (no decorative metaphors).
  - **Used on**: Overview page and all detail pages, with service-specific steps.

- **`CaseStudyStrip`**
  - **Purpose**: Show 2–3 short case studies following Problem → Solution → Outcome.
  - **Core props/content**:
    - `items` (array of { client?: string; industry?: string; problem: string; solution: string; outcome: string; link?: string })
  - **Behavior**:
    - Text-first; avoid large imagery.
    - Optional “View case study” link for each card.
  - **Used on**: All Web Dev pages, but number and selection of items differ per page.

- **`PricingTable`**
  - **Purpose**: Present 3–4 pricing/engagement tiers in a concise, comparable layout.
  - **Core props/content**:
    - `plans` (array of { name: string; description?: string; priceLabel: string; features: string[]; isRecommended?: boolean; badge?: string })
    - `billingNote?` (string – e.g. “Custom quotes available for complex builds.”)
  - **Behavior**:
    - Highlight `isRecommended` plan via subtle border/shadow and background, not bright gradients.
    - Stack cards vertically on mobile; horizontal on desktop.
  - **Used on**: All four detailed Web Dev pages, with a lighter/summary version on the overview.

- **`FAQSection`**
  - **Purpose**: Address frequent objections and uncertainties while enabling `FAQPage` schema.
  - **Core props/content**:
    - `items` (array of { question: string; answer: string })
    - `heading?` (string)
  - **Behavior**:
    - Accessible accordion; keyboard operable and screen-reader friendly.
    - Optional default expansion of the first item on desktop only.
  - **Used on**: All Web Dev pages.

- **`FreeConsultationSection`**
  - **Purpose**: Drive discovery calls for all Web Dev services.
  - **Core props/content**:
    - `title` (string – context-specific, e.g. “Plan Your Next Web Project”)
    - `bullets` (string[] – 2–3 items describing what’s included)
    - `formVariant` (union type, e.g. `"short"` | `"detailed"`)
  - **Behavior**:
    - Uses the same form component site-wide for consistency and analytics.
    - Form validation is minimal but clear; inline error messages, ARIA attributes.
  - **Used on**: All Web Dev pages (one instance per page, usually mid or end).

- **`SecondaryNavTabs` / `ServiceSubnav` (optional)**
  - **Purpose**: Allow quick navigation between Web Dev sub-services.
  - **Core props/content**:
    - `items` (array of { label: string; href: string; isActive?: boolean })
  - **Behavior**:
    - Sticky-on-scroll on desktop only if it doesn’t conflict with global nav.
  - **Used on**: Overview and optionally on detail pages to move between `/full-stack`, `/business`, `/ecommerce`, `/landing-page`.

---

## 2. Information Architecture for Web Development

### 2.1 Overview Page – `/services/web-dev`

**Purpose:**
High-level Web Development hub that introduces all sub-services and routes traffic to the right detailed page. It should rank for broader intents like “web development services”, “web development agency” while passing authority to child pages.

**Primary keywords (conceptual):**

- web development services
- web development agency
- custom web development company

**Suggested structure:**

1. **Hero**
   - H1: “Web Development Services Built for Performance and Revenue”
   - Supporting copy: Focus on reliability, measurable outcomes, industries.
   - CTAs: “Book Free Consultation”, “Explore Web Development Services”.

2. **Who We Build For**
   - Brief segment outlining target clients (SaaS, B2B, lead-gen businesses, ecommerce, etc.).

3. **Service Overview Grid (Child Pages)**
   - Cards for:
     - Full-Stack Development
     - Business Websites
     - Ecommerce Websites
     - Landing Pages
   - Each card: 1–2 line description + “Learn more” linking to child route.

4. **Why Our Web Development Approach Works**
   - 3–4 columns: performance, SEO, maintainability, security.
   - Each with short, technical but accessible explanations.

5. **Tech Stack & Capabilities**
   - Bullet list of frameworks and tools (e.g. Next.js, React, Node.js, etc.), mirroring clarity seen on sites like Vivasoft and TekRevol.
   - Explain how tech choices are made (scalability, security, maintainability).

6. **Process Diagram (End-to-End)**
   - 4–5 step minimal diagram (no decorative illustrations).
   - Tie steps to deliverables (architecture doc, design prototypes, staging link, launch checklist).

7. **Selected Case Studies**
   - 2–3 cross-industry examples showcasing:
     - Performance improvements.
     - SEO growth (traffic/lead uplift where available).
     - Business outcomes (e.g. qualified leads, sales).

8. **Pricing & Engagement Models (High-Level)**
   - Present:
     - Fixed-scope projects (websites, ecommerce builds, landing page bundles).
     - Ongoing support/retainer.
   - Link to or preview deeper pricing sections on specific service pages.

9. **Free Consultation CTA**
   - Global shared component.

10. **FAQ**
   - General web development questions (timeline, process, ownership, hosting, etc.).

---

## 3. Full-Stack Development Page – `/services/web-dev/full-stack`

**Intent:**
Attract companies needing **end-to-end product or platform development**, where you handle architecture, frontend, backend, integrations, and scaling.

**Primary conceptual keywords:**

- full stack web development services
- full stack development company
- full stack developers for hire

**Sections:**

1. **Hero**
   - H1: “Full-Stack Web Development for End-to-End Delivery”
   - Short copy on owning everything from architecture to deployment.
   - Primary CTA: “Discuss Your Full-Stack Project”.

2. **When Full-Stack Makes Sense**
   - Bullet scenarios: greenfield SaaS, complex workflows, multi-system integrations, etc.

3. **Architecture & Stack Choices**
   - Explain how you choose stacks (performance, team familiarity, ecosystem, long-term cost).
   - Mention core stacks you’re comfortable with.

4. **Front-End & Back-End Responsibilities**
   - Two-column layout:
     - Frontend: UX, accessibility, responsiveness, performance budgets.
     - Backend: APIs, security, data modeling, scaling strategies.

5. **Integrations & Data Flows**
   - Describe typical integrations (CRMs, payment gateways, third-party APIs).
   - Small diagram showing data flow for a sample app.

6. **Security, Reliability, and Compliance**
   - Explain production-readiness practices: secure auth, backups, logging, monitoring.

7. **Case Studies (Complex Builds)**
   - 2–3 examples of platforms or line-of-business tools, highlighting:
     - Complexity of requirements.
     - Stack chosen.
     - Quantitative outcomes (uptime, performance, efficiency).

8. **Engagement Models & Pricing**
   - Present options like:
     - Project-based full-stack build.
     - Dedicated team extension.
   - Pricing: “From $X” or day rate-based; emphasize transparency and phased budgeting.

9. **Free Full-Stack Discovery Call**
   - Tailored variant of free consultation CTA:
     - Emphasize architecture review and risk identification.

10. **FAQ**
   - Addresses stack selection, legacy migration, scalability, handover to in-house teams, etc.

---

## 4. Business Websites Page – `/services/web-dev/business`

**Intent:**
Capture companies needing **informational / corporate / B2B sites** focused on credibility, lead gen, and clear messaging.

**Primary conceptual keywords:**

- business website development
- corporate website design and development
- B2B website development company

**Sections:**

1. **Hero**
   - H1: “Business Website Development That Converts Visitors Into Leads”
   - Emphasize clarity, trust, and performance.

2. **What a Modern Business Website Needs**
   - 3–4 pillars: clarity of offer, trust signals, performance, analytics visibility.

3. **Layouts and Page Types**
   - Describe typical page set:
     - Home
     - Services
     - About / Team
     - Case Studies
     - Blog/resources
     - Contact / quote

4. **Brand & Content Alignment**
   - Explain process for aligning copy and layout with positioning.
   - How you collaborate with stakeholders or copywriters.

5. **Lead Generation Infrastructure**
   - Explain forms, CTAs, gated content, CRM integration.
   - Mention analytics and event tracking (form submissions, CTA clicks).

6. **Performance & SEO Foundations**
   - Highlight technical SEO, schema, SSG/ISR, Core Web Vitals.

7. **Business Site Case Studies**
   - Show before/after impact:
     - e.g. more qualified leads, better engagement metrics.

8. **Business Website Pricing (Tiered)**
   - 3 tiers (e.g. Essentials / Growth / Enterprise).
   - Each tier: page ranges, features (blog, CMS, multilingual, etc).
   - Mildly “fancy” visual treatment (highlight recommended tier, subtle accent).

9. **Free Website Review CTA**
   - Offer: 15–30 min review of their current site with a short audit PDF or summary.

10. **FAQ**
   - Content/asset responsibilities, timelines, CMS choice, ongoing updates.

---

## 5. Ecommerce Websites Page – `/services/web-dev/ecommerce`

**Intent:**
Serve businesses wanting **online stores** optimized for conversion, performance, and scalability.

**Primary conceptual keywords:**

- ecommerce website development services
- ecommerce development company
- ecommerce website developers

**Sections:**

1. **Hero**
   - H1 example: “Ecommerce Website Development Focused on Revenue and Reliability”.
   - Mention performance, UX, checkout conversion, and integrations.

2. **Who This Is For**
   - DTC brands, multi-category retailers, B2B ecommerce, etc.

3. **Platform & Stack Options**
   - Explain your stance on platforms/frameworks.
   - Clarify decision-making (catalog size, custom logic, ecosystem needs).

4. **Conversion-Ready Store Architecture**
   - Discuss key templates: category, product, cart, checkout, account, content pages.
   - Highlight UX decisions drawn from best practices (clean product info, trust marks near CTAs, etc.).

5. **Performance & Reliability**
   - Emphasize SSG/ISR, image optimization for product catalogs, caching strategy.
   - Mention uptime/reliability goals.

6. **Integrations**
   - Payment gateways, shipping, tax, inventory/ERP, marketing tools.

7. **Data & Analytics**
   - Tracking funnels, revenue, A/B testing support.

8. **Ecommerce Case Studies**
   - Focus on results:
     - Add-to-cart rate, checkout completion, order value, speed improvements.

9. **Ecommerce Pricing**
   - Tiers by complexity (catalog size, customizations, integrations).
   - Optional retainers for ongoing CRO and optimization.

10. **Free Ecommerce Strategy Session CTA**
   - Emphasize review of current store metrics and roadmap suggestions.

11. **FAQ**
   - Platform choice, migration, PCI considerations, ongoing optimization, etc.

---

## 6. Landing Pages Page – `/services/web-dev/landing-page`

**Intent:**
Capture companies that need **high-conversion landing pages** for campaigns (paid ads, webinars, product launches, etc.).

**Primary conceptual keywords:**

- landing page development services
- landing page design and development
- high converting landing pages

**Sections:**

1. **Hero**
   - H1: “Landing Page Development for Campaigns That Need Clear Results”.
   - Highlight outcome: more qualified leads or sales from existing traffic.

2. **Use Cases**
   - Paid acquisition campaigns, product launches, lead magnets, waitlists, etc.

3. **What Makes a High-Performing Landing Page**
   - Clear hierarchy, single focused CTA, credibility, performance.
   - Tie to patterns learned from strong industry examples (without copying style).

4. **Process**
   - Discovery → Wireframe → Copy collaboration → Build → A/B test support.

5. **Analytics & Experimentation**
   - Event tracking, goal setup, basic experimentation framework.

6. **Bundles & Campaign Support**
   - Single landing page vs. multi-variant/test bundles or multi-step funnels.

7. **Landing Page Case Studies**
   - Highlight conversion lift (e.g. from X% to Y%), lead quality improvement.

8. **Landing Page Pricing**
   - Tiers based on complexity (basic, integrated, A/B-test-ready).
   - Slightly “fancy” layout with strong middle-tier emphasis.

9. **Free Campaign Landing Audit CTA**
   - Offer: review of an existing page or ad-to-landing experience.

10. **FAQ**
   - How many revisions, copywriting ownership, integration into their stack, etc.

---

## 7. Global Free Consultation & Pricing Concepts

### 7.1 Free Consultation Block (Reusable)

**Goals:**

- Consistent, recognizable pattern across services.
- Low-friction lead capture with clear value.

**Content structure:**

- Short, benefit-driven headline (specific to context).
- 2–3 bullets describing what they get:
  - Clarity on scope and priorities.
  - Rough budget/phase breakdown.
  - High-level technical recommendations.
- Compact form with validation and spam protection.

### 7.2 Pricing Design Language

- **Visual:**
  - 3–4 columns; subtle shadow, light border, muted accent color.
  - No loud gradients, mascots, or playful illustrations.
  - Use neutral background (white or very light gray) with clear separation between cards.
  - On mobile, stack cards vertically with generous spacing so comparison is still readable.
- **Copy:**
  - Transparent “Starting at” or range-based labels.
  - Bullet list of what’s included; no vague marketing jargon.
  - “Best for” line clarifying target stage or company type.

### 7.3 Trust Component Visual Guidelines

These guidelines apply to `TrustStrip`, `CaseStudyStrip`, metrics blocks, and any trust-focused UI.

- **Color & Imagery**
  - Client logos displayed in grayscale with consistent max height and padding.
  - Avoid people photography and stock imagery on trust strips; rely on logos, metrics, and concise statements.
  - Backgrounds remain neutral; do not use gradients or abstract shapes around trust elements.
- **Layout**
  - Logos arranged in a simple grid or horizontal row with equal spacing.
  - Case study cards aligned in a simple grid; keep card heights close to avoid visual noise.
  - On small screens, collapse to single-column layouts to preserve readability.
- **Typography**
  - Use the same heading and body styles as the rest of the site; do not introduce new decorative fonts.
  - Keep case study headlines concise, focusing on the outcome (e.g. “+38% qualified leads in 3 months”).
- **Interaction**
  - Optional very subtle hover effects (e.g. low-opacity background) are allowed, but no scale or rotation on logos.
  - No auto-playing carousels; if a slider is used, provide manual controls and keep transitions minimal.

---

## 8. Technical & SEO Implementation To-Dos

TypeSafe code, following typescript rules. Analyze the existing codebase and then work accordingly

### 8.1 Routing & Rendering

- [ ] Create route/page for `/services/web-dev` (overview).
- [ ] Create routes/pages for all subsections:
  - [ ] `/services/web-dev/full-stack`
  - [ ] `/services/web-dev/business`
  - [ ] `/services/web-dev/ecommerce`
  - [ ] `/services/web-dev/landing-page`
- [ ] Implement SSG/ISR for all above pages via appropriate Next.js APIs.
- [ ] Ensure all pages use server components by default; isolate client components for interactive widgets only.

### 8.2 Shared Layout & Components

- [ ] Define a **Services layout** shared by all service pages (consistent breadcrumb, sidebar or top sub-nav).
- [ ] Implement reusable components:
  - [ ] `ServiceHero` (title, subtitle, primary/secondary CTA).
  - [ ] `TrustStrip` (logos, metrics).
  - [ ] `ProcessSteps`.
  - [ ] `CaseStudyStrip` (compact case study cards).
  - [ ] `PricingTable` (configurable for each service).
  - [ ] `FAQSection` + schema.
  - [ ] `FreeConsultationSection` (configurable title + context).
- [ ] Ensure components are **accessible** (headings, landmarks, focus states, keyboard navigation).

### 8.3 Content & SEO

- [ ] Draft SEO-focused copy for each page:
  - [ ] `/services/web-dev`
  - [ ] `/services/web-dev/full-stack`
  - [ ] `/services/web-dev/business`
  - [ ] `/services/web-dev/ecommerce`
  - [ ] `/services/web-dev/landing-page`
- [ ] Define meta titles and descriptions per page.
- [ ] Add Open Graph and Twitter card meta.
- [ ] Implement `Service` schema for each page.
- [ ] Implement `FAQPage` schema where applicable.
- [ ] Review internal links from:
  - [ ] Homepage hero/sections.
  - [ ] Other Services (e.g. Digital Marketing, App Development).
  - [ ] Relevant blog posts and case studies.

### 8.4 Performance & QA

- [ ] Set performance budgets (LCP, CLS, FID/INP) and check against Lighthouse.
- [ ] Optimize all imagery for these pages (sizes, formats, lazy loading).
- [ ] Confirm no blocking large client bundles are introduced.
- [ ] Test across modern browsers and key devices (mobile-first).

### 8.5 Analytics & Conversion Tracking

- [ ] Ensure analytics events for:
  - [ ] Consultation form submissions.
  - [ ] Pricing section interactions.
  - [ ] Key CTA clicks.
- [ ] Set up goals/conversions in analytics tool of choice.

---

## 9. Milestones

### Milestone 1 – IA & Component Design

- Finalize content structure and component inventory for all Web Dev pages.
- Define design guidelines for trust components and pricing table styling.

### Milestone 2 – Layout & Shared Components Implementation

- Implement shared services layout and global components (heroes, trust strip, pricing, FAQ, free consultation).
- Hook up SSG/ISR scaffolding for all routes (even with placeholder content).

### Milestone 3 – Page-Level Content & SEO

- Draft and implement full-length content for each Web Dev page.
- Add per-page SEO configuration (titles, descriptions, schema, OG tags).

### Milestone 4 – Performance & Conversion Polish

- Optimize Core Web Vitals for these pages.
- Refine CTAs, pricing copy, and free consultation content based on initial feedback.

### Milestone 5 – Launch & Monitoring

- Release the Web Dev section.
- Monitor rankings, traffic, and conversion metrics.
- Iterate content and internal linking based on performance.

---

## 10. Next Steps for Discussion

- Validate that the **page list and intents** match your business priorities.
- Decide on **initial example case studies** and metrics you want to highlight.
- Align on **pricing model visibility** (specific numbers vs. “starting at” vs. “contact us”).
- Prioritize which Web Dev subpage to build **first** (e.g. Business Websites or Landing Pages) for a phased rollout.


