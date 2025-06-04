
import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface AvailabilityTableProps {
  data: any[];
}

const AvailabilityTable = ({ data }: AvailabilityTableProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['Amazon', 'Tesco.com', 'Sainsbury.com']));

  const retailers = ['Amazon', 'Deliveroo', 'Morrisons.com', 'Sainsbury.com', 'Tesco.com', 'Uber Eats', 'Waitrose.com'];

  // Build hierarchical structure: Retailer → Area → District → Postcode → Category → Product
  const hierarchicalData = useMemo(() => {
    const hierarchy: any = {};

    data.forEach(item => {
      const retailerKey = item.retailer;
      const areaKey = `${retailerKey}|${item.area}`;
      const districtKey = `${areaKey}|${item.district}`;
      const postcodeKey = `${districtKey}|${item.postcode}`;
      const categoryKey = `${postcodeKey}|${item.category}`;

      if (!hierarchy[retailerKey]) {
        hierarchy[retailerKey] = {
          type: 'retailer',
          label: item.retailer,
          children: {},
          aggregatedValues: {}
        };
      }

      if (!hierarchy[retailerKey].children[areaKey]) {
        hierarchy[retailerKey].children[areaKey] = {
          type: 'area',
          label: item.area,
          children: {},
          aggregatedValues: {}
        };
      }

      if (!hierarchy[retailerKey].children[areaKey].children[districtKey]) {
        hierarchy[retailerKey].children[areaKey].children[districtKey] = {
          type: 'district',
          label: item.district,
          children: {},
          aggregatedValues: {}
        };
      }

      if (!hierarchy[retailerKey].children[areaKey].children[districtKey].children[postcodeKey]) {
        hierarchy[retailerKey].children[areaKey].children[districtKey].children[postcodeKey] = {
          type: 'postcode',
          label: item.postcode,
          children: {},
          aggregatedValues: {}
        };
      }

      if (!hierarchy[retailerKey].children[areaKey].children[districtKey].children[postcodeKey].children[categoryKey]) {
        hierarchy[retailerKey].children[areaKey].children[districtKey].children[postcodeKey].children[categoryKey] = {
          type: 'category',
          label: item.category,
          children: [],
          aggregatedValues: {}
        };
      }

      hierarchy[retailerKey].children[areaKey].children[districtKey].children[postcodeKey].children[categoryKey].children.push({
        type: 'product',
        label: item.product,
        availabilityCount: item.availabilityCount,
        retailer: item.retailer
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
          // Product level
          node.children.forEach((child: any) => {
            if (child.retailer && retailers.includes(child.retailer)) {
              aggregated[child.retailer] += child.availabilityCount || 0;
            }
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
      if (node.type !== 'product') {
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
            // Product children
            node.children.forEach((child: any, index: number) => {
              rows.push(
                <TableRow key={`${key}-product-${index}`} className="hover:bg-gray-50">
                  <TableCell style={{ paddingLeft: `${(level + 1) * 20 + 16}px` }}>
                    <span className="text-gray-700">{child.label}</span>
                  </TableCell>
                  {retailers.map(retailer => (
                    <TableCell key={retailer} className="text-center">
                      {child.retailer === retailer ? (child.availabilityCount || 0) : 0}
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
      if (retailers.includes(item.retailer)) {
        totals[item.retailer] += item.availabilityCount || 0;
      }
    });

    return totals;
  }, [data]);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-brand-navy mb-4">Availability Details</h3>
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

export default AvailabilityTable;
