# PayPerCall API

A RESTful API backend built with Express.js, TypeScript, Drizzle ORM, and PostgreSQL (Neon). This API powers both the public website and admin dashboard for managing web development services, user authentication, and content management.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [API Response Format](#api-response-format)
- [API Routes](#api-routes)
  - [Health Check](#health-check)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Web Dev Services](#web-dev-services)
  - [Sub-Services](#sub-services)
  - [Packages](#packages)
  - [Case Studies](#case-studies)
  - [Testimonials](#testimonials)
  - [File Upload](#file-upload)
- [Authentication & Authorization](#authentication--authorization)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Express.js 5** | Web framework |
| **TypeScript** | Type safety |
| **Drizzle ORM** | Database ORM |
| **PostgreSQL (Neon)** | Database |
| **Zod** | Schema validation |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Cloudinary** | Image storage |
| **Multer** | File upload handling |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL database (Neon recommended)
- Cloudinary account (for image uploads)

### Installation

```bash
# Navigate to the api directory
cd apps/api

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:generate` | Generate Drizzle migrations |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:push` | Push schema changes to database |
| `pnpm db:studio` | Open Drizzle Studio GUI |

---

## Environment Variables

Create a `.env` file in the `apps/api` directory:

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:5173

# JWT
JWT_ACCESS_SECRET=your-super-secret-jwt-key
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_DAYS=30

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Required Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_ACCESS_SECRET` | Secret key for signing JWT tokens |

---

## Database

### Schema Overview

The database consists of the following tables:

```
users
├── sessions (1:many)

web_dev_services
├── web_dev_sub_services (1:many)
    ├── web_dev_packages (1:many)
    ├── web_dev_case_studies (1:many)
    └── web_dev_testimonials (1:many)
```

### Running Migrations

```bash
# Generate migration from schema changes
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Push schema directly (development)
pnpm db:push

# Open database GUI
pnpm db:studio
```

---

## API Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation completed successfully",
  "data": { ... },
  "count": 10
}
```

### Error Response

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error description",
  "errors": {
    "field": ["Validation error message"]
  }
}
```

---

## API Routes

### Health Check

#### `GET /api/health`

Check if the API is running.

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "API is healthy",
  "data": {
    "status": "ok",
    "timestamp": "2026-01-04T12:00:00.000Z"
  }
}
```

---

### Authentication

#### `POST /api/auth/signup`

Register a new user.

**Rate Limit:** 5 requests per 15 minutes

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890",
  "address_street": "123 Main St",
  "address_city": "New York",
  "address_state": "NY",
  "address_postal_code": "10001"
}
```

**Response (201):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isVerified": false,
    "created_at": "2026-01-04T12:00:00.000Z"
  }
}
```

---

#### `POST /api/auth/login`

Authenticate user and receive tokens.

**Rate Limit:** 10 requests per 15 minutes

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Logged in successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "sessionId": "session-uuid"
}
```

**Cookies Set:**
- `refresh_token` (HttpOnly, Secure)
- `sessionId` (HttpOnly, Secure)

---

#### `POST /api/auth/refresh`

Refresh access token using refresh token cookie.

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Token refreshed",
  "data": { ... },
  "accessToken": "new-access-token"
}
```

---

#### `POST /api/auth/logout`

Logout user and invalidate session.

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Logged out successfully"
}
```

---

### Users

All user routes require authentication.

#### `GET /api/users/me`

Get current authenticated user's profile.

**Headers:** `Authorization: Bearer <access_token>`

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User retrieved",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "phone": "+1234567890",
    "image": {
      "url": "https://cloudinary.com/...",
      "publicId": "users/avatar123"
    },
    "address_street": "123 Main St",
    "address_city": "New York",
    "address_state": "NY",
    "address_postal_code": "10001",
    "isVerified": true,
    "created_at": "2026-01-04T12:00:00.000Z",
    "updated_at": "2026-01-04T12:00:00.000Z"
  }
}
```

---

#### `PUT /api/users/me`

Update current user's profile.

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "+1234567891",
  "address_street": "456 New St",
  "address_city": "Los Angeles",
  "address_state": "CA",
  "address_postal_code": "90001",
  "image": {
    "url": "https://cloudinary.com/...",
    "publicId": "users/new-avatar"
  }
}
```

---

#### `GET /api/users/role`

Get current user's role.

**Headers:** `Authorization: Bearer <access_token>`

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User role retrieved",
  "data": {
    "id": "uuid",
    "role": "admin"
  }
}
```

---

#### `POST /api/users/change-password`

Change current user's password.

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword456"
}
```

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Password changed successfully. All sessions have been logged out for security. Please login again."
}
```

---

#### `GET /api/users` (Admin Only)

List all users.

**Headers:** `Authorization: Bearer <access_token>`
**Required Role:** `admin`

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Users retrieved",
  "data": [ ... ],
  "count": 25
}
```

---

#### `PATCH /api/users/:userId/role` (Admin Only)

Change a user's role.

**Headers:** `Authorization: Bearer <access_token>`
**Required Role:** `admin`

**Request Body:**
```json
{
  "role": "admin"
}
```

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User role successfully changed to \"admin\"",
  "data": { ... }
}
```

---

### Web Dev Services

#### `GET /api/web-dev-services`

Get all web development services.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `includeInactive` | boolean | false | Include inactive services |

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Services retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "slug": "web-dev",
      "title": "Web Development",
      "description": "Full-service web development",
      "metaTitle": "Web Development Services",
      "metaDescription": "Professional web development services",
      "heroTitle": "Web Development",
      "heroSubtitle": "Build your digital presence",
      "heroImage": {
        "url": "https://cloudinary.com/...",
        "publicId": "services/hero",
        "alt": "Web Development"
      },
      "features": [
        {
          "title": "Custom Solutions",
          "description": "Tailored to your needs",
          "icon": "Zap"
        }
      ],
      "processSteps": [
        {
          "step": 1,
          "title": "Discovery",
          "description": "Understanding your requirements",
          "icon": "Search"
        }
      ],
      "isActive": true,
      "order": 0,
      "createdAt": "2026-01-04T12:00:00.000Z",
      "updatedAt": "2026-01-04T12:00:00.000Z"
    }
  ],
  "count": 1
}
```

---

#### `GET /api/web-dev-services/:slug`

Get a service by slug.

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Service retrieved successfully",
  "data": { ... }
}
```

---

#### `GET /api/web-dev-services/by-id/:id`

Get a service by ID.

---

#### `POST /api/web-dev-services` (Admin Only)

Create a new web development service.

**Headers:** `Authorization: Bearer <access_token>`
**Required Role:** `admin`

**Request Body:**
```json
{
  "slug": "mobile-dev",
  "title": "Mobile Development",
  "description": "Native and cross-platform mobile apps",
  "metaTitle": "Mobile Development Services",
  "metaDescription": "Professional mobile app development",
  "heroTitle": "Mobile Development",
  "heroSubtitle": "Apps that users love",
  "heroImage": {
    "url": "https://cloudinary.com/...",
    "publicId": "services/mobile-hero",
    "alt": "Mobile Development"
  },
  "features": [
    {
      "title": "iOS Development",
      "description": "Swift and SwiftUI",
      "icon": "Smartphone"
    }
  ],
  "processSteps": [
    {
      "step": 1,
      "title": "Planning",
      "description": "App architecture design",
      "icon": "ClipboardList"
    }
  ],
  "isActive": true,
  "order": 1
}
```

**Response (201):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Service created successfully",
  "data": { ... }
}
```

---

#### `PATCH /api/web-dev-services/:id` (Admin Only)

Update a web development service.

**Headers:** `Authorization: Bearer <access_token>`
**Required Role:** `admin`

---

#### `DELETE /api/web-dev-services/:id` (Admin Only)

Delete a web development service.

**Headers:** `Authorization: Bearer <access_token>`
**Required Role:** `admin`

---

#### `POST /api/web-dev-services/:id/revalidate` (Admin Only)

Trigger cache revalidation for a service.

---

### Sub-Services

#### `GET /api/web-dev-services/:serviceSlug/sub-services`

Get all sub-services for a parent service.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `includeInactive` | boolean | false | Include inactive sub-services |

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Sub-services retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "serviceId": "parent-service-uuid",
      "slug": "full-stack",
      "title": "Full-Stack Development",
      "description": "Complete web application development",
      "metaTitle": "Full-Stack Development Services",
      "metaDescription": "Expert full-stack development",
      "ogImage": { ... },
      "heroContent": {
        "title": "Full-Stack Web Development",
        "subtitle": "End-to-end solutions",
        "description": "We build complete web applications",
        "image": { ... },
        "ctaText": "Get Started",
        "ctaLink": "/contact"
      },
      "features": [ ... ],
      "processSteps": [ ... ],
      "packages": [ ... ],
      "caseStudies": [ ... ],
      "testimonials": [ ... ],
      "faqs": [
        {
          "id": "faq-uuid",
          "question": "How long does development take?",
          "answer": "Typically 8-12 weeks depending on scope."
        }
      ],
      "isActive": true,
      "order": 0,
      "createdAt": "2026-01-04T12:00:00.000Z",
      "updatedAt": "2026-01-04T12:00:00.000Z"
    }
  ],
  "count": 1
}
```

---

#### `GET /api/web-dev-services/:serviceSlug/sub-services/:slug`

Get a sub-service by slug.

---

#### `GET /api/web-dev-services/sub-services/:id`

Get a sub-service by ID (direct route for admin panel).

---

#### `POST /api/web-dev-services/:serviceSlug/sub-services` (Admin Only)

Create a new sub-service.

**Headers:** `Authorization: Bearer <access_token>`
**Required Role:** `admin`

**Request Body:**
```json
{
  "slug": "frontend-dev",
  "title": "Frontend Development",
  "description": "Modern UI development",
  "metaTitle": "Frontend Development Services",
  "metaDescription": "React, Vue, Angular experts",
  "heroContent": {
    "title": "Frontend Development",
    "subtitle": "Beautiful, responsive interfaces",
    "ctaText": "Start Project",
    "ctaLink": "/contact"
  },
  "features": [ ... ],
  "processSteps": [ ... ],
  "isActive": true,
  "order": 1
}
```

---

#### `PATCH /api/web-dev-services/sub-services/:id` (Admin Only)

Update a sub-service.

---

#### `DELETE /api/web-dev-services/sub-services/:id` (Admin Only)

Delete a sub-service.

---

#### `PATCH /api/web-dev-services/sub-services/order` (Admin Only)

Update sub-services ordering.

**Request Body:**
```json
{
  "items": [
    { "id": "uuid-1", "order": 0 },
    { "id": "uuid-2", "order": 1 },
    { "id": "uuid-3", "order": 2 }
  ]
}
```

---

### Packages

#### `GET /api/web-dev-services/packages`

Get all packages.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `subServiceId` | uuid | Filter by sub-service |
| `includeInactive` | boolean | Include inactive packages |

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Packages retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "subServiceId": "sub-service-uuid",
      "name": "Starter",
      "description": "Perfect for small projects",
      "price": "999.00",
      "currency": "USD",
      "features": [
        "5 pages",
        "Responsive design",
        "Basic SEO"
      ],
      "isPopular": false,
      "isActive": true,
      "order": 0,
      "createdAt": "2026-01-04T12:00:00.000Z",
      "updatedAt": "2026-01-04T12:00:00.000Z"
    }
  ],
  "count": 3
}
```

---

#### `POST /api/web-dev-services/packages` (Admin Only)

Create a new package.

**Request Body:**
```json
{
  "subServiceId": "sub-service-uuid",
  "name": "Enterprise",
  "description": "For large-scale applications",
  "price": "9999.00",
  "currency": "USD",
  "features": [
    "Unlimited pages",
    "Custom integrations",
    "24/7 support"
  ],
  "isPopular": true,
  "isActive": true,
  "order": 2
}
```

---

#### `PATCH /api/web-dev-services/packages/:id` (Admin Only)

Update a package.

---

#### `DELETE /api/web-dev-services/packages/:id` (Admin Only)

Delete a package.

---

#### `PATCH /api/web-dev-services/packages/order` (Admin Only)

Update packages ordering.

---

### Case Studies

#### `GET /api/web-dev-services/case-studies`

Get all case studies.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `subServiceId` | uuid | Filter by sub-service |
| `includeInactive` | boolean | Include inactive case studies |

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Case studies retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "subServiceId": "sub-service-uuid",
      "title": "E-Commerce Platform Rebuild",
      "description": "Complete overhaul of legacy system",
      "clientName": "TechCorp Inc.",
      "results": [
        {
          "metric": "Page Load Time",
          "value": "40% faster",
          "description": "Improved server response"
        },
        {
          "metric": "Conversion Rate",
          "value": "+25%",
          "description": "Better UX led to more sales"
        }
      ],
      "image": {
        "url": "https://cloudinary.com/...",
        "publicId": "case-studies/techcorp",
        "alt": "TechCorp Case Study"
      },
      "isActive": true,
      "order": 0,
      "createdAt": "2026-01-04T12:00:00.000Z",
      "updatedAt": "2026-01-04T12:00:00.000Z"
    }
  ],
  "count": 5
}
```

---

#### `POST /api/web-dev-services/case-studies` (Admin Only)

Create a new case study.

---

#### `PATCH /api/web-dev-services/case-studies/:id` (Admin Only)

Update a case study.

---

#### `DELETE /api/web-dev-services/case-studies/:id` (Admin Only)

Delete a case study.

---

#### `PATCH /api/web-dev-services/case-studies/order` (Admin Only)

Update case studies ordering.

---

### Testimonials

#### `GET /api/web-dev-services/testimonials`

Get all testimonials.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `subServiceId` | uuid | Filter by sub-service |
| `includeInactive` | boolean | Include inactive testimonials |

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Testimonials retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "subServiceId": "sub-service-uuid",
      "name": "Jane Smith",
      "role": "CTO",
      "company": "StartupXYZ",
      "content": "The team delivered beyond our expectations. Highly recommended!",
      "image": {
        "url": "https://cloudinary.com/...",
        "publicId": "testimonials/jane",
        "alt": "Jane Smith"
      },
      "rating": "5.0",
      "isActive": true,
      "order": 0,
      "createdAt": "2026-01-04T12:00:00.000Z",
      "updatedAt": "2026-01-04T12:00:00.000Z"
    }
  ],
  "count": 8
}
```

---

#### `POST /api/web-dev-services/testimonials` (Admin Only)

Create a new testimonial.

---

#### `PATCH /api/web-dev-services/testimonials/:id` (Admin Only)

Update a testimonial.

---

#### `DELETE /api/web-dev-services/testimonials/:id` (Admin Only)

Delete a testimonial.

---

#### `PATCH /api/web-dev-services/testimonials/order` (Admin Only)

Update testimonials ordering.

---

### File Upload

All upload routes require authentication and admin role.

#### `POST /api/upload/image` (Admin Only)

Upload a single image to Cloudinary.

**Headers:**
- `Authorization: Bearer <access_token>`
- `Content-Type: multipart/form-data`

**Form Data:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `image` | file | Yes | Image file (max 10MB) |
| `folder` | string | No | Cloudinary folder (default: "paypercall") |

**Response (201):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "paypercall/abc123",
    "width": 1920,
    "height": 1080,
    "format": "jpg"
  }
}
```

---

#### `POST /api/upload/images` (Admin Only)

Upload multiple images (max 10).

**Form Data:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `images` | file[] | Yes | Image files (max 10MB each) |
| `folder` | string | No | Cloudinary folder |

**Response (201):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Images uploaded successfully",
  "data": [ ... ],
  "count": 3
}
```

---

#### `DELETE /api/upload/image` (Admin Only)

Delete an image from Cloudinary.

**Request Body:**
```json
{
  "publicId": "paypercall/abc123"
}
```

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Image deleted successfully"
}
```

---

## Authentication & Authorization

### JWT Token Structure

**Access Token Payload:**
```json
{
  "sub": "user-uuid",
  "role": "admin",
  "iat": 1704369600,
  "exp": 1704370500
}
```

### Authentication Flow

1. User logs in via `/api/auth/login`
2. Server returns `accessToken` in response body
3. Server sets `refresh_token` and `sessionId` as HttpOnly cookies
4. Client includes `Authorization: Bearer <accessToken>` header in requests
5. When access token expires, client calls `/api/auth/refresh`
6. Server validates refresh token and session, issues new tokens

### Role-Based Access Control

| Role | Permissions |
|------|-------------|
| `user` | Read own profile, change password |
| `admin` | Full access to all resources, manage users, upload files |

---

## Error Handling

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 409 | Conflict (e.g., duplicate email) |
| 429 | Too Many Requests (rate limited) |
| 500 | Internal Server Error |

### Validation Errors

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": {
    "email": ["Invalid email format"],
    "password": ["Password must be at least 8 characters"]
  }
}
```

---

## Rate Limiting

| Endpoint Pattern | Limit | Window |
|-----------------|-------|--------|
| Global | 100 requests | 15 minutes |
| `/api/auth/login` | 10 requests | 15 minutes |
| `/api/auth/signup` | 5 requests | 15 minutes |

Rate limit headers:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining in window
- `X-RateLimit-Reset`: Time when limit resets (Unix timestamp)

---

## Project Structure

```
apps/api/src/
├── config/
│   └── env.ts                    # Environment configuration
├── db/
│   ├── drizzle/                  # Migration files
│   ├── schema/                   # Database schemas
│   │   ├── users.schema.ts
│   │   ├── session.schema.ts
│   │   ├── web-dev-services.schema.ts
│   │   ├── web-dev-sub-services.schema.ts
│   │   ├── web-dev-packages.schema.ts
│   │   ├── web-dev-case-studies.schema.ts
│   │   └── web-dev-testimonials.schema.ts
│   ├── validator/                # Zod validation schemas
│   └── index.ts                  # Database connection
├── middlewares/
│   ├── auth.middleware.ts        # Authentication & authorization
│   ├── errorHandler.ts           # Global error handler
│   ├── rateLimiting.middleware.ts
│   ├── validation.middleware.ts
│   └── logging.middleware.ts
├── modules/
│   ├── auth/                     # Authentication module
│   ├── users/                    # User management module
│   ├── health/                   # Health check module
│   ├── upload/                   # File upload module
│   └── web-dev-services/         # Web dev services module
├── types/
├── utils/
├── app.ts                        # Express app setup
└── server.ts                     # Server entry point
```

---

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm lint` to check for issues
4. Submit a pull request

---

## License

Private - All rights reserved.

