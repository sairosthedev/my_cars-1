import { CurrencyDollarIcon, CalendarIcon, TruckIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { formatCurrency } from '../utils/format'

function Stats({ totalValue, carCount, averageYear }) {
  const utilizationPercentage = Math.min(100, (carCount / 10) * 100)

  return (
    <div className="space-y-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Value Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <CurrencyDollarIcon className="h-7 w-7 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
              <div className="mt-1 flex items-center text-sm text-blue-600">
                <span className="font-medium">↑ 12%</span>
                <span className="ml-1 text-gray-500">vs last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Cars Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <TruckIcon className="h-7 w-7 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Cars</p>
              <p className="text-2xl font-bold text-gray-900">{carCount}</p>
              <div className="mt-1 flex items-center text-sm text-green-600">
                <span className="font-medium">+3</span>
                <span className="ml-1 text-gray-500">new this month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Average Year Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <CalendarIcon className="h-7 w-7 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Average Year</p>
              <p className="text-2xl font-bold text-gray-900">{averageYear || 'N/A'}</p>
              <p className="mt-1 text-sm text-gray-500">
                Fleet age: <span className="text-purple-600 font-medium">{2024 - averageYear} years</span>
              </p>
            </div>
          </div>
        </div>

        {/* Fleet Utilization Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-50 rounded-xl">
              <ChartBarIcon className="h-7 w-7 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Fleet Utilization</p>
              <p className="text-2xl font-bold text-gray-900">{utilizationPercentage}%</p>
              <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                <div 
                  className="bg-amber-500 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${utilizationPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Add New Car', color: 'blue' },
            { name: 'Schedule Service', color: 'green' },
            { name: 'View Reports', color: 'purple' },
            { name: 'Export Data', color: 'amber' }
          ].map(({ name, color }, index) => (
            <button
              key={index}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium
                bg-${color}-50 text-${color}-700 hover:bg-${color}-100
                transition-colors duration-200 flex items-center justify-center`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Stats