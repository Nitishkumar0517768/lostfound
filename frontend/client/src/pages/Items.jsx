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
    }
  };

  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', position: 'relative' }}>
      <h1>Lost and Found Items</h1>
      
      {/* Search and Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Search items by title..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">All Types</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading items...</div>
      ) : (
        <>
          {items.length === 0 ? (
            <p>No items found matching your criteria.</p>
          ) : (
            items.map(item => (
              <ItemCard key={item._id} item={item} onClaimClick={handleClaimClick} />
            ))
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
              <button 
                onClick={handlePrev} 
                disabled={page === 1} 
                style={{ padding: '0.5rem 1rem', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
              >
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button 
                onClick={handleNext} 
                disabled={page === totalPages} 
                style={{ padding: '0.5rem 1rem', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Claim Modal UI */}
      {isModalOpen && selectedItem && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '400px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginTop: 0 }}>Claim "{selectedItem.title}"</h2>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>To claim this item, please provide a verification answer (e.g., serial number, specific contents).</p>
            
            {claimMessage && (
              <div style={{ padding: '0.5rem', marginBottom: '1rem', backgroundColor: claimMessage.includes('Error') ? '#ffebee' : '#e8f5e9', color: claimMessage.includes('Error') ? '#c62828' : '#2e7d32', borderRadius: '4px' }}>
                {claimMessage}
              </div>
            )}
            
            <form onSubmit={submitClaim} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Your Name:</label>
                <input 
                  type="text" 
                  value={claimName} 
                  onChange={(e) => setClaimName(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Verification Details:</label>
                <textarea 
                  value={claimAnswer} 
                  onChange={(e) => setClaimAnswer(e.target.value)} 
                  required 
                  rows="3"
                  style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '0.5rem', cursor: 'pointer', backgroundColor: '#e0e0e0', border: 'none', borderRadius: '4px' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '0.5rem', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}>
                  Submit Claim
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
