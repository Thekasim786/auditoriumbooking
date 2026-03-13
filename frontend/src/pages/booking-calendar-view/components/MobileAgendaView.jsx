import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileAgendaView = ({ bookings, currentDate, onBookingSelect, onNavigate }) => {
  const getBookingsForDate = () => {
    return bookings?.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate?.toDateString() === currentDate?.toDateString();
    });
  };

  const dayBookings = getBookingsForDate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'pending':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'cancelled':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border rounded-xl p-4 shadow-elevation-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onNavigate('prev')}
          iconName="ChevronLeft"
        />
        
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">
            {currentDate?.toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {dayBookings?.length} bookings
          </p>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onNavigate('next')}
          iconName="ChevronRight"
        />
      </div>
      {dayBookings?.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-8 text-center shadow-elevation-1">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-medium">No bookings for this day</p>
          <p className="text-sm text-muted-foreground mt-2">
            This date is currently available
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {dayBookings?.map((booking) => (
            <button
              key={booking?.id}
              onClick={() => onBookingSelect(booking)}
              className={`w-full bg-card border-l-4 ${getStatusColor(booking?.status)} rounded-xl p-4 shadow-elevation-1 text-left transition-all duration-250 hover:shadow-elevation-2 active:scale-[0.98]`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-foreground mb-1">
                    {booking?.eventTitle}
                  </h4>
                  <p className="text-sm text-muted-foreground">{booking?.facultyName}</p>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground flex-shrink-0" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-foreground">{booking?.timeSlot}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Building2" size={16} className="text-muted-foreground" />
                  <span className="text-foreground">{booking?.auditorium}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Users" size={16} className="text-muted-foreground" />
                  <span className="text-foreground">{booking?.expectedAttendees} people</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {getStatusLabel(booking?.status)}
                </span>
                {booking?.facilities && booking?.facilities?.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {booking?.facilities?.length} facilities
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileAgendaView;