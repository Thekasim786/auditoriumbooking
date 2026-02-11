import React from 'react';

const DayView = ({ bookings, selectedBooking, onBookingSelect }) => {
  const timeSlots = [
    '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00',
    '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00',
    '17:00 - 18:00', '18:00 - 19:00'
  ];

  const getBookingForSlot = (slot) => {
    return bookings?.find(booking => booking?.timeSlot === slot);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-elevation-1">
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-[120px_1fr] divide-y divide-border">
            <div className="bg-muted p-3 md:p-4 font-semibold text-sm text-foreground border-r border-border">
              Time
            </div>
            <div className="bg-muted p-3 md:p-4 font-semibold text-sm text-foreground">
              Booking Details
            </div>

            {timeSlots?.map((slot) => {
              const booking = getBookingForSlot(slot);
              return (
                <React.Fragment key={slot}>
                  <div className="p-3 md:p-4 text-sm text-muted-foreground border-r border-border bg-muted/30">
                    {slot}
                  </div>

                  <div className="p-2 md:p-3">
                    {booking ? (
                      <BookingBlock
                        booking={booking}
                        onSelect={onBookingSelect}
                        isSelected={selectedBooking?.id === booking?.id}
                      />
                    ) : (
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