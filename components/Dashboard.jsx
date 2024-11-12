const fetchCars = async () => {
  try {
    // First test the connection
    const { data: testData, error: testError } = await supabase
      .from('cars')
      .select('count');
    
    if (testError) {
      console.error('Database connection test failed:', testError);
      return;
    }

    // If connection test passes, fetch the actual data
    const { data, error } = await supabase
      .from('cars')
      .select('*');

    if (error) {
      console.error('Error fetching cars:', error);
      return;
    }

    setCars(data);
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
  }
}; 