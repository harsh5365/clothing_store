# FashionFox — Working Functionality (Consolidated)

This document describes **currently implemented, working functionality** for the FashionFox clothing store. It is derived from the Kiro editor specs in [`.kiro/`](.kiro/) and verified against the codebase.

---

## 1. Product overview

**FashionFox** is an e-commerce clothing store (Next.js) that provides:

- **Storefront**: Browse and view products, search, filter, product detail with reviews (all product data from database via API)
- **Authentication**: NextAuth with role-based access (Customer / Admin); session includes `user.id` and `user.role`
- **Admin**: Dashboard for products and categories (React Admin); all data from API only, no static JSON
- **Customer flows**: Cart, wishlist, checkout, order history, profile, contact
- **UI**: Responsive layout, Bootstrap, theme toggle (light/dark), glassmorphism

**Roles:**

- **CUSTOMER**: Browse, cart, wishlist, checkout, orders, profile, reviews
- **ADMIN**: Admin dashboard for products and categories; middleware redirects admins to dashboard on storefront routes

---

## 2. Technology stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router), React 19 |
| Database | Prisma + MySQL |
| Auth | NextAuth.js, bcrypt, role-based (CUSTOMER/ADMIN) |
| UI | Bootstrap 5, CSS Modules, Geist fonts |
| State | React Context (Theme, Cart, Wishlist), TanStack React Query where used |
| Admin | React Admin with API-only data provider (fetch `/api/products`, `/api/categories`) |

**Commands:** `npm run dev` | `npm run build` | `npx prisma migrate dev` | `npm run create-admin`

---

## 3. Implemented features (by spec)

### 3.1 Shopping cart  
*Spec: [.kiro/specs/shopping-cart/](.kiro/specs/shopping-cart/)*

| Capability | Status | Notes |
|------------|--------|--------|
| Add/remove/update quantity | ✅ | CartContext, localStorage persistence |
| Cart badge in navbar | ✅ | Total quantity, opens drawer |
| Cart drawer (slide-out) | ✅ | CartDrawer, CartItem |
| Full cart page | ✅ | `/cart` with summary, Continue Shopping, Checkout |
| Subtotal/total, empty state | ✅ | Per-item and cart total |
| Persist across sessions | ✅ | JSON in localStorage, debounced writes |
| Accessibility | ✅ | ARIA, keyboard, screen reader hints |
| Performance | ✅ | Lazy drawer, memoization, debounce 300ms |

**Key files:** `src/context/CartContext.js`, `src/components/CartBadge.js`, `src/components/CartDrawer.js`, `src/components/CartItem.js`, `src/app/cart/page.js`, `src/components/Navbar.js`, `src/components/ProductCard.js`

---

### 3.2 Checkout flow  
*Spec: [.kiro/specs/checkout-flow/](.kiro/specs/checkout-flow/)*

| Capability | Status | Notes |
|------------|--------|--------|
| Proceed to checkout from cart | ✅ | Button on cart page; empty cart blocked |
| Auth required | ✅ | Redirect to login with return URL if unauthenticated |
| Step 1: Shipping | ✅ | Form with validation (name, address, city, state, zip, phone) |
| Step 2: Payment | ✅ | Payment method selection (e.g. credit card) |
| Step 3: Review | ✅ | Order summary, shipping, payment (masked), subtotal/shipping/tax/total |
| Place order | ✅ | Validates, calls `/api/orders`, clears cart, redirects to confirmation |
| Order confirmation | ✅ | Order number, summary, shipping, link to order details |
| Step navigation | ✅ | Progress indicator, back/next, validation before next |
| Totals | ✅ | Subtotal, shipping (e.g. free), tax (e.g. 10%), total |

**Key files:** `src/app/checkout/page.js`, `src/app/api/orders/route.js` (POST), CartContext for cart clear after order

**Not implemented (per spec):** Dedicated CheckoutContext, session-storage persistence of checkout progress, estimated delivery date on confirmation.

---

### 3.3 Order management  
*Spec: [.kiro/specs/order-management/](.kiro/specs/order-management/)*

| Capability | Status | Notes |
|------------|--------|--------|
| Order history | ✅ | `/orders` — list of orders (number, date, total, status) |
| Order details | ✅ | `/orders/[id]` — items, quantities, prices, shipping, payment, status |
| Sort by date | ✅ | Newest first (API + orderUtils fallback) |
| Order status & tracking | ✅ | Status badge; tracking when shipped |
| Save order on checkout | ✅ | POST `/api/orders` creates Order + OrderItems in DB |
| “My Orders” entry point | ✅ | Profile / user menu link to `/orders` |

**Key files:** `src/app/orders/page.js`, `src/app/orders/[id]/page.js`, `src/app/api/orders/route.js` (GET, POST), `src/lib/orderUtils.js`. Session uses `getServerSession(authOptions)` so `session.user.id` is available.

---

### 3.4 Product reviews & ratings  
*Spec: [.kiro/specs/product-reviews/](.kiro/specs/product-reviews/)*

| Capability | Status | Notes |
|------------|--------|--------|
| Submit review | ✅ | Rating (1–5), title, text; auth required; POST `/api/reviews` |
| View reviews | ✅ | Per product: rating, title, text, author, date |
| Star rating input | ✅ | StarRating component, hover preview |
| Average rating & count | ✅ | On product detail and ProductCard |
| Filter/sort reviews | ✅ | ReviewList filter by rating, sort options |
| Empty state | ✅ | Message when no reviews |

**Key files:** `src/components/StarRating.js`, `src/components/ReviewForm.js`, `src/components/ReviewList.js`, `src/app/product/[id]/page.js`, `src/app/api/reviews/route.js`, `src/lib/reviewUtils.js`, `src/components/ProductCard.js`. Reviews API uses `getServerSession(authOptions)` for `session.user.id`.

---

### 3.5 Product search & filtering  
*Spec: [.kiro/specs/product-search-filtering/](.kiro/specs/product-search-filtering/)*

| Capability | Status | Notes |
|------------|--------|--------|
| Search by name/description | ✅ | Case-insensitive, real-time (debounced) |
| Filter by category | ✅ | Single/multiple categories; product count per category |
| Filter by price range | ✅ | Min/max price |
| Result count | ✅ | Matching product count |
| Clear all filters | ✅ | Resets query, categories, price |
| Active filter tags | ✅ | FilterTags with remove per tag |
| URL persistence | ✅ | useSearchParams; shareable/bookmarkable URLs |
| Logic separated from UI | ✅ | searchUtils.js pure functions, useProductSearch hook |
| Homepage search | ✅ | Hero SearchBar links to `/products` with query |
| Responsive & a11y | ✅ | Collapsible filter panel, ARIA, keyboard |

**Key files:** `src/lib/searchUtils.js`, `src/hooks/useProductSearch.js`, `src/components/SearchBar.js`, `src/components/FilterPanel.js`, `src/components/FilterTags.js`, `src/app/products/page.js`, `src/components/HeroSection.js`

---

### 3.6 User wishlist  
*Spec: [.kiro/specs/user-wishlist/](.kiro/specs/user-wishlist/)*

| Capability | Status | Notes |
|------------|--------|--------|
| Add/remove from wishlist | ✅ | No duplicates; localStorage persistence |
| Wishlist page | ✅ | `/wishlist` — all items, remove, add-to-cart |
| Wishlist badge in navbar | ✅ | Count, opens/navigates to wishlist |
| Add to cart from wishlist | ✅ | Keeps item in wishlist; uses CartContext |
| Empty state | ✅ | Message when wishlist empty |
| Persist across sessions | ✅ | JSON in localStorage |

**Key files:** `src/context/WishlistContext.js`, `src/components/WishlistButton.js`, `src/components/WishlistBadge.js`, `src/components/WishlistItem.js`, `src/app/wishlist/page.js`, `src/components/Navbar.js`, `src/components/ProductCard.js`

---

### 3.7 Authentication & profile

| Capability | Status | Notes |
|------------|--------|--------|
| Login / signup | ✅ | NextAuth; credentials; `/login`, `/signup` |
| Session & role | ✅ | CUSTOMER / ADMIN; middleware uses role |
| Protected routes | ✅ | Middleware: auth required for `/admin`, `/profile`, `/orders`, `/checkout`, etc. |
| Profile page | ✅ | `/profile` — user info, “My Orders” link |
| Admin redirect | ✅ | Admin users redirected to `/admin/dashboard` on storefront paths |

**Key files:** `src/app/api/auth/[...nextauth]/route.js`, `src/app/login/page.js`, `src/app/signup/page.js`, `src/app/profile/page.js`, `middleware.js`

---

### 3.8 Admin (products & categories)

| Capability | Status | Notes |
|------------|--------|--------|
| Admin dashboard | ✅ | `/admin`, `/admin/dashboard` |
| Product list/create/edit | ✅ | React Admin; ProductList, ProductCreate, ProductEdit; Prisma schema (name, description, price, image, category, stock) |
| Category list (read-only) | ✅ | CategoryList; categories from GET `/api/categories` (derived from product.category) |
| Data provider | ✅ | API-only: fetch `/api/products` and `/api/categories`; no static JSON/files |
| Admin layout & protection | ✅ | AdminLayout, AdminProtection/AdminProvider |

**Key files:** `src/app/admin/page.js`, `src/app/admin/dashboard/page.js`, `src/data/admin/dataProvider.js`, `src/components/admin/ProductList.js`, `src/components/admin/ProductCreate.js`, `src/components/admin/ProductEdit.js`, `src/components/admin/CategoryList.js`, `src/app/api/products/route.js`, `src/app/api/categories/route.js`

---

### 3.9 Core storefront & UI

| Capability | Status | Notes |
|------------|--------|--------|
| Homepage | ✅ | Hero, featured products (from API), search entry |
| Products listing | ✅ | `/products` — fetches GET `/api/products`; grid, search, filters |
| Product detail | ✅ | `/product/[id]` — fetches GET `/api/products?id=`; details, reviews, add to cart/wishlist |
| Theme (light/dark) | ✅ | ThemeContext, persisted in localStorage |
| Navbar | ✅ | Links, cart badge, wishlist badge, theme toggle, auth menu |
| Contact | ✅ | Contact form; `/contact`; API route for submissions |
| About | ✅ | `/about` |

**Key files:** `src/app/page.js`, `src/app/products/page.js`, `src/app/product/[id]/page.js`, `src/context/ThemeContext.js`, `src/components/Navbar.js`, `src/components/HeroSection.js`, `src/components/ProductCard.js`, `src/components/ProductGrid.js`, `src/app/contact/page.js`, `src/app/api/contact/route.js`. Product data is loaded from the database only (no static JSON).

---

## 4. Not implemented (from specs)

### 4.1 Inventory management  
*Spec: [.kiro/specs/inventory-management/](.kiro/specs/inventory-management/)*

- Admin inventory page and stock level display
- Stock update form and validation
- Low-stock alerts and threshold
- Product cards: stock status, “Only X left”, disable add-to-cart when out of stock

*Note:* Prisma `Product` has a `stock` field; it is not yet used in storefront or admin inventory UI.

### 4.2 Checkout (optional enhancements)

- CheckoutContext and session-storage persistence of step data
- Estimated delivery date on confirmation screen

### 4.3 Automated tests

- Property/unit tests referenced in the spec task lists (e.g. cart, search, filters) are not implemented.

---

## 5. Data & API summary

All product and category data is served from the database via API; there are no static JSON or file-based data sources.

| API / data | Purpose |
|------------|--------|
| `GET /api/products` | List all products (storefront & admin) |
| `GET /api/products?id=` | Single product by id |
| `POST /api/products` | Create product (admin) |
| `PATCH /api/products?id=` | Update product (admin) |
| `DELETE /api/products?id=` | Delete product (admin) |
| `GET /api/categories` | Unique category names from products (read-only; admin) |
| `POST /api/orders` | Create order (auth required) |
| `GET /api/orders` | Current user’s orders (auth required) |
| `POST /api/reviews` | Create review (auth required) |
| `GET /api/reviews?productId=` | Reviews for a product |
| `POST /api/contact` | Contact form submission |
| NextAuth (`/api/auth/*`) | Login, signup, session (session includes `user.id`, `user.role`) |

**Database (Prisma):** User, Account, Session, Product (image `@db.VarChar(500)`), Order, OrderItem, Review, VerificationToken; enums Role (CUSTOMER, ADMIN), OrderStatus. No Category table; categories are derived from `Product.category`.

---

## 6. How to run

1. **Install and DB**
   ```bash
   npm ci
   cp .env.example .env   # if present; set DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
   npx prisma migrate dev
   npx prisma db seed
   ```

2. **Create admin (optional)**
   ```bash
   npm run create-admin
   ```

3. **Dev server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 (or configured URL).

4. **Production**
   ```bash
   npm run build
   npm run start
   ```

---

## 7. Spec and steering references

| Document | Path |
|----------|------|
| Product overview | [.kiro/steering/product.md](.kiro/steering/product.md) |
| Project structure | [.kiro/steering/structure.md](.kiro/steering/structure.md) |
| Tech stack | [.kiro/steering/tech.md](.kiro/steering/tech.md) |
| Checkout flow | [.kiro/specs/checkout-flow/](.kiro/specs/checkout-flow/) |
| Shopping cart | [.kiro/specs/shopping-cart/](.kiro/specs/shopping-cart/) |
| Order management | [.kiro/specs/order-management/](.kiro/specs/order-management/) |
| Product reviews | [.kiro/specs/product-reviews/](.kiro/specs/product-reviews/) |
| Product search & filtering | [.kiro/specs/product-search-filtering/](.kiro/specs/product-search-filtering/) |
| User wishlist | [.kiro/specs/user-wishlist/](.kiro/specs/user-wishlist/) |
| Inventory management | [.kiro/specs/inventory-management/](.kiro/specs/inventory-management/) |

---

*Generated from `.kiro/` specs and current codebase. Update this file when features are added or removed.*
