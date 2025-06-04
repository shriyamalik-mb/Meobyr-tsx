
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BrandComparisonDropdownProps {
  brands: string[];
  brand1: string;
  brand2: string;
  onChange: (brand1: string, brand2: string) => void;
}

const BrandComparisonDropdown = ({ brands, brand1, brand2, onChange }: BrandComparisonDropdownProps) => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <span className="text-sm font-medium text-gray-700">Compare Brands:</span>
      <div className="flex space-x-2">
        <Select value={brand1} onValueChange={(value) => onChange(value, brand2)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Brand 1" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <span className="text-gray-500 self-center">vs</span>
        
        <Select value={brand2} onValueChange={(value) => onChange(brand1, value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Brand 2" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BrandComparisonDropdown;
