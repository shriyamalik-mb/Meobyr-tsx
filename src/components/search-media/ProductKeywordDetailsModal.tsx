
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, ChevronRight, CheckCircle, Users } from 'lucide-react';
import CompetitorModal from '@/components/search-media/CompetitorModal';

interface ProductKeywordDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

const ProductKeywordDetailsModal = ({ isOpen, onClose, product }: ProductKeywordDetailsModalProps) => {
  const [expandedKeywords, setExpandedKeywords] = useState<Set<string>>(new Set());
  const [selectedKeywordCompetitors, setSelectedKeywordCompetitors] = useState<any>(null);
  const [isCompetitorModalOpen, setIsCompetitorModalOpen] = useState(false);

  if (!product) return null;

  const toggleKeyword = (keywordId: string) => {
    const newExpanded = new Set(expandedKeywords);
    if (newExpanded.has(keywordId)) {
      newExpanded.delete(keywordId);
    } else {
      newExpanded.add(keywordId);
    }
    setExpandedKeywords(newExpanded);
  };

  const getVisibilityColor = (visible: number, total: number) => {
    const percentage = (visible / total) * 100;
    if (percentage >= 80) return 'bg-green-100 text-green-800';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getFullSKUData = (item: any) => {
    const organicCount = Math.ceil(item.visibleSkus.length * 0.6);
    const organicSkus = item.visibleSkus.slice(0, organicCount);
    const paidSkus = item.visibleSkus.slice(organicCount);
    
    return {
      organicSkus,
      paidSkus,
      notVisibleSkus: item.notVisibleSkus,
      organicCount: organicSkus.length,
      paidCount: paidSkus.length
    };
  };

  const handleCompetitorsClick = (keyword: string) => {
    const competitors = {
      keyword,
      topCompetitors: [
        { brand: 'Olay', marketShare: 28, position: 1 },
        { brand: 'L\'Oreal', marketShare: 22, position: 2 },
        { brand: 'Neutrogena', marketShare: 18, position: 3 }
      ]
    };
    setSelectedKeywordCompetitors(competitors);
    setIsCompetitorModalOpen(true);
  };

  const renderKeywordTable = (keywords: any[], scoreType: string, score: number) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-semibold text-brand-navy">{scoreType} Keywords Performance</h3>
        <Badge className={scoreType === 'Generic' ? 'bg-blue-100 text-blue-800' : 
                          scoreType === 'Branded' ? 'bg-brand-sage/20 text-brand-sage' : 
                          'bg-orange-100 text-orange-800'}>
          Score: {score}/10
        </Badge>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-light">
              <th className="text-left py-3 px-3 font-medium text-brand-navy">Keyword</th>
              <th className="text-left py-3 px-3 font-medium text-brand-navy">Total SKUs</th>
              <th className="text-left py-3 px-3 font-medium text-brand-navy">Organic Visible</th>
              <th className="text-left py-3 px-3 font-medium text-brand-navy">Paid Visible</th>
              <th className="text-left py-3 px-3 font-medium text-brand-navy">Overall Visibility %</th>
              <th className="text-left py-3 px-3 font-medium text-brand-navy">SKU Details</th>
              <th className="text-left py-3 px-3 font-medium text-brand-navy">Competitors</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((item: any, index: number) => {
              const skuData = getFullSKUData(item);
              const keywordId = `${scoreType}-${index}`;
              const isExpanded = expandedKeywords.has(keywordId);
              
              return (
                <React.Fragment key={index}>
                  <tr className="border-b border-gray-100 hover:bg-brand-cream/50">
                    <td className="py-3 px-3 font-medium text-brand-navy">{item.keyword}</td>
                    <td className="py-3 px-3">{item.totalSkus}</td>
                    <td className="py-3 px-3">
                      <Badge className="bg-green-50 text-green-700">
                        {skuData.organicCount}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <Badge className="bg-blue-50 text-blue-700">
                        {skuData.paidCount}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <Badge className={getVisibilityColor(item.skusVisible, item.totalSkus)}>
                        {Math.round((item.skusVisible / item.totalSkus) * 100)}%
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleKeyword(keywordId)}
                        className="flex items-center gap-1 text-xs border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white"
                      >
                        {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                        View SKUs
                      </Button>
                    </td>
                    <td className="py-3 px-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCompetitorsClick(item.keyword)}
                        className="flex items-center gap-1 text-xs border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white"
                      >
                        <Users className="h-3 w-3" />
                        Top 3
                      </Button>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr>
                      <td colSpan={7} className="py-0 px-0">
                        <div className="bg-brand-cream/30 border-l-4 border-brand-sage mx-3 mb-3">
                          <div className="p-4">
                            <h5 className="font-medium text-brand-navy mb-3 flex items-center gap-2">
                              SKU Visibility for "{item.keyword}"
                              <span className="text-xs text-gray-500">
                                ({item.skusVisible} visible of {item.totalSkus} total)
                              </span>
                            </h5>
                            
                            <div className="grid grid-cols-1 gap-2">
                              {skuData.organicSkus.map((sku: string, skuIndex: number) => (
                                <div key={`organic-${skuIndex}`} className="flex items-center gap-3 py-2 px-3 bg-white rounded border">
                                  <div className="flex-shrink-0">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  </div>
                                  <div className="flex-1">
                                    <span className="text-sm text-brand-navy">{sku}</span>
                                  </div>
                                  <div className="flex-shrink-0 flex gap-2">
                                    <Badge className="bg-green-100 text-green-800">
                                      Visible (Organic)
                                    </Badge>
                                  </div>
                                </div>
                              ))}

                              {skuData.paidSkus.map((sku: string, skuIndex: number) => (
                                <div key={`paid-${skuIndex}`} className="flex items-center gap-3 py-2 px-3 bg-white rounded border">
                                  <div className="flex-shrink-0">
                                    <CheckCircle className="h-4 w-4 text-blue-500" />
                                  </div>
                                  <div className="flex-1">
                                    <span className="text-sm text-brand-navy">{sku}</span>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <Badge className="bg-blue-100 text-blue-800">
                                      Visible (Paid)
                                    </Badge>
                                  </div>
                                </div>
                              ))}

                              {skuData.notVisibleSkus.map((sku: string, skuIndex: number) => (
                                <div key={`not-visible-${skuIndex}`} className="flex items-center gap-3 py-2 px-3 bg-white rounded border">
                                  <div className="flex-shrink-0">
                                    <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                                  </div>
                                  <div className="flex-1">
                                    <span className="text-sm text-gray-500">{sku}</span>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <Badge className="bg-gray-100 text-gray-600">
                                      Not Visible
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-y-auto bg-white border-brand-light">
          <DialogHeader>
            <DialogTitle className="text-lg text-brand-navy">
              {product.productName} - Keyword Details
            </DialogTitle>
            <div className="flex gap-2 text-sm text-gray-600">
              <span>{product.brand}</span>
              <span>•</span>
              <span>{product.platform}</span>
            </div>
          </DialogHeader>

          <div className="mt-4">
            <Tabs defaultValue="generic" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-brand-cream">
                <TabsTrigger value="generic" className="data-[state=active]:bg-white data-[state=active]:text-brand-navy">Generic Keywords</TabsTrigger>
                <TabsTrigger value="branded" className="data-[state=active]:bg-white data-[state=active]:text-brand-navy">Branded Keywords</TabsTrigger>
                <TabsTrigger value="competition" className="data-[state=active]:bg-white data-[state=active]:text-brand-navy">Competition Keywords</TabsTrigger>
              </TabsList>

              <TabsContent value="generic" className="mt-4">
                {renderKeywordTable(product.keywords.generic, 'Generic', product.genericScore)}
              </TabsContent>

              <TabsContent value="branded" className="mt-4">
                {renderKeywordTable(product.keywords.branded, 'Branded', product.brandedScore)}
              </TabsContent>

              <TabsContent value="competition" className="mt-4">
                {renderKeywordTable(product.keywords.competition, 'Competition', product.competitionScore)}
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      <CompetitorModal
        isOpen={isCompetitorModalOpen}
        onClose={() => setIsCompetitorModalOpen(false)}
        competitorData={selectedKeywordCompetitors}
      />
    </>
  );
};

export default ProductKeywordDetailsModal;
