
import React from 'react';
import { Target, Star, ArrowRight, Search } from 'lucide-react';

const SearchMediaRecommendedActions = () => {
  const recommendedActions = [
    {
      id: 1,
      title: "Fix NIVEA Face Cream category placement on Talabat",
      description: "Health > Body Care > Beauty > Face Care - +18% category share potential",
      expectedImpact: "+18% category share potential",
      priority: "high",
      icon: Target
    },
    {
      id: 2,
      title: "Improve La Prairie placement in correct premium category on Uber Eats",
      description: "+25% organic visibility improvement expected",
      expectedImpact: "+25% organic visibility",
      priority: "high",
      icon: Star
    },
    {
      id: 3,
      title: "Increase sponsored coverage for moisturizing cream UAE keyword",
      description: "Capture 18.5K monthly searches with targeted campaigns",
      expectedImpact: "Capture 18.5K searches",
      priority: "medium",
      icon: Search
    },
    {
      id: 4,
      title: "Boost Amazon.ae presence in anti-aging category",
      description: "+12% search visibility through enhanced content",
      expectedImpact: "+12% search visibility",
      priority: "medium",
      icon: ArrowRight
    },
    {
      id: 5,
      title: "Optimize Coppertone sun protection keyword targeting",
      description: "Maintain 52% category leadership in summer products",
      expectedImpact: "Maintain 52% leadership",
      priority: "low",
      icon: Target
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-brand-light">
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
  );
};

export default SearchMediaRecommendedActions;
