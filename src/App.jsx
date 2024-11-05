import { useState } from 'react'
import CarList from './components/CarList'
import CarForm from './components/CarForm'
import Header from './components/Header'
import Stats from './components/Stats'
import SearchBar from './components/SearchBar'

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

  const addCar = (car) => {
    setCars([...cars, { ...car, id: Date.now() }])
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
        case 'newest':
          return b.year - a.year
        case 'oldest':
          return a.year - b.year
        case 'expensive':
          return b.price - a.price
        case 'cheapest':
          return a.price - b.price
        default:
          return 0
      }
    })

  const totalValue = cars.reduce((sum, car) => sum + car.price, 0)
  const averageYear = Math.round(cars.reduce((sum, car) => sum + car.year, 0) / cars.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Stats totalValue={totalValue} carCount={cars.length} averageYear={averageYear} />
        <CarForm 
          onSubmit={editingCar ? updateCar : addCar}
          initialData={editingCar}
        />
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <CarList 
          cars={filteredCars}
          onEdit={setEditingCar}
          onDelete={deleteCar}
        />
      </main>
    </div>
  )
}

export default App