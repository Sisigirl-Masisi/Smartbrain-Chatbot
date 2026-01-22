import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, iconColor, trend }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="card hover:shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconColor}`}>
          <Icon name={icon} size={24} />
        </div>
        {trend && (
          <div className="flex items-center gap-1">
            <Icon name={getChangeIcon()} size={16} className={getChangeColor()} />
            <span className={`text-sm font-medium ${getChangeColor()}`}>{change}</span>
          </div>
        )}
      </div>
      <h3 className="text-sm text-muted-foreground mb-1 caption">{title}</h3>
      <p className="text-3xl font-bold text-foreground">{value}</p>
    </div>
  );
};

export default MetricCard;