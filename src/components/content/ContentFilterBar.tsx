
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FilterState } from "@/types/dashboard";

interface ContentFilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const ContentFilterBar = ({ filters, onFiltersChange }: ContentFilterBarProps) => {
  const retailers = ["All", "Amazon", "Carrefour", "Walmart", "Target", "CVS"];
  const brands = ["All", "Lysol", "Dettol", "Vanish", "Durex", "Finish"];
  const categories = ["All", "Household Cleaning", "Personal Care", "Health & Personal Care"];
  const skus = ["All", "sku-001", "sku-002", "sku-003", "sku-004", "sku-005"];

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="retailer">Retailer</Label>
            <Select value={filters.retailer} onValueChange={(value) => onFiltersChange({ ...filters, retailer: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select retailer" />
              </SelectTrigger>
              <SelectContent>
                {retailers.map((retailer) => (
                  <SelectItem key={retailer} value={retailer}>
                    {retailer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Select value={filters.brand} onValueChange={(value) => onFiltersChange({ ...filters, brand: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={filters.category} onValueChange={(value) => onFiltersChange({ ...filters, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Select value={filters.sku} onValueChange={(value) => onFiltersChange({ ...filters, sku: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select SKU" />
              </SelectTrigger>
              <SelectContent>
                {skus.map((sku) => (
                  <SelectItem key={sku} value={sku}>
                    {sku}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
