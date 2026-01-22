import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 1,
      icon: 'Shield',
      label: 'SSL Secured',
      description: '256-bit encryption'
    },
    {
      id: 2,
      icon: 'Lock',
      label: 'GDPR Compliant',
      description: 'Data privacy protected'
    },
    {
      id: 3,
      icon: 'CheckCircle2',
      label: 'SOC 2 Certified',
      description: 'Security audited'
    }
  ];

  return (
    <div className="w-full mt-6 pt-6 border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trustBadges?.map((badge) => (
          <div
            key={badge?.id}
            className="flex flex-col items-center text-center gap-2 p-3 rounded-lg bg-muted/30"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name={badge?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">{badge?.label}</p>
              <p className="text-xs text-muted-foreground caption">{badge?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSignals;