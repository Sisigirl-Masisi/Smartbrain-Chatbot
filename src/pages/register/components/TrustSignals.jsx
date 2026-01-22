import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      icon: 'Lock',
      title: 'GDPR Compliant',
      description: 'We follow strict data protection regulations'
    },
    {
      icon: 'CheckCircle',
      title: 'SOC 2 Certified',
      description: 'Industry-standard security practices'
    }
  ];

  return (
    <div className="mt-6 md:mt-8 lg:mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {trustBadges?.map((badge, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 md:p-5 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary/10 mb-3">
              <Icon name={badge?.icon} size={20} color="var(--color-primary)" />
            </div>
            <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">
              {badge?.title}
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground caption">
              {badge?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSignals;