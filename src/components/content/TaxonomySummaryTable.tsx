
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlatformRow } from "./PlatformRow";
import { CategoryRow } from "./CategoryRow";
import { BrandRow } from "./BrandRow";
import { ProductRow } from "./ProductRow";
import { SKUData, FilterState } from "@/types/dashboard";

interface TaxonomySummaryTableProps {
  data: SKUData[];
  filters?: FilterState;
  onDrillDown: (retailer: string, platform: string, category?: string, brand?: string, product?: string) => void;
}

interface GroupedData {
  [key: string]: {
    retailer: string;
    platform: string;
    categories: {
      [key: string]: {
        category: string;
        brands: {
          [key: string]: {
            brand: string;
            products: SKUData[];
          };
        };
      };
    };
  };
}

export const TaxonomySummaryTable = ({ data, filters, onDrillDown }: TaxonomySummaryTableProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpansion = (key: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedItems(newExpanded);
  };

  // Filter data based on selected filters
  const filteredData = data.filter(sku => {
    if (filters?.retailer && filters.retailer !== 'All' && sku.retailer !== filters.retailer) {
      return false;
    }
    if (filters?.brand && filters.brand !== 'All' && sku.brand !== filters.brand) {
      return false;
    }
    if (filters?.category && filters.category !== 'All' && sku.category !== filters.category) {
      return false;
    }
    if (filters?.sku && filters.sku !== 'All' && sku.id !== filters.sku) {
      return false;
    }
    return true;
  });

  // Group filtered data by platform/retailer
  const groupedData: GroupedData = filteredData.reduce((acc, sku) => {
    const platformKey = `${sku.retailer}-${sku.platform}`;
    if (!acc[platformKey]) {
      acc[platformKey] = {
        retailer: sku.retailer,
        platform: sku.platform,
        categories: {}
      };
    }
    
    if (!acc[platformKey].categories[sku.category]) {
      acc[platformKey].categories[sku.category] = {
        category: sku.category,
        brands: {}
      };
    }
    
    if (!acc[platformKey].categories[sku.category].brands[sku.brand]) {
      acc[platformKey].categories[sku.category].brands[sku.brand] = {
        brand: sku.brand,
        products: []
      };
    }
    
    acc[platformKey].categories[sku.category].brands[sku.brand].products.push(sku);
    return acc;
  }, {} as GroupedData);

  const calculateTaxonomyScores = (skus: SKUData[]) => {
    const overallTitleScore = Math.round(skus.reduce((sum, sku) => sum + sku.taxonomy.score.overall, 0) / skus.length);
    const lengthScore = Math.round(skus.reduce((sum, sku) => sum + (sku.taxonomy.correctCategory ? 100 : 0), 0) / skus.length);
    const structureScore = lengthScore; // Same as correctness for taxonomy
    const searchTermsScore = lengthScore; // Same as correctness for taxonomy
    const skuCount = skus.length;

    return { overallTitleScore, lengthScore, structureScore, searchTermsScore, skuCount };
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Platform/Category/Brand</TableHead>
            <TableHead className="w-1/6">Coverage</TableHead>
            <TableHead className="w-1/8 text-center">Overall Score</TableHead>
            <TableHead className="w-1/8 text-center">Correct Category</TableHead>
            <TableHead className="w-1/8 text-center">Accuracy</TableHead>
            <TableHead className="w-1/8 text-center">Compliance</TableHead>
            <TableHead className="w-1/8 text-center">SKU Count</TableHead>
            <TableHead className="w-1/8 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedData).map(([platformKey, platformGroup]) => {
            const allSKUs = Object.values(platformGroup.categories).flatMap(cat => 
              Object.values(cat.brands).flatMap(brand => brand.products)
            );
            const platformScore = calculateTaxonomyScores(allSKUs);
            
            return (
              <React.Fragment key={platformKey}>
                <PlatformRow
                  platformKey={platformKey}
                  platformGroup={{
                    retailer: platformGroup.retailer,
                    platform: platformGroup.platform,
                    products: allSKUs
                  }}
                  platformScore={platformScore}
                  isExpanded={expandedItems.has(platformKey)}
                  onToggleExpansion={toggleExpansion}
                  onDrillDown={onDrillDown}
                />
                
                {expandedItems.has(platformKey) && Object.entries(platformGroup.categories).map(([categoryKey, categoryGroup]) => {
                  const categorySKUs = Object.values(categoryGroup.brands).flatMap(brand => brand.products);
                  const categoryScore = calculateTaxonomyScores(categorySKUs);
                  const fullCategoryKey = `${platformKey}-${categoryKey}`;
                  
                  return (
                    <React.Fragment key={fullCategoryKey}>
                      <CategoryRow
                        categoryKey={fullCategoryKey}
                        categoryGroup={{
                          category: categoryGroup.category,
                          brands: categorySKUs
                        }}
                        categoryScore={categoryScore}
                        isExpanded={expandedItems.has(fullCategoryKey)}
                        onToggleExpansion={toggleExpansion}
                        onDrillDown={onDrillDown}
                        retailer={platformGroup.retailer}
                        platform={platformGroup.platform}
                      />
                      
                      {expandedItems.has(fullCategoryKey) && Object.entries(categoryGroup.brands).map(([brandKey, brandGroup]) => {
                        const brandScore = calculateTaxonomyScores(brandGroup.products);
                        const fullBrandKey = `${fullCategoryKey}-${brandKey}`;
                        
                        return (
                          <React.Fragment key={fullBrandKey}>
                            <BrandRow
                              brandKey={fullBrandKey}
                              brandGroup={{
                                brand: brandGroup.brand,
                                products: brandGroup.products
                              }}
                              brandScore={brandScore}
                              isExpanded={expandedItems.has(fullBrandKey)}
                              onToggleExpansion={toggleExpansion}
                              onDrillDown={onDrillDown}
                              retailer={platformGroup.retailer}
                              platform={platformGroup.platform}
                              category={categoryGroup.category}
                            />
                            
                            {expandedItems.has(fullBrandKey) && brandGroup.products.map((product: SKUData) => (
                              <ProductRow
                                key={product.id}
                                product={{
                                  retailer: product.retailer,
                                  platform: product.platform,
                                  category: product.category,
                                  brand: product.brand,
                                  product: product.name,
                                  overallTitle: product.taxonomy.score.overall,
                                  length: product.taxonomy.correctCategory ? 100 : 0,
                                  structure: product.taxonomy.correctCategory ? 100 : 0,
                                  searchTerms: product.taxonomy.correctCategory ? 100 : 0,
                                  skuCount: 1
                                }}
                                onDrillDown={onDrillDown}
                                tabType="taxonomy"
                              />
                            ))}
                          </React.Fragment>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
