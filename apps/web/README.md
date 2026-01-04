# PayPerCall Website

A modern, high-performance marketing website built with Next.js 16, React 19, and TailwindCSS. This application serves as the public-facing website for PayPerCall, showcasing web development services and providing conversion-focused landing pages.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Features](#features)
- [Application Routes](#application-routes)
- [Architecture](#architecture)
- [Data Fetching](#data-fetching)
- [Page Sections](#page-sections)
- [SEO & Metadata](#seo--metadata)
- [Styling](#styling)
- [Project Structure](#project-structure)
- [Performance](#performance)

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **TailwindCSS 4** | Utility-first CSS |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |
| **@workspace/ui** | Shared UI component library |
| **Vercel Speed Insights** | Performance monitoring |
| **next-themes** | Dark/light mode |
| **React Hook Form + Zod** | Form handling |
| **Sonner** | Toast notifications |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Running API server (apps/api) for dynamic content

### Installation

```bash
# Navigate to the web directory
cd apps/web

# Install dependencies
pnpm install

# Start development server with Turbopack
pnpm dev
```

The website will be available at `http://localhost:3000`

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint errors |
| `pnpm typecheck` | Run TypeScript type checking |

---

## Environment Variables

Create a `.env.local` file in the `apps/web` directory:

```env
# API Configuration (used by server components)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | - |

---

## Features

### Landing Page
- Hero section with animated elements
- Trust bar with client logos
- Technology spotlight
- Impact statistics
- Industry showcase
- How it works process
- Customer testimonials
- Founder insight section
- FAQ section
- Call-to-action

### Web Development Services
- Service category pages
- Dynamic sub-service pages
- Pricing packages
- Case studies with results
- Customer testimonials
- FAQ sections
- SEO-optimized metadata
- JSON-LD structured data

### Call Center Services
- Dedicated landing page
- Pricing section
- Services breakdown
- Trust indicators
- Comparison tables

### Forms
- Advertiser signup with multi-step form
- Contact forms
- Lead capture forms

### Performance
- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization
- Turbopack for fast development
- Vercel Speed Insights integration

---

## Application Routes

### Public Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | `page.tsx` | Main landing page |
| `/services/web-dev` | `services/web-dev/page.tsx` | Web development services overview |
| `/services/web-dev/[slug]` | `services/web-dev/[...slug]/page.tsx` | Dynamic sub-service pages |
| `/hire-call-center` | `hire-call-center/page.tsx` | Call center services landing |
| `/advertiser-signup` | `advertiser-signup/page.tsx` | Advertiser registration form |

### Dynamic Routes

The `[...slug]` catch-all route handles sub-service pages:

| URL Pattern | Example |
|-------------|---------|
| `/services/web-dev/full-stack` | Full-Stack Development service |
| `/services/web-dev/ecommerce` | E-Commerce Development service |
| `/services/web-dev/landing-pages` | Landing Pages service |
| `/services/web-dev/business-websites` | Business Websites service |

---

## Architecture

### App Router Structure

```
app/
├── layout.tsx                    # Root layout with Navbar, Footer
├── page.tsx                      # Homepage
├── fonts.ts                      # Font definitions
├── favicon.ico
├── services/
│   └── web-dev/
│       ├── page.tsx              # Services overview
│       └── [...slug]/
│           ├── page.tsx          # Dynamic sub-service page
│           └── _components/      # Page-specific components
├── hire-call-center/
│   ├── page.tsx
│   ├── _components/
│   └── _data/
└── advertiser-signup/
    ├── page.tsx
    └── _components/
```

### Component Architecture

```
RootLayout
├── Providers (Theme, etc.)
├── Navbar
├── {children} (Page content)
├── Toaster
├── SpeedInsights
└── Footer
```

### Data Flow

```
API (apps/api)
     ↓
lib/services/web-dev-service.ts (fetch functions)
     ↓
Server Components (page.tsx)
     ↓
Client Components (_components/)
```

---

## Data Fetching

### Service Layer

All API calls are centralized in `lib/services/`:

```typescript
// lib/services/web-dev-service.ts
const API_BASE_URL = 'http://localhost:3001/api';

export async function getAllWebDevServices(): Promise<WebDevService[]> {
  const response = await fetch(`${API_BASE_URL}/web-dev-services`, {
    cache: 'no-store',
  });
  const data = await response.json();
  return data.data;
}

export async function getWebDevSubServiceBySlug(
  serviceSlug: string,
  subServiceSlug: string
): Promise<WebDevSubService | null> {
  const response = await fetch(
    `${API_BASE_URL}/web-dev-services/${serviceSlug}/sub-services/${subServiceSlug}`,
    { cache: 'no-store' }
  );
  const data = await response.json();
  return data.data;
}
```

### Caching Strategy

| Data Type | Strategy | Revalidation |
|-----------|----------|--------------|
| Services list | `cache: 'no-store'` | Fresh on every request |
| Sub-service details | `cache: 'no-store'` | Fresh on every request |
| Static content | Default caching | ISR where applicable |

### Static Generation

Sub-service pages use `generateStaticParams` for SSG:

```typescript
export async function generateStaticParams() {
  const services = await getAllWebDevServices();
  const webDevService = services.find((s) => s.slug === 'web-dev');

  const subServices = await getWebDevSubServicesByServiceSlug(webDevService.slug);

  return subServices.map((subService) => ({
    slug: [subService.slug],
  }));
}

export const revalidate = 604800; // 7 days
```

---

## Page Sections

### Landing Page Components

| Component | File | Description |
|-----------|------|-------------|
| `Hero` | `landing/hero.tsx` | Main hero with CTA |
| `TrustBar` | `landing/TrustBar.tsx` | Client logos showcase |
| `TechSpotlight` | `landing/techSpotlight.tsx` | Technology highlights |
| `ImpactStats` | `landing/ImpactStats.tsx` | Key metrics/statistics |
| `Industries` | `landing/Industries.tsx` | Industry verticals served |
| `HowItWorks` | `landing/steps.tsx` | Process steps |
| `Testimonials` | `landing/testimonials.tsx` | Customer reviews |
| `FounderInsight` | `landing/FounderInsight.tsx` | Founder quote section |
| `FAQ` | `landing/FAQ.tsx` | Frequently asked questions |
| `CTA` | `landing/cta.tsx` | Call-to-action section |

### Sub-Service Page Components

| Component | File | Description |
|-----------|------|-------------|
| `HeroSection` | `_components/hero.tsx` | Service hero with image |
| `FeaturesSection` | `_components/features-section.tsx` | Service features grid |
| `ProcessSection` | `_components/process-section.tsx` | Development process steps |
| `PackagesSection` | `_components/packages-section.tsx` | Pricing packages |
| `CaseStudiesSection` | `_components/case-studies-section.tsx` | Project case studies |
| `TestimonialsSection` | `_components/testimonials-section.tsx` | Customer testimonials |
| `FAQSection` | `_components/faq-section.tsx` | Service FAQs |
| `CTASection` | `_components/cta-section.tsx` | Contact CTA |

### Shared Components

| Component | Location | Description |
|-----------|----------|-------------|
| `Navbar` | `components/navbar/` | Responsive navigation |
| `Footer` | `components/footer/` | Site footer with links |
| `ModeToggle` | `components/mode-toggle.tsx` | Theme switcher |
| `Providers` | `components/providers.tsx` | Context providers wrapper |

---

## SEO & Metadata

### Page Metadata

Each page exports metadata using Next.js conventions:

```typescript
// Static metadata
export const metadata: Metadata = {
  title: 'Web Development Services | Professional Web Solutions',
  description: 'Comprehensive web development services...',
};

// Dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const subService = await getSubService(params.slug);

  return {
    title: subService.metaTitle || subService.title,
    description: subService.metaDescription,
    openGraph: {
      title: subService.metaTitle,
      description: subService.metaDescription,
      images: subService.ogImage ? [subService.ogImage.url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: subService.metaTitle,
      description: subService.metaDescription,
    },
  };
}
```

### JSON-LD Structured Data

Service pages include Schema.org structured data:

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: subService.title,
  description: subService.description,
  provider: {
    '@type': 'Organization',
    name: 'PayPerCall',
  },
  // FAQ structured data
  mainEntity: {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  },
};

// In page component
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

---

## Styling

### TailwindCSS Configuration

The app uses TailwindCSS 4 with the shared `@workspace/ui` package:

```css
/* Import shared styles */
@import '@workspace/ui/globals.css';
```

### Theme Support

Dark/light mode using `next-themes`:

```tsx
// In Providers
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

### Font Configuration

Custom fonts defined in `app/fonts.ts`:

```typescript
import { Geist_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const gesistSans = Geist_Sans({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export const googleSansFlex = localFont({
  src: '../fonts/GoogleSansFlex-Regular.ttf',
  variable: '--font-google-sans-flex',
});
```

### Animation

Using Framer Motion for animations:

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
  {content}
</motion.div>
```

---

## Project Structure

```
apps/web/
├── app/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── fonts.ts                  # Font definitions
│   ├── favicon.ico
│   ├── services/
│   │   └── web-dev/
│   │       ├── page.tsx          # Services listing
│   │       └── [...slug]/
│   │           ├── page.tsx      # Dynamic service page
│   │           └── _components/  # Page components
│   │               ├── hero.tsx
│   │               ├── features-section.tsx
│   │               ├── process-section.tsx
│   │               ├── packages-section.tsx
│   │               ├── case-studies-section.tsx
│   │               ├── testimonials-section.tsx
│   │               ├── faq-section.tsx
│   │               └── cta-section.tsx
│   ├── hire-call-center/
│   │   ├── page.tsx
│   │   ├── _components/
│   │   │   ├── hero.tsx
│   │   │   ├── pricing-section.tsx
│   │   │   ├── services-breakdown.tsx
│   │   │   ├── testimonials-section.tsx
│   │   │   ├── trust-bar.tsx
│   │   │   └── why-choose-us.tsx
│   │   └── _data/
│   │       ├── case-studies.ts
│   │       ├── comparison.ts
│   │       ├── faq.ts
│   │       ├── process.ts
│   │       ├── services.ts
│   │       ├── stats.ts
│   │       └── testimonials.ts
│   └── advertiser-signup/
│       ├── page.tsx
│       └── _components/
│           ├── advertiserSignupForm.tsx
│           ├── multi-select-dropdown.tsx
│           └── vertical-dropdown.tsx
├── components/
│   ├── footer/
│   │   ├── footer.tsx
│   │   ├── footer-column.tsx
│   │   └── social-links.tsx
│   ├── landing/
│   │   ├── hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── techSpotlight.tsx
│   │   ├── ImpactStats.tsx
│   │   ├── Industries.tsx
│   │   ├── steps.tsx
│   │   ├── testimonials.tsx
│   │   ├── FounderInsight.tsx
│   │   ├── FAQ.tsx
│   │   └── cta.tsx
│   ├── navbar/
│   │   ├── navbar.tsx
│   │   ├── desktop-dropdown.tsx
│   │   ├── mobile-menu-item.tsx
│   │   ├── animations.ts
│   │   ├── data.ts
│   │   └── types.ts
│   ├── providers.tsx
│   └── mode-toggle.tsx
├── lib/
│   └── services/
│       └── web-dev-service.ts    # API service layer
├── hooks/
│   └── (custom hooks)
├── public/
│   └── (static assets)
├── next.config.mjs
├── next-env.d.ts
├── tsconfig.json
├── package.json
├── postcss.config.mjs
├── eslint.config.js
└── components.json               # shadcn/ui config
```

---

## Performance

### Optimization Features

1. **Turbopack**: Fast development builds
2. **Image Optimization**: Next.js Image component with remote patterns
3. **Font Optimization**: Local and Google fonts with `next/font`
4. **Code Splitting**: Automatic per-route code splitting
5. **Server Components**: Default server-side rendering

### Image Configuration

```javascript
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};
```

### Monitoring

Vercel Speed Insights integration for real-world performance data:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

// In RootLayout
<SpeedInsights />
```

---

## Development Workflow

### Adding a New Page

1. Create page file in `app/` directory
2. Add metadata export for SEO
3. Create page components in `_components/` subdirectory
4. Add data fetching in `lib/services/` if needed

### Adding a New Component

1. Create component in `components/`
2. Use `@workspace/ui` components where possible
3. Follow existing patterns for props and styling

### Working with the API

1. Add fetch function in `lib/services/`
2. Define TypeScript interfaces
3. Use in server components with proper caching strategy

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Self-Hosted

```bash
# Build
pnpm build

# Start production server
pnpm start
```

### Environment Variables for Production

Ensure these are set in your deployment environment:

- `NEXT_PUBLIC_API_URL` - Production API URL

---

## TypeScript Interfaces

### Service Types

```typescript
interface WebDevService {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImage: {
    url: string;
    publicId: string;
    alt?: string;
  } | null;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }> | null;
  processSteps: Array<{
    step: number;
    title: string;
    description: string;
    icon?: string;
  }> | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface WebDevSubService {
  id: string;
  serviceId: string;
  slug: string;
  title: string;
  description: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: ImageType | null;
  heroContent: {
    title: string;
    subtitle: string;
    description?: string;
    image?: ImageType;
    ctaText?: string;
    ctaLink?: string;
  } | null;
  features: FeatureType[] | null;
  processSteps: ProcessStepType[] | null;
  packages: PackageType[] | null;
  caseStudies: CaseStudyType[] | null;
  testimonials: TestimonialType[] | null;
  faqs: FAQType[] | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
```

---

## Contributing

1. Follow existing code patterns
2. Use TypeScript strictly
3. Run `pnpm lint` and `pnpm typecheck` before committing
4. Test in both light and dark modes
5. Test responsive design across breakpoints
6. Ensure SEO metadata is complete for new pages

---

## License

Private - All rights reserved.

