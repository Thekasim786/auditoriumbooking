import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingDetailPanel = ({ booking, onClose, onEdit, onCancel }) => {
  if (!booking) return null;

  const getStatusBadge = () => {
    const statusConfig = {
      confirmed: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        text: 'text-green-700 dark:text-green-300',
        label: 'Confirmed'
      },
      pending: {
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        text: 'text-yellow-700 dark:text-yellow-300',
        label: 'Pending'
      },
      cancelled: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-700 dark:text-red-300',
        label: 'Cancelled'
      }
    };

    const config = statusConfig?.[booking?.status] || statusConfig?.pending;

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${config?.bg} ${config?.text}`}>
        <div className={`w-2 h-2 rounded-full ${config?.text?.includes('green') ? 'bg-green-500' : config?.text?.includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
        {config?.label}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-elevation-2 overflow-hidden">
      <div className="bg-primary/5 p-4 md:p-6 border-b border-border flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-semibold text-foreground">Booking Details</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-muted rounded-lg transition-colors duration-250"
          aria-label="Close panel"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      <div className="p-4 md:p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div>
          <h4 className="text-xl font-semibold text-foreground mb-2">{booking?.eventTitle}</h4>
          {getStatusBadge()}
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Faculty Member</p>
              <p className="text-sm font-medium text-foreground mt-1">{booking?.facultyName}</p>
              <p className="text-xs text-muted-foreground mt-1">{booking?.department}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Calendar" size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Date and Time</p>
              <p className="text-sm font-medium text-foreground mt-1">
                {new Date(booking.date)?.toLocaleDateString('hi-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              <p className="text-sm text-foreground mt-1">{booking?.timeSlot}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Building2" size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Auditorium</p>
              <p className="text-sm font-medium text-foreground mt-1">{booking?.auditorium}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="FileText" size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Event Purpose</p>
              <p className="text-sm text-foreground mt-1 leading-relaxed">{booking?.purpose}</p>
            </div>
          </div>

          {booking?.facilities && booking?.facilities?.length > 0 && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Settings" size={20} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Required Facilities</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {booking?.facilities?.map((facility, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted text-foreground text-xs rounded-lg"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Users" size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Expected Attendance</p>
              <p className="text-sm font-medium text-foreground mt-1">{booking?.expectedAttendees} people</p>
            </div>
          </div>

          {booking?.approvalHistory && booking?.approvalHistory?.length > 0 && (
            <div className="border-t border-border pt-4">
              <p className="text-sm font-semibold text-foreground mb-3">Approval History</p>
              <div className="space-y-3">
                {booking?.approvalHistory?.map((history, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm">
                    <Icon name="Clock" size={16} className="text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-foreground">{history?.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {history?.by} • {new Date(history.timestamp)?.toLocaleString('hi-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          {booking?.status === 'pending' && (
            <>
              <Button
                variant="default"
                onClick={() => onEdit(booking)}
                iconName="Check"
                iconPosition="left"
                className="flex-1"
              >
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={() => onCancel(booking)}
                iconName="X"
                iconPosition="left"
                className="flex-1"
              >
                Reject
              </Button>
            </>
          )}
          {booking?.status === 'confirmed' && (
            <Button
              variant="outline"
              onClick={() => onEdit(booking)}
              iconName="Edit"
              iconPosition="left"
              fullWidth
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPanel;