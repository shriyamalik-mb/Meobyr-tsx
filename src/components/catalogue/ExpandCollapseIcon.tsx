
import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface ExpandCollapseIconProps {
  isExpanded: boolean;
  onClick: () => void;
}

const ExpandCollapseIcon = ({ isExpanded, onClick }: ExpandCollapseIconProps) => {
  return (
    <button
      onClick={onClick}
      className="p-1 hover:bg-gray-200 rounded transition-colors"
      type="button"
    >
      {isExpanded ? (
        <ChevronDown className="w-4 h-4 text-gray-600" />
      ) : (
        <ChevronRight className="w-4 h-4 text-gray-600" />
      )}
    </button>
  );
};

export default ExpandCollapseIcon;
