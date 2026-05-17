-- Add member_id, expiry_date, and avatar_url to memberships table
ALTER TABLE memberships ADD COLUMN IF NOT EXISTS member_id text;
ALTER TABLE memberships ADD COLUMN IF NOT EXISTS expiry_date timestamptz;
ALTER TABLE memberships ADD COLUMN IF NOT EXISTS avatar_url text;
