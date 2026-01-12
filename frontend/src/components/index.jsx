import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/navigation/MainLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import MetricsCard from './components/MetricsCard';
import RequestQueueTable from './components/RequestQueueTable';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import ConflictDetectionPanel from './components/ConflictDetectionPanel';
import QuickActionsPanel from './components/QuickActionsPanel';
import RecentActivityFeed from './components/RecentActivityFeed';

const ManagerDashboard = () => {
  const navigate = useNavigate();

  const [pendingRequests] = useState([
    {
      id: "REQ001",
      submittedAt: "2026-01-12T08:30:00",
      facultyName: "Dr. Amit Verma",
      department: "Computer Science",
      eventDate: "25/01/2026",
      duration: "09:00 - 12:00 (3 hours)",
      facilities: [
        { name: "Projector", icon: "Projector" },
        { name: "Mic", icon: "Mic" },
        { name: "AC", icon: "Wind" }
      ],
      priority: "high"
    },
    {
      id: "REQ002",
      submittedAt: "2026-01-12T09:15:00",
      facultyName: "Prof. Sneha Patel",
      department: "Electronics",
      eventDate: "28/01/2026",
      duration: "14:00 - 17:00 (3 hours)",
      facilities: [
        { name: "Projector", icon: "Projector" },
        { name: "Sound", icon: "Volume2" }
      ],
      priority: "medium"
    },
    {
      id: "REQ003",
      submittedAt: "2026-01-12T10:45:00",
      facultyName: "Dr. Rajesh Kumar",
      department: "Mechanical",
      eventDate: "30/01/2026",
      duration: "10:00 - 13:00 (3 hours)",
      facilities: [
        { name: "Projector", icon: "Projector" },
        { name: "Mic", icon: "Mic" },
        { name: "AC", icon: "Wind" },
        { name: "WiFi", icon: "Wifi" }
      ],
      priority: "low"
    }
  ]);

  const [bookings] = useState([
    { date: "15/01/2026", timeSlot: "09:00 - 12:00", facultyName: "Dr. Priya Sharma" },
    { date: "15/01/2026", timeSlot: "14:00 - 17:00", facultyName: "Prof. Anil Gupta" },
    { date: "18/01/2026", timeSlot: "10:00 - 13:00", facultyName: "Dr. Meera Singh" },
    { date: "20/01/2026", timeSlot: "09:00 - 12:00", facultyName: "Prof. Vikram Rao" },
    { date: "20/01/2026", timeSlot: "14:00 - 17:00", facultyName: "Dr. Kavita Desai" },
    { date: "20/01/2026", timeSlot: "18:00 - 20:00", facultyName: "Prof. Suresh Nair" },
    { date: "22/01/2026", timeSlot: "10:00 - 13:00", facultyName: "Dr. Anjali Mehta" }
  ]);

  const [conflicts] = useState([
    {
      id: "CONF001",
      type: "Time Overlap",
      severity: "high",
      description: "Two requests for the same time slot on 25/01/2026",
      affectedBookings: [
        { facultyName: "Dr. Amit Verma", date: "25/01/2026", timeSlot: "09:00 - 12:00" },
        { facultyName: "Prof. Ravi Joshi", date: "25/01/2026", timeSlot: "09:00 - 11:00" }
      ],
      suggestions: [
        "Reschedule Prof. Ravi Joshi to 14:00 - 16:00 on 25/01/2026",
        "Move Prof. Ravi Joshi to 26/01/2026 at 09:00 - 11:00"
      ]
    },
    {
      id: "CONF002",
      type: "Facility Unavailable",
      severity: "medium",
      description: "Requested projector is under maintenance",
      affectedBookings: [
        { facultyName: "Prof. Sneha Patel", date: "28/01/2026", timeSlot: "14:00 - 17:00" }
      ],
      suggestions: [
        "Use backup projector from Room 201",
        "Reschedule to 29/01/2026 when maintenance is complete"
      ]
    }
  ]);

  const [recentActivities] = useState([
    {
      id: "ACT001",
      type: "approved",
      performedBy: "You",
      action: "approved booking request from",
      target: "Dr. Priya Sharma",
      details: "Annual Tech Symposium - Main Auditorium",
      timestamp: "2026-01-12T06:30:00",
      eventDate: "15/01/2026"
    },
    {
      id: "ACT002",
      type: "rejected",
      performedBy: "You",
      action: "rejected booking request from",
      target: "Prof. Arun Kumar",
      details: "Conflicting time slot with existing booking",
      timestamp: "2026-01-12T05:45:00",
      eventDate: "18/01/2026"
    },
    {
      id: "ACT003",
      type: "submitted",
      performedBy: "Dr. Amit Verma",
      action: "submitted new booking request for",
      target: "Department Seminar",
      details: "Computer Science Department - 3 hours duration",
      timestamp: "2026-01-12T05:30:00",
      eventDate: "25/01/2026"
    },
    {
      id: "ACT004",
      type: "modified",
      performedBy: "You",
      action: "modified booking for",
      target: "Prof. Meera Singh",
      details: "Changed time slot from 09:00 to 10:00",
      timestamp: "2026-01-12T04:15:00",
      eventDate: "18/01/2026"
    }
  ]);

  const handleApprove = (requestId) => {
    console.log('Approving request:', requestId);
  };

  const handleReject = (requestId) => {
    console.log('Rejecting request:', requestId);
  };

  const handleViewDetails = (requestId) => {
    navigate('/request-details', { state: { requestId } });
  };

  const handleBulkAction = (action, requestIds) => {
    console.log(`Bulk ${action}:`, requestIds);
  };

  const handleDateSelect = (date) => {
    console.log('Selected date:', date);
  };

  const handleResolveConflict = (conflictId) => {
    console.log('Resolving conflict:', conflictId);
  };

  const handleViewAlternatives = (conflictId) => {
    console.log('Viewing alternatives for conflict:', conflictId);
  };

  const handleQuickAction = (actionId) => {
    const actionRoutes = {
      'view-calendar': '/booking-calendar-view',
      'export-report': null,
      'send-notification': null,
      'view-analytics': null
    };

    if (actionRoutes?.[actionId]) {
      navigate(actionRoutes?.[actionId]);
    } else {
      console.log('Quick action:', actionId);
    }
  };

  return (
    <MainLayout userRole="manager">
      <div className="min-h-screen bg-background">
        <Breadcrumbs />

        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
            Manager Dashboard
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Review and manage auditorium booking requests with FCFS policy
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <MetricsCard
            title="Pending Requests"
            value="3"
            subtitle="Awaiting review"
            icon="Clock"
            variant="warning"
            trend="up"
            trendValue="+2"
          />
          <MetricsCard
            title="Today's Bookings"
            value="2"
            subtitle="Scheduled events"
            icon="Calendar"
            variant="primary"
          />
          <MetricsCard
            title="Utilization Rate"
            value="78%"
            subtitle="This month"
            icon="TrendingUp"
            variant="success"
            trend="up"
            trendValue="+12%"
          />
          <MetricsCard
            title="Total Bookings"
            value="45"
            subtitle="This month"
            icon="BarChart3"
            variant="default"
            trend="up"
            trendValue="+8"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Request Queue - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <RequestQueueTable
              requests={pendingRequests}
              onApprove={handleApprove}
              onReject={handleReject}
              onViewDetails={handleViewDetails}
              onBulkAction={handleBulkAction}
            />
          </div>

          {/* Availability Calendar - Takes 1 column */}
          <div className="lg:col-span-1">
            <AvailabilityCalendar
              bookings={bookings}
              onDateSelect={handleDateSelect}
            />
          </div>
        </div>

        {/* Secondary Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Conflict Detection */}
          <ConflictDetectionPanel
            conflicts={conflicts}
            onResolve={handleResolveConflict}
            onViewAlternatives={handleViewAlternatives}
          />

          {/* Recent Activity Feed */}
          <RecentActivityFeed activities={recentActivities} />
        </div>

        {/* Quick Actions */}
        <div className="mb-6 md:mb-8">
          <QuickActionsPanel onAction={handleQuickAction} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ManagerDashboard;