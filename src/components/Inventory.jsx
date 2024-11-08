// Importing necessary libraries and components
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import SearchBar from './SearchBar';
import CarList from './CarList';

// Inventory component definition
const Inventory = () => {
  // State hooks for managing cars data, loading state, and error messages
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // useEffect hook to fetch cars data on component mount
  useEffect(() => {
    fetchCars();
  }, []);

  // Function to fetch cars data from Supabase
  const fetchCars = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setError('Please sign in to view inventory');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError('Failed to load cars');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle car deletion
  const handleDelete = async (id) => {
    await fetchCars();
  };

  // Filtering and sorting cars based on search term and sort order
  const filteredCars = cars
    .filter(car => 
      car.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.year?.toString().includes(searchTerm)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'expensive':
          return b.price - a.price;
        case 'cheapest':
          return a.price - b.price;
        default:
          return 0;
      }
    });

  // Conditional rendering based on loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-900"></div>
      </div>
    );
  }

  // Conditional rendering based on error state
  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Main render - Search bar and car list
  return (
    <div className="space-y-8">
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <CarList 
        cars={filteredCars}
        onDelete={handleDelete}
      />
    </div>
  );
};

// Exporting the Inventory component
export default Inventory;