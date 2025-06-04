
import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface DistributionTableProps {
  data: any[];
}

const DistributionTable = ({ data }: DistributionTableProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['United Kingdom']));

  const retailers = ['Amazon', 'Deliveroo', 'Morrisons.com', 'Sainsbury.com', 'Tesco.com', 'Uber Eats', 'Waitrose.com'];

  // Build hierarchical structure
  const hierarchicalData = useMemo(() => {
    const hierarchy: any = {};

    data.forEach(item => {
      const countryKey = item.country;
      const regionKey = `${countryKey}|${item.region}`;
      const districtKey = `${regionKey}|${item.district}`;
      const categoryKey = `${districtKey}|${item.category}`;
      const brandKey = `${categoryKey}|${item.brand}`;

      if (!hierarchy[countryKey]) {
        hierarchy[countryKey] = {
          type: 'country',
          label: item.country,
          children: {},
          aggregatedValues: {}
        };
      }

      if (!hierarchy[countryKey].children[regionKey]) {
        hierarchy[countryKey].children[regionKey] = {
          type: 'region',
          label: item.region,
          children: {},
          aggregatedValues: {}
        };
      }

      if (!hierarchy[countryKey].children[regionKey].children[districtKey]) {
        hierarchy[countryKey].children[regionKey].children[districtKey] = {
          type: 'district',
          label: item.district,
          children: {},
          aggregatedValues: {}
        };
      }

      if (!hierarchy[countryKey].children[regionKey].children[districtKey].children[categoryKey]) {
        hierarchy[countryKey].children[regionKey].children[districtKey].children[categoryKey] = {
          type: 'category',
          label: item.category,
          children: {},
          aggregatedValues: {}
        };
      }

      if (!hierarchy[countryKey].children[regionKey].children[districtKey].children[categoryKey].children[brandKey]) {
        hierarchy[countryKey].children[regionKey].children[districtKey].children[categoryKey].children[brandKey] = {
          type: 'brand',
          label: item.brand,
          children: [],
          aggregatedValues: {}
        };
      }

      hierarchy[countryKey].children[regionKey].children[districtKey].children[categoryKey].children[brandKey].children.push({
        type: 'sku',
        label: item.sku,
        values: item.retailerCounts
      });
    });

    // Calculate aggregated values
    const calculateAggregates = (node: any): any => {
      const aggregated: any = {};
      retailers.forEach(retailer => {
        aggregated[retailer] = 0;
      });

      if (node.children) {
        if (Array.isArray(node.children)) {
          // SKU level
          node.children.forEach((child: any) => {
            retailers.forEach(retailer => {
              aggregated[retailer] += child.values[retailer] || 0;
            });
          });
        } else {
          // Group level
          Object.values(node.children).forEach((child: any) => {
            const childAggregates = calculateAggregates(child);
            retailers.forEach(retailer => {
              aggregated[retailer] += childAggregates[retailer] || 0;
            });
          });
        }
      }

      node.aggregatedValues = aggregated;
      return aggregated;
    };

    Object.values(hierarchy).forEach(calculateAggregates);
    return hierarchy;
  }, [data]);

  const toggleExpanded = (key: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedGroups(newExpanded);
  };

  const renderRows = () => {
    const rows: JSX.Element[] = [];

    const renderNode = (node: any, key: string, level: number) => {
      const isExpanded = expandedGroups.has(key);
      const hasChildren = node.children && (Array.isArray(node.children) ? node.children.length > 0 : Object.keys(node.children).length > 0);

      // Group row
      if (node.type !== 'sku') {
        rows.push(
          <TableRow key={key} className="bg-gray-50 hover:bg-gray-100">
            <TableCell style={{ paddingLeft: `${level * 20 + 16}px` }}>
              <div className="flex items-center space-x-2">
                {hasChildren && (
                  <button
                    onClick={() => toggleExpanded(key)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                )}
                <span className="font-semibold text-brand-navy">{node.label}</span>
              </div>
            </TableCell>
            {retailers.map(retailer => (
              <TableCell key={retailer} className="text-center font-medium">
                {node.aggregatedValues[retailer]}
              </TableCell>
            ))}
          </TableRow>
        );

        // Render children if expanded
        if (isExpanded && hasChildren) {
          if (Array.isArray(node.children)) {
            // SKU children
            node.children.forEach((child: any, index: number) => {
              rows.push(
                <TableRow key={`${key}-sku-${index}`} className="hover:bg-gray-50">
                  <TableCell style={{ paddingLeft: `${(level + 1) * 20 + 16}px` }}>
                    <span className="text-gray-700">{child.label}</span>
                  </TableCell>
                  {retailers.map(retailer => (
                    <TableCell key={retailer} className="text-center">
                      {child.values[retailer] || 0}
                    </TableCell>
                  ))}
                </TableRow>
              );
            });
          } else {
            // Group children
            Object.entries(node.children).forEach(([childKey, childNode]) => {
              renderNode(childNode, childKey, level + 1);
            });
          }
        }
      }
    };

    Object.entries(hierarchicalData).forEach(([key, node]) => {
      renderNode(node, key, 0);
    });

    return rows;
  };

  // Calculate grand totals
  const grandTotals = useMemo(() => {
    const totals: any = {};
    retailers.forEach(retailer => {
      totals[retailer] = 0;
    });

    data.forEach(item => {
      retailers.forEach(retailer => {
        totals[retailer] += item.retailerCounts[retailer] || 0;
      });
    });

    return totals;
  }, [data]);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-brand-navy mb-4">Distribution Data</h3>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Location / Product</TableHead>
              {retailers.map(retailer => (
                <TableHead key={retailer} className="text-center font-semibold">
                  {retailer}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderRows()}
            {/* Grand Total Row */}
            <TableRow className="bg-brand-navy text-white font-semibold">
              <TableCell>Grand Total</TableCell>
              {retailers.map(retailer => (
                <TableCell key={retailer} className="text-center">
                  {grandTotals[retailer]}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DistributionTable;
