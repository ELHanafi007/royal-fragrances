import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.replace(/\s/g, '');

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window === 'undefined') {
    throw new Error("❌ DATABASE ERROR: NEXT_PUBLIC_SUPABASE_URL or ANON_KEY is missing in Vercel environment variables.");
  }
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);
