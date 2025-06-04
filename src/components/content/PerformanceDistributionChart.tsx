
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const PerformanceDistributionChart = () => {
  const data = [
    { name: 'High Performance', value: 56, color: '#548687' },
    { name: 'Medium Performance', value: 50, color: '#C1CFDA' },
    { name: 'Low Performance', value: 14, color: '#A52A2A' }
  ];

  const renderLegend = (props: any) => {
    return (
      <div className="flex flex-col space-y-2 mt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-700">{entry.name}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{entry.value} SKUs</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-brand-navy mb-4">Performance Distribution</h3>
      <div className="flex flex-col lg:flex-row items-center">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:ml-8 mt-4 lg:mt-0">
          {renderLegend({})}
        </div>
      </div>
    </div>
  );
};

export default PerformanceDistributionChart;
