# Project Structure

## Architecture Pattern
This is a Next.js App Router application with a hybrid architecture combining frontend and backend logic.

## Directory Organization

### `/src/app`
Next.js App Router pages and API routes following file-based routing:
- `page.js` - Route pages
- `layout.js` - Shared layouts
- `providers.js` - Client-side providers wrapper
- `/api/*` - API route handlers (NextAuth, contact, products, etc.)
- `/admin/*` - Admin dashboard pages (protected routes)
- `/login`, `/signup`, `/profile` - Auth-related pages

### `/src/components`
React components organized by feature:
- Root level: Shared UI components (Navbar, ProductCard, HeroSection, etc.)
- `/admin/*` - Admin-specific components (AdminLayout, ProductList, CategoryList, etc.)

### `/src/backend`
Server-side business logic:
- `/controllers/*` - Business logic controllers (productController, userController)
- `/lib/*` - Shared utilities (Prisma client singleton)

### `/src/data`
Data layer and providers:
- `/admin/*` - React Admin data providers and resource definitions
- `products.js` - Product data utilities

### `/src/context`
React Context providers:
- `ThemeContext.js` - Theme state management

### `/prisma`
Database schema and utilities:
- `schema.prisma` - Database schema definition
- `seed.js` - Database seeding script

### `/scripts`
Utility scripts:
- `create-admin.js` - Admin user creation script

### `/middleware.js`
Next.js middleware for:
- Route protection based on authentication
- Role-based redirects (Admin vs Customer)

## Key Conventions

1. **File naming**: Use camelCase for component files (e.g., `ProductCard.js`)
2. **API routes**: Follow REST conventions in `/src/app/api/*`
3. **Authentication**: NextAuth handles auth, middleware enforces access control
4. **Database access**: Always use the Prisma singleton from `/src/backend/lib/prisma.js`
5. **Admin routes**: All admin functionality under `/admin/*` with React Admin components
6. **Styling**: Bootstrap classes + CSS Modules for component-specific styles
