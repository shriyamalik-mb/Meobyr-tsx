
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GlobalFiltersProps {
  filters: {
    country: string;
    region: string;
    city: string;
    district: string;
    postcode: string;
    category: string;
    retailer: string;
    platform: string;
    timePeriod: string;
  };
  onFilterChange: (filters: any) => void;
  data: any[];
}

const GlobalFilters = ({ filters, onFilterChange, data }: GlobalFiltersProps) => {
  const filterOptions = {
    country: ['All', ...new Set(data.map(item => item.country))],
    region: ['All', ...new Set(data.map(item => item.region))],
    city: ['All', 'London', 'Manchester', 'Birmingham'],
    district: ['All', ...new Set(data.map(item => item.district))],
    postcode: ['All', 'N1', 'SW1', 'E1'],
    category: ['All', ...new Set(data.map(item => item.category))],
    retailer: ['All', 'Amazon', 'Tesco', 'Sainsbury', 'Morrisons'],
    platform: ['All', 'Online', 'In-store', 'Delivery'],
    timePeriod: ['All', 'Last 7 days', 'Last 30 days', 'Last 90 days']
  };

  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-brand-navy mb-4">Global Filters</h3>
      <div className="grid grid-cols-3 lg:grid-cols-9 gap-4">
        {Object.entries(filterOptions).map(([key, options]) => (
          <div key={key}>
            <Select value={filters[key as keyof typeof filters]} onValueChange={(value) => handleFilterChange(key, value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={key.charAt(0).toUpperCase() + key.slice(1)} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
