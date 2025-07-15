<<<<<<< HEAD
import React from 'react';
import {  Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getUniqueVisitorCount } from '../lib/analytics';

=======
import React, { useState,useEffect } from 'react';

import { getUniqueVisitorCount} from '../lib/analytics';
>>>>>>> Improvement
interface LayoutProps {
  children: React.ReactNode;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
<<<<<<< HEAD
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, onSectionChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    const loadVisitorCount = async () => {
      const count = await getUniqueVisitorCount();
      setVisitorCount(count);
    };
    
    loadVisitorCount();
    
    // Update visitor count every 30 seconds
    const interval = setInterval(loadVisitorCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const sections = [
    { id: 'All', label: 'All Jobs' },
    { id: 'Tech', label: 'Tech' },
    { id: 'Government', label: 'Government' },
    { id: 'Non-Tech', label: 'Non-Tech' },
    { id: 'Internship', label: 'Internship' }
  ];

  const handleSectionClick = (sectionId: string) => {
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
=======
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
>>>>>>> Improvement
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
<<<<<<< HEAD
             {/*<Briefcase className="h-8 w-8 text-blue-600" />*/} 
            
  <img  src="/AmalJobs.png"  alt="AmalJobs Logo" className="h-20 w-auto"/>
 <h1 className="ml-2 text-xl font-bold text-gray-900">AmalJobs</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === section.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    activeSection === section.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
=======
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
>>>>>>> Improvement

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
<<<<<<< HEAD
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left text-gray-500 text-sm">
              © 2025 AmalJobs. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>
                  <span className="font-medium text-gray-700">{visitorCount.toLocaleString()}</span> unique visitors
                </span>
              </div>
              
              <div className="hidden md:block w-px h-4 bg-gray-300"></div>
              
              <div className="text-xs text-gray-400">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
=======
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 AmalJobs. Find your dream job or internship.</p>
           <p className='text-sm text-gray-500 mt-2'>Unique visitor count: {visitorCount}</p>
>>>>>>> Improvement
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;