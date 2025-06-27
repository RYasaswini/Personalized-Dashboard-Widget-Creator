
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  loading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  loading = false,
}) => {
  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </CardContent>
      </Card>
    );
  }

  const changeColorClass = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600',
  }[changeType];

  return (
    <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {icon && <div className="text-gray-400">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        {change && (
          <p className={`text-xs ${changeColorClass} flex items-center`}>
            {changeType === 'positive' && '↗'}
            {changeType === 'negative' && '↘'}
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
