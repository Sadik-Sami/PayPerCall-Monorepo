# Core Closer Web Application

A modern, high-performance marketing website built with Next.js 16, React 19, and TypeScript. This is the public-facing website for Core Closer, showcasing services, generating leads, and providing information about the platform.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm package manager

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables (if needed)
cp .env.example .env
```

### Environment Variables

Create a `.env.local` file in the root of the `apps/web` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://paypercall-monorepo.onrender.com

# Optional: Analytics and other services
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Running the Application

```bash
# Development mode (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
apps/web/
├── app/                        # Next.js App Router
│   ├── page.tsx               # Homepage
│   ├── layout.tsx             # Root layout
│   ├── fonts.ts               # Font configuration
│   ├── sitemap.ts             # Dynamic sitemap
│   ├── robots.ts              # Robots.txt
│   ├── advertiser-signup/     # Advertiser signup page
│   │   ├── page.tsx
│   │   └── _components/       # Page-specific components
│   ├── hire-call-center/      # Call center hiring page
│   │   ├── page.tsx
│   │   ├── _components/
│   │   └── _data/             # Page data and content
│   ├── services/              # Service pages
│   │   └── web-dev/           # Web development services
│   │       ├── page.tsx       # Overview
│   │       ├── business/      # Business websites
│   │       ├── ecommerce/     # Ecommerce websites
│   │       ├── full-stack/    # Full-stack development
│   │       └── landing-page/   # Landing pages
│   ├── blogs/                 # Blog listing and detail pages
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   └── api/                   # API routes
│       └── draft/             # Draft blog preview
│           └── enable|disable/
│               └── route.ts
├── components/                # Reusable components
│   ├── landing/              # Landing page components
│   │   ├── hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── ImpactStats.tsx
│   │   ├── Industries.tsx
│   │   ├── steps.tsx
│   │   ├── testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── cta.tsx
│   │   └── techSpotlight.tsx
│   ├── services/             # Service page components
│   │   ├── service-hero.tsx
│   │   ├── pricing-table.tsx
│   │   ├── process-steps.tsx
│   │   ├── testimonials.tsx
│   │   ├── faq-section.tsx
│   │   └── ... (many more)
│   ├── blog/                 # Blog components
│   │   ├── BlockRenderer.tsx
│   │   ├── ArticleJsonLd.tsx
│   │   └── renderInline.tsx
│   ├── navbar/               # Navigation components
│   │   ├── navbar.tsx
│   │   ├── desktop-dropdown.tsx
│   │   ├── mobile-menu-item.tsx
│   │   ├── data.ts
│   │   └── types.ts
│   ├── footer/               # Footer components
│   │   ├── footer.tsx
│   │   ├── footer-column.tsx
│   │   └── social-links.tsx
│   ├── logo.tsx
│   ├── mode-toggle.tsx       # Dark/light mode toggle
│   └── providers.tsx         # React providers
├── lib/                      # Utility libraries
│   ├── api/                  # API client functions
│   │   └── blogs.ts
│   ├── validations/          # Form validation schemas
│   │   └── advertiser-signup.ts
│   └── animations.ts         # Animation utilities
├── hooks/                    # Custom React hooks
├── types/                    # TypeScript type definitions
│   ├── blog.ts
│   └── services.ts
├── public/                   # Static assets
│   ├── images/              # Images
│   ├── fonts/               # Custom fonts
│   └── social/              # Social media icons
├── next.config.mjs          # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## 🎨 Features

### Core Features

- **Modern Landing Page**: Hero section, trust indicators, statistics, industries showcase
- **Service Pages**: Detailed service pages for Pay Per Call, Pay Per Lead, Digital Marketing, Web Development
- **Blog System**: Dynamic blog listing and detail pages with rich content blocks
- **Advertiser Signup**: Multi-step form for advertiser registration
- **Hire Call Center**: Dedicated page for call center services
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **Dark Mode**: Theme toggle with persistent user preference
- **SEO Optimized**: Meta tags, structured data, sitemap, robots.txt
- **Performance Optimized**: Image optimization, code splitting, lazy loading

### Technical Features

- **Server-Side Rendering (SSR)**: Fast initial page loads
- **Static Site Generation (SSG)**: Pre-rendered pages for better performance
- **Incremental Static Regeneration (ISR)**: Fresh content with static performance
- **API Routes**: Serverless functions for draft preview functionality
- **Image Optimization**: Next.js Image component with automatic optimization
- **Font Optimization**: Custom fonts with optimal loading strategy

## 🛣️ Routes

### Public Routes

- `/` - Homepage
- `/services/web-dev` - Web development services overview
- `/services/web-dev/business` - Business websites
- `/services/web-dev/ecommerce` - Ecommerce websites
- `/services/web-dev/full-stack` - Full-stack development
- `/services/web-dev/landing-page` - Landing page development
- `/advertiser-signup` - Advertiser registration form
- `/hire-call-center` - Call center hiring page
- `/blogs` - Blog listing page
- `/blogs/[slug]` - Individual blog post

### API Routes

- `/api/draft/enable` - Enable draft preview mode
- `/api/draft/disable` - Disable draft preview mode

## 🎯 Key Components

### Landing Page Components

- **Hero**: Main hero section with CTA
- **TrustBar**: Trust indicators and certifications
- **ImpactStats**: Key statistics and metrics
- **Industries**: Industry showcase grid
- **HowItWorks**: Process steps visualization
- **Testimonials**: Client testimonials carousel
- **FAQ**: Frequently asked questions
- **CTA**: Call-to-action section

### Service Components

- **ServiceHero**: Service page hero section
- **PricingTable**: Service pricing comparison
- **ProcessSteps**: Service delivery process
- **TestimonialsSection**: Service-specific testimonials
- **FAQSection**: Service FAQs
- **TechMarquee**: Technology stack showcase
- **IntegrationLogos**: Integration partners

### Navigation

- **Navbar**: Main navigation with dropdown menus
- **Footer**: Site footer with links and social media

## 📝 Content Management

### Blog System

The blog system integrates with the API to fetch and display blog posts:

- **Listing Page**: Shows all published blogs with pagination
- **Detail Page**: Displays individual blog posts with rich content blocks
- **Draft Preview**: Preview unpublished blogs with secret token

### Rich Content Blocks

Blogs support various content block types:
- Paragraphs
- Headings
- Lists
- Images
- Code blocks
- And more (extensible system)

## 🎨 Styling

### Tailwind CSS

The application uses Tailwind CSS for styling with:
- Custom color palette
- Responsive breakpoints
- Dark mode support
- Custom animations

### Design System

Components are built using shadcn/ui patterns:
- Consistent component API
- Accessible by default
- Customizable via Tailwind classes

## 🔧 Configuration

### Next.js Configuration

Key configurations in `next.config.mjs`:
- Package transpilation for monorepo
- Image domain allowlist
- Performance optimizations

### TypeScript

Strict TypeScript configuration for:
- Type safety
- Better developer experience
- Catch errors at compile time

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Configure environment variables
5. Deploy automatically on push

### Other Platforms

The application can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with Node.js

## 📊 Performance

### Optimizations

- **Image Optimization**: Automatic image optimization via Next.js
- **Code Splitting**: Automatic code splitting for optimal bundle sizes
- **Font Optimization**: Optimized font loading strategy
- **Static Generation**: Pre-rendered pages where possible
- **Lazy Loading**: Components and images loaded on demand

### Core Web Vitals

The application is optimized for:
- **LCP (Largest Contentful Paint)**: Fast initial load
- **FID (First Input Delay)**: Responsive interactions
- **CLS (Cumulative Layout Shift)**: Stable layouts

## 🔍 SEO

### SEO Features

- **Meta Tags**: Dynamic meta tags per page
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Dynamic XML sitemap generation
- **Robots.txt**: Search engine crawling instructions
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter sharing optimization

## 🧪 Development

### Code Style

- TypeScript strict mode
- ESLint for code quality
- Consistent component structure
- Component co-location

### Adding New Pages

1. Create page in `app/[route]/page.tsx`
2. Add route to navigation in `components/navbar/data.ts`
3. Create page-specific components in `components/` or `app/[route]/_components/`
4. Add metadata for SEO

### Adding New Components

1. Create component in appropriate `components/` subdirectory
2. Export from index file if needed
3. Use TypeScript for type safety
4. Follow existing component patterns

## 📦 Dependencies

### Core Dependencies

- **next**: React framework
- **react**: UI library
- **react-dom**: React DOM renderer
- **typescript**: Type safety
- **tailwindcss**: Styling
- **framer-motion**: Animations
- **lucide-react**: Icons
- **react-hook-form**: Form handling
- **zod**: Schema validation
- **next-themes**: Theme management

### Development Dependencies

- **@types/node**: Node.js types
- **@types/react**: React types
- **eslint**: Code linting

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run typecheck`

**Image Loading Issues**
- Verify image domain is in `next.config.mjs`
- Check image URLs are correct
- Ensure images are in `public/` or use external URLs

**API Connection Issues**
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check API is running and accessible
- Review browser console for CORS errors

## 📄 License

Private - Core Closer Platform

