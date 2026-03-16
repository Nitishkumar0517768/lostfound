import React, { useState } from 'react';
import axios from 'axios';

const PostItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'lost',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/items', formData);
      if (res.data.success) {
        setMessage('Item posted successfully!');
        setFormData({ title: '', description: '', type: 'lost', location: '' });
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-emerald-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700/50 overflow-hidden transition-all duration-300">

        {/* Header Section */}
        <div className="bg-emerald-600 dark:bg-emerald-700 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-600/20 dark:from-emerald-400/10 dark:to-teal-500/10"></div>
          <h1 className="text-3xl font-extrabold text-white relative z-10">Post an Item</h1>
          <p className="text-emerald-100 mt-2 relative z-10 text-sm font-medium">Help the community by sharing details</p>
        </div>

        <div className="p-8">
          {message && (
            <div
              className={`p-4 mb-6 rounded-xl font-medium flex items-center text-sm ${
                message.startsWith('Error')
                  ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30'
              }`}
            >
              <span className="mr-2">
                {message.startsWith('Error') ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </span>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Type Selection (Radio Buttons for better UX) */}
            <div className="mb-2">
              <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider">
                Item Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`cursor-pointer border rounded-xl p-4 text-center font-bold transition-all ${
                    formData.type === 'lost'
                      ? 'bg-red-50 border-red-500 text-red-700 dark:bg-red-900/20 dark:border-red-500/50 dark:text-red-400 ring-2 ring-red-500/20 shadow-sm'
                      : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="lost"
                    checked={formData.type === 'lost'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  I Lost Something
                </label>
                <label
                  className={`cursor-pointer border rounded-xl p-4 text-center font-bold transition-all ${
                    formData.type === 'found'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-500/50 dark:text-emerald-400 ring-2 ring-emerald-500/20 shadow-sm'
                      : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="found"
                    checked={formData.type === 'found'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  I Found Something
                </label>
              </div>
            </div>

            <div className="group">
              <label className="block mb-1.5 font-semibold text-gray-700 dark:text-gray-300 text-sm">Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Blue iPhone 13 Pro"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div className="group">
              <label className="block mb-1.5 font-semibold text-gray-700 dark:text-gray-300 text-sm">Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., Library 2nd Floor"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>

            <div className="group">
              <label className="block mb-1.5 font-semibold text-gray-700 dark:text-gray-300 text-sm">Description</label>
              <textarea
                name="description"
                placeholder="Provide distinct details, colors, brands, etc."
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm resize-y placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg flex justify-center items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Publishing Item...
                </>
              ) : (
                'Publish Item'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
