import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertNotifications = ({ alerts }) => {
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  const handleDismiss = (alertId) => {
    setDismissedAlerts([...dismissedAlerts, alertId]);
  };

  const visibleAlerts = alerts?.filter(alert => !dismissedAlerts?.includes(alert?.id));

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'critical':
        return {
          bgColor: 'bg-error/10',
          textColor: 'text-error',
          borderColor: 'border-error/20',
          icon: 'AlertOctagon'
        };
      case 'high':
        return {
          bgColor: 'bg-warning/10',
          textColor: 'text-warning',
          borderColor: 'border-warning/20',
          icon: 'AlertTriangle'
        };
      case 'medium':
        return {
          bgColor: 'bg-primary/10',
          textColor: 'text-primary',
          borderColor: 'border-primary/20',
          icon: 'Info'
        };
      default:
        return {
          bgColor: 'bg-muted',
          textColor: 'text-muted-foreground',
          borderColor: 'border-border',
          icon: 'Bell'
        };
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">System Alerts</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground caption">{visibleAlerts?.length} active</span>
          <Button variant="ghost" size="sm" iconName="Settings">
            Configure
          </Button>
        </div>
      </div>
      {visibleAlerts?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
            <Icon name="CheckCircle2" size={32} color="var(--color-success)" />
          </div>
          <p className="text-lg font-medium text-foreground mb-2">All Clear!</p>
          <p className="text-sm text-muted-foreground caption">No active alerts at this time</p>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleAlerts?.map((alert) => {
            const config = getPriorityConfig(alert?.priority);
            return (
              <div
                key={alert?.id}
                className={`flex items-start gap-4 p-4 rounded-lg border ${config?.bgColor} ${config?.borderColor} transition-all hover:shadow-md`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-background ${config?.textColor}`}>
                  <Icon name={config?.icon} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-foreground">{alert?.title}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${config?.bgColor} ${config?.textColor} caption`}>
                      {alert?.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{alert?.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground caption">{alert?.timestamp}</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleDismiss(alert?.id)}>
                        Dismiss
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AlertNotifications;