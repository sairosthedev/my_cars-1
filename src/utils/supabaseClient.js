import { createClient } from '@supabase/supabase-js';
import { authConfig } from './authConfig';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  authConfig
); 