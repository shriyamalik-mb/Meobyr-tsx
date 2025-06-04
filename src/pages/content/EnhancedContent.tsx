
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { EnhancedContentTab } from '@/components/content/EnhancedContentTab';
import { mockSKUData } from '@/data/mockData';
import { FilterState } from '@/types/dashboard';

const EnhancedContent = () => {
  const location = useLocation();
  const [filters, setFilters] = useState<FilterState>({
    retailer: 'All',
    brand: 'All',
    category: 'All',
    sku: 'All'
  });

  const tabItems = [
    { title: 'Dashboard', path: '/content/dashboard' },
    { title: 'Title', path: '/content/title' },
    { title: 'Hero Image', path: '/content/hero-image' },
    { title: 'Description', path: '/content/description' },
    { title: 'Taxonomy', path: '/content/taxonomy' },
    { title: 'Enhanced Content', path: '/content/enhanced-content' }
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
          <h1 className="text-3xl font-bold text-brand-navy mb-4">Enhanced Content Management</h1>
          <p className="text-gray-600 mb-8">Manage A+ content, videos, and additional images to boost conversions.</p>
          
          <EnhancedContentTab 
            data={mockSKUData} 
            filters={filters} 
            onFiltersChange={setFilters} 
          />
        </div>
      </main>
    </div>
  );
};

export default EnhancedContent;
