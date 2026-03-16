import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Signup submitted:', formData);
      // Backend connection later
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-emerald-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Create Account</h1>
          <p className="text-gray-500 text-sm">Join the LostFound community today</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="group">
            <label htmlFor="name" className="block mb-1.5 font-semibold text-gray-700 text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3.5 rounded-xl border ${
                errors.name ? 'border-red-500 ring-1 ring-red-500/20' : 'border-gray-300 hover:border-emerald-400'
              } bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm placeholder-gray-400`}
            />
            {errors.name && (
              <span className="text-red-500 text-xs font-medium mt-1.5 flex items-center">
                <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.name}
              </span>
            )}
          </div>

          <div className="group">
            <label htmlFor="email" className="block mb-1.5 font-semibold text-gray-700 text-sm">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3.5 rounded-xl border ${
                errors.email ? 'border-red-500 ring-1 ring-red-500/20' : 'border-gray-300 hover:border-emerald-400'
              } bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm placeholder-gray-400`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs font-medium mt-1.5 flex items-center">
                <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.email}
              </span>
            )}
          </div>

          <div className="group">
            <label htmlFor="password" className="block mb-1.5 font-semibold text-gray-700 text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3.5 rounded-xl border ${
                errors.password ? 'border-red-500 ring-1 ring-red-500/20' : 'border-gray-300 hover:border-emerald-400'
              } bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm placeholder-gray-400`}
            />
            {errors.password && (
              <span className="text-red-500 text-xs font-medium mt-1.5 flex items-center">
                <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="mt-3 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[15px] shadow hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
