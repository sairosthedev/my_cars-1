import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { GiSteeringWheel } from 'react-icons/gi'

function NavBar({ setActiveView }) {
  const location = useLocation()
  const navigate = useNavigate();

  const getActiveClass = (path) => {
    return location.pathname === path
      ? "bg-red-800 text-white hover:bg-red-900"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
  }

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/signin');
    window.location.reload();
  };

  return (
    <div className="w-full bg-gradient-to-r from-red-900 to-red-800 shadow-md border-b-4 border-amber-400">
      <nav className="flex items-center justify-between relative px-6 py-4">
        <div className="flex items-center group">
          <GiSteeringWheel className="text-2xl text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
          <span className="ml-2 font-bold text-xl text-white tracking-wider">
            Auto<span className="text-amber-400">Track</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className={`${getActiveClass('/')} flex items-center px-4 py-2 rounded-lg transition-colors duration-200`}
            onClick={() => setActiveView('dashboard')}
          >
            <HomeIcon className="h-6 w-6 mr-2" />
            <span className="font-medium text-white">Dashboard</span>
          </Link>
          <Link
            to="/inventory"
            className={`${getActiveClass('/inventory')} flex items-center px-4 py-2 rounded-lg transition-colors duration-200`}
            onClick={() => setActiveView('inventory')}
          >
            <ClipboardDocumentListIcon className="h-6 w-6 mr-2" />
            <span className="font-medium text-white">Inventory</span>
          </Link>
          <Link
            to="/add"
            className={`${getActiveClass('/add')} flex items-center px-4 py-2 rounded-lg transition-colors duration-200`}
            onClick={() => setActiveView('add')}
          >
            <PlusCircleIcon className="h-6 w-6 mr-2" />
            <span className="font-medium text-white">Add Car</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center px-4 py-2 rounded-lg transition-colors duration-200 text-white hover:bg-red-700"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6 mr-2" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default NavBar