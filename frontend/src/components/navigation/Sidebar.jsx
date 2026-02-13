import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ isCollapsed = false, onToggleCollapse, userRole = 'faculty' }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState({
    newRequests: 3,
    pendingApprovals: 5
  });

  const facultyNavItems = [
    {
      label: 'Dashboard',
      path: '/faculty-dashboard',
      icon: 'LayoutDashboard',
      roleAccess: 'faculty'
    },
    {
      label: 'New Request',
      path: '/booking-request-form',
      icon: 'Plus',
      roleAccess: 'faculty'
    },
    {
      label: 'Calendar',
      path: '/booking-calendar-view',
      icon: 'Calendar',
      roleAccess: 'faculty'
    },
    {
      label: 'My Bookings',
      path: '/booking-history',
      icon: 'History',
      roleAccess: 'faculty'
    }
  ];

  const managerNavItems = [
    {
      label: 'Dashboard',
      path: '/manager-dashboard',
      icon: 'LayoutDashboard',
      roleAccess: 'manager',
      badge: notifications?.newRequests
    },
    {
      label: 'Calendar',
      path: '/booking-calendar-view',
      icon: 'Calendar',
      roleAccess: 'manager'
    },
    {
      label: 'All Bookings',
      path: '/booking-history',
      icon: 'History',
      roleAccess: 'manager',
      badge: notifications?.pendingApprovals
    }
  ];

  const navigationItems = userRole === 'manager' ? managerNavItems : facultyNavItems;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileOpen]);

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false);
    }
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      <button
        onClick={handleMobileToggle}
        className="mobile-menu-button"
        aria-label="Toggle mobile menu"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={24} />
      </button>
      {isMobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={handleMobileToggle}
          aria-hidden="true"
        />
      )}
      <aside
        className={`sidebar-container ${isCollapsed ? 'collapsed' : ''} ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Icon name="Building2" size={24} color="var(--color-primary)" />
          </div>
          <span className="sidebar-brand-text">AuditoriumBooking</span>
        </div>

        <div className="sidebar-user-section">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="User" size={20} color="var(--color-primary)" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {userRole === 'manager' ? 'Dr. Rajesh Kumar' : 'Prof. Priya Sharma'}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {userRole === 'manager' ? 'Auditorium Manager' : 'Faculty Member'}
                </p>
              </div>
            )}
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <ul className="space-y-2">
            {navigationItems?.map((item) => (
              <li key={item?.path}>
                <Link
                  to={item?.path}
                  onClick={handleNavClick}
                  className={`sidebar-nav-item ${
                    isActivePath(item?.path) ? 'active' : ''
                  }`}
                  aria-current={isActivePath(item?.path) ? 'page' : undefined}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="sidebar-nav-item-text">{item?.label}</span>
                  {item?.badge && item?.badge > 0 && (
                    <span className="sidebar-badge" aria-label={`${item?.badge} notifications`}>
                      {item?.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={onToggleCollapse}
            className="sidebar-nav-item w-full hidden lg:flex"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
            <span className="sidebar-nav-item-text">
              {isCollapsed ? 'Expand' : 'Collapse'}
            </span>
          </button>

          <button
            className="sidebar-nav-item w-full mt-2"
            aria-label="Logout"
          >
            <Icon name="LogOut" size={20} />
            <span className="sidebar-nav-item-text">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;