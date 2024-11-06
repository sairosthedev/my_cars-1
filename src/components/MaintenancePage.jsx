import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MaintenancePage() {
  const navigate = useNavigate()
  const [maintenanceData, setMaintenanceData] = useState({
    vehicleId: '',
    serviceType: '',
    scheduledDate: '',
    notes: ''
  })

  const serviceTypes = [
    'Oil Change',
    'Tire Rotation',
    'Brake Service',
    'General Inspection',
    'Filter Replacement',
    'Battery Check'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement maintenance scheduling logic
    console.log('Maintenance scheduled:', maintenanceData)
    navigate('/')
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule Maintenance</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle ID
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={maintenanceData.vehicleId}
            onChange={(e) => setMaintenanceData({...maintenanceData, vehicleId: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type
          </label>
          <select
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={maintenanceData.serviceType}
            onChange={(e) => setMaintenanceData({...maintenanceData, serviceType: e.target.value})}
          >
            <option value="">Select service type</option>
            {serviceTypes.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scheduled Date
          </label>
          <input
            type="date"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={maintenanceData.scheduledDate}
            onChange={(e) => setMaintenanceData({...maintenanceData, scheduledDate: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            value={maintenanceData.notes}
            onChange={(e) => setMaintenanceData({...maintenanceData, notes: e.target.value})}
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Schedule Maintenance
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default MaintenancePage 