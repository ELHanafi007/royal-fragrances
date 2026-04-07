-- SUPABASE COMPREHENSIVE SETUP SCRIPT
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-----------------------------------------------------------
-- 1. STORAGE SETUP (Fixes the "RLS Policy" upload error)
-----------------------------------------------------------

-- Create the 'products' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to the 'products' bucket
CREATE POLICY "Public Read Access" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'products');

-- Allow anonymous uploads to the 'products' bucket
CREATE POLICY "Anon Insert Access" ON storage.objects
FOR INSERT TO anon
WITH CHECK (bucket_id = 'products');

-- Allow anonymous update/delete (for admin use via anon key)
CREATE POLICY "Anon Update Access" ON storage.objects
FOR UPDATE TO anon
USING (bucket_id = 'products');

CREATE POLICY "Anon Delete Access" ON storage.objects
FOR DELETE TO anon
USING (bucket_id = 'products');


-----------------------------------------------------------
-- 2. TABLE SETUP & RLS (Ensures tables work with 'anon' key)
-----------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- PRODUCTS: Allow public read and admin write (via anon key)
CREATE POLICY "Enable all for anon" ON public.products FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Enable read for public" ON public.products FOR SELECT TO public USING (true);

-- CATEGORIES: Allow all for anon
CREATE POLICY "Enable all for anon" ON public.categories FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Enable read for public" ON public.categories FOR SELECT TO public USING (true);

-- BRANDS: Allow all for anon
CREATE POLICY "Enable all for anon" ON public.brands FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Enable read for public" ON public.brands FOR SELECT TO public USING (true);

-- PACKS: Allow all for anon
CREATE POLICY "Enable all for anon" ON public.packs FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Enable read for public" ON public.packs FOR SELECT TO public USING (true);

-- ORDERS: Allow all for anon (Crucial for public to place orders and admin to manage them)
CREATE POLICY "Enable all for anon" ON public.orders FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Enable read for public" ON public.orders FOR SELECT TO public USING (true);

-----------------------------------------------------------
-- NOTE: Using 'anon' for ALL access is convenient for prototyping 
-- but you should consider Supabase Auth for a production admin dashboard.
-----------------------------------------------------------
