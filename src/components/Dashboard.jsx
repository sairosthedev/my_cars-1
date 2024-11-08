import React, { useEffect, useState } from 'react';
import Stats from './Stats';
import { supabase } from '../utils/supabaseClient';

// Dashboard component definition
const Dashboard = () => {
  // State hooks for managing cars data, loading state, and error messages
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect hook to fetch cars data on component mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Fetching cars data from Supabase
        const { data, error } = await supabase
          .from('cars') // my table name
          .select('*');

        if (error) throw error;

        // Updating state with fetched cars data
        setCars(data);
      } catch (error) {
        // Handling errors during data fetching
        setError('Error fetching car data.');
        console.error('Error fetching cars:', error);
      } finally {
        // Setting loading state to false after the operation
        setLoading(false);
      }
    };

    // Calling the fetchCars function
    fetchCars();
  }, []);

  // Conditional rendering based on loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Conditional rendering based on error state
  if (error) {
    return <div>{error}</div>;
  }

  // Calculating total value and average year of cars
  const totalValue = cars.reduce((sum, car) => sum + car.price, 0);
  const averageYear = Math.round(cars.reduce((sum, car) => sum + car.year, 0) / cars.length) || 0;

  // Rendering the dashboard with stats and car cards
  return (
    <div className="space-y-8">
      <Stats 
        totalValue={totalValue} 
        carCount={cars.length} 
        averageYear={averageYear} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.slice(0, 3).map(car => (
          <div 
            key={car.id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={car.image || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={`${car.make} ${car.model}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-900">{car.make} {car.model}</h3>
              <p className="text-gray-600 mt-1">{car.year}</p>
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>{car.transmission}</span>
                <span>{car.fuelType}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 