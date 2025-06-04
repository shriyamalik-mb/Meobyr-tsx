
import { useState } from "react";
import { ContentRecommendedActions } from "@/components/content/ContentRecommendedActions";
import { ContentFilterBar } from "@/components/content/ContentFilterBar";
import { EnhancedContentSummaryTable } from "./EnhancedContentSummaryTable";
import { SKUDetailView } from "./SKUDetailView";
import { SKUData, FilterState } from "@/types/dashboard";

interface EnhancedContentTabProps {
  data: SKUData[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const EnhancedContentTab = ({ data, filters, onFiltersChange }: EnhancedContentTabProps) => {
  const [drillDownState, setDrillDownState] = useState<{
    retailer?: string;
    platform?: string;
    category?: string;
    brand?: string;
    product?: string;
  } | null>(null);

  const recommendedActions = [
    {
      action: "Add A+ content for products missing enhanced descriptions",
      priority: 'high' as const,
      impact: "Increases conversion rates by up to 15%"
    },
    {
      action: "Create product videos for top-selling items",
      priority: 'high' as const,
      impact: "Video content increases engagement and trust"
    },
    {
      action: "Add more secondary images showing different angles",
      priority: 'medium' as const,
      impact: "Reduces returns and improves customer confidence"
    },
    {
      action: "Improve secondary image quality and consistency",
      priority: 'medium' as const,
      impact: "Professional images build brand credibility"
    },
    {
      action: "Monitor and respond to customer reviews",
      priority: 'low' as const,
      impact: "Maintains positive brand reputation"
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
      <ContentRecommendedActions title="Top 5 Enhanced Content Actions" actions={recommendedActions} />
      
      {drillDownState ? (
        <SKUDetailView
          data={data}
          retailer={drillDownState.retailer!}
          platform={drillDownState.platform!}
          product={drillDownState.product}
          onBack={handleBack}
          tabType="enhancedContent"
        />
      ) : (
        <>
          <ContentFilterBar filters={filters} onFiltersChange={onFiltersChange} />
          <EnhancedContentSummaryTable data={data} filters={filters} onDrillDown={handleDrillDown} />
        </>
      )}
    </div>
  );
};
