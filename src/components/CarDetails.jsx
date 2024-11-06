import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '../utils/format';

function CarDetails({ cars }) {
  const { id } = useParams();
  const car = cars.find(c => c.id === id);

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div style={{ 
      backgroundColor: '#F8F4E3',
      padding: '20px',
      borderRadius: '8px',
      border: '2px solid #800000',
      maxWidth: '1000px',
      margin: '20px auto',
      backgroundImage: 'url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(248, 244, 227, 0.95)',
        borderRadius: '8px',
      }} />
      
      <div style={{ position: 'relative' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            color: '#800000',
            marginBottom: '20px',
            textDecoration: 'none'
          }}
        >
          <ArrowLeftIcon style={{ width: '20px', height: '20px' }} />
          Back to Inventory
        </Link>

        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          border: '1px solid #DAA520',
        }}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
            <img 
              src={car.image} 
              alt={`${car.make} ${car.model}`} 
              style={{
                width: '300px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
            <div>
              <h1 style={{ color: '#800000', fontSize: '24px', marginBottom: '10px' }}>
                {car.make} {car.model}
              </h1>
              <p style={{ color: '#DAA520', fontSize: '18px' }}>
                {car.year} • {formatCurrency(car.price)}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '30px' }}>
            {/* Basic Information */}
            <section>
              <h2 style={{ color: '#DAA520', marginBottom: '15px', borderBottom: '2px solid #DAA520', paddingBottom: '5px' }}>
                Basic Information
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                <p><strong>Make:</strong> {car.make}</p>
                <p><strong>Model:</strong> {car.model}</p>
                <p><strong>Year:</strong> {car.year}</p>
                <p><strong>Price:</strong> {formatCurrency(car.price)}</p>
                <p><strong>Mileage:</strong> {car.mileage}</p>
                <p><strong>Color:</strong> {car.color}</p>
              </div>
            </section>

            {/* Vehicle Details */}
            <section>
              <h2 style={{ color: '#DAA520', marginBottom: '15px', borderBottom: '2px solid #DAA520', paddingBottom: '5px' }}>
                Vehicle Details
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                <p><strong>VIN:</strong> {car.vin}</p>
                <p><strong>License Plate:</strong> {car.licensePlate}</p>
                <p><strong>Transmission:</strong> {car.transmission}</p>
                <p><strong>Fuel Type:</strong> {car.fuelType}</p>
              </div>
            </section>

            {/* Service Information */}
            <section>
              <h2 style={{ color: '#DAA520', marginBottom: '15px', borderBottom: '2px solid #DAA520', paddingBottom: '5px' }}>
                Service Information
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                <p><strong>Last Service:</strong> {car.lastServiceDate}</p>
                <p><strong>Next Service Due:</strong> {car.nextServiceDue}</p>
              </div>
            </section>

            {/* Insurance Information */}
            <section>
              <h2 style={{ color: '#DAA520', marginBottom: '15px', borderBottom: '2px solid #DAA520', paddingBottom: '5px' }}>
                Insurance Information
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                <p><strong>Provider:</strong> {car.insurance?.provider}</p>
                <p><strong>Policy Number:</strong> {car.insurance?.policyNumber}</p>
                <p><strong>Expiry Date:</strong> {car.insurance?.expiryDate}</p>
              </div>
            </section>

            {/* Notes */}
            {car.notes && (
              <section>
                <h2 style={{ color: '#DAA520', marginBottom: '15px', borderBottom: '2px solid #DAA520', paddingBottom: '5px' }}>
                  Notes
                </h2>
                <p style={{ whiteSpace: 'pre-wrap' }}>{car.notes}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;