
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface TabViewControlsProps {
  selectedTab: string;
  selectedView: 'own' | 'competition';
  onTabChange: (tab: any) => void;
  onViewChange: (view: 'own' | 'competition') => void;
  onExport: () => void;
  tabLabels?: { tab1: string; tab2: string };
}

const TabViewControls = ({ 
  selectedTab, 
  selectedView, 
  onTabChange, 
  onViewChange, 
  onExport,
  tabLabels = { tab1: 'Distribution', tab2: 'TDPs' }
}: TabViewControlsProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-6">
        {/* Select Tab */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Select Tab:</span>
          <div className="flex rounded-lg border border-gray-300">
            <button
              onClick={() => onTabChange(tabLabels.tab1.toLowerCase())}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                selectedTab === tabLabels.tab1.toLowerCase()
                  ? 'bg-brand-sage text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tabLabels.tab1}
            </button>
            <button
              onClick={() => onTabChange(tabLabels.tab2.toLowerCase())}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                selectedTab === tabLabels.tab2.toLowerCase()
                  ? 'bg-brand-sage text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tabLabels.tab2}
            </button>
          </div>
        </div>

        {/* Select View */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Select View:</span>
          <div className="flex rounded-lg border border-gray-300">
            <button
              onClick={() => onViewChange('own')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                selectedView === 'own'
                  ? 'bg-brand-sage text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Own brands
            </button>
            <button
              onClick={() => onViewChange('competition')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                selectedView === 'competition'
                  ? 'bg-brand-sage text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Competition
            </button>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <Button onClick={onExport} variant="outline" className="flex items-center space-x-2">
        <Download className="w-4 h-4" />
        <span>Export data</span>
      </Button>
    </div>
  );
};

export default TabViewControls;
