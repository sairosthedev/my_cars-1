import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import CarForm from './components/CarForm';
import About from './components/About';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CarDetails from './components/CarDetails';
import Analytics from './components/Analytics';
import MaintenancePage from './components/MaintenancePage';
import AuthCallback from './components/auth/AuthCallback';
import ProtectedRoute from './components/auth/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Public routes
      {
        path: 'signin',
        element: <SignIn />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'auth/callback',
        element: <AuthCallback />
      },
      // Protected routes
      {
        path: '/',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        index: true
      },
      {
        path: 'inventory',
        element: <ProtectedRoute><Inventory /></ProtectedRoute>
      },
      {
        path: 'add',
        element: <ProtectedRoute><CarForm /></ProtectedRoute>
      },
      {
        path: 'car/:id',
        element: <ProtectedRoute><CarDetails /></ProtectedRoute>
      },
      {
        path: 'analytics',
        element: <ProtectedRoute><Analytics /></ProtectedRoute>
      },
      {
        path: 'maintenance',
        element: <ProtectedRoute><MaintenancePage /></ProtectedRoute>
      },
      {
        path: 'about',
        element: <ProtectedRoute><About /></ProtectedRoute>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} future={{
      v7_startTransition: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }} />
  </React.StrictMode>
);