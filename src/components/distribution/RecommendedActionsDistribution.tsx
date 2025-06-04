
import React from 'react';

interface RecommendedActionsDistributionProps {
  actions?: Array<{
    id: number;
    title: string;
    description: string;
    impact: string;
  }>;
  scoreType?: string;
}

const RecommendedActionsDistribution = ({ 
  actions,
  scoreType = "Dist. Score"
}: RecommendedActionsDistributionProps) => {
  const defaultActions = [
    {
      id: 1,
      title: "Coordinate with Supply chain to ensure that best-selling SKUs are replenished at these locations: SKU1, SKU2 and SKU3",
      description: "These locations are running low on stock",
      impact: "+5"
    },
    {
      id: 2,
      title: "Expand distribution to high-demand areas in South London",
      description: "Market analysis shows untapped potential in these regions",
      impact: "+8"
    },
    {
      id: 3,
      title: "Optimize product placement in underperforming retail channels",
      description: "Several key retailers show below-average distribution scores",
      impact: "+3"
    }
  ];

  const actionsToDisplay = actions || defaultActions;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-brand-navy">Recommended actions</h2>
        <span className="text-sm text-gray-600">Estimated impact on {scoreType}</span>
      </div>
      
      <div className="space-y-4">
        {actionsToDisplay.map((action) => (
          <div
            key={action.id}
            className="flex items-start justify-between p-4 border border-brand-light rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex-1 pr-4">
              <h3 className="font-medium text-brand-navy mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-sage text-white">
                {action.impact}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedActionsDistribution;
