
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PieChartProps {
  title: string;
  data: { label: string; value: number }[];
}

const PromotionPieChart = ({ title, data }: PieChartProps) => {
  const colors = ['#A52A2A', '#548687', '#283044', '#C1CFDA', '#8B7355']; // Brand colors

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-brand-navy mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ label, value }) => `${label}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PromotionPieChart;
