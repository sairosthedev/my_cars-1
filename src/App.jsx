import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
    <Router>
      <div className={isAuthenticated ? "min-h-screen bg-gray-50" : ""}>
        <Layout isAuthenticated={isAuthenticated} successMessage={successMessage}>
          <Routes>
            <Route 
              path="/signin" 
              element={isAuthenticated ? <Navigate to="/" replace /> : <SignIn />} 
            />
            <Route 
              path="/signup" 
              element={isAuthenticated ? <Navigate to="/" replace /> : <SignUp />} 
            />
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard cars={cars} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Inventory cars={cars} onDelete={deleteCar} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CarForm onSubmit={handleAddCar} successMessage={successMessage} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CarForm onSubmit={updateCar} initialData={editingCar} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/car/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CarDetails cars={cars} />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Analytics cars={cars} />
                </ProtectedRoute>
              } 
            />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;