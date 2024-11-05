import { useState, useEffect } from 'react'
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline'

function CarForm({ onSubmit, initialData, isSubmitting }) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    image: '',
    vin: '',
    licensePlate: '',
    color: '',
    transmission: 'automatic',
    fuelType: 'gasoline',
    lastServiceDate: '',
    nextServiceDue: '',
    insurance: {
      provider: '',
      policyNumber: '',
      expiryDate: ''
    },
    notes: ''
  })
  const [errors, setErrors] = useState({})
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
      setImagePreview(initialData.image)
    }
  }, [initialData])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.make.trim()) newErrors.make = 'Make is required'
    if (!formData.model.trim()) newErrors.model = 'Model is required'
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0'
    if (formData.mileage < 0) newErrors.mileage = 'Mileage cannot be negative'
    if (!formData.image.trim()) newErrors.image = 'Image URL is required'
    if (formData.vin && formData.vin.length !== 17) newErrors.vin = 'VIN must be 17 characters'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
      if (!initialData) {
        setFormData({
          make: '',
          model: '',
          year: new Date().getFullYear(),
          price: '',
          mileage: '',
          image: '',
          vin: '',
          licensePlate: '',
          color: '',
          transmission: 'automatic',
          fuelType: 'gasoline',
          lastServiceDate: '',
          nextServiceDue: '',
          insurance: {
            provider: '',
            policyNumber: '',
            expiryDate: ''
          },
          notes: ''
        })
        setImagePreview(null)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target
    const processedValue = type === 'number' ? Number(value) : value
    
    // Handle nested insurance object fields
    if (name.startsWith('insurance.')) {
      const field = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        insurance: {
          ...prev.insurance,
          [field]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: processedValue }))
    }
    
    if (name === 'image') {
      setImagePreview(value)
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" style={{
      backgroundColor: '#F8F4E3',
      padding: '20px',
      borderRadius: '8px',
      border: '2px solid #800000',
      marginBottom: '20px'
    }}>
      <h2 style={{ color: '#800000', marginBottom: '20px' }}>Add New Car</h2>

      {/* Basic Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium" style={{ color: '#800000' }}>Make</label>
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            placeholder="e.g., Toyota"
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #DAA520',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: '#800000' }}>Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="e.g., Camry"
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #DAA520',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: '#800000' }}>Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="e.g., 2024"
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #DAA520',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: '#800000' }}>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., 25000"
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #DAA520',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          />
        </div>
      </div>

      {/* Vehicle Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium" style={{ color: '#800000' }}>VIN</label>
          <input
            type="text"
            name="vin"
            value={formData.vin}
            onChange={handleChange}
            maxLength="17"
            placeholder="e.g., 1HGCM82633A123456"
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #DAA520',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: '#800000' }}>License Plate</label>
          <input
            type="text"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            placeholder="e.g., ABC-1234"
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #DAA520',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: '#800000' }}>Color</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="e.g., Midnight Blue"
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #DAA520',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: '#800000' }}>Mileage</label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            placeholder="e.g., 50000"
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #DAA520',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          />
        </div>
      </div>

      {/* Specifications Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium" style={{ color: '#800000' }}>Transmission</label>
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #DAA520',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          >
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
            <option value="cvt">CVT</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: '#800000' }}>Fuel Type</label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #DAA520',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          >
            <option value="gasoline">Gasoline</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Service Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium" style={{ color: '#800000' }}>Last Service Date</label>
          <input
            type="date"
            name="lastServiceDate"
            value={formData.lastServiceDate}
            onChange={handleChange}
            placeholder="Select last service date"
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #DAA520',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: '#800000' }}>Next Service Due</label>
          <input
            type="date"
            name="nextServiceDue"
            value={formData.nextServiceDue}
            onChange={handleChange}
            placeholder="Select next service date"
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #DAA520',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          />
        </div>
      </div>

      {/* Insurance Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium" style={{ color: '#800000' }}>Insurance Provider</label>
          <input
            type="text"
            name="insurance.provider"
            value={formData.insurance.provider}
            onChange={handleChange}
            placeholder="e.g., State Farm"
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #DAA520',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: '#800000' }}>Policy Number</label>
          <input
            type="text"
            name="insurance.policyNumber"
            value={formData.insurance.policyNumber}
            onChange={handleChange}
            placeholder="e.g., POL-123456789"
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #DAA520',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium" style={{ color: '#800000' }}>Insurance Expiry</label>
          <input
            type="date"
            name="insurance.expiryDate"
            value={formData.insurance.expiryDate}
            onChange={handleChange}
            placeholder="Select expiry date"
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #DAA520',
              borderRadius: '4px',
              marginTop: '4px'
            }}
          />
        </div>
      </div>

      {/* Notes Section */}
      <div>
        <label className="block text-sm font-medium" style={{ color: '#800000' }}>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
          placeholder="Enter any additional notes about the vehicle (maintenance history, modifications, etc.)"
          style={{
            padding: '8px',
            width: '100%',
            border: '1px solid #DAA520',
            borderRadius: '4px',
            marginTop: '4px'
          }}
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium" style={{ color: '#800000' }}>Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter URL of vehicle image"
          style={{
            padding: '8px',
            width: '100%',
            border: '1px solid #DAA520',
            borderRadius: '4px',
            marginTop: '4px'
          }}
        />
      </div>

      {/* Submit Button */}
      <div>
        <button 
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: '#800000',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          {isSubmitting ? 'Saving...' : (initialData ? 'Update Car' : 'Add Car')}
        </button>
      </div>
    </form>
  )
}

export default CarForm