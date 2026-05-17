-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    price numeric NOT NULL,
    image_url text,
    tag text,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow anonymous read access to products"
    ON public.products
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow authenticated users to insert products"
    ON public.products
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update products"
    ON public.products
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete products"
    ON public.products
    FOR DELETE
    TO authenticated
    USING (true);

-- Insert sample products if table is empty
INSERT INTO public.products (name, price, image_url, tag)
SELECT '2026 Home Jersey', 250.00, 'assets/15s.webp', 'NEW'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = '2026 Home Jersey');

INSERT INTO public.products (name, price, image_url, tag)
SELECT '7s Tournament Kit', 180.00, 'assets/7s.webp', 'HOT'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = '7s Tournament Kit');

INSERT INTO public.products (name, price, image_url, tag)
SELECT 'Tuskers Training Singlet', 120.00, 'assets/stash.jpeg', 'LIMITED'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = 'Tuskers Training Singlet');

INSERT INTO public.products (name, price, image_url, tag)
SELECT 'Official Club Hoodie', 290.00, 'assets/logo-full.webp', 'SALE'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = 'Official Club Hoodie');

