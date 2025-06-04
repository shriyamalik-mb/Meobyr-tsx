
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const ABContent = () => {
  const location = useLocation();
  
  const tabItems = [
    { title: 'Dashboard', path: '/content/dashboard' },
    { title: 'Title', path: '/content/title' },
    { title: 'Hero Image', path: '/content/hero-image' },
    { title: 'Description', path: '/content/description' },
    { title: 'A+/B+ Content', path: '/content/ab-content' }
  ];

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-brand-light">
            <nav className="flex space-x-8">
              {tabItems.map((tab) => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    location.pathname === tab.path
                      ? 'border-brand-sage text-brand-sage'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-brand-navy mb-4">A+/B+ Content</h1>
          <p className="text-gray-600 mb-8">Manage A+ and B+ enhanced content for your products.</p>
          
          <div className="border border-brand-light rounded-lg p-6">
            <h2 className="text-xl font-semibold text-brand-navy mb-4">Enhanced Content Management</h2>
            <p className="text-gray-600">Create rich, enhanced content modules to showcase your products effectively.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ABContent;
