
import React from 'react';
import Navbar from '@/components/Navbar';
import TabNavigation from '@/components/search-media/TabNavigation';
import SearchMediaRecommendedActions from '@/components/search-media/SearchMediaRecommendedActions';
import KeywordOpportunities from '@/components/search-media/KeywordOpportunities';
import SearchPerformanceTable from '@/components/search-media/SearchPerformanceTable';

const SearchPage = () => {
  const tabItems = [
    { title: 'Dashboard', path: '/search-media/dashboard' },
    { title: 'Search', path: '/search-media/search' },
    { title: 'Category', path: '/search-media/category' }
  ];

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <main className="max-w-7xl mx-auto">
        <TabNavigation tabs={tabItems} />

        <div className="p-6">
          <h1 className="text-3xl font-bold text-brand-navy mb-8">Search Performance Analysis</h1>
          
          <SearchMediaRecommendedActions />

          <div className="space-y-8">
            <KeywordOpportunities />
            <SearchPerformanceTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
