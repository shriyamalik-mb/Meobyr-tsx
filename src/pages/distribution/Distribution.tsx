
import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import RecommendedActionsDistribution from '@/components/distribution/RecommendedActionsDistribution';
import HierarchicalDropdown from '@/components/distribution/HierarchicalDropdown';
import BrandComparisonDropdown from '@/components/distribution/BrandComparisonDropdown';
import CoveragePanels from '@/components/distribution/CoveragePanels';
import DistributionTable from '@/components/distribution/DistributionTable';
import MetricBarList from '@/components/distribution/MetricBarList';
import AvailabilityTrends from '@/components/distribution/AvailabilityTrends';
import HeatmapPlaceholder from '@/components/distribution/HeatmapPlaceholder';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

// Demo data structure
const demoDistributionData = [
  {
    country: "United Kingdom",
    region: "North London", 
    district: "Camden",
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
    isCompetition: false
  },
  {
    country: "United Kingdom",
    region: "North London",
    district: "Camden", 
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
    isCompetition: false
  },
  {
    country: "United Kingdom",
    region: "North London",
    district: "Camden",
    category: "Body lotion", 
    brand: "Vaseline",
    sku: "Vaseline vitamin D body lotion",
    retailerCounts: {
      Amazon: 3,
      Deliveroo: 5,
      "Morrisons.com": 2,
      "Sainsbury.com": 3,
      "Tesco.com": 1,
      "Uber Eats": 7,
      "Waitrose.com": 3
    },
    isCompetition: true
  },
  {
    country: "United Kingdom",
    region: "North London",
    district: "Camden",
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
    isCompetition: false
  },
  {
    country: "United Kingdom",
    region: "South London",
    district: "Greenwich",
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
    isCompetition: true
  }
];

const Distribution = () => {
  const location = useLocation();
  const [locationFilters, setLocationFilters] = useState({});
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [retailerFilter, setRetailerFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [timePeriod, setTimePeriod] = useState('All');
  const [brand1, setBrand1] = useState('Nivea');
  const [brand2, setBrand2] = useState('Vaseline');
  const [coverageFilters, setCoverageFilters] = useState({
    own: { brand: 'All brands', product: 'All products', sku: 'All SKUs' },
    competition: { brand: 'All brands', product: 'All products', sku: 'All SKUs' }
  });

  const brands = ['All brands', 'Nivea', 'Vaseline', 'Olay'];

  const tabItems = [
    { title: 'Dashboard', path: '/distribution/dashboard' },
    { title: 'Catalogue', path: '/distribution/catalogue' },
    { title: 'Distribution', path: '/distribution/distribution' },
    { title: 'Availability', path: '/distribution/availability' }
  ];

  // Out-of-stock metrics data
  const outOfStockMetrics = {
    retailers: [
      { label: "Tesco.com", value: 85 },
      { label: "Sainsbury.com", value: 80 },
      { label: "Morrisons.com", value: 75 },
      { label: "Amazon", value: 65 }
    ],
    products: [
      { label: "Nivea deep impact", value: 90 },
      { label: "Vaseline lotion", value: 78 },
      { label: "Olay regenerist", value: 72 },
      { label: "Nivea vitamin D", value: 60 }
    ],
    locations: [
      { label: "North London", value: 88 },
      { label: "South London", value: 82 },
      { label: "East London", value: 76 },
      { label: "West London", value: 70 }
    ]
  };

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return demoDistributionData.filter(item => {
      if (categoryFilter !== 'All' && item.category !== categoryFilter) return false;
      if (brand1 !== 'All brands' && brand2 !== 'All brands') {
        if (item.brand !== brand1 && item.brand !== brand2) return false;
      }
      return true;
    });
  }, [categoryFilter, brand1, brand2, locationFilters]);

  const handleBrandChange = (newBrand1: string, newBrand2: string) => {
    setBrand1(newBrand1);
    setBrand2(newBrand2);
  };

  const handleCoverageFilterChange = (type: 'own' | 'competition', newFilters: typeof coverageFilters.own) => {
    setCoverageFilters(prev => ({
      ...prev,
      [type]: newFilters
    }));
  };

  const handleExport = () => {
    console.log('Exporting distribution data...');
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
            <h1 className="text-3xl font-bold text-brand-navy mb-6">Distribution – Details</h1>
            
            {/* Recommended Actions */}
            <RecommendedActionsDistribution />

            {/* Out-of-Stock Analysis */}
            {/* <div className="mb-8">
              <h3 className="text-lg font-semibold text-brand-navy mb-4">Out-of-Stock Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricBarList 
                  title="Retailers with highest out-of-stock rates"
                  data={outOfStockMetrics.retailers}
                />
                <MetricBarList 
                  title="Products with highest out-of-stock rates"
                  data={outOfStockMetrics.products}
                />
                <MetricBarList 
                  title="Locations with highest out-of-stock rates"
                  data={outOfStockMetrics.locations}
                />
              </div>
            </div> */}

            {/* Global Filters */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-brand-navy mb-4">Global Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <HierarchicalDropdown
                  data={{}}
                  placeholder="Select Location"
                  onChange={setLocationFilters}
                />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Body lotion">Body lotion</SelectItem>
                    <SelectItem value="Face cream">Face cream</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={retailerFilter} onValueChange={setRetailerFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Retailers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Retailers</SelectItem>
                    <SelectItem value="Amazon">Amazon</SelectItem>
                    <SelectItem value="Tesco">Tesco</SelectItem>
                    <SelectItem value="Sainsbury">Sainsbury</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Platforms</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="In-store">In-store</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={timePeriod} onValueChange={setTimePeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Time</SelectItem>
                    <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                    <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Brand Comparison */}
            <BrandComparisonDropdown
              brands={brands}
              brand1={brand1}
              brand2={brand2}
              onChange={handleBrandChange}
            />

            {/* Coverage Panels */}
            <CoveragePanels
              ownFilters={coverageFilters.own}
              competitionFilters={coverageFilters.competition}
              onOwnFilterChange={(filters) => handleCoverageFilterChange('own', filters)}
              onCompetitionFilterChange={(filters) => handleCoverageFilterChange('competition', filters)}
              data={filteredData}
              labels={{ own: `Coverage for ${brand1}`, competition: `Coverage for ${brand2}` }}
            />

            {/* Heatmap Placeholders */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <HeatmapPlaceholder label="Heatmap placeholder (filters apply here)" />
              <HeatmapPlaceholder label="Heatmap placeholder (filters apply here)" />
            </div> */}

            {/* Export Button and Distribution Table */}
            <div className="flex justify-end mb-4">
              <Button onClick={handleExport} variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </Button>
            </div>

            {/* Distribution Table */}
            <DistributionTable data={filteredData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Distribution;
