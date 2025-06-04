
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';

const DistributionDashboard = () => {
  const location = useLocation();
  
  const tabItems = [
    { title: 'Dashboard', path: '/distribution/dashboard' },
    { title: 'Catalogue', path: '/distribution/catalogue' },
    { title: 'Distribution', path: '/distribution/distribution' },
    { title: 'Availability', path: '/distribution/availability' }
  ];

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <main className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="px-6 pt-6">
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
        <Dashboard />
      </main>
    </div>
  );
};

export default DistributionDashboard;
