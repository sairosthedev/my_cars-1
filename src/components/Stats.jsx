import { CurrencyDollarIcon, CalendarIcon, TruckIcon } from '@heroicons/react/24/outline'
import { formatCurrency } from '../utils/format'

function Stats({ totalValue, carCount, averageYear }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200">
        <div className="flex items-center">
          <CurrencyDollarIcon className="h-8 w-8 text-red-900" />
          <div className="ml-4">
            <p className="text-sm font-medium text-stone-500">Total Value</p>
            <p className="text-2xl font-bold text-stone-800">{formatCurrency(totalValue)}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200">
        <div className="flex items-center">
          <TruckIcon className="h-8 w-8 text-red-900" />
          <div className="ml-4">
            <p className="text-sm font-medium text-stone-500">Total Cars</p>
            <p className="text-2xl font-bold text-stone-800">{carCount}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200">
        <div className="flex items-center">
          <CalendarIcon className="h-8 w-8 text-red-900" />
          <div className="ml-4">
            <p className="text-sm font-medium text-stone-500">Average Year</p>
            <p className="text-2xl font-bold text-stone-800">{averageYear || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats