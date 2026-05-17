-- Add member_id, expiry_date, and avatar_url to memberships table
ALTER TABLE memberships ADD COLUMN IF NOT EXISTS member_id text;
ALTER TABLE memberships ADD COLUMN IF NOT EXISTS expiry_date timestamptz;
ALTER TABLE memberships ADD COLUMN IF NOT EXISTS avatar_url text;

-- Safely define UPDATE and DELETE policies for memberships
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'memberships' AND policyname = 'Authenticated users can update memberships'
    ) THEN
        CREATE POLICY "Authenticated users can update memberships"
            ON public.memberships
            FOR UPDATE
            TO authenticated
            USING (true)
            WITH CHECK (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'memberships' AND policyname = 'Authenticated users can delete memberships'
    ) THEN
        CREATE POLICY "Authenticated users can delete memberships"
            ON public.memberships
            FOR DELETE
            TO authenticated
            USING (true);
    END IF;
END
$$;

