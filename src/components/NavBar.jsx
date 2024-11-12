import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
  InformationCircleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { GiSteeringWheel } from 'react-icons/gi'
import { supabase } from '../utils/supabaseClient'

function NavBar({ setActiveView }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const getActiveClass = (path) => {
    return location.pathname === path
      ? "bg-red-800 text-white hover:bg-red-900"
      : "text-gray-200 hover:bg-navy-700"
  }

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      localStorage.clear();
      navigate('/signin', { replace: true });
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const navLinks = [
    {
      to: "/",
      icon: <HomeIcon className="h-6 w-6" />,
      text: "Dashboard",
      onClick: () => setActiveView('dashboard')
    },
    {
      to: "/inventory",
      icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
      text: "Inventory",
      onClick: () => setActiveView('inventory')
    },
    {
      to: "/add",
      icon: <PlusCircleIcon className="h-6 w-6" />,
      text: "Add Car",
      onClick: () => setActiveView('add')
    },
    {
      to: "/about",
      icon: <InformationCircleIcon className="h-6 w-6" />,
      text: "About",
      onClick: () => setActiveView('about')
    }
  ];

  return (
    <div className="w-full bg-gradient-to-r from-navy-900 to-navy-800 shadow-md border-b-4 border-gold-400">
      <nav className="relative px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center group">
          <GiSteeringWheel className="text-2xl text-gold-400 transition-transform duration-500 group-hover:rotate-180" />
          <span className="ml-2 font-bold text-xl text-white tracking-wider font-playfair">
            Auto<span className="text-gold-400">Track</span>
          </span>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-gold-400 transition-colors"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Bars3Icon className="h-8 w-8" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`${getActiveClass(link.to)} flex items-center px-4 py-2 rounded-lg transition-colors duration-200 font-inter`}
              onClick={link.onClick}
            >
              {link.icon}
              <span className="ml-2 font-medium">{link.text}</span>
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="flex items-center px-4 py-2 rounded-lg transition-colors duration-200 text-white hover:bg-navy-700 font-inter"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
            <span className="ml-2 font-medium">Sign Out</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:hidden fixed top-0 right-0 bottom-0 w-64 bg-navy-900 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto`}
        >
          <div className="p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gold-400"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            
            <div className="mt-12 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${
                    location.pathname === link.to
                      ? 'bg-navy-700 text-white'
                      : 'text-gray-200 hover:bg-navy-700'
                  } flex items-center px-4 py-3 rounded-lg transition-colors duration-200`}
                  onClick={() => {
                    link.onClick();
                    setIsMenuOpen(false);
                  }}
                >
                  {link.icon}
                  <span className="ml-3">{link.text}</span>
                </Link>
              ))}
              <button
                onClick={handleSignOut}
                className="flex items-center px-4 py-3 rounded-lg transition-colors duration-200 text-white hover:bg-navy-700 w-full text-left"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
                <span className="ml-3">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>
    </div>
  )
}

export default NavBar