import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: "Users",
      iconColor: "bg-primary/10 text-primary",
      action: "Manage Users"
    },
    {
      id: 2,
      title: "AI Model Config",
      description: "Configure AI model parameters",
      icon: "Settings",
      iconColor: "bg-secondary/10 text-secondary",
      action: "Configure"
    },
    {
      id: 3,
      title: "Export Reports",
      description: "Generate and download analytics reports",
      icon: "FileText",
      iconColor: "bg-accent/10 text-accent",
      action: "Export"
    },
    {
      id: 4,
      title: "System Backup",
      description: "Create system backup and restore points",
      icon: "Database",
      iconColor: "bg-success/10 text-success",
      action: "Backup Now"
    }
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <div
            key={action?.id}
            className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all hover:shadow-md cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action?.iconColor}`}>
              <Icon name={action?.icon} size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground mb-1">{action?.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 caption">{action?.description}</p>
              <Button variant="outline" size="sm" className="w-full">
                {action?.action}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;