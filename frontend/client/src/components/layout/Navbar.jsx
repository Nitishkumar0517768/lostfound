import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const baseLinkClasses =
    "text-xl font-medium text-black hover:text-emerald-600 transition-colors duration-200 pb-1";

  const activeLinkClasses =
    "text-emerald-600 border-b-2 border-emerald-600";

  const getNavLinkClasses = ({ isActive }) =>
    `${baseLinkClasses} ${isActive ? activeLinkClasses : ""}`;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link
            to="/"
            className=" font-bold tracking-tight text-3xl"
          >
            <span className="text-black">Lost</span>
            <span className="text-emerald-600">Found</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 ">
            <NavLink to="/" end className={getNavLinkClasses}>
              Home
            </NavLink>

            <NavLink to="/items" className={getNavLinkClasses}>
              Browse Items
            </NavLink>

            <NavLink to="/post-item" className={getNavLinkClasses}>
              Post Item
            </NavLink>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-black  font-medium hover:text-emerald-600 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2  rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition"
            >
              Signup
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg border text-black border-gray-300"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden py-3 space-y-3 border-t border-gray-200">
            <NavLink to="/" className={getNavLinkClasses}>
              Home
            </NavLink>

            <NavLink to="/items" className={getNavLinkClasses}>
              Browse Items
            </NavLink>

            <NavLink to="/post-item" className={getNavLinkClasses}>
              Post Item
            </NavLink>

            <Link
              to="/login"
              className="block text-black hover:text-emerald-600"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="block bg-emerald-500 text-white px-4 py-2 rounded-lg text-center"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;