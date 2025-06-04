
const DistributionScoreComparison = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold text-brand-navy">Distribution Score</h3>
        <div className="ml-2 w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-xs text-gray-600">?</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-6">Can our SKUs be seen online?</p>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 mb-4">Own score</p>
          <div className="relative w-24 h-24 mx-auto">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#577399"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${80 * 2.51} 251`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-brand-navy">80%</span>
              <span className="text-xs text-red-500">-3</span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 mb-4">Competition score</p>
          <div className="relative w-24 h-24 mx-auto">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#C1CFDA"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${86 * 2.51} 251`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-brand-navy">86%</span>
              <span className="text-xs text-green-500">+5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionScoreComparison;
