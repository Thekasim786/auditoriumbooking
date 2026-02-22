import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // 🔹 Get logged in user from storage
  const storedUser =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  const userRole = storedUser?.role === "ROLE_MANAGER" ? "manager" : "faculty";
  const userName = storedUser?.fullName || "User";

  const [notifications] = useState({
    newRequests: 3,
    pendingApprovals: 5
  });

  const facultyNavItems = [
    { label: 'Dashboard', path: '/faculty/dashboard', icon: 'LayoutDashboard' },
    { label: 'New Request', path: '/booking-request-form', icon: 'Plus' },
    { label: 'Calendar', path: '/booking-calendar-view', icon: 'Calendar' },
    { label: 'My Bookings', path: '/booking-history', icon: 'History' }
  ];

  const managerNavItems = [
    { label: 'Dashboard', path: '/manager/dashboard', icon: 'LayoutDashboard', badge: notifications?.newRequests },
    { label: 'Calendar', path: '/booking-calendar-view', icon: 'Calendar' },
    { label: 'All Bookings', path: '/booking-history', icon: 'History', badge: notifications?.pendingApprovals }
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
    document.body.style.overflow = isMobileOpen ? 'hidden' : 'unset';
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

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    navigate("/login");
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
        {/* Logo */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Icon name="Building2" size={24} color="var(--color-primary)" />
          </div>
          <span className="sidebar-brand-text">AuditoriumBooking</span>
        </div>

        {/* User Section */}
        <div className="sidebar-user-section">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="User" size={20} color="var(--color-primary)" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {userName}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {userRole === 'manager' ? 'Auditorium Manager' : 'Faculty Member'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
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
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="sidebar-nav-item-text">{item?.label}</span>
                  {item?.badge && item?.badge > 0 && (
                    <span className="sidebar-badge">
                      {item?.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Buttons */}
        <div className="p-4 border-t border-border">
          <button
            onClick={onToggleCollapse}
            className="sidebar-nav-item w-full hidden lg:flex"
          >
            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
            <span className="sidebar-nav-item-text">
              {isCollapsed ? 'Expand' : 'Collapse'}
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="sidebar-nav-item w-full mt-2"
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