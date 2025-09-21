'use client';

import { useTheme } from '../context/ThemeContext';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { data: session, status } = useSession();

  return (
    <nav className="navbar navbar-expand-lg glass-navbar fixed-top">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-3" href="/">
          <span className="text-primary">Fashion</span>Fox
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link fw-medium" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#products">
                Products
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" href="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" href="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {/* Theme Toggle and Auth Buttons */}
          <div className="d-flex align-items-center">
            <button
              className="btn theme-toggle border-0 d-flex align-items-center gap-2 me-3"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <>
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                  </svg>
                  <span className="d-none d-md-inline">Dark</span>
                </>
              ) : (
                <>
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                  </svg>
                  <span className="d-none d-md-inline">Light</span>
                </>
              )}
            </button>

            {status === 'loading' && (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}

            {status === 'unauthenticated' && (
              <>
                <Link href="/login" className="btn btn-outline-primary me-2">Login</Link>
                <Link href="/signup" className="btn btn-primary">Sign Up</Link>
              </>
            )}

            {status === 'authenticated' && (
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  {session.user.name}
                  {session.user.role === 'ADMIN' && (
                    <span className="badge bg-warning ms-2">{session.user.name}(ADMIN)</span>
                  )}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
                  {session.user.role === 'ADMIN' && (
                    <>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" href="/admin/dashboard">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
                          <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                        </svg>
                        Admin Panel
                      </Link></li>
                    </>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => signOut({ callbackUrl: '/' })}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
