import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '../utils/format';
import { supabase } from '../utils/supabaseClient';

/**
 * CarDetails component displays detailed information about a specific car
 * Fetches car data from Supabase based on the ID from URL parameters
 */
function CarDetails() {
  // Get car ID from URL parameters
  const { id } = useParams();
  
  // State management for car data, loading state, and potential errors
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    /**
     * Fetches car details from Supabase database
     * Sets loading state while fetching and handles potential errors
     */
    const fetchCarDetails = async () => {
      try {
        console.log('Fetching car with ID:', id);
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        console.log('Fetched car data:', data);
        setCar(data);
      } catch (error) {
        console.error('Error fetching car details:', error);
        setError('Car not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  // Loading state handler
  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  // Error state handler
  if (error) {
    return <div className="p-4 text-red-500 text-center">{error}</div>;
  }

  // Handle case where car data is not found
  if (!car) {
    return <div className="p-4 text-center">Car not found</div>;
  }

  return (
    <div className="bg-[#F8F4E3] p-5 rounded-lg border-2 border-red-900 max-w-4xl mx-auto my-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
           style={{backgroundImage: 'url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000")'}} />
      
      <div className="relative z-10">
        <Link
          to="/inventory"
          className="inline-flex items-center gap-2 text-red-900 hover:text-red-700 mb-5 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Inventory
        </Link>

        <div className="bg-white p-8 rounded-lg border border-amber-500 shadow-lg">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <img 
              src={car.image} 
              alt={`${car.make} ${car.model}`} 
              className="w-full md:w-96 h-64 object-cover rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-red-900 mb-2">
                {car.make} {car.model}
              </h1>
              <p className="text-xl text-amber-500">
                {car.year} • {formatCurrency(car.price)}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Basic Information */}
            <section>
              <h2 className="text-xl font-semibold text-amber-500 border-b-2 border-amber-500 pb-2 mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <p><span className="font-semibold">Make:</span> {car.make}</p>
                <p><span className="font-semibold">Model:</span> {car.model}</p>
                <p><span className="font-semibold">Year:</span> {car.year}</p>
                <p><span className="font-semibold">Price:</span> {formatCurrency(car.price)}</p>
                <p><span className="font-semibold">Mileage:</span> {car.mileage}</p>
                <p><span className="font-semibold">Color:</span> {car.color}</p>
              </div>
            </section>

            {/* Vehicle Details */}
            <section>
              <h2 className="text-xl font-semibold text-amber-500 border-b-2 border-amber-500 pb-2 mb-4">
                Vehicle Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><span className="font-semibold">VIN:</span> {car.vin}</p>
                <p><span className="font-semibold">License Plate:</span> {car.licensePlate}</p>
                <p><span className="font-semibold">Transmission:</span> {car.transmission}</p>
                <p><span className="font-semibold">Fuel Type:</span> {car.fuelType}</p>
              </div>
            </section>

            {/* Service Information */}
            <section>
              <h2 className="text-xl font-semibold text-amber-500 border-b-2 border-amber-500 pb-2 mb-4">
                Service Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><span className="font-semibold">Last Service:</span> {car.lastServiceDate}</p>
                <p><span className="font-semibold">Next Service Due:</span> {car.nextServiceDue}</p>
              </div>
            </section>

            {/* Insurance Information */}
            <section>
              <h2 className="text-xl font-semibold text-amber-500 border-b-2 border-amber-500 pb-2 mb-4">
                Insurance Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><span className="font-semibold">Provider:</span> {car.insurance?.provider}</p>
                <p><span className="font-semibold">Policy Number:</span> {car.insurance?.policyNumber}</p>
                <p><span className="font-semibold">Expiry Date:</span> {car.insurance?.expiryDate}</p>
              </div>
            </section>

            {/* Notes */}
            {car.notes && (
              <section>
                <h2 className="text-xl font-semibold text-amber-500 border-b-2 border-amber-500 pb-2 mb-4">
                  Notes
                </h2>
                <p className="whitespace-pre-wrap">{car.notes}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;