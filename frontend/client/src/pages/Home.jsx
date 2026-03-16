import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-emerald-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
          Campus Lost & <span className="text-emerald-600 dark:text-emerald-300">Found</span> System
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Helping students recover lost belongings quickly and easily.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/items"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-emerald-300"
          >
            Browse Items
          </Link>
          <Link
            to="/post-item"
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-emerald-200 dark:border-gray-700 font-semibold rounded-xl shadow hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-emerald-200"
          >
            Post Lost Item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
