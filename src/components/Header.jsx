import { GiSteeringWheel } from 'react-icons/gi'

function Header() {
  return (
    <header className="bg-gradient-to-r from-red-900 to-red-800 text-white shadow-xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <GiSteeringWheel className="text-4xl text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">My Garage</h1>
              <p className="text-amber-400 text-sm">Manage your car collection</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <span className="text-sm text-amber-400">Last updated:</span>
              <span className="ml-2 text-white">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header