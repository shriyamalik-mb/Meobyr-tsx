
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HierarchicalDropdownProps {
  data: any;
  placeholder?: string;
  onChange: (filters: any) => void;
}

const HierarchicalDropdown = ({ data, placeholder = "Select Location", onChange }: HierarchicalDropdownProps) => {
  const [selectedLocation, setSelectedLocation] = useState('All');

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    onChange({ location: value });
  };

  // Simplified implementation - in a real app this would be a proper tree structure
  const locationOptions = [
    'All',
    'UK > London > North London > Camden',
    'UK > London > South London > Greenwich',
    'UK > London > East London > Newham',
    'UK > London > West London > Hammersmith',
    'UK > Manchester > Central Manchester',
    'UK > Birmingham > City Centre',
    'UK > Liverpool > City Centre',
    'UK > Leeds > City Centre'
  ];

  return (
    <div>
      <Select value={selectedLocation} onValueChange={handleLocationChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {locationOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default HierarchicalDropdown;
