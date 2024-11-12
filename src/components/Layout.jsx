import NavBar from './NavBar'; // Importing the NavBar component
import Footer from './Footer'; // Importing the Footer component

// Defining the Layout component
const Layout = ({ children, isAuthenticated, successMessage }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col"> {/* Main container for the layout */}
      {isAuthenticated && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white"> {/* Fixed navigation bar at the top */}
          <NavBar />
        </div>
      )}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${isAuthenticated ? 'mt-20' : ''} flex-grow`}> {/* Main content container */}
        {successMessage && isAuthenticated && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"> {/* Success message container */}
            {successMessage}
          </div>
        )}
        {children} {/* Content passed as children */}
      </div>
      {isAuthenticated && <Footer />} {/* Footer component */}
    </div>
  );
};

export default Layout; 