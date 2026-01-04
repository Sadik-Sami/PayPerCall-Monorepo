# Vercel Deployment Guide for Turbo Monorepo

This guide covers deploying the **API** and **Admin Panel** from your Turbo monorepo to Vercel with proper CORS configuration.

## Prerequisites

1. Vercel account (sign up at [vercel.com](https://vercel.com))
2. Vercel CLI installed: `npm i -g vercel` (optional, for CLI deployment)
3. GitHub repository connected to Vercel
4. Database URL (PostgreSQL)
5. Environment variables ready

---

## Architecture Overview

Your monorepo has three apps:
- **`apps/web`** - Next.js app (already deployed)
- **`apps/api`** - Express API (to be deployed)
- **`apps/admin`** - Vite React SPA (to be deployed)

Each app needs to be deployed as a **separate Vercel project** with its own configuration.

---

## Part 1: Deploy API

### Step 1: Create API Project in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `apps/api`
   - **Build Command**: `cd ../.. && pnpm build --filter=api`
   - **Output Directory**: Leave empty (not needed for serverless)
   - **Install Command**: `cd ../.. && pnpm install`

### Step 2: Configure Environment Variables

In the Vercel project settings, add these environment variables:

```env
# Server
NODE_ENV=production
PORT=3001

# Database
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# CORS - IMPORTANT: Add all your frontend URLs (comma-separated)
CORS_ORIGIN=https://your-web-app.vercel.app,https://your-admin-app.vercel.app

# JWT
JWT_ACCESS_SECRET=your-super-secret-jwt-key
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_DAYS=30

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Important Notes:**
- `CORS_ORIGIN` accepts comma-separated URLs
- Include both production and preview URLs if needed
- You can use wildcards: `https://*.vercel.app` (less secure)

### Step 3: Verify API Configuration

The API is configured with:
- **`apps/api/vercel.json`** - Vercel configuration
- **`apps/api/api/index.ts`** - Serverless function wrapper

The API will be available at: `https://your-api-project.vercel.app/api/*`

### Step 4: Test API Deployment

After deployment, test the health endpoint:
```bash
curl https://your-api-project.vercel.app/api/health
```

---

## Part 2: Deploy Admin Panel

### Step 1: Create Admin Project in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import the same GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `apps/admin`
   - **Build Command**: `cd ../.. && pnpm build --filter=admin`
   - **Output Directory**: `dist`
   - **Install Command**: `cd ../.. && pnpm install`

### Step 2: Configure Environment Variables

Add these environment variables:

```env
# API Base URL - Use your deployed API URL
VITE_API_BASE_URL=https://your-api-project.vercel.app
```

### Step 3: Verify Admin Configuration

The admin panel is configured with:
- **`apps/admin/vercel.json`** - Handles SPA routing (all routes → index.html)
- Static asset caching for optimal performance

### Step 4: Update Admin API Configuration

The admin panel reads the API URL from `VITE_API_BASE_URL`. Make sure it points to your deployed API.

---

## Part 3: Update CORS After Deployment

Once both apps are deployed, update the API's `CORS_ORIGIN` environment variable with the actual URLs:

```env
CORS_ORIGIN=https://your-web-app.vercel.app,https://your-admin-app.vercel.app
```

**For Preview Deployments:**
If you want preview deployments to work, you can use:
```env
CORS_ORIGIN=https://*.vercel.app,http://localhost:3000,http://localhost:5173
```

⚠️ **Security Note**: Wildcards are less secure. For production, list specific domains.

---

## Part 4: Update Frontend API URLs

### Update Web App

Update `apps/web/lib/services/web-dev-service.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-api-project.vercel.app';
```

Add to Vercel environment variables for web app:
```env
NEXT_PUBLIC_API_URL=https://your-api-project.vercel.app
```

### Update Admin Panel

The admin panel already uses `VITE_API_BASE_URL` from environment variables, which you set in Step 2 of Part 2.

---

## Part 5: Deployment via Vercel CLI (Alternative)

If you prefer CLI deployment:

### API Deployment
```bash
cd apps/api
vercel --prod
```

### Admin Deployment
```bash
cd apps/admin
vercel --prod
```

Follow the prompts to configure each project.

---

## Part 6: Monorepo-Specific Configuration

### Turbo.json Configuration

Your `turbo.json` is already configured correctly:
- Build tasks have proper dependencies (`^build`)
- Outputs are specified correctly

### Vercel Monorepo Settings

For each project in Vercel:
1. Go to **Settings** → **General**
2. Set **Root Directory** to the respective app (`apps/api` or `apps/admin`)
3. Ensure **Build Command** uses Turbo: `cd ../.. && pnpm build --filter=<app-name>`

---

## Troubleshooting

### API Issues

**Problem**: API returns 404
- **Solution**: Check that `apps/api/api/index.ts` exists and exports the handler correctly
- Verify `vercel.json` routes configuration

**Problem**: CORS errors
- **Solution**:
  1. Check `CORS_ORIGIN` includes the exact frontend URL (with https://)
  2. Verify credentials are set correctly in CORS config
  3. Check browser console for exact error message

**Problem**: Database connection fails
- **Solution**:
  1. Verify `DATABASE_URL` is correct
  2. Check database allows connections from Vercel IPs
  3. Ensure SSL is enabled (`?sslmode=require`)

### Admin Panel Issues

**Problem**: Blank page or 404 on routes
- **Solution**: Verify `vercel.json` has the rewrite rule for SPA routing

**Problem**: API calls fail
- **Solution**:
  1. Check `VITE_API_BASE_URL` is set correctly
  2. Verify API CORS includes admin URL
  3. Check browser network tab for actual request URL

### Build Issues

**Problem**: Build fails with "module not found"
- **Solution**: Ensure workspace dependencies are installed:
  ```bash
  pnpm install
  ```

**Problem**: TypeScript errors
- **Solution**: Run type checking locally first:
  ```bash
  pnpm build
  ```

---

## Environment Variables Summary

### API Project
```env
NODE_ENV=production
DATABASE_URL=...
CORS_ORIGIN=https://web-app.vercel.app,https://admin-app.vercel.app
JWT_ACCESS_SECRET=...
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_DAYS=30
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Admin Project
```env
VITE_API_BASE_URL=https://api-project.vercel.app
```

### Web Project (if not already set)
```env
NEXT_PUBLIC_API_URL=https://api-project.vercel.app
```

---

## Next Steps

1. ✅ Deploy API project
2. ✅ Deploy Admin project
3. ✅ Update CORS with actual URLs
4. ✅ Update frontend API URLs
5. ✅ Test all endpoints
6. ✅ Set up custom domains (optional)
7. ✅ Configure preview deployments (optional)

---

## Additional Resources

- [Vercel Monorepo Guide](https://vercel.com/docs/monorepos)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Express on Vercel](https://vercel.com/guides/express)

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for frontend errors

