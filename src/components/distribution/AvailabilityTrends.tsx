
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TimeSeriesChart from './TimeSeriesChart';

const AvailabilityTrends = () => {
  const [timeRange, setTimeRange] = useState('All Time');

  // Retailer data matching the KPIs: Tesco.com, Sainsbury.com, Morrisons.com, Amazon
  const fullRetailerData = [
    { date: "2025-01-01", valueTesco: 0.85, valueSainsbury: 0.80, valueMorrisons: 0.75, valueAmazon: 0.65 },
    { date: "2025-01-08", valueTesco: 0.87, valueSainsbury: 0.78, valueMorrisons: 0.73, valueAmazon: 0.67 },
    { date: "2025-01-15", valueTesco: 0.83, valueSainsbury: 0.82, valueMorrisons: 0.77, valueAmazon: 0.63 },
    { date: "2025-01-22", valueTesco: 0.88, valueSainsbury: 0.85, valueMorrisons: 0.78, valueAmazon: 0.68 },
    { date: "2025-01-29", valueTesco: 0.85, valueSainsbury: 0.80, valueMorrisons: 0.75, valueAmazon: 0.65 }
  ];

  // Product data matching the KPIs: Nivea deep impact, Vaseline lotion, Olay regenerist, Nivea vitamin D
  const fullProductData = [
    { date: "2025-01-01", valueNiveaDeep: 0.90, valueVaseline: 0.78, valueOlay: 0.72, valueNiveaVitamin: 0.60 },
    { date: "2025-01-08", valueNiveaDeep: 0.92, valueVaseline: 0.76, valueOlay: 0.74, valueNiveaVitamin: 0.62 },
    { date: "2025-01-15", valueNiveaDeep: 0.88, valueVaseline: 0.80, valueOlay: 0.70, valueNiveaVitamin: 0.58 },
    { date: "2025-01-22", valueNiveaDeep: 0.93, valueVaseline: 0.82, valueOlay: 0.75, valueNiveaVitamin: 0.63 },
    { date: "2025-01-29", valueNiveaDeep: 0.90, valueVaseline: 0.78, valueOlay: 0.72, valueNiveaVitamin: 0.60 }
  ];

  // Location data matching the KPIs: North London, South London, East London, West London
  const fullLocationData = [
    { date: "2025-01-01", valueNorthLondon: 0.88, valueSouthLondon: 0.82, valueEastLondon: 0.76, valueWestLondon: 0.70 },
    { date: "2025-01-08", valueNorthLondon: 0.86, valueSouthLondon: 0.84, valueEastLondon: 0.78, valueWestLondon: 0.72 },
    { date: "2025-01-15", valueNorthLondon: 0.90, valueSouthLondon: 0.80, valueEastLondon: 0.74, valueWestLondon: 0.68 },
    { date: "2025-01-22", valueNorthLondon: 0.91, valueSouthLondon: 0.85, valueEastLondon: 0.79, valueWestLondon: 0.73 },
    { date: "2025-01-29", valueNorthLondon: 0.88, valueSouthLondon: 0.82, valueEastLondon: 0.76, valueWestLondon: 0.70 }
  ];

  const filterDataByTimeRange = (data: any[]) => {
    switch (timeRange) {
      case 'Last 7 days':
        return data.slice(-1);
      case 'Last 30 days':
        return data.slice(-2);
      case 'Last 90 days':
        return data.slice(-3);
      default:
        return data;
    }
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-brand-navy">Availability Trends</h3>
        <Select value={timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Last 7 days">Last 7 days</SelectItem>
            <SelectItem value="Last 30 days">Last 30 days</SelectItem>
            <SelectItem value="Last 90 days">Last 90 days</SelectItem>
            <SelectItem value="All Time">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TimeSeriesChart
          title="Retailer Availability Over Time"
          data={filterDataByTimeRange(fullRetailerData)}
          xKey="date"
          yKey1="valueTesco"
          yKey2="valueSainsbury"
          yKey3="valueMorrisons"
          yKey4="valueAmazon"
          label1="Tesco.com"
          label2="Sainsbury.com"
          label3="Morrisons.com"
          label4="Amazon"
        />
        <TimeSeriesChart
          title="Product Availability Over Time"
          data={filterDataByTimeRange(fullProductData)}
          xKey="date"
          yKey1="valueNiveaDeep"
          yKey2="valueVaseline"
          yKey3="valueOlay"
          yKey4="valueNiveaVitamin"
          label1="Nivea deep impact"
          label2="Vaseline lotion"
          label3="Olay regenerist"
          label4="Nivea vitamin D"
        />
        <TimeSeriesChart
          title="Location Availability Over Time"
          data={filterDataByTimeRange(fullLocationData)}
          xKey="date"
          yKey1="valueNorthLondon"
          yKey2="valueSouthLondon"
          yKey3="valueEastLondon"
          yKey4="valueWestLondon"
          label1="North London"
          label2="South London"
          label3="East London"
          label4="West London"
        />
      </div>
    </div>
  );
};

export default AvailabilityTrends;
