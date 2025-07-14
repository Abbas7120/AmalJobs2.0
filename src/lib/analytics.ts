import { supabase } from './supabase';

// Generate a unique visitor ID
const generateVisitorId = (): string => {
  let visitorId = localStorage.getItem('visitor_id');
  
  if (!visitorId) {
    visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('visitor_id', visitorId);
  }
  
  return visitorId;
};

// Record visitor activity
export const recordVisitorActivity = async () => {
  try {
    const visitorId = generateVisitorId();
    const userAgent = navigator.userAgent;
    
    // Call the Supabase function to record visitor activity
    const { error } = await supabase.rpc('record_visitor_activity', {
      p_visitor_id: visitorId,
      p_user_agent: userAgent
    });
    
    if (error) {
      console.error('Error recording visitor activity:', error);
    }
  } catch (error) {
    console.error('Error in recordVisitorActivity:', error);
  }
};

// Get unique visitor count
export const getUniqueVisitorCount = async (): Promise<number> => {
  try {
    const { data, error } = await supabase.rpc('get_unique_visitor_count');
    
    if (error) {
      console.error('Error getting visitor count:', error);
      return 0;
    }
    
    return data || 0;
  } catch (error) {
    console.error('Error in getUniqueVisitorCount:', error);
    return 0;
  }
};

// Track page view (can be extended for more detailed analytics)
export const trackPageView = (page: string) => {
  try {
    // Record basic page view
    recordVisitorActivity();
    
    // You can extend this to track specific pages, time spent, etc.
    console.log(`Page view tracked: ${page}`);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};