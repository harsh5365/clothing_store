# Project Functionality Status

Quick overview of implemented and missing functionality for this repository.

## Summary
- UI: Product listing, hero, navigation, theme toggle, and glassmorphism styling are implemented.
- Interactions: 3D tilt on product cards and basic "Add" button (console log) are implemented.
- Persistence: Theme preference saved to localStorage and applied to document.
- Static export ready: `next.config.mjs` configured for static export and remote images.
- Backend / cart / auth: Not implemented (Prisma schema exists but not wired to the app).

## Implemented (Ready / Working)
- Theme provider and hook
  - [`ThemeProvider`](src/context/ThemeContext.js) and [`useTheme`](src/context/ThemeContext.js) apply theme and persist to localStorage. See [src/context/ThemeContext.js](src/context/ThemeContext.js).
- App root and font integration
  - Root layout uses [`ThemeProvider`](src/app/layout.js). See [src/app/layout.js](src/app/layout.js).
- Navigation with theme toggle
  - [`Navbar`](src/components/Navbar.js) uses the theme hook and includes an accessible toggle. See [src/components/Navbar.js](src/components/Navbar.js).
- Product listing UI
  - Grid rendering: [`ProductGrid`](src/components/ProductGrid.js) maps [`products`](src/data/products.js) to cards. See [src/components/ProductGrid.js](src/components/ProductGrid.js) and [src/data/products.js](src/data/products.js).
  - Card UI: [`ProductCard`](src/components/ProductCard.js) displays image, name, price, category, description, and an "Add" button (currently logs to console). See [src/components/ProductCard.js](src/components/ProductCard.js).
  - Interactive tilt: [`InteractiveProductCard`](src/components/InteractiveProductCard.js) sets CSS custom properties to animate tilt on mouse movement. See [src/components/InteractiveProductCard.js](src/components/InteractiveProductCard.js).
- Styling and visual system
  - Global styles and glassmorphism utilities: [src/app/globals.css](src/app/globals.css)
  - Page-level variables and responsive rules: [src/app/page.module.css](src/app/page.module.css)
- Static export & image config
  - `next.config.mjs` configured with `output: 'export'`, trailing slashes and remote image allowance. See [next.config.mjs](next.config.mjs).
- Deployment docs
  - GitHub Pages deployment guide and workflow notes are present. See [DEPLOYMENT.md](DEPLOYMENT.md).

## Partially Implemented
- Cart / Add-to-cart
  - Button present in [`ProductCard`](src/components/ProductCard.js) but only logs to console. Needs state/store or API integration.
- Theme toggle visuals
  - Theme toggling sets `data-bs-theme` and CSS variables (in [src/app/globals.css](src/app/globals.css)); consider animations or transition polish.

## Not Implemented / Missing
- Backend API endpoints (REST / GraphQL) — no API route files in `src/app/api`.
- Auth / Admin UI — `prisma/schema.prisma` and `prisma/seed.js` exist but are not integrated into the app. See [prisma/schema.prisma](prisma/schema.prisma) and [prisma/seed.js](prisma/seed.js).
- Persistent cart and checkout flow.
- Unit / integration tests — no test files detected.
- CI checks for linting/tests (only ESLint config present). See [eslint.config.mjs](eslint.config.mjs).
- Progressive enhancement for touch devices (tilt is mouse-driven; ensure graceful fallback).

## How to run (local)
1. Install dependencies:
   ```sh
   npm ci
   ```
   See [package.json](package.json).
2. Start dev server:
   ```sh
   npm run dev
   ```
3. Open http://localhost:3000 and verify:
   - Navbar and theme toggle ([src/components/Navbar.js](src/components/Navbar.js))
   - Product grid ([src/components/ProductGrid.js](src/components/ProductGrid.js))
   - Interactive tilt ([src/components/InteractiveProductCard.js](src/components/InteractiveProductCard.js))

## Recommended Next Steps
- Implement cart state (client-side or API-backed) and persist cart items.
- Add API routes and connect `prisma/schema.prisma` to an actual database; expose product CRUD endpoints.
- Replace console.log in [`ProductCard`](src/components/ProductCard.js) with cart action.
- Add unit tests for components and hooks; add CI checks.
- Add server-side rendering / data fetching if dynamic data is needed.

## Useful files & symbols (quick links)
- [`ThemeProvider`](src/context/ThemeContext.js) — [src/context/ThemeContext.js](src/context/ThemeContext.js)  
- [`useTheme`](src/context/ThemeContext.js) — [src/context/ThemeContext.js](src/context/ThemeContext.js)  
- [`Navbar`](src/components/Navbar.js) — [src/components/Navbar.js](src/components/Navbar.js)  
- [`ProductGrid`](src/components/ProductGrid.js) — [src/components/ProductGrid.js](src/components/ProductGrid.js)  
- [`InteractiveProductCard`](src/components/InteractiveProductCard.js) — [src/components/InteractiveProductCard.js](src/components/InteractiveProductCard.js)  
- [`ProductCard`](src/components/ProductCard.js) — [src/components/ProductCard.js](src/components/ProductCard.js)  
- [`products`](src/data/products.js) — [src/data/products.js](src/data/products.js)  
- Global styles — [src/app/globals.css](src/app/globals.css)  
- Page module styles — [src/app/page.module.css](src/app/page.module.css)  
- Root layout — [src/app/layout.js](src/app/layout.js)  
- Next config — [next.config.mjs](next.config.mjs)  
- Deployment guide — [DEPLOYMENT.md](DEPLOYMENT.md)  
- Prisma schema & seed — [prisma/schema.prisma](prisma/schema.prisma), [prisma/seed.js](prisma/seed.js)

---
This document is a concise status snapshot; update it as new features are implemented.