import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusCard from './StatusCard';

const StatusDashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const recentBookings = [
    {
      requestId: 'REQ-2026-001',
      eventTitle: 'Annual Technical Symposium 2026',
      eventDate: '2026-02-15',
      timeSlot: '09:00 AM - 01:00 PM',
      submittedDate: '2026-01-10',
      status: 'approved',
      auditoriumName: 'Main Auditorium (500 capacity)',
      managerNote: 'Approved. All facilities are available.'
    },
    {
      requestId: 'REQ-2026-002',
      eventTitle: 'Guest Lecture on AI & Machine Learning',
      eventDate: '2026-01-25',
      timeSlot: '02:00 PM - 04:00 PM',
      submittedDate: '2026-01-11',
      status: 'pending',
      auditoriumName: null,
      managerNote: null
    },
    {
      requestId: 'REQ-2026-003',
      eventTitle: 'Department Cultural Event',
      eventDate: '2026-01-20',
      timeSlot: '06:00 PM - 08:00 PM',
      submittedDate: '2026-01-09',
      status: 'rejected',
      auditoriumName: null,
      managerNote: 'Sorry, there is already a booking on that date. Please choose another date.'
    },
    {
      requestId: 'REQ-2026-004',
      eventTitle: 'Workshop on Research Methodology',
      eventDate: '2026-02-05',
      timeSlot: '11:00 AM - 01:00 PM',
      submittedDate: '2026-01-12',
      status: 'pending',
      auditoriumName: null,
      managerNote: null
    }
  ];

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
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    setSelectedBooking(null);
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
        {filteredBookings?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Icon name="Inbox" size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Requests Found
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              There are no booking requests in this category
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
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                size="default"
                onClick={() => setShowCancelModal(false)}
                fullWidth
                className="sm:flex-1"
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
              >
                Yes, Cancel Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusDashboard;