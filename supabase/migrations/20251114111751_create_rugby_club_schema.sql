/*
  # Dubai Tuskers RFC Website Schema

  1. New Tables
    - `news`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `excerpt` (text)
      - `image_url` (text, optional)
      - `author` (text)
      - `published_date` (timestamptz)
      - `created_at` (timestamptz)
    
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `event_date` (timestamptz)
      - `location` (text)
      - `image_url` (text, optional)
      - `created_at` (timestamptz)
    
    - `fixtures`
      - `id` (uuid, primary key)
      - `home_team` (text)
      - `away_team` (text)
      - `match_date` (timestamptz)
      - `venue` (text)
      - `competition` (text)
      - `home_score` (integer, optional)
      - `away_score` (integer, optional)
      - `status` (text) - 'upcoming', 'completed', 'cancelled'
      - `created_at` (timestamptz)
    
    - `players`
      - `id` (uuid, primary key)
      - `name` (text)
      - `position` (text)
      - `jersey_number` (integer)
      - `photo_url` (text, optional)
      - `bio` (text, optional)
      - `team` (text) - 'senior', 'development', etc.
      - `created_at` (timestamptz)
    
    - `gallery`
      - `id` (uuid, primary key)
      - `title` (text)
      - `image_url` (text)
      - `caption` (text, optional)
      - `category` (text)
      - `created_at` (timestamptz)
    
    - `sponsors`
      - `id` (uuid, primary key)
      - `name` (text)
      - `logo_url` (text)
      - `website_url` (text, optional)
      - `tier` (text) - 'platinum', 'gold', 'silver', 'bronze'
      - `display_order` (integer)
      - `created_at` (timestamptz)
    
    - `memberships`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `membership_type` (text)
      - `emergency_contact` (text)
      - `emergency_phone` (text)
      - `status` (text) - 'pending', 'active', 'expired'
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin write access
*/

CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  image_url text,
  author text NOT NULL,
  published_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  location text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fixtures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  home_team text NOT NULL,
  away_team text NOT NULL,
  match_date timestamptz NOT NULL,
  venue text NOT NULL,
  competition text NOT NULL,
  home_score integer,
  away_score integer,
  status text NOT NULL DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  jersey_number integer,
  photo_url text,
  bio text,
  team text NOT NULL DEFAULT 'senior',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  caption text,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sponsors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  website_url text,
  tier text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  membership_type text NOT NULL,
  emergency_contact text NOT NULL,
  emergency_phone text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE fixtures ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view news"
  ON news FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view fixtures"
  ON fixtures FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view players"
  ON players FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view gallery"
  ON gallery FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view sponsors"
  ON sponsors FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can submit membership"
  ON memberships FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view memberships"
  ON memberships FOR SELECT
  TO authenticated
  USING (true);