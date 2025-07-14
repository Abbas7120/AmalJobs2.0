/*
  # Create automatic job expiration function

  1. Functions
    - `mark_expired_jobs()` - Marks jobs as expired when deadline passes
    - `check_job_expiration()` - Trigger function to check expiration on insert/update

  2. Triggers
    - Automatically check expiration when jobs are inserted or updated

  3. Scheduled Function
    - Daily job to mark expired jobs (to be set up in Supabase dashboard)
*/

-- Function to mark jobs as expired when deadline passes
CREATE OR REPLACE FUNCTION mark_expired_jobs()
RETURNS INTEGER AS $$
DECLARE
  expired_count INTEGER;
BEGIN
  UPDATE jobs 
  SET status = 'expired', updated_at = now()
  WHERE deadline < CURRENT_DATE 
    AND status = 'active';
  
  GET DIAGNOSTICS expired_count = ROW_COUNT;
  
  RETURN expired_count;
END;
$$ LANGUAGE plpgsql;

-- Function to check job expiration on insert/update
CREATE OR REPLACE FUNCTION check_job_expiration()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.deadline < CURRENT_DATE THEN
    NEW.status = 'expired';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically check expiration
CREATE TRIGGER check_job_expiration_trigger
  BEFORE INSERT OR UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION check_job_expiration();

-- Create a function that can be called via Edge Functions or cron
CREATE OR REPLACE FUNCTION expire_old_jobs()
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  WITH expired_jobs AS (
    UPDATE jobs 
    SET status = 'expired', updated_at = now()
    WHERE deadline < CURRENT_DATE 
      AND status = 'active'
    RETURNING id, title, company, deadline
  )
  SELECT json_build_object(
    'success', true,
    'expired_count', (SELECT COUNT(*) FROM expired_jobs),
    'expired_jobs', json_agg(expired_jobs.*)
  ) INTO result FROM expired_jobs;
  
  RETURN COALESCE(result, '{"success": true, "expired_count": 0, "expired_jobs": []}'::json);
END;
$$ LANGUAGE plpgsql;