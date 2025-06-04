
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const keywordOpportunities = [
  {
    brand: 'NIVEA',
    products: [
      {
        product: 'Body Lotion',
        currentKeywords: ['body lotion', 'moisturizer', 'dry skin care'],
        suggestedKeywords: [
          { keyword: 'winter essentials', searchVolume: '8.2K', difficulty: 'Medium', expectedROI: '+15%' },
          { keyword: 'hydrating cream UAE', searchVolume: '12.5K', difficulty: 'Low', expectedROI: '+22%' },
          { keyword: 'daily moisturizer Dubai', searchVolume: '6.8K', difficulty: 'Medium', expectedROI: '+18%' }
        ]
      },
      {
        product: 'Q10 Face Cream',
        currentKeywords: ['anti-aging', 'face cream', 'Q10'],
        suggestedKeywords: [
          { keyword: 'wrinkle reduction UAE', searchVolume: '5.4K', difficulty: 'High', expectedROI: '+28%' },
          { keyword: 'mature skin care Dubai', searchVolume: '3.9K', difficulty: 'Medium', expectedROI: '+20%' },
          { keyword: 'firming face cream', searchVolume: '7.2K', difficulty: 'Low', expectedROI: '+25%' }
        ]
      }
    ]
  },
  {
    brand: 'Eucerin',
    products: [
      {
        product: 'Advanced Repair Cream',
        currentKeywords: ['dry skin', 'repair cream', 'sensitive skin'],
        suggestedKeywords: [
          { keyword: 'eczema relief UAE', searchVolume: '4.1K', difficulty: 'Medium', expectedROI: '+32%' },
          { keyword: 'dermatologist recommended', searchVolume: '9.6K', difficulty: 'High', expectedROI: '+18%' },
          { keyword: 'fragrance free moisturizer', searchVolume: '6.3K', difficulty: 'Low', expectedROI: '+24%' }
        ]
      }
    ]
  },
  {
    brand: 'La Prairie',
    products: [
      {
        product: 'Luxury Anti-Aging',
        currentKeywords: ['luxury skincare', 'premium cream', 'anti-aging'],
        suggestedKeywords: [
          { keyword: 'caviar skincare UAE', searchVolume: '2.8K', difficulty: 'High', expectedROI: '+45%' },
          { keyword: 'Swiss luxury beauty', searchVolume: '1.9K', difficulty: 'Medium', expectedROI: '+38%' },
          { keyword: 'high-end face cream', searchVolume: '3.5K', difficulty: 'High', expectedROI: '+42%' }
        ]
      }
    ]
  },
  {
    brand: 'Coppertone',
    products: [
      {
        product: 'Sunscreen SPF 50',
        currentKeywords: ['sunscreen', 'SPF 50', 'sun protection'],
        suggestedKeywords: [
          { keyword: 'beach essentials UAE', searchVolume: '11.2K', difficulty: 'Low', expectedROI: '+19%' },
          { keyword: 'summer skincare Dubai', searchVolume: '8.7K', difficulty: 'Medium', expectedROI: '+16%' },
          { keyword: 'waterproof sunscreen', searchVolume: '5.9K', difficulty: 'Medium', expectedROI: '+21%' }
        ]
      }
    ]
  }
];

const KeywordOpportunities = () => {
  const [openBrands, setOpenBrands] = useState<Record<string, boolean>>({});
  const [openProducts, setOpenProducts] = useState<Record<string, boolean>>({});

  const toggleBrand = (brand: string) => {
    setOpenBrands(prev => ({ ...prev, [brand]: !prev[brand] }));
  };

  const toggleProduct = (brandProduct: string) => {
    setOpenProducts(prev => ({ ...prev, [brandProduct]: !prev[brandProduct] }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBrandKeywordCount = (brand: any) => {
    return brand.products.reduce((total: number, product: any) => total + product.suggestedKeywords.length, 0);
  };

  return (
    <Card className="border-brand-light">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-brand-navy">
          <Target className="h-5 w-5 text-brand-sage" />
          Sponsored Keyword Opportunities by Brand & Product
        </CardTitle>
        <p className="text-sm text-gray-600">Expand your sponsored search campaigns with these high-potential keywords</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {keywordOpportunities.map((brand, brandIndex) => (
            <div key={brandIndex} className="border border-brand-light rounded-lg">
              <Collapsible 
                open={openBrands[brand.brand]} 
                onOpenChange={() => toggleBrand(brand.brand)}
              >
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-brand-cream/50">
                  <div className="flex items-center gap-3">
                    {openBrands[brand.brand] ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                    <h3 className="font-bold text-lg text-brand-navy">{brand.brand}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {getBrandKeywordCount(brand)} suggested keywords
                    </Badge>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-4 pb-4 space-y-3">
                    {brand.products.map((product, productIndex) => (
                      <div key={productIndex} className="border border-gray-100 rounded-lg">
                        <Collapsible 
                          open={openProducts[`${brand.brand}-${product.product}`]} 
                          onOpenChange={() => toggleProduct(`${brand.brand}-${product.product}`)}
                        >
                          <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                              {openProducts[`${brand.brand}-${product.product}`] ? (
                                <ChevronDown className="h-3 w-3 text-gray-500" />
                              ) : (
                                <ChevronRight className="h-3 w-3 text-gray-500" />
                              )}
                              <div className="text-left">
                                <h4 className="font-semibold text-brand-navy text-sm">{product.product}</h4>
                                <p className="text-xs text-gray-600">Current: {product.currentKeywords.join(', ')}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {product.suggestedKeywords.length} keywords
                              </Badge>
                            </div>
                          </CollapsibleTrigger>
                          
                          <CollapsibleContent>
                            <div className="px-3 pb-3">
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                                {product.suggestedKeywords.map((suggestion, suggestionIndex) => (
                                  <div key={suggestionIndex} className="flex items-center justify-between p-2 bg-white border border-gray-100 rounded text-xs">
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-brand-navy truncate mb-1">{suggestion.keyword}</p>
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <span className="text-gray-600 flex items-center gap-1">
                                            <Search className="h-3 w-3" />
                                            {suggestion.searchVolume}
                                          </span>
                                          <Badge className={getDifficultyColor(suggestion.difficulty)} style={{ fontSize: '10px', padding: '1px 4px' }}>
                                            {suggestion.difficulty}
                                          </Badge>
                                        </div>
                                        <span className="text-brand-sage font-medium flex items-center gap-1">
                                          <TrendingUp className="h-3 w-3" />
                                          {suggestion.expectedROI}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-brand-sage/10 rounded-lg border border-brand-sage/20">
          <p className="text-sm text-brand-navy">
            <strong>Pro Tip:</strong> Start with Low difficulty keywords for quick wins, then gradually target Medium and High difficulty terms as your campaigns mature.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordOpportunities;
