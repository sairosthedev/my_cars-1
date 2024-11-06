import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { formatCurrency } from '../utils/format'

function CarList({ cars, onDelete }) {
  const [selectedCar, setSelectedCar] = useState(null);

  const handleViewClick = (car, e) => {
    e.preventDefault();
    setSelectedCar(car);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
  };

  return (
    <div style={{ 
      backgroundColor: '#F8F4E3',
      padding: '20px',
      borderRadius: '8px',
      border: '2px solid #800000',
      backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(248, 244, 227, 0.9)',
        borderRadius: '8px',
      }} />
      
      <div style={{ position: 'relative' }}>
        <h2 style={{ color: '#800000' }}>Car Inventory</h2>
        {cars.map((car) => (
          <div 
            key={car.id} 
            style={{
              backgroundColor: 'white',
              margin: '10px 0',
              padding: '15px',
              borderRadius: '4px',
              border: '1px solid #DAA520',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img 
                src={car.image} 
                alt={`${car.make} ${car.model}`} 
                style={{
                  width: '80px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
              <div>
                <p style={{ color: '#800000', fontWeight: 'bold' }}>{car.make} {car.model}</p>
                <p style={{ color: '#DAA520' }}>{car.year} • {formatCurrency(car.price)}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link
                to={`/car/${car.id}`}
                style={{
                  backgroundColor: '#DAA520',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <EyeIcon style={{ width: '20px', height: '20px' }} />
                View
              </Link>
              
              <Link
                to={`/edit/${car.id}`}
                style={{
                  backgroundColor: '#4A5568',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <PencilIcon style={{ width: '20px', height: '20px' }} />
                Edit
              </Link>
              
              <button 
                onClick={() => onDelete(car.id)}
                style={{
                  backgroundColor: '#800000',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <TrashIcon style={{ width: '20px', height: '20px' }} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarList;