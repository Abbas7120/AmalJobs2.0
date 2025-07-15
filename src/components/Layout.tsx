
import React, { useState,useEffect } from 'react';

import { getUniqueVisitorCount} from '../lib/analytics';

interface LayoutProps {
  children: React.ReactNode;
  activeSection?: string;
  onSectionChange?: (section: string) => void;

  showNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeSection = 'All', 
  onSectionChange,
  showNavigation = false 
}) => {
  const sections = ['All', 'Tech', 'Government', 'Non-Tech', 'Internship'];

const [visitorCount, setVisitorCount] = useState<number | null>(null);

 useEffect(()=>{getUniqueVisitorCount().then(setVisitorCount)},[])
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
               <img src="/AmalJobs.png" className='h-20 w-auto' alt="logo" />
                <span className="text-xl font-bold">AmalJobs</span>
              </button>
            </div>

            {/* Navigation - Only show on homepage */}
            {showNavigation && onSectionChange && (
              <nav className="hidden md:flex space-x-8">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => onSectionChange(section)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeSection === section
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </nav>
            )}

            {/* Mobile menu button - Only show on homepage */}
            {showNavigation && onSectionChange && (
              <div className="md:hidden">
                <select
                  value={activeSection}
                  onChange={(e) => onSectionChange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {sections.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}


      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 AmalJobs. Find your dream job or internship.</p>
           <p className='text-sm text-gray-500 mt-2'>Unique visitor count: {visitorCount}</p>

          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;