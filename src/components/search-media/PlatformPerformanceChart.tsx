import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PlatformPerformanceChartProps {
  data: any[];
  selectedBrand: string;
  onBrandChange: (value: string) => void;
  platformViewMode: string;
  onViewModeChange: (value: string) => void;
}

const PlatformPerformanceChart = ({
  data,
  selectedBrand,
  onBrandChange,
  platformViewMode,
  onViewModeChange
}: PlatformPerformanceChartProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-brand-navy">Platform Performance Breakdown</h2>
          <p className="text-sm text-gray-600">Performance scores across platforms and brand comparison</p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedBrand} onValueChange={onBrandChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              <SelectItem value="nivea">NIVEA</SelectItem>
              <SelectItem value="eucerin">Eucerin</SelectItem>
              <SelectItem value="laprairie">La Prairie</SelectItem>
              <SelectItem value="coppertone">Coppertone</SelectItem>
            </SelectContent>
          </Select>
          <Select value={platformViewMode} onValueChange={onViewModeChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="View mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="platform">By Platform</SelectItem>
              <SelectItem value="brand">By Brand</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card className="border-brand-light">
        <CardContent className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C1CFDA" />
                <XAxis 
                  dataKey={platformViewMode === 'platform' ? 'platform' : 'brand'} 
                  tick={{ fill: '#283044' }}
                />
                <YAxis domain={[0, 10]} tick={{ fill: '#283044' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #C1CFDA',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Bar dataKey="organic" stackId="a" fill="#548687" name="Organic Search" />
                <Bar dataKey="paid" stackId="a" fill="#A52A2A" name="Paid Search" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformPerformanceChart;
