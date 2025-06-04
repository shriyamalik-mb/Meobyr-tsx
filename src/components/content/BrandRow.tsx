
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronDown } from "lucide-react";
import { ScoreBadge } from "./ScoreBadge";

interface BrandRowProps {
  brandKey: string;
  brandGroup: {
    brand: string;
    products: any[];
  };
  brandScore: {
    overallTitleScore: number;
    lengthScore: number;
    structureScore: number;
    searchTermsScore: number;
    skuCount: number;
  };
  isExpanded: boolean;
  onToggleExpansion: (key: string) => void;
  onDrillDown: (retailer: string, platform: string, category: string, brand: string) => void;
  retailer: string;
  platform: string;
  category: string;
}

export const BrandRow = ({ 
  brandKey, 
  brandGroup, 
  brandScore, 
  isExpanded, 
  onToggleExpansion, 
  onDrillDown,
  retailer,
  platform,
  category
}: BrandRowProps) => {
  return (
    <tr className="border-b bg-brand-sage/5">
      <td className="p-3 pl-12 font-medium flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleExpansion(brandKey)}
          className="p-1 h-6 w-6"
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
        <span>{brandGroup.brand}</span>
      </td>
      <td className="p-3 text-gray-600">
        {brandGroup.products.length} products
      </td>
      <td className="p-3 text-center">
        <ScoreBadge score={brandScore.overallTitleScore} />
      </td>
      <td className="p-3 text-center">
        <ScoreBadge score={brandScore.lengthScore} />
      </td>
      <td className="p-3 text-center">
        <ScoreBadge score={brandScore.structureScore} />
      </td>
      <td className="p-3 text-center">
        <ScoreBadge score={brandScore.searchTermsScore} />
      </td>
      <td className="p-3 text-center">
        <Badge variant="outline" className="bg-brand-light text-brand-navy border-brand-light">{brandScore.skuCount}</Badge>
      </td>
      <td className="p-3 text-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDrillDown(retailer, platform, category, brandGroup.brand)}
          className="border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white"
        >
          View All
        </Button>
      </td>
    </tr>
  );
};
