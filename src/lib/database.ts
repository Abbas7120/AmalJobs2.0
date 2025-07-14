import { supabase } from './supabase';
import { Job } from '../types';

export const getJobs = async (category?: string, searchTerm?: string, location?: string, jobType?: string) => {
  let query = supabase
    .from('jobs')
    .select('*')
    .eq('status', 'active')
    .order('posted_date', { ascending: false });

  if (category && category !== 'All') {
    query = query.eq('category', category);
  }

  if (searchTerm) {
    query = query.or(`title.ilike.%${searchTerm}%,company.ilike.%${searchTerm}%`);
  }

  if (location) {
    query = query.ilike('location', `%${location}%`);
  }

  if (jobType) {
    query = query.ilike('type', `%${jobType}%`);
  }

  const { data, error } = await query;
  return { data, error };
};

export const getJobById = async (id: string) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
};

export const createJob = async (job: Omit<Job, 'id' | 'posted_date'>) => {
  // Ensure status is always 'active' for new jobs
  const jobData = {
    ...job,
    status: 'active',
    posted_date: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('jobs')
    .insert([jobData])
    .select()
    .single();
  
  return { data, error };
};

export const updateJob = async (id: string, job: Partial<Job>) => {
  const { data, error } = await supabase
    .from('jobs')
    .update(job)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

export const deleteJob = async (id: string) => {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);
  
  return { error };
};

export const markExpiredJobs = async () => {
  const today = new Date().toISOString().split('T')[0];
  
  const { error } = await supabase
    .from('jobs')
    .update({ status: 'expired' })
    .lt('deadline', today)
    .eq('status', 'active');
  
  return { error };
};