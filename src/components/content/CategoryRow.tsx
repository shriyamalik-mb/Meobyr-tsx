
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronDown } from "lucide-react";
import { ScoreBadge } from "./ScoreBadge";

interface CategoryRowProps {
  categoryKey: string;
  categoryGroup: {
    category: string;
    brands: any[];
  };
  categoryScore: {
    overallTitleScore: number;
    lengthScore: number;
    structureScore: number;
    searchTermsScore: number;
    skuCount: number;
  };
  isExpanded: boolean;
  onToggleExpansion: (key: string) => void;
  onDrillDown: (retailer: string, platform: string, category: string) => void;
  retailer: string;
  platform: string;
}

export const CategoryRow = ({ 
  categoryKey, 
  categoryGroup, 
  categoryScore, 
  isExpanded, 
  onToggleExpansion, 
  onDrillDown,
  retailer,
  platform
}: CategoryRowProps) => {
  return (
    <tr className="border-b bg-brand-navy/5">
      <td className="p-3 pl-8 font-medium flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleExpansion(categoryKey)}
          className="p-1 h-6 w-6"
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
        <span>{categoryGroup.category}</span>
      </td>
      <td className="p-3 text-gray-600">
        {categoryGroup.brands.length} brands
      </td>
      <td className="p-3 text-center">
        <ScoreBadge score={categoryScore.overallTitleScore} />
      </td>
      <td className="p-3 text-center">
        <ScoreBadge score={categoryScore.lengthScore} />
      </td>
      <td className="p-3 text-center">
        <ScoreBadge score={categoryScore.structureScore} />
      </td>
      <td className="p-3 text-center">
        <ScoreBadge score={categoryScore.searchTermsScore} />
      </td>
      <td className="p-3 text-center">
        <Badge variant="outline" className="bg-brand-light text-brand-navy border-brand-light">{categoryScore.skuCount}</Badge>
      </td>
      <td className="p-3 text-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDrillDown(retailer, platform, categoryGroup.category)}
          className="border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white"
        >
          View All
        </Button>
      </td>
    </tr>
  );
};
