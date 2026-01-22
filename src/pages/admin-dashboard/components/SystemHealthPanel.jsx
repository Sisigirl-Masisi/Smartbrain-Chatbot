import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealthPanel = ({ healthData }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-success/10 text-success';
      case 'warning':
        return 'bg-warning/10 text-warning';
      case 'critical':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return 'CheckCircle2';
      case 'warning':
        return 'AlertTriangle';
      case 'critical':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">System Health</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success">
          <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
          <span className="text-xs font-medium caption">All Systems Operational</span>
        </div>
      </div>
      <div className="space-y-4">
        {healthData?.map((item) => (
          <div key={item?.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(item?.status)}`}>
                <Icon name={getStatusIcon(item?.status)} size={20} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">{item?.name}</h3>
                <p className="text-xs text-muted-foreground caption">{item?.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-foreground">{item?.value}</p>
              <p className="text-xs text-muted-foreground caption">{item?.unit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemHealthPanel;