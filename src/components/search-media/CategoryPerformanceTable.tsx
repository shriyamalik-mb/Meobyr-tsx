
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Eye } from 'lucide-react';
import CategoryProductDetailsModal from '@/components/search-media/CategoryProductDetailsModal';

const categoryData = [
  {
    platform: 'Amazon.ae',
    avgCategoryShare: 28,
    organicPercent: 17,
    paidPercent: 11,
    brands: [
      {
        brand: 'NIVEA',
        avgCategoryShare: 31,
        organicPercent: 15,
        paidPercent: 16,
        products: [
          { 
            product: 'Men Face Wash', 
            brand: 'NIVEA',
            platform: 'Amazon.ae',
            avgCategoryShare: 31,
            organicPercent: 15,
            paidPercent: 16,
            skus: 12,
            totalSkus: 12
          }
        ]
      },
      {
        brand: 'Eucerin',
        avgCategoryShare: 29,
        organicPercent: 18,
        paidPercent: 12,
        products: []
      }
    ]
  }
];

const CategoryPerformanceTable = () => {
  const [expandedPlatforms, setExpandedPlatforms] = useState<Set<string>>(new Set(['Amazon.ae']));
  const [expandedBrands, setExpandedBrands] = useState<Set<string>>(new Set(['Amazon.ae-NIVEA']));
  const [modalData, setModalData] = useState<any>(null);
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
    if (score >= 30) return 'bg-green-100 text-green-800';
    if (score >= 20) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getPercentColor = (percent: number) => {
    if (percent >= 20) return 'text-brand-sage';
    if (percent >= 15) return 'text-blue-600';
    if (percent >= 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const openModal = (product: any) => {
    setModalData(product);
    setIsModalOpen(true);
  };

  const getTotalProducts = (brands: any[]) => {
    return brands.reduce((total, brand) => total + brand.products.length, 0);
  };

  return (
    <>
      <Card className="border-brand-light">
        <CardHeader>
          <CardTitle className="text-brand-navy">Category Performance Analysis</CardTitle>
          <p className="text-sm text-gray-600">Hierarchical view of brand and product performance within categories</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-light">
                  <th className="text-left py-3 px-4 font-medium text-brand-navy">Platform / Brand / Product</th>
                  <th className="text-left py-3 px-4 font-medium text-brand-navy">Avg Category Share</th>
                  <th className="text-left py-3 px-4 font-medium text-brand-navy">Organic %</th>
                  <th className="text-left py-3 px-4 font-medium text-brand-navy">Paid %</th>
                  <th className="text-left py-3 px-4 font-medium text-brand-navy"># of SKUs</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((platform, platformIndex) => (
                  <React.Fragment key={`platform-${platformIndex}`}>
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
                          <span className="text-xs text-gray-500">({platform.brands.length} brands)</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getScoreColor(platform.avgCategoryShare)}>
                          {platform.avgCategoryShare}%
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${getPercentColor(platform.organicPercent)}`}>
                          {platform.organicPercent}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${getPercentColor(platform.paidPercent)}`}>
                          {platform.paidPercent}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-500">{getTotalProducts(platform.brands)} products</span>
                      </td>
                    </tr>

                    {expandedPlatforms.has(platform.platform) && platform.brands.map((brand, brandIndex) => (
                      <React.Fragment key={`brand-${platformIndex}-${brandIndex}`}>
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
                          <td className="py-3 px-4">
                            <Badge className={getScoreColor(brand.avgCategoryShare)}>
                              {brand.avgCategoryShare}%
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-semibold ${getPercentColor(brand.organicPercent)}`}>
                              {brand.organicPercent}%
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-semibold ${getPercentColor(brand.paidPercent)}`}>
                              {brand.paidPercent}%
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-gray-500">{brand.products.length} products</span>
                          </td>
                        </tr>

                        {expandedBrands.has(`${platform.platform}-${brand.brand}`) && brand.products.map((product, productIndex) => (
                          <tr key={`product-${platformIndex}-${brandIndex}-${productIndex}`} className="border-b border-gray-100 hover:bg-brand-cream/50">
                            <td className="py-3 px-4">
                              <div className="pl-12">
                                <span className="text-brand-navy">{product.product}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={getScoreColor(product.avgCategoryShare)}>
                                {product.avgCategoryShare}%
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`font-semibold ${getPercentColor(product.organicPercent)}`}>
                                {product.organicPercent}%
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`font-semibold ${getPercentColor(product.paidPercent)}`}>
                                {product.paidPercent}%
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openModal(product)}
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

      <CategoryProductDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productData={modalData}
      />
    </>
  );
};

export default CategoryPerformanceTable;
