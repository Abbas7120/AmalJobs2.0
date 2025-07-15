// JobPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

import {  trackPageView } from '../lib/analytics';
import { getJobById } from '../lib/database';
import { Job } from '../types';
import Layout from '../components/Layout';
import JobDetailsModal from '../components/JobDetailsModal';
import ShareModal from '../components/ShareModal';

const JobPage: React.FC = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJob = async () => {
      if (!jobId) {
        setError('Job ID not found');
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await getJobById(jobId);
        if (error) throw error;

        if (!data) {
          setError('Job not found');
        } else {
          setJob(data);
          document.title = `${data.title} at ${data.company} - JobBoard`;

          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content',
              `${data.title} position at ${data.company} in ${data.location}. Apply by ${new Date(data.deadline).toLocaleDateString()}.`
            );
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load job');
      } finally {
        setIsLoading(false);
      }
    };

    loadJob();
    trackPageView(`job-${jobId}`);
  }, [jobId]);

  const navigate = useNavigate();
  const handleGoBack = () => {
   navigate('/'); };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading job details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !job) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The job you\'re looking for doesn\'t exist or has been removed.'}</p>
          <button
            onClick={handleGoBack}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Go Back to Jobs
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <JobDetailsModal
          isOpen={true}
          onClose={handleGoBack}
          job={job}
          onShare={() => setIsShareModalOpen(true)}
          isStandalone={true}
        />

        <div className="mt-8 text-center">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back to Jobs
          </button>
        </div>
      </div>

      {isShareModalOpen && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          job={job}
        />
      )}
    </Layout>
  );
};

export default JobPage;
