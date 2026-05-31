-- Create sponsor registrations table
CREATE TABLE IF NOT EXISTS public.sponsor_registrations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    company_name text NOT NULL,
    contact_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    tier text NOT NULL,
    message text,
    status text NOT NULL DEFAULT 'pending',
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.sponsor_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit sponsor registration"
    ON public.sponsor_registrations
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view sponsor registrations"
    ON public.sponsor_registrations
    FOR SELECT
    TO authenticated
    USING (true);
