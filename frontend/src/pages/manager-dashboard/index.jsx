import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/navigation/MainLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import MetricsCard from './components/MetricsCard';
import RequestQueueTable from './components/RequestQueueTable';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import ConflictDetectionPanel from './components/ConflictDetectionPanel';
import RecentActivityFeed from './components/RecentActivityFeed';
import { authFetch, getUser } from '../../utils/auth';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const user = getUser();

  const [loading, setLoading] = useState(true);
  const [allBookings, setAllBookings] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [metrics, setMetrics] = useState({
    pending: 0,
    todayBookings: 0,
    utilization: '0%',
    totalMonthly: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch all bookings
      const allRes = await authFetch('/manager/bookings');
      if (!allRes.ok) throw new Error('Failed to fetch bookings');
      const allData = await allRes.json();
      setAllBookings(allData);

      // Build pending requests for RequestQueueTable
      const pending = allData
        .filter(b => b.status === 'PENDING')
        .map(b => ({
          id: `REQ${String(b.id).padStart(3, '0')}`,
          bookingId: b.id,
          submittedAt: b.createdAt,
          facultyName: b.facultyName,
          department: '',
          eventDate: formatDateDisplay(b.eventStartDate),
          duration: `${b.startTime} - ${b.endTime}`,
          facilities: buildFacilityIcons(b.technicalEquipment),
          priority: b.priority || 'normal',
          // Keep raw for API calls
          _raw: b
        }));
      setPendingRequests(pending);

      // Build approved bookings for AvailabilityCalendar
      const approved = allData
        .filter(b => b.status === 'APPROVED')
        .map(b => ({
          date: formatDateDisplay(b.eventStartDate),
          timeSlot: `${b.startTime} - ${b.endTime}`,
          facultyName: b.facultyName
        }));
      setBookings(approved);

      // Detect conflicts (overlapping pending requests on same date)
      const detectedConflicts = detectConflicts(allData);
      setConflicts(detectedConflicts);

      // Build recent activities from reviewed bookings
      const activities = buildRecentActivities(allData);
      setRecentActivities(activities);

      // Calculate metrics
      const today = new Date().toISOString().split('T')[0];
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const pendingCount = allData.filter(b => b.status === 'PENDING').length;
      const todayCount = allData.filter(b => b.eventStartDate === today && b.status === 'APPROVED').length;
      const monthlyTotal = allData.filter(b => {
        const d = new Date(b.eventStartDate);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      }).length;
      const approvedCount = allData.filter(b => b.status === 'APPROVED').length;
      const utilRate = allData.length > 0
        ? Math.round((approvedCount / allData.length) * 100)
        : 0;

      setMetrics({
        pending: pendingCount,
        todayBookings: todayCount,
        utilization: `${utilRate}%`,
        totalMonthly: monthlyTotal
      });

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Format "2026-03-15" → "15/03/2026"
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  // Convert technicalEquipment map to facility icons array
  const buildFacilityIcons = (equipment) => {
    if (!equipment || typeof equipment !== 'object') return [];

    const iconMap = {
      projector: { name: 'Projector', icon: 'Projector' },
      microphone: { name: 'Mic', icon: 'Mic' },
      soundSystem: { name: 'Sound', icon: 'Volume2' },
      whiteboard: { name: 'Whiteboard', icon: 'PenSquare' },
      videoConferencing: { name: 'Video', icon: 'Video' },
      wifi: { name: 'WiFi', icon: 'Wifi' }
    };

    return Object.entries(equipment)
      .filter(([_, value]) => value)
      .map(([key]) => iconMap[key] || { name: key, icon: 'Settings' });
  };

  // Detect time-slot conflicts among pending/approved bookings
  const detectConflicts = (data) => {
    const detected = [];
    const pendingAndApproved = data.filter(b => b.status === 'PENDING' || b.status === 'APPROVED');

    for (let i = 0; i < pendingAndApproved.length; i++) {
      for (let j = i + 1; j < pendingAndApproved.length; j++) {
        const a = pendingAndApproved[i];
        const b = pendingAndApproved[j];

        if (a.eventStartDate === b.eventStartDate &&
            a.startTime < b.endTime && a.endTime > b.startTime) {
          detected.push({
            id: `CONF${detected.length + 1}`,
            type: 'Time Overlap',
            severity: 'high',
            description: `Two requests overlap on ${formatDateDisplay(a.eventStartDate)}`,
            affectedBookings: [
              { facultyName: a.facultyName, date: formatDateDisplay(a.eventStartDate), timeSlot: `${a.startTime} - ${a.endTime}` },
              { facultyName: b.facultyName, date: formatDateDisplay(b.eventStartDate), timeSlot: `${b.startTime} - ${b.endTime}` }
            ],
            suggestions: [
              `Reschedule ${b.facultyName}'s event to a different time slot`,
              `Move one event to the next available date`
            ]
          });
        }
      }
    }

    return detected;
  };

  // Build activity feed from booking history
  const buildRecentActivities = (data) => {
    const activities = [];

    // Recently reviewed bookings (approved/rejected)
    const reviewed = data
      .filter(b => b.reviewedAt)
      .sort((a, b) => new Date(b.reviewedAt) - new Date(a.reviewedAt))
      .slice(0, 5);

    reviewed.forEach((b, i) => {
      activities.push({
        id: `ACT${String(i + 1).padStart(3, '0')}`,
        type: b.status === 'APPROVED' ? 'approved' : 'rejected',
        performedBy: b.reviewedByName || 'You',
        action: b.status === 'APPROVED' ? 'approved booking request from' : 'rejected booking request from',
        target: b.facultyName,
        details: `${b.eventTitle || 'Booking'} - ${b.venue || 'Auditorium'}`,
        timestamp: b.reviewedAt,
        eventDate: formatDateDisplay(b.eventStartDate)
      });
    });

    // Recently submitted (pending)
    const recentPending = data
      .filter(b => b.status === 'PENDING')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);

    recentPending.forEach((b, i) => {
      activities.push({
        id: `ACT${String(reviewed.length + i + 1).padStart(3, '0')}`,
        type: 'submitted',
        performedBy: b.facultyName,
        action: 'submitted new booking request for',
        target: b.eventTitle || 'Event',
        details: `${b.venue || 'Auditorium'} - ${b.startTime} to ${b.endTime}`,
        timestamp: b.createdAt,
        eventDate: formatDateDisplay(b.eventStartDate)
      });
    });

    // Sort all by timestamp descending
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return activities.slice(0, 8);
  };

  const handleApprove = async (requestId) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (!request?._raw?.id) return;

    try {
      const response = await authFetch('/manager/bookings/review', {
        method: 'POST',
        body: JSON.stringify({
          bookingId: request._raw.id,
          action: 'APPROVED',
          remarks: 'Approved from manager dashboard'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to approve booking');
        return;
      }

      // Refresh dashboard
      fetchDashboardData();
    } catch (err) {
      console.error('Approve error:', err);
      alert('Failed to approve booking');
    }
  };

  const handleReject = async (requestId) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (!request?._raw?.id) return;

    const reason = prompt('Enter rejection reason:');
    if (reason === null) return; // cancelled prompt

    try {
      const response = await authFetch('/manager/bookings/review', {
        method: 'POST',
        body: JSON.stringify({
          bookingId: request._raw.id,
          action: 'REJECTED',
          remarks: reason || 'Rejected from manager dashboard'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to reject booking');
        return;
      }

      fetchDashboardData();
    } catch (err) {
      console.error('Reject error:', err);
      alert('Failed to reject booking');
    }
  };

  const handleViewDetails = (requestId) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (request?._raw) {
      // Transform for RequestDetails page
      const booking = {
        requestId: request.id,
        id: request._raw.id,
        eventTitle: request._raw.eventTitle,
        eventDate: request._raw.eventStartDate,
        startTime: request._raw.startTime,
        endTime: request._raw.endTime,
        status: request._raw.status.toLowerCase(),
        auditorium: request._raw.venue,
        facultyName: request._raw.facultyName,
        facultyEmail: request._raw.facultyEmail,
        attendees: request._raw.expectedAttendees,
        eventPurpose: request._raw.eventPurpose,
        eventType: request._raw.eventType,
        facilities: buildFacilityNames(request._raw.technicalEquipment, request._raw.additionalServices),
        remarks: request._raw.managerRemarks,
        reviewedByName: request._raw.reviewedByName,
        reviewedAt: request._raw.reviewedAt,
        priority: request._raw.priority,
        specialRequirements: request._raw.specialRequirements,
        specialInstructions: request._raw.specialInstructions,
        submissionDate: request._raw.createdAt ? request._raw.createdAt.split('T')[0] : ''
      };
      navigate('/request-details', { state: { booking } });
    } else {
      navigate('/request-details', { state: { requestId } });
    }
  };

  const buildFacilityNames = (equipment, services) => {
    const facilities = [];
    if (equipment && typeof equipment === 'object') {
      Object.entries(equipment).forEach(([key, value]) => {
        if (value) {
          facilities.push(key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim());
        }
      });
    }
    if (services && typeof services === 'object') {
      Object.entries(services).forEach(([key, value]) => {
        if (value) {
          facilities.push(key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim());
        }
      });
    }
    return facilities;
  };

  const handleBulkAction = async (action, requestIds) => {
    for (const reqId of requestIds) {
      if (action === 'approve') {
        await handleApprove(reqId);
      } else if (action === 'reject') {
        await handleReject(reqId);
      }
    }
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
            Welcome back, {user?.fullName || 'Manager'}! Review and manage auditorium booking requests with FCFS policy
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <MetricsCard
            title="Pending Requests"
            value={loading ? '...' : String(metrics.pending)}
            subtitle="Awaiting review"
            icon="Clock"
            variant="warning"
          />
          <MetricsCard
            title="Today's Bookings"
            value={loading ? '...' : String(metrics.todayBookings)}
            subtitle="Scheduled events"
            icon="Calendar"
            variant="primary"
          />
          <MetricsCard
            title="Approval Rate"
            value={loading ? '...' : metrics.utilization}
            subtitle="Overall"
            icon="TrendingUp"
            variant="success"
          />
          <MetricsCard
            title="Total Bookings"
            value={loading ? '...' : String(metrics.totalMonthly)}
            subtitle="This month"
            icon="BarChart3"
            variant="default"
          />
        </div>

        {/* Pending Requests - Full Width for easy approve/reject */}
        <div className="mb-6 md:mb-8">
          <RequestQueueTable
            requests={pendingRequests}
            onApprove={handleApprove}
            onReject={handleReject}
            onViewDetails={handleViewDetails}
            onBulkAction={handleBulkAction}
          />
        </div>

        {/* Calendar, Conflicts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Availability Calendar */}
          <div className="lg:col-span-1">
            <AvailabilityCalendar
              bookings={bookings}
              onDateSelect={handleDateSelect}
            />
          </div>

          {/* Conflict Detection */}
          <div className="lg:col-span-1">
            <ConflictDetectionPanel
              conflicts={conflicts}
              onResolve={handleResolveConflict}
              onViewAlternatives={handleViewAlternatives}
            />
          </div>

          {/* Recent Activity Feed */}
          <div className="lg:col-span-1">
            <RecentActivityFeed activities={recentActivities} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ManagerDashboard;