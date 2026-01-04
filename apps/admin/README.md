# PayPerCall Admin Dashboard

A modern admin dashboard built with React, TypeScript, Vite, and TailwindCSS. This application provides a comprehensive interface for managing web development services, content, users, and file uploads.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Features](#features)
- [Application Routes](#application-routes)
- [Architecture](#architecture)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [State Management](#state-management)
- [UI Components](#ui-components)
- [Project Structure](#project-structure)

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite 7** | Build tool & dev server |
| **TailwindCSS 4** | Styling |
| **React Router 7** | Client-side routing |
| **TanStack Query** | Server state management |
| **React Hook Form** | Form handling |
| **Zod** | Schema validation |
| **Axios** | HTTP client |
| **Lucide React** | Icons |
| **Radix UI** | Headless UI components |
| **Tiptap** | Rich text editor |
| **dnd-kit** | Drag and drop |
| **Sonner** | Toast notifications |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Running API server (apps/api)

### Installation

```bash
# Navigate to the admin directory
cd apps/admin

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Start development server
pnpm dev
```

The admin dashboard will be available at `http://localhost:5173`

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

---

## Environment Variables

Create a `.env` file in the `apps/admin` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5000` |

---

## Features

### Authentication
- Secure login with JWT tokens
- Automatic token refresh
- Session management
- Role-based access control

### Web Development Services Management
- Create, edit, delete services
- Drag-and-drop reordering
- Rich text descriptions
- Image uploads (Cloudinary)
- SEO metadata management

### Sub-Services Management
- Nested sub-services under parent services
- Hero content customization
- Features and process steps editors
- FAQs management
- Packages, case studies, testimonials

### Content Management
- Packages with pricing and features
- Case studies with results metrics
- Customer testimonials with ratings
- FAQ management

### User Management (Admin Only)
- View all users
- Change user roles
- Profile management

### File Management
- Image upload to Cloudinary
- Automatic image optimization
- Bulk upload support

---

## Application Routes

### Public Routes (No Authentication Required)

| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | `LoginPage` | User login |
| `/signup` | `SignupPage` | User registration |

### Protected Routes (Authentication Required)

| Route | Component | Description |
|-------|-----------|-------------|
| `/dashboard` | `DashboardPage` | Main dashboard |
| `/dashboard/profile` | `ProfilePage` | User profile management |

### Web Dev Services Routes (Admin Only)

| Route | Component | Description |
|-------|-----------|-------------|
| `/dashboard/web-dev-services` | `WebDevServicesPage` | List all services |
| `/dashboard/web-dev-services/create` | `CreateWebDevServicePage` | Create new service |
| `/dashboard/web-dev-services/:id/edit` | `EditWebDevServicePage` | Edit service |

### Sub-Services Routes (Admin Only)

| Route | Component | Description |
|-------|-----------|-------------|
| `/dashboard/web-dev-services/:id/sub-services` | `SubServicesListPage` | List sub-services |
| `/dashboard/web-dev-services/:id/sub-services/create` | `CreateSubServicePage` | Create sub-service |
| `/dashboard/web-dev-services/:id/sub-services/:subId/edit` | `EditSubServicePage` | Edit sub-service |

### Sub-Service Content Routes (Admin Only)

| Route | Component | Description |
|-------|-----------|-------------|
| `/dashboard/web-dev-services/:id/sub-services/:subId/packages` | `SubServicePackagesPage` | Manage packages |
| `/dashboard/web-dev-services/:id/sub-services/:subId/case-studies` | `SubServiceCaseStudiesPage` | Manage case studies |
| `/dashboard/web-dev-services/:id/sub-services/:subId/testimonials` | `SubServiceTestimonialsPage` | Manage testimonials |
| `/dashboard/web-dev-services/:id/sub-services/:subId/faqs` | `SubServiceFAQsPage` | Manage FAQs |

### Placeholder Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/dashboard/blogs` | `BlogsPage` | Blog management (TBD) |
| `/dashboard/news` | `NewsPage` | News management (TBD) |
| `/dashboard/packages` | `PackagesPage` | Global packages (TBD) |
| `/dashboard/leads` | `LeadsPage` | Lead management (TBD) |

---

## Architecture

### Component Architecture

```
App
├── QueryProvider (TanStack Query)
│   └── TooltipProvider (Radix)
│       └── BrowserRouter (React Router)
│           └── AuthProvider (Custom)
│               └── ThemeProvider (next-themes)
│                   └── Routes
│                       ├── PublicLayout
│                       │   ├── LoginPage
│                       │   └── SignupPage
│                       └── PrivateLayout
│                           ├── AppSidebar
│                           └── Page Content
```

### Data Flow

```
Component → React Hook Form → Zod Validation → API Service → Axios → Backend API
                                                    ↓
Component ← TanStack Query (Cache) ← API Response ←─┘
```

---

## API Integration

### API Configuration

All API endpoints are configured in `src/config/api.config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      SIGNUP: '/api/auth/signup',
      REFRESH: '/api/auth/refresh',
      LOGOUT: '/api/auth/logout',
    },
    USER: {
      ME: '/api/users/me',
      UPDATE_ME: '/api/users/me',
      ROLE: '/api/users/role',
      CHANGE_PASSWORD: '/api/users/change-password',
    },
    WEB_DEV_SERVICES: {
      LIST: '/api/web-dev-services',
      BY_SLUG: (slug: string) => `/api/web-dev-services/${slug}`,
      BY_ID: (id: string) => `/api/web-dev-services/by-id/${id}`,
      // ... more endpoints
    },
    UPLOAD: {
      IMAGE: '/api/upload/image',
      IMAGES: '/api/upload/images',
      DELETE: '/api/upload/image',
    },
  },
  TIMEOUT: 30000,
};
```

### Axios Instance

A configured Axios instance handles authentication, token refresh, and error handling:

```typescript
// src/services/axios.ts
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true, // For cookie-based refresh tokens
});

// Request interceptor adds Authorization header
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor handles token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Attempt token refresh
      const newToken = await refreshToken();
      if (newToken) {
        // Retry original request
        return api(error.config);
      }
    }
    return Promise.reject(error);
  }
);
```

### API Service Example

```typescript
// src/services/web-dev-services.api.ts
export const webDevServicesApi = {
  // Get all services
  getAll: async (includeInactive = false) => {
    const response = await api.get(API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.LIST, {
      params: { includeInactive },
    });
    return response.data;
  },

  // Create service
  create: async (data: CreateWebDevServiceInput) => {
    const response = await api.post(
      API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.CREATE,
      data
    );
    return response.data;
  },

  // Update service
  update: async (id: string, data: UpdateWebDevServiceInput) => {
    const response = await api.patch(
      API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.UPDATE(id),
      data
    );
    return response.data;
  },

  // Delete service
  delete: async (id: string) => {
    const response = await api.delete(
      API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.DELETE(id)
    );
    return response.data;
  },
};
```

---

## Authentication

### Auth Context

The auth context (`src/contexts/auth.context.ts`) provides:

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
```

### Auth Provider

The `AuthProvider` (`src/providers/auth.provider.tsx`):

1. Checks for existing session on mount
2. Manages access token in memory
3. Handles automatic token refresh
4. Provides login/logout functionality

### Protected Routes

The `PrivateLayout` component:

1. Checks if user is authenticated
2. Redirects to login if not authenticated
3. Optionally checks for required roles

```typescript
// Example usage in PrivateLayout
const { isAuthenticated, isLoading, user } = useAuth();

if (isLoading) return <LoadingSpinner />;
if (!isAuthenticated) return <Navigate to="/login" />;
if (requiredRole && user?.role !== requiredRole) {
  return <InsufficientPermissions />;
}
```

### Hooks

```typescript
// src/hooks/use-auth.ts
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// src/hooks/use-role.ts
export function useRole() {
  const { user } = useAuth();
  return {
    role: user?.role,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
  };
}
```

---

## State Management

### Server State (TanStack Query)

Used for all API data:

```typescript
// Queries (GET requests)
const { data, isLoading, error } = useQuery({
  queryKey: ['web-dev-services'],
  queryFn: () => webDevServicesApi.getAll(),
});

// Mutations (POST, PATCH, DELETE)
const mutation = useMutation({
  mutationFn: webDevServicesApi.create,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['web-dev-services'] });
    toast.success('Service created successfully');
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
```

### Client State

- **Auth state**: React Context (`AuthProvider`)
- **Theme state**: `next-themes` (`ThemeProvider`)
- **Form state**: React Hook Form
- **UI state**: Local component state

---

## UI Components

### Custom Components

| Component | Location | Description |
|-----------|----------|-------------|
| `AppSidebar` | `components/dashboard/` | Navigation sidebar |
| `LoginForm` | `components/auth/` | Login form with validation |
| `SignupForm` | `components/auth/` | Registration form |
| `ImageUpload` | `components/editors/` | Cloudinary image uploader |
| `RichTextEditor` | `components/editors/` | Tiptap-based WYSIWYG editor |
| `FeaturesEditor` | `components/editors/` | Features list editor |
| `ProcessStepsEditor` | `components/editors/` | Process steps editor |
| `SortableList` | `components/editors/` | Drag-and-drop list |
| `Loading` | `components/common/` | Loading spinner |
| `ModeToggle` | `components/common/` | Dark/light mode toggle |
| `InsufficientPermissions` | `components/common/` | Access denied message |

### Shadcn/UI Components

Located in `src/components/ui/`:

- `Button`, `Card`, `Form`, `Input`, `Label`
- `Dialog`, `Sheet`, `Dropdown Menu`
- `Avatar`, `Badge`, `Skeleton`
- `Sidebar`, `Separator`, `Tooltip`
- `Sonner` (Toast notifications)

### Component Usage Example

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { ImageUpload } from '@/components/editors/image-upload';
import { RichTextEditor } from '@/components/editors/rich-text-editor';

function CreateServiceForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Service</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="heroImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      folder="services"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
```

---

## Project Structure

```
apps/admin/src/
├── assets/                       # Static assets
├── components/
│   ├── auth/                     # Authentication components
│   │   ├── login-form.tsx
│   │   └── signup-form.tsx
│   ├── common/                   # Shared components
│   │   ├── insufficient-permissions.tsx
│   │   ├── loading.tsx
│   │   └── mode-toggle.tsx
│   ├── dashboard/                # Dashboard components
│   │   └── app-sidebar.tsx
│   ├── editors/                  # Content editors
│   │   ├── features-editor.tsx
│   │   ├── image-upload.tsx
│   │   ├── process-steps-editor.tsx
│   │   ├── rich-text-editor.tsx
│   │   └── sortable-list.tsx
│   ├── ui/                       # Shadcn/UI components
│   └── NavLink.tsx
├── config/
│   └── api.config.ts             # API endpoints configuration
├── contexts/
│   └── auth.context.ts           # Auth context definition
├── hooks/
│   ├── use-auth.ts               # Auth hook
│   ├── use-mobile.ts             # Mobile detection hook
│   └── use-role.ts               # Role check hook
├── layout/
│   ├── private-layout.tsx        # Authenticated layout
│   └── public-layout.tsx         # Public layout
├── lib/
│   └── utils.ts                  # Utility functions (cn, etc.)
├── pages/
│   ├── auth/
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── dashboard/
│   │   ├── index.tsx             # Dashboard home
│   │   ├── profile.tsx
│   │   ├── blogs.tsx
│   │   ├── news.tsx
│   │   ├── packages.tsx
│   │   ├── leads.tsx
│   │   └── web-dev-services/
│   │       ├── index.tsx         # Services list
│   │       ├── create.tsx        # Create service
│   │       ├── edit/
│   │       │   └── index.tsx     # Edit service
│   │       └── sub-services/
│   │           ├── index.tsx     # Sub-services list
│   │           ├── create.tsx    # Create sub-service
│   │           ├── edit.tsx      # Edit sub-service
│   │           ├── packages/
│   │           ├── case-studies/
│   │           ├── testimonials/
│   │           └── faqs/
│   ├── index.tsx                 # Root redirect
│   └── not-found.tsx             # 404 page
├── providers/
│   ├── auth.provider.tsx         # Auth state provider
│   ├── query.provider.tsx        # TanStack Query provider
│   └── theme.provider.tsx        # Theme provider
├── schemas/
│   ├── auth.schema.ts            # Auth validation schemas
│   └── user.schema.ts            # User validation schemas
├── services/
│   ├── auth.api.ts               # Auth API calls
│   ├── axios.ts                  # Axios instance
│   ├── upload.api.ts             # Upload API calls
│   ├── user.api.ts               # User API calls
│   └── web-dev-services.api.ts   # Web dev services API
├── types/
│   ├── api.types.ts              # API response types
│   ├── auth.types.ts             # Auth types
│   ├── user.types.ts             # User types
│   └── web-dev-services.types.ts # Service types
├── utils/
│   ├── constants.ts              # Route constants, roles
│   └── token.util.ts             # Token management
├── App.tsx                       # Main app component
├── main.tsx                      # Entry point
└── index.css                     # Global styles
```

---

## Development Workflow

### Creating a New Page

1. Create page component in `src/pages/`
2. Add route to `src/App.tsx`
3. Add route constant to `src/utils/constants.ts`
4. Add sidebar link if needed in `AppSidebar`

### Creating a New API Service

1. Add endpoints to `src/config/api.config.ts`
2. Create service file in `src/services/`
3. Add types in `src/types/`
4. Create validation schemas if needed

### Adding UI Components

1. Generate with shadcn/ui: `npx shadcn@latest add <component>`
2. Or create custom component in `src/components/`
3. Follow existing patterns for consistency

---

## Theming

The app supports light and dark modes using `next-themes`:

```typescript
// Toggle theme
const { setTheme } = useTheme();
setTheme('dark'); // or 'light' or 'system'

// Get current theme
const { theme, resolvedTheme } = useTheme();
```

TailwindCSS classes automatically adapt:
- Light mode: Default colors
- Dark mode: `dark:` variant classes

---

## Form Validation

Forms use React Hook Form with Zod validation:

```typescript
// Define schema
const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

// Use in component
const form = useForm<ServiceFormData>({
  resolver: zodResolver(serviceSchema),
  defaultValues: {
    title: '',
    slug: '',
    description: '',
    isActive: true,
  },
});
```

---

## Error Handling

### API Errors

```typescript
// In mutations
const mutation = useMutation({
  mutationFn: createService,
  onError: (error: AxiosError<ApiError>) => {
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
  },
});
```

### Global Error Boundary

Consider adding an error boundary for catching runtime errors:

```typescript
// src/components/error-boundary.tsx
class ErrorBoundary extends Component {
  // ... implementation
}
```

---

## Contributing

1. Follow existing code patterns
2. Use TypeScript strictly (no `any`)
3. Run `pnpm lint` before committing
4. Test in both light and dark modes
5. Test responsive design on mobile

---

## License

Private - All rights reserved.
