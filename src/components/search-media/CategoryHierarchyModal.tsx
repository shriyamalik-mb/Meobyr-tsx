
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, ChevronDown, ChevronRight } from 'lucide-react';
import CategorySKUModal from './CategorySKUModal';

interface CategoryHierarchyModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData: any;
}

const CategoryHierarchyModal = ({ isOpen, onClose, productData }: CategoryHierarchyModalProps) => {
  const [selectedCategorySKUs, setSelectedCategorySKUs] = useState<any>(null);
  const [isSKUModalOpen, setIsSKUModalOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Beauty']));

  if (!productData) return null;

  const handleViewSKUs = (category: any) => {
    const skuData = {
      category: category.fullPath || category.level,
      skus: [
        { name: 'NIVEA Rich Nourishing Body Lotion (250ml)', visible: true },
        { name: 'NIVEA Rich Nourishing Body Lotion (400ml)', visible: true },
        { name: 'NIVEA Soft Moisturising Cream (100ml)', visible: false },
        { name: 'NIVEA Daily Essentials Face Cream (50ml)', visible: true }
      ]
    };
    setSelectedCategorySKUs(skuData);
    setIsSKUModalOpen(true);
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const hierarchyData = [
    {
      level: 'Beauty',
      visibleSkus: 8,
      totalSkus: 12,
      isParent: true,
      id: 'Beauty',
      subCategories: [
        {
          level: 'Body Lotion',
          visibleSkus: 3,
          totalSkus: 5,
          fullPath: 'Beauty -> Body Lotion',
          parentId: 'Beauty',
          id: 'Beauty-BodyLotion'
        },
        {
          level: 'Face Care',
          visibleSkus: 3,
          totalSkus: 4,
          fullPath: 'Beauty -> Face Care',
          parentId: 'Beauty',
          id: 'Beauty-FaceCare'
        },
        {
          level: 'Sun Care',
          visibleSkus: 2,
          totalSkus: 3,
          fullPath: 'Beauty -> Sun Care',
          parentId: 'Beauty',
          id: 'Beauty-SunCare'
        }
      ]
    }
  ];

  const getVisibilityColor = (visible: number, total: number) => {
    const percentage = (visible / total) * 100;
    if (percentage >= 80) return 'bg-green-100 text-green-800';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-brand-light">
          <DialogHeader>
            <DialogTitle className="text-lg text-brand-navy">
              {productData.product} - Category Distribution & SKU Details
            </DialogTitle>
            <div className="flex gap-2 text-sm text-gray-600">
              <span>{productData.brand}</span>
              <span>•</span>
              <span>{productData.platform}</span>
              <span>•</span>
              <span>Total SKUs: {productData.totalSkus}</span>
            </div>
          </DialogHeader>

          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-light">
                    <th className="text-left py-3 px-3 font-medium text-brand-navy">Category</th>
                    <th className="text-left py-3 px-3 font-medium text-brand-navy">Visible SKUs</th>
                    <th className="text-left py-3 px-3 font-medium text-brand-navy">Total SKUs</th>
                    <th className="text-left py-3 px-3 font-medium text-brand-navy">Visibility %</th>
                    <th className="text-left py-3 px-3 font-medium text-brand-navy">SKU Details</th>
                  </tr>
                </thead>
                <tbody>
                  {hierarchyData.map((category, index) => (
                    <React.Fragment key={index}>
                      <tr 
                        className="border-b border-gray-100 hover:bg-brand-cream/50 cursor-pointer"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            {category.isParent && (
                              expandedCategories.has(category.id) ? (
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-500" />
                              )
                            )}
                            <span className="font-medium text-brand-navy">{category.level}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <Badge className="bg-blue-100 text-blue-800">
                            {category.visibleSkus}
                          </Badge>
                        </td>
                        <td className="py-3 px-3">{category.totalSkus}</td>
                        <td className="py-3 px-3">
                          <Badge className={getVisibilityColor(category.visibleSkus, category.totalSkus)}>
                            {Math.round((category.visibleSkus / category.totalSkus) * 100)}%
                          </Badge>
                        </td>
                        <td className="py-3 px-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 text-xs border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewSKUs(category);
                            }}
                          >
                            <Eye className="h-3 w-3" />
                            View SKUs
                          </Button>
                        </td>
                      </tr>

                      {expandedCategories.has(category.id) && category.subCategories?.map((subCategory, subIndex) => (
                        <tr key={`${index}-${subIndex}`} className="border-b border-gray-100 hover:bg-brand-cream/50 bg-brand-cream/30">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2 pl-6">
                              <span className="text-gray-600 text-xs">→</span>
                              <span className="font-medium text-gray-700">{subCategory.level}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <Badge className="bg-blue-100 text-blue-800">
                              {subCategory.visibleSkus}
                            </Badge>
                          </td>
                          <td className="py-3 px-3">{subCategory.totalSkus}</td>
                          <td className="py-3 px-3">
                            <Badge className={getVisibilityColor(subCategory.visibleSkus, subCategory.totalSkus)}>
                              {Math.round((subCategory.visibleSkus / subCategory.totalSkus) * 100)}%
                            </Badge>
                          </td>
                          <td className="py-3 px-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1 text-xs border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white"
                              onClick={() => handleViewSKUs(subCategory)}
                            >
                              <Eye className="h-3 w-3" />
                              View SKUs
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CategorySKUModal
        isOpen={isSKUModalOpen}
        onClose={() => setIsSKUModalOpen(false)}
        skuData={selectedCategorySKUs}
      />
    </>
  );
};

export default CategoryHierarchyModal;
