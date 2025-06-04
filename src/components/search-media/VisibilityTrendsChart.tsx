
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface VisibilityTrendsChartProps {
  data: any[];
  comparisonView: string;
  onComparisonChange: (value: string) => void;
  trendsMetric: string;
  onMetricChange: (value: string) => void;
}

const VisibilityTrendsChart = ({
  data,
  comparisonView,
  onComparisonChange,
  trendsMetric,
  onMetricChange
}: VisibilityTrendsChartProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-brand-navy">Visibility Trends (Last 3 Months)</h2>
          <p className="text-sm text-gray-600">3-month performance trends for search and category scores</p>
        </div>
        <div className="flex gap-4">
          <ToggleGroup type="single" value={comparisonView} onValueChange={onComparisonChange}>
            <ToggleGroupItem value="beiersdorf" className="data-[state=on]:bg-brand-sage data-[state=on]:text-white">
              Beiersdorf Only
            </ToggleGroupItem>
            <ToggleGroupItem value="competition" className="data-[state=on]:bg-brand-sage data-[state=on]:text-white">
              vs Competition
            </ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" value={trendsMetric} onValueChange={onMetricChange}>
            <ToggleGroupItem value="search" className="data-[state=on]:bg-brand-sage data-[state=on]:text-white">
              Search
            </ToggleGroupItem>
            <ToggleGroupItem value="category" className="data-[state=on]:bg-brand-sage data-[state=on]:text-white">
              Category
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <Card className="border-brand-light">
        <CardContent className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C1CFDA" />
                <XAxis dataKey="month" tick={{ fill: '#283044' }} />
                <YAxis domain={[6, 9]} tick={{ fill: '#283044' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #C1CFDA',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                {trendsMetric === 'search' && (
                  <Line 
                    type="monotone" 
                    dataKey="searchScore" 
                    stroke="#A52A2A" 
                    strokeWidth={3}
                    dot={{ fill: '#A52A2A', strokeWidth: 2, r: 4 }}
                    name="Search Score"
                  />
                )}
                {trendsMetric === 'category' && (
                  <Line 
                    type="monotone" 
                    dataKey="categoryScore" 
                    stroke="#548687" 
                    strokeWidth={3}
                    dot={{ fill: '#548687', strokeWidth: 2, r: 4 }}
                    name="Category Score"
                  />
                )}
                {comparisonView === 'competition' && trendsMetric === 'search' && (
                  <Line 
                    type="monotone" 
                    dataKey="compSearchScore" 
                    stroke="#A52A2A" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{ fill: '#A52A2A', strokeWidth: 2, r: 4 }}
                    name="Competitor Search Score"
                  />
                )}
                {comparisonView === 'competition' && trendsMetric === 'category' && (
                  <Line 
                    type="monotone" 
                    dataKey="compCategoryScore" 
                    stroke="#548687" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{ fill: '#548687', strokeWidth: 2, r: 4 }}
                    name="Competitor Category Score"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisibilityTrendsChart;
