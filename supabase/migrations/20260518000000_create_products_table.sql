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
