'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminProtection = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (session?.user?.role !== 'ADMIN') {
      router.push('/');
      return;
    }
  }, [session, status, router]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // Show access denied if not admin
  if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="glass p-5 rounded-4">
            <svg width="64" height="64" fill="currentColor" viewBox="0 0 16 16" className="text-danger mb-3">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <h3 className="h4 mb-3">Access Denied</h3>
            <p className="text-muted mb-4">You don't have permission to access the admin panel.</p>
            <button 
              className="btn btn-primary"
              onClick={() => router.push('/')}
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render children if user is authenticated and is admin
  if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
    return children;
  }

  return null;
};

export default AdminProtection;
