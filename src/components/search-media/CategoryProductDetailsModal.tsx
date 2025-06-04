
import React from 'react';
import CategoryHierarchyModal from './CategoryHierarchyModal';

interface CategoryProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData: any;
}

const CategoryProductDetailsModal = ({ isOpen, onClose, productData }: CategoryProductDetailsModalProps) => {
  return (
    <CategoryHierarchyModal 
      isOpen={isOpen}
      onClose={onClose}
      productData={productData}
    />
  );
};

export default CategoryProductDetailsModal;
