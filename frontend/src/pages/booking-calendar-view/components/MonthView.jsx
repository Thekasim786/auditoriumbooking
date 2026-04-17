import React, { useState, useRef } from 'react';

const STATUS_COLORS = {
  confirmed: { dot: 'bg-green-500', text: 'text-green-700', badge: 'bg-green-50 text-green-700 border-green-200' },
  pending:   { dot: 'bg-yellow-500', text: 'text-yellow-700', badge: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  cancelled: { dot: 'bg-red-500', text: 'text-red-700', badge: 'bg-red-50 text-red-700 border-red-200' },
};

const DayPopup = ({ bookings, day, cellRef }) => {
  // Determine if popup should open to the right or left based on day-of-week column
  const col = day.getDay(); // 0=Sun ... 6=Sat
  const openLeft = col >= 4; // Thu-Sat: open leftward to avoid overflow

  return (
    <div
      className={`absolute z-[200] w-72 bg-popover border border-border rounded-xl shadow-elevation-4 p-3 pointer-events-none
        ${openLeft ? 'right-0' : 'left-0'} top-0`}
      style={{ marginTop: '-4px' }}
    >
      <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
        {day.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
      </p>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {bookings.map((booking, i) => {
          const colors = STATUS_COLORS[booking.status] || STATUS_COLORS.pending;
          return (
            <div key={i} className="p-2 rounded-lg bg-muted border border-border">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-medium text-foreground leading-tight line-clamp-2">
                  {booking.eventTitle}
                </p>
                <span className={`text-xs px-1.5 py-0.5 rounded-full border font-medium whitespace-nowrap flex-shrink-0 ${colors.badge}`}>
                  {booking.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{booking.facultyName}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{booking.timeSlot}</p>
              {booking.auditorium && (
                <p className="text-xs text-muted-foreground mt-0.5">{booking.auditorium}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MonthView = ({ bookings, currentDate, selectedBooking, onBookingSelect, onDateSelect }) => {
  const [hoveredDay, setHoveredDay] = useState(null);

  const getMonthDays = () => {
    const year = currentDate?.getFullYear();
    const month = currentDate?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay?.getDay();
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
    return days;
  };

  const monthDays = getMonthDays();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getBookingsForDay = (day) => {
    if (!day) return [];
    return bookings?.filter(b => new Date(b.date)?.toDateString() === day?.toDateString());
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-elevation-1">
      <div className="grid grid-cols-7 border-b border-border">
        {dayNames.map((d) => (
          <div key={d} className="bg-muted p-3 md:p-4 text-center text-sm font-semibold text-foreground border-r border-border last:border-r-0">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {monthDays.map((day, index) => {
          const dayBookings = getBookingsForDay(day);
          const isToday = day && day?.toDateString() === new Date()?.toDateString();
          const isCurrentMonth = day && day?.getMonth() === currentDate?.getMonth();
          const isHovered = hoveredDay && day && hoveredDay.toDateString() === day.toDateString();

          const confirmed = dayBookings.filter(b => b.status === 'confirmed').length;
          const pending   = dayBookings.filter(b => b.status === 'pending').length;
          const cancelled = dayBookings.filter(b => b.status === 'cancelled').length;

          return (
            <div
              key={index}
              className={`relative min-h-[100px] md:min-h-[120px] p-2 border-r border-b border-border last:border-r-0 ${!isCurrentMonth ? 'bg-muted/30' : ''}`}
              onMouseEnter={() => day && dayBookings.length > 0 && setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              {day && (
                <>
                  <button onClick={() => onDateSelect(day)} className="w-full text-left">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm md:text-base font-semibold ${
                        isToday
                          ? 'w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground'
                          : isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {day.getDate()}
                      </span>
                      {dayBookings.length > 0 && (
                        <span className="text-xs font-medium text-muted-foreground">{dayBookings.length}</span>
                      )}
                    </div>

                    {dayBookings.length > 0 && (
                      <div className="space-y-1">
                        {confirmed > 0 && (
                          <div className="flex items-center gap-1 text-xs">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-green-700 dark:text-green-300">{confirmed}</span>
                          </div>
                        )}
                        {pending > 0 && (
                          <div className="flex items-center gap-1 text-xs">
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <span className="text-yellow-700 dark:text-yellow-300">{pending}</span>
                          </div>
                        )}
                        {cancelled > 0 && (
                          <div className="flex items-center gap-1 text-xs">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-red-700 dark:text-red-300">{cancelled}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </button>

                  {isHovered && dayBookings.length > 0 && (
                    <DayPopup bookings={dayBookings} day={day} />
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
