import { Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useCars } from './hooks/useCars';
import Layout from './components/Layout';
import CarForm from './components/CarForm';
import CarDetails from './components/CarDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Analytics from './components/Analytics';
import MaintenancePage from './components/MaintenancePage';
import About from './components/About';
import AuthCallback from './components/auth/AuthCallback';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import './App.css';

function App() {
  const { isAuthenticated } = useAuth();
  const { 
    cars, 
    editingCar, 
    successMessage, 
    handleAddCar, 
    updateCar, 
    deleteCar 
  } = useCars();

  return (
    <div>
      <Layout isAuthenticated={isAuthenticated} successMessage={successMessage}>
        <Outlet />
      </Layout>
    </div>
  );
}

export default App;