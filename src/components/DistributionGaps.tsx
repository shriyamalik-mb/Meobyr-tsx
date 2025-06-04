
const DistributionGaps = () => {
  const gaps = [
    { skus: 5, location: "London, East London, Newham, E14QJT", impact: 100 },
    { skus: 4, location: "London, East London, Newham, E14QJT", impact: 80 },
    { skus: 3, location: "Manchester, Central Manchester, M1 4BT", impact: 60 },
    { skus: 2, location: "Birmingham, City Centre, B2 4QA", impact: 40 },
    { skus: 1, location: "Liverpool, City Centre, L1 8JQ", impact: 20 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-brand-navy mb-2">Top 5 Distribution Gaps</h3>
      <p className="text-sm text-gray-600 mb-6">Locations where competition is selling products but we are not</p>
      
      <div className="space-y-4">
        {gaps.map((gap, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-16 h-8 bg-brand-brick text-white text-sm font-medium rounded">
              {gap.skus} Competitor SKUs
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <div 
                  className="h-2 bg-brand-brick rounded"
                  style={{ width: `${gap.impact}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-700">{gap.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistributionGaps;
