# AnimeHub - Modern Anime Streaming Platform

A modern anime streaming website built with **Next.js 15**, **TypeScript**, **TailwindCSS**, **Framer Motion**, **Prisma**, and **NextAuth**. Features Neo Brutalism UI design with a dark anime aesthetic.

## 🎨 Features

### Implemented
- ✅ **Neo Brutalism UI** - Bold borders, dramatic shadows, modern design
- ✅ **Navbar** - Responsive navigation with search, bookmarks, and auth
- ✅ **Hero Section** - Auto-slider with trending anime, synopsis, and CTA
- ✅ **Anime Listing** - Browse all anime with infinite scroll & search
- ✅ **Search** - Real-time search powered by Jikan API
- ✅ **Detail Page** - Full anime information with trailer, stats, and genres
- ✅ **Responsive Design** - Mobile-first responsive layout
- ✅ **Loading Skeletons** - Beautiful skeleton screens while loading
- ✅ **NextAuth Integration** - Google OAuth login system (configured, ready to setup)
- ✅ **TypeScript** - Strict type safety throughout
- ✅ **Prisma Schema** - Database models for users, bookmarks, history, comments

### Features to Implement
- 🔜 **Database Integration** - Connect PostgreSQL with Prisma
- 🔜 **Bookmarks** - Save favorite anime to database
- 🔜 **Watch History** - Track watched episodes
- 🔜 **Comments & Ratings** - User reviews and ratings
- 🔜 **Video Player** - Integrate HLS/MP4 video player
- 🔜 **Episode Management** - Display and track episodes
- 🔜 **Genre Filtering** - Filter anime by genre
- 🔜 **Schedule** - Airing schedule view
- 🔜 **User Profile** - Personalized user dashboard
- 🔜 **SEO Optimization** - Meta tags and Open Graph

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS + Custom Brutalism theme
- **Animations**: Framer Motion
- **Authentication**: NextAuth v5 (with Google OAuth)
- **Database**: PostgreSQL (via Prisma ORM)
- **API**: Jikan API (free anime data)
- **Images**: Next.js Image optimization
- **Icons**: Lucide React

## 📋 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home page with hero & trending
│   ├── anime/
│   │   ├── page.tsx            # Browse all anime
│   │   └── [id]/page.tsx       # Anime detail page
│   ├── trending/page.tsx        # Trending anime page
│   ├── bookmarks/page.tsx       # User bookmarks
│   ├── watch/[id]/page.tsx      # Video player page
│   ├── auth/signin/page.tsx     # Login page
│   ├── api/
│   │   ├── anime/route.ts       # Anime API endpoints
│   │   └── auth/[...nextauth]/  # NextAuth handlers
│   └── layout.tsx               # Root layout with providers
├── components/
│   ├── ui/                      # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── skeleton.tsx
│   ├── sections/                # Page sections
│   │   ├── navbar.tsx
│   │   └── hero-section.tsx
│   ├── shared/                  # Shared components
│   │   └── anime-card.tsx
│   └── providers.tsx            # NextAuth SessionProvider
├── services/
│   └── animeService.ts          # Jikan API integration & caching
├── lib/
│   ├── auth.ts                  # NextAuth configuration
│   ├── prisma.ts                # Prisma client
│   └── utils.ts                 # Utility functions
├── types/
│   └── index.ts                 # TypeScript types & interfaces
└── styles/
    └── globals.css              # Global styles

prisma/
├── schema.prisma                # Database schema
└── migrations/                  # Database migrations

public/                          # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Google OAuth credentials (optional for local dev)

### 1. Installation

```bash
# Clone or extract the project
cd anime-hub

# Install dependencies
npm install
```

### 2. Environment Setup

Create `.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/anime_hub?schema=public"

# NextAuth
NEXTAUTH_SECRET="openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (get from https://console.cloud.google.com/)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Jikan API (public - no auth needed)
NEXT_PUBLIC_JIKAN_API="https://api.jikan.moe/v4"
```

### 3. Database Setup

```bash
# Setup PostgreSQL locally (or use Docker)
docker run --name postgres -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres

# Run Prisma migrations
npx prisma migrate dev --name init

# (Optional) Seed with mock data
npx prisma db seed
```

### 4. Development

```bash
# Start dev server
npm run dev

# Open http://localhost:3000
```

## 📖 API Routes

### Anime Endpoints

```
GET  /api/anime              # Get top anime
GET  /api/anime?q=attack     # Search anime
GET  /api/anime?trending=1   # Get trending anime
```

## 🎯 Key Features Explained

### Neo Brutalism Design
- Bold 2-4px black borders
- Dramatic shadows (`4px 4px 0px`)
- High contrast B&W
- Clear, bold typography
- Sharp transitions and hover effects

### Anime Card Component
- Cover image with gradient overlay
- Rating with star icon
- Episode count
- Type & Status badges
- Genre tags (limited to 2)
- "Watch Now" button
- Hover animation

### Hero Section
- Auto-sliding banner (5s interval)
- Manual navigation arrows
- Anime title, rating, synopsis
- Watch Now & Details buttons
- Dot indicators for navigation

### Search & Filtering
- Real-time search via Jikan API
- Caching to avoid rate limits
- Infinite scroll pagination
- Filter by type, status, genre (UI ready)

## 🔐 Authentication

Using **NextAuth v5** with Google OAuth:

1. Get credentials from [Google Cloud Console](https://console.cloud.google.com/)
2. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`
3. Sign in button on navbar triggers Google login
4. User data stored in PostgreSQL via Prisma

## 💾 Database Schema

```prisma
User          # Authenticated users
AnimeBookmark # Favorited anime
WatchHistory  # Episode tracking
Comment       # Reviews & ratings
AnimeData     # Cached anime info
```

## 📱 Responsive Breakpoints

- Mobile: `< 640px` (1 column grid)
- Tablet: `640px - 1024px` (2 columns)
- Desktop: `1024px - 1280px` (3 columns)
- Large: `> 1280px` (4 columns)

## 🔄 Caching Strategy

- **Hero Section**: 1-hour ISR
- **Anime Listings**: 1-hour ISR + In-memory cache
- **Search Results**: 1-hour ISR
- **Image Optimization**: Next.js automatic

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Connect GitHub repo to Vercel
# Set environment variables in Vercel dashboard
# Auto-deploys on git push
```

### Docker

```bash
# Build
docker build -t anime-hub .

# Run
docker run -p 3000:3000 anime-hub
```

### Self-hosted

```bash
npm run build
npm run start
```

## 🔧 Configuration

### TailwindCSS Theme

Edit `tailwind.config.ts` to customize:
- Neo Brutalism shadows
- Color palette
- Border radius
- Typography

### Jikan API Rate Limiting

Free tier: 60 requests/minute
- Implemented with in-memory caching
- ISR revalidation strategy
- Consider rate-limit handling for scale

## 📚 Documentation

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js](https://authjs.dev/)
- [TailwindCSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Jikan API](https://jikan.moe/)

## 🤝 Contributing

Feel free to submit issues and PRs!

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🎬 Next Steps

1. **Database Setup**: Configure PostgreSQL and run migrations
2. **Google OAuth**: Get credentials and configure
3. **Video Player**: Integrate (HLS.js or Video.js recommended)
4. **Implement Bookmarks**: Use Prisma to save user favorites
5. **Deploy**: Push to Vercel or self-host
6. **Monitor**: Track performance and user engagement

---

Made with ❤️ for anime fans. Happy streaming! 🎌
