import React from 'react';

const WeekView = ({ bookings, currentDate, selectedBooking, onBookingSelect }) => {
  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek?.setDate(currentDate?.getDate() - currentDate?.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day?.setDate(startOfWeek?.getDate() + i);
      days?.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const getBookingsForDayAndTime = (day, time) => {
    return bookings?.filter(booking => {
      const bookingDate = new Date(booking.date);
      return (bookingDate?.toDateString() === day?.toDateString() && booking?.timeSlot?.startsWith(time));
    });
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-elevation-1">
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[80px_repeat(7,1fr)]">
            <div className="bg-muted p-3 border-r border-b border-border"></div>
            {weekDays?.map((day, index) => (
              <div
                key={index}
                className="bg-muted p-3 border-r border-b border-border text-center"
              >
                <div className="text-xs text-muted-foreground">{dayNames?.[day?.getDay()]}</div>
                <div className={`text-lg font-semibold mt-1 ${
                  day?.toDateString() === new Date()?.toDateString()
                    ? 'text-primary' :'text-foreground'
                }`}>
                  {day?.getDate()}
                </div>
              </div>
            ))}

            {timeSlots?.map((time) => (
              <React.Fragment key={time}>
                <div className="p-2 text-xs text-muted-foreground border-r border-b border-border bg-muted/30 flex items-center justify-center">
                  {time}
                </div>
                {weekDays?.map((day, dayIndex) => {
                  const dayBookings = getBookingsForDayAndTime(day, time);
                  return (
                    <div
                      key={dayIndex}
                      className="p-1 border-r border-b border-border min-h-[60px]"
                    >
                    
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