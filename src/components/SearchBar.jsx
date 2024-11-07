import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

function SearchBar({ searchTerm, onSearchChange, sortBy, onSortChange }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search cars..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-transparent outline-none transition-all duration-200"
        />
      </div>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-transparent outline-none bg-white transition-all duration-200"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="expensive">Most Expensive</option>
        <option value="cheapest">Least Expensive</option>
      </select>
    </div>
  )
}

export default SearchBar