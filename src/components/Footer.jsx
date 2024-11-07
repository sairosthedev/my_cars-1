import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { GiSteeringWheel } from 'react-icons/gi'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-red-900 to-red-800 text-white mt-auto border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          {/* Brand Section */}
          <div className="flex items-center space-x-2 group">
            <GiSteeringWheel className="text-2xl text-amber-400 transition-transform duration-500 group-hover:rotate-180" />
            <span className="text-lg font-bold tracking-wider">
              Auto<span className="text-amber-400">Track</span>
            </span>
          </div>

          {/* Center Section - Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-300 hover:text-amber-400 transition-colors duration-300 transform hover:-translate-y-1"
              aria-label="GitHub"
            >
              <FaGithub className="text-xl" />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-amber-400 transition-colors duration-300 transform hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-xl" />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-amber-400 transition-all duration-300 transform hover:-translate-y-1"
              aria-label="Twitter"
            >
              <FaTwitter className="text-xl" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-300 text-sm font-light tracking-wide">
            © {currentYear} <span className="text-amber-400">AutoTrack</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 