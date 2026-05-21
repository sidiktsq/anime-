# Setup Guide for AnimeHub

Comprehensive setup instructions for AnimeHub - Modern Anime Streaming Platform

## 🚀 Quick Start (5 minutes)

### 1. Clone/Extract Project
```bash
cd anime-hub
npm install
```

### 2. Environment Setup
```bash
# Copy example env
cp .env.example .env

# Edit .env with your settings (optional for demo)
```

### 3. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 - That's it! The app is running!

## 📋 Detailed Setup

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org))
- npm or yarn
- VS Code (optional but recommended)

### Step 1: Installation

```bash
# Navigate to project
cd c:\Users\Hype\Documents\new

# Install dependencies
npm install

# Should install: Next.js, React, Prisma, NextAuth, Tailwind, Framer Motion, etc.
```

### Step 2: Environment Variables

Create `.env` file in project root:

```env
# Database (Leave as-is for SQLite demo, update for PostgreSQL production)
DATABASE_URL="file:./prisma/dev.db"

# NextAuth secret (generate new one)
NEXTAUTH_SECRET="your-secret-here"  # Run: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional - only if you want login to work)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Jikan API (public - no setup needed)
NEXT_PUBLIC_JIKAN_API="https://api.jikan.moe/v4"
```

### Step 3: Database Setup (Optional)

For demo/dev mode, SQLite is configured and ready to use.

#### For PostgreSQL Production:

```bash
# 1. Install PostgreSQL locally or use Docker:
docker run --name postgres -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres:latest

# 2. Update .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/anime_hub"

# 3. Run Prisma migrations
npx prisma migrate dev --name init

# 4. (Optional) Add seed data
npx prisma db seed
```

### Step 4: Run Development Server

```bash
npm run dev

# Output:
# ▲ Next.js 16.2.6
# - Local:        http://localhost:3000
# - Network:      http://10.x.x.x:3000
# ✓ Ready in 546ms
```

Open http://localhost:3000 in your browser.

### Step 5: Authentication Setup (Optional)

To enable Google login:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project
3. Enable "Google+ API"
4. Create "OAuth 2.0 Client ID" (Web Application)
5. Set redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env`
7. Click "Login" button on navbar to test

## 📦 Build for Production

### Build
```bash
npm run build

# Creates optimized production bundle in .next/
```

### Start Production Server
```bash
npm run start

# Runs on http://localhost:3000
```

### Environment for Production
```env
# Update these for production
DATABASE_URL="postgresql://user:pass@prod-db:5432/anime_hub"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-new-one"
GOOGLE_CLIENT_ID="prod-client-id"
GOOGLE_CLIENT_SECRET="prod-client-secret"
```

## 🐳 Docker Setup

```bash
# Build image
docker build -t anime-hub .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="secret" \
  anime-hub
```

## 🚢 Deploy

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Connect repo to Vercel: https://vercel.com/new
3. Set environment variables in Vercel dashboard
4. Auto-deploys on git push

### Option 2: Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Option 3: Self-hosted (VPS)

```bash
# SSH into server
ssh user@server.com

# Clone and setup
git clone your-repo.git
cd anime-hub
npm install
npm run build

# Use PM2 for process management
npm i -g pm2
pm2 start npm --name "anime-hub" -- start

# Setup Nginx reverse proxy
# (See /deployment/nginx.conf)
```

## 🔧 Common Issues

### Issue: Port 3000 already in use
```bash
# Find process using port
netstat -ano | findstr :3000

# Kill process (get PID from above)
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

### Issue: Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Database connection errors
```bash
# Check .env DATABASE_URL
# For SQLite: file:./prisma/dev.db
# For PostgreSQL: postgresql://user:pass@host:5432/db

# Test connection
npx prisma db execute --stdin < query.sql
```

### Issue: Prisma errors
```bash
# Regenerate Prisma client
npx prisma generate

# Apply migrations
npx prisma migrate dev

# Reset database (warning: deletes all data)
npx prisma migrate reset
```

## 📚 Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run format           # Format code with Prettier

# Database
npx prisma generate     # Generate Prisma client
npx prisma migrate dev  # Create migration
npx prisma studio      # Open Prisma Studio (GUI)
npx prisma db seed     # Seed database

# Utility
npm audit               # Check vulnerabilities
npm update              # Update packages
npm outdated            # Check outdated packages
```

## 🔐 Security Checklist

- [ ] Set strong `NEXTAUTH_SECRET` (use `openssl rand -base64 32`)
- [ ] Use HTTPS in production
- [ ] Set `NEXTAUTH_URL` to your domain
- [ ] Never commit `.env` (add to `.gitignore`)
- [ ] Keep dependencies updated
- [ ] Enable CORS properly
- [ ] Validate user input
- [ ] Rate limit API endpoints
- [ ] Use environment variables for secrets
- [ ] Regular security audits (`npm audit`)

## 📖 Next Steps

1. **Customize Theme**: Edit `tailwind.config.ts` and `globals.css`
2. **Add Database**: Follow PostgreSQL setup above
3. **Enable Login**: Setup Google OAuth credentials
4. **Add Video Player**: Integrate HLS.js or Video.js
5. **Deploy**: Choose hosting platform above
6. **Monitor**: Setup error tracking (Sentry, LogRocket)
7. **SEO**: Add structured data and meta tags
8. **Analytics**: Setup Google Analytics or Plausible

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [NextAuth Docs](https://authjs.dev/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Jikan API Docs](https://jikan.moe/)

## 💬 Getting Help

- Check README.md for feature overview
- Read error messages carefully
- Search GitHub issues
- Check Stack Overflow
- Join Next.js Discord community

---

**Happy coding! 🚀**
