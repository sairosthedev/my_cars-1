import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import SearchBar from './SearchBar';
import CarList from './CarList';

const Inventory = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Fetch cars when component mounts
  useEffect(() => {
    fetchCars();
  }, []);

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

  const handleDelete = async (id) => {
    await fetchCars(); // Refresh the list after deletion
  };

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

  if (loading) {
    return <div className="text-center p-4">Loading inventory...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

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

export default Inventory;