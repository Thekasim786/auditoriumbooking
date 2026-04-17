import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../../components/navigation/MainLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import RequestHeader from './components/RequestHeader';
import FacultyInformation from './components/FacultyInformation';
import FacilityRequirements from './components/FacilityRequirements';
import RequestTimeline from './components/RequestTimeline';
import { authFetch, getUser, isManager } from '../../utils/auth';

const RequestDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const userIsManager = isManager();
  const userRole = userIsManager ? 'manager' : 'faculty';

  const bookingFromState = location?.state?.booking || null;

  const [loading, setLoading] = useState(!bookingFromState);
  const [booking, setBooking] = useState(bookingFromState);

  const request = booking ? {
    id: booking.requestId || `REQ-${booking.id}`,
    status: booking.status || 'pending',
    submittedDate: booking.submittedDate || booking.submissionDate || '',
    submittedTime: booking.reviewedAt ? new Date(booking.reviewedAt).toLocaleTimeString() : ''
  } : {};

  const faculty = booking ? {
    name: booking.facultyName || user?.fullName || 'Faculty Member',
    designation: '',
    department: '',
    email: booking.facultyEmail || user?.email || '',
    phone: '',
    employeeId: '',
    profileImage: '',
    profileImageAlt: ''
  } : {};

  const event = booking ? {
    title: booking.eventTitle || '',
    date: booking.eventDate || '',
    timeSlot: booking.timeSlot || (booking.startTime && booking.endTime
      ? `${booking.startTime} - ${booking.endTime}` : ''),
    expectedAttendees: booking.attendees || booking.expectedAttendees || 0,
    duration: booking.duration || '',
    type: booking.eventType || '',
    purpose: booking.eventPurpose || booking.eventPurpose || '',
    specialRequirements: booking.specialRequirements || '',
    specialInstructions: booking.specialInstructions || '',
    venue: booking.auditorium || booking.venue || '',
    priority: booking.priority || 'normal'
  } : {};

  // Build facilities array for FacilityRequirements
  const buildFacilities = () => {
    if (!booking) return [];

    const facilities = [];

    if (Array.isArray(booking.facilities)) {
      return booking.facilities.map((name, index) => ({
        type: name.toLowerCase().replace(/\s+/g, '-'),
        name: name,
        quantity: 1
      }));
    }

    if (booking.technicalEquipment && typeof booking.technicalEquipment === 'object') {
      Object.entries(booking.technicalEquipment).forEach(([key, value]) => {
        if (value) {
          const name = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, s => s.toUpperCase())
            .trim();
          facilities.push({ type: key, name: name, quantity: 1 });
        }
      });
    }

    if (booking.additionalServices && typeof booking.additionalServices === 'object') {
      Object.entries(booking.additionalServices).forEach(([key, value]) => {
        if (value) {
          const name = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, s => s.toUpperCase())
            .trim();
          facilities.push({ type: key, name: name, quantity: 1 });
        }
      });
    }

    return facilities;
  };

  const buildTimeline = () => {
    if (!booking) return [];

    const timeline = [];

    timeline.push({
      status: 'submitted',
      title: 'Request Submitted',
      description: 'Booking request submitted by faculty member',
      timestamp: booking.submittedDate || booking.submissionDate || booking.createdAt || '',
      performedBy: booking.facultyName || user?.fullName || 'Faculty'
    });

    if (booking.status === 'pending') {
      timeline.push({
        status: 'under-review',
        title: 'Awaiting Review',
        description: 'Request is pending manager review',
        timestamp: '',
        performedBy: 'Auditorium Manager'
      });
    }

    if (booking.status === 'approved') {
      timeline.push({
        status: 'approved',
        title: 'Request Approved',
        description: booking.remarks || 'Booking request has been approved',
        timestamp: booking.reviewedAt || '',
        performedBy: booking.reviewedByName || 'Auditorium Manager'
      });
    }

    if (booking.status === 'rejected') {
      timeline.push({
        status: 'rejected',
        title: 'Request Rejected',
        description: booking.remarks || 'Booking request has been rejected',
        timestamp: booking.reviewedAt || '',
        performedBy: booking.reviewedByName || 'Auditorium Manager'
      });
    }

    return timeline;
  };

  const handleBack = () => {
    if (userIsManager) {
      navigate('/manager/dashboard');
    } else {
      navigate('/faculty/dashboard');
    }
  };

  const handleApprove = async (requestId, venue, notes) => {
    try {
      const bookingId = booking?.id;
      if (!bookingId) return;

      const response = await authFetch('/manager/bookings/review', {
        method: 'POST',
        body: JSON.stringify({
          bookingId: bookingId,
          action: 'APPROVED',
          remarks: notes || `Approved. Venue: ${venue || booking.auditorium}`
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to approve booking');
        return;
      }

      setBooking(prev => ({ ...prev, status: 'approved', remarks: notes }));
      alert('Booking approved successfully!');
    } catch (err) {
      console.error('Approve error:', err);
      alert('Failed to approve booking. Please try again.');
    }
  };

  const handleReject = async (requestId, reason) => {
    try {
      const bookingId = booking?.id;
      if (!bookingId) return;

      const response = await authFetch('/manager/bookings/review', {
        method: 'POST',
        body: JSON.stringify({
          bookingId: bookingId,
          action: 'REJECTED',
          remarks: reason || 'Rejected by manager'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to reject booking');
        return;
      }

      setBooking(prev => ({ ...prev, status: 'rejected', remarks: reason }));
      alert('Booking rejected.');
    } catch (err) {
      console.error('Reject error:', err);
      alert('Failed to reject booking. Please try again.');
    }
  };

  const handleRequestModification = (requestId, changes) => {
    console.log('Requesting modifications:', requestId, 'Changes:', changes);
  };

  const handleSendMessage = (message) => {
    console.log('Sending message:', message);
  };

  if (loading) {
    return (
      <MainLayout userRole={userRole}>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-primary mx-auto mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-muted-foreground">Loading request details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!booking) {
    return (
      <MainLayout userRole={userRole}>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground mb-2">Request not found</p>
            <p className="text-muted-foreground mb-4">The booking request could not be found.</p>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
            >
              Go Back
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout userRole={userRole}>
      <div className="space-y-6 md:space-y-8">
        <Breadcrumbs />

        <RequestHeader
          request={request}
          onBack={handleBack}
          onApprove={userIsManager ? handleApprove : undefined}
          onReject={userIsManager ? handleReject : undefined}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <FacultyInformation faculty={faculty} />

            <div className="bg-card rounded-xl border border-border shadow-elevation-1 p-4 md:p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Event Title</p>
                  <p className="text-sm font-medium text-foreground">{event.title}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Event Type</p>
                  <p className="text-sm font-medium text-foreground capitalize">{event.type || 'General'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Event Date</p>
                  <p className="text-sm font-medium text-foreground">{event.date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Time Slot</p>
                  <p className="text-sm font-medium text-foreground">{event.timeSlot}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Venue</p>
                  <p className="text-sm font-medium text-foreground">{event.venue || 'To be assigned'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Expected Attendees</p>
                  <p className="text-sm font-medium text-foreground">{event.expectedAttendees}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Priority</p>
                  <p className="text-sm font-medium text-foreground capitalize">{event.priority}</p>
                </div>
              </div>
              {event.purpose && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-1">Purpose</p>
                  <p className="text-sm text-foreground whitespace-pre-line">{event.purpose}</p>
                </div>
              )}
              {event.specialRequirements && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-1">Special Requirements</p>
                  <p className="text-sm text-foreground">{event.specialRequirements}</p>
                </div>
              )}
              {event.specialInstructions && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-1">Special Instructions</p>
                  <p className="text-sm text-foreground">{event.specialInstructions}</p>
                </div>
              )}
            </div>

            <FacilityRequirements facilities={buildFacilities()} />

            {booking.remarks && (
              <div className="bg-card rounded-xl border border-border shadow-elevation-1 p-4 md:p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Manager Remarks</h3>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-foreground">{booking.remarks}</p>
                  {booking.reviewedByName && (
                    <p className="text-xs text-muted-foreground mt-2">
                      — {booking.reviewedByName}
                      {booking.reviewedAt && ` • ${booking.reviewedAt}`}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6 md:space-y-8">
            <RequestTimeline timeline={buildTimeline()} />
          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default RequestDetails;