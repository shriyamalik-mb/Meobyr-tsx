
import { useState } from "react";
import { ContentRecommendedActions } from "@/components/content/ContentRecommendedActions";
import { ContentFilterBar } from "@/components/content/ContentFilterBar";
import { TaxonomySummaryTable } from "./TaxonomySummaryTable";
import { SKUDetailView } from "./SKUDetailView";
import { SKUData, FilterState } from "@/types/dashboard";

interface TaxonomyTabProps {
  data: SKUData[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const TaxonomyTab = ({ data, filters, onFiltersChange }: TaxonomyTabProps) => {
  const [drillDownState, setDrillDownState] = useState<{
    retailer?: string;
    platform?: string;
    category?: string;
    brand?: string;
    product?: string;
  } | null>(null);

  const recommendedActions = [
    {
      action: "Fix incorrect product categorizations",
      priority: 'high' as const,
      impact: "Improves product discoverability by 30%"
    },
    {
      action: "Review and update category mappings",
      priority: 'high' as const,
      impact: "Ensures compliance with platform guidelines"
    },
    {
      action: "Standardize taxonomy across platforms",
      priority: 'medium' as const,
      impact: "Reduces management overhead and errors"
    },
    {
      action: "Monitor category performance metrics",
      priority: 'medium' as const,
      impact: "Identifies opportunities for optimization"
    },
    {
      action: "Train team on proper categorization",
      priority: 'low' as const,
      impact: "Prevents future categorization errors"
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
      <ContentRecommendedActions title="Top 5 Taxonomy Actions" actions={recommendedActions} />
      
      {drillDownState ? (
        <SKUDetailView
          data={data}
          retailer={drillDownState.retailer!}
          platform={drillDownState.platform!}
          product={drillDownState.product}
          onBack={handleBack}
          tabType="taxonomy"
        />
      ) : (
        <>
          <ContentFilterBar filters={filters} onFiltersChange={onFiltersChange} />
          <TaxonomySummaryTable data={data} filters={filters} onDrillDown={handleDrillDown} />
        </>
      )}
    </div>
  );
};
