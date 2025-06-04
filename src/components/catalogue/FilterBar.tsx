
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import ExportButton from './ExportButton';

interface FilterBarProps {
  selectedView: 'category' | 'retailer';
  filters: {
    category: string;
    brand: string;
    showCompetition: string;
    sellerType: string;
  };
  onViewChange: (view: 'category' | 'retailer') => void;
  onFilterChange: (filters: any) => void;
  data: any[];
}

const FilterBar = ({ selectedView, filters, onViewChange, onFilterChange, data }: FilterBarProps) => {
  // Extract unique values for filter options
  const categories = ['All', ...Array.from(new Set(data.map(item => item.category)))];
  const brands = ['All', ...Array.from(new Set(data.map(item => item.brand)))];
  const sellerTypes = ['All', ...Array.from(new Set(data.map(item => item.sellerType)))];

  const handleFilterUpdate = (key: string, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="space-y-4 mb-6">
      {/* View Toggle */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-brand-navy">Select View:</span>
        <ToggleGroup type="single" value={selectedView} onValueChange={onViewChange}>
          <ToggleGroupItem value="category" className="data-[state=on]:bg-brand-sage data-[state=on]:text-white">
            Category
          </ToggleGroupItem>
          <ToggleGroupItem value="retailer" className="data-[state=on]:bg-brand-sage data-[state=on]:text-white">
            Retailer
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Filters Row */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-brand-navy mb-1">Category</label>
          <Select value={filters.category} onValueChange={(value) => handleFilterUpdate('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-brand-navy mb-1">Brand</label>
          <Select value={filters.brand} onValueChange={(value) => handleFilterUpdate('brand', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map(brand => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-brand-navy mb-1">Show Competition</label>
          <Select value={filters.showCompetition} onValueChange={(value) => handleFilterUpdate('showCompetition', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select competition view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Own Only">Own Only</SelectItem>
              <SelectItem value="Own + Competitor">Own + Competitor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-brand-navy mb-1">Seller Type</label>
          <Select value={filters.sellerType} onValueChange={(value) => handleFilterUpdate('sellerType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select seller type" />
            </SelectTrigger>
            <SelectContent>
              {sellerTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-shrink-0 mt-6">
          <ExportButton data={data} />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
