import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/navigation/MainLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import CalendarHeader from './components/CalendarHeader';
import CalendarFilters from './components/CalendarFilters';
import DayView from './components/DayView';
import WeekView from './components/WeekView';
import MonthView from './components/MonthView';
import BookingDetailPanel from './components/BookingDetailPanel';
import { authFetch, isManager } from '../../utils/auth';

const BookingCalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedAuditorium, setSelectedAuditorium] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const userIsManager = isManager();
  const userRole = userIsManager ? 'manager' : 'faculty';

  // Fetch bookings from backend
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const endpoint = userIsManager ? '/manager/bookings' : '/faculty/bookings';
      const response = await authFetch(endpoint);

      if (!response.ok) throw new Error('Failed to fetch bookings');

      const data = await response.json();

      // Transform backend response to match calendar component format
      const transformed = data.map((booking) => ({
        id: booking.id,
        eventTitle: booking.eventTitle,
        facultyName: booking.facultyName,
        department: '',
        date: new Date(booking.eventStartDate + 'T00:00:00'),
        timeSlot: booking.startTime && booking.endTime
          ? `${booking.startTime} - ${booking.endTime}` : '',
        auditorium: booking.venue || 'Not Assigned',
        purpose: booking.eventPurpose || '',
        facilities: formatFacilitiesArray(booking.technicalEquipment, booking.additionalServices),
        expectedAttendees: booking.expectedAttendees || 0,
        status: mapStatus(booking.status),
        approvalHistory: buildApprovalHistory(booking),
        // Keep raw data for API calls
        _raw: booking
      }));

      setBookings(transformed);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Map backend status to frontend status names
  const mapStatus = (status) => {
    switch (status?.toUpperCase()) {
      case 'APPROVED': return 'confirmed';
      case 'PENDING': return 'pending';
      case 'REJECTED': return 'cancelled';
      default: return status?.toLowerCase() || 'pending';
    }
  };

  // Convert equipment/services maps to array of strings
  const formatFacilitiesArray = (technicalEquipment, additionalServices) => {
    const facilities = [];

    if (technicalEquipment && typeof technicalEquipment === 'object') {
      Object.entries(technicalEquipment).forEach(([key, value]) => {
        if (value) {
          facilities.push(
            key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim()
          );
        }
      });
    }

    if (additionalServices && typeof additionalServices === 'object') {
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

  // Build approval history timeline from booking data
  const buildApprovalHistory = (booking) => {
    const history = [];

    if (booking.createdAt) {
      history.push({
        action: 'Request Submitted',
        by: booking.facultyName || 'Faculty',
        timestamp: new Date(booking.createdAt)
      });
    }

    if (booking.reviewedAt && booking.status === 'APPROVED') {
      history.push({
        action: 'Approved',
        by: booking.reviewedByName ? `${booking.reviewedByName} (Auditorium Manager)` : 'Auditorium Manager',
        timestamp: new Date(booking.reviewedAt)
      });
    }

    if (booking.reviewedAt && booking.status === 'REJECTED') {
      history.push({
        action: 'Rejected',
        by: booking.reviewedByName ? `${booking.reviewedByName} (Auditorium Manager)` : 'Auditorium Manager',
        timestamp: new Date(booking.reviewedAt)
      });
    }

    return history;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = (direction) => {
    const newDate = new Date(currentDate);
    
    if (viewMode === 'day') {
      newDate?.setDate(currentDate?.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate?.setDate(currentDate?.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate?.setMonth(currentDate?.getMonth() + (direction === 'next' ? 1 : -1));
    }
    
    setCurrentDate(newDate);
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const handleDateSelect = (date) => {
    setCurrentDate(date);
    setViewMode('day');
  };

  const handleRefresh = () => {
    fetchBookings();
  };

  const handleBookingSelect = (booking) => {
    setSelectedBooking(booking);
  };

  const handleClosePanel = () => {
    setSelectedBooking(null);
  };

  const handleEditBooking = (booking) => {
    console.log('Edit booking:', booking);
  };

  const handleCancelBooking = async (booking) => {
    if (!booking?._raw?.id) {
      console.log('Cancel booking:', booking);
      return;
    }

    if (userIsManager) {
      // Manager rejects the booking
      try {
        const response = await authFetch('/manager/bookings/review', {
          method: 'POST',
          body: JSON.stringify({
            bookingId: booking._raw.id,
            action: 'REJECTED',
            remarks: 'Cancelled from calendar view'
          })
        });

        if (!response.ok) {
          const data = await response.json();
          alert(data.message || 'Failed to cancel booking');
          return;
        }

        setSelectedBooking(null);
        fetchBookings();
      } catch (err) {
        console.error('Cancel error:', err);
        alert('Failed to cancel booking');
      }
    } else {
      // Faculty deletes their pending booking
      try {
        const response = await authFetch(`/faculty/bookings/${booking._raw.id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          const data = await response.json();
          alert(data.message || 'Failed to cancel booking');
          return;
        }

        setSelectedBooking(null);
        fetchBookings();
      } catch (err) {
        console.error('Cancel error:', err);
        alert('Failed to cancel booking');
      }
    }
  };

  const getFilteredBookings = () => {
    return bookings?.filter(booking => {
      const auditoriumMatch = selectedAuditorium === 'all' || 
        booking?.auditorium?.includes(selectedAuditorium);
      const statusMatch = selectedStatus === 'all' || booking?.status === selectedStatus;
      return auditoriumMatch && statusMatch;
    });
  };

  const filteredBookings = getFilteredBookings();

  return (
    <MainLayout userRole={userRole}>
      <div className="space-y-6">
        <Breadcrumbs />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Booking Calendar
            </h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive view and management of auditorium bookings
            </p>
          </div>
        </div>

        <CalendarFilters
          selectedAuditorium={selectedAuditorium}
          onAuditoriumChange={setSelectedAuditorium}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onRefresh={handleRefresh}
        />

        {!isMobile && (
          <CalendarHeader
            currentDate={currentDate}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onNavigate={handleNavigate}
            onTodayClick={handleTodayClick}
          />
        )}

        {loading ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <svg className="animate-spin h-10 w-10 text-primary mx-auto mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-muted-foreground">Loading bookings...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {(
                <>
                  {viewMode === 'day' && (
                    <DayView
                      bookings={filteredBookings}
                      selectedBooking={selectedBooking}
                      onBookingSelect={handleBookingSelect}
                    />
                  )}
                  {viewMode === 'week' && (
                    <WeekView
                      bookings={filteredBookings}
                      currentDate={currentDate}
                      selectedBooking={selectedBooking}
                      onBookingSelect={handleBookingSelect}
                    />
                  )}
                  {viewMode === 'month' && (
                    <MonthView
                      bookings={filteredBookings}
                      currentDate={currentDate}
                      selectedBooking={selectedBooking}
                      onBookingSelect={handleBookingSelect}
                      onDateSelect={handleDateSelect}
                    />
                  )}
                </>
              )}
            </div>

            <div className="lg:col-span-1">
              {selectedBooking ? (
                <BookingDetailPanel
                  booking={selectedBooking}
                  onClose={handleClosePanel}
                  onEdit={handleEditBooking}
                  onCancel={handleCancelBooking}
                />
              ) : (
                <div className="bg-card border border-border rounded-xl p-8 text-center shadow-elevation-1 sticky top-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Select a Booking
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a booking from the calendar to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BookingCalendarView;