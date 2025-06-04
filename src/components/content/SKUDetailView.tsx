import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, Check, X, ExternalLink } from "lucide-react";
import { SKUData } from "@/types/dashboard";
import { CopyableText } from "@/components/content/CopyableText";
import { useState } from "react";

interface SKUDetailViewProps {
  data: SKUData[];
  retailer: string;
  platform: string;
  product?: string;
  onBack: () => void;
  tabType?: 'title' | 'heroImage' | 'description' | 'taxonomy' | 'enhancedContent';
}

export const SKUDetailView = ({ data, retailer, platform, product, onBack, tabType = 'title' }: SKUDetailViewProps) => {
  const filteredData = data.filter(sku => 
    sku.retailer === retailer && 
    sku.platform === platform && 
    (!product || sku.name.includes(product))
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getTabTitle = () => {
    switch (tabType) {
      case 'title': return 'Title';
      case 'heroImage': return 'Hero Image';
      case 'description': return 'Description';
      case 'taxonomy': return 'Taxonomy';
      case 'enhancedContent': return 'Enhanced Content';
      default: return 'Title';
    }
  };

  const getTabScore = (sku: SKUData) => {
    switch (tabType) {
      case 'title': return sku.title.score.overall;
      case 'heroImage': return sku.heroImage.score.overall;
      case 'description': return sku.description.score.overall;
      case 'taxonomy': return sku.taxonomy.score.overall;
      case 'enhancedContent': return sku.enhancedContent.score.overall;
      default: return sku.title.score.overall;
    }
  };

  const renderCurrentContent = (sku: SKUData) => {
    switch (tabType) {
      case 'title':
        return (
          <div>
            <h4 className="font-semibold mb-2 text-gray-800">Current Title</h4>
            <div className="p-3 bg-gray-50 rounded border">
              <p className="text-sm">{sku.name}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                <span>Length: {sku.title.currentLength}/{sku.title.maxLength} chars</span>
                <span className="flex items-center gap-1">
                  Structure: {sku.title.hasRecommendedStructure ? 
                    <Check className="h-3 w-3 text-green-600" /> : 
                    <X className="h-3 w-3 text-red-600" />
                  }
                </span>
                <span className="flex items-center gap-1">
                  Keywords: {sku.title.containsSearchTerms ? 
                    <Check className="h-3 w-3 text-green-600" /> : 
                    <X className="h-3 w-3 text-red-600" />
                  }
                </span>
              </div>
            </div>
          </div>
        );
      case 'heroImage':
        return (
          <div>
            <h4 className="font-semibold mb-2 text-gray-800">Current Hero Image</h4>
            <div className="p-3 bg-gray-50 rounded border">
              <div className="flex items-start gap-4">
                <img src={sku.heroImage.imageUrl} alt="Hero" className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      Clarity: {sku.heroImage.imageClarity}
                    </span>
                    <span className="flex items-center gap-1">
                      Sizing: {sku.heroImage.optimalSizing ? 
                        <Check className="h-3 w-3 text-green-600" /> : 
                        <X className="h-3 w-3 text-red-600" />
                      }
                    </span>
                    <span className="flex items-center gap-1">
                      Correct Image: {sku.heroImage.isCorrectImage ? 
                        <Check className="h-3 w-3 text-green-600" /> : 
                        <X className="h-3 w-3 text-red-600" />
                      }
                    </span>
                    <span className="flex items-center gap-1">
                      Text Readable: {sku.heroImage.textReadable ? 
                        <Check className="h-3 w-3 text-green-600" /> : 
                        <X className="h-3 w-3 text-red-600" />
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'description':
        return (
          <div>
            <h4 className="font-semibold mb-2 text-gray-800">Current Description</h4>
            <div className="p-3 bg-gray-50 rounded border">
              <p className="text-sm mb-2 line-clamp-3">Sample description content for {sku.name}...</p>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span>Length: {sku.description.currentLength}/{sku.description.maxLength} chars</span>
                <span className="flex items-center gap-1">
                  Features: {sku.description.hasFeaturesBenefits ? 
                    <Check className="h-3 w-3 text-green-600" /> : 
                    <X className="h-3 w-3 text-red-600" />
                  }
                </span>
                <span className="flex items-center gap-1">
                  Instructions: {sku.description.hasUsageInstructions ? 
                    <Check className="h-3 w-3 text-green-600" /> : 
                    <X className="h-3 w-3 text-red-600" />
                  }
                </span>
              </div>
            </div>
          </div>
        );
      case 'taxonomy':
        return (
          <div>
            <h4 className="font-semibold mb-2 text-gray-800">Current Category</h4>
            <div className="p-3 bg-gray-50 rounded border">
              <p className="text-sm mb-2">{sku.taxonomy.currentCategory}</p>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  Correct Category: {sku.taxonomy.correctCategory ? 
                    <Check className="h-3 w-3 text-green-600" /> : 
                    <X className="h-3 w-3 text-red-600" />
                  }
                </span>
                {!sku.taxonomy.correctCategory && (
                  <span className="text-blue-600">
                    Recommended: {sku.taxonomy.recommendedCategory}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      case 'enhancedContent':
        return (
          <div>
            <h4 className="font-semibold mb-2 text-gray-800">Enhanced Content Status</h4>
            <div className="p-3 bg-gray-50 rounded border">
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  A+ Content: {sku.enhancedContent.hasAPlusContent ? 
                    <Check className="h-3 w-3 text-green-600" /> : 
                    <X className="h-3 w-3 text-red-600" />
                  }
                </span>
                <span className="flex items-center gap-1">
                  Video: {sku.enhancedContent.hasVideo ? 
                    <Check className="h-3 w-3 text-green-600" /> : 
                    <X className="h-3 w-3 text-red-600" />
                  }
                </span>
                <span>Secondary Images: {sku.enhancedContent.secondaryImagesCount}</span>
                <span>Rating: {sku.enhancedContent.productRating}/5 ({sku.enhancedContent.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderRecommendations = (sku: SKUData) => {
    switch (tabType) {
      case 'title':
        return (
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">Our Recommendations</h4>
            <div className="space-y-2">
              {sku.title.recommendedTitles.map((title, index) => (
                <CopyableText
                  key={index}
                  text={title}
                  className="mb-2"
                />
              ))}
            </div>
          </div>
        );
      case 'description':
        return (
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">Our Recommendations</h4>
            <div className="space-y-2">
              {sku.description.recommendedDescriptions.map((description, index) => (
                <CopyableText
                  key={index}
                  text={description}
                  className="mb-2"
                />
              ))}
            </div>
          </div>
        );
      case 'taxonomy':
        return !sku.taxonomy.correctCategory ? (
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">Our Recommendation</h4>
            <CopyableText
              text={sku.taxonomy.recommendedCategory}
              className="mb-2"
            />
          </div>
        ) : (
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">Category Status</h4>
            <div className="p-3 bg-green-50 rounded border border-green-200">
              <p className="text-sm text-green-800">Category is correctly assigned</p>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">Optimization Suggestions</h4>
            <div className="p-3 bg-blue-50 rounded border border-blue-200">
              <p className="text-sm text-blue-800">Review content for optimization opportunities</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Summary
        </Button>
        <div>
          <h2 className="text-2xl font-bold">
            {retailer} - {platform} {product && `- ${product}`} - {getTabTitle()}
          </h2>
          <p className="text-gray-600">{filteredData.length} SKUs found</p>
        </div>
      </div>

      {filteredData.map((sku) => (
        <Card key={sku.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg">{sku.name}</CardTitle>
                <div className="space-y-1 mt-2">
                  <p className="text-sm text-gray-600">SKU: {sku.id}</p>
                  <p className="text-sm text-gray-600">Seller: {sku.brand}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">{getTabTitle()} Score:</span>
                  <span className={`text-lg font-bold px-2 py-1 rounded ${getScoreBg(getTabScore(sku))} ${getScoreColor(getTabScore(sku))}`}>
                    {getTabScore(sku)}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Content */}
            {renderCurrentContent(sku)}

            {/* Recommendations */}
            {renderRecommendations(sku)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
