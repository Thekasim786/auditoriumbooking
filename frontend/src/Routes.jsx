import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import ManagerDashboard from './pages/manager-dashboard';
import FacultyDashboard from './pages/faculty-dashboard';
import BookingRequestForm from './pages/booking-request-form';
import BookingCalendarView from './pages/booking-calendar-view';
import BookingHistory from './pages/booking-history';
import RequestDetails from './pages/request-details';
import LoginPage from './pages/login-page';
import { isAuthenticated, isManager } from './utils/auth';

const AuthRedirect = () => {
  if (!isAuthenticated()) return <LoginPage />;
  return <Navigate to={isManager() ? '/manager/dashboard' : '/faculty/dashboard'} replace />;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<AuthRedirect />} />
        <Route path="/login" element={<AuthRedirect />} />
        <Route path="/manager/dashboard" element={<ProtectedRoute role="manager"><ManagerDashboard /></ProtectedRoute>} />
        <Route path="/faculty/dashboard" element={<ProtectedRoute role="faculty"><FacultyDashboard /></ProtectedRoute>} />
        <Route path="/booking-request-form" element={<ProtectedRoute role="faculty"><BookingRequestForm /></ProtectedRoute>} />
        <Route path="/booking-calendar-view" element={<ProtectedRoute><BookingCalendarView /></ProtectedRoute>} />
        <Route path="/booking-history" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
        <Route path="/request-details" element={<ProtectedRoute><RequestDetails /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
