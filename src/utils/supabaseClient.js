import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing Supabase URL. Check VITE_SUPABASE_URL in your environment variables.');
}

if (!supabaseAnonKey) {
  throw new Error('Missing Supabase Anon Key. Check VITE_SUPABASE_ANON_KEY in your environment variables.');
}

try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(`Invalid Supabase URL format: ${supabaseUrl}`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('Supabase Configuration:', {
  url: supabaseUrl,
  keyPrefix: supabaseAnonKey?.substring(0, 5) + '...',
  isUrlValid: Boolean(supabaseUrl),
  isKeyValid: Boolean(supabaseAnonKey)
});