
import { TrendingUp, AlertCircle } from 'lucide-react';

const RecommendedActions = () => {
  const recommendations = [
    {
      id: 1,
      title: "Optimize Product Listings in Low-Performing Regions",
      description: "Improve product visibility in Southeast markets where availability is below 65%",
      expectedImpact: "+15% sales increase",
      priority: "high",
      icon: TrendingUp
    },
    {
      id: 2,
      title: "Update Inventory Management for High-Demand Products",
      description: "Restock trending items showing 85%+ demand but low availability",
      expectedImpact: "+8% revenue boost",
      priority: "medium", 
      icon: AlertCircle
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-brand-navy mb-4">Recommended Actions</h2>
      <div className="space-y-4">
        {recommendations.map((action) => (
          <div
            key={action.id}
            className="flex items-start space-x-4 p-4 border border-brand-light rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <div className={`p-2 rounded-lg ${action.priority === 'high' ? 'bg-brand-brick' : 'bg-brand-sage'}`}>
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
  );
};

export default RecommendedActions;
