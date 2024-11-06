import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const handleAuthChange = async (event, session) => {
      if (event === 'SIGNED_IN' && session && mounted) {
        const userData = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
        };
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/', { replace: true });
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Verifying...</h2>
        <p>Please wait while we verify your authentication.</p>
      </div>
    </div>
  );
}

export default AuthCallback; 