# Admin Panel Setup Guide

This guide explains how to set up and use the admin panel for FashionFox.

## 🔐 **Admin Access Control**

### Role-Based Access
- **ADMIN users**: Automatically redirected to `/admin/dashboard` after login
- **Regular users**: Redirected to home page (`/`) after login
- **Unauthenticated users**: Cannot access admin routes

### Admin User Creation

#### Method 1: Using the Script (Recommended)
```bash
npm run create-admin
```

This creates an admin user with:
- **Email**: `admin@fashionfox.com`
- **Password**: `admin123`
- **Role**: `ADMIN`

#### Method 2: Manual Database Creation
If you prefer to create the admin user manually:

1. Connect to your database
2. Insert a user record with:
   ```sql
   INSERT INTO User (email, name, password, role, emailVerified) 
   VALUES ('admin@fashionfox.com', 'Admin User', '$2b$10$...', 'ADMIN', NOW());
   ```
3. Make sure to hash the password using bcrypt

## 🚀 **How It Works**

### 1. **Middleware Protection**
- `middleware.js` automatically redirects users based on their role
- ADMIN users accessing regular pages → redirected to admin dashboard
- Non-ADMIN users accessing admin routes → redirected to home page

### 2. **Login Flow**
1. User logs in at `/login`
2. System checks user role
3. **ADMIN users** → redirected to `/admin/dashboard`
4. **Regular users** → redirected to `/`

### 3. **Admin Panel Access**
- **URL**: `/admin` or `/admin/dashboard`
- **Protection**: `AdminProtection` component checks authentication and role
- **Features**: Full CRUD operations for products and categories

## 🎯 **Admin Panel Features**

### Dashboard (`/admin/dashboard`)
- **Overview statistics**: Products, categories, stock levels
- **Quick actions**: Add products, categories
- **Category breakdown**: Main vs sub-categories
- **Inventory value tracking**

### Product Management (`/admin/products`)
- **List view**: All products with filtering and search
- **Create**: Add new products with variants
- **Edit**: Update existing products
- **Delete**: Remove products
- **Features**: Image upload, SEO fields, stock management

### Category Management (`/admin/categories`)
- **Hierarchical structure**: Main categories (Men/Women) → Subcategories
- **CRUD operations**: Create, read, update, delete categories
- **Image management**: Upload category images

## 🔧 **Technical Implementation**

### Authentication Flow
```javascript
// NextAuth configuration includes role in JWT token
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = user.role;
    }
    return token;
  },
  async session({ session, token }) {
    session.user.role = token.role;
    return session;
  },
}
```

### Middleware Protection
```javascript
// middleware.js handles role-based redirection
if (token?.role === 'ADMIN') {
  // Redirect to admin dashboard
} else if (pathname.startsWith('/admin')) {
  // Redirect non-admins away from admin routes
}
```

### Component Protection
```javascript
// AdminProtection component wraps admin pages
const AdminProtection = ({ children }) => {
  // Check authentication and role
  // Show loading, access denied, or render children
};
```

## 🎨 **UI Features**

### Admin Navigation
- **Sidebar**: Collapsible navigation with glassmorphism design
- **Theme toggle**: Light/dark mode support
- **Responsive**: Mobile-friendly design
- **Quick access**: Direct links to create/edit operations

### Visual Indicators
- **Admin badge**: Shows "ADMIN" badge in user dropdown
- **Admin panel link**: Direct access from user menu
- **Loading states**: Smooth transitions and loading indicators

## 🔒 **Security Features**

### Access Control
- **Route protection**: Middleware prevents unauthorized access
- **Component protection**: AdminProtection component double-checks permissions
- **Session validation**: Real-time authentication checking

### Data Validation
- **Form validation**: Required fields and data types
- **Image upload**: Secure file handling
- **Input sanitization**: XSS protection

## 📱 **Responsive Design**

### Mobile Support
- **Collapsible sidebar**: Touch-friendly navigation
- **Responsive tables**: Horizontal scrolling on small screens
- **Touch interactions**: Optimized for mobile devices

### Desktop Experience
- **Full sidebar**: Always visible navigation
- **Hover effects**: Interactive elements
- **Keyboard shortcuts**: Power user features

## 🚨 **Troubleshooting**

### Common Issues

1. **Cannot access admin panel**
   - Check if user has `role: 'ADMIN'` in database
   - Verify authentication is working
   - Check browser console for errors

2. **Redirect loops**
   - Clear browser cache and cookies
   - Check middleware configuration
   - Verify NextAuth setup

3. **Admin user not created**
   - Run `npm run create-admin` again
   - Check database connection
   - Verify Prisma schema

### Debug Steps
1. Check user role in database
2. Verify JWT token contains role
3. Check middleware logs
4. Test authentication flow

## 🔄 **Updates and Maintenance**

### Adding New Admin Features
1. Create new admin components
2. Add routes to middleware
3. Update navigation menu
4. Test role-based access

### User Management
- **Promote users**: Update role in database
- **Demote admins**: Change role to 'USER'
- **Bulk operations**: Use database queries for multiple users

## 📞 **Support**

If you encounter issues:
1. Check the troubleshooting section
2. Verify your database setup
3. Check NextAuth configuration
4. Review middleware logs

The admin panel is designed to be secure, user-friendly, and fully functional for managing your FashionFox store! 🎉
