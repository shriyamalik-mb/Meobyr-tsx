
import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FilterBar from '@/components/catalogue/FilterBar';
import HierarchicalTable from '@/components/catalogue/HierarchicalTable';

// Demo data structure
const demoData = [
  {
    category: "Body lotion",
    brand: "Nivea",
    sku: "Nivea deep impact body lotion",
    retailerCounts: {
      Amazon: 2,
      Deliveroo: 8,
      "Morrisons.com": 2,
      "Sainsbury.com": 2,
      "Tesco.com": 4,
      "Uber Eats": 10,
      "Waitrose.com": 4
    },
    sellerType: "3P",
    isCompetition: false
  },
  {
    category: "Body lotion",
    brand: "Nivea",
    sku: "Nivea vitamin D body lotion",
    retailerCounts: {
      Amazon: 1,
      Deliveroo: 4,
      "Morrisons.com": 1,
      "Sainsbury.com": 1,
      "Tesco.com": 2,
      "Uber Eats": 2,
      "Waitrose.com": 2
    },
    sellerType: "3P",
    isCompetition: false
  },
  {
    category: "Body lotion",
    brand: "Vaseline",
    sku: "Vaseline lotion",
    retailerCounts: {
      Amazon: 3,
      Deliveroo: 5,
      "Morrisons.com": 2,
      "Sainsbury.com": 3,
      "Tesco.com": 1,
      "Uber Eats": 7,
      "Waitrose.com": 3
    },
    sellerType: "1P",
    isCompetition: true
  },
  {
    category: "Face cream",
    brand: "Nivea",
    sku: "Nivea deep impact face cream",
    retailerCounts: {
      Amazon: 4,
      Deliveroo: 2,
      "Morrisons.com": 3,
      "Sainsbury.com": 2,
      "Tesco.com": 5,
      "Uber Eats": 1,
      "Waitrose.com": 2
    },
    sellerType: "3P",
    isCompetition: false
  },
  {
    category: "Face cream",
    brand: "Olay",
    sku: "Olay regenerist cream",
    retailerCounts: {
      Amazon: 2,
      Deliveroo: 3,
      "Morrisons.com": 1,
      "Sainsbury.com": 4,
      "Tesco.com": 3,
      "Uber Eats": 2,
      "Waitrose.com": 1
    },
    sellerType: "1P",
    isCompetition: true
  }
];

const Catalogue = () => {
  const location = useLocation();
  const [selectedView, setSelectedView] = useState<'category' | 'retailer'>('category');
  const [filters, setFilters] = useState({
    category: 'All',
    brand: 'All',
    showCompetition: 'Own + Competitor',
    sellerType: 'All'
  });

  const tabItems = [
    { title: 'Dashboard', path: '/distribution/dashboard' },
    { title: 'Catalogue', path: '/distribution/catalogue' },
    { title: 'Distribution', path: '/distribution/distribution' },
    { title: 'Availability', path: '/distribution/availability' }
  ];

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return demoData.filter(item => {
      if (filters.category !== 'All' && item.category !== filters.category) return false;
      if (filters.brand !== 'All' && item.brand !== filters.brand) return false;
      if (filters.showCompetition === 'Own Only' && item.isCompetition) return false;
      if (filters.sellerType !== 'All' && item.sellerType !== filters.sellerType) return false;
      return true;
    });
  }, [filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleViewChange = (view: 'category' | 'retailer') => {
    setSelectedView(view);
  };

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

        <div className="p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-brand-navy mb-4">Product Catalogue</h1>
            <p className="text-gray-600 mb-6">Manage your product catalogue across all distribution channels.</p>
            
            <FilterBar
              selectedView={selectedView}
              filters={filters}
              onViewChange={handleViewChange}
              onFilterChange={handleFilterChange}
              data={demoData}
            />

            <HierarchicalTable
              data={filteredData}
              view={selectedView}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Catalogue;
