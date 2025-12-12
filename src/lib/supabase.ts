import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type News = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  author: string;
  published_date: string;
  created_at: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  short_description?: string;
  event_date: string;
  location: string;
  image_url: string | null;
  created_at: string;
};

export type Fixture = {
  id: string;
  home_team: string;
  away_team: string;
  match_date: string;
  venue: string;
  competition: string;
  home_score: number | null;
  away_score: number | null;
  home_team_logo: string;
  away_team_logo: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  created_at: string;
};

export type Player = {
  id: string;
  name: string;
  position: string;
  jersey_number: number | null;
  photo_url: string | null;
  bio: string | null;
  team: string;
  created_at: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
  caption: string | null;
  category: string;
  created_at: string;
};

export type Sponsor = {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  display_order: number;
  created_at: string;
};

export type Membership = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  membership_type: string;
  emergency_contact: string;
  emergency_phone: string;
  status: 'pending' | 'active' | 'expired';
  created_at: string;
};
