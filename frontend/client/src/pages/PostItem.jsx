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
    <div className="max-w-xl mx-auto mt-8 p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">Post Lost/Found Item</h1>
      
      {message && (
        <div className={`p-4 mb-6 rounded-lg font-medium flex items-center ${message.startsWith('Error') ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors resize-y"
          />
        </div>
        
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading} 
          className="mt-4 p-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-colors focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 disabled:opacity-70 flex justify-center items-center"
        >
          {loading ? (
             <>
               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Posting...
             </>
          ) : 'Post Item'}
        </button>
      </form>
    </div>
  );
};

export default PostItem;
