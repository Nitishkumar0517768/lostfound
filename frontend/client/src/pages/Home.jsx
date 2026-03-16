import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-24 bg-emerald-50">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-6">
          <span className="text-gray-900">Campus Lost &amp; </span>
          <span className="text-emerald-600">Found</span>
          <span className="text-gray-900"> System</span>
        </h1>
        <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
          Helping students recover lost belongings quickly and easily.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            to="/items"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:bg-emerald-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-emerald-300"
          >
            Browse Items
          </Link>
          <Link
            to="/post-item"
            className="w-full sm:w-auto px-8 py-4 border border-emerald-500 text-emerald-600 bg-white hover:bg-emerald-50 font-semibold rounded-xl shadow hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-emerald-200"
          >
            Post Lost Item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
