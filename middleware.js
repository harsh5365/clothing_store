import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // If user is authenticated and has ADMIN role
    if (token?.role === 'ADMIN') {
      // If admin is trying to access regular pages, redirect to admin dashboard
      if (pathname === '/' || pathname.startsWith('/products') || pathname.startsWith('/about') || pathname.startsWith('/contact')) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
    }

    // If user is not admin and trying to access admin routes
    if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Allow access to public pages
        if (pathname === '/' || 
            pathname.startsWith('/api') || 
            pathname.startsWith('/_next') || 
            pathname.startsWith('/login') || 
            pathname.startsWith('/signup') ||
            pathname.startsWith('/about') ||
            pathname.startsWith('/contact')) {
          return true;
        }

        // Require authentication for admin routes
        if (pathname.startsWith('/admin')) {
          return !!token;
        }

        // For other protected routes, require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
