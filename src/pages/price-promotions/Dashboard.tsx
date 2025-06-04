import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PromotionKpiCard from '@/components/price-promotions/PromotionKpiCard';
import PromotionStackedBarChart from '@/components/price-promotions/PromotionStackedBarChart';
import PromotionPieChart from '@/components/price-promotions/PromotionPieChart';
import PromotionToggleControls from '@/components/price-promotions/PromotionToggleControls';
import { Target, Star, ArrowRight } from 'lucide-react';

const PricePromotionsDashboard = () => {
  const location = useLocation();
  
  const [retailerPlatformView, setRetailerPlatformView] = useState('Retailer View');
  const [retailerPlatformComparison, setRetailerPlatformComparison] = useState('Us');
  const [categoryView, setCategoryView] = useState('Retailer View');
  const [categoryComparison, setCategoryComparison] = useState('Us');
  const [promotionTypeView, setPromotionTypeView] = useState('Category View');
  const [promotionTypeComparison, setPromotionTypeComparison] = useState('Us');
  
  const tabItems = [
    { title: 'Dashboard', path: '/price-promotions/dashboard' },
    { title: 'Analytics', path: '/price-promotions/analytics' },
    { title: 'Promotions Database', path: '/price-promotions/promotions-database' }
  ];

  const kpiData = [
    {
      title: 'Active Promotions',
      value: '247',
      deltaText: '↑ 12% vs 321 competitors',
      iconName: 'shopping-cart' as const
    },
    {
      title: 'Most Active Promotion Type (Us)',
      value: 'BOGO',
      deltaText: '↑ 142 SKUs',
      iconName: 'award' as const
    },
    {
      title: 'Most Active Promotion Type (Competitors)',
      value: 'Discount',
      deltaText: '↑ 238 SKUs',
      iconName: 'target' as const
    }
  ];

  const recommendedActions = [
    {
      id: 1,
      title: "Increase BOGO promotions on Amazon",
      description: "Competitors are running 18% more BOGO campaigns on Amazon. Consider expanding your BOGO strategy.",
      expectedImpact: "+18% campaign reach",
      priority: "high",
      icon: Target
    },
    {
      id: 2,
      title: "Expand discount promotions for Body Lotion",
      description: "Competitors have 47% more discount promotions for Body Lotion. This category shows high engagement potential.",
      expectedImpact: "+47% category coverage",
      priority: "high",
      icon: Star
    },
    {
      id: 3,
      title: "Optimize Carrefour promotional mix",
      description: "Your promotion distribution on Carrefour differs significantly from competitors. Review and adjust strategy.",
      expectedImpact: "+12% efficiency",
      priority: "medium",
      icon: ArrowRight
    },
    {
      id: 4,
      title: "Increase Face Cream bundle promotions",
      description: "Low bundle promotion activity detected for Face Cream compared to market average. Opportunity for growth.",
      expectedImpact: "+8% bundle sales",
      priority: "medium",
      icon: Target
    },
    {
      id: 5,
      title: "Review DoorDash promotion strategy",
      description: "Underperforming on DoorDash with 22% fewer promotions than competitors. Consider increasing presence.",
      expectedImpact: "+22% platform reach",
      priority: "low",
      icon: ArrowRight
    }
  ];

  const retailerData = [
    { name: 'Carrefour', stacks: { BOGO: 15, Discount: 5, Bundle: 7, Cashback: 6 } },
    { name: 'Walmart', stacks: { BOGO: 15, Discount: 8, Bundle: 7, Cashback: 5 } },
    { name: 'Target', stacks: { BOGO: 8, Discount: 4, Bundle: 3, Cashback: 7 } },
    { name: 'Kroger', stacks: { BOGO: 5, Discount: 4, Bundle: 3, Cashback: 2 } }
  ];

  const channelData = [
    { name: 'Amazon', stacks: { BOGO: 15, Discount: 10, Bundle: 7, Cashback: 6 } },
    { name: 'Uber Eats', stacks: { BOGO: 12, Discount: 9, Bundle: 6, Cashback: 4 } },
    { name: 'Instacart', stacks: { BOGO: 10, Discount: 8, Bundle: 5, Cashback: 3 } },
    { name: 'DoorDash', stacks: { BOGO: 8, Discount: 6, Bundle: 4, Cashback: 3 } }
  ];

  const retailerDistributionData = [
    { label: 'Carrefour', value: 32 },
    { label: 'Walmart', value: 28 },
    { label: 'Target', value: 24 },
    { label: 'Kroger', value: 16 }
  ];

  const channelDistributionData = [
    { label: 'Amazon', value: 35 },
    { label: 'Uber Eats', value: 28 },
    { label: 'Instacart', value: 22 },
    { label: 'DoorDash', value: 15 }
  ];

  const retailerPlatformData = [
    { name: 'Carrefour', stacks: { BOGO: 15, Discount: 10, Bundle: 7, Cashback: 6 } },
    { name: 'Walmart', stacks: { BOGO: 12, Discount: 8, Bundle: 6, Cashback: 5 } },
    { name: 'Target', stacks: { BOGO: 8, Discount: 5, Bundle: 4, Cashback: 3 } },
    { name: 'Kroger', stacks: { BOGO: 5, Discount: 4, Bundle: 3, Cashback: 2 } }
  ];

  const productCategoryData = [
    { name: 'Carrefour', stacks: { 'Body Lotion': 14, 'Face Cream': 12, 'Body Wash': 10, 'Shampoo': 8, 'Deodorant': 6 } },
    { name: 'Walmart', stacks: { 'Body Lotion': 12, 'Face Cream': 10, 'Body Wash': 8, 'Shampoo': 7, 'Deodorant': 5 } },
    { name: 'Target', stacks: { 'Body Lotion': 10, 'Face Cream': 8, 'Body Wash': 6, 'Shampoo': 5, 'Deodorant': 4 } },
    { name: 'Kroger', stacks: { 'Body Lotion': 8, 'Face Cream': 6, 'Body Wash': 4, 'Shampoo': 3, 'Deodorant': 2 } }
  ];

  const categoryPromotionData = [
    { name: 'Body Lotion', stacks: { BOGO: 12, Discount: 8, Bundle: 4, Cashback: 3 } },
    { name: 'Face Cream', stacks: { BOGO: 10, Discount: 7, Bundle: 3, Cashback: 2 } },
    { name: 'Body Wash', stacks: { BOGO: 8, Discount: 6, Bundle: 3, Cashback: 2 } },
    { name: 'Shampoo', stacks: { BOGO: 6, Discount: 4, Bundle: 2, Cashback: 1 } },
    { name: 'Deodorant', stacks: { BOGO: 4, Discount: 3, Bundle: 1, Cashback: 1 } }
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

        {/* Dashboard Content */}
        <div className="p-6">
          {/* 1. Page Heading */}
          <h1 className="text-3xl font-bold text-brand-navy mb-8">Price & Promotions Dashboard</h1>
          
          {/* 2. KPI Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <PromotionKpiCard
                key={index}
                title={kpi.title}
                value={kpi.value}
                deltaText={kpi.deltaText}
                iconName={kpi.iconName}
              />
            ))}
          </div>

          {/* 3. Top 5 Recommended Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-brand-navy mb-4">Recommended Actions</h2>
            <div className="space-y-4">
              {recommendedActions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-start space-x-4 p-4 border border-brand-light rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className={`p-2 rounded-lg ${action.priority === 'high' ? 'bg-brand-brick' : action.priority === 'medium' ? 'bg-brand-sage' : 'bg-gray-500'}`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-brand-navy mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-brand-sage">{action.expectedImpact}</div>
                    <div className="text-xs text-gray-500 mt-1">Expected Impact</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Promotions by Retailer & Channel Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <PromotionStackedBarChart
              title="Promotions by Retailer"
              data={retailerData}
              showLegend={true}
            />
            <PromotionStackedBarChart
              title="Promotions by Channel"
              data={channelData}
              showLegend={true}
            />
          </div>

          {/* 5. Retailer & Channel Distribution Pie Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <PromotionPieChart
              title="Retailer Distribution"
              data={retailerDistributionData}
            />
            <PromotionPieChart
              title="Channel Distribution"
              data={channelDistributionData}
            />
          </div>

          {/* 6. Additional Promotion Analytics Charts */}
          <div className="space-y-8">
            {/* 6.1 Promotions by Retailer and Platform */}
            <div>
              <h2 className="text-xl font-semibold text-brand-navy mb-4">Promotions by Retailer and Platform</h2>
              <PromotionToggleControls
                viewToggle={{
                  options: ['Retailer View', 'Platform View'],
                  active: retailerPlatformView,
                  onChange: setRetailerPlatformView
                }}
                comparisonToggle={{
                  options: ['Us', 'Them'],
                  active: retailerPlatformComparison,
                  onChange: setRetailerPlatformComparison
                }}
              />
              <PromotionStackedBarChart
                title=""
                data={retailerPlatformData}
                showLegend={true}
              />
            </div>

            {/* 6.2 Promotions by Product Category */}
            <div>
              <h2 className="text-xl font-semibold text-brand-navy mb-4">Promotions by Product Category</h2>
              <PromotionToggleControls
                viewToggle={{
                  options: ['Retailer View', 'Platform View'],
                  active: categoryView,
                  onChange: setCategoryView
                }}
                comparisonToggle={{
                  options: ['Us', 'Them'],
                  active: categoryComparison,
                  onChange: setCategoryComparison
                }}
              />
              <PromotionStackedBarChart
                title=""
                data={productCategoryData}
                showLegend={true}
              />
            </div>

            {/* 6.3 Product Categories by Promotion Type */}
            <div>
              <h2 className="text-xl font-semibold text-brand-navy mb-4">Product Categories by Promotion Type</h2>
              <PromotionToggleControls
                viewToggle={{
                  options: ['Category View', 'Promotion View'],
                  active: promotionTypeView,
                  onChange: setPromotionTypeView
                }}
                comparisonToggle={{
                  options: ['Us', 'Them'],
                  active: promotionTypeComparison,
                  onChange: setPromotionTypeComparison
                }}
              />
              <PromotionStackedBarChart
                title=""
                data={categoryPromotionData}
                showLegend={true}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricePromotionsDashboard;
