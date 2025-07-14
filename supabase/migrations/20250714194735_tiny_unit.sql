/*
  # Fix status constraint issue

  1. Updates
    - Ensure proper default values for status field
    - Fix any existing invalid status values
    - Update constraint to be more flexible

  2. Changes
    - Set default status to 'active'
    - Update any null or invalid status values
    - Ensure constraint allows proper values
*/

-- First, update any existing jobs with invalid status
UPDATE jobs 
SET status = 'active' 
WHERE status IS NULL OR status NOT IN ('active', 'expired');

-- Ensure the status column has a proper default
ALTER TABLE jobs 
ALTER COLUMN status SET DEFAULT 'active';

-- Make sure the status column is not nullable
ALTER TABLE jobs 
ALTER COLUMN status SET NOT NULL;

-- Recreate the constraint to ensure it's properly defined
ALTER TABLE jobs 
DROP CONSTRAINT IF EXISTS jobs_status_check;

ALTER TABLE jobs 
ADD CONSTRAINT jobs_status_check 
CHECK (status IN ('active', 'expired'));