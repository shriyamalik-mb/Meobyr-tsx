
import { useState } from "react";
import { ContentRecommendedActions } from "@/components/content/ContentRecommendedActions";
import { ContentFilterBar } from "@/components/content/ContentFilterBar";
import { DescriptionSummaryTable } from "./DescriptionSummaryTable";
import { SKUDetailView } from "./SKUDetailView";
import { SKUData, FilterState } from "@/types/dashboard";

interface DescriptionTabProps {
  data: SKUData[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const DescriptionTab = ({ data, filters, onFiltersChange }: DescriptionTabProps) => {
  const [drillDownState, setDrillDownState] = useState<{
    retailer?: string;
    platform?: string;
    category?: string;
    brand?: string;
    product?: string;
  } | null>(null);

  const recommendedActions = [
    {
      action: "Add missing features and benefits to product descriptions",
      priority: 'high' as const,
      impact: "Increases conversion rates and reduces customer questions"
    },
    {
      action: "Include usage instructions for complex products",
      priority: 'high' as const,
      impact: "Improves customer satisfaction and reduces returns"
    },
    {
      action: "Optimize description length for platform requirements",
      priority: 'medium' as const,
      impact: "Prevents truncation and improves search visibility"
    },
    {
      action: "Add differentiators to highlight competitive advantages",
      priority: 'medium' as const,
      impact: "Helps customers choose your product over competitors"
    },
    {
      action: "Include relevant use cases and scenarios",
      priority: 'low' as const,
      impact: "Helps customers envision product value"
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
      <ContentRecommendedActions title="Top 5 Description Optimization Actions" actions={recommendedActions} />
      
      {drillDownState ? (
        <SKUDetailView
          data={data}
          retailer={drillDownState.retailer!}
          platform={drillDownState.platform!}
          product={drillDownState.product}
          onBack={handleBack}
          tabType="description"
        />
      ) : (
        <>
          <ContentFilterBar filters={filters} onFiltersChange={onFiltersChange} />
          <DescriptionSummaryTable data={data} filters={filters} onDrillDown={handleDrillDown} />
        </>
      )}
    </div>
  );
};
