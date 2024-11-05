import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CarList from './components/CarList'
import CarForm from './components/CarForm'
import CarDetails from './components/CarDetails'
import NavBar from './components/NavBar'
import Stats from './components/Stats'
import SearchBar from './components/SearchBar'
import Footer from './components/Footer'

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

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <NavBar activeView={activeView} setActiveView={setActiveView} />
        </nav>
        <div className="container mx-auto px-4 pt-4 flex-grow">
          <Routes>
            <Route path="/" element={renderDashboard()} />
            <Route path="/inventory" element={renderInventory()} />
            <Route path="/add" element={<CarForm onSubmit={addCar} />} />
            <Route path="/edit/:id" element={
              <CarForm 
                onSubmit={updateCar}
                initialData={editingCar}
              />
            } />
            <Route path="/car/:id" element={<CarDetails cars={cars} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App