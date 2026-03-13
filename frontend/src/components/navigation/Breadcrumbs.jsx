import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumbs = ({ customItems = null }) => {
  const location = useLocation();

  const routeMap = {
    '/faculty-dashboard': 'Dashboard',
    '/booking-request-form': 'New Request',
    '/manager-dashboard': 'Dashboard',
    '/booking-calendar-view': 'Calendar',
    '/request-details': 'Request Details',
    '/booking-history': 'Booking History'
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    let currentPath = '';
    pathSegments?.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = routeMap?.[currentPath] || segment?.replace(/-/g, ' ');
      breadcrumbs?.push({
        label: label?.charAt(0)?.toUpperCase() + label?.slice(1),
        path: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs?.map((crumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;
          
          return (
            <li key={crumb?.path} className="flex items-center gap-2">
              {index > 0 && (
                <Icon
                  name="ChevronRight"
                  size={16}
                  className="text-muted-foreground"
                />
              )}
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {crumb?.label}
                </span>
              ) : (
                <Link
                  to={crumb?.path}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-250"
                >
                  {crumb?.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;