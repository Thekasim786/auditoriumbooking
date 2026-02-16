import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import ManagerDashboard from './pages/manager-dashboard';
import FacultyDashboard from './pages/faculty-dashboard';
import BookingRequestForm from './pages/booking-request-form';
import BookingCalendarView from './pages/booking-calendar-view';
import BookingHistory from './pages/booking-history';
import RequestDetails from './pages/request-details';
import LoginPage from './pages/login-page';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/booking-request-form" element={<BookingRequestForm />} />
        <Route path="/booking-calendar-view" element={<BookingCalendarView />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/request-details" element={<RequestDetails />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
