
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CoveragePanelsProps {
  ownFilters: { brand: string; product: string; sku: string };
  competitionFilters: { brand: string; product: string; sku: string };
  onOwnFilterChange: (filters: { brand: string; product: string; sku: string }) => void;
  onCompetitionFilterChange: (filters: { brand: string; product: string; sku: string }) => void;
  data: any[];
  labels?: { own: string; competition: string };
}

const CoveragePanels = ({ 
  ownFilters, 
  competitionFilters, 
  onOwnFilterChange, 
  onCompetitionFilterChange, 
  data,
  labels = { own: 'Own Coverage', competition: 'Competition Coverage' }
}: CoveragePanelsProps) => {
  // Calculate coverage scores based on data (simplified calculation for demo)
  const calculateCoverage = (isCompetition: boolean, filters: typeof ownFilters) => {
    const relevantData = data.filter(item => item.isCompetition === isCompetition);
    // Simplified calculation - in real app this would be more complex
    return Math.round(Math.random() * 100);
  };

  const ownCoverage = calculateCoverage(false, ownFilters);
  const competitionCoverage = calculateCoverage(true, competitionFilters);

  const CoveragePanel = ({ 
    title, 
    coverage, 
    delta, 
    filters, 
    onFilterChange 
  }: { 
    title: string; 
    coverage: number; 
    delta: string; 
    filters: typeof ownFilters; 
    onFilterChange: (filters: typeof ownFilters) => void; 
  }) => (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-brand-navy mb-4">{title}</h3>
      
      {/* Coverage Circle */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 mb-2">
          <div className="w-24 h-24 rounded-full border-8 border-brand-sage flex items-center justify-center bg-white">
            <span className="text-2xl font-bold text-brand-navy">{coverage}%</span>
          </div>
        </div>
        <span className="text-sm text-brand-sage font-medium">{delta}</span>
      </div>

      {/* Filter Dropdowns */}
      <div className="space-y-3">
        <Select value={filters.brand} onValueChange={(value) => onFilterChange({...filters, brand: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All brands">All brands</SelectItem>
            <SelectItem value="Nivea">Nivea</SelectItem>
            <SelectItem value="Vaseline">Vaseline</SelectItem>
            <SelectItem value="Olay">Olay</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.product} onValueChange={(value) => onFilterChange({...filters, product: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All products">All products</SelectItem>
            <SelectItem value="Body lotion">Body lotion</SelectItem>
            <SelectItem value="Face cream">Face cream</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.sku} onValueChange={(value) => onFilterChange({...filters, sku: value})}>
          <SelectTrigger>
            <SelectValue placeholder="SKU" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All SKUs">All SKUs</SelectItem>
            <SelectItem value="Deep impact">Deep impact</SelectItem>
            <SelectItem value="Vitamin D">Vitamin D</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Heatmap Placeholder */}
      <div className="mt-6 h-48 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400">
        <div className="text-center text-gray-600">
          <p className="font-medium">Heatmap placeholder</p>
          <p className="text-sm">(filters apply here)</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <CoveragePanel
        title={labels.own}
        coverage={ownCoverage}
        delta="+5"
        filters={ownFilters}
        onFilterChange={onOwnFilterChange}
      />
      <CoveragePanel
        title={labels.competition}
        coverage={competitionCoverage}
        delta="-3"
        filters={competitionFilters}
        onFilterChange={onCompetitionFilterChange}
      />
    </div>
  );
};

export default CoveragePanels;
