import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/signin', { replace: true });
        }
        setChecked(true);
      } catch (error) {
        console.error('Auth check error:', error);
        navigate('/signin', { replace: true });
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute; 