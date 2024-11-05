import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

function CarForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    image: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ 
      make: '', 
      model: '', 
      year: new Date().getFullYear(), 
      price: '', 
      mileage: '', 
      image: '' 
    })
  }

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-stone-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-stone-800">
          {initialData ? 'Edit Car' : 'Add New Car'}
        </h2>
        {initialData && (
          <button
            type="button"
            onClick={() => onSubmit(null)}
            className="text-stone-500 hover:text-stone-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-stone-700 font-medium mb-2">Make</label>
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            placeholder="e.g., Porsche"
          />
        </div>
        <div>
          <label className="block text-stone-700 font-medium mb-2">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            placeholder="e.g., 911"
          />
        </div>
        <div>
          <label className="block text-stone-700 font-medium mb-2">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            min="1900"
            max={new Date().getFullYear() + 1}
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
          />
        </div>
        <div>
          <label className="block text-stone-700 font-medium mb-2">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            placeholder="e.g., 135000"
          />
        </div>
        <div>
          <label className="block text-stone-700 font-medium mb-2">Mileage</label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            placeholder="e.g., 1200"
          />
        </div>
        <div>
          <label className="block text-stone-700 font-medium mb-2">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            placeholder="https://..."
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors duration-200 font-medium"
      >
        {initialData ? 'Update Car' : 'Add Car'}
      </button>
    </form>
  )
}

export default CarForm