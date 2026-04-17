import React from 'react';
import BookingBlock from './BookingBlock';

const HOURS = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];

const DayView = ({ bookings, currentDate, selectedBooking, onBookingSelect }) => {
  const getBookingsForHour = (hour) => {
    const slotStart = hour;
    const slotEnd = `${String(parseInt(hour) + 1).padStart(2, '0')}:00`;
    const today = currentDate || new Date();

    return bookings?.filter(booking => {
      const bookingDate = new Date(booking.date);
      const sameDay = bookingDate?.toDateString() === today?.toDateString();
      if (!sameDay) return false;
      const bStart = booking._raw?.startTime || booking.timeSlot?.split(' - ')[0] || '';
      const bEnd = booking._raw?.endTime || booking.timeSlot?.split(' - ')[1] || '';
      return bStart < slotEnd && bEnd > slotStart;
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-elevation-1">
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-[120px_1fr] divide-y divide-border">
            <div className="bg-muted p-3 md:p-4 font-semibold text-sm text-foreground border-r border-border">Time</div>
            <div className="bg-muted p-3 md:p-4 font-semibold text-sm text-foreground">Booking Details</div>

            {HOURS.map((hour) => {
              const slotBookings = getBookingsForHour(hour);
              return (
                <React.Fragment key={hour}>
                  <div className="p-3 md:p-4 text-sm text-muted-foreground border-r border-border bg-muted/30">
                    {hour}
                  </div>
                  <div className="p-2 md:p-3 space-y-2">
                    {slotBookings.length > 0 ? slotBookings.map(booking => (
                      <BookingBlock
                        key={booking.id}
                        booking={booking}
                        onSelect={onBookingSelect}
                        isSelected={selectedBooking?.id === booking?.id}
                      />
                    )) : (
                      <div className="h-full min-h-[60px] flex items-center justify-center text-sm text-muted-foreground border-2 border-dashed border-border rounded-lg">
                        Available
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
