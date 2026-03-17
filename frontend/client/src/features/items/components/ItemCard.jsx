import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const ItemCard = ({ item, onClaimClick }) => {
  const [claimStatus, setClaimStatus] = useState(null);

  // Fetch claims to check if a claim exists and its status
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await api.get(`/api/claims/${item._id}`);
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

  // Helper function to get image URL
  const getImageUrl = (image) => {
    if (!image) return "https://images.unsplash.com/photo-1590374581308-444335606670?q=80&w=1470&auto=format&fit=crop";
    if (image.startsWith('http')) return image;
    return `/uploads/${image}`;
  };

  return (
    <div className="bg-white border border-gray-100 rounded-[2rem] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col h-full group overflow-hidden">
      {/* Item Image */}
      <div className="h-56 w-full overflow-hidden relative">
        <img
          src={getImageUrl(item.image)}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest shadow-md
              ${item.type === 'lost'
                ? 'bg-[#E53E3E] text-white'
                : 'bg-[#00C18E] text-white'}`}
          >
            {item.type}
          </span>
        </div>
      </div>

      <div className="p-7 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
            {item.title}
          </h3>
          <p className="text-gray-600 text-[15px] leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>
          <div className="flex flex-col mb-4">
            <span className="text-gray-900 font-bold text-base mb-0.5">
              Date
            </span>
            <span className="text-gray-500 text-sm">
              {item.date && !isNaN(new Date(item.date).getTime()) 
                ? new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                : 'No date'}
            </span>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-100 mb-5" />

        <div className="space-y-4 mb-6">
          <div className="flex flex-col">
            <span className="text-[#C5A8A8] font-bold text-xs uppercase tracking-[0.1em] mb-1">
              Location
            </span>
            <span className="text-gray-800 font-medium text-sm">
              {item.location}
            </span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-[#C5A8A8] font-bold text-xs uppercase tracking-[0.1em] mb-1">
              College
            </span>
            <span className="text-gray-800 font-medium text-sm">
              {item.college || 'General'}
            </span>
          </div>

          {item.type === 'found' && (
            <div className="flex flex-col">
              <span className="text-[#C5A8A8] font-bold text-xs uppercase tracking-[0.1em] mb-1">
                Owner Name :
              </span>
              <span className="text-gray-800 font-medium text-sm">
                {item.ownerName || 'Not specified'}
              </span>
            </div>
          )}
        </div>

        {item.type === 'lost' && (
          <div className="mt-auto">
            {claimStatus && (
              <div
                className={`mb-4 px-4 py-2.5 rounded-xl text-sm font-semibold border text-center
                  ${claimStatus === 'accepted'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : claimStatus === 'rejected'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-gray-50 text-gray-700 border-gray-200'}`}
              >
                Status: {claimStatus.charAt(0).toUpperCase() + claimStatus.slice(1)}
              </div>
            )}

            <button
              onClick={() => onClaimClick(item)}
              className="w-full px-6 py-4 bg-[#00C18E] hover:bg-[#00ab7e] text-white font-bold rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Claim This Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
