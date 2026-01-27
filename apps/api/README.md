# Core Closer API

A robust, production-ready REST API built with Express.js, TypeScript, and PostgreSQL. This API serves as the backend for the Core Closer platform, handling authentication, content management, user management, and file uploads.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or pnpm package manager

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env

# Configure your .env file with required variables (see Environment Variables section)
```

### Environment Variables

Create a `.env` file in the root of the `apps/api` directory with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/core_closer

# CORS Origins (comma-separated or individual)
CORS_ORIGIN_ADMIN=https://pay-per-call-monorepo-admin.vercel.app
CORS_ORIGIN_WEB=https://pay-per-call-monorepo-web.vercel.app
CORS_ORIGIN_LOCALHOST_ADMIN=http://localhost:5173
CORS_ORIGIN_LOCALHOST_WEB=http://localhost:3000

# JWT Authentication
JWT_ACCESS_SECRET=your-super-secret-jwt-key-here
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_DAYS=30

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_UPLOAD_FOLDER=blog

# Preview Secret (for draft blog previews)
API_PREVIEW_SECRET=your-preview-secret-here
```

### Running the Application

```bash
# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
apps/api/
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── server.ts              # Server entry point
│   ├── vercel.ts              # Vercel serverless handler
│   ├── config/
│   │   └── env.ts             # Environment configuration
│   ├── db/
│   │   ├── index.ts           # Database connection
│   │   ├── drizzle/           # Migration files
│   │   ├── schema/            # Database schemas
│   │   │   ├── users.schema.ts
│   │   │   ├── session.schema.ts
│   │   │   ├── blogs.schema.ts
│   │   │   └── blogBlocks.schema.ts
│   │   └── validator/         # Zod validators
│   │       ├── auth.validator.ts
│   │       ├── user.validator.ts
│   │       ├── blog.validator.ts
│   │       └── blogBlock.validator.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts      # JWT authentication
│   │   ├── errorHandler.ts         # Global error handler
│   │   ├── logging.middleware.ts   # Request logging
│   │   ├── notFound.middleware.ts  # 404 handler
│   │   ├── rateLimiting.middleware.ts  # Rate limiting
│   │   └── validation.middleware.ts    # Request validation
│   ├── modules/
│   │   ├── auth/               # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.service.ts
│   │   │   └── session.service.ts
│   │   ├── users/              # User management
│   │   │   ├── user.controller.ts
│   │   │   ├── user.routes.ts
│   │   │   └── user.service.ts
│   │   ├── blogs/              # Blog content management
│   │   │   ├── blogs.controller.ts
│   │   │   ├── blogs.routes.ts
│   │   │   └── blogs.service.ts
│   │   ├── blocks/             # Blog block management
│   │   │   ├── blocks.controller.ts
│   │   │   ├── blocks.routes.ts
│   │   │   └── blocks.service.ts
│   │   ├── uploads/            # File upload handling
│   │   │   ├── uploads.controller.ts
│   │   │   └── uploads.routes.ts
│   │   └── health/            # Health check endpoint
│   │       ├── health.controller.ts
│   │       ├── health.routes.ts
│   │       └── health.service.ts
│   ├── types/
│   │   ├── auth.ts            # Authentication types
│   │   └── express.d.ts      # Express type extensions
│   └── utils/
│       ├── apiResponse.util.ts    # Standardized API responses
│       ├── blogBlocks.util.ts     # Blog block utilities
│       ├── db.util.ts             # Database utilities
│       ├── error.util.ts          # Error handling utilities
│       ├── rateLimiter.util.ts    # Rate limiter configuration
│       ├── sessionCleanup.util.ts # Session cleanup job
│       ├── token.util.ts          # JWT token utilities
│       └── validation.util.ts     # Validation helpers
├── drizzle.config.ts          # Drizzle ORM configuration
├── package.json
├── tsconfig.json
└── vercel.json                # Vercel deployment configuration
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| POST | `/api/auth/refresh` | Refresh access token | No (requires refresh token) |

### Users (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/me` | Get current user profile | Yes |
| PUT | `/api/users/me` | Update current user profile | Yes |
| GET | `/api/users/:id` | Get user by ID (admin only) | Yes (Admin) |
| GET | `/api/users` | List all users (admin only) | Yes (Admin) |

### Blogs - Public (`/api/blogs`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/blogs` | Get all published blogs | No |
| GET | `/api/blogs/:slug` | Get blog by slug | No |
| GET | `/api/blogs/:slug/preview` | Preview draft blog (requires secret) | No (Secret) |

### Blogs - Admin (`/api/admin/blogs`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/blogs` | Get all blogs (including drafts) | Yes (Admin) |
| GET | `/api/admin/blogs/:id` | Get blog by ID | Yes (Admin) |
| POST | `/api/admin/blogs` | Create new blog | Yes (Admin) |
| PUT | `/api/admin/blogs/:id` | Update blog | Yes (Admin) |
| DELETE | `/api/admin/blogs/:id` | Delete blog | Yes (Admin) |
| PATCH | `/api/admin/blogs/:id/publish` | Publish blog | Yes (Admin) |
| PATCH | `/api/admin/blogs/:id/unpublish` | Unpublish blog | Yes (Admin) |

### Blog Blocks - Admin (`/api/admin/blocks`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/blocks` | Get all blog blocks | Yes (Admin) |
| GET | `/api/admin/blocks/:id` | Get block by ID | Yes (Admin) |
| POST | `/api/admin/blocks` | Create new block | Yes (Admin) |
| PUT | `/api/admin/blocks/:id` | Update block | Yes (Admin) |
| DELETE | `/api/admin/blocks/:id` | Delete block | Yes (Admin) |

### Uploads - Admin (`/api/admin/uploads`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/admin/uploads/image` | Upload image to Cloudinary | Yes (Admin) |

### Health Check (`/api/health`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Check API health status | No |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication with the following flow:

1. **Signup/Login**: User provides credentials and receives:
   - Access token (short-lived, 15 minutes)
   - Refresh token (long-lived, 30 days, stored in HTTP-only cookie)

2. **Authenticated Requests**: Include the access token in the Authorization header:
   ```
   Authorization: Bearer <access_token>
   ```

3. **Token Refresh**: When the access token expires, use the refresh token to get a new access token:
   ```
   POST /api/auth/refresh
   ```
   The refresh token is automatically sent via cookie.

### Role-Based Access Control

The API supports role-based access:
- **User**: Basic authenticated user
- **Admin**: Full access to admin endpoints

Roles are checked via the `authMiddleware` and `adminMiddleware`.

## 🗄️ Database

### Database Schema

The API uses PostgreSQL with Drizzle ORM. Key tables:

- **users**: User accounts and profiles
- **sessions**: Refresh token sessions
- **blogs**: Blog posts and articles
- **blog_blocks**: Rich content blocks for blogs

### Database Migrations

```bash
# Generate migration from schema changes
npm run db:generate

# Apply migrations
npm run db:migrate

# Push schema directly (development only)
npm run db:push

# Open Drizzle Studio (database GUI)
npm run db:studio
```

## 🛡️ Security Features

### Rate Limiting

The API implements rate limiting to prevent abuse:

- **Global Rate Limiter**: 100 requests per 15 minutes per IP
- **Login Rate Limiter**: 5 attempts per 15 minutes per IP
- **Signup Rate Limiter**: 3 attempts per 15 minutes per IP

### CORS Configuration

CORS is configured to allow requests only from:
- Production admin and web applications
- Localhost development environments

### Input Validation

All user inputs are validated using Zod schemas before processing:
- Request body validation
- Query parameter validation
- Path parameter validation

### Error Handling

The API uses a centralized error handler that:
- Returns consistent error response format
- Logs errors for debugging
- Prevents sensitive information leakage

## 📤 File Uploads

Image uploads are handled via Cloudinary integration:

1. Client uploads image to `/api/admin/uploads/image`
2. API validates and uploads to Cloudinary
3. Returns Cloudinary URL for use in content

Supported formats: JPEG, PNG, GIF, WebP

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage
```

## 🚢 Deployment

### Vercel Deployment

The API is configured for Vercel serverless deployment:

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Render Deployment

The API can also be deployed to Render:

1. Create a new Web Service
2. Connect your repository
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Configure environment variables

## 📝 API Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

## 🔧 Development

### Code Style

- TypeScript strict mode enabled
- ESLint for code quality
- Consistent code formatting

### Adding New Endpoints

1. Create controller in `modules/[module-name]/[module-name].controller.ts`
2. Create service in `modules/[module-name]/[module-name].service.ts`
3. Create routes in `modules/[module-name]/[module-name].routes.ts`
4. Register routes in `src/app.ts`
5. Add validators in `db/validator/`
6. Update this README with endpoint documentation

### Environment-Specific Configuration

- **Development**: Local PostgreSQL, detailed logging
- **Production**: Production database, optimized logging, rate limiting enabled

## 📚 Dependencies

### Core Dependencies

- **express**: Web framework
- **drizzle-orm**: Type-safe ORM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **zod**: Schema validation
- **cookie-parser**: Cookie handling
- **cors**: CORS middleware
- **express-rate-limit**: Rate limiting
- **morgan**: HTTP request logging

### Development Dependencies

- **typescript**: Type safety
- **drizzle-kit**: Database migrations
- **tsx**: TypeScript execution
- **eslint**: Code linting

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
- Verify `DATABASE_URL` is correct
- Check PostgreSQL is running
- Verify network connectivity

**CORS Errors**
- Ensure frontend origin is in `CORS_ORIGIN_*` environment variables
- Check CORS configuration in `src/app.ts`

**Authentication Errors**
- Verify `JWT_ACCESS_SECRET` is set
- Check token expiration settings
- Ensure refresh token cookie is being sent

**Upload Errors**
- Verify Cloudinary credentials
- Check file size limits
- Verify file format is supported

## 📞 Support

For issues or questions:
1. Check this README
2. Review error logs
3. Check database connection
4. Verify environment variables

## 📄 License

Private - Core Closer Platform

