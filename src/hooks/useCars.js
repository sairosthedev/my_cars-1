import { useState } from 'react';
import { generateUniqueId } from '../utils/helpers';

export const useCars = () => {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddCar = async (carData) => {
    try {
      const newCar = {
        ...carData,
        id: generateUniqueId(),
        createdAt: new Date().toISOString()
      };
      
      setCars(prevCars => [...prevCars, newCar]);
      setSuccessMessage('Car added successfully!');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
      return true;
    } catch (error) {
      console.error('Error adding car:', error);
      throw error;
    }
  };

  const updateCar = (updatedCar) => {
    setCars(cars.map(car => car.id === updatedCar.id ? updatedCar : car));
    setEditingCar(null);
  };

  const deleteCar = (id) => {
    setCars(cars.filter(car => car.id !== id));
  };

  return {
    cars,
    editingCar,
    setEditingCar,
    successMessage,
    handleAddCar,
    updateCar,
    deleteCar
  };
}; 