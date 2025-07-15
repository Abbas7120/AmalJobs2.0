import React from 'react';
import { X, ExternalLink, MapPin, Clock, Building2, Calendar, Share2 } from 'lucide-react';
import { Job } from '../types';

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
  onShare: () => void;

  isStandalone?: boolean;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ isOpen, onClose, job, onShare, isStandalone = false }) => {

  if (!isOpen) return null;

  const isExpired = new Date(job.deadline) < new Date();
  const deadlineDate = new Date(job.deadline).toLocaleDateString();
  const postedDate = new Date(job.posted_date).toLocaleDateString();

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

    <div className={`${isStandalone ? 'relative' : 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'} p-4`} onClick={isStandalone ? undefined : onClose}>
      <div 
        className={`bg-white rounded-lg max-w-4xl w-full ${isStandalone ? '' : 'max-h-[90vh] overflow-y-auto'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`${isStandalone ? '' : 'sticky top-0'} bg-white border-b border-gray-200 p-4 md:p-6 rounded-t-lg`}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">{job.title}</h2>

                {job.featured && (
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(job.category)}`}>
                  {job.category}
                </span>
              </div>
              

              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm md:text-base text-gray-600 mb-4">

                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Posted: {postedDate}</span>
                </div>
              </div>


              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={handleApplyClick}
                  disabled={isExpired}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${

                    isExpired
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <ExternalLink className="h-5 w-5" />
                  Apply Now
                </button>
                
                <button
                  onClick={onShare}

                  className="px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"

                >
                  <Share2 className="h-5 w-5" />
                  Share
                </button>

                <button

                  className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-sm transition-colors duration-200 ${

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


          
           {!isStandalone && <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 ml-4"
            >
              <X className="h-6 w-6" />
            </button>}
          </div>
        </div>

        {/* Content */}

        <div className="p-4 md:p-6">

          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h3>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </div>
          </div>

          {/* Application Link Section */}

          <div className="mt-6 md:mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">

            <h4 className="font-semibold text-blue-900 mb-2">Ready to Apply?</h4>
            <p className="text-blue-800 text-sm mb-3">
              Click the button below to visit the company's application page and submit your application.
            </p>
            <button
              onClick={handleApplyClick}
              disabled={isExpired}

              className={`w-full sm:w-auto px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
isExpired
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <ExternalLink className="h-4 w-4" />
              {isExpired ? 'Application Closed' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;