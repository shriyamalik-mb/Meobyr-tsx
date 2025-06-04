
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import ExpandCollapseIcon from './ExpandCollapseIcon';

interface TableRowGroupProps {
  groupKey: string;
  level: number;
  label: string;
  aggregatedValues: number[];
  isExpanded: boolean;
  onToggle: (groupKey: string) => void;
  retailers: string[];
}

const TableRowGroup = ({ 
  groupKey, 
  level, 
  label, 
  aggregatedValues, 
  isExpanded, 
  onToggle,
  retailers 
}: TableRowGroupProps) => {
  const indentStyle = {
    paddingLeft: `${level * 20}px`
  };

  const bgColor = level === 1 ? 'bg-gray-50' : 'bg-gray-25';

  return (
    <TableRow className={`${bgColor} hover:bg-gray-100 transition-colors`}>
      <TableCell className="font-medium" style={indentStyle}>
        <div className="flex items-center space-x-2">
          <ExpandCollapseIcon
            isExpanded={isExpanded}
            onClick={() => onToggle(groupKey)}
          />
          <span className="text-brand-navy font-semibold">{label}</span>
        </div>
      </TableCell>
      {aggregatedValues.map((value, index) => (
        <TableCell key={retailers[index]} className="text-center font-medium">
          {value}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableRowGroup;
