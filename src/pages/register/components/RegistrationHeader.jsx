import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center mb-6 md:mb-8 lg:mb-10">
      <div className="flex justify-center mb-4 md:mb-6">
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center rounded-2xl bg-primary/10">
          <Icon name="Brain" size={40} color="var(--color-primary)" className="md:w-12 md:h-12 lg:w-14 lg:h-14" />
        </div>
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
        Create Your Account
      </h1>
      <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-md mx-auto">
        Join SmartBrain to access AI-powered conversations and intelligent query processing
      </p>
    </div>
  );
};

export default RegistrationHeader;