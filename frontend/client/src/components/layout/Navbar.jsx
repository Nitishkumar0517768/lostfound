import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpen((open) => !open);
  };

  const linkBaseClasses =
    'text-sm font-medium text-gray-800 hover:text-emerald-600 transition-colors duration-200 border-b-2 border-transparent hover:border-emerald-500';

  return (
    <nav className="sticky top-0 z-50 bg-white/90 shadow-md backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Leftside Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-tight text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Lost<span className="text-emerald-600">Found</span>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={linkBaseClasses}>
              Home
            </Link>
            <Link to="/items" className={linkBaseClasses}>
              Browse Items
            </Link>
            <Link to="/post-item" className={linkBaseClasses}>
              Post Item
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link to="/login" className={`${linkBaseClasses} hidden sm:inline-flex`}>
              Login
            </Link>
            <Link
              to="/signup"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-white transition"
            >
              Signup
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-white transition"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMobileOpen ? 'block' : 'hidden'} md:hidden py-3 space-y-2 border-t border-gray-100`}> 
          <Link to="/" className={linkBaseClasses} onClick={() => setIsMobileOpen(false)}>
            Home
          </Link>
          <Link to="/items" className={linkBaseClasses} onClick={() => setIsMobileOpen(false)}>
            Browse Items
          </Link>
          <Link to="/post-item" className={linkBaseClasses} onClick={() => setIsMobileOpen(false)}>
            Post Item
          </Link>
          <Link to="/login" className={linkBaseClasses} onClick={() => setIsMobileOpen(false)}>
            Login
          </Link>
          <Link
            to="/signup"
            className="inline-flex w-full items-center justify-center px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium shadow-sm hover:bg-emerald-600 transition"
            onClick={() => setIsMobileOpen(false)}
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
