import React, { useState } from 'react';
import { ExternalLink, Share2, MapPin, Clock, Building2, Calendar, Eye } from 'lucide-react';
import { Job } from '../types';
import ShareModal from './ShareModal';
import JobDetailsModal from './JobDetailsModal';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const isExpired = new Date(job.deadline) < new Date();
  const deadlineDate = new Date(job.deadline).toLocaleDateString();

  const handleApplyClick = () => {
    window.open(job.application_link, '_blank');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tech':
        return 'bg-blue-100 text-blue-800';
      case 'Government':
        return 'bg-green-100 text-green-800';
      case 'Non-Tech':
        return 'bg-purple-100 text-purple-800';
      case 'Internship':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div 
        data-job-id={job.id}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-200"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-4">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{job.title}</h3>
              {job.featured && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{job.type}</span>
              </div>
            </div>
          </div>
          <span className={`self-start sm:self-auto px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(job.category)}`}>
            {job.category}
          </span>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-3">
          {job.description}
        </p>
        
        <button
          onClick={() => setIsDetailsModalOpen(true)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 flex items-center gap-1 transition-colors duration-200 w-full sm:w-auto justify-center sm:justify-start"
        >
          <Eye className="h-4 w-4" />
          View Full Details
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleApplyClick}
              disabled={isExpired}
              className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                isExpired
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <ExternalLink className="h-4 w-4" />
              Apply Now
            </button>
            
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <button
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors duration-200 ${
                isExpired
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
              disabled={isExpired}
            >
              {isExpired ? 'Expired' : `Deadline: ${deadlineDate}`}
            </button>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        job={job}
      />
      
      <JobDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        job={job}
        onShare={() => {
          setIsDetailsModalOpen(false);
          setIsShareModalOpen(true);
        }}
      />
    </>
  );
};

export default JobCard;