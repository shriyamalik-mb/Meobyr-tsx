
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  data: any[];
}

const ExportButton = ({ data }: ExportButtonProps) => {
  const handleExport = () => {
    // Convert data to CSV format
    const headers = ['Category', 'Brand', 'SKU', 'Seller Type', 'Competition', 'Amazon', 'Deliveroo', 'Morrisons.com', 'Sainsbury.com', 'Tesco.com', 'Uber Eats', 'Waitrose.com'];
    
    const csvContent = [
      headers.join(','),
      ...data.map(item => [
        item.category,
        item.brand,
        item.sku,
        item.sellerType,
        item.isCompetition ? 'Yes' : 'No',
        item.retailerCounts.Amazon || 0,
        item.retailerCounts.Deliveroo || 0,
        item.retailerCounts['Morrisons.com'] || 0,
        item.retailerCounts['Sainsbury.com'] || 0,
        item.retailerCounts['Tesco.com'] || 0,
        item.retailerCounts['Uber Eats'] || 0,
        item.retailerCounts['Waitrose.com'] || 0
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'catalogue-data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button 
      onClick={handleExport}
      variant="outline"
      className="flex items-center space-x-2 border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white"
    >
      <Download className="w-4 h-4" />
      <span>Export Data</span>
    </Button>
  );
};

export default ExportButton;
