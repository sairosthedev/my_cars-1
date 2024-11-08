import { GiSteeringWheel } from 'react-icons/gi' // Importing the steering wheel icon from react-icons

function Header() {
  return (
    <header className="relative bg-gradient-to-r from-red-900 to-red-800 text-white shadow-xl overflow-hidden"> // Header component with a gradient background and shadow
      <div className="absolute inset-0 opacity-10"> // Semi-transparent overlay for the background image
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] bg-cover bg-center"></div> // Background image with cover and center properties
      </div>

      <div className="container mx-auto px-4 py-6 relative"> // Container for the header content
        <div className="flex items-center justify-between"> // Flex container for aligning items horizontally
          <div className="flex items-center space-x-3"> // Flex container for aligning logo and text
            <div className="bg-black/20 backdrop-blur-sm p-2 rounded-lg"> // Logo container with semi-transparent background and blur effect
              <GiSteeringWheel className="text-4xl text-amber-400" /> // Steering wheel icon with custom styling
            </div>
            <div>
              <h1 className="text-3xl font-bold">My Garage</h1> // Header title
              <p className="text-amber-400 text-sm">Manage your car collection</p> // Header subtitle
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4"> // Hidden on mobile, visible on desktop and above
            <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg"> // Container for the last updated text with semi-transparent background and blur effect
              <span className="text-sm text-amber-400">Last updated:</span> // Text indicating last update
              <span className="ml-2">{new Date().toLocaleDateString()}</span> // Current date displayed
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header