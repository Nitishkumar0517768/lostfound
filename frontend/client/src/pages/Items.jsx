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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          limit: 12
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

  // Handle claiming sequence
  const handleClaimClick = (item) => {
    // Basic Auth verification
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
        setClaimMessage('Claim submitted successfully! We will review it shortly.');
        setTimeout(() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }, 2000);
      }
    } catch (err) {
      setClaimMessage(`Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 pb-12">
      
      {/* Header Banner */}
      <div className="bg-emerald-600 text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Browse Items</h1>
        <p className="text-emerald-100 max-w-2xl mx-auto text-lg">Search through recently lost and found items across the campus. Use the filters to find exactly what you're looking for.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 block">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center shadow-sm">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Search and Filters Card */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-10 flex flex-col sm:flex-row gap-4 border border-gray-100">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search by keywords..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 p-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
          
          <div className="sm:w-64 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            </div>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value)}
              className="w-full pl-11 p-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="lost">Lost Items</option>
              <option value="found">Found Items</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-200 border-t-emerald-500 mb-4"></div>
            <span className="text-lg font-medium text-gray-500">Loading items...</span>
          </div>
        ) : (
          <>
            {items.length === 0 ? (
              <div className="bg-white rounded-2xl shadow border border-gray-100 p-12 text-center flex flex-col items-center justify-center min-h-[40vh]">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-500 max-w-md mx-auto">We couldn't find anything matching your current filters. Try adjusting your search or clearing the filters.</p>
                {(search || type) && (
                  <button onClick={() => { setSearch(''); setType(''); }} className="mt-6 text-emerald-600 font-semibold hover:underline">
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                  <ItemCard key={item._id} item={item} onClaimClick={handleClaimClick} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && items.length > 0 && (
              <div className="flex justify-center items-center gap-6 mt-12 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-fit mx-auto">
                <button 
                  onClick={handlePrev} 
                  disabled={page === 1} 
                  className={`px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  Prev
                </button>
                <div className="flex items-center gap-1 font-medium">
                  <span className="text-gray-900 bg-gray-100 px-3 py-1 rounded-md">{page}</span>
                  <span className="text-gray-500 mx-1">of</span>
                  <span className="text-gray-500">{totalPages}</span>
                </div>
                <button 
                  onClick={handleNext} 
                  disabled={page === totalPages} 
                  className={`px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 ${page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}`}
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Claim Modal UI */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity">
          <div className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl transition-all border border-gray-100">
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">Claim Item</h2>
                <p className="text-emerald-600 font-semibold mt-1">{selectedItem.title}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="bg-emerald-50 p-4 rounded-xl mb-6 flex gap-3 text-sm text-emerald-800">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p>To verify ownership, please provide distinct details only the owner would know (e.g., serial number, specific contents, lock screen picture).</p>
            </div>
            
            {claimMessage && (
               <div className={`p-4 mb-6 rounded-xl font-medium text-sm flex items-start ${claimMessage.includes('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                {claimMessage}
              </div>
            )}
            
            <form onSubmit={submitClaim} className="flex flex-col gap-5">
              <div>
                <label className="block mb-1.5 font-semibold text-gray-700 text-sm">Your Full Name</label>
                <input 
                  type="text" 
                  value={claimName} 
                  onChange={(e) => setClaimName(e.target.value)} 
                  required 
                  className="w-full p-3.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-semibold text-gray-700 text-sm">Verification Details</label>
                <textarea 
                  value={claimAnswer} 
                  onChange={(e) => setClaimAnswer(e.target.value)} 
                  required 
                  rows="4"
                  placeholder="Describe unique identifiers here..."
                  className="w-full p-3.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm resize-none"
                />
              </div>
              
              <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 p-3.5 font-bold rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 p-3.5 font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300 flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : "Submit Form"}
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
