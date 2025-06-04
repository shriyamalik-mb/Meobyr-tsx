
import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  valueColor?: string;
}

const KpiCard = ({ title, value, subtitle, icon, valueColor = "text-brand-navy" }: KpiCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <p className={`text-2xl font-bold ${valueColor} mb-1`}>{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="ml-4">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
