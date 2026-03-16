import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../features/items/components/ItemCard';

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Pagination and Filters
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Claim Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [claimName, setClaimName] = useState('');
  const [claimAnswer, setClaimAnswer] = useState('');
  const [claimMessage, setClaimMessage] = useState('');

  // Debounce Search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset to first page when type changes
  useEffect(() => {
    setPage(1);
  }, [type]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/items', {
        params: {
          search: debouncedSearch,
          type,
          page,
          limit: 10
        }
      });
      if (res.data.success) {
        setItems(res.data.items);
        setTotalPages(res.data.totalPages);
      }
    } catch (err) {
      setError(`Failed to fetch items: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [debouncedSearch, type, page]);

  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1));

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle claiming sequence
  const handleClaimClick = (item) => {
    // Basic Auth verification - Check for token or user object in localStorage
    const token = localStorage.getItem('token') || localStorage.getItem('user');
    if (!token) {
      navigate('/login');
      return;
    }

    setSelectedItem(item);
    setIsModalOpen(true);
    setClaimMessage('');
    setClaimName('');
    setClaimAnswer('');
  };

  const submitClaim = async (e) => {
    e.preventDefault();
    setClaimMessage('');
    setIsSubmitting(true);
    
    try {
      const res = await axios.post('http://localhost:5000/api/claims', {
        itemId: selectedItem._id,
        claimantName: claimName,
        verificationAnswer: claimAnswer
      });
      
      if (res.data.success) {
        setClaimMessage('Claim submitted successfully!');
        setTimeout(() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }, 1500);
      }
    } catch (err) {
      setClaimMessage(`Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) return (
    <div className="max-w-2xl mx-auto mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Holdup! </strong>
      <span className="block sm:inline">{error}</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto my-8 px-4 relative">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Lost and Found Items</h1>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input 
          type="text" 
          placeholder="Search items by title..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
        />
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)}
          className="p-3 w-full md:w-48 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
        >
          <option value="">All Types</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <span className="ml-3 text-lg font-medium text-gray-600 dark:text-gray-400">Loading items...</span>
        </div>
      ) : (
        <>
          {items.length === 0 ? (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center text-gray-600 dark:text-gray-400">
              <p className="text-lg">No items found matching your criteria.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <ItemCard key={item._id} item={item} onClaimClick={handleClaimClick} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button 
                onClick={handlePrev} 
                disabled={page === 1} 
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${page === 1 ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-800/60'}`}
              >
                Previous
              </button>
              <span className="font-medium text-gray-700 dark:text-gray-300">Page {page} of {totalPages}</span>
              <button 
                onClick={handleNext} 
                disabled={page === totalPages} 
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${page === totalPages ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-800/60'}`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Claim Modal UI */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl w-full max-w-md shadow-2xl transition-colors">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Claim "{selectedItem.title}"</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">To claim this item, please provide a verification answer (e.g., serial number, specific contents).</p>
            
            {claimMessage && (
               <div className={`p-3 mb-4 rounded-lg font-medium ${claimMessage.includes('Error') ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800'}`}>
                {claimMessage}
              </div>
            )}
            
            <form onSubmit={submitClaim} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Your Name:</label>
                <input 
                  type="text" 
                  value={claimName} 
                  onChange={(e) => setClaimName(e.target.value)} 
                  required 
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Verification Details:</label>
                <textarea 
                  value={claimAnswer} 
                  onChange={(e) => setClaimAnswer(e.target.value)} 
                  required 
                  rows="3"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-colors resize-none"
                />
              </div>
              
              <div className="flex gap-3 mt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 p-3 font-semibold rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 p-3 font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-70 transition-colors flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : "Submit Claim"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
