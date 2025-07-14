import React, { useState, useEffect } from 'react';
import { getJobs, markExpiredJobs } from '../lib/database';
import { Job } from '../types';
import JobCard from './JobCard';
import SearchFilters from './SearchFilters';
import { AlertCircle } from 'lucide-react';

interface JobListingsProps {
  activeSection: string;
}

const JobListings: React.FC<JobListingsProps> = ({ activeSection }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');

  useEffect(() => {
    loadJobs();
    markExpiredJobs();
  }, [activeSection, searchTerm, location, jobType]);

  const loadJobs = async () => {
    try {
      const category = activeSection === 'All' ? undefined : activeSection;
      const { data, error } = await getJobs(category, searchTerm, location, jobType);
      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'All':
        return 'All Jobs';
      case 'Tech':
        return 'Tech Jobs';
      case 'Government':
        return 'Government Jobs';
      case 'Non-Tech':
        return 'Non-Tech Jobs';
      case 'Internship':
        return 'Internship Opportunities';
      default:
        return 'Jobs';
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case 'All':
        return 'Browse all available job opportunities across all categories';
      case 'Tech':
        return 'Discover the latest opportunities in technology and software development';
      case 'Government':
        return 'Explore career opportunities in the public sector';
      case 'Non-Tech':
        return 'Find roles in marketing, sales, operations, and other non-technical fields';
      case 'Internship':
        return 'Launch your career with internship opportunities across all industries';
      default:
        return 'Find your next career opportunity';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{getSectionTitle()}</h2>
        <p className="text-gray-600 mb-4">{getSectionDescription()}</p>
        <div className="text-sm text-gray-500">
          {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
        </div>
      </div>

      <SearchFilters
        searchTerm={searchTerm}
        location={location}
        jobType={jobType}
        onSearchChange={setSearchTerm}
        onLocationChange={setLocation}
        onJobTypeChange={setJobType}
      />

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">
            Try adjusting your search filters or check back later for new opportunities.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListings;