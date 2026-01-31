# Technology Stack

## Core Framework
- **Next.js 15.5.3** with App Router (React 19.1.0)
- **Turbopack** enabled for faster builds and development

## Database & ORM
- **Prisma** (v6.16.2) with MySQL database
- Prisma Client for type-safe database access

## Authentication
- **NextAuth.js** (v4.24.11) with Prisma adapter
- bcrypt for password hashing
- Role-based access control (CUSTOMER/ADMIN)

## UI & Styling
- **Bootstrap 5.3.2** for responsive design
- CSS Modules for component-specific styles
- Next.js Font optimization (Geist fonts)

## State Management & Data Fetching
- **TanStack React Query** (v5.89.0) for server state management
- Context API for theme management

## Admin Panel
- **React Admin** (v5.11.3) with JSON Server data provider
- Rich text input support

## Common Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack

# Production
npm run build            # Build for production with Turbopack
npm run start            # Start production server
npm run export           # Export static site

# Database
npx prisma migrate dev   # Run migrations in development
npx prisma generate      # Generate Prisma Client
npx prisma db seed       # Seed database

# Admin Setup
npm run create-admin     # Create admin user via script

# Code Quality
npm run lint             # Run ESLint
```

## Environment Variables
Required in `.env`:
- `DATABASE_URL`: MySQL connection string
- `NEXTAUTH_SECRET`: Secret for NextAuth.js
- `NEXTAUTH_URL`: Application URL
