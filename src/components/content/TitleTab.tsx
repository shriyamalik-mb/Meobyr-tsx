
import { useState } from "react";
import { ContentRecommendedActions } from "@/components/content/ContentRecommendedActions";
import { ContentFilterBar } from "@/components/content/ContentFilterBar";
import { TitleSummaryTable } from "./TitleSummaryTable";
import { SKUDetailView } from "./SKUDetailView";
import { SKUData, FilterState } from "@/types/dashboard";

interface TitleTabProps {
  data: SKUData[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const TitleTab = ({ data, filters, onFiltersChange }: TitleTabProps) => {
  const [drillDownState, setDrillDownState] = useState<{
    retailer?: string;
    platform?: string;
    category?: string;
    brand?: string;
    product?: string;
  } | null>(null);

  const recommendedActions = [
    {
      action: "Optimize title length to fit platform requirements",
      priority: 'high' as const,
      impact: "Prevents title truncation and improves visibility"
    },
    {
      action: "Include primary search keywords in first 60 characters",
      priority: 'high' as const,
      impact: "Improves search ranking and click-through rates"
    },
    {
      action: "Follow Brand → Product Type → Variant → Size structure",
      priority: 'medium' as const,
      impact: "Enhances readability and customer understanding"
    },
    {
      action: "Remove promotional text that may violate platform policies",
      priority: 'medium' as const,
      impact: "Prevents listing suppression and policy violations"
    },
    {
      action: "A/B test different title variations for performance",
      priority: 'low' as const,
      impact: "Data-driven optimization for better conversion rates"
    }
  ];

  const handleDrillDown = (retailer: string, platform: string, category?: string, brand?: string, product?: string) => {
    setDrillDownState({ retailer, platform, category, brand, product });
  };

  const handleBack = () => {
    setDrillDownState(null);
  };

  return (
    <div className="space-y-6">
      <ContentRecommendedActions title="Top 5 Title Optimization Actions" actions={recommendedActions} />
      
      {drillDownState ? (
        <SKUDetailView
          data={data}
          retailer={drillDownState.retailer!}
          platform={drillDownState.platform!}
          product={drillDownState.product}
          onBack={handleBack}
          tabType="title"
        />
      ) : (
        <>
          <ContentFilterBar filters={filters} onFiltersChange={onFiltersChange} />
          <TitleSummaryTable data={data} filters={filters} onDrillDown={handleDrillDown} />
        </>
      )}
    </div>
  );
};
