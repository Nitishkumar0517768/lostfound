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
          setClaimStatus(res.data.data[0].status);
        }
      } catch (err) {
        console.error('Error fetching claims:', err);
      }
    };
    fetchClaims();
  }, [item._id]);

  return (
    <div className="bg-white shadow-lg hover:shadow-2xl border border-gray-100 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full group overflow-hidden">
      {/* Item Image */}
      <div className="h-48 w-full overflow-hidden bg-gray-100 relative">
        <img
          src={item.image ? `http://localhost:5000/uploads/${item.image}` : "https://images.unsplash.com/photo-1590374581308-444335606670?q=80&w=1470&auto=format&fit=crop"}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm
              ${item.type === 'lost'
                ? 'bg-red-500 text-white'
                : 'bg-emerald-500 text-white'}`}
          >
            {item.type}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4 gap-4">
          <h3 className="text-xl font-bold text-gray-900 flex-grow leading-tight group-hover:text-emerald-600 transition-colors">
            {item.title}
          </h3>
        </div>
      </div>

      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 flex-grow">
        {item.description}
      </p>

      <div className="mt-auto pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-400 font-medium text-xs uppercase tracking-wider mb-1">
              Location
            </span>
            <span className="text-gray-800 font-medium truncate" title={item.location}>
              {item.location}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 font-medium text-xs uppercase tracking-wider mb-1">
              Date
            </span>
            <span className="text-gray-800 font-medium">
              {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>

        {claimStatus && (
          <div
            className={`mb-4 px-3 py-2 rounded-lg text-sm font-medium border
              ${claimStatus === 'accepted'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : claimStatus === 'rejected'
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-gray-50 text-gray-700 border-gray-200'}`}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-current"></span>
              Status: {claimStatus.charAt(0).toUpperCase() + claimStatus.slice(1)}
            </span>
          </div>
        )}

        <button
          onClick={() => onClaimClick(item)}
          className="w-full px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl border border-emerald-500 hover:border-emerald-600 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-white"
        >
          Claim This Item
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
