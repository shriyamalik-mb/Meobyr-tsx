
import { Package, TrendingUp, MapPin, Store } from 'lucide-react';
import RecommendedActions from './RecommendedActions';
import MetricsCard from './MetricsCard';
import ParetoChart from './distribution/ParetoChart';
import DistributionScoreComparison from './DistributionScoreComparison';
import AvailabilityOverTime from './AvailabilityOverTime';
import MapContainer from './maps/MapContainer';
import ScatterMap from './ScatterMap';

const Dashboard = () => {
  const metrics = [
    {
      title: 'Total Products Tracked',
      value: '2,847',
      change: '+12% from last month',
      changeType: 'positive' as const,
      icon: <Package className="w-6 h-6 text-brand-navy" />
    },
    {
      title: 'Average Availability',
      value: '78.4%',
      change: '+5.2% from last week',
      changeType: 'positive' as const,
      icon: <TrendingUp className="w-6 h-6 text-brand-navy" />
    },
    {
      title: 'Postcodes Covered',
      value: '156',
      change: '+3 new postcodes',
      changeType: 'positive' as const,
      icon: <MapPin className="w-6 h-6 text-brand-navy" />
    },
    {
      title: 'Retailers Covered',
      value: '25',
      change: '+2 new retailers',
      changeType: 'positive' as const,
      icon: <Store className="w-6 h-6 text-brand-navy" />
    }
  ];

  const distributionOpportunities = [
    { label: "Leeds, City Centre, LS1 4AP", value: 40, current: 40 },
    { label: "Liverpool, City Centre, L1 8JQ", value: 45, current: 45 },
    { label: "Birmingham, City Centre, B2 4QA", value: 55, current: 55 },
    { label: "Manchester, Central Manchester, M1 4BT", value: 62, current: 62 },
    { label: "London, East London, Newham, E14 0JT", value: 68, current: 68 }
  ];

  const availabilityGaps = [
    { label: "West London", value: 30, current: 30 },
    { label: "East London", value: 35, current: 35 },
    { label: "Leeds, City Centre, LS1 4AP", value: 40, current: 40 },
    { label: "South London", value: 45, current: 45 },
    { label: "North London", value: 52, current: 52 }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-navy mb-2">Distribution & Availability Dashboard</h1>
        <p className="text-gray-600">Monitor your product distribution and availability across all channels</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricsCard key={index} {...metric} />
        ))}
      </div>

      {/* Recommended Actions */}
      <RecommendedActions />

      {/* Pareto Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ParetoChart 
          title="Top 5 Distribution Opportunities" 
          items={distributionOpportunities} 
        />
        <ParetoChart 
          title="Top 5 Availability Gaps" 
          items={availabilityGaps} 
        />
      </div>

      {/* Distribution Score and Availability Over Time side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DistributionScoreComparison />
        <AvailabilityOverTime />
      </div>

      {/* Scatter Map */}
      <div className="mb-8">
        <MapContainer /> 
      </div> 

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-brand-navy mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-brand-light">
              <span className="text-sm text-gray-600">Product ABC123 availability updated</span>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-brand-light">
              <span className="text-sm text-gray-600">New distribution channel added</span>
              <span className="text-xs text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Weekly report generated</span>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-brand-navy mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-brand-light hover:bg-brand-light transition-colors duration-200">
              <div className="font-medium text-brand-navy">Export Distribution Report</div>
              <div className="text-sm text-gray-600">Generate comprehensive distribution analysis</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-brand-light hover:bg-brand-light transition-colors duration-200">
              <div className="font-medium text-brand-navy">Export Availability Report</div>
              <div className="text-sm text-gray-600">Refresh product information and pricing</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
