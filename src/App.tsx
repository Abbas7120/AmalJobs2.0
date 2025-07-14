import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { recordVisitorActivity, trackPageView } from './lib/analytics';
import Layout from './components/Layout';
import Hero from './components/Hero';
import JobListings from './components/JobListings';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

function App() {
  const [activeSection, setActiveSection] = useState('All');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Record visitor activity on app load
    recordVisitorActivity();
    trackPageView('homepage');

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Handle job sharing URLs with hash
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#job-')) {
        const jobId = hash.replace('#job-', '');
        // Scroll to job card if it exists on the page
        setTimeout(() => {
          const jobElement = document.querySelector(`[data-job-id="${jobId}"]`);
          if (jobElement) {
            jobElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            jobElement.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
            setTimeout(() => {
              jobElement.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
            }, 3000);
          }
        }, 500);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on initial load

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleLogin = () => {
    // Refresh user state after login
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={
          user ? (
            <AdminPanel onLogout={handleLogout} />
          ) : (
            <AdminLogin onLogin={handleLogin} />
          )
        } />
        <Route path="/" element={
          <Layout activeSection={activeSection} onSectionChange={setActiveSection}>
            <Hero />
            <JobListings activeSection={activeSection} />
          </Layout>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;