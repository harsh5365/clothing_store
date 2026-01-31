'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="container py-5" style={{ marginTop: '80px' }}>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="container py-5" style={{ marginTop: '80px' }}>
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h2 mb-3">Admin Dashboard</h1>
          <p className="text-muted">Welcome, {session.user.name}!</p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="h2">8</h3>
              <p className="text-muted mb-0">Products</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="h2">0</h3>
              <p className="text-muted mb-0">Orders</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="h2">0</h3>
              <p className="text-muted mb-0">Reviews</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <h3 className="h2">1</h3>
              <p className="text-muted mb-0">Users</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link href="/admin/products" className="btn btn-primary">
                  Manage Products
                </Link>
                <Link href="/orders" className="btn btn-outline-primary">
                  View Orders
                </Link>
                <Link href="/products" className="btn btn-outline-secondary">
                  View Store
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Account Info</h5>
            </div>
            <div className="card-body">
              <p><strong>Role:</strong> {session.user.role}</p>
              <p><strong>Email:</strong> {session.user.email}</p>
              <p className="mb-0"><strong>Name:</strong> {session.user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
