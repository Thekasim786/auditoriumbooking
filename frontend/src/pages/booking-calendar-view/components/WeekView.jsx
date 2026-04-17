import React from 'react';
import BookingBlock from './BookingBlock';

const HOURS = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const WeekView = ({ bookings, currentDate, selectedBooking, onBookingSelect }) => {
  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(currentDate.getDate() - currentDate.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const weekDays = getWeekDays();

  const getBookingsForDayHour = (day, hour) => {
    const slotEnd = `${String(parseInt(hour) + 1).padStart(2, '0')}:00`;
    return bookings?.filter(booking => {
      const bookingDate = new Date(booking.date);
      if (bookingDate?.toDateString() !== day?.toDateString()) return false;
      const bStart = booking._raw?.startTime || booking.timeSlot?.split(' - ')[0] || '';
      const bEnd = booking._raw?.endTime || booking.timeSlot?.split(' - ')[1] || '';
      return bStart < slotEnd && bEnd > hour;
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-elevation-1">
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[80px_repeat(7,1fr)]">
            <div className="bg-muted p-3 border-r border-b border-border" />
            {weekDays.map((day, i) => (
              <div key={i} className="bg-muted p-3 border-r border-b border-border text-center">
                <div className="text-xs text-muted-foreground">{DAY_NAMES[day.getDay()]}</div>
                <div className={`text-lg font-semibold mt-1 ${day.toDateString() === new Date().toDateString() ? 'text-primary' : 'text-foreground'}`}>
                  {day.getDate()}
                </div>
              </div>
            ))}

            {HOURS.map((hour) => (
              <React.Fragment key={hour}>
                <div className="p-2 text-xs text-muted-foreground border-r border-b border-border bg-muted/30 flex items-center justify-center">
                  {hour}
                </div>
                {weekDays.map((day, dayIndex) => {
                  const dayBookings = getBookingsForDayHour(day, hour);
                  return (
                    <div key={dayIndex} className="p-1 border-r border-b border-border min-h-[60px] space-y-1">
                      {dayBookings.map(booking => (
                        <BookingBlock
                          key={booking.id}
                          booking={booking}
                          onSelect={onBookingSelect}
                          isSelected={selectedBooking?.id === booking?.id}
                        />
                      ))}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekView;
