import React from 'react';

const ItemCard = ({ item }) => {
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
      <div style={{ fontSize: '0.9rem', color: '#666' }}>
        <p style={{ margin: '0.2rem 0' }}><strong>Location:</strong> {item.location}</p>
        <p style={{ margin: '0.2rem 0' }}><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ItemCard;
