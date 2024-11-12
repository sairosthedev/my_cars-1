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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/inventory",
        element: <Inventory />
      },
      {
        path: "/add",
        element: <CarForm />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/car/:id",
        element: <CarDetails />
      },
      {
        path: "/analytics",
        element: <Analytics />
      },
      {
        path: "/maintenance",
        element: <MaintenancePage />
      },
      {
        path: "/auth/callback",
        element: <AuthCallback />
      }
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)