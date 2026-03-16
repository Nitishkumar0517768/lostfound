import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="flex gap-4 mb-4 sm:mb-0">
        <Link to="/" className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Home</Link>
        <Link to="/items" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Items</Link>
        <Link to="/post-item" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Post Item</Link>
      </div>
      
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</Link>
        <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
        <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Login</Link>
        <Link to="/signup" className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md transition-colors">Signup</Link>
        
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="ml-2 p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all font-bold text-sm flex items-center justify-center w-8 h-8"
          aria-label="Toggle Dark Mode"
          title="Toggle Dark Mode"
        >
          {isDark ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
