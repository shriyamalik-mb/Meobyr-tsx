
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SKUData, FilterState } from "@/types/dashboard";
import { PlatformRow } from "./PlatformRow";
import { CategoryRow } from "./CategoryRow";
import { BrandRow } from "./BrandRow";
import { ProductRow } from "./ProductRow";

interface TitleSummaryTableProps {
  data: SKUData[];
  filters?: FilterState;
  onDrillDown: (retailer: string, platform: string, category?: string, brand?: string, product?: string) => void;
}

export const TitleSummaryTable = ({ data, filters, onDrillDown }: TitleSummaryTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

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

  // Group filtered data by retailer, platform, category, brand, and product
  const groupedData = filteredData.reduce((acc, sku) => {
    const platformKey = `${sku.retailer}-${sku.platform}`;
    const categoryKey = `${platformKey}-${sku.category}`;
    const brandKey = `${categoryKey}-${sku.brand}`;
    const productKey = `${brandKey}-${sku.name.split(' ').slice(0, 2).join(' ')}`;
    
    if (!acc[platformKey]) {
      acc[platformKey] = {
        retailer: sku.retailer,
        platform: sku.platform,
        categories: {}
      };
    }
    
    if (!acc[platformKey].categories[categoryKey]) {
      acc[platformKey].categories[categoryKey] = {
        category: sku.category,
        brands: {}
      };
    }
    
    if (!acc[platformKey].categories[categoryKey].brands[brandKey]) {
      acc[platformKey].categories[categoryKey].brands[brandKey] = {
        brand: sku.brand,
        products: {}
      };
    }
    
    if (!acc[platformKey].categories[categoryKey].brands[brandKey].products[productKey]) {
      acc[platformKey].categories[categoryKey].brands[brandKey].products[productKey] = {
        product: sku.name.split(' ').slice(0, 2).join(' '),
        skus: [],
        skuCount: 0
      };
    }
    
    acc[platformKey].categories[categoryKey].brands[brandKey].products[productKey].skus.push(sku);
    acc[platformKey].categories[categoryKey].brands[brandKey].products[productKey].skuCount++;
    
    return acc;
  }, {} as Record<string, any>);

  // Calculate scores for each level
  const calculateScores = (skus: SKUData[]) => {
    const lengthScore = Math.round(
      skus.reduce((acc, sku) => acc + (sku.title.lengthCompliant ? 100 : 0), 0) / skus.length
    );
    
    const structureScore = Math.round(
      skus.reduce((acc, sku) => acc + (sku.title.hasRecommendedStructure ? 100 : 0), 0) / skus.length
    );
    
    const searchTermsScore = Math.round(
      skus.reduce((acc, sku) => acc + (sku.title.containsSearchTerms ? 100 : 0), 0) / skus.length
    );
    
    const overallTitleScore = Math.round(
      skus.reduce((acc, sku) => acc + sku.title.score.overall, 0) / skus.length
    );

    return {
      lengthScore,
      structureScore,
      searchTermsScore,
      overallTitleScore,
      skuCount: skus.length
    };
  };

  const toggleRowExpansion = (key: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Title Performance Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3 font-medium">Platform / Category / Brand / Product</th>
                <th className="text-left p-3 font-medium">Items</th>
                <th className="text-center p-3 font-medium">Overall Title</th>
                <th className="text-center p-3 font-medium">Length</th>
                <th className="text-center p-3 font-medium">Structure</th>
                <th className="text-center p-3 font-medium">Search Terms</th>
                <th className="text-center p-3 font-medium">SKUs</th>
                <th className="text-center p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedData).map(([platformKey, platformData]: [string, any]) => {
                const allPlatformSkus = Object.values(platformData.categories).flatMap((cat: any) =>
                  Object.values(cat.brands).flatMap((brand: any) =>
                    Object.values(brand.products).flatMap((prod: any) => prod.skus)
                  )
                );
                const platformScore = calculateScores(allPlatformSkus);
                
                return (
                  <React.Fragment key={platformKey}>
                    {/* Platform Row */}
                    <PlatformRow
                      platformKey={platformKey}
                      platformGroup={{
                        retailer: platformData.retailer,
                        platform: platformData.platform,
                        products: Object.values(platformData.categories).flatMap((cat: any) =>
                          Object.values(cat.brands).flatMap((brand: any) =>
                            Object.values(brand.products)
                          )
                        )
                      }}
                      platformScore={platformScore}
                      isExpanded={expandedRows.has(platformKey)}
                      onToggleExpansion={toggleRowExpansion}
                      onDrillDown={onDrillDown}
                    />
                    
                    {/* Category Rows */}
                    {expandedRows.has(platformKey) && Object.entries(platformData.categories).map(([categoryKey, categoryData]: [string, any]) => {
                      const allCategorySkus = Object.values(categoryData.brands).flatMap((brand: any) =>
                        Object.values(brand.products).flatMap((prod: any) => prod.skus)
                      );
                      const categoryScore = calculateScores(allCategorySkus);
                      
                      return (
                        <React.Fragment key={categoryKey}>
                          <CategoryRow
                            categoryKey={categoryKey}
                            categoryGroup={{
                              category: categoryData.category,
                              brands: Object.values(categoryData.brands)
                            }}
                            categoryScore={categoryScore}
                            isExpanded={expandedRows.has(categoryKey)}
                            onToggleExpansion={toggleRowExpansion}
                            onDrillDown={onDrillDown}
                            retailer={platformData.retailer}
                            platform={platformData.platform}
                          />
                          
                          {/* Brand Rows */}
                          {expandedRows.has(categoryKey) && Object.entries(categoryData.brands).map(([brandKey, brandData]: [string, any]) => {
                            const allBrandSkus = Object.values(brandData.products).flatMap((prod: any) => prod.skus);
                            const brandScore = calculateScores(allBrandSkus);
                            
                            return (
                              <React.Fragment key={brandKey}>
                                <BrandRow
                                  brandKey={brandKey}
                                  brandGroup={{
                                    brand: brandData.brand,
                                    products: Object.values(brandData.products)
                                  }}
                                  brandScore={brandScore}
                                  isExpanded={expandedRows.has(brandKey)}
                                  onToggleExpansion={toggleRowExpansion}
                                  onDrillDown={onDrillDown}
                                  retailer={platformData.retailer}
                                  platform={platformData.platform}
                                  category={categoryData.category}
                                />
                                
                                {/* Product Rows */}
                                {expandedRows.has(brandKey) && Object.entries(brandData.products).map(([productKey, productData]: [string, any]) => {
                                  const productScore = calculateScores(productData.skus);
                                  
                                  return (
                                    <ProductRow
                                      key={productKey}
                                      product={{
                                        retailer: platformData.retailer,
                                        platform: platformData.platform,
                                        category: categoryData.category,
                                        brand: brandData.brand,
                                        product: productData.product,
                                        overallTitle: productScore.overallTitleScore,
                                        length: productScore.lengthScore,
                                        structure: productScore.structureScore,
                                        searchTerms: productScore.searchTermsScore,
                                        skuCount: productScore.skuCount
                                      }}
                                      onDrillDown={onDrillDown}
                                      tabType="title"
                                    />
                                  );
                                })}
                              </React.Fragment>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
