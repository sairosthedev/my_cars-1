import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { formatCurrency } from '../utils/format';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

// CarList component displays a grid of cars in the user's inventory
function CarList({ cars, onDelete }) {
  const navigate = useNavigate();

  // Handles car deletion with confirmation
  const handleDelete = async (id, e) => {
    e.preventDefault(); // Prevent navigation from Link
    e.stopPropagation(); // Prevent event bubbling
    
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        const { error } = await supabase
          .from('cars')
          .delete()
          .eq('id', id);

        if (error) throw error;

        // Call the onDelete callback to refresh the list
        if (onDelete) onDelete(id);
      } catch (error) {
        console.error('Error deleting car:', error);
        alert('Failed to delete car');
      }
    }
  };

  // Navigates to edit page for selected car
  const handleEdit = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit/${id}`);
  };

  // Navigates to detailed view of selected car
  const handleView = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/car/${id}`);
  };

  // Empty state display with CTA to add first car
  if (!cars || cars.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="mb-4">No cars in inventory yet.</p>
        <Link 
          to="/add"
          className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900 transition-colors"
        >
          Add Your First Car
        </Link>
      </div>
    );
  }

  // Main render - Grid of car cards
  return (
    <div className="container mx-auto p-4">
      {/* Header with Add New Car button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-red-800">Your Inventory</h2>
        <Link 
          to="/add"
          className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900 transition-colors"
        >
          Add New Car
        </Link>
      </div>
      
      {/* Responsive grid of car cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          // Individual car card
          <div
            key={car.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-200"
          >
            {/* Car image section */}
            <div className="relative h-48">
              <img
                src={car.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Car details section */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-red-800">
                {car.year} {car.make} {car.model}
              </h3>
              <div className="mt-2 text-gray-600">
                <p className="text-lg font-medium text-red-700">
                  {formatCurrency(car.price)}
                </p>
                <p className="mt-1">Mileage: {car.mileage?.toLocaleString() || 'N/A'}</p>
                <p>Color: {car.color || 'N/A'}</p>
              </div>
              {/* Car specifications */}
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>{car.transmission}</span>
                <span>{car.fuel_type}</span>
              </div>
              
              {/* Action buttons for view, edit, and delete */}
              <div className="mt-4 flex justify-end space-x-2 border-t pt-4">
                <button
                  onClick={(e) => handleView(car.id, e)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  title="View Details"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => handleEdit(car.id, e)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                  title="Edit Car"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => handleDelete(car.id, e)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  title="Delete Car"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarList;