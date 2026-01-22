import React, { useState, useEffect } from 'react';
import Icon from './AppIcon';

const ConnectionStatus = ({ className = '' }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [wsStatus, setWsStatus] = useState('connected');

  useEffect(() => {
    const checkConnection = () => {
      setIsConnected(navigator.onLine);
    };

    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);

    const wsInterval = setInterval(() => {
      if (navigator.onLine) {
        setWsStatus('connected');
      } else {
        setWsStatus('disconnected');
      }
    }, 5000);

    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
      clearInterval(wsInterval);
    };
  }, []);

  const getStatusConfig = () => {
    if (!isConnected || wsStatus === 'disconnected') {
      return {
        color: 'error',
        bgColor: 'bg-error/10',
        textColor: 'text-error',
        label: 'Offline',
        icon: 'WifiOff',
      };
    }
    return {
      color: 'success',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      label: 'Connected',
      icon: 'Wifi',
    };
  };

  const status = getStatusConfig();

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${status?.bgColor} ${status?.textColor} ${className}`}>
      <Icon name={status?.icon} size={14} />
      <span className="text-xs font-medium caption">{status?.label}</span>
      <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
    </div>
  );
};

export default ConnectionStatus;