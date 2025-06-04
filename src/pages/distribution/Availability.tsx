
import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import RecommendedActionsDistribution from '@/components/distribution/RecommendedActionsDistribution';
import HierarchicalDropdown from '@/components/distribution/HierarchicalDropdown';
import BrandComparisonDropdown from '@/components/distribution/BrandComparisonDropdown';
import CoveragePanels from '@/components/distribution/CoveragePanels';
import MetricBarList from '@/components/distribution/MetricBarList';
import AvailabilityTable from '@/components/distribution/AvailabilityTable';
import AvailabilityTrends from '@/components/distribution/AvailabilityTrends';
import HeatmapPlaceholder from '@/components/distribution/HeatmapPlaceholder';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

// Demo data for availability
const demoAvailabilityData = [
  {
    retailer: "Amazon",
    area: "North London",
    district: "Camden",
    postcode: "NW1 5DB",
    category: "Body lotion",
    product: "Nivea deep impact body lotion",
    availabilityCount: 5,
    isCompetition: false
  },
  {
    retailer: "Amazon",
    area: "North London",
    district: "Camden",
    postcode: "NW1 5DB",
    category: "Body lotion",
    product: "Nivea vitamin D body lotion",
    availabilityCount: 3,
    isCompetition: false
  },
  {
    retailer: "Amazon",
    area: "North London",
    district: "Camden",
    postcode: "NW1 5DB",
    category: "Face cream",
    product: "Nivea deep impact face cream",
    availabilityCount: 2,
    isCompetition: false
  },
  {
    retailer: "Tesco.com",
    area: "North London",
    district: "Camden",
    postcode: "NW1 5DB",
    category: "Body lotion",
    product: "Nivea deep impact body lotion",
    availabilityCount: 4,
    isCompetition: false
  },
  {
    retailer: "Tesco.com",
    area: "South London",
    district: "Greenwich",
    postcode: "SE10 9GB",
    category: "Face cream",
    product: "Olay regenerist cream",
    availabilityCount: 1,
    isCompetition: true
  },
  {
    retailer: "Sainsbury.com",
    area: "North London",
    district: "Camden",
    postcode: "NW1 5DB",
    category: "Body lotion",
    product: "Vaseline vitamin D body lotion",
    availabilityCount: 2,
    isCompetition: true
  }
];

const Availability = () => {
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

  // Availability-specific recommended actions
  const availabilityActions = [
    {
      id: 1,
      title: "Coordinate with Supply chain to ensure that best-selling SKUs are available at key locations: SKU1, SKU2, SKU3",
      description: "These locations are running low on stock",
      impact: "+5"
    },
    {
      id: 2,
      title: "Ask Sales team to contact Walmart to list SKU1 & SKU2 on Walmart.com, since they are out of stock",
      description: "These SKUs are currently unavailable to customers",
      impact: "+5"
    },
    {
      id: 3,
      title: "Competitors are restocking SKU1 and SKU2 on DeliveryHero while we are out of stock. Contact supply chain to replenish.",
      description: "Action needed to close availability gap",
      impact: "+5"
    }
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
    return demoAvailabilityData.filter(item => {
      if (categoryFilter !== 'All' && item.category !== categoryFilter) return false;
      if (retailerFilter !== 'All' && item.retailer !== retailerFilter) return false;
      if (brand1 !== 'All brands' && brand2 !== 'All brands') {
        const productBrand = item.product.split(' ')[0]; // Simple brand extraction
        if (productBrand !== brand1 && productBrand !== brand2) return false;
      }
      return true;
    });
  }, [categoryFilter, retailerFilter, brand1, brand2, locationFilters]);

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
    console.log('Exporting availability data...');
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
            <h1 className="text-3xl font-bold text-brand-navy mb-6">Availability – Details</h1>
            
            {/* Recommended Actions */}
            <RecommendedActionsDistribution 
              actions={availabilityActions}
              scoreType="Availability Score"
            />

            {/* Out-of-Stock Analysis */}
             <div className="mb-8">
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
            </div> 

            {/* Availability Trends - Time Series Charts */}
            <AvailabilityTrends />

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
                    <SelectItem value="Tesco.com">Tesco.com</SelectItem>
                    <SelectItem value="Sainsbury.com">Sainsbury.com</SelectItem>
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
            <div className="flex justify-between items-center mb-6">
              <BrandComparisonDropdown
                brands={brands}
                brand1={brand1}
                brand2={brand2}
                onChange={handleBrandChange}
              />
              <Button onClick={handleExport} variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </Button>
            </div>

            {/* Coverage Panels */}
            <CoveragePanels
              ownFilters={coverageFilters.own}
              competitionFilters={coverageFilters.competition}
              onOwnFilterChange={(filters) => handleCoverageFilterChange('own', filters)}
              onCompetitionFilterChange={(filters) => handleCoverageFilterChange('competition', filters)}
              data={filteredData}
              labels={{ own: `Availability for ${brand1}`, competition: `Availability for ${brand2}` }}
            />

            {/* Heatmap Placeholders */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <HeatmapPlaceholder label="Heatmap placeholder (filters apply here)" />
              <HeatmapPlaceholder label="Heatmap placeholder (filters apply here)" />
            </div> */}

            {/* Availability Table */}
            <AvailabilityTable data={filteredData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Availability;
