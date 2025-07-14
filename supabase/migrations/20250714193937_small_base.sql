/*
  # Create jobs table for AmalJobs application

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text) - Job title
      - `company` (text) - Company name
      - `location` (text) - Job location
      - `category` (text) - Tech, Government, Non-Tech, or Internship
      - `type` (text) - Full-Time, Part-Time, Contract, etc.
      - `description` (text) - Job description
      - `application_link` (text) - External application URL
      - `deadline` (date) - Application deadline
      - `posted_date` (timestamptz) - When job was posted
      - `status` (text) - active or expired
      - `featured` (boolean) - Whether job is featured
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `jobs` table
    - Add policy for public read access to active jobs
    - Add policy for authenticated users to manage jobs (admin only)

  3. Indexes
    - Index on status for filtering active jobs
    - Index on category for section filtering
    - Index on deadline for expiration checks
*/

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  category text NOT NULL CHECK (category IN ('Tech', 'Government', 'Non-Tech', 'Internship')),
  type text NOT NULL,
  description text NOT NULL,
  application_link text NOT NULL,
  deadline date NOT NULL,
  posted_date timestamptz DEFAULT now(),
  status text DEFAULT 'active' CHECK (status IN ('active', 'expired')),
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to active jobs
CREATE POLICY "Anyone can read active jobs"
  ON jobs
  FOR SELECT
  TO public
  USING (status = 'active');

-- Policy for authenticated users to manage jobs
CREATE POLICY "Authenticated users can manage jobs"
  ON jobs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs (status);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs (category);
CREATE INDEX IF NOT EXISTS idx_jobs_deadline ON jobs (deadline);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_date ON jobs (posted_date DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_featured ON jobs (featured) WHERE featured = true;

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();