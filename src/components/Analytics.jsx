import React, { useMemo, Suspense } from 'react'
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
  ResponsiveContainer 
} from 'recharts'
import { formatCurrency } from '../utils/format'

const LoadingState = () => (
  <div className="space-y-6">
    <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse"></div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-[300px] bg-gray-200 rounded-2xl animate-pulse"></div>
      ))}
    </div>
  </div>
)

function Analytics({ cars }) {
  const analytics = useMemo(() => {
    if (!cars?.length) return null

    try {
      // Calculate distributions
      const makeDistribution = cars.reduce((acc, car) => {
        acc[car.make] = (acc[car.make] || 0) + 1
        return acc
      }, {})

      const yearDistribution = cars.reduce((acc, car) => {
        acc[car.year] = (acc[car.year] || 0) + 1
        return acc
      }, {})

      const priceRanges = {
        '0-50k': 0,
        '50k-100k': 0,
        '100k-150k': 0,
        '150k+': 0
      }

      cars.forEach(car => {
        if (car.price < 50000) priceRanges['0-50k']++
        else if (car.price < 100000) priceRanges['50k-100k']++
        else if (car.price < 150000) priceRanges['100k-150k']++
        else priceRanges['150k+']++
      })

      // Format data for charts
      const makeData = Object.entries(makeDistribution)
        .map(([make, count]) => ({
          name: make,
          value: count
        }))
        .sort((a, b) => b.value - a.value)

      const yearData = Object.entries(yearDistribution)
        .map(([year, count]) => ({
          year: parseInt(year),
          count
        }))
        .sort((a, b) => a.year - b.year)

      const priceData = Object.entries(priceRanges)
        .map(([range, count]) => ({
          range,
          count
        }))

      const totalValue = cars.reduce((sum, car) => sum + car.price, 0)
      const averagePrice = totalValue / cars.length
      const averageYear = Math.round(cars.reduce((sum, car) => sum + car.year, 0) / cars.length)

      return {
        makeData,
        yearData,
        priceData,
        totalValue,
        averagePrice,
        averageYear,
        totalCars: cars.length
      }
    } catch (error) {
      console.error('Error calculating analytics:', error)
      return null
    }
  }, [cars])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

  if (!cars) {
    return <LoadingState />
  }

  if (!analytics) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Fleet Analytics</h1>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-gray-600">No data available for analysis</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Fleet Analytics</h1>
        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Fleet Value</h3>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(analytics.totalValue)}</p>
          <p className="text-sm text-gray-500 mt-2">
            Avg. per vehicle: {formatCurrency(analytics.averagePrice)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Fleet Size</h3>
          <p className="text-3xl font-bold text-gray-900">{analytics.totalCars} vehicles</p>
          <p className="text-sm text-gray-500 mt-2">Active in fleet</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Average Year</h3>
          <p className="text-3xl font-bold text-gray-900">{analytics.averageYear}</p>
          <p className="text-sm text-gray-500 mt-2">
            Fleet age: {new Date().getFullYear() - analytics.averageYear} years
          </p>
        </div>
      </div>

      <Suspense fallback={<LoadingState />}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Make Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.makeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {analytics.makeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} vehicles`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Year Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.yearData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} vehicles`, 'Count']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Price Range Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} vehicles`, 'Count']} />
                  <Legend />
                  <Bar 
                    dataKey="count" 
                    fill="#82ca9d"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  )
}

export default Analytics