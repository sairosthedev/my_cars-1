import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CarList from './components/CarList'
import CarForm from './components/CarForm'
import CarDetails from './components/CarDetails'
import NavBar from './components/NavBar'
import Stats from './components/Stats'
import SearchBar from './components/SearchBar'
import Footer from './components/Footer'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Analytics from './components/Analytics'
import MaintenancePage from './components/MaintenancePage'
import About from './components/About'

// Add this helper function at the top of the file, outside of the App component
const generateUniqueId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

function App() {
  const [cars, setCars] = useState([
    {
      id: 1,
      make: 'Porsche',
      model: '911',
      year: 2023,
      price: 135000,
      mileage: 1200,
      image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333'
    },
    {
      id: 2,
      make: 'Aston Martin',
      model: 'DB11',
      year: 2022,
      price: 205000,
      mileage: 3500,
      image: 'https://images.unsplash.com/photo-1580274418543-26ba3f4a9f35'
    }
  ])
  const [editingCar, setEditingCar] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [activeView, setActiveView] = useState('dashboard')
  const [successMessage, setSuccessMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulated auth check - replace with actual Supabase auth later
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      setIsAuthenticated(!!user);
    };
    checkAuth();
  }, []);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

  const addCar = (car) => {
    setCars([...cars, { ...car, id: Date.now() }])
    setActiveView('inventory') // Switch to inventory view after adding
  }

  const updateCar = (updatedCar) => {
    setCars(cars.map(car => car.id === updatedCar.id ? updatedCar : car))
    setEditingCar(null)
  }

  const deleteCar = (id) => {
    setCars(cars.filter(car => car.id !== id))
  }

  const filteredCars = cars
    .filter(car => 
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest': return b.year - a.year
        case 'oldest': return a.year - b.year
        case 'expensive': return b.price - a.price
        case 'cheapest': return a.price - b.price
        default: return 0
      }
    })

  const totalValue = cars.reduce((sum, car) => sum + car.price, 0)
  const averageYear = Math.round(cars.reduce((sum, car) => sum + car.year, 0) / cars.length)

  const renderInventory = () => (
    <div className="space-y-8">
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <CarList 
        cars={filteredCars}
        onDelete={deleteCar}
      />
    </div>
  )

  const renderDashboard = () => (
    <div className="space-y-8">
      <Stats 
        totalValue={totalValue} 
        carCount={cars.length} 
        averageYear={averageYear} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.slice(0, 3).map(car => (
          <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{car.make} {car.model}</h3>
              <p className="text-gray-600">{car.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const handleAddCar = async (carData) => {
    try {
      const newCar = {
        ...carData,
        id: generateUniqueId(),
        createdAt: new Date().toISOString()
      };
      
      setCars(prevCars => [...prevCars, newCar]);
      setSuccessMessage('Car added successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
      return true;
    } catch (error) {
      console.error('Error adding car:', error);
      throw error;
    }
  };

  // Redirect component for the root path when not authenticated
  const RootRedirect = () => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
    return renderDashboard();
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {isAuthenticated && (
          <nav className="bg-white shadow-lg sticky top-0 z-50">
            <NavBar activeView={activeView} setActiveView={setActiveView} />
          </nav>
        )}
        <div className={`container mx-auto px-4 ${isAuthenticated ? 'pt-4' : ''} flex-grow`}>
          {successMessage && isAuthenticated && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              {successMessage}
            </div>
          )}
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/"
              element={<RootRedirect />}
            />
            <Route
              path="/inventory"
              element={
                <ProtectedRoute>
                  {renderInventory()}
                </ProtectedRoute>
              }
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <CarForm
                    onSubmit={handleAddCar}
                    isSubmitting={false}
                    successMessage={successMessage}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <CarForm
                    onSubmit={updateCar}
                    initialData={editingCar}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/car/:id"
              element={
                <ProtectedRoute>
                  <CarDetails cars={cars} />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <Analytics cars={cars} />
                </ProtectedRoute>
              } 
            />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  )
}

export default App