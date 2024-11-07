import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children, isAuthenticated, successMessage }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {isAuthenticated && (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <NavBar />
        </nav>
      )}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${isAuthenticated ? 'pt-4' : ''} flex-grow`}>
        {successMessage && isAuthenticated && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {successMessage}
          </div>
        )}
        {children}
      </div>
      {isAuthenticated && <Footer />}
    </div>
  );
};

export default Layout; 