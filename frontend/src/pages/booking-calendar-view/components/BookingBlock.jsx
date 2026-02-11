import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BookingBlock = ({ booking, onSelect, isSelected }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getStatusColor = () => {
    switch (booking?.status) {
      case 'confirmed':
        return 'bg-green-500 border-green-600';
      case 'pending':
        return 'bg-yellow-500 border-yellow-600';
      case 'cancelled':
        return 'bg-red-500 border-red-600';
      default:
        return 'bg-gray-500 border-gray-600';
    }
  };

  const getStatusLabel = () => {
    switch (booking?.status) {
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
    <div className="relative">
      <button
        onClick={() => onSelect(booking)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`w-full text-left p-2 md:p-3 rounded-lg border-2 transition-all duration-250 hover:shadow-elevation-2 ${
          getStatusColor()
        } ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}
        aria-label={`Booking: ${booking?.eventTitle}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm font-semibold text-white truncate">
              {booking?.eventTitle}
            </p>
            <p className="text-xs text-white/90 truncate mt-1">
              {booking?.facultyName}
            </p>
            <p className="text-xs text-white/80 mt-1">
              {booking?.timeSlot}
            </p>
          </div>
          <Icon name="ChevronRight" size={16} className="text-white flex-shrink-0" />
        </div>
      </button>
      {showTooltip && (
        <div className="absolute z-50 left-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevation-3 p-3 pointer-events-none">
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Event</p>
              <p className="text-sm font-medium text-foreground">{booking?.eventTitle}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Faculty</p>
              <p className="text-sm text-foreground">{booking?.facultyName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="text-sm text-foreground">{booking?.timeSlot}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Auditorium</p>
              <p className="text-sm text-foreground">{booking?.auditorium}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-sm font-medium text-foreground">{getStatusLabel()}</p>
            </div>
            {booking?.facilities && booking?.facilities?.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground">Facilities</p>
                <p className="text-sm text-foreground">{booking?.facilities?.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingBlock;