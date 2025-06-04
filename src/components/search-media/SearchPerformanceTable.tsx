
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Eye, Search } from 'lucide-react';
import ProductKeywordDetailsModal from '@/components/search-media/ProductKeywordDetailsModal';

const searchPerformanceData = [
  {
    platform: 'Amazon.ae',
    searchScore: 8.2,
    genericScore: 7.8,
    brandedScore: 8.7,
    competitionScore: 2.3,
    productCount: 1,
    brands: [
      {
        brand: 'NIVEA',
        searchScore: 8.2,
        genericScore: 7.8,
        brandedScore: 8.7,
        competitionScore: 2.3,
        productCount: 1,
        products: [
          {
            productName: 'NIVEA Soft Moisturising Cream',
            brand: 'NIVEA',
            platform: 'Amazon.ae',
            searchScore: 8.2,
            genericScore: 7.8,
            brandedScore: 8.7,
            competitionScore: 2.3,
            keywords: {
              generic: [
                {
                  keyword: 'body lotion UAE',
                  totalSkus: 5,
                  skusVisible: 3,
                  visibleSkus: [
                    'NIVEA Rich Nourishing Body Lotion (250ml)',
                    'NIVEA Rich Nourishing Body Lotion (400ml)'
                  ],
                  notVisibleSkus: [
                    'NIVEA Rich Nourishing Body Lotion (100ml)',
                    'NIVEA Rich Nourishing Body Lotion (500ml)'
                  ]
                }
              ],
              branded: [
                {
                  keyword: 'NIVEA body lotion',
                  totalSkus: 8,
                  skusVisible: 7,
                  visibleSkus: [
                    'NIVEA Body Lotion Aloe Vera (250ml)',
                    'NIVEA Body Lotion Aloe Vera (400ml)',
                    'NIVEA Body Lotion Cocoa Butter (250ml)'
                  ],
                  notVisibleSkus: [
                    'NIVEA Body Lotion Sensitive (400ml)'
                  ]
                }
              ],
              competition: [
                {
                  keyword: 'best moisturizer UAE',
                  totalSkus: 3,
                  skusVisible: 1,
                  visibleSkus: [
                    'NIVEA Premium Moisturizer (100ml)'
                  ],
                  notVisibleSkus: [
                    'NIVEA Premium Moisturizer (200ml)',
                    'NIVEA Premium Moisturizer (300ml)'
                  ]
                }
              ]
            }
          }
        ]
      }
    ]
  }
];

const SearchPerformanceTable = () => {
  const [expandedPlatforms, setExpandedPlatforms] = useState<Set<string>>(new Set(['Amazon.ae']));
  const [expandedBrands, setExpandedBrands] = useState<Set<string>>(new Set(['Amazon.ae-NIVEA']));
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePlatform = (platform: string) => {
    const newExpanded = new Set(expandedPlatforms);
    if (newExpanded.has(platform)) {
      newExpanded.delete(platform);
    } else {
      newExpanded.add(platform);
    }
    setExpandedPlatforms(newExpanded);
  };

  const toggleBrand = (platformBrand: string) => {
    const newExpanded = new Set(expandedBrands);
    if (newExpanded.has(platformBrand)) {
      newExpanded.delete(platformBrand);
    } else {
      newExpanded.add(platformBrand);
    }
    setExpandedBrands(newExpanded);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const handleDetailsClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const renderScoreCell = (score: number) => (
    <Badge className={getScoreColor(score)}>
      {score.toFixed(1)}/10
    </Badge>
  );

  return (
    <>
      <Card className="border-brand-light">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-navy">
            <Search className="h-5 w-5 text-brand-sage" />
            Search Performance by Platform, Brand & Products
          </CardTitle>
          <p className="text-sm text-gray-600">Hierarchical view of keyword performance across platforms</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-light">
                  <th className="text-left py-3 px-4 font-medium text-brand-navy">Platform / Brand / Product</th>
                  <th className="text-left py-3 px-4 font-medium text-brand-navy">Search</th>
                  <th className="text-left py-3 px-4 font-medium text-brand-navy">Generic</th>
                  <th className="text-left py-3 px-4 font-medium text-brand-navy">Branded</th>
                  <th className="text-left py-3 px-4 font-medium text-brand-navy">Competition</th>
                  <th className="text-left py-3 px-4 font-medium text-brand-navy">Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchPerformanceData.map((platform, platformIndex) => (
                  <React.Fragment key={platformIndex}>
                    <tr 
                      className="border-b border-gray-100 hover:bg-brand-cream/50 cursor-pointer"
                      onClick={() => togglePlatform(platform.platform)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {expandedPlatforms.has(platform.platform) ? (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                          )}
                          <span className="font-semibold text-brand-navy">{platform.platform}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{renderScoreCell(platform.searchScore)}</td>
                      <td className="py-3 px-4">{renderScoreCell(platform.genericScore)}</td>
                      <td className="py-3 px-4">{renderScoreCell(platform.brandedScore)}</td>
                      <td className="py-3 px-4">{renderScoreCell(platform.competitionScore)}</td>
                      <td className="py-3 px-4">
                        <span className="text-gray-500 text-xs">{platform.productCount} products</span>
                      </td>
                    </tr>

                    {expandedPlatforms.has(platform.platform) && platform.brands.map((brand, brandIndex) => (
                      <React.Fragment key={brandIndex}>
                        <tr 
                          className="border-b border-gray-100 hover:bg-brand-cream/50 cursor-pointer bg-brand-sage/10"
                          onClick={() => toggleBrand(`${platform.platform}-${brand.brand}`)}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 pl-6">
                              {expandedBrands.has(`${platform.platform}-${brand.brand}`) ? (
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-500" />
                              )}
                              <span className="font-medium text-brand-navy">{brand.brand}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{renderScoreCell(brand.searchScore)}</td>
                          <td className="py-3 px-4">{renderScoreCell(brand.genericScore)}</td>
                          <td className="py-3 px-4">{renderScoreCell(brand.brandedScore)}</td>
                          <td className="py-3 px-4">{renderScoreCell(brand.competitionScore)}</td>
                          <td className="py-3 px-4">
                            <span className="text-gray-500 text-xs">{brand.productCount} products</span>
                          </td>
                        </tr>

                        {expandedBrands.has(`${platform.platform}-${brand.brand}`) && brand.products.map((product, productIndex) => (
                          <tr key={productIndex} className="border-b border-gray-100 hover:bg-brand-cream/50">
                            <td className="py-3 px-4">
                              <div className="pl-12">
                                <span className="text-brand-navy">{product.productName}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{renderScoreCell(product.searchScore)}</td>
                            <td className="py-3 px-4">{renderScoreCell(product.genericScore)}</td>
                            <td className="py-3 px-4">{renderScoreCell(product.brandedScore)}</td>
                            <td className="py-3 px-4">{renderScoreCell(product.competitionScore)}</td>
                            <td className="py-3 px-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDetailsClick(product)}
                                className="flex items-center gap-1 text-xs border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white"
                              >
                                <Eye className="h-3 w-3" />
                                Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <ProductKeywordDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </>
  );
};

export default SearchPerformanceTable;
