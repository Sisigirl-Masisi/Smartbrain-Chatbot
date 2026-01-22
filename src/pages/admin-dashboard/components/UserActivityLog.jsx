import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UserActivityLog = ({ activities }) => {
  const [filter, setFilter] = useState('all');

  const filters = [
    { value: 'all', label: 'All Activities', icon: 'Activity' },
    { value: 'login', label: 'Logins', icon: 'LogIn' },
    { value: 'query', label: 'Queries', icon: 'MessageSquare' },
    { value: 'error', label: 'Errors', icon: 'AlertCircle' }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'login':
        return { name: 'LogIn', color: 'text-success' };
      case 'query':
        return { name: 'MessageSquare', color: 'text-primary' };
      case 'error':
        return { name: 'AlertCircle', color: 'text-error' };
      case 'logout':
        return { name: 'LogOut', color: 'text-warning' };
      default:
        return { name: 'Activity', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-foreground">User Activity Log</h2>
        <Button variant="outline" size="sm" iconName="RefreshCw">
          Refresh
        </Button>
      </div>
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {filters?.map((filterOption) => (
          <button
            key={filterOption?.value}
            onClick={() => setFilter(filterOption?.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors focus-ring caption ${
              filter === filterOption?.value
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <Icon name={filterOption?.icon} size={16} />
            {filterOption?.label}
          </button>
        ))}
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
        {filteredActivities?.map((activity) => {
          const iconConfig = getActivityIcon(activity?.type);
          return (
            <div key={activity?.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-background ${iconConfig?.color}`}>
                <Icon name={iconConfig?.name} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <Image
                      src={activity?.avatar}
                      alt={activity?.avatarAlt}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-foreground">{activity?.user}</span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap caption">{activity?.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{activity?.description}</p>
                {activity?.metadata && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground caption">IP: {activity?.metadata?.ip}</span>
                    <span className="text-xs text-muted-foreground caption">•</span>
                    <span className="text-xs text-muted-foreground caption">{activity?.metadata?.location}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserActivityLog;