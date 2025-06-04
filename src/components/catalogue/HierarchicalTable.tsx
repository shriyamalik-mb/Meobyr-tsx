
import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TableRowGroup from './TableRowGroup';
import TableRowSku from './TableRowSku';

interface HierarchicalTableProps {
  data: any[];
  view: 'category' | 'retailer';
}

const HierarchicalTable = ({ data, view }: HierarchicalTableProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Get all retailers for column headers
  const retailers = useMemo(() => {
    const retailerSet = new Set<string>();
    data.forEach(item => {
      Object.keys(item.retailerCounts).forEach(retailer => {
        retailerSet.add(retailer);
      });
    });
    return Array.from(retailerSet).sort();
  }, [data]);

  // Group data hierarchically
  const groupedData = useMemo(() => {
    const groups: any = {};
    
    data.forEach(item => {
      const categoryKey = item.category;
      const brandKey = `${categoryKey}|${item.brand}`;
      
      if (!groups[categoryKey]) {
        groups[categoryKey] = {
          label: categoryKey,
          level: 1,
          brands: {},
          totals: {}
        };
        
        // Initialize totals
        retailers.forEach(retailer => {
          groups[categoryKey].totals[retailer] = 0;
        });
      }
      
      if (!groups[categoryKey].brands[brandKey]) {
        groups[categoryKey].brands[brandKey] = {
          label: item.brand,
          level: 2,
          skus: [],
          totals: {}
        };
        
        // Initialize totals
        retailers.forEach(retailer => {
          groups[categoryKey].brands[brandKey].totals[retailer] = 0;
        });
      }
      
      groups[categoryKey].brands[brandKey].skus.push(item);
      
      // Add to totals
      retailers.forEach(retailer => {
        const count = item.retailerCounts[retailer] || 0;
        groups[categoryKey].brands[brandKey].totals[retailer] += count;
        groups[categoryKey].totals[retailer] += count;
      });
    });
    
    return groups;
  }, [data, retailers]);

  // Calculate grand totals
  const grandTotals = useMemo(() => {
    const totals: { [key: string]: number } = {};
    retailers.forEach(retailer => {
      totals[retailer] = 0;
      Object.values(groupedData).forEach((group: any) => {
        totals[retailer] += group.totals[retailer] || 0;
      });
    });
    return totals;
  }, [groupedData, retailers]);

  const toggleGroup = (groupKey: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <div className="border border-brand-light rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Product</TableHead>
            {retailers.map(retailer => (
              <TableHead key={retailer} className="text-center">{retailer}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedData).map(([categoryKey, category]: [string, any]) => (
            <React.Fragment key={categoryKey}>
              <TableRowGroup
                groupKey={categoryKey}
                level={1}
                label={category.label}
                aggregatedValues={retailers.map(retailer => category.totals[retailer])}
                isExpanded={expandedGroups.has(categoryKey)}
                onToggle={toggleGroup}
                retailers={retailers}
              />
              
              {expandedGroups.has(categoryKey) && Object.entries(category.brands).map(([brandKey, brand]: [string, any]) => (
                <React.Fragment key={brandKey}>
                  <TableRowGroup
                    groupKey={brandKey}
                    level={2}
                    label={brand.label}
                    aggregatedValues={retailers.map(retailer => brand.totals[retailer])}
                    isExpanded={expandedGroups.has(brandKey)}
                    onToggle={toggleGroup}
                    retailers={retailers}
                  />
                  
                  {expandedGroups.has(brandKey) && brand.skus.map((sku: any, index: number) => (
                    <TableRowSku
                      key={`${brandKey}-${index}`}
                      skuName={sku.sku}
                      values={retailers.map(retailer => sku.retailerCounts[retailer] || 0)}
                      retailers={retailers}
                    />
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
          
          {/* Grand Total Row */}
          <TableRow className="bg-brand-light font-semibold">
            <TableCell className="font-bold">Grand Total</TableCell>
            {retailers.map(retailer => (
              <TableCell key={retailer} className="text-center font-bold">
                {grandTotals[retailer]}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default HierarchicalTable;
