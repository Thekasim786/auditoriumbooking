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
import ProtectedRoute from "./components/auth/ProtectedRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* FACULTY DASHBOARD */}
          <Route
            path="/faculty/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ROLE_FACULTY"]}>
                <FacultyDashboard />
              </ProtectedRoute>
            }
          />

          {/* MANAGER DASHBOARD */}
          <Route
            path="/manager/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ROLE_MANAGER"]}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />

          {/* CALENDAR — BOTH CAN ACCESS */}
          <Route
            path="/booking-calendar-view"
            element={
              <ProtectedRoute allowedRoles={["ROLE_MANAGER", "ROLE_FACULTY"]}>
                <BookingCalendarView />
              </ProtectedRoute>
            }
          />

          {/* BOOKING REQUEST FORM — FACULTY ONLY */}
          <Route
            path="/booking-request-form"
            element={
              <ProtectedRoute allowedRoles={["ROLE_FACULTY"]}>
                <BookingRequestForm />
              </ProtectedRoute>
            }
          />

          {/* BOOKING HISTORY — BOTH CAN SEE */}
          <Route
            path="/booking-history"
            element={
              <ProtectedRoute allowedRoles={["ROLE_MANAGER", "ROLE_FACULTY"]}>
                <BookingHistory />
              </ProtectedRoute>
            }
          />

          {/* REQUEST DETAILS — FACULTY ONLY */}
          <Route
            path="/request-details"
            element={
              <ProtectedRoute allowedRoles={["ROLE_FACULTY"]}>
                <RequestDetails />
              </ProtectedRoute>
            }
          />

          {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} />

        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;