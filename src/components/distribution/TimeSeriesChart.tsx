
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TimeSeriesChartProps {
  title: string;
  data: Array<Record<string, any>>;
  xKey: string;
  yKey1: string;
  yKey2: string;
  yKey3?: string;
  yKey4?: string;
  label1: string;
  label2: string;
  label3?: string;
  label4?: string;
}

const TimeSeriesChart = ({ 
  title, 
  data, 
  xKey, 
  yKey1, 
  yKey2, 
  yKey3, 
  yKey4, 
  label1, 
  label2, 
  label3, 
  label4 
}: TimeSeriesChartProps) => {
  // Format data to show percentages
  const formattedData = data.map(item => {
    const formatted = {
      ...item,
      [yKey1]: (item[yKey1] as number) * 100,
      [yKey2]: (item[yKey2] as number) * 100,
      date: new Date(item.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
    };
    
    if (yKey3 && item[yKey3]) {
      formatted[yKey3] = (item[yKey3] as number) * 100;
    }
    
    if (yKey4 && item[yKey4]) {
      formatted[yKey4] = (item[yKey4] as number) * 100;
    }
    
    return formatted;
  });

  const colors = ['#548687', '#A52A2A', '#2563eb', '#16a34a'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-brand-navy mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <Tooltip formatter={(value) => [`${value}%`, '']} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey={yKey1} 
            stroke={colors[0]} 
            name={label1}
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey={yKey2} 
            stroke={colors[1]} 
            name={label2}
            strokeWidth={2}
          />
          {yKey3 && (
            <Line 
              type="monotone" 
              dataKey={yKey3} 
              stroke={colors[2]} 
              name={label3}
              strokeWidth={2}
            />
          )}
          {yKey4 && (
            <Line 
              type="monotone" 
              dataKey={yKey4} 
              stroke={colors[3]} 
              name={label4}
              strokeWidth={2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart;
