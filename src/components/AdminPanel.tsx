import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, LogOut, Eye } from 'lucide-react';
import { getJobs, deleteJob, markExpiredJobs } from '../lib/database';
import { signOut } from '../lib/supabase';
import { Job } from '../types';
import JobForm from './JobForm';

interface AdminPanelProps {
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  useEffect(() => {
    loadJobs();
    markExpiredJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const { data, error } = await getJobs();
      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        const { error } = await deleteJob(id);
        if (error) throw error;
        loadJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleJobFormClose = () => {
    setShowJobForm(false);
    setEditingJob(null);
    loadJobs();
  };

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowJobForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Job
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.location}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {job.status}
                </span>
              </div>

              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  {job.category}
                </span>
                <span className="ml-2 text-sm text-gray-500">{job.type}</span>
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                {job.description}
              </p>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Deadline: {new Date(job.deadline).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditJob(job)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-12">
            <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Start by creating your first job posting.</p>
          </div>
        )}
      </div>

      {showJobForm && (
        <JobForm
          job={editingJob}
          onClose={handleJobFormClose}
        />
      )}
    </div>
  );
};

export default AdminPanel;