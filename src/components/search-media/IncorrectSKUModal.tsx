
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface IncorrectSKUModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData: any;
}

const IncorrectSKUModal = ({ isOpen, onClose, productData }: IncorrectSKUModalProps) => {
  if (!productData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white border-brand-light">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center gap-2 text-brand-navy">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Incorrectly Categorized SKUs: {productData.product}
          </DialogTitle>
          <div className="flex gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Current: </span>
              <Badge className="bg-red-100 text-red-800">{productData.incorrectCategory}</Badge>
            </div>
            <div>
              <span className="font-medium">Recommended: </span>
              <Badge className="bg-green-100 text-green-800">{productData.correctCategory}</Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4">
          <h4 className="font-medium text-brand-navy mb-3">Affected SKUs ({productData.skus.length})</h4>
          <div className="space-y-2">
            {productData.skus.map((sku: string, index: number) => (
              <div key={index} className="flex items-center gap-3 p-3 border border-brand-light rounded-lg">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </div>
                <div className="flex-1">
                  <span className="text-sm text-brand-navy">{sku}</span>
                </div>
                <div className="flex-shrink-0">
                  <Badge className="bg-orange-100 text-orange-800">
                    Needs Recategorization
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-medium text-orange-900 mb-2">Recommended Action</h4>
            <p className="text-sm text-orange-800">
              Move all {productData.skus.length} SKUs from <span className="font-medium">{productData.incorrectCategory}</span> to <span className="font-medium">{productData.correctCategory}</span> to improve search visibility and category performance.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IncorrectSKUModal;
