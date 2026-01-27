# Core Closer Admin Dashboard

A modern, feature-rich admin dashboard built with React 19, Vite, TypeScript, and TanStack Query. This application provides administrators with tools to manage content, users, leads, and all aspects of the Core Closer platform.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm package manager

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root of the `apps/admin` directory:

```env
# API Configuration
VITE_API_URL=https://paypercall-monorepo.onrender.com

# Optional: Feature flags
VITE_ENABLE_ANALYTICS=true
```

### Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
apps/admin/
├── src/
│   ├── App.tsx                # Main app component with routing
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles
│   ├── assets/                # Static assets
│   ├── components/            # React components
│   │   ├── auth/              # Authentication components
│   │   │   ├── login-form.tsx
│   │   │   └── signup-form.tsx
│   │   ├── blog/              # Blog management components
│   │   │   ├── block-editor-panel.tsx
│   │   │   ├── block-list.tsx
│   │   │   └── block-utils.ts
│   │   ├── common/            # Shared components
│   │   │   ├── loading.tsx
│   │   │   ├── insufficient-permissions.tsx
│   │   │   └── mode-toggle.tsx
│   │   ├── dashboard/         # Dashboard components
│   │   │   └── app-sidebar.tsx
│   │   └── ui/                # UI component library (shadcn/ui)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── sidebar.tsx
│   │       └── ... (more components)
│   ├── config/                # Configuration files
│   │   └── api.config.ts      # API client configuration
│   ├── contexts/              # React contexts
│   │   └── auth.context.ts    # Authentication context
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-auth.ts        # Authentication hook
│   │   ├── use-blogs.ts       # Blog management hook
│   │   ├── use-role.ts        # Role-based access hook
│   │   ├── use-mobile.ts      # Mobile detection hook
│   │   └── use-debounced-callback.ts
│   ├── layout/                 # Layout components
│   │   ├── private-layout.tsx # Protected route layout
│   │   └── public-layout.tsx  # Public route layout
│   ├── pages/                 # Page components
│   │   ├── auth/              # Authentication pages
│   │   │   ├── login.tsx
│   │   │   └── signup.tsx
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── index.tsx      # Dashboard home
│   │   │   ├── blogs.tsx      # Blog listing
│   │   │   ├── blog-create.tsx # Create blog
│   │   │   ├── blog-edit.tsx   # Edit blog
│   │   │   ├── news.tsx        # News management
│   │   │   ├── packages.tsx   # Package management
│   │   │   ├── leads.tsx       # Lead management
│   │   │   └── profile.tsx     # User profile
│   │   ├── index.tsx          # Root redirect
│   │   └── not-found.tsx      # 404 page
│   ├── providers/             # Context providers
│   │   ├── auth.provider.tsx  # Authentication provider
│   │   ├── query.provider.tsx # TanStack Query provider
│   │   └── theme.provider.tsx # Theme provider
│   ├── schemas/               # Zod validation schemas
│   │   ├── auth.schema.ts     # Auth validation
│   │   ├── blog.schema.ts     # Blog validation
│   │   └── user.schema.ts     # User validation
│   ├── services/              # API service functions
│   │   ├── auth.api.ts        # Authentication API
│   │   ├── blog.api.ts        # Blog API
│   │   ├── user.api.ts        # User API
│   │   ├── uploads.api.ts     # File upload API
│   │   └── axios.ts           # Axios instance
│   ├── types/                 # TypeScript types
│   │   ├── api.types.ts       # API response types
│   │   ├── auth.types.ts      # Authentication types
│   │   ├── blog.types.ts      # Blog types
│   │   └── user.types.ts      # User types
│   ├── utils/                 # Utility functions
│   │   ├── constants.ts       # App constants
│   │   └── token.util.ts      # Token utilities
│   └── lib/                   # Library utilities
│       └── utils.ts           # General utilities
├── public/                    # Public static assets
├── index.html                 # HTML template
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
└── package.json
```

## 🎨 Features

### Core Features

- **Authentication System**: Secure login and signup with JWT tokens
- **Dashboard Overview**: Statistics and quick actions
- **Blog Management**: Full CRUD operations for blog posts
  - Rich text editor with TipTap
  - Block-based content system
  - Draft and publish workflow
  - Image uploads via Cloudinary
- **User Management**: View and manage user accounts
- **Lead Management**: Track and manage leads (placeholder)
- **Package Management**: Manage service packages (placeholder)
- **News Management**: Manage news articles (placeholder)
- **Profile Management**: Update user profile and settings
- **Dark Mode**: Theme toggle with persistent preference
- **Responsive Design**: Mobile-friendly interface

### Technical Features

- **Role-Based Access Control**: Admin and user roles
- **Protected Routes**: Authentication-required routes
- **Optimistic Updates**: Instant UI updates with TanStack Query
- **Form Validation**: Zod schema validation
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Skeleton loaders and loading indicators
- **Toast Notifications**: User feedback via Sonner

## 🛣️ Routes

### Public Routes

- `/login` - Login page
- `/signup` - Signup page

### Protected Routes (Require Authentication)

- `/dashboard` - Dashboard home
- `/dashboard/blogs` - Blog listing
- `/dashboard/blogs/new` - Create new blog
- `/dashboard/blogs/edit/:id` - Edit blog
- `/dashboard/news` - News management
- `/dashboard/packages` - Package management
- `/dashboard/leads` - Lead management
- `/dashboard/profile` - User profile

## 🔐 Authentication

### Authentication Flow

1. **Login**: User enters credentials
2. **Token Storage**: Access token stored in memory, refresh token in HTTP-only cookie
3. **Protected Routes**: Routes check authentication status
4. **Token Refresh**: Automatic token refresh on expiration
5. **Logout**: Clear tokens and redirect to login

### Role-Based Access

- **Admin**: Full access to all features
- **User**: Limited access (if implemented)

## 📝 Blog Management

### Blog Editor

The blog editor uses TipTap for rich text editing:

- **Block-Based System**: Content organized into blocks
- **Block Types**: Paragraphs, headings, lists, images, code, etc.
- **Drag and Drop**: Reorder blocks with @dnd-kit
- **Image Upload**: Direct upload to Cloudinary
- **Draft Mode**: Save drafts before publishing
- **Preview**: Preview before publishing

### Blog Workflow

1. Create new blog post
2. Add content blocks
3. Upload images as needed
4. Save as draft
5. Preview content
6. Publish when ready

## 🎨 UI Components

### Component Library

Built with shadcn/ui components:
- **Button**: Various button styles and sizes
- **Card**: Content containers
- **Form**: Form components with validation
- **Input**: Text inputs
- **Sidebar**: Collapsible sidebar navigation
- **Dialog**: Modal dialogs
- **Dropdown Menu**: Context menus
- **Toast**: Notification system
- **Avatar**: User avatars
- **Badge**: Status indicators

### Design System

- **Tailwind CSS**: Utility-first styling
- **Dark Mode**: Full dark mode support
- **Responsive**: Mobile-first design
- **Accessible**: WCAG compliant components

## 🔧 Configuration

### Vite Configuration

Key configurations in `vite.config.ts`:
- React plugin
- Tailwind CSS plugin
- Path aliases (`@/` for `src/`)
- Build optimizations

### API Configuration

API client configured in `src/config/api.config.ts`:
- Base URL from environment
- Request interceptors for auth tokens
- Response interceptors for error handling
- Automatic token refresh

## 🚀 Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure environment variables
5. Deploy automatically on push

### Other Platforms

The application can be deployed to:
- Netlify
- AWS Amplify
- GitHub Pages (with adjustments)
- Any static hosting service

## 📊 State Management

### TanStack Query

Used for server state management:
- **Automatic Caching**: Cache API responses
- **Background Refetching**: Keep data fresh
- **Optimistic Updates**: Instant UI updates
- **Error Handling**: Automatic error handling
- **Loading States**: Built-in loading states

### React Context

Used for:
- **Authentication State**: User session
- **Theme State**: Dark/light mode

## 🧪 Development

### Code Style

- TypeScript strict mode
- ESLint for code quality
- Consistent component structure
- Custom hooks for reusable logic

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation item in sidebar if needed
4. Create API service functions if needed

### Adding New Features

1. Create feature components
2. Add API service functions
3. Create validation schemas
4. Add types
5. Update routing if needed

## 📦 Dependencies

### Core Dependencies

- **react**: UI library
- **react-dom**: React DOM renderer
- **react-router**: Client-side routing
- **@tanstack/react-query**: Server state management
- **axios**: HTTP client
- **zod**: Schema validation
- **react-hook-form**: Form handling
- **@hookform/resolvers**: Form validation resolvers
- **@tiptap/react**: Rich text editor
- **@dnd-kit**: Drag and drop
- **lucide-react**: Icons
- **tailwindcss**: Styling
- **next-themes**: Theme management
- **sonner**: Toast notifications

### Development Dependencies

- **vite**: Build tool
- **typescript**: Type safety
- **@vitejs/plugin-react**: React plugin for Vite
- **@tailwindcss/vite**: Tailwind plugin
- **eslint**: Code linting

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Clear `dist` directory: `rm -rf dist`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: Review terminal output

**API Connection Issues**
- Verify `VITE_API_URL` is set correctly
- Check API is running and accessible
- Review browser console for CORS errors
- Check network tab for request details

**Authentication Issues**
- Clear browser cookies and localStorage
- Verify API authentication endpoints
- Check token expiration settings
- Review authentication flow in browser dev tools

**Editor Issues**
- Clear browser cache
- Check TipTap dependencies
- Verify Cloudinary configuration for image uploads

## 🔒 Security

### Best Practices

- Tokens stored securely (HTTP-only cookies for refresh tokens)
- Input validation on all forms
- XSS protection via React
- CSRF protection via same-site cookies
- Role-based access control

## 📄 License

Private - Core Closer Platform
