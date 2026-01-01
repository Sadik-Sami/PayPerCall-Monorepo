---
name: Landing Page Redesign
overview: Redesign the landing page to remove generic AI/SaaS aesthetics and create a confident, trustworthy experience that naturally flows between sections while accurately representing your Pay Per Call, Pay Per Lead, Digital Marketing, and Web/App Development services.
todos:
  - id: hero
    content: Rewrite Hero with clear value proposition for lead generation business
    status: completed
  - id: trustbar
    content: Create new TrustBar component with client logos/industry badges
    status: completed
  - id: impactstats
    content: Rework ImpactStats with relevant metrics (leads, calls, ROI) and remove glows
    status: completed
  - id: industries
    content: Create Industries component to replace TechCloud
    status: completed
  - id: services-delete
    content: Remove redundant Services.tsx component
    status: completed
  - id: howitworks
    content: Rework FeatureSteps to static process (remove auto-carousel)
    status: completed
  - id: testimonials
    content: Replace placeholder NexaUI content with real service testimonials
    status: completed
  - id: founder
    content: Update FounderInsight quote and remove DevOps references
    status: completed
  - id: faq
    content: Rewrite FAQ questions to focus on lead generation business
    status: completed
  - id: cta
    content: Update CTA messaging to focus on consultation/lead gen
    status: completed
  - id: page-order
    content: Update page.tsx with new section order and remove deleted components
    status: completed
---

# Landing Page Redesign Plan

## Current State Analysis

### Critical Issues Found

**Content Misalignment:**

- `Services.tsx` still has "DevOps & Cloud" tab - you don't offer this
- `FeatureSteps.tsx` features DevOps content
- `ImpactStats.tsx` shows "System Uptime 99.99%" and "Apps Deployed 250+" - irrelevant metrics
- `FounderInsight.tsx` mentions "DevOps pipeline" in the quote
- `FAQ.tsx` mentions DevOps, AWS, Docker heavily
- `Testimonials.tsx` content is about "NexaUI" - completely placeholder!
- `hero.tsx` has placeholder text: "Almost the hero section slideshow We Hoped for"

**Design Problems (SaaS/AI vibes to remove):**

- Excessive blur effects (`blur-[120px]`, `blur-[240px]`)
- Glowing text classes (`text-glow`)
- Decorative badges on every section ("Performance Metrics", "Capabilities", etc.)
- Gradient backgrounds and "radial-gradient" overlays
- Auto-rotating carousels (FeatureSteps)
- Tech jargon language ("Our Arsenal", "Powering World-Class Infrastructure")

**Flow Problems:**

- Services shown twice: TechSpotlight AND Services component
- No clear narrative progression
- Missing trust indicators (client logos, industries served)
- Sections feel disconnected

---

## Proposed Section Order and Changes

```
Hero (value proposition)
    ↓
TrustBar (NEW - client logos/badges)
    ↓
TechSpotlight (services overview - KEEP, already improved)
    ↓
ImpactStats (social proof - REWORK metrics)
    ↓
Industries (NEW - replace TechCloud)
    ↓
HowItWorks (REWORK FeatureSteps - static process)
    ↓
Testimonials (KEEP UI, fix content)
    ↓
FounderInsight (REWORK - remove DevOps mention)
    ↓
FAQ (REWORK content)
    ↓
CTA (REWORK messaging)
```

**Sections to REMOVE:**

- `TechCloud.tsx` - Replace with Industries
- `Services.tsx` - Redundant with TechSpotlight

---

## Section-by-Section Plan

### 1. Hero (Complete Rewrite)

**Current:** Placeholder text with image slider

**New:** Clear value proposition focused on lead generation

- Headline: Direct statement about connecting businesses with customers
- Subheadline: Mention Pay Per Call, Pay Per Lead as core offerings
- Single clear CTA (not "Join now")
- keep the slider carousel, optimize for smoothness
- Remove: Gradient text effects, backdrop-blur buttons

### 2. TrustBar (NEW Component)

**Purpose:** Immediate credibility before diving into content

- Simple row of grayscale client logos or industry certifications
- Text like "Trusted by businesses in Insurance, Legal, Healthcare, and Home Services"
- No animations, no hover effects
- Minimal height (~80px)

### 3. TechSpotlight (KEEP)

**Status:** Recently improved, aligns with services

**Minor tweaks:** None needed, content is accurate

### 4. ImpactStats (REWORK)

**Current issues:**

- "System Uptime 99.99%" - irrelevant
- "Apps Deployed 250+" - not your core metric
- DevOps references
- Excessive glowing effects

**New metrics (relevant to Pay Per Call/Lead business):**

- Leads Generated (keep, make more specific)
- Calls Connected Monthly
- Average Client ROI or Cost Per Lead improvement
- Years in Business / Industries Served count

**Design changes:**

- Remove blur backgrounds
- Remove colored "glow" on numbers
- Simpler card design with border only
- Remove hover scale animations on icons

### 5. Industries (NEW - Replace TechCloud)

**Purpose:** Show expertise across verticals (from your navbar data)

Content from `data.ts`:

- Financial & Legal (Insurance, Legal Services, Financial)
- Service & Health (Home Services, Healthcare, Automotive)
- Other (Travel, Telecom, Education, B2B)

**Design:**

- Clean grid layout (3x3 or 2-row)
- Industry name + brief value statement
- Optional: Simple icon per industry
- No marquee animation

### 6. HowItWorks (REWORK FeatureSteps)

**Current issues:**

- Auto-rotating carousel is distracting
- DevOps content
- Placeholder Unsplash images
- "Service 01, 02" labels feel generic

**New approach:**

- Static 3-4 step process (not auto-rotating)
- Steps: Consultation → Strategy → Execution → Results
- Focus on lead generation process, not engineering
- Simple numbered steps, no carousel
- Remove decorative blurs and glows

### 7. Testimonials (KEEP UI, Fix Content)

**UI:** Keep the vertical marquee layout (it works)

**Performance:** Optimize by reducing motion on scroll

**Content changes (critical):**

- Replace all "NexaUI" references with actual service testimonials
- Focus on: Insurance agents, lawyers, home service businesses
- Include specific results: "Increased qualified calls by 40%"
- Real industries, realistic names/roles

### 8. FounderInsight (REWORK)

**Current issues:**

- Mentions "DevOps pipeline" in quote
- "Verified Engineering Lead" badge feels startup-y
- "Architect outcomes" is buzzword-heavy

**Changes:**

- Update quote to focus on lead quality and client relationships
- Simpler title: "Founder" instead of "Chief Systems Architect"
- Remove decorative glows
- Keep the image layout (it provides human element)

### 9. FAQ (REWORK Content)

**Current issues:**

- 3/5 questions mention DevOps, MERN, AWS
- Too engineering-focused for lead gen business

**New FAQ topics:**

- How do you ensure lead quality?
- What industries do you specialize in?
- How is pricing structured? (performance-based)
- What's the onboarding process?
- How do you track results/ROI?

### 10. CTA (REWORK)

**Current issues:**

- "Stop guessing. Start Engineering" - wrong tone
- MERN stack mention
- "Enterprise Security" badge - irrelevant

**Changes:**

- Focus on getting started with lead generation
- Simple headline: "Ready to grow your customer base?"
- CTA: "Get a Free Consultation" or "Request a Quote"
- Remove tech jargon

---

## Design System Changes

**Remove throughout all components:**

- `blur-[Xpx]` decorative backgrounds
- `text-glow` classes
- Excessive `backdrop-blur` usage
- Gradient text (`bg-clip-text text-transparent`)
- Auto-animations (carousels, progress bars)

**Keep/Use:**

- Clean borders (`border border-border`)
- Subtle hover states
- Simple fade-in animations on scroll (viewport: once)
- Consistent spacing (py-24)

---

## Files to Modify

| File | Action | Priority |

|------|--------|----------|

| `hero.tsx` | Complete rewrite | High |

| `ImpactStats.tsx` | Rework metrics and design | High |

| `Services.tsx` | Delete (redundant) | High |

| `TechCloud.tsx` | Replace with Industries | High |

| `steps.tsx` | Rework to static process | Medium |

| `FounderInsight.tsx` | Update content | Medium |

| `FAQ.tsx` | Rewrite questions | Medium |

| `cta.tsx` | Update messaging | Medium |

| `testimonials.tsx` | Replace placeholder content | Medium |

| `page.tsx` | Update section order | High |

| NEW: `TrustBar.tsx` | Create new component | Medium |

| NEW: `Industries.tsx` | Create new component | Medium |

---

## SEO Considerations

- Hero H1 should include "Pay Per Call" and "Lead Generation"
- Each section should have semantic headings (H2)
- Industries section helps with local/vertical SEO
- FAQ structured data potential
- Remove generic tech terms, add industry-specific keywords