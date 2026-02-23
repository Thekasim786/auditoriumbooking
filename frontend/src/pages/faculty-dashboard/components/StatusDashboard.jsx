import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusCard from './StatusCard';
import { authFetch } from '../../../utils/auth';

const StatusDashboard = ({ bookings = [], loading = false, onRefresh }) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState(null);

  const recentBookings = bookings.map((booking) => ({
    requestId: booking.requestId,
    id: booking.id,
    eventTitle: booking.eventTitle,
    eventDate: booking.eventDate,
    timeSlot: booking.startTime && booking.endTime
      ? `${formatTime(booking.startTime)} - ${formatTime(booking.endTime)}`
      : '',
    submittedDate: booking.submissionDate,
    status: booking.status,
    auditoriumName: booking.auditorium,
    managerNote: booking.remarks,
    facilities: booking.facilities,
    priority: booking.priority
  }));

  const filterOptions = [
    { value: 'all', label: 'All Requests', icon: 'List', count: recentBookings?.length },
    { value: 'pending', label: 'Pending', icon: 'Clock', count: recentBookings?.filter(b => b?.status === 'pending')?.length },
    { value: 'approved', label: 'Approved', icon: 'CheckCircle', count: recentBookings?.filter(b => b?.status === 'approved')?.length },
    { value: 'rejected', label: 'Rejected', icon: 'XCircle', count: recentBookings?.filter(b => b?.status === 'rejected')?.length }
  ];

  const filteredBookings = activeFilter === 'all' 
    ? recentBookings 
    : recentBookings?.filter(booking => booking?.status === activeFilter);

  const handleViewDetails = (booking) => {
    navigate('/request-details', { state: { booking } });
  };

  const handleModify = (booking) => {
    navigate('/booking-request-form', { state: { modifyBooking: booking } });
  };

  const handleCancelRequest = (booking) => {
    setSelectedBooking(booking);
    setCancelError(null);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!selectedBooking?.id) return;

    setIsCancelling(true);
    setCancelError(null);

    try {
      const response = await authFetch(`/faculty/bookings/${selectedBooking.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to cancel booking');
      }

      setShowCancelModal(false);
      setSelectedBooking(null);

      if (onRefresh) {
        onRefresh();
      }
    } catch (err) {
      console.error('Cancel error:', err);
      setCancelError(err.message || 'Failed to cancel booking. Please try again.');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-2">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Icon name="Activity" size={20} color="var(--color-secondary)" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-foreground">
                Recent Booking Requests
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                View status of all your requests
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="default"
            iconName="History"
            iconPosition="left"
            onClick={() => navigate('/booking-history')}
            className="sm:w-auto"
          >
            View All History
          </Button>
        </div>
      </div>
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map((filter) => (
            <button
              key={filter?.value}
              onClick={() => setActiveFilter(filter?.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-250 ${
                activeFilter === filter?.value
                  ? 'bg-primary text-primary-foreground shadow-elevation-1'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={filter?.icon} size={16} />
              <span className="hidden sm:inline">{filter?.label}</span>
              <span className="sm:hidden">{filter?.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                activeFilter === filter?.value
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-background text-foreground'
              }`}>
                {filter?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 md:p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Loading bookings...
            </h3>
            <p className="text-sm text-muted-foreground">
              Fetching your booking requests
            </p>
          </div>
        ) : filteredBookings?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Icon name="Inbox" size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Requests Found
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {bookings.length === 0
                ? 'Submit your first auditorium booking request'
                : 'There are no booking requests in this category'}
            </p>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => navigate('/booking-request-form')}
            >
              Create New Request
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {filteredBookings?.map((booking) => (
              <StatusCard
                key={booking?.requestId}
                booking={booking}
                onViewDetails={handleViewDetails}
                onCancel={handleCancelRequest}
                onModify={handleModify}
              />
            ))}
          </div>
        )}
      </div>
      {showCancelModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border border-border shadow-elevation-4 max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size={24} className="text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Cancel Booking Request?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to cancel this booking request? This action cannot be undone.
                </p>
                {selectedBooking && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium text-foreground">
                      {selectedBooking?.eventTitle}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Request ID: {selectedBooking?.requestId}
                    </p>
                  </div>
                )}
                {cancelError && (
                  <div className="mt-3 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <Icon name="AlertCircle" size={14} />
                      {cancelError}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                size="default"
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelError(null);
                }}
                fullWidth
                className="sm:flex-1"
                disabled={isCancelling}
              >
                Go Back
              </Button>
              <Button
                variant="destructive"
                size="default"
                iconName="Trash2"
                iconPosition="left"
                onClick={confirmCancel}
                fullWidth
                className="sm:flex-1"
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Yes, Cancel Request'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function formatTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${String(hour12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
}

export default StatusDashboard;