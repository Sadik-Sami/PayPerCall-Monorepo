# CMS Services Implementation Plan

## Executive Summary

This plan outlines the complete implementation of CMS Services pages following the proven Web Development pattern. The implementation includes:

- **1 Mother Page** (CMS Overview) at `/services/cms`
- **4 Sub-Pages**: WordPress, Drupal, Content Hub (Headless), Wix Studio
- **100% Reusable Components** from existing services library
- **Type-Safe Content** using existing TypeScript interfaces
- **SEO-Optimized** with metadata, structured data, and keyword targeting
- **High Performance** through ISR, image optimization, and code splitting

---

## Architecture Overview

### File Structure

```
/apps/web/app/services/cms/
├── layout.tsx                    # ISR wrapper (revalidate=3600)
├── page.tsx                      # Mother page (12 sections)
├── wordpress/
│   └── page.tsx                  # WordPress sub-page (10 sections)
├── drupal/
│   └── page.tsx                  # Drupal sub-page (10 sections)
├── content-hub/
│   └── page.tsx                  # Headless CMS sub-page (11 sections)
└── wix-studio/
    └── page.tsx                  # Wix Studio sub-page (8 sections)

/apps/web/components/services/
└── nav-items.ts                  # Add CMS_SERVICE_NAV export
```

### Component Strategy

**All components are reusable from existing library:**
- ServiceHero, TechMarquee, TrustBanner, ResultsShowcase
- AnimatedServicesGrid, ProcessSteps, TimelineSteps
- CaseStudyStrip, TestimonialsSection, IntegrationLogos
- ClientSuccessBreakdown, DeliverablesSection, ServiceComparison
- TrendingUp, ResultsGallery, PricingTable, FAQSection, ConsultationCTA

**No new components needed** - existing library covers all CMS requirements.

### Type Safety

All content uses existing types from `/apps/web/components/services/types.ts`:
- `ServiceHeroProps`, `ServiceCta`
- `ProcessStep`, `CaseStudyItem`, `PricingPlan`, `FaqItem`
- `SuccessOutcome`, `ServiceNavItem`
- **Zero `any` types** - fully type-safe implementation

---

## Milestones

### Milestone 1: Foundation Setup
**Goal:** Create base structure and navigation

**Tasks:**
1. Create `/apps/web/app/services/cms/layout.tsx`
   - Copy pattern from `/apps/web/app/services/web-dev/layout.tsx`
   - Set `revalidate = 3600` for ISR
   - Simple wrapper with `min-h-screen bg-background` and padding

2. Add CMS navigation to `/apps/web/components/services/nav-items.ts`
   - Export `CMS_SERVICE_NAV: ServiceNavItem[]` array
   - Include 5 items: Overview, WordPress, Drupal, Content Hub, Wix Studio
   - Add icons from lucide-react: Globe, FileText, ShieldCheck, Cloud, Sparkles
   - Define capabilities and summaries for each service

**Verification:**
- [ ] Layout file exists and follows pattern
- [ ] CMS_SERVICE_NAV exports correctly
- [ ] TypeScript compiles with no errors
- [ ] Navigation data matches navbar/data.ts URLs

---

### Milestone 2: Mother Page (CMS Overview)
**Goal:** Create comprehensive CMS overview page

**File:** `/apps/web/app/services/cms/page.tsx`

**Sections (12 total):**
1. **ServiceHero** (variant: 'asymmetric')
   - Title: "Content systems built for editorial teams and growth"
   - Subtitle: WordPress, Drupal, headless CMS solutions
   - Features: Multi-platform expertise, Security-first, Editor-friendly
   - Stat: "30 minutes · Platform assessment · free consultation"
   - Media: Hero image with caption

2. **TechMarquee**
   - CMS-focused tech stack (WordPress, Drupal, Contentful, Sanity, etc.)

3. **TrustBanner**
   - Default trust indicators and compliance badges

4. **ResultsShowcase** (variant: 'split')
   - CMS success metrics and outcomes

5. **AnimatedServicesGrid**
   - Display 4 CMS sub-services using `CMS_SERVICE_NAV`
   - Filter out overview item: `services={CMS_SERVICE_NAV.filter((item) => item.href !== '/services/cms')}`
   - Grid layout: `className='grid gap-6 md:grid-cols-2'`

6. **ProcessSteps** (variant: 'cards')
   - 4 steps: Platform Assessment, Architecture & Content Modeling, Build & Integrate, Training & Handoff
   - Title: "How we deliver CMS projects"

7. **CaseStudyStrip**
   - 3 diverse case studies:
     - Healthcare: WordPress Multisite with HIPAA compliance
     - Financial Services: Enterprise Drupal with SOC 2
     - Retail: Headless CMS (Contentful) for omnichannel
   - Each with metrics, icons, industry tags

8. **TestimonialsSection** (variant: 'featured')
   - Use default testimonials from component

9. **IntegrationLogos**
   - CMS integrations: WordPress, Drupal, Contentful, Sanity, Strapi, Wix Studio
   - Plugins: ACF, Yoast SEO, WooCommerce, Elementor
   - Hosting: Acquia, Pantheon
   - 12+ integrations total

10. **PricingTable**
    - 3 tiers:
      - WordPress Site: From $8k (custom theme, plugin setup, training)
      - Enterprise CMS: From $35k (Drupal/Multisite, compliance, recommended)
      - Headless CMS: From $45k (API-first, omnichannel)
    - Billing note: Security hardening and training included

11. **FAQSection**
    - 5 FAQ items:
      - How to choose between WordPress, Drupal, headless?
      - Content migration without losing SEO?
      - Security and compliance (HIPAA, GDPR)?
      - Editor training included?
      - Is assessment really free?

12. **ConsultationCTA**
    - Title: "Plan your content platform with a 30-minute assessment"
    - 3 bullets: Platform recommendation, migration estimates, no commitment

**Content Constants:**
```typescript
const HERO_CONTENT = { ... };
const PROCESS_STEPS: ProcessStep[] = [ ... ];
const CMS_INTEGRATIONS = [ ... ];
const CASE_STUDIES: CaseStudyItem[] = [ ... ];
const PRICING_PLANS: PricingPlan[] = [ ... ];
const FAQ_ITEMS: FaqItem[] = [ ... ];
```

**Metadata:**
```typescript
export const metadata: Metadata = {
  title: 'CMS Development Services | WordPress, Drupal, Headless CMS | PayPerCall',
  description: 'Expert CMS development: WordPress, Drupal, and headless solutions built for security, performance, and editorial efficiency. Free platform assessment.',
  alternates: { canonical: '/services/cms' },
  keywords: ['cms development', 'wordpress development', 'drupal development', 'headless cms', ...],
  // ... openGraph, twitter
};
export const revalidate = 3600;
```

**Verification:**
- [ ] All 12 sections render correctly
- [ ] Content is professional, metrics-driven, not placeholder jargon
- [ ] Metadata includes all required fields
- [ ] Page loads in < 2.5s (LCP)
- [ ] All links functional
- [ ] Mobile responsive

---

### Milestone 3: WordPress Sub-Page
**Goal:** Custom WordPress development service page

**File:** `/apps/web/app/services/cms/wordpress/page.tsx`

**Target Audience:** Small-medium businesses, marketing teams, WooCommerce users

**Sections (10 total):**
1. ServiceHero (default variant)
2. TechMarquee (WordPress ecosystem)
3. ClientSuccessBreakdown (3 metrics: 4-week launch, 0 security breaches, 1.8s load time)
4. ProcessSteps (4 steps, variant: 'cards')
5. DeliverablesSection (custom theme, plugins, security, training)
6. IntegrationLogos (ACF, Yoast, WooCommerce, Elementor, Gravity Forms, etc.)
7. CaseStudyStrip (3 WordPress-specific cases)
8. PricingTable (id='pricing', 3 tiers: Starter $8k, Business $18k, Enterprise Multisite $45k)
9. FAQSection (7 items with objection handling)
10. ConsultationCTA (formVariant: 'detailed')

**Key Content Focus:**
- Security hardening emphasis
- WooCommerce integration capability
- Editor training and documentation
- Plugin ecosystem expertise
- Multisite capabilities for enterprise

**Metadata:**
```typescript
title: 'WordPress Development Services | Custom Themes, Plugins & Security | PayPerCall'
description: 'Expert WordPress development: custom themes, plugin development, WooCommerce integration, and security hardening for scalable, SEO-ready sites.'
keywords: ['wordpress development', 'custom wordpress themes', 'wordpress plugin development', 'woocommerce development', ...]
```

**Structured Data:**
```typescript
<script type='application/ld+json'>
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "WordPress Development",
  "provider": { "@type": "Organization", "name": "PayPerCall" },
  // ... offers, description
}
</script>
```

**Verification:**
- [ ] Metadata complete with structured data
- [ ] 10 sections with WordPress-specific content
- [ ] Pricing tiers clear and distinct
- [ ] FAQ addresses WordPress-specific concerns
- [ ] All integrations relevant to WordPress
- [ ] Case studies show WordPress results

---

### Milestone 4: Drupal Sub-Page
**Goal:** Enterprise Drupal development service page

**File:** `/apps/web/app/services/cms/drupal/page.tsx`

**Target Audience:** Enterprise organizations, government, healthcare, multi-site needs

**Sections (10 total):**
1. ServiceHero
2. ClientSuccessBreakdown (3 enterprise metrics: 12+ sites per multisite, 8-week implementation, 99.97% uptime)
3. TimelineSteps (4 phases, orientation: 'horizontal')
4. DeliverablesSection (security review, multi-site architecture, compliance)
5. ServiceComparison (Drupal tiers: Single Site, Multi-Site Platform, Headless Drupal)
6. IntegrationLogos (Acquia, Pantheon, Drupal modules, APIs)
7. CaseStudyStrip (3 enterprise cases: healthcare, financial, government)
8. PricingTable (id='pricing', 3 tiers: Single Site $35k, Multi-Site $75k, Headless $85k)
9. FAQSection (6 items focused on security, compliance, scalability)
10. ConsultationCTA (formVariant: 'detailed')

**Key Content Focus:**
- Enterprise-grade security
- Multi-site architecture
- HIPAA, SOC 2, GDPR compliance
- Complex content workflows
- Role-based publishing
- High uptime and performance

**Metadata:**
```typescript
title: 'Drupal Development Services | Enterprise CMS & Multi-Site | PayPerCall'
description: 'Enterprise Drupal development for complex content workflows, multi-site management, and high-security requirements. HIPAA and SOC 2 aligned.'
keywords: ['drupal development', 'enterprise drupal', 'drupal multisite', 'drupal security', ...]
```

**Verification:**
- [ ] Enterprise tone throughout
- [ ] Compliance mentions (HIPAA, SOC 2, GDPR)
- [ ] Multi-site capabilities highlighted
- [ ] Pricing reflects enterprise scale
- [ ] Case studies show complex implementations
- [ ] FAQ addresses security and governance

---

### Milestone 5: Content Hub (Headless CMS) Sub-Page
**Goal:** Headless CMS and API-first architecture page

**File:** `/apps/web/app/services/cms/content-hub/page.tsx`

**Target Audience:** Modern tech teams, omnichannel organizations, developer-focused teams

**Sections (11 total):**
1. ServiceHero
2. TechMarquee (headless tech stack: Contentful, Sanity, Strapi, Next.js, GraphQL)
3. ClientSuccessBreakdown (3 technical metrics: 200ms API response, 5+ channels, -70% publishing overhead)
4. TimelineSteps (4 phases)
5. TrendingUp (headless CMS adoption growth, market trends)
6. IntegrationLogos (Contentful, Sanity, Strapi, Hygraph, Next.js, GraphQL, Vercel, AWS)
7. ResultsGallery (performance comparisons: headless vs traditional CMS)
8. CaseStudyStrip (3 headless cases: retail omnichannel, media publishing, SaaS product)
9. PricingTable (id='pricing', 3 tiers: Starter $45k, Omnichannel $75k, Enterprise $125k)
10. FAQSection (7 developer-focused items)
11. ConsultationCTA (formVariant: 'detailed')

**Key Content Focus:**
- API-first architecture
- Omnichannel content delivery (web, mobile, IoT, voice)
- GraphQL and REST APIs
- Modern JavaScript frameworks
- Real-time content sync
- Developer experience
- Performance and edge caching

**Metadata:**
```typescript
title: 'Headless CMS Development | Contentful, Sanity, Strapi | PayPerCall'
description: 'API-first headless CMS architecture with Contentful, Sanity, or Strapi for omnichannel content delivery. GraphQL and REST APIs for modern stacks.'
keywords: ['headless cms', 'contentful development', 'sanity cms', 'strapi development', 'api-first cms', ...]
```

**Verification:**
- [ ] Technical depth appropriate for developer audience
- [ ] API-first messaging throughout
- [ ] Omnichannel capabilities highlighted
- [ ] Performance metrics emphasized
- [ ] Modern tech stack showcased
- [ ] Platform comparison helpful

---

### Milestone 6: Wix Studio Sub-Page
**Goal:** Fast website launches for small businesses

**File:** `/apps/web/app/services/cms/wix-studio/page.tsx`

**Target Audience:** Small businesses, startups, limited budgets, fast launches

**Sections (8 total):**
1. ServiceHero
2. ClientSuccessBreakdown (3 speed metrics: 2-week launch, $3k-8k budget, 0 server management)
3. ProcessSteps (3 rapid steps, variant: 'cards')
4. IntegrationLogos (Wix apps, payment processors, marketing tools)
5. CaseStudyStrip (3 small business cases: local service, online store, professional services)
6. PricingTable (id='pricing', 3 tiers: Business Site $3k, Ecommerce $5k, Advanced $8k)
7. FAQSection (6 items addressing Wix limitations and capabilities)
8. ConsultationCTA (formVariant: 'short')

**Key Content Focus:**
- Speed to market (2 weeks)
- Affordability ($3k-8k range)
- Managed hosting (zero server management)
- Visual builder ease of use
- Small business perfect fit
- No technical team required

**Metadata:**
```typescript
title: 'Wix Studio Development | Fast Business Website Launches | PayPerCall'
description: 'Professional Wix Studio websites for small businesses. Managed hosting, visual builder, and SEO tools. Launch in 2 weeks from $3k.'
keywords: ['wix studio', 'wix development', 'wix website', 'small business website', 'wix ecommerce', ...]
```

**Verification:**
- [ ] Accessible, non-technical tone
- [ ] Value-focused pricing
- [ ] Speed emphasized
- [ ] Small business positioning clear
- [ ] Managed hosting benefits highlighted
- [ ] FAQ addresses common Wix concerns

---

## Content Quality Standards

### Writing Guidelines

**Tone:**
- Professional and trustworthy
- Metrics-driven, not marketing fluff
- Clear and specific
- No placeholder jargon or "lorem ipsum" content

**Content Requirements:**
- **Metrics:** Use real or realistic numbers ("+37% leads", "6 weeks", "0 security incidents")
- **Case Studies:** Industry diversity (healthcare, financial, retail, etc.)
- **Deliverables:** Specific, actionable items (not vague "best practices")
- **FAQ:** Address real objections and concerns
- **Compliance:** Mention SOC 2, HIPAA, GDPR where relevant
- **Trust Signals:** Security hardening, audit passing, uptime stats

**SEO Best Practices:**
- Primary keyword in title (front-loaded)
- Meta description 155-160 characters
- Keywords in H1, H2 headings
- Internal linking between related pages
- Structured data (JSON-LD) on all sub-pages
- Alt text on all images
- Canonical URLs

### Content Examples

**Good:**
> "We migrated to a headless Next.js stack with modular CMS entries and ISR for rapid content updates, resulting in +37% qualified inbound calls in 90 days with <2s median LCP."

**Bad:**
> "We helped them build an amazing website that got great results and improved their business metrics significantly."

**Good:**
> "Security hardening included: Wordfence firewall, automated malware scanning, two-factor authentication, and encrypted backup schedules."

**Bad:**
> "We implement security best practices to keep your site safe and secure."

---

## Technical Implementation

### Type Safety Checklist

All content constants must be properly typed:

```typescript
// ✅ Correct
const SUCCESS_OUTCOMES: SuccessOutcome[] = [
  {
    icon: 'clock' as const,
    metric: '4 weeks',
    label: 'Average time to launch',
    description: 'From kickoff to production',
    context: 'Includes custom theme and training',
  },
];

// ❌ Incorrect
const SUCCESS_OUTCOMES = [
  {
    icon: 'clock', // missing 'as const'
    metric: '4 weeks',
    // missing required fields
  },
];
```

**Type Imports:**
```typescript
import type { Metadata } from 'next';
import type {
  ServiceCta,
  ProcessStep,
  CaseStudyItem,
  PricingPlan,
  FaqItem
} from '@/types/services';
import type { SuccessOutcome } from '@/components/services/client-success-breakdown';
```

### Performance Targets

- **ISR:** Revalidate every 3600s (1 hour)
- **LCP:** < 2.5 seconds
- **FID:** < 100ms
- **CLS:** < 0.1
- **Lighthouse Score:** 90+ on all pages
- **Image Optimization:** Use Next.js Image component with WebP
- **Code Splitting:** Lazy load below-fold sections

### Accessibility Requirements

- **WCAG 2.1 AA Compliance**
- Semantic HTML (proper heading hierarchy)
- Alt text on all images
- Keyboard navigation support
- Screen reader friendly
- Color contrast ratios > 4.5:1
- Focus indicators on interactive elements
- ARIA labels where needed

---

## SEO Strategy

### Keyword Targeting

**Mother Page (`/services/cms`):**
- cms development
- cms services
- content management system development
- wordpress drupal headless cms

**WordPress (`/services/cms/wordpress`):**
- wordpress development
- custom wordpress themes
- wordpress plugin development
- woocommerce development
- wordpress security

**Drupal (`/services/cms/drupal`):**
- drupal development
- enterprise drupal
- drupal multisite
- drupal security
- drupal 10

**Content Hub (`/services/cms/content-hub`):**
- headless cms
- contentful development
- sanity cms
- strapi development
- api-first cms
- omnichannel content

**Wix Studio (`/services/cms/wix-studio`):**
- wix studio
- wix development
- small business website
- wix ecommerce
- wix velo

### Internal Linking

- Mother page → All 4 sub-pages (via AnimatedServicesGrid)
- Each sub-page → Mother page (breadcrumb/navigation)
- Cross-link related services in FAQ/content
- Link to /contact, /portfolio from CTAs
- Use descriptive anchor text with keywords

### Structured Data

Each sub-page includes Schema.org JSON-LD:

```typescript
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'WordPress Development',
  provider: {
    '@type': 'Organization',
    name: 'PayPerCall',
    url: 'https://paypercall.com',
  },
  description: '...',
  areaServed: { '@type': 'Country', name: 'United States' },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'USD',
      price: '8000',
      description: 'Starting from $8k',
    },
  },
};

// In component return:
<script
  type='application/ld+json'
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>
```

---

## Testing & Verification

### Pre-Launch Checklist

**Functionality:**
- [ ] All links work (internal and external)
- [ ] Forms submit correctly
- [ ] Navigation breadcrumbs functional
- [ ] Anchor links work (e.g., #pricing)
- [ ] ISR revalidation working

**Content:**
- [ ] No placeholder text or lorem ipsum
- [ ] All metrics realistic and consistent
- [ ] Case studies industry-diverse
- [ ] FAQ addresses real concerns
- [ ] Pricing tiers clear and distinct
- [ ] No typos or grammatical errors

**SEO:**
- [ ] Metadata complete on all pages
- [ ] Structured data validates (schema.org validator)
- [ ] Keywords present in titles, headings
- [ ] Meta descriptions 155-160 characters
- [ ] Canonical URLs set correctly
- [ ] Alt text on all images
- [ ] Robots.txt allows indexing

**Performance:**
- [ ] Lighthouse score 90+ (all pages)
- [ ] LCP < 2.5s
- [ ] Images optimized (WebP format)
- [ ] No console errors
- [ ] Mobile responsive

**Accessibility:**
- [ ] Heading hierarchy correct (h1 → h2 → h3)
- [ ] Color contrast sufficient
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] ARIA labels where needed
- [ ] Focus indicators visible

**Cross-Browser:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

**Cross-Device:**
- [ ] Desktop (1920px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

### Post-Launch Checklist

**Week 1:**
- [ ] Google Search Console: Submit sitemap
- [ ] Google Analytics: Verify tracking
- [ ] Monitor Core Web Vitals
- [ ] Check for 404 errors
- [ ] Verify ISR working (check page timestamps)

**Month 1:**
- [ ] Review search rankings for target keywords
- [ ] Check Google Search Console for indexing issues
- [ ] Monitor conversion rates (form submissions)
- [ ] Review user behavior (time on page, bounce rate)
- [ ] Gather client feedback

---

## Critical Files Reference

**Pattern Reference Files:**
- `/apps/web/app/services/web-dev/page.tsx` - Mother page structure (12 sections)
- `/apps/web/app/services/web-dev/full-stack/page.tsx` - Sub-page pattern with deliverables
- `/apps/web/app/services/web-dev/business/page.tsx` - Sub-page with metadata, structured data
- `/apps/web/app/services/web-dev/ecommerce/page.tsx` - Timeline and results gallery usage
- `/apps/web/app/services/web-dev/layout.tsx` - Layout pattern

**Type Definitions:**
- `/apps/web/components/services/types.ts` - All TypeScript interfaces

**Navigation:**
- `/apps/web/components/services/nav-items.ts` - Service navigation arrays
- `/apps/web/components/navbar/data.ts` - Top navbar data (already has CMS links)

**Components:**
- `/apps/web/components/services/index.ts` - All service components exported
- All components in `/apps/web/components/services/` directory

---

## Success Criteria

### Functional Success
- All 5 pages (1 mother + 4 sub) render without errors
- Navigation works seamlessly between pages
- Forms submit and track conversions
- ISR caching reduces server load
- No TypeScript compilation errors

### Content Success
- Professional, metrics-driven content throughout
- No placeholder or generic text
- Case studies show real-world scenarios
- FAQ addresses actual user concerns
- Pricing clear and justified

### SEO Success
- All pages indexed by Google within 2 weeks
- Target keywords ranking within 3 months
- Structured data validates without errors
- Internal linking drives page authority
- Meta descriptions drive click-through

### Performance Success
- Lighthouse scores 90+ across all pages
- LCP < 2.5s consistently
- Zero accessibility violations
- Mobile experience smooth and responsive
- Images load efficiently

### User Experience Success
- Clear information hierarchy
- Natural flow from section to section
- Trust signals build confidence
- CTAs clear and actionable
- No confusion about service differences

---

## Notes

- **No New Components Required:** All existing service components cover CMS needs perfectly
- **Type Safety First:** Use `satisfies` or explicit type annotations on all constants
- **Content Quality:** Follow web-dev pattern - metrics-driven, specific, professional
- **SEO Foundation:** Metadata, structured data, and keywords set up success
- **Accessibility:** Built-in from component library, verify at page level
- **Performance:** ISR + Next.js Image + code splitting = fast pages
- **Maintenance:** Content updates quarterly, full audit annually

---

## Timeline Estimate

This is provided for planning purposes only (not a commitment):

- **Milestone 1 (Foundation):** Layout + navigation setup
- **Milestone 2 (Mother Page):** CMS overview page with 12 sections
- **Milestone 3-6 (Sub-Pages):** WordPress, Drupal, Content Hub, Wix Studio pages
- **Final Testing:** Cross-browser, accessibility, performance, SEO validation

All pages follow established patterns, reducing implementation time significantly.
