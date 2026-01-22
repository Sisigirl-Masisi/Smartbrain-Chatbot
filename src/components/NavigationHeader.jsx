import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const NavigationHeader = ({ userRole = 'user', userName = 'User', userEmail = 'user@example.com' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const userMenuRef = useRef(null);

  const navigationItems = [
    { path: '/chat-interface', label: 'Chat', icon: 'MessageSquare' },
    { path: '/conversation-history', label: 'History', icon: 'History' },
    { path: '/user-profile-settings', label: 'Profile', icon: 'User' },
  ];

  if (userRole === 'admin') {
    navigationItems?.push({ path: '/admin-dashboard', label: 'Admin', icon: 'Shield' });
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const checkConnection = () => {
      setIsConnected(navigator.onLine);
    };

    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);

    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location?.pathname === path;

  const getUserInitials = () => {
    return userName?.split(' ')?.map(n => n?.[0])?.join('')?.toUpperCase()?.slice(0, 2);
  };

  return (
    <>
      <button
        className="mobile-menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
      </button>
      <header className="nav-header">
        <div className="nav-header-logo">
          <div className="nav-header-brand">
            <Icon name="Brain" size={24} color="var(--color-primary)" />
          </div>
          <h1 className="nav-header-title hidden sm:block">SmartBrain</h1>
        </div>

        <nav className="nav-header-menu">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`nav-header-item focus-ring ${isActive(item?.path) ? 'active' : ''}`}
            >
              {item?.label}
            </button>
          ))}
        </nav>

        <div className="nav-header-actions">
          <div className={`nav-header-status ${!isConnected ? 'disconnected' : ''}`}>
            <span className="nav-header-status-dot"></span>
            <span>{isConnected ? 'Connected' : 'Offline'}</span>
          </div>

          <div className="relative" ref={userMenuRef}>
            <button
              className="user-menu-trigger focus-ring"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              aria-label="User menu"
            >
              <div className="user-menu-avatar">{getUserInitials()}</div>
              <Icon name="ChevronDown" size={16} className="hidden lg:block" />
            </button>

            <div className={`user-menu-dropdown ${!isUserMenuOpen ? 'closed' : ''}`}>
              <div className="user-menu-header">
                <div className="user-menu-name">{userName}</div>
                <div className="user-menu-email">{userEmail}</div>
              </div>

              <button
                onClick={() => {
                  handleNavigation('/user-profile-settings');
                  setIsUserMenuOpen(false);
                }}
                className="user-menu-item focus-ring"
              >
                <Icon name="Settings" size={16} />
                <span>Settings</span>
              </button>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                }}
                className="user-menu-item focus-ring"
              >
                <Icon name="HelpCircle" size={16} />
                <span>Help & Support</span>
              </button>

              <div className="user-menu-divider"></div>

              <button onClick={handleLogout} className="user-menu-item focus-ring">
                <Icon name="LogOut" size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className={`mobile-menu-overlay ${!isMobileMenuOpen ? 'closed' : ''}`}>
        <div className="mobile-menu-header">
          <div className="flex items-center gap-3">
            <div className="nav-header-brand">
              <Icon name="Brain" size={24} color="var(--color-primary)" />
            </div>
            <h2 className="nav-header-title">SmartBrain</h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-muted focus-ring"
            aria-label="Close menu"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="mobile-menu-content">
          <div className="flex items-center gap-3 p-4 mb-4 bg-card rounded-lg">
            <div className="user-menu-avatar">{getUserInitials()}</div>
            <div>
              <div className="text-sm font-semibold text-foreground">{userName}</div>
              <div className="text-xs text-muted-foreground">{userEmail}</div>
            </div>
          </div>

          <div className={`flex items-center gap-2 px-4 py-2 mb-4 rounded-full ${isConnected ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            <span className="text-xs font-medium">{isConnected ? 'Connected' : 'Offline'}</span>
          </div>

          <nav className="space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`mobile-menu-item w-full focus-ring ${isActive(item?.path) ? 'active' : ''}`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>

          <div className="mobile-menu-divider"></div>

          <button
            onClick={() => {
              handleNavigation('/user-profile-settings');
              setIsMobileMenuOpen(false);
            }}
            className="mobile-menu-item w-full focus-ring"
          >
            <Icon name="Settings" size={20} />
            <span>Settings</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="mobile-menu-item w-full focus-ring"
          >
            <Icon name="HelpCircle" size={20} />
            <span>Help & Support</span>
          </button>

          <div className="mobile-menu-divider"></div>

          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            className="mobile-menu-item w-full focus-ring text-error"
          >
            <Icon name="LogOut" size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavigationHeader;