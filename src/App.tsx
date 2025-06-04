
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Distribution pages
import DistributionDashboard from "./pages/distribution/Dashboard";
import DistributionCatalogue from "./pages/distribution/Catalogue";
import DistributionDistribution from "./pages/distribution/Distribution";
import DistributionAvailability from "./pages/distribution/Availability";

// Content pages
import ContentDashboard from "./pages/content/Dashboard";
import ContentTitle from "./pages/content/Title";
import ContentHeroImage from "./pages/content/HeroImage";
import ContentDescription from "./pages/content/Description";
import ContentTaxonomy from "./pages/content/Taxonomy";
import ContentEnhancedContent from "./pages/content/EnhancedContent";
import ContentABContent from "./pages/content/ABContent";

// Price and Promotions pages
import PricePromotionsDashboard from "./pages/price-promotions/Dashboard";
import PricePromotionsAnalytics from "./pages/price-promotions/Analytics";
import PromotionsDatabase from "./pages/price-promotions/PromotionsDatabase";

// Search Media pages
import SearchMediaDashboard from "./pages/search-media/Dashboard";
import SearchPage from "./pages/search-media/Search";
import CategoryPage from "./pages/search-media/Category";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Distribution and Availability Routes */}
          <Route path="/distribution/dashboard" element={<DistributionDashboard />} />
          <Route path="/distribution/catalogue" element={<DistributionCatalogue />} />
          <Route path="/distribution/distribution" element={<DistributionDistribution />} />
          <Route path="/distribution/availability" element={<DistributionAvailability />} />
          
          {/* Content Routes */}
          <Route path="/content/dashboard" element={<ContentDashboard />} />
          <Route path="/content/title" element={<ContentTitle />} />
          <Route path="/content/hero-image" element={<ContentHeroImage />} />
          <Route path="/content/description" element={<ContentDescription />} />
          <Route path="/content/taxonomy" element={<ContentTaxonomy />} />
          <Route path="/content/enhanced-content" element={<ContentEnhancedContent />} />
          <Route path="/content/ab-content" element={<ContentABContent />} />
          
          {/* Price and Promotions Routes */}
          <Route path="/price-promotions/dashboard" element={<PricePromotionsDashboard />} />
          <Route path="/price-promotions/analytics" element={<PricePromotionsAnalytics />} />
          <Route path="/price-promotions/promotions-database" element={<PromotionsDatabase />} />
          
          {/* Search Media Routes */}
          <Route path="/search-media/dashboard" element={<SearchMediaDashboard />} />
          <Route path="/search-media/search" element={<SearchPage />} />
          <Route path="/search-media/category" element={<CategoryPage />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
