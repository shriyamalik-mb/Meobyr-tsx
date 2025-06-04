
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface StackedBarChartProps {
  title: string;
  data: any[];
  showLegend?: boolean;
}

const PromotionStackedBarChart = ({ title, data, showLegend = true }: StackedBarChartProps) => {
  const colors = {
    BOGO: '#A52A2A',          // brand-brick
    Discount: '#548687',       // brand-sage
    Bundle: '#283044',         // brand-navy
    Cashback: '#C1CFDA',       // brand-light
    'Body Lotion': '#A52A2A',  // brand-brick
    'Face Cream': '#548687',   // brand-sage
    'Body Wash': '#283044',    // brand-navy
    'Shampoo': '#C1CFDA',      // brand-light
    'Deodorant': '#8B7355'     // complementary brown
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-brand-light">
      <h3 className="text-lg font-semibold text-brand-navy mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#283044' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#283044' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #C1CFDA',
                borderRadius: '8px'
              }} 
            />
            {showLegend && <Legend />}
            {Object.keys(data[0]?.stacks || {}).map((key) => (
              <Bar 
                key={key} 
                dataKey={`stacks.${key}`} 
                stackId="a" 
                fill={colors[key as keyof typeof colors] || '#548687'} 
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PromotionStackedBarChart;
