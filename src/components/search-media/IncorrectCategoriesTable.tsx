
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, AlertTriangle, Eye } from 'lucide-react';
import IncorrectSKUModal from '@/components/search-media/IncorrectSKUModal';

const incorrectlyPlacedData = [
  {
    platform: 'Amazon.ae',
    brands: [
      {
        brand: 'NIVEA',
        products: [
          {
            product: 'NIVEA Men Face Wash',
            incorrectCategory: 'Health & Household > Personal Care',
            correctCategory: 'Beauty & Personal Care > Men\'s Grooming',
            skus: [
              'NIVEA Men Deep Clean Face Wash (100ml)',
              'NIVEA Men Active Clean Face Wash (150ml)',
              'NIVEA Men Oil Control Face Wash (100ml)'
            ]
          }
        ]
      },
      {
        brand: 'Eucerin',
        products: [
          {
            product: 'Eucerin Face Cream',
            incorrectCategory: 'Health & Household > Skin Care',
            correctCategory: 'Beauty & Personal Care > Face Care',
            skus: [
              'Eucerin Daily Protection Face Cream (50ml)',
              'Eucerin Hyaluron Face Cream (50ml)'
            ]
          }
        ]
      }
    ]
  }
];

const IncorrectCategoriesTable = () => {
  const [expandedPlatforms, setExpandedPlatforms] = useState<Set<string>>(new Set());
  const [expandedBrands, setExpandedBrands] = useState<Set<string>>(new Set());
  const [selectedProductSKUs, setSelectedProductSKUs] = useState<any>(null);
  const [isSKUModalOpen, setIsSKUModalOpen] = useState(false);

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

  const handleViewSKUs = (product: any) => {
    setSelectedProductSKUs(product);
    setIsSKUModalOpen(true);
  };

  const getTotalIncorrectSKUs = (platformData: any) => {
    return platformData.brands.reduce((total: number, brand: any) => {
      return total + brand.products.reduce((brandTotal: number, product: any) => {
        return brandTotal + product.skus.length;
      }, 0);
    }, 0);
  };

  return (
    <>
      <Card className="border-brand-light">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-navy">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Incorrectly Categorized SKUs
          </CardTitle>
          <p className="text-sm text-gray-600">SKUs that need category reassignment to improve visibility</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-light">
                  <th className="text-left py-3 px-4 font-medium text-brand-navy">Platform / Brand / Product</th>
                  <th className="text-left py-3 px-4 font-medium text-brand-navy">Current Category</th>
                  <th className="text-left py-3 px-4 font-medium text-brand-navy">Recommended Category</th>
                  <th className="text-left py-3 px-4 font-medium text-brand-navy">Affected SKUs</th>
                </tr>
              </thead>
              <tbody>
                {incorrectlyPlacedData.map((platform, platformIndex) => (
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
                      <td className="py-3 px-4 text-gray-500">-</td>
                      <td className="py-3 px-4 text-gray-500">-</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-orange-100 text-orange-800">
                          {getTotalIncorrectSKUs(platform)} SKUs
                        </Badge>
                      </td>
                    </tr>

                    {expandedPlatforms.has(platform.platform) && platform.brands.map((brand, brandIndex) => (
                      <React.Fragment key={brandIndex}>
                        <tr 
                          className="border-b border-gray-100 hover:bg-brand-cream/50 cursor-pointer bg-orange-50"
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
                          <td className="py-3 px-4 text-gray-500">-</td>
                          <td className="py-3 px-4 text-gray-500">-</td>
                          <td className="py-3 px-4">
                            <Badge className="bg-orange-100 text-orange-800">
                              {brand.products.reduce((total: number, product: any) => total + product.skus.length, 0)} SKUs
                            </Badge>
                          </td>
                        </tr>

                        {expandedBrands.has(`${platform.platform}-${brand.brand}`) && brand.products.map((product, productIndex) => (
                          <tr key={productIndex} className="border-b border-gray-100 hover:bg-brand-cream/50">
                            <td className="py-3 px-4">
                              <div className="pl-12">
                                <span className="text-brand-navy">{product.product}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className="bg-red-100 text-red-800">
                                {product.incorrectCategory}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className="bg-green-100 text-green-800">
                                {product.correctCategory}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{product.skus.length} SKUs</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewSKUs(product);
                                  }}
                                  className="flex items-center gap-1 text-xs border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white"
                                >
                                  <Eye className="h-3 w-3" />
                                  View SKUs
                                </Button>
                              </div>
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

      <IncorrectSKUModal
        isOpen={isSKUModalOpen}
        onClose={() => setIsSKUModalOpen(false)}
        productData={selectedProductSKUs}
      />
    </>
  );
};

export default IncorrectCategoriesTable;
