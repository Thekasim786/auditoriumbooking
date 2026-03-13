import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/navigation/MainLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import StatusDashboard from './components/StatusDashboard';
import StatsOverview from './components/StatsOverview';
import { authFetch, getUser } from '../../utils/auth';

const FacultyDashboard = () => {
  const user = getUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const response = await authFetch('/faculty/bookings');
      if (!response.ok) throw new Error('Failed to fetch bookings');

      const data = await response.json();

      // Transform for child components
      const transformed = data.map((booking) => ({
        requestId: `REQ-${new Date(booking.createdAt).getFullYear()}-${String(booking.id).padStart(3, '0')}`,
        id: booking.id,
        eventDate: booking.eventStartDate,
        eventTitle: booking.eventTitle,
        eventPurpose: booking.eventPurpose,
        auditorium: booking.venue,
        startTime: booking.startTime,
        endTime: booking.endTime,
        status: booking.status.toLowerCase(),
        attendees: booking.expectedAttendees,
        facilities: formatFacilities(booking.technicalEquipment, booking.additionalServices),
        remarks: booking.managerRemarks,
        submissionDate: booking.createdAt ? booking.createdAt.split('T')[0] : '',
        reviewedAt: booking.reviewedAt,
        priority: booking.priority
      }));

      setBookings(transformed);

      // Calculate stats
      setStats({
        total: transformed.length,
        pending: transformed.filter(b => b.status === 'pending').length,
        approved: transformed.filter(b => b.status === 'approved').length,
        rejected: transformed.filter(b => b.status === 'rejected').length
      });
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatFacilities = (technicalEquipment, additionalServices) => {
    const facilities = [];
    if (technicalEquipment) {
      Object.entries(technicalEquipment).forEach(([key, value]) => {
        if (value) {
          facilities.push(
            key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim()
          );
        }
      });
    }
    if (additionalServices) {
      Object.entries(additionalServices).forEach(([key, value]) => {
        if (value) {
          facilities.push(
            key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim()
          );
        }
      });
    }
    return facilities;
  };

  return (
    <MainLayout userRole="faculty">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs />

        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Faculty Dashboard
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Welcome back, {user?.fullName || 'Faculty'}! Manage your auditorium bookings.
          </p>
        </div>

        <StatsOverview stats={stats} loading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-3">
            <StatusDashboard bookings={bookings} loading={loading} onRefresh={fetchMyBookings} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FacultyDashboard;