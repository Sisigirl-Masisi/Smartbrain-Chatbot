import React, { useState } from 'react';
import Button from '../../../components/ui/Button';


const SocialRegistration = () => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'hover:bg-[#4285F4]/10'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      color: 'hover:bg-[#333]/10'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Box',
      color: 'hover:bg-[#00A4EF]/10'
    }
  ];

  const handleSocialLogin = (providerId) => {
    setLoadingProvider(providerId);
    setTimeout(() => {
      setLoadingProvider(null);
    }, 2000);
  };

  return (
    <div className="space-y-4 md:space-y-5">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs md:text-sm">
          <span className="px-4 bg-card text-muted-foreground caption">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            size="default"
            onClick={() => handleSocialLogin(provider?.id)}
            loading={loadingProvider === provider?.id}
            disabled={loadingProvider !== null}
            iconName={provider?.icon}
            iconPosition="left"
            className={`transition-colors ${provider?.color}`}
          >
            {provider?.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialRegistration;