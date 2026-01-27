# Core Closer Platform

A comprehensive monorepo platform for Core Closer, featuring a marketing website, admin dashboard, and RESTful API. Built with modern technologies and best practices for performance, scalability, and maintainability.

## 🏗️ Architecture

This monorepo contains three main applications:

### 📱 [Web Application](./apps/web/) (`apps/web`)
**Live:** https://pay-per-call-monorepo-web.vercel.app/

The public-facing marketing website built with Next.js 16 and React 19. Features include:
- Modern, responsive landing pages
- Service showcase pages
- Blog system with rich content
- Advertiser signup forms
- SEO optimization
- Dark mode support

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion

### 🎛️ [Admin Dashboard](./apps/admin/) (`apps/admin`)
**Live:** https://pay-per-call-monorepo-admin.vercel.app/

A powerful admin dashboard for managing all aspects of the Core Closer platform. Features include:
- Content management (blogs, news, packages)
- User management
- Lead tracking
- Rich text editor with block-based content
- Role-based access control
- Dark mode interface

**Tech Stack:** React 19, Vite, TypeScript, TanStack Query, TipTap, shadcn/ui

### 🔌 [API Server](./apps/api/) (`apps/api`)
**Live:** https://paypercall-monorepo.onrender.com/

A robust RESTful API built with Express.js and TypeScript. Features include:
- JWT authentication with refresh tokens
- Blog content management
- User management
- File uploads via Cloudinary
- Rate limiting and security
- PostgreSQL database with Drizzle ORM

**Tech Stack:** Express.js, TypeScript, PostgreSQL, Drizzle ORM, JWT, Cloudinary

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or pnpm package manager

### Installation

```bash
# Install dependencies for all apps
npm install

# Or using pnpm (recommended for monorepos)
pnpm install
```

### Environment Setup

Each application requires its own environment variables. See individual README files:
- [Web App Environment Variables](./apps/web/README.md#environment-variables)
- [Admin Dashboard Environment Variables](./apps/admin/README.md#environment-variables)
- [API Environment Variables](./apps/api/README.md#environment-variables)

### Running Applications

```bash
# Run all applications in development mode
npm run dev

# Or run individually:
cd apps/web && npm run dev      # Web app on :3000
cd apps/admin && npm run dev    # Admin on :5173
cd apps/api && npm run dev       # API on :3001
```

## 📁 Monorepo Structure

```
PayPerCall/
├── apps/
│   ├── web/          # Next.js marketing website
│   ├── admin/        # React admin dashboard
│   └── api/          # Express.js API server
├── packages/
│   └── ui/           # Shared UI components (shadcn/ui)
├── README.md         # This file
└── package.json      # Root package.json
```

## 🛠️ Development

### Adding Components

To add shadcn/ui components to the web app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Components will be placed in `packages/ui/src/components/` and can be imported from `@workspace/ui/components/[component-name]`.

### Shared Packages

- **@workspace/ui**: Shared UI component library
- **@workspace/typescript-config**: Shared TypeScript configuration
- **@workspace/eslint-config**: Shared ESLint configuration

## 📚 Documentation

Each application has detailed documentation:

- **[Web Application README](./apps/web/README.md)** - Marketing website documentation
- **[Admin Dashboard README](./apps/admin/README.md)** - Admin panel documentation
- **[API README](./apps/api/README.md)** - API server documentation

## 🔗 Application Links

- **Web App:** https://pay-per-call-monorepo-web.vercel.app/
- **Admin Dashboard:** https://pay-per-call-monorepo-admin.vercel.app/
- **API Server:** https://paypercall-monorepo.onrender.com/

## 🔐 Security

- JWT-based authentication with refresh tokens
- Role-based access control
- Rate limiting on API endpoints
- CORS configuration for allowed origins
- Input validation with Zod schemas
- Secure password hashing with bcrypt

## 🚢 Deployment

### Web Application (Vercel)
- Automatically deploys on push to main branch
- Environment variables configured in Vercel dashboard
- Optimized for Next.js with edge functions

### Admin Dashboard (Vercel)
- Static site deployment
- Environment variables configured in Vercel dashboard
- CDN-optimized for fast global access

### API Server (Render)
- Web service deployment
- Environment variables configured in Render dashboard
- Automatic health checks and restarts

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 📦 Technology Stack

### Frontend
- **React 19** - UI library
- **Next.js 16** - React framework (web app)
- **Vite** - Build tool (admin)
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **TanStack Query** - Server state management (admin)
- **TipTap** - Rich text editor (admin)

### Backend
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Drizzle ORM** - Type-safe ORM
- **JWT** - Authentication
- **Cloudinary** - Image hosting
- **bcryptjs** - Password hashing

### DevOps
- **Vercel** - Frontend hosting
- **Render** - API hosting
- **GitHub** - Version control
- **Monorepo** - Turborepo/pnpm workspaces

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Private - Core Closer Platform

## 📞 Support

For questions or issues:
1. Check the individual application README files
2. Review the codebase documentation
3. Contact the development team

---

**Built with ❤️ for Core Closer**
