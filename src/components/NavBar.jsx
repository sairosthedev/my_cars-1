import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { GiSteeringWheel } from 'react-icons/gi'
import { supabase } from '../utils/supabaseClient'

function NavBar({ setActiveView }) {
  const location = useLocation()
  const navigate = useNavigate();

  const getActiveClass = (path) => {
    return location.pathname === path
      ? "bg-red-800 text-white hover:bg-red-900"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
  }

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local storage
      localStorage.clear();
      
      // Navigate to sign in page
      navigate('/signin', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-navy-900 to-navy-800 shadow-md border-b-4 border-gold-400">
      <nav className="flex items-center justify-between relative px-6 py-4">
        <div className="flex items-center group">
          <GiSteeringWheel className="text-2xl text-gold-400 transition-transform duration-500 group-hover:rotate-180" />
          <span className="ml-2 font-bold text-xl text-white tracking-wider font-playfair">
            Auto<span className="text-gold-400">Track</span>
          </span>
        </div>
        <div className="flex items-center space-x-4 absolute left-1/2 transform -translate-x-1/2">
          <Link
            to="/"
            className={`${
              location.pathname === '/' 
                ? 'bg-navy-700 text-white' 
                : 'text-gray-200 hover:bg-navy-700'
            } flex items-center px-4 py-2 rounded-lg transition-colors duration-200 font-inter`}
            onClick={() => setActiveView('dashboard')}
          >
            <HomeIcon className="h-6 w-6 mr-2" />
            <span className="font-medium">Dashboard</span>
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
          <Link
            to="/about"
            className={`${getActiveClass('/about')} flex items-center px-4 py-2 rounded-lg transition-colors duration-200`}
            onClick={() => setActiveView('about')}
          >
            <InformationCircleIcon className="h-6 w-6 mr-2" />
            <span className="font-medium text-white">About</span>
          </Link>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center px-4 py-2 rounded-lg transition-colors duration-200 text-white hover:bg-navy-700 font-inter"
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6 mr-2" />
          <span className="font-medium">Sign Out</span>
        </button>
      </nav>
    </div>
  )
}

export default NavBar