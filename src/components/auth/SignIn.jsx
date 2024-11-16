import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiSteeringWheel } from 'react-icons/gi';
import { supabase } from '../../utils/supabaseClient';
import revSound from '../../assets/rev.mp3';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const revAudio = new Audio(revSound);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error: signinError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signinError) throw signinError;

      if (data?.user) {
        revAudio.play();
        const userData = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name || email.split('@')[0],
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      } else {
        setError('Invalid login credentials');
      }
    } catch (error) {
      setError(error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="w-full relative z-10">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <GiSteeringWheel className="text-4xl text-gold-400" />
            <span className="text-2xl font-bold text-white drop-shadow-lg font-playfair">
              Auto<span className="text-gold-400">Track</span>
            </span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white drop-shadow-lg">
          Sign in to your account
        </h2>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 border-t-4 border-navy-600">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-500 text-red-500 px-4 py-3 rounded relative">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy-600 focus:border-navy-600 font-inter"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-navy-600 focus:border-navy-600 font-inter"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-red-800 focus:ring-red-800 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-red-800 hover:text-red-900">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-navy-800 to-navy-600 hover:from-navy-900 hover:to-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-600 font-inter"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/signup"
                  className="w-full flex justify-center py-2 px-4 border border-red-800 rounded-md shadow-sm text-sm font-medium text-red-800 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800"
                >
                  Create new account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;