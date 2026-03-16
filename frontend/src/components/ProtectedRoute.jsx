import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, isManager } from '../utils/auth';

const ProtectedRoute = ({ children, role }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role === 'manager' && !isManager()) {
    return <Navigate to="/faculty/dashboard" replace />;
  }

  if (role === 'faculty' && isManager()) {
    return <Navigate to="/manager/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
