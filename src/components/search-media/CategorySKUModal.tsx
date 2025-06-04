
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X } from 'lucide-react';

interface CategorySKUModalProps {
  isOpen: boolean;
  onClose: () => void;
  skuData: any;
}

const CategorySKUModal = ({ isOpen, onClose, skuData }: CategorySKUModalProps) => {
  if (!skuData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white border-brand-light">
        <DialogHeader>
          <DialogTitle className="text-lg text-brand-navy">
            SKUs in "{skuData.category}" Category
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="space-y-3">
            {skuData.skus.map((sku: any, index: number) => (
              <div key={index} className="flex items-center gap-3 p-3 border border-brand-light rounded-lg">
                <div className="flex-shrink-0">
                  {sku.visible ? (
                    <CheckCircle className="h-4 w-4 text-brand-sage" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <span className={`text-sm ${sku.visible ? 'text-brand-navy' : 'text-gray-500'}`}>
                    {sku.name}
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <Badge className={sku.visible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {sku.visible ? 'Visible' : 'Not Visible'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategorySKUModal;
