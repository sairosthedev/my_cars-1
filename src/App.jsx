import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useCars } from './hooks/useCars';
import Layout from './components/Layout';
import './App.css';

function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const { 
    cars, 
    editingCar, 
    successMessage, 
    handleAddCar, 
    updateCar, 
    deleteCar 
  } = useCars();

  // Public routes that don't require authentication
  const publicRoutes = ['/signin', '/signup', '/auth/callback'];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
        </div>
      </div>
    );
  }

  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // Redirect to signin if not authenticated and trying to access protected route
  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Redirect to dashboard if authenticated and trying to access auth pages
  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Layout isAuthenticated={isAuthenticated} successMessage={successMessage}>
        <Outlet />
      </Layout>
    </div>
  );
}

export default App;