import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemCard = ({ item, onClaimClick }) => {
  const [claimStatus, setClaimStatus] = useState(null);

  // Fetch claims to check if a claim exists and its status
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/claims/${item._id}`);
        if (res.data.success && res.data.data.length > 0) {
          // Assuming we show the status of the most recent claim or just the fact that it has a claim
          setClaimStatus(res.data.data[0].status);
        }
      } catch (err) {
        console.error('Error fetching claims:', err);
      }
    };
    fetchClaims();
  }, [item._id]);

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      backgroundColor: '#f9f9f9',
      color: '#333'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{item.title}</h3>
        <span style={{
          backgroundColor: item.type === 'lost' ? '#ffcccc' : '#ccffcc',
          padding: '0.2rem 0.6rem',
          borderRadius: '4px',
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          fontWeight: 'bold'
        }}>
          {item.type}
        </span>
      </div>
      <p style={{ margin: '0.5rem 0' }}>{item.description}</p>
      <div style={{ fontSize: '0.9rem', color: '#666', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ margin: '0.2rem 0' }}><strong>Location:</strong> {item.location}</p>
          <p style={{ margin: '0.2rem 0' }}><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
          
          {claimStatus && (
            <p style={{ margin: '0.5rem 0 0 0', fontWeight: 'bold', color: claimStatus === 'accepted' ? 'green' : claimStatus === 'rejected' ? 'red' : 'orange' }}>
              Claim Status: {claimStatus.charAt(0).toUpperCase() + claimStatus.slice(1)}
            </p>
          )}
        </div>
        
        {/* Only allow claiming if it's found, or maybe lost too? Requirements didn't specify, but let's allow on all items or specifically found items. Let's provide the button regardless and let user handle logic. */}
        <button 
          onClick={() => onClaimClick(item)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Claim Item
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
