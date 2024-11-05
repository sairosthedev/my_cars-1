import { GiSteeringWheel } from 'react-icons/gi'

function Header() {
  return (
    <header className="bg-gradient-to-r from-red-900 to-red-800 text-white shadow-xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center">
          <GiSteeringWheel className="text-4xl mr-3 text-amber-400" />
          <div>
            <h1 className="text-3xl font-bold">My Garage</h1>
            <p className="text-amber-400 text-sm">Manage your car collection</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header