
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../context/ThemeContext';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();

  if (status === 'loading') {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Access Denied. Please log in to view your profile.
        </div>
        <button className="btn btn-primary" onClick={() => router.push('/login')}>Login</button>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">
      <div className={`card ${theme === 'dark' ? 'glass-navbar' : ''}`}>
        <div className="card-header">Your Profile</div>
        <div className="card-body">
          <h5 className="card-title">{session.user.name}</h5>
          <p className="card-text">{session.user.email}</p>
          <p className="card-text"><small className="text-muted">Role: {session.user.role}</small></p>
        </div>
      </div>
    </div>
  );
}
