import Stats from './Stats';

const Dashboard = ({ cars }) => {
  const totalValue = cars.reduce((sum, car) => sum + car.price, 0);
  const averageYear = Math.round(cars.reduce((sum, car) => sum + car.year, 0) / cars.length) || 0;

  return (
    <div className="space-y-8">
      <Stats 
        totalValue={totalValue} 
        carCount={cars.length} 
        averageYear={averageYear} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.slice(0, 3).map(car => (
          <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{car.make} {car.model}</h3>
              <p className="text-gray-600">{car.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 