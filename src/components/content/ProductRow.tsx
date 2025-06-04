
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "./ScoreBadge";

interface ProductRowProps {
  product: {
    retailer: string;
    platform: string;
    category: string;
    brand: string;
    product: string;
    overallTitle: number;
    length: number;
    structure: number;
    searchTerms: number;
    skuCount: number;
  };
  onDrillDown: (retailer: string, platform: string, category: string, brand: string, product: string) => void;
  tabType?: string;
}

export const ProductRow = ({ product, onDrillDown, tabType }: ProductRowProps) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3 pl-16"></td>
      <td className="p-3 font-medium">{product.product}</td>
      <td className="p-3 text-center">
        <ScoreBadge score={product.overallTitle} />
      </td>
      <td className="p-3 text-center">
        <ScoreBadge score={product.length} />
      </td>
      <td className="p-3 text-center">
        <ScoreBadge score={product.structure} />
      </td>
      <td className="p-3 text-center">
        <ScoreBadge score={product.searchTerms} />
      </td>
      <td className="p-3 text-center">
        <Badge variant="outline">{product.skuCount}</Badge>
      </td>
      <td className="p-3 text-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDrillDown(product.retailer, product.platform, product.category, product.brand, product.product)}
        >
          View SKUs
        </Button>
      </td>
    </tr>
  );
};
