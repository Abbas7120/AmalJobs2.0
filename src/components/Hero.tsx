import React from 'react';
<<<<<<< HEAD
import { Search, TrendingUp, Users, MapPin } from 'lucide-react';
=======
import { Search, TrendingUp, Users } from 'lucide-react';
>>>>>>> Improvement

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 mb-8 rounded-lg">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your Dream Job or Internship
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          Discover opportunities in Tech, Government, and beyond
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="flex flex-col items-center">
            <div className="bg-white bg-opacity-20 rounded-full p-4 mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Search</h3>
            <p className="text-blue-100">Filter by category, location, and job type</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-white bg-opacity-20 rounded-full p-4 mb-4">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Latest Opportunities</h3>
            <p className="text-blue-100">Fresh job postings updated daily</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-white bg-opacity-20 rounded-full p-4 mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Top Companies</h3>
            <p className="text-blue-100">Connect with leading employers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;