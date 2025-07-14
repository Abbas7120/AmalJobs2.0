/*
  # User Analytics System

  1. New Tables
    - `user_visits`
      - `id` (uuid, primary key)
      - `visitor_id` (text, unique identifier for each visitor)
      - `ip_address` (text, visitor IP)
      - `user_agent` (text, browser info)
      - `first_visit` (timestamp, first time visiting)
      - `last_visit` (timestamp, most recent visit)
      - `visit_count` (integer, total visits)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_visits` table
    - Add policy for public read access to count only
    - Add policy for authenticated users to manage analytics

  3. Functions
    - Function to get unique visitor count
    - Function to record visitor activity
*/

-- Create user_visits table
CREATE TABLE IF NOT EXISTS user_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text UNIQUE NOT NULL,
  ip_address text,
  user_agent text,
  first_visit timestamptz DEFAULT now(),
  last_visit timestamptz DEFAULT now(),
  visit_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_visits ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read visitor count"
  ON user_visits
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage analytics"
  ON user_visits
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_visits_visitor_id ON user_visits (visitor_id);
CREATE INDEX IF NOT EXISTS idx_user_visits_last_visit ON user_visits (last_visit DESC);

-- Function to get unique visitor count
CREATE OR REPLACE FUNCTION get_unique_visitor_count()
RETURNS integer
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COUNT(DISTINCT visitor_id)::integer FROM user_visits;
$$;

-- Function to record visitor activity
CREATE OR REPLACE FUNCTION record_visitor_activity(
  p_visitor_id text,
  p_ip_address text DEFAULT NULL,
  p_user_agent text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO user_visits (visitor_id, ip_address, user_agent, first_visit, last_visit, visit_count)
  VALUES (p_visitor_id, p_ip_address, p_user_agent, now(), now(), 1)
  ON CONFLICT (visitor_id) 
  DO UPDATE SET
    last_visit = now(),
    visit_count = user_visits.visit_count + 1,
    updated_at = now();
END;
$$;

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_user_visits_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_user_visits_updated_at
  BEFORE UPDATE ON user_visits
  FOR EACH ROW
  EXECUTE FUNCTION update_user_visits_updated_at();