import React from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';

interface SearchFiltersProps {
  searchTerm: string;
  location: string;
  jobType: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onJobTypeChange: (value: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  location,
  jobType,
  onSearchChange,
  onLocationChange,
  onJobTypeChange
}) => {
  return (
<<<<<<< HEAD
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
=======
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
>>>>>>> Improvement
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs, companies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
<<<<<<< HEAD
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
=======
            className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>>>>>>> Improvement
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Location..."
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
<<<<<<< HEAD
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
=======
            className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative sm:col-span-2 lg:col-span-1">
>>>>>>> Improvement
          <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <select
            value={jobType}
            onChange={(e) => onJobTypeChange(e.target.value)}
<<<<<<< HEAD
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
=======
            className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
>>>>>>> Improvement
          >
            <option value="">All Job Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;