import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/format';

function CarDetails({ cars }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const car = cars.find(c => c.id === Number(id));
  
  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div style={{ 
      backgroundColor: '#F8F4E3',
      padding: '20px',
      borderRadius: '8px',
      border: '2px solid #800000',
      maxWidth: '800px',
      margin: '20px auto'
    }}>
      <h2 style={{ color: '#800000' }}>Car Details</h2>
      
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '4px',
        border: '1px solid #DAA520'
      }}>
        <img 
          src={car.image} 
          alt={`${car.make} ${car.model}`} 
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '4px',
            marginBottom: '20px'
          }}
        />
        
        <div style={{ display: 'grid', gap: '15px' }}>
          <h3 style={{ color: '#800000' }}>{car.make} {car.model}</h3>
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Price:</strong> {formatCurrency(car.price)}</p>
          <p><strong>Mileage:</strong> {car.mileage} miles</p>
          {car.color && <p><strong>Color:</strong> {car.color}</p>}
          {car.vin && <p><strong>VIN:</strong> {car.vin}</p>}
          {car.description && <p><strong>Description:</strong> {car.description}</p>}
        </div>
        
        <button
          onClick={() => navigate('/inventory')}
          style={{
            backgroundColor: '#DAA520',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Back to List
        </button>
      </div>
    </div>
  );
}

export default CarDetails; 