import { CurrencyDollarIcon, CalendarIcon, TruckIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { formatCurrency } from '../utils/format'
import { useNavigate } from 'react-router-dom'

function Stats({ totalValue, carCount, averageYear, onExportData }) {
  const navigate = useNavigate()
  const utilizationPercentage = Math.min(100, (carCount / 10) * 100)
  const currentYear = new Date().getFullYear()

  const handleAddVehicle = () => {
    navigate('/add')
  }

  const handleScheduleMaintenance = () => {
    navigate('/maintenance')
  }

  const handleAnalytics = () => {
    navigate('/analytics')
  }

  const handleExportData = async () => {
    try {
      // Create CSV content
      const csvContent = [
        ['Total Fleet Value', 'Fleet Size', 'Average Model Year', 'Capacity Utilization'],
        [totalValue, carCount, averageYear, `${utilizationPercentage}%`]
      ].map(row => row.join(',')).join('\n')

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      link.setAttribute('href', url)
      link.setAttribute('download', `fleet_stats_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error exporting data:', error)
      alert('Failed to export data. Please try again.')
    }
  }

  const actions = [
    { 
      name: 'Add Vehicle', 
      icon: '🚗', 
      color: 'blue',
      onClick: handleAddVehicle 
    },
    { 
      name: 'Schedule Maintenance', 
      icon: '🔧', 
      color: 'emerald',
      onClick: handleScheduleMaintenance 
    },
    { 
      name: 'Analytics', 
      icon: '📊', 
      color: 'indigo',
      onClick: handleAnalytics 
    },
    { 
      name: 'Export Data', 
      icon: '📤', 
      color: 'orange',
      onClick: handleExportData 
    }
  ]

  return (
    <div className="space-y-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Value Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors duration-300">
              <CurrencyDollarIcon className="h-7 w-7 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Fleet Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
              <div className="mt-1.5 flex items-center text-sm">
                <span className="font-medium text-emerald-600">↑ 12%</span>
                <span className="ml-1.5 text-gray-500">from previous period</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Cars Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors duration-300">
              <TruckIcon className="h-7 w-7 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Fleet Size</p>
              <p className="text-2xl font-bold text-gray-900">{carCount} vehicles</p>
              <div className="mt-1.5 flex items-center text-sm">
                <span className="font-medium text-emerald-600">+3</span>
                <span className="ml-1.5 text-gray-500">new additions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Average Year Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors duration-300">
              <CalendarIcon className="h-7 w-7 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Average Model Year</p>
              <p className="text-2xl font-bold text-gray-900">{averageYear || 'N/A'}</p>
              <p className="mt-1.5 text-sm text-gray-500">
                Average age: <span className="text-indigo-600 font-medium">{averageYear ? `${currentYear - averageYear} years` : 'N/A'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Fleet Utilization Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 transition-colors duration-300">
              <ChartBarIcon className="h-7 w-7 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Capacity Utilization</p>
              <p className="text-2xl font-bold text-gray-900">{utilizationPercentage}%</p>
              <div className="mt-2.5 w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${utilizationPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Management Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map(({ name, icon, color, onClick }, index) => (
            <button
              key={index}
              onClick={onClick}
              className={`px-4 py-3 rounded-xl text-sm font-medium
                bg-${color}-50 text-${color}-700 hover:bg-${color}-100
                transition-all duration-200 flex items-center justify-center space-x-2
                hover:scale-[1.02] active:scale-[0.98]`}
            >
              <span>{icon}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Stats