import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../features/items/components/ItemCard';

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/items');
        if (res.data.success) {
          setItems(res.data.data);
        }
      } catch (err) {
        setError(`Failed to fetch items: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading items...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <h1>Lost and Found Items</h1>
      {items.length === 0 ? (
        <p>No items reported yet.</p>
      ) : (
        items.map(item => (
          <ItemCard key={item._id} item={item} />
        ))
      )}
    </div>
  );
};

export default Items;
