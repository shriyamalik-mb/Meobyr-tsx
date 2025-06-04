
import { useState } from "react";
import { ContentRecommendedActions } from "@/components/content/ContentRecommendedActions";
import { ContentFilterBar } from "@/components/content/ContentFilterBar";
import { HeroImageSummaryTable } from "./HeroImageSummaryTable";
import { SKUDetailView } from "./SKUDetailView";
import { SKUData, FilterState } from "@/types/dashboard";

interface HeroImageTabProps {
  data: SKUData[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const HeroImageTab = ({ data, filters, onFiltersChange }: HeroImageTabProps) => {
  const [drillDownState, setDrillDownState] = useState<{
    retailer?: string;
    platform?: string;
    category?: string;
    brand?: string;
    product?: string;
  } | null>(null);

  const recommendedActions = [
    {
      action: "Replace blurry or low-resolution hero images",
      priority: 'high' as const,
      impact: "Improves customer trust and conversion rates"
    },
    {
      action: "Ensure hero images show the actual product clearly",
      priority: 'high' as const,
      impact: "Reduces returns and customer complaints"
    },
    {
      action: "Optimize image sizing for different platforms",
      priority: 'medium' as const,
      impact: "Prevents image distortion and cropping issues"
    },
    {
      action: "Remove text overlays that may be blocked by UI elements",
      priority: 'medium' as const,
      impact: "Ensures key product information remains visible"
    },
    {
      action: "A/B test different hero image angles and compositions",
      priority: 'low' as const,
      impact: "Data-driven optimization for better engagement"
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
      <ContentRecommendedActions title="Top 5 Hero Image Optimization Actions" actions={recommendedActions} />
      
      {drillDownState ? (
        <SKUDetailView
          data={data}
          retailer={drillDownState.retailer!}
          platform={drillDownState.platform!}
          product={drillDownState.product}
          onBack={handleBack}
          tabType="heroImage"
        />
      ) : (
        <>
          <ContentFilterBar filters={filters} onFiltersChange={onFiltersChange} />
          <HeroImageSummaryTable data={data} filters={filters} onDrillDown={handleDrillDown} />
        </>
      )}
    </div>
  );
};
