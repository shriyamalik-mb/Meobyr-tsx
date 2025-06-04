
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import KpiCard from '@/components/content/KpiCard';
import TabNavigation from '@/components/search-media/TabNavigation';
import SearchMediaRecommendedActions from '@/components/search-media/SearchMediaRecommendedActions';
import VisibilityTrendsChart from '@/components/search-media/VisibilityTrendsChart';
import PlatformPerformanceChart from '@/components/search-media/PlatformPerformanceChart';
import { Search, Target } from 'lucide-react';

const SearchMediaDashboard = () => {
  const [comparisonView, setComparisonView] = useState('beiersdorf');
  const [trendsMetric, setTrendsMetric] = useState('search');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [platformViewMode, setPlatformViewMode] = useState('platform');

  const tabItems = [
    { title: 'Dashboard', path: '/search-media/dashboard' },
    { title: 'Search', path: '/search-media/search' },
    { title: 'Category', path: '/search-media/category' }
  ];

  // Sample data for charts
  const trendsData = [
    { month: 'April', searchScore: 7.4, categoryScore: 6.8, compSearchScore: 6.9, compCategoryScore: 6.5 },
    { month: 'May', searchScore: 7.6, categoryScore: 6.9, compSearchScore: 7.1, compCategoryScore: 6.7 },
    { month: 'June', searchScore: 7.9, categoryScore: 7.0, compSearchScore: 7.3, compCategoryScore: 6.8 }
  ];

  const platformData = [
    { platform: 'Amazon.ae', organic: 8.2, paid: 8.8 },
    { platform: 'Noon UAE', organic: 7.5, paid: 8.1 },
    { platform: 'Talabat', organic: 7.8, paid: 7.9 },
    { platform: 'Uber Eats', organic: 7.2, paid: 8.3 },
    { platform: 'Carrefour UAE', organic: 7.6, paid: 7.7 }
  ];

  const brandData = [
    { brand: 'NIVEA', organic: 8.1, paid: 8.4 },
    { brand: 'Eucerin', organic: 7.8, paid: 8.2 },
    { brand: 'La Prairie', organic: 7.3, paid: 8.0 },
    { brand: 'Coppertone', organic: 7.5, paid: 7.8 }
  ];

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <main className="max-w-7xl mx-auto">
        <TabNavigation tabs={tabItems} />

        <div className="p-6">
          <h1 className="text-3xl font-bold text-brand-navy mb-8">Search Media Dashboard</h1>
          
          <SearchMediaRecommendedActions />

          {/* Visibility Performance KPI Cards */}
          <div>
            <h2 className="text-xl font-semibold text-brand-navy mb-4">Visibility Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <KpiCard
                title="Search Score"
                value="7.9/10"
                subtitle="+0.5 from last period • Organic: 7.2/10, Sponsored: 8.5/10"
                icon={<Search className="w-6 h-6 text-brand-sage" />}
              />
              <KpiCard
                title="Category Score"
                value="7.0/10"
                subtitle="+0.1 from last period • Correct placement accuracy"
                icon={<Target className="w-6 h-6 text-brand-sage" />}
              />
            </div>
          </div>

          <VisibilityTrendsChart
            data={trendsData}
            comparisonView={comparisonView}
            onComparisonChange={setComparisonView}
            trendsMetric={trendsMetric}
            onMetricChange={setTrendsMetric}
          />

          <PlatformPerformanceChart
            data={platformViewMode === 'platform' ? platformData : brandData}
            selectedBrand={selectedBrand}
            onBrandChange={setSelectedBrand}
            platformViewMode={platformViewMode}
            onViewModeChange={setPlatformViewMode}
          />
        </div>
      </main>
    </div>
  );
};

export default SearchMediaDashboard;
