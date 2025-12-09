import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Client for all operations (uses anon key only - service role key cannot be used in browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Simple admin credentials check (client-side)
export const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

