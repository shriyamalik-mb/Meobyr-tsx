
const DistributionGains = () => {
  const gains = [
    { skus: 8, location: "London, West London, Kensington, SW7 2AZ", impact: 100 },
    { skus: 6, location: "Edinburgh, New Town, EH2 2BY", impact: 75 },
    { skus: 5, location: "Glasgow, City Centre, G1 2FF", impact: 62 },
    { skus: 4, location: "Bristol, City Centre, BS1 4DJ", impact: 50 },
    { skus: 3, location: "Leeds, City Centre, LS1 4AP", impact: 37 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-brand-navy mb-2">Top 5 Distribution Gains</h3>
      <p className="text-sm text-gray-600 mb-6">Main areas of SKU gains where we're performing well</p>
      
      <div className="space-y-4">
        {gains.map((gain, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-16 h-8 bg-brand-sage text-white text-sm font-medium rounded">
              {gain.skus} Our SKUs
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <div 
                  className="h-2 bg-brand-sage rounded"
                  style={{ width: `${gain.impact}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-700">{gain.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistributionGains;
