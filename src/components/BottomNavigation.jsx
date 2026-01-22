import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const BottomNavigation = ({ userRole = 'user' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/chat-interface', label: 'Chat', icon: 'MessageSquare' },
    { path: '/conversation-history', label: 'History', icon: 'History' },
    { path: '/user-profile-settings', label: 'Profile', icon: 'User' },
  ];

  if (userRole === 'admin') {
    navigationItems?.push({ path: '/admin-dashboard', label: 'Admin', icon: 'Shield' });
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <nav className="bottom-nav">
      {navigationItems?.map((item) => (
        <button
          key={item?.path}
          onClick={() => handleNavigation(item?.path)}
          className={`bottom-nav-item focus-ring ${isActive(item?.path) ? 'active' : ''}`}
          aria-label={item?.label}
        >
          <Icon name={item?.icon} size={24} />
          <span className="bottom-nav-label">{item?.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;