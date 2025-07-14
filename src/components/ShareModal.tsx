import React, { useState } from 'react';
import { X, Twitter, Linkedin, Facebook, Mail, Copy, Check } from 'lucide-react';
import { Job } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, job }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate a proper job URL - using current page with job info in hash for now
  const jobUrl = `${window.location.origin}#job-${job.id}`;
  const shareTitle = `${job.title} at ${job.company}`;
  const shareMessage = `Check out this ${job.title} opportunity at ${job.company}! Apply by ${new Date(job.deadline).toLocaleDateString()}.`;
  const fullShareMessage = `${shareMessage} ${jobUrl}`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullShareMessage)}&hashtags=jobs,careers`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareMessage)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}&quote=${encodeURIComponent(shareMessage)}`,
    email: `mailto:?subject=${encodeURIComponent(`Job Opportunity: ${shareTitle}`)}&body=${encodeURIComponent(fullShareMessage)}`
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(jobUrl);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = jobUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Show user-friendly error
      alert('Unable to copy link. Please copy the URL manually from your browser.');
    }
  };

  const handleShare = (platform: string) => {
    if (platform === 'copy') {
      handleCopyLink();
    } else {
      const url = shareLinks[platform as keyof typeof shareLinks];
      if (url) {
        window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
      }
    }
  };

  // Handle native Web Share API if available
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareMessage,
          url: jobUrl,
        });
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Share Job</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Share this job opportunity:</p>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-900">{job.title}</p>
            <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
            <p className="text-xs text-gray-500 mt-1">Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Native Share API (mobile devices) */}
          {navigator.share && (
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="text-sm font-medium">Share</span>
            </button>
          )}

          {/* Social Media Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Twitter className="h-5 w-5 text-blue-500" />
              <span className="text-sm">Twitter</span>
            </button>

            <button
              onClick={() => handleShare('linkedin')}
              className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Linkedin className="h-5 w-5 text-blue-600" />
              <span className="text-sm">LinkedIn</span>
            </button>

            <button
              onClick={() => handleShare('facebook')}
              className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Facebook className="h-5 w-5 text-blue-700" />
              <span className="text-sm">Facebook</span>
            </button>

            <button
              onClick={() => handleShare('email')}
              className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Mail className="h-5 w-5 text-gray-600" />
              <span className="text-sm">Email</span>
            </button>
          </div>

          {/* Copy Link Button */}
          <button
            onClick={() => handleShare('copy')}
            className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200 ${
              copied 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-5 w-5" />
                <span className="text-sm font-medium">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" />
                <span className="text-sm font-medium">Copy Link</span>
              </>
            )}
          </button>

          {/* URL Display */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Job URL:</p>
            <p className="text-xs text-gray-700 break-all font-mono">{jobUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;