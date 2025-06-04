
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';

interface TableRowSkuProps {
  skuName: string;
  values: number[];
  retailers: string[];
}

const TableRowSku = ({ skuName, values, retailers }: TableRowSkuProps) => {
  const indentStyle = {
    paddingLeft: '60px'
  };

  return (
    <TableRow className="hover:bg-gray-50 transition-colors">
      <TableCell style={indentStyle}>
        <span className="text-gray-700">{skuName}</span>
      </TableCell>
      {values.map((value, index) => (
        <TableCell key={retailers[index]} className="text-center">
          {value}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableRowSku;
