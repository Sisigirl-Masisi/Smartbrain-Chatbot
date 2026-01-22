import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';

const SocialLogin = () => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      bgColor: 'bg-gray-900 hover:bg-gray-800',
      textColor: 'text-white',
      borderColor: 'border-gray-900'
    }
  ];

  const handleSocialLogin = (providerId) => {
    setLoadingProvider(providerId);
    setTimeout(() => {
      alert(`${providerId?.charAt(0)?.toUpperCase() + providerId?.slice(1)} authentication will be implemented soon.`);
      setLoadingProvider(null);
    }, 1000);
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-3 text-muted-foreground caption">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <button
            key={provider?.id}
            type="button"
            onClick={() => handleSocialLogin(provider?.id)}
            disabled={loadingProvider !== null}
            className={`
              flex items-center justify-center gap-3 px-4 py-3 rounded-lg
              border ${provider?.borderColor} ${provider?.bgColor} ${provider?.textColor}
              font-medium text-sm transition-all duration-250 ease-out
              focus-ring disabled:opacity-50 disabled:cursor-not-allowed
              ${loadingProvider === provider?.id ? 'opacity-70' : ''}
            `}
          >
            {loadingProvider === provider?.id ? (
              <Icon name="Loader2" size={18} className="animate-spin" />
            ) : (
              <Icon name={provider?.icon} size={18} />
            )}
            <span>{provider?.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;