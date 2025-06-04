
interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
}

const MetricsCard = ({ title, value, change, changeType, icon }: MetricsCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-brand-sage';
      case 'negative':
        return 'text-brand-brick';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <p className="text-2xl font-bold text-brand-navy">{value}</p>
          <p className={`text-sm ${getChangeColor()} mt-1`}>{change}</p>
        </div>
        {icon && (
          <div className="p-3 bg-brand-light rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
