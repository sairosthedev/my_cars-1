import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { formatCurrency } from '../utils/format'

function CarList({ cars, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map(car => (
        <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 border border-stone-200">
          <div className="relative">
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-full h-56 object-cover"
            />
            <div className="absolute top-0 right-0 m-4 bg-black bg-opacity-50 px-3 py-1 rounded-full">
              <span className="text-white font-medium">{car.year}</span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-stone-800 mb-2">
              {car.make} {car.model}
            </h3>
            <div className="space-y-2 mb-4">
              <p className="text-xl font-semibold text-red-900">
                {formatCurrency(car.price)}
              </p>
              <p className="text-stone-600">
                {car.mileage.toLocaleString()} miles
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => onEdit(car)}
                className="p-2 text-amber-600 hover:text-amber-700 transition-colors duration-200"
                aria-label="Edit car"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(car.id)}
                className="p-2 text-red-600 hover:text-red-700 transition-colors duration-200"
                aria-label="Delete car"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CarList