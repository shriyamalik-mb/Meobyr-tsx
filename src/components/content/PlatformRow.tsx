
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronDown } from "lucide-react";
import { ScoreBadge } from "./ScoreBadge";

interface PlatformRowProps {
  platformKey: string;
  platformGroup: {
    retailer: string;
    platform: string;
    products: any[];
  };
  platformScore: {
    overallTitleScore: number;
    lengthScore: number;
    structureScore: number;
    searchTermsScore: number;
    skuCount: number;
  };
  isExpanded: boolean;
  onToggleExpansion: (key: string) => void;
  onDrillDown: (retailer: string, platform: string) => void;
}

export const PlatformRow = ({ 
  platformKey, 
  platformGroup, 
  platformScore, 
  isExpanded, 
  onToggleExpansion, 
  onDrillDown 
}: PlatformRowProps) => {
  return (
    <tr className="border-b bg-gray-25">
      <td className="p-3 font-medium flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleExpansion(platformKey)}
          className="p-1 h-6 w-6"
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
        <span>{platformGroup.retailer} - {platformGroup.platform}</span>
      </td>
      <td className="p-3 text-gray-600">
        {platformGroup.products.length} products
      </td>
      <td className="p-3 text-center">
        <ScoreBadge score={platformScore.overallTitleScore} />
      </td>
      <td className="p-3 text-center">
        <ScoreBadge score={platformScore.lengthScore} />
      </td>
      <td className="p-3 text-center">
        <ScoreBadge score={platformScore.structureScore} />
      </td>
      <td className="p-3 text-center">
        <ScoreBadge score={platformScore.searchTermsScore} />
      </td>
      <td className="p-3 text-center">
        <Badge variant="outline">{platformScore.skuCount}</Badge>
      </td>
      <td className="p-3 text-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDrillDown(platformGroup.retailer, platformGroup.platform)}
        >
          View All
        </Button>
      </td>
    </tr>
  );
};
