import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';

/**
 * CarForm Component
 * Handles both creation and editing of car entries
 * @param {Object} initialData - Existing car data for editing (optional)
 * @param {boolean} isSubmitting - Form submission state
 */
const CarForm = ({ initialData, isSubmitting = false }) => {
  // Initialize form state with default values
  const [formState, setFormState] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    image: '',
    vin: '',
    licensePlate: '',
    color: '',
    transmission: 'automatic',
    fuelType: 'petrol',
    lastServiceDate: '',
    nextServiceDue: '',
    insurance: {
      provider: '',
      policyNumber: '',
      expiryDate: ''
    },
    notes: ''
  });
  
  // State for form validation and error handling
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  // Populate form with initial data if editing existing car
  useEffect(() => {
    if (initialData) {
      setFormState(initialData);
    }
  }, [initialData]);

  /**
   * Validates all form fields and returns whether the form is valid
   * @returns {boolean} - True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();
    
    // Basic Information Validation
    if (!formState.make.trim()) {
      newErrors.make = 'Make is required';
    } else if (formState.make.length < 2) {
      newErrors.make = 'Make must be at least 2 characters';
    }

    if (!formState.model.trim()) {
      newErrors.model = 'Model is required';
    } else if (formState.model.length < 2) {
      newErrors.model = 'Model must be at least 2 characters';
    }

    if (!formState.year) {
      newErrors.year = 'Year is required';
    } else {
      const yearNum = parseInt(formState.year);
      if (yearNum < 1900 || yearNum > currentYear + 1) {
        newErrors.year = `Year must be between 1900 and ${currentYear + 1}`;
      }
    }

    if (formState.price && (isNaN(formState.price) || parseFloat(formState.price) < 0)) {
      newErrors.price = 'Price must be a positive number';
    }

    if (formState.mileage) {
      if (isNaN(formState.mileage) || parseFloat(formState.mileage) < 0) {
        newErrors.mileage = 'Mileage must be a positive number';
      } else if (parseFloat(formState.mileage) > 1000000) {
        newErrors.mileage = 'Mileage seems unusually high';
      }
    }

    // VIN Validation
    if (formState.vin) {
      if (formState.vin.length !== 17) {
        newErrors.vin = 'VIN must be exactly 17 characters';
      } else if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(formState.vin)) {
        newErrors.vin = 'VIN contains invalid characters';
      }
    }

    // License Plate Validation
    if (formState.licensePlate) {
      if (formState.licensePlate.length < 2 || formState.licensePlate.length > 10) {
        newErrors.licensePlate = 'License plate length should be between 2 and 10 characters';
      } else if (!/^[A-Z0-9- ]*$/i.test(formState.licensePlate)) {
        newErrors.licensePlate = 'License plate contains invalid characters';
      }
    }

    // Color Validation
    if (formState.color && formState.color.length < 2) {
      newErrors.color = 'Color must be at least 2 characters';
    }

    // Date Validations
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (formState.lastServiceDate) {
      const lastService = new Date(formState.lastServiceDate);
      if (lastService > today) {
        newErrors.lastServiceDate = 'Last service date cannot be in the future';
      }
    }

    if (formState.nextServiceDue) {
      const nextService = new Date(formState.nextServiceDue);
      if (nextService < today) {
        newErrors.nextServiceDue = 'Next service date must be in the future';
      }
    }

    if (formState.lastServiceDate && formState.nextServiceDue) {
      const lastService = new Date(formState.lastServiceDate);
      const nextService = new Date(formState.nextServiceDue);
      if (lastService >= nextService) {
        newErrors.nextServiceDue = 'Next service date must be after last service date';
      }
    }

    // Insurance Validation
    if (formState.insurance.provider && formState.insurance.provider.length < 2) {
      newErrors['insurance.provider'] = 'Insurance provider must be at least 2 characters';
    }

    if (formState.insurance.policyNumber) {
      if (formState.insurance.policyNumber.length < 5) {
        newErrors['insurance.policyNumber'] = 'Policy number must be at least 5 characters';
      } else if (!/^[A-Z0-9-]*$/i.test(formState.insurance.policyNumber)) {
        newErrors['insurance.policyNumber'] = 'Policy number contains invalid characters';
      }
    }

    if (formState.insurance.expiryDate) {
      const expiryDate = new Date(formState.insurance.expiryDate);
      if (expiryDate < today) {
        newErrors['insurance.expiryDate'] = 'Insurance expiry date must be in the future';
      }
    }

    // Image URL Validation
    if (formState.image) {
      try {
        new URL(formState.image);
      } catch {
        newErrors.image = 'Please enter a valid URL';
      }
    }

    // Notes Validation
    if (formState.notes && formState.notes.length > 1000) {
      newErrors.notes = 'Notes cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   * Validates form and saves car data to Supabase
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (validateForm()) {
      try {
        console.log('Starting form submission...');
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Authentication error:', sessionError);
          throw new Error('Authentication error occurred')
        }

        if (!session) {
          console.error('No session found');
          throw new Error('Please sign in to add a car')
        }

        console.log('User session:', session);

        const carData = {
          make: formState.make,
          model: formState.model,
          year: parseInt(formState.year),
          price: parseFloat(formState.price),
          mileage: parseInt(formState.mileage),
          image: formState.image,
          vin: formState.vin,
          license_plate: formState.licensePlate,
          color: formState.color,
          transmission: formState.transmission,
          fuel_type: formState.fuelType,
          last_service_date: formState.lastServiceDate,
          next_service_due: formState.nextServiceDue,
          insurance: formState.insurance,
          notes: formState.notes,
          user_id: session.user.id
        };

        console.log('Submitting car data:', carData);

        const { data, error } = await supabase
          .from('cars')
          .insert([carData])
          .select();

        if (error) {
          console.error('Database error:', error);
          throw error;
        }

        console.log('Successfully added car:', data);
        navigate('/inventory');

      } catch (error) {
        console.error('Submission error:', error);
        setSubmitError(error.message || 'Failed to save car details. Please try again.');
      }
    }
  };

  /**
   * Handles changes to form input fields
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' ? (value === '' ? '' : Number(value)) : value;
    
    // Handle nested insurance fields
    if (name.startsWith('insurance.')) {
      const [_, field] = name.split('.');
      setFormState(prev => ({
        ...prev,
        insurance: {
          ...prev.insurance,
          [field]: value
        }
      }));
    } else {
      setFormState(prev => ({ ...prev, [name]: processedValue }));
    }
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /**
   * Handles changes to select/dropdown fields
   * @param {string} name - Field name
   * @param {string} value - Selected value
   */
  const handleSelectChange = (name, value) => {
    setFormState(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /**
   * Debug function to check existing cars in database
   * Useful for development and troubleshooting
   */
  const checkExistingCars = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('No authenticated session');
        return;
      }

      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('user_id', session.user.id);
      
      if (error) {
        console.error('Error fetching cars:', error);
      } else {
        console.log('All cars in database:', data);
      }
    } catch (error) {
      console.error('Error checking cars:', error);
    }
  };

  // Check existing cars on component mount
  useEffect(() => {
    checkExistingCars();
  }, []);

  // Render form UI
  return (
    <Card className="w-full max-w-4xl mx-auto bg-card relative overflow-hidden">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=1000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }}
      />
      
      {/* Form content */}
      <div className="relative z-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {initialData ? 'Update Car Details' : 'Add New Car'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit} className="space-y-6">
            {submitError && (
              <Alert variant="destructive">
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}
            
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>Make *</FormLabel>
                <FormControl>
                  <Input
                    name="make"
                    value={formState.make}
                    onChange={handleChange}
                    placeholder="e.g., Toyota"
                    className={errors.make ? 'border-red-500' : ''}
                  />
                </FormControl>
                {errors.make && <FormMessage className="text-red-500">{errors.make}</FormMessage>}
              </FormItem>

              <FormItem>
                <FormLabel>Model *</FormLabel>
                <FormControl>
                  <Input
                    name="model"
                    value={formState.model}
                    onChange={handleChange}
                    placeholder="e.g., Camry"
                    className={errors.model ? 'border-red-500' : ''}
                  />
                </FormControl>
                {errors.model && <FormMessage className="text-red-500">{errors.model}</FormMessage>}
              </FormItem>

              <FormItem>
                <FormLabel>Year *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    name="year"
                    value={formState.year}
                    onChange={handleChange}
                    min={1900}
                    max={new Date().getFullYear() + 1}
                    className={errors.year ? 'border-red-500' : ''}
                  />
                </FormControl>
                {errors.year && <FormMessage className="text-red-500">{errors.year}</FormMessage>}
              </FormItem>

              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    name="price"
                    value={formState.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="Enter price"
                    className={errors.price ? 'border-red-500' : ''}
                  />
                </FormControl>
                {errors.price && <FormMessage className="text-red-500">{errors.price}</FormMessage>}
              </FormItem>

              <FormItem>
                <FormLabel>Mileage</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    name="mileage"
                    value={formState.mileage}
                    onChange={handleChange}
                    min="0"
                    placeholder="Enter mileage"
                    className={errors.mileage ? 'border-red-500' : ''}
                  />
                </FormControl>
                {errors.mileage && <FormMessage className="text-red-500">{errors.mileage}</FormMessage>}
              </FormItem>

              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input
                    name="color"
                    value={formState.color}
                    onChange={handleChange}
                    placeholder="Enter color"
                    className={errors.color ? 'border-red-500' : ''}
                  />
                </FormControl>
                {errors.color && <FormMessage className="text-red-500">{errors.color}</FormMessage>}
              </FormItem>
            </div>

            {/* Vehicle Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>VIN</FormLabel>
                <FormControl>
                  <Input
                    name="vin"
                    value={formState.vin}
                    onChange={handleChange}
                    maxLength={17}
                    placeholder="Enter VIN"
                    className={errors.vin ? 'border-red-500' : ''}
                  />
                </FormControl>
                {errors.vin && <FormMessage className="text-red-500">{errors.vin}</FormMessage>}
              </FormItem>

              <FormItem>
                <FormLabel>License Plate</FormLabel>
                <FormControl>
                  <Input
                    name="licensePlate"
                    value={formState.licensePlate}
                    onChange={handleChange}
                    placeholder="Enter license plate"
                    className={errors.licensePlate ? 'border-red-500' : ''}
                  />
                </FormControl>
                {errors.licensePlate && <FormMessage className="text-red-500">{errors.licensePlate}</FormMessage>}
              </FormItem>

              <FormItem>
                <FormLabel>Transmission</FormLabel>
                <FormControl>
                  <select
                    name="transmission"
                    value={formState.transmission}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                    <option value="cvt">CVT</option>
                  </select>
                </FormControl>
                {errors.transmission && <FormMessage>{errors.transmission}</FormMessage>}
              </FormItem>

              <FormItem>
                <FormLabel>Fuel Type</FormLabel>
                <FormControl>
                  <select
                    name="fuelType"
                    value={formState.fuelType}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </FormControl>
                {errors.fuelType && <FormMessage>{errors.fuelType}</FormMessage>}
              </FormItem>
            </div>

            {/* Service Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>Last Service Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    name="lastServiceDate"
                    value={formState.lastServiceDate}
                    onChange={handleChange}
                    className={errors.lastServiceDate ? 'border-red-500' : ''}
                  />
                </FormControl>
                {errors.lastServiceDate && (
                  <FormMessage className="text-red-500">{errors.lastServiceDate}</FormMessage>
                )}
              </FormItem>

              <FormItem>
                <FormLabel>Next Service Due</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    name="nextServiceDue"
                    value={formState.nextServiceDue}
                    onChange={handleChange}
                    className={errors.nextServiceDue ? 'border-red-500' : ''}
                  />
                </FormControl>
                {errors.nextServiceDue && (
                  <FormMessage className="text-red-500">{errors.nextServiceDue}</FormMessage>
                )}
              </FormItem>
            </div>

            {/* Insurance Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormItem>
                <FormLabel>Insurance Provider</FormLabel>
                <FormControl>
                  <Input
                    name="insurance.provider"
                    value={formState.insurance.provider}
                    onChange={handleChange}
                    placeholder="Enter provider name"
                    className={errors['insurance.provider'] ? 'border-red-500' : ''}
                  />
                </FormControl>
                {errors['insurance.provider'] && (
                  <FormMessage className="text-red-500">{errors['insurance.provider']}</FormMessage>
                )}
              </FormItem>

              <FormItem>
                <FormLabel>Policy Number</FormLabel>
                <FormControl>
                  <Input
                    name="insurance.policyNumber"
                    value={formState.insurance.policyNumber}
                    onChange={handleChange}
                    placeholder="Enter policy number"
                    className={errors['insurance.policyNumber'] ? 'border-red-500' : ''}
                  />
                </FormControl>
                {errors['insurance.policyNumber'] && (
                  <FormMessage className="text-red-500">{errors['insurance.policyNumber']}</FormMessage>
                )}
              </FormItem>

              <FormItem>
                <FormLabel>Insurance Expiry</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    name="insurance.expiryDate"
                    value={formState.insurance.expiryDate}
                    onChange={handleChange}
                    className={errors['insurance.expiryDate'] ? 'border-red-500' : ''}
                  />
                </FormControl>
                {errors['insurance.expiryDate'] && (
                  <FormMessage className="text-red-500">{errors['insurance.expiryDate']}</FormMessage>
                )}
              </FormItem>
            </div>

            {/* Image URL */}
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  name="image"
                  value={formState.image}
                  onChange={handleChange}
                  placeholder="Enter URL of vehicle image"
                  className={errors.image ? 'border-red-500' : ''}
                />
              </FormControl>
              {errors.image && <FormMessage className="text-red-500">{errors.image}</FormMessage>}
            </FormItem>

            {/* Notes */}
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <textarea
                  name="notes"
                  value={formState.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter any additional notes about the vehicle"
                  className={`w-full rounded-md border border-input bg-background px-3 py-2 ${
                    errors.notes ? 'border-red-500' : ''
                  }`}
                />
              </FormControl>
              {errors.notes && <FormMessage className="text-red-500">{errors.notes}</FormMessage>}
              <span className="text-sm text-gray-500">
                {formState.notes.length}/1000 characters
              </span>
            </FormItem>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-800 to-orange-500 hover:from-red-900 hover:to-orange-600 text-white transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Saving...</span>
              ) : (
                <span>{initialData ? 'Update Car' : 'Add Car'}</span>
              )}
            </Button>

            {/* Required Fields Note */}
            <p className="text-sm text-gray-500 mt-4">
              * Required fields
            </p>
          </Form>
        </CardContent>
      </div>
    </Card>
  );
};

export default CarForm;