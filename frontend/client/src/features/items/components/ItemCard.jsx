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
    <div className="bg-white dark:bg-gray-800 border-l-4 sm:border-l-8 border-gray-200 dark:border-gray-700 shadow-md rounded-lg p-5 transition-colors duration-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 m-0">{item.title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${item.type === 'lost' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
          {item.type}
        </span>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 my-3 leading-relaxed">{item.description}</p>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-1"><strong className="text-gray-800 dark:text-gray-200">Location:</strong> {item.location}</p>
          <p className="mb-0"><strong className="text-gray-800 dark:text-gray-200">Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
          
          {claimStatus && (
            <p className={`mt-2 font-bold ${claimStatus === 'accepted' ? 'text-green-600 dark:text-green-400' : claimStatus === 'rejected' ? 'text-red-600 dark:text-red-400' : 'text-orange-500 dark:text-orange-400'}`}>
              Claim Status: {claimStatus.charAt(0).toUpperCase() + claimStatus.slice(1)}
            </p>
          )}
        </div>
        
        <button 
          onClick={() => onClaimClick(item)}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Claim Item
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
